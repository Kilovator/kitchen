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
    image: "images/pasta_carbonara_1786617618459.jpg",
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
    image: "images/ribeye_steak_1786617848688.jpg",
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
    image: "images/beef_tacos_1786619969488.jpg",
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
    image: "images/butter_chicken_1786619986389.jpg",
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
    image: "images/tom_yum_soup_1786617631167.jpg",
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
    image: "images/japanese_ramen_1786617864557.jpg",
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
    image: "images/shakshuka_breakfast_1786617643118.jpg",
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
    image: "images/belgian_waffles_1786617880120.jpg",
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
    id: "syrniki",
    title: { ru: "Нежные сырники с ягодами", en: "Cottage Cheese Pancakes", pl: "Ser Nicze z owocami" },
    category: "breakfast",
    prepTime: { ru: "15 мин", en: "15 min", pl: "15 min" },
    calories: 340,
    rating: 4.9,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Пышные сырники из фермерского творога со свежими ягодами.",
      en: "Fluffy cottage cheese pancakes with fresh raspberries.",
      pl: "Puszyste serniczki z twarogu ze świeżymi malinami."
    },
    ingredients: [
      { name: { ru: "Творог 9%", en: "Cottage cheese 9%", pl: "Twaróg 9%" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 140 }
    ],
    steps: [
      {
        ru: "Жарка: сформируйте 6 шайб толщиной 2 см, обжаривайте на среднем огне по 3.5 минуты с каждой стороны.",
        en: "Frying: shape into 6 discs (2cm thick), fry on medium heat for 3.5 minutes per side.",
        pl: "Smażenie: uformuj 6 krążków o grubości 2 cm, smaż na średnim ogniu po 3.5 minuty z każdej strony."
      }
    ]
  },
  {
    id: "greek_salad",
    title: { ru: "Греческий салат с фетой", en: "Greek Salad with Feta", pl: "Sałatka grecka z fetą" },
    category: "healthy",
    prepTime: { ru: "10 мин", en: "10 min", pl: "10 min" },
    calories: 260,
    rating: 4.85,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Сочные огурцы, томаты, оливки Каламата и кубики сыра фета с орегано.",
      en: "Crisp cucumbers, tomatoes, Kalamata olives, and feta cheese cubes.",
      pl: "Świeże ogórki, pomidory, oliwki Kalamata i ser feta z oregano."
    },
    ingredients: [
      { name: { ru: "Огурцы и томаты", en: "Cucumbers & tomatoes", pl: "Ogórki i pomidory" }, qty: 300, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 90 },
      { name: { ru: "Сыр Фета", en: "Feta cheese", pl: "Ser Feta" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 110 }
    ],
    steps: [
      {
        ru: "Нарезка: нарежьте томаты и огурцы крупными кубиками 2×2 см, фету кубиками 1.5×1.5 см.",
        en: "Chopping: cut tomatoes and cucumbers into 2x2 cm chunks, feta into 1.5x1.5 cm cubes.",
        pl: "Krojenie: pokrój pomidory i ogórki w dużą kostkę 2x2 cm, fetę w kostkę 1.5x1.5 cm."
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
      ru: "Кремовая овсяная каша на миндальном молоке с бананом и орехами пекан.",
      en: "Creamy almond milk oatmeal topped with caramelized banana and pecans.",
      pl: "Kremowa owsianka na mleku migdałowym z bananem i orzechami."
    },
    ingredients: [
      { name: { ru: "Овсяные хлопья", en: "Oat flakes", pl: "Płatki owsiane" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 35 },
      { name: { ru: "Банан", en: "Banana", pl: "Banan" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 25 }
    ],
    steps: [
      {
        ru: "Варите 80г хлопьев в 200мл миндального молока ровно 5 минут на слабом огне.",
        en: "Simmer 80g oat flakes in 200ml almond milk for exactly 5 minutes on low heat.",
        pl: "Gotuj 80g płatków owsianych w 200ml mleka migdałowego dokładnie 5 minut."
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
    name: { ru: "Пятёрочка", en: "FreshMart", pl: "Biedronka" },
    logo: "🔴",
    priceMultiplier: 0.95,
    distanceMeters: 320,
    walkTime: { ru: "4 мин пешком", en: "4 min walk", pl: "4 min pieszo" },
    badge: { ru: "Минимальный чек", en: "Lowest Total", pl: "Najtaniej" },
    deliveryAvailable: true
  },
  {
    id: "s2",
    name: { ru: "Перекрёсток", en: "SuperMarket", pl: "Lidl" },
    logo: "🟢",
    priceMultiplier: 1.08,
    distanceMeters: 650,
    walkTime: { ru: "8 мин пешком", en: "8 min walk", pl: "8 min pieszo" },
    badge: { ru: "Широкий выбор", en: "Wide Selection", pl: "Duży выбор" },
    deliveryAvailable: true
  },
  {
    id: "s3",
    name: { ru: "ВкусВилл", en: "BioMarket", pl: "Carrefour" },
    logo: "🌿",
    priceMultiplier: 1.25,
    distanceMeters: 450,
    walkTime: { ru: "5 мин пешком", en: "5 min walk", pl: "5 min pieszo" },
    badge: { ru: "Эко-продукты", en: "Organic", pl: "Produkty Eko" },
    deliveryAvailable: true
  },
  {
    id: "s4",
    name: { ru: "Лента", en: "HyperMarket", pl: "Auchan" },
    logo: "🟡",
    priceMultiplier: 0.90,
    distanceMeters: 1200,
    walkTime: { ru: "15 мин на авто", en: "15 min drive", pl: "15 min autem" },
    badge: { ru: "Выгодная упаковка", en: "Bulk Savings", pl: "Znakomita cena" },
    deliveryAvailable: true
  }
];
