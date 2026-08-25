async function testCleanStores() {
  const latVal = 51.101696;
  const lngVal = 17.022976;

  // Query actual supermarkets and convenience chains (Biedronka, Lidl, Zabka, Dino, Carrefour, Auchan, Kaufland, Netto, Aldi, Lewiatan, Stokrotka)
  const query = `[out:json][timeout:25];
(
  node(around:4000,${latVal},${lngVal})[shop=supermarket];
  way(around:4000,${latVal},${lngVal})[shop=supermarket];
  node(around:4000,${latVal},${lngVal})[name~"Biedronka|Lidl|Żabka|Zabka|Carrefour|Auchan|Dino|Kaufland|Stokrotka|Netto|ALDI|Aldi|Lewiatan|Polomarket",i];
  way(around:4000,${latVal},${lngVal})[name~"Biedronka|Lidl|Żabka|Zabka|Carrefour|Auchan|Dino|Kaufland|Stokrotka|Netto|ALDI|Aldi|Lewiatan|Polomarket",i];
);
out center 100;`;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  console.log('Querying clean supermarkets...');
  const res = await fetch(url, { headers: { 'User-Agent': 'CookCraftApp/1.0' } });
  const data = await res.json();
  const elements = data.elements || [];

  console.log(`Clean stores count: ${elements.length}`);
  const knownChains = ['biedronka', 'lidl', 'żabka', 'zabka', 'carrefour', 'auchan', 'dino', 'kaufland', 'stokrotka', 'netto', 'aldi', 'lewiatan', 'polomarket', 'e.leclerc', 'intermarché'];

  const filtered = elements.filter(el => {
    const tags = el.tags || {};
    if (tags['disused:shop'] || tags['abandoned:shop'] || tags.closed === 'yes') return false;

    const name = (tags.name || tags.operator || tags.brand || '').toLowerCase();
    // Must either be a recognized chain OR have a proper shop=supermarket tag
    const isChain = knownChains.some(c => name.includes(c));
    const isSupermarket = tags.shop === 'supermarket';

    return isChain || isSupermarket;
  });

  console.log(`Filtered valid stores: ${filtered.length}`);
  filtered.slice(0, 15).forEach(el => {
    const tags = el.tags || {};
    const name = tags.name || tags.operator || tags.brand || 'Supermarket';
    const lat = el.lat || (el.center && el.center.lat);
    const lon = el.lon || (el.center && el.center.lon);
    const street = tags['addr:street'] || 'no street';
    const house = tags['addr:housenumber'] || '';
    console.log(`- ${name} @ ${lat}, ${lon} (${street} ${house})`);
  });
}

testCleanStores();
