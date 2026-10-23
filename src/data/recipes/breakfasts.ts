import { Recipe } from '../../types';

export const BREAKFAST_RECIPES: Recipe[] = [
  {
    id: "cottage-cheese-syrniki",
    title: { ru: "Нежные творожные сырники с ягодами", en: "Fluffy Cottage Cheese Syrniki", pl: "Delikatne Serniczki Twarogowe (Syrniki)" },
    category: "breakfast",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 320,
    rating: 4.98,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Пышные золотистые сырники из сухого фермерского творога с нежной кремовой сердцевиной, подаются со сметаной и ягодами.",
      en: "Golden fluffy Eastern European cottage cheese patties with tender creamy centers, served with sour cream and fresh berries.",
      pl: "Złociste placuszki z twarogu o kremowym wnętrzu podawane z gęstą śmietaną i świeżymi owocami."
    },
    ingredients: [
      { name: { ru: "Творог 9% (сухой отжатый)", en: "Dry curd cottage cheese 9%", pl: "Twaróg półtłusty suchy" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 6.50 },
      { name: { ru: "Яичный желток", en: "Egg yolk", pl: "Żółtko jaja" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.00 },
      { name: { ru: "Мука рисовая или пшеничная", en: "Rice or wheat flour", pl: "Mąka ryżowa lub pszenna" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 0.80 },
      { name: { ru: "Ванильный сахар", en: "Vanilla sugar", pl: "Cukier waniliowy" }, qty: 15, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.00 },
      { name: { ru: "Свежие ягоды и сметана", en: "Fresh berries and sour cream", pl: "Świeże jagody i śmietana" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 }
    ],
    steps: [
      {
        ru: "Протрите творог через сито или разомните вилкой с желтком, щепоткой соли и ванильным сахаром.",
        en: "Press cottage cheese through a sieve for extra smoothness, blend with yolk, pinch of salt, and vanilla sugar.",
        pl: "Przetrzyj twaróg przez sitko, wymieszaj z żółtkiem, szczyptą soli i cukrem waniliowym."
      },
      {
        ru: "Всыпьте 2 ст. ложки муки, скатайте колбаску, нарежьте на шайбы и сформируйте идеальные сырники стаканом.",
        en: "Stir in flour, roll into log, slice discs, and shape neat round patties using a spinning glass.",
        pl: "Dodaj mąkę, uformuj wałek, pokrój na krążki i wyrównaj brzegi szklanką."
      },
      {
        ru: "Обжарьте на капле топленого масла на среднем огне по 3 минуты с каждой стороны под крышкой.",
        en: "Sear in a little ghee over medium heat for 3 minutes per side covered with a lid until puffed and golden.",
        pl: "Smaż na maśle klarowanym na małym ogniu po 3 minuty z każdej strony pod przykryciem."
      }
    ]
  },
  {
    id: "eggs-benedict-salmon",
    title: { ru: "Яйца Бенедикт со слабосоленым лососем на бриоши", en: "Eggs Benedict with Smoked Salmon on Brioche", pl: "Jajka po Benedyktyńsku z łososiem na maślanej brioszce" },
    category: "breakfast",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 460,
    rating: 4.97,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Подрумяненная сливочная бриошь, ломтики слабосоленого лосося, яйцо пашот с жидким желтком и теплый голландский соус.",
      en: "Toasted buttery brioche topped with silky smoked salmon, runny poached egg, and warm velvety Hollandaise sauce.",
      pl: "Opiekana brioszka z wędzonym łososiem, jajkiem w koszulce z płynnym żółtkiem i sosem holenderskim."
    },
    ingredients: [
      { name: { ru: "Булочка бриошь", en: "Brioche buns", pl: "Maślana bułeczka brioche" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.50 },
      { name: { ru: "Лосось слабосоленый", en: "Smoked salmon slices", pl: "Łosoś wędzony w plastrach" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 8.90 },
      { name: { ru: "Яйца свежие", en: "Farm fresh eggs", pl: "Świeże jajka" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.00 },
      { name: { ru: "Сливочное масло (для голландского соуса)", en: "Melted butter for sauce", pl: "Masło do sosu holenderskiego" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.80 },
      { name: { ru: "Желток и сок лимона", en: "Egg yolk & lemon juice", pl: "Żółtko i sok z cytryny" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.50 }
    ],
    steps: [
      {
        ru: "Приготовьте голландский соус: взбейте желток с лимонным соком на водяной бане, тонкой струйкой влейте теплое масло до крема.",
        en: "Whisk egg yolk and lemon juice over steam, slowly drizzle warm clarified butter until emulsified and thick.",
        pl: "Ubij żółtko z sokiem z cytryny w kąpieli wodnej, powoli dolewając rozpuszczone masło do zgęstnienia."
      },
      {
        ru: "Сварите яйца пашот в тихо кипящей воде с ложкой уксуса ровно 3 минуты.",
        en: "Poach fresh eggs in gently simmering water with a splash of vinegar for exactly 3 minutes.",
        pl: "Ugotuj jajka w koszulce w lekko gotującej się wodzie z octem dokładnie przez 3 minuty."
      },
      {
        ru: "Подсушите бриошь на сковороде, выложите лосось, яйцо пашот и полейте теплым соусом голландез.",
        en: "Toast sliced brioche, layer smoked salmon, top with soft poached egg, and blanket in warm Hollandaise.",
        pl: "Opiecz brioszkę, ułóż plastry łososia, jajko w koszulce i polej ciepłym sosem holenderskim."
      }
    ]
  },
  {
    id: "shakshuka-feta",
    title: { ru: "Израильская Шакшука с томатами и фетой", en: "Traditional Shakshuka with Feta", pl: "Tradycyjna Szakszuka z pomidorami i fetą" },
    category: "breakfast",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 340,
    rating: 4.96,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Яйца, приготовленные в пряном соусе из спелых томатов, сладкого перца, зиры и чеснока, посыпанные сыром фета и зеленью.",
      en: "Eggs poached directly in a bubbling skillet of aromatic spiced tomatoes, bell peppers, cumin, topped with crumbled feta.",
      pl: "Jajka sadzone w gęstym aromatycznym sosie pomidorowo-paprykowym z kuminem, czosnkiem i serem feta."
    },
    ingredients: [
      { name: { ru: "Яйца куриные", en: "Eggs", pl: "Jajka" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.00 },
      { name: { ru: "Томаты в собственном соку или свежие", en: "Canned or ripe tomatoes", pl: "Pomidory krojone" }, qty: 350, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Болгарский перец", en: "Bell pepper", pl: "Papryka czerwona" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.50 },
      { name: { ru: "Сыр Фета", en: "Feta cheese", pl: "Ser Feta" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.80 },
      { name: { ru: "Зира (кумин) и кинза", en: "Cumin & fresh cilantro", pl: "Kumin i kolendra" }, qty: 15, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.80 }
    ],
    steps: [
      {
        ru: "Обжарьте кубики лука и сладкого перца на оливковом масле 5 минут, добавьте чеснок и прогрейте зиру.",
        en: "Sauté diced onion and sweet bell pepper in olive oil for 5 mins, add minced garlic and bloom cumin.",
        pl: "Podsmaż cebulę i paprykę na oliwie przez 5 minut, dodaj czosnek i kumin."
      },
      {
        ru: "Добавьте измельченные томаты, тушите 8 минут до загустения матрабухи.",
        en: "Pour in crushed tomatoes, season with salt and smoked paprika, simmer 8 minutes until rich and thick.",
        pl: "Dodaj pomidory, dopraw solą i papryką, duś 8 minut do zgęstnienia sosu."
      },
      {
        ru: "Сделайте углубления ложкой, разбейте яйца, посыпьте раскрошенной фетой и готовьте под крышкой 5 минут до схватывания белка.",
        en: "Make wells in sauce, crack in eggs, scatter crumbled feta, and cover for 5 mins until whites are set but yolks runny.",
        pl: "Zrób wgłębienia, wbij jajka, posyp pokruszoną fetą i gotuj pod przykryciem 5 minut."
      }
    ]
  },
  {
    id: "fluffy-pancakes",
    title: { ru: "Американские пышные панкейки", en: "Fluffy American Buttermilk Pancakes", pl: "Puszyste Amerykańskie Pancake" },
    category: "breakfast",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 360,
    rating: 4.95,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Высокие пористые оладьи на кефире или молоке со сливочным маслом, стекающим кленовым сиропом и свежими ягодами.",
      en: "Thick, ultra-fluffy golden buttermilk pancakes served in a tall stack with dripping maple syrup and butter.",
      pl: "Grube, puszyste amerykańskie naleśniki z syropem klonowym, masłem i świeżymi owocami."
    },
    ingredients: [
      { name: { ru: "Мука пшеничная", en: "Flour", pl: "Mąka pszenna" }, qty: 220, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 },
      { name: { ru: "Кефир или пахта", en: "Buttermilk or kefir", pl: "Maślanka lub kefir" }, qty: 250, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.20 },
      { name: { ru: "Сливочное масло растопленное", en: "Melted butter", pl: "Rozpuszczone masło" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.00 },
      { name: { ru: "Кленовый сироп", en: "Pure maple syrup", pl: "Syrop klonowy" }, qty: 50, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 4.50 },
      { name: { ru: "Яйцо и разрыхлитель", en: "Egg and baking powder", pl: "Jajko i proszek do pieczenia" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.50 }
    ],
    steps: [
      {
        ru: "Смешайте сухие ингредиенты: муку, разрыхлитель, ложку сахара и соду.",
        en: "Whisk together dry ingredients: all-purpose flour, baking powder, baking soda, and a spoon of sugar.",
        pl: "Wymieszaj suche składniki: mąkę, proszek do pieczenia, sodę i cukier."
      },
      {
        ru: "Отдельно соедините кефир с яйцом и маслом. Быстро объедините смеси (не вымешивайте долго, чтобы оладьи были пышными).",
        en: "Whisk buttermilk with egg and melted butter; stir into dry mix briefly leaving tiny lumps for maximum fluffiness.",
        pl: "Połącz maślankę z jajkiem i masłem. Wymieszaj krótko z suchymi składnikami (nie miksuj zbyt długo)."
      },
      {
        ru: "Жарьте на сухой сковороде на среднем огне: переворачивайте, когда на поверхности появятся лопающиеся пузырьки.",
        en: "Cook on dry non-stick skillet over medium-low; flip as soon as bubbles burst on surface, cook 1 min more.",
        pl: "Smaż na suchej patelni na małym ogniu, przewracając, gdy na powierzchni pojawią się pękające pęcherzyki."
      }
    ]
  },
  {
    id: "avocado-poached-toast",
    title: { ru: "Авокадо-тост с яйцом пашот и семенами чиа", en: "Avocado Toast with Poached Egg", pl: "Tost z awokado, jajkiem w koszulce i nasionami chia" },
    category: "breakfast",
    prepTime: { ru: "10 мин", en: "10 min", pl: "10 min" },
    calories: 330,
    rating: 4.96,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Подсушенный цельнозерновой тартин с пастой из спелого авокадо, теплым яйцом пашот, хлопьями чили и семенами чиа.",
      en: "Artisan toasted sourdough bread layered with creamy seasoned avocado smash, soft poached egg, chili flakes, and chia.",
      pl: "Chrupiący chleb na zakwasie z pastą z dojrzałego awokado, jajkiem w koszulce, płatkami chili i nasionami chia."
    },
    ingredients: [
      { name: { ru: "Хлеб ремесленный на закваске", en: "Artisan sourdough bread", pl: "Chleb rzemieślniczy na zakwasie" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.50 },
      { name: { ru: "Авокадо Хасс", en: "Hass avocado", pl: "Awokado Hass" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 4.50 },
      { name: { ru: "Яйцо куриное", en: "Fresh egg", pl: "Jajko" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.00 },
      { name: { ru: "Семена чиа и хлопья чили", en: "Chia seeds & chili flakes", pl: "Nasiona chia i płatki chili" }, qty: 10, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.20 }
    ],
    steps: [
      {
        ru: "Подрумяньте ломтики хлеба в тостере или на сухой сковороде до хруста.",
        en: "Toast thick artisan sourdough slices until golden and crunchy.",
        pl: "Przypiecz kromki chleba w tosterze lub na suchej patelni na chrupko."
      },
      {
        ru: "Разомните авокадо с соком лимона, морской солью и оливковым маслом.",
        en: "Coarsely mash avocado with lemon juice, sea salt flakes, and a touch of olive oil.",
        pl: "Rozgnieć awokado z sokiem z cytryny, solą morską i odrobiną oliwy."
      },
      {
        ru: "Выложите авокадо на тост, сверху положите горячее яйцо пашот, надрежьте и посыпьте семенами чиа.",
        en: "Spread avocado mash over toast, crown with warm poached egg, slice yolk open, and dust with chia.",
        pl: "Rozsmaruj awokado na toście, połóż ciepłe jajko w koszulce i posyp nasionami chia."
      }
    ]
  },
  {
    id: "scrambled-croissant",
    title: { ru: "Сливочный скрембл с теплым круассаном", en: "Creamy Scrambled Eggs with Warm Croissant", pl: "Kremowa Jajecznica Scramble ze świeżym rogalikiem" },
    category: "breakfast",
    prepTime: { ru: "10 мин", en: "10 min", pl: "10 min" },
    calories: 410,
    rating: 4.95,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Шелковистый сливочный скрембл, медленно приготовленный на водяной бане, подается в разрезанном слоеном масляном круассане.",
      en: "Silky, custardy French-style soft scrambled eggs folded gently with butter, tucked into a warm flaky butter croissant.",
      pl: "Aksamitna, delikatna jajecznica na maśle serwowana w ciepłym, maślanym francuskim rogaliku."
    },
    ingredients: [
      { name: { ru: "Французский круассан", en: "Butter croissant", pl: "Rogalik maślany croissant" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.20 },
      { name: { ru: "Яйца куриные", en: "Fresh eggs", pl: "Jajka" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.00 },
      { name: { ru: "Сливочное масло 82%", en: "Cold butter 82%", pl: "Masło 82%" }, qty: 30, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.80 },
      { name: { ru: "Зеленый лук шнитт", en: "Fresh chives", pl: "Szczypiorek drobny" }, qty: 10, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.20 }
    ],
    steps: [
      {
        ru: "Разбейте яйца в холодную сковороду с кубиками сливочного масла, поставьте на слабый огонь.",
        en: "Crack eggs directly into cold skillet with diced butter cubes, place over gentle medium-low heat.",
        pl: "Wbij jajka na zimną patelnię z kawałkami masła, postaw na małym ogniu."
      },
      {
        ru: "Непрерывно помешивайте лопаткой 4-5 минут, периодически снимая с огня, чтобы яйца оставались кремовыми.",
        en: "Stir constantly with silicone spatula for 4-5 mins, sliding on and off heat to prevent overcooking.",
        pl: "Mieszaj nieustannie łopatką przez 4-5 minut, zdejmując co chwilę z ognia dla kremowej konsystencji."
      },
      {
        ru: "Разрежьте теплый круассан пополам, наполните шелковистым скремблом и посыпьте шнитт-луком.",
        en: "Warm croissant, slice open, fill with velvet scrambled eggs, and sprinkle with finely minced chives.",
        pl: "Przekrój ciepłego croissanta, napełnij jajecznicą i posyp drobno posiekanym szczypiorkiem."
      }
    ]
  },
  {
    id: "french-herb-omelette",
    title: { ru: "Французский сливочный омлет с травами", en: "Classic French Rolled Herb Omelette", pl: "Francuski Omlet z ziołami i serem" },
    category: "breakfast",
    prepTime: { ru: "10 мин", en: "10 min", pl: "10 min" },
    calories: 290,
    rating: 4.93,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Гладкий блестящий омлет без поджаристой корочки с кремовой сердцевиной, свежим эстрагоном, шнитт-луком и сливочным маслом.",
      en: "Silky, golden French rolled omelette with zero browning on outside and custardy soft center with fresh fines herbes.",
      pl: "Aksamitny zwijany omlet francuski bez przypieczenia z miękkim środkiem, masłem i ziołami."
    },
    ingredients: [
      { name: { ru: "Яйца куриные", en: "Eggs", pl: "Jajka" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.00 },
      { name: { ru: "Сливочное масло", en: "Butter", pl: "Masło" }, qty: 25, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 },
      { name: { ru: "Зелень (эстрагон, петрушка, шнитт-лук)", en: "Fines herbes mix", pl: "Zioła (natka, estragon, szczypiorek)" }, qty: 15, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.80 }
    ],
    steps: [
      {
        ru: "Тщательно взбейте яйца вилкой с солью до полного объединения белка и желтка без пены.",
        en: "Beat eggs thoroughly with a fork and salt until completely homogeneous with zero foam.",
        pl: "Roztrzep jajka widelcem z solą na jednolitą masę bez piany."
      },
      {
        ru: "Вылейте в сковороду с растопленным маслом и энергично взбивайте вилкой 60 секунд, пока масса не загустеет.",
        en: "Pour into foaming butter, shake pan vigorously while rapidly stirring with fork for 60 seconds.",
        pl: "Wlej na patelnię z rozgrzanym masłem i energicznie mieszaj widelcem przez 60 sekund."
      },
      {
        ru: "Сверните омлет в сигару, смажьте кусочком сливочного масла для блеска и посыпьте свежей зеленью.",
        en: "Roll into a smooth cigar shape, invert onto plate, rub with butter for shine, and dust with chopped herbs.",
        pl: "Zwiń w rulon, wyłóż na talerz, posmaruj masłem na połysk i posyp ziołami."
      }
    ]
  },
  {
    id: "homemade-granola-bowl",
    title: { ru: "Запеченная хрустящая гранола с греческим йогуртом", en: "Toasted Honey Nut Granola Bowl", pl: "Domowa Pieczona Granola z jogurtem greckim" },
    category: "breakfast",
    prepTime: { ru: "10 мин", en: "10 min", pl: "10 min" },
    calories: 340,
    rating: 4.92,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Хрустящие овсяные хлопья, запеченные с медом, миндалем и клюквой, подаются с густым греческим йогуртом и свежей малиной.",
      en: "Crunchy golden oats baked with raw honey, sliced almonds, coconut, served with thick Greek yogurt and raspberries.",
      pl: "Chrupiące płatki owsiane zapiekane z miodem i orzechami serwowane z gęstym jogurtem greckim i owocami."
    },
    ingredients: [
      { name: { ru: "Гранола запеченная", en: "Baked honey granola", pl: "Granola pieczona z orzechami" }, qty: 70, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.80 },
      { name: { ru: "Греческий йогурт густой", en: "Greek yogurt", pl: "Jogurt grecki" }, qty: 180, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 },
      { name: { ru: "Свежая малина или черника", en: "Fresh berries", pl: "Świeże maliny lub borówki" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Мед натуральный", en: "Honey drizzle", pl: "Miód" }, qty: 15, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.00 }
    ],
    steps: [
      {
        ru: "Выложите порцию охлажденного греческого йогурта на дно красивого боула.",
        en: "Spoon thick chilled Greek yogurt into the bottom of a wide ceramic breakfast bowl.",
        pl: "Wyłóż gęsty jogurt grecki na dno miseczki."
      },
      {
        ru: "Сверху высыпьте золотистую хрустящую гранолу с миндалем.",
        en: "Top with generous clusters of crunchy toasted honey-nut granola.",
        pl: "Posyp chrupiącą granolą z prażonymi orzechami."
      },
      {
        ru: "Украсьте свежими ягодами малины и полейте тонкой струйкой цветочного меда.",
        en: "Garnish with fresh raspberries and drizzle lightly with floral honey.",
        pl: "Udekoruj malinami i polej miodem."
      }
    ]
  },
  {
    id: "full-english-breakfast",
    title: { ru: "Традиционный сытный английский завтрак", en: "Full Traditional English Breakfast", pl: "Tradycyjne Pełne Śniadanie Angielskie" },
    category: "breakfast",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 680,
    rating: 4.96,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Классический завтрак: жареные яйца глазунья, хрустящий бекон, охотничьи колбаски, белая фасоль в томате, грибы и тосты.",
      en: "The ultimate breakfast plate featuring sunny side up eggs, crispy bacon, bangers, Heinz baked beans, mushrooms, and toast.",
      pl: "Kultowe angielskie śniadanie: jajka sadzone, chrupiący boczek, kiełbaski, fasolka w pomidorach, pieczarki i tosty."
    },
    ingredients: [
      { name: { ru: "Яйца куриные", en: "Eggs", pl: "Jajka" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.00 },
      { name: { ru: "Бекон полосками", en: "Bacon rashers", pl: "Boczek w plastrach" }, qty: 70, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Колбаски свиные", en: "Breakfast sausages", pl: "Kiełbaski śniadaniowe" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.80 },
      { name: { ru: "Фасоль в томатном соусе", en: "Baked beans in tomato sauce", pl: "Fasolka w sosie pomidorowym" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Шампиньоны и тост", en: "Mushrooms and toast", pl: "Pieczarki i chleb tostowy" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 }
    ],
    steps: [
      {
        ru: "Обжарьте колбаски и бекон на сковороде до хруста, отложите на край тарелки.",
        en: "Pan-fry breakfast sausages and bacon until sizzling and crispy, keep warm.",
        pl: "Podsmaż kiełbaski i boczek na patelni na chrupko."
      },
      {
        ru: "На вытопленном жире обжарьте половинки шампиньонов и томаты, прогрейте фасоль в ковшике.",
        en: "Sauté halved button mushrooms in rendered bacon fat; warm baked beans in small pot.",
        pl: "Na wytopionym tłuszczu podsmaż pieczarki, a w rondelku podgrzej fasolkę."
      },
      {
        ru: "Пожарьте яйца глазунью с жидким желтком, соберите все компоненты на одной большой тарелке с поджаренными тостами.",
        en: "Fry eggs sunny side up, assemble all components onto one large breakfast plate with golden toast.",
        pl: "Usmaż jajka sadzone i podaj wszystkie składniki na jednym dużym talerzu z tostami."
      }
    ]
  },
  {
    id: "french-toast-brioche",
    title: { ru: "Французские тосты бриошь с корицей и ягодами", en: "Cinnamon Brioche French Toast", pl: "Tosty Francuskie z chałki z cynamonem" },
    category: "breakfast",
    prepTime: { ru: "15 мин", en: "15 min", pl: "15 min" },
    calories: 380,
    rating: 4.95,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Пышные ломтики сдобной бриоши, пропитанные ванильно-яичным молоком с корицей, обжаренные в сливочном масле до золотистой корочки.",
      en: "Custardy thick-cut brioche slices dipped in vanilla cinnamon egg wash, griddled in butter until golden with berries.",
      pl: "Puszyste tosty z maślanej chałki maczane w mleku z jajkiem i cynamonem, smażone na złoto na maśle."
    },
    ingredients: [
      { name: { ru: "Булочка бриошь или хала", en: "Thick brioche slices", pl: "Chałka maślana w plastrach" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.50 },
      { name: { ru: "Молоко и яйцо", en: "Milk and egg", pl: "Mleko i jajko" }, qty: 100, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.00 },
      { name: { ru: "Сливочное масло", en: "Butter", pl: "Masło" }, qty: 30, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.80 },
      { name: { ru: "Корица и кленовый сироп", en: "Cinnamon & maple syrup", pl: "Cynamon i syrop klonowy" }, qty: 25, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.00 }
    ],
    steps: [
      {
        ru: "Взбейте яйцо с молоком, сахаром, корицей и щепоткой соли.",
        en: "Whisk egg with whole milk, vanilla, ground cinnamon, and pinch of salt.",
        pl: "Roztrzep jajko z mlekiem, wanilią, cynamonem i szczyptą soli."
      },
      {
        ru: "Окуните толстые ломтики бриоши с обеих сторон на 20 секунд, чтобы они хорошо пропитались.",
        en: "Soak thick brioche slices for 20 seconds per side until custardy and saturated.",
        pl: "Zanurz grube kromki chałki z obu stron na 20 sekund, aby wchłonęły płyn."
      },
      {
        ru: "Обжарьте на сливочном масле по 2-3 минуты с каждой стороны до карамельной корочки. Подавайте с сиропом.",
        en: "Fry in foaming butter over medium heat for 2-3 mins each side until deeply golden. Drizzle with syrup.",
        pl: "Smaż na maśle po 2-3 minuty z każdej strony na złoty kolor. Polej syropem."
      }
    ]
  },
  {
    id: "chia-pudding-mango",
    title: { ru: "Чиа-пудинг на кокосовом молоке с пюре манго", en: "Coconut Mango Chia Seed Pudding", pl: "Pudding Chia na mleczku kokosowym z mango" },
    category: "breakfast",
    prepTime: { ru: "10 мин", en: "10 min", pl: "10 min" },
    calories: 230,
    rating: 4.94,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Полезный веганский завтрак из семян чиа, настоянных на сливочном кокосовом молоке, с пюре из сладкого спелого манго.",
      en: "Plant-based superfood breakfast of chia seeds bloomed in creamy coconut milk layered with tropical sweet mango puree.",
      pl: "Zdrowy wegański pudding z nasion chia na mleczku kokosowym ze słodkim musem z dojrzałego mango."
    },
    ingredients: [
      { name: { ru: "Семена чиа", en: "Chia seeds", pl: "Nasiona chia" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Кокосовое молоко 70%", en: "Rich coconut milk", pl: "Mleczko kokosowe" }, qty: 200, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 4.50 },
      { name: { ru: "Спелое манго", en: "Fresh mango", pl: "Świeże mango" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 4.90 },
      { name: { ru: "Сироп агавы", en: "Agave syrup", pl: "Syrop z agawy" }, qty: 15, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 1.50 }
    ],
    steps: [
      {
        ru: "Смешайте семена чиа с кокосовым молоком и сиропом агавы, дайте постоять 10 минут, перемешайте и уберите в холод на 2 часа.",
        en: "Whisk chia seeds into coconut milk with agave, rest 10 mins, stir again, and refrigerate for 2 hours to set.",
        pl: "Wymieszaj nasiona chia z mleczkiem kokosowym i syropem z agawy, odstaw na 2 godziny do lodówki."
      },
      {
        ru: "Мякоть спелого манго пробейте блендером в нежное гладкое пюре.",
        en: "Puree ripe sweet mango flesh in blender until completely smooth.",
        pl: "Zblenduj miąższ dojrzałego mango na gładki mus."
      },
      {
        ru: "Выложите манговое пюре поверх застывшего чиа-пудинга и украсьте кокосовыми чипсами.",
        en: "Layer vibrant mango coulis over thickened chia pudding and top with toasted coconut flakes.",
        pl: "Wyłóż mus z mango na pudding chia i udekoruj płatkami kokosowymi."
      }
    ]
  }
];
