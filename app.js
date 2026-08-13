/* ==========================================================================
   Kitchhi App Logic & Interactive Features
   ========================================================================== */

// --- Recipe Dataset ---
const RECIPES_DATA = [
  {
    id: "borscht",
    title: "Борщ украинский с говядиной",
    category: "lunch",
    prepTime: "60 мин",
    calories: 380,
    rating: 4.9,
    difficulty: "Средне",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U", // Sample video embed
    description: "Классический наваристый борщ со свеклой, свежей капустой и говяжьим грудинкой.",
    ingredients: [
      { name: "Говядина на кости", qty: 400, unit: "г", basePrice: 380 },
      { name: "Свекла свежая", qty: 2, unit: "шт", basePrice: 45 },
      { name: "Капуста белокочанная", qty: 300, unit: "г", basePrice: 35 },
      { name: "Картофель", qty: 3, unit: "шт", basePrice: 30 },
      { name: "Морковь", qty: 1, unit: "шт", basePrice: 20 },
      { name: "Лук репчатый", qty: 1, unit: "шт", basePrice: 15 },
      { name: "Томатная паста", qty: 2, unit: "ст.л.", basePrice: 40 },
      { name: "Сметана 20%", qty: 1, unit: "банка", basePrice: 85 }
    ],
    steps: [
      "Сварите бульон из говядины в течение 1.5 часов, снимая пену.",
      "Нашинкуйте капусту, нарежьте картофель кубиками и добавьте в бульон.",
      "Натрите свеклу и морковь, обжарьте на сковороде с томатной пастой и чесноком.",
      "Переложите зажарку в кастрюлю, варите еще 10 минут на медленном огне.",
      "Подавайте горячим со сметаной и свежей зеленью."
    ]
  },
  {
    id: "avocado_toast",
    title: "Авокадо-тост с яйцом пашот",
    category: "breakfast",
    prepTime: "12 мин",
    calories: 290,
    rating: 4.8,
    difficulty: "Легко",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/5-9M4d23q0U",
    description: "Сытный и полезный завтрак с хрустящим таршином, кремовым спелым авокадо и жидким желтком.",
    ingredients: [
      { name: "Хлеб зерновой / Таршин", qty: 2, unit: "куска", basePrice: 55 },
      { name: "Авокадо Хасс спелое", qty: 1, unit: "шт", basePrice: 120 },
      { name: "Яйцо куриное С0", qty: 2, unit: "шт", basePrice: 30 },
      { name: "Семга слабосоленая", qty: 50, unit: "г", basePrice: 160 },
      { name: "Лимонный сок", qty: 1, unit: "ч.л.", basePrice: 15 }
    ],
    steps: [
      "Обжарьте ломтики хлеба на сухой сковороде до золотистой корочки.",
      "Разройте авокадо вилкой с добавлением лимонного сока, соли и перца.",
      "Сварите яйцо пашот в слегка кипящей воде со щепоткой уксуса (3 минуты).",
      "Выложите авокадо и яйцо на тост. Украсьте ломтиками лосьона и семенами кунжута."
    ]
  },
  {
    id: "salmon_bowl",
    title: "Поке боул с лососем и киноа",
    category: "healthy",
    prepTime: "20 мин",
    calories: 440,
    rating: 4.95,
    difficulty: "Легко",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Сбалансированное гавайское блюдо с лососем, киноа, огурцом, чукой и соусом спайси.",
    ingredients: [
      { name: "Филе лосося свежее", qty: 150, unit: "г", basePrice: 320 },
      { name: "Киноа / Рис для суши", qty: 100, unit: "г", basePrice: 60 },
      { name: "Огурец свежий", qty: 1, unit: "шт", basePrice: 30 },
      { name: "Чука водоросли", qty: 50, unit: "г", basePrice: 70 },
      { name: "Соевый соус", qty: 2, unit: "ст.л.", basePrice: 25 }
    ],
    steps: [
      "Отварите киноа согласно инструкции на упаковке и остудите.",
      "Нарежьте свежее филе лосося кубиками 1.5х1.5 см.",
      "Нарежьте огурец и авокадо тонкими слайсами.",
      "Собрать боул: основа киноа, по кругу выложить лосось, огурец, чуку. Заправить соевым соусом."
    ]
  },
  {
    id: "pizza",
    title: "Домашняя пицца Пепперони",
    category: "fast",
    prepTime: "25 мин",
    calories: 680,
    rating: 4.7,
    difficulty: "Средне",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: "Хрустящее итальянское тесто, сочные колбаски пепперони и тянущаяся моцарелла.",
    ingredients: [
      { name: "Тесто для пиццы готовое", qty: 1, unit: "упак", basePrice: 90 },
      { name: "Колбаса Пепперони", qty: 100, unit: "г", basePrice: 150 },
      { name: "Сыр Моцарелла", qty: 150, unit: "г", basePrice: 160 },
      { name: "Соус томатный с орегано", qty: 3, unit: "ст.л.", basePrice: 40 }
    ],
    steps: [
      "Раскатайте тесто тонким слоем на противне.",
      "Смажьте томатным соусом и обильно посыпьте натертой моцареллой.",
      "Выложите ломтики пепперони поверх сыра.",
      "Выпекайте при температуре 220°C в течение 12-15 минут."
    ]
  },
  {
    id: "syrniki",
    title: "Пышные Сырники со свежими ягодами",
    category: "breakfast",
    prepTime: "15 мин",
    calories: 340,
    rating: 4.9,
    difficulty: "Легко",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.youtube.com/embed/gL2-11a5q0U",
    description: "Нежнейшие сырники из фермерского творога с румяной корочкой и ванилью.",
    ingredients: [
      { name: "Творог 9%", qty: 400, unit: "г", basePrice: 140 },
      { name: "Яйцо куриное", qty: 1, unit: "шт", basePrice: 15 },
      { name: "Мука пшеничная", qty: 2, unit: "ст.л.", basePrice: 10 },
      { name: "Сахар ванильный", qty: 1, unit: "пачка", basePrice: 15 },
      { name: "Ягоды свежие (малина/клубника)", qty: 100, unit: "г", basePrice: 120 }
    ],
    steps: [
      "Разотрите творог с яйцом, сахаром и щепоткой соли.",
      "Добавьте муку и замесите мягкое нелипкое тесто.",
      "Сформируйте шарики, обваляйте в муке и придайте форму сырников стаканом.",
      "Обжаривайте на среднем огне по 3-4 минуты с каждой стороны до золотистой корочки."
    ]
  }
];

// --- AI Scan Presets Database ---
const SCAN_PRESETS = {
  borscht: {
    title: "Борщ украинский со сметаной",
    calories: 380,
    protein: 22,
    fat: 18,
    carbs: 34,
    healthScore: "95 / 100 (Отличный баланс)",
    summary: "Традиционный суп на мясном бульоне. Богат клетчаткой (свекла, капуста) и белкам. Рекомендуется на обед.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"
  },
  avocado_toast: {
    title: "Авокадо тост с яйцом пашот",
    calories: 290,
    protein: 14,
    fat: 19,
    carbs: 22,
    healthScore: "98 / 100 (Идеальный ПП)",
    summary: "Отличный источник полезных жиров (Омега-9 из авокадо) и лецитина из желтка. Поддерживает энергию на 4+ часа.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80"
  },
  salmon_bowl: {
    title: "Поке с Лососем и Киноа",
    calories: 440,
    protein: 32,
    fat: 16,
    carbs: 45,
    healthScore: "99 / 100 (Суперфуд)",
    summary: "Высокое содержание Омега-3, качественного белка лосося и медленных углеводов киноа. Идеально для спортсменов.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
  },
  pizza: {
    title: "Пицца Пепперони (2 ломтика)",
    calories: 520,
    protein: 20,
    fat: 26,
    carbs: 54,
    healthScore: "65 / 100 (Читмил)",
    summary: "Высокая калорийность и содержание насыщенных жиров. Рекомендуется добавить свежие овощи для баланса.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
  },
  syrniki: {
    title: "Сырники с ягодами и ванилью",
    calories: 340,
    protein: 24,
    fat: 12,
    carbs: 32,
    healthScore: "90 / 100 (Вкусно и полезно)",
    summary: "Богаты кальцием и молочным белком (казеин). Ягоды обеспечивают антиоксиданты и естественную сладость.",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80"
  }
};

// --- Supermarkets Pricing Coefficients ---
const SUPERMARKETS = [
  {
    id: "5ka",
    name: "Пятёрочка",
    logo: "🔴",
    priceMultiplier: 0.95,
    distanceMeters: 320,
    walkTime: "4 мин пешком",
    badge: "💡 Самый дешёвый чек",
    deliveryAvailable: true
  },
  {
    id: "perekrestok",
    name: "Перекрёсток",
    logo: "🟢",
    priceMultiplier: 1.08,
    distanceMeters: 650,
    walkTime: "8 мин пешком",
    badge: "⭐ Шт. ассортимент",
    deliveryAvailable: true
  },
  {
    id: "vkusvill",
    name: "ВкусВилл",
    logo: "🌿",
    priceMultiplier: 1.25,
    distanceMeters: 450,
    walkTime: "5 мин пешком",
    badge: "📍 Ближайший эко-магазин",
    deliveryAvailable: true
  },
  {
    id: "lenta",
    name: "Лента Гипер",
    logo: "🟡",
    priceMultiplier: 0.90,
    distanceMeters: 1200,
    walkTime: "15 мин на авто",
    badge: "🏷️ Оптовая выгода",
    deliveryAvailable: true
  }
];

// --- App State ---
const state = {
  currentView: "view-recipes",
  recipes: RECIPES_DATA,
  activeFilter: "all",
  searchQuery: "",
  activeRecipeForShopping: RECIPES_DATA[0],
  servingsCount: 2,
  shoppingList: RECIPES_DATA[0].ingredients.map(ing => ({ ...ing, checked: false })),
  storeFilterMode: "best-price", // 'best-price' or 'nearest'
  diaryConsumed: 1480,
  cameraStream: null,
  theme: "dark"
};

// --- DOM Elements ---
const DOM = {
  views: document.querySelectorAll(".view-page"),
  navButtons: document.querySelectorAll(".nav-item"),
  recipesGrid: document.getElementById("recipes-grid"),
  recipeSearch: document.getElementById("recipe-search"),
  categoryPills: document.querySelectorAll(".category-pills .pill"),
  recipeModal: document.getElementById("recipe-modal"),
  modalContent: document.getElementById("modal-content"),
  btnCloseModal: document.getElementById("btn-close-modal"),
  
  // Camera Scanner
  cameraFeed: document.getElementById("camera-feed"),
  imagePreview: document.getElementById("image-preview"),
  cameraPlaceholder: document.getElementById("camera-placeholder"),
  scanHud: document.getElementById("scan-hud"),
  btnToggleCamera: document.getElementById("btn-toggle-camera"),
  btnCaptureScan: document.getElementById("btn-capture-scan"),
  fileUpload: document.getElementById("file-upload"),
  sampleChips: document.querySelectorAll(".sample-chip"),
  scanResults: document.getElementById("scan-results"),
  
  // Shopping
  shoppingTitle: document.getElementById("shopping-recipe-title"),
  shoppingList: document.getElementById("shopping-items-list"),
  servingsCount: document.getElementById("servings-count"),
  btnIncServings: document.getElementById("btn-inc-servings"),
  btnDecServings: document.getElementById("btn-dec-servings"),
  btnClearCart: document.getElementById("btn-clear-cart"),
  customItemInput: document.getElementById("custom-item-input"),
  btnAddItem: document.getElementById("btn-add-item"),
  storesList: document.getElementById("stores-list"),
  filterBestPrice: document.getElementById("filter-best-price"),
  filterNearest: document.getElementById("filter-nearest"),
  
  // Theme Toggle
  btnThemeToggle: document.getElementById("btn-theme-toggle")
};

// --- Initialize App ---
function initApp() {
  renderRecipes();
  renderShoppingList();
  renderStoresList();
  setupEventListeners();
}

// --- Navigation Handling ---
function switchView(targetViewId) {
  state.currentView = targetViewId;
  DOM.views.forEach(view => {
    if (view.id === targetViewId) {
      view.classList.add("active");
    } else {
      view.classList.remove("active");
    }
  });

  DOM.navButtons.forEach(btn => {
    if (btn.dataset.target === targetViewId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// --- Recipe Rendering ---
function renderRecipes() {
  const filtered = state.recipes.filter(recipe => {
    const matchesCat = state.activeFilter === "all" || recipe.category === state.activeFilter;
    const matchesSearch = recipe.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                          recipe.description.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    DOM.recipesGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p style="font-size: 2rem;">🔍</p>
        <p>Ничего не найдено по вашему запросу</p>
      </div>
    `;
    return;
  }

  DOM.recipesGrid.innerHTML = filtered.map(recipe => `
    <div class="recipe-card" data-id="${recipe.id}">
      <div class="recipe-thumb-container">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-thumb" loading="lazy">
        <span class="badge-video">▶ Видеоурок</span>
      </div>
      <div class="recipe-info">
        <div class="recipe-meta">
          <span>⏱️ ${recipe.prepTime}</span>
          <span>⭐ ${recipe.rating}</span>
          <span>📊 ${recipe.difficulty}</span>
        </div>
        <h3 class="recipe-title">${recipe.title}</h3>
        <p class="recipe-desc">${recipe.description}</p>
        <div class="recipe-footer">
          <span class="calories-tag">🔥 ${recipe.calories} ккал</span>
          <button class="btn btn-primary btn-sm btn-open-recipe" data-id="${recipe.id}">Смотреть</button>
        </div>
      </div>
    </div>
  `).join("");

  // Attach card click handlers
  document.querySelectorAll(".btn-open-recipe").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openRecipeModal(btn.dataset.id);
    });
  });

  document.querySelectorAll(".recipe-card").forEach(card => {
    card.addEventListener("click", () => {
      openRecipeModal(card.dataset.id);
    });
  });
}

// --- Recipe Detail Modal & "За работу!" Action ---
function openRecipeModal(recipeId) {
  const recipe = state.recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  DOM.modalContent.innerHTML = `
    <div class="video-container">
      <iframe src="${recipe.videoUrl}" title="${recipe.title}" allowfullscreen></iframe>
    </div>
    <div class="modal-body">
      <div class="recipe-detail-header">
        <div>
          <h2 style="font-size: 1.5rem; margin-bottom: 6px;">${recipe.title}</h2>
          <div class="recipe-meta" style="font-size: 0.9rem;">
            <span>⏱️ ${recipe.prepTime}</span>
            <span>🔥 ${recipe.calories} ккал</span>
            <span>⭐ ${recipe.rating}</span>
          </div>
        </div>
        <button class="btn btn-action-cook" id="btn-start-cooking" data-id="${recipe.id}">
          🚀 ЗА РАБОТУ!
        </button>
      </div>

      <p style="color: var(--text-muted); margin-bottom: 20px; line-height: 1.5;">${recipe.description}</p>

      <h3 style="margin-bottom: 12px;">🥗 Ингредиенты на 2 порции:</h3>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px;">
        ${recipe.ingredients.map(ing => `
          <li style="background: var(--bg-input); padding: 10px 14px; border-radius: var(--radius-md); display: flex; justify-content: space-between;">
            <span>• ${ing.name}</span>
            <strong>${ing.qty} ${ing.unit}</strong>
          </li>
        `).join("")}
      </ul>

      <h3 style="margin-bottom: 12px;">👨‍🍳 Пошаговый рецепт:</h3>
      <div class="step-list">
        ${recipe.steps.map((step, idx) => `
          <div class="step-item">
            <div class="step-num">${idx + 1}</div>
            <div style="font-size: 0.95rem; line-height: 1.4;">${step}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  DOM.recipeModal.classList.remove("hidden");

  // Handle "🚀 ЗА РАБОТУ!" Click
  document.getElementById("btn-start-cooking").addEventListener("click", () => {
    state.activeRecipeForShopping = recipe;
    state.servingsCount = 2;
    state.shoppingList = recipe.ingredients.map(ing => ({ ...ing, checked: false }));
    
    closeModal();
    renderShoppingList();
    renderStoresList();
    switchView("view-shopping");
  });
}

function closeModal() {
  DOM.recipeModal.classList.add("hidden");
  DOM.modalContent.innerHTML = "";
}

// --- Shopping List & Store Recommendation Logic ---
function renderShoppingList() {
  DOM.shoppingTitle.innerText = `🛒 Ингредиенты: ${state.activeRecipeForShopping.title}`;
  DOM.servingsCount.innerText = state.servingsCount;

  const multiplier = state.servingsCount / 2;

  DOM.shoppingList.innerHTML = state.shoppingList.map((item, idx) => {
    const scaledQty = Math.round(item.qty * multiplier * 10) / 10;
    return `
      <li class="shopping-item ${item.checked ? 'checked' : ''}">
        <div class="item-left">
          <input type="checkbox" class="chk-box" data-idx="${idx}" ${item.checked ? 'checked' : ''}>
          <span>${item.name}</span>
        </div>
        <strong>${scaledQty} ${item.unit}</strong>
      </li>
    `;
  }).join("");

  document.querySelectorAll(".chk-box").forEach(chk => {
    chk.addEventListener("change", (e) => {
      const idx = parseInt(e.target.dataset.idx);
      state.shoppingList[idx].checked = e.target.checked;
      renderShoppingList();
      renderStoresList();
    });
  });
}

function calculateStoreTotals() {
  const multiplier = state.servingsCount / 2;
  const activeItems = state.shoppingList.filter(item => !item.checked);

  const baseTotal = activeItems.reduce((acc, item) => acc + (item.basePrice * multiplier), 0);

  let stores = SUPERMARKETS.map(store => {
    const totalCost = Math.round(baseTotal * store.priceMultiplier);
    return {
      ...store,
      totalCost: totalCost > 0 ? totalCost : 0
    };
  });

  if (state.storeFilterMode === "best-price") {
    stores.sort((a, b) => a.totalCost - b.totalCost);
  } else {
    stores.sort((a, b) => a.distanceMeters - b.distanceMeters);
  }

  return stores;
}

function renderStoresList() {
  const stores = calculateStoreTotals();
  const topRecommendedId = stores[0].id;

  DOM.storesList.innerHTML = stores.map((store, idx) => `
    <div class="store-item-card ${store.id === topRecommendedId ? 'highlight' : ''}">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div class="store-logo">${store.logo}</div>
        <div class="store-info">
          <h4>${store.name} <span style="font-size: 0.75rem; color: var(--accent-primary); font-weight: normal;">${store.badge}</span></h4>
          <div class="store-meta">📍 ${store.walkTime} (${store.distanceMeters} м)</div>
        </div>
      </div>
      <div class="store-price">
        <div class="total-sum">${store.totalCost} ₽</div>
        <button class="btn btn-sm btn-outline" style="margin-top: 4px; font-size: 0.75rem;" onclick="alert('Открытие маршрута к ${store.name} в 2ГИС / Яндекс.Картах...')">
          📍 Карта
        </button>
      </div>
    </div>
  `).join("");
}

// --- AI Camera & Food Scanner Logic ---
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    });
    state.cameraStream = stream;
    DOM.cameraFeed.srcObject = stream;
    DOM.cameraFeed.classList.remove("hidden");
    DOM.imagePreview.classList.add("hidden");
    DOM.cameraPlaceholder.classList.add("hidden");
    DOM.scanHud.classList.remove("hidden");
    DOM.btnCaptureScan.classList.remove("hidden");
    DOM.btnToggleCamera.innerHTML = `<span>⏹️</span> Отключить Камеру`;
  } catch (err) {
    alert("Камера недоступна или доступ запрещен. Используйте демо-кнопки или загрузку фото!");
  }
}

function stopCamera() {
  if (state.cameraStream) {
    state.cameraStream.getTracks().forEach(track => track.stop());
    state.cameraStream = null;
  }
  DOM.cameraFeed.classList.add("hidden");
  DOM.scanHud.classList.add("hidden");
  DOM.btnCaptureScan.classList.add("hidden");
  DOM.cameraPlaceholder.classList.remove("hidden");
  DOM.btnToggleCamera.innerHTML = `<span>📹</span> Включить Камеру`;
}

function processScanPreset(presetKey) {
  const preset = SCAN_PRESETS[presetKey];
  if (!preset) return;

  DOM.imagePreview.src = preset.image;
  DOM.imagePreview.classList.remove("hidden");
  DOM.cameraFeed.classList.add("hidden");
  DOM.cameraPlaceholder.classList.add("hidden");
  DOM.scanHud.classList.remove("hidden");

  // Simulate scanning delay
  setTimeout(() => {
    renderScanResults(preset);
  }, 1200);
}

function renderScanResults(data) {
  DOM.scanResults.innerHTML = `
    <div class="dish-header">
      <h2 class="dish-title">${data.title}</h2>
      <span class="health-rating">${data.healthScore}</span>
    </div>
    
    <div class="kcal-hero">
      🔥 ${data.calories} <span>ккал / порция</span>
    </div>

    <div class="nutrition-bars-grid">
      <div class="nutr-card">
        <span class="val" style="color: #3b82f6;">${data.protein} г</span>
        <span class="lbl">Белки</span>
      </div>
      <div class="nutr-card">
        <span class="val" style="color: #f59e0b;">${data.fat} г</span>
        <span class="lbl">Жиры</span>
      </div>
      <div class="nutr-card">
        <span class="val" style="color: #10b981;">${data.carbs} г</span>
        <span class="lbl">Углеводы</span>
      </div>
    </div>

    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px; line-height: 1.5;">
      💡 <strong>Анализ AI нутрициолога:</strong> ${data.summary}
    </p>

    <button id="btn-add-to-diary" class="btn btn-primary btn-glow" style="width: 100%;">
      ➕ Добавить ${data.calories} ккал в Дневник Питания
    </button>
  `;

  DOM.scanResults.classList.remove("hidden");

  document.getElementById("btn-add-to-diary").addEventListener("click", () => {
    state.diaryConsumed += data.calories;
    updateDiaryUI();
    alert(`Добавлено: ${data.title} (+${data.calories} ккал)`);
    switchView("view-diary");
  });
}

function updateDiaryUI() {
  document.getElementById("consumed-calories").innerText = state.diaryConsumed.toLocaleString("ru-RU");
  const progressPercent = Math.min(Math.round((state.diaryConsumed / 2200) * 100), 100);
  const strokeOffset = 264 - (264 * progressPercent) / 100;
  document.getElementById("calorie-progress-bar").style.strokeDashoffset = strokeOffset;
}

// --- Event Listeners Setup ---
function setupEventListeners() {
  // Navigation
  DOM.navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      switchView(btn.dataset.target);
    });
  });

  // Search & Filter
  DOM.recipeSearch.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderRecipes();
  });

  DOM.categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
      DOM.categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.activeFilter = pill.dataset.cat;
      renderRecipes();
    });
  });

  // Modal
  DOM.btnCloseModal.addEventListener("click", closeModal);
  DOM.recipeModal.addEventListener("click", (e) => {
    if (e.target === DOM.recipeModal) closeModal();
  });

  // Shopping Servings & Items
  DOM.btnIncServings.addEventListener("click", () => {
    state.servingsCount++;
    renderShoppingList();
    renderStoresList();
  });

  DOM.btnDecServings.addEventListener("click", () => {
    if (state.servingsCount > 1) {
      state.servingsCount--;
      renderShoppingList();
      renderStoresList();
    }
  });

  DOM.btnClearCart.addEventListener("click", () => {
    state.shoppingList = [];
    renderShoppingList();
    renderStoresList();
  });

  DOM.btnAddItem.addEventListener("click", () => {
    const val = DOM.customItemInput.value.trim();
    if (val) {
      state.shoppingList.push({ name: val, qty: 1, unit: "упак", basePrice: 50, checked: false });
      DOM.customItemInput.value = "";
      renderShoppingList();
      renderStoresList();
    }
  });

  // Store Filter Toggles
  DOM.filterBestPrice.addEventListener("click", () => {
    DOM.filterBestPrice.classList.add("active");
    DOM.filterNearest.classList.remove("active");
    state.storeFilterMode = "best-price";
    renderStoresList();
  });

  DOM.filterNearest.addEventListener("click", () => {
    DOM.filterNearest.classList.add("active");
    DOM.filterBestPrice.classList.remove("active");
    state.storeFilterMode = "nearest";
    renderStoresList();
  });

  // Camera Scanner
  DOM.btnToggleCamera.addEventListener("click", () => {
    if (state.cameraStream) {
      stopCamera();
    } else {
      startCamera();
    }
  });

  DOM.btnCaptureScan.addEventListener("click", () => {
    processScanPreset("salmon_bowl");
  });

  DOM.sampleChips.forEach(chip => {
    chip.addEventListener("click", () => {
      processScanPreset(chip.dataset.sample);
    });
  });

  DOM.fileUpload.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        DOM.imagePreview.src = event.target.result;
        DOM.imagePreview.classList.remove("hidden");
        DOM.cameraPlaceholder.classList.add("hidden");
        DOM.scanHud.classList.remove("hidden");
        setTimeout(() => {
          processScanPreset("avocado_toast");
        }, 1000);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  });

  // Theme Switcher
  DOM.btnThemeToggle.addEventListener("click", () => {
    if (document.body.classList.contains("light-theme")) {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      DOM.btnThemeToggle.querySelector(".theme-icon").innerText = "🌙";
    } else {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      DOM.btnThemeToggle.querySelector(".theme-icon").innerText = "☀️";
    }
  });
}

// Start app on DOMContentLoaded
document.addEventListener("DOMContentLoaded", initApp);
