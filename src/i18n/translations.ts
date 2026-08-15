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
  scanValueHeader: string;
  addDiaryBtn: string;
  
  // Shopping
  shoppingTitle: string;
  shoppingSubtitle: string;
  shoppingCartHeader: string;
  clearCartBtn: string;
  servingsLabel: string;
  addCustomPlaceholder: string;
  addBtn: string;
  storesHeader: string;
  bestPriceToggle: string;
  nearestToggle: string;
  mapHeader: string;
  
  // Diary
  diaryTitle: string;
  diarySubtitle: string;
  consumedLabel: string;
  proteinLabel: string;
  fatLabel: string;
  carbsLabel: string;
  mealsHeader: string;

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
    scanValueHeader: "Состав и пищевая ценность:",
    addDiaryBtn: "➕ Внести калории в Дневник Питания",
    
    shoppingTitle: "Список покупок & Магазины",
    shoppingSubtitle: "Рассчитайте стоимость продуктов и выберите выгодный супермаркет",
    shoppingCartHeader: " Ингредиенты к покупке",
    clearCartBtn: "Очистить",
    servingsLabel: "Количество порций:",
    addCustomPlaceholder: "+ Добавить свой продукт (напр. Молоко)",
    addBtn: "Добавить",
    storesHeader: "🏬 Цены в супермаркетах",
    bestPriceToggle: "💡 Выгода",
    nearestToggle: "📍 Ближайший",
    mapHeader: "🗺️ Карта супермаркетов поблизости",
    
    diaryTitle: "Дневник питания",
    diarySubtitle: "Ваш баланс калорий и питательных веществ на сегодня",
    consumedLabel: "из 2 200 ккал",
    proteinLabel: "Белки",
    fatLabel: "Жиры",
    carbsLabel: "Углеводы",
    mealsHeader: "Приёмы пищи сегодня",

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
    scanValueHeader: "Nutrition & Composition:",
    addDiaryBtn: "➕ Add Calories to Food Diary",
    
    shoppingTitle: "Shopping List & Stores",
    shoppingSubtitle: "Calculate ingredient cost & find the best nearby supermarket",
    shoppingCartHeader: " Shopping List",
    clearCartBtn: "Clear",
    servingsLabel: "Number of servings:",
    addCustomPlaceholder: "+ Add custom item (e.g. Milk)",
    addBtn: "Add",
    storesHeader: "🏬 Supermarket Prices",
    bestPriceToggle: "💡 Best Value",
    nearestToggle: "📍 Nearest",
    mapHeader: "🗺️ Nearby Supermarkets Map",
    
    diaryTitle: "Food Diary",
    diarySubtitle: "Your calorie and nutrient balance today",
    consumedLabel: "of 2,200 kcal",
    proteinLabel: "Protein",
    fatLabel: "Fats",
    carbsLabel: "Carbs",
    mealsHeader: "Today's Meals",

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
    scanValueHeader: "Wartość odżywcza i skład:",
    addDiaryBtn: "➕ Dodaj Kalorie do Dziennika",
    
    shoppingTitle: "Lista Zakupów i Sklepy",
    shoppingSubtitle: "Oblicz koszt produktów i wybierz najkorzystniejszy supermarkety",
    shoppingCartHeader: " Lista Zakupów",
    clearCartBtn: "Wyczyść",
    servingsLabel: "Liczba porcji:",
    addCustomPlaceholder: "+ Dodaj własny produkt (np. Mleko)",
    addBtn: "Dodaj",
    storesHeader: "🏬 Ceny w Supermarketach",
    bestPriceToggle: "💡 Najtaniej",
    nearestToggle: "📍 Najbliżej",
    mapHeader: "🗺️ Mapa pobliskich sklepów",
    
    diaryTitle: "Dziennik Odżywiania",
    diarySubtitle: "Twój bilans kalorii i składników odżywczych na dziś",
    consumedLabel: "z 2 200 kcal",
    proteinLabel: "Białka",
    fatLabel: "Tłuszcze",
    carbsLabel: "Węglowodany",
    mealsHeader: "Dzisiejsze posiłki",

    navRecipes: "Przepisy",
    navScanner: "Skaner",
    navShopping: "Zakupy",
    navDiary: "Dziennik"
  }
};
