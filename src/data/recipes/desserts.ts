import { Recipe } from '../../types';

export const DESSERT_RECIPES: Recipe[] = [
  {
    id: "napoleon-cake",
    title: { ru: "Классический торт «Наполеон»", en: "Classic Napoleon Cake", pl: "Klasyczny Tort Napoleon" },
    category: "dessert",
    prepTime: { ru: "120 мин", en: "120 min", pl: "120 min" },
    calories: 420,
    rating: 4.98,
    difficulty: { ru: "Сложно", en: "Hard", pl: "Trudny" },
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Легендарный торт из тончайших хрустящих коржей слоеного теста, пропитанных нежнейшим ванильным кремом дипломат.",
      en: "Legendary cake made of ultra-thin crispy puff pastry layers soaked in silky vanilla diplomat custard.",
      pl: "Legendarny tort z cieniutkich chrupiących blatów francuskich nasączonych jedwabistym kremem dyplomatycznym."
    },
    ingredients: [
      { name: { ru: "Слоеное тесто", en: "Puff pastry", pl: "Ciasto francuskie" }, qty: 500, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 6.99 },
      { name: { ru: "Молоко 3.2%", en: "Whole milk 3.2%", pl: "Mleko 3.2%" }, qty: 600, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 3.49 },
      { name: { ru: "Сливочное масло 82%", en: "Butter 82%", pl: "Masło 82%" }, qty: 180, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 7.99 },
      { name: { ru: "Яичные желтки", en: "Egg yolks", pl: "Żółtka jaj" }, qty: 4, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.80 },
      { name: { ru: "Сахарная пудра", en: "Powdered sugar", pl: "Cukier puder" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 }
    ],
    steps: [
      {
        ru: "Раскатайте слоеное тесто тонкими коржами (около 1.5 мм), наколите вилкой и выпекайте при 200°C по 8-10 минут до золотистого цвета.",
        en: "Roll out puff pastry very thinly (approx 1.5 mm), prick with a fork, and bake at 200°C for 8-10 mins until golden.",
        pl: "Rozwałkuj ciasto francuskie bardzo cienko (ok. 1.5 mm), nakłuj widelcem i piecz w 200°C przez 8-10 minut na złoty kolor."
      },
      {
        ru: "Приготовьте заварной крем: взбейте желтки с сахаром и кукурузным крахмалом, влейте горячее молоко и варите до загустения, затем взбейте со сливочным маслом.",
        en: "Make the custard: whisk yolks with sugar and cornstarch, temper with hot milk, simmer until thick, then beat in butter.",
        pl: "Przygotuj krem budyniowy: utrzyj żółtka z cukrem i skrobią, zalej gorącym mlekiem, gotuj do zgęstnienia, a potem ubij z masłem."
      },
      {
        ru: "Соберите торт, прослаивая каждый корж кремом. Верх и бока посыпьте измельченной крошкой и отправьте в холодильник на 8 часов для пропитки.",
        en: "Assemble cake by layering pastry sheets with custard. Coat top and sides with crumbled pastry and chill for 8 hours.",
        pl: "Złóż tort przekładając blaty kremem. Wierzch i boki posyp okruchami i wstaw do lodówki na 8 godzin do nasączenia."
      }
    ]
  },
  {
    id: "medovik-cake",
    title: { ru: "Домашний Медовик со сметанным кремом", en: "Traditional Honey Cake Medovik", pl: "Tradycyjny Miodownik z kremem śmietankowym" },
    category: "dessert",
    prepTime: { ru: "90 мин", en: "90 min", pl: "90 min" },
    calories: 395,
    rating: 4.96,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Ароматный многослойный медовый торт с нежнейшим кремом из домашней сметаны и ванили.",
      en: "Fragrant multi-layer honey cake layered with tangy-sweet sour cream and vanilla frosting.",
      pl: "Aromatyczne wielowarstwowe ciasto miodowe przełożone aksamitnym kremem ze śmietany i wanilii."
    },
    ingredients: [
      { name: { ru: "Натуральный мед", en: "Natural honey", pl: "Miód naturalny" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.50 },
      { name: { ru: "Сметана 24-30%", en: "Sour cream 24-30%", pl: "Śmietana 24-30%" }, qty: 500, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 6.20 },
      { name: { ru: "Мука пшеничная", en: "Wheat flour", pl: "Mąka pszenna" }, qty: 380, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.10 },
      { name: { ru: "Сливочное масло", en: "Butter", pl: "Masło" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Сахар", en: "Sugar", pl: "Cukier" }, qty: 160, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.80 }
    ],
    steps: [
      {
        ru: "Растопите на водяной бане мед, сливочное масло и сахар с содой до карамельного цвета и пышной пены.",
        en: "Melt honey, butter, and sugar with baking soda over a water bath until foaming and golden amber.",
        pl: "Rozpuść w kąpieli wodnej miód, masło i cukier z sodą aż do uzyskania bursztynowej piany."
      },
      {
        ru: "Замесите мягкое тесто с яйцами и мукой, разделите на 8-10 равных частей и раскатайте тонкие коржи. Выпекайте при 180°C по 4-5 минут.",
        en: "Knead soft dough with eggs and flour, divide into 8-10 balls, roll thin layers and bake at 180°C for 4-5 mins each.",
        pl: "Zagnieć miękkie ciasto z jajkami i mąką, podziel na 8-10 części, rozwałkuj i piecz w 180°C po 4-5 minut."
      },
      {
        ru: "Взбейте охлажденную жирную сметану с сахарной пудрой. Соберите торт, смазывая каждый корж, и посыпьте крошкой.",
        en: "Whisk cold sour cream with powdered sugar. Stack layers generously with cream and coat with ground crumbs.",
        pl: "Ubij schłodzoną gęstą śmietanę z cukrem pudrem. Przełóż warstwy kremem i posyp zmielonymi okruchami."
      }
    ]
  },
  {
    id: "red-velvet-cake",
    title: { ru: "Торт «Красный бархат» с крем-чизом", en: "Red Velvet Cake with Cream Cheese", pl: "Tort Red Velvet z kremem śmietankowym" },
    category: "dessert",
    prepTime: { ru: "75 мин", en: "75 min", pl: "75 min" },
    calories: 440,
    rating: 4.95,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Бархатистые ярко-красные шоколадные коржи в гармонии с белоснежным кремом из сливочного сыра Маскарпоне.",
      en: "Velvety crimson cocoa sponge paired harmoniously with a snowy mascarpone and cream cheese frosting.",
      pl: "Aksamitne rubinowe biszkopty kakaowe w połączeniu ze śnieżnobiałym kremem na bazie serka śmietankowego."
    },
    ingredients: [
      { name: { ru: "Сливочный сыр Филадельфия", en: "Cream cheese", pl: "Serek śmietankowy" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 9.80 },
      { name: { ru: "Сливки 33%", en: "Heavy cream 33%", pl: "Śmietanka 33%" }, qty: 200, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 4.90 },
      { name: { ru: "Мука пшеничная", en: "Flour", pl: "Mąka" }, qty: 320, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.90 },
      { name: { ru: "Какао-порошок", en: "Cocoa powder", pl: "Kakao w proszku" }, qty: 20, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 },
      { name: { ru: "Кефир или пахта", en: "Buttermilk", pl: "Maślanka" }, qty: 250, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.50 }
    ],
    steps: [
      {
        ru: "Смешайте сухие ингредиенты: муку, какао, разрыхлитель и щепотку соли.",
        en: "Sift together dry ingredients: flour, cocoa, baking powder, and a pinch of salt.",
        pl: "Przesiej suche składniki: mąkę, kakao, proszek do pieczenia i szczyptę soli."
      },
      {
        ru: "Взбейте сливочное масло с сахаром, добавьте яйца, пахту с красным красителем. Соедините с сухими ингредиентами и выпекайте при 170°C 35 минут.",
        en: "Beat butter with sugar, add eggs, colored buttermilk, and combine. Bake in 2 cake tins at 170°C for 35 mins.",
        pl: "Ubij masło z cukrem, dodaj jajka, maślankę z barwnikiem i połącz. Piecz w 170°C przez 35 minut."
      },
      {
        ru: "Взбейте сливочный сыр со сливками и пудрой. Соберите торт и украсьте крошкой от обрезков коржей.",
        en: "Whisk cream cheese with cold heavy cream and icing sugar. Layer sponge cakes and decorate with velvet crumbs.",
        pl: "Ubij serek ze śmietanką i cukrem pudrem. Przełóż biszkopty i udekoruj czerwoną posypką z ciasta."
      }
    ]
  },
  {
    id: "basque-cheesecake",
    title: { ru: "Баскский обожженный чизкейк Сан-Себастьян", en: "San Sebastian Basque Burnt Cheesecake", pl: "Baskijski sernik San Sebastian" },
    category: "dessert",
    prepTime: { ru: "50 мин", en: "50 min", pl: "50 min" },
    calories: 460,
    rating: 4.99,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Трендовый испанский чизкейк с карамельной обожженной корочкой и текучей кремовой сердцевиной.",
      en: "Famous Spanish cheesecake baked at high heat with a deeply caramelized crust and molten creamy center.",
      pl: "Słynny hiszpański sernik pieczony w wysokiej temperaturze ze skarmelizowaną skórką i płynnym kremowym środkiem."
    },
    ingredients: [
      { name: { ru: "Сливочный сыр Филадельфия", en: "Cream cheese", pl: "Serek Philadelphia" }, qty: 600, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 14.50 },
      { name: { ru: "Сливки 33-36%", en: "Heavy whipping cream", pl: "Śmietanka 36%" }, qty: 350, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 7.90 },
      { name: { ru: "Яйца куриные", en: "Large eggs", pl: "Jajka" }, qty: 4, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 4.20 },
      { name: { ru: "Сахар", en: "Granulated sugar", pl: "Cukier" }, qty: 160, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.80 },
      { name: { ru: "Кукурузный крахмал", en: "Cornstarch", pl: "Skrobia kukurydziana" }, qty: 25, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.20 }
    ],
    steps: [
      {
        ru: "Смешайте сливочный сыр комнатной температуры с сахаром до однородности лопаткой (не взбивая сильно).",
        en: "Gently stir room temperature cream cheese with sugar until smooth without incorporating too much air.",
        pl: "Wymieszaj serek śmietankowy w temperaturze pokojowej z cukrem na gładką masę bez napowietrzania."
      },
      {
        ru: "По одному введите яйца, влейте жирные сливки, ваниль и просеянный крахмал.",
        en: "Add eggs one by one, pour in heavy cream, pure vanilla, and sifted cornstarch.",
        pl: "Dodawaj po jednym jajku, wlej śmietankę, wanilię oraz przesianą skrobię."
      },
      {
        ru: "Застелите форму скомканным пергаментом, вылейте тесто и запекайте при 230-240°C 25-28 минут до темной корочки.",
        en: "Line cake tin with crumpled parchment, pour batter, and bake at 230-240°C for 25-28 mins until deeply browned.",
        pl: "Wyłóż formę pogniecionym papierem, wlej masę i piecz w 230-240°C przez 25-28 minut na ciemny kolor."
      }
    ]
  },
  {
    id: "prague-cake",
    title: { ru: "Шоколадный торт «Прага»", en: "Classic Prague Chocolate Cake", pl: "Tort Czekoladowy Praga" },
    category: "dessert",
    prepTime: { ru: "80 мин", en: "80 min", pl: "80 min" },
    calories: 430,
    rating: 4.93,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Насыщенный шоколадный бисквит, заварной масляный крем на желтках и глянцевая темная шоколадная глазурь.",
      en: "Rich chocolate sponge layered with custard buttercream and enrobed in glossy dark chocolate ganache.",
      pl: "Głęboki czekoladowy biszkopt z kremem maślanym na żółtkach i lśniącą polewą z gorzkiej czekolady."
    },
    ingredients: [
      { name: { ru: "Горький шоколад 70%", en: "Dark chocolate 70%", pl: "Gorzka czekolada 70%" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 6.90 },
      { name: { ru: "Сливочное масло", en: "Butter", pl: "Masło" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 7.50 },
      { name: { ru: "Сгущенное молоко", en: "Condensed milk", pl: "Mleko skondensowane" }, qty: 120, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Абрикосовый джем", en: "Apricot jam", pl: "Dżem morelowy" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.80 },
      { name: { ru: "Мука пшеничная", en: "Flour", pl: "Mąka" }, qty: 120, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.20 }
    ],
    steps: [
      {
        ru: "Испеките шоколадный бисквит: взбейте белки с сахаром, соедините с желтками, какао и растопленным маслом, выпекайте при 180°C 30 минут.",
        en: "Bake chocolate sponge: whip egg whites with sugar, fold in yolks, cocoa, and melted butter. Bake at 180°C for 30 mins.",
        pl: "Upiecz biszkopt czekoladowy: ubij białka z cukrem, wymieszaj z żółtkami, kakao i masłem, piecz w 180°C przez 30 minut."
      },
      {
        ru: "Приготовьте крем Пражский: уварите желток с водой и сгущенкой, остудите и взбейте со сливочным маслом и какао.",
        en: "Prepare custard cream: thicken yolk with water and condensed milk, cool down, then beat with softened butter and cocoa.",
        pl: "Przygotuj krem: zagotuj żółtko z wodą i mlekiem skondensowanym, ostudź i ubij z masłem oraz kakao."
      },
      {
        ru: "Разрежьте бисквит на 3 коржа, промажьте кремом. Верх смажьте абрикосовым джемом и залейте теплой шоколадной глазурью.",
        en: "Slice cake into 3 layers, spread cream inside. Glaze top with warm apricot jam and pour dark chocolate ganache.",
        pl: "Przekrój biszkopt na 3 blaty, przełóż kremem. Wierzch posmaruj dżemem morelowym i polej polewą czekoladową."
      }
    ]
  },
  {
    id: "tiramisu-classico",
    title: { ru: "Итальянский Тирамису на Савоярди", en: "Classic Italian Tiramisu", pl: "Klasyczne Włoskie Tiramisu" },
    category: "dessert",
    prepTime: { ru: "35 мин", en: "35 min", pl: "35 min" },
    calories: 360,
    rating: 4.97,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Знаменитый венецианский десерт с нежным кремом Маскарпоне, печеньем Савоярди и ароматным эспрессо.",
      en: "Famous Venetian dessert with velvety mascarpone cream, savoiardi ladyfingers soaked in espresso, and cocoa.",
      pl: "Klasyczny włoski deser z aksamitnym kremem z mascarpone, biszkoptami savoiardi nasączonymi espresso i kakao."
    },
    ingredients: [
      { name: { ru: "Сыр Маскарпоне", en: "Mascarpone cheese", pl: "Serek Mascarpone" }, qty: 500, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 11.90 },
      { name: { ru: "Печенье Савоярди", en: "Savoiardi Ladyfingers", pl: "Biszkopty Savoiardi" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 6.50 },
      { name: { ru: "Яичные желтки", en: "Egg yolks", pl: "Żółtka jaj" }, qty: 4, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.80 },
      { name: { ru: "Свежесваренный эспрессо", en: "Fresh espresso", pl: "Świeże espresso" }, qty: 250, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 3.00 },
      { name: { ru: "Какао-порошок", en: "Cocoa powder", pl: "Kakao" }, qty: 25, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.10 }
    ],
    steps: [
      {
        ru: "Взбейте желтки с сахаром на водяной бане до пышной светлой пены, остудите и бережно вмешайте маскарпоне.",
        en: "Whisk egg yolks with sugar over a double boiler until pale and creamy, cool and gently fold in mascarpone.",
        pl: "Ubij żółtka z cukrem w kąpieli wodnej na puszysty krem, ostudź i delikatnie wymieszaj z mascarpone."
      },
      {
        ru: "Быстро обмакните печенье Савоярди в остывший кофе и выложите первый слой в форму.",
        en: "Briefly dip savoiardi ladyfingers into cooled espresso and arrange a dense bottom layer.",
        pl: "Krótko zanurzaj biszkopty w ostudzonym espresso i ułóż pierwszą warstwę w formie."
      },
      {
        ru: "Покройте кремом, повторите слой печенья и завершите кремом. Уберите в холод на 4 часа, перед подачей щедро посыпьте какао.",
        en: "Spread half the cream, repeat ladyfingers, top with remaining cream, chill 4 hours, and dust with cocoa powder.",
        pl: "Przykryj kremem, ułóż drugą warstwę biszkoptów i krem. Schładzaj 4 godziny, przed podaniem posyp kakao."
      }
    ]
  },
  {
    id: "chocolate-fondant",
    title: { ru: "Шоколадный фондан с жидким центром", en: "Molten Lava Chocolate Fondant", pl: "Czekoladowy Fondant z płynnym środkiem" },
    category: "dessert",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 410,
    rating: 4.98,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Изысканный французский десерт с запеченными краями кекса и горячим шоколадом внутри. Подается с шариком мороженого.",
      en: "Decadent French dessert with baked chocolate cake crust and warm liquid chocolate center. Serve with vanilla gelato.",
      pl: "Wykwintne ciastko z chrupiącą czekoladową skorupką i gorącą płynną czekoladą w środku. Podawaj z lodami waniliowymi."
    },
    ingredients: [
      { name: { ru: "Темный шоколад 70%", en: "Dark chocolate 70%", pl: "Czekolada gorzka 70%" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.90 },
      { name: { ru: "Сливочное масло 82%", en: "Butter 82%", pl: "Masło 82%" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Яйца куриные", en: "Eggs", pl: "Jajka" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.10 },
      { name: { ru: "Сахар", en: "Sugar", pl: "Cukier" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 0.80 },
      { name: { ru: "Мука пшеничная", en: "Flour", pl: "Mąka" }, qty: 30, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 0.50 }
    ],
    steps: [
      {
        ru: "Растопите темный шоколад со сливочным маслом на водяной бане до блеска.",
        en: "Melt dark chocolate with butter over a gentle water bath until glossy and smooth.",
        pl: "Rozpuść gorzką czekoladę z masłem w kąpieli wodnej na jednolitą masę."
      },
      {
        ru: "Взбейте яйца с сахаром, влейте шоколадную смесь и добавьте просеянную муку.",
        en: "Whisk eggs with sugar until frothy, fold in chocolate mix, and stir in sifted flour.",
        pl: "Ubij jajka z cukrem, wlej masę czekoladową i wmieszaj przesianą mąkę."
      },
      {
        ru: "Разлейте по смазанным формочкам и выпекайте ровно 8-9 минут при 200°C. Подавайте сразу.",
        en: "Pour into buttered ramekins and bake for exactly 8-9 minutes at 200°C. Serve immediately warm.",
        pl: "Wlej do foremek wysmarowanych masłem i piecz dokładnie 8-9 minut w 200°C. Podawaj od razu na ciepło."
      }
    ]
  },
  {
    id: "french-eclairs",
    title: { ru: "Французские эклеры с ванильным кремом", en: "French Vanilla Custard Eclairs", pl: "Francuskie Eklerki z kremem waniliowym" },
    category: "dessert",
    prepTime: { ru: "60 мин", en: "60 min", pl: "60 min" },
    calories: 280,
    rating: 4.92,
    difficulty: { ru: "Сложно", en: "Hard", pl: "Trudny" },
    image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Хрустящие продолговатые пирожные из заварного теста, наполненные сливочным кремом и покрытые шоколадом.",
      en: "Crisp choux pastry fingers filled with rich vanilla bean pastry cream and glazed with dark chocolate.",
      pl: "Chrupiące ciastka parzone wypełnione aksamitnym kremem budyniowym i polane gorzką czekoladą."
    },
    ingredients: [
      { name: { ru: "Сливочное масло", en: "Butter", pl: "Masło" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Мука пшеничная", en: "Flour", pl: "Mąka" }, qty: 120, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.20 },
      { name: { ru: "Яйца", en: "Eggs", pl: "Jajka" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.00 },
      { name: { ru: "Молоко", en: "Milk", pl: "Mleko" }, qty: 300, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 1.90 },
      { name: { ru: "Шоколад для глазури", en: "Chocolate glaze", pl: "Czekolada do polewy" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.80 }
    ],
    steps: [
      {
        ru: "Заварите тесто: вскипятите воду с маслом, всыпьте муку и вымешивайте на огне 2 минуты, затем по одному введите яйца.",
        en: "Make choux pastry: boil water with butter, stir in flour, cook 2 mins, then beat in eggs one at a time.",
        pl: "Zaparz ciasto: zagotuj wodę z masłem, wsyp mąkę, ucieraj 2 minuty na ogniu, następnie stopniowo dodawaj jajka."
      },
      {
        ru: "Отсадите эклеры кондитерским мешком и выпекайте 20 минут при 200°C, затем 10 минут при 160°C без открытия духовки.",
        en: "Pipe eclairs onto baking sheet and bake 20 mins at 200°C, then reduce to 160°C for 10 mins without opening door.",
        pl: "Wyciskaj eklerki rękawem i piecz 20 minut w 200°C, a potem 10 minut w 160°C bez otwierania piekarnika."
      },
      {
        ru: "Наполните остывшие эклеры ванильным кремом патисьер и окуните верхушки в растопленный шоколад.",
        en: "Fill cooled pastry shells with vanilla creme patissiere and dip tops into warm melted chocolate glaze.",
        pl: "Nadziewaj ostudzone eklerki kremem waniliowym i zanurzaj wierzch w ciepłej polewie czekoladowej."
      }
    ]
  },
  {
    id: "apple-strudel",
    title: { ru: "Венский яблочный штрудель с корицей", en: "Viennese Apple Strudel with Cinnamon", pl: "Wiedeński Strudel Jabłkowy z cynamonem" },
    category: "dessert",
    prepTime: { ru: "65 мин", en: "65 min", pl: "65 min" },
    calories: 290,
    rating: 4.90,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Традиционная австрийская выпечка из тончайшего вытяжного теста со спелыми яблоками, изюмом и грецкими орехами.",
      en: "Traditional Austrian pastry made with paper-thin stretched dough stuffed with sweet-tart apples, raisins, and walnuts.",
      pl: "Tradycyjne ciasto austriackie z cieniutkiego ciasta ciągnionego z soczystymi jabłkami, rodzynkami i orzechami."
    },
    ingredients: [
      { name: { ru: "Свежие яблоки", en: "Baking apples", pl: "Jabłka szare renety" }, qty: 600, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.60 },
      { name: { ru: "Тесто фило / вытяжное", en: "Phyllo pastry", pl: "Ciasto filo" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.90 },
      { name: { ru: "Сливочное масло", en: "Melted butter", pl: "Masło rozpuszczone" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Грецкие орехи", en: "Walnuts", pl: "Orzechy włoskie" }, qty: 50, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.80 },
      { name: { ru: "Корица и сахар", en: "Cinnamon and sugar", pl: "Cynamon i cukier" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 }
    ],
    steps: [
      {
        ru: "Нарежьте яблоки тонкими ломтиками, смешайте с корицей, сахаром, изюмом и дроблеными орехами.",
        en: "Thinly slice peeled apples and toss with cinnamon, sugar, raisins, and chopped toasted walnuts.",
        pl: "Pokrój jabłka w plasterki, wymieszaj z cynamonem, cukrem, rodzynkami i posiekanymi orzechami."
      },
      {
        ru: "Смажьте слои теста растопленным маслом, выложите яблочную начинку и аккуратно сверните рулет при помощи полотенца.",
        en: "Brush dough sheets with melted butter, spread apple filling, and gently roll using a tea towel.",
        pl: "Posmaruj płaty ciasta masłem, wyłóż jabłka i ostrożnie zwiń w roladę przy pomocy ściereczki."
      },
      {
        ru: "Выпекайте при 190°C около 35 минут до румяной корочки. Подавайте теплым с сахарной пудрой.",
        en: "Bake at 190°C for roughly 35 minutes until golden and crisp. Dust with powdered sugar.",
        pl: "Piecz w 190°C przez ok. 35 minut do zrumienienia. Posyp cukrem pudrem i podawaj na ciepło."
      }
    ]
  },
  {
    id: "fudgy-brownie",
    title: { ru: "Шоколадный фадж-брауни с соленой карамелью", en: "Fudgy Chocolate Brownie with Salted Caramel", pl: "Czekoladowe Brownie z solonym karmelem" },
    category: "dessert",
    prepTime: { ru: "35 мин", en: "35 min", pl: "35 min" },
    calories: 380,
    rating: 4.96,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Тягучий шоколадный десерт с глянцевой хрустящей корочкой и насыщенным вкусом темного бельгийского шоколада.",
      en: "Chewy, dense chocolate squares with a crinkly paper-thin top and luscious salted caramel swirls.",
      pl: "Gęste, wilgotne ciasto czekoladowe z chrupiącą popękaną skórką i wstęgami słonego karmelu."
    },
    ingredients: [
      { name: { ru: "Темный шоколад", en: "Dark chocolate", pl: "Czekolada gorzka" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 7.90 },
      { name: { ru: "Сливочное масло", en: "Butter", pl: "Masło" }, qty: 120, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.90 },
      { name: { ru: "Тростниковый сахар", en: "Brown sugar", pl: "Cukier trzcinowy" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.80 },
      { name: { ru: "Яйца", en: "Eggs", pl: "Jajka" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.00 },
      { name: { ru: "Морская соль", en: "Sea salt flakes", pl: "Płatki soli morskiej" }, qty: 5, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 0.80 }
    ],
    steps: [
      {
        ru: "Растопите шоколад с маслом, остудите 5 минут. Взбейте яйца с сахаром 4 минуты до пышности для образования корочки.",
        en: "Melt chocolate with butter. Beat eggs and sugar vigorously for 4 minutes until pale to ensure a shiny crinkle top.",
        pl: "Rozpuść czekoladę z masłem. Ubijaj jajka z cukrem przez 4 minuty, aby powstała charakterystyczna skorupka."
      },
      {
        ru: "Аккуратно соедините шоколад с яйцами и добавьте муку с солью.",
        en: "Fold chocolate gently into the eggs, then fold in flour and sea salt flakes.",
        pl: "Delikatnie połącz czekoladę z masą jajeczną, dodaj mąkę oraz szczyptę soli."
      },
      {
        ru: "Выпекайте при 175°C 22-25 минут (не пересушивайте, серединка должна оставаться влажной).",
        en: "Bake at 175°C for 22-25 minutes. Center must remain soft and fudgy.",
        pl: "Piecz w 175°C przez 22-25 minut, uważając, aby środek pozostał wilgotny."
      }
    ]
  },
  {
    id: "carrot-cake",
    title: { ru: "Пряный морковный торт с пеканом", en: "Spiced Carrot Cake with Pecans", pl: "Ciasto Marchewkowe z orzechami pekan" },
    category: "dessert",
    prepTime: { ru: "60 мин", en: "60 min", pl: "60 min" },
    calories: 370,
    rating: 4.94,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Невероятно сочный бисквит со свежей морковью, мускатным орехом, корицей и воздушным сливочным кремом.",
      en: "Ultra-moist spiced cake studded with sweet shredded carrots, crunchy pecans, and smooth cream cheese frosting.",
      pl: "Niezwykle wilgotne ciasto korzenne ze świeżą marchewką, orzechami i kremem z serka śmietankowego."
    },
    ingredients: [
      { name: { ru: "Морковь тертая", en: "Grated carrots", pl: "Starta marchew" }, qty: 300, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.80 },
      { name: { ru: "Орехи пекан или грецкие", en: "Pecans or walnuts", pl: "Orzechy pekan lub włoskie" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.50 },
      { name: { ru: "Сливочный сыр", en: "Cream cheese", pl: "Serek śmietankowy" }, qty: 300, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 7.20 },
      { name: { ru: "Мука и пряности", en: "Flour & spices", pl: "Mąka i przyprawy korzenne" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 },
      { name: { ru: "Растительное масло", en: "Vegetable oil", pl: "Olej roślinny" }, qty: 150, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 1.60 }
    ],
    steps: [
      {
        ru: "Смешайте муку с корицей, имбирем и мускатным орехом. Взбейте яйца с сахаром и маслом.",
        en: "Whisk flour with cinnamon, ginger, and nutmeg. Beat eggs with brown sugar and oil.",
        pl: "Wymieszaj mąkę z cynamonem, imbirem i gałką. Ubij jajka z cukrem i olejem."
      },
      {
        ru: "Вмешайте тертую морковь и орехи. Выпекайте при 180°C 40 минут.",
        en: "Fold in grated carrots and chopped nuts. Bake at 180°C for 40 minutes.",
        pl: "Dodaj startą marchewkę i orzechy. Piecz w 180°C przez 40 minut."
      },
      {
        ru: "Остывший бисквит покройте кремом из сливочного сыра с сахарной пудрой и украсьте орехами.",
        en: "Frost cooled cake with whipped cream cheese and powdered sugar, garnish with pecans.",
        pl: "Ostudzone ciasto posmaruj kremem z serka i cukru pudru, udekoruj orzechami."
      }
    ]
  },
  {
    id: "lemon-meringue-tart",
    title: { ru: "Лимонный тарт с обожженной меренгой", en: "Lemon Meringue Tart", pl: "Tarta Cytrynowa z bezą" },
    category: "dessert",
    prepTime: { ru: "65 мин", en: "65 min", pl: "65 min" },
    calories: 320,
    rating: 4.95,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Хрустящая песочная основа с ярким кисло-сладким лимонным курдом под шапкой шелковистой итальянской меренги.",
      en: "Buttery crisp tart shell filled with zesty lemon curd topped with cloud-like toasted Italian meringue.",
      pl: "Kruchy maślany spód wypełniony orzeźwiającym kremem cytrynowym pod puszystą opalaną bezą."
    },
    ingredients: [
      { name: { ru: "Лимоны свежие (сок и цедра)", en: "Fresh lemons", pl: "Cytryny świeże" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.50 },
      { name: { ru: "Сливочное масло", en: "Butter", pl: "Masło" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 6.20 },
      { name: { ru: "Песочное тесто", en: "Shortcrust pastry", pl: "Ciasto kruche" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Яичные белки", en: "Egg whites", pl: "Białka jaj" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.00 },
      { name: { ru: "Сахар", en: "Sugar", pl: "Cukier" }, qty: 180, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.90 }
    ],
    steps: [
      {
        ru: "Испеките песочную основу для тарта вслепую (с грузом) при 180°C 20 минут.",
        en: "Blind bake tart shell with pie weights at 180°C for 20 mins until crisp and golden.",
        pl: "Upiecz kruchy spód z obciążeniem w 180°C przez 20 minut na złocisty kolor."
      },
      {
        ru: "Сварите лимонный курд: прогрейте сок и цедру с желтками и сахаром до загустения, вмешайте сливочное масло и вылейте в основу.",
        en: "Cook lemon curd: thicken lemon juice, zest, yolks, and sugar; beat in butter and fill tart.",
        pl: "Ugotuj curd: podgrzewaj sok z cytryny z żółtkami i cukrem, dodaj masło i wlej do spodu."
      },
      {
        ru: "Взбейте белки с горячим сахарным сиропом до плотной глянцевой меренги, выложите на тарт и обожгите горелкой.",
        en: "Whip egg whites with hot sugar syrup into glossy meringue, pipe onto tart, and scorch with a kitchen torch.",
        pl: "Ubij białka z gorącym syropem na bezę włoską, wyłóż na tartę i opal palnikiem."
      }
    ]
  },
  {
    id: "panna-cotta",
    title: { ru: "Ванильная панна-котта с малиновым кули", en: "Vanilla Panna Cotta with Raspberry Coulis", pl: "Waniliowa Panna Cotta z sosem malinowym" },
    category: "dessert",
    prepTime: { ru: "25 мин", en: "25 min", pl: "25 min" },
    calories: 260,
    rating: 4.91,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Нежнейший сливочный итальянский десерт с натуральной стручковой ванилью и ягодным малиновым соусом.",
      en: "Silky, delicate Italian cream dessert infused with real vanilla bean and topped with tart raspberry coulis.",
      pl: "Aksamitny włoski deser śmietankowy z prawdziwą wanilią i orzeźwiającym sosem malinowym."
    },
    ingredients: [
      { name: { ru: "Сливки 30-33%", en: "Heavy cream", pl: "Śmietanka 30%" }, qty: 400, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 6.50 },
      { name: { ru: "Свежая или замороженная малина", en: "Raspberries", pl: "Maliny" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 6.90 },
      { name: { ru: "Желатин листовой", en: "Gelatin sheets", pl: "Żelatyna w listkach" }, qty: 8, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 },
      { name: { ru: "Стручок ванили", en: "Vanilla bean", pl: "Laska wanilii" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 4.50 },
      { name: { ru: "Сахар", en: "Sugar", pl: "Cukier" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 0.90 }
    ],
    steps: [
      {
        ru: "Замочите желатин в холодной воде. Нагрейте сливки с сахаром и семенами ванили почти до кипения.",
        en: "Soak gelatin in cold water. Gently heat cream with sugar and split vanilla bean until steaming.",
        pl: "Namocz żelatynę w zimnej wodzie. Podgrzej śmietankę z cukrem i ziarenkami wanilii."
      },
      {
        ru: "Растворите отжатый желатин в горячих сливках, разлейте по бокалам и охладите 3 часа.",
        en: "Stir squeezed gelatin into hot cream until dissolved, pour into glasses, and chill for 3 hours.",
        pl: "Rozpuść żelatynę w śmietance, rozlej do pucharków i chłodź w lodówce przez 3 godziny."
      },
      {
        ru: "Пробейте малину блендером с ложкой сахара, протрите через сито и полейте застывшую панна-котту.",
        en: "Puree raspberries with sugar, strain through a fine sieve, and spoon over chilled panna cotta.",
        pl: "Zblenduj maliny z odrobiną cukru, przetrzyj przez sitko i polej gotową panna cottę."
      }
    ]
  },
  {
    id: "belgian-waffles",
    title: { ru: "Пышные бельгийские вафли с ягодами", en: "Fluffy Belgian Waffles with Berries", pl: "Puszyste Gofry Belgijskie z owocami" },
    category: "dessert",
    prepTime: { ru: "25 мин", en: "25 min", pl: "25 min" },
    calories: 310,
    rating: 4.93,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Хрустящие снаружи и мягкие внутри льежские вафли с карамельным сахаром и свежими лесными ягодами.",
      en: "Crispy-golden outside and tender fluffy inside Liege-style waffles topped with fresh wild berries.",
      pl: "Chrupiące z zewnątrz i puszyste w środku gofry belgijskie ze świeżymi owocami leśnymi."
    },
    ingredients: [
      { name: { ru: "Мука пшеничная", en: "Flour", pl: "Mąka pszenna" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 },
      { name: { ru: "Сливочное масло", en: "Melted butter", pl: "Masło rozpuszczone" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Молоко", en: "Milk", pl: "Mleko" }, qty: 200, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 1.50 },
      { name: { ru: "Яйца", en: "Eggs", pl: "Jajka" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.00 },
      { name: { ru: "Свежие ягоды", en: "Fresh berries", pl: "Świeże owoce" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.50 }
    ],
    steps: [
      {
        ru: "Разделите яйца. Желтки взбейте с молоком, маслом и сахаром, добавьте муку с разрыхлителем.",
        en: "Separate eggs. Whisk yolks with milk, melted butter, and sugar; fold into flour with baking powder.",
        pl: "Oddziel żółtka od białek. Wymieszaj żółtka z mlekiem, masłem i cukrem, dodaj mąkę z proszkiem."
      },
      {
        ru: "Белки взбейте в стойкую пену и аккуратно лопаткой вмешайте в тесто.",
        en: "Beat egg whites into stiff peaks and fold gently into batter to keep it light.",
        pl: "Ubij białka na sztywną pianę i delikatnie wmieszaj do ciasta."
      },
      {
        ru: "Выпекайте в разогретой вафельнице 4-5 минут до золотистой хрустящей корочки. Подавайте с ягодами.",
        en: "Bake in hot waffle maker for 4-5 minutes until crisp and golden. Garnish with berries.",
        pl: "Piecz w rozgrzanej gofrownicy przez 4-5 minut na złoty kolor. Podawaj z owocami."
      }
    ]
  },
  {
    id: "new-york-cheesecake",
    title: { ru: "Классический чизкейк «Нью-Йорк»", en: "Classic New York Cheesecake", pl: "Klasyczny Sernik Nowojorski" },
    category: "dessert",
    prepTime: { ru: "90 мин", en: "90 min", pl: "90 min" },
    calories: 410,
    rating: 4.97,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Плотный, шелковистый творожно-сливочный чизкейк на хрустящей песочной основе с нотками лимонной цедры.",
      en: "Dense, ultra-rich and velvety baked cheesecake on a graham cracker crust with subtle lemon zest.",
      pl: "Gęsty, aksamitny sernik na kruchym ciasteczkowym spodzie z delikatną nutą skórki cytrynowej."
    },
    ingredients: [
      { name: { ru: "Сливочный сыр Филадельфия", en: "Cream cheese", pl: "Serek kremowy" }, qty: 700, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 16.50 },
      { name: { ru: "Песочное печенье", en: "Graham crackers / digestive", pl: "Herbatniki maślane" }, qty: 180, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Сливочное масло", en: "Melted butter", pl: "Rozpuszczone masło" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Яйца", en: "Eggs", pl: "Jajka" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.00 },
      { name: { ru: "Жирные сливки 33%", en: "Heavy cream", pl: "Śmietanka 33%" }, qty: 150, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 3.80 }
    ],
    steps: [
      {
        ru: "Измельчите печенье в крошку, смешайте с маслом, утрамбуйте на дно формы и подпеките 10 минут при 170°C.",
        en: "Crush crackers, combine with melted butter, press into pan bottom, and bake 10 mins at 170°C.",
        pl: "Rozkrusz herbatniki, wymieszaj z masłem, ugnieć na dnie formy i podpiecz 10 minut w 170°C."
      },
      {
        ru: "Смешайте сливочный сыр с сахаром, сливками и яйцами на низкой скорости миксера.",
        en: "Blend cream cheese with sugar, heavy cream, lemon zest, and eggs on low speed to prevent air bubbles.",
        pl: "Wymieszaj serek z cukrem, śmietanką i jajkami na małych obrotach, unikając napowietrzania."
      },
      {
        ru: "Выпекайте на водяной бане при 150°C 70-80 минут. Остужайте в выключенной духовке.",
        en: "Bake in a water bath at 150°C for 70-80 mins. Cool gradually in turned-off oven.",
        pl: "Piecz w kąpieli wodnej w 150°C przez 70-80 minut. Studź w wyłączonym piekarniku."
      }
    ]
  },
  {
    id: "black-forest-cake",
    title: { ru: "Торт «Черный лес» (Шварцвальд)", en: "Black Forest Cherry Cake", pl: "Tort Szwarcwaldzki z wiśniami" },
    category: "dessert",
    prepTime: { ru: "85 мин", en: "85 min", pl: "85 min" },
    calories: 390,
    rating: 4.96,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Шоколадные коржи с вишневой пропиткой, пряной сочной вишней, взбитыми сливками и шоколадной стружкой.",
      en: "Layers of chocolate sponge infused with cherry kirsch syrup, sour cherries, and clouds of whipped cream.",
      pl: "Warstwy czekoladowego biszkoptu nasączone wiśniówką, z soczystymi wiśniami i bitą śmietaną."
    },
    ingredients: [
      { name: { ru: "Вишня свежая или замороженная", en: "Cherries", pl: "Wiśnie" }, qty: 350, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 6.50 },
      { name: { ru: "Сливки 33-36%", en: "Whipping cream", pl: "Śmietanka 36%" }, qty: 450, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 9.20 },
      { name: { ru: "Шоколадный бисквит", en: "Chocolate sponge mix", pl: "Biszkopt kakaowy" }, qty: 300, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Темный шоколад для стружки", en: "Dark chocolate shavings", pl: "Czekolada do wiórków" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Сахарная пудра", en: "Icing sugar", pl: "Cukier puder" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 }
    ],
    steps: [
      {
        ru: "Проварите вишню с сахаром и кукурузным крахмалом 3 минуты до легкого загустения, остудите.",
        en: "Simmer cherries with sugar and a spoonful of cornstarch for 3 minutes until syrupy, then cool.",
        pl: "Zagotuj wiśnie z cukrem i łyżeczką mąki ziemniaczanej przez 3 minuty do zgęstnienia, ostudź."
      },
      {
        ru: "Взбейте холодные сливки с сахарной пудрой в устойчивый крем.",
        en: "Whip chilled heavy cream with powdered sugar into firm, billowy peaks.",
        pl: "Ubij schłodzoną śmietankę z cukrem pudrem na gęsty, puszysty krem."
      },
      {
        ru: "Соберите торт: корж, вишневый сироп с ягодами, взбитые сливки. Посыпьте шоколадной стружкой.",
        en: "Assemble cake: sponge layer, cherry filling, whipped cream. Top with rich dark chocolate shavings.",
        pl: "Złóż tort: biszkopt, wiśnie z sosem, bita śmietana. Udekoruj wiórkami czekoladowymi."
      }
    ]
  },
  {
    id: "french-macarons",
    title: { ru: "Французские макарон с фисташковым ганашем", en: "Pistachio French Macarons", pl: "Francuskie Makaroniki pistacjowe" },
    category: "dessert",
    prepTime: { ru: "60 мин", en: "60 min", pl: "60 min" },
    calories: 220,
    rating: 4.95,
    difficulty: { ru: "Сложно", en: "Hard", pl: "Trudny" },
    image: "https://images.unsplash.com/photo-1569864321390-dc82a939fdf7?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Хрупкие миндальные крышечки с характерной юбочкой и нежнейшим белым шоколадным ганашем с фисташковой пастой.",
      en: "Delicate almond meringue cookies with crisp shells, chewy centers, and rich white chocolate pistachio ganache.",
      pl: "Kruche ciasteczka migdałowe z charakterystyczną falbanką przełożone ganache z białej czekolady i pistacji."
    },
    ingredients: [
      { name: { ru: "Миндальная мука", en: "Almond flour", pl: "Mąka migdałowa" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 8.90 },
      { name: { ru: "Сахарная пудра", en: "Powdered sugar", pl: "Cukier puder" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.10 },
      { name: { ru: "Яичные белки", en: "Aged egg whites", pl: "Białka jaj" }, qty: 110, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Белый шоколад", en: "White chocolate", pl: "Biała czekolada" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.20 },
      { name: { ru: "Фисташковая паста 100%", en: "Pistachio paste", pl: "Pasta pistacjowa" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 7.50 }
    ],
    steps: [
      {
        ru: "Просейте миндальную муку с сахарной пудрой. Взбейте белки с сахаром до плотной меренги.",
        en: "Sift almond flour with icing sugar. Beat egg whites with fine sugar into stiff meringue.",
        pl: "Przesiej mąkę migdałową z cukrem pudrem. Ubij białka z cukrem na sztywną bezę."
      },
      {
        ru: "Сделайте макаронаж (вымешивание до состояния ленты), отсадите кружки на коврик и подсушите 30 минут.",
        en: "Macaronage until batter flows like a ribbon, pipe circles onto mat, and rest 30 mins to form skin.",
        pl: "Wykonaj makaronowanie, wyciśnij krążki na matę i susz 30 minut przed pieczeniem."
      },
      {
        ru: "Выпекайте при 150°C 14 минут. Остудите и скрепите половинки фисташковым ганашем.",
        en: "Bake at 150°C for 14 minutes. Cool completely and sandwich with pistachio ganache.",
        pl: "Piecz w 150°C przez 14 minut. Ostudź i połącz połówki kremem pistacjowym."
      }
    ]
  },
  {
    id: "pavlova-cake",
    title: { ru: "Десерт «Павлова» с маракуйей и ягодами", en: "Pavlova with Passion Fruit and Berries", pl: "Beza Pavlova z marakują i owocami" },
    category: "dessert",
    prepTime: { ru: "90 мин", en: "90 min", pl: "90 min" },
    calories: 240,
    rating: 4.97,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Воздушная белоснежная меренга с хрустящей корочкой и нежным суфле внутри, покрытая взбитыми сливками и кислинкой маракуйи.",
      en: "Crisp marshmallowy meringue shell topped with soft whipped cream and exotic tart passionfruit pulp.",
      pl: "Krucha z zewnątrz i piankowa w środku beza z bitą śmietaną oraz orzeźwiającym sosem z marakui."
    },
    ingredients: [
      { name: { ru: "Яичные белки", en: "Egg whites", pl: "Białka jaj" }, qty: 4, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.80 },
      { name: { ru: "Сахарная пудра", en: "Caster sugar", pl: "Cukier drobny" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 },
      { name: { ru: "Сливки 36%", en: "Double cream", pl: "Śmietanka 36%" }, qty: 250, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 5.50 },
      { name: { ru: "Маракуйя свежая", en: "Passion fruit", pl: "Marakuja" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 5.00 },
      { name: { ru: "Кукурузный крахмал", en: "Cornstarch", pl: "Mąka kukurydziana" }, qty: 10, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 0.50 }
    ],
    steps: [
      {
        ru: "Взбейте белки с сахаром, добавьте каплю лимонного сока и крахмал для мягкой сердцевины.",
        en: "Whip egg whites adding sugar gradually, finish with lemon juice and cornstarch for marshmallow center.",
        pl: "Ubij białka z cukrem, dodaj sok z cytryny i skrobię, aby środek pozostał miękki."
      },
      {
        ru: "Сформируйте гнездо на пергаменте и сушите при 100°C около 75-80 минут. Остудите в духовке.",
        en: "Shape nest on baking paper and dry at 100°C for 75-80 mins. Cool inside closed oven.",
        pl: "Uformuj gniazdo na papierze i susz w 100°C przez 75-80 minut. Studź w piekarniku."
      },
      {
        ru: "Наполните взбитыми сливками, полейте соком маракуйи и украсьте свежими ягодами перед подачей.",
        en: "Fill center with whipped cream, spoon tart passion fruit pulp, and scatter fresh berries.",
        pl: "Wypełnij bitą śmietaną, polej marakują i udekoruj świeżymi owocami."
      }
    ]
  },
  {
    id: "cinnabon-rolls",
    title: { ru: "Синнабоны с корицей и сливочной глазурью", en: "Cinnabon Cinnamon Rolls with Cream Frosting", pl: "Cynamonki Cinnabon z kremem waniliowym" },
    category: "dessert",
    prepTime: { ru: "60 мин", en: "60 min", pl: "60 min" },
    calories: 420,
    rating: 4.96,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Пышные сдобные дрожжевые булочки с ароматной цейлонской корицей, щедро политые теплым крем-чизом.",
      en: "Gooey, warm yeast rolls swirled with fragrant cinnamon brown sugar and blanketed in rich cream cheese glaze.",
      pl: "Puszyste drożdżowe bułeczki ze sporą ilością cynamonu obficie polane kremem ze śmietankowego serka."
    },
    ingredients: [
      { name: { ru: "Мука пшеничная", en: "Bread flour", pl: "Mąka pszenna" }, qty: 450, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 },
      { name: { ru: "Молоко теплое", en: "Warm milk", pl: "Ciepłe mleko" }, qty: 200, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 1.50 },
      { name: { ru: "Сливочное масло", en: "Softened butter", pl: "Miękkie masło" }, qty: 120, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.20 },
      { name: { ru: "Корица молотая", en: "Ground cinnamon", pl: "Cynamon mielony" }, qty: 25, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 },
      { name: { ru: "Сливочный сыр", en: "Cream cheese", pl: "Serek śmietankowy" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 }
    ],
    steps: [
      {
        ru: "Замесите мягкое дрожжевое тесто на теплом молоке со сливочным маслом, дайте подняться 1 час.",
        en: "Knead soft yeast dough with warm milk and butter, let rise in a warm spot for 1 hour.",
        pl: "Zagnieć miękkie ciasto drożdżowe z ciepłym mlekiem i masłem, odstaw do wyrośnięcia na 1 godzinę."
      },
      {
        ru: "Раскатайте в пласт, смажьте маслом, посыпьте сахаром с корицей, сверните в рулет и нарежьте на 10-12 булочек.",
        en: "Roll out, brush with butter, coat with cinnamon sugar, roll into a log, and slice into 10-12 buns.",
        pl: "Rozwałkuj, posmaruj masłem, posyp cukrem z cynamonem, zwiń w roladę i pokrój na 10-12 bułeczek."
      },
      {
        ru: "Выпекайте при 180°C 22-25 минут, сразу смажьте теплые булочки взбитым крем-чизом с пудрой.",
        en: "Bake at 180°C for 22-25 mins, immediately spread warm rolls with cream cheese glaze.",
        pl: "Piecz w 180°C przez 22-25 minut, od razu posmaruj gorące bułeczki polewą serkową."
      }
    ]
  },
  {
    id: "baklava-honey-nuts",
    title: { ru: "Турецкая пахлава с фисташками и медом", en: "Turkish Pistachio Baklava", pl: "Turecka Baklawa z pistacjami i miodem" },
    category: "dessert",
    prepTime: { ru: "60 мин", en: "60 min", pl: "60 min" },
    calories: 450,
    rating: 4.95,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Хрустящие десятки слоев тончайшего теста фило, пропитанные топленым маслом, ореховой начинкой и медовым сиропом.",
      en: "Layers of tissue-thin phyllo pastry drenched in clarified butter, ground pistachios, and aromatic honey syrup.",
      pl: "Wielowarstwowe chrupiące ciasto filo nasączone masłem klarowanym, pistacjami i aromatycznym syropem miodowym."
    },
    ingredients: [
      { name: { ru: "Тесто фило", en: "Phyllo pastry sheets", pl: "Ciasto filo" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 6.90 },
      { name: { ru: "Фисташки очищенные", en: "Shelled pistachios", pl: "Pistacje łuskane" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 14.50 },
      { name: { ru: "Топленое масло Гхи", en: "Clarified butter", pl: "Masło klarowane" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 7.50 },
      { name: { ru: "Мед натуральный", en: "Honey", pl: "Miód" }, qty: 120, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.50 },
      { name: { ru: "Вода цветков апельсина", en: "Orange blossom water", pl: "Woda z kwiatów pomarańczy" }, qty: 15, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 3.00 }
    ],
    steps: [
      {
        ru: "Выложите половину листов фило в форму, промазывая каждый растопленным маслом гхи.",
        en: "Layer half the phyllo sheets in baking dish, brushing each individually with melted clarified butter.",
        pl: "Układaj płaty ciasta filo w formie, smarując każdy rozpuszczonym masłem klarowanym."
      },
      {
        ru: "Распределите измельченные фисташки и накройте оставшимися промасленными листами фило. Нарежьте ромбиками.",
        en: "Spread finely crushed pistachios, top with remaining buttered phyllo, and cut into diamonds.",
        pl: "Wyłóż zmielone pistacje, przykryj resztą posmarowanych płatów i pokrój w romby."
      },
      {
        ru: "Выпекайте при 170°C 40 минут до золотистости. Горячую пахлаву сразу залейте холодным медовым сиропом.",
        en: "Bake at 170°C for 40 mins until crisp. Immediately douse hot baklava with cool honey syrup.",
        pl: "Piecz w 170°C przez 40 minut na złoto. Gorącą baklawę polej zimnym syropem miodowym."
      }
    ]
  },
  {
    id: "profiteroles-chocolate",
    title: { ru: "Профитроли с заварным кремом под шоколадом", en: "Creamy Chocolate Profiteroles", pl: "Profiterolki z kremem w polewie czekoladowej" },
    category: "dessert",
    prepTime: { ru: "50 мин", en: "50 min", pl: "50 min" },
    calories: 270,
    rating: 4.91,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Миниатюрные воздушные шарики из заварного теста, наполненные сливочно-ванильным кремом и политые горячим шоколадом.",
      en: "Petite choux puffs bursting with silky chilled vanilla cream and coated with glossy warm chocolate sauce.",
      pl: "Kruche kuleczki z ciasta parzonego nadziewane kremem waniliowym i polane ciepłą czekoladą."
    },
    ingredients: [
      { name: { ru: "Заварное тесто (масло, мука, яйца)", en: "Choux dough ingredients", pl: "Ciasto parzone" }, qty: 300, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Сливки 30%", en: "Whipping cream", pl: "Śmietanka 30%" }, qty: 250, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 4.90 },
      { name: { ru: "Темный шоколад", en: "Dark chocolate", pl: "Czekolada gorzka" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Сахарная пудра", en: "Powdered sugar", pl: "Cukier puder" }, qty: 50, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.00 }
    ],
    steps: [
      {
        ru: "Отсадите круглые профитроли размером с грецкий орех на противень и выпекайте при 200°C 20 минут.",
        en: "Pipe walnut-sized mounds of choux paste and bake at 200°C for 20 mins until puffed and crisp.",
        pl: "Wyciskaj małe kulki ciasta parzonego i piecz w 200°C przez 20 minut na chrupko."
      },
      {
        ru: "Начините остывшие шарики взбитыми сливками через кондитерский наконечник.",
        en: "Fill cooled puffs with lightly sweetened whipped cream using a fine piping nozzle.",
        pl: "Nadziewaj ostudzone ptysie bitą śmietaną za pomocą szprycy cukierniczej."
      },
      {
        ru: "Сложите пирамидкой и щедро залейте растопленным теплым шоколадом.",
        en: "Stack into a pyramid and drizzle generously with warm melted chocolate ganache.",
        pl: "Ułóż w piramidkę i obficie polej ciepłą rozpuszczoną czekoladą."
      }
    ]
  },
  {
    id: "pistachio-tiramisu",
    title: { ru: "Фисташковый Тирамису с белым шоколадом", en: "Sicilian Pistachio Tiramisu", pl: "Sycylijskie Tiramisu Pistacjowe" },
    category: "dessert",
    prepTime: { ru: "30 мин", en: "30 min", pl: "30 min" },
    calories: 380,
    rating: 4.98,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Роскошная вариация тирамису: крем маскарпоне с натуральной сицилийской фисташковой пастой, савоярди и дробленые фисташки.",
      en: "Luxurious spin on tiramisu featuring 100% Sicilian pistachio mascarpone cream, espresso savoiardi, and roasted pistachios.",
      pl: "Wykwintne sycylijskie tiramisu z kremem z mascarpone i pastą pistacjową, biszkoptami i prażonymi pistacjami."
    },
    ingredients: [
      { name: { ru: "Сыр Маскарпоне", en: "Mascarpone cheese", pl: "Serek Mascarpone" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 10.50 },
      { name: { ru: "Фисташковая паста 100%", en: "Pure pistachio paste", pl: "Pasta pistacjowa 100%" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 9.90 },
      { name: { ru: "Печенье Савоярди", en: "Savoiardi ladyfingers", pl: "Biszkopty Savoiardi" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.90 },
      { name: { ru: "Эспрессо и дробленые фисташки", en: "Espresso & crushed pistachios", pl: "Espresso i kruszone pistacje" }, qty: 200, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 4.50 }
    ],
    steps: [
      {
        ru: "Взбейте маскарпоне с фисташковой пастой и сахарной пудрой в бархатистый крем.",
        en: "Beat chilled mascarpone with pure pistachio paste and powdered sugar into a velvety green cream.",
        pl: "Ubij mascarpone z pastą pistacjową i cukrem pudrem na gładki krem."
      },
      {
        ru: "Обмакните печенье савоярди в кофе и выложите слоями с фисташковым кремом.",
        en: "Dip savoiardi ladyfingers in cooled espresso, layer alternately with pistachio mascarpone.",
        pl: "Zanurzaj biszkopty w espresso i przekładaj kremem pistacjowym."
      },
      {
        ru: "Охладите 3 часа и обильно посыпьте рублеными изумрудными фисташками.",
        en: "Refrigerate for 3 hours, then generously shower with vibrant chopped green pistachios.",
        pl: "Schłodź przez 3 godziny i posyp obficie posiekanymi pistacjami."
      }
    ]
  },
  {
    id: "berry-cheesecake",
    title: { ru: "Чизкейк без выпечки с лесными ягодами", en: "No-Bake Wild Berry Swirl Cheesecake", pl: "Sernik na zimno z owocami leśnymi" },
    category: "dessert",
    prepTime: { ru: "25 мин", en: "25 min", pl: "25 min" },
    calories: 330,
    rating: 4.95,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Освежающий легкий чизкейк на хрустящей песочной основе со сливочно-творожным муссом и ягодным желе из черники и малины.",
      en: "Refreshing chilled cheesecake on crunchy buttery biscuit base layered with silky quark mousse and vibrant berry coulis.",
      pl: "Lekki i orzeźwiający sernik na zimno na ciasteczkowym spodzie z musem twarogowym i owocami leśnymi."
    },
    ingredients: [
      { name: { ru: "Сливочный творожный сыр", en: "Cream cheese / quark", pl: "Twaróg sernikowy mielony" }, qty: 500, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 8.50 },
      { name: { ru: "Песочное печенье", en: "Butter biscuits", pl: "Herbatniki maślane" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.80 },
      { name: { ru: "Свежие ягоды (малина, черника)", en: "Fresh wild berries", pl: "Owoce leśne (maliny, borówki)" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 7.90 },
      { name: { ru: "Сливки 30%", en: "Whipping cream", pl: "Śmietanka 30%" }, qty: 150, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 3.20 }
    ],
    steps: [
      {
        ru: "Измельчите печенье в крошку, смешайте с растопленным маслом и утрамбуйте на дно разъёмной формы.",
        en: "Crush biscuits into fine crumbs, combine with melted butter, press firmly into springform pan.",
        pl: "Rozkrusz herbatniki, połącz z rozpuszczonym masłem i ugnieć na dnie tortownicy."
      },
      {
        ru: "Взбейте сыр со сливками и пудрой, введите распущенный желатин и вылейте на основу.",
        en: "Beat cream cheese with sugar and whipped cream, fold in dissolved gelatin, pour over crust.",
        pl: "Ubij serek ze śmietanką i cukrem pudrem, dodaj rozpuszczoną żelatynę i wylej na spód."
      },
      {
        ru: "Сверху украсьте свежими ягодами и ягодным желе, охладите в холодильнике 4 часа.",
        en: "Crown with fresh berries and berry glaze, chill in fridge for 4 hours until firmly set.",
        pl: "Udekoruj świeżymi owocami i tężejącą galaretką owocową, schłodź przez 4 godziny."
      }
    ]
  }
];
