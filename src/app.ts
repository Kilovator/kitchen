import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon path in production builds
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

import { AppState, Recipe, CategoryType } from './types';
import { RECIPES_DATA, SCAN_PRESETS } from './data/recipes';
import { calculateStoreTotals, fetchRealSupermarkets, initGooglePlaces, fetchGooglePlacesSupermarkets } from './services/storeCalculator';
import { scannerService } from './services/scanner';
import { aiVisionScanner, VisionScanResult } from './services/aiVisionScanner';
import { TRANSLATIONS, Language } from './i18n/translations';
import { createFullUserProfile } from './services/nutritionCalculator';
import { MealEntry, UserProfile } from './types';

// Leaflet Map Global Variables (Declared at top to prevent TDZ ReferenceError)
let leafletMap: any = null;
let mapMarkers: any[] = [];
let userLocationMarker: any = null;
let userAccuracyCircle: any = null;
let realOsmStores: any[] | null = null;
let gpsWatchId: number | null = null;
let radiusCircle: any = null;
let lastGpsPos: { lat: number; lng: number } | null = null;
let lastFetchTime = 0;

let savedLang = localStorage.getItem('cookcraft_lang') as Language;
if (!savedLang || savedLang === 'ru') {
  savedLang = 'pl';
  localStorage.setItem('cookcraft_lang', 'pl');
}

// Load persisted user profile or create default
const savedProfileRaw = localStorage.getItem('cookcraft_user_profile');
const defaultProfile: UserProfile = savedProfileRaw 
  ? JSON.parse(savedProfileRaw)
  : createFullUserProfile('male', 25, 75, 178, 'moderate', 'maintain');

// Load persisted logged meals or create default sample meals
const savedMealsRaw = localStorage.getItem('cookcraft_logged_meals');
const defaultMeals: MealEntry[] = savedMealsRaw
  ? JSON.parse(savedMealsRaw)
  : [
      { id: 'meal_1', name: 'Owsianka z bananem', calories: 320, protein: 10, fat: 8, carbs: 54, mealType: 'breakfast', time: '08:30' },
      { id: 'meal_2', name: 'Cheeseburger Black Angus', calories: 720, protein: 42, fat: 38, carbs: 52, mealType: 'lunch', time: '13:15' }
    ];

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
  diaryConsumed: 1040,
  cameraStream: null,
  theme: 'dark',
  userLocation: null,
  isStoresListExpanded: false,
  userProfile: defaultProfile,
  loggedMeals: defaultMeals
};

function startApp() {
  initLangSwitcher();
  initNavigation();
  initRecipes();
  initShopping();
  initScanner();
  initDiary();
  initThemeToggle();
  renderAll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}

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

  document.querySelectorAll<HTMLButtonElement>('.sample-chip').forEach(chip => {
    const s = chip.dataset.sample;
    if (s === 'borscht') chip.textContent = tr.presetBorscht;
    if (s === 'carbonara') chip.textContent = tr.presetCarbonara;
    if (s === 'ribeye') chip.textContent = tr.presetRibeye;
  });

  const shopTitle = document.querySelector('#view-shopping .page-title');
  const shopSub = document.querySelector('#view-shopping .page-subtitle');
  if (shopTitle) shopTitle.textContent = tr.shoppingTitle;
  if (shopSub) shopSub.textContent = tr.shoppingSubtitle;

  const shopCartH2 = document.getElementById('shopping-recipe-title');
  if (shopCartH2) shopCartH2.textContent = `🛒 ${tr.shoppingCartHeader}`;

  const clearBtn = document.getElementById('btn-clear-cart');
  if (clearBtn) clearBtn.textContent = tr.clearCartBtn;

  const servingsLbl = document.querySelector('.servings-control span');
  if (servingsLbl) servingsLbl.textContent = tr.servingsLabel;

  const customInput = document.getElementById('custom-item-input') as HTMLInputElement | null;
  if (customInput) customInput.placeholder = tr.addCustomPlaceholder;

  const addBtn = document.getElementById('btn-add-item');
  if (addBtn) addBtn.textContent = tr.addBtn;

  const addrInput = document.getElementById('store-address-input') as HTMLInputElement | null;
  if (addrInput) addrInput.placeholder = tr.addressPlaceholder;

  const addrBtn = document.getElementById('btn-search-address');
  if (addrBtn) addrBtn.textContent = tr.addressSearchBtn;

  const tabComparison = document.getElementById('tab-btn-comparison');
  const tabDeals = document.getElementById('tab-btn-deals');
  if (tabComparison) tabComparison.textContent = tr.tabComparison;
  if (tabDeals) tabDeals.textContent = tr.tabDeals;

  const storesH2 = document.querySelector('#view-shopping .stores-card .card-header h2');
  if (storesH2) storesH2.textContent = tr.storesHeader;

  const mapH3 = document.querySelector('#view-shopping .stores-card .map-header h3');
  if (mapH3) mapH3.textContent = tr.mapHeader;

  const filterBest = document.getElementById('filter-best-price');
  const filterNear = document.getElementById('filter-nearest');
  if (filterBest) filterBest.textContent = tr.bestPriceToggle;
  if (filterNear) filterNear.textContent = tr.nearestToggle;  const diaryTitle = document.getElementById('diary-title');
  const diarySub = document.getElementById('diary-subtitle');
  if (diaryTitle) diaryTitle.textContent = tr.diaryTitle;
  if (diarySub) diarySub.textContent = tr.diarySubtitle;

  const calcH2 = document.getElementById('calc-header-title');
  if (calcH2) calcH2.textContent = tr.calcHeader;

  const maleBtn = document.getElementById('btn-gender-male');
  const femaleBtn = document.getElementById('btn-gender-female');
  if (maleBtn) maleBtn.textContent = tr.calcGenderMale;
  if (femaleBtn) femaleBtn.textContent = tr.calcGenderFemale;

  const lblAge = document.getElementById('lbl-calc-age');
  const lblWeight = document.getElementById('lbl-calc-weight');
  const lblHeight = document.getElementById('lbl-calc-height');
  const lblActivity = document.getElementById('lbl-calc-activity');
  const lblGoal = document.getElementById('lbl-calc-goal');
  if (lblAge) lblAge.textContent = tr.calcAgeLabel;
  if (lblWeight) lblWeight.textContent = tr.calcWeightLabel;
  if (lblHeight) lblHeight.textContent = tr.calcHeightLabel;
  if (lblActivity) lblActivity.textContent = tr.calcActivityLabel;
  if (lblGoal) lblGoal.textContent = tr.calcGoalLabel;

  const lblBmr = document.getElementById('lbl-bmr');
  const lblTdee = document.getElementById('lbl-tdee');
  const lblTarget = document.getElementById('lbl-target');
  if (lblBmr) lblBmr.textContent = tr.calcBmrLabel;
  if (lblTdee) lblTdee.textContent = tr.calcTdeeLabel;
  if (lblTarget) lblTarget.textContent = tr.calcTargetLabel;

  const applyBtn = document.getElementById('btn-apply-profile');
  if (applyBtn) applyBtn.textContent = tr.calcApplyBtn;

  const pTitle = document.getElementById('lbl-macro-p-title');
  const fTitle = document.getElementById('lbl-macro-f-title');
  const cTitle = document.getElementById('lbl-macro-c-title');
  if (pTitle) pTitle.textContent = tr.proteinLabel;
  if (fTitle) fTitle.textContent = tr.fatLabel;
  if (cTitle) cTitle.textContent = tr.carbsLabel;

  const mealsH2 = document.getElementById('lbl-meals-header');
  if (mealsH2) mealsH2.textContent = tr.mealsHeader;

  const addMealBtn = document.getElementById('btn-add-quick-meal');
  if (addMealBtn) addMealBtn.textContent = tr.addMealBtn;

  document.querySelectorAll<HTMLElement>('.nav-item').forEach(nav => {
    const target = nav.dataset.target;
    const label = nav.querySelector('.nav-label');
    if (!label) return;
    if (target === 'view-recipes') label.textContent = tr.navRecipes;
    if (target === 'view-scanner') label.textContent = tr.navScanner;
    if (target === 'view-shopping') label.textContent = tr.navShopping;
    if (target === 'view-diary') label.textContent = tr.navDiary;
  });

  renderDiary();
}

function renderAll() {
  renderRecipes();
  renderShoppingList();
  renderStores();
  renderDiary();
  if (state.lastScanResult) {
    renderScanResult(state.lastScanResult);
  }
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

  if (targetId === 'view-shopping') {
    setTimeout(() => {
      if (leafletMap) {
        leafletMap.invalidateSize();
      }
    }, 100);
  }

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
        <img src="${recipe.image}" alt="${recipe.title[lang]}" class="recipe-thumb" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';">
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

  const tabComparison = document.getElementById('tab-btn-comparison');
  const tabDeals = document.getElementById('tab-btn-deals');
  const contentComparison = document.getElementById('subtab-comparison-content');
  const contentDeals = document.getElementById('subtab-deals-content');

  tabComparison?.addEventListener('click', () => {
    tabComparison.classList.add('btn-primary', 'active-tab');
    tabComparison.classList.remove('btn-outline');
    tabDeals?.classList.add('btn-outline');
    tabDeals?.classList.remove('btn-primary', 'active-tab');

    contentComparison?.classList.remove('hidden');
    contentDeals?.classList.add('hidden');

    if (leafletMap) {
      setTimeout(() => {
        leafletMap.invalidateSize(true);
      }, 50);
    }
  });

  tabDeals?.addEventListener('click', async () => {
    tabDeals.classList.add('btn-primary', 'active-tab');
    tabDeals.classList.remove('btn-outline');
    tabComparison?.classList.add('btn-outline');
    tabComparison?.classList.remove('btn-primary', 'active-tab');

    contentDeals?.classList.remove('hidden');
    contentComparison?.classList.add('hidden');

    await renderPromotions();
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

  const btnAddressSearch = document.getElementById('btn-search-address');
  const addressInput = document.getElementById('store-address-input') as HTMLInputElement | null;
  const searchAddr = async () => {
    if (addressInput && addressInput.value.trim()) {
      const query = encodeURIComponent(addressInput.value.trim());
      try {
        const res = await fetch(`/api/geocode?q=${query}`);
        const data = await res.json();
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lng = parseFloat(data[0].lon);
          
          // Stop GPS watch to prevent snapping back to original location
          if (gpsWatchId !== null) {
            navigator.geolocation.clearWatch(gpsWatchId);
            gpsWatchId = null;
          }
          lastGpsPos = null;

          if (leafletMap) {
            leafletMap.setView([lat, lng], 14);
            
            // Draw radius circle around the searched address location
            if (radiusCircle) leafletMap.removeLayer(radiusCircle);
            radiusCircle = L.circle([lat, lng], {
              radius: 3500,
              color: '#10b981',
              weight: 2,
              dashArray: '6, 6',
              fillColor: '#10b981',
              fillOpacity: 0.06
            }).addTo(leafletMap);

            // Put a pin at searched address
            if (userLocationMarker) leafletMap.removeLayer(userLocationMarker);
            const searchIcon = L.divIcon({
              className: 'user-pin-container',
              html: `<div class="user-location-pin" style="background: #10b981;">📍 Wyszukana lokalizacja</div>`,
              iconSize: [140, 30],
              iconAnchor: [70, 15]
            });
            userLocationMarker = L.marker([lat, lng], { icon: searchIcon }).addTo(leafletMap);
          }
          await updateStoresForLocation(lat, lng);
        } else {
          alert('Adres nie został znaleziony. Spróbuj podać miasto i ulicę.');
        }
      } catch (err) {
        console.error('Geocoding error:', err);
      }
    }
  };
  btnAddressSearch?.addEventListener('click', searchAddr);
  addressInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchAddr();
  });


}

async function updateStoresForLocation(lat: number, lng: number) {
  state.userLocation = { lat, lng };
  const fetched = await fetchRealSupermarkets(lat, lng);
  if (fetched && fetched.length > 0) {
    realOsmStores = fetched;
  }
  renderStores();
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
        <span class="item-name">${item.name[lang]}</span>
      </div>
      <div style="display: flex; align-items: center;">
        <span class="qty-badge">${Math.round(item.qty * mult * 10) / 10} ${item.unit[lang]}</span>
        <button class="btn-delete-item" data-idx="${idx}" title="${lang === 'pl' ? 'Usuń' : (lang === 'en' ? 'Delete' : 'Удалить')}">🗑️</button>
      </div>
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

  list.querySelectorAll<HTMLButtonElement>('.btn-delete-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt((e.currentTarget as HTMLButtonElement).dataset.idx || '0');
      state.shoppingList.splice(idx, 1);
      renderShoppingList();
      renderStores();
    });
  });
}

function renderStores() {
  const container = document.getElementById('stores-list');
  if (!container) return;

  const lang = state.currentLang;
  const stores = calculateStoreTotals(state.shoppingList, state.servingsCount, state.storeFilterMode, state.userLocation, realOsmStores);
  const topId = stores[0]?.id;

  const currency = lang === 'pl' ? 'zł' : (lang === 'en' ? '$' : '₽');
  const mapBtnText = lang === 'pl' ? '📍 Google Maps' : (lang === 'en' ? '📍 Google Maps' : '📍 Google Карты');
  const orderBtnText = lang === 'pl' ? '🚚 Zamów' : (lang === 'en' ? '🚚 Order' : '🚚 Заказать');

  // Collapse list by default to show only top 4 stores
  const visibleStores = state.isStoresListExpanded ? stores : stores.slice(0, 4);

  let listHtml = visibleStores.map(store => `
    <div class="store-item-card ${store.id === topId ? 'highlight' : ''}" id="store-card-${store.id}">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div class="store-logo">${store.logo}</div>
        <div class="store-info">
          <h4>${store.name} <span style="font-size: 0.72rem; color: var(--accent-primary); font-weight: 600;">[ ${store.badge[lang]} ]</span></h4>
          <div class="store-meta">📍 ${store.address[lang]} • ${store.walkTime[lang]} (${store.distanceMeters} m)</div>
        </div>
      </div>
      <div class="store-price" style="text-align: right;">
        <div class="total-sum">${store.totalCost} ${currency}</div>
        <div style="display: flex; gap: 6px; margin-top: 6px; justify-content: flex-end;">
          <a href="${store.mapUrl}" target="_blank" class="btn btn-sm btn-outline" style="font-size: 0.75rem; text-decoration: none; padding: 4px 8px;">
            ${mapBtnText}
          </a>
          <a href="${store.deliveryUrl}" target="_blank" class="btn btn-sm btn-primary" style="font-size: 0.75rem; text-decoration: none; padding: 4px 8px;">
            ${orderBtnText}
          </a>
        </div>
      </div>
    </div>
  `).join('');

  if (stores.length > 4) {
    const buttonText = state.isStoresListExpanded 
      ? (lang === 'pl' ? 'Pokaż mniej 🔼' : (lang === 'en' ? 'Show less 🔼' : 'Свернуть 🔼'))
      : (lang === 'pl' ? `Pokaż więcej (${stores.length - 4}) 🔽` : (lang === 'en' ? `Show more (${stores.length - 4}) 🔽` : `Показать ещё (${stores.length - 4}) 🔽`));

    listHtml += `
      <button id="btn-toggle-stores-list" class="btn btn-sm btn-outline" style="width: 100%; margin-top: 12px; padding: 8px 12px; font-weight: 500; font-size: 0.85rem; border-radius: var(--radius-md);">
        ${buttonText}
      </button>
    `;
  }

  container.innerHTML = listHtml;

  document.getElementById('btn-toggle-stores-list')?.addEventListener('click', () => {
    state.isStoresListExpanded = !state.isStoresListExpanded;
    renderStores();
  });

  renderMap(stores);
}



function requestUserGeolocation() {
  const lang = state.currentLang;
  if (!navigator.geolocation || !leafletMap) return;

  if (gpsWatchId !== null) {
    navigator.geolocation.clearWatch(gpsWatchId);
    gpsWatchId = null;
  }
  lastGpsPos = null;

  const handlePosition = async (pos: GeolocationPosition) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    if (!lastGpsPos) {
      leafletMap.setView([lat, lng], 14);
    }

    if (userLocationMarker) leafletMap.removeLayer(userLocationMarker);
    if (userAccuracyCircle) leafletMap.removeLayer(userAccuracyCircle);
    if (radiusCircle) leafletMap.removeLayer(radiusCircle);

    // 3.5 km radius visual indicator around user
    radiusCircle = L.circle([lat, lng], {
      radius: 3500,
      color: '#10b981',
      weight: 2,
      dashArray: '6, 6',
      fillColor: '#10b981',
      fillOpacity: 0.06
    }).addTo(leafletMap);

    userAccuracyCircle = L.circle([lat, lng], {
      radius: Math.min(accuracy, 500),
      color: '#2563eb',
      fillColor: '#3b82f6',
      fillOpacity: 0.15
    }).addTo(leafletMap);

    const userIcon = L.divIcon({
      className: 'user-pin-container',
      html: `<div class="user-location-pin">🔵 ${lang === 'ru' ? 'Вы здесь' : (lang === 'pl' ? 'Tu jesteś' : 'You are here')}</div>`,
      iconSize: [110, 30],
      iconAnchor: [55, 15]
    });

    userLocationMarker = L.marker([lat, lng], { icon: userIcon }).addTo(leafletMap);

    // Calculate distance moved from last update
    let movedDistance = 999;
    if (lastGpsPos) {
      const R = 6371000;
      const dLat = (lat - lastGpsPos.lat) * Math.PI / 180;
      const dLon = (lng - lastGpsPos.lng) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lastGpsPos.lat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      movedDistance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    const now = Date.now();
    const timeElapsed = now - lastFetchTime;

    if (!lastGpsPos || (movedDistance > 50 && timeElapsed > 10000)) {
      lastGpsPos = { lat, lng };
      lastFetchTime = now;
      await updateStoresForLocation(lat, lng);
    }
  };

  gpsWatchId = navigator.geolocation.watchPosition(
    handlePosition,
    (err) => {
      console.log('GPS Geolocation watch error:', err.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 3000 }
  );
}

function renderMap(stores: any[]) {
  const mapElem = document.getElementById('real-map');
  if (!mapElem) return;

  const lang = state.currentLang;
  const currency = lang === 'pl' ? 'zł' : (lang === 'en' ? '$' : '₽');

  if (!leafletMap) {
    leafletMap = L.map('real-map').setView([52.2297, 21.0122], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(leafletMap);

    const btnLocate = document.getElementById('btn-locate-me');
    btnLocate?.addEventListener('click', () => {
      requestUserGeolocation();
    });

    requestUserGeolocation();
  }

  // Force map container recalculation to fix marker offset bugs
  requestAnimationFrame(() => {
    if (leafletMap) leafletMap.invalidateSize(true);
  });

  // Clear previous markers
  mapMarkers.forEach(m => leafletMap.removeLayer(m));
  mapMarkers = [];

  stores.forEach(store => {
    const customIcon = L.divIcon({
      className: 'custom-map-pin-container',
      html: `<div class="custom-map-pin">${store.logo} <span>${store.totalCost} ${currency}</span></div>`,
      iconSize: [80, 30],
      iconAnchor: [40, 15]
    });

    const marker = L.marker([store.lat, store.lng], { icon: customIcon }).addTo(leafletMap);
    marker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 13px; color: #111; padding: 4px;">
        <strong>${store.logo} ${store.name}</strong><br>
        <span style="color: #666;">${store.address[lang]}</span><br>
        <strong style="color: #10b981; font-size: 14px;">Чек: ${store.totalCost} ${currency}</strong><br>
        <div style="margin-top: 8px; display: flex; gap: 10px;">
          <a href="${store.mapUrl}" target="_blank" style="color: #2563eb; font-weight: bold; text-decoration: none;">📍 Google Maps</a>
          <a href="${store.deliveryUrl}" target="_blank" style="color: #10b981; font-weight: bold; text-decoration: none;">🚚 Заказать</a>
        </div>
      </div>
    `);

    marker.on('click', () => {
      const card = document.getElementById(`store-card-${store.id}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    mapMarkers.push(marker);
  });
}

async function renderPromotions() {
  const container = document.getElementById('promos-grid');
  if (!container) return;

  const lang = state.currentLang;
  const tr = t();
  const currency = lang === 'pl' ? 'zł' : (lang === 'en' ? '$' : '₽');

  try {
    container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: var(--text-muted);">⏳ ${lang === 'pl' ? 'Ładowanie promocji...' : (lang === 'en' ? 'Loading promotions...' : 'Загрузка акционных товаров...')}</div>`;
    const res = await fetch('/api/promotions');
    const promos = await res.json();

    if (!promos || promos.length === 0) {
      container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: var(--text-muted);">Brak aktywnych promocji</div>`;
      return;
    }

    container.innerHTML = promos.map((item: any) => `
      <div class="promo-card" style="background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px; display: flex; flex-direction: column; justify-content: space-between; position: relative;">
        <div style="position: absolute; top: 10px; right: 10px; background: #ef4444; color: #fff; font-weight: 700; font-size: 0.75rem; padding: 2px 8px; border-radius: var(--radius-sm);">
          ${item.discountBadge}
        </div>
        
        <div>
          <div style="font-size: 0.8rem; font-weight: 600; color: var(--accent-primary); margin-bottom: 6px;">
            ${item.storeLogo} ${item.storeName}
          </div>

          <div style="height: 120px; overflow: hidden; border-radius: var(--radius-sm); margin-bottom: 10px;">
            <img src="${item.image}" alt="${item.productName[lang]}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>

          <h4 style="font-size: 0.92rem; font-weight: 600; margin: 0 0 4px 0; line-height: 1.3;">
            ${item.productName[lang]}
          </h4>

          <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 6px;">
            ${item.recommendation[lang]}
          </div>

          <div style="font-size: 0.7rem; color: #10b981; font-weight: 500; margin-bottom: 10px;">
            ${tr.validUntilPrefix} ${item.validUntil}
          </div>
        </div>

        <div>
          <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 10px;">
            <span style="font-size: 1.15rem; font-weight: 700; color: var(--accent-primary);">${item.promoPrice} ${currency}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted); text-decoration: line-through;">${item.originalPrice} ${currency}</span>
          </div>

          <button class="btn btn-sm btn-primary btn-add-promo" data-title="${item.productName[lang]}" data-price="${item.promoPrice}" style="width: 100%; font-size: 0.8rem; padding: 8px 10px; font-weight: 600;">
            ${tr.addToCartBtn}
          </button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll<HTMLButtonElement>('.btn-add-promo').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const title = target.dataset.title;
        const price = parseFloat(target.dataset.price || '0');
        if (title) {
          state.shoppingList.push({
            name: { ru: title, en: title, pl: title },
            qty: 1,
            unit: { ru: 'шт', en: 'pcs', pl: 'szt' },
            basePrice: price,
            checked: false
          });
          renderShoppingList();
          renderStores();
          alert(`✅ ${title} ${lang === 'pl' ? 'dodano do listy!' : (lang === 'en' ? 'added to shopping list!' : 'добавлено в список!')}`);
        }
      });
    });
  } catch (err) {
    console.error('Failed to load promotions:', err);
    container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: var(--accent-danger);">Błąd ładowania promocji</div>`;
  }
}

// --- Scanner ---
function initScanner() {
  const btnToggleCam = document.getElementById('btn-toggle-camera');
  const btnCapture = document.getElementById('btn-capture-scan');
  const videoElem = document.getElementById('camera-feed') as HTMLVideoElement | null;
  const fileUpload = document.getElementById('file-upload') as HTMLInputElement | null;
  const sampleChips = document.querySelectorAll<HTMLButtonElement>('.sample-chip');


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

  // Capture real snapshot from active video camera or preview image
  btnCapture?.addEventListener('click', async () => {
    const imgPreview = document.getElementById('image-preview') as HTMLImageElement | null;
    let targetImage = '';

    // 1. If live camera stream is active
    if (videoElem && !videoElem.classList.contains('hidden')) {
      targetImage = aiVisionScanner.captureFrame(videoElem);
    } 
    // 2. If uploaded or preview image is visible
    else if (imgPreview && !imgPreview.classList.contains('hidden') && imgPreview.src && imgPreview.src.startsWith('data:image')) {
      targetImage = imgPreview.src;
    }

    if (!targetImage) {
      const lang = state.currentLang;
      const msg = lang === 'pl' 
        ? 'Włącz kamerę lub wybierz zdjęcie z galerii!' 
        : (lang === 'en' ? 'Please turn on the camera or select a photo from gallery!' : 'Пожалуйста, включите камеру или выберите фото из галереи!');
      alert(msg);
      return;
    }

    showScanLoading(true);
    try {
      const result = await aiVisionScanner.analyzeImage(targetImage);
      renderScanResult(result);
    } catch (err) {
      console.error('AI Scan Error:', err);
    } finally {
      showScanLoading(false);
    }
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
          
          showScanLoading(true);
          try {
            const result = await aiVisionScanner.analyzeImage(dataUrl);
            renderScanResult(result);
          } catch (err) {
            console.error('File Upload Scan Error:', err);
          } finally {
            showScanLoading(false);
          }
        }
      };
      reader.readAsDataURL(files[0]);
    }
  });
}

function showScanLoading(isLoading: boolean) {
  const btnCapture = document.getElementById('btn-capture-scan');
  if (!btnCapture) return;

  if (isLoading) {
    btnCapture.setAttribute('disabled', 'true');
    btnCapture.style.opacity = '0.7';
    btnCapture.innerHTML = `⚡ <span style="display:inline-block; animation: spin 1s linear infinite;">⏳</span> ${state.currentLang === 'pl' ? 'Skanowanie...' : (state.currentLang === 'en' ? 'Scanning...' : 'Сканирование ИИ...')}`;
  } else {
    btnCapture.removeAttribute('disabled');
    btnCapture.style.opacity = '1';
    btnCapture.innerHTML = `⚡ ${state.currentLang === 'pl' ? 'Oblicz kalorie' : (state.currentLang === 'en' ? 'Calculate calories' : 'Определить калории')}`;
  }
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
  state.lastScanResult = result;
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
        <span>⚖️ ${tr.portionWeightLabel}</span>
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
    const finalP = Math.round(parseFloat(document.getElementById('dyn-protein')?.innerText || result.protein.toString()));
    const finalF = Math.round(parseFloat(document.getElementById('dyn-fat')?.innerText || result.fat.toString()));
    const finalC = Math.round(parseFloat(document.getElementById('dyn-carbs')?.innerText || result.carbs.toString()));

    const newMeal: MealEntry = {
      id: 'scan_' + Date.now(),
      name: result.title[lang],
      calories: finalKcal,
      protein: finalP,
      fat: finalF,
      carbs: finalC,
      mealType: 'lunch',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (!state.loggedMeals) state.loggedMeals = [];
    state.loggedMeals.push(newMeal);
    localStorage.setItem('cookcraft_logged_meals', JSON.stringify(state.loggedMeals));
    alert(`+ ${result.title[lang]} (${finalKcal} kcal)`);
    switchView('view-diary');
  });
}

function initDiary() {
  const genderBtns = document.querySelectorAll<HTMLButtonElement>('.gender-btn');
  genderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      genderBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (state.userProfile) {
        state.userProfile.gender = (btn.dataset.gender as any) || 'male';
      }
      updateLiveCalculatorOutput();
    });
  });

  const inputs = ['calc-age', 'calc-weight', 'calc-height', 'calc-activity', 'calc-goal'];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('input', updateLiveCalculatorOutput);
    el?.addEventListener('change', updateLiveCalculatorOutput);
  });

  document.getElementById('btn-apply-profile')?.addEventListener('click', () => {
    const profile = getProfileFromInputs();
    state.userProfile = profile;
    localStorage.setItem('cookcraft_user_profile', JSON.stringify(profile));
    renderDiary();
    alert(state.currentLang === 'pl' ? 'Zapisano cel w dzienniku!' : (state.currentLang === 'en' ? 'Calorie target saved!' : 'Цель сохранена в дневнике!'));
  });

  document.getElementById('btn-add-quick-meal')?.addEventListener('click', () => {
    const titlePrompt = state.currentLang === 'pl' ? 'Nazwa dania:' : (state.currentLang === 'en' ? 'Meal name:' : 'Название блюда:');
    const kcalPrompt = state.currentLang === 'pl' ? 'Kalorie (kcal):' : (state.currentLang === 'en' ? 'Calories (kcal):' : 'Калории (ккал):');
    
    const name = prompt(titlePrompt, state.currentLang === 'pl' ? 'Przekąska' : 'Перекус');
    if (!name) return;
    const kcalStr = prompt(kcalPrompt, '250');
    if (!kcalStr) return;
    const calories = parseInt(kcalStr) || 0;
    
    const newMeal: MealEntry = {
      id: 'meal_' + Date.now(),
      name,
      calories,
      protein: Math.round(calories * 0.15 / 4),
      fat: Math.round(calories * 0.3 / 9),
      carbs: Math.round(calories * 0.55 / 4),
      mealType: 'snack',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (!state.loggedMeals) state.loggedMeals = [];
    state.loggedMeals.push(newMeal);
    localStorage.setItem('cookcraft_logged_meals', JSON.stringify(state.loggedMeals));
    renderDiary();
  });
}

function getProfileFromInputs(): UserProfile {
  const genderBtn = document.querySelector<HTMLButtonElement>('.gender-btn.active');
  const gender = (genderBtn?.dataset.gender as any) || 'male';
  const age = parseInt((document.getElementById('calc-age') as HTMLInputElement)?.value) || 25;
  const weight = parseFloat((document.getElementById('calc-weight') as HTMLInputElement)?.value) || 75;
  const height = parseFloat((document.getElementById('calc-height') as HTMLInputElement)?.value) || 178;
  const activity = ((document.getElementById('calc-activity') as HTMLSelectElement)?.value as any) || 'moderate';
  const goal = ((document.getElementById('calc-goal') as HTMLSelectElement)?.value as any) || 'maintain';

  return createFullUserProfile(gender, age, weight, height, activity, goal);
}

function updateLiveCalculatorOutput() {
  const profile = getProfileFromInputs();
  
  const bmrEl = document.getElementById('res-bmr');
  const tdeeEl = document.getElementById('res-tdee');
  const targetEl = document.getElementById('res-target');
  const pEl = document.getElementById('res-macro-protein');
  const fEl = document.getElementById('res-macro-fat');
  const cEl = document.getElementById('res-macro-carbs');

  const kcalUnit = state.currentLang === 'pl' ? 'kcal' : (state.currentLang === 'en' ? 'kcal' : 'ккал');

  if (bmrEl) bmrEl.innerText = `${profile.bmr.toLocaleString()} ${kcalUnit}`;
  if (tdeeEl) tdeeEl.innerText = `${profile.tdee.toLocaleString()} ${kcalUnit}`;
  if (targetEl) targetEl.innerText = `${profile.targetCalories.toLocaleString()} ${kcalUnit}`;
  
  const pLabel = state.currentLang === 'pl' ? 'Białka' : (state.currentLang === 'en' ? 'Protein' : 'Белки');
  const fLabel = state.currentLang === 'pl' ? 'Tłuszcze' : (state.currentLang === 'en' ? 'Fats' : 'Жиры');
  const cLabel = state.currentLang === 'pl' ? 'Węglowodany' : (state.currentLang === 'en' ? 'Carbs' : 'Углеводы');

  if (pEl) pEl.innerText = `${pLabel}: ${profile.targetProtein}g`;
  if (fEl) fEl.innerText = `${fLabel}: ${profile.targetFat}g`;
  if (cEl) cEl.innerText = `${cLabel}: ${profile.targetCarbs}g`;
}

function renderDiary() {
  const tr = t();
  const profile = state.userProfile || createFullUserProfile('male', 25, 75, 178, 'moderate', 'maintain');
  const meals = state.loggedMeals || [];

  // Update calculator inputs if form is loaded
  const ageInput = document.getElementById('calc-age') as HTMLInputElement | null;
  if (ageInput && ageInput.value !== profile.age.toString()) ageInput.value = profile.age.toString();
  
  const weightInput = document.getElementById('calc-weight') as HTMLInputElement | null;
  if (weightInput && weightInput.value !== profile.weight.toString()) weightInput.value = profile.weight.toString();
  
  const heightInput = document.getElementById('calc-height') as HTMLInputElement | null;
  if (heightInput && heightInput.value !== profile.height.toString()) heightInput.value = profile.height.toString();

  updateLiveCalculatorOutput();

  // Sum today's meals
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = Math.round(meals.reduce((sum, m) => sum + m.protein, 0));
  const totalFat = Math.round(meals.reduce((sum, m) => sum + m.fat, 0));
  const totalCarbs = Math.round(meals.reduce((sum, m) => sum + m.carbs, 0));

  state.diaryConsumed = totalCalories;

  // Update Ring Gauge
  const consumedEl = document.getElementById('consumed-calories');
  if (consumedEl) consumedEl.innerText = totalCalories.toLocaleString();

  const labelEl = document.getElementById('consumed-label-text');
  if (labelEl) {
    labelEl.innerText = tr.consumedLabel.replace('{target}', profile.targetCalories.toLocaleString());
  }

  const progressBar = document.getElementById('calorie-progress-bar') as SVGCircleElement | null;
  if (progressBar) {
    const radius = 42;
    const circumference = 2 * Math.PI * radius; // ~263.89
    const ratio = Math.min(totalCalories / profile.targetCalories, 1.2);
    const offset = Math.max(0, circumference - (circumference * ratio));
    progressBar.style.strokeDasharray = `${circumference}`;
    progressBar.style.strokeDashoffset = `${offset}`;
  }

  // Update Macro Bars
  const pText = document.getElementById('macro-protein');
  if (pText) pText.innerText = `${totalProtein} g / ${profile.targetProtein} g`;
  const fillP = document.getElementById('fill-protein');
  if (fillP) fillP.style.width = `${Math.min(100, Math.round((totalProtein / profile.targetProtein) * 100))}%`;

  const fText = document.getElementById('macro-fat');
  if (fText) fText.innerText = `${totalFat} g / ${profile.targetFat} g`;
  const fillF = document.getElementById('fill-fat');
  if (fillF) fillF.style.width = `${Math.min(100, Math.round((totalFat / profile.targetFat) * 100))}%`;

  const cText = document.getElementById('macro-carbs');
  if (cText) cText.innerText = `${totalCarbs} g / ${profile.targetCarbs} g`;
  const fillC = document.getElementById('fill-carbs');
  if (fillC) fillC.style.width = `${Math.min(100, Math.round((totalCarbs / profile.targetCarbs) * 100))}%`;

  // Render Meals List
  const mealsList = document.getElementById('meals-list');
  if (mealsList) {
    if (meals.length === 0) {
      mealsList.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px; font-size: 0.9rem;">
        ${state.currentLang === 'pl' ? 'Brak wpisanych posiłków na dziś' : (state.currentLang === 'en' ? 'No logged meals for today' : 'Сегодня еще нет записей в дневнике')}
      </div>`;
    } else {
      mealsList.innerHTML = meals.map(m => `
        <div class="meal-item">
          <div class="meal-info-left">
            <span class="meal-title-name">${m.name}</span>
            <span class="meal-time-tag">⏱️ ${m.time} • P: ${m.protein}g, F: ${m.fat}g, C: ${m.carbs}g</span>
          </div>
          <div class="meal-info-right">
            <span class="meal-kcal-badge">${m.calories} kcal</span>
            <button type="button" class="btn-remove-meal" data-id="${m.id}" title="Remove">🗑️</button>
          </div>
        </div>
      `).join('');

      mealsList.querySelectorAll<HTMLButtonElement>('.btn-remove-meal').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          state.loggedMeals = (state.loggedMeals || []).filter(m => m.id !== id);
          localStorage.setItem('cookcraft_logged_meals', JSON.stringify(state.loggedMeals));
          renderDiary();
        });
      });
    }
  }
}

function applyTheme(theme: 'dark' | 'light') {
  state.theme = theme;
  localStorage.setItem('cookcraft_theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);

  if (theme === 'light') {
    document.documentElement.classList.add('light-theme');
    document.documentElement.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
  } else {
    document.documentElement.classList.add('dark-theme');
    document.documentElement.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  }

  const btn = document.getElementById('btn-theme-toggle');
  if (btn) {
    const icon = btn.querySelector('.theme-icon');
    if (icon) icon.textContent = theme === 'light' ? '☀️' : '🌙';
  }
}

function initThemeToggle() {
  const btn = document.getElementById('btn-theme-toggle');
  if (!btn) return;

  const savedTheme = (localStorage.getItem('cookcraft_theme') as 'dark' | 'light') || 'dark';
  applyTheme(savedTheme);

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const currentIsLight = document.body.classList.contains('light-theme') || document.documentElement.classList.contains('light-theme');
    const nextTheme = currentIsLight ? 'dark' : 'light';
    applyTheme(nextTheme);
  });
}
