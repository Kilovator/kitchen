import { Ingredient, Supermarket } from '../types';
import { SUPERMARKETS } from '../data/recipes';
import { getCartActiveTotal } from './supermarketPriceService';
import { 
  getHaversineDistance, 
  getStoresNearLocation, 
  mapStoreDetails, 
  CURATED_POLAND_SUPERMARKETS 
} from '../data/supermarketsData';

export async function fetchRealSupermarkets(lat: number, lng: number): Promise<Supermarket[] | null> {
  // 1. Try serverless backend proxy endpoint
  try {
    const url = `/api/supermarkets?lat=${lat}&lng=${lng}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (e) {
    console.warn('API proxy /api/supermarkets unavailable, trying client-side fallback:', e);
  }

  // 2. Client-side Overpass API direct fallback (for Vercel serverless resilience)
  try {
    const query = `[out:json][timeout:5];(node(around:6000,${lat},${lng})[shop=supermarket];way(around:6000,${lat},${lng})[shop=supermarket];);out center 80;`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const endpoints = [
      'https://overpass-api.de/api/interpreter',
      'https://overpass.kumi.systems/api/interpreter'
    ];

    let osmRes: Response | null = null;
    for (const ep of endpoints) {
      try {
        const r = await fetch(ep, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          body: 'data=' + encodeURIComponent(query),
          signal: controller.signal
        });
        if (r.ok) {
          osmRes = r;
          break;
        }
      } catch (err) {
        // try next endpoint
      }
    }
    clearTimeout(timeoutId);

    if (osmRes && osmRes.ok) {
      const osmData = await osmRes.json();
      const elements = osmData.elements || [];
      const knownChains = ['biedronka', 'lidl', 'żabka', 'zabka', 'carrefour', 'auchan', 'dino', 'kaufland', 'stokrotka', 'netto', 'aldi'];
      const mapped: Supermarket[] = [];
      const seenIds = new Set<string>();

      elements.forEach((el: any) => {
        const id = String(el.id);
        if (seenIds.has(id)) return;
        const tags = el.tags || {};
        if (tags['disused:shop'] || tags['abandoned:shop'] || tags.closed === 'yes') return;

        const rawName = tags.name || tags.operator || tags.brand || '';
        const brandLower = (rawName + ' ' + (tags.brand || '') + ' ' + (tags.operator || '')).toLowerCase();
        const isRecognizedChain = knownChains.some(c => brandLower.includes(c));
        const isSupermarket = tags.shop === 'supermarket';
        if (!isRecognizedChain && !isSupermarket) return;
        if (!rawName || rawName.trim().length < 3) return;

        const storeLat = parseFloat(el.lat || (el.center && el.center.lat));
        const storeLng = parseFloat(el.lon || (el.center && el.center.lon));
        if (isNaN(storeLat) || isNaN(storeLng)) return;

        seenIds.add(id);
        const dist = getHaversineDistance(lat, lng, storeLat, storeLng);
        if (dist > 6000) return;

        let addrText = 'Polska';
        if (tags['addr:street']) {
          const street = tags['addr:street'];
          const house = tags['addr:housenumber'] || '';
          addrText = street + (house ? ' ' + house : '');
        }

        const walkMinutes = Math.max(1, Math.round(dist / 80));
        const details = mapStoreDetails(rawName, tags);

        mapped.push({
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
          mapUrl: `https://www.google.com/maps/search/?api=1&query=${storeLat},${storeLng}`,
          lat: storeLat,
          lng: storeLng,
          address: { ru: addrText, en: addrText, pl: addrText }
        });
      });

      if (mapped.length > 0) {
        return mapped;
      }
    }
  } catch (err) {
    console.warn('Client-side OSM lookup failed or timed out:', err);
  }

  // 3. Robust Curated dataset lookup based on user coordinates (100% offline & zero-latency guarantee)
  const curatedMatches = getStoresNearLocation(lat, lng, 6000);
  if (curatedMatches && curatedMatches.length > 0) {
    return curatedMatches as Supermarket[];
  }

  return null;
}

export function calculateStoreTotals(
  shoppingList: Ingredient[],
  servingsCount: number,
  mode: 'best-price' | 'nearest',
  userLoc?: { lat: number; lng: number } | null,
  customStoresList?: Supermarket[] | null
): Supermarket[] {
  const baseTotal = getCartActiveTotal(shoppingList, servingsCount);

  let sourceStores: Supermarket[] = [];

  if (customStoresList && customStoresList.length > 0) {
    sourceStores = customStoresList;
  } else if (userLoc) {
    const nearbyCurated = getStoresNearLocation(userLoc.lat, userLoc.lng, 6000);
    sourceStores = (nearbyCurated && nearbyCurated.length > 0) ? (nearbyCurated as Supermarket[]) : SUPERMARKETS;
  } else {
    sourceStores = SUPERMARKETS;
  }

  let stores = sourceStores.map(store => {
    const totalCost = Math.round(baseTotal * store.priceMultiplier);

    let storeLat = store.lat;
    let storeLng = store.lng;
    let dist = store.distanceMeters;
    let storeAddress = store.address;

    if (userLoc) {
      dist = getHaversineDistance(userLoc.lat, userLoc.lng, store.lat, store.lng);
    }

    const walkMinutes = Math.max(1, Math.round(dist / 80));
    const walkTimeObj = {
      ru: `${walkMinutes} мин пешком`,
      en: `${walkMinutes} min walk`,
      pl: `${walkMinutes} min pieszo`
    };

    return {
      ...store,
      lat: storeLat,
      lng: storeLng,
      distanceMeters: dist,
      walkTime: walkTimeObj,
      address: storeAddress,
      totalCost: totalCost > 0 ? totalCost : 0
    };
  });

  // Filter Żabka stores: keep ONLY the 5 closest Żabkas to avoid map cluttering
  const zabkaStores = stores.filter(s => s.name.toLowerCase().includes('żabka') || s.name.toLowerCase().includes('zabka'));
  const nonZabkaStores = stores.filter(s => !s.name.toLowerCase().includes('żabka') && !s.name.toLowerCase().includes('zabka'));

  const closestZabkas = zabkaStores.sort((a, b) => a.distanceMeters - b.distanceMeters).slice(0, 5);

  stores = [...closestZabkas, ...nonZabkaStores];

  if (mode === 'best-price') {
    stores.sort((a, b) => (a.totalCost || 0) - (b.totalCost || 0));
  } else {
    stores.sort((a, b) => a.distanceMeters - b.distanceMeters);
  }

  return stores;
}

let googlePlacesService: any = null;

export function initGooglePlaces(apiKey: string): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).google && (window as any).google.maps) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

export function fetchGooglePlacesSupermarkets(lat: number, lng: number): Promise<Supermarket[] | null> {
  return new Promise((resolve) => {
    const google = (window as any).google;
    if (!google || !google.maps || !google.maps.places) {
      resolve(null);
      return;
    }

    if (!googlePlacesService) {
      googlePlacesService = new google.maps.places.PlacesService(document.createElement('div'));
    }

    googlePlacesService.nearbySearch({
      location: new google.maps.LatLng(lat, lng),
      radius: 3000,
      type: ['supermarket', 'grocery_or_supermarket', 'convenience_store']
    }, (results: any[], status: any) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
        resolve(null);
        return;
      }

      const mapped = results.map((place, index) => {
        const rawName = place.name || 'Supermarket';
        const addressText = place.vicinity || 'Polska';

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
        } else if (rawName.includes('ALDI')) {
          logo = '🔷'; priceMultiplier = 0.94; badgeText = 'Promocje tygodnia'; deliveryUrl = 'https://www.aldi.pl/';
        }

        const placeLat = place.geometry.location.lat();
        const placeLng = place.geometry.location.lng();
        
        // Haversine distance
        const R = 6371000;
        const dLat = (placeLat - lat) * Math.PI / 180;
        const dLon = (placeLng - lng) * Math.PI / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat * Math.PI / 180) * Math.cos(placeLat * Math.PI / 180) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const dist = Math.round(R * c);

        const walkMinutes = Math.max(1, Math.round(dist / 80));

        return {
          id: `google_${place.place_id || index}`,
          name: rawName,
          logo: logo,
          priceMultiplier: priceMultiplier,
          distanceMeters: dist,
          walkTime: {
            ru: `${walkMinutes} мин пешком`,
            en: `${walkMinutes} min walk`,
            pl: `${walkMinutes} min pieszo`
          },
          badge: { ru: badgeText, en: badgeText, pl: badgeText },
          deliveryAvailable: true,
          deliveryUrl: deliveryUrl,
          mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rawName + ' ' + addressText)}`,
          lat: placeLat,
          lng: placeLng,
          address: { ru: addressText, en: addressText, pl: addressText }
        };
      });

      resolve(mapped);
    });
  });
}
