import { Recipe } from '../../types';

export const HEALTHY_RECIPES: Recipe[] = [
  {
    id: "tuna-poke-quinoa",
    title: { ru: "Поке-боул с диким тунцом и киноа", en: "Ahi Tuna & Tri-Color Quinoa Poke Bowl", pl: "Poke Bowl z dzikim tuńczykiem i komosą ryżową" },
    category: "healthy",
    prepTime: { ru: "15 мин", en: "15 min", pl: "15 min" },
    calories: 380,
    rating: 4.97,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Свежий тунец ахи в кунжутно-соевом соусе на подушке из отварного киноа со спелым авокадо, бобами эдамаме и водорослями чука.",
      en: "Hawaiian poke bowl featuring raw sushi-grade yellowfin tuna, fluffy tri-color quinoa, avocado, edamame, and wakame seaweed.",
      pl: "Hawajska miska poke z surowym tuńczykiem, komosą ryżową, awokado, edamame i wodorostami wakame."
    },
    ingredients: [
      { name: { ru: "Филе тунца (sashimi)", en: "Yellowfin tuna fillet", pl: "Filet z tuńczyka świeży" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 19.90 },
      { name: { ru: "Киноа отварное", en: "Cooked quinoa", pl: "Gotowana komosa ryżowa" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Бобы эдамаме", en: "Edamame beans", pl: "Fasolka edamame" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Авокадо", en: "Avocado", pl: "Awokado" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 4.50 },
      { name: { ru: "Соус понзу и кунжут", en: "Ponzu & sesame", pl: "Sos ponzu i sezam" }, qty: 25, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.20 }
    ],
    steps: [
      {
        ru: "Нарежьте тунец кубиками 1.5 см, замаринуйте в соусе понзу с каплей кунжутного масла на 5 минут.",
        en: "Dice tuna into cubes; toss gently in citrusy ponzu sauce and toasted sesame oil for 5 minutes.",
        pl: "Pokrój tuńczyka w kostkę, zamarynuj w sosie ponzu i oleju sezamowym na 5 minut."
      },
      {
        ru: "Выложите теплое киноа на дно боула, сверху секторами разложите тунец, бобы эдамаме, слайсы авокадо и чуку.",
        en: "Arrange warm cooked quinoa in bowl base, artfully arrange marinated tuna, steamed edamame, and sliced avocado.",
        pl: "Ułóż komosę ryżową w misce, dodaj zamarynowanego tuńczyka, edamame i plastry awokado."
      },
      {
        ru: "Посыпьте поджаренными семенами кунжута и микрозеленью перед подачей.",
        en: "Garnish with toasted white and black sesame seeds, microgreens, and sliced radishes.",
        pl: "Posyp prażonym sezamem i mikroliśćmi."
      }
    ]
  },
  {
    id: "sous-vide-turkey-broccoli",
    title: { ru: "Филе индейки су-вид со спаржей и брокколи", en: "Sous-Vide Turkey Breast with Steamed Greens", pl: "Pierś z Indyka Sous-Vide ze szparagami i brokułami" },
    category: "healthy",
    prepTime: { ru: "25 мин", en: "25 min", pl: "25 min" },
    calories: 290,
    rating: 4.95,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Максимально сочное диетическое филе индейки, приготовленное методом су-вид с травами, на гарнир — спаржа и брокколи аль денте.",
      en: "Incredibly succulent lean turkey breast cooked tender at precision temperature, served with bright steamed green vegetables.",
      pl: "Niezwykle soczysta dietetyczna pierś z indyka sous-vide serwowana ze szparagami i brokułami na parze."
    },
    ingredients: [
      { name: { ru: "Филе грудки индейки", en: "Turkey breast fillet", pl: "Pierś z indyka" }, qty: 350, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 12.50 },
      { name: { ru: "Брокколи свежая", en: "Fresh broccoli florets", pl: "Różyczki brokuła" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.00 },
      { name: { ru: "Спаржа зеленая", en: "Green asparagus", pl: "Szparagi zielone" }, qty: 120, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 6.50 },
      { name: { ru: "Оливковое масло и лимон", en: "Extra virgin olive oil & lemon", pl: "Oliwa z oliwek i cytryna" }, qty: 20, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 1.80 }
    ],
    steps: [
      {
        ru: "Завакуумируйте филе индейки с веточкой тимьяна и зубчиком чеснока, готовьте в су-виде при 63°C 60 минут (или томите на пару).",
        en: "Vacuum seal seasoned turkey breast with fresh thyme sprig, cook sous-vide at 63°C for 60 mins until tender.",
        pl: "Zapakuj próżniowo indyka z tymiankiem i gotuj w kąpieli sous-vide w 63°C przez 60 minut (lub ugotuj na parze)."
      },
      {
        ru: "Приготовьте брокколи и спаржу на пару ровно 4 минуты, чтобы они сохранили яркий цвет и пользу.",
        en: "Steam broccoli florets and asparagus spears for precisely 4 minutes until vibrant green and crisp-tender.",
        pl: "Ugotuj brokuły i szparagi na parze dokładnie przez 4 minuty, aby zachowały chrupkość i kolor."
      },
      {
        ru: "Нарежьте сочное филе ломтиками, выложите на овощи и сбрызните лимонным соком с оливковым маслом.",
        en: "Carve rested turkey breast into thick medallions, plate alongside steamed greens, finish with lemon olive oil.",
        pl: "Pokrój indyka w plastry, ułóż na warzywach i skrop sokiem z cytryny z oliwą."
      }
    ]
  },
  {
    id: "salmon-edamame-bowl",
    title: { ru: "Фитнес-боул с лососем, авокадо и эдамаме", en: "Clean Fitness Salmon & Edamame Bowl", pl: "Fitness Bowl z łososiem, awokado i edamame" },
    category: "healthy",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 410,
    rating: 4.96,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Сбалансированное фитнес-блюдо: запеченное филе лосося с бурым рисом, свежим огурцом, бобами эдамаме и семенами льна.",
      en: "Macro-balanced nutrient bowl loaded with oven-roasted salmon, whole brown rice, cucumber ribbons, and edamame.",
      pl: "Zbilansowana miska fit: pieczony łosoś z brązowym ryżem, świeżym ogórkiem, edamame i siemieniem lnianym."
    },
    ingredients: [
      { name: { ru: "Лосось свежий", en: "Fresh salmon", pl: "Łosoś świeży" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 17.50 },
      { name: { ru: "Бурый рис отварной", en: "Steamed brown rice", pl: "Ugotowany ryż brązowy" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 },
      { name: { ru: "Огурец и эдамаме", en: "Cucumber & edamame", pl: "Ogórek i edamame" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.00 },
      { name: { ru: "Авокадо", en: "Avocado", pl: "Awokado" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 4.50 }
    ],
    steps: [
      {
        ru: "Запеките лосось в духовке при 180°C 12 минут с солью и каплей лимонного сока.",
        en: "Bake salmon fillet at 180°C for 12 minutes with sea salt until flaky and succulent.",
        pl: "Upiecz łososia w piekarniku w 180°C przez 12 minut z solą i sokiem z cytryny."
      },
      {
        ru: "Нарежьте огурец тонкими слайсами с помощью овощечистки, разберите брокколи или эдамаме.",
        en: "Shave cucumber into ribbons with peeler, warm steamed edamame beans.",
        pl: "Pokrój ogórka we wstążki obieraczką do warzyw, podgrzej edamame."
      },
      {
        ru: "Соберите боул: бурый рис, нежный лосось, авокадо, огурец и полейте легким соевым соусом.",
        en: "Assemble bowl: warm brown rice base, flaked roasted salmon, avocado slices, and light soy-sesame vinaigrette.",
        pl: "Złóż miskę: brązowy ryż, łosoś, awokado, ogórek i skrop lekkim sosem sojowym."
      }
    ]
  },
  {
    id: "protein-oat-pancakes",
    title: { ru: "Протеиновые овсяные оладьи без сахара", en: "Sugar-Free High-Protein Oat Pancakes", pl: "Wysokobiałkowe Placuszki Owsiane bez cukru" },
    category: "healthy",
    prepTime: { ru: "15 мин", en: "15 min", pl: "15 min" },
    calories: 280,
    rating: 4.93,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Фитнес-оладьи из овсяной муки, банана, яичных белков и сывороточного протеина. Богаты сложными углеводами и белком.",
      en: "Clean fitness breakfast pancakes made from rolled oats, ripe banana, egg whites, and vanilla whey protein.",
      pl: "Placuszki fitness z mąki owsianej, banana, białek jaj i odżywki białkowej bez dodatku cukru."
    },
    ingredients: [
      { name: { ru: "Овсяные хлопья перемолотые", en: "Ground rolled oats", pl: "Płatki owsiane zmielone" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 },
      { name: { ru: "Банан спелый", en: "Ripe banana", pl: "Dojrzały banan" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.20 },
      { name: { ru: "Яичные белки", en: "Liquid egg whites", pl: "Białka jaj" }, qty: 3, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.50 },
      { name: { ru: "Сывороточный протеин ванильный", en: "Vanilla whey protein", pl: "Białko serwatkowe waniliowe" }, qty: 30, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 }
    ],
    steps: [
      {
        ru: "Сложите все ингредиенты в чашу блендера и взбейте 1 минуту до гладкого однородного теста.",
        en: "Combine oats, banana, egg whites, whey protein powder, and pinch of cinnamon in blender; blitz until smooth.",
        pl: "Zblenduj płatki owsiane, banana, białka jaj, odżywkę i cynamon na gładką masę."
      },
      {
        ru: "Выпекайте на сухой антипригарной сковороде по 2 минуты с каждой стороны под крышкой.",
        en: "Ladle onto hot dry non-stick pan over medium-low heat, cook 2 mins per side covered with lid.",
        pl: "Smaż na suchej patelni teflonowej po 2 minuty z każdej strony pod przykryciem."
      },
      {
        ru: "Подавайте с греческим йогуртом и свежими лесными ягодами.",
        en: "Stack high, garnish with non-fat Greek yogurt and fresh blueberries.",
        pl: "Podawaj z jogurtem greckim i świeżymi borówkami."
      }
    ]
  },
  {
    id: "baked-cod-ratatouille",
    title: { ru: "Филе трески, запеченное с рататуем", en: "Baked Atlantic Cod with Vegetable Ratatouille", pl: "Pieczony Dorsz Atlantycki z warzywnym ratatouille" },
    category: "healthy",
    prepTime: { ru: "30 мин", en: "30 min", pl: "30 min" },
    calories: 260,
    rating: 4.94,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Белое нежирное филе атлантической трески, запеченное на подушке из кабачков, баклажанов, томатов и прованских трав.",
      en: "Lean flaky Atlantic cod loin baked over a fragrant bed of zucchini, eggplant, bell peppers, and Provençal herbs.",
      pl: "Chudy filet z dorsza atlantyckiego pieczony na warzywnym ratatouille z cukinią, bakłażanem i pomidorami."
    },
    ingredients: [
      { name: { ru: "Филе трески свежее", en: "Cod loin fillet", pl: "Polędwica z dorsza" }, qty: 400, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 16.90 },
      { name: { ru: "Кабачок и баклажан", en: "Zucchini and eggplant", pl: "Cukinia i bakłażan" }, qty: 300, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Томаты протертые", en: "Crushed tomatoes", pl: "Pomidory krojone" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 },
      { name: { ru: "Прованские травы и чеснок", en: "Herbes de Provence & garlic", pl: "Zioła prowansalskie i czosnek" }, qty: 15, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 }
    ],
    steps: [
      {
        ru: "Нарежьте кабачок и баклажан кружочками, выложите в форму с томатами, чесноком и травами, запекайте 15 минут при 190°C.",
        en: "Toss diced zucchini, eggplant, and peppers with crushed tomatoes and herbs; roast at 190°C for 15 mins.",
        pl: "Pokrój cukinię i bakłażana, wymieszaj z pomidorami i ziołami, piecz 15 minut w 190°C."
      },
      {
        ru: "Посолите филе трески, положите сверху на овощи, сбрызните лимонным соком.",
        en: "Season cod fillet with sea salt and lemon juice, nestle on top of tender vegetables.",
        pl: "Dopraw dorsza solą i cytryną, ułóż na warzywach."
      },
      {
        ru: "Запекайте еще 12 минут до готовности рыбы (мясо должно легко расслаиваться хлопьями).",
        en: "Bake for 12 minutes more until fish is tender, opaque, and flakes effortlessly with a fork.",
        pl: "Piecz jeszcze 12 minut, aż ryba będzie delikatna i upieczona."
      }
    ]
  },
  {
    id: "nicoise-tuna-salad",
    title: { ru: "Фитнес-салат Нисуаз с тунцом и стручковой фасолью", en: "Protein-Packed French Niçoise Salad", pl: "Sałatka Nicejska z tuńczykiem i fasolką szparagową" },
    category: "healthy",
    prepTime: { ru: "15 мин", en: "15 min", pl: "15 min" },
    calories: 320,
    rating: 4.95,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Средиземноморский богатый белком салат: филе тунца, стручковая фасоль на пару, перепелиные яйца, оливки и дижонская заправка.",
      en: "Crisp classic Mediterranean salad loaded with tuna, tender green beans, baby potatoes, boiled eggs, and olives.",
      pl: "Śródziemnomorska sałatka bogata w białko: tuńczyk, zielona fasolka szparagowa, jajka, pomidorki i oliwki."
    },
    ingredients: [
      { name: { ru: "Тунец в собственном соку или стейк", en: "Canned or seared tuna", pl: "Tuńczyk w kawałkach" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 8.90 },
      { name: { ru: "Фасоль стручковая зеленая", en: "Green beans", pl: "Fasolka szparagowa" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Яйца отварные", en: "Boiled eggs", pl: "Jajka na twardo" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.00 },
      { name: { ru: "Томаты черри и маслины", en: "Cherry tomatoes and olives", pl: "Pomidorki cherry i oliwki" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 }
    ],
    steps: [
      {
        ru: "Отварите стручковую фасоль 3 минуты и обдайте ледяной водой для хруста.",
        en: "Blanch green beans in boiling salted water for 3 minutes, shock immediately in ice bath to keep bright crunch.",
        pl: "Zblanszuj fasolkę przez 3 minuty i przelej lodowatą wodą, by zachowała chrupkość."
      },
      {
        ru: "Смешайте листья салата с фасолью, половинками томатов черри и маслинами.",
        en: "Toss crisp salad greens with drained beans, halved cherry tomatoes, and Kalamata olives.",
        pl: "Wymieszaj sałatę z fasolką, połówkami pomidorków i oliwkami."
      },
      {
        ru: "Выложите кусочки тунца и четвертинки яиц, заправьте оливковым маслом с дижонской горчицей и соком лимона.",
        en: "Top with flaked tuna chunks and hard-boiled egg wedges. Drizzle with tangy Dijon vinaigrette.",
        pl: "Ułóż kawałki tuńczyka i ćwiartki jajek, polej sosem winegret z musztardą dijon."
      }
    ]
  },
  {
    id: "greek-quinoa-salad",
    title: { ru: "Средиземноморский салат из киноа со шпинатом и фетой", en: "Mediterranean Quinoa Spinach & Feta Salad", pl: "Śródziemnomorska Sałatka z komosą, szpinakiem i fetą" },
    category: "healthy",
    prepTime: { ru: "15 мин", en: "15 min", pl: "15 min" },
    calories: 270,
    rating: 4.93,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Легкий питательный салат: белое киноа, хрустящие огурцы, томаты черри, бэби-шпинат, сыр фета и маслины Каламата.",
      en: "Refreshing power salad of fluffy quinoa, crisp cucumbers, baby spinach, cherry tomatoes, Kalamata olives, and Greek feta.",
      pl: "Pożywna sałatka z komosą ryżową, świeżym szpinakiem, ogórkiem, pomidorkami, oliwkami i serem feta."
    },
    ingredients: [
      { name: { ru: "Киноа отварное", en: "Cooked quinoa", pl: "Ugotowana komosa ryżowa" }, qty: 200, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.00 },
      { name: { ru: "Сыр Фета греческий", en: "Greek feta", pl: "Ser feta grecki" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.50 },
      { name: { ru: "Шпинат свежий бэби", en: "Baby spinach", pl: "Młody szpinak" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.80 },
      { name: { ru: "Огурцы и томаты черри", en: "Cucumbers & cherry tomatoes", pl: "Ogórki i pomidorki" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.50 },
      { name: { ru: "Оливковое масло и орегано", en: "Olive oil and oregano", pl: "Oliwa i oregano" }, qty: 25, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.00 }
    ],
    steps: [
      {
        ru: "Остудите отваренное киноа до комнатной температуры.",
        en: "Let fluffy cooked quinoa cool completely to room temperature.",
        pl: "Ostudź ugotowaną komosę do temperatury pokojowej."
      },
      {
        ru: "Нарежьте огурцы и томаты кубиками, смешайте со шпинатом и киноа.",
        en: "Dice cucumbers, halve tomatoes, toss with baby spinach leaves and cooled quinoa.",
        pl: "Pokrój ogórki i pomidorki, wymieszaj ze szpinakiem i komosą."
      },
      {
        ru: "Посыпьте раскрошенной фетой, сушеным орегано и заправьте оливковым маслом первого отжима.",
        en: "Crumble real Greek feta over top, dust with Greek oregano, and dress with extra virgin olive oil.",
        pl: "Posyp pokruszoną fetą, oregano i polej oliwą extra virgin."
      }
    ]
  },
  {
    id: "chicken-sweet-potato",
    title: { ru: "Куриная грудка гриль с запеченным бататом", en: "Herb Grilled Chicken with Roasted Sweet Potato", pl: "Grillowana Pierś z kurczaka z pieczonym batatem" },
    category: "healthy",
    prepTime: { ru: "25 мин", en: "25 min", pl: "25 min" },
    calories: 360,
    rating: 4.95,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Классический рацион спортсмена: ароматная сочная куриная грудка с розмарином и дольки запеченного сладкого батата.",
      en: "The gold standard fitness meal: rosemary-garlic seared lean chicken breast paired with caramelized roasted sweet potato wedges.",
      pl: "Klasyczny posiłek sportowy: soczysta pierś z kurczaka z ziołami i pieczone cząstki batatów."
    },
    ingredients: [
      { name: { ru: "Куриное филе", en: "Chicken breast", pl: "Pierś z kurczaka" }, qty: 350, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 9.80 },
      { name: { ru: "Батат (сладкий картофель)", en: "Sweet potato", pl: "Batat (słodki ziemniak)" }, qty: 300, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.20 },
      { name: { ru: "Оливковое масло", en: "Olive oil", pl: "Oliwa z oliwek" }, qty: 20, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 1.50 },
      { name: { ru: "Розмарин и копченая паприка", en: "Rosemary & smoked paprika", pl: "Rozmaryn i papryka wędzona" }, qty: 10, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 }
    ],
    steps: [
      {
        ru: "Нарежьте батат дольками, посыпьте паприкой, солью и запекайте при 200°C 20 минут до мягкости.",
        en: "Cut sweet potato into wedges, toss with olive oil and smoked paprika, roast at 200°C for 20 mins.",
        pl: "Pokrój bataty w łódeczki, wymieszaj z papryką i oliwą, piecz w 200°C przez 20 minut."
      },
      {
        ru: "Замаринуйте филе курицы с розмарином и чесноком, обжарьте на сковороде-гриль по 4-5 минут с каждой стороны.",
        en: "Rub chicken breast with fresh rosemary, garlic, and sea salt; sear on grill pan for 4-5 mins per side.",
        pl: "Zamarynuj kurczaka z rozmarynem i czosnkiem, grilluj na patelni po 4-5 minut z każdej strony."
      },
      {
        ru: "Дайте курице отдохнуть 3 минуты, нарежьте и подавайте с горячим карамелизованным бататом.",
        en: "Rest chicken 3 mins before slicing, serve alongside crispy-tender sweet potatoes.",
        pl: "Odstaw mięso na 3 minuty, pokrój w plastry i podawaj z pieczonym batatem."
      }
    ]
  },
  {
    id: "grilled-tofu-rainbow-bowl",
    title: { ru: "Радужный боул с хрустящим тофу и кунжутным соусом", en: "Crispy Tofu Rainbow Protein Bowl", pl: "Tęczowy Bowl z chrupiącym tofu i sosem sezamowym" },
    category: "healthy",
    prepTime: { ru: "20 мин", en: "20 min", pl: "20 min" },
    calories: 310,
    rating: 4.92,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Полноценный веганский источник растительного протеина: золотистые кубики тофу с хрустящей капустой, авокадо и кунжутным дипом.",
      en: "Plant-powered nutrient feast with crispy pan-seared tofu cubes, purple cabbage, edamame, avocado, and tahini drizzle.",
      pl: "Wegańska miska pełna białka: złociste chrupiące tofu, fioletowa kapusta, awokado i sos sezamowy."
    },
    ingredients: [
      { name: { ru: "Сыр Тофу твердый", en: "Extra-firm tofu", pl: "Tofu twarde naturalne" }, qty: 250, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.90 },
      { name: { ru: "Краснокочанная капуста", en: "Red cabbage shredded", pl: "Kapusta czerwona" }, qty: 100, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 1.50 },
      { name: { ru: "Авокадо", en: "Avocado", pl: "Awokado" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 4.50 },
      { name: { ru: "Кунжутный соус Гомадари", en: "Sesame gomadare dressing", pl: "Sos sezamowy" }, qty: 40, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 3.50 }
    ],
    steps: [
      {
        ru: "Отожмите тофу от лишней влаги, нарежьте кубиками и обваляйте в кукурузном крахмале.",
        en: "Press excess water from tofu, dice into cubes, and toss lightly in cornstarch for extreme crispiness.",
        pl: "Ociśnij tofu z wody, pokrój w kostkę i obtocz w skrobi kukurydzianej."
      },
      {
        ru: "Обжарьте кубики тофу на сковороде в капле масла до хрустящей корочки со всех сторон (5 минут).",
        en: "Pan-fry tofu in skillet with sesame oil over medium-high heat for 5 mins until golden and crunchy.",
        pl: "Podsmaż tofu na patelni z odrobiną oleju przez 5 minut na chrupiąco."
      },
      {
        ru: "Соберите боул со свежими овощами, положите тофу и полейте насыщенным кунжутным соусом.",
        en: "Build bowl with shredded cabbage, avocado, and carrots; top with hot crispy tofu and drizzle with sesame sauce.",
        pl: "Ułóż warzywa w misce, dodaj gorące tofu i polej sosem sezamowym."
      }
    ]
  },
  {
    id: "smoothie-bowl-acai",
    title: { ru: "Смузи-боул с черникой, чиа и гранолой", en: "Acai Berry & Chia Superfood Smoothie Bowl", pl: "Smoothie Bowl z jagodami, nasionami chia i granolą" },
    category: "healthy",
    prepTime: { ru: "10 мин", en: "10 min", pl: "10 min" },
    calories: 280,
    rating: 4.95,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Антиоксидантный витаминный смузи-боул на растительном молоке со свежими ягодами, миндальными лепестками и семенами чиа.",
      en: "Thick antioxidant berry smoothie served in a bowl, topped with crunchy granola, chia seeds, and fresh fruit slices.",
      pl: "Gęste smoothie jagodowe w misce z chrupiącą granolą, nasionami chia i świeżymi owocami."
    },
    ingredients: [
      { name: { ru: "Замороженная черника или ягоды асаи", en: "Frozen blueberries or acai", pl: "Mrożone jagody lub borówki" }, qty: 180, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 5.20 },
      { name: { ru: "Банан спелый", en: "Ripe banana", pl: "Dojrzały banan" }, qty: 1, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 1.20 },
      { name: { ru: "Миндальное или овсяное молоко", en: "Almond or oat milk", pl: "Mleko migdałowe lub owsiane" }, qty: 120, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 2.00 },
      { name: { ru: "Семена чиа и гранола", en: "Chia seeds and granola", pl: "Nasiona chia i granola" }, qty: 30, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 2.50 }
    ],
    steps: [
      {
        ru: "Взбейте в блендере замороженные ягоды, банан и миндальное молоко до консистенции густого сорбета.",
        en: "Blend frozen berries, ripe banana and plant milk on high until silky, thick and scoopable.",
        pl: "Zblenduj mrożone owoce, banana i mleko roślinne na gęsty krem."
      },
      {
        ru: "Переложите густую массу в глубокую чашу.",
        en: "Transfer the thick smoothie base into a chilled wide breakfast bowl.",
        pl: "Przełóż masę do miski."
      },
      {
        ru: "Украсьте ровными рядами семян чиа, хрустящей гранолы, ягод и миндаля.",
        en: "Artfully garnish with neat lines of chia seeds, golden granola, sliced banana, and nuts.",
        pl: "Udekoruj nasionami chia, granolą i świeżymi owocami."
      }
    ]
  },
  {
    id: "quinoa-beet-goat-cheese",
    title: { ru: "Салат из печеной свеклы с киноа и козьим сыром", en: "Roasted Beetroot, Quinoa & Goat Cheese Salad", pl: "Sałatka z pieczonych buraków, komosy ryżowej i sera koziego" },
    category: "healthy",
    prepTime: { ru: "25 мин", en: "25 min", pl: "25 min" },
    calories: 320,
    rating: 4.93,
    difficulty: { ru: "Легко", en: "Easy", pl: "Łatwy" },
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: {
      ru: "Утонченное сочетание карамелизованной запеченной свеклы, нежного козьего сыра, грецких орехов и киноа под медово-горчичной заправкой.",
      en: "Nutritious gourmet salad pairing tender roasted sweet beets with warm quinoa, creamy goat cheese, and toasted walnuts.",
      pl: "Wykwintna sałatka z pieczonych buraków, puszystej komosy ryżowej, kremowego sera koziego i prażonych orzechów."
    },
    ingredients: [
      { name: { ru: "Свекла запеченная", en: "Roasted beetroot", pl: "Pieczone buraki" }, qty: 2, unit: { ru: "шт", en: "pcs", pl: "szt" }, basePrice: 2.80 },
      { name: { ru: "Киноа отварная", en: "Cooked quinoa", pl: "Ugotowana komosa ryżowa" }, qty: 150, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 3.20 },
      { name: { ru: "Козий сыр мягкий", en: "Soft goat cheese", pl: "Miękki ser kozi" }, qty: 80, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 6.90 },
      { name: { ru: "Руккола и грецкие орехи", en: "Arugula and walnuts", pl: "Rukola i orzechy włoskie" }, qty: 60, unit: { ru: "г", en: "g", pl: "g" }, basePrice: 4.20 },
      { name: { ru: "Медово-горчичная заправка", en: "Honey-mustard vinaigrette", pl: "Dressing miodowo-musztardowy" }, qty: 30, unit: { ru: "мл", en: "ml", pl: "ml" }, basePrice: 1.80 }
    ],
    steps: [
      {
        ru: "Свеклу нарежьте дольками, грецкие орехи слегка прокалите на сухой сковороде для раскрытия аромата.",
        en: "Cut sweet roasted beets into wedges, lightly toast walnuts in a dry pan until fragrant.",
        pl: "Pokrój pieczone buraki na cząstki, orzechy podpraż na suchej patelni."
      },
      {
        ru: "На подушку из свежей рукколы выложите теплую рассыпчатую киноа и дольки свеклы.",
        en: "Layer fresh peppery arugula, warm fluffy quinoa, and roasted beet wedges onto a serving dish.",
        pl: "Na świeżą rukolę wyłóż ciepłą komosę ryżową i kawałki buraków."
      },
      {
        ru: "Раскрошите мягкий козий сыр, посыпьте орехами и щедро полейте заправкой из меда, дижонской горчицы и оливкового масла.",
        en: "Crumble goat cheese over the salad, scatter crunchy nuts, and drizzle with honey-mustard vinaigrette.",
        pl: "Rozkrusz ser kozi, posyp orzechami i polej dressingiem miodowo-musztardowym."
      }
    ]
  }
];

