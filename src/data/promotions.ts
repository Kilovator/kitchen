export interface PromotionItem {
  id: string;
  storeName: string;
  storeLogo: string;
  productName: { ru: string; pl: string; en: string };
  originalPrice: number;
  promoPrice: number;
  discountBadge: string;
  validUntil: string;
  category: 'healthy' | 'lunch' | 'fast' | 'breakfast' | 'dessert';
  image: string;
  recommendation: { ru: string; pl: string; en: string };
  unitWeight?: string;
}

function getFutureDate(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDynamicPromotions(): PromotionItem[] {
  return [
    // --- Biedronka ---
    {
      id: 'promo_b1',
      storeName: 'Biedronka',
      storeLogo: '🐞',
      productName: { ru: 'Оливковое масло Extra Virgin 750ml', pl: 'Oliwa z oliwek Extra Virgin 750ml', en: 'Extra Virgin Olive Oil 750ml' },
      originalPrice: 34.99,
      promoPrice: 19.99,
      discountBadge: '-42%',
      validUntil: getFutureDate(4),
      category: 'healthy',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🔥 Лучшая цена на масло для салатов и пасты', pl: '🔥 Najlepsza cena na oliwę do sałatek i dań', en: '🔥 Best deal on olive oil for salads' },
      unitWeight: '750 ml'
    },
    {
      id: 'promo_b2',
      storeName: 'Biedronka',
      storeLogo: '🐞',
      productName: { ru: 'Масло Сливочное Łaciate 200g (82%)', pl: 'Masło Ekstra Łaciate 200g (82%)', en: 'Butter Ekstra Łaciate 200g (82%)' },
      originalPrice: 7.99,
      promoPrice: 4.99,
      discountBadge: '-37%',
      validUntil: getFutureDate(3),
      category: 'breakfast',
      image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🧈 Свежее натуральное сливочное масло', pl: '🧈 Świeże naturalne masło do pieczywa', en: '🧈 Fresh natural butter for bread' },
      unitWeight: '200 g'
    },
    {
      id: 'promo_b3',
      storeName: 'Biedronka',
      storeLogo: '🐞',
      productName: { ru: 'Кофе в зернах Jacobs Krönung 1kg', pl: 'Kawa ziarnista Jacobs Krönung 1kg', en: 'Coffee Beans Jacobs Krönung 1kg' },
      originalPrice: 64.99,
      promoPrice: 39.99,
      discountBadge: '-38%',
      validUntil: getFutureDate(5),
      category: 'fast',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '☕ 100% Арабика для бодрящего утра', pl: '☕ 100% Arabica na aromatyczny poranek', en: '☕ 100% Arabica for an energetic morning' },
      unitWeight: '1 kg'
    },
    {
      id: 'promo_b4',
      storeName: 'Biedronka',
      storeLogo: '🐞',
      productName: { ru: 'Сыр Гауда Światowid 400g', pl: 'Ser Żółty Gouda Światowid 400g', en: 'Gouda Cheese Światowid 400g' },
      originalPrice: 12.99,
      promoPrice: 7.99,
      discountBadge: '-38%',
      validUntil: getFutureDate(2),
      category: 'breakfast',
      image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🧀 Нежный сыр для бутербродов и запекания', pl: '🧀 Pyszny ser gouda do kanapek i tostów', en: '🧀 Delicious gouda cheese for toasts' },
      unitWeight: '400 g'
    },

    // --- Lidl ---
    {
      id: 'promo_l1',
      storeName: 'Lidl',
      storeLogo: '🟡',
      productName: { ru: 'Свежее филе лосося атлантического 300g', pl: 'Świeży filet z łososia atlantyckiego 300g', en: 'Fresh Atlantic Salmon Fillet 300g' },
      originalPrice: 26.99,
      promoPrice: 16.49,
      discountBadge: '-38%',
      validUntil: getFutureDate(3),
      category: 'healthy',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🐟 Богатый источник Омега-3 и чистого белка', pl: '🐟 Bogate źródło kwasów Omega-3 i białka', en: '🐟 Rich in Omega-3 and healthy protein' },
      unitWeight: '300 g'
    },
    {
      id: 'promo_l2',
      storeName: 'Lidl',
      storeLogo: '🟡',
      productName: { ru: 'Филе куриной грудки Rzeźnik 1kg', pl: 'Pierś z kurczaka Rzeźnik 1kg', en: 'Chicken Breast Fillet 1kg' },
      originalPrice: 24.99,
      promoPrice: 16.99,
      discountBadge: '-32%',
      validUntil: getFutureDate(4),
      category: 'healthy',
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🍗 Высокобелковый продукт для здорового питания', pl: '🍗 Czyste białko dla sportowców i diety', en: '🍗 Pure protein for fitness and cooking' },
      unitWeight: '1 kg'
    },
    {
      id: 'promo_l3',
      storeName: 'Lidl',
      storeLogo: '🟡',
      productName: { ru: 'Свежая голубика 500g', pl: 'Borówki amerykańskie 500g', en: 'Fresh Blueberries 500g' },
      originalPrice: 18.99,
      promoPrice: 11.99,
      discountBadge: '-36%',
      validUntil: getFutureDate(2),
      category: 'healthy',
      image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🫐 Сладкие ягоды с антиоксидантами к овсянке', pl: '🫐 Świeże owoce pełne antyoksydantów', en: '🫐 Fresh antioxidant-rich berries' },
      unitWeight: '500 g'
    },
    {
      id: 'promo_l4',
      storeName: 'Lidl',
      storeLogo: '🟡',
      productName: { ru: 'Хлеб цельнозерновой BIO 400g', pl: 'Chleb czystoziarnisty BIO 400g', en: 'Whole Grain BIO Bread 400g' },
      originalPrice: 5.99,
      promoPrice: 3.99,
      discountBadge: '-33%',
      validUntil: getFutureDate(5),
      category: 'healthy',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🍞 Полезный клетчаточный хлеб без сахара', pl: '🍞 Zdrowy chleb bez dodatku cukru', en: '🍞 Healthy whole-grain fiber bread' },
      unitWeight: '400 g'
    },
    {
      id: 'promo_l5',
      storeName: 'Lidl',
      storeLogo: '🟡',
      productName: { ru: 'Исландский Скир Pilos 150g', pl: 'Skyr naturalny Pilos 150g', en: 'Icelandic Skyr Pilos 150g' },
      originalPrice: 3.49,
      promoPrice: 2.19,
      discountBadge: '-37%',
      validUntil: getFutureDate(4),
      category: 'breakfast',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🥣 18г белка в баночке без жира', pl: '🥣 Aż 18g białka w porcji 0% tłuszczu', en: '🥣 18g protein per serving 0% fat' },
      unitWeight: '150 g'
    },

    // --- Żabka ---
    {
      id: 'promo_z1',
      storeName: 'Żabka',
      storeLogo: '🐸',
      productName: { ru: 'Протеиновый батончик Go On 50g', pl: 'Baton proteinowy Go On 50g', en: 'Go On Protein Bar 50g' },
      originalPrice: 6.50,
      promoPrice: 3.99,
      discountBadge: '2 w cenie 1',
      validUntil: getFutureDate(6),
      category: 'fast',
      image: 'https://images.unsplash.com/photo-1622484210800-885100085897?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '⚡ Быстрый белковый перекус после тренировки', pl: '⚡ Szybka porcja białka po treningu', en: '⚡ Quick post-workout protein boost' },
      unitWeight: '50 g'
    },
    {
      id: 'promo_z2',
      storeName: 'Żabka',
      storeLogo: '🐸',
      productName: { ru: 'Энергетический напиток Red Bull 250ml', pl: 'Napój energetyczny Red Bull 250ml', en: 'Red Bull Energy Drink 250ml' },
      originalPrice: 7.29,
      promoPrice: 4.99,
      discountBadge: '-31%',
      validUntil: getFutureDate(3),
      category: 'fast',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '⚡ Моментальный заряд бодрости и концентрации', pl: '⚡ Dawka energii i koncentracji', en: '⚡ Instant energy & focus boost' },
      unitWeight: '250 ml'
    },
    {
      id: 'promo_z3',
      storeName: 'Żabka',
      storeLogo: '🐸',
      productName: { ru: 'Хот-Дог Гигант с соусом Kabanos', pl: 'Hot Dog Gigant z kabanosem', en: 'Giant Kabanos Hot Dog' },
      originalPrice: 9.99,
      promoPrice: 6.99,
      discountBadge: '-30%',
      validUntil: getFutureDate(2),
      category: 'fast',
      image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🌭 Легендарный горячий уличный перекус', pl: '🌭 Klasyczny ciepły przysmak w biegu', en: '🌭 Hot grab-and-go meal' },
      unitWeight: '1 szt'
    },

    // --- Carrefour ---
    {
      id: 'promo_c1',
      storeName: 'Carrefour',
      storeLogo: '🔵',
      productName: { ru: 'Спелое Авокадо Hass (пачка 2 шт)', pl: 'Dojrzałe Awokado Hass (2 szt)', en: 'Ripe Hass Avocado (2 pcs pack)' },
      originalPrice: 12.99,
      promoPrice: 7.99,
      discountBadge: '-38%',
      validUntil: getFutureDate(4),
      category: 'healthy',
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🥑 Кремовая текстура для тостов и гуакамоле', pl: '🥑 Kremowy miąższ do tostów i sałatek', en: '🥑 Creamy avocado for toasts & guacamole' },
      unitWeight: '2 szt'
    },
    {
      id: 'promo_c2',
      storeName: 'Carrefour',
      storeLogo: '🔵',
      productName: { ru: 'Бананы Premium Эквадор 1kg', pl: 'Banany Premium Ekwador 1kg', en: 'Premium Bananas 1kg' },
      originalPrice: 6.99,
      promoPrice: 3.99,
      discountBadge: '-42%',
      validUntil: getFutureDate(3),
      category: 'healthy',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🍌 Натуральный калий и энергия перед спортом', pl: '🍌 Naturalne źródło potasu i energii', en: '🍌 Great natural potassium & pre-workout fuel' },
      unitWeight: '1 kg'
    },
    {
      id: 'promo_c3',
      storeName: 'Carrefour',
      storeLogo: '🔵',
      productName: { ru: 'Сыр Моцарелла Galbani 125g', pl: 'Mozzarella Galbani 125g', en: 'Mozzarella Galbani 125g' },
      originalPrice: 5.49,
      promoPrice: 3.29,
      discountBadge: '-40%',
      validUntil: getFutureDate(5),
      category: 'breakfast',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🥗 Нежный сыр для салата Капрезе и пиццы', pl: '🥗 Idealny do sałatki Caprese i pizzy', en: '🥗 Perfect for Caprese and pizza' },
      unitWeight: '125 g'
    },

    // --- Auchan ---
    {
      id: 'promo_a1',
      storeName: 'Auchan',
      storeLogo: '🔴',
      productName: { ru: 'Итальянские спагетти Barilla n.5 500g', pl: 'Makaron Barilla Spaghetti n.5 500g', en: 'Barilla Spaghetti n.5 Pasta 500g' },
      originalPrice: 7.49,
      promoPrice: 4.49,
      discountBadge: '-40%',
      validUntil: getFutureDate(6),
      category: 'lunch',
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d628876b?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🍝 Твердые сорта пшеницы для идеального аль денте', pl: '🍝 Pszenica durum na idealne al dente', en: '🍝 100% Durum wheat for perfect al dente' },
      unitWeight: '500 g'
    },
    {
      id: 'promo_a2',
      storeName: 'Auchan',
      storeLogo: '🔴',
      productName: { ru: 'Томатный соус Mutti Polpa 400g', pl: 'Pomidory krojone Mutti Polpa 400g', en: 'Mutti Chopped Tomatoes Polpa 400g' },
      originalPrice: 7.99,
      promoPrice: 4.99,
      discountBadge: '-37%',
      validUntil: getFutureDate(5),
      category: 'lunch',
      image: 'https://images.unsplash.com/photo-1598170845058-12ef4a45753b?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🍅 Натуральные спелые итальянские томаты', pl: '🍅 Prawdziwe słodkie pomidory z Parmy', en: '🍅 Sweet ripe Italian tomatoes' },
      unitWeight: '400 g'
    },
    {
      id: 'promo_a3',
      storeName: 'Auchan',
      storeLogo: '🔴',
      productName: { ru: 'Стейк Рибай из мраморной говядины 250g', pl: 'Stek Ribeye z wołowiny sezonowanej 250g', en: 'Dry Aged Ribeye Beef Steak 250g' },
      originalPrice: 29.99,
      promoPrice: 19.99,
      discountBadge: '-33%',
      validUntil: getFutureDate(3),
      category: 'lunch',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🥩 Нежнейший мраморный стейк для гурманов', pl: '🥩 Soczysty stek o wybitnej kruchości', en: '🥩 Juicy prime marble steak' },
      unitWeight: '250 g'
    },

    // --- Dino ---
    {
      id: 'promo_d1',
      storeName: 'Dino',
      storeLogo: '🟢',
      productName: { ru: 'Свежие черри томаты 500g', pl: 'Świeże pomidorki koktajlowe 500g', en: 'Fresh Cherry Tomatoes 500g' },
      originalPrice: 9.99,
      promoPrice: 5.99,
      discountBadge: '-40%',
      validUntil: getFutureDate(3),
      category: 'healthy',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🍅 Сочные и сладкие томаты на ветке', pl: '🍅 Słodkie i chrupiące pomidorki', en: '🍅 Sweet and crunchy snack tomatoes' },
      unitWeight: '500 g'
    },
    {
      id: 'promo_d2',
      storeName: 'Dino',
      storeLogo: '🟢',
      productName: { ru: 'Свиная корейка без кости 1kg', pl: 'Schab wieprzowy bez kości 1kg', en: 'Boneless Pork Loin 1kg' },
      originalPrice: 22.99,
      promoPrice: 14.99,
      discountBadge: '-34%',
      validUntil: getFutureDate(4),
      category: 'lunch',
      image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🥩 Идеальное нежирное мясо для запекания', pl: '🥩 Wyśmienite mięso na kotlety i pieczeń', en: '🥩 Lean pork loin for roasting' },
      unitWeight: '1 kg'
    },
    {
      id: 'promo_d3',
      storeName: 'Dino',
      storeLogo: '🟢',
      productName: { ru: 'Рис Жасминовый Sonko 1kg', pl: 'Ryż Jaśminowy Sonko 1kg', en: 'Jasmine Rice Sonko 1kg' },
      originalPrice: 8.99,
      promoPrice: 5.49,
      discountBadge: '-39%',
      validUntil: getFutureDate(5),
      category: 'lunch',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🍚 Ароматный длиннозерный рис к мясным блюдам', pl: '🍚 Aromatyczny ryż do dań mięsnych', en: '🍚 Aromatic rice for wholesome dinners' },
      unitWeight: '1 kg'
    },

    // --- Kaufland ---
    {
      id: 'promo_k1',
      storeName: 'Kaufland',
      storeLogo: '🏬',
      productName: { ru: 'Яйца фермерские свободного выгула M (10 шт)', pl: 'Jajka z wolnego wybiegu M (10 szt)', en: 'Free Range Eggs M (10 pcs)' },
      originalPrice: 10.99,
      promoPrice: 6.99,
      discountBadge: '-36%',
      validUntil: getFutureDate(3),
      category: 'breakfast',
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🥚 Свежие яйца с ярким желтком для завтрака', pl: '🥚 Świeże jajka z żółtkiem do jajecznicy', en: '🥚 Fresh golden yolk eggs for breakfast' },
      unitWeight: '10 szt'
    },
    {
      id: 'promo_k2',
      storeName: 'Kaufland',
      storeLogo: '🏬',
      productName: { ru: 'Рапсовое масло Kujawski с травами 1L', pl: 'Olej rzepakowy Kujawski 1L', en: 'Rapeseed Oil Kujawski 1L' },
      originalPrice: 9.99,
      promoPrice: 6.49,
      discountBadge: '-35%',
      validUntil: getFutureDate(5),
      category: 'healthy',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🌻 Польское масло первого отжима для жарки', pl: '🌻 Polski olej tłoczony z pierwszego tłoczenia', en: '🌻 Polish cold-pressed cooking oil' },
      unitWeight: '1 L'
    },
    {
      id: 'promo_k3',
      storeName: 'Kaufland',
      storeLogo: '🏬',
      productName: { ru: 'Овсяное молоко Oatly Barista 1L', pl: 'Napój owsiany Oatly Barista 1L', en: 'Oat Milk Oatly Barista 1L' },
      originalPrice: 11.99,
      promoPrice: 7.99,
      discountBadge: '-33%',
      validUntil: getFutureDate(6),
      category: 'breakfast',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🥛 Плотная бархатная пенка для капучино', pl: '🥛 Aksamitna roślinna pianka do kawy', en: '🥛 Velvety plant milk for baristas' },
      unitWeight: '1 L'
    },

    // --- Stokrotka ---
    {
      id: 'promo_s1',
      storeName: 'Stokrotka',
      storeLogo: '🌼',
      productName: { ru: 'Яблоки Чемпион Grójeckie 1kg', pl: 'Jabłka polskie Champion 1kg', en: 'Polish Apples Champion 1kg' },
      originalPrice: 4.49,
      promoPrice: 2.49,
      discountBadge: '-44%',
      validUntil: getFutureDate(4),
      category: 'healthy',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🍎 Сладкие сочные яблоки из польских садов', pl: '🍎 Chrupiące soczyste polskie jabłka', en: '🍎 Crisp sweet local Polish apples' },
      unitWeight: '1 kg'
    },
    {
      id: 'promo_s2',
      storeName: 'Stokrotka',
      storeLogo: '🌼',
      productName: { ru: 'Творог зерненый Piątnica 200g', pl: 'Serek wiejski Piątnica 200g', en: 'Cottage Cheese Piątnica 200g' },
      originalPrice: 3.29,
      promoPrice: 2.19,
      discountBadge: '-33%',
      validUntil: getFutureDate(2),
      category: 'breakfast',
      image: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🥣 Натуральный легкий белковый завтрак', pl: '🥣 Zdrowy tradycyjny posiłek białkowy', en: '🥣 High-protein cottage cheese' },
      unitWeight: '200 g'
    },
    {
      id: 'promo_s3',
      storeName: 'Stokrotka',
      storeLogo: '🌼',
      productName: { ru: 'Шоколад горький E.Wedel 74% 100g', pl: 'Czekolada gorzka E.Wedel 74% 100g', en: 'Dark Chocolate E.Wedel 74% 100g' },
      originalPrice: 6.99,
      promoPrice: 4.49,
      discountBadge: '-36%',
      validUntil: getFutureDate(4),
      category: 'dessert',
      image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=600&auto=format&fit=crop&q=80',
      recommendation: { ru: '🍫 Настоящий бельгийский какао и антиоксиданты', pl: '🍫 Wyśmienita czekolada z głębokim smakiem', en: '🍫 Rich dark cocoa chocolate' },
      unitWeight: '100 g'
    }
  ];
}
