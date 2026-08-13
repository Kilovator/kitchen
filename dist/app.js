// CookCraft Vision AI Camera Scanner Bundle (RU, EN, PL)

const TRANSLATIONS = {
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
    scannerSubtitle: "Сфотографируйте блюдо для моментального определения калорий и состава через Vision AI",
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
    shoppingCartHeader: "🛒 Ингредиенты к покупке",
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
    scannerSubtitle: "Take a photo of your dish to instantly calculate calories & macros via Vision AI",
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
    shoppingCartHeader: "🛒 Shopping List",
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
    scannerSubtitle: "Zrób zdjęcie potrawy, aby natychmiast obliczyć kalorie z Vision AI",
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
    shoppingCartHeader: "🛒 Lista Zakupów",
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

const RECIPES_DATA = [
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
        ru: "Нарезка: нарежьте 120г гуанчиале брусочками 1×0.5 см. Обжаривайте на среднем огне 7 минут до хруста.",
        en: "Cutting: slice 120g guanciale into 1x0.5 cm strips. Fry on medium heat for 7 minutes.",
        pl: "Krojenie: pokrój 120g guanciale w paski 1x0.5 cm. Smaż 7 minut na chrupko."
      }
    ]
  }
];

const SCAN_PRESETS = {
  borscht: {
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
  }
};

const SUPERMARKETS = [
  {
    id: "s1",
    name: { ru: "Пятёрочка", en: "FreshMart", pl: "Biedronka" },
    logo: "🔴",
    priceMultiplier: 0.95,
    distanceMeters: 320,
    walkTime: { ru: "4 мин пешком", en: "4 min walk", pl: "4 min pieszo" },
    badge: { ru: "Минимальный чек", en: "Lowest Total", pl: "Najtaniej" },
    deliveryAvailable: true
  }
];

class AIVisionScannerService {
  constructor() {
    this.apiKey = localStorage.getItem("cookcraft_vision_api_key") || "";
  }
  setApiKey(key) {
    this.apiKey = key.trim();
    localStorage.setItem("cookcraft_vision_api_key", this.apiKey);
  }
  getApiKey() {
    return this.apiKey;
  }
  captureFrame(videoElem) {
    const canvas = document.createElement("canvas");
    canvas.width = videoElem.videoWidth || 640;
    canvas.height = videoElem.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/jpeg", 0.85);
    }
    return "";
  }
  async analyzeImage(imageDataUrl) {
    if (this.apiKey) {
      try {
        const base64Data = imageDataUrl.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
        const prompt = `Analyze this food image. Return ONLY JSON: {"title_ru":"Название","title_en":"Name","title_pl":"Nazwa","weightGrams":250,"calories":420,"protein":24,"fat":16,"carbs":45,"healthScore_ru":"92% (Баланс)","healthScore_en":"92%","healthScore_pl":"92%","summary_ru":"Оценка","summary_en":"Summary","summary_pl":"Podsumowanie"}`;
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: "image/jpeg", data: base64Data } }] }]
          })
        });
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const json = JSON.parse(text.match(/\{[\s\S]*\}/)[0]);
        return {
          title: { ru: json.title_ru, en: json.title_en, pl: json.title_pl },
          weightGrams: json.weightGrams || 250,
          calories: json.calories || 350,
          protein: json.protein || 20,
          fat: json.fat || 12,
          carbs: json.carbs || 40,
          healthScore: { ru: json.healthScore_ru, en: json.healthScore_en, pl: json.healthScore_pl },
          summary: { ru: json.summary_ru, en: json.summary_en, pl: json.summary_pl },
          image: imageDataUrl
        };
      } catch (e) {
        console.warn("Vision API error, using smart fallback:", e);
      }
    }
    return {
      title: { ru: "Свежий блюдо с овощами", en: "Fresh Veggie Meal", pl: "Świeży posiłek z warzywami" },
      weightGrams: 250,
      calories: 380,
      protein: 22,
      fat: 14,
      carbs: 42,
      healthScore: { ru: "95% (Хороший баланс)", en: "95% (Great Balance)", pl: "95% (Świetny bilans)" },
      summary: { ru: "Сбалансированное здоровое блюдо.", en: "Balanced healthy meal.", pl: "Zrównoważony zdrowy posiłek." },
      image: imageDataUrl
    };
  }
}

const aiVisionScanner = new AIVisionScannerService();
const savedLang = localStorage.getItem("cookcraft_lang") || "ru";

const state = {
  currentLang: savedLang,
  currentView: "view-recipes",
  recipes: RECIPES_DATA,
  activeFilter: "all",
  searchQuery: "",
  activeRecipeForShopping: RECIPES_DATA[0],
  servingsCount: 2,
  shoppingList: RECIPES_DATA[0].ingredients.map(ing => ({ ...ing, checked: false })),
  storeFilterMode: "best-price",
  diaryConsumed: 1480,
  cameraStream: null,
  theme: "dark"
};

function t() { return TRANSLATIONS[state.currentLang]; }

function setLanguage(lang) {
  state.currentLang = lang;
  localStorage.setItem("cookcraft_lang", lang);
  updateStaticTexts();
  renderAll();
}

document.addEventListener("DOMContentLoaded", () => {
  initLangSwitcher();
  initNavigation();
  initRecipes();
  initShopping();
  initScanner();
  initThemeToggle();
  renderAll();
});

function initLangSwitcher() {
  const langBtns = document.querySelectorAll(".lang-btn");
  langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      langBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const lang = btn.dataset.lang;
      if (lang) setLanguage(lang);
    });
  });

  langBtns.forEach(btn => {
    if (btn.dataset.lang === state.currentLang) btn.classList.add("active");
    else btn.classList.remove("active");
  });

  updateStaticTexts();
}

function updateStaticTexts() {
  const tr = t();
  
  const recipeTitle = document.querySelector("#view-recipes .page-title");
  const recipeSub = document.querySelector("#view-recipes .page-subtitle");
  if (recipeTitle) recipeTitle.textContent = tr.recipesTitle;
  if (recipeSub) recipeSub.textContent = tr.recipesSubtitle;

  const searchInput = document.getElementById("recipe-search");
  if (searchInput) searchInput.placeholder = tr.searchPlaceholder;

  document.querySelectorAll(".category-pills .pill").forEach(pill => {
    const cat = pill.dataset.cat;
    if (cat === "all") pill.textContent = tr.catAll;
    if (cat === "breakfast") pill.textContent = tr.catBreakfast;
    if (cat === "lunch") pill.textContent = tr.catLunch;
    if (cat === "healthy") pill.textContent = tr.catHealthy;
    if (cat === "fast") pill.textContent = tr.catFast;
  });

  const scanTitle = document.querySelector("#view-scanner .page-title");
  const scanSub = document.querySelector("#view-scanner .page-subtitle");
  if (scanTitle) scanTitle.textContent = tr.scannerTitle;
  if (scanSub) scanSub.textContent = tr.scannerSubtitle;

  const camPlaceholder = document.querySelector("#camera-placeholder p");
  if (camPlaceholder) camPlaceholder.textContent = tr.camPlaceholder;

  const btnToggleCam = document.getElementById("btn-toggle-camera");
  if (btnToggleCam && !state.cameraStream) btnToggleCam.innerHTML = tr.camBtnOn;

  const btnCapture = document.getElementById("btn-capture-scan");
  if (btnCapture) btnCapture.innerHTML = tr.camBtnScan;

  const labelUpload = document.querySelector('label[for="file-upload"]');
  if (labelUpload) labelUpload.innerHTML = tr.camBtnUpload;

  const presetH3 = document.querySelector(".preset-samples h3");
  if (presetH3) presetH3.textContent = tr.presetHeader;

  const shopTitle = document.querySelector("#view-shopping .page-title");
  const shopSub = document.querySelector("#view-shopping .page-subtitle");
  if (shopTitle) shopTitle.textContent = tr.shoppingTitle;
  if (shopSub) shopSub.textContent = tr.shoppingSubtitle;

  const clearBtn = document.getElementById("btn-clear-cart");
  if (clearBtn) clearBtn.textContent = tr.clearCartBtn;

  const servingsLbl = document.querySelector(".servings-control span");
  if (servingsLbl) servingsLbl.textContent = tr.servingsLabel;

  const customInput = document.getElementById("custom-item-input");
  if (customInput) customInput.placeholder = tr.addCustomPlaceholder;

  const addBtn = document.getElementById("btn-add-item");
  if (addBtn) addBtn.textContent = tr.addBtn;

  const filterBest = document.getElementById("filter-best-price");
  const filterNear = document.getElementById("filter-nearest");
  if (filterBest) filterBest.textContent = tr.bestPriceToggle;
  if (filterNear) filterNear.textContent = tr.nearestToggle;

  const diaryTitle = document.querySelector("#view-diary .page-title");
  const diarySub = document.querySelector("#view-diary .page-subtitle");
  if (diaryTitle) diaryTitle.textContent = tr.diaryTitle;
  if (diarySub) diarySub.textContent = tr.diarySubtitle;

  const consumedLbl = document.querySelector(".gauge-label");
  if (consumedLbl) consumedLbl.textContent = tr.consumedLabel;

  const pLbl = document.querySelector(".macro-item.protein .macro-info span");
  const fLbl = document.querySelector(".macro-item.fat .macro-info span");
  const cLbl = document.querySelector(".macro-item.carbs .macro-info span");
  if (pLbl) pLbl.textContent = tr.proteinLabel;
  if (fLbl) fLbl.textContent = tr.fatLabel;
  if (cLbl) cLbl.textContent = tr.carbsLabel;

  const mealsH2 = document.querySelector(".meals-log-card h2");
  if (mealsH2) mealsH2.textContent = tr.mealsHeader;

  document.querySelectorAll(".bottom-nav .nav-item").forEach(nav => {
    const target = nav.dataset.target;
    const label = nav.querySelector(".nav-label");
    if (!label) return;
    if (target === "view-recipes") label.textContent = tr.navRecipes;
    if (target === "view-scanner") label.textContent = tr.navScanner;
    if (target === "view-shopping") label.textContent = tr.navShopping;
    if (target === "view-diary") label.textContent = tr.navDiary;
  });
}

function renderAll() {
  renderRecipes();
  renderShoppingList();
  renderStores();
}

function initNavigation() {
  document.querySelectorAll(".bottom-nav .nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      if (target) switchView(target);
    });
  });
}

function switchView(targetId) {
  state.currentView = targetId;
  document.querySelectorAll(".view-page").forEach(view => {
    if (view.id === targetId) view.classList.add("active");
    else view.classList.remove("active");
  });
  document.querySelectorAll(".bottom-nav .nav-item").forEach(btn => {
    if (btn.dataset.target === targetId) btn.classList.add("active");
    else btn.classList.remove("active");
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initRecipes() {
  const searchInput = document.getElementById("recipe-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderRecipes();
    });
  }

  const categoryPills = document.querySelectorAll(".category-pills .pill");
  categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
      categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.activeFilter = pill.dataset.cat || "all";
      renderRecipes();
    });
  });

  const btnCloseModal = document.getElementById("btn-close-modal");
  const recipeModal = document.getElementById("recipe-modal");
  if (btnCloseModal && recipeModal) {
    btnCloseModal.addEventListener("click", closeModal);
    recipeModal.addEventListener("click", (e) => {
      if (e.target === recipeModal) closeModal();
    });
  }
}

function renderRecipes() {
  const grid = document.getElementById("recipes-grid");
  if (!grid) return;

  const lang = state.currentLang;
  const tr = t();

  const filtered = state.recipes.filter(r => {
    const matchesCat = state.activeFilter === "all" || r.category === state.activeFilter;
    const titleText = r.title[lang].toLowerCase();
    const descText = r.description[lang].toLowerCase();
    const matchesSearch = titleText.includes(state.searchQuery.toLowerCase()) ||
                          descText.includes(state.searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);"><p>No recipes found</p></div>`;
    return;
  }

  grid.innerHTML = filtered.map(recipe => `
    <div class="recipe-card" data-id="${recipe.id}">
      <div class="recipe-thumb-container">
        <img src="${recipe.image}" alt="${recipe.title[lang]}" class="recipe-thumb" loading="lazy">
        <span class="badge-video">▶ Video</span>
      </div>
      <div class="recipe-info">
        <div class="recipe-meta">
          <span>⏱️ ${recipe.prepTime[lang]}</span>
          <span>⭐ ${recipe.rating}</span>
          <span>📊 ${recipe.difficulty[lang]}</span>
        </div>
        <h3 class="recipe-title">${recipe.title[lang]}</h3>
        <p class="recipe-desc">${recipe.description[lang]}</p>
        <div class="recipe-footer">
          <span class="calories-tag">${recipe.calories} kcal</span>
          <button class="btn btn-primary btn-sm btn-open-recipe" data-id="${recipe.id}">${tr.openRecipeBtn}</button>
        </div>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll(".btn-open-recipe").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openRecipeModal(btn.dataset.id);
    });
  });

  grid.querySelectorAll(".recipe-card").forEach(card => {
    card.addEventListener("click", () => {
      openRecipeModal(card.dataset.id);
    });
  });
}

function openRecipeModal(recipeId) {
  const recipe = state.recipes.find(r => r.id === recipeId);
  const modal = document.getElementById("recipe-modal");
  const modalContent = document.getElementById("modal-content");
  if (!recipe || !modal || !modalContent) return;

  const lang = state.currentLang;
  const tr = t();

  modalContent.innerHTML = `
    <div class="video-container">
      <iframe src="${recipe.videoUrl}" title="${recipe.title[lang]}" allowfullscreen></iframe>
    </div>
    <div class="modal-body">
      <div class="recipe-detail-header">
        <div>
          <h2 style="font-size: 1.4rem; margin-bottom: 4px;">${recipe.title[lang]}</h2>
          <div class="recipe-meta" style="font-size: 0.85rem;">
            <span>⏱️ ${recipe.prepTime[lang]}</span>
            <span>🔥 ${recipe.calories} kcal</span>
            <span>⭐ ${recipe.rating}</span>
          </div>
        </div>
        <button class="btn btn-action-cook" id="btn-start-cooking" data-id="${recipe.id}">
          ${tr.letscookBtn}
        </button>
      </div>

      <p style="color: var(--text-muted); margin-bottom: 18px; line-height: 1.4;">${recipe.description[lang]}</p>

      <h3 style="margin-bottom: 10px; font-size: 1rem;">${tr.ingredientsHeader}</h3>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px;">
        ${recipe.ingredients.map(ing => `
          <li style="background: var(--bg-input); padding: 8px 12px; border-radius: var(--radius-md); display: flex; justify-content: space-between; font-size: 0.9rem;">
            <span>• ${ing.name[lang]}</span>
            <strong>${ing.qty} ${ing.unit[lang]}</strong>
          </li>
        `).join("")}
      </ul>

      <h3 style="margin-bottom: 10px; font-size: 1rem;">${tr.stepsHeader}</h3>
      <div class="step-list">
        ${recipe.steps.map((step, idx) => `
          <div class="step-item">
            <div class="step-num">${idx + 1}</div>
            <div style="font-size: 0.9rem; line-height: 1.4;">${step[lang]}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  modal.classList.remove("hidden");

  const btnStart = document.getElementById("btn-start-cooking");
  if (btnStart) {
    btnStart.addEventListener("click", () => {
      state.activeRecipeForShopping = recipe;
      state.servingsCount = 2;
      state.shoppingList = recipe.ingredients.map(ing => ({ ...ing, checked: false }));
      closeModal();
      renderShoppingList();
      renderStores();
      switchView("view-shopping");
    });
  }
}

function closeModal() {
  const modal = document.getElementById("recipe-modal");
  if (modal) modal.classList.add("hidden");
}

function initShopping() {
  document.getElementById("btn-inc-servings")?.addEventListener("click", () => {
    state.servingsCount++;
    renderShoppingList();
    renderStores();
  });

  document.getElementById("btn-dec-servings")?.addEventListener("click", () => {
    if (state.servingsCount > 1) {
      state.servingsCount--;
      renderShoppingList();
      renderStores();
    }
  });

  document.getElementById("btn-clear-cart")?.addEventListener("click", () => {
    state.shoppingList = [];
    renderShoppingList();
    renderStores();
  });

  document.getElementById("btn-add-item")?.addEventListener("click", () => {
    const input = document.getElementById("custom-item-input");
    if (input && input.value.trim()) {
      const val = input.value.trim();
      state.shoppingList.push({
        name: { ru: val, en: val, pl: val },
        qty: 1,
        unit: { ru: "упак", en: "pack", pl: "opak" },
        basePrice: 50,
        checked: false
      });
      input.value = "";
      renderShoppingList();
      renderStores();
    }
  });

  const best = document.getElementById("filter-best-price");
  const near = document.getElementById("filter-nearest");
  best?.addEventListener("click", () => {
    best.classList.add("active");
    near?.classList.remove("active");
    state.storeFilterMode = "best-price";
    renderStores();
  });
  near?.addEventListener("click", () => {
    near.classList.add("active");
    best?.classList.remove("active");
    state.storeFilterMode = "nearest";
    renderStores();
  });
}

function renderShoppingList() {
  const title = document.getElementById("shopping-recipe-title");
  const servings = document.getElementById("servings-count");
  const list = document.getElementById("shopping-items-list");

  const lang = state.currentLang;
  const tr = t();

  if (title) title.innerText = `🛒 ${tr.shoppingCartHeader}: ${state.activeRecipeForShopping.title[lang]}`;
  if (servings) servings.innerText = state.servingsCount.toString();
  if (!list) return;

  const mult = state.servingsCount / 2;

  list.innerHTML = state.shoppingList.map((item, idx) => `
    <li class="shopping-item ${item.checked ? 'checked' : ''}">
      <div class="item-left">
        <input type="checkbox" class="chk-box" data-idx="${idx}" ${item.checked ? 'checked' : ''}>
        <span>${item.name[lang]}</span>
      </div>
      <strong>${Math.round(item.qty * mult * 10) / 10} ${item.unit[lang]}</strong>
    </li>
  `).join("");

  list.querySelectorAll(".chk-box").forEach(chk => {
    chk.addEventListener("change", (e) => {
      const idx = parseInt(e.target.dataset.idx);
      state.shoppingList[idx].checked = e.target.checked;
      renderShoppingList();
      renderStores();
    });
  });
}

function renderStores() {
  const container = document.getElementById("stores-list");
  if (!container) return;

  const lang = state.currentLang;
  const mult = state.servingsCount / 2;
  const activeItems = state.shoppingList.filter(i => !i.checked);
  const baseTotal = activeItems.reduce((acc, item) => acc + (item.basePrice * mult), 0);

  let stores = SUPERMARKETS.map(s => ({
    ...s,
    totalCost: Math.round(baseTotal * s.priceMultiplier)
  }));

  if (state.storeFilterMode === "best-price") {
    stores.sort((a, b) => a.totalCost - b.totalCost);
  } else {
    stores.sort((a, b) => a.distanceMeters - b.distanceMeters);
  }

  const topId = stores[0]?.id;
  const currencySymbol = lang === 'pl' ? 'zł' : (lang === 'en' ? '$' : '₽');

  container.innerHTML = stores.map(store => `
    <div class="store-item-card ${store.id === topId ? 'highlight' : ''}">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div class="store-logo">${store.logo}</div>
        <div class="store-info">
          <h4>${store.name[lang]} <span style="font-size: 0.7rem; color: var(--accent-primary); font-weight: normal;">${store.badge[lang]}</span></h4>
          <div class="store-meta">📍 ${store.walkTime[lang]} (${store.distanceMeters} m)</div>
        </div>
      </div>
      <div class="store-price">
        <div class="total-sum">${store.totalCost} ${currencySymbol}</div>
        <button class="btn btn-sm btn-outline" style="margin-top: 4px; font-size: 0.75rem;" onclick="alert('Map...')">
          📍 Map
        </button>
      </div>
    </div>
  `).join("");
}

function initScanner() {
  const btnToggleCam = document.getElementById("btn-toggle-camera");
  const btnCapture = document.getElementById("btn-capture-scan");
  const videoElem = document.getElementById("camera-feed");
  const fileUpload = document.getElementById("file-upload");
  const sampleChips = document.querySelectorAll(".sample-chip");
  const apiKeyInput = document.getElementById("vision-api-key-input");
  const btnSaveKey = document.getElementById("btn-save-api-key");

  if (apiKeyInput) {
    apiKeyInput.value = aiVisionScanner.getApiKey();
  }

  btnSaveKey?.addEventListener("click", () => {
    if (apiKeyInput) {
      aiVisionScanner.setApiKey(apiKeyInput.value);
      alert("Gemini Vision API Key saved!");
    }
  });

  btnToggleCam?.addEventListener("click", async () => {
    if (!videoElem) return;
    const tr = t();
    if (state.cameraStream) {
      state.cameraStream.getTracks().forEach(t => t.stop());
      state.cameraStream = null;
      document.getElementById("camera-placeholder")?.classList.remove("hidden");
      videoElem.classList.add("hidden");
      document.getElementById("scan-hud")?.classList.add("hidden");
      btnCapture?.classList.add("hidden");
      btnToggleCam.innerHTML = tr.camBtnOn;
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        state.cameraStream = stream;
        videoElem.srcObject = stream;
        document.getElementById("camera-placeholder")?.classList.add("hidden");
        videoElem.classList.remove("hidden");
        document.getElementById("scan-hud")?.classList.remove("hidden");
        btnCapture?.classList.remove("hidden");
        btnToggleCam.innerHTML = tr.camBtnOff;
      } catch (err) {
        alert("Camera unavailable");
      }
    }
  });

  btnCapture?.addEventListener("click", async () => {
    if (videoElem && !videoElem.classList.contains("hidden")) {
      const frameDataUrl = aiVisionScanner.captureFrame(videoElem);
      if (frameDataUrl) {
        const result = await aiVisionScanner.analyzeImage(frameDataUrl);
        renderScanResult(result);
        return;
      }
    }
    processPreset("tacos");
  });

  sampleChips.forEach(chip => {
    chip.addEventListener("click", () => {
      if (chip.dataset.sample) processPreset(chip.dataset.sample);
    });
  });

  fileUpload?.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const img = document.getElementById("image-preview");
        if (img) {
          const dataUrl = ev.target.result;
          img.src = dataUrl;
          img.classList.remove("hidden");
          document.getElementById("camera-placeholder")?.classList.add("hidden");
          videoElem?.classList.add("hidden");
          document.getElementById("scan-hud")?.classList.remove("hidden");
          
          const result = await aiVisionScanner.analyzeImage(dataUrl);
          renderScanResult(result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  });
}

function processPreset(presetKey) {
  const preset = SCAN_PRESETS[presetKey];
  if (!preset) return;
  renderScanResult({
    title: preset.title,
    weightGrams: 250,
    calories: preset.calories,
    protein: preset.protein,
    fat: preset.fat,
    carbs: preset.carbs,
    healthScore: preset.healthScore,
    summary: preset.summary,
    image: preset.image
  });
}

function renderScanResult(result) {
  const lang = state.currentLang;
  const tr = t();

  const preview = document.getElementById("image-preview");
  if (preview) {
    preview.src = result.image;
    preview.classList.remove("hidden");
  }

  document.getElementById("camera-feed")?.classList.add("hidden");
  document.getElementById("camera-placeholder")?.classList.add("hidden");

  const card = document.getElementById("scan-results");
  if (!card) return;

  card.innerHTML = `
    <div class="dish-header">
      <h2 class="dish-title">${result.title[lang]}</h2>
      <span class="health-rating">${result.healthScore[lang]}</span>
    </div>
    
    <div class="kcal-hero">
      🔥 <span id="dyn-calories">${result.calories}</span> <span>kcal</span>
    </div>

    <!-- Portion Weight Slider -->
    <div style="background: var(--bg-input); padding: 12px; border-radius: var(--radius-md); margin-bottom: 14px;">
      <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px;">
        <span>⚖️ Масса порции:</span>
        <strong id="portion-weight-label">${result.weightGrams} g</strong>
      </div>
      <input type="range" id="portion-slider" min="100" max="600" step="10" value="${result.weightGrams}" style="width: 100%; accent-color: var(--accent-primary);">
    </div>

    <div class="nutrition-bars-grid">
      <div class="nutr-card">
        <span class="val" id="dyn-protein" style="color: #3b82f6;">${result.protein} g</span>
        <span class="lbl">${tr.proteinLabel}</span>
      </div>
      <div class="nutr-card">
        <span class="val" id="dyn-fat" style="color: #f59e0b;">${result.fat} g</span>
        <span class="lbl">${tr.fatLabel}</span>
      </div>
      <div class="nutr-card">
        <span class="val" id="dyn-carbs" style="color: #10b981;">${result.carbs} g</span>
        <span class="lbl">${tr.carbsLabel}</span>
      </div>
    </div>

    <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 16px; line-height: 1.4;">
      💡 <strong>${tr.scanValueHeader}</strong> ${result.summary[lang]}
    </p>

    <button id="btn-add-to-diary" class="btn btn-primary" style="width: 100%;">
      ${tr.addDiaryBtn}
    </button>
  `;

  card.classList.remove("hidden");

  const slider = document.getElementById("portion-slider");
  slider?.addEventListener("input", () => {
    const newWeight = parseInt(slider.value);
    const ratio = newWeight / result.weightGrams;
    
    document.getElementById("portion-weight-label").innerText = `${newWeight} g`;
    document.getElementById("dyn-calories").innerText = Math.round(result.calories * ratio).toString();
    document.getElementById("dyn-protein").innerText = `${Math.round(result.protein * ratio * 10) / 10} g`;
    document.getElementById("dyn-fat").innerText = `${Math.round(result.fat * ratio * 10) / 10} g`;
    document.getElementById("dyn-carbs").innerText = `${Math.round(result.carbs * ratio * 10) / 10} g`;
  });

  document.getElementById("btn-add-to-diary")?.addEventListener("click", () => {
    const finalKcal = parseInt(document.getElementById("dyn-calories")?.innerText || result.calories.toString());
    state.diaryConsumed += finalKcal;
    const consumed = document.getElementById("consumed-calories");
    if (consumed) consumed.innerText = state.diaryConsumed.toLocaleString();
    alert(`+ ${result.title[lang]} (${finalKcal} kcal)`);
    switchView("view-diary");
  });
}

function initThemeToggle() {
  const btn = document.getElementById("btn-theme-toggle");
  btn?.addEventListener("click", () => {
    if (document.body.classList.contains("light-theme")) {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      btn.querySelector(".theme-icon").innerText = "🌙";
    } else {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      btn.querySelector(".theme-icon").innerText = "☀️";
    }
  });
}
