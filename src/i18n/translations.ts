// i18n Translation Dictionary for CookCraft (RU, EN, PL)

export type Language = 'ru' | 'en' | 'pl';

export interface Translations {
  appName: string;
  recipesTitle: string;
  recipesSubtitle: string;
  searchPlaceholder: string;
  catAll: string;
  catBreakfast: string;
  catLunch: string;
  catHealthy: string;
  catFast: string;
  prepTimePrefix: string;
  openRecipeBtn: string;
  letscookBtn: string;
  ingredientsHeader: string;
  stepsHeader: string;
  
  // Scanner
  scannerTitle: string;
  scannerSubtitle: string;
  camPlaceholder: string;
  camBtnOn: string;
  camBtnOff: string;
  camBtnScan: string;
  camBtnUpload: string;
  presetHeader: string;
  presetBorscht: string;
  presetCarbonara: string;
  presetRibeye: string;
  scanValueHeader: string;
  portionWeightLabel: string;
  addDiaryBtn: string;
  
  // Shopping
  shoppingTitle: string;
  shoppingSubtitle: string;
  shoppingCartHeader: string;
  tabComparison: string;
  tabDeals: string;
  addToCartBtn: string;
  validUntilPrefix: string;
  clearCartBtn: string;
  servingsLabel: string;
  addCustomPlaceholder: string;
  addBtn: string;
  addressPlaceholder: string;
  addressSearchBtn: string;
  storesHeader: string;
  bestPriceToggle: string;
  nearestToggle: string;
  mapHeader: string;
  cartItemsCount: string;
  cartSubtotal: string;
  cartBestSavings: string;
  cartCopyBtn: string;
  cartCopiedMsg: string;
  promoSearchPlaceholder: string;
  promoSortDiscount: string;
  promoSortPrice: string;
  promoSortExpiring: string;
  showOnMapBtn: string;
  orderDeliveryBtn: string;
  addCustomTitle: string;
  addCustomHint: string;
  customQtyLabel: string;
  customUnitLabel: string;
  customPriceLabel: string;
  customAddBtn: string;
  promoCatHeader: string;
  promoStoreHeader: string;
  promoCatHealthy: string;
  promoCatBreakfast: string;
  promoCatLunch: string;
  promoCatFast: string;
  promoCatDessert: string;
  boughtText: string;
  savingText: string;
  
  // Diary & Calculator
  diaryTitle: string;
  diarySubtitle: string;
  consumedLabel: string;
  proteinLabel: string;
  fatLabel: string;
  carbsLabel: string;
  fiberLabel: string;
  mealsHeader: string;
  calcHeader: string;
  calcDesc: string;
  calcGenderLabel: string;
  calcGenderMale: string;
  calcGenderFemale: string;
  calcAgeLabel: string;
  calcWeightLabel: string;
  calcHeightLabel: string;
  calcActivityLabel: string;
  calcActivitySedentary: string;
  calcActivityLight: string;
  calcActivityModerate: string;
  calcActivityVery: string;
  calcActivityExtra: string;
  calcGoalLabel: string;
  calcGoalLose: string;
  calcGoalMaintain: string;
  calcGoalGain: string;
  calcBmrLabel: string;
  calcTdeeLabel: string;
  calcTargetLabel: string;
  calcApplyBtn: string;
  formulaLabel: string;
  formulaMifflin: string;
  formulaHarris: string;
  formulaWho: string;
  bmiLabel: string;
  bmiUnderweight: string;
  bmiNormal: string;
  bmiOverweight: string;
  bmiObese: string;
  idealWeightLabel: string;
  calorieRemainingLabel: string;
  waterTrackerTitle: string;
  waterConsumedText: string;
  waterAddGlass: string;
  waterReset: string;
  mealBreakfast: string;
  mealLunch: string;
  mealDinner: string;
  mealSnack: string;
  addMealBtn: string;
  mealModalTitle: string;
  mealNameLabel: string;
  mealTypeLabel: string;
  mealCaloriesLabel: string;
  mealQuickSelect: string;
  saveMealBtn: string;
  clearDayBtn: string;

  // Nav
  navRecipes: string;
  navScanner: string;
  navShopping: string;
  navDiary: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  ru: {
    appName: "CookCraft",
    recipesTitle: "Кулинарные рецепты",
    recipesSubtitle: "Вкусные блюда с видеоуроками и расчетом ингредиентов",
    searchPlaceholder: "Поиск рецепта или ингредиента...",
    catAll: "Все",
    catBreakfast: "Завтраки",
    catLunch: "Обеды & Ужины",
    catHealthy: "ПП & Фитнес",
    catFast: "До 20 мин",
    prepTimePrefix: "⏱️ ",
    openRecipeBtn: "Открыть",
    letscookBtn: "👨‍🍳 За работу!",
    ingredientsHeader: "🥗 Ингредиенты на порции:",
    stepsHeader: "📋 Пошаговый рецепт:",
    
    scannerTitle: "Сканер калорий по фото",
    scannerSubtitle: "Сфотографируйте блюдо для моментального определения калорий и состава",
    camPlaceholder: "Нажмите «Включить Камеру» или выберите фото готового блюда",
    camBtnOn: "📹 Включить Камеру",
    camBtnOff: "⏹️ Отключить Камеру",
    camBtnScan: "⚡ Определить калории",
    camBtnUpload: "📁 Выбрать из Галереи",
    presetHeader: "Или выберите готовый пример блюда:",
    presetBorscht: "🥣 Борщ домашний",
    presetCarbonara: "🍝 Паста Карбонара",
    presetRibeye: "🥩 Стейк Рибай",
    scanValueHeader: "Состав и пищевая ценность:",
    portionWeightLabel: "Масса порции:",
    addDiaryBtn: "➕ Внести калории в Дневник Питания",
    
    shoppingTitle: "Список покупок & Магазины",
    shoppingSubtitle: "Рассчитайте стоимость продуктов и выберите выгодный супермаркет",
    shoppingCartHeader: "Список Покупок",
    tabComparison: "🛒 Сравнение цен",
    tabDeals: "🔥 Выгодно сейчас (Акции)",
    addToCartBtn: "➕ В список покупок",
    validUntilPrefix: "⏰ Акция до:",
    clearCartBtn: "Очистить список",
    servingsLabel: "Количество порций:",
    addCustomPlaceholder: "+ Добавить свой продукт (напр. Молоко, Яйца)...",
    addBtn: "Добавить",
    addressPlaceholder: "🔍 Введите ваш адрес или город в Польше (напр. Варшава)...",
    addressSearchBtn: "Поиск",
    storesHeader: "🏬 Цены в супермаркетах",
    bestPriceToggle: "💡 Выгода",
    nearestToggle: "📍 Ближайший",
    mapHeader: "🗺️ Карта супермаркетов поблизости",
    cartItemsCount: "позиций",
    cartSubtotal: "Базовая сумма:",
    cartBestSavings: "Выгоднее всего в {store}: {price} (Экономия {savings})",
    cartCopyBtn: "📋 Скопировать список",
    cartCopiedMsg: "✅ Список скопирован в буфер обмена!",
    promoSearchPlaceholder: "🔍 Поиск по акциям (напр. лосось, кофе, сыр)...",
    promoSortDiscount: "🔥 Самая большая скидка %",
    promoSortPrice: "💰 Самая низкая цена",
    promoSortExpiring: "⏰ Скоро завершаются",
    showOnMapBtn: "📍 На карте",
    orderDeliveryBtn: "🚚 Заказать",
    addCustomTitle: "➕ Добавить свой продукт",
    addCustomHint: "Умные подсказки",
    customQtyLabel: "Количество",
    customUnitLabel: "Единица",
    customPriceLabel: "Цена (zł)",
    customAddBtn: "➕ Добавить в список покупок",
    promoCatHeader: "📂 Категория:",
    promoStoreHeader: "🏬 Магазин:",
    promoCatHealthy: "🥗 ПП & Фитнес",
    promoCatBreakfast: "🍳 Завтраки",
    promoCatLunch: "🍲 Обеды & Мясо",
    promoCatFast: "⚡ Перекусы",
    promoCatDessert: "🍫 Десерты",
    boughtText: "куплено",
    savingText: "Экономия ок.",
    
    diaryTitle: "Дневник питания & Метаболизм",
    diarySubtitle: "Научный расчет BMR/TDEE, трекер калорий, БЖУ, воды и ИМТ",
    consumedLabel: "из {target} ккал",
    proteinLabel: "Белки",
    fatLabel: "Жиры",
    carbsLabel: "Углеводы",
    fiberLabel: "Клетчатка",
    mealsHeader: "Приёмы пищи за день",
    calcHeader: "🧮 Профессиональный Калькулятор BMR & TDEE",
    calcDesc: "Клинически подтвержденные формулы расчета энергозатрат и БЖУ",
    calcGenderLabel: "Пол",
    calcGenderMale: "👨 Мужчина",
    calcGenderFemale: "👩 Женщина",
    calcAgeLabel: "Возраст (лет)",
    calcWeightLabel: "Вес (кг)",
    calcHeightLabel: "Рост (см)",
    calcActivityLabel: "Уровень активности",
    calcActivitySedentary: "💤 Сидячий образ жизни (x1.2)",
    calcActivityLight: "🚶 Легкие тренировки 1-3 р/нед (x1.375)",
    calcActivityModerate: "🏃 Умеренная активность 3-5 р/нед (x1.55)",
    calcActivityVery: "🔥 Высокая активность 6-7 р/нед (x1.725)",
    calcActivityExtra: "⚡ Экстремальный / Физический труд (x1.9)",
    calcGoalLabel: "Ваша цель",
    calcGoalLose: "📉 Похудение (-15% дефицит)",
    calcGoalMaintain: "⚖️ Поддержание веса (баланс)",
    calcGoalGain: "📈 Набор массы (+15% профицит)",
    calcBmrLabel: "Базовый метаболизм (BMR):",
    calcTdeeLabel: "Суточный расход (TDEE):",
    calcTargetLabel: "Целевая норма калорий:",
    calcApplyBtn: "🎯 Применить норму в дневнике",
    formulaLabel: "Формула метаболизма:",
    formulaMifflin: "Миффлин-Сан Жеор (Золотой стандарт)",
    formulaHarris: "Харрис-Бенедикт (1984)",
    formulaWho: "ВОЗ / ФАО (WHO/UNU)",
    bmiLabel: "ИМТ (Индекс массы тела):",
    bmiUnderweight: "Дефицит массы",
    bmiNormal: "Здоровый вес (Норма)",
    bmiOverweight: "Избыточный вес",
    bmiObese: "Ожирение",
    idealWeightLabel: "Здоровый диапазон веса:",
    calorieRemainingLabel: "Осталось:",
    waterTrackerTitle: "💧 Гидратация и Вода",
    waterConsumedText: "Выпито {curr} из {target} мл",
    waterAddGlass: "+250 мл (Стакан)",
    waterReset: "Сброс",
    mealBreakfast: "🌅 Завтрак",
    mealLunch: "☀️ Обед",
    mealDinner: "🌙 Ужин",
    mealSnack: "🍎 Перекус",
    addMealBtn: "➕ Добавить блюдо",
    mealModalTitle: "Внести прием пищи",
    mealNameLabel: "Название блюда:",
    mealTypeLabel: "Прием пищи:",
    mealCaloriesLabel: "Калории (ккал):",
    mealQuickSelect: "Быстрый выбор из меню:",
    saveMealBtn: "✅ Сохранить в дневник",
    clearDayBtn: "🗑️ Очистить дневник",

    navRecipes: "Рецепты",
    navScanner: "Сканер",
    navShopping: "Покупки",
    navDiary: "Дневник"
  },
  en: {
    appName: "CookCraft",
    recipesTitle: "Culinary Recipes",
    recipesSubtitle: "Delicious meals with video guides and ingredient scalers",
    searchPlaceholder: "Search recipe or ingredient...",
    catAll: "All",
    catBreakfast: "Breakfast",
    catLunch: "Lunch & Dinner",
    catHealthy: "Healthy & Fitness",
    catFast: "Under 20 min",
    prepTimePrefix: "⏱️ ",
    openRecipeBtn: "View",
    letscookBtn: "👨‍🍳 Let's Cook!",
    ingredientsHeader: "🥗 Ingredients for portions:",
    stepsHeader: "📋 Step-by-step Recipe:",
    
    scannerTitle: "Photo Calorie Scanner",
    scannerSubtitle: "Take a photo of your dish to instantly calculate calories & macros",
    camPlaceholder: "Click 'Turn On Camera' or select a photo of your dish",
    camBtnOn: "📹 Turn On Camera",
    camBtnOff: "⏹️ Turn Off Camera",
    camBtnScan: "⚡ Scan Calories",
    camBtnUpload: "📁 Choose from Gallery",
    presetHeader: "Or choose a preset sample dish:",
    presetBorscht: "🥣 Homemade Borscht",
    presetCarbonara: "🍝 Pasta Carbonara",
    presetRibeye: "🥩 Ribeye Steak",
    scanValueHeader: "Nutrition & Composition:",
    portionWeightLabel: "Portion weight:",
    addDiaryBtn: "➕ Add Calories to Food Diary",
    
    shoppingTitle: "Shopping List & Stores",
    shoppingSubtitle: "Calculate ingredient cost & find the best nearby supermarket",
    shoppingCartHeader: "Shopping List",
    tabComparison: "🛒 Price Comparison",
    tabDeals: "🔥 Hot Deals & Promotions",
    addToCartBtn: "➕ Add to Shopping List",
    validUntilPrefix: "⏰ Valid until:",
    clearCartBtn: "Clear list",
    servingsLabel: "Number of servings:",
    addCustomPlaceholder: "+ Add custom item (e.g. Milk, Eggs)...",
    addBtn: "Add",
    addressPlaceholder: "🔍 Enter your address or city in Poland (e.g. Warsaw)...",
    addressSearchBtn: "Search",
    storesHeader: "🏬 Supermarket Prices",
    bestPriceToggle: "💡 Best Value",
    nearestToggle: "📍 Nearest",
    mapHeader: "🗺️ Nearby Supermarkets Map",
    cartItemsCount: "items",
    cartSubtotal: "Base subtotal:",
    cartBestSavings: "Best deal at {store}: {price} (Save {savings})",
    cartCopyBtn: "📋 Copy List",
    cartCopiedMsg: "✅ Shopping list copied to clipboard!",
    promoSearchPlaceholder: "🔍 Search deals (e.g. salmon, coffee, cheese)...",
    promoSortDiscount: "🔥 Highest discount %",
    promoSortPrice: "💰 Lowest price",
    promoSortExpiring: "⏰ Expiring soon",
    showOnMapBtn: "📍 On Map",
    orderDeliveryBtn: "🚚 Order",
    addCustomTitle: "➕ Add Custom Product",
    addCustomHint: "Smart suggestions",
    customQtyLabel: "Quantity",
    customUnitLabel: "Unit",
    customPriceLabel: "Price (zł)",
    customAddBtn: "➕ Add to shopping list",
    promoCatHeader: "📂 Category:",
    promoStoreHeader: "🏬 Supermarket:",
    promoCatHealthy: "🥗 Healthy & Fit",
    promoCatBreakfast: "🍳 Breakfast",
    promoCatLunch: "🍲 Lunch & Meat",
    promoCatFast: "⚡ Snacks",
    promoCatDessert: "🍫 Desserts",
    boughtText: "bought",
    savingText: "You save approx.",
    
    diaryTitle: "Nutrition Diary & Metabolism",
    diarySubtitle: "Scientific BMR/TDEE math, calorie tracking, macros, water & BMI",
    consumedLabel: "of {target} kcal",
    proteinLabel: "Protein",
    fatLabel: "Fats",
    carbsLabel: "Carbs",
    fiberLabel: "Fiber",
    mealsHeader: "Today's Logged Meals",
    calcHeader: "🧮 Professional BMR & TDEE Calculator",
    calcDesc: "Clinically validated metabolic formulas and precision macro ratios",
    calcGenderLabel: "Gender",
    calcGenderMale: "👨 Male",
    calcGenderFemale: "👩 Female",
    calcAgeLabel: "Age (years)",
    calcWeightLabel: "Weight (kg)",
    calcHeightLabel: "Height (cm)",
    calcActivityLabel: "Activity Level",
    calcActivitySedentary: "💤 Sedentary lifestyle (x1.2)",
    calcActivityLight: "🚶 Light exercise 1-3 days/wk (x1.375)",
    calcActivityModerate: "🏃 Moderate exercise 3-5 days/wk (x1.55)",
    calcActivityVery: "🔥 Heavy exercise 6-7 days/wk (x1.725)",
    calcActivityExtra: "⚡ Extreme activity / Physical job (x1.9)",
    calcGoalLabel: "Your Goal",
    calcGoalLose: "📉 Fat Loss (-15% deficit)",
    calcGoalMaintain: "⚖️ Weight Maintenance (balance)",
    calcGoalGain: "📈 Muscle Gain (+15% surplus)",
    calcBmrLabel: "Basal Metabolic Rate (BMR):",
    calcTdeeLabel: "Total Daily Expenditure (TDEE):",
    calcTargetLabel: "Target Daily Calorie Goal:",
    calcApplyBtn: "🎯 Apply Target to Diary",
    formulaLabel: "Calculation Formula:",
    formulaMifflin: "Mifflin-St Jeor (Gold Standard)",
    formulaHarris: "Harris-Benedict (1984)",
    formulaWho: "WHO / FAO / UNU",
    bmiLabel: "BMI (Body Mass Index):",
    bmiUnderweight: "Underweight",
    bmiNormal: "Healthy Normal Weight",
    bmiOverweight: "Overweight",
    bmiObese: "Obese",
    idealWeightLabel: "Healthy weight range:",
    calorieRemainingLabel: "Remaining:",
    waterTrackerTitle: "💧 Daily Hydration & Water",
    waterConsumedText: "Drunk {curr} of {target} ml",
    waterAddGlass: "+250 ml (Glass)",
    waterReset: "Reset",
    mealBreakfast: "🌅 Breakfast",
    mealLunch: "☀️ Lunch",
    mealDinner: "🌙 Dinner",
    mealSnack: "🍎 Snack",
    addMealBtn: "➕ Add Meal",
    mealModalTitle: "Log Meal to Diary",
    mealNameLabel: "Meal Name:",
    mealTypeLabel: "Meal Type:",
    mealCaloriesLabel: "Calories (kcal):",
    mealQuickSelect: "Quick select from recipes:",
    saveMealBtn: "✅ Save to Diary",
    clearDayBtn: "🗑️ Clear Today's Log",

    navRecipes: "Recipes",
    navScanner: "Scanner",
    navShopping: "Shopping",
    navDiary: "Diary"
  },
  pl: {
    appName: "CookCraft",
    recipesTitle: "Przepisy Kulinarne",
    recipesSubtitle: "Smaczne potrawy z wideo-instrukcjami i przelicznikiem składników",
    searchPlaceholder: "Szukaj przepisu lub składnika...",
    catAll: "Wszystkie",
    catBreakfast: "Śniadania",
    catLunch: "Obiady i Kolacje",
    catHealthy: "Zdrowe & Fitness",
    catFast: "Do 20 min",
    prepTimePrefix: "⏱️ ",
    openRecipeBtn: "Otwórz",
    letscookBtn: "👨‍🍳 Do dzieła!",
    ingredientsHeader: "🥗 Składniki na porcje:",
    stepsHeader: "📋 Przepis krok po kroku:",
    
    scannerTitle: "Skaner Kalorii ze Zdjęcia",
    scannerSubtitle: "Zrób zdjęcie potrawy, aby natychmiast obliczyć kalorie i makro",
    camPlaceholder: "Kliknij «Włącz Kamerę» lub wybierz zdjęcie potrawy",
    camBtnOn: "📹 Włącz Kamerę",
    camBtnOff: "⏹️ Wyłącz Kamerę",
    camBtnScan: "⚡ Oblicz Kalorie",
    camBtnUpload: "📁 Wybierz z Galerii",
    presetHeader: "Lub wybierz gotowy przykład dania:",
    presetBorscht: "🥣 Barszcz domowy",
    presetCarbonara: "🍝 Makaron Carbonara",
    presetRibeye: "🥩 Stek Ribeye",
    scanValueHeader: "Wartość odżywcza i skład:",
    portionWeightLabel: "Masa porcji:",
    addDiaryBtn: "➕ Dodaj Kalorie do Dziennika",
    
    shoppingTitle: "Lista Zakupów i Sklepy",
    shoppingSubtitle: "Oblicz koszt produktów i wybierz najkorzystniejszy supermarket",
    shoppingCartHeader: "Lista Zakupów",
    tabComparison: "🛒 Porównanie cen",
    tabDeals: "🔥 Wyjątkowe Promocje",
    addToCartBtn: "➕ Dodaj do listy zakupów",
    validUntilPrefix: "⏰ Okazja do:",
    clearCartBtn: "Wyczyść listę",
    servingsLabel: "Liczba porcji:",
    addCustomPlaceholder: "+ Dodaj własny produkt (np. Mleko, Jajka)...",
    addBtn: "Dodaj",
    addressPlaceholder: "🔍 Wpisz swój adres lub miasto w Polsce (np. Warszawa)...",
    addressSearchBtn: "Szukaj",
    storesHeader: "🏬 Ceny w Supermarketach",
    bestPriceToggle: "💡 Najtaniej",
    nearestToggle: "📍 Najbliżej",
    mapHeader: "🗺️ Mapa pobliskich sklepów",
    cartItemsCount: "pozycji",
    cartSubtotal: "Wartość bazowa:",
    cartBestSavings: "Najtaniej w {store}: {price} (Oszczędzasz {savings})",
    cartCopyBtn: "📋 Kopiuj listę",
    cartCopiedMsg: "✅ Skopiowano listę zakupów do schowka!",
    promoSearchPlaceholder: "🔍 Szukaj w promocjach (np. łosoś, kawa, oliwa)...",
    promoSortDiscount: "🔥 Największa zniżka %",
    promoSortPrice: "💰 Najniższa cena",
    promoSortExpiring: "⏰ Kończące się wkrótce",
    showOnMapBtn: "📍 Na mapie",
    orderDeliveryBtn: "🚚 Zamów",
    addCustomTitle: "➕ Dodaj własny produkt",
    addCustomHint: "Inteligentne podpowiedzi",
    customQtyLabel: "Ilość",
    customUnitLabel: "Jednostka",
    customPriceLabel: "Cena (zł)",
    customAddBtn: "➕ Dodaj do listy zakupów",
    promoCatHeader: "📂 Kategoria:",
    promoStoreHeader: "🏬 Sklep:",
    promoCatHealthy: "🥗 Zdrowe & Fit",
    promoCatBreakfast: "🍳 Śniadania",
    promoCatLunch: "🍲 Obiady & Mięso",
    promoCatFast: "⚡ Przekąski",
    promoCatDessert: "🍫 Desery",
    boughtText: "kupione",
    savingText: "Oszczędzasz ok.",
    
    diaryTitle: "Dziennik Odżywiania & Metabolizm",
    diarySubtitle: "Naukowe obliczenia BMR/TDEE, bilans kalorii, makroskładników, wody i BMI",
    consumedLabel: "z {target} kcal",
    proteinLabel: "Białka",
    fatLabel: "Tłuszcze",
    carbsLabel: "Węglowodany",
    fiberLabel: "Błonnik",
    mealsHeader: "Dzisiejsze posiłki",
    calcHeader: "🧮 Profesjonalny Kalkulator BMR & TDEE",
    calcDesc: "Klinicznie potwierdzone wzory zapotrzebowania energetycznego i podziału makro",
    calcGenderLabel: "Płeć",
    calcGenderMale: "👨 Mężczyzna",
    calcGenderFemale: "👩 Kobieta",
    calcAgeLabel: "Wiek (lat)",
    calcWeightLabel: "Waga (kg)",
    calcHeightLabel: "Wzrost (cm)",
    calcActivityLabel: "Poziom aktywności",
    calcActivitySedentary: "💤 Siedzący tryb życia (x1.2)",
    calcActivityLight: "🚶 Lekki trening 1-3 razy/tydz (x1.375)",
    calcActivityModerate: "🏃 Umiarkowany trening 3-5 razy/tydz (x1.55)",
    calcActivityVery: "🔥 Duża aktywność 6-7 razy/tydz (x1.725)",
    calcActivityExtra: "⚡ Ekstremalny / Praca fizyczna (x1.9)",
    calcGoalLabel: "Twój cel",
    calcGoalLose: "📉 Odchudzanie (-15% deficyt)",
    calcGoalMaintain: "⚖️ Utrzymanie wagi (bilans)",
    calcGoalGain: "📈 Masa mięśniowa (+15% nadwyżka)",
    calcBmrLabel: "Metabolizm bazowy (BMR):",
    calcTdeeLabel: "Całkowity wydatek (TDEE):",
    calcTargetLabel: "Zalecany cel kaloryczny:",
    calcApplyBtn: "🎯 Zastosuj cel w dzienniku",
    formulaLabel: "Wzór obliczeniowy:",
    formulaMifflin: "Mifflin-St Jeor (Złoty standard)",
    formulaHarris: "Harris-Benedict (1984)",
    formulaWho: "WHO / FAO / UNU",
    bmiLabel: "Wskaźnik BMI:",
    bmiUnderweight: "Niedowaga",
    bmiNormal: "Prawidłowa waga (Norma)",
    bmiOverweight: "Nadwaga",
    bmiObese: "Otyłość",
    idealWeightLabel: "Zdrowy zakres wagi:",
    calorieRemainingLabel: "Pozostało:",
    waterTrackerTitle: "💧 Nawodnienie i Woda",
    waterConsumedText: "Wypito {curr} z {target} ml",
    waterAddGlass: "+250 ml (Szklanka)",
    waterReset: "Reset",
    mealBreakfast: "🌅 Śniadanie",
    mealLunch: "☀️ Obiad",
    mealDinner: "🌙 Kolacja",
    mealSnack: "🍎 Przekąska",
    addMealBtn: "➕ Dodaj posiłek",
    mealModalTitle: "Zapisz posiłek w dzienniku",
    mealNameLabel: "Nazwa posiłku:",
    mealTypeLabel: "Kategoria posiłku:",
    mealCaloriesLabel: "Kalorie (kcal):",
    mealQuickSelect: "Szybki wybór z przepisów:",
    saveMealBtn: "✅ Zapisz posiłek",
    clearDayBtn: "🗑️ Wyczyść dzisiejszy dzień",

    navRecipes: "Przepisy",
    navScanner: "Skaner",
    navShopping: "Zakupy",
    navDiary: "Dziennik"
  }
};
