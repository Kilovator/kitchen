import { LocalizedString } from '../types';

export interface CatalogProduct {
  id: string;
  name: LocalizedString;
  category: 'dairy' | 'meat' | 'produce' | 'bakery' | 'pantry' | 'drinks' | 'snacks' | 'frozen';
  defaultUnit: LocalizedString;
  defaultQty: number;
  marketPrice: number; // in PLN
  icon: string;
  tags: string[]; // Search keywords in PL, EN, RU
}

export const POLISH_GROCERY_CATALOG: CatalogProduct[] = [
  // --- Nabiał / Dairy ---
  {
    id: 'prod_mleko',
    name: { pl: 'Mleko świeże 3.2% (1L)', en: 'Fresh Milk 3.2% (1L)', ru: 'Молоко 3.2% (1л)' },
    category: 'dairy',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 3.79,
    icon: '🥛',
    tags: ['mleko', 'milk', 'молоко', 'laciate', 'mlekovita', 'pilos', '3.2']
  },
  {
    id: 'prod_maslo',
    name: { pl: 'Masło Ekstra 82% (200g)', en: 'Extra Butter 82% (200g)', ru: 'Масло сливочное 82% (200г)' },
    category: 'dairy',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 6.49,
    icon: '🧈',
    tags: ['maslo', 'masło', 'butter', 'масло', 'laciate', 'osełka', '82']
  },
  {
    id: 'prod_jajka',
    name: { pl: 'Jajka z wolnego wybiegu M (10 szt)', en: 'Free-range Eggs M (10 pcs)', ru: 'Яйца фермерские M (10 шт)' },
    category: 'dairy',
    defaultUnit: { pl: 'opak.', en: 'pack', ru: 'упак' },
    defaultQty: 1,
    marketPrice: 8.99,
    icon: '🥚',
    tags: ['jajka', 'jaja', 'eggs', 'яйца', 'jajko', 'ferma']
  },
  {
    id: 'prod_ser_zolty',
    name: { pl: 'Ser Żółty Gouda w plastrach (150g)', en: 'Gouda Sliced Cheese (150g)', ru: 'Сыр Гауда в нарезке (150г)' },
    category: 'dairy',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 5.49,
    icon: '🧀',
    tags: ['ser', 'zolty', 'żółty', 'cheese', 'сыр', 'gouda', 'edam', 'swiatowid']
  },
  {
    id: 'prod_twarog',
    name: { pl: 'Twaróg Półtłusty Klinek (250g)', en: 'Semi-fat Cottage Cheese (250g)', ru: 'Творог полужирный (250г)' },
    category: 'dairy',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 4.29,
    icon: '🧀',
    tags: ['twarog', 'twaróg', 'cottage', 'творог', 'chudy', 'poltlusty', 'piatnica']
  },
  {
    id: 'prod_serek_wiejski',
    name: { pl: 'Serek Wiejski Piątnica (200g)', en: 'Cottage Cheese Piątnica (200g)', ru: 'Зерненый творог Piątnica (200г)' },
    category: 'dairy',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 2.89,
    icon: '🥣',
    tags: ['serek', 'wiejski', 'piatnica', 'piątnica', 'творожный']
  },
  {
    id: 'prod_skyr',
    name: { pl: 'Jogurt Skyr Naturalny 0% (150g)', en: 'Skyr Yogurt 0% Fat (150g)', ru: 'Йогурт Скир 0% (150г)' },
    category: 'dairy',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 2.99,
    icon: '🥣',
    tags: ['skyr', 'jogurt', 'yogurt', 'йогурт', 'pilos', 'bialko', 'białko']
  },
  {
    id: 'prod_mozzarella',
    name: { pl: 'Ser Mozzarella w kulce (125g)', en: 'Mozzarella Ball (125g)', ru: 'Сыр Моцарелла (125г)' },
    category: 'dairy',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 3.49,
    icon: '🧀',
    tags: ['mozzarella', 'mocarella', 'моцарелла', 'galbani']
  },
  {
    id: 'prod_smietana',
    name: { pl: 'Śmietana 18% (330g)', en: 'Sour Cream 18% (330g)', ru: 'Сметана 18% (330г)' },
    category: 'dairy',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 3.89,
    icon: '🥛',
    tags: ['smietana', 'śmietana', 'sour cream', 'сметана', '18%']
  },

  // --- Mięso i Ryby / Meat & Fish ---
  {
    id: 'prod_kurczak_piers',
    name: { pl: 'Pierś z kurczaka świeża (500g)', en: 'Fresh Chicken Breast (500g)', ru: 'Куриное филе грудки (500г)' },
    category: 'meat',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 12.90,
    icon: '🍗',
    tags: ['kurczak', 'pierś', 'piers', 'filet', 'chicken', 'курица', 'филе', 'rzeźnik']
  },
  {
    id: 'prod_mieso_mielone',
    name: { pl: 'Mięso mielone wieprzowo-wołowe (500g)', en: 'Minced Pork & Beef (500g)', ru: 'Фарш домашний свино-говяжий (500г)' },
    category: 'meat',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 11.50,
    icon: '🥩',
    tags: ['mielone', 'mieso', 'mięso', 'minced', 'фарш', 'wieprzowina', 'wolowina']
  },
  {
    id: 'prod_schab',
    name: { pl: 'Schab wieprzowy bez kości (500g)', en: 'Boneless Pork Loin (500g)', ru: 'Свиная корейка б/к (500г)' },
    category: 'meat',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 10.90,
    icon: '🥩',
    tags: ['schab', 'wieprzowina', 'pork', 'свинина', 'kotlety']
  },
  {
    id: 'prod_wolowina_gulasz',
    name: { pl: 'Wołowina gulaszowa / na kości (400g)', en: 'Beef Stew / Bone-in (400g)', ru: 'Говядина для супа / гуляша (400г)' },
    category: 'meat',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 15.90,
    icon: '🥩',
    tags: ['wolowina', 'wołowina', 'beef', 'говядина', 'barszcz', 'stek']
  },
  {
    id: 'prod_losos',
    name: { pl: 'Filet ze świeżego łososia (200g)', en: 'Fresh Salmon Fillet (200g)', ru: 'Филе свежего лосося (200г)' },
    category: 'meat',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 15.80,
    icon: '🐟',
    tags: ['losos', 'łosoś', 'salmon', 'лосось', 'ryba', 'filet']
  },
  {
    id: 'prod_boczek',
    name: { pl: 'Boczek wędzony / parzony w plastrach (150g)', en: 'Smoked Sliced Bacon (150g)', ru: 'Бекон копченый (150г)' },
    category: 'meat',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 6.80,
    icon: '🥓',
    tags: ['boczek', 'bekon', 'bacon', 'бекон', 'carbonara', 'morliny']
  },
  {
    id: 'prod_parowki',
    name: { pl: 'Parówki Berlinki Classic (250g)', en: 'Berlinki Sausages (250g)', ru: 'Сосиски Berlinki (250г)' },
    category: 'meat',
    defaultUnit: { pl: 'opak.', en: 'pack', ru: 'упак' },
    defaultQty: 1,
    marketPrice: 5.99,
    icon: '🌭',
    tags: ['parowki', 'parówki', 'berlinki', 'sausage', 'сосиски']
  },

  // --- Warzywa i Owoce / Produce ---
  {
    id: 'prod_ziemniaki',
    name: { pl: 'Ziemniaki polskie (1 kg)', en: 'Polish Potatoes (1 kg)', ru: 'Картофель свежий (1 кг)' },
    category: 'produce',
    defaultUnit: { pl: 'kg', en: 'kg', ru: 'кг' },
    defaultQty: 1,
    marketPrice: 2.80,
    icon: '🥔',
    tags: ['ziemniaki', 'kartofle', 'potatoes', 'картофель', 'картошка', 'kg']
  },
  {
    id: 'prod_pomidory',
    name: { pl: 'Pomidory malinowe / gałązka (500g)', en: 'Fresh Tomatoes (500g)', ru: 'Помидоры свежие (500г)' },
    category: 'produce',
    defaultUnit: { pl: 'kg', en: 'kg', ru: 'кг' },
    defaultQty: 0.5,
    marketPrice: 4.90,
    icon: '🍅',
    tags: ['pomidory', 'pomidor', 'tomatoes', 'томаты', 'помидоры']
  },
  {
    id: 'prod_ogorki',
    name: { pl: 'Ogórki zielone szklarniowe (500g)', en: 'Green Cucumbers (500g)', ru: 'Огурцы свежие (500г)' },
    category: 'produce',
    defaultUnit: { pl: 'kg', en: 'kg', ru: 'кг' },
    defaultQty: 0.5,
    marketPrice: 3.80,
    icon: '🥒',
    tags: ['ogorki', 'ogórki', 'cucumber', 'огурцы']
  },
  {
    id: 'prod_cebula',
    name: { pl: 'Cebula żółta (1 kg)', en: 'Yellow Onions (1 kg)', ru: 'Лук репчатый (1 кг)' },
    category: 'produce',
    defaultUnit: { pl: 'kg', en: 'kg', ru: 'кг' },
    defaultQty: 1,
    marketPrice: 2.50,
    icon: '🧅',
    tags: ['cebula', 'onions', 'лук']
  },
  {
    id: 'prod_marchew',
    name: { pl: 'Marchew wczesna (1 kg)', en: 'Carrots (1 kg)', ru: 'Морковь свежая (1 кг)' },
    category: 'produce',
    defaultUnit: { pl: 'kg', en: 'kg', ru: 'кг' },
    defaultQty: 1,
    marketPrice: 2.90,
    icon: '🥕',
    tags: ['marchew', 'marchewka', 'carrots', 'морковь']
  },
  {
    id: 'prod_kapusta',
    name: { pl: 'Kapusta biała główka (~1 kg)', en: 'White Cabbage Head (~1 kg)', ru: 'Капуста белокочанная (~1 кг)' },
    category: 'produce',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 3.50,
    icon: '🥬',
    tags: ['kapusta', 'cabbage', 'капуста', 'barszcz']
  },
  {
    id: 'prod_buraki',
    name: { pl: 'Buraki świeże (1 kg)', en: 'Fresh Beetroots (1 kg)', ru: 'Свекла свежая (1 кг)' },
    category: 'produce',
    defaultUnit: { pl: 'kg', en: 'kg', ru: 'кг' },
    defaultQty: 1,
    marketPrice: 2.80,
    icon: '🟣',
    tags: ['buraki', 'burak', 'beets', 'beetroot', 'свекла']
  },
  {
    id: 'prod_awokado',
    name: { pl: 'Awokado Hass Ready to Eat (1 szt)', en: 'Hass Avocado (1 pc)', ru: 'Авокадо Хасс (1 шт)' },
    category: 'produce',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 4.50,
    icon: '🥑',
    tags: ['awokado', 'avocado', 'авокадо', 'hass']
  },
  {
    id: 'prod_banany',
    name: { pl: 'Banany Premium (1 kg)', en: 'Premium Bananas (1 kg)', ru: 'Бананы спелые (1 кг)' },
    category: 'produce',
    defaultUnit: { pl: 'kg', en: 'kg', ru: 'кг' },
    defaultQty: 1,
    marketPrice: 5.99,
    icon: '🍌',
    tags: ['banany', 'banan', 'banana', 'бананы']
  },
  {
    id: 'prod_jablka',
    name: { pl: 'Jabłka polskie Champion / Gala (1 kg)', en: 'Polish Apples (1 kg)', ru: 'Яблоки Чемпион (1 кг)' },
    category: 'produce',
    defaultUnit: { pl: 'kg', en: 'kg', ru: 'кг' },
    defaultQty: 1,
    marketPrice: 3.80,
    icon: '🍎',
    tags: ['jablka', 'jabłka', 'apples', 'яблоки', 'champion', 'gala']
  },
  {
    id: 'prod_cytryny',
    name: { pl: 'Cytryny świeże (500g)', en: 'Fresh Lemons (500g)', ru: 'Лимоны свежие (500г)' },
    category: 'produce',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 4.20,
    icon: '🍋',
    tags: ['cytryny', 'cytryna', 'lemons', 'лимоны']
  },
  {
    id: 'prod_czosnek',
    name: { pl: 'Czosnek polski (główka 3 szt)', en: 'Garlic (3 bulbs)', ru: 'Чеснок (3 головки)' },
    category: 'produce',
    defaultUnit: { pl: 'opak.', en: 'pack', ru: 'упак' },
    defaultQty: 1,
    marketPrice: 3.20,
    icon: '🧄',
    tags: ['czosnek', 'garlic', 'чеснок']
  },

  // --- Pieczywo / Bakery ---
  {
    id: 'prod_chleb',
    name: { pl: 'Chleb baltonowski / pszenno-żytni (500g)', en: 'Traditional Bread (500g)', ru: 'Хлеб пшенично-ржаной (500г)' },
    category: 'bakery',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 4.20,
    icon: '🍞',
    tags: ['chleb', 'bread', 'хлеб', 'baltonowski', 'zytni', 'żytni']
  },
  {
    id: 'prod_bulki',
    name: { pl: 'Bułki pszenne kajzerki (4 szt)', en: 'Kajzerki Bread Rolls (4 pcs)', ru: 'Булочки кайзерки (4 шт)' },
    category: 'bakery',
    defaultUnit: { pl: 'opak.', en: 'pack', ru: 'упак' },
    defaultQty: 1,
    marketPrice: 2.20,
    icon: '🥖',
    tags: ['bulki', 'bułki', 'kajzerki', 'rolls', 'булочки']
  },
  {
    id: 'prod_tortilla',
    name: { pl: 'Placki Tortilla pszenne 25cm (4 szt)', en: 'Wheat Tortilla Wraps (4 pcs)', ru: 'Лепешки Тортилья (4 шт)' },
    category: 'bakery',
    defaultUnit: { pl: 'opak.', en: 'pack', ru: 'упак' },
    defaultQty: 1,
    marketPrice: 4.80,
    icon: '🫓',
    tags: ['tortilla', 'tortille', 'wraps', 'тортилья', 'лаваш']
  },

  // --- Spiżarnia / Pantry ---
  {
    id: 'prod_makaron_spaghetti',
    name: { pl: 'Makaron Spaghetti Barilla (500g)', en: 'Barilla Spaghetti (500g)', ru: 'Макароны Спагетти Barilla (500г)' },
    category: 'pantry',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 4.99,
    icon: '🍝',
    tags: ['makaron', 'spaghetti', 'pasta', 'макароны', 'спагетти', 'barilla']
  },
  {
    id: 'prod_ryz',
    name: { pl: 'Ryż biały / basmati (4x100g)', en: 'Basmati Rice (4x100g)', ru: 'Рис басмати в пакетиках (4x100г)' },
    category: 'pantry',
    defaultUnit: { pl: 'opak.', en: 'pack', ru: 'упак' },
    defaultQty: 1,
    marketPrice: 4.20,
    icon: '🍚',
    tags: ['ryz', 'ryż', 'rice', 'рис', 'basmati', 'sonko']
  },
  {
    id: 'prod_oliwa',
    name: { pl: 'Oliwa z oliwek Extra Virgin (500ml)', en: 'Extra Virgin Olive Oil (500ml)', ru: 'Оливковое масло Extra Virgin (500мл)' },
    category: 'pantry',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 19.90,
    icon: '🫒',
    tags: ['oliwa', 'olive oil', 'масло оливковое', 'monini', 'extra virgin']
  },
  {
    id: 'prod_olej_kujawski',
    name: { pl: 'Olej rzepakowy Kujawski (1L)', en: 'Rapeseed Cooking Oil Kujawski (1L)', ru: 'Рапсовое масло Kujawski (1л)' },
    category: 'pantry',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 7.99,
    icon: '🌻',
    tags: ['olej', 'kujawski', 'oil', 'масло', 'rzepakowy']
  },
  {
    id: 'prod_passata',
    name: { pl: 'Przecier pomidorowy Passata Mutti (400g)', en: 'Mutti Tomato Passata (400g)', ru: 'Томатная пассата Mutti (400г)' },
    category: 'pantry',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 4.80,
    icon: '🥫',
    tags: ['passata', 'pomidory', 'mutti', 'tomato', 'томаты', 'томатная паста']
  },
  {
    id: 'prod_platki_owsiane',
    name: { pl: 'Płatki owsiane górskie (500g)', en: 'Rolled Oats (500g)', ru: 'Овсяные хлопья геркулес (500г)' },
    category: 'pantry',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 3.20,
    icon: '🥣',
    tags: ['platki', 'płatki', 'owsiane', 'oats', 'овсянка', 'kupiec']
  },
  {
    id: 'prod_kawa',
    name: { pl: 'Kawa ziarnista / mielona Jacobs (250g)', en: 'Jacobs Coffee (250g)', ru: 'Кофе молотый Jacobs (250г)' },
    category: 'pantry',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 14.50,
    icon: '☕',
    tags: ['kawa', 'coffee', 'кофе', 'jacobs', 'tchibo', 'lavazza', 'ziarnista']
  },
  {
    id: 'prod_herbata',
    name: { pl: 'Herbata czarna Lipton (50 torebek)', en: 'Lipton Black Tea (50 bags)', ru: 'Чай черный Lipton (50 пак)' },
    category: 'pantry',
    defaultUnit: { pl: 'opak.', en: 'pack', ru: 'упак' },
    defaultQty: 1,
    marketPrice: 7.90,
    icon: '🫖',
    tags: ['herbata', 'tea', 'чай', 'lipton', 'earl grey']
  },
  {
    id: 'prod_cukier',
    name: { pl: 'Cukier biały (1 kg)', en: 'White Sugar (1 kg)', ru: 'Сахар белый (1 кг)' },
    category: 'pantry',
    defaultUnit: { pl: 'kg', en: 'kg', ru: 'кг' },
    defaultQty: 1,
    marketPrice: 3.99,
    icon: '🧂',
    tags: ['cukier', 'sugar', 'сахар']
  },
  {
    id: 'prod_maka',
    name: { pl: 'Mąka pszenna tortowa typ 450 (1 kg)', en: 'Wheat Flour (1 kg)', ru: 'Мука пшеничная (1 кг)' },
    category: 'pantry',
    defaultUnit: { pl: 'kg', en: 'kg', ru: 'кг' },
    defaultQty: 1,
    marketPrice: 2.99,
    icon: '🌾',
    tags: ['maka', 'mąka', 'flour', 'мука', 'tortowa']
  },

  // --- Słodycze i Napoje / Snacks & Drinks ---
  {
    id: 'prod_czekolada',
    name: { pl: 'Czekolada gorzka / mleczna E.Wedel (100g)', en: 'Wedel Chocolate (100g)', ru: 'Шоколад E.Wedel (100г)' },
    category: 'snacks',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 4.80,
    icon: '🍫',
    tags: ['czekolada', 'chocolate', 'шоколад', 'wedel', 'milka', 'gorzka']
  },
  {
    id: 'prod_woda',
    name: { pl: 'Woda mineralna Żywiec Zdrój (1.5L)', en: 'Mineral Water (1.5L)', ru: 'Вода минеральная (1.5л)' },
    category: 'drinks',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 2.49,
    icon: '💧',
    tags: ['woda', 'water', 'вода', 'zywiec', 'cisowianka', 'niegazowana']
  },
  {
    id: 'prod_sok',
    name: { pl: 'Sok 100% Pomarańcza Tymbark (1L)', en: 'Orange Juice 100% (1L)', ru: 'Сок апельсиновый 100% (1л)' },
    category: 'drinks',
    defaultUnit: { pl: 'szt', en: 'pcs', ru: 'шт' },
    defaultQty: 1,
    marketPrice: 5.49,
    icon: '🧃',
    tags: ['sok', 'juice', 'сок', 'tymbark', 'pomaranczowy', 'jabłkowy']
  }
];

export function searchCatalogProducts(query: string, lang: 'pl' | 'en' | 'ru' = 'pl'): CatalogProduct[] {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();

  return POLISH_GROCERY_CATALOG.filter(p => {
    return (
      p.name[lang].toLowerCase().includes(q) ||
      p.name.pl.toLowerCase().includes(q) ||
      p.name.en.toLowerCase().includes(q) ||
      p.name.ru.toLowerCase().includes(q) ||
      p.tags.some(tag => tag.includes(q))
    );
  }).slice(0, 6);
}
