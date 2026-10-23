import { Recipe } from '../../types';

export const SOUP_RECIPES: Recipe[] = [
  {
    id: "borscht",
    title: { ru: "Борщ домашний с говядиной", en: "Homemade Beef Borscht", pl: "Domowy Barszcz z wołowiną" },
    category: "soup",
    prepTime: { ru: "60 мин", en: "60 min", pl: "60 min" },
    calories: 380,
    rating: 4.95,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Наваристый традиционный борщ со свеклой, свежей капустой и чесночными пампушками.",
      en: "Hearty traditional beet soup with fresh cabbage, rich beef broth, and garlic rolls.",
      pl: "Pożywny tradycyjny barszcz z burakami, świeżą kapustą i bułeczkami czosnkowymi."
    },
    ingredients: [
      { name: { ru: "Говядина на кости", en: "Beef bone-in", pl: "Wołowina z kością" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 15.50 },
      { name: { ru: "Свекла свежая", en: "Fresh beetroot", pl: "Świeże buraki" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.20 },
      { name: { ru: "Капуста белокочанная", en: "White cabbage", pl: "Kapusta biała" }, qty: 300, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.80 },
      { name: { ru: "Картофель", en: "Potatoes", pl: "Ziemniaki" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.50 }
    ],
    steps: [
      {
        ru: "Сварите прозрачный бульон из говядины на слабом огне (90 минут), периодически снимая пену.",
        en: "Simmer beef on low heat for 90 minutes to make rich broth, skimming foam as needed.",
        pl: "Gotuj wywar z wołowiny na małym ogniu przez 90 minut, zbierając szumowiny."
      },
      {
        ru: "Нарежьте картофель кубиками, капусту нашинкуйте соломкой. Отправьте в кипящий бульон.",
        en: "Dice potatoes, finely shred cabbage, and add into gently simmering broth.",
        pl: "Pokrój ziemniaki w kostkę, poszatkuj kapustę i dodaj do gotującego się wywaru."
      },
      {
        ru: "Пассеруйте натертую свеклу с томатной пастой и ложкой уксуса для сохранения рубинового цвета, добавьте в суп с чесноком.",
        en: "Sauté grated beetroot with tomato paste and vinegar to lock crimson color, add to pot with crushed garlic.",
        pl: "Podsmaż buraki z koncentratem i octem dla rubinowego koloru, dodaj do garnka z czosnkiem."
      }
    ]
  },
  {
    id: "solyanka-meat",
    title: { ru: "Солянка сборная мясная", en: "Russian Meat Solyanka", pl: "Solanka mięsna tradycyjna" },
    category: "soup",
    prepTime: { ru: "50 мин", en: "50 min", pl: "50 min" },
    calories: 410,
    rating: 4.97,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Густой пряный кисло-соленый суп с ассорти из копченостей, маринованными огурчиками, маслинами и долькой лимона.",
      en: "Rich, tangy sour-savory soup loaded with smoked meats, pickled gherkins, black olives, and fresh lemon.",
      pl: "Gęsta, pikantno-kwaśna zupa z różnorodnymi wędlinami, kiszonymi ogórkami, oliwkami i cytryną."
    },
    ingredients: [
      { name: { ru: "Копчености ассорти (колбаски, ветчина)", en: "Smoked meat mix", pl: "Wędliny i kiełbaski" }, qty: 350, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 12.50 },
      { name: { ru: "Огурцы соленые бочковые", en: "Dill pickles", pl: "Ogórki kiszone" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Маслины без косточек", en: "Black olives", pl: "Oliwki czarne" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.90 },
      { name: { ru: "Каперсы", en: "Capers", pl: "Kapary" }, qty: 30, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.20 },
      { name: { ru: "Томатная паста", en: "Tomato paste", pl: "Przecier pomidorowy" }, qty: 50, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.80 }
    ],
    steps: [
      {
        ru: "Нарежьте копчености соломкой и обжарьте на сухой сковороде до аромата.",
        en: "Slice assorted smoked meats into strips and lightly sear in pan until fragrant.",
        pl: "Pokrój wędliny w paski i podsmaż na suchej patelni do uwolnienia aromatu."
      },
      {
        ru: "Припустите соленые огурцы с луком и томатной пастой (бресс) на сковороде 7 минут.",
        en: "Braise finely diced pickled cucumbers with onion and tomato paste for 7 minutes.",
        pl: "Podduś drobno posiekane ogórki kiszone z cebulą i koncentratem przez 7 minut."
      },
      {
        ru: "Соедините всё в мясном бульоне, добавьте маслины, каперсы и варите 10 минут. Подавайте со сметаной и лимоном.",
        en: "Combine into beef broth, add olives, capers, simmer 10 mins. Serve with lemon slice and sour cream.",
        pl: "Połącz w wywarze, dodaj oliwki, kapary i gotuj 10 minut. Podawaj z cytryną i śmietaną."
      }
    ]
  },
  {
    id: "tom-yum-kung",
    title: { ru: "Тайский суп Том Ям с креветками", en: "Thai Tom Yum Goong Soup", pl: "Tajska Zupa Tom Yum z krewetkami" },
    category: "soup",
    prepTime: { ru: "30 мин", en: "30 min", pl: "30 min" },
    calories: 290,
    rating: 4.98,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Острый кисло-сладкий суп на кокосовом молоке с тигровыми креветками, лемонграссом, листьями лайма и грибами шиитаке.",
      en: "Fiery sour-sweet aromatic Thai soup with jumbo tiger prawns, lemongrass, galangal, lime leaves, and mushrooms.",
      pl: "Ostra i orzeźwiająca zupa tajska na mleczku kokosowym z krewetkami królewskimi, trawą cytrynową i grzybami."
    },
    ingredients: [
      { name: { ru: "Креветки тигровые", en: "Tiger prawns", pl: "Krewetki tygrysie" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 19.90 },
      { name: { ru: "Кокосовое молоко", en: "Coconut milk", pl: "Mleczko kokosowe" }, qty: 250, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 5.50 },
      { name: { ru: "Паста Том Ям", en: "Tom Yum paste", pl: "Pasta Tom Yum" }, qty: 50, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.90 },
      { name: { ru: "Грибы вешенки или шиитаке", en: "Oyster or shiitake mushrooms", pl: "Boczniaki lub pieczarki" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.80 },
      { name: { ru: "Лайм и кинза", en: "Fresh lime & cilantro", pl: "Limonka i kolendra" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.50 }
    ],
    steps: [
      {
        ru: "В курином бульоне прогрейте лемонграсс, нарезанный корень галангала и листья кафрского лайма.",
        en: "Bruise lemongrass stalks, slice galangal, and simmer in chicken stock with torn kaffir lime leaves.",
        pl: "W bulionie drobiowym zagotuj trawę cytrynową, galangal i liście limonki kaffir."
      },
      {
        ru: "Добавьте пасту Том Ям, нарезанные грибы и кокосовое молоко, доведите до кипения.",
        en: "Stir in Tom Yum chili paste, sliced mushrooms, and pour in coconut milk. Bring to a boil.",
        pl: "Dodaj pastę Tom Yum, pokrojone grzyby oraz mleczko kokosowe, doprowadź do wrzenia."
      },
      {
        ru: "Опустите очищенные креветки на 2-3 минуты. Снимите с огня, влейте сок лайма и рыбный соус, посыпьте свежей кинзой.",
        en: "Add prawns for 2-3 minutes until pink. Take off heat, season with fresh lime juice, fish sauce, and cilantro.",
        pl: "Wrzuć krewetki na 2-3 minuty. Zdejmij z ognia, dopraw sokiem z limonki, sosem rybnym i świeżą kolendrą."
      }
    ]
  },
  {
    id: "tonkotsu-ramen",
    title: { ru: "Японский Рамен со свининой Тясю", en: "Authentic Tonkotsu Pork Ramen", pl: "Tradycyjny Japoński Ramen Tonkotsu" },
    category: "soup",
    prepTime: { ru: "50 мин", en: "50 min", pl: "50 min" },
    calories: 620,
    rating: 4.99,
    difficulty: { ru: "Сложно", en: "Hard", pl: "Trudny" },
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Шелковистый наваристый бульон, упругая пшеничная лапша рамен, сочная карамелизованная свинина и маринованное яйцо адитама.",
      en: "Rich silky pork-dashi broth, chewy handmade ramen noodles, melting chashu pork belly, and jammy ajitsuke egg.",
      pl: "Głęboki kremowy bulion tonkotsu, sprężysty makaron ramen, plastry pieczonego boczku chashu i marynowane jajko."
    },
    ingredients: [
      { name: { ru: "Свиная грудинка Тясю", en: "Pork belly chashu", pl: "Boczek wieprzowy chashu" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 9.90 },
      { name: { ru: "Лапша рамен", en: "Ramen noodles", pl: "Makaron ramen" }, qty: 180, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Яйца маринованные", en: "Marinated ramen eggs", pl: "Jajka ajitsuke" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.50 },
      { name: { ru: "Соевый соус и мирин", en: "Soy sauce & mirin", pl: "Sos sojowy i mirin" }, qty: 40, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 3.00 },
      { name: { ru: "Зеленый лук и нори", en: "Scallions and nori", pl: "Szczypiorek i wodorosty nori" }, qty: 30, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 }
    ],
    steps: [
      {
        ru: "Приготовьте соус тарэ: уварите темный соевый соус с мирином, чесноком и имбирем.",
        en: "Prepare tare seasoning: reduce dark soy sauce with mirin, sake, garlic, and sliced ginger.",
        pl: "Przygotuj sos tare: zredukuj sos sojowy z mirinem, czosnkiem i imbirem."
      },
      {
        ru: "Отварите лапшу рамен ровно 2 минуты до состояния al dente, откиньте на дуршлаг.",
        en: "Cook fresh ramen noodles for exactly 2 minutes until firm and bouncy, then drain thoroughly.",
        pl: "Ugotuj makaron ramen dokładnie przez 2 minuty al dente, dokładnie odcedź."
      },
      {
        ru: "В чашу налейте тарэ, залейте кипящим бульоном, выложите лапшу, ломтики обжаренного бекона, половинку яйца и лист нори.",
        en: "Pour tare into deep bowl, ladle hot broth, fold noodles, top with seared pork slices, ajitama egg half, and nori sheet.",
        pl: "Wlej tare do miski, zalej gorącym bulionem, ułóż makaron, boczek chashu, połówkę jajka i listek nori."
      }
    ]
  },
  {
    id: "polish-zurek",
    title: { ru: "Традиционный польский Журек с колбасой", en: "Polish Sour Rye Soup Żurek", pl: "Staropolski Żurek na zakwasie z białą kiełbasą" },
    category: "soup",
    prepTime: { ru: "45 мин", en: "45 min", pl: "45 min" },
    calories: 450,
    rating: 4.96,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Визитная карточка польской кухни — суп на ржаной закваске с белой колбасой, копченым беконом, майораном и яйцом.",
      en: "Classic Polish sour rye soup simmered with white sausage, smoked bacon, garlic, marjoram, and hard-boiled eggs.",
      pl: "Kultowa polska zupa na zakwasie żytnim gotowana z białą kiełbasą, wędzonym boczkiem, majerankiem i jajkiem."
    },
    ingredients: [
      { name: { ru: "Ржаная закваска (zakwas)", en: "Rye sourdough base", pl: "Zakwas na żur" }, qty: 400, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 4.50 },
      { name: { ru: "Белая польская колбаса", en: "White sausage", pl: "Biała kiełbasa parzona" }, qty: 300, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 9.80 },
      { name: { ru: "Копченый бекон", en: "Smoked bacon", pl: "Boczek wędzony" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 6.20 },
      { name: { ru: "Майоран сушеный", en: "Dried marjoram", pl: "Majeranek suszony" }, qty: 10, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 },
      { name: { ru: "Сметана и хрен", en: "Sour cream and horseradish", pl: "Śmietana i chrzan tarty" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 }
    ],
    steps: [
      {
        ru: "Обжарьте нарезанный бекон до вытапливания жира, добавьте нарезанную белую колбасу и чеснок.",
        en: "Crisp diced smoked bacon in pot, add sliced white sausage, bay leaves, and minced garlic.",
        pl: "Podsmaż pokrojony boczek, dodaj plasterki białej kiełbasy, liść laurowy i czosnek."
      },
      {
        ru: "Залейте овощным или мясным бульоном, варите 20 минут на слабом огне.",
        en: "Pour in hot broth, bring to a simmer, and cook gently for 20 minutes.",
        pl: "Zalej bulionem warzywnym lub mięsnym i gotuj na małym ogniu przez 20 minut."
      },
      {
        ru: "Встряхните закваску, влейте в суп, помешивая. Добавьте ложку тертого хрена, майоран и сметану. Подавайте с отварным яйцом.",
        en: "Shake rye starter, stir into soup until thickened. Season with grated horseradish, rubbed marjoram, and boiled eggs.",
        pl: "Wstrząśnij zakwas, wlej do garnka mieszając. Dodaj chrzan, roztarty majeranek i śmietanę. Podawaj z jajkiem na twardo."
      }
    ]
  },
  {
    id: "mushroom-cream-soup",
    title: { ru: "Сливочный крем-суп из белых грибов", en: "Creamy Porcini Mushroom Soup", pl: "Aksamitny Krem z leśnych grzybów" },
    category: "soup",
    prepTime: { ru: "35 мин", en: "35 min", pl: "35 min" },
    calories: 310,
    rating: 4.94,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Бархатистый суп-пюре из ароматных белых грибов и шампиньонов со сливочным маслом, тимьяном и хрустящими чесночными гренками.",
      en: "Velvety soup crafted from wild porcini and button mushrooms enriched with cream, fresh thyme, and garlic croutons.",
      pl: "Aksamitna zupa krem ze szlachetnych borowików i pieczarek ze słodką śmietanką, tymiankiem i grzankami."
    },
    ingredients: [
      { name: { ru: "Белые грибы (свежие или сушеные)", en: "Porcini mushrooms", pl: "Borowiki suszone lub świeże" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 11.50 },
      { name: { ru: "Шампиньоны свежие", en: "Button mushrooms", pl: "Pieczarki świeże" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Сливки 20-30%", en: "Heavy cream", pl: "Śmietanka 30%" }, qty: 200, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 4.20 },
      { name: { ru: "Картофель", en: "Potato", pl: "Ziemniak" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 0.80 },
      { name: { ru: "Тимьян свежий", en: "Fresh thyme", pl: "Świeży tymianek" }, qty: 5, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 }
    ],
    steps: [
      {
        ru: "Обжарьте грибы с луком-шалотом на сливочном масле с веточками тимьяна до золотистого цвета.",
        en: "Sauté sliced mushrooms and shallots in butter with thyme sprigs until caramelized.",
        pl: "Podsmaż grzyby z szalotką na maśle z gałązkami tymianku na złoty kolor."
      },
      {
        ru: "Залейте бульоном, добавьте нарезанный картофель и варите 15 минут до мягкости.",
        en: "Cover with hot vegetable stock, add diced potato, and simmer 15 mins until tender.",
        pl: "Zalej bulionem warzywnym, dodaj pokrojonego ziemniaka i gotuj 15 minut do miękkości."
      },
      {
        ru: "Влейте горячие сливки, пробейте блендером до состояния шелковистой эмульсии и посыпьте сухариками.",
        en: "Pour in warmed cream, blend until completely silky and smooth, season with black pepper, and serve with croutons.",
        pl: "Wlej ciepłą śmietankę, zblenduj na idealnie gładki krem, dopraw pieprzem i podawaj z grzankami."
      }
    ]
  },
  {
    id: "french-onion-soup",
    title: { ru: "Французский луковый суп с грюйером", en: "French Onion Soup with Gruyere", pl: "Francuska Zupa Cebulowa z serem gruyere" },
    category: "soup",
    prepTime: { ru: "55 мин", en: "55 min", pl: "55 min" },
    calories: 360,
    rating: 4.93,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Шедевр парижской классики: медленно карамелизованный лук в говяжьем бульоне под тостом с расплавленным сыром.",
      en: "Parisian bistro icon of deeply caramelized sweet onions in rich beef broth, broiled with sourdough crouton and Gruyère.",
      pl: "Paryski klasyk z wolno karmelizowanej cebuli na bulionie wołowym pod chrupiącą grzanką z serem gruyere."
    },
    ingredients: [
      { name: { ru: "Лук репчатый", en: "Yellow onions", pl: "Cebula żółta" }, qty: 700, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.90 },
      { name: { ru: "Сыр Грюйер или Эмменталь", en: "Gruyere cheese", pl: "Ser Gruyere lub Emmentaler" }, qty: 120, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 9.50 },
      { name: { ru: "Говяжий бульон крепкий", en: "Beef bone broth", pl: "Mocny wywar wołowy" }, qty: 800, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 5.50 },
      { name: { ru: "Французский багет", en: "French baguette", pl: "Bagietka paryska" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.20 },
      { name: { ru: "Сливочное масло", en: "Butter", pl: "Masło" }, qty: 50, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 }
    ],
    steps: [
      {
        ru: "Карамелизуйте тонко нашинкованный лук на сливочном масле на среднем огне минимум 35 минут до глубокого янтарного цвета.",
        en: "Caramelize thinly sliced onions in butter over medium-low heat for at least 35 minutes until deeply amber and sweet.",
        pl: "Karmelizuj poszatkowaną cebulę na maśle przez minimum 35 minut do uzyskania ciemnobursztynowego koloru."
      },
      {
        ru: "Деглазируйте сухим вином, влейте горячий говяжий бульон с тимьяном и варите 15 минут.",
        en: "Deglaze pan with white wine, pour in hot rich beef stock, add thyme, and simmer for 15 mins.",
        pl: "Zdeglasuj białym winem, wlej gorący wywar wołowy z tymiankiem i gotuj 15 minut."
      },
      {
        ru: "Разлейте по горшочкам, положите ломтик подсушенного багета, щедро посыпьте сыром и запеките под грилем до пузырей.",
        en: "Ladle into ovenproof bowls, top with toasted baguette slice, pile high with grated Gruyère, and broil until bubbly.",
        pl: "Rozlej do kokilek, połóż kromkę podpieczonej bagietki, posyp obficie serem i zapiecz pod grillem."
      }
    ]
  },
  {
    id: "finnish-lohikeitto",
    title: { ru: "Финская сливочная уха с лососем Лохикейтто", en: "Finnish Salmon Cream Soup Lohikeitto", pl: "Fińska zupa rybna z łososiem Lohikeitto" },
    category: "soup",
    prepTime: { ru: "30 мин", en: "30 min", pl: "30 min" },
    calories: 390,
    rating: 4.97,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Нежнейший скандинавский суп со свежим филе лосося, картофелем, луком-пореем, сливками и щедрой порцией укропа.",
      en: "Heartwarming Nordic chowder with fresh tender salmon chunks, leeks, baby potatoes, sweet cream, and loads of dill.",
      pl: "Tradycyjna skandynawska zupa kremowa z kawałkami świeżego łososia, porem, ziemniakami i koperkiem."
    },
    ingredients: [
      { name: { ru: "Филе свежего лосося", en: "Fresh salmon fillet", pl: "Filet ze świeżego łososia" }, qty: 350, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 21.90 },
      { name: { ru: "Сливки 20-30%", en: "Whipping cream", pl: "Śmietanka 30%" }, qty: 200, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 4.50 },
      { name: { ru: "Картофель молодой", en: "Potatoes", pl: "Młode ziemniaki" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.00 },
      { name: { ru: "Лук-порей", en: "Leek", pl: "Por" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.50 },
      { name: { ru: "Свежий укроп", en: "Fresh dill bundle", pl: "Świeży koperek" }, qty: 30, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 }
    ],
    steps: [
      {
        ru: "Припустите нарезанный кольцами порей на сливочном масле, влейте рыбный бульон и опустите картофель кубиками.",
        en: "Sweat sliced leeks in butter, pour in light fish stock, and add cubed potatoes. Simmer until tender.",
        pl: "Podsmaż pokrojony por na maśle, wlej wywar rybny i wrzuć ziemniaki pokrojone w kostkę."
      },
      {
        ru: "Когда картофель станет мягким, положите нарезанное кубиками филе лосося и варите ровно 4 минуты.",
        en: "Once potatoes are soft, drop in cubed salmon pieces and simmer gently for exactly 4 minutes.",
        pl: "Gdy ziemniaki zmiękną, wrzuć kawałki łososia i gotuj delikatnie przez 4 minuty."
      },
      {
        ru: "Влейте подогретые сливки, снимите с огня, всыпьте мелко нарубленный укроп и дайте постоять 5 минут под крышкой.",
        en: "Stir in warmed cream, remove from heat, scatter plenty of fresh dill, and let rest 5 minutes before serving.",
        pl: "Wlej podgrzaną śmietankę, zdejmij z ognia, wsyp obficie posiekany koperek i odstaw na 5 minut."
      }
    ]
  },
  {
    id: "andalusian-gazpacho",
    title: { ru: "Освежающий андалузский гаспачо", en: "Chilled Andalusian Gazpacho", pl: "Orzeźwiające Gazpacho z Andaluzji" },
    category: "soup",
    prepTime: { ru: "15 мин", en: "15 min", pl: "15 min" },
    calories: 140,
    rating: 4.90,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Холодный испанский томатный суп со сладким перцем, хрустящим огурцом, чесноком и оливковым маслом первого отжима.",
      en: "Vibrant cold Spanish soup blending ripe summer tomatoes, bell peppers, crisp cucumbers, and extra virgin olive oil.",
      pl: "Chłodnik hiszpański ze słodkich dojrzałych pomidorów, papryki, ogórka, czosnku i oliwy z oliwek extra virgin."
    },
    ingredients: [
      { name: { ru: "Спелые грунтовые томаты", en: "Ripe tomatoes", pl: "Dojrzałe pomidory malinowe" }, qty: 800, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.50 },
      { name: { ru: "Огурец свежий", en: "Cucumber", pl: "Ogórek świeży" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.80 },
      { name: { ru: "Перец болгарский красный", en: "Red bell pepper", pl: "Papryka czerwona" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.50 },
      { name: { ru: "Оливковое масло Extra Virgin", en: "Extra virgin olive oil", pl: "Oliwa z oliwek Extra Virgin" }, qty: 50, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 3.80 },
      { name: { ru: "Винный уксус Херес", en: "Sherry vinegar", pl: "Ocet z sherry" }, qty: 20, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.20 }
    ],
    steps: [
      {
        ru: "Крупно нарежьте очищенные томаты, огурец и сладкий перец, добавьте зубчик чеснока и замоченный белый хлеб.",
        en: "Roughly chop peeled ripe tomatoes, cucumber, pepper, garlic clove, and soaked crustless bread.",
        pl: "Pokrój obrane pomidory, ogórka i paprykę, dodaj ząbek czosnku i namoczony chleb."
      },
      {
        ru: "Взбейте в блендере на высокой скорости до шелковистой текстуры, постепенно вливая оливковое масло и уксус.",
        en: "Puree in high-speed blender until silky, drizzling in olive oil and sherry vinegar to emulsify.",
        pl: "Zblenduj na najwyższych obrotach na gładki krem, powoli dolewając oliwę i ocet."
      },
      {
        ru: "Охладите в холодильнике минимум 2 часа. Подавайте ледяным с мелкими кубиками овощей.",
        en: "Chill in refrigerator for at least 2 hours. Serve ice cold with finely diced vegetable garnish.",
        pl: "Schłodź w lodówce przez minimum 2 godziny. Podawaj mocno schłodzone z drobno posiekanymi warzywami."
      }
    ]
  },
  {
    id: "vietnamese-pho-bo",
    title: { ru: "Вьетнамский суп Фо Бо с говядиной", en: "Vietnamese Pho Bo Beef Soup", pl: "Wietnamska Zupa Pho Bo z wołowiną" },
    category: "soup",
    prepTime: { ru: "45 мин", en: "45 min", pl: "45 min" },
    calories: 420,
    rating: 4.97,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Ароматнейший ханойский прозрачный бульон с бадьяном и корицей, рисовой лапшой фо, нежной говядиной и зеленью.",
      en: "Fragrant star anise and cinnamon spiced clear beef broth served with rice noodles, sliced beef tenderloin, and herbs.",
      pl: "Aromatyczny wietnamski bulion wołowy z anyżem i cynamonem, makaronem ryżowym, plasterkami wołowiny i ziołami."
    },
    ingredients: [
      { name: { ru: "Говяжья вырезка", en: "Beef tenderloin", pl: "Polędwica wołowa" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 18.90 },
      { name: { ru: "Рисовая лапша фо", en: "Pho rice noodles", pl: "Makaron ryżowy wstążki" }, qty: 180, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.90 },
      { name: { ru: "Бадьян, корица, кардамон", en: "Star anise & spices", pl: "Anyż gwiaździsty i cynamon" }, qty: 15, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Ростки сои и кинза", en: "Bean sprouts and mint", pl: "Kiełki fasoli mung i kolendra" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Рыбный соус", en: "Fish sauce", pl: "Sos rybny" }, qty: 30, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.50 }
    ],
    steps: [
      {
        ru: "Прокалите на сухой сковороде звездочки бадьяна, корицу, лук и имбирь, опустите в говяжий бульон и томите 30 минут.",
        en: "Char spices, onion, and ginger in a dry pan; simmer in rich beef bone broth for 30 minutes.",
        pl: "Przypal na suchej patelni anyż, cynamon, cebulę i imbir, wrzuć do wywaru wołowego i gotuj 30 minut."
      },
      {
        ru: "Отварите рисовую лапшу фо 3 минуты и разложите по глубоким боулам.",
        en: "Boil flat rice noodles for 3 minutes, rinse with cold water, and divide into large bowls.",
        pl: "Ugotuj makaron ryżowy przez 3 minuty i ułóż w głębokich miskach."
      },
      {
        ru: "Сверху выложите тончайшие ломтики сырой говядины и залейте кипящим бульоном (мясо приготовится мгновенно). Посыпьте ростками и лаймом.",
        en: "Top with paper-thin slices of raw beef tenderloin and pour scalding hot broth over to cook it instantly. Garnish with lime and herbs.",
        pl: "Na makaronie ułóż cieniutkie plastry surowej wołowiny i zalej wrzącym bulionem. Dodaj kiełki i limonkę."
      }
    ]
  },
  {
    id: "kharcho-beef",
    title: { ru: "Пряный грузинский суп Харчо с грецкими орехами", en: "Georgian Spicy Beef Kharcho Soup", pl: "Gruzińskie Pikantne Charcho z wołowiną" },
    category: "soup",
    prepTime: { ru: "55 мин", en: "55 min", pl: "55 min" },
    calories: 440,
    rating: 4.96,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Ароматный густой грузинский суп с сочной говядиной, рисом, соусом ткемали, хмели-сунели и дроблеными орехами.",
      en: "Rich Georgian beef stew-soup cooked with tkemali plum sauce, crushed walnuts, rice, garlic, and khmeli-suneli herbs.",
      pl: "Gęsta i pikantna zupa gruzińska z wołowiny, ryżu, śliwkowego sosu tkemali, orzechów włoskich i ziół."
    },
    ingredients: [
      { name: { ru: "Говяжья грудинка", en: "Beef brisket", pl: "Mostek wołowy" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 15.50 },
      { name: { ru: "Соус Ткемали", en: "Tkemali plum sauce", pl: "Sos Tkemali" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Грецкие орехи", en: "Walnuts", pl: "Orzechy włoskie" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.20 },
      { name: { ru: "Рис круглозерный", en: "Short-grain rice", pl: "Ryż" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 },
      { name: { ru: "Хмели-сунели и чеснок", en: "Khmeli-suneli & garlic", pl: "Chmeli-suneli i czosnek" }, qty: 20, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 }
    ],
    steps: [
      {
        ru: "Сварите наваристый бульон из кусочков говядины с лавровым листом (45 минут).",
        en: "Simmer beef brisket cubes in seasoned water with bay leaves for 45 minutes until tender.",
        pl: "Ugotuj aromatyczny wywar z kawałków mostka wołowego z liściem laurowym."
      },
      {
        ru: "Добавьте промытый рис и пассерованный лук с томатами и специями хмели-сунели.",
        en: "Add rinsed rice and sautéed onions seasoned with tomatoes and aromatic khmeli-suneli spice mix.",
        pl: "Dodaj przepłukany ryż oraz podsmażoną cebulę z pomidorami i przyprawą chmeli-suneli."
      },
      {
        ru: "В ступке растолките чеснок с орехами и кинзой, вмешайте в суп вместе с соусом ткемали за 5 минут до готовности.",
        en: "Pound walnuts, garlic, and cilantro in a mortar, stir into soup along with tkemali sauce 5 mins before serving.",
        pl: "Utrzyj orzechy z czosnkiem i kolendrą, dodaj do zupy z sosem tkemali na 5 minut przed końcem gotowania."
      }
    ]
  },
  {
    id: "pumpkin-ginger-soup",
    title: { ru: "Пряный тыквенный крем-суп с имбирем", en: "Spiced Pumpkin Ginger Coconut Soup", pl: "Pikantny Krem z dyni z imbirem i mlekiem kokosowym" },
    category: "soup",
    prepTime: { ru: "30 мин", en: "30 min", pl: "30 min" },
    calories: 220,
    rating: 4.92,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Согревающий бархатный крем-суп из запеченной мускатной тыквы на кокосовом молоке с хрустящими тыквенными семечками.",
      en: "Silky warming roasted butternut squash soup infused with fresh ginger, creamy coconut milk, and toasted pumpkin seeds.",
      pl: "Rozgrzewający aksamitny krem z pieczonej dyni piżmowej na mleczku kokosowym z prażonymi pestkami."
    },
    ingredients: [
      { name: { ru: "Тыква мускатная очищенная", en: "Butternut squash", pl: "Dynia piżmowa" }, qty: 600, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Кокосовое молоко", en: "Coconut milk", pl: "Mleczko kokosowe" }, qty: 200, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 4.90 },
      { name: { ru: "Свежий корень имбиря", en: "Fresh ginger root", pl: "Świeży imbir" }, qty: 20, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.80 },
      { name: { ru: "Тыквенные семечки", en: "Pumpkin seeds", pl: "Pestki dyni" }, qty: 30, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 },
      { name: { ru: "Мускатный орех", en: "Ground nutmeg", pl: "Gałka muszkatołowa" }, qty: 2, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 0.80 }
    ],
    steps: [
      {
        ru: "Запеките кубики тыквы в духовке при 200°C 20 минут до мягкости и карамелизации.",
        en: "Roast cubed pumpkin with olive oil at 200°C for 20 mins until caramelized and tender.",
        pl: "Upiecz pokrojoną dynię w piekarniku w 200°C przez 20 minut do miękkości."
      },
      {
        ru: "Переложите тыкву в кастрюлю, добавьте тертый имбирь, щепотку мускатного ореха и залейте горячим бульоном.",
        en: "Transfer roasted pumpkin to pot, add freshly grated ginger, nutmeg, and hot vegetable broth.",
        pl: "Przełóż upieczoną dynię do garnka, dodaj starty imbir, gałkę i zalej gorącym bulionem."
      },
      {
        ru: "Влейте кокосовое молоко, пробейте блендером до шелковистости и подавайте с обжаренными семечками.",
        en: "Pour in coconut milk, blend until ultra-smooth, and garnish with toasted crunchy pumpkin seeds.",
        pl: "Wlej mleczko kokosowe, zblenduj na aksamitny krem i podawaj z uprażonymi pestkami dyni."
      }
    ]
  },
  {
    id: "turkish-mercimek",
    title: { ru: "Турецкий чечевичный суп Мерджимек", en: "Turkish Red Lentil Mercimek Soup", pl: "Turecka Zupa z czerwonej soczewicy Mercimek" },
    category: "soup",
    prepTime: { ru: "30 мин", en: "30 min", pl: "30 min" },
    calories: 260,
    rating: 4.95,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Шелковистый суп из красной чечевицы с мятой, паприкой, лимоном и горячим соусом из сливочного масла.",
      en: "Classic velvety Turkish red lentil soup served with spicy sizzling mint butter and lemon wedges.",
      pl: "Tradycyjny aksamitny krem z czerwonej soczewicy serwowany z aromatycznym masłem z miętą i cytryną."
    },
    ingredients: [
      { name: { ru: "Красная чечевица", en: "Red split lentils", pl: "Soczewica czerwona" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Морковь и лук", en: "Carrot and onion", pl: "Marchewka i cebula" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.00 },
      { name: { ru: "Сливочное масло", en: "Butter", pl: "Masło" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 },
      { name: { ru: "Сушеная мята и паприка", en: "Dried mint & sweet paprika", pl: "Suszona mięta i papryka" }, qty: 10, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 },
      { name: { ru: "Лимон", en: "Lemon", pl: "Cytryna" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.50 }
    ],
    steps: [
      {
        ru: "Обжарьте лук и морковь в кастрюле, всыпьте промытую красную чечевицу, залейте 1.2 л воды и варите 20 минут.",
        en: "Sauté onion and carrot, add rinsed red lentils, pour 1.2L water or broth, and cook 20 mins until soft.",
        pl: "Podsmaż cebulę i marchewkę, dodaj przepłukaną soczewicę, zalej wodą i gotuj 20 minut."
      },
      {
        ru: "Пробейте суп погружным блендером до кремообразного состояния, посолите по вкусу.",
        en: "Puree with immersion blender until completely silky and smooth, season with salt and cumin.",
        pl: "Zblenduj zupę blenderem ręcznym na aksamitny krem, dopraw solą i kminem rzymskim."
      },
      {
        ru: "Растопите сливочное масло с сушеной мятой и сладкой паприкой, полейте суп при подаче с долькой лимона.",
        en: "Sizzle butter with dried mint and sweet paprika in small skillet, swirl on top of soup, serve with lemon.",
        pl: "Rozgrzej masło z suszoną miętą i papryką, polej po wierzchu zupy i podawaj z cząstką cytryny."
      }
    ]
  },
  {
    id: "chicken-noodle-soup",
    title: { ru: "Куриный бульон с домашней лапшой", en: "Classic Chicken Noodle Soup", pl: "Tradycyjny Polski Rosół z makaronem" },
    category: "soup",
    prepTime: { ru: "60 мин", en: "60 min", pl: "60 min" },
    calories: 280,
    rating: 4.96,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Прозрачный золотистый домашний куриный бульон с нежными кусочками птицы, морковью и яичной лапшой.",
      en: "Golden comforting homemade chicken broth with tender chicken meat, carrot coins, and egg noodles.",
      pl: "Tradycyjny złocisty domowy rosół drobiowy z delikatnym mięsem, marchewką i makaronem jajecznym."
    },
    ingredients: [
      { name: { ru: "Курица домашняя (бедра/голени)", en: "Chicken thighs or bone-in", pl: "Kurczak porcja rosołowa" }, qty: 500, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 9.50 },
      { name: { ru: "Лапша яичная", en: "Egg noodles", pl: "Makaron jajeczny wstążki" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.80 },
      { name: { ru: "Морковь и сельдерей", en: "Carrot and celery", pl: "Marchew i seler (włoszczyzna)" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Свежая петрушка", en: "Fresh parsley", pl: "Natka pietruszki" }, qty: 30, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.80 }
    ],
    steps: [
      {
        ru: "Положите курицу в холодную воду, доведите до кипения, снимите пену и варите на самом тихом огне 60 минут с овощами.",
        en: "Place chicken in cold water, bring to gentle simmer, skim foam, and simmer on lowest heat for 60 mins with vegetables.",
        pl: "Włóż kurczaka do zimnej wody, zagotuj na małym ogniu, zbierz szumowiny i gotuj powoli 60 minut z włoszczyzną."
      },
      {
        ru: "Отдельно отварите яичную лапшу в подсоленной воде, чтобы бульон оставался кристально прозрачным.",
        en: "Boil egg noodles separately in salted water so the broth remains crystal clear.",
        pl: "Ugotuj makaron jajeczny osobno w osolonej wodzie, aby rosół pozostał idealnie przejrzysty."
      },
      {
        ru: "Выложите лапшу в тарелку, положите кусочки куриного мяса, морковь, залейте горячим бульоном и посыпьте петрушкой.",
        en: "Arrange noodles in bowls with shredded chicken and carrots, ladle piping-hot golden broth, and top with parsley.",
        pl: "Ułóż makaron w miskach, dodaj kawałki mięsa i marchewki, zalej gorącym rosołem i posyp natką pietruszki."
      }
    ]
  },
  {
    id: "pea-soup-smoked-ribs",
    title: { ru: "Гороховый суп с копчеными ребрышками", en: "Split Pea Soup with Smoked Ribs", pl: "Wojskowa Grochówka na wędzonych żeberkach" },
    category: "soup",
    prepTime: { ru: "65 мин", en: "65 min", pl: "65 min" },
    calories: 460,
    rating: 4.95,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Густой наваристый суп из разварного желтого гороха с копчеными свиными ребрышками и хрустящими чесночными гренками.",
      en: "Hearty, velvety yellow split pea soup simmered with tender smoked pork ribs and aromatic marjoram.",
      pl: "Sycąca tradycyjna grochówka na wędzonych żeberkach wieprzowych z ziemniakami i majerankiem."
    },
    ingredients: [
      { name: { ru: "Свиные копченые ребрышки", en: "Smoked pork ribs", pl: "Żeberka wieprzowe wędzone" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 12.90 },
      { name: { ru: "Горох колотый желтый", en: "Yellow split peas", pl: "Groch łuskany żółty" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.80 },
      { name: { ru: "Картофель", en: "Potatoes", pl: "Ziemniaki" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.80 },
      { name: { ru: "Морковь и лук", en: "Carrot and onion", pl: "Marchew i cebula" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.00 },
      { name: { ru: "Чеснок и майоран", en: "Garlic and marjoram", pl: "Czosnek i majeranek" }, qty: 15, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 }
    ],
    steps: [
      {
        ru: "Сварите бульон из копченых ребрышек с промытым горохом (варить около 45 минут до мягкости гороха).",
        en: "Simmer smoked ribs with rinsed split peas for about 45 mins until peas begin to melt into a thick broth.",
        pl: "Gotuj wędzone żeberka z opłukanym grochem przez ok. 45 minut do rozgotowania grochu."
      },
      {
        ru: "Достаньте ребрышки, снимите мясо с костей, верните в кастрюлю вместе с кубиками картофеля и пассерованными овощами.",
        en: "Remove ribs, shred meat off bone, return to pot with diced potatoes and sautéed aromatics.",
        pl: "Wyjmij żeberka, obierz mięso z kości, wrzuć z powrotem do zupy z ziemniakami i podsmażoną włoszczyzną."
      },
      {
        ru: "Варите 15 минут, в конце добавьте измельченный чеснок и щедрую щепотку майорана.",
        en: "Cook 15 mins more, finish with minced garlic and crushed marjoram. Serve hot with garlic toasts.",
        pl: "Gotuj jeszcze 15 minut, na koniec dopraw czosnkiem i obficie majerankiem."
      }
    ]
  },
  {
    id: "minestrone-classic",
    title: { ru: "Итальянский овощной суп Минестроне", en: "Classic Italian Minestrone", pl: "Włoska zupa Minestrone" },
    category: "soup",
    prepTime: { ru: "40 мин", en: "40 min", pl: "40 min" },
    calories: 220,
    rating: 4.88,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Густой тосканский суп с сезонными овощами, фасолью cannellini, пастой диталини и тертым пармезаном.",
      en: "Hearty Tuscan vegetable soup with beans, short pasta, fresh herbs and a touch of aged parmesan.",
      pl: "Gęsta toskańska zupa jarzynowa z białą fasolą, drobnym makaronem i tartym parmezanem."
    },
    ingredients: [
      { name: { ru: "Фасоль белая консервированная", en: "White cannellini beans", pl: "Fasola biała konserwowa" }, qty: 240, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Цукини и стебель сельдерея", en: "Zucchini and celery", pl: "Cukinia i seler naciowy" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Томаты резаные в соку", en: "Diced canned tomatoes", pl: "Pomidory krojone w puszce" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.80 },
      { name: { ru: "Паста диталини или ракушки", en: "Ditalini or small pasta", pl: "Drobny makaron" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.60 },
      { name: { ru: "Пармезан и базилик", en: "Parmesan and basil", pl: "Parmezan i bazylia" }, qty: 30, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 }
    ],
    steps: [
      {
        ru: "Обжарьте кубики моркови, лука, цукини и сельдерея на оливковом масле до мягкости.",
        en: "Sauté diced carrots, onions, zucchini and celery in extra virgin olive oil until fragrant.",
        pl: "Podsmaż marchewkę, cebulę, cukinię i seler naciowy na oliwie z oliwek."
      },
      {
        ru: "Добавьте томаты в соку, овощной бульон и фасоль. Варите на медленном огне 15 минут.",
        en: "Pour in canned tomatoes, vegetable broth, and rinsed beans. Simmer gently for 15 minutes.",
        pl: "Wlej pomidory, bulion warzywny i fasolę. Gotuj na wolnym ogniu przez 15 minut."
      },
      {
        ru: "Всыпьте пасту, проварите 8 минут al dente. Подавайте с тертым пармезаном и свежим базиликом.",
        en: "Add ditalini pasta and cook 8 minutes until al dente. Serve warm garnished with parmesan.",
        pl: "Wsyp makaron, gotuj 8 minut al dente. Podawaj posypane parmezanem i świeżą bazylią."
      }
    ]
  },
  {
    id: "ukha-classic-fish",
    title: { ru: "Уха царская с лососем и судаком", en: "Royal Fish Soup Ukha", pl: "Królewska zupa rybna Ucha" },
    category: "soup",
    prepTime: { ru: "45 мин", en: "45 min", pl: "45 min" },
    calories: 290,
    rating: 4.96,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Прозрачный ароматный рыбный суп с крупными кусочками лосося, судака, картофелем и свежим укропом.",
      en: "Crystal clear aromatic fish broth cooked with delicate salmon, pike-perch fillets, and dill.",
      pl: "Klarowna, wykwintna zupa rybna z łososiem, sandaczem, młodymi ziemniakami i koperkiem."
    },
    ingredients: [
      { name: { ru: "Филе лосося и судака", en: "Salmon and pike-perch fillets", pl: "Filet z łososia i sandacza" }, qty: 350, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 19.90 },
      { name: { ru: "Картофель молодой", en: "Baby potatoes", pl: "Młode ziemniaki" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.50 },
      { name: { ru: "Морковь и лук-порей", en: "Carrot and leek", pl: "Marchew i por" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.00 },
      { name: { ru: "Свежий укроп и лавровый лист", en: "Fresh dill and bay leaf", pl: "Koperek i liść laurowy" }, qty: 20, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.60 }
    ],
    steps: [
      {
        ru: "Сварите прозрачный легкий бульон с морковью, пореем, перцем горошком и лавровым листом.",
        en: "Prepare a clear fragrant broth with sliced carrots, leeks, black peppercorns and bay leaves.",
        pl: "Ugotuj klarowny wywar z warzyw, pora, ziela angielskiego i liścia laurowego."
      },
      {
        ru: "Добавьте картофель кубиками и варите 10 минут до полуготовности.",
        en: "Add diced potatoes and cook gently for 10 minutes until almost tender.",
        pl: "Dodaj pokrojone w kostkę ziemniaki i gotuj przez 10 minut."
      },
      {
        ru: "Выложите крупные куски благородной рыбы, варите ровно 6 минут на тихом огне. Всыпьте укроп и снимите с плиты.",
        en: "Gently add large fish chunks, simmer for 6 minutes, finish with a heap of fresh dill.",
        pl: "Włóż kawałki ryb, gotuj delikatnie 6 minut. Wsyp koperek i zdejmij z ognia."
      }
    ]
  }
];

