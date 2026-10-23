import { Recipe } from '../../types';

export const MAIN_RECIPES: Recipe[] = [
  {
    id: "ribeye-steak",
    title: { ru: "Стейк Рибай с розмарином и чесночным маслом", en: "Ribeye Steak with Rosemary Butter", pl: "Stek Ribeye z masłem rozmarynowym" },
    category: "main",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 640,
    rating: 4.98,
    difficulty: { ru: "Сложно", en: "Hard", pl: "Trudny" },
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/5-9M4d23q0U",
    description: {
      ru: "Мраморная говядина зернового откорма, обжаренная до корочки с поливанием топленым сливочным маслом и травами.",
      en: "Grain-fed marbled beef ribeye seared with a caramelized crust and basted with foaming rosemary butter.",
      pl: "Marmurkowa wołowina smażona na chrupiąco i polewana aromatycznym masłem z czosnkiem i rozmarynem."
    },
    ingredients: [
      { name: { ru: "Стейк Рибай", en: "Ribeye beef steak", pl: "Stek z antrykotu (Ribeye)" }, qty: 350, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 28.50 },
      { name: { ru: "Сливочное масло 82%", en: "Butter 82%", pl: "Masło 82%" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 },
      { name: { ru: "Розмарин и тимьян", en: "Rosemary & thyme", pl: "Rozmaryn i tymianek" }, qty: 10, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 },
      { name: { ru: "Чеснок", en: "Garlic cloves", pl: "Czosnek" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.00 }
    ],
    steps: [
      {
        ru: "Достаньте стейк из холода за 30 минут до жарки, промокните бумажным полотенцем и щедро посолите крупной солью.",
        en: "Bring steak to room temp for 30 mins, pat thoroughly dry with paper towels, and season liberally with coarse salt.",
        pl: "Wyjmij stek z lodówki 30 minut przed smażeniem, osusz ręcznikiem i posyp gruboziarnistą solą."
      },
      {
        ru: "Раскалите чугунную сковороду с каплей растительного масла. Жарьте стейк по 2.5 минуты с каждой стороны.",
        en: "Heat heavy cast iron skillet until smoking hot. Sear steak undisturbed for 2.5 minutes per side.",
        pl: "Rozgrzej mocno patelnię żeliwną z odrobiną oleju. Smaż stek po 2.5 minuty z każdej strony."
      },
      {
        ru: "Убавьте огонь, добавьте сливочное масло, раздавленный чеснок и травы. Поливайте стейк маслом 1.5 минуты, затем дайте отдохнуть 5 минут.",
        en: "Lower heat, drop butter, smashed garlic, and herbs. Baste continuously for 90 seconds, then rest 5 minutes before slicing.",
        pl: "Zmniejsz ogień, dodaj masło, czosnek i zioła. Podlewaj mięso masłem przez 1.5 minuty, a potem odstaw na 5 minut."
      }
    ]
  },
  {
    id: "beef-stroganoff",
    title: { ru: "Бефстроганов со сливочным соусом и пюре", en: "Classic Beef Stroganoff with Mashed Potatoes", pl: "Boeuf Stroganow z puree ziemniaczanym" },
    category: "main",
    prepTime: { ru: "40 мин", en: "40 min", pl: "40 min" },
    calories: 540,
    rating: 4.96,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Тонкие полоски нежной говяжьей вырезки, быстро обжаренные с луком и шампиньонами в бархатном соусе со сметаной и дижонской горчицей.",
      en: "Tender strips of beef seared and enveloped in a creamy mushroom, sour cream, and Dijon mustard sauce.",
      pl: "Delikatne paski polędwicy wołowej podsmażone z pieczarkami w aksamitnym sosie śmietanowo-musztardowym."
    },
    ingredients: [
      { name: { ru: "Говяжья вырезка", en: "Beef tenderloin", pl: "Polędwica wołowa" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 24.90 },
      { name: { ru: "Шампиньоны свежие", en: "Mushrooms", pl: "Pieczarki świeże" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Сметана 20-24%", en: "Sour cream", pl: "Śmietana 18-24%" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.00 },
      { name: { ru: "Дижонская горчица", en: "Dijon mustard", pl: "Musztarda dijon" }, qty: 20, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.80 },
      { name: { ru: "Сливочное масло", en: "Butter", pl: "Masło" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 }
    ],
    steps: [
      {
        ru: "Нарежьте говядину поперек волокон тонкими брусочками 1 см. Обжаривайте порциями на раскаленной сковороде по 2 минуты.",
        en: "Slice beef across grain into thin strips. Flash-sear in small batches on smoking pan for 2 mins to retain juiciness.",
        pl: "Pokrój wołowinę w poprzek włókien w paski. Smaż partiami na bardzo gorącej patelni po 2 minuty."
      },
      {
        ru: "На той же сковороде спассеруйте лук и шампиньоны до золотистости, добавьте горчицу и сметану.",
        en: "Sauté onions and mushrooms until golden, stir in Dijon mustard and sour cream, simmer gently.",
        pl: "Na tej samej patelni podsmaż cebulę i pieczarki na złoto, dodaj musztardę i śmietanę."
      },
      {
        ru: "Верните мясо в соус, прогрейте 2 минуты (не кипятить) и подавайте со сливочным картофельным пюре.",
        en: "Return beef to the sauce, warm through for 2 minutes without boiling, and serve over creamy mashed potatoes.",
        pl: "Włóż mięso z powrotem do sosu, podgrzewaj 2 minuty nie doprowadzając do wrzenia, i podawaj z puree."
      }
    ]
  },
  {
    id: "chicken-kiev",
    title: { ru: "Котлеты по-киевски с зеленым маслом", en: "Authentic Chicken Kiev", pl: "Kotlet De Volaille z masłem ziołowym" },
    category: "main",
    prepTime: { ru: "45 мин", en: "45 min", pl: "45 min" },
    calories: 520,
    rating: 4.95,
    difficulty: { ru: "Сложно", en: "Hard", pl: "Trudny" },
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Хрустящее куриное филе в золотистой панировке с фонтанирующим ароматным сливочным маслом и укропом внутри.",
      en: "Crisp golden breaded chicken breast pocket bursting with melted garlic-herb butter when sliced.",
      pl: "Chrupiący panierowany kotlet z piersi kurczaka z wypływającym gorącym masłem koperkowo-czosnkowym."
    },
    ingredients: [
      { name: { ru: "Куриное филе", en: "Chicken breast fillet", pl: "Pierś z kurczaka" }, qty: 450, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 11.50 },
      { name: { ru: "Сливочное масло", en: "Butter", pl: "Masło" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Панировочные сухари Панко", en: "Panko breadcrumbs", pl: "Bułka tarta panko" }, qty: 120, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Укроп и петрушка", en: "Fresh dill & parsley", pl: "Koperek i natka pietruszki" }, qty: 25, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.00 },
      { name: { ru: "Яйца куриные", en: "Eggs", pl: "Jajka" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.00 }
    ],
    steps: [
      {
        ru: "Приготовьте зеленое масло: смешайте размягченное масло с рубленым укропом, чесноком и солью, скатайте колбаской и заморозьте.",
        en: "Make herb butter: blend softened butter with minced dill, garlic, and sea salt; roll into a log and freeze solid.",
        pl: "Przygotuj masło ziołowe: wymieszaj masło z koperkiem, czosnkiem i solą, zwiń w wałek i zamroź."
      },
      {
        ru: "Отбейте филе курицы между пленкой, заверните внутрь брусок замороженного масла, сформуйте плотную котлету.",
        en: "Pound chicken breast thin between plastic wrap, wrap frozen herb butter securely inside, forming a tight roll.",
        pl: "Rozbij pierś kurczaka, zawiń w środek wałek zamrożonego masła i uformuj ścisły kotlet."
      },
      {
        ru: "Сделайте двойную панировку (мука-яйцо-сухари), обжарьте во фритюре 4 минуты до золотистости и допеките в духовке 10 минут при 180°C.",
        en: "Double bread in flour, beaten egg, and panko. Fry 4 mins until golden, then finish in oven at 180°C for 10 mins.",
        pl: "Spanieruj dwukrotnie (mąka, jajko, panko), usmaż na złoto na głębokim tłuszczu i dopiecz w piekarniku 10 minut w 180°C."
      }
    ]
  },
  {
    id: "lasagne-bolognese",
    title: { ru: "Классическая Лазанья Болоньезе", en: "Classic Lasagna Bolognese", pl: "Tradycyjna Lasagne Bolognese" },
    category: "main",
    prepTime: { ru: "65 мин", en: "65 min", pl: "65 min" },
    calories: 580,
    rating: 4.97,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Многослойная итальянская запеканка с листами пасты, медленно томленым мясным рагу болоньезе, нежным соусом бешамель и пармезаном.",
      en: "Multi-layered Italian pasta masterpiece baked with slow-cooked beef ragu, velvety béchamel sauce, and golden Parmesan crust.",
      pl: "Wielowarstwowa zapiekanka z płatów makaronu, wolno gotowanego ragu mięsnego, beszamelu i parmezanu."
    },
    ingredients: [
      { name: { ru: "Листы для лазаньи", en: "Lasagna sheets", pl: "Płaty makaronu do lasagne" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.50 },
      { name: { ru: "Фарш говяжий", en: "Minced beef", pl: "Mielona wołowina" }, qty: 500, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 14.90 },
      { name: { ru: "Томаты протертые (пассата)", en: "Tomato passata", pl: "Passata pomidorowa" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.80 },
      { name: { ru: "Молоко и сливочное масло (бешамель)", en: "Milk and butter for bechamel", pl: "Mleko i masło do beszamelu" }, qty: 500, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 5.20 },
      { name: { ru: "Сыр Моцарелла и Пармезан", en: "Mozzarella and Parmesan", pl: "Ser Mozzarella i Parmezan" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 8.90 }
    ],
    steps: [
      {
        ru: "Приготовьте рагу болоньезе: обжарьте лук, морковь и фарш, влейте томаты и тушите 35 минут на тихом огне.",
        en: "Cook Bolognese: brown soffritto and minced beef, pour in tomato passata, season with oregano and simmer 35 mins.",
        pl: "Przygotuj sos bolognese: podsmaż warzywa i mięso, dodaj passatę pomidorową i duś na małym ogniu 35 minut."
      },
      {
        ru: "Сварите соус бешамель из сливочного масла, муки и теплого молока со щепоткой мускатного ореха.",
        en: "Prepare silky béchamel: melt butter, whisk in flour, gradually stream in warm milk, and season with nutmeg.",
        pl: "Zrób beszamel z masła, mąki i ciepłego mleka z dodatkiem gałki muszkatołowej."
      },
      {
        ru: "Соберите лазанью слоями: соус, листы пасты, болоньезе, бешамель, сыр. Выпекайте при 180°C 35 минут до румяной корочки.",
        en: "Layer lasagna: sauce, sheets, Bolognese, béchamel, and cheeses. Bake at 180°C for 35 mins until bubbling and golden.",
        pl: "Układaj warstwami: płaty, bolognese, beszamel i ser. Piecz w 180°C przez 35 minut do zrumienienia."
      }
    ]
  },
  {
    id: "uzbek-pilaf",
    title: { ru: "Узбекский плов с бараниной в казане", en: "Traditional Uzbek Lamb Pilaf", pl: "Tradycyjny Uzbecki Płow z baraniną" },
    category: "main",
    prepTime: { ru: "70 мин", en: "70 min", pl: "70 min" },
    calories: 620,
    rating: 4.98,
    difficulty: { ru: "Сложно", en: "Hard", pl: "Trudny" },
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Настоящий праздничный плов с сочной бараниной, рассыпчатым рисом девзира, сладкой желтой морковью, зирой и чесноком.",
      en: "Celebratory Central Asian rice pilaf cooked in a cast iron cauldron with tender lamb, sweet carrots, cumin, and garlic.",
      pl: "Uroczysty płow przygotowany w kociołku z delikatną baraniną, sypkim ryżem, marchewką, kuminem i główkami czosnku."
    },
    ingredients: [
      { name: { ru: "Баранина (лопатка или мякоть)", en: "Lamb shoulder", pl: "Łopatka barania lub jagnięca" }, qty: 600, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 28.00 },
      { name: { ru: "Рис для плова (девзира или басмати)", en: "Pilaf rice", pl: "Ryż do płowu" }, qty: 500, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 6.50 },
      { name: { ru: "Морковь соломкой", en: "Julienned carrots", pl: "Marchew w paski" }, qty: 500, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.80 },
      { name: { ru: "Лук репчатый", en: "Onions", pl: "Cebula" }, qty: 300, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 },
      { name: { ru: "Зира (кумин) и барбарис", en: "Cumin and barberries", pl: "Kumin i berberys" }, qty: 25, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 }
    ],
    steps: [
      {
        ru: "В раскаленном масле в казане обжарьте мясо крупными кусками до темно-золотой корочки, добавьте лук.",
        en: "Brown lamb chunks deeply in hot oil in a heavy cauldron, then add sliced onions until golden.",
        pl: "W rozgrzanym oleju w kociołku obsmaż kawałki mięsa na ciemnozłoty kolor, dodaj cebulę."
      },
      {
        ru: "Приготовьте зирвак: выложите морковь, всыпьте зиру, влейте воду, утопите головки чеснока и томите 35 минут.",
        en: "Make zirvak base: add carrots, cumin, dried barberries, submerge whole garlic heads, and simmer 35 mins.",
        pl: "Zrób zirwak: dodaj marchew, kumin, berberys, zanurz całe główki czosnku i gotuj na małym ogniu 35 minut."
      },
      {
        ru: "Ровным слоем засыпьте промытый рис, залейте кипятком на 1.5 см выше риса. Выпарите воду, соберите горкой и томите под крышкой 25 минут.",
        en: "Spread washed rice in an even layer, add water 1.5cm above rice, evaporate liquid, dome rice, and steam covered for 25 mins.",
        pl: "Rozsyp równomiernie ryż, zalej wrzątkiem na 1.5 cm powyżej, odparuj wodę, uformuj kopiec i gotuj pod przykryciem 25 minut."
      }
    ]
  },
  {
    id: "butter-chicken",
    title: { ru: "Курица Карри Tikka Masala по-индийски", en: "Indian Butter Chicken Curry", pl: "Indyjskie Butter Chicken Curry" },
    category: "main",
    prepTime: { ru: "35 мин", en: "35 min", pl: "35 min" },
    calories: 560,
    rating: 4.96,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Кусочки запеченной пряной курицы в бархатном томатно-сливочном соусе с маслом гхи, гарам масалой и свежей кинзой.",
      en: "Tender roasted chicken pieces swimming in a luscious, mildly spiced tomato cream and butter curry sauce.",
      pl: "Kawałki aromatycznego kurczaka w aksamitnym sosie pomidorowo-śmietankowym z masłem i przyprawą garam masala."
    },
    ingredients: [
      { name: { ru: "Куриное филе бедра", en: "Chicken thigh fillet", pl: "Uda z kurczaka bez kości" }, qty: 500, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 12.90 },
      { name: { ru: "Томаты протертые", en: "Crushed tomatoes", pl: "Pomidory krojone" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Сливки 30%", en: "Heavy cream", pl: "Śmietanka 30%" }, qty: 150, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 3.80 },
      { name: { ru: "Сливочное масло", en: "Butter", pl: "Masło" }, qty: 50, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 },
      { name: { ru: "Гарам масала и имбирь", en: "Garam masala & ginger", pl: "Garam masala i imbir" }, qty: 25, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.00 }
    ],
    steps: [
      {
        ru: "Замаринуйте кусочки курицы в йогурте со специями и обжарьте на сильном огне до румяной корочки.",
        en: "Marinate chicken chunks in spiced yogurt, then sear on high heat until charred at the edges.",
        pl: "Zrób marynatę z jogurtu i przypraw, zamarynuj kurczaka i podsmaż na dużym ogniu."
      },
      {
        ru: "Приготовьте соус: обжарьте имбирь и чеснок на масле, добавьте томаты, тушите 15 минут, затем пробейте блендером.",
        en: "Make sauce: cook ginger and garlic in butter, add tomatoes, simmer 15 mins, and blend until completely smooth.",
        pl: "Przygotuj sos: podsmaż imbir i czosnek na maśle, dodaj pomidory, duś 15 minut i zblenduj na gładko."
      },
      {
        ru: "Влейте в соус сливки, положите сливочное масло, опустите курицу и потомите 5 минут. Подавайте с рисом басмати.",
        en: "Pour in cream, stir in butter, add chicken, and simmer for 5 minutes. Serve with fluffy basmati rice and warm naan.",
        pl: "Wlej śmietankę, dodaj masło, wrzuć kurczaka i gotuj 5 minut. Podawaj z ryżem basmati lub chlebkiem naan."
      }
    ]
  },
  {
    id: "grilled-salmon-asparagus",
    title: { ru: "Лосось на гриле со спаржей и лимоном", en: "Grilled Salmon with Asparagus", pl: "Grillowany Łosoś ze szparagami i cytryną" },
    category: "main",
    prepTime: { ru: "25 мин", en: "25 min", pl: "25 min" },
    calories: 480,
    rating: 4.97,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Нежное филе атлантического лосося с хрустящей корочкой, подается с молодой зеленой спаржей и соусом песто.",
      en: "Crispy-skinned Atlantic salmon fillet paired with tender-crisp garlic asparagus and fresh lemon herb butter.",
      pl: "Soczysty filet z łososia atlantyckiego z chrupiącą skórką serwowany z młodymi zielonymi szparagami i cytryną."
    },
    ingredients: [
      { name: { ru: "Стейк или филе лосося", en: "Fresh salmon fillet", pl: "Filet ze świeżego łososia" }, qty: 350, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 22.90 },
      { name: { ru: "Спаржа зеленая", en: "Green asparagus", pl: "Szparagi zielone" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 8.90 },
      { name: { ru: "Оливковое масло", en: "Olive oil", pl: "Oliwa z oliwek" }, qty: 30, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.20 },
      { name: { ru: "Лимон", en: "Fresh lemon", pl: "Świeża cytryna" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.50 }
    ],
    steps: [
      {
        ru: "Обломите жесткие кончики спаржи, сбрызните оливковым маслом и обжарьте на гриле 4-5 минут.",
        en: "Snap woody ends off asparagus, toss with olive oil, salt, and grill for 4-5 minutes until bright green.",
        pl: "Ołam twarde końcówki szparagów, skrop oliwą, posól i grilluj przez 4-5 minut na chrupko."
      },
      {
        ru: "Выложите лосось кожей вниз на раскаленную сковороду и жарьте 4 минуты, затем переверните еще на 2 минуты.",
        en: "Place salmon skin-side down on hot grill pan for 4 minutes until crisp, flip for 2 minutes to keep medium-rare.",
        pl: "Połóż łososia skórą do dołu na gorącej patelni i smaż 4 minuty, a potem obróć na kolejne 2 minuty."
      },
      {
        ru: "Подавайте с долькой лимона и соусом из сливочного масла с травами.",
        en: "Plate salmon over grilled asparagus spears, finish with freshly squeezed lemon juice and herb butter.",
        pl: "Ułóż łososia na szparagach, skrop sokiem z cytryny i podawaj z masłem ziołowym."
      }
    ]
  },
  {
    id: "seafood-paella",
    title: { ru: "Испанская паэлья с морепродуктами", en: "Spanish Seafood Paella Marinera", pl: "Hiszpańska Paella z owocami morza" },
    category: "main",
    prepTime: { ru: "45 мин", en: "45 min", pl: "45 min" },
    calories: 510,
    rating: 4.96,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Традиционная валенсийская паэлья с золотистым рисом бомба, шафраном, мидиями, тигровыми креветками и кальмарами.",
      en: "Authentic Valencian paella cooked with saffron-infused bomba rice, tiger prawns, fresh mussels, and calamari.",
      pl: "Tradycyjna hiszpańska paella z ryżem bomba nasączonym szafranem, krewetkami, małżami i kalmarami."
    },
    ingredients: [
      { name: { ru: "Рис Бомба или круглозерный", en: "Bomba paella rice", pl: "Ryż do paelli bomba" }, qty: 300, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.50 },
      { name: { ru: "Креветки тигровые", en: "Tiger prawns", pl: "Krewetki tygrysie" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 15.90 },
      { name: { ru: "Мидии в ракушках", en: "Mussels in shells", pl: "Małże w muszlach" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 8.50 },
      { name: { ru: "Кольца кальмара", en: "Squid rings", pl: "Krążki kalmarów" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 7.20 },
      { name: { ru: "Шафран и паприка", en: "Spanish saffron & paprika", pl: "Szafran i słodka papryka" }, qty: 5, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.00 }
    ],
    steps: [
      {
        ru: "В широкой паэльере обжарьте морепродукты на оливковом масле 3 минуты и отложите.",
        en: "Sear prawns, squid, and mussels in wide paella pan for 3 minutes, remove to keep tender.",
        pl: "Na szerokiej patelni podsmaż owoce morza na oliwie przez 3 minuty i zdejmij na talerz."
      },
      {
        ru: "Сделайте софрито из лука, чеснока и томатов. Всыпьте рис, добавьте шафран и влейте горячий рыбный бульон.",
        en: "Make sofrito with garlic and grated tomatoes. Stir in dry rice, bloom saffron, and pour hot seafood stock.",
        pl: "Zrób sofrito z czosnku i pomidorów. Wsyp ryż, dodaj szafran i zalej gorącym wywarem rybnym."
      },
      {
        ru: "Варите 15 минут не перемешивая, выложите сверху морепродукты и готовьте еще 5 минут для образования корочки сокаррат.",
        en: "Simmer untouched for 15 mins, arrange seafood on top, cook 5 mins more to create crispy bottom crust (socarrat).",
        pl: "Gotuj 15 minut bez mieszania, ułóż na wierzchu owoce morza i smaż jeszcze 5 minut do powstania chrupiącego spodu socarrat."
      }
    ]
  },
  {
    id: "carbonara",
    title: { ru: "Итальянская паста Карбонара", en: "Italian Pasta Carbonara", pl: "Włoska Pasta Carbonara" },
    category: "main",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 520,
    rating: 4.95,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/3AAdKl1UYZs",
    description: {
      ru: "Классическая спагетти карбонара с хрустящей гуанчиале, яичными желтками и сыром Пекорино.",
      en: "Classic spaghetti carbonara with crispy guanciale, egg yolks, and Pecorino cheese.",
      pl: "Klasyczne spaghetti carbonara z chrupiącym guanciale, żółtkami i serem Pecorino."
    },
    ingredients: [
      { name: { ru: "Спагетти", en: "Spaghetti pasta", pl: "Makaron Spaghetti" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Гуанчиале / бекон", en: "Guanciale or bacon", pl: "Guanciale / boczek" }, qty: 120, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 6.90 },
      { name: { ru: "Яичные желтки", en: "Egg yolks", pl: "Żółtka jaj" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.70 }
    ],
    steps: [
      {
        ru: "Обжарьте брусочки гуанчиале на сухой сковороде на среднем огне 7 минут до хруста.",
        en: "Crisp guanciale batons in dry pan over medium heat for 7 minutes until fat is rendered.",
        pl: "Podsmaż paski guanciale na suchej patelni przez 7 minut na chrupko."
      },
      {
        ru: "Сварите спагетти в подсоленной воде до состояния al dente.",
        en: "Cook spaghetti in boiling salted water until perfectly al dente.",
        pl: "Ugotuj spaghetti w osolonej wodzie al dente."
      },
      {
        ru: "Смешайте желтки с сыром Пекорино, соедините горячую пасту с мясом и соусом без огня до шелковистой эмульсии.",
        en: "Whisk yolks with Pecorino, toss hot pasta with rendered pork off-heat, adding egg mix to create silky emulsion.",
        pl: "Wymieszaj żółtka z pecorino, połącz gorący makaron z mięsem i sosem poza ogniem na jedwabisty sos."
      }
    ]
  },
  {
    id: "porcini-risotto",
    title: { ru: "Кремовое ризотто с белыми грибами", en: "Creamy Porcini Mushroom Risotto", pl: "Kremowe Risotto z borowikami" },
    category: "main",
    prepTime: { ru: "30 мин", en: "30 min", pl: "30 min" },
    calories: 450,
    rating: 4.96,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Североитальянское шелковистое блюдо из риса карнароли с белыми грибами, белым вином и выдержанным пармезаном.",
      en: "Silky northern Italian carnaroli rice slowly cooked with wild porcini broth, white wine, and aged Parmigiano Reggiano.",
      pl: "Aksamitne risotto z ryżu carnaroli z leśnymi borowikami, białym winem i tartym parmezanem."
    },
    ingredients: [
      { name: { ru: "Рис Арборио или Карнароли", en: "Arborio or Carnaroli rice", pl: "Ryż do risotto Carnaroli" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.90 },
      { name: { ru: "Белые грибы", en: "Porcini mushrooms", pl: "Borowiki" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 9.80 },
      { name: { ru: "Сыр Пармезан", en: "Parmesan cheese", pl: "Parmezan" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.50 },
      { name: { ru: "Сливочное масло", en: "Cold butter", pl: "Zimne masło" }, qty: 50, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 },
      { name: { ru: "Белое сухое вино", en: "Dry white wine", pl: "Białe wino wytrawne" }, qty: 80, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 3.50 }
    ],
    steps: [
      {
        ru: "Обжарьте рис на сливочном масле с луком-шалотом до прозрачности краев (тостатура), влейте вино.",
        en: "Toast rice with minced shallots in butter until edges are translucent, deglaze with white wine.",
        pl: "Podsmaż ryż z szalotką na maśle aż ziarna staną się szkliste, zalej białym winem."
      },
      {
        ru: "По половнику подливайте горячий грибной бульон, постоянно помешивая 18 минут для выделения крахмала.",
        en: "Ladle in hot mushroom broth one scoop at a time, stirring constantly for 18 mins to extract starch.",
        pl: "Dolewaj chochelką gorący bulion grzybowy, stale mieszając przez 18 minut."
      },
      {
        ru: "Мантекаттура: снимите с огня, энергично вмешайте холодное масло и тертый пармезан до волнистой текстуры (all'onda).",
        en: "Mantecatura: take off heat, vigorously beat in cold butter and grated parmesan until wavy and creamy.",
        pl: "Mantecatura: zdejmij z ognia, energicznie wmieszaj zimne masło i tarty parmezan na kremową konsystencję."
      }
    ]
  },
  {
    id: "moules-mariniere",
    title: { ru: "Мидии в белом вине и сливках Муль Мариньер", en: "French Mussels Mariniere", pl: "Małże w białym winie i śmietance" },
    category: "main",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 360,
    rating: 4.95,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Свежие мидии в раковинах, пропаренные в ароматном соусе из лука-шалота, белого вина, чеснока, сливок и свежей петрушки.",
      en: "Fresh plump mussels steamed in a fragrant broth of white wine, shallots, garlic, double cream, and chopped parsley.",
      pl: "Świeże mule duszone w aromatycznym sosie z białego wina, szalotki, czosnku, śmietanki i natki pietruszki."
    },
    ingredients: [
      { name: { ru: "Мидии свежие в раковинах", en: "Fresh live mussels", pl: "Świeże owoce morza (mule)" }, qty: 800, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 16.90 },
      { name: { ru: "Белое сухое вино", en: "Dry white wine", pl: "Białe wino wytrawne" }, qty: 150, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 4.90 },
      { name: { ru: "Сливки 30%", en: "Heavy cream", pl: "Śmietanka 30%" }, qty: 100, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.80 },
      { name: { ru: "Сливочное масло", en: "Butter", pl: "Masło" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 },
      { name: { ru: "Чеснок и петрушка", en: "Garlic & flat parsley", pl: "Czosnek i natka pietruszki" }, qty: 25, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.00 }
    ],
    steps: [
      {
        ru: "Переберите и промойте мидии в холодной воде, удалите «бородки».",
        en: "Scrub mussels under cold running water, discard open or broken ones, and remove beards.",
        pl: "Przejrzyj i opłucz mule w zimnej wodzie, usuń wąsy, odrzuć otwarte."
      },
      {
        ru: "Обжарьте мелко нарезанный шалот и чеснок на сливочном масле в глубокой кастрюле, влейте вино.",
        en: "Sweat diced shallots and minced garlic in butter inside deep pot, pour in white wine.",
        pl: "Zeszklij posiekaną szalotkę i czosnek na maśle w garnku, wlej białe wino."
      },
      {
        ru: "Высыпьте мидии, накройте крышкой и готовьте 4-5 минут, встряхивая кастрюлю. Влейте сливки и посыпьте петрушкой.",
        en: "Add mussels, cover with lid, steam 4-5 mins shaking pot until shells open. Stir in cream and fresh parsley.",
        pl: "Wrzuć mule, przykryj pokrywką i gotuj 4-5 minut potrząsając garnkiem. Wlej śmietankę i dodaj pietruszkę."
      }
    ]
  },
  {
    id: "beef-tacos",
    title: { ru: "Мексиканские Тако с говядиной и гуакамоле", en: "Mexican Street Beef Tacos", pl: "Meksykańskie Tacos z wołowiną i guacamole" },
    category: "main",
    prepTime: { ru: "25 мин", en: "25 min", pl: "25 min" },
    calories: 450,
    rating: 4.93,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Кукурузные тортильи с пряным говяжьим фаршем, пико де гайо, сыром чеддер и кремовым гуакамоле.",
      en: "Crispy corn tortillas filled with spiced Mexican ground beef, zesty pico de gallo, and fresh guacamole.",
      pl: "Kukurydziane tortille z pikantną wołowiną, salsą pico de gallo, serem cheddar i kremowym guacamole."
    },
    ingredients: [
      { name: { ru: "Фарш говяжий", en: "Ground beef", pl: "Mielona wołowina" }, qty: 350, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 11.50 },
      { name: { ru: "Тортильи кукурузные", en: "Corn tortillas", pl: "Tortille kukurydziane" }, qty: 6, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 4.90 },
      { name: { ru: "Авокадо спелый", en: "Ripe avocado", pl: "Dojrzałe awokado" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 4.50 },
      { name: { ru: "Сыр Чеддер", en: "Cheddar cheese", pl: "Ser Cheddar" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Специи тако (кумин, чили, паприка)", en: "Taco seasoning", pl: "Przyprawa do tacos" }, qty: 20, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.00 }
    ],
    steps: [
      {
        ru: "Обжарьте фарш на сковороде со специями тако до готовности (7-8 минут).",
        en: "Brown ground beef with cumin, chili powder, and oregano until cooked through (7-8 mins).",
        pl: "Podsmaż mięso mielone z przyprawami do tacos przez 7-8 minut."
      },
      {
        ru: "Разомните авокадо с соком лайма, солью и чесноком в кремовое гуакамоле.",
        en: "Mash avocado with fresh lime juice, salt, and garlic into rich creamy guacamole.",
        pl: "Rozgnieć awokado z sokiem z limonki, solą i czosnkiem na kremowe guacamole."
      },
      {
        ru: "Подогрейте тортильи на сухой сковороде, выложите мясо, гуакамоле, томаты и тертый чеддер.",
        en: "Warm tortillas in dry skillet, fill with beef, guacamole, diced tomato salsa, and shredded cheddar.",
        pl: "Podgrzej tortille na suchej patelni, nałóż mięso, guacamole, salsę i starty ser cheddar."
      }
    ]
  },
  {
    id: "veal-schnitzel",
    title: { ru: "Венский шницель из телятины", en: "Traditional Viennese Veal Schnitzel", pl: "Sznycel Wiedeński z cielęciny" },
    category: "main",
    prepTime: { ru: "25 мин", en: "25 min", pl: "25 min" },
    calories: 520,
    rating: 4.96,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Тончайшая нежная телятина в золотистой волнистой панировке, обжаренная в топленом сливочном масле. Подается с лимоном.",
      en: "Paper-thin tender veal escalope encased in a soufflé-like golden crisp crust fried in clarified butter.",
      pl: "Cienki kotlet cielęcy w chrupiącej złocistej panierce smażony na maśle klarowanym z cytryną."
    },
    ingredients: [
      { name: { ru: "Вырезка телятины", en: "Veal cutlet", pl: "Eskalopki cielęce" }, qty: 350, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 22.90 },
      { name: { ru: "Панировочные сухари", en: "Breadcrumbs", pl: "Bułka tarta" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 },
      { name: { ru: "Топленое масло Гхи", en: "Clarified butter", pl: "Masło klarowane" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.50 },
      { name: { ru: "Яйца", en: "Eggs", pl: "Jajka" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.00 },
      { name: { ru: "Лимон", en: "Fresh lemon", pl: "Cytryna" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.50 }
    ],
    steps: [
      {
        ru: "Тонко отбейте телятину до толщины 3-4 мм, посолите и поперчите.",
        en: "Gently pound veal escalopes between cling film to an even 3-4 mm thickness.",
        pl: "Rozbij cielęcinę na grubość 3-4 mm, oprósz solą i pieprzem."
      },
      {
        ru: "Обваляйте в муке, затем во взбитом яйце и сухарях (не прижимая сухари сильно, чтобы панировка вздувалась волнами).",
        en: "Dredge in flour, beaten egg, and fresh breadcrumbs without pressing down to allow the crust to puff.",
        pl: "Otocz w mące, roztrzepanym jajku i bułce tartej, nie dociskając panierki."
      },
      {
        ru: "Обжарьте в кипящем масле гхи по 2 минуты с каждой стороны, покачивая сковороду. Подавайте с лимоном.",
        en: "Fry in swimming hot clarified butter for 2 mins per side while swirling the pan. Serve with lemon wedge.",
        pl: "Smaż w gorącym maśle klarowanym po 2 minuty z każdej strony potrząsając patelnią."
      }
    ]
  },
  {
    id: "bbq-pork-ribs",
    title: { ru: "Запеченные свиные ребрышки барбекю", en: "Sticky Glazed BBQ Pork Ribs", pl: "Pieczone Żeberka wieprzowe w sosie BBQ" },
    category: "main",
    prepTime: { ru: "90 мин", en: "90 min", pl: "90 min" },
    calories: 680,
    rating: 4.97,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Нежнейшие свиные ребрышки, запеченные до тающего состояния в пряной глазури с дымком, коричневым сахаром и медом.",
      en: "Fall-off-the-bone tender pork ribs glazed in sweet-smoky homemade barbecue sauce with honey and cider vinegar.",
      pl: "Rozpływające się w ustach żeberka wieprzowe glazurowane słodko-pikantnym sosem BBQ z miodem."
    },
    ingredients: [
      { name: { ru: "Свиные ребра мясные", en: "Pork baby back ribs", pl: "Żeberka wieprzowe paski" }, qty: 800, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 19.90 },
      { name: { ru: "Соус Барбекю (BBQ)", en: "BBQ sauce", pl: "Sos BBQ" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Мед натуральный", en: "Honey", pl: "Miód" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 },
      { name: { ru: "Яблочный уксус", en: "Apple cider vinegar", pl: "Ocet jabłkowy" }, qty: 30, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 1.50 },
      { name: { ru: "Копченая паприка и чеснок", en: "Smoked paprika & garlic", pl: "Wędzona papryka i czosnek" }, qty: 20, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.00 }
    ],
    steps: [
      {
        ru: "Снимите пленку с внутренней стороны ребер, натрите сухим маринадом из паприки, сахара и соли.",
        en: "Remove thin membrane from back of ribs, coat all over with dry rub of paprika, garlic, and brown sugar.",
        pl: "Zdejmij błonę od spodu żeberek, natrzyj przyprawami z papryką wędzoną, solą i czosnkiem."
      },
      {
        ru: "Плотно заверните в 2 слоя фольги и томите в духовке при 150°C 75 минут.",
        en: "Wrap tightly in double layer of heavy foil and bake at 150°C for 75 minutes until tender.",
        pl: "Zawiń szczelnie w folię aluminiową i piecz w 150°C przez 75 minut do miękkości."
      },
      {
        ru: "Раскройте фольгу, обильно смажьте соусом BBQ с медом и запекайте под грилем при 210°C 10 минут до карамелизации.",
        en: "Unwrap, brush heavily with honey BBQ glaze, and broil at 210°C for 10 minutes until sticky and caramelized.",
        pl: "Rozwiń folię, posmaruj obficie sosem BBQ z miodem i zapiekaj pod grillem w 210°C przez 10 minut."
      }
    ]
  },
  {
    id: "fettuccine-alfredo",
    title: { ru: "Феттучине Альфредо с тигровыми креветками", en: "Fettuccine Alfredo with Tiger Prawns", pl: "Fettuccine Alfredo z krewetkami" },
    category: "main",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 540,
    rating: 4.95,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Шелковистая яичная паста феттучине в сливочном соусе на основе пармезана и чеснока с обжаренными тигровыми креветками.",
      en: "Golden ribbons of fettuccine tossed in a decadent Parmesan cream sauce with succulent garlic-seared tiger prawns.",
      pl: "Wstążki makaronu fettuccine w aksamitnym sosie śmietankowo-parmezanowym z krewetkami tygrysimi."
    },
    ingredients: [
      { name: { ru: "Паста Феттучине", en: "Fettuccine pasta", pl: "Makaron Fettuccine" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.20 },
      { name: { ru: "Тигровые креветки", en: "Tiger prawns", pl: "Krewetki tygrysie" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 15.90 },
      { name: { ru: "Сливки 30%", en: "Heavy cream", pl: "Śmietanka 30%" }, qty: 200, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 4.20 },
      { name: { ru: "Сыр Пармезан", en: "Parmesan cheese", pl: "Parmezan tarty" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.50 },
      { name: { ru: "Сливочное масло", en: "Butter", pl: "Masło" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 }
    ],
    steps: [
      {
        ru: "Обжарьте креветки на сливочном масле с чесноком по 1.5 минуты с каждой стороны, переложите на тарелку.",
        en: "Sear prawns in melted butter with sliced garlic for 90 seconds per side, remove immediately.",
        pl: "Podsmaż krewetki na maśle z czosnkiem po 1.5 minuty z każdej strony i zdejmij na talerz."
      },
      {
        ru: "В той же сковороде прогрейте сливки, снимите с огня и вмешайте тертый пармезан до образования гладкого крема.",
        en: "Pour cream into the pan, warm gently, take off heat, and whisk in finely grated Parmesan until velvety.",
        pl: "Wlej śmietankę na patelnię, podgrzej, zdejmij z ognia i wmieszaj starty parmezan."
      },
      {
        ru: "Смешайте отваренную пасту аль денте с соусом и верните креветки. Посыпьте свежемолотым перцем.",
        en: "Toss hot al dente fettuccine with Alfredo sauce, fold prawns back in, and top with cracked black pepper.",
        pl: "Wymieszaj ugotowany makaron al dente z sosem i krewetkami, posyp świeżo mielonym pieprzem."
      }
    ]
  },
  {
    id: "hungarian-goulash",
    title: { ru: "Наваристый венгерский гуляш", en: "Hearty Hungarian Beef Goulash", pl: "Węgierski Bogracz Gulaszowy z wołowiną" },
    category: "main",
    prepTime: { ru: "60 мин", en: "60 min", pl: "60 min" },
    calories: 490,
    rating: 4.95,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Густое согревающее мясное рагу из говядины со сладкой паприкой, картофелем, болгарским перцем и тмином.",
      en: "Rich Hungarian beef stew loaded with sweet paprika, potatoes, bell peppers, and caraway seeds.",
      pl: "Sycący tradycyjny gulasz węgierski z wołowiny ze słodką papryką, ziemniakami i kminkiem."
    },
    ingredients: [
      { name: { ru: "Говядина для тушения", en: "Beef chuck roast", pl: "Wołowina gulaszowa" }, qty: 500, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 16.50 },
      { name: { ru: "Картофель", en: "Potatoes", pl: "Ziemniaki" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.80 },
      { name: { ru: "Венгерская паприка молотая", en: "Sweet paprika", pl: "Papryka węgierska słodka" }, qty: 30, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 },
      { name: { ru: "Болгарский перец", en: "Bell pepper", pl: "Papryka czerwona" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.50 },
      { name: { ru: "Тмин и чеснок", en: "Caraway seeds & garlic", pl: "Kminek i czosnek" }, qty: 15, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 }
    ],
    steps: [
      {
        ru: "Обжарьте лук на масле, снимите с огня, всыпьте паприку (чтобы не подгорела), добавьте кусочки мяса и верните на огонь.",
        en: "Caramelize onions, remove from heat, stir in generous paprika, add beef cubes, and return to stove.",
        pl: "Podsmaż cebulę, zdejmij na chwilę z ognia, wsyp paprykę, dodaj mięso i smaż dalej."
      },
      {
        ru: "Влейте стакан бульона, добавьте тмин и тушите говядину под крышкой 45 минут до мягкости.",
        en: "Pour in a splash of water or broth with caraway seeds, cover and braise gently for 45 minutes.",
        pl: "Wlej szklankę bulionu, dodaj kminek i duś mięso pod przykryciem 45 minut do miękkości."
      },
      {
        ru: "Добавьте кубики картофеля и сладкого перца, варите еще 15 минут до готовности овощей.",
        en: "Tumble in diced potatoes and sweet bell pepper, cook 15 minutes more until vegetables are fork-tender.",
        pl: "Dodaj ziemniaki i paprykę pokrojoną w kostkę, gotuj 15 minut do miękkości warzyw."
      }
    ]
  },
  {
    id: "sea-bass-baked",
    title: { ru: "Запеченный сибас с лимоном и розмарином", en: "Whole Baked Mediterranean Sea Bass", pl: "Pieczony Labraks (Okoń Morski) z ziołami" },
    category: "main",
    prepTime: { ru: "30 мин", en: "30 min", pl: "30 min" },
    calories: 320,
    rating: 4.96,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Средиземноморская классика: целая рыба сибас, запеченная с ломтиками лимона, веточками розмарина и оливковым маслом.",
      en: "Whole fresh sea bass stuffed with lemon slices, fresh rosemary, and garlic, roasted with extra virgin olive oil.",
      pl: "Śródziemnomorski labraks pieczony w całości z plastrami cytryny, rozmarynem i oliwą z oliwek."
    },
    ingredients: [
      { name: { ru: "Сибас цельный свежий", en: "Whole sea bass", pl: "Świeży labraks (okoń morski)" }, qty: 500, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 18.90 },
      { name: { ru: "Лимон", en: "Lemon", pl: "Cytryna" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.50 },
      { name: { ru: "Розмарин свежий", en: "Fresh rosemary", pl: "Świeży rozmaryn" }, qty: 15, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 },
      { name: { ru: "Оливковое масло", en: "Extra virgin olive oil", pl: "Oliwa z oliwek" }, qty: 30, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.20 }
    ],
    steps: [
      {
        ru: "Очистите рыбу от чешуи и внутренностей, сделайте косые надрезы на коже.",
        en: "Scale, gut, and pat fish dry; score skin with shallow diagonal cuts on both sides.",
        pl: "Oczyść rybę, osusz i wykonaj ukośne nacięcia na skórze po obu stronach."
      },
      {
        ru: "В брюшко положите ломтики лимона, веточки розмарина и зубчик чеснока, смажьте рыбу маслом и посолите.",
        en: "Stuff cavity with fresh lemon slices, rosemary sprigs, and garlic; rub skin with sea salt and oil.",
        pl: "Wypełnij wnętrze cytryną, rozmarynem i czosnkiem, natrzyj rybę solą morską i oliwą."
      },
      {
        ru: "Запекайте при 200°C 20 минут до хрустящей кожи и сочного белого мяса.",
        en: "Roast at 200°C for 20 minutes until skin is golden-crisp and flesh flakes easily.",
        pl: "Piecz w 200°C przez 20 minut, aż mięso będzie soczyste, a skóra chrupiąca."
      }
    ]
  },
  {
    id: "duck-breast-cherry",
    title: { ru: "Утиная грудка с пряным вишневым соусом", en: "Duck Breast with Spiced Cherry Glaze", pl: "Pierś z Kaczki w sosie wiśniowym" },
    category: "main",
    prepTime: { ru: "25 мин", en: "25 min", pl: "25 min" },
    calories: 460,
    rating: 4.97,
    difficulty: { ru: "Сложно", en: "Hard", pl: "Trudny" },
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Нежнейшее розовое филе утки с хрустящей надрезанной кожей под соусом из вишни, бадьяна и бальзамика.",
      en: "Crispy skin duck breast cooked to blushing pink perfection served with tart-sweet spiced cherry reduction.",
      pl: "Soczysta różowa pierś z kaczki z chrupiącą skórką w aromatycznym sosie z wiśni i anyżu."
    },
    ingredients: [
      { name: { ru: "Утиное филе (грудка)", en: "Duck breast fillet", pl: "Pierś z kaczki ze skórą" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 19.50 },
      { name: { ru: "Вишня свежая или замороженная", en: "Sour cherries", pl: "Wiśnie mrożone" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Бальзамический уксус", en: "Balsamic glaze", pl: "Ocet balsamiczny" }, qty: 25, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.50 },
      { name: { ru: "Мед и розмарин", en: "Honey and rosemary", pl: "Miód i rozmaryn" }, qty: 20, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.00 }
    ],
    steps: [
      {
        ru: "Сделайте ромбовидные надрезы на коже утки, не задевая мясо. Посолите.",
        en: "Score duck skin in a crosshatch pattern without cutting meat. Season with sea salt.",
        pl: "Ponacinaj skórę kaczki w kratkę, uważając, by nie przeciąć mięsa. Posól."
      },
      {
        ru: "Положите кожей вниз на холодную сухую сковороду, медленно вытапливайте жир на среднем огне 8 минут до хруста, переверните на 3 минуты.",
        en: "Place skin-side down in cold dry skillet, render fat on medium-low for 8 mins until crisp, flip for 3 mins.",
        pl: "Ułóż skórą do dołu na zimnej patelni, wytapiaj tłuszcz przez 8 minut, odwróć na 3 minuty."
      },
      {
        ru: "Дайте мясу отдохнуть 5 минут. На вытопленном жире уварите вишню с бальзамиком и медом до густого соуса.",
        en: "Rest meat for 5 mins. In same pan, simmer cherries with balsamic and honey into a glossy reduction.",
        pl: "Odstaw mięso na 5 minut. Na tej samej patelni zredukuj wiśnie z balsamico i miodem na gęsty sos."
      }
    ]
  },
  {
    id: "chicken-cordon-bleu",
    title: { ru: "Куриный Кордон Блю с ветчиной и сыром", en: "Chicken Cordon Bleu", pl: "Kordon Blue z szynką i serem" },
    category: "main",
    prepTime: { ru: "35 мин", en: "35 min", pl: "35 min" },
    calories: 510,
    rating: 4.94,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Куриный рулет в хрустящей панировке, фаршированный ломтиками сырокопченой ветчины и тающим швейцарским сыром.",
      en: "Crispy breaded chicken cutlet stuffed with savory smoked ham and molten gooey Swiss Gruyère cheese.",
      pl: "Chrupiący panierowany kotlet drobiowy faszerowany wędzoną szynką i ciągnącym się serem szwajcarskim."
    },
    ingredients: [
      { name: { ru: "Куриная грудка", en: "Chicken breast", pl: "Pierś z kurczaka" }, qty: 450, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 11.50 },
      { name: { ru: "Ветчина сырокопченая", en: "Smoked ham", pl: "Szynka wędzona" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.90 },
      { name: { ru: "Сыр Эмменталь или Гауда", en: "Swiss or Gouda cheese", pl: "Ser szwajcarski lub Gouda" }, qty: 120, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.50 },
      { name: { ru: "Панировочные сухари", en: "Breadcrumbs", pl: "Bułka tarta" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 },
      { name: { ru: "Яйца", en: "Eggs", pl: "Jajka" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.00 }
    ],
    steps: [
      {
        ru: "Сделайте глубокий кармашек в филе или отбейте в широкий пласт.",
        en: "Cut a deep pocket in each chicken breast or pound flat between plastic wrap.",
        pl: "Zrób głęboką kieszonkę w piersi z kurczaka lub rozbij na cienki płat."
      },
      {
        ru: "Вложите ломтики ветчины и сыра, сколите край зубочисткой.",
        en: "Stuff with rolled ham and cheese slices, secure opening firmly with toothpicks.",
        pl: "Włóż plastry szynki i sera, zepnij brzegi wykałaczkami."
      },
      {
        ru: "Запанируйте в яйце и сухарях, обжарьте на сковороде 4 минуты и запеките при 180°C 15 минут до расплавления сыра.",
        en: "Dredge in egg and breadcrumbs, pan-fry 4 mins, then bake at 180°C for 15 mins until cheese melts.",
        pl: "Spanieruj w jajku i bułce tartej, podsmaż 4 minuty i piecz w 180°C przez 15 minut."
      }
    ]
  },
  {
    id: "chicken-teriyaki-bowl",
    title: { ru: "Курица Терияки с рисом и брокколи", en: "Japanese Chicken Teriyaki with Rice", pl: "Kurczak Teriyaki z ryżem i brokułami" },
    category: "main",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 460,
    rating: 4.95,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Аппетитные карамелизированные кусочки курицы в глянцевом соусе терияки с рисом, брокколи на пару и кунжутом.",
      en: "Sweet-savory caramelized chicken thighs glazed in glossy homemade teriyaki sauce over steamed rice and broccoli.",
      pl: "Kawałki kurczaka glazurowane w słodko-słonym sosie teriyaki z ryżem jaśminowym i brokułami."
    },
    ingredients: [
      { name: { ru: "Куриное филе бедра", en: "Chicken thigh meat", pl: "Filet z udka kurczaka" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 10.90 },
      { name: { ru: "Соус терияки", en: "Teriyaki glaze", pl: "Sos teriyaki" }, qty: 60, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 3.50 },
      { name: { ru: "Рис жасмин", en: "Jasmine rice", pl: "Ryż jaśminowy" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.80 },
      { name: { ru: "Брокколи свежая", en: "Fresh broccoli", pl: "Świeży brokuł" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Семена кунжута", en: "Sesame seeds", pl: "Nasiona sezamu" }, qty: 15, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.20 }
    ],
    steps: [
      {
        ru: "Обжарьте кусочки курицы на сильном огне на масле 6-7 минут до золотистой корочки.",
        en: "Sear bite-sized chicken thighs on high heat with a drizzle of oil for 6-7 mins until browned.",
        pl: "Podsmaż kawałki kurczaka na dużym ogniu przez 6-7 minut na złoty kolor."
      },
      {
        ru: "Влейте соус терияки, убавьте огонь и прогревайте 3 минуты, пока соус не покроет мясо глянцевой глазурью.",
        en: "Pour in teriyaki sauce, reduce heat and toss for 3 minutes until thick, syrupy, and glossy.",
        pl: "Wlej sos teriyaki, zmniejsz ogień i mieszaj 3 minuty aż sos zgęstnieje i oblepi mięso."
      },
      {
        ru: "Выложите в боул отварной рис, рядом курицу и брокколи на пару, посыпьте жареным кунжутом.",
        en: "Spoon warm jasmine rice into bowl, top with glossy chicken and steamed broccoli florets, garnish with sesame.",
        pl: "Wyłóż ryż do miski, ułóż kurczaka i brokuły na parze, posyp prażonym sezamem."
      }
    ]
  },
  {
    id: "spaghetti-bolognese",
    title: { ru: "Спагетти Болоньезе медленного томления", en: "Slow-Cooked Spaghetti Bolognese", pl: "Spaghetti Bolognese z wolno duszonym ragu" },
    category: "main",
    prepTime: { ru: "45 мин", en: "45 min", pl: "45 min" },
    calories: 510,
    rating: 4.96,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Классическая паста спагетти с насыщенным мясным соусом из говядины, спелых томатов, базилика и тертого сыра грана падано.",
      en: "Hearty spaghetti draped in slow-cooked savory beef and vegetable ragu, finished with fresh basil and Grana Padano.",
      pl: "Klasyczny makaron spaghetti z bogatym sosem mięsno-pomidorowym i świeżo tartym parmezanem."
    },
    ingredients: [
      { name: { ru: "Спагетти из твердых сортов", en: "Durum wheat spaghetti", pl: "Makaron spaghetti semolina" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Фарш из говядины", en: "Ground beef", pl: "Wołowina mielona" }, qty: 350, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 11.90 },
      { name: { ru: "Томаты протертые", en: "Passata", pl: "Passata pomidorowa" }, qty: 350, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Сыр Грана Падано", en: "Grana Padano", pl: "Ser Grana Padano" }, qty: 50, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.90 }
    ],
    steps: [
      {
        ru: "Спассеруйте лук и чеснок на оливковом масле, добавьте говяжий фарш и обжаривайте 8 минут.",
        en: "Brown onions and garlic in olive oil, add minced beef and cook 8 minutes until crumbled and browned.",
        pl: "Podsmaż cebulę z czosnkiem na oliwie, dodaj mielone mięso i smaż 8 minut."
      },
      {
        ru: "Влейте томаты, добавьте орегано и тушите на слабом огне под крышкой 25 минут.",
        en: "Stir in tomato passata and dried oregano; simmer gently covered on low for 25 minutes.",
        pl: "Wlej passatę pomidorową, dodaj oregano i duś na wolnym ogniu pod przykryciem 25 minut."
      },
      {
        ru: "Сварите спагетти аль денте, перемешайте с соусом и подавайте с тертым сыром.",
        en: "Boil spaghetti al dente, toss with savory Bolognese sauce, and shower with finely grated cheese.",
        pl: "Ugotuj spaghetti al dente, wymieszaj z sosem i posyp tartym serem."
      }
    ]
  },
  {
    id: "lamb-tagine",
    title: { ru: "Марокканский таджин с бараниной и черносливом", en: "Moroccan Lamb Tagine with Prunes", pl: "Marokański Tadżin z jagnięciną i suszonymi śliwkami" },
    category: "main",
    prepTime: { ru: "75 мин", en: "75 min", pl: "75 min" },
    calories: 580,
    rating: 4.97,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Пряное восточное блюдо из тающей во рту баранины, томленой с корицей, имбирем, сладким черносливом и жареным миндалем.",
      en: "Melt-in-your-mouth slow-braised lamb shanks infused with saffron, ginger, sweet prunes, and toasted slivered almonds.",
      pl: "Rozpływająca się w ustach jagnięcina duszona z cynamonem, imbirem, suszonymi śliwkami i prażonymi migdałami."
    },
    ingredients: [
      { name: { ru: "Баранина (лопатка)", en: "Lamb shoulder", pl: "Łopatka jagnięca" }, qty: 500, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 24.50 },
      { name: { ru: "Чернослив без косточек", en: "Pitted sweet prunes", pl: "Śliwki suszone" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Миндаль лепестки", en: "Toasted flaked almonds", pl: "Płatki migdałowe" }, qty: 30, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Рас-эль-ханут и корица", en: "Ras el hanout & cinnamon", pl: "Ras el hanout i cynamon" }, qty: 15, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 },
      { name: { ru: "Мед натуральный", en: "Honey", pl: "Miód" }, qty: 25, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 }
    ],
    steps: [
      {
        ru: "Обжарьте кусочки баранины со специями рас-эль-ханут и луком в таджине или толстостенной посуде.",
        en: "Brown lamb pieces in tagine with onions, ginger, and ras el hanout spice blend until aromatic.",
        pl: "Obsmaż kawałki jagnięciny z cebulą, imbirem i przyprawą ras el hanout w tadżinie."
      },
      {
        ru: "Залейте водой вровень с мясом, накройте конической крышкой и томите 60 минут на самом медленном огне.",
        en: "Cover with broth, place conical lid on, and slow simmer for 60 minutes until fork-tender.",
        pl: "Zalej bulionem, przykryj stożkową pokrywką i duś 60 minut na minimalnym ogniu."
      },
      {
        ru: "Добавьте чернослив с ложкой меда, готовьте еще 15 минут до густого блестящего соуса, посыпьте жареным миндалем.",
        en: "Add prunes and honey; simmer 15 mins until sauce is thick and syrupy. Scatter golden toasted almonds.",
        pl: "Dodaj śliwki i miód, gotuj 15 minut aż sos zgęstnieje, posyp prażonymi płatkami migdałów."
      }
    ]
  },
  {
    id: "chicken-fajitas",
    title: { ru: "Мексиканские куриные фахитас со сладким перцем", en: "Sizzling Mexican Chicken Fajitas", pl: "Meksykańskie Fajitas z kurczakiem i papryką" },
    category: "main",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 420,
    rating: 4.93,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Шкворчащие полоски куриного филе с карамелизованным болгарским перцем и луком, подаются в теплых пшеничных тортильях со сметаной.",
      en: "Sizzling strips of spiced chicken breast tossed with sweet bell peppers, red onions, warm tortillas, and lime.",
      pl: "Skwierczące paski kurczaka ze słodką papryką i czerwoną cebulą podawane w ciepłych tortillach ze śmietaną."
    },
    ingredients: [
      { name: { ru: "Куриное филе", en: "Chicken breast", pl: "Pierś z kurczaka" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 10.50 },
      { name: { ru: "Сладкий перец микс", en: "Bell peppers trio", pl: "Papryka kolorowa" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 4.50 },
      { name: { ru: "Тортильи пшеничные", en: "Flour tortillas", pl: "Tortille pszenne" }, qty: 4, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.50 },
      { name: { ru: "Специи фахита (кумин, чили, сок лайма)", en: "Fajita spices & lime", pl: "Przyprawa fajita i limonka" }, qty: 20, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.00 }
    ],
    steps: [
      {
        ru: "Нарежьте курицу и сладкий перец длинными полосками, замаринуйте с соком лайма, маслом и специями.",
        en: "Cut chicken and bell peppers into strips; toss with olive oil, lime juice, and fajita seasoning.",
        pl: "Pokrój kurczaka i paprykę w paski, wymieszaj z sokiem z limonki, oliwą i przyprawami."
      },
      {
        ru: "Обжарьте на раскаленной сковороде 6-7 минут до легких подпалин и аппетитного хруста овощей.",
        en: "Sear in screaming-hot skillet for 6-7 minutes until chicken is cooked through and peppers are blistered.",
        pl: "Smaż na mocno rozgrzanej patelni przez 6-7 minut do lekkiego przypieczenia."
      },
      {
        ru: "Подавайте шкворчащую начинку с теплыми тортильями, сметаной и дольками лайма.",
        en: "Serve sizzling straight from pan with warm tortillas, sour cream, and fresh cilantro.",
        pl: "Podawaj gorące prosto z patelni z ciepłymi tortillami, kwaśną śmietaną i limonką."
      }
    ]
  }
];
