const candidateImages = {
  // --- SOUPS ---
  'borscht': 'photo-1547592166-23ac45744acd',
  'solyanka-meat': 'photo-1541832676-9b763b0239ab',
  'tom-yum-kung': 'photo-1548943487-a2e4e43b4853',
  'tonkotsu-ramen': 'photo-1569718212165-3a8278d5f624',
  'polish-zurek': 'photo-1627308595229-7830a5c91f9f',
  'mushroom-cream-soup': 'photo-1547592180-85f173990554',
  'french-onion-soup': 'photo-1583032015879-c5211b854388',
  'finnish-lohikeitto': 'photo-1519708227418-c8fd9a32b7a2',
  'andalusian-gazpacho': 'photo-1579871494447-9811cf80d66c',
  'vietnamese-pho-bo': 'photo-1582878826629-29b7ad1cdc43',
  'kharcho-beef': 'photo-1547592166-23ac45744acd',
  'pumpkin-ginger-soup': 'photo-1476718406336-bb5a9690ee2a',
  'turkish-mercimek': 'photo-1546549032-9571cd6b27df',
  'chicken-noodle-soup': 'photo-1588566565463-180a5b2090f2',
  'pea-soup-smoked-ribs': 'photo-1547592180-85f173990554',
  'minestrone-classic': 'photo-1603105037880-880cd4edfb0d',
  'ukha-classic-fish': 'photo-1534422298391-e4f8c172dddb',

  // --- BREAKFASTS ---
  'cottage-cheese-syrniki': 'photo-1598214817158-ab35506d3ff6',
  'eggs-benedict-salmon': 'photo-1608039829572-78524f79c4c7',
  'shakshuka-feta': 'photo-1590412200988-a436970781fa',
  'fluffy-pancakes': 'photo-1528207776546-365bb710ee93',
  'avocado-poached-toast': 'photo-1588137378633-dea1336ce1e2',
  'scrambled-croissant': 'photo-1555507036-ab1f4038808a',
  'french-herb-omelette': 'photo-1525351484163-7529414344d8',
  'homemade-granola-bowl': 'photo-1517673132405-a56a62b18caf',
  'full-english-breakfast': 'photo-1533089860892-a7c6f0a88666',
  'french-toast-brioche': 'photo-1484723091739-30a097e8f929',
  'chia-pudding-mango': 'photo-1511688878353-3a2f5be94cd7',

  // --- SNACKS ---
  'bruschetta-trio': 'photo-1572695157366-5e585ab2b69f',
  'beef-tartare': 'photo-1544025162-d76694265947',
  'salmon-mango-tartare': 'photo-1546069901-ba9599a7e63c',
  'classic-hummus': 'photo-1577906096429-f73c2c312435',
  'guacamole-nachos': 'photo-1541288097308-7b8e3758b456',
  'spring-rolls-shrimp': 'photo-1534422298391-e4f8c172dddb',
  'jalapeno-cheese-balls': 'photo-1562967914-608f82629710',
  'stuffed-portobello': 'photo-1504674900247-0877df9cc836',
  'beef-carpaccio': 'photo-1608897013039-887f21d8c804',
  'chicken-quesadilla': 'photo-1618040996337-56904b7850b9',
  'buffalo-chicken-wings': 'photo-1567620832903-9fc6debc209f',
  'tzatziki-dip': 'photo-1540420773420-3366772f4999',
  'caprese-skewers': 'photo-1592417817098-8f3d69109853',

  // --- MAINS ---
  'ribeye-steak': 'photo-1544025162-d76694265947',
  'beef-stroganoff': 'photo-1534939561126-855b8675edd7',
  'chicken-kiev': 'photo-1598515214211-89d3c73ae83b',
  'lasagne-bolognese': 'photo-1574894709920-11b28e7367e3',
  'uzbek-pilaf': 'photo-1563379091339-03b21ab4a4f8',
  'butter-chicken': 'photo-1588166524941-3bf61a9c41db',
  'grilled-salmon-asparagus': 'photo-1467003909585-2f8a72700288',
  'seafood-paella': 'photo-1534080564583-6be75777b70a',
  'carbonara': 'photo-1612874742237-6526221588e3',
  'porcini-risotto': 'photo-1633964913295-ceb43826e7c9',
  'moules-mariniere': 'photo-1541544741938-0af808871cc0',
  'beef-tacos': 'photo-1565299585323-38d6b0865b47',
  'veal-schnitzel': 'photo-1599921841143-8190253a93bb',
  'bbq-pork-ribs': 'photo-1529193591184-b1d58069ecdd',
  'fettuccine-alfredo': 'photo-1645112411341-6c4fd023714a',
  'hungarian-goulash': 'photo-1547592180-85f173990554',
  'sea-bass-baked': 'photo-1519708227418-c8fd9a32b7a2',
  'duck-breast-cherry': 'photo-1514944298352-f38b292e921e',
  'chicken-cordon-bleu': 'photo-1604908176997-125f25cc6f3d',
  'chicken-teriyaki-bowl': 'photo-1546069901-ba9599a7e63c',
  'spaghetti-bolognese': 'photo-1551183053-bf91a1d81141',
  'lamb-tagine': 'photo-1541518763669-27fef04b14ea',
  'chicken-fajitas': 'photo-1534080564583-6be75777b70a',

  // --- HEALTHY ---
  'tuna-poke-quinoa': 'photo-1543339308-43e59d6b73a6',
  'sous-vide-turkey-broccoli': 'photo-1532550907401-a500c9a57435',
  'salmon-edamame-bowl': 'photo-1540420773420-3366772f4999',
  'protein-oat-pancakes': 'photo-1528207776546-365bb710ee93',
  'baked-cod-ratatouille': 'photo-1519708227418-c8fd9a32b7a2',
  'nicoise-tuna-salad': 'photo-1540420773420-3366772f4999',
  'greek-quinoa-salad': 'photo-1540189549336-e6e99c3679fe',
  'chicken-sweet-potato': 'photo-1532550907401-a500c9a57435',
  'grilled-tofu-rainbow-bowl': 'photo-1512621776951-a57141f2eefd',
  'smoothie-bowl-acai': 'photo-1590301157890-4810ed352733',
  'quinoa-beet-goat-cheese': 'photo-1540420773420-3366772f4999',

  // --- FAST ---
  'teriyaki-chicken-noodles': 'photo-1552611052-33e04de081de',
  'pasta-aglio-olio': 'photo-1621996346565-e3d5d6281096',
  'croque-monsieur': 'photo-1528735602780-2552fd46c7af',
  'creamy-tuna-pasta': 'photo-1621996346565-e3d5d6281096',
  'asian-egg-fried-rice': 'photo-1603133872878-684f208fb84b',
  'garlic-butter-shrimp': 'photo-1559847844-5315695dadae',
  'sulguni-lavash-roll': 'photo-1626777552726-4a6b54c97e46',
  'caprese-quick-salad': 'photo-1592417817098-8f3d69109853',
  'couscous-sundried-tomatoes': 'photo-1540420773420-3366772f4999',
  'quesadilla-cheese-chili': 'photo-1618040996337-56904b7850b9',
  'bruschetta-prosciutto-mozzarella': 'photo-1572695157366-5e585ab2b69f',

  // --- DESSERTS ---
  'profiteroles-chocolate': 'photo-1509440159596-0249088772ff',
  'pistachio-tiramisu': 'photo-1571877227200-a0d98ea607e9',
  'berry-cheesecake': 'photo-1533134242443-d4fd215305ad'
};

async function testImages() {
  const failed = [];
  const entries = Object.entries(candidateImages);
  console.log(`Testing ${entries.length} images...`);
  for (const [id, photoId] of entries) {
    const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=600&q=80`;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (!res.ok) failed.push({ id, photoId, status: res.status });
    } catch (e) {
      failed.push({ id, photoId, error: e.message });
    }
  }
  if (failed.length === 0) {
    console.log('ALL images returned 200 OK!');
  } else {
    console.log('Failed images:', failed);
  }
}

testImages();
