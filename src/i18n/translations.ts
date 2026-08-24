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
  
  // Diary & Calculator
  diaryTitle: string;
  diarySubtitle: string;
  consumedLabel: string;
  proteinLabel: string;
  fatLabel: string;
  carbsLabel: string;
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
  mealBreakfast: string;
  mealLunch: string;
  mealDinner: string;
  mealSnack: string;
  addMealBtn: string;

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
    shoppingCartHeader: " Ингредиенты к покупке",
    tabComparison: "🛒 Сравнение цен",
    tabDeals: "🔥 Выгодно сейчас",
    addToCartBtn: "➕ В список покупок",
    validUntilPrefix: "⏰ Акция до:",
    clearCartBtn: "Очистить",
    servingsLabel: "Количество порций:",
    addCustomPlaceholder: "+ Добавить свой продукт (напр. Молоко)",
    addBtn: "Добавить",
    addressPlaceholder: "🔍 Введите ваш адрес или город в Польше (напр. Варшава)...",
    addressSearchBtn: "Поиск",
    storesHeader: "🏬 Цены в супермаркетах",
    bestPriceToggle: "💡 Выгода",
    nearestToggle: "📍 Ближайший",
    mapHeader: "🗺️ Карта супермаркетов поблизости",
    
    diaryTitle: "Дневник питания",
    diarySubtitle: "Ваш научный баланс калорий и макронутриентов на сегодня",
    consumedLabel: "из {target} ккал",
    proteinLabel: "Белки",
    fatLabel: "Жиры",
    carbsLabel: "Углеводы",
    mealsHeader: "Приёмы пищи сегодня",
    calcHeader: "🧮 Научный Калькулятор BMR & TDEE (Миффлин-Сан Жеор)",
    calcDesc: "Формула Миффлина-Сан Жеора для точного расчета суточной нормы",
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
    calcTargetLabel: "Норма калорий в день:",
    calcApplyBtn: "🎯 Применить норму в дневнике",
    mealBreakfast: "🌅 Завтрак",
    mealLunch: "☀️ Обед",
    mealDinner: "🌙 Ужин",
    mealSnack: "🍎 Перекус",
    addMealBtn: "➕ Добавить блюдо",

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
    shoppingCartHeader: " Shopping List",
    tabComparison: "🛒 Price Comparison",
    tabDeals: "🔥 Hot Deals",
    addToCartBtn: "➕ Add to Shopping List",
    validUntilPrefix: "⏰ Valid until:",
    clearCartBtn: "Clear",
    servingsLabel: "Number of servings:",
    addCustomPlaceholder: "+ Add custom item (e.g. Milk)",
    addBtn: "Add",
    addressPlaceholder: "🔍 Enter your address or city in Poland (e.g. Warsaw)...",
    addressSearchBtn: "Search",
    storesHeader: "🏬 Supermarket Prices",
    bestPriceToggle: "💡 Best Value",
    nearestToggle: "📍 Nearest",
    mapHeader: "🗺️ Nearby Supermarkets Map",
    
    diaryTitle: "Food & Nutrition Diary",
    diarySubtitle: "Your scientific calorie and macro balance for today",
    consumedLabel: "of {target} kcal",
    proteinLabel: "Protein",
    fatLabel: "Fats",
    carbsLabel: "Carbs",
    mealsHeader: "Today's Meals",
    calcHeader: "🧮 Scientific BMR & TDEE Calculator (Mifflin-St Jeor)",
    calcDesc: "Mifflin-St Jeor formula for accurate daily calorie target",
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
    calcTdeeLabel: "Total Expenditure (TDEE):",
    calcTargetLabel: "Daily Calorie Target:",
    calcApplyBtn: "🎯 Apply Target to Diary",
    mealBreakfast: "🌅 Breakfast",
    mealLunch: "☀️ Lunch",
    mealDinner: "🌙 Dinner",
    mealSnack: "🍎 Snack",
    addMealBtn: "➕ Add Meal",

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
    shoppingSubtitle: "Oblicz koszt produktów i wybierz najkorzystniejszy supermarkety",
    shoppingCartHeader: " Lista Zakupów",
    tabComparison: "🛒 Porównanie cen",
    tabDeals: "🔥 Wyjątkowe Promocje",
    addToCartBtn: "➕ Dodaj do listy zakupów",
    validUntilPrefix: "⏰ Okazja do:",
    clearCartBtn: "Wyczyść",
    servingsLabel: "Liczba porcji:",
    addCustomPlaceholder: "+ Dodaj własny produkt (np. Mleko)",
    addBtn: "Dodaj",
    addressPlaceholder: "🔍 Wpisz swój adres lub miasto w Polsce (np. Warszawa)...",
    addressSearchBtn: "Szukaj",
    storesHeader: "🏬 Ceny w Supermarketach",
    bestPriceToggle: "💡 Najtaniej",
    nearestToggle: "📍 Najbliżej",
    mapHeader: "🗺️ Mapa pobliskich sklepów",
    
    diaryTitle: "Dziennik Odżywiania",
    diarySubtitle: "Twój naukowy bilans kalorii i składników odżywczych na dziś",
    consumedLabel: "z {target} kcal",
    proteinLabel: "Białka",
    fatLabel: "Tłuszcze",
    carbsLabel: "Węglowodany",
    mealsHeader: "Dzisiejsze posiłki",
    calcHeader: "🧮 Naukowy Kalkulator BMR & TDEE (Mifflin-St Jeor)",
    calcDesc: "Wzór Mifflina-St Jeora do dokładnego obliczenia dziennego zapotrzebowania",
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
    mealBreakfast: "🌅 Śniadanie",
    mealLunch: "☀️ Obiad",
    mealDinner: "🌙 Kolacja",
    mealSnack: "🍎 Przekąska",
    addMealBtn: "➕ Dodaj posiłek",

    navRecipes: "Przepisy",
    navScanner: "Skaner",
    navShopping: "Zakupy",
    navDiary: "Dziennik"
  }
};
