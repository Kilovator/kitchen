import { Recipe } from '../../types';

export const FAST_RECIPES: Recipe[] = [
  {
    id: "teriyaki-chicken-noodles",
    title: { ru: "Wok-лапша удон с курицей и овощами", en: "15-Minute Chicken Teriyaki Udon Wok", pl: "Makaron Udon z kurczakiem i warzywami z Woka" },
    category: "fast",
    prepTime: { ru: "15 мин", en: "15 min", pl: "15 min" },
    calories: 430,
    rating: 4.96,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Молниеносный сытный ужин: пшеничная лапша удон, обжаренная в раскаленном воке с кусочками курицы, хрустящим перцем и соусом терияки.",
      en: "Flash-fried thick udon noodles tossed in screaming-hot wok with chicken strips, crisp peppers, and sweet teriyaki glaze.",
      pl: "Błyskawiczny obiad w 15 minut: makaron udon smażony w woku z kurczakiem, chrupiącymi warzywami i sosem teriyaki."
    },
    ingredients: [
      { name: { ru: "Лапша удон", en: "Fresh udon noodles", pl: "Makaron udon świeży" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Куриное филе", en: "Chicken breast strips", pl: "Pierś z kurczaka w paskach" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 6.90 },
      { name: { ru: "Сладкий перец и морковь", en: "Bell pepper and carrot", pl: "Papryka i marchewka" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 },
      { name: { ru: "Соус терияки и соевый соус", en: "Teriyaki and soy sauce", pl: "Sos teriyaki i sojowy" }, qty: 40, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.80 }
    ],
    steps: [
      {
        ru: "Раскалите вок с ложкой кунжутного масла, обжарьте кусочки курицы на максимальном огне 4 минуты.",
        en: "Heat wok until smoking hot with sesame oil, stir-fry chicken strips on high heat for 4 minutes.",
        pl: "Rozgrzej mocno wok z olejem, smaż kurczaka na dużym ogniu przez 4 minuty."
      },
      {
        ru: "Добавьте тонко нашинкованные овощи, обжаривайте еще 2 минуты, сохраняя их хрусткость.",
        en: "Toss in julienned vegetables, stir-fry vigorously for 2 minutes to keep them crisp.",
        pl: "Dodaj warzywa pokrojone w słupki, smaż intensywnie przez 2 minuty."
      },
      {
        ru: "Всыпьте отваренную лапшу удон, залейте соусом терияки, перемешайте 60 секунд и снимите с огня. Посыпьте кунжутом.",
        en: "Add cooked udon noodles and sauce, toss for 60 seconds until glossy, and sprinkle with sesame.",
        pl: "Wrzuć makaron udon, wlej sos teriyaki, wymieszaj przez minutę i posyp sezamem."
      }
    ]
  },
  {
    id: "pasta-aglio-olio",
    title: { ru: "Паста Аглио э Олио с чесноком и чили", en: "Spaghetti Aglio e Olio with Chili", pl: "Spaghetti Aglio e Olio z czosnkiem i chili" },
    category: "fast",
    prepTime: { ru: "12 мин", en: "12 min", pl: "12 min" },
    calories: 390,
    rating: 4.95,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Итальянская классика всего из 4 ингредиентов: спагетти аль денте в ароматном масле первого отжима с золотистым чесноком, хлопьями чили и петрушкой.",
      en: "Iconic Neapolitan pasta ready in 12 mins: spaghetti tossed with golden garlic-infused olive oil, chili pepper, and flat parsley.",
      pl: "Kultowy włoski klasyk gotowy w 12 minut: spaghetti w oliwie czosnkowej z płatkami chili i natką pietruszki."
    },
    ingredients: [
      { name: { ru: "Спагетти", en: "Spaghetti", pl: "Makaron Spaghetti" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Оливковое масло Extra Virgin", en: "Extra virgin olive oil", pl: "Oliwa z oliwek Extra Virgin" }, qty: 60, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 3.50 },
      { name: { ru: "Чеснок свежий", en: "Fresh garlic cloves", pl: "Czosnek świeży" }, qty: 4, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.50 },
      { name: { ru: "Хлопья острого чили и петрушка", en: "Chili flakes & parsley", pl: "Płatki chili i natka pietruszki" }, qty: 15, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 }
    ],
    steps: [
      {
        ru: "Поставьте вариться спагетти в кипящей подсоленной воде на 8 минут.",
        en: "Boil spaghetti in salted water for 8 minutes until al dente.",
        pl: "Gotuj spaghetti w osolonej wodzie przez 8 minut al dente."
      },
      {
        ru: "Тонко нарезанный чеснок обжаривайте в оливковом масле на слабом огне 3 минуты до легкого золотистого оттенка (не сжечь!). Добавьте чили.",
        en: "Gently infuse olive oil with sliced garlic on low heat until pale golden; add chili flakes.",
        pl: "Podsmażaj czosnek w plasterkach na oliwie na małym ogniu do lekkiego zezłocenia, dodaj chili."
      },
      {
        ru: "Переложите спагетти в сковороду с чесночным маслом, влейте половник воды от пасты, энергично перемешайте для создания эмульсии и добавьте петрушку.",
        en: "Toss pasta directly into oil with half ladle of starchy pasta water to emulsify. Fold in fresh parsley.",
        pl: "Przełóż makaron na patelnię z oliwą, dolej chochelkę wody z makaronu, wymieszaj energicznie i posyp pietruszką."
      }
    ]
  },
  {
    id: "croque-monsieur",
    title: { ru: "Французский сэндвич Крок-Месье", en: "Parisian Croque Monsieur Sandwich", pl: "Paryski Tost Croque Monsieur z beszamelem" },
    category: "fast",
    prepTime: { ru: "15 мин", en: "15 min", pl: "15 min" },
    calories: 460,
    rating: 4.93,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Легендарный горячий сэндвич из подрумяненного хлеба, ветчины, дижонской горчицы и запеченного под грилем сырного соуса бешамель.",
      en: "Crispy grilled French ham and cheese sandwich topped with velvety béchamel and bubbling broiled Gruyère crust.",
      pl: "Wykwintny francuski tost zapiekany z szynką, serem gruyere, musztardą dijon i kremowym beszamelem."
    },
    ingredients: [
      { name: { ru: "Тостовый хлеб бриошь", en: "Thick toast bread", pl: "Chleb tostowy maślany" }, qty: 4, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.00 },
      { name: { ru: "Ветчина качественная", en: "French ham", pl: "Szynka gotowana" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Сыр Грюйер или Эмменталь", en: "Gruyere cheese", pl: "Ser Gruyere lub ementaler" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 6.90 },
      { name: { ru: "Соус бешамель", en: "Quick bechamel sauce", pl: "Sos beszamelowy" }, qty: 80, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.20 },
      { name: { ru: "Дижонская горчица", en: "Dijon mustard", pl: "Musztarda dijon" }, qty: 15, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.00 }
    ],
    steps: [
      {
        ru: "Смажьте ломтики хлеба тонким слоем дижонской горчицы, положите ветчину и тертый сыр, накройте вторым ломтиком.",
        en: "Spread bread with Dijon mustard, layer tender ham and grated Gruyère, close sandwiches.",
        pl: "Posmaruj chleb musztardą dijon, ułóż szynkę i starty ser, przykryj drugą kromką."
      },
      {
        ru: "Сверху щедро покройте сэндвич соусом бешамель и посыпьте еще сыром.",
        en: "Spread thick layer of béchamel sauce across the top bread and shower with more grated cheese.",
        pl: "Posmaruj wierzch tostów beszamelem i posyp dodatkową porcją sera."
      },
      {
        ru: "Запекайте в духовке при 210°C 8-10 минут до золотистых аппетитных пузырей.",
        en: "Bake under hot broiler at 210°C for 8-10 minutes until deeply golden and bubbly.",
        pl: "Zapiekaj pod grillem w 210°C przez 8-10 minut do uzyskania złocistej zapieczonej skorupki."
      }
    ]
  },
  {
    id: "creamy-tuna-pasta",
    title: { ru: "Быстрая сливочная паста с тунцом за 15 минут", en: "15-Minute Creamy Tuna & Lemon Pasta", pl: "Szybki Makaron z tuńczykiem w sosie śmietankowym" },
    category: "fast",
    prepTime: { ru: "15 мин", en: "15 min", pl: "15 min" },
    calories: 450,
    rating: 4.94,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Ультрабыстрое сытное блюдо: паста пенне в нежном сливочно-чесночном соусе с кусочками тунца, каперсами, цедрой лимона и пармезаном.",
      en: "Speedy weeknight dinner of penne pasta tossed with flaked canned tuna, rich cream, lemon zest, and capers.",
      pl: "Ekspresowy pyszny makaron penne z kawałkami tuńczyka, kremową śmietanką, kaparami i skórką z cytryny."
    },
    ingredients: [
      { name: { ru: "Паста Пенне", en: "Penne pasta", pl: "Makaron Penne" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.00 },
      { name: { ru: "Тунец в собственном соку", en: "Canned tuna in water", pl: "Tuńczyk w sosie własnym" }, qty: 160, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.50 },
      { name: { ru: "Сливки 20%", en: "Cooking cream", pl: "Śmietanka 18-20%" }, qty: 150, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 3.20 },
      { name: { ru: "Каперсы и лимон", en: "Capers & fresh lemon", pl: "Kapary i cytryna" }, qty: 25, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 }
    ],
    steps: [
      {
        ru: "Отварите пасту пенне в подсоленной воде 9 минут аль денте.",
        en: "Cook penne in boiling salted water for 9 mins until al dente.",
        pl: "Ugotuj penne al dente w osolonej wodzie przez 9 minut."
      },
      {
        ru: "На сковороде подогрейте сливки с чесноком, добавьте тунец и каперсы, прогрейте 2 минуты.",
        en: "Simmer cooking cream with minced garlic, fold in drained tuna chunks and capers for 2 mins.",
        pl: "Podgrzej śmietankę z czosnkiem na patelni, dodaj tuńczyka i kapary, gotuj 2 minuty."
      },
      {
        ru: "Смешайте пасту с соусом, добавьте тертую цедру лимона и посыпьте свежемолотым перцем.",
        en: "Toss pasta with the creamy sauce, grate fresh lemon zest over top, and season with black pepper.",
        pl: "Wymieszaj makaron z sosem, zetrzyj skórkę z cytryny i dopraw świeżym pieprzem."
      }
    ]
  },
  {
    id: "asian-egg-fried-rice",
    title: { ru: "Жареный рис по-азиатски с яйцом и овощами", en: "Classic Chinese Egg Fried Rice", pl: "Smażony Ryż po azjatycku z jajkiem i warzywami" },
    category: "fast",
    prepTime: { ru: "12 мин", en: "12 min", pl: "12 min" },
    calories: 360,
    rating: 4.93,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Ароматный рассыпчатый рис, быстро обжаренный в воке со взбитыми яйцами, зеленым горошком, зеленым луком и соевым соусом.",
      en: "Fast and flavorful wok-charred rice tossed with scrambled egg ribbons, scallions, sweet peas, and soy sauce.",
      pl: "Szybki aromatyczny ryż smażony na dużym ogniu z jajkiem, zielonym groszkiem, szczypiorkiem i sosem sojowym."
    },
    ingredients: [
      { name: { ru: "Отварной рис (вчерашний)", en: "Day-old cold cooked rice", pl: "Ugotowany zimny ryż" }, qty: 300, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 },
      { name: { ru: "Яйца куриные", en: "Eggs", pl: "Jajka" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.00 },
      { name: { ru: "Зеленый горошек замороженный", en: "Green peas", pl: "Groszek zielony" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 },
      { name: { ru: "Соевый соус и зеленый лук", en: "Soy sauce & scallions", pl: "Sos sojowy i szczypiorek" }, qty: 30, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 1.80 }
    ],
    steps: [
      {
        ru: "Раскалите сковороду с маслом, вылейте взбитые яйца и быстро перемешайте лопаткой 30 секунд (скрембл).",
        en: "Scramble beaten eggs in screaming hot wok with vegetable oil for 30 seconds, push to side.",
        pl: "Wbij roztrzepane jajka na rozgrzany olej i energicznie mieszaj przez 30 sekund."
      },
      {
        ru: "Добавьте холодный рис и горошек, жарьте на сильном огне 3-4 минуты, разбивая комочки.",
        en: "Dump in cold rice and peas, fry on maximum heat for 3-4 minutes tossing constantly.",
        pl: "Wsyp zimny ryż i groszek, smaż na dużym ogniu przez 3-4 minuty rozbijając grudki."
      },
      {
        ru: "Влейте соевый соус по краю вока для карамелизации, всыпьте зеленый лук и перемешайте.",
        en: "Drizzle soy sauce around rim of wok to caramelize, fold in sliced green onions and serve.",
        pl: "Polej sosem sojowym po brzegach woka, dodaj szczypiorek i wymieszaj."
      }
    ]
  },
  {
    id: "garlic-butter-shrimp",
    title: { ru: "Креветки в чесночном масле за 10 минут", en: "10-Minute Garlic Butter Shrimp", pl: "Krewetki na maśle czosnkowym w 10 minut" },
    category: "fast",
    prepTime: { ru: "10 мин", en: "10 min", pl: "10 min" },
    calories: 290,
    rating: 4.97,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Сочные королевские креветки, обжаренные в шипящем сливочном масле с чесноком, белым вином и петрушкой. Подаются с хрустящим багетом.",
      en: "Plump jumbo shrimp sautéed in sizzling garlic butter with a splash of white wine, lemon, and fresh parsley.",
      pl: "Soczyste krewetki smażone na skwierczącym maśle czosnkowym z białym winem, cytryną i chrupiącą bagietką."
    },
    ingredients: [
      { name: { ru: "Креветки очищенные", en: "Peeled raw prawns", pl: "Oczyszczone krewetki" }, qty: 300, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 18.90 },
      { name: { ru: "Сливочное масло 82%", en: "Butter", pl: "Masło 82%" }, qty: 50, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.80 },
      { name: { ru: "Чеснок свежий", en: "Fresh garlic", pl: "Czosnek" }, qty: 4, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.50 },
      { name: { ru: "Французский багет", en: "Crusty baguette", pl: "Bagietka chrupiąca" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.20 }
    ],
    steps: [
      {
        ru: "Растопите сливочное масло на среднем огне, добавьте тонко нарезанный чеснок и обжаривайте 60 секунд до аромата.",
        en: "Melt butter in skillet, sizzle thinly sliced garlic for 60 seconds until fragrant without burning.",
        pl: "Rozpuść masło na patelni, podsmaż plasterki czosnku przez 60 sekund do uwolnienia aromatu."
      },
      {
        ru: "Выложите креветки в один слой и обжаривайте ровно по 1.5 минуты с каждой стороны до розового цвета.",
        en: "Add prawns in single layer, sear for 90 seconds per side until pink and curled.",
        pl: "Ułóż krewetki jedną warstwą i smaż po 1.5 minuty z każdej strony na różowy kolor."
      },
      {
        ru: "Сбрызните соком лимона, посыпьте петрушкой и сразу макайте теплый багет в чесночное масло.",
        en: "Squeeze fresh lemon, toss with parsley, and serve immediately with warm crusty bread for dipping.",
        pl: "Skrop sokiem z cytryny, posyp pietruszką i podawaj z ciepłą bagietką do maczania w maśle."
      }
    ]
  },
  {
    id: "sulguni-lavash-roll",
    title: { ru: "Лаваш с сыром сулугуни и зеленью на гриле", en: "Grilled Lavash with Melted Sulguni Cheese", pl: "Grillowany Lawasz z serem sulguni i ziołami" },
    category: "fast",
    prepTime: { ru: "8 мин", en: "8 min", pl: "8 min" },
    calories: 310,
    rating: 4.95,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Тонкий армянский лаваш, начиненный тягучим сыром сулугуни, кинзой, укропом и чесноком, обжаренный до хруста за считанные минуты.",
      en: "Crisp griddled flatbread stuffed with molten Georgian Sulguni cheese, cilantro, dill, and a kiss of garlic.",
      pl: "Chrupiący grillowany lawasz z dużą ilością ciągnącego się sera, świeżą kolendrą i czosnkiem."
    },
    ingredients: [
      { name: { ru: "Тонкий лаваш", en: "Lavash flatbread", pl: "Lawasz ormiański cienki" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.50 },
      { name: { ru: "Сыр Сулугуни или Моцарелла", en: "Sulguni cheese", pl: "Ser Sulguni lub mozzarella" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 6.90 },
      { name: { ru: "Свежая кинза и укроп", en: "Fresh herbs bundle", pl: "Kolendra i koperek" }, qty: 30, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.00 },
      { name: { ru: "Сливочное масло", en: "Butter for brushing", pl: "Masło" }, qty: 20, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.20 }
    ],
    steps: [
      {
        ru: "Натрите сулугуни на терке, смешайте с мелко нарубленной зеленью и раздавленным зубчиком чеснока.",
        en: "Grate cheese, toss with finely chopped herbs, cracked pepper, and minced garlic.",
        pl: "Zetrzyj ser, wymieszaj z posiekanymi ziołami i przeciśniętym czosnkiem."
      },
      {
        ru: "Заверните сыр в лаваш плотным конвертом.",
        en: "Fold cheese mixture securely into flatbread like a neat flat envelope.",
        pl: "Zawiń farsz w lawasz w kształt prostokątnej koperty."
      },
      {
        ru: "Обжарьте на сухой сковороде-гриль по 2-3 минуты с каждой стороны, смажьте горячий лаваш сливочным маслом.",
        en: "Toast in dry grill pan for 2-3 minutes per side until charred and molten, brush with melted butter.",
        pl: "Grilluj na suchej patelni po 2-3 minuty z każdej strony, a po zdjęciu posmaruj masłem."
      }
    ]
  },
  {
    id: "caprese-quick-salad",
    title: { ru: "Классический салат Капрезе за 5 минут", en: "5-Minute Classic Caprese Salad", pl: "Sałatka Caprese w 5 minut" },
    category: "fast",
    prepTime: { ru: "5 мин", en: "5 min", pl: "5 min" },
    calories: 240,
    rating: 4.96,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Самый быстрый средиземноморский салат: сочные спелые томаты, нежная моцарелла ди будфало, свежий базилик и оливковое масло.",
      en: "The quickest Italian salad: thick slices of ripe beefsteak tomatoes, creamy buffalo mozzarella, fragrant basil, and balsamic.",
      pl: "Błyskawiczna sałatka: plastry dojrzałych pomidorów malinowych, kremowa mozzarella di bufala, świeża bazylia i oliwa."
    },
    ingredients: [
      { name: { ru: "Томаты спелые крупные", en: "Ripe heirloom tomatoes", pl: "Pomidory malinowe dojrzałe" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.50 },
      { name: { ru: "Моцарелла свежая в рассоле", en: "Fresh mozzarella ball", pl: "Kula świeżej mozzarelli" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.20 },
      { name: { ru: "Листья свежего базилика", en: "Fresh basil leaves", pl: "Świeże liście bazylii" }, qty: 20, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.00 },
      { name: { ru: "Оливковое масло и крем-бальзамик", en: "Extra virgin olive oil & balsamic", pl: "Oliwa i krem balsamiczny" }, qty: 25, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.50 }
    ],
    steps: [
      {
        ru: "Нарежьте томаты и моцареллу ровными кружочками толщиной 7-8 мм.",
        en: "Slice ripe tomatoes and fresh mozzarella into uniform rounds.",
        pl: "Pokrój pomidory i mozzarellę w równe plastry o grubości ok. 8 mm."
      },
      {
        ru: "Выложите на блюдо веером, чередуя ломтик томата, моцареллы и листик свежего базилика.",
        en: "Alternate slices of tomato, mozzarella, and whole basil leaves across a serving plate.",
        pl: "Ułóż na talerzu na przemian plaster pomidora, mozzarelli i listek bazylii."
      },
      {
        ru: "Посолите хлопьями морской соли, поперчите, щедро полейте оливковым маслом и бальзамиком.",
        en: "Season with flaky sea salt, black pepper, and drizzle generously with extra virgin olive oil and balsamic glaze.",
        pl: "Posyp solą morską, pieprzem, polej oliwą extra virgin i kremem balsamicznym."
      }
    ]
  },
  {
    id: "couscous-sundried-tomatoes",
    title: { ru: "Быстрый кускус с вялеными томатами за 10 минут", en: "10-Minute Mediterranean Couscous", pl: "Ekspresowy Kuskus z suszonymi pomidorami i ciecierzycą" },
    category: "fast",
    prepTime: { ru: "10 мин", en: "10 min", pl: "10 min" },
    calories: 280,
    rating: 4.91,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Моментальный гарнир или самостоятельное блюдо: запаренный в кипятке кускус с вялеными томатами, нутом, петрушкой и соком лимона.",
      en: "Fastest side or lunch: instant steamed couscous fluffed with sun-dried tomatoes, chickpeas, parsley, and lemon.",
      pl: "Błyskawiczny obiad w 10 minut: kuskus zaparzany wrzątkiem z suszonymi pomidorami, ciecierzycą i cytryną."
    },
    ingredients: [
      { name: { ru: "Крупа кускус", en: "Couscous grain", pl: "Kasza kuskus" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 },
      { name: { ru: "Томаты вяленые в масле", en: "Sun-dried tomatoes in oil", pl: "Suszone pomidory w oliwie" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Нут консервированный", en: "Canned chickpeas", pl: "Ciecierzyca z puszki" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 },
      { name: { ru: "Свежая петрушка и лимон", en: "Parsley and lemon", pl: "Natka pietruszki i cytryna" }, qty: 20, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.80 }
    ],
    steps: [
      {
        ru: "Засыпьте кускус в миску, добавьте щепотку соли, ложку масла от вяленых томатов, залейте кипятком 1:1 и накройте тарелкой на 5 минут.",
        en: "Place couscous in bowl, add salt, spoonful of tomato oil, pour equal volume of boiling water, and cover for 5 mins.",
        pl: "Wsyp kuskus do miski, posól, dodaj łyżkę oliwy z pomidorów, zalej wrzątkiem 1:1 i przykryj na 5 minut."
      },
      {
        ru: "Взбейте запаренный кускус вилкой, чтобы он стал рассыпчатым.",
        en: "Fluff steaming couscous grains gently with a fork until light and separate.",
        pl: "Rozpulchnij zaparzony kuskus widelcem."
      },
      {
        ru: "Добавьте нарезанные вяленые томаты, нут, рубленую петрушку и сок лимона. Перемешайте.",
        en: "Fold in chopped sun-dried tomatoes, drained chickpeas, chopped parsley, and lemon juice. Serve warm or cold.",
        pl: "Dodaj posiekane suszone pomidory, ciecierzycę, pietruszkę i sok z cytryny. Wymieszaj."
      }
    ]
  },
  {
    id: "quesadilla-cheese-chili",
    title: { ru: "Быстрая сырная кесадилья за 7 минут", en: "7-Minute Cheesy Corn Quesadilla", pl: "Błyskawiczna Quesadilla z serem i kukurydzą w 7 minut" },
    category: "fast",
    prepTime: { ru: "7 мин", en: "7 min", pl: "7 min" },
    calories: 360,
    rating: 4.94,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Хрустящая пшеничная тортилья с тянущейся смесью чеддера и моцареллы, сладкой кукурузой и каплей соуса сальса.",
      en: "Crispy pan-toasted tortilla bursting with melted gooey cheddar, sweet corn kernels, and tangy salsa.",
      pl: "Chrupiąca tortilla z ciągnącym się serem cheddar i mozzarellą, słodką kukurydzą i sosem salsa."
    },
    ingredients: [
      { name: { ru: "Тортильи пшеничные", en: "Wheat flour tortillas", pl: "Tortille pszenne" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 3.50 },
      { name: { ru: "Сыр Чеддер и Моцарелла", en: "Cheddar and Mozzarella", pl: "Ser Cheddar i Mozzarella" }, qty: 120, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.80 },
      { name: { ru: "Кукуруза консервированная", en: "Sweet corn", pl: "Kukurydza konserwowa" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 },
      { name: { ru: "Соус Сальса", en: "Salsa dip sauce", pl: "Sos salsa" }, qty: 40, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.80 }
    ],
    steps: [
      {
        ru: "На одну половину тортильи насыпьте щедрый слой сыра, ложку кукурузы и сальсы, сложите пополам.",
        en: "Scatter half of tortilla with generous grated cheeses, sweet corn, spoonful of salsa, fold in half.",
        pl: "Na połówce tortilli ułóż tarty ser, kukurydzę i sos, złóż na pół."
      },
      {
        ru: "Обжаривайте на сухой горячей сковороде по 2–3 минуты с каждой стороны до золотистой хрустящей корочки и расплавления сыра.",
        en: "Toast on hot dry skillet for 2-3 minutes per side until crisp and blistered outside, gooey inside.",
        pl: "Smaż na suchej patelni po 2–3 minuty z każdej strony na chrupiąco."
      },
      {
        ru: "Нарежьте треугольниками и подавайте горячей.",
        en: "Slice into crispy triangles and enjoy immediately.",
        pl: "Pokrój na trójkąty i podawaj na gorąco."
      }
    ]
  },
  {
    id: "bruschetta-prosciutto-mozzarella",
    title: { ru: "Брускетта с прошутто и моцареллой за 5 минут", en: "5-Minute Prosciutto & Mozzarella Bruschetta", pl: "Bruschetta z prosciutto i mozzarellą w 5 minut" },
    category: "fast",
    prepTime: { ru: "5 мин", en: "5 min", pl: "5 min" },
    calories: 270,
    rating: 4.96,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Подсушенная хрустящая чиабатта с чесночным маслом, сочными томатами, сливочной моцареллой и тончайшими слайсами прошутто.",
      en: "Crunchy toasted ciabatta rubbed with garlic, topped with ripe tomatoes, creamy mozzarella, and savoury prosciutto crudo.",
      pl: "Chrupiąca ciabatta z czosnkiem, pomidorkami, kremową mozzarellą i plastrami szynki dojrzewającej."
    },
    ingredients: [
      { name: { ru: "Чиабатта свежая", en: "Fresh ciabatta bread", pl: "Świeża ciabatta" }, qty: 2, unit: { ru: "ломт", en: "slices", pl: "kromki" }, basePrice: 2.00 },
      { name: { ru: "Ветчина прошутто крудо", en: "Prosciutto crudo", pl: "Szynka parmeńska / prosciutto" }, qty: 50, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.90 },
      { name: { ru: "Моцарелла мини", en: "Baby mozzarella", pl: "Mozzarella mini kulki" }, qty: 70, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Томаты черри и базилик", en: "Cherry tomatoes and basil", pl: "Pomidorki koktajlowe i bazylia" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.20 }
    ],
    steps: [
      {
        ru: "Подрумяньте ломтики чиабатты в тостере или на сухой сковороде 2 минуты, натрите зубчиком чеснока.",
        en: "Toast ciabatta slices until deeply golden, rub lightly with halved garlic clove.",
        pl: "Opiecz kromki ciabatty w tosterze lub na patelni, natrzyj czosnkiem."
      },
      {
        ru: "Выложите половинки черри, порванную моцареллу и воздушные волны прошутто.",
        en: "Arrange halved cherry tomatoes, torn mozzarella chunks, and folded ribbons of prosciutto.",
        pl: "Ułóż połówki pomidorków, kawałki mozzarelli i szynkę prosciutto."
      },
      {
        ru: "Сбрызните оливковым маслом, украсьте листиками базилика и подавайте.",
        en: "Drizzle with extra virgin olive oil, top with fresh basil, and serve crisp.",
        pl: "Skrop oliwą, udekoruj bazylią i podawaj."
      }
    ]
  }
];

