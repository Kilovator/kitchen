import { Recipe, ScanPreset, Supermarket } from '../types';

export const RECIPES_DATA: Recipe[] = [
  {
    id: "borscht",
    title: { ru: "Борщ домашний с говядиной", en: "Homemade Beef Borscht", pl: "Domowy Barszcz z wołowiną" },
    category: "lunch",
    prepTime: { ru: "60 мин", en: "60 min", pl: "60 min" },
    calories: 380,
    rating: 4.9,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Наваристый традиционный борщ со свеклой, свежей капустой и чесночными пампушками.",
      en: "Hearty traditional beet soup with fresh cabbage, beef broth, and garlic rolls.",
      pl: "Pożywny tradycyjny barszcz z burakami, świeżą kapustą i bułeczkami czosnkowymi."
    },
    ingredients: [
      { name: { ru: "Говядина на кости", en: "Beef bone-in", pl: "Wołowina z kością" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 380 },
      { name: { ru: "Свекла свежая", en: "Fresh beetroot", pl: "Świeże buraki" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 45 },
      { name: { ru: "Капуста белокочанная", en: "White cabbage", pl: "Kapusta biała" }, qty: 300, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 35 },
      { name: { ru: "Картофель", en: "Potatoes", pl: "Ziemniaki" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 30 }
    ],
    steps: [
      {
        ru: "Промойте 400г говядины, залейте 2.5л холодной воды. Доведите до кипения на сильном огне, снимите пену шумовкой. Убавьте огонь до минимума и варите бульон 90 минут под закрытой крышкой.",
        en: "Rinse 400g beef, cover with 2.5L cold water. Bring to boil on high heat, skim off foam. Reduce to low heat and simmer broth for 90 minutes with lid on.",
        pl: "Opłucz 400g wołowiny, zalej 2,5l zimnej wody. Doprowadź do wrzenia, zbierz szumowiny. Zmniejsz ogień i gotuj wywar przez 90 minut pod przykryciem."
      },
      {
        ru: "Нарезка овощей: нашинкуйте 300г капусты тонкой соломкой (2 мм), нарежьте 3 картофелины кубиками 1.5×1.5 см. Отправьте картофель в кипящий бульон на 12 минут, затем добавьте капусту еще на 8 минут.",
        en: "Precision cutting: shred 300g cabbage thinly (2 mm), dice 3 potatoes into 1.5x1.5 cm cubes. Add potatoes to boiling broth for 12 minutes, then add cabbage for another 8 minutes.",
        pl: "Krojenie: poszatkuj 300g kapusty w paski (2 mm), pokrój 3 ziemniaki w kostkę 1,5x1,5 cm. Dodaj ziemniaki do wywaru na 12 minut, a następnie kapustę na kolejne 8 minut."
      },
      {
        ru: "Зажарка: натрите 2 свеклы и 1 морковь на крупной терке. Обжаривайте на растительном масле 6 минут на среднем огне. Добавьте 2 ст.л. томатной пасты и 1 ч.л. сахара, тушите 5 минут.",
        en: "Sofrito: grate 2 beets and 1 carrot. Fry in oil for 6 minutes on medium heat. Stir in 2 tbsp tomato paste and 1 tsp sugar, simmer for 5 minutes.",
        pl: "Podsmażanie: zetrzyj 2 buraki i 1 marchew. Smaż na oleju przez 6 minut na średnim ogniu. Dodaj 2 łyżki przecieru pomidorowego i 1 łyżeczkę cukru, dusić 5 minut."
      },
      {
        ru: "Переложите свекольную зажарку в кастрюлю, добавьте 2 лавровых листа и 3 измельченных зубчика чеснока. Варите 5 минут на слабом огне, выключите плиту и дайте настояться 20 минут.",
        en: "Combine beet mixture into the pot, add 2 bay leaves and 3 minced garlic cloves. Simmer for 5 minutes on low, turn off stove and let steep for 20 minutes.",
        pl: "Przełóż podsmażone buraki do garnka, dodaj 2 liście laurowe i 3 posiekane ząbki czosnku. Gotuj 5 minut na małym ogniu, wyłącz kuchenkę i odstaw na 20 minut."
      }
    ]
  },
  {
    id: "carbonara",
    title: { ru: "Итальянская паста Карбонара", en: "Italian Pasta Carbonara", pl: "Włoska Pasta Carbonara" },
    category: "lunch",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 520,
    rating: 4.95,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "/images/pasta_carbonara_1786617618459.jpg",
    videoUrl: "https://www.youtube.com/embed/3AAdKl1UYZs",
    description: {
      ru: "Классическая спагетти карбонара с хрустящей гуанчиале, яичными желтками и сыром Пекорино.",
      en: "Classic spaghetti carbonara with crispy guanciale, egg yolks, and Pecorino cheese.",
      pl: "Klasyczne spaghetti carbonara z chrupiącym guanciale, żółtkami i serem Pecorino."
    },
    ingredients: [
      { name: { ru: "Спагетти", en: "Spaghetti pasta", pl: "Makaron Spaghetti" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 95 },
      { name: { ru: "Гуанчиале / бекон", en: "Guanciale or bacon", pl: "Guanciale / boczek" }, qty: 120, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 190 },
      { name: { ru: "Яичные желтки", en: "Egg yolks", pl: "Żółtka jaj" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 40 }
    ],
    steps: [
      {
        ru: "Нарезка: нарежьте 120г гуанчиале или бекона брусочками 1×0.5 см. Выложите на сухую холодную сковороду и обжаривайте на среднем огне 7 минут до вытапливания жира и хруста.",
        en: "Cutting: slice 120g guanciale into 1x0.5 cm strips. Place in cold pan and fry on medium heat for 7 minutes until crispy and fat is rendered.",
        pl: "Krojenie: pokrój 120g guanciale w paski 1x0.5 cm. Ułóż na zimnej patelni i smaż na średnim ogniu przez 7 minut na chrupko."
      },
      {
        ru: "Варка пасты: вскипятите 2л воды с 15г соли. Опустите 200г спагетти и варите ровно 8 минут (на 2 минуты меньше времени на упаковке) до состояния al dente.",
        en: "Boiling pasta: bring 2L salted water to boil. Drop 200g spaghetti and cook for exactly 8 minutes (2 mins less than package) until al dente.",
        pl: "Gotowanie makaronu: zagotuj 2l osolonej wody. Wrzuć 200g spaghetti i gotuj dokładnie 8 minut (2 minuty krócej niż na opakowaniu) al dente."
      },
      {
        ru: "Эмульсия: взбейте 3 яичных желтка с 50г мелко натертого сыра Пекорино и 1 ч.л. свежемолотого черного перца.",
        en: "Emulsion: whisk 3 egg yolks with 50g finely grated Pecorino cheese and 1 tsp cracked black pepper.",
        pl: "Emulsja: wymieszaj 3 żółtka z 50g drobno startego sera Pecorino i 1 łyżeczką świeżo mielonego pieprzu."
      },
      {
        ru: "Сборка: переложите спагетти в сковороду с гуанчиале (плита выключена!). Влейте 60 мл горячей воды от пасты, влейте желтковую смесь и непрерывно перемешивайте 90 секунд до создания шелковистого соуса.",
        en: "Assembly: transfer hot spaghetti into pan with guanciale (heat off!). Pour 60ml hot pasta water and egg mix, toss vigorously for 90 seconds until silky sauce forms.",
        pl: "Łączenie: przełóż spaghetti na patelnię z guanciale (ogień wyłączony!). Wlej 60ml wody z makaronu i masę żółtkową, mieszaj intensywnie przez 90 sekund."
      }
    ]
  },
  {
    id: "ribeye",
    title: { ru: "Стейк Рибай с розмарином", en: "Ribeye Steak with Rosemary", pl: "Stek Ribeye z rozmarynem" },
    category: "lunch",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 640,
    rating: 4.98,
    difficulty: { ru: "Сложно", en: "Hard", pl: "Trudny" },
    image: "/images/ribeye_steak_1786617848688.jpg",
    videoUrl: "https://www.youtube.com/embed/5-9M4d23q0U",
    description: {
      ru: "Сочный стейк Medium Rare с чесноком, розмарином и овощами-гриль.",
      en: "Juicy Medium Rare ribeye steak with garlic butter, rosemary and grilled veggies.",
      pl: "Soczysty stek Ribeye Medium Rare z masłem czosnkowym i warzywami z grilla."
    },
    ingredients: [
      { name: { ru: "Стейк Рибай", en: "Ribeye steak", pl: "Stek Ribeye" }, qty: 350, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 650 },
      { name: { ru: "Масло сливочное", en: "Butter", pl: "Masło" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 65 }
    ],
    steps: [
      {
        ru: "Подготовка мяса: извлеките стейк 350г толщиной 3.5 см из холодильника за 30 минут до жарки. Тщательно обсушите бумажным полотенцем. Посыпьте 1 ч.л. крупной морской соли.",
        en: "Meat prep: take 350g steak (3.5 cm thick) out of fridge 30 minutes before cooking. Dry thoroughly with paper towels. Season with 1 tsp coarse sea salt.",
        pl: "Przygotowanie: wyjmij stek 350g (grubość 3.5 cm) z lodówki 30 minut przed smażeniem. Osusz ręcznikiem papierowym. Posyp 1 łyżeczką soli morskiej."
      },
      {
        ru: "Обжарка: разогрейте сухую чугунную сковороду на максимуме до появления дымка. Выложите стейк и жарьте ровно 2.5 минуты не трогая.",
        en: "Sear: heat a dry cast iron skillet to smoking hot. Place steak and sear untouched for exactly 2.5 minutes.",
        pl: "Smażenie: mocno rozgrzej suchą patelnię żeliwną. Ułóż stek i smaż bez dotykania dokładnie przez 2.5 minuty."
      },
      {
        ru: "Ароматизация: переверните стейк, уменьшите огонь до среднего. Добавьте 40г сливочного масла, 3 раздавленных зубчика чеснока и 2 веточки розмарина. Жарьте 2.5 минуты, поливая ложкой масло на мясо.",
        en: "Basting: flip steak, lower heat to medium. Add 40g butter, 3 crushed garlic cloves, and 2 rosemary sprigs. Cook for 2.5 minutes, constantly basting butter over meat.",
        pl: "Aromatyzowanie: przewróć stek, zmniejsz ogień. Dodaj 40g masła, 3 rozgniecione ząbki czosnku i 2 gałązki rozmarynu. Smaż 2.5 minuty, polewając roztopionym masłem."
      },
      {
        ru: "Отдых мяса: переложите стейк на теплую тарелку и дайте отдохнуть ровно 5 минут перед нарезкой для перераспределения соков.",
        en: "Resting: transfer steak to warm plate and let rest for exactly 5 minutes before slicing to allow juices to redistribute.",
        pl: "Odpoczynek: przełóż stek na ciepły talerz i odstaw na dokładnie 5 minut przed krojeniem."
      }
    ]
  },
  {
    id: "tacos",
    title: { ru: "Мексиканские Тако с говядиной", en: "Mexican Beef Tacos", pl: "Meksykańskie Tacos z wołowiną" },
    category: "fast",
    prepTime: { ru: "18 мин", en: "18 min", pl: "18 min" },
    calories: 450,
    rating: 4.88,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "/images/beef_tacos_1786619969488.jpg",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Кукурузные лепешки с тушеной говядиной, свежим гуакамоле и сальсой Пико-де-гальо.",
      en: "Corn tortillas filled with shredded beef, homemade guacamole, and fresh salsa.",
      pl: "Tortille kukurydziane z szarpaną wołowiną, guacamole i świeżą salsą."
    },
    ingredients: [
      { name: { ru: "Тортильи кукурузные", en: "Corn tortillas", pl: "Tortille kukurydziane" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 85 },
      { name: { ru: "Говяжий фарш / мякоть", en: "Ground beef", pl: "Mięso wołowe" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 180 },
      { name: { ru: "Авокадо для гуакамоле", en: "Avocado for guacamole", pl: "Awokado na guacamole" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 110 }
    ],
    steps: [
      {
        ru: "Мясо: обжаривайте 200г говядины на растительном масле 6 минут на сильном огне. Добавьте 1 ч.л. кумина, 1/2 ч.л. чили и 50 мл воды, тушите 4 минуты до испарения влаги.",
        en: "Meat: cook 200g ground beef in oil for 6 minutes on high heat. Add 1 tsp cumin, 1/2 tsp chili, 50ml water and simmer 4 minutes until liquid evaporates.",
        pl: "Mięso: podsmażaj 200g wołowiny na oleju przez 6 minut na dużym ogniu. Dodaj kmin, chili i 50ml wody, dusić 4 minuty."
      },
      {
        ru: "Гуакамоле: разройте спелое авокадо вилкой, добавьте сок 1/2 лайма, щепотку соли и мелко нарезанную кинзу.",
        en: "Guacamole: mash 1 ripe avocado with fork, mix with juice of 1/2 lime, pinch of salt, and chopped cilantro.",
        pl: "Guacamole: rozgnieć awokado widelcem, dodaj sok z 1/2 limonki, sól i posiekaną kolendrę."
      },
      {
        ru: "Прогрев тортилий: прогрейте 3 кукурузные лепешки на сухой сковороде по 30 секунд с каждой стороны.",
        en: "Warm tortillas: heat 3 corn tortillas on dry skillet for 30 seconds per side.",
        pl: "Podgrzanie: podgrzewaj 3 tortille na suchej patelni po 30 sekund z każdej strony."
      }
    ]
  },
  {
    id: "butter_chicken",
    title: { ru: "Курица Карри по-индийски", en: "Indian Butter Chicken Curry", pl: "Indyjskie Butter Chicken Curry" },
    category: "lunch",
    prepTime: { ru: "30 мин", en: "30 min", pl: "30 min" },
    calories: 560,
    rating: 4.93,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "/images/butter_chicken_1786619986389.jpg",
    videoUrl: "https://www.youtube.com/embed/3AAdKl1UYZs",
    description: {
      ru: "Нежные кусочки куриного филе в соусе из томатов, сливок и пряных индийских специй.",
      en: "Tender chicken pieces in a rich, creamy tomato and aromatic Indian spice sauce.",
      pl: "Soczyste kawałki kurczaka w kremowym sosie pomidorowo-maślanym z przyprawami."
    },
    ingredients: [
      { name: { ru: "Куриное филе", en: "Chicken breast", pl: "Pierś z kurczaka" }, qty: 300, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 190 },
      { name: { ru: "Сливки 33%", en: "Heavy cream 33%", pl: "Śmietanka 33%" }, qty: 150, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 95 },
      { name: { ru: "Томатный соус и специи", en: "Tomato sauce & garam masala", pl: "Sos pomidorowy i przyprawy" }, qty: 1, unit: { ru: "набор", en: "set", pl: "zestaw" }, basePrice: 75 }
    ],
    steps: [
      {
        ru: "Маринование: нарежьте 300г куриного филе кубиками 2.5×2.5 см. Замаринуйте в 100г натурального йогурта с 1 ч.л. гараам масалы и чесноком на 15 минут.",
        en: "Marination: cut 300g chicken into 2.5x2.5 cm cubes. Marinate in 100g plain yogurt with 1 tsp garam masala and minced garlic for 15 minutes.",
        pl: "Marynowanie: pokrój 300g kurczaka w kostkę 2.5x2.5 cm. Zamarynuj w jogurcie z przyprawami na 15 minut."
      },
      {
        ru: "Обжарка и соус: обжарьте курицу в 30г сливочного масла 5 минут на сильном огне. Влейте 150г томатного соуса и 150мл сливок 33%, томите на слабом огне 12 минут.",
        en: "Cooking: sear chicken in 30g butter for 5 minutes on high heat. Add 150g tomato puree and 150ml heavy cream, simmer on low heat for 12 minutes.",
        pl: "Smażenie i sos: podsmaż kurczaka na masle przez 5 minut. Dodaj przecier pomidorowy i śmietankę 33%, dusić 12 minut."
      }
    ]
  },
  {
    id: "tom_yum",
    title: { ru: "Том Ям с тигровыми креветками", en: "Tom Yum Soup with Prawns", pl: "Zupa Tom Yum z krewetkami" },
    category: "lunch",
    prepTime: { ru: "25 мин", en: "25 min", pl: "25 min" },
    calories: 360,
    rating: 4.9,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "/images/tom_yum_soup_1786617631167.jpg",
    videoUrl: "https://www.youtube.com/embed/5-9M4d23q0U",
    description: {
      ru: "Остро-кислый тайский суп с креветками и кокосовым молоком.",
      en: "Spicy & sour Thai soup with tiger prawns and coconut milk.",
      pl: "Ostro-kwaśna tajska zupa z krewetkami i mlekiem kokosowym."
    },
    ingredients: [
      { name: { ru: "Креветки", en: "Tiger prawns", pl: "Krewetki" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 420 },
      { name: { ru: "Кокосовое молоко", en: "Coconut milk", pl: "Mleczko kokosowe" }, qty: 200, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 130 }
    ],
    steps: [
      {
        ru: "Бульон: вскипятите 500 мл бульона, добавьте размятый стебель лемонграсса и 2 ст.л. пасты Том Ям. Варите 4 минуты на среднем огне.",
        en: "Broth: bring 500ml broth to boil, add crushed lemongrass stalk and 2 tbsp Tom Yum paste. Simmer for 4 minutes.",
        pl: "Wywar: zagotuj 500ml wywaru z trawą cytrynową i pastą Tom Yum. Gotuj 4 minuty."
      },
      {
        ru: "Финал: влейте 200 мл кокосового молока, опустите 250г очищенных креветок и варите ровно 3 минуты до розоватого цвета.",
        en: "Finish: pour in 200ml coconut milk, add 250g peeled prawns and cook for exactly 3 minutes until pink.",
        pl: "Finał: wlej 200ml mleczka kokosowego, dodaj 250g krewetek i gotuj dokładnie 3 minuty."
      }
    ]
  },
  {
    id: "ramen",
    title: { ru: "Японский Рамен со свининой", en: "Japanese Tonkotsu Ramen", pl: "Japoński Ramen z wieprzowiną" },
    category: "lunch",
    prepTime: { ru: "35 мин", en: "35 min", pl: "35 min" },
    calories: 580,
    rating: 4.92,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "/images/japanese_ramen_1786617864557.jpg",
    videoUrl: "https://www.youtube.com/embed/3AAdKl1UYZs",
    description: {
      ru: "Японский суп рамен с нежной свининой Тясю, яйцом аджитама и нори.",
      en: "Japanese noodle soup with tender chashu pork, ajitama egg and nori.",
      pl: "Japońska zupa z makaronem, chashu, jajkiem ajitama i nori."
    },
    ingredients: [
      { name: { ru: "Лапша рамен", en: "Ramen noodles", pl: "Makaron ramen" }, qty: 180, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 110 },
      { name: { ru: "Свинина Тясю", en: "Chashu pork", pl: "Wieprzowina Chashu" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 210 }
    ],
    steps: [
      {
        ru: "Лапша: отварите 180г лапши рамен в кипящей воде 3 минуты al dente, откиньте на дуршлаг.",
        en: "Noodles: cook 180g ramen noodles in boiling water for 3 minutes al dente, drain.",
        pl: "Makaron: ugotuj 180g makaronu ramen w kucharce przez 3 minuty al dente, odcedź."
      },
      {
        ru: "Подача: залейте лапшу кипящим мясным бульоном, выложите слайсы свинины 4 мм, маринованное яйцо и лист нори.",
        en: "Plating: pour hot rich pork broth over noodles, lay 4mm pork slices, half egg and nori sheet.",
        pl: "Podanie: zalej makaron gorącym wywarem, ułóż plastry wieprzowiny 4 mm, jajko i nori."
      }
    ]
  },
  {
    id: "shakshuka",
    title: { ru: "Шакшука с томатами и фетой", en: "Shakshuka with Feta", pl: "Szakszuka z fetą" },
    category: "breakfast",
    prepTime: { ru: "15 мин", en: "15 min", pl: "15 min" },
    calories: 310,
    rating: 4.85,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "/images/shakshuka_breakfast_1786617643118.jpg",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Восточный завтрак из яиц в сочном томатном соусе.",
      en: "Middle Eastern poached eggs in spiced tomato sauce.",
      pl: "Bliskowschodnie śniadanie z jajek w sosie pomidorowym."
    },
    ingredients: [
      { name: { ru: "Яйца куриные", en: "Eggs", pl: "Jajka" }, qty: 4, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 45 },
      { name: { ru: "Томаты", en: "Tomatoes", pl: "Pomidory" }, qty: 300, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 90 }
    ],
    steps: [
      {
        ru: "Соус: обжарьте нарезаный лук и перец 5 минут. Добавьте 300г томатов, 1/2 ч.л. кумина и тушите 6 минут до загустения.",
        en: "Sauce: saute onion & pepper for 5 minutes. Add 300g diced tomatoes, 1/2 tsp cumin, simmer 6 minutes.",
        pl: "Sos: podsmaż cebulę i paprykę 5 minut. Dodaj 300g pomidorów i dusić 6 minut."
      },
      {
        ru: "Яйца: сделайте 4 лунки в соусе, вбейте яйца. Накройте крышкой и томите ровно 4 минуты.",
        en: "Eggs: make 4 wells in sauce, crack eggs in. Cover and cook for exactly 4 minutes.",
        pl: "Jajka: zrób 4 wgłębienia w sosie, wbij jajka. Przykryj i gotuj dokładnie 4 minuty."
      }
    ]
  },
  {
    id: "waffles",
    title: { ru: "Бельгийские вафли с ягодами", en: "Belgian Waffles with Berries", pl: "Gofry belgijskie z owocami" },
    category: "breakfast",
    prepTime: { ru: "15 мин", en: "15 min", pl: "15 min" },
    calories: 420,
    rating: 4.9,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "/images/belgian_waffles_1786617880120.jpg",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Хрустящие вафли с мороженым и свежими ягодами.",
      en: "Crispy waffles with ice cream and fresh berries.",
      pl: "Chrupiące gofry z lodami i świeżymi owocami."
    },
    ingredients: [
      { name: { ru: "Мука пшеничная", en: "Flour", pl: "Mąka" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 45 },
      { name: { ru: "Свежие ягоды", en: "Fresh berries", pl: "Świeże owoce" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 140 }
    ],
    steps: [
      {
        ru: "Тесто: смешайте 200г муки, 150мл молока, 1 яйцо и 70г растопленного сливочного масла до гладкости.",
        en: "Batter: mix 200g flour, 150ml milk, 1 egg and 70g melted butter until smooth.",
        pl: "Ciasto: wymieszaj 200g mąki, 150ml mleka, 1 jajko i 70g roztopionego masła."
      },
      {
        ru: "Выпечка: выпекайте в вафельнице ровно 4.5 минуты до золотистой хрустящей корочки.",
        en: "Baking: bake in waffle iron for exactly 4.5 minutes until golden and crispy.",
        pl: "Pieczenie: piecz w gofrownicy dokładnie 4.5 minuty na złoty kolor."
      }
    ]
  },
  {
    id: "caesar_salad",
    title: { ru: "Салат Цезарь с куриной грудкой", en: "Chicken Caesar Salad", pl: "Sałatka Cezar z kurczakiem" },
    category: "healthy",
    prepTime: { ru: "18 мин", en: "18 min", pl: "18 min" },
    calories: 330,
    rating: 4.8,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/3AAdKl1UYZs",
    description: {
      ru: "Салат Романо со сочной куриной грудкой, крутонами и пармезаном.",
      en: "Romaine lettuce with grilled chicken, croutons, and parmesan.",
      pl: "Sałata rzymska z grillowanym kurczakiem, grzankami i parmezanem."
    },
    ingredients: [
      { name: { ru: "Куриное филе", en: "Chicken breast", pl: "Pierś z kurczaka" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 130 },
      { name: { ru: "Салат Романо", en: "Romaine lettuce", pl: "Sałata rzymska" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 85 }
    ],
    steps: [
      {
        ru: "Курица: обжарьте 200г куриного филе по 4 минуты с каждой стороны, нарежьте слайсами 5 мм.",
        en: "Chicken: grill 200g chicken breast for 4 minutes per side, slice into 5mm strips.",
        pl: "Kurczak: usmaż 200g piersi z kurczaka po 4 minuty z każdej strony, pokrój w plastry 5 mm."
      }
    ]
  },
  {
    id: "salmon_bowl",
    title: { ru: "Боул с лососем и киноа", en: "Salmon & Quinoa Bowl", pl: "Bowl z łososiem i komosą" },
    category: "healthy",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 440,
    rating: 4.95,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: {
      ru: "Сбалансированное блюдо с филе лосося, киноа, огурцом и чукой.",
      en: "Balanced bowl with fresh salmon, quinoa, cucumber, and chuka algae.",
      pl: "Zrównoważona miska z łososiem, quinoa, ogórkiem i glonami chuka."
    },
    ingredients: [
      { name: { ru: "Филе лосося", en: "Salmon fillet", pl: "Filet z łososia" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 320 },
      { name: { ru: "Киноа", en: "Quinoa", pl: "Komosa ryżowa" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 60 }
    ],
    steps: [
      {
        ru: "Киноа: отварите 100г киноа в 200мл подсоленной воды 14 минут до впитывания влаги.",
        en: "Quinoa: cook 100g quinoa in 200ml salted water for 14 minutes until tender.",
        pl: "Komosa: ugotuj 100g komosy w 200ml osolonej wody przez 14 minut."
      }
    ]
  },
  {
    id: "avocado_toast",
    title: { ru: "Авокадо-тост с яйцом пашот", en: "Avocado Toast with Egg", pl: "Tost z awokado i jajkiem" },
    category: "breakfast",
    prepTime: { ru: "12 мин", en: "12 min", pl: "12 min" },
    calories: 290,
    rating: 4.8,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/5-9M4d23q0U",
    description: {
      ru: "Злаковый тост с пастой из спелого авокадо и яйцом пашот.",
      en: "Wholegrain toast topped with avocado mash and poached egg.",
      pl: "Tost wieloziarnisty z awokado i jajkiem w koszulce."
    },
    ingredients: [
      { name: { ru: "Хлеб зерновой", en: "Grain bread", pl: "Chleb ziarnisty" }, qty: 2, unit: { ru: "куска", en: "slices", pl: "plasterki" }, basePrice: 55 },
      { name: { ru: "Авокадо спелое", en: "Ripe avocado", pl: "Dojrzałe awokado" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 120 }
    ],
    steps: [
      {
        ru: "Пашот: сварите яйцо в слабо кипящей воде со 1 ч.л. уксуса ровно 3 минуты.",
        en: "Poached egg: cook egg in barely simmering water with 1 tsp vinegar for exactly 3 minutes.",
        pl: "Jajko w koszulce: gotuj jajko w wodzie z 1 łyżeczką octu dokładnie 3 minuty."
      }
    ]
  },
  {
    id: "pizza",
    title: { ru: "Пицца Пепперони на тонком тесте", en: "Pepperoni Thin Crust Pizza", pl: "Pizza Pepperoni na cienkim ciście" },
    category: "fast",
    prepTime: { ru: "25 мин", en: "25 min", pl: "25 min" },
    calories: 680,
    rating: 4.7,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Пицца с колбасками пепперони и сыром моцарелла.",
      en: "Crispy thin crust pizza with pepperoni slices and mozzarella.",
      pl: "Pizza na cienkim ciście z kiełbaskami pepperoni i mozzarellą."
    },
    ingredients: [
      { name: { ru: "Тесто для пиццы", en: "Pizza dough", pl: "Ciasto na pizzę" }, qty: 1, unit: { ru: "упак", en: "pack", pl: "opak" }, basePrice: 90 },
      { name: { ru: "Пепперони", en: "Pepperoni", pl: "Kiełbasa Pepperoni" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 150 }
    ],
    steps: [
      {
        ru: "Выпечка: раскатайте тесто до 3 мм, выложите моцареллу и пепперони, выпекайте при 220°C ровно 12 минут.",
        en: "Baking: roll dough to 3mm, top with mozzarella & pepperoni, bake at 220°C for exactly 12 minutes.",
        pl: "Pieczenie: rozwałkuj ciasto na 3 mm, ułóż mozzarellę i pepperoni, piecz w 220°C przez 12 minut."
      }
    ]
  },
  {
    id: "oatmeal",
    title: { ru: "Овсянка с бананом и орехами", en: "Oatmeal with Caramelized Banana", pl: "Owsianka z bananem i orzechami" },
    category: "breakfast",
    prepTime: { ru: "10 мин", en: "10 min", pl: "10 min" },
    calories: 320,
    rating: 4.88,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Кремовая овсяная каша на миндальном молоке с карамелизованным бананом и пеканом.",
      en: "Creamy almond milk oatmeal topped with caramelized banana and pecans.",
      pl: "Kremowa owsianka na mleku migdałowym z bananem i orzechami."
    },
    ingredients: [
      { name: { ru: "Овсяные хлопья", en: "Oat flakes", pl: "Płatki owsiane" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 35 },
      { name: { ru: "Миндальное молоко", en: "Almond milk", pl: "Mleko migdałowe" }, qty: 250, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 50 },
      { name: { ru: "Банан спелый", en: "Ripe banana", pl: "Dojrzały banan" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 25 },
      { name: { ru: "Мед натуральный", en: "Natural honey", pl: "Miód naturalny" }, qty: 20, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 30 }
    ],
    steps: [
      {
        ru: "Варка каши: засыпьте 80г овсяных хлопьев в сотейник с 250мл миндального молока и щепоткой соли. Варите 5 минут на слабом огне.",
        en: "Cooking oatmeal: combine 80g oat flakes with 250ml almond milk and pinch of salt. Simmer 5 minutes on low heat.",
        pl: "Gotowanie: wsyp 80g płatków owsianych do 250ml mleka migdałowego z szczyptą soli. Gotuj 5 minut na małym ogniu."
      },
      {
        ru: "Карамелизация: нарежьте банан кружочками 1 см. Обжарьте на 10г сливочного масла с 1 ч.л. меда по 1.5 минуты с каждой стороны.",
        en: "Caramelization: slice banana into 1cm coins. Fry in 10g butter with 1 tsp honey for 1.5 minutes per side until golden.",
        pl: "Karmelizacja: pokrój banan w plastry 1 cm. Smaż na 10g masła z miodem po 1.5 minuty z każdej strony."
      }
    ]
  },
  {
    id: "beef_burger",
    title: { ru: "Чизбургер Блэк Ангус", en: "Black Angus Bacon Cheeseburger", pl: "Cheeseburger Black Angus z bekonem" },
    category: "fast",
    prepTime: { ru: "22 мин", en: "22 min", pl: "22 min" },
    calories: 720,
    rating: 4.96,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/5-9M4d23q0U",
    description: {
      ru: "Сочный бургер из мраморной говядины Блэк Ангус с расплавленным чеддером и беконом на бриошь.",
      en: "Juicy Black Angus beef patty topped with melted cheddar, crispy bacon, and truffle sauce on brioche bun.",
      pl: "Soczysty burger z wołowiny Black Angus z roztopionym cheddarem, bekonem i sosem na bułce brioche."
    },
    ingredients: [
      { name: { ru: "Говяжий фарш Блэк Ангус", en: "Black Angus ground beef", pl: "Wołowina mielona Black Angus" }, qty: 180, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 240 },
      { name: { ru: "Булочки Бриошь", en: "Brioche burger buns", pl: "Bułki Brioche" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 65 },
      { name: { ru: "Сыр Чеддер", en: "Cheddar cheese", pl: "Ser Cheddar" }, qty: 2, unit: { ru: "ломтика", en: "slices", pl: "plastry" }, basePrice: 50 },
      { name: { ru: "Бекон хрустящий", en: "Crispy bacon", pl: "Boczek chrupiący" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 70 }
    ],
    steps: [
      {
        ru: "Котлета: сформируйте из 180г фарша плоскую котлету диаметром 11 см, посолите и поперчите перед жаркой.",
        en: "Patty prep: shape 180g beef into flat patty (11 cm wide), season with sea salt and black pepper just before searing.",
        pl: "Kotlecie: uformuj z 180g wołowiny płaski kotlet (średnica 11 cm), dopraw solą i pieprzem tuż przed smażeniem."
      },
      {
        ru: "Жарка: обжаривайте котлету на раскаленной сковороде по 2.5 минуты с каждой стороны. За 1 минуту до готовности выложите 2 ломтика чеддера.",
        en: "Searing: cook patty on smoking hot skillet for 2.5 minutes per side. Top with 2 cheddar slices 1 minute before finishing to melt.",
        pl: "Smażenie: smaż kotlet na mocno rozgrzanej patelni po 2.5 minuty z każdej strony. Połóż 2 plastry cheddara na 1 minutę przed końcem."
      },
      {
        ru: "Сборка: обжарьте разрезанную булочку бриошь 1 минуту на сливочном масле. Смажьте соусом, выложите котлету с сыром, бекон и свежий огурец.",
        en: "Assembly: toast sliced brioche bun in butter for 1 minute. Spread sauce, lay cheeseburger patty, crispy bacon, and pickles.",
        pl: "Składanie: podsmaż bułkę brioche na masłe przez 1 minutę. Posmaruj sosem, ułóż kotlet z serem, bekon i ogórek konserwowy."
      }
    ]
  },
  {
    id: "lasagna",
    title: { ru: "Итальянская Лазанья Болоньезе", en: "Classic Lasagna Bolognese", pl: "Włoska Lazania Bolognese" },
    category: "lunch",
    prepTime: { ru: "50 мин", en: "50 min", pl: "50 min" },
    calories: 610,
    rating: 4.97,
    difficulty: { ru: "Сложно", en: "Hard", pl: "Trudny" },
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/3AAdKl1UYZs",
    description: {
      ru: "Традиционная итальянская лазанья с густым соусом Болоньезе, Бешамель и пармезаном.",
      en: "Traditional Italian lasagna layered with rich Bolognese ragu, silky Béchamel, and parmesan.",
      pl: "Tradycyjna włoska lazania z gęstym sosem Bolognese, sosem beszamelowym i parmezanem."
    },
    ingredients: [
      { name: { ru: "Листы для лазаньи", en: "Lasagna sheets", pl: "Płaty do lazanii" }, qty: 12, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 95 },
      { name: { ru: "Фарш говядина/свинина", en: "Beef & pork mince", pl: "Mięso mielone wołowo-wieprzowe" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 220 },
      { name: { ru: "Сыр Моцарелла", en: "Mozzarella cheese", pl: "Ser Mozzarella" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 130 },
      { name: { ru: "Томатная пассата", en: "Tomato passata", pl: "Passata pomidorowa" }, qty: 350, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 75 }
    ],
    steps: [
      {
        ru: "Соус Болоньезе: обжарьте лук, чеснок и 400г фарша 8 минут. Добавьте 350мл пассаты, базилик и томите 20 минут на слабом огне.",
        en: "Bolognese sauce: saute onion, garlic and 400g mince for 8 minutes. Add 350ml passata, basil, and simmer 20 minutes on low heat.",
        pl: "Sos Bolognese: podsmaż cebulę, czosnek i 400g mięsa przez 8 minut. Dodaj passatę pomidorową i dusić 20 minut."
      },
      {
        ru: "Соус Бешамель: растопите 40г сливочного масла, всыпьте 40г муки, влейте 500мл молока и варите до загустения 5 минут со щепоткой мускатного ореха.",
        en: "Béchamel sauce: melt 40g butter, whisk in 40g flour, pour 500ml milk and cook 5 minutes until thickened with pinch of nutmeg.",
        pl: "Sos beszamelowy: roztop 40g masła, dodaj 40g mąki, wlej 500ml mleka i gotuj 5 minut do zgęstnienia."
      },
      {
        ru: "Запекание: выложите слоями в форму: Бешамель, листы лазаньи, Болоньезе, моцареллу. Выпекайте при 190°C ровно 30 минут до золотистой корочки.",
        en: "Baking: layer in baking dish: Béchamel, pasta sheets, Bolognese, mozzarella. Bake at 190°C for exactly 30 minutes until golden.",
        pl: "Pieczenie: układaj warstwami: beszamel, płaty, Bolognese, mozzarellę. Piecz w 190°C przez dokładnie 30 minut."
      }
    ]
  },
  {
    id: "pad_thai",
    title: { ru: "Пад Тай с креветками", en: "Shrimp Pad Thai Noodles", pl: "Pad Thai z krewetkami" },
    category: "lunch",
    prepTime: { ru: "25 мин", en: "25 min", pl: "25 min" },
    calories: 490,
    rating: 4.92,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/5-9M4d23q0U",
    description: {
      ru: "Знаменитая тайская рисовая лапша вок с тигровыми креветками, арахисом и соусом тамаринд.",
      en: "Famous Thai wok rice noodles stir-fried with tiger prawns, crushed peanuts, bean sprouts, and tamarind sauce.",
      pl: "Słynny tajski makaron ryżowy z wok z krewetkami, orzeszkami ziemnymi i sosem tamaryndowym."
    },
    ingredients: [
      { name: { ru: "Рисовая лапша", en: "Rice noodles", pl: "Makaron ryżowy" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 80 },
      { name: { ru: "Тигровые креветки", en: "Tiger prawns", pl: "Krewetki tygrysie" }, qty: 180, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 320 },
      { name: { ru: "Арахис дробленый", en: "Crushed peanuts", pl: "Orzeszki ziemne" }, qty: 30, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 35 },
      { name: { ru: "Соус Пад Тай", en: "Pad Thai tamarind sauce", pl: "Sos Pad Thai" }, qty: 50, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 65 }
    ],
    steps: [
      {
        ru: "Замачивание: замочите 150г рисовой лапши в теплой воде на 15 минут. Обжарьте 180г креветок в воке 2 минуты на сильном огне.",
        en: "Soaking: soak 150g rice noodles in warm water for 15 minutes. Stir-fry 180g prawns in hot wok for 2 minutes on high heat.",
        pl: "Namaczanie: namocz 150g makaronu ryżowego w ciepłej wodzie przez 15 minut. Smaż 180g krewetek w woku przez 2 minuty."
      },
      {
        ru: "Вок: отодвиньте креветки, вбей яйцо и быстро перемешайте. Добавьте лапшу, 50мл соуса Пад Тай и обжаривайте 3 минуты.",
        en: "Wok stir-fry: push prawns aside, scramble 1 egg. Add drained noodles, 50ml Pad Thai sauce and toss vigorously for 3 minutes.",
        pl: "Smażenie: przesuń krewetki, wbij jajko i wymieszaj. Dodaj makaron, sos Pad Thai i smaż przez 3 minuty."
      },
      {
        ru: "Подача: посыпьте 30г дробленого арахиса, ростками сои и полейте соком 1/2 лайма.",
        en: "Serving: top with 30g crushed peanuts, fresh bean sprouts, cilantro, and fresh lime wedge.",
        pl: "Podanie: posyp 30g orzeszków ziemnych, kiełkami soi i skrop sokiem z limonki."
      }
    ]
  },
  {
    id: "tiramisu",
    title: { ru: "Итальянский десерт Тирамису", en: "Classic Italian Tiramisu", pl: "Włoski Deser Tiramisu" },
    category: "dessert",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 410,
    rating: 4.99,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/3AAdKl1UYZs",
    description: {
      ru: "Нежнейший итальянский десерт с сыром маскарпоне, печеньем савоярди и эспрессо.",
      en: "Classic Italian dessert with creamy mascarpone, espresso-soaked ladyfingers, and cocoa powder.",
      pl: "Klasyczny włoski deser z serem mascarpone, biszkoptami nasączonymi espresso i kakao."
    },
    ingredients: [
      { name: { ru: "Сыр Маскарпоне", en: "Mascarpone cheese", pl: "Ser Mascarpone" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 160 },
      { name: { ru: "Печенье Савоярди", en: "Ladyfingers (Savoiardi)", pl: "Biszkopty Savoiardi" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 90 },
      { name: { ru: "Эспрессо свежесваренный", en: "Freshly brewed espresso", pl: "Świeże espresso" }, qty: 150, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 40 },
      { name: { ru: "Какао-порошок", en: "Cocoa powder", pl: "Kakao" }, qty: 20, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 25 }
    ],
    steps: [
      {
        ru: "Крем: взбейте 3 желтка с 60г сахарной пудры до белой пены. Добавьте 250г маскарпоне и аккуратно перемешайте лопаткой.",
        en: "Cream: beat 3 egg yolks with 60g powdered sugar until pale foam forms. Fold in 250g mascarpone gently with spatula.",
        pl: "Krem: ubij 3 żółtka z 60g cukru pudru na puszystą masę. Dodaj 250g mascarpone i delikatnie wymieszaj."
      },
      {
        ru: "Сборка: быстрыми движениями окунайте печенье савоярди в остывший эспрессо на 1 секунду и выкладывайте слоями с кремом.",
        en: "Assembly: dip ladyfingers quickly into cold espresso (1 sec per side) and layer with mascarpone cream.",
        pl: "Składanie: zanurzaj biszkopty w zimnym espresso na 1 sekundę i układaj warstwami z kremem."
      },
      {
        ru: "Охлаждение: посыпьте сверху какао-порошком через ситечко и поставьте в холодильник минимум на 2 часа.",
        en: "Chilling: dust top generously with cocoa powder and chill in refrigerator for at least 2 hours.",
        pl: "Chłodzenie: posyp z wierzchu kakao i wstaw do lodówki na co najmniej 2 godziny."
      }
    ]
  },
  {
    id: "salmon_cream_pasta",
    title: { ru: "Паста с лососем и шпинатом", en: "Creamy Salmon & Spinach Pasta", pl: "Makaron z łososiem i szpinakiem" },
    category: "lunch",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 540,
    rating: 4.94,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6288339?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/5-9M4d23q0U",
    description: {
      ru: "Фетучини с обжаренным филе лосося, свежим шпинатом и сливочно-чесночным соусом.",
      en: "Fettuccine pasta with seared salmon chunks, fresh baby spinach, and garlic cream sauce.",
      pl: "Fettuccine z podsmażonym filet z łososia, świeżym szpinakiem i sosem śmietankowym."
    },
    ingredients: [
      { name: { ru: "Фетучини / Пенне", en: "Fettuccine pasta", pl: "Makaron Fettuccine" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 85 },
      { name: { ru: "Филе лосося свежее", en: "Fresh salmon fillet", pl: "Filet z łososia" }, qty: 220, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 360 },
      { name: { ru: "Сливки 20%", en: "Cooking cream 20%", pl: "Śmietanka 20%" }, qty: 150, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 65 },
      { name: { ru: "Шпинат свежий", en: "Fresh baby spinach", pl: "Szpinak świeży" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 50 }
    ],
    steps: [
      {
        ru: "Лосось: нарежьте 220г лосося кубиками 2×2 см. Обжарьте на оливковом масле 3 минуты до золотистой корочки, переложите на тарелку.",
        en: "Salmon: dice 220g salmon fillet into 2x2 cm cubes. Sear in olive oil for 3 minutes until golden, remove to plate.",
        pl: "Łosoś: pokrój 220g łososia w kostkę 2x2 cm. Smaż na oliwie przez 3 minuty na złoty kolor, przełóż na talerz."
      }
    ]
  },
  {
    id: "french_onion_soup",
    title: { ru: "Французский Луковый Суп", en: "French Onion Soup with Gruyere", pl: "Francuska Zupa Cebulowa z serem" },
    category: "lunch",
    prepTime: { ru: "45 мин", en: "45 min", pl: "45 min" },
    calories: 390,
    rating: 4.89,
    difficulty: { ru: "Средне", en: "Medium", pl: "Średni" },
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Классический суп из карамелизованного репчатого лука на говяжьем бульоне с запеченным сырным багетом.",
      en: "Rich caramelized onion soup in beef broth topped with toasted baguette slice and melted Gruyere cheese.",
      pl: "Klasyczna zupa z karmelizowanej cebuli na wywarze wołowym z pieczoną bagietką i serem."
    },
    ingredients: [
      { name: { ru: "Лук репчатый", en: "Yellow onions", pl: "Cebula żółta" }, qty: 600, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 40 },
      { name: { ru: "Говяжий бульон", en: "Beef broth", pl: "Wywar wołowy" }, qty: 700, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 60 },
      { name: { ru: "Сыр Грюйер / Эмменталь", en: "Gruyere cheese", pl: "Ser Gruyere" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 120 },
      { name: { ru: "Багет французский", en: "French baguette", pl: "Bagietka francuska" }, qty: 4, unit: { ru: "ломтика", en: "slices", pl: "plastry" }, basePrice: 35 }
    ],
    steps: [
      {
        ru: "Карамелизация: тонко нашинкуйте 600г лука. Томите на 40г сливочного масла на слабом огне 30 минут до глубокого янтарного цвета.",
        en: "Caramelization: slice 600g onions thinly. Cook slowly in 40g butter on low heat for 30 minutes until deep golden brown.",
        pl: "Karmelizacja: pokrój 600g cebuli w cienkie piórka. Smaż na 40g masła na małym ogieniu przez 30 minut na złoty kolor."
      },
      {
        ru: "Бульон: влейте 700мл говяжьего бульона, 100мл белого сухого вина, добавьте тимьян и варите 15 минут.",
        en: "Simmering: pour in 700ml beef broth, 100ml dry white wine, add fresh thyme and simmer 15 minutes.",
        pl: "Gotowanie: wlej 700ml wywaru, 100ml białego wina, dodaj tymianek i gotuj 15 minut."
      },
      {
        ru: "Запекание: разлейте суп в порционные горшочки, сверху выложите гренку багета и щедро посыпьте 100г сыра. Запекайте при 220°C ровно 6 минут до пузырящейся корочки.",
        en: "Gratin: ladle soup into ovenproof bowls, top with toasted baguette and 100g cheese. Broil at 220°C for 6 mins until bubbly.",
        pl: "Zapiekanie: rozlej zupę do miseczek, ułóż bagietkę i posyp serem. Zapiekaj w 220°C przez 6 minut."
      }
    ]
  },
  {
    id: "pancakes",
    title: { ru: "Американские панкейки с сиропом", en: "Fluffy American Pancakes", pl: "Puszyste Amerykańskie Pancakes" },
    category: "breakfast",
    prepTime: { ru: "15 мин", en: "15 min", pl: "15 min" },
    calories: 380,
    rating: 4.91,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Пышные мягкие панкейки со сливочным маслом и натуральным кленовым сиропом.",
      en: "Stack of fluffy, tender American pancakes served with butter and maple syrup.",
      pl: "Puszyste amerykańskie pancakes podawane z masłem i syropem klonowym."
    },
    ingredients: [
      { name: { ru: "Мука пшеничная", en: "Wheat flour", pl: "Mąka pszenna" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 40 },
      { name: { ru: "Молоко 3.2%", en: "Milk 3.2%", pl: "Mleko 3.2%" }, qty: 220, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 35 },
      { name: { ru: "Яйцо куриное", en: "Egg", pl: "Jajko" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 15 },
      { name: { ru: "Кленовый сироп", en: "Maple syrup", pl: "Syrop klonowy" }, qty: 50, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 120 }
    ],
    steps: [
      {
        ru: "Тесто: смешайте 200г муки, 1 ч.л. разрыхлителя, 2 ст.л. сахара, 220мл молока, 1 яйцо и 30г растопленного масла до однородности.",
        en: "Batter: whisk 200g flour, 1 tsp baking powder, 2 tbsp sugar, 220ml milk, 1 egg, and 30g melted butter until smooth.",
        pl: "Ciasto: wymieszaj 200g mąki, proszek do pieczenia, cukier, 220ml mleka, 1 jajko i 30g roztopionego masła."
      },
      {
        ru: "Жарка: выливайте по 2 ст.л. теста на сухую антипригарную сковороду. Жарьте 2 минуты до появления пузырьков, переверните и жарьте еще 1 минуту.",
        en: "Cooking: pour 2 tbsp batter onto dry non-stick skillet. Cook 2 mins until bubbles form, flip and cook 1 min more until golden.",
        pl: "Smażenie: nakładaj po 2 łyżki ciasta na suchą patelnię. Smaż 2 minuty do pojawienia się pęcherzyków, przewróć na 1 minutę."
      }
    ]
  }
];

export const SCAN_PRESETS: Record<string, ScanPreset> = {
  borscht: {
    id: "borscht",
    title: { ru: "Борщ домашний со сметаной", en: "Homemade Beef Borscht", pl: "Domowy Barszcz z wołowiną" },
    calories: 380,
    protein: 22,
    fat: 18,
    carbs: 34,
    healthScore: { ru: "95% (Хороший баланс)", en: "95% (Great Balance)", pl: "95% (Świetny bilans)" },
    summary: {
      ru: "Традиционный суп с высокой питательной ценностью.",
      en: "Traditional soup high in nutrients and protein.",
      pl: "Tradycyjna zupa o wysokiej wartości odżywczej."
    },
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"
  },
  tacos: {
    id: "tacos",
    title: { ru: "Мексиканские Тако с говядиной", en: "Mexican Beef Tacos", pl: "Meksykańskie Tacos z wołowiną" },
    calories: 450,
    protein: 28,
    fat: 22,
    carbs: 38,
    healthScore: { ru: "90% (Сбалансированное мексиканское блюдо)", en: "90% (Balanced Mexican Dish)", pl: "90% (Zrównoważone meksykańskie danie)" },
    summary: {
      ru: "Богатый источник белка и полезных жиров авокадо.",
      en: "Rich in protein and healthy avocado fats.",
      pl: "Bogate źródło białka i zdrowych tłuszczów z awokado."
    },
    image: "images/beef_tacos_1786619969488.jpg"
  },
  butter_chicken: {
    id: "butter_chicken",
    title: { ru: "Курица Карри по-индийски", en: "Indian Butter Chicken Curry", pl: "Indyjskie Butter Chicken Curry" },
    calories: 560,
    protein: 36,
    fat: 28,
    carbs: 24,
    healthScore: { ru: "91% (Сочный протеиновый обед)", en: "91% (Rich Protein Lunch)", pl: "91% (Sycący obiad białkowy)" },
    summary: {
      ru: "Пряный куриный карри, богатый нежирным белком и специями.",
      en: "Spiced chicken curry rich in lean protein and antioxidants.",
      pl: "Aromatyczne curry z kurczaka bogate w białko i antyoksydanty."
    },
    image: "images/butter_chicken_1786619986389.jpg"
  },
  ribeye: {
    id: "ribeye",
    title: { ru: "Стейк Рибай Medium Rare", en: "Ribeye Steak Medium Rare", pl: "Stek Ribeye Medium Rare" },
    calories: 640,
    protein: 48,
    fat: 42,
    carbs: 4,
    healthScore: { ru: "92% (Высокобелковый)", en: "92% (High Protein)", pl: "92% (Wysokobiałkowy)" },
    summary: {
      ru: "Богат аминокислотами и железом.",
      en: "Rich in amino acids and iron.",
      pl: "Bogaty w aminokwasy i żelazo."
    },
    image: "images/ribeye_steak_1786617848688.jpg"
  },
  carbonara: {
    id: "carbonara",
    title: { ru: "Спагетти Карбонара", en: "Spaghetti Carbonara", pl: "Spaghetti Carbonara" },
    calories: 520,
    protein: 24,
    fat: 22,
    carbs: 58,
    healthScore: { ru: "85% (Итальянская классика)", en: "85% (Italian Classic)", pl: "85% (Włoski Klasyk)" },
    summary: {
      ru: "Сытная паста с энергией медленных углеводов.",
      en: "Satisfying pasta providing protein and energy.",
      pl: "Sycący makaron zapewniający energię."
    },
    image: "images/pasta_carbonara_1786617618459.jpg"
  }
};

export const SUPERMARKETS: Supermarket[] = [
  {
    id: "s1",
    name: "Biedronka",
    logo: "🐞",
    priceMultiplier: 0.92,
    distanceMeters: 310,
    walkTime: { pl: "4 min pieszo", en: "4 min walk", ru: "4 мин пешком" },
    badge: { pl: "Najniższa cena", en: "Best Price", ru: "Лучшая цена" },
    deliveryAvailable: true,
    deliveryUrl: "https://www.biedronka.pl/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Biedronka",
    lat: 52.2315,
    lng: 21.0105,
    address: { pl: "ul. Marszałkowska 104, Warszawa", en: "104 Marszalkowska St, Warsaw", ru: "ул. Маршаловская 104, Варшава" }
  },
  {
    id: "s2",
    name: "Lidl",
    logo: "🟡",
    priceMultiplier: 0.94,
    distanceMeters: 550,
    walkTime: { pl: "7 min pieszo", en: "7 min walk", ru: "7 мин пешком" },
    badge: { pl: "Gwarancja jakości", en: "Quality Guarantee", ru: "Гарантия качества" },
    deliveryAvailable: true,
    deliveryUrl: "https://www.lidl.pl/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lidl",
    lat: 52.2270,
    lng: 21.0060,
    address: { pl: "Aleje Jerozolimskie 56, Warszawa", en: "56 Jerozolimskie Ave, Warsaw", ru: "Аллеи Иерусалимские 56, Варшава" }
  },
  {
    id: "s3",
    name: "Żabka (Nano / Jush)",
    logo: "🐸",
    priceMultiplier: 1.14,
    distanceMeters: 140,
    walkTime: { pl: "15 min dostawa", en: "15 min delivery", ru: "Доставка 15 мин" },
    badge: { pl: "Dostawa w 15 min", en: "15 min Delivery", ru: "Доставка за 15 мин" },
    deliveryAvailable: true,
    deliveryUrl: "https://www.zabka.pl/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Zabka",
    lat: 52.2305,
    lng: 21.0130,
    address: { pl: "ul. Nowy Świat 22, Warszawa", en: "22 Nowy Swiat St, Warsaw", ru: "ул. Новый Свят 22, Варшава" }
  },
  {
    id: "s4",
    name: "Carrefour Market",
    logo: "🔵",
    priceMultiplier: 1.04,
    distanceMeters: 620,
    walkTime: { pl: "8 min pieszo", en: "8 min walk", ru: "8 мин пешком" },
    badge: { pl: "Duży wybór", en: "Wide Selection", ru: "Широкий выбор" },
    deliveryAvailable: true,
    deliveryUrl: "https://www.carrefour.pl/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Carrefour",
    lat: 52.2240,
    lng: 21.0180,
    address: { pl: "ul. Wołoska 12, Warszawa", en: "12 Woloska St, Warsaw", ru: "ул. Волоская 12, Варшава" }
  },
  {
    id: "s5",
    name: "Auchan Supermarket",
    logo: "🔴",
    priceMultiplier: 0.90,
    distanceMeters: 1100,
    walkTime: { pl: "14 min pieszo", en: "14 min walk", ru: "14 мин пешком" },
    badge: { pl: "Super ceny", en: "Super Prices", ru: "Супер цены" },
    deliveryAvailable: true,
    deliveryUrl: "https://www.auchan.pl/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Auchan",
    lat: 52.2360,
    lng: 21.0020,
    address: { pl: "ul. Modlińska 8, Warszawa", en: "8 Modlinska St, Warsaw", ru: "ул. Модлиньская 8, Варшава" }
  },
  {
    id: "s6",
    name: "Dino",
    logo: "🟢",
    priceMultiplier: 0.95,
    distanceMeters: 780,
    walkTime: { pl: "10 min pieszo", en: "10 min walk", ru: "10 мин пешком" },
    badge: { pl: "Blisko Ciebie", en: "Close to You", ru: "Рядом с вами" },
    deliveryAvailable: true,
    deliveryUrl: "https://marketdino.pl/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Dino",
    lat: 52.2255,
    lng: 21.0150,
    address: { pl: "ul. Grójecka 45, Warszawa", en: "45 Grojecka St, Warsaw", ru: "ул. Груецкая 45, Варшава" }
  },
  {
    id: "s7",
    name: "Kaufland",
    logo: "⚪",
    priceMultiplier: 0.93,
    distanceMeters: 1250,
    walkTime: { pl: "15 min pieszo", en: "15 min walk", ru: "15 мин пешком" },
    badge: { pl: "Hipermarket", en: "Hypermarket", ru: "Гипермаркет" },
    deliveryAvailable: true,
    deliveryUrl: "https://www.kaufland.pl/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kaufland",
    lat: 52.2380,
    lng: 21.0220,
    address: { pl: "ul. Biruty 18, Warszawa", en: "18 Biruty St, Warsaw", ru: "ул. Бируты 18, Варшава" }
  },
  {
    id: "s8",
    name: "Stokrotka",
    logo: "🌼",
    priceMultiplier: 1.06,
    distanceMeters: 420,
    walkTime: { pl: "5 min pieszo", en: "5 min walk", ru: "5 мин пешком" },
    badge: { pl: "Świeże i Eko", en: "Fresh & Eco", ru: "Свежие и Эко" },
    deliveryAvailable: true,
    deliveryUrl: "https://stokrotka.pl/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Stokrotka",
    lat: 52.2320,
    lng: 21.0170,
    address: { pl: "ul. Chmielna 15, Warszawa", en: "15 Chmielna St, Warsaw", ru: "ул. Хмельная 15, Варшава" }
  }
];
