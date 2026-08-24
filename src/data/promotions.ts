export interface PromotionItem {
  id: string;
  storeName: string;
  storeLogo: string;
  productName: { ru: string; pl: string; en: string };
  originalPrice: number;
  promoPrice: number;
  discountBadge: string;
  validUntil: string;
  category: 'healthy' | 'lunch' | 'fast' | 'breakfast';
  image: string;
  recommendation: { ru: string; pl: string; en: string };
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
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '🔥 Лучшая цена на масло для салатов', pl: '🔥 Najlepsza cena na oliwę do sałatek', en: '🔥 Best price on salad oil' }
    },
    {
      id: 'promo_b2',
      storeName: 'Biedronka',
      storeLogo: '🐞',
      productName: { ru: 'Масло Сливочное Łaciate 200g', pl: 'Masło Ekstra Łaciate 200g', en: 'Butter Ekstra Łaciate 200g' },
      originalPrice: 7.99,
      promoPrice: 4.99,
      discountBadge: '-37%',
      validUntil: getFutureDate(3),
      category: 'breakfast',
      image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '🧈 Свежее сливочное масло к завтраку', pl: '🧈 Świeże masło do śniadań', en: '🧈 Fresh butter for breakfast' }
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
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '☕ Ароматный кофе для энергичного утра', pl: '☕ Aromatyczna kawa na poranek', en: '☕ Aromatic coffee for energetic morning' }
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
      image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '🧀 Отличный сыр для бутербродов и пасты', pl: '🧀 Pyszny ser do kanapek i makaronu', en: '🧀 Great cheese for sandwiches' }
    },

    // --- Lidl ---
    {
      id: 'promo_l1',
      storeName: 'Lidl',
      storeLogo: '🟡',
      productName: { ru: 'Свежее филе лосося (100g)', pl: 'Świeży filet z łososia (100g)', en: 'Fresh Salmon Fillet (100g)' },
      originalPrice: 8.99,
      promoPrice: 5.49,
      discountBadge: '-38%',
      validUntil: getFutureDate(3),
      category: 'healthy',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '🐟 Супер цена на Омега-3', pl: '🐟 Super cena na Omega-3', en: '🐟 Super deal on Omega-3' }
    },
    {
      id: 'promo_l2',
      storeName: 'Lidl',
      storeLogo: '🟡',
      productName: { ru: 'Филе куриной грудки Zagrodowy 1kg', pl: 'Pierś z kurczaka Zagrodowy 1kg', en: 'Chicken Breast Fillet 1kg' },
      originalPrice: 24.99,
      promoPrice: 16.99,
      discountBadge: '-32%',
      validUntil: getFutureDate(4),
      category: 'healthy',
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '🍗 Чистый белок для спортсменов', pl: '🍗 Czyste białko dla sportowców', en: '🍗 Pure protein for fitness' }
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
      image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '🫐 Свежие ягоды к овсянке и десертам', pl: '🫐 Świeże owoce do owsianki', en: '🫐 Fresh berries for oatmeal' }
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
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '🍞 Полезный клетчаточный хлеб', pl: '🍞 Zdrowy chleb bogaty w błonnik', en: '🍞 Healthy fiber-rich bread' }
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
      image: 'https://images.unsplash.com/photo-1622484210800-885100085897?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '⚡ Быстрый перекус для тренировок', pl: '⚡ Szybka przekąska po treningu', en: '⚡ Quick post-workout snack' }
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
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '⚡ Заряд бодрости на весь день', pl: '⚡ Dawka energii na cały dzień', en: '⚡ Instant energy boost' }
    },
    {
      id: 'promo_z3',
      storeName: 'Żabka',
      storeLogo: '🐸',
      productName: { ru: 'Хот-Дог Гигант с соусом', pl: 'Hot Dog Gigant z sosami', en: 'Giant Hot Dog with Sauces' },
      originalPrice: 9.99,
      promoPrice: 6.99,
      discountBadge: '-30%',
      validUntil: getFutureDate(2),
      category: 'fast',
      image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '🌭 Легендарный горячий перекус', pl: '🌭 Legenda szybkich przekąsek', en: '🌭 Famous hot street food' }
    },

    // --- Carrefour ---
    {
      id: 'promo_c1',
      storeName: 'Carrefour',
      storeLogo: '🔵',
      productName: { ru: 'Авокадо Hass (пачка 2 шт)', pl: 'Awokado Hass (paczka 2 szt)', en: 'Hass Avocado (2 pcs pack)' },
      originalPrice: 12.99,
      promoPrice: 7.99,
      discountBadge: '-38%',
      validUntil: getFutureDate(4),
      category: 'healthy',
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '🥑 Отлично к завтракам и салатам', pl: '🥑 Świetne do śniadań i sałatek', en: '🥑 Great for breakfasts & salads' }
    },
    {
      id: 'promo_c2',
      storeName: 'Carrefour',
      storeLogo: '🔵',
      productName: { ru: 'Бананы Премиум 1kg', pl: 'Banany Premium 1kg', en: 'Bananas Premium 1kg' },
      originalPrice: 6.99,
      promoPrice: 3.99,
      discountBadge: '-42%',
      validUntil: getFutureDate(3),
      category: 'healthy',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '🍌 Натуральный источник калия', pl: '🍌 Naturalne źródło potasu i energii', en: '🍌 Natural potassium & energy source' }
    },

    // --- Auchan ---
    {
      id: 'promo_a1',
      storeName: 'Auchan',
      storeLogo: '🔴',
      productName: { ru: 'Итальянские спагетти Barilla 500g', pl: 'Włoski makaron Barilla 500g', en: 'Italian Spaghetti Barilla 500g' },
      originalPrice: 7.49,
      promoPrice: 4.49,
      discountBadge: '-40%',
      validUntil: getFutureDate(6),
      category: 'lunch',
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d628876b?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '🍝 Идеально для пасты Карбонара', pl: '🍝 Idealny do makaronu Carbonara', en: '🍝 Perfect for Pasta Carbonara' }
    },
    {
      id: 'promo_a2',
      storeName: 'Auchan',
      storeLogo: '🔴',
      productName: { ru: 'Томатный соус Mutti 400g', pl: 'Przecier pomidorowy Mutti 400g', en: 'Mutti Tomato Puree 400g' },
      originalPrice: 7.99,
      promoPrice: 4.99,
      discountBadge: '-37%',
      validUntil: getFutureDate(5),
      category: 'lunch',
      image: 'https://images.unsplash.com/photo-1598170845058-12ef4a45753b?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '🍅 Натуральный итальянский томатный соус', pl: '🍅 Prawdziwy włoski przecier pomidorowy', en: '🍅 Authentic Italian tomato sauce' }
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
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '🍅 Сочные и сладкие томаты', pl: '🍅 Słodkie i soczyste pomidorki', en: '🍅 Juicy sweet cherry tomatoes' }
    },
    {
      id: 'promo_d2',
      storeName: 'Dino',
      storeLogo: '🟢',
      productName: { ru: 'Свиной корейка без кости 1kg', pl: 'Schab wieprzowy bez kości 1kg', en: 'Boneless Pork Loin 1kg' },
      originalPrice: 22.99,
      promoPrice: 14.99,
      discountBadge: '-34%',
      validUntil: getFutureDate(4),
      category: 'lunch',
      image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '🥩 Отличное мясо для запекания и отбивных', pl: '🥩 Wyśmienite mięso na schabowe', en: '🥩 Excellent pork loin for roasting' }
    },

    // --- Kaufland ---
    {
      id: 'promo_k1',
      storeName: 'Kaufland',
      storeLogo: '🏬',
      productName: { ru: 'Яйца фермерские M (10 шт)', pl: 'Jajka z wolnego wybiegu M (10 szt)', en: 'Free Range Eggs M (10 pcs)' },
      originalPrice: 10.99,
      promoPrice: 6.99,
      discountBadge: '-36%',
      validUntil: getFutureDate(3),
      category: 'breakfast',
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '🥚 Свежие яйца для омлетов и яичницы', pl: '🥚 Świeże jajka do jajecznicy i omletów', en: '🥚 Fresh eggs for omelettes' }
    },
    {
      id: 'promo_k2',
      storeName: 'Kaufland',
      storeLogo: '🏬',
      productName: { ru: 'Рапсовое масло Kujawski 1L', pl: 'Olej rzepakowy Kujawski 1L', en: 'Rapeseed Oil Kujawski 1L' },
      originalPrice: 9.99,
      promoPrice: 6.49,
      discountBadge: '-35%',
      validUntil: getFutureDate(5),
      category: 'healthy',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '🌻 Идеальное масло для жарки', pl: '🌻 Najpopularniejszy olej do smażenia', en: '🌻 Premium frying oil' }
    },

    // --- Stokrotka ---
    {
      id: 'promo_s1',
      storeName: 'Stokrotka',
      storeLogo: '🌼',
      productName: { ru: 'Яблоки Чемпион 1kg', pl: 'Jabłka polskie Champion 1kg', en: 'Polish Apples Champion 1kg' },
      originalPrice: 4.49,
      promoPrice: 2.49,
      discountBadge: '-44%',
      validUntil: getFutureDate(4),
      category: 'healthy',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '🍎 Хрустящие сочные польские яблоки', pl: '🍎 Chrupiące soczyste polskie jabłka', en: '🍎 Crispy juicy local apples' }
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
      image: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?w=300&auto=format&fit=crop&q=80',
      recommendation: { ru: '🥣 Полезный белковый перекус', pl: '🥣 Zdrowy lekki posiłek białkowy', en: '🥣 Healthy protein snack' }
    }
  ];
}
