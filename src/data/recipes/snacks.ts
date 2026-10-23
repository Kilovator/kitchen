import { Recipe } from '../../types';

export const SNACK_RECIPES: Recipe[] = [
  {
    id: "bruschetta-trio",
    title: { ru: "Трио брускетт: томаты, прошутто и лосось", en: "Italian Bruschetta Trio", pl: "Trio Włoskich Bruschett" },
    category: "snack",
    prepTime: { ru: "15 мин", en: "15 min", pl: "15 min" },
    calories: 280,
    rating: 4.96,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Хрустящая чиабатта с чесночным маслом и 3 начинками: спелые томаты с базиликом, прошутто с инжиром, крем-чиз со слабосоленым лососем.",
      en: "Crispy grilled ciabatta toasts with 3 toppings: vine tomatoes with basil, prosciutto di Parma, and smoked salmon with cream cheese.",
      pl: "Chrupiąca ciabatta z oliwą czosnkową i 3 dodatkami: pomidory z bazylią, prosciutto oraz łosoś wędzony z serkiem."
    },
    ingredients: [
      { name: { ru: "Чиабатта свежая", en: "Ciabatta bread", pl: "Świeża ciabatta" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.50 },
      { name: { ru: "Томаты черри", en: "Cherry tomatoes", pl: "Pomidorki cherry" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.20 },
      { name: { ru: "Прошутто ди Парма", en: "Prosciutto di Parma", pl: "Szynka parmeńska Prosciutto" }, qty: 70, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 7.90 },
      { name: { ru: "Слабосоленый лосось", en: "Smoked salmon", pl: "Łosoś wędzony" }, qty: 70, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 8.50 },
      { name: { ru: "Сливочный сыр и базилик", en: "Cream cheese and basil", pl: "Serek kremowy i bazylia" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.80 }
    ],
    steps: [
      {
        ru: "Нарежьте чиабатту наискосок, сбрызните оливковым маслом и подрумяньте на гриле или сухой сковороде. Натрите зубчиком чеснока.",
        en: "Slice ciabatta diagonally, drizzle with olive oil, grill until crisp, and rub gently with raw garlic clove.",
        pl: "Pokrój ciabattę, skrop oliwą, przypiecz na patelni grillowej i potrzyj ząbkiem czosnku."
      },
      {
        ru: "Томаты черри мелко нарежьте, смешайте с базиликом, солью и маслом.",
        en: "Dice cherry tomatoes, toss with torn basil leaves, balsamic drops, sea salt, and extra virgin olive oil.",
        pl: "Pokrój pomidorki w kostkę, wymieszaj z bazylią, solą i oliwą."
      },
      {
        ru: "Соберите 3 вида брускетт и выложите на деревянную доску.",
        en: "Top toasts: 1) tomato salsa, 2) prosciutto, 3) cream cheese and salmon. Serve immediately.",
        pl: "Ułóż dodatki na pieczywie: pomidory, prosciutto oraz serek z łososiem. Podawaj na desce."
      }
    ]
  },
  {
    id: "beef-tartare",
    title: { ru: "Классический тартар из говядины с желтком", en: "Classic French Steak Tartare", pl: "Tradycyjny Tatar Wołowy z żółtkiem" },
    category: "snack",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 310,
    rating: 4.97,
    difficulty: { ru: "Сложно", en: "Hard", pl: "Trudny" },
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Рубленая вручную мраморная вырезка говядины с каперсами, луком-шалотом, корнишонами, ворчестером и перепелиным желтком.",
      en: "Hand-cut prime beef tenderloin seasoned with capers, French shallots, cornichons, Worcestershire, and fresh egg yolk.",
      pl: "Ręcznie siekana polędwica wołowa z kaparami, szalotką, korniszonami, sosem worcestershire i żółtkiem."
    },
    ingredients: [
      { name: { ru: "Говяжья вырезка свежая", en: "Prime beef tenderloin", pl: "Świeża polędwica wołowa" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 19.50 },
      { name: { ru: "Каперсы и корнишоны", en: "Capers and cornichons", pl: "Kapary i korniszony" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Лук-шалот", en: "Shallot", pl: "Szalotka" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.20 },
      { name: { ru: "Яичный желток (перепелиный или куриный)", en: "Fresh egg yolk", pl: "Żółtko jajka" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.00 },
      { name: { ru: "Ворчестерский соус и дижонская горчица", en: "Worcestershire & Dijon", pl: "Sos Worcestershire i musztarda" }, qty: 15, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.50 }
    ],
    steps: [
      {
        ru: "Слегка подморозьте говядину (15 минут) и нарежьте острейшим ножом на мельчайшие кубики (не перекручивайте на мясорубке!).",
        en: "Chill beef for 15 mins to firm up, then finely hand-dice into precise mini cubes using a sharp chef's knife.",
        pl: "Schłodź polędwicę i posiekaj ostrym nożem w drobną kostkę (nie miel przez maszynkę!)."
      },
      {
        ru: "Очень мелко нарежьте каперсы, корнишоны и лук-шалот.",
        en: "Mince capers, crunchy cornichons, and shallots into microscopic dice.",
        pl: "Drobno posiekaj kapary, korniszony oraz szalotkę."
      },
      {
        ru: "Заправьте мясо соусом ворчестер, горчицей, оливковым маслом, выложите через формовочное кольцо и сделайте углубление для желтка.",
        en: "Season meat with olive oil, Dijon, and Worcestershire; shape with a ring mold and crown with raw yolk. Serve with toasted baguette.",
        pl: "Dopraw mięso oliwą, musztardą i sosem worcestershire, uformuj w ringu i zrób wgłębienie na żółtko."
      }
    ]
  },
  {
    id: "salmon-mango-tartare",
    title: { ru: "Тартар из лосося с манго и авокадо", en: "Salmon Mango Avocado Tartare", pl: "Tatar z Łososia z mango i awokado" },
    category: "snack",
    prepTime: { ru: "15 мин", en: "15 min", pl: "15 min" },
    calories: 290,
    rating: 4.96,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Изысканная освежающая закуска: кубики дикого лосося с сочным сладким манго, спелым авокадо и цитрусовой заправкой понзу.",
      en: "Bright and luxurious appetizer of diced sushi-grade salmon layered with ripe mango, avocado, and lime-ponzu dressing.",
      pl: "Orzeźwiający tatar ze świeżego łososia, dojrzałego mango i awokado z cytrusowym sosem ponzu."
    },
    ingredients: [
      { name: { ru: "Филе свежего лосося (sashimi-grade)", en: "Fresh sashimi-grade salmon", pl: "Świeży łosoś do sushi" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 18.50 },
      { name: { ru: "Спелое манго", en: "Ripe mango", pl: "Dojrzałe mango" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 4.90 },
      { name: { ru: "Авокадо", en: "Avocado", pl: "Awokado" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 4.50 },
      { name: { ru: "Сок лайма и кунжутное масло", en: "Lime juice and sesame oil", pl: "Sok z limonki i olej sezamowy" }, qty: 20, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.20 }
    ],
    steps: [
      {
        ru: "Нарежьте лосось, манго и авокадо одинаковыми ровными кубиками по 5 мм.",
        en: "Dice fresh salmon, peeled mango, and ripe avocado into uniform 5 mm cubes.",
        pl: "Pokrój łososia, obrane mango i awokado w równą kostkę 5 mm."
      },
      {
        ru: "Авокадо сбрызните соком лайма, чтобы не потемнело. Лосось заправьте каплей кунжутного масла и соевого соуса.",
        en: "Dress avocado immediately with lime juice. Toss salmon with sesame oil, soy sauce, and chopped chives.",
        pl: "Skrop awokado sokiem z limonki, a łososia dopraw olejem sezamowym i sosem sojowym."
      },
      {
        ru: "Выложите слоями в кулинарное кольцо: авокадо, манго, лосось. Посыпьте черным кунжутом.",
        en: "Stack inside a ring mold: avocado base, sweet mango middle, salmon top. Garnish with black sesame seeds.",
        pl: "Ułóż w ringu warstwami: awokado, mango, a na wierzch łososia. Posyp czarnym sezamem."
      }
    ]
  },
  {
    id: "classic-hummus",
    title: { ru: "Шелковистый хумус с тахини и теплой питой", en: "Ultra-Creamy Hummus with Warm Pita", pl: "Aksamitny Hummus z tahini i ciepłą pitą" },
    category: "snack",
    prepTime: { ru: "15 мин", en: "15 min", pl: "15 min" },
    calories: 260,
    rating: 4.94,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Традиционная ближневосточная закуска из отварного нута, пасты тахини, лимонного сока, зиры и оливкового масла.",
      en: "Silky smooth Middle Eastern dip made from blended chickpeas, rich sesame tahini, fresh lemon juice, cumin, and olive oil.",
      pl: "Kremowa pasta z ciecierzycy z pastą sezamową tahini, sokiem z cytryny, kuminem i oliwą podawana z pitą."
    },
    ingredients: [
      { name: { ru: "Нут отварной или консервированный", en: "Cooked chickpeas", pl: "Ciecierzyca gotowana" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.20 },
      { name: { ru: "Паста Тахини (кунжутная)", en: "Sesame tahini paste", pl: "Pasta tahini sezamowa" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.50 },
      { name: { ru: "Оливковое масло Extra Virgin", en: "Extra virgin olive oil", pl: "Oliwa z oliwek Extra Virgin" }, qty: 50, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 3.50 },
      { name: { ru: "Кедровая посыпка или паприка", en: "Pine nuts or paprika", pl: "Orzeszki piniowe lub papryka" }, qty: 20, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Хлеб пита", en: "Pita bread", pl: "Chlebki pita" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.50 }
    ],
    steps: [
      {
        ru: "Сначала взбейте в блендере тахини с лимонным соком и чесноком 1 минуту до пышной светлой эмульсии.",
        en: "Whip tahini paste with fresh lemon juice and garlic in food processor first until pale and fluffy.",
        pl: "Ubij pastę tahini z sokiem z cytryny i czosnkiem w blenderze na jasny puszysty krem."
      },
      {
        ru: "Добавьте нут, щепотку зиры, соль и 2-3 кубика льда (секрет невероятной кремовости!). Взбейте до шелка.",
        en: "Add chickpeas, cumin, salt, and 2-3 ice cubes (the secret to ultra-creamy texture!). Blend until silky.",
        pl: "Dodaj ciecierzycę, kumin, sól i 2-3 kostki lodu (sekret kremowości!). Zblenduj na gładko."
      },
      {
        ru: "Выложите ложкой в миску волной, сделайте углубление, полейте оливковым маслом и посыпьте паприкой. Подавайте с теплой питой.",
        en: "Swirl onto plate, make a well in center, drizzle generously with olive oil, dust with smoked paprika and warm pita.",
        pl: "Wyłóż na talerz robiąc zagłębienie, polej obficie oliwą, posyp papryką i podawaj z podgrzaną pitą."
      }
    ]
  },
  {
    id: "guacamole-nachos",
    title: { ru: "Свежий гуакамоле с хрустящими начос", en: "Fresh Guacamole with Tortilla Chips", pl: "Świeże Guacamole z chrupiącymi nachos" },
    category: "snack",
    prepTime: { ru: "10 мин", en: "10 min", pl: "10 min" },
    calories: 290,
    rating: 4.95,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Аутентичный мексиканский дип из спелого авокадо с соком лайма, красным луком, кинзой, томатами и перцем халапеньо.",
      en: "Authentic Mexican chunky guacamole made with Hass avocados, lime juice, diced jalapeño, cilantro, and warm tortilla chips.",
      pl: "Meksykański dip ze świeżego awokado z sokiem z limonki, kolendrą, pomidorami i chrupiącymi nachos."
    },
    ingredients: [
      { name: { ru: "Авокадо Хасс спелые", en: "Ripe Hass avocados", pl: "Dojrzałe awokado Hass" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 7.90 },
      { name: { ru: "Кукурузные чипсы начос", en: "Corn tortilla chips", pl: "Nachosy kukurydziane" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Томат спелый", en: "Tomato", pl: "Pomidor" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.50 },
      { name: { ru: "Кинза и лайм", en: "Cilantro & lime", pl: "Kolendra i limonka" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.50 },
      { name: { ru: "Перец халапеньо", en: "Jalapeno pepper", pl: "Papryczka jalapeno" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.20 }
    ],
    steps: [
      {
        ru: "Разрежьте авокадо, удалите косточку и разомните мякоть вилкой до текстурного пюре с кусочками.",
        en: "Halve avocados, scoop into a molcajete or bowl, and coarsely mash with a fork to keep chunks.",
        pl: "Przekrój awokado, usuń pestkę i rozgnieć miąższ widelcem, zostawiając małe kawałki."
      },
      {
        ru: "Сразу влейте сок лайма, добавьте мелко нарезанные томаты без семян, красный лук, халапеньо и кинзу.",
        en: "Stir in fresh lime juice immediately, add seeded diced tomatoes, red onion, minced jalapeño, and cilantro.",
        pl: "Skrop sokiem z limonki, dodaj posiekanego pomidora bez pestek, cebulę, jalapeno i kolendrę."
      },
      {
        ru: "Посолите по вкусу и подавайте сразу с большой миской кукурузных начос.",
        en: "Season with sea salt to taste and serve immediately alongside crisp tortilla chips.",
        pl: "Dopraw solą do smaku i podawaj od razu z miską chrupiących nachosów."
      }
    ]
  },
  {
    id: "spring-rolls-shrimp",
    title: { ru: "Спринг-роллы с тигровыми креветками", en: "Fresh Vietnamese Summer Spring Rolls", pl: "Sajgonki ze świeżymi krewetkami" },
    category: "snack",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 180,
    rating: 4.93,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Легкие прозрачные рисовые роллы с отварными креветками, хрустящим огурцом, мятой, морковью и арахисовым соусом хойсин.",
      en: "Crisp and fresh translucent rice paper rolls stuffed with steamed prawns, mint, mango, cucumber, and peanut dipping sauce.",
      pl: "Lekkie sajgonki w papierze ryżowym z krewetkami, świeżymi warzywami, miętą i sosem orzechowym."
    },
    ingredients: [
      { name: { ru: "Рисовая бумага", en: "Rice paper sheets", pl: "Papier ryżowy" }, qty: 8, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.50 },
      { name: { ru: "Креветки отварные", en: "Cooked prawns", pl: "Krewetki gotowane" }, qty: 16, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 12.50 },
      { name: { ru: "Морковь и огурец соломкой", en: "Carrot and cucumber sticks", pl: "Marchew i ogórek w słupki" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 },
      { name: { ru: "Свежая мята и кинза", en: "Fresh mint & cilantro", pl: "Świeża mięta i kolendra" }, qty: 30, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.00 },
      { name: { ru: "Арахисовая паста и соус Хойсин", en: "Peanut hoisin sauce", pl: "Sos orzechowy hoisin" }, qty: 50, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 }
    ],
    steps: [
      {
        ru: "Окуните лист рисовой бумаги в теплую воду на 5 секунд и положите на влажную доску.",
        en: "Dip rice paper in warm water for 5 seconds until pliable, lay flat on a damp surface.",
        pl: "Zanurz arkusz papieru ryżowego w ciepłej wodzie na 5 sekund i ułóż na desce."
      },
      {
        ru: "В центр выложите полоски огурца, моркови, листочки мяты и половинки креветок красивой стороной вниз.",
        en: "Layer fresh herbs, crunchy cucumber, carrots, and halve prawns pink-side facing down for presentation.",
        pl: "Ułóż warzywa w słupkach, zioła i przekrojone krewetki różową stroną do dołu."
      },
      {
        ru: "Плотно сверните конвертиком и подавайте с арахисовым соусом с чили.",
        en: "Tuck in sides and roll tightly like a burrito. Serve with sweet-savory peanut hoisin dip.",
        pl: "Zwiń ciasno w rulon i podawaj z sosem orzechowym z odrobiną chili."
      }
    ]
  },
  {
    id: "jalapeno-cheese-balls",
    title: { ru: "Хрустящие сырные шарики с халапеньо", en: "Fried Jalapeno Cheese Bombs", pl: "Kuleczki serowe z jalapeno w chrupiącej panierce" },
    category: "snack",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 340,
    rating: 4.95,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Золотистые хрустящие шарики из микса тягучего чеддера и моцареллы с пикантным перчиком халапеньо в панировке панко.",
      en: "Molten crispy bite-sized appetizers filled with melted cheddar and mozzarella laced with spicy pickled jalapeños.",
      pl: "Chrupiące kuleczki z ciągnącego się sera cheddar i mozzarelli z pikantnymi papryczkami jalapeno."
    },
    ingredients: [
      { name: { ru: "Сыр Чеддер и Моцарелла", en: "Cheddar & mozzarella mix", pl: "Ser cheddar i mozzarella" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 8.90 },
      { name: { ru: "Халапеньо маринованный", en: "Pickled jalapenos", pl: "Jalapeno marynowane" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Сухари панко", en: "Panko breadcrumbs", pl: "Bułka tarta panko" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.80 },
      { name: { ru: "Яйцо и мука", en: "Egg & flour for breading", pl: "Jajko i mąka do panierowania" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.50 }
    ],
    steps: [
      {
        ru: "Смешайте натертый сыр с мелко нарезанным халапеньо, скатайте плотные шарики размером с грецкий орех.",
        en: "Mix grated cheeses with minced jalapeños, roll into tight walnut-sized balls, chill 15 mins.",
        pl: "Wymieszaj starty ser z posiekanym jalapeno, uformuj kulki wielkości orzecha i schłodź."
      },
      {
        ru: "Сделайте двойную панировку: мука, взбитое яйцо, сухари панко (повторить яйцо и сухари).",
        en: "Double coat in flour, beaten egg, and crunchy panko to prevent cheese from leaking out.",
        pl: "Spanieruj dwukrotnie w mące, jajku i panko, aby ser nie wypłynął podczas smażenia."
      },
      {
        ru: "Обжарьте во фритюре при 180°C 2-3 минуты до золотистой хрустящей корочки. Подавайте с соусом ранч.",
        en: "Deep fry at 180°C for 2-3 minutes until golden brown. Serve hot with cool ranch or garlic dip.",
        pl: "Smaż na głębokim tłuszczu w 180°C przez 2-3 minuty na złoty kolor. Podawaj z sosem czosnkowym."
      }
    ]
  },
  {
    id: "stuffed-portobello",
    title: { ru: "Запеченные шляпки портобелло с сыром и чесноком", en: "Garlic Herb Stuffed Portobello Mushrooms", pl: "Zapiekane Pieczarki Portobello z serem i czosnkiem" },
    category: "snack",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 210,
    rating: 4.92,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Сочные крупные грибы портобелло, фаршированные крем-чизом, зеленью, чесноком и запеченные под хрустящим пармезаном.",
      en: "Meaty roasted portobello caps stuffed with garlic herb cream cheese, breadcrumbs, and melted parmesan.",
      pl: "Soczyste kapelusze pieczarek portobello faszerowane kremowym serkiem z ziołami i zapieczone z parmezanem."
    },
    ingredients: [
      { name: { ru: "Грибы портобелло крупные", en: "Large portobello mushroom caps", pl: "Pieczarki portobello duże" }, qty: 4, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 7.90 },
      { name: { ru: "Сливочный сыр", en: "Cream cheese", pl: "Serek śmietankowy" }, qty: 120, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Сыр Пармезан", en: "Parmesan", pl: "Parmezan" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.80 },
      { name: { ru: "Чеснок и тимьян", en: "Garlic and fresh thyme", pl: "Czosnek i tymianek" }, qty: 15, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 }
    ],
    steps: [
      {
        ru: "Удалите ножки у грибов, шляпки сбрызните оливковым маслом и посолите.",
        en: "Wipe mushroom caps clean, remove stems, rub with olive oil and sea salt.",
        pl: "Oczyść pieczarki, usuń nóżki, skrop oliwą i posyp solą."
      },
      {
        ru: "Смешайте сливочный сыр с измельченным чесноком, мелко порубленными ножками грибов и зеленью.",
        en: "Mix cream cheese with minced garlic, chopped stems, and fresh thyme leaves.",
        pl: "Wymieszaj serek z posiekanym czosnkiem, nóżkami pieczarek i świeżym tymiankiem."
      },
      {
        ru: "Наполните шляпки начинкой, посыпьте пармезаном и запекайте 15 минут при 190°C.",
        en: "Fill caps generously, top with grated parmesan, and bake at 190°C for 15 minutes until golden.",
        pl: "Wypełnij kapelusze farszem, posyp parmezanem i piecz 15 minut w 190°C."
      }
    ]
  },
  {
    id: "beef-carpaccio",
    title: { ru: "Карпаччо из говядины с рукколой и пармезаном", en: "Classic Beef Carpaccio with Arugula", pl: "Carpaccio Wołowe z rukolą i parmezanem" },
    category: "snack",
    prepTime: { ru: "15 мин", en: "15 min", pl: "15 min" },
    calories: 220,
    rating: 4.96,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Тончайшие прозрачные слайсы сырой мраморной говядины с пряной рукколой, лепестками пармезана, каперсами и бальзамическим кремом.",
      en: "Wafer-thin slices of raw beef fillet dressed with peppery arugula, shaved Parmigiano-Reggiano, capers, and aged balsamic glaze.",
      pl: "Cieniutkie plastry surowej polędwicy wołowej z pikantną rukolą, płatkami parmezanu i kremem balsamicznym."
    },
    ingredients: [
      { name: { ru: "Говяжья вырезка", en: "Beef tenderloin", pl: "Polędwica wołowa" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 16.50 },
      { name: { ru: "Свежая руккола", en: "Baby arugula", pl: "Świeża rukola" }, qty: 50, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Сыр Пармезан (лепестки)", en: "Shaved Parmesan", pl: "Płatki parmezanu" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.80 },
      { name: { ru: "Каперсы", en: "Capers", pl: "Kapary" }, qty: 20, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 },
      { name: { ru: "Оливковое масло и лимон", en: "Olive oil and lemon", pl: "Oliwa z oliwek i cytryna" }, qty: 30, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.20 }
    ],
    steps: [
      {
        ru: "Слегка подмороженную вырезку нарежьте слайсером или тончайшим ножом и отбейте через пленку до прозрачности.",
        en: "Slice chilled tenderloin paper-thin, then gently press flat between oiled cling film.",
        pl: "Pokrój schłodzoną polędwicę na cieniutkie plastry i delikatnie rozbij przez folię spożywczą."
      },
      {
        ru: "Разложите мясо на большом охлажденном блюде в один слой.",
        en: "Arrange beef slices in a single layer over a large chilled serving platter.",
        pl: "Rozłóż mięso jedną warstwą na dużym schłodzonym talerzu."
      },
      {
        ru: "В центр выложите горку рукколы, сбрызните оливковым маслом и лимонным соком, посыпьте каперсами и хлопьями пармезана.",
        en: "Mound fresh arugula in center, drizzle with extra virgin olive oil and lemon, scatter capers and parmesan curls.",
        pl: "Na środku ułóż rukolę, skrop oliwą i sokiem z cytryny, posyp kaparami i płatkami sera."
      }
    ]
  },
  {
    id: "chicken-quesadilla",
    title: { ru: "Кесадилья с курицей, кукурузой и сыром", en: "Cheesy Chicken & Corn Quesadilla", pl: "Quesadilla z kurczakiem, kukurydzą i serem" },
    category: "snack",
    prepTime: { ru: "15 мин", en: "15 min", pl: "15 min" },
    calories: 380,
    rating: 4.94,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Подрумяненная на сухой сковороде пшеничная тортилья с начинкой из сочного куриного филе, кукурузы и расплавленного тягучего сыра.",
      en: "Toasted golden flour tortilla stuffed with spiced shredded chicken, sweetcorn, jalapeños, and gooey melted cheddar.",
      pl: "Chrupiąca pszenna tortilla z soczystym kurczakiem, słodką kukurydzą i dużą ilością ciągnącego się sera."
    },
    ingredients: [
      { name: { ru: "Тортильи пшеничные", en: "Flour tortillas", pl: "Tortille pszenne" }, qty: 4, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.80 },
      { name: { ru: "Куриное филе отварное или запеченное", en: "Cooked shredded chicken", pl: "Pieczony kurczak szarpany" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 7.50 },
      { name: { ru: "Сыр Моцарелла или Чеддер", en: "Cheddar cheese", pl: "Ser tarty" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.50 },
      { name: { ru: "Кукуруза консервированная", en: "Sweetcorn", pl: "Kukurydza z puszki" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 }
    ],
    steps: [
      {
        ru: "На половину тортильи выложите слой сыра, кусочки курицы со специями, кукурузу и снова сыр.",
        en: "Layer shredded cheese, spiced chicken, sweetcorn, and more cheese on one half of each tortilla.",
        pl: "Na połowie tortilli ułóż warstwę sera, kawałki kurczaka, kukurydzę i ponownie ser."
      },
      {
        ru: "Сложите пополам и обжарьте на сухой сковороде по 2.5 минуты с каждой стороны до хрустящей корочки.",
        en: "Fold over and toast on dry skillet over medium heat for 2.5 minutes per side until golden and melted.",
        pl: "Złóż na pół i smaż na suchej patelni po 2.5 minuty z każdej strony do rozpuszczenia sera."
      },
      {
        ru: "Нарежьте треугольниками и подавайте со сметаной и соусом сальса.",
        en: "Slice into triangles and serve hot with sour cream and salsa.",
        pl: "Pokrój w trójkąty i podawaj z kwaśną śmietaną i sosem salsa."
      }
    ]
  },
  {
    id: "buffalo-chicken-wings",
    title: { ru: "Куриные крылышки Баффало с соусом Блю Чиз", en: "Crispy Buffalo Chicken Wings", pl: "Chrupiące Skrzydełka Buffalo z dipem serowym" },
    category: "snack",
    prepTime: { ru: "35 мин", en: "35 min", pl: "35 min" },
    calories: 420,
    rating: 4.95,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Хрустящие запеченные крылышки в пикантной глазури из острого соуса и сливочного масла, подаются со стеблями сельдерея.",
      en: "Golden crispy baked wings tossed in classic fiery Frank's RedHot butter glaze served with creamy blue cheese dip.",
      pl: "Chrupiące pieczone skrzydełka w pikantno-maślanym sosie buffalo podawane z dipem z sera pleśniowego i selerem naciowym."
    },
    ingredients: [
      { name: { ru: "Куриные крылья", en: "Chicken wings", pl: "Skrzydełka z kurczaka" }, qty: 700, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 9.80 },
      { name: { ru: "Острый перечный соус", en: "Hot pepper sauce", pl: "Ostry sos paprykowy" }, qty: 60, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 3.50 },
      { name: { ru: "Сливочное масло", en: "Butter", pl: "Masło" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 },
      { name: { ru: "Сыр с голубой плесенью (Дор Блю)", en: "Blue cheese", pl: "Ser z niebieską pleśnią" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Сельдерей черешковый", en: "Celery stalks", pl: "Seler naciowy" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 }
    ],
    steps: [
      {
        ru: "Обсушите крылышки, посыпьте солью с разрыхлителем (секрет хрустящей кожи в духовке) и запекайте при 210°C 30 минут.",
        en: "Pat wings dry, toss with salt and baking powder for extra-crisp skin, bake at 210°C for 30 mins.",
        pl: "Osusz skrzydełka, wymieszaj z solą i proszkiem do pieczenia (sekret chrupkości) i piecz w 210°C przez 30 minut."
      },
      {
        ru: "Растопите масло с острым соусом и перемешайте горячие крылья в миске с глазурью.",
        en: "Melt butter with hot sauce, toss hot roasted wings in a bowl until thoroughly coated.",
        pl: "Rozpuść masło z ostrym sosem i dokładnie wymieszaj upieczone skrzydełka w misce."
      },
      {
        ru: "Подавайте с хрустящими палочками сельдерея и сметанно-сырным соусом.",
        en: "Serve immediately with cold crunchy celery sticks and homemade blue cheese dip.",
        pl: "Podawaj z chrupiącymi słupkami selera naciowego i sosem z sera pleśniowego."
      }
    ]
  },
  {
    id: "tzatziki-dip",
    title: { ru: "Греческий соус Дзадзики со свежими огурцами", en: "Authentic Greek Tzatziki Dip", pl: "Tradycyjne Greckie Tzatziki z ogórkiem" },
    category: "snack",
    prepTime: { ru: "10 мин", en: "10 min", pl: "10 min" },
    calories: 140,
    rating: 4.93,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Освежающая греческая закуска из густого йогурта, тертого огурца, чеснока, укропа и оливкового масла Каламата.",
      en: "Cool and refreshing authentic Greek yogurt dip with grated cucumber, garlic, dill, and Kalamata olive oil.",
      pl: "Orzeźwiający grecki dip z gęstego jogurtu, tartego ogórka, czosnku, koperku i oliwy z oliwek."
    },
    ingredients: [
      { name: { ru: "Греческий йогурт 10%", en: "Greek yogurt 10%", pl: "Jogurt grecki gęsty" }, qty: 300, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.90 },
      { name: { ru: "Огурец свежий грунтовой", en: "Fresh cucumber", pl: "Ogórek gruntowy" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.20 },
      { name: { ru: "Чеснок и укроп", en: "Garlic and dill", pl: "Czosnek i koperek" }, qty: 15, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 },
      { name: { ru: "Оливковое масло Extra Virgin", en: "Extra virgin olive oil", pl: "Oliwa z oliwek" }, qty: 25, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.00 }
    ],
    steps: [
      {
        ru: "Натрите огурец на крупной терке, посолите и тщательно отожмите лишний сок через марлю.",
        en: "Coarsely grate cucumber, sprinkle with salt, rest 5 mins, and squeeze out all liquid thoroughly.",
        pl: "Zetrzyj ogórka na tarce, posól i mocno odciśnij nadmiar soku przez ściereczkę."
      },
      {
        ru: "Смешайте густой греческий йогурт с отжатым огурцом, измельченным чесноком и укропом.",
        en: "Stir squeezed cucumber into thick Greek yogurt with minced garlic, chopped dill, and wine vinegar.",
        pl: "Wymieszaj gęsty jogurt z odciśniętym ogórkiem, przeciśniętym czosnkiem i posiekanym koperkiem."
      },
      {
        ru: "Полейте оливковым маслом и украсьте оливкой Каламата. Подавайте с овощами или лавашом.",
        en: "Swirl onto plate, drizzle with olive oil, top with Kalamata olive. Serve chilled with pita.",
        pl: "Polej oliwą, udekoruj oliwką kalamata i podawaj z chlebkiem pita lub warzywami."
      }
    ]
  },
  {
    id: "caprese-skewers",
    title: { ru: "Канапе Капрезе с мини-моцареллой и соусом песто", en: "Mini Caprese Skewers with Pesto", pl: "Koreczki Caprese z mini mozzarellą i pesto" },
    category: "snack",
    prepTime: { ru: "10 мин", en: "10 min", pl: "10 min" },
    calories: 190,
    rating: 4.95,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Яркая банкетная закуска на шпажках: спелые томаты черри, шарики свежей моцареллы, листья базилика и базиликовый песто.",
      en: "Vibrant Italian party skewers combining sweet cherry tomatoes, baby mozzarella pearls, fresh basil, and genovese pesto.",
      pl: "Elegancka przekąska bankietowa: pomidorki koktajlowe, kulki mini mozzarelli, listki świeżej bazylii i zielone pesto."
    },
    ingredients: [
      { name: { ru: "Мини-моцарелла в шариках", en: "Bocconcini baby mozzarella", pl: "Mini kulki mozzarelli" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.90 },
      { name: { ru: "Томаты черри сладкие", en: "Sweet cherry tomatoes", pl: "Pomidorki cherry" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.90 },
      { name: { ru: "Свежий базилик", en: "Fresh basil leaves", pl: "Świeża bazylia" }, qty: 20, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 },
      { name: { ru: "Соус Песто Дженовезе", en: "Pesto Genovese", pl: "Zielone pesto" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 }
    ],
    steps: [
      {
        ru: "На деревянные шпажки насадите поочередно томат черри, сложенный лист базилика и шарик моцареллы.",
        en: "Thread cherry tomato, folded fresh basil leaf, and baby mozzarella ball onto bamboo skewer.",
        pl: "Nadziewaj na wykałaczki pomidorka, złożony listek bazylii oraz kuleczkę mozzarelli."
      },
      {
        ru: "Выложите канапе на сервировочное блюдо.",
        en: "Arrange colorful skewers neatly across a flat serving board or white platter.",
        pl: "Ułóż koreczki na półmisku lub desce."
      },
      {
        ru: "Полейте соусом песто и капельками густого бальзамического крема перед подачей.",
        en: "Drizzle generously with fresh green pesto and drops of thick aged balsamic reduction.",
        pl: "Skrop sosem pesto i gęstym kremem balsamicznym przed podaniem."
      }
    ]
  }
];
