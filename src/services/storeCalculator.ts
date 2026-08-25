import { Ingredient, Supermarket } from '../types';
import { SUPERMARKETS } from '../data/recipes';
import { getCartActiveTotal } from './supermarketPriceService';

function getHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export async function fetchRealSupermarkets(lat: number, lng: number): Promise<Supermarket[] | null> {
  try {
    const url = `/api/supermarkets?lat=${lat}&lng=${lng}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.warn('Failed to fetch from supermarkets API proxy:', e);
    return null;
  }
}

export function calculateStoreTotals(
  shoppingList: Ingredient[],
  servingsCount: number,
  mode: 'best-price' | 'nearest',
  userLoc?: { lat: number; lng: number } | null,
  customStoresList?: Supermarket[] | null
): Supermarket[] {
  const baseTotal = getCartActiveTotal(shoppingList, servingsCount);

  const sourceStores = (customStoresList && customStoresList.length > 0) ? customStoresList : SUPERMARKETS;

  const offsets: Record<string, { lat: number; lng: number }> = {
    s1: { lat: 0.0022, lng: -0.0019 }, // Biedronka
    s2: { lat: -0.0042, lng: -0.0048 }, // Lidl
    s3: { lat: 0.0011, lng: 0.0008 },   // Żabka
    s4: { lat: -0.0028, lng: 0.0031 },  // Carrefour
    s5: { lat: 0.0085, lng: -0.0078 },  // Auchan
    s6: { lat: 0.0035, lng: 0.0028 },   // Dino
    s7: { lat: 0.0090, lng: 0.0082 },   // Kaufland
    s8: { lat: 0.0025, lng: 0.0035 }    // Stokrotka
  };

  let stores = sourceStores.map(store => {
    const totalCost = Math.round(baseTotal * store.priceMultiplier);

    let storeLat = store.lat;
    let storeLng = store.lng;
    let dist = store.distanceMeters;
    let storeAddress = store.address;

    const isRealCoordsStore = store.id.startsWith('osm_') || store.id.startsWith('google_') || store.id.startsWith('curated_');

    if (userLoc && !isRealCoordsStore) {
      const off = offsets[store.id] || { lat: 0, lng: 0 };
      storeLat = userLoc.lat + off.lat;
      storeLng = userLoc.lng + off.lng;
      dist = getHaversineDistance(userLoc.lat, userLoc.lng, storeLat, storeLng);
      storeAddress = {
        pl: `Sklep w Twojej okolicy (ok. ${dist}m)`,
        en: `Store in your area (~${dist}m)`,
        ru: `Магазин поблизости (~${dist}м)`
      };
    } else if (userLoc && isRealCoordsStore) {
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
