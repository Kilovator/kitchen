import { AppState, Recipe, CategoryType } from './types';
import { RECIPES_DATA, SCAN_PRESETS } from './data/recipes';
import { calculateStoreTotals } from './services/storeCalculator';
import { scannerService } from './services/scanner';
import { aiVisionScanner, VisionScanResult } from './services/aiVisionScanner';
import { TRANSLATIONS, Language } from './i18n/translations';

// Saved or default language
const savedLang = (localStorage.getItem('cookcraft_lang') as Language) || 'ru';

// App State
const state: AppState = {
  currentLang: savedLang,
  currentView: 'view-recipes',
  recipes: RECIPES_DATA,
  activeFilter: 'all',
  searchQuery: '',
  activeRecipeForShopping: RECIPES_DATA[0],
  servingsCount: 2,
  shoppingList: RECIPES_DATA[0].ingredients.map(ing => ({ ...ing, checked: false })),
  storeFilterMode: 'best-price',
  diaryConsumed: 1480,
  cameraStream: null,
  theme: 'dark'
};

document.addEventListener('DOMContentLoaded', () => {
  initLangSwitcher();
  initNavigation();
  initRecipes();
  initShopping();
  initScanner();
  initThemeToggle();
  renderAll();
});

function t() {
  return TRANSLATIONS[state.currentLang];
}

function setLanguage(lang: Language) {
  state.currentLang = lang;
  localStorage.setItem('cookcraft_lang', lang);
  updateStaticTexts();
  renderAll();
}

function initLangSwitcher() {
  const langBtns = document.querySelectorAll<HTMLButtonElement>('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.dataset.lang as Language;
      if (lang) setLanguage(lang);
    });
  });

  langBtns.forEach(btn => {
    if (btn.dataset.lang === state.currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  updateStaticTexts();
}

function updateStaticTexts() {
  const tr = t();
  
  const recipeTitle = document.querySelector('#view-recipes .page-title');
  const recipeSub = document.querySelector('#view-recipes .page-subtitle');
  if (recipeTitle) recipeTitle.textContent = tr.recipesTitle;
  if (recipeSub) recipeSub.textContent = tr.recipesSubtitle;

  const searchInput = document.getElementById('recipe-search') as HTMLInputElement | null;
  if (searchInput) searchInput.placeholder = tr.searchPlaceholder;

  document.querySelectorAll<HTMLButtonElement>('.category-pills .pill').forEach(pill => {
    const cat = pill.dataset.cat;
    if (cat === 'all') pill.textContent = tr.catAll;
    if (cat === 'breakfast') pill.textContent = tr.catBreakfast;
    if (cat === 'lunch') pill.textContent = tr.catLunch;
    if (cat === 'healthy') pill.textContent = tr.catHealthy;
    if (cat === 'fast') pill.textContent = tr.catFast;
  });

  const scanTitle = document.querySelector('#view-scanner .page-title');
  const scanSub = document.querySelector('#view-scanner .page-subtitle');
  if (scanTitle) scanTitle.textContent = tr.scannerTitle;
  if (scanSub) scanSub.textContent = tr.scannerSubtitle;

  const camPlaceholder = document.querySelector('#camera-placeholder p');
  if (camPlaceholder) camPlaceholder.textContent = tr.camPlaceholder;

  const btnToggleCam = document.getElementById('btn-toggle-camera');
  if (btnToggleCam && !state.cameraStream) btnToggleCam.innerHTML = tr.camBtnOn;

  const btnCapture = document.getElementById('btn-capture-scan');
  if (btnCapture) btnCapture.innerHTML = tr.camBtnScan;

  const labelUpload = document.querySelector('label[for="file-upload"]');
  if (labelUpload) labelUpload.innerHTML = tr.camBtnUpload;

  const presetH3 = document.querySelector('.preset-samples h3');
  if (presetH3) presetH3.textContent = tr.presetHeader;

  const shopTitle = document.querySelector('#view-shopping .page-title');
  const shopSub = document.querySelector('#view-shopping .page-subtitle');
  if (shopTitle) shopTitle.textContent = tr.shoppingTitle;
  if (shopSub) shopSub.textContent = tr.shoppingSubtitle;

  const clearBtn = document.getElementById('btn-clear-cart');
  if (clearBtn) clearBtn.textContent = tr.clearCartBtn;

  const servingsLbl = document.querySelector('.servings-control span');
  if (servingsLbl) servingsLbl.textContent = tr.servingsLabel;

  const customInput = document.getElementById('custom-item-input') as HTMLInputElement | null;
  if (customInput) customInput.placeholder = tr.addCustomPlaceholder;

  const addBtn = document.getElementById('btn-add-item');
  if (addBtn) addBtn.textContent = tr.addBtn;

  const filterBest = document.getElementById('filter-best-price');
  const filterNear = document.getElementById('filter-nearest');
  if (filterBest) filterBest.textContent = tr.bestPriceToggle;
  if (filterNear) filterNear.textContent = tr.nearestToggle;

  const diaryTitle = document.querySelector('#view-diary .page-title');
  const diarySub = document.querySelector('#view-diary .page-subtitle');
  if (diaryTitle) diaryTitle.textContent = tr.diaryTitle;
  if (diarySub) diarySub.textContent = tr.diarySubtitle;

  const consumedLbl = document.querySelector('.gauge-label');
  if (consumedLbl) consumedLbl.textContent = tr.consumedLabel;

  const pLbl = document.querySelector('.macro-item.protein .macro-info span');
  const fLbl = document.querySelector('.macro-item.fat .macro-info span');
  const cLbl = document.querySelector('.macro-item.carbs .macro-info span');
  if (pLbl) pLbl.textContent = tr.proteinLabel;
  if (fLbl) fLbl.textContent = tr.fatLabel;
  if (cLbl) cLbl.textContent = tr.carbsLabel;

  const mealsH2 = document.querySelector('.meals-log-card h2');
  if (mealsH2) mealsH2.textContent = tr.mealsHeader;

  document.querySelectorAll<HTMLElement>('.nav-item').forEach(nav => {
    const target = nav.dataset.target;
    const label = nav.querySelector('.nav-label');
    if (!label) return;
    if (target === 'view-recipes') label.textContent = tr.navRecipes;
    if (target === 'view-scanner') label.textContent = tr.navScanner;
    if (target === 'view-shopping') label.textContent = tr.navShopping;
    if (target === 'view-diary') label.textContent = tr.navDiary;
  });
}

function renderAll() {
  renderRecipes();
  renderShoppingList();
  renderStores();
}

// --- Navigation ---
function initNavigation() {
  const navItems = document.querySelectorAll<HTMLButtonElement>('.nav-item');
  navItems.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      if (target) switchView(target);
    });
  });
}

function switchView(targetId: string) {
  state.currentView = targetId;
  document.querySelectorAll<HTMLElement>('.view-page').forEach(view => {
    if (view.id === targetId) view.classList.add('active');
    else view.classList.remove('active');
  });

  document.querySelectorAll<HTMLButtonElement>('.nav-item').forEach(btn => {
    if (btn.dataset.target === targetId) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Recipes ---
function initRecipes() {
  const searchInput = document.getElementById('recipe-search') as HTMLInputElement | null;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = (e.target as HTMLInputElement).value;
      renderRecipes();
    });
  }

  const categoryPills = document.querySelectorAll<HTMLButtonElement>('.category-pills .pill');
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeFilter = (pill.dataset.cat as CategoryType) || 'all';
      renderRecipes();
    });
  });

  const btnCloseModal = document.getElementById('btn-close-modal');
  const recipeModal = document.getElementById('recipe-modal');
  if (btnCloseModal && recipeModal) {
    btnCloseModal.addEventListener('click', closeModal);
    recipeModal.addEventListener('click', (e) => {
      if (e.target === recipeModal) closeModal();
    });
  }
}

function renderRecipes() {
  const grid = document.getElementById('recipes-grid');
  if (!grid) return;

  const lang = state.currentLang;
  const tr = t();

  const filtered = state.recipes.filter(r => {
    const matchesCat = state.activeFilter === 'all' || r.category === state.activeFilter;
    const titleText = r.title[lang].toLowerCase();
    const descText = r.description[lang].toLowerCase();
    const matchesSearch = titleText.includes(state.searchQuery.toLowerCase()) ||
                          descText.includes(state.searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p style="font-size: 1.5rem; margin-bottom: 8px;">🍲</p>
        <p>No recipes found</p>
      </div>
    `;
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
  `).join('');

  grid.querySelectorAll<HTMLButtonElement>('.btn-open-recipe').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openRecipeModal(btn.dataset.id || '');
    });
  });

  grid.querySelectorAll<HTMLElement>('.recipe-card').forEach(card => {
    card.addEventListener('click', () => {
      openRecipeModal(card.dataset.id || '');
    });
  });
}

function openRecipeModal(recipeId: string) {
  const recipe = state.recipes.find(r => r.id === recipeId);
  const modal = document.getElementById('recipe-modal');
  const modalContent = document.getElementById('modal-content');
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
        `).join('')}
      </ul>

      <h3 style="margin-bottom: 10px; font-size: 1rem;">${tr.stepsHeader}</h3>
      <div class="step-list">
        ${recipe.steps.map((step, idx) => `
          <div class="step-item">
            <div class="step-num">${idx + 1}</div>
            <div style="font-size: 0.9rem; line-height: 1.4;">${step[lang]}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  modal.classList.remove('hidden');

  const btnStart = document.getElementById('btn-start-cooking');
  if (btnStart) {
    btnStart.addEventListener('click', () => {
      state.activeRecipeForShopping = recipe;
      state.servingsCount = 2;
      state.shoppingList = recipe.ingredients.map(ing => ({ ...ing, checked: false }));
      
      closeModal();
      renderShoppingList();
      renderStores();
      switchView('view-shopping');
    });
  }
}

function closeModal() {
  const modal = document.getElementById('recipe-modal');
  if (modal) modal.classList.add('hidden');
}

// --- Shopping ---
function initShopping() {
  document.getElementById('btn-inc-servings')?.addEventListener('click', () => {
    state.servingsCount++;
    renderShoppingList();
    renderStores();
  });

  document.getElementById('btn-dec-servings')?.addEventListener('click', () => {
    if (state.servingsCount > 1) {
      state.servingsCount--;
      renderShoppingList();
      renderStores();
    }
  });

  document.getElementById('btn-clear-cart')?.addEventListener('click', () => {
    state.shoppingList = [];
    renderShoppingList();
    renderStores();
  });

  document.getElementById('btn-add-item')?.addEventListener('click', () => {
    const input = document.getElementById('custom-item-input') as HTMLInputElement | null;
    if (input && input.value.trim()) {
      const val = input.value.trim();
      state.shoppingList.push({
        name: { ru: val, en: val, pl: val },
        qty: 1,
        unit: { ru: 'упак', en: 'pack', pl: 'opak' },
        basePrice: 50,
        checked: false
      });
      input.value = '';
      renderShoppingList();
      renderStores();
    }
  });

  const best = document.getElementById('filter-best-price');
  const near = document.getElementById('filter-nearest');
  best?.addEventListener('click', () => {
    best.classList.add('active');
    near?.classList.remove('active');
    state.storeFilterMode = 'best-price';
    renderStores();
  });
  near?.addEventListener('click', () => {
    near.classList.add('active');
    best?.classList.remove('active');
    state.storeFilterMode = 'nearest';
    renderStores();
  });
}

function renderShoppingList() {
  const title = document.getElementById('shopping-recipe-title');
  const servings = document.getElementById('servings-count');
  const list = document.getElementById('shopping-items-list');

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
  `).join('');

  list.querySelectorAll<HTMLInputElement>('.chk-box').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const idx = parseInt((e.target as HTMLInputElement).dataset.idx || '0');
      state.shoppingList[idx].checked = (e.target as HTMLInputElement).checked;
      renderShoppingList();
      renderStores();
    });
  });
}

function renderStores() {
  const container = document.getElementById('stores-list');
  if (!container) return;

  const lang = state.currentLang;
  const stores = calculateStoreTotals(state.shoppingList, state.servingsCount, state.storeFilterMode);
  const topId = stores[0]?.id;

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
        <div class="total-sum">${store.totalCost} ${lang === 'pl' ? 'zł' : (lang === 'en' ? '$' : '₽')}</div>
        <button class="btn btn-sm btn-outline" style="margin-top: 4px; font-size: 0.75rem;" onclick="alert('Map...')">
          📍 Map
        </button>
      </div>
    </div>
  `).join('');
}

// --- Scanner ---
function initScanner() {
  const btnToggleCam = document.getElementById('btn-toggle-camera');
  const btnCapture = document.getElementById('btn-capture-scan');
  const videoElem = document.getElementById('camera-feed') as HTMLVideoElement | null;
  const fileUpload = document.getElementById('file-upload') as HTMLInputElement | null;
  const sampleChips = document.querySelectorAll<HTMLButtonElement>('.sample-chip');
  const apiKeyInput = document.getElementById('vision-api-key-input') as HTMLInputElement | null;
  const btnSaveKey = document.getElementById('btn-save-api-key');

  if (apiKeyInput) {
    apiKeyInput.value = aiVisionScanner.getApiKey();
  }

  btnSaveKey?.addEventListener('click', () => {
    if (apiKeyInput) {
      aiVisionScanner.setApiKey(apiKeyInput.value);
      alert('Gemini Vision API Key saved!');
    }
  });

  btnToggleCam?.addEventListener('click', async () => {
    if (!videoElem) return;
    const tr = t();
    if (state.cameraStream) {
      scannerService.stopCamera(videoElem);
      state.cameraStream = null;
      document.getElementById('camera-placeholder')?.classList.remove('hidden');
      videoElem.classList.add('hidden');
      document.getElementById('scan-hud')?.classList.add('hidden');
      btnCapture?.classList.add('hidden');
      btnToggleCam.innerHTML = tr.camBtnOn;
    } else {
      try {
        const stream = await scannerService.startCamera(videoElem);
        state.cameraStream = stream;
        document.getElementById('camera-placeholder')?.classList.add('hidden');
        videoElem.classList.remove('hidden');
        document.getElementById('scan-hud')?.classList.remove('hidden');
        btnCapture?.classList.remove('hidden');
        btnToggleCam.innerHTML = tr.camBtnOff;
      } catch (err: any) {
        alert(err.message || 'Camera error.');
      }
    }
  });

  // Capture real snapshot from active video camera
  btnCapture?.addEventListener('click', async () => {
    if (videoElem && !videoElem.classList.contains('hidden')) {
      const frameDataUrl = aiVisionScanner.captureFrame(videoElem);
      if (frameDataUrl) {
        const result = await aiVisionScanner.analyzeImage(frameDataUrl);
        renderScanResult(result);
        return;
      }
    }
    processPreset('carbonara');
  });

  sampleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (chip.dataset.sample) processPreset(chip.dataset.sample);
    });
  });

  fileUpload?.addEventListener('change', (e) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const img = document.getElementById('image-preview') as HTMLImageElement | null;
        if (img && ev.target?.result) {
          const dataUrl = ev.target.result as string;
          img.src = dataUrl;
          img.classList.remove('hidden');
          document.getElementById('camera-placeholder')?.classList.add('hidden');
          videoElem?.classList.add('hidden');
          document.getElementById('scan-hud')?.classList.remove('hidden');
          
          const result = await aiVisionScanner.analyzeImage(dataUrl);
          renderScanResult(result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  });
}

function processPreset(presetKey: string) {
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

function renderScanResult(result: VisionScanResult) {
  const lang = state.currentLang;
  const tr = t();

  const preview = document.getElementById('image-preview') as HTMLImageElement | null;
  if (preview) {
    preview.src = result.image;
    preview.classList.remove('hidden');
  }

  document.getElementById('camera-feed')?.classList.add('hidden');
  document.getElementById('camera-placeholder')?.classList.add('hidden');

  const card = document.getElementById('scan-results');
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

  card.classList.remove('hidden');

  // Portion slider live scaling
  const slider = document.getElementById('portion-slider') as HTMLInputElement | null;
  slider?.addEventListener('input', () => {
    const newWeight = parseInt(slider.value);
    const ratio = newWeight / result.weightGrams;
    
    document.getElementById('portion-weight-label')!.innerText = `${newWeight} g`;
    document.getElementById('dyn-calories')!.innerText = Math.round(result.calories * ratio).toString();
    document.getElementById('dyn-protein')!.innerText = `${Math.round(result.protein * ratio * 10) / 10} g`;
    document.getElementById('dyn-fat')!.innerText = `${Math.round(result.fat * ratio * 10) / 10} g`;
    document.getElementById('dyn-carbs')!.innerText = `${Math.round(result.carbs * ratio * 10) / 10} g`;
  });

  document.getElementById('btn-add-to-diary')?.addEventListener('click', () => {
    const finalKcal = parseInt(document.getElementById('dyn-calories')?.innerText || result.calories.toString());
    state.diaryConsumed += finalKcal;
    const consumed = document.getElementById('consumed-calories');
    if (consumed) consumed.innerText = state.diaryConsumed.toLocaleString();
    alert(`+ ${result.title[lang]} (${finalKcal} kcal)`);
    switchView('view-diary');
  });
}

function initThemeToggle() {
  const btn = document.getElementById('btn-theme-toggle');
  btn?.addEventListener('click', () => {
    if (document.body.classList.contains('light-theme')) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      const icon = btn.querySelector('.theme-icon');
      if (icon) icon.textContent = '🌙';
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      const icon = btn.querySelector('.theme-icon');
      if (icon) icon.textContent = '☀️';
    }
  });
}
