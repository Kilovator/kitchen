const candidates = {
  'french-onion-soup': [
    'photo-1547592180-85f173990554',
    'photo-1541832676-9b763b0239ab',
    'photo-1582878826629-29b7ad1cdc43'
  ],
  'chicken-noodle-soup': [
    'photo-1547592180-85f173990554',
    'photo-1603105037880-880cd4edfb0d',
    'photo-1546549032-9571cd6b27df'
  ],
  'cottage-cheese-syrniki': [
    'photo-1528207776546-365bb710ee93',
    'photo-1506084868230-bb9d95c24759',
    'photo-1567620905732-2d1ec7ab7445'
  ],
  'guacamole-nachos': [
    'photo-1513456852971-30c0b8199d4d',
    'photo-1570461226513-e08b58a52c53',
    'photo-1600891964599-f61ba0e24092'
  ],
  'caprese-skewers': [
    'photo-1540420773420-3366772f4999',
    'photo-1512621776951-a57141f2eefd',
    'photo-1540189549336-e6e99c3679fe'
  ],
  'caprese-quick-salad': [
    'photo-1540189549336-e6e99c3679fe',
    'photo-1512621776951-a57141f2eefd'
  ],
  'veal-schnitzel': [
    'photo-1598515214211-89d3c73ae83b',
    'photo-1432139555190-58524dae6a55',
    'photo-1555939594-58d7cb561ad1'
  ],
  'duck-breast-cherry': [
    'photo-1544025162-d76694265947',
    'photo-1504674900247-0877df9cc836',
    'photo-1555939594-58d7cb561ad1'
  ],
  'pasta-aglio-olio': [
    'photo-1551183053-bf91a1d81141',
    'photo-1621996346565-e3d5d6281096',
    'photo-1608897013039-887f21d8c804',
    'photo-1546549032-9571cd6b27df'
  ],
  'creamy-tuna-pasta': [
    'photo-1645112411341-6c4fd023714a',
    'photo-1608897013039-887f21d8c804',
    'photo-1551183053-bf91a1d81141'
  ]
};

async function findReplacements() {
  const selected = {};
  for (const [key, list] of Object.entries(candidates)) {
    for (const photoId of list) {
      const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=600&q=80`;
      try {
        const res = await fetch(url, { method: 'HEAD' });
        if (res.ok) {
          selected[key] = photoId;
          console.log(`FOUND for ${key}: ${photoId}`);
          break;
        }
      } catch (e) {}
    }
  }
  console.log('\nFinal Replacements:');
  console.log(JSON.stringify(selected, null, 2));
}

findReplacements();
