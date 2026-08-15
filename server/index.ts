import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../src/generated/prisma/client';

const app = express();
const port = 5000;

// Setup Prisma with Better-SQLite3 Driver Adapter (Prisma 7 requirement)
const db = new Database('prisma/dev.db');
const adapter = new PrismaBetterSqlite3(db);
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

// 1. Geocoding Proxy and Cache
app.get('/api/geocode', async (req, res) => {
  const query = req.query.q ? String(req.query.q).trim().toLowerCase() : '';
  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter q' });
  }

  try {
    // Check SQLite cache first
    const cached = await prisma.geocodingCache.findUnique({
      where: { query }
    });

    if (cached) {
      console.log(`[Cache Hit] Geocode query: "${query}"`);
      return res.json([{ lat: String(cached.lat), lon: String(cached.lng), display_name: query }]);
    }

    console.log(`[Cache Miss] Fetching geocode for: "${query}"`);
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
    const response = await fetch(nominatimUrl, {
      headers: {
        'User-Agent': 'CookCraftApp/1.0 (contact: support@cookcraft.pl)'
      }
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'Failed to fetch from Nominatim' });
    }

    const data = await response.json();
    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lng = parseFloat(data[0].lon);

      // Save to database cache
      await prisma.geocodingCache.create({
        data: {
          query,
          lat,
          lng
        }
      }).catch(err => console.warn('Cache write failed (likely duplicate):', err.message));
    }

    return res.json(data);
  } catch (error: any) {
    console.error('Geocoding proxy error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Helper for Haversine Distance
function getHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // Earth radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Helper to identify supermarkets by name
function mapStoreDetails(rawName: string) {
  let logo = '🏪';
  let priceMultiplier = 1.0;
  let badgeText = 'Sklep w okolicy';
  let deliveryUrl = 'https://www.google.com/maps/';

  if (rawName.includes('Biedronka')) {
    logo = '🐞'; priceMultiplier = 0.92; badgeText = 'Najniższa cena'; deliveryUrl = 'https://www.biedronka.pl/';
  } else if (rawName.includes('Lidl')) {
    logo = '🟡'; priceMultiplier = 0.94; badgeText = 'Gwarancja jakości'; deliveryUrl = 'https://www.lidl.pl/';
  } else if (rawName.includes('Żabka') || rawName.includes('Zabka')) {
    logo = '🐸'; priceMultiplier = 1.14; badgeText = 'Dostawa w 15 min'; deliveryUrl = 'https://www.zabka.pl/';
  } else if (rawName.includes('Carrefour')) {
    logo = '🔵'; priceMultiplier = 1.04; badgeText = 'Duży wybór'; deliveryUrl = 'https://www.carrefour.pl/';
  } else if (rawName.includes('Auchan')) {
    logo = '🔴'; priceMultiplier = 0.90; badgeText = 'Super ceny'; deliveryUrl = 'https://www.auchan.pl/';
  } else if (rawName.includes('Dino')) {
    logo = '🟢'; priceMultiplier = 0.95; badgeText = 'Blisko Ciebie'; deliveryUrl = 'https://marketdino.pl/';
  } else if (rawName.includes('Kaufland')) {
    logo = '⚪'; priceMultiplier = 0.93; badgeText = 'Hipermarket'; deliveryUrl = 'https://www.kaufland.pl/';
  } else if (rawName.includes('Stokrotka')) {
    logo = '🌼'; priceMultiplier = 1.06; badgeText = 'Świeże i Eko'; deliveryUrl = 'https://stokrotka.pl/';
  } else if (rawName.includes('Netto')) {
    logo = '🟡'; priceMultiplier = 0.93; badgeText = 'Tanie zakupy'; deliveryUrl = 'https://netto.pl/';
  } else if (rawName.includes('ALDI') || rawName.includes('Aldi')) {
    logo = '🔷'; priceMultiplier = 0.94; badgeText = 'Promocje tygodnia'; deliveryUrl = 'https://www.aldi.pl/';
  }

  return { logo, priceMultiplier, badgeText, deliveryUrl };
}

// 2. Supermarkets Near Location Proxy and Cache
app.get('/api/supermarkets', async (req, res) => {
  const latVal = req.query.lat ? parseFloat(String(req.query.lat)) : NaN;
  const lngVal = req.query.lng ? parseFloat(String(req.query.lng)) : NaN;

  if (isNaN(latVal) || isNaN(lngVal)) {
    return res.status(400).json({ error: 'Invalid or missing lat/lng parameters' });
  }

  // Rounded coordinates (3 decimal places) represents ~100 meters precision.
  const key = `${latVal.toFixed(3)}_${lngVal.toFixed(3)}`;

  try {
    // Check SQLite cache first
    const cached = await prisma.supermarketCache.findUnique({
      where: { key }
    });

    if (cached) {
      console.log(`[Cache Hit] Supermarkets near key: ${key}`);
      return res.json(JSON.parse(cached.data));
    }

    const mappedStores: any[] = [];
    const seenIds = new Set<string>();

    // 1. Try Google Places API if key is present in .env
    const googleApiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (googleApiKey && googleApiKey !== 'your_api_key_here') {
      try {
        console.log(`[Google Places] Fetching real supermarkets near ${latVal}, ${lngVal}`);
        const googleUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latVal},${lngVal}&radius=4000&type=supermarket&key=${googleApiKey}`;
        const googleRes = await fetch(googleUrl);
        if (googleRes.ok) {
          const googleData = await googleRes.json();
          if (googleData.results && googleData.results.length > 0) {
            googleData.results.forEach((place: any) => {
              const id = place.place_id;
              if (seenIds.has(id)) return;
              seenIds.add(id);

              const storeLat = place.geometry.location.lat;
              const storeLng = place.geometry.location.lng;
              const dist = getHaversineDistance(latVal, lngVal, storeLat, storeLng);
              if (dist > 4000) return; // Strict 4km boundary

              const rawName = place.name || 'Supermarket';
              const addrText = place.vicinity || 'Polska';
              const walkMinutes = Math.max(1, Math.round(dist / 80));
              const details = mapStoreDetails(rawName);

              // Use official Google Places details URL or direct place_id mapping
              const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rawName)}&query_place_id=${id}`;

              mappedStores.push({
                id: `google_${id}`,
                name: rawName,
                logo: details.logo,
                priceMultiplier: details.priceMultiplier,
                distanceMeters: dist,
                walkTime: {
                  ru: `${walkMinutes} мин пешком`,
                  en: `${walkMinutes} min walk`,
                  pl: `${walkMinutes} min pieszo`
                },
                badge: { ru: details.badgeText, en: details.badgeText, pl: details.badgeText },
                deliveryAvailable: true,
                deliveryUrl: details.deliveryUrl,
                mapUrl,
                lat: storeLat,
                lng: storeLng,
                address: { ru: addrText, en: addrText, pl: addrText }
              });
            });

            console.log(`[Google Places] Loaded ${mappedStores.length} stores`);
          }
        }
      } catch (err) {
        console.warn('Google Places API call failed, falling back to OSM Overpass:', err);
      }
    }

    // 2. Fallback to OpenStreetMap Overpass tag-based search if Google API is not used or returned no stores
    if (mappedStores.length === 0) {
      try {
        console.log(`[OSM Overpass] Querying tag-based supermarkets near ${latVal}, ${lngVal}`);
        const query = `[out:json][timeout:15];node(around:4000,${latVal},${lngVal})[shop~"supermarket|convenience|grocery"];out 80;`;
        const osmUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
        const osmRes = await fetch(osmUrl, {
          headers: {
            'User-Agent': 'CookCraftApp/1.0 (contact: support@cookcraft.pl)'
          }
        });

        if (osmRes.ok) {
          const osmData = await osmRes.json();
          const elements = osmData.elements || [];

          elements.forEach((el: any) => {
            const id = String(el.id);
            if (seenIds.has(id)) return;
            seenIds.add(id);

            const storeLat = parseFloat(el.lat);
            const storeLng = parseFloat(el.lon);
            if (isNaN(storeLat) || isNaN(storeLng)) return;

            const dist = getHaversineDistance(latVal, lngVal, storeLat, storeLng);
            if (dist > 4000) return; // Strict 4km boundary

            const tags = el.tags || {};
            const rawName = tags.name || tags.operator || 'Sklep';
            
            // Build detailed address from tags
            let addrText = 'Polska';
            if (tags['addr:street']) {
              const street = tags['addr:street'];
              const house = tags['addr:housenumber'] || '';
              addrText = street + (house ? ' ' + house : '');
            } else if (tags['addr:suburb']) {
              addrText = tags['addr:suburb'];
            }

            const walkMinutes = Math.max(1, Math.round(dist / 80));
            const details = mapStoreDetails(rawName);

            // Open exact coordinates on Google Maps search (guarantees precise location display)
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${storeLat},${storeLng}`;

            mappedStores.push({
              id: `osm_${id}`,
              name: rawName,
              logo: details.logo,
              priceMultiplier: details.priceMultiplier,
              distanceMeters: dist,
              walkTime: {
                ru: `${walkMinutes} мин пешком`,
                en: `${walkMinutes} min walk`,
                pl: `${walkMinutes} min pieszo`
              },
              badge: { ru: details.badgeText, en: details.badgeText, pl: details.badgeText },
              deliveryAvailable: true,
              deliveryUrl: details.deliveryUrl,
              mapUrl,
              lat: storeLat,
              lng: storeLng,
              address: { ru: addrText, en: addrText, pl: addrText }
            });
          });

          console.log(`[OSM Overpass] Loaded ${mappedStores.length} stores`);
        }
      } catch (err) {
        console.warn('OSM Overpass query failed:', err);
      }
    }

    // Save to database cache
    await prisma.supermarketCache.create({
      data: {
        key,
        data: JSON.stringify(mappedStores)
      }
    }).catch(err => console.warn('Cache write failed (likely duplicate):', err.message));

    return res.json(mappedStores);
  } catch (error: any) {
    console.error('Supermarket proxy error:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`[Express Backend] Running on http://localhost:${port}`);
});
