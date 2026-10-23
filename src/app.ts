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
import { getDynamicPromotions, PromotionItem } from './data/promotions';
import { searchCatalogProducts } from './data/groceryCatalog';
import { calculateStoreTotals, fetchRealSupermarkets, initGooglePlaces, fetchGooglePlacesSupermarkets } from './services/storeCalculator';
import { getItemDynamicPrice, getCartActiveTotal, fetchLiveSupermarketPricing } from './services/supermarketPriceService';
import { scannerService } from './services/scanner';
import { aiVisionScanner, VisionScanResult } from './services/aiVisionScanner';
import { TRANSLATIONS, Language } from './i18n/translations';
import { createFullUserProfile } from './services/nutritionCalculator';
import { MealEntry, UserProfile, Ingredient } from './types';
import { authService, AuthUser } from './services/authService';

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
let activeMealCategoryFilter: 'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack' = 'all';

const SMART_MEAL_PRESETS = [
  {
    name: { pl: '🥣 Owsianka z borówkami i orzechami', en: '🥣 Oatmeal with Blueberries & Walnuts', ru: '🥣 Овсянка с черникой и орехами' },
    calories: 340, protein: 12, fat: 9, carbs: 52, mealType: 'breakfast' as const
  },
  {
    name: { pl: '🥪 Tost z awokado i jajkiem sadzonym', en: '🥪 Avocado Toast with Poached Egg', ru: '🥪 Тост с авокадо и яйцом пашот' },
    calories: 390, protein: 18, fat: 22, carbs: 30, mealType: 'breakfast' as const
  },
  {
    name: { pl: '🥗 Sałatka z grillowanym kurczakiem', en: '🥗 Grilled Chicken Salad Bowl', ru: '🥗 Салат с курицей гриль' },
    calories: 460, protein: 42, fat: 16, carbs: 28, mealType: 'lunch' as const
  },
  {
    name: { pl: '🍝 Makaron pełnoziarnisty Bolognese', en: '🍝 Whole-Wheat Pasta Bolognese', ru: '🍝 Паста Болоньезе цельнозерновая' },
    calories: 580, protein: 36, fat: 18, carbs: 68, mealType: 'lunch' as const
  },
  {
    name: { pl: '🥩 Łosoś pieczony z batatami i brokułem', en: '🥩 Baked Salmon with Sweet Potato & Broccoli', ru: '🥩 Запеченный лосось с бататом и брокколи' },
    calories: 520, protein: 44, fat: 20, carbs: 42, mealType: 'dinner' as const
  },
  {
    name: { pl: '🧀 Twaróg z rzodkiewką i szczypiorkiem', en: '🧀 Cottage Cheese with Radish & Chives', ru: '🧀 Творог с редисом и зеленью' },
    calories: 260, protein: 32, fat: 6, carbs: 14, mealType: 'dinner' as const
  },
  {
    name: { pl: '🥤 Shake białkowy z bananem i masłem orzechowym', en: '🥤 Protein Shake with Banana & Peanut Butter', ru: '🥤 Протеиновый коктейль с бананом' },
    calories: 310, protein: 32, fat: 8, carbs: 32, mealType: 'snack' as const
  },
  {
    name: { pl: '🍎 Jabłko z garścią migdałów', en: '🍎 Apple with Handful of Almonds', ru: '🍎 Яблоко с горстью миндаля' },
    calories: 210, protein: 5, fat: 12, carbs: 22, mealType: 'snack' as const
  },
  {
    name: { pl: '☕ Kawa Flat White (mleko owsiane)', en: '☕ Flat White (Oat Milk)', ru: '☕ Флэт уайт на овсяном молоке' },
    calories: 130, protein: 3, fat: 4, carbs: 18, mealType: 'snack' as const
  }
];

let savedLang = (localStorage.getItem('cookcraft_lang') as Language) || 'ru';

// Strictly purge all legacy profile and meal data from localStorage
localStorage.removeItem('cookcraft_user_profile');
localStorage.removeItem('cookcraft_logged_meals');
localStorage.removeItem('cookcraft_water_consumed');

// Default in-memory profile and meals matching ZUVIA design while loading from Prisma
const defaultProfile: UserProfile = createFullUserProfile('male', 25, 75, 178, 'moderate', 'maintain');
defaultProfile.bodyFatPercent = 34;
defaultProfile.musclePercent = 49;
defaultProfile.targetWeightGoal = 72;
defaultProfile.targetMonthsRemaining = 2;
defaultProfile.targetCalories = 2702;
defaultProfile.targetProtein = 120;
defaultProfile.targetFat = 120;
defaultProfile.targetCarbs = 120;

const defaultMeals: MealEntry[] = [
  { id: 'sample_breakfast', name: 'Овсянка с ягодами и протеином', calories: 420, protein: 28, fat: 18, carbs: 36, mealType: 'breakfast', time: '08:30' },
  { id: 'sample_lunch', name: 'Куриная грудка с рисом и авокадо', calories: 680, protein: 42, fat: 38, carbs: 42, mealType: 'lunch', time: '13:15' },
  { id: 'sample_dinner', name: 'Лосось на гриле со свежими овощами', calories: 540, protein: 22, fat: 36, carbs: 14, mealType: 'dinner', time: '19:00' },
  { id: 'sample_snack', name: 'Греческий йогурт с орехами', calories: 200, protein: 0, fat: 0, carbs: 0, mealType: 'snack', time: '16:30' }
];
const defaultWater = 1000;
let selectedDiaryDate = '15/09/2027';
let activeDetailsMealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' = 'breakfast';

// Load persisted shopping list
const savedShoppingListRaw = localStorage.getItem('cookcraft_shopping_list');
const defaultShoppingList: Ingredient[] = savedShoppingListRaw 
  ? JSON.parse(savedShoppingListRaw)
  : RECIPES_DATA[0].ingredients.map(ing => ({ ...ing, checked: false }));

// Load persisted servings count
const savedServingsRaw = localStorage.getItem('cookcraft_servings_count');
const defaultServings = savedServingsRaw ? parseInt(savedServingsRaw) || 2 : 2;

// Load persisted active recipe
const savedRecipeRaw = localStorage.getItem('cookcraft_shopping_recipe');
const defaultRecipe = savedRecipeRaw ? JSON.parse(savedRecipeRaw) : RECIPES_DATA[0];

let activePromoCategory = 'all';
let promoSearchQuery = '';
let promoSortBy = 'discount';

// App State
const state: AppState = {
  currentLang: savedLang,
  currentView: 'view-home',
  recipes: RECIPES_DATA,
  activeFilter: 'all',
  searchQuery: '',
  activeRecipeForShopping: defaultRecipe,
  servingsCount: defaultServings,
  shoppingList: defaultShoppingList,
  storeFilterMode: 'best-price',
  diaryConsumed: 0,
  waterConsumedMl: defaultWater,
  cameraStream: null,
  theme: 'dark',
  userLocation: null,
  isStoresListExpanded: false,
  userProfile: defaultProfile,
  loggedMeals: defaultMeals
};

function saveShoppingState() {
  localStorage.setItem('cookcraft_shopping_list', JSON.stringify(state.shoppingList));
  localStorage.setItem('cookcraft_servings_count', state.servingsCount.toString());
  localStorage.setItem('cookcraft_shopping_recipe', JSON.stringify(state.activeRecipeForShopping));
}

function applyPrismaUserToState(user: AuthUser) {
  const gender = (user.gender as any) || 'male';
  const age = user.age || 23;
  const weight = user.weight || 89;
  const height = user.height || 190;
  const activity = (user.activity as any) || 'moderate';
  const goal = (user.goal as any) || 'lose';
  const formula = (user.formula as any) || 'mifflin';

  const prof = createFullUserProfile(gender, age, weight, height, activity, goal, formula);
  if (user.targetCalories) prof.targetCalories = user.targetCalories;
  if (user.targetProtein) prof.targetProtein = user.targetProtein;
  if (user.targetFat) prof.targetFat = user.targetFat;
  if (user.targetCarbs) prof.targetCarbs = user.targetCarbs;
  if (user.targetFiber) prof.targetFiber = user.targetFiber;
  if (user.targetWaterMl) prof.targetWaterMl = user.targetWaterMl;
  if (user.bodyFatPercent) prof.bodyFatPercent = user.bodyFatPercent;
  if (user.musclePercent) prof.musclePercent = user.musclePercent;
  if (user.targetWeightGoal) prof.targetWeightGoal = user.targetWeightGoal;
  if (user.targetMonthsRemaining) prof.targetMonthsRemaining = user.targetMonthsRemaining;

  state.userProfile = prof;
  if (user.waterConsumed !== undefined) {
    state.waterConsumedMl = user.waterConsumed;
  }
}

async function syncPrismaUserData() {
  try {
    const user = await authService.ensureSession();
    if (user) {
      applyPrismaUserToState(user);
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const meals = await authService.fetchDiary(todayStr);
    if (meals && Array.isArray(meals) && meals.length > 0) {
      state.loggedMeals = meals.map(bm => ({
        id: bm.id,
        name: bm.name,
        calories: bm.calories,
        protein: bm.protein,
        fat: bm.fat,
        carbs: bm.carbs,
        mealType: bm.mealType,
        time: bm.time || '12:00'
      }));
    }

    renderDiary();
    renderHomeDashboard();
  } catch (err) {
    console.warn('[Prisma Sync] Error loading user data from Prisma:', err);
  }
}

async function startApp() {
  initLangSwitcher();
  initNavigation();
  initHomeDashboard();
  initRecipes();
  initShopping();
  initScanner();
  initDiary();
  initThemeToggle();
  initAuth();
  renderAll();
  renderPromotions();
  updateStaticTexts();

  // Load and sync user profile & diary meals directly from Prisma ORM!
  await syncPrismaUserData();
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
  renderAll();
  renderPromotions();
  updateStaticTexts();
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
}

function syncCustomSelects() {
  const lang = state.currentLang;
  const actSelectEl = document.getElementById('edit-param-activity') as HTMLSelectElement | null;
  const goalSelectEl = document.getElementById('edit-param-goal') as HTMLSelectElement | null;
  const actVal = actSelectEl?.value || state.userProfile?.activity || 'moderate';
  const goalVal = goalSelectEl?.value || state.userProfile?.goal || 'maintain';

  // Activity labels mapping
  const actLabels: Record<string, { emoji: string; text: string }> = {
    sedentary: { emoji: '💤', text: lang === 'ru' ? 'Сидячий образ жизни (x1.2)' : (lang === 'pl' ? 'Siedzący tryb życia (x1.2)' : 'Sedentary lifestyle (x1.2)') },
    light: { emoji: '🚶', text: lang === 'ru' ? 'Легкие тренировки 1-3 р/нед (x1.375)' : (lang === 'pl' ? 'Lekki trening 1-3 razy/tydz. (x1.375)' : 'Light exercise 1-3 times/wk (x1.375)') },
    moderate: { emoji: '🏃', text: lang === 'ru' ? 'Умеренная активность 3-5 р/нед (x1.55)' : (lang === 'pl' ? 'Umiarkowana aktywność 3-5 razy/tydz. (x1.55)' : 'Moderate activity 3-5 times/wk (x1.55)') },
    very: { emoji: '🔥', text: lang === 'ru' ? 'Высокая активность 6-7 р/нед (x1.725)' : (lang === 'pl' ? 'Wysoka aktywność 6-7 razy/tydz. (x1.725)' : 'High activity 6-7 times/wk (x1.725)') },
    extra: { emoji: '⚡', text: lang === 'ru' ? 'Экстремальный / Физический труд (x1.9)' : (lang === 'pl' ? 'Ekstremalny / praca fizyczna (x1.9)' : 'Extreme / physical labor (x1.9)') }
  };

  // Goal labels mapping
  const goalLabels: Record<string, { emoji: string; text: string }> = {
    lose: { emoji: '📉', text: lang === 'ru' ? 'Похудение (-15% дефицит)' : (lang === 'pl' ? 'Redukcja wagi (-15% deficyt)' : 'Weight loss (-15% deficit)') },
    maintain: { emoji: '⚖️', text: lang === 'ru' ? 'Поддержание веса (баланс)' : (lang === 'pl' ? 'Utrzymanie wagi (balans)' : 'Maintain weight (balance)') },
    gain: { emoji: '📈', text: lang === 'ru' ? 'Набор массы (+15% профицит)' : (lang === 'pl' ? 'Budowanie masy (+15% nadwyżka)' : 'Muscle gain (+15% surplus)') }
  };

  // Update Activity Trigger & Options
  const currentAct = actLabels[actVal] || actLabels['moderate'];
  const actBtnLbl = document.getElementById('lbl-custom-activity');
  const actIcon = document.getElementById('activity-capsule-icon');
  if (actBtnLbl) actBtnLbl.textContent = currentAct.text;
  if (actIcon) actIcon.textContent = currentAct.emoji;

  const actDropdown = document.getElementById('dropdown-activity');
  if (actDropdown) {
    actDropdown.querySelectorAll<HTMLElement>('.zuvia-custom-option').forEach(opt => {
      const val = opt.dataset.value;
      if (val && actLabels[val]) {
        const textSpan = opt.querySelector<HTMLElement>('.opt-text');
        if (textSpan) textSpan.textContent = actLabels[val].text;
        opt.classList.toggle('selected', val === actVal);
      }
    });
  }

  // Update Goal Trigger & Options
  const currentGoal = goalLabels[goalVal] || goalLabels['maintain'];
  const goalBtnLbl = document.getElementById('lbl-custom-goal');
  const goalIcon = document.getElementById('goal-capsule-icon');
  if (goalBtnLbl) goalBtnLbl.textContent = currentGoal.text;
  if (goalIcon) goalIcon.textContent = currentGoal.emoji;

  const goalDropdown = document.getElementById('dropdown-goal');
  if (goalDropdown) {
    goalDropdown.querySelectorAll<HTMLElement>('.zuvia-custom-option').forEach(opt => {
      const val = opt.dataset.value;
      if (val && goalLabels[val]) {
        const textSpan = opt.querySelector<HTMLElement>('.opt-text');
        if (textSpan) textSpan.textContent = goalLabels[val].text;
        opt.classList.toggle('selected', val === goalVal);
      }
    });
  }
}

function updateStaticTexts() {
  const lang = state.currentLang;
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
    if (cat === 'soup') pill.textContent = tr.catSoup;
    if (cat === 'main') pill.textContent = tr.catMain;
    if (cat === 'snack') pill.textContent = tr.catSnack;
    if (cat === 'dessert') pill.textContent = tr.catDessert;
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

  const lblCustomTitle = document.getElementById('lbl-add-custom-title');
  const lblCustomHint = document.getElementById('lbl-add-custom-hint');
  const lblCustomQty = document.getElementById('lbl-custom-qty');
  const lblCustomUnit = document.getElementById('lbl-custom-unit');
  const lblCustomPrice = document.getElementById('lbl-custom-price');
  const addBtn = document.getElementById('btn-add-item');
  if (lblCustomTitle) lblCustomTitle.textContent = tr.addCustomTitle;
  if (lblCustomHint) lblCustomHint.textContent = tr.addCustomHint;
  if (lblCustomQty) lblCustomQty.textContent = tr.customQtyLabel;
  if (lblCustomUnit) lblCustomUnit.textContent = tr.customUnitLabel;
  if (lblCustomPrice) lblCustomPrice.textContent = tr.customPriceLabel;
  if (addBtn) addBtn.textContent = tr.customAddBtn;

  // Custom unit select options localization
  const customUnitSelect = document.getElementById('custom-item-unit') as HTMLSelectElement | null;
  if (customUnitSelect) {
    const optSzt = customUnitSelect.querySelector('option[value="szt"]');
    const optKg = customUnitSelect.querySelector('option[value="kg"]');
    const optG = customUnitSelect.querySelector('option[value="g"]');
    const optL = customUnitSelect.querySelector('option[value="l"]');
    const optMl = customUnitSelect.querySelector('option[value="ml"]');
    const optOpak = customUnitSelect.querySelector('option[value="opak."]');
    if (optSzt) optSzt.textContent = lang === 'pl' ? 'szt (sztuka)' : (lang === 'en' ? 'pcs (piece)' : 'шт (штука)');
    if (optKg) optKg.textContent = lang === 'pl' ? 'kg (kilogram)' : (lang === 'en' ? 'kg (kilogram)' : 'кг (килограмм)');
    if (optG) optG.textContent = lang === 'pl' ? 'g (gram)' : (lang === 'en' ? 'g (gram)' : 'г (грамм)');
    if (optL) optL.textContent = lang === 'pl' ? 'l (litr)' : (lang === 'en' ? 'l (liter)' : 'л (литр)');
    if (optMl) optMl.textContent = lang === 'pl' ? 'ml (mililitr)' : (lang === 'en' ? 'ml (milliliter)' : 'мл (миллилитр)');
    if (optOpak) optOpak.textContent = lang === 'pl' ? 'opak. (opakowanie)' : (lang === 'en' ? 'pack (package)' : 'упак. (упаковка)');
  }

  const customInput = document.getElementById('custom-item-input') as HTMLInputElement | null;
  if (customInput) customInput.placeholder = tr.addCustomPlaceholder;

  const addrInput = document.getElementById('store-address-input') as HTMLInputElement | null;
  if (addrInput) addrInput.placeholder = tr.addressPlaceholder;

  const addrBtn = document.getElementById('btn-search-address');
  if (addrBtn) addrBtn.textContent = tr.addressSearchBtn;

  const tabComparison = document.getElementById('tab-btn-comparison');
  const tabDeals = document.getElementById('tab-btn-deals');
  if (tabComparison) tabComparison.textContent = tr.tabComparison;
  if (tabDeals) tabDeals.textContent = tr.tabDeals;

  const promoSearch = document.getElementById('promo-search-input') as HTMLInputElement | null;
  if (promoSearch) promoSearch.placeholder = tr.promoSearchPlaceholder;

  const promoSortSelect = document.getElementById('promo-sort-select') as HTMLSelectElement | null;
  if (promoSortSelect) {
    const optDisc = promoSortSelect.querySelector('option[value="discount"]');
    const optPrice = promoSortSelect.querySelector('option[value="price-asc"]');
    const optExp = promoSortSelect.querySelector('option[value="expiring"]');
    if (optDisc) optDisc.textContent = tr.promoSortDiscount;
    if (optPrice) optPrice.textContent = tr.promoSortPrice;
    if (optExp) optExp.textContent = tr.promoSortExpiring;
  }

  const lblPromoCatHeader = document.getElementById('lbl-promo-cat-header');
  const lblPromoStoreHeader = document.getElementById('lbl-promo-store-header');
  if (lblPromoCatHeader) lblPromoCatHeader.textContent = tr.promoCatHeader;
  if (lblPromoStoreHeader) lblPromoStoreHeader.textContent = tr.promoStoreHeader;

  document.querySelectorAll<HTMLButtonElement>('#promo-cat-container .pill').forEach(pill => {
    const cat = pill.dataset.promoCat;
    if (cat === 'all') pill.textContent = `🌐 ${tr.catAll}`;
    if (cat === 'healthy') pill.textContent = tr.promoCatHealthy;
    if (cat === 'breakfast') pill.textContent = tr.promoCatBreakfast;
    if (cat === 'lunch') pill.textContent = tr.promoCatLunch;
    if (cat === 'fast') pill.textContent = tr.promoCatFast;
    if (cat === 'dessert') pill.textContent = tr.promoCatDessert;
  });

  const storesH2 = document.querySelector('#view-shopping .stores-card .card-header h2');
  if (storesH2) storesH2.textContent = tr.storesHeader;

  const mapH3 = document.querySelector('#view-shopping .stores-card .map-header h3');
  if (mapH3) mapH3.textContent = tr.mapHeader;

  const filterBest = document.getElementById('filter-best-price');
  const filterNear = document.getElementById('filter-nearest');
  if (filterBest) filterBest.textContent = tr.bestPriceToggle;
  if (filterNear) filterNear.textContent = tr.nearestToggle;

  const btnLocate = document.getElementById('btn-locate-me');
  if (btnLocate && !btnLocate.classList.contains('locating-pulse')) {
    const curLang = state.currentLang;
    btnLocate.textContent = curLang === 'ru' ? '📍 Найти меня (GPS)' : (curLang === 'pl' ? '📍 Znajdź mnie (GPS)' : '📍 Find me (GPS)');
  }
  
  const diaryTitle = document.getElementById('diary-title');
  const diarySub = document.getElementById('diary-subtitle');
  if (diaryTitle) diaryTitle.textContent = tr.diaryTitle;
  if (diarySub) diarySub.textContent = tr.diarySubtitle;

  // ZUVIA Calories Page Static Translations
  const diaryProgressTitle = document.getElementById('diary-progress-title');
  const diaryTodayTitle = document.getElementById('diary-today-title');
  const diaryStatsTitle = document.getElementById('diary-stats-title');
  const diaryGoalsTitle = document.getElementById('diary-goals-title');
  const diaryGoalWeightTitle = document.getElementById('diary-goal-weight-title');
  const diaryGoalWorkoutsTitle = document.getElementById('diary-goal-workouts-title');
  const diaryParamsTitle = document.getElementById('diary-params-title');
  const diaryWaterTitle = document.getElementById('diary-water-title');
  const diaryNormTitle = document.getElementById('diary-norm-title');
  const btnEditParams = document.getElementById('diary-btn-edit-params');
  const btnRecalculate = document.getElementById('diary-btn-recalculate');

  if (diaryProgressTitle) diaryProgressTitle.textContent = tr.calProgress;
  if (diaryTodayTitle) diaryTodayTitle.textContent = tr.calToday;
  if (diaryStatsTitle) diaryStatsTitle.textContent = tr.calStatistics;
  if (diaryGoalsTitle) diaryGoalsTitle.textContent = tr.calGoalsTitle;
  if (diaryGoalWeightTitle) diaryGoalWeightTitle.textContent = tr.calWeightLossProgress;
  if (diaryGoalWorkoutsTitle) diaryGoalWorkoutsTitle.textContent = tr.calWorkouts;
  if (diaryParamsTitle) diaryParamsTitle.textContent = tr.calParamsTitle;
  if (diaryWaterTitle) diaryWaterTitle.textContent = tr.waterTrackerTitle;
  if (diaryNormTitle) diaryNormTitle.textContent = tr.calNormTitle;
  if (btnEditParams) btnEditParams.textContent = tr.calEdit;
  if (btnRecalculate) btnRecalculate.textContent = tr.calRecalculate;

  const lblProtein = document.getElementById('diary-lbl-protein');
  const lblFat = document.getElementById('diary-lbl-fat');
  const lblCarbs = document.getElementById('diary-lbl-carbs');
  if (lblProtein) lblProtein.textContent = tr.proteinLabel;
  if (lblFat) lblFat.textContent = tr.fatLabel;
  if (lblCarbs) lblCarbs.textContent = tr.carbsLabel;

  const mealBTitle = document.getElementById('diary-meal-breakfast-title');
  const mealLTitle = document.getElementById('diary-meal-lunch-title');
  const mealDTitle = document.getElementById('diary-meal-dinner-title');
  const mealSTitle = document.getElementById('diary-meal-snack-title');
  if (mealBTitle) mealBTitle.textContent = tr.mealBreakfast;
  if (mealLTitle) mealLTitle.textContent = tr.mealLunch;
  if (mealDTitle) mealDTitle.textContent = tr.mealDinner;
  if (mealSTitle) mealSTitle.textContent = tr.mealSnack;

  const paramWeightLbl = document.getElementById('diary-param-weight-lbl');
  const paramHeightLbl = document.getElementById('diary-param-height-lbl');
  const paramAgeLbl = document.getElementById('diary-param-age-lbl');
  const paramFatLbl = document.getElementById('diary-param-fat-lbl');
  const paramMuscleLbl = document.getElementById('diary-param-muscle-lbl');
  const paramGenderLbl = document.getElementById('diary-param-gender-lbl');
  const btnToggleGender = document.getElementById('btn-toggle-gender') as HTMLButtonElement | null;
  const genderToggleText = document.getElementById('gender-toggle-text');
  const lblSaveParamsText = document.getElementById('lbl-save-params-text');
  const lblPreviewNormTag = document.getElementById('lbl-preview-norm-tag');

  if (paramWeightLbl) paramWeightLbl.textContent = lang === 'ru' ? 'Вес (кг)' : (lang === 'pl' ? 'Waga (kg)' : 'Weight (kg)');
  if (paramHeightLbl) paramHeightLbl.textContent = lang === 'ru' ? 'Рост (см)' : (lang === 'pl' ? 'Wzrost (cm)' : 'Height (cm)');
  if (paramAgeLbl) paramAgeLbl.textContent = lang === 'ru' ? 'Возраст (лет)' : (lang === 'pl' ? 'Wiek (lat)' : 'Age (years)');
  if (paramFatLbl) paramFatLbl.textContent = lang === 'ru' ? 'Жир (%)' : (lang === 'pl' ? 'Tłuszcz' : 'Body Fat');
  if (paramMuscleLbl) paramMuscleLbl.textContent = lang === 'ru' ? 'Мышцы (%)' : (lang === 'pl' ? 'Mięśnie' : 'Muscles');
  if (paramGenderLbl) paramGenderLbl.textContent = lang === 'ru' ? 'Пол' : (lang === 'pl' ? 'Płeć' : 'Gender');

  if (genderToggleText && btnToggleGender) {
    const isFemale = btnToggleGender.dataset.gender === 'female';
    if (isFemale) {
      genderToggleText.textContent = lang === 'ru' ? 'Женщина' : (lang === 'pl' ? 'Kobieta' : 'Female');
    } else {
      genderToggleText.textContent = lang === 'ru' ? 'Мужчина' : (lang === 'pl' ? 'Mężczyzna' : 'Male');
    }
  }

  if (lblSaveParamsText) lblSaveParamsText.textContent = lang === 'ru' ? 'Сохранить' : (lang === 'pl' ? 'Zapisz parametry' : 'Save parameters');
  if (lblPreviewNormTag) lblPreviewNormTag.textContent = lang === 'ru' ? 'Норма:' : (lang === 'pl' ? 'Norma:' : 'Target:');

  const actSelectEl = document.getElementById('edit-param-activity') as HTMLSelectElement | null;
  if (actSelectEl) {
    const opt0 = actSelectEl.querySelector('option[value="sedentary"]');
    const opt1 = actSelectEl.querySelector('option[value="light"]');
    const opt2 = actSelectEl.querySelector('option[value="moderate"]');
    const opt3 = actSelectEl.querySelector('option[value="very"]');
    const opt4 = actSelectEl.querySelector('option[value="extra"]');
    if (opt0) opt0.textContent = lang === 'ru' ? '💤 Сидячий образ жизни (x1.2)' : (lang === 'pl' ? '💤 Siedzący tryb życia (x1.2)' : '💤 Sedentary lifestyle (x1.2)');
    if (opt1) opt1.textContent = lang === 'ru' ? '🚶 Легкие тренировки 1-3 р/нед (x1.375)' : (lang === 'pl' ? '🚶 Lekki trening 1-3 razy/tydz. (x1.375)' : '🚶 Light exercise 1-3 times/wk (x1.375)');
    if (opt2) opt2.textContent = lang === 'ru' ? '🏃 Умеренная активность 3-5 р/нед (x1.55)' : (lang === 'pl' ? '🏃 Umiarkowana aktywność 3-5 razy/tydz. (x1.55)' : '🏃 Moderate activity 3-5 times/wk (x1.55)');
    if (opt3) opt3.textContent = lang === 'ru' ? '🔥 Высокая активность 6-7 р/нед (x1.725)' : (lang === 'pl' ? '🔥 Wysoka aktywność 6-7 razy/tydz. (x1.725)' : '🔥 High activity 6-7 times/wk (x1.725)');
    if (opt4) opt4.textContent = lang === 'ru' ? '⚡ Экстремальный / Физический труд (x1.9)' : (lang === 'pl' ? '⚡ Ekstremalny / praca fizyczna (x1.9)' : '⚡ Extreme / physical labor (x1.9)');
  }

  const goalSelectEl = document.getElementById('edit-param-goal') as HTMLSelectElement | null;
  if (goalSelectEl) {
    const optL = goalSelectEl.querySelector('option[value="lose"]');
    const optM = goalSelectEl.querySelector('option[value="maintain"]');
    const optG = goalSelectEl.querySelector('option[value="gain"]');
    if (optL) optL.textContent = lang === 'ru' ? '📉 Похудение (-15% дефицит)' : (lang === 'pl' ? '📉 Redukcja wagi (-15% deficyt)' : '📉 Weight loss (-15% deficit)');
    if (optM) optM.textContent = lang === 'ru' ? '⚖️ Поддержание веса (баланс)' : (lang === 'pl' ? '⚖️ Utrzymanie wagi (balans)' : '⚖️ Maintain weight (balance)');
    if (optG) optG.textContent = lang === 'ru' ? '📈 Набор массы (+15% профицит)' : (lang === 'pl' ? '📈 Budowanie masy (+15% nadwyżka)' : '📈 Muscle gain (+15% surplus)');
  }

  syncCustomSelects();

  const calcH2 = document.getElementById('calc-header-title');
  const calcDesc = document.getElementById('calc-desc-text');
  const lblGender = document.getElementById('lbl-calc-gender');
  if (calcH2) calcH2.textContent = tr.calcHeader;
  if (calcDesc) calcDesc.textContent = tr.calcDesc;
  if (lblGender) lblGender.textContent = tr.calcGenderLabel;

  const maleBtn = document.getElementById('btn-gender-male');
  const femaleBtn = document.getElementById('btn-gender-female');
  if (maleBtn) maleBtn.textContent = tr.calcGenderMale;
  if (femaleBtn) femaleBtn.textContent = tr.calcGenderFemale;

  const lblAge = document.getElementById('lbl-calc-age');
  const lblWeight = document.getElementById('lbl-calc-weight');
  const lblHeight = document.getElementById('lbl-calc-height');
  const lblActivity = document.getElementById('lbl-calc-activity');
  const lblGoal = document.getElementById('lbl-calc-goal');
  const lblFormula = document.getElementById('lbl-calc-formula');
  if (lblAge) lblAge.textContent = tr.calcAgeLabel;
  if (lblWeight) lblWeight.textContent = tr.calcWeightLabel;
  if (lblHeight) lblHeight.textContent = tr.calcHeightLabel;
  if (lblActivity) lblActivity.textContent = tr.calcActivityLabel;
  if (lblGoal) lblGoal.textContent = tr.calcGoalLabel;
  if (lblFormula) lblFormula.textContent = tr.formulaLabel;

  // Translate Formula Select Options
  const formSelect = document.getElementById('calc-formula') as HTMLSelectElement | null;
  if (formSelect) {
    const optMifflin = formSelect.querySelector('option[value="mifflin"]');
    const optHarris = formSelect.querySelector('option[value="harris"]');
    const optWho = formSelect.querySelector('option[value="who"]');
    if (optMifflin) optMifflin.textContent = `⭐ ${tr.formulaMifflin}`;
    if (optHarris) optHarris.textContent = `🧬 ${tr.formulaHarris}`;
    if (optWho) optWho.textContent = `🌍 ${tr.formulaWho}`;
  }

  // Translate Activity Select Options
  const actSelect = document.getElementById('calc-activity') as HTMLSelectElement | null;
  if (actSelect) {
    const optSedentary = actSelect.querySelector('option[value="sedentary"]');
    const optLight = actSelect.querySelector('option[value="light"]');
    const optModerate = actSelect.querySelector('option[value="moderate"]');
    const optVery = actSelect.querySelector('option[value="very"]');
    const optExtra = actSelect.querySelector('option[value="extra"]');
    if (optSedentary) optSedentary.textContent = tr.calcActivitySedentary;
    if (optLight) optLight.textContent = tr.calcActivityLight;
    if (optModerate) optModerate.textContent = tr.calcActivityModerate;
    if (optVery) optVery.textContent = tr.calcActivityVery;
    if (optExtra) optExtra.textContent = tr.calcActivityExtra;
  }

  // Translate Goal Select Options
  const goalSelect = document.getElementById('calc-goal') as HTMLSelectElement | null;
  if (goalSelect) {
    const optLose = goalSelect.querySelector('option[value="lose"]');
    const optMaintain = goalSelect.querySelector('option[value="maintain"]');
    const optGain = goalSelect.querySelector('option[value="gain"]');
    if (optLose) optLose.textContent = tr.calcGoalLose;
    if (optMaintain) optMaintain.textContent = tr.calcGoalMaintain;
    if (optGain) optGain.textContent = tr.calcGoalGain;
  }

  const lblBmr = document.getElementById('lbl-bmr');
  const lblTdee = document.getElementById('lbl-tdee');
  const lblTarget = document.getElementById('lbl-target');
  const lblBmi = document.getElementById('lbl-bmi');
  const lblIdeal = document.getElementById('lbl-ideal-weight');
  if (lblBmr) lblBmr.textContent = tr.calcBmrLabel;
  if (lblTdee) lblTdee.textContent = tr.calcTdeeLabel;
  if (lblTarget) lblTarget.textContent = tr.calcTargetLabel;
  if (lblBmi) lblBmi.textContent = tr.bmiLabel;
  if (lblIdeal) lblIdeal.textContent = tr.idealWeightLabel;

  const applyBtn = document.getElementById('btn-apply-profile');
  if (applyBtn) applyBtn.textContent = tr.calcApplyBtn;

  // Balance panel labels
  const lblCalTarget = document.getElementById('lbl-cal-target-title');
  const lblCalFood = document.getElementById('lbl-cal-food-title');
  const lblCalRem = document.getElementById('lbl-cal-rem-title');
  if (lblCalTarget) lblCalTarget.textContent = state.currentLang === 'pl' ? 'Cel' : (state.currentLang === 'en' ? 'Target' : 'Цель');
  if (lblCalFood) lblCalFood.textContent = state.currentLang === 'pl' ? 'Zjedzone' : (state.currentLang === 'en' ? 'Food' : 'Еда');
  if (lblCalRem) lblCalRem.textContent = tr.calorieRemainingLabel;

  // Macro progress labels
  const pTitle = document.getElementById('lbl-macro-p-title');
  const fTitle = document.getElementById('lbl-macro-f-title');
  const cTitle = document.getElementById('lbl-macro-c-title');
  const fibTitle = document.getElementById('lbl-macro-fib-title');
  if (pTitle) pTitle.textContent = `🥩 ${tr.proteinLabel}`;
  if (fTitle) fTitle.textContent = `🥑 ${tr.fatLabel}`;
  if (cTitle) cTitle.textContent = `🌾 ${tr.carbsLabel}`;
  if (fibTitle) fibTitle.textContent = `🥦 ${tr.fiberLabel}`;

  // Water Tracker
  const waterTitle = document.getElementById('lbl-water-title');
  const waterAddBtn = document.getElementById('btn-water-add');
  if (waterTitle) waterTitle.textContent = tr.waterTrackerTitle;
  if (waterAddBtn) waterAddBtn.textContent = tr.waterAddGlass;

  // Meals Header & Actions
  const mealsH2 = document.getElementById('lbl-meals-header');
  const openMealModalBtn = document.getElementById('btn-open-meal-modal');
  const clearDayBtn = document.getElementById('btn-clear-diary-day');
  if (mealsH2) mealsH2.textContent = tr.mealsHeader;
  if (openMealModalBtn) openMealModalBtn.textContent = tr.addMealBtn;
  if (clearDayBtn) clearDayBtn.textContent = tr.clearDayBtn;

  // Meal Modal translations
  const modalMealTitle = document.getElementById('lbl-modal-meal-title');
  const lblQuickPreset = document.getElementById('lbl-quick-preset');
  const lblModalName = document.getElementById('lbl-modal-name');
  const lblModalType = document.getElementById('lbl-modal-type');
  const lblModalKcal = document.getElementById('lbl-modal-kcal');
  const btnCancelMeal = document.getElementById('btn-cancel-meal-modal');
  const btnSaveMeal = document.getElementById('btn-save-meal-entry');
  if (modalMealTitle) modalMealTitle.textContent = tr.mealModalTitle;
  if (lblQuickPreset) lblQuickPreset.textContent = tr.mealQuickSelect;
  if (lblModalName) lblModalName.textContent = tr.mealNameLabel;
  if (lblModalType) lblModalType.textContent = tr.mealTypeLabel;
  if (lblModalKcal) lblModalKcal.textContent = tr.mealCaloriesLabel;
  if (btnCancelMeal) btnCancelMeal.textContent = state.currentLang === 'pl' ? 'Anuluj' : (state.currentLang === 'en' ? 'Cancel' : 'Отмена');
  if (btnSaveMeal) btnSaveMeal.textContent = tr.saveMealBtn;

  // Category filter tabs in meals card
  const filterTabs = document.querySelectorAll<HTMLButtonElement>('#meal-filter-tabs .pill');
  filterTabs.forEach(pill => {
    const f = pill.dataset.mealFilter;
    if (f === 'all') pill.textContent = tr.catAll;
    if (f === 'breakfast') pill.textContent = tr.mealBreakfast;
    if (f === 'lunch') pill.textContent = tr.mealLunch;
    if (f === 'dinner') pill.textContent = tr.mealDinner;
    if (f === 'snack') pill.textContent = tr.mealSnack;
  });

  document.querySelectorAll<HTMLElement>('.nav-item').forEach(nav => {
    const target = nav.dataset.target;
    const label = nav.querySelector('.nav-label');
    if (!label) return;
    if (target === 'view-home') label.textContent = tr.navHome;
    if (target === 'view-recipes') label.textContent = tr.navRecipes;
    if (target === 'view-scanner') label.textContent = tr.navScanner;
    if (target === 'view-shopping') label.textContent = tr.navShopping;
    if (target === 'view-diary') label.textContent = tr.navDiary;
  });

  // ZUVIA Home Dashboard Texts
  const homeGreeting = document.getElementById('zuvia-greeting');
  if (homeGreeting) homeGreeting.textContent = tr.homeGreeting;
  const homeSub = document.getElementById('zuvia-subtitle');
  if (homeSub) homeSub.textContent = tr.homeSubtitle;
  const homeProgTitle = document.getElementById('zuvia-progress-title');
  if (homeProgTitle) homeProgTitle.textContent = tr.homeProgressTitle;
  const homeTodayTitle = document.getElementById('zuvia-today-title');
  if (homeTodayTitle) homeTodayTitle.textContent = tr.homeTodayTitle;
  const homeRecsTitle = document.getElementById('zuvia-recs-title');
  if (homeRecsTitle) homeRecsTitle.textContent = tr.homeRecsTitle;
  const homeDealsTitle = document.getElementById('zuvia-deals-title');
  if (homeDealsTitle) homeDealsTitle.textContent = tr.homeDealsTitle;

  const homeLblP = document.getElementById('home-lbl-protein');
  if (homeLblP) homeLblP.textContent = tr.proteinLabel;
  const homeLblF = document.getElementById('home-lbl-fat');
  if (homeLblF) homeLblF.textContent = tr.fatLabel;
  const homeLblC = document.getElementById('home-lbl-carbs');
  if (homeLblC) homeLblC.textContent = tr.carbsLabel;

  const homeMealB = document.getElementById('home-meal-breakfast-title');
  if (homeMealB) homeMealB.textContent = tr.mealBreakfast.replace(/^[^\wа-яА-ЯёЁąęółśżźćńĄĘÓŁŚŻŹĆŃ]+/u, '');
  const homeMealL = document.getElementById('home-meal-lunch-title');
  if (homeMealL) homeMealL.textContent = tr.mealLunch.replace(/^[^\wа-яА-ЯёЁąęółśżźćńĄĘÓŁŚŻŹĆŃ]+/u, '');
  const homeMealD = document.getElementById('home-meal-dinner-title');
  if (homeMealD) homeMealD.textContent = tr.mealDinner.replace(/^[^\wа-яА-ЯёЁąęółśżźćńĄĘÓŁŚŻŹĆŃ]+/u, '');
  const homeMealS = document.getElementById('home-meal-snack-title');
  if (homeMealS) homeMealS.textContent = tr.mealSnack.replace(/^[^\wа-яА-ЯёЁąęółśżźćńĄĘÓŁŚŻŹĆŃ]+/u, '');

  // Additional ZUVIA Home Section Titles
  const homeStatsTitle = document.getElementById('diary-stats-title');
  if (homeStatsTitle) homeStatsTitle.textContent = state.currentLang === 'pl' ? 'Statystyki' : (state.currentLang === 'en' ? 'Statistics' : 'Статистика');
  const homeGoalsTitle = document.getElementById('diary-goals-title');
  if (homeGoalsTitle) homeGoalsTitle.textContent = state.currentLang === 'pl' ? 'Cele' : (state.currentLang === 'en' ? 'Goals' : 'Цели');
  const homeGoalWeightTitle = document.getElementById('diary-goal-weight-title');
  if (homeGoalWeightTitle) homeGoalWeightTitle.textContent = state.currentLang === 'pl' ? 'Postęp odchudzania' : (state.currentLang === 'en' ? 'Weight loss progress' : 'Прогресс похудения');
  const homeGoalWorkoutsTitle = document.getElementById('diary-goal-workouts-title');
  if (homeGoalWorkoutsTitle) homeGoalWorkoutsTitle.textContent = state.currentLang === 'pl' ? 'Treningi' : (state.currentLang === 'en' ? 'Workouts' : 'Тренировки');
  const homeParamsTitle = document.getElementById('diary-params-title');
  if (homeParamsTitle) homeParamsTitle.textContent = state.currentLang === 'pl' ? 'Parametry' : (state.currentLang === 'en' ? 'Parameters' : 'Параметры');
  const homeWeightLbl = document.getElementById('diary-param-weight-lbl');
  if (homeWeightLbl) homeWeightLbl.textContent = state.currentLang === 'pl' ? 'Waga (kg)' : (state.currentLang === 'en' ? 'Weight (kg)' : 'Вес (кг)');
  const homeHeightLbl = document.getElementById('diary-param-height-lbl');
  if (homeHeightLbl) homeHeightLbl.textContent = state.currentLang === 'pl' ? 'Wzrost (cm)' : (state.currentLang === 'en' ? 'Height (cm)' : 'Рост (см)');
  const homeAgeLbl = document.getElementById('diary-param-age-lbl');
  if (homeAgeLbl) homeAgeLbl.textContent = state.currentLang === 'pl' ? 'Wiek (lat)' : (state.currentLang === 'en' ? 'Age (years)' : 'Возраст (лет)');
  const homeFatLbl = document.getElementById('diary-param-fat-lbl');
  if (homeFatLbl) homeFatLbl.textContent = state.currentLang === 'pl' ? 'Tłuszcz (%)' : (state.currentLang === 'en' ? 'Body fat (%)' : 'Жир (%)');
  const homeMuscleLbl = document.getElementById('diary-param-muscle-lbl');
  if (homeMuscleLbl) homeMuscleLbl.textContent = state.currentLang === 'pl' ? 'Mięśnie (%)' : (state.currentLang === 'en' ? 'Muscle (%)' : 'Мышцы (%)');
  const homeGenderLbl = document.getElementById('diary-param-gender-lbl');
  if (homeGenderLbl) homeGenderLbl.textContent = state.currentLang === 'pl' ? 'Płeć' : (state.currentLang === 'en' ? 'Gender' : 'Пол');
  const homeWaterTitle = document.getElementById('diary-water-title');
  if (homeWaterTitle) homeWaterTitle.textContent = state.currentLang === 'pl' ? 'Nawodnienie' : (state.currentLang === 'en' ? 'Water tracker' : 'Трекер воды');
  const btnAddWaterEl = document.getElementById('btn-diary-add-water');
  if (btnAddWaterEl) btnAddWaterEl.title = state.currentLang === 'pl' ? 'Dodaj 250 ml' : (state.currentLang === 'en' ? 'Add 250 ml' : 'Добавить 250 мл');
  const btnRemWaterEl = document.getElementById('btn-diary-remove-water');
  if (btnRemWaterEl) btnRemWaterEl.title = state.currentLang === 'pl' ? 'Odejmij 250 ml' : (state.currentLang === 'en' ? 'Remove 250 ml' : 'Уменьшить 250 мл');
  const homeNormTitle = document.getElementById('diary-norm-title');
  if (homeNormTitle) homeNormTitle.textContent = state.currentLang === 'pl' ? 'Norma kalorii' : (state.currentLang === 'en' ? 'Calorie norm' : 'Норма калорий');
  const homeRecalcNorm = document.getElementById('diary-btn-recalc-norm');
  if (homeRecalcNorm) homeRecalcNorm.textContent = state.currentLang === 'pl' ? 'Przelicz' : (state.currentLang === 'en' ? 'Recalculate' : 'Пересчитать');
  const homeSaveParams = document.getElementById('lbl-save-params-text');
  if (homeSaveParams) homeSaveParams.textContent = state.currentLang === 'pl' ? 'Zapisz' : (state.currentLang === 'en' ? 'Save' : 'Сохранить');

  // Diary Header Actions & Badges
  const btnDiaryScanner = document.getElementById('btn-diary-scanner');
  if (btnDiaryScanner) btnDiaryScanner.textContent = tr.scannerShortcutBtn;
  const btnOpenMealModal = document.getElementById('btn-open-meal-modal');
  if (btnOpenMealModal) btnOpenMealModal.textContent = tr.addMealBtn;
  const btnClearDiaryDay = document.getElementById('btn-clear-diary-day');
  if (btnClearDiaryDay) btnClearDiaryDay.textContent = tr.clearDayBtn;
  const calcBadgeV = document.getElementById('calc-badge-v');
  if (calcBadgeV) calcBadgeV.textContent = tr.calcBadgeText;

  // Meal Modal Dynamic Labels
  const lblModalProtein = document.getElementById('lbl-modal-protein');
  if (lblModalProtein) lblModalProtein.textContent = `${tr.proteinLabel} (g)`;
  const lblModalFat = document.getElementById('lbl-modal-fat');
  if (lblModalFat) lblModalFat.textContent = `${tr.fatLabel} (g)`;
  const lblModalCarbs = document.getElementById('lbl-modal-carbs');
  if (lblModalCarbs) lblModalCarbs.textContent = `${tr.carbsLabel} (g)`;
  const mealInputNameEl = document.getElementById('meal-input-name') as HTMLInputElement | null;
  if (mealInputNameEl) mealInputNameEl.placeholder = tr.modalMealNamePlaceholder;

  const mealInputTypeSelect = document.getElementById('meal-input-type') as HTMLSelectElement | null;
  if (mealInputTypeSelect) {
    const optB = mealInputTypeSelect.querySelector('option[value="breakfast"]');
    const optL = mealInputTypeSelect.querySelector('option[value="lunch"]');
    const optD = mealInputTypeSelect.querySelector('option[value="dinner"]');
    const optS = mealInputTypeSelect.querySelector('option[value="snack"]');
    if (optB) optB.textContent = tr.mealBreakfast;
    if (optL) optL.textContent = tr.mealLunch;
    if (optD) optD.textContent = tr.mealDinner;
    if (optS) optS.textContent = tr.mealSnack;
  }

  // Auth Modal Static Texts
  const authModalTitleEl = document.querySelector('.auth-modal-title');
  if (authModalTitleEl) authModalTitleEl.textContent = tr.authModalTitle;
  const tabAuthLogin = document.getElementById('tab-auth-login');
  const tabAuthRegister = document.getElementById('tab-auth-register');
  const lblAuthName = document.getElementById('lbl-auth-name');
  const inputAuthName = document.getElementById('auth-input-name') as HTMLInputElement | null;
  const lblAuthEmail = document.getElementById('lbl-auth-email');
  const inputAuthEmail = document.getElementById('auth-input-email') as HTMLInputElement | null;
  const lblAuthPassword = document.getElementById('lbl-auth-password');
  const btnForgotPassword = document.getElementById('btn-forgot-password');
  
  if (tabAuthLogin) tabAuthLogin.textContent = tr.authTabLogin;
  if (tabAuthRegister) tabAuthRegister.textContent = tr.authTabRegister;
  if (lblAuthName) lblAuthName.textContent = tr.authNameLabel;
  if (inputAuthName) inputAuthName.placeholder = tr.authNamePlaceholder;
  if (lblAuthEmail) lblAuthEmail.textContent = tr.authEmailLabel;
  if (inputAuthEmail) inputAuthEmail.placeholder = tr.authEmailPlaceholder;
  if (lblAuthPassword) lblAuthPassword.textContent = tr.authPasswordLabel;
  if (btnForgotPassword) btnForgotPassword.textContent = tr.authForgotPassword;

  // Profile Modal Static Texts
  const badgeMember = document.getElementById('profile-badge-member');
  if (badgeMember) badgeMember.textContent = tr.profileBadge;
  const lblStatCooked = document.getElementById('lbl-stat-cooked');
  if (lblStatCooked) lblStatCooked.textContent = tr.profileStatCooked;
  const lblStatDiary = document.getElementById('lbl-stat-diary');
  if (lblStatDiary) lblStatDiary.textContent = tr.profileStatDiary;
  const lblStatTarget = document.getElementById('lbl-stat-target');
  if (lblStatTarget) lblStatTarget.textContent = tr.profileStatTarget;
  const tabProfileHist = document.getElementById('tab-profile-history');
  if (tabProfileHist) tabProfileHist.textContent = tr.profileTabHistory;
  const tabProfileDiary = document.getElementById('tab-profile-diary');
  if (tabProfileDiary) tabProfileDiary.textContent = tr.profileTabDiary;
  const tabProfileFav = document.getElementById('tab-profile-favorites');
  if (tabProfileFav) tabProfileFav.textContent = tr.profileTabFavorites;
  const btnProfileLogout = document.getElementById('btn-profile-logout');
  if (btnProfileLogout) btnProfileLogout.textContent = tr.profileLogoutBtn;
}

function renderAll() {
  renderHomeDashboard();
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

  // Widen main-content when on shopping view
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    if (targetId === 'view-shopping') {
      mainContent.classList.add('shopping-view-active');
    } else {
      mainContent.classList.remove('shopping-view-active');
    }
  }

  if (targetId === 'view-shopping') {
    setTimeout(() => {
      if (leafletMap) {
        leafletMap.invalidateSize();
      }
    }, 100);
  }

  if (targetId === 'view-home') {
    renderHomeDashboard();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Numeric Scrubber for horizontal dragging on parameter pills
function setupNumericScrubber(
  pillEl: HTMLElement,
  inputEl: HTMLInputElement,
  config: { min: number; max: number; step: number; pxPerStep?: number }
) {
  let isDown = false;
  let hasDragged = false;
  let startX = 0;
  let startVal = 0;
  const pxPerStep = config.pxPerStep || 8;

  const onPointerDown = (clientX: number) => {
    isDown = true;
    hasDragged = false;
    startX = clientX;
    startVal = parseFloat(inputEl.value) || config.min;
  };

  const onPointerMove = (clientX: number, e: Event) => {
    if (!isDown) return;
    const dx = clientX - startX;
    if (Math.abs(dx) > 3) {
      if (!hasDragged) {
        hasDragged = true;
        pillEl.classList.add('is-scrubbing');
        document.body.classList.add('is-scrubbing');
      }
      e.preventDefault();
      const steps = Math.round(dx / pxPerStep);
      let newVal = startVal + steps * config.step;
      newVal = Math.min(config.max, Math.max(config.min, newVal));
      if (config.step < 1) {
        newVal = Math.round(newVal * 10) / 10;
      } else {
        newVal = Math.round(newVal);
      }
      if (parseFloat(inputEl.value) !== newVal) {
        inputEl.value = newVal.toString();
        inputEl.dispatchEvent(new Event('input', { bubbles: true }));
        inputEl.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  const onPointerUp = () => {
    if (!isDown) return;
    isDown = false;
    if (hasDragged) {
      pillEl.classList.remove('is-scrubbing');
      document.body.classList.remove('is-scrubbing');
      inputEl.blur();
    }
  };

  pillEl.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    onPointerDown(e.clientX);

    const mouseMoveHandler = (ev: MouseEvent) => {
      onPointerMove(ev.clientX, ev);
    };

    const mouseUpHandler = () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      onPointerUp();
    };

    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', mouseUpHandler);
  });

  pillEl.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    onPointerDown(e.touches[0].clientX);
  }, { passive: true });

  pillEl.addEventListener('touchmove', (e) => {
    if (!isDown || e.touches.length !== 1) return;
    onPointerMove(e.touches[0].clientX, e);
  }, { passive: false });

  pillEl.addEventListener('touchend', onPointerUp);
  pillEl.addEventListener('touchcancel', onPointerUp);
}

// --- ZUVIA Home Dashboard ---
function initHomeDashboard() {
  // 1. Date Picker Modal
  const dateModal = document.getElementById('date-picker-modal');
  const btnDatePicker = document.getElementById('btn-home-date-picker');
  const btnCloseDateModal = document.getElementById('btn-close-date-modal');
  const btnApplyDate = document.getElementById('btn-apply-date');
  const customDateInput = document.getElementById('input-custom-date') as HTMLInputElement | null;

  btnDatePicker?.addEventListener('click', () => {
    dateModal?.classList.remove('hidden');
  });

  const closeDateModal = () => dateModal?.classList.add('hidden');
  btnCloseDateModal?.addEventListener('click', closeDateModal);

  document.querySelectorAll<HTMLButtonElement>('.zuvia-date-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.zuvia-date-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const offset = parseInt(btn.dataset.dayOffset || '0');
      const d = new Date();
      d.setDate(d.getDate() + offset);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      selectedDiaryDate = `${day}/${month}/${year}`;
      if (btnDatePicker) btnDatePicker.textContent = selectedDiaryDate;
      if (customDateInput) customDateInput.value = `${year}-${month}-${day}`;
      closeDateModal();
      renderAll();
    });
  });

  btnApplyDate?.addEventListener('click', () => {
    if (customDateInput?.value) {
      const parts = customDateInput.value.split('-');
      if (parts.length === 3) {
        selectedDiaryDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
        if (btnDatePicker) btnDatePicker.textContent = selectedDiaryDate;
      }
    }
    closeDateModal();
    renderAll();
  });

  // 2. Add Meal Plus Button
  const plusBtn = document.getElementById('btn-home-add-meal');
  if (plusBtn) {
    plusBtn.addEventListener('click', () => {
      triggerMealModal('lunch');
    });
  }

  // 3. Meal Details Modal & Meal Pills
  const mealDetailsModal = document.getElementById('meal-details-modal');
  const btnCloseMealDetails = document.getElementById('btn-close-meal-details-modal');
  const btnAddItemToThisMeal = document.getElementById('btn-add-item-to-this-meal');

  const openMealDetails = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    activeDetailsMealType = mealType;
    const tr = t();
    const titleEl = document.getElementById('lbl-meal-details-title');
    const kcalEl = document.getElementById('lbl-meal-details-kcal');
    const listEl = document.getElementById('meal-details-items-list');

    const mealNames = {
      breakfast: tr.mealBreakfast || 'Завтрак',
      lunch: tr.mealLunch || 'Обед',
      dinner: tr.mealDinner || 'Ужин',
      snack: tr.mealSnack || 'Перекус'
    };

    if (titleEl) titleEl.textContent = mealNames[mealType];

    const meals = (state.loggedMeals || []).filter(m => m.mealType === mealType);
    const mealSumKcal = meals.reduce((sum, m) => sum + m.calories, 0);
    if (kcalEl) kcalEl.textContent = `${mealSumKcal} kcal`;

    if (listEl) {
      if (meals.length === 0) {
        listEl.innerHTML = `
          <div style="text-align: center; color: var(--text-muted); padding: 20px 10px; font-size: 0.9rem;">
            🍽️ ${tr.diaryEmptyCategory || 'В этом приёме пока нет блюд'}
          </div>
        `;
      } else {
        listEl.innerHTML = meals.map(m => `
          <div class="meal-details-item">
            <div class="meal-details-item-main">
              <strong class="item-title">${m.name}</strong>
              <span class="item-time">⏱️ ${m.time} &bull; P:${m.protein}g F:${m.fat}g C:${m.carbs}g</span>
            </div>
            <div class="meal-details-item-right">
              <span class="item-kcal">${m.calories} kcal</span>
              <button type="button" class="btn-delete-meal-entry" data-id="${m.id}" title="Удалить">🗑️</button>
            </div>
          </div>
        `).join('');

        listEl.querySelectorAll<HTMLButtonElement>('.btn-delete-meal-entry').forEach(btn => {
          btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            if (id) {
              await authService.deleteDiaryMeal(id).catch(console.error);
              state.loggedMeals = (state.loggedMeals || []).filter(m => m.id !== id);
              openMealDetails(activeDetailsMealType);
              renderAll();
            }
          });
        });
      }
    }

    mealDetailsModal?.classList.remove('hidden');
  };

  document.querySelectorAll<HTMLElement>('.zuvia-meal-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const type = (pill.dataset.meal as any) || 'breakfast';
      openMealDetails(type);
    });
  });

  btnCloseMealDetails?.addEventListener('click', () => {
    mealDetailsModal?.classList.add('hidden');
  });

  btnAddItemToThisMeal?.addEventListener('click', () => {
    mealDetailsModal?.classList.add('hidden');
    triggerMealModal(activeDetailsMealType);
  });

  // 4. Weekly Statistics Accordion Toggle
  const btnToggleStats = document.getElementById('btn-toggle-stats');
  const statsContent = document.getElementById('zuvia-stats-content');
  btnToggleStats?.addEventListener('click', () => {
    statsContent?.classList.toggle('hidden');
  });

  // 5. Goals Modal & Trigger Cards
  const goalsModal = document.getElementById('goals-modal');
  const btnAddGoal = document.getElementById('btn-diary-add-goal');
  const btnGoalWeight = document.getElementById('btn-goal-weight');
  const btnGoalWorkouts = document.getElementById('btn-goal-workouts');
  const btnCloseGoals = document.getElementById('btn-close-goals-modal');
  const btnCancelGoals = document.getElementById('btn-cancel-goals-modal');
  const btnSaveGoals = document.getElementById('btn-save-goals-modal');
  const inputGoalWeight = document.getElementById('edit-goal-target-weight') as HTMLInputElement | null;
  const inputGoalMonths = document.getElementById('edit-goal-months') as HTMLInputElement | null;
  const hintWeightRemaining = document.getElementById('hint-weight-remaining');

  const updateGoalHint = () => {
    if (!hintWeightRemaining) return;
    const curWeight = state.userProfile?.weight || 75;
    const targetWeight = parseFloat(inputGoalWeight?.value || '72') || 72;
    const diff = Math.max(0, Math.round((curWeight - targetWeight) * 10) / 10);
    hintWeightRemaining.textContent = `${state.currentLang === 'ru' ? 'Текущий вес' : (state.currentLang === 'pl' ? 'Aktualna waga' : 'Current weight')}: ${curWeight} kg • ${state.currentLang === 'ru' ? 'Осталось сбросить' : (state.currentLang === 'pl' ? 'Do zrzucenia' : 'To lose')}: ${diff} kg`;
  };

  const openGoalsModal = () => {
    if (!goalsModal) return;
    if (inputGoalWeight) inputGoalWeight.value = (state.userProfile?.targetWeightGoal || 72).toString();
    if (inputGoalMonths) inputGoalMonths.value = (state.userProfile?.targetMonthsRemaining || 2).toString();
    updateGoalHint();
    goalsModal.classList.remove('hidden');
  };

  const closeGoalsModal = () => goalsModal?.classList.add('hidden');

  btnAddGoal?.addEventListener('click', openGoalsModal);
  btnGoalWeight?.addEventListener('click', openGoalsModal);
  btnGoalWorkouts?.addEventListener('click', openGoalsModal);
  btnCloseGoals?.addEventListener('click', closeGoalsModal);
  btnCancelGoals?.addEventListener('click', closeGoalsModal);

  inputGoalWeight?.addEventListener('input', updateGoalHint);

  btnSaveGoals?.addEventListener('click', async () => {
    const targetW = parseFloat(inputGoalWeight?.value || '72') || 72;
    const targetM = parseInt(inputGoalMonths?.value || '2') || 2;
    if (state.userProfile) {
      state.userProfile.targetWeightGoal = targetW;
      state.userProfile.targetMonthsRemaining = targetM;
    }
    try {
      await authService.updateProfile({
        targetWeightGoal: targetW,
        targetMonthsRemaining: targetM
      });
    } catch (e) {
      console.warn('[Prisma] Error saving goals:', e);
    }
    closeGoalsModal();
    renderAll();
  });

  // 6. Body Parameters Unified Block
  const btnSaveParams = document.getElementById('btn-save-params');
  const inputParamWeight = document.getElementById('edit-param-weight') as HTMLInputElement | null;
  const inputParamHeight = document.getElementById('edit-param-height') as HTMLInputElement | null;
  const inputParamAge = document.getElementById('edit-param-age') as HTMLInputElement | null;
  const inputParamFat = document.getElementById('edit-param-fat') as HTMLInputElement | null;
  const inputParamMuscle = document.getElementById('edit-param-muscle') as HTMLInputElement | null;
  const btnToggleGender = document.getElementById('btn-toggle-gender') as HTMLButtonElement | null;
  const selectParamActivity = document.getElementById('edit-param-activity') as HTMLSelectElement | null;
  const selectParamGoal = document.getElementById('edit-param-goal') as HTMLSelectElement | null;

  const getGenderText = (gender: string) => {
    const lang = state.currentLang;
    if (gender === 'female') {
      return lang === 'ru' ? 'Женщина' : (lang === 'pl' ? 'Kobieta' : 'Female');
    }
    return lang === 'ru' ? 'Мужчина' : (lang === 'pl' ? 'Mężczyzna' : 'Male');
  };

  const updateGenderDisplay = (gender: string) => {
    if (!btnToggleGender) return;
    btnToggleGender.dataset.gender = gender;
    const iconEl = document.getElementById('gender-toggle-icon');
    const textEl = document.getElementById('gender-toggle-text');
    if (iconEl) iconEl.textContent = gender === 'female' ? '👩' : '🧔';
    if (textEl) textEl.textContent = getGenderText(gender);
  };

  btnToggleGender?.addEventListener('click', () => {
    const cur = btnToggleGender.dataset.gender || 'male';
    const next = cur === 'male' ? 'female' : 'male';
    updateGenderDisplay(next);
    updateParamsModalPreview();
  });

  const updateParamsModalPreview = () => {
    const gender = (btnToggleGender?.dataset.gender as any) || 'male';
    const age = parseInt(inputParamAge?.value || '25') || 25;
    const weight = parseFloat(inputParamWeight?.value || '75') || 75;
    const height = parseFloat(inputParamHeight?.value || '178') || 178;
    const activity = (selectParamActivity?.value as any) || 'moderate';
    const goal = (selectParamGoal?.value as any) || 'maintain';

    const tempProf = createFullUserProfile(gender, age, weight, height, activity, goal, 'mifflin');
    const bmrEl = document.getElementById('preview-bmr-val');
    const tdeeEl = document.getElementById('preview-tdee-val');
    const targetEl = document.getElementById('preview-target-val');

    if (bmrEl) bmrEl.innerText = `${Math.round(tempProf.bmr).toLocaleString()} kcal`;
    if (tdeeEl) tdeeEl.innerText = `${Math.round(tempProf.tdee).toLocaleString()} kcal`;
    if (targetEl) targetEl.innerText = `${Math.round(tempProf.targetCalories).toLocaleString()} kcal/${state.currentLang === 'ru' ? 'день' : (state.currentLang === 'pl' ? 'dzień' : 'day')}`;

    // Live update weight progress bar and remaining subtext as numbers change
    const goalWeightFill = document.getElementById('goal-weight-fill');
    const goalWeightSub = document.getElementById('diary-goal-weight-sub');
    const targetWeight = state.userProfile?.targetWeightGoal || 72;
    const startWeight = Math.max(targetWeight + 8, (state.userProfile?.weight || 75) + 3);
    const totalDiff = Math.max(0.5, startWeight - targetWeight);
    const lostKg = Math.max(0, startWeight - weight);
    const progressPct = weight <= targetWeight ? 100 : Math.min(100, Math.max(5, Math.round((lostKg / totalDiff) * 100)));
    const diff = Math.max(0, Math.round((weight - targetWeight) * 10) / 10);

    if (goalWeightFill) goalWeightFill.style.width = `${progressPct}%`;
    if (goalWeightSub) {
      if (weight <= targetWeight) {
        goalWeightSub.innerText = state.currentLang === 'ru' ? 'Цель достигнута!' : (state.currentLang === 'pl' ? 'Cel osiągnięty!' : 'Goal reached!');
      } else {
        goalWeightSub.innerText = state.currentLang === 'ru'
          ? `Осталось ${diff} кг`
          : (state.currentLang === 'pl' ? `Pozostało ${diff} kg` : `${diff} kg remaining`);
      }
    }
  };

  const syncParamsToInputs = () => {
    const prof = state.userProfile || defaultProfile;
    if (inputParamWeight) inputParamWeight.value = (prof.weight || 75).toString();
    if (inputParamHeight) inputParamHeight.value = (prof.height || 178).toString();
    if (inputParamAge) inputParamAge.value = (prof.age || 25).toString();
    if (inputParamFat) inputParamFat.value = (prof.bodyFatPercent || 34).toString();
    if (inputParamMuscle) inputParamMuscle.value = (prof.musclePercent || 49).toString();
    if (selectParamActivity && prof.activity) selectParamActivity.value = prof.activity;
    if (selectParamGoal && prof.goal) selectParamGoal.value = prof.goal;

    updateGenderDisplay(prof.gender || 'male');
    syncCustomSelects();
    updateParamsModalPreview();
  };

  syncParamsToInputs();

  [inputParamWeight, inputParamHeight, inputParamAge, inputParamFat, inputParamMuscle, selectParamActivity, selectParamGoal].forEach(el => {
    el?.addEventListener('input', () => {
      syncCustomSelects();
      updateParamsModalPreview();
    });
    el?.addEventListener('change', () => {
      syncCustomSelects();
      updateParamsModalPreview();
    });
  });

  // Attach horizontal drag scrubber to all 5 numeric blue pills
  const setupPillScrubber = (input: HTMLInputElement | null, cfg: { min: number; max: number; step: number; pxPerStep?: number }) => {
    if (!input) return;
    const pill = input.closest('.param-val-pill') as HTMLElement | null;
    if (pill) {
      setupNumericScrubber(pill, input, cfg);
    }
  };

  setupPillScrubber(inputParamWeight, { min: 30, max: 250, step: 0.5, pxPerStep: 7 });
  setupPillScrubber(inputParamHeight, { min: 100, max: 230, step: 1, pxPerStep: 5 });
  setupPillScrubber(inputParamAge, { min: 12, max: 100, step: 1, pxPerStep: 8 });
  setupPillScrubber(inputParamFat, { min: 3, max: 60, step: 0.5, pxPerStep: 8 });
  setupPillScrubber(inputParamMuscle, { min: 10, max: 80, step: 0.5, pxPerStep: 8 });

  // Custom Select Dropdown Toggle & Selection
  const actWrap = document.getElementById('custom-select-activity-wrap');
  const actBtn = document.getElementById('btn-custom-activity');
  const actDropdown = document.getElementById('dropdown-activity');

  const goalWrap = document.getElementById('custom-select-goal-wrap');
  const goalBtn = document.getElementById('btn-custom-goal');
  const goalDropdown = document.getElementById('dropdown-goal');

  const closeCustomDropdowns = () => {
    actWrap?.classList.remove('open');
    actDropdown?.classList.add('hidden');
    actBtn?.setAttribute('aria-expanded', 'false');

    goalWrap?.classList.remove('open');
    goalDropdown?.classList.add('hidden');
    goalBtn?.setAttribute('aria-expanded', 'false');
  };

  actBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const wasOpen = actWrap?.classList.contains('open');
    closeCustomDropdowns();
    if (!wasOpen && actWrap && actDropdown) {
      actWrap.classList.add('open');
      actDropdown.classList.remove('hidden');
      actBtn.setAttribute('aria-expanded', 'true');
    }
  });

  goalBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const wasOpen = goalWrap?.classList.contains('open');
    closeCustomDropdowns();
    if (!wasOpen && goalWrap && goalDropdown) {
      goalWrap.classList.add('open');
      goalDropdown.classList.remove('hidden');
      goalBtn.setAttribute('aria-expanded', 'true');
    }
  });

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.zuvia-custom-select-wrap')) {
      closeCustomDropdowns();
    }
  });

  actDropdown?.querySelectorAll<HTMLElement>('.zuvia-custom-option').forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = opt.dataset.value;
      if (val && selectParamActivity) {
        selectParamActivity.value = val;
        selectParamActivity.dispatchEvent(new Event('change'));
        selectParamActivity.dispatchEvent(new Event('input'));
      }
      closeCustomDropdowns();
      syncCustomSelects();
    });
  });

  goalDropdown?.querySelectorAll<HTMLElement>('.zuvia-custom-option').forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = opt.dataset.value;
      if (val && selectParamGoal) {
        selectParamGoal.value = val;
        selectParamGoal.dispatchEvent(new Event('change'));
        selectParamGoal.dispatchEvent(new Event('input'));
      }
      closeCustomDropdowns();
      syncCustomSelects();
    });
  });

  btnSaveParams?.addEventListener('click', async () => {
    const gender = (btnToggleGender?.dataset.gender as any) || 'male';
    const age = parseInt(inputParamAge?.value || '25') || 25;
    const weight = parseFloat(inputParamWeight?.value || '75') || 75;
    const height = parseFloat(inputParamHeight?.value || '178') || 178;
    const fat = parseFloat(inputParamFat?.value || '34') || 34;
    const muscle = parseFloat(inputParamMuscle?.value || '49') || 49;
    const activity = (selectParamActivity?.value as any) || 'moderate';
    const goal = (selectParamGoal?.value as any) || 'maintain';

    const updated = createFullUserProfile(gender, age, weight, height, activity, goal, 'mifflin');
    updated.bodyFatPercent = fat;
    updated.musclePercent = muscle;
    if (state.userProfile?.targetWeightGoal) updated.targetWeightGoal = state.userProfile.targetWeightGoal;
    if (state.userProfile?.targetMonthsRemaining) updated.targetMonthsRemaining = state.userProfile.targetMonthsRemaining;

    state.userProfile = updated;

    try {
      await authService.updateProfile({
        gender: updated.gender,
        age: updated.age,
        weight: updated.weight,
        height: updated.height,
        activity: updated.activity,
        goal: updated.goal,
        formula: 'mifflin',
        targetCalories: updated.targetCalories,
        targetProtein: updated.targetProtein,
        targetFat: updated.targetFat,
        targetCarbs: updated.targetCarbs,
        targetFiber: updated.targetFiber,
        targetWaterMl: updated.targetWaterMl,
        bodyFatPercent: fat,
        musclePercent: muscle
      });
    } catch (e) {
      console.warn('[Prisma] Error saving profile:', e);
    }

    if (btnSaveParams) {
      const lblSaveText = document.getElementById('lbl-save-params-text');
      const originalText = lblSaveText ? lblSaveText.textContent : 'Сохранить';
      if (lblSaveText) {
        lblSaveText.textContent = state.currentLang === 'ru' ? 'Сохранено!' : (state.currentLang === 'pl' ? 'Zapisano!' : 'Saved!');
      }
      setTimeout(() => {
        if (lblSaveText && originalText) lblSaveText.textContent = originalText;
      }, 1400);
    }

    renderAll();
  });

  // 7. Water Tracker on Home
  const btnAddWater = document.getElementById('btn-diary-add-water');
  btnAddWater?.addEventListener('click', async () => {
    const current = state.waterConsumedMl || 0;
    const next = Math.min(3000, current + 250);
    state.waterConsumedMl = next;
    try {
      await authService.updateWater(250, 'add');
    } catch (e) {
      console.warn('[Prisma] Water update error:', e);
    }
    renderAll();
  });

  const btnRemoveWater = document.getElementById('btn-diary-remove-water');
  btnRemoveWater?.addEventListener('click', async () => {
    const current = state.waterConsumedMl || 0;
    const next = Math.max(0, current - 250);
    state.waterConsumedMl = next;
    try {
      await authService.updateWater(next, 'set');
    } catch (e) {
      console.warn('[Prisma] Water update error:', e);
    }
    renderAll();
  });

  // 8. Calorie Norm & Recalculate
  const btnRecalcNorm = document.getElementById('btn-recalculate-norm');
  const btnNormBadge = document.getElementById('btn-norm-badge');

  const triggerNormRecalculation = async () => {
    if (btnNormBadge) {
      btnNormBadge.classList.add('norm-pulsing');
      setTimeout(() => btnNormBadge.classList.remove('norm-pulsing'), 900);
    }

    const prof = state.userProfile || defaultProfile;
    const recalculated = createFullUserProfile(
      prof.gender || 'male',
      prof.age || 25,
      prof.weight || 75,
      prof.height || 178,
      prof.activity || 'moderate',
      prof.goal || 'maintain',
      'mifflin'
    );

    prof.bmr = recalculated.bmr;
    prof.tdee = recalculated.tdee;
    prof.targetCalories = recalculated.targetCalories;
    prof.targetProtein = recalculated.targetProtein;
    prof.targetFat = recalculated.targetFat;
    prof.targetCarbs = recalculated.targetCarbs;

    try {
      await authService.updateProfile({
        targetCalories: prof.targetCalories,
        targetProtein: prof.targetProtein,
        targetFat: prof.targetFat,
        targetCarbs: prof.targetCarbs
      });
    } catch (e) {
      console.warn('[Prisma] Recalculate update error:', e);
    }

    renderAll();
  };

  btnRecalcNorm?.addEventListener('click', triggerNormRecalculation);
  btnNormBadge?.addEventListener('click', triggerNormRecalculation);

  // 9. Links to other views
  document.querySelectorAll<HTMLElement>('.zuvia-view-all-link').forEach(link => {
    link.addEventListener('click', () => {
      const target = link.dataset.target;
      if (target) switchView(target);
    });
  });

  document.querySelectorAll<HTMLElement>('button[data-target]').forEach(btn => {
    if (!btn.classList.contains('nav-item') && !btn.classList.contains('zuvia-view-all-link')) {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        if (target) switchView(target);
      });
    }
  });
}

function triggerMealModal(mealType?: string) {
  const openModalBtn = document.getElementById('btn-open-meal-modal');
  if (openModalBtn) {
    openModalBtn.click();
    if (mealType) {
      const typeSelect = document.getElementById('meal-input-type') as HTMLSelectElement | null;
      if (typeSelect) typeSelect.value = mealType;
    }
  }
}

function renderHomeDashboard() {
  const profile = state.userProfile || defaultProfile;
  const meals = state.loggedMeals || [];
  const lang = state.currentLang;
  const tr = TRANSLATIONS[lang];

  // 1. Calories
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = Math.round(meals.reduce((sum, m) => sum + m.protein, 0));
  const totalFat = Math.round(meals.reduce((sum, m) => sum + m.fat, 0));
  const totalCarbs = Math.round(meals.reduce((sum, m) => sum + m.carbs, 0));

  const consumedEl = document.getElementById('home-consumed-kcal');
  const targetEl = document.getElementById('home-target-kcal');
  const remEl = document.getElementById('home-remaining-kcal');
  const fillEl = document.getElementById('home-bar-fill');

  if (consumedEl) consumedEl.textContent = totalCalories.toLocaleString();
  if (targetEl) targetEl.textContent = profile.targetCalories.toLocaleString();

  const ratio = Math.min(1.0, totalCalories / profile.targetCalories);
  if (fillEl) fillEl.style.width = `${Math.max(6, Math.round(ratio * 100))}%`;

  const remaining = profile.targetCalories - totalCalories;
  if (remEl) {
    if (remaining >= 0) {
      remEl.textContent = tr.homeLeftKcal.replace('{count}', remaining.toLocaleString());
      remEl.style.color = 'var(--text-main)';
    } else {
      const surplusPrefix = lang === 'pl' ? 'Nadwyżka' : (lang === 'en' ? 'Surplus' : 'Перебор');
      remEl.textContent = `${surplusPrefix} +${Math.abs(remaining).toLocaleString()} kcal`;
      remEl.style.color = '#ff6b6b';
    }
  }

  // 2. Macro pills
  const pEl = document.getElementById('home-macro-protein');
  if (pEl) pEl.textContent = `${totalProtein} / ${profile.targetProtein} g`;

  const fEl = document.getElementById('home-macro-fat');
  if (fEl) fEl.textContent = `${totalFat} / ${profile.targetFat} g`;

  const cEl = document.getElementById('home-macro-carbs');
  if (cEl) cEl.textContent = `${totalCarbs} / ${profile.targetCarbs} g`;

  // 3. Today meals row
  const bKcal = meals.filter(m => m.mealType === 'breakfast').reduce((sum, m) => sum + m.calories, 0);
  const lKcal = meals.filter(m => m.mealType === 'lunch').reduce((sum, m) => sum + m.calories, 0);
  const dKcal = meals.filter(m => m.mealType === 'dinner').reduce((sum, m) => sum + m.calories, 0);
  const sKcal = meals.filter(m => m.mealType === 'snack').reduce((sum, m) => sum + m.calories, 0);

  const bEl = document.getElementById('home-meal-breakfast-kcal');
  if (bEl) bEl.textContent = bKcal > 0 ? `${bKcal} kcal` : '0 kcal';

  const lEl = document.getElementById('home-meal-lunch-kcal');
  if (lEl) lEl.textContent = lKcal > 0 ? `${lKcal} kcal` : '0 kcal';

  const dEl = document.getElementById('home-meal-dinner-kcal');
  if (dEl) dEl.textContent = dKcal > 0 ? `${dKcal} kcal` : '0 kcal';

  const sEl = document.getElementById('home-meal-snack-kcal');
  if (sEl) sEl.textContent = sKcal > 0 ? `${sKcal} kcal` : '0 kcal';

  // 4. Date Picker Pill
  const btnDate = document.getElementById('btn-home-date-picker');
  if (btnDate) btnDate.textContent = selectedDiaryDate;

  // 5. Statistics Chart Bars
  const chartContainer = document.getElementById('stats-bars-container');
  if (chartContainer) {
    const daysRu = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const daysPl = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];
    const daysEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dayLabels = lang === 'ru' ? daysRu : (lang === 'pl' ? daysPl : daysEn);
    const mockKcal = [1850, 2100, 1920, 2050, 1840, 2250, totalCalories || 1840];

    chartContainer.innerHTML = dayLabels.map((lbl, idx) => {
      const kcal = mockKcal[idx];
      const pct = Math.min(100, Math.round((kcal / profile.targetCalories) * 100));
      const isToday = idx === 6;
      return `
        <div class="chart-col ${isToday ? 'current' : ''}">
          <div class="bar-val-pop">${kcal}</div>
          <div class="chart-bar-bg">
            <div class="chart-bar-fill" style="height: ${pct}%;"></div>
          </div>
          <span class="chart-day-lbl">${lbl}</span>
        </div>
      `;
    }).join('');
  }

  // 6. Goals Row
  const curWeight = profile.weight || 75;
  const goalWeight = profile.targetWeightGoal || 72;
  const startWeight = Math.max(goalWeight + 8, curWeight + 3);
  const totalToLose = Math.max(0.5, startWeight - goalWeight);
  const lostKg = Math.max(0, startWeight - curWeight);
  const weightProgressPct = curWeight <= goalWeight ? 100 : Math.min(100, Math.max(5, Math.round((lostKg / totalToLose) * 100)));
  const remainingKg = Math.max(0, Math.round((curWeight - goalWeight) * 10) / 10);
  const goalWeightFill = document.getElementById('goal-weight-fill');
  const goalWeightSub = document.getElementById('diary-goal-weight-sub');

  if (goalWeightFill) goalWeightFill.style.width = `${weightProgressPct}%`;
  if (goalWeightSub) {
    if (curWeight <= goalWeight) {
      goalWeightSub.innerText = lang === 'ru' ? 'Цель достигнута!' : (lang === 'pl' ? 'Cel osiągnięty!' : 'Goal reached!');
    } else {
      goalWeightSub.innerText = lang === 'ru'
        ? `Осталось ${remainingKg} кг`
        : (lang === 'pl' ? `Pozostało ${remainingKg} kg` : `${remainingKg} kg remaining`);
    }
  }

  const goalMonths = profile.targetMonthsRemaining ?? 2;
  const totalMonths = 6;
  const completedMonths = Math.max(0, totalMonths - goalMonths);
  const workoutProgressPct = goalMonths <= 0 ? 100 : Math.min(100, Math.max(6, Math.round((completedMonths / totalMonths) * 100)));
  const goalWorkoutsFill = document.getElementById('goal-workouts-fill');
  const goalWorkoutsSub = document.getElementById('diary-goal-workouts-sub');

  if (goalWorkoutsFill) goalWorkoutsFill.style.width = `${workoutProgressPct}%`;
  if (goalWorkoutsSub) {
    if (goalMonths <= 0) {
      goalWorkoutsSub.innerText = lang === 'ru' ? 'Программа завершена!' : (lang === 'pl' ? 'Program ukończony!' : 'Program completed!');
    } else {
      goalWorkoutsSub.innerText = lang === 'ru'
        ? `Осталось ${goalMonths} месяца`
        : (lang === 'pl' ? `Pozostało ${goalMonths} mies.` : `${goalMonths} months remaining`);
    }
  }

  // 7. Parameters Capsules & Unified Inputs
  const inputWeight = document.getElementById('edit-param-weight') as HTMLInputElement | null;
  const inputHeight = document.getElementById('edit-param-height') as HTMLInputElement | null;
  const inputAge = document.getElementById('edit-param-age') as HTMLInputElement | null;
  const inputFat = document.getElementById('edit-param-fat') as HTMLInputElement | null;
  const inputMuscle = document.getElementById('edit-param-muscle') as HTMLInputElement | null;
  const btnToggleGender = document.getElementById('btn-toggle-gender') as HTMLButtonElement | null;
  const iconGender = document.getElementById('gender-toggle-icon');
  const textGender = document.getElementById('gender-toggle-text');
  const selectActivity = document.getElementById('edit-param-activity') as HTMLSelectElement | null;
  const selectGoal = document.getElementById('edit-param-goal') as HTMLSelectElement | null;

  if (inputWeight && document.activeElement !== inputWeight) inputWeight.value = (profile.weight || 75).toString();
  if (inputHeight && document.activeElement !== inputHeight) inputHeight.value = (profile.height || 178).toString();
  if (inputAge && document.activeElement !== inputAge) inputAge.value = (profile.age || 25).toString();
  if (inputFat && document.activeElement !== inputFat) inputFat.value = (profile.bodyFatPercent || 34).toString();
  if (inputMuscle && document.activeElement !== inputMuscle) inputMuscle.value = (profile.musclePercent || 49).toString();
  if (selectActivity && profile.activity) selectActivity.value = profile.activity;
  if (selectGoal && profile.goal) selectGoal.value = profile.goal;
  syncCustomSelects();

  if (btnToggleGender) {
    btnToggleGender.dataset.gender = profile.gender || 'male';
    if (iconGender) iconGender.textContent = profile.gender === 'female' ? '👩' : '🧔';
    if (textGender) {
      if (profile.gender === 'female') {
        textGender.textContent = lang === 'ru' ? 'Женщина' : (lang === 'pl' ? 'Kobieta' : 'Female');
      } else {
        textGender.textContent = lang === 'ru' ? 'Мужчина' : (lang === 'pl' ? 'Mężczyzna' : 'Male');
      }
    }
  }

  // Sync calculation preview
  const bmrEl = document.getElementById('preview-bmr-val');
  const tdeeEl = document.getElementById('preview-tdee-val');
  const previewTargetEl = document.getElementById('preview-target-val');
  if (bmrEl && profile.bmr) bmrEl.innerText = `${Math.round(profile.bmr).toLocaleString()} kcal`;
  if (tdeeEl && profile.tdee) tdeeEl.innerText = `${Math.round(profile.tdee).toLocaleString()} kcal`;
  if (previewTargetEl && profile.targetCalories) previewTargetEl.innerText = `${Math.round(profile.targetCalories).toLocaleString()} kcal/${lang === 'ru' ? 'день' : (lang === 'pl' ? 'dzień' : 'day')}`;

  // 8. Water Tracker (6 SVG Glasses)
  const waterContainer = document.getElementById('zuvia-water-container');
  if (waterContainer) {
    const consumedWater = state.waterConsumedMl ?? 1000;
    const filledCount = Math.min(6, Math.floor(consumedWater / 250));

    let glassesHtml = '';
    for (let i = 0; i < 6; i++) {
      const isFilled = i < filledCount;
      glassesHtml += `
        <div class="water-glass-item ${isFilled ? 'filled' : ''}" data-idx="${i}" role="button" tabindex="0" title="${(i + 1) * 250} ml">
          <svg viewBox="0 0 36 46" class="zuvia-glass-svg" xmlns="http://www.w3.org/2000/svg">
            ${isFilled 
              ? `
                <polygon points="4,2 32,2 26,42 10,42" fill="#ffffff" />
                <text x="18" y="27" text-anchor="middle" font-size="7.5" font-weight="800" font-family="'Outfit', sans-serif" fill="#7aaaf0">250 ml</text>
              `
              : `
                <polygon points="4,2 32,2 26,42 10,42" fill="none" stroke="#ffffff" stroke-width="2.4" stroke-linejoin="round" />
              `
            }
          </svg>
        </div>
      `;
    }
    waterContainer.innerHTML = glassesHtml;

    waterContainer.querySelectorAll<HTMLElement>('.water-glass-item').forEach(glass => {
      glass.addEventListener('click', async () => {
        const idx = parseInt(glass.dataset.idx || '0');
        let newWater = (idx + 1) * 250;
        if (newWater === state.waterConsumedMl) {
          newWater = Math.max(0, newWater - 250);
        }

        glass.classList.add('glass-animating');
        state.waterConsumedMl = newWater;
        try {
          await authService.updateWater(newWater, 'set');
        } catch (e) {
          console.warn('[Prisma] Water update error:', e);
        }
        renderAll();
      });
    });
  }

  // 9. Calorie Norm Badge
  const normVal = document.getElementById('diary-norm-val');
  const normUnit = document.getElementById('diary-norm-unit');
  const dayWord = lang === 'ru' ? 'день' : (lang === 'pl' ? 'dzień' : 'day');
  if (normVal) {
    normVal.innerText = (profile.targetCalories || 2200).toLocaleString();
  }
  if (normUnit) {
    normUnit.innerText = `kcal/${dayWord}`;
  }

  // 10. Recommended recipes cards
  const recsContainer = document.getElementById('home-recipes-grid');
  if (recsContainer) {
    recsContainer.innerHTML = '';
    const featuredRecipes = state.recipes.slice(0, 2);
    featuredRecipes.forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'zuvia-solid-card';
      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title[lang]}" class="zuvia-solid-card-bg" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';">
        <div class="zuvia-solid-card-content">
          <span class="zuvia-card-tag">${recipe.prepTime[lang]}</span>
          <div class="zuvia-card-title">${recipe.title[lang]}</div>
          <div class="zuvia-card-meta">${recipe.calories} kcal</div>
        </div>
      `;
      card.addEventListener('click', () => {
        openRecipeModal(recipe.id);
      });
      recsContainer.appendChild(card);
    });
  }

  // 11. Deals cards
  const dealsContainer = document.getElementById('home-deals-grid');
  if (dealsContainer) {
    dealsContainer.innerHTML = '';
    const promos = getDynamicPromotions();
    const featuredPromos = promos.slice(0, 2);
    featuredPromos.forEach(promo => {
      const card = document.createElement('div');
      card.className = 'zuvia-solid-card';
      card.innerHTML = `
        <img src="${promo.image}" alt="${promo.productName[lang]}" class="zuvia-solid-card-bg" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80';">
        <div class="zuvia-solid-card-content">
          <span class="zuvia-card-tag deal-tag">${promo.discountBadge} ${promo.storeName}</span>
          <div class="zuvia-card-title">${promo.productName[lang]}</div>
          <div class="zuvia-card-meta">${promo.promoPrice} zł <span style="text-decoration:line-through;opacity:0.7">${promo.originalPrice} zł</span></div>
        </div>
      `;
      card.addEventListener('click', () => {
        const title = promo.productName[lang];
        const price = typeof promo.promoPrice === 'number' ? promo.promoPrice : (parseFloat(promo.promoPrice as any) || 0);
        state.shoppingList.push({
          name: { ru: title, en: title, pl: title },
          qty: 1,
          unit: { ru: 'шт', en: 'pcs', pl: 'szt' },
          basePrice: price,
          checked: false,
          isDiscrete: true
        });
        saveShoppingState();
        renderShoppingList();
        renderStores();
        switchView('view-shopping');
      });
      dealsContainer.appendChild(card);
    });
  }
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
        <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
          <button type="button" class="btn btn-secondary btn-sm" id="btn-fav-recipe" data-id="${recipe.id}" title="Dodaj do ulubionych" style="border-radius: var(--radius-full); padding: 7px 12px;">
            ❤️ ${lang === 'pl' ? 'Ulubione' : (lang === 'en' ? 'Favorite' : 'В избранное')}
          </button>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-mark-cooked" data-id="${recipe.id}" title="Oznacz jako ugotowane" style="border-radius: var(--radius-full); padding: 7px 12px;">
            🍳 ${lang === 'pl' ? 'Ugotowane' : (lang === 'en' ? 'Cooked' : 'Приготовлено')}
          </button>
          <button class="btn btn-action-cook" id="btn-start-cooking" data-id="${recipe.id}">
            ${tr.letscookBtn}
          </button>
        </div>
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

  // Favorites button event
  const btnFav = document.getElementById('btn-fav-recipe') as HTMLButtonElement | null;
  if (btnFav) {
    btnFav.addEventListener('click', async () => {
      if (!authService.isAuthenticated()) {
        (window as any).openAuthModal?.('login');
        return;
      }
      try {
        const isFav = await authService.toggleFavorite({
          recipeId: recipe.id,
          title: recipe.title[lang],
          image: recipe.image,
          calories: recipe.calories
        });
        btnFav.innerHTML = isFav 
          ? `💖 ${lang === 'pl' ? 'W ulubionych' : (lang === 'en' ? 'Saved' : 'В избранном')}`
          : `❤️ ${lang === 'pl' ? 'Ulubione' : (lang === 'en' ? 'Favorite' : 'В избранное')}`;
      } catch (e) {
        console.error('Favorite error:', e);
      }
    });
  }

  // Mark as Cooked button event
  const btnCooked = document.getElementById('btn-mark-cooked') as HTMLButtonElement | null;
  if (btnCooked) {
    btnCooked.addEventListener('click', async () => {
      if (!authService.isAuthenticated()) {
        (window as any).openAuthModal?.('login');
        return;
      }
      try {
        await authService.recordCookedRecipe({
          recipeId: recipe.id,
          title: recipe.title[lang],
          image: recipe.image,
          calories: recipe.calories,
          servings: state.servingsCount
        });
        const originalText = btnCooked.innerHTML;
        btnCooked.innerHTML = `✅ ${lang === 'pl' ? 'Zapisano w historii!' : (lang === 'en' ? 'Saved to history!' : 'Сохранено в историю!')}`;
        btnCooked.style.borderColor = 'var(--accent-primary)';
        setTimeout(() => {
          if (btnCooked) {
            btnCooked.innerHTML = originalText;
            btnCooked.style.borderColor = '';
          }
        }, 2200);
      } catch (e) {
        console.error('Mark cooked error:', e);
      }
    });
  }

  const btnStart = document.getElementById('btn-start-cooking');
  if (btnStart) {
    btnStart.addEventListener('click', () => {
      state.activeRecipeForShopping = recipe;
      state.servingsCount = 2;
      state.shoppingList = recipe.ingredients.map(ing => ({ 
        ...ing, 
        checked: false,
        isDiscrete: false,
        baseQty: ing.qty,
        initialBaseQty: ing.qty,
        unitPrice: ing.basePrice / (ing.qty || 1)
      }));
      
      saveShoppingState();
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
    saveShoppingState();
    renderShoppingList();
    renderStores();
  });

  document.getElementById('btn-dec-servings')?.addEventListener('click', () => {
    if (state.servingsCount > 1) {
      state.servingsCount--;
      saveShoppingState();
      renderShoppingList();
      renderStores();
    }
  });

  document.getElementById('btn-clear-cart')?.addEventListener('click', () => {
    const lang = state.currentLang;
    if (confirm(lang === 'pl' ? 'Czy na pewno chcesz wyczyścić listę zakupów?' : (lang === 'en' ? 'Are you sure you want to clear the shopping list?' : 'Вы уверены, что хотите очистить список покупок?'))) {
      state.shoppingList = [];
      saveShoppingState();
      renderShoppingList();
      renderStores();
    }
  });

  // Custom Product Input with Smart Autocomplete & Unit Selector
  const inputName = document.getElementById('custom-item-input') as HTMLInputElement | null;
  const inputPrice = document.getElementById('custom-item-price') as HTMLInputElement | null;
  const inputQty = document.getElementById('custom-item-qty') as HTMLInputElement | null;
  const selectUnit = document.getElementById('custom-item-unit') as HTMLSelectElement | null;
  const dropdown = document.getElementById('grocery-autocomplete-dropdown');
  const validationMsg = document.getElementById('custom-item-validation-msg');

  inputName?.addEventListener('input', () => {
    const val = inputName.value.trim();
    if (validationMsg) validationMsg.classList.add('hidden');
    if (!val || val.length < 1) {
      if (dropdown) dropdown.classList.add('hidden');
      return;
    }
    const matches = searchCatalogProducts(val, state.currentLang);
    if (!dropdown) return;
    if (matches.length === 0) {
      dropdown.classList.add('hidden');
      return;
    }
    dropdown.innerHTML = matches.map(p => `
      <div class="autocomplete-item" data-id="${p.id}" data-name="${p.name[state.currentLang]}" data-price="${p.marketPrice}" data-unit="${p.defaultUnit.pl}" data-qty="${p.defaultQty}">
        <div class="autocomplete-left">
          <span class="autocomplete-icon">${p.icon}</span>
          <span class="autocomplete-name">${p.name[state.currentLang]}</span>
        </div>
        <span class="autocomplete-price">~${p.marketPrice.toFixed(2)} zł</span>
      </div>
    `).join('');
    dropdown.classList.remove('hidden');

    dropdown.querySelectorAll<HTMLDivElement>('.autocomplete-item').forEach(item => {
      item.addEventListener('click', () => {
        if (inputName) inputName.value = item.dataset.name || '';
        if (inputPrice) inputPrice.value = (parseFloat(item.dataset.price || '4.50')).toFixed(2);
        if (selectUnit) selectUnit.value = item.dataset.unit || 'szt';
        if (inputQty) inputQty.value = item.dataset.qty || '1';
        dropdown.classList.add('hidden');
      });
    });
  });

  // Hide dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!dropdown?.contains(e.target as Node) && e.target !== inputName) {
      dropdown?.classList.add('hidden');
    }
  });

  document.getElementById('btn-add-item')?.addEventListener('click', () => {
    if (inputName) {
      const rawName = inputName.value.trim().replace(/[<>]/g, '');
      if (!rawName || rawName.length < 2) {
        if (validationMsg) {
          const lang = state.currentLang;
          validationMsg.textContent = lang === 'pl' 
            ? '⚠️ Wpisz poprawną nazwę produktu (min. 2 znaki).' 
            : (lang === 'en' ? '⚠️ Enter a valid product name (min 2 chars).' : '⚠️ Введите корректное название товара (мин. 2 символа).');
          validationMsg.classList.remove('hidden');
        }
        return;
      }
      if (validationMsg) validationMsg.classList.add('hidden');

      const priceVal = inputPrice && parseFloat(inputPrice.value) > 0 ? parseFloat(inputPrice.value) : 4.50;
      const qtyVal = inputQty && parseFloat(inputQty.value) > 0 ? parseFloat(inputQty.value) : 1;
      const unitVal = selectUnit ? selectUnit.value : 'szt';

      const unitLabelsMap: Record<string, { ru: string; en: string; pl: string }> = {
        'szt': { ru: 'шт', en: 'pcs', pl: 'szt' },
        'kg': { ru: 'кг', en: 'kg', pl: 'kg' },
        'g': { ru: 'г', en: 'g', pl: 'g' },
        'l': { ru: 'л', en: 'l', pl: 'l' },
        'ml': { ru: 'мл', en: 'ml', pl: 'ml' },
        'opak.': { ru: 'упак.', en: 'pack', pl: 'opak.' }
      };
      const localizedUnit = unitLabelsMap[unitVal] || { ru: unitVal, en: unitVal, pl: unitVal };

      state.shoppingList.push({
        name: { ru: rawName, en: rawName, pl: rawName },
        qty: qtyVal,
        unit: localizedUnit,
        basePrice: priceVal,
        checked: false,
        isDiscrete: true
      });

      inputName.value = '';
      if (inputPrice) inputPrice.value = '4.50';
      if (inputQty) inputQty.value = '1';
      dropdown?.classList.add('hidden');

      saveShoppingState();
      renderShoppingList();
      renderStores();
    }
  });

  // Deals Search & Sort Listeners
  const searchInput = document.getElementById('promo-search-input') as HTMLInputElement | null;
  searchInput?.addEventListener('input', () => {
    promoSearchQuery = searchInput.value.trim();
    renderPromotions();
  });

  const sortSelect = document.getElementById('promo-sort-select') as HTMLSelectElement | null;
  sortSelect?.addEventListener('change', () => {
    promoSortBy = sortSelect.value;
    renderPromotions();
  });

  // Deals Category Filter Pills
  const catPills = document.querySelectorAll<HTMLButtonElement>('#promo-cat-container .pill');
  catPills.forEach(btn => {
    btn.addEventListener('click', () => {
      catPills.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePromoCategory = btn.dataset.promoCat || 'all';
      renderPromotions();
    });
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

  const btnLocateMe = document.getElementById('btn-locate-me');
  btnLocateMe?.addEventListener('click', () => {
    btnLocateMe.classList.add('locating-pulse');
    const lang = state.currentLang;
    btnLocateMe.textContent = lang === 'ru' ? '⏳ Поиск...' : (lang === 'pl' ? '⏳ Szukanie...' : '⏳ Locating...');
    
    lastGpsPos = null;
    requestUserGeolocation();
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
          
          state.userLocation = { lat, lng };
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
  const summaryBox = document.getElementById('cart-summary-box');

  const lang = state.currentLang;
  const tr = t();
  const currency = 'zł';

  const recipeTitle = state.activeRecipeForShopping?.title?.[lang] || (lang === 'pl' ? 'Własny koszyk' : (lang === 'en' ? 'Custom Cart' : 'Мой список'));
  if (title) title.innerText = `🛒 ${tr.shoppingCartHeader}: ${recipeTitle}`;
  if (servings) servings.innerText = state.servingsCount.toString();
  if (!list) return;

  const mult = state.servingsCount / 2;

  if (state.shoppingList.length === 0) {
    list.innerHTML = `
      <li style="padding: 28px 16px; text-align: center; color: var(--text-muted); font-size: 0.9rem; list-style: none;">
        🛒 ${lang === 'pl' ? 'Lista zakupów jest pusta. Dodaj składniki z przepisów lub z promocji!' : (lang === 'en' ? 'Shopping list is empty. Add items from recipes or hot deals!' : 'Список покупок пуст. Добавьте ингредиенты из рецептов или акций!')}
      </li>
    `;
    if (summaryBox) summaryBox.innerHTML = '';
    return;
  }

  list.innerHTML = state.shoppingList.map((item, idx) => {
    let displayQtyStr = '';
    const itemPrice = getItemDynamicPrice(item, state.servingsCount);

    if (item.isDiscrete) {
      displayQtyStr = `${item.qty} ${item.unit[lang]}`;
    } else {
      const baseQ = item.baseQty !== undefined ? item.baseQty : item.qty;
      const scaledQty = Math.round(baseQ * mult * 10) / 10;
      displayQtyStr = `${scaledQty} ${item.unit[lang]}`;
    }

    return `
      <li class="shopping-item ${item.checked ? 'checked' : ''}">
        <div class="item-left">
          <input type="checkbox" class="chk-box" data-idx="${idx}" ${item.checked ? 'checked' : ''}>
          <span class="item-name" title="${item.name[lang]}">${item.name[lang]}</span>
        </div>
        <div class="item-right">
          <div class="qty-control-inline">
            <button class="btn-qty-mini btn-dec-item-qty" data-idx="${idx}" title="Mniej">-</button>
            <span class="qty-val-mini">${displayQtyStr}</span>
            <button class="btn-qty-mini btn-inc-item-qty" data-idx="${idx}" title="Więcej">+</button>
          </div>
          <span class="item-price-pill">${itemPrice.toFixed(2)} ${currency}</span>
          <button class="btn-delete-item" data-idx="${idx}" title="${lang === 'pl' ? 'Usuń' : (lang === 'en' ? 'Delete' : 'Удалить')}">🗑️</button>
        </div>
      </li>
    `;
  }).join('');

  // Checkbox toggle
  list.querySelectorAll<HTMLInputElement>('.chk-box').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const idx = parseInt((e.target as HTMLInputElement).dataset.idx || '0');
      state.shoppingList[idx].checked = (e.target as HTMLInputElement).checked;
      saveShoppingState();
      renderShoppingList();
      renderStores();
    });
  });

  // Quantity stepper
  list.querySelectorAll<HTMLButtonElement>('.btn-inc-item-qty').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt((e.currentTarget as HTMLButtonElement).dataset.idx || '0');
      const item = state.shoppingList[idx];
      if (item.isDiscrete) {
        item.qty = Math.round((item.qty + 1) * 10) / 10;
      } else {
        if (!item.initialBaseQty) {
          item.initialBaseQty = item.qty || 1;
        }
        const u = item.unit.pl;
        const step = (u === 'g' || u === 'ml') ? 50 : 1;
        item.baseQty = (item.baseQty ?? item.qty) + step;
      }
      saveShoppingState();
      renderShoppingList();
      renderStores();
    });
  });

  list.querySelectorAll<HTMLButtonElement>('.btn-dec-item-qty').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt((e.currentTarget as HTMLButtonElement).dataset.idx || '0');
      const item = state.shoppingList[idx];
      if (item.isDiscrete) {
        if (item.qty > 1) {
          item.qty = Math.round((item.qty - 1) * 10) / 10;
        } else {
          state.shoppingList.splice(idx, 1);
        }
      } else {
        if (!item.initialBaseQty) {
          item.initialBaseQty = item.qty || 1;
        }
        const u = item.unit.pl;
        const step = (u === 'g' || u === 'ml') ? 50 : 1;
        const currentBase = item.baseQty ?? item.qty;
        if (currentBase > step) {
          item.baseQty = currentBase - step;
        } else {
          state.shoppingList.splice(idx, 1);
        }
      }
      saveShoppingState();
      renderShoppingList();
      renderStores();
    });
  });

  // Delete item
  list.querySelectorAll<HTMLButtonElement>('.btn-delete-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt((e.currentTarget as HTMLButtonElement).dataset.idx || '0');
      state.shoppingList.splice(idx, 1);
      saveShoppingState();
      renderShoppingList();
      renderStores();
    });
  });

  // Render Cart Summary Box
  if (summaryBox) {
    const totalSubtotal = getCartActiveTotal(state.shoppingList, state.servingsCount);
    const checkedCount = state.shoppingList.filter(item => item.checked).length;
    const totalCount = state.shoppingList.length;

    // Calculate best store cost
    const stores = calculateStoreTotals(state.shoppingList, state.servingsCount, 'best-price', state.userLocation, realOsmStores);
    const bestStore = stores[0];
    const savings = bestStore ? Math.max(0, Math.round((totalSubtotal - (bestStore.totalCost || 0)) * 100) / 100) : 0;

    summaryBox.innerHTML = `
      <div class="cart-summary-metrics">
        <div>
          <span style="color: var(--text-muted); font-size: 0.8rem;">📦 ${totalCount} ${tr.cartItemsCount} ${checkedCount > 0 ? `(${checkedCount} ${tr.boughtText})` : ''}</span>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 0.78rem; color: var(--text-muted);">${tr.cartSubtotal}</span>
          <div class="subtotal-val">${Math.round(totalSubtotal * 100) / 100} ${currency}</div>
        </div>
      </div>
      ${bestStore ? `
        <div class="cart-savings-banner">
          <span>🏆</span>
          <span><strong>${bestStore.name}</strong>: ${bestStore.totalCost} ${currency} (${tr.savingText} ${savings} ${currency})</span>
        </div>
      ` : ''}
      <button id="btn-copy-shopping-list" class="btn btn-sm btn-outline btn-copy-cart">
        ${tr.cartCopyBtn}
      </button>
    `;

    document.getElementById('btn-copy-shopping-list')?.addEventListener('click', () => {
      const textToCopy = `🛒 ${tr.shoppingCartHeader} (${recipeTitle}):\n` + 
        state.shoppingList.map(item => {
          const q = item.isDiscrete ? item.qty : Math.round((item.baseQty ?? item.qty) * mult * 10) / 10;
          return `• ${item.name[lang]}: ${q} ${item.unit[lang]}`;
        }).join('\n') +
        `\n💰 Suma: ${Math.round(totalSubtotal * 100) / 100} ${currency}`;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert(tr.cartCopiedMsg);
      }).catch(() => {
        alert('Skopiowano!');
      });
    });
  }
}

function renderStores() {
  const container = document.getElementById('stores-list');
  if (!container) return;

  const lang = state.currentLang;
  const stores = calculateStoreTotals(state.shoppingList, state.servingsCount, state.storeFilterMode, state.userLocation, realOsmStores);
  const topId = stores[0]?.id;

  const currency = 'zł';
  const mapBtnText = lang === 'pl' ? '📍 Na mapie' : (lang === 'en' ? '📍 Map' : '📍 Карта');
  const gmapBtnText = lang === 'pl' ? '🗺️ Google' : (lang === 'en' ? '🗺️ Google' : '🗺️ Google');
  const orderBtnText = lang === 'pl' ? '🚚 Zamów' : (lang === 'en' ? '🚚 Order' : '🚚 Заказать');

  // Collapse list by default to show only top 4 stores
  const visibleStores = state.isStoresListExpanded ? stores : stores.slice(0, 4);

  let listHtml = visibleStores.map((store) => {
    const isCheapest = store.id === topId && (store.totalCost || 0) > 0;
    const badgeText = typeof store.badge === 'object' && store.badge !== null
      ? (store.badge[lang] || store.badge.pl || store.badge.ru || store.badge.en || '')
      : (store.badge || (lang === 'pl' ? 'Sklep w okolicy' : (lang === 'en' ? 'Nearby store' : 'Магазин рядом')));
    const cheapestBadgeText = lang === 'pl' ? '🏆 NAJTANIEJ' : (lang === 'en' ? '🏆 BEST VALUE' : '🏆 ВЫГОДНО');

    const storeAddr = typeof store.address === 'object' && store.address !== null
      ? (store.address[lang] || store.address.pl || store.address.ru || store.address.en || '')
      : (store.address || '');

    const storeWalk = typeof store.walkTime === 'object' && store.walkTime !== null
      ? (store.walkTime[lang] || store.walkTime.pl || store.walkTime.ru || store.walkTime.en || '')
      : (store.walkTime || (lang === 'pl' ? 'W pobliżu' : (lang === 'en' ? 'Nearby' : 'Рядом')));

    return `
      <div class="store-item-card ${isCheapest ? 'highlight' : ''}" id="store-card-${store.id}">
        <div class="store-card-header">
          <div class="store-brand-group">
            <div class="store-logo">${store.logo}</div>
            <div class="store-title-area">
              <div class="store-name-line">
                <h4>${store.name}</h4>
                <span class="store-badge-pill">${badgeText}</span>
                ${isCheapest ? `<span class="cheapest-badge-pill">${cheapestBadgeText}</span>` : ''}
              </div>
              <div class="store-meta-line">📍 ${storeAddr} • ⏱️ ${storeWalk} (${store.distanceMeters} m)</div>
            </div>
          </div>
          <div class="store-price-area">
            <div class="total-sum">${store.totalCost} ${currency}</div>
          </div>
        </div>
        <div class="store-card-footer">
          <div class="store-action-buttons">
            <button class="btn btn-sm btn-outline btn-pan-store-map" data-lat="${store.lat}" data-lng="${store.lng}" data-id="${store.id}">
              ${mapBtnText}
            </button>
            <a href="${store.mapUrl}" target="_blank" class="btn btn-sm btn-outline">
              ${gmapBtnText}
            </a>
            <a href="${store.deliveryUrl}" target="_blank" class="btn btn-sm btn-primary">
              ${orderBtnText}
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');

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

  // Store card "📍 Na mapie" click handler
  container.querySelectorAll<HTMLButtonElement>('.btn-pan-store-map').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lat = parseFloat((e.currentTarget as HTMLButtonElement).dataset.lat || '0');
      const lng = parseFloat((e.currentTarget as HTMLButtonElement).dataset.lng || '0');
      if (leafletMap && lat && lng) {
        leafletMap.setView([lat, lng], 15);
        const targetMarker = mapMarkers.find(m => {
          const pos = m.getLatLng();
          return Math.abs(pos.lat - lat) < 0.0001 && Math.abs(pos.lng - lng) < 0.0001;
        });
        if (targetMarker) {
          targetMarker.openPopup();
        }
        document.getElementById('real-map')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  document.getElementById('btn-toggle-stores-list')?.addEventListener('click', () => {
    state.isStoresListExpanded = !state.isStoresListExpanded;
    renderStores();
  });

  renderMap(stores);
}



async function fetchIpLocation(callback: (lat: number, lng: number) => void) {
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const data = await res.json();
      if (data.latitude && data.longitude) {
        callback(data.latitude, data.longitude);
        return;
      }
    }
  } catch (e) {
    console.warn('IP location fetch failed:', e);
  }
  // Fallback to Wroclaw center if IP lookup fails
  callback(51.1079, 17.0385);
}

function requestUserGeolocation() {
  const lang = state.currentLang;
  if (!leafletMap) return;

  if (gpsWatchId !== null && navigator.geolocation) {
    navigator.geolocation.clearWatch(gpsWatchId);
    gpsWatchId = null;
  }

  const applyPosition = async (lat: number, lng: number, accuracy: number = 100) => {
    state.userLocation = { lat, lng };

    if (leafletMap) {
      leafletMap.setView([lat, lng], 14);

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
    }

    const btnLocate = document.getElementById('btn-locate-me');
    if (btnLocate) {
      btnLocate.classList.remove('locating-pulse');
      btnLocate.textContent = lang === 'ru' ? '📍 Найти меня (GPS)' : (lang === 'pl' ? '📍 Znajdź mnie (GPS)' : '📍 Find me (GPS)');
    }

    const now = Date.now();
    let movedDistance = 999;
    if (lastGpsPos) {
      const R = 6371000;
      const dLat = (lat - lastGpsPos.lat) * Math.PI / 180;
      const dLon = (lng - lastGpsPos.lng) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lastGpsPos.lat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      movedDistance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    if (!lastGpsPos || (movedDistance > 50 && now - lastFetchTime > 8000)) {
      lastGpsPos = { lat, lng };
      lastFetchTime = now;
      await updateStoresForLocation(lat, lng);
    }
  };

  // 1. Try HTML5 Geolocation with enableHighAccuracy: false (fast & zero-timeout on desktop Wi-Fi)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => applyPosition(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy),
      (err) => {
        console.warn('Geolocation fast fix failed, trying IP fallback:', err.message);
        fetchIpLocation(applyPosition);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
    );

    gpsWatchId = navigator.geolocation.watchPosition(
      (pos) => applyPosition(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy),
      (err) => console.warn('GPS watch error:', err.message),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 10000 }
    );
  } else {
    fetchIpLocation(applyPosition);
  }
}

function renderMap(stores: any[]) {
  const mapElem = document.getElementById('real-map');
  if (!mapElem) return;

  const lang = state.currentLang;
  const currency = 'zł';

  const initialCenter = state.userLocation
    ? [state.userLocation.lat, state.userLocation.lng]
    : [51.1079, 17.0385];

  if (!leafletMap) {
    leafletMap = L.map('real-map').setView(initialCenter as any, 13);
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

    const popupTotalLabel = lang === 'pl' ? 'Wartość koszyka' : (lang === 'en' ? 'Cart Total' : 'Чек');
    const popupOrderLabel = lang === 'pl' ? '🚚 Zamów online' : (lang === 'en' ? '🚚 Order online' : '🚚 Заказать');

    const storeAddr = typeof store.address === 'object' && store.address !== null
      ? (store.address[lang] || store.address.pl || store.address.ru || store.address.en || '')
      : (store.address || '');

    const marker = L.marker([store.lat, store.lng], { icon: customIcon }).addTo(leafletMap);
    marker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 13px; color: #111; padding: 4px;">
        <strong>${store.logo} ${store.name}</strong><br>
        <span style="color: #666; font-size: 12px;">${storeAddr}</span><br>
        <strong style="color: #10b981; font-size: 14px;">${popupTotalLabel}: ${store.totalCost} ${currency}</strong><br>
        <div style="margin-top: 8px; display: flex; gap: 10px;">
          <a href="${store.mapUrl}" target="_blank" style="color: #2563eb; font-weight: bold; text-decoration: none; font-size: 12px;">📍 Google Maps</a>
          <a href="${store.deliveryUrl}" target="_blank" style="color: #10b981; font-weight: bold; text-decoration: none; font-size: 12px;">${popupOrderLabel}</a>
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

let activePromoStore = 'all';

async function renderPromotions() {
  const container = document.getElementById('promos-grid');
  const filterContainer = document.getElementById('promo-filter-container');
  if (!container) return;

  const lang = state.currentLang;
  const tr = t();
  const currency = 'zł';

  let rawPromos: PromotionItem[] = [];

  try {
    const res = await fetch('/api/promotions');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        rawPromos = data;
      }
    }
  } catch (err) {
    console.warn('API fetch failed for promotions, using local dynamic catalog:', err);
  }

  // Fallback to rich local catalog
  if (!rawPromos || rawPromos.length === 0) {
    rawPromos = getDynamicPromotions();
  }

  // Render Supermarket Filter Chips
  if (filterContainer) {
    const storesMap = new Map<string, { logo: string; count: number }>();
    rawPromos.forEach(p => {
      const existing = storesMap.get(p.storeName) || { logo: p.storeLogo, count: 0 };
      existing.count++;
      storesMap.set(p.storeName, existing);
    });

    const storeEntries = Array.from(storesMap.entries());

    let chipsHtml = `
      <button class="pill ${activePromoStore === 'all' ? 'active' : ''}" data-store="all">
        🌐 ${lang === 'pl' ? 'Wszystkie' : (lang === 'en' ? 'All' : 'Все')} (${rawPromos.length})
      </button>
    `;

    storeEntries.forEach(([name, data]) => {
      chipsHtml += `
        <button class="pill ${activePromoStore === name ? 'active' : ''}" data-store="${name}">
          ${data.logo} ${name} (${data.count})
        </button>
      `;
    });

    filterContainer.innerHTML = chipsHtml;

    filterContainer.querySelectorAll<HTMLButtonElement>('.pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activePromoStore = btn.dataset.store || 'all';
        renderPromotions();
      });
    });
  }

  // Filter promos by selected store, category, and search query
  let filteredPromos = rawPromos;

  if (activePromoStore !== 'all') {
    filteredPromos = filteredPromos.filter(p => p.storeName.toLowerCase() === activePromoStore.toLowerCase());
  }

  if (activePromoCategory !== 'all') {
    filteredPromos = filteredPromos.filter(p => p.category === activePromoCategory);
  }

  if (promoSearchQuery) {
    const q = promoSearchQuery.toLowerCase();
    filteredPromos = filteredPromos.filter(p => 
      p.productName[lang].toLowerCase().includes(q) ||
      p.productName.pl.toLowerCase().includes(q) ||
      p.productName.ru.toLowerCase().includes(q) ||
      p.storeName.toLowerCase().includes(q)
    );
  }

  // Sort promos
  if (promoSortBy === 'discount') {
    filteredPromos.sort((a, b) => {
      const discA = parseFloat(a.discountBadge.replace(/[^0-9]/g, '')) || 0;
      const discB = parseFloat(b.discountBadge.replace(/[^0-9]/g, '')) || 0;
      return discB - discA;
    });
  } else if (promoSortBy === 'price-asc') {
    filteredPromos.sort((a, b) => a.promoPrice - b.promoPrice);
  } else if (promoSortBy === 'expiring') {
    filteredPromos.sort((a, b) => a.validUntil.localeCompare(b.validUntil));
  }

  if (filteredPromos.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: var(--text-muted);">
        🔍 ${lang === 'pl' ? 'Brak promocji spełniających kryteria wyszukiwania.' : (lang === 'en' ? 'No deals found matching your search.' : 'Нет акций по заданным фильтрам.')}
      </div>
    `;
    return;
  }

  container.innerHTML = filteredPromos.map((item: any) => `
    <div class="promo-card">
      <div>
        <div class="promo-img-wrap">
          <img src="${item.image}" alt="${item.productName[lang]}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80';">
          <div class="promo-discount-badge">
            ${item.discountBadge}
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <div class="promo-store-tag">
            <span>${item.storeLogo}</span>
            <span>${item.storeName}</span>
          </div>
          ${item.unitWeight ? `<span style="font-size: 0.72rem; color: var(--text-muted);">${item.unitWeight}</span>` : ''}
        </div>

        <h4 class="promo-product-title">
          ${item.productName[lang]}
        </h4>

        <div class="promo-recommendation">
          ${item.recommendation[lang]}
        </div>

        <div style="font-size: 0.72rem; color: #10b981; font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; gap: 4px;">
          <span>⏰</span>
          <span>${tr.validUntilPrefix} ${item.validUntil}</span>
        </div>
      </div>

      <div>
        <div class="promo-price-block">
          <span class="promo-price-current">${item.promoPrice} ${currency}</span>
          <span class="promo-price-old">${item.originalPrice} ${currency}</span>
        </div>

        <button class="btn btn-sm btn-primary btn-add-promo" data-title="${item.productName[lang]}" data-price="${item.promoPrice}">
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
          checked: false,
          isDiscrete: true
        });
        saveShoppingState();
        renderShoppingList();
        renderStores();
        
        // Button visual animation
        const originalText = target.innerText;
        target.innerText = '✅ ' + (lang === 'pl' ? 'Dodano!' : (lang === 'en' ? 'Added!' : 'Добавлено!'));
        target.style.background = '#10b981';
        setTimeout(() => {
          target.innerText = originalText;
          target.style.background = '';
        }, 1200);
      }
    });
  });
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

  document.getElementById('btn-add-to-diary')?.addEventListener('click', async () => {
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

    try {
      const saved = await authService.saveDiaryMeal({
        name: newMeal.name,
        calories: newMeal.calories,
        protein: newMeal.protein,
        fat: newMeal.fat,
        carbs: newMeal.carbs,
        mealType: 'lunch',
        date: new Date().toISOString().split('T')[0],
        time: newMeal.time
      });
      if (saved?.id) newMeal.id = saved.id;
    } catch (e) {
      console.warn('[Prisma] Could not save scanned meal:', e);
    }

    if (!state.loggedMeals) state.loggedMeals = [];
    state.loggedMeals.push(newMeal);
    alert(`+ ${result.title[lang]} (${finalKcal} kcal)`);
    switchView('view-diary');
  });
}

function initDiary() {
  // 1. Gender buttons
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

  // 2. Calculator Inputs
  const inputs = ['calc-age', 'calc-weight', 'calc-height', 'calc-activity', 'calc-goal', 'calc-formula'];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('input', updateLiveCalculatorOutput);
    el?.addEventListener('change', updateLiveCalculatorOutput);
  });

  // 3. Apply Target to Profile & Diary
  document.getElementById('btn-apply-profile')?.addEventListener('click', async () => {
    const profile = getProfileFromInputs();
    state.userProfile = profile;
    try {
      await authService.updateProfile({
        gender: profile.gender,
        age: profile.age,
        weight: profile.weight,
        height: profile.height,
        activity: profile.activity,
        goal: profile.goal,
        formula: profile.formula,
        targetCalories: profile.targetCalories,
        targetProtein: profile.targetProtein,
        targetFat: profile.targetFat,
        targetCarbs: profile.targetCarbs,
        targetFiber: profile.targetFiber,
        targetWaterMl: profile.targetWaterMl
      });
    } catch (e) {
      console.warn('[Prisma] Error updating profile:', e);
    }
    renderAll();
    const msg = state.currentLang === 'pl' 
      ? `✅ Zapisano cel w profilu: ${profile.targetCalories.toLocaleString()} kcal!` 
      : (state.currentLang === 'en' ? `✅ Target saved: ${profile.targetCalories.toLocaleString()} kcal!` : `✅ Цель сохранена: ${profile.targetCalories.toLocaleString()} ккал!`);
    alert(msg);
  });

  // 4. Clear Day Button
  document.getElementById('btn-clear-diary-day')?.addEventListener('click', async () => {
    const confirmMsg = state.currentLang === 'pl'
      ? 'Czy na pewno chcesz wyczyścić dzisiejszy dziennik i licznik wody?'
      : (state.currentLang === 'en' ? 'Are you sure you want to clear today\'s diary and water intake?' : 'Вы уверены, что хотите очистить записи за сегодня и счетчик воды?');
    
    if (confirm(confirmMsg)) {
      state.loggedMeals = [];
      state.waterConsumedMl = 0;
      try {
        await authService.updateWater(0, 'set');
      } catch (e) {
        console.warn('[Prisma] Clear day error:', e);
      }
      renderAll();
    }
  });

  // 5. Water Tracker controls on Diary
  document.getElementById('btn-water-add')?.addEventListener('click', async () => {
    state.waterConsumedMl = (state.waterConsumedMl || 0) + 250;
    try {
      await authService.updateWater(250, 'add');
    } catch (e) {
      console.warn('[Prisma] Water add error:', e);
    }
    renderAll();
  });

  document.getElementById('btn-water-sub')?.addEventListener('click', async () => {
    state.waterConsumedMl = Math.max(0, (state.waterConsumedMl || 0) - 250);
    try {
      await authService.updateWater(-250, 'add');
    } catch (e) {
      console.warn('[Prisma] Water sub error:', e);
    }
    renderAll();
  });

  document.getElementById('btn-water-reset')?.addEventListener('click', async () => {
    state.waterConsumedMl = 0;
    try {
      await authService.updateWater(0, 'set');
    } catch (e) {
      console.warn('[Prisma] Water reset error:', e);
    }
    renderAll();
  });

  // 6. Meal Category Filter Pills
  const filterTabs = document.querySelectorAll<HTMLButtonElement>('#meal-filter-tabs .pill');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeMealCategoryFilter = (tab.dataset.mealFilter as any) || 'all';
      renderDiary();
    });
  });

  // 7. Meal Logging Modal
  const mealModal = document.getElementById('meal-modal');
  const openModalBtn = document.getElementById('btn-open-meal-modal');
  const closeModalBtn = document.getElementById('btn-close-meal-modal');
  const cancelModalBtn = document.getElementById('btn-cancel-meal-modal');
  const presetSelect = document.getElementById('meal-preset-select') as HTMLSelectElement | null;
  const mealNameInput = document.getElementById('meal-input-name') as HTMLInputElement | null;
  const mealTypeSelect = document.getElementById('meal-input-type') as HTMLSelectElement | null;
  const mealKcalInput = document.getElementById('meal-input-kcal') as HTMLInputElement | null;
  const mealPInput = document.getElementById('meal-input-protein') as HTMLInputElement | null;
  const mealFInput = document.getElementById('meal-input-fat') as HTMLInputElement | null;
  const mealCInput = document.getElementById('meal-input-carbs') as HTMLInputElement | null;

  const openMealModal = () => {
    if (!mealModal) return;
    const lang = state.currentLang;

    if (presetSelect) {
      presetSelect.innerHTML = `<option value="">-- ${state.currentLang === 'pl' ? 'Wybierz gotowe danie lub wpisz własne' : (state.currentLang === 'en' ? 'Choose preset or type custom meal' : 'Выберите готовое блюдо или введите свое')} --</option>`;

      const presetGroup = document.createElement('optgroup');
      presetGroup.label = state.currentLang === 'pl' ? '💡 Popularne zdrowe posiłki' : (state.currentLang === 'en' ? '💡 Popular Healthy Meals' : '💡 Популярные ПП блюда');
      SMART_MEAL_PRESETS.forEach((p, idx) => {
        const opt = document.createElement('option');
        opt.value = `smart_${idx}`;
        opt.textContent = `${p.name[lang]} (${p.calories} kcal)`;
        presetGroup.appendChild(opt);
      });
      presetSelect.appendChild(presetGroup);

      const recipeGroup = document.createElement('optgroup');
      recipeGroup.label = state.currentLang === 'pl' ? '👨‍🍳 Przepisy z aplikacji' : (state.currentLang === 'en' ? '👨‍🍳 App Recipes' : '👨‍🍳 Рецепты из приложения');
      state.recipes.forEach(r => {
        const opt = document.createElement('option');
        opt.value = `recipe_${r.id}`;
        opt.textContent = `${r.title[lang]} (${r.calories} kcal)`;
        recipeGroup.appendChild(opt);
      });
      presetSelect.appendChild(recipeGroup);
    }

    if (mealNameInput) mealNameInput.value = '';
    if (mealKcalInput) mealKcalInput.value = '350';
    if (mealPInput) mealPInput.value = '20';
    if (mealFInput) mealFInput.value = '10';
    if (mealCInput) mealCInput.value = '45';

    mealModal.classList.remove('hidden');
  };

  const closeMealModal = () => {
    mealModal?.classList.add('hidden');
  };

  openModalBtn?.addEventListener('click', openMealModal);
  closeModalBtn?.addEventListener('click', closeMealModal);
  cancelModalBtn?.addEventListener('click', closeMealModal);

  presetSelect?.addEventListener('change', () => {
    const val = presetSelect.value;
    const lang = state.currentLang;
    if (!val) return;

    if (val.startsWith('smart_')) {
      const idx = parseInt(val.replace('smart_', ''));
      const preset = SMART_MEAL_PRESETS[idx];
      if (preset) {
        if (mealNameInput) mealNameInput.value = preset.name[lang];
        if (mealTypeSelect) mealTypeSelect.value = preset.mealType;
        if (mealKcalInput) mealKcalInput.value = preset.calories.toString();
        if (mealPInput) mealPInput.value = preset.protein.toString();
        if (mealFInput) mealFInput.value = preset.fat.toString();
        if (mealCInput) mealCInput.value = preset.carbs.toString();
      }
    } else if (val.startsWith('recipe_')) {
      const id = val.replace('recipe_', '');
      const recipe = state.recipes.find(r => r.id === id);
      if (recipe) {
        if (mealNameInput) mealNameInput.value = recipe.title[lang];
        if (mealTypeSelect) {
          if (recipe.category === 'breakfast') mealTypeSelect.value = 'breakfast';
          else if (recipe.category === 'lunch' || recipe.category === 'soup') mealTypeSelect.value = 'lunch';
          else if (recipe.category === 'dinner' || recipe.category === 'main') mealTypeSelect.value = 'dinner';
          else if (recipe.category === 'snack' || recipe.category === 'dessert') mealTypeSelect.value = 'snack';
          else mealTypeSelect.value = 'lunch';
        }
        if (mealKcalInput) mealKcalInput.value = recipe.calories.toString();
        if (mealPInput) mealPInput.value = Math.round((recipe.calories * 0.25) / 4).toString();
        if (mealFInput) mealFInput.value = Math.round((recipe.calories * 0.28) / 9).toString();
        if (mealCInput) mealCInput.value = Math.round((recipe.calories * 0.47) / 4).toString();
      }
    }
  });

  mealKcalInput?.addEventListener('input', () => {
    const kcal = parseInt(mealKcalInput.value) || 0;
    if (kcal > 0 && mealPInput && mealFInput && mealCInput) {
      if (!mealPInput.value || mealPInput.value === '0') {
        mealPInput.value = Math.round((kcal * 0.25) / 4).toString();
      }
      if (!mealFInput.value || mealFInput.value === '0') {
        mealFInput.value = Math.round((kcal * 0.28) / 9).toString();
      }
      if (!mealCInput.value || mealCInput.value === '0') {
        mealCInput.value = Math.round((kcal * 0.47) / 4).toString();
      }
    }
  });

  document.getElementById('btn-save-meal-entry')?.addEventListener('click', async () => {
    const name = mealNameInput?.value.trim() || (state.currentLang === 'pl' ? 'Posiłek domowy' : (state.currentLang === 'en' ? 'Homemade meal' : 'Домашнее блюдо'));
    const calories = parseInt(mealKcalInput?.value || '350') || 0;
    const protein = parseInt(mealPInput?.value || '20') || 0;
    const fat = parseInt(mealFInput?.value || '10') || 0;
    const carbs = parseInt(mealCInput?.value || '45') || 0;
    const mealType = (mealTypeSelect?.value as any) || 'lunch';

    const newMeal: MealEntry = {
      id: 'meal_' + Date.now(),
      name,
      calories,
      protein,
      fat,
      carbs,
      mealType,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    try {
      const savedBackend = await authService.saveDiaryMeal({
        name,
        calories,
        protein,
        fat,
        carbs,
        mealType,
        date: new Date().toISOString().split('T')[0],
        time: newMeal.time
      });
      if (savedBackend?.id) {
        newMeal.id = savedBackend.id;
      }
    } catch (e) {
      console.warn('[Prisma] Could not save meal to backend:', e);
    }

    if (!state.loggedMeals) state.loggedMeals = [];
    state.loggedMeals.push(newMeal);
    closeMealModal();
    renderAll();
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
  const formula = ((document.getElementById('calc-formula') as HTMLSelectElement)?.value as any) || 'mifflin';

  return createFullUserProfile(gender, age, weight, height, activity, goal, formula);
}

function updateLiveCalculatorOutput() {
  const profile = getProfileFromInputs();
  const tr = t();
  const kcalUnit = state.currentLang === 'pl' ? 'kcal' : (state.currentLang === 'en' ? 'kcal' : 'ккал');

  // Outputs
  const bmrEl = document.getElementById('res-bmr');
  const tdeeEl = document.getElementById('res-tdee');
  const targetEl = document.getElementById('res-target');
  const pEl = document.getElementById('res-macro-protein');
  const fEl = document.getElementById('res-macro-fat');
  const cEl = document.getElementById('res-macro-carbs');
  const fibEl = document.getElementById('res-macro-fiber');

  if (bmrEl) bmrEl.innerText = `${Math.round(profile.bmr).toLocaleString()} ${kcalUnit}`;
  if (tdeeEl) tdeeEl.innerText = `${Math.round(profile.tdee).toLocaleString()} ${kcalUnit}`;
  if (targetEl) targetEl.innerText = `${Math.round(profile.targetCalories).toLocaleString()} ${kcalUnit}`;

  if (pEl) pEl.innerText = `🥩 ${tr.proteinLabel}: ${profile.targetProtein}g`;
  if (fEl) fEl.innerText = `🥑 ${tr.fatLabel}: ${profile.targetFat}g`;
  if (cEl) cEl.innerText = `🌾 ${tr.carbsLabel}: ${profile.targetCarbs}g`;
  if (fibEl) fibEl.innerText = `🥦 ${tr.fiberLabel}: ${profile.targetFiber}g`;

  // BMI & Needle & Status Badge
  const bmiValEl = document.getElementById('res-bmi-val');
  const bmiBadgeEl = document.getElementById('res-bmi-badge');
  const bmiNeedleEl = document.getElementById('bmi-needle');
  const idealWeightEl = document.getElementById('res-ideal-weight');

  if (bmiValEl) bmiValEl.innerText = profile.bmi.toFixed(1);

  if (bmiBadgeEl) {
    bmiBadgeEl.className = `bmi-badge ${profile.bmiCategory}`;
    if (profile.bmiCategory === 'underweight') bmiBadgeEl.innerText = tr.bmiUnderweight;
    else if (profile.bmiCategory === 'normal') bmiBadgeEl.innerText = tr.bmiNormal;
    else if (profile.bmiCategory === 'overweight') bmiBadgeEl.innerText = tr.bmiOverweight;
    else bmiBadgeEl.innerText = tr.bmiObese;
  }

  if (bmiNeedleEl) {
    const pct = Math.max(4, Math.min(96, ((profile.bmi - 14) / 22) * 100));
    bmiNeedleEl.style.left = `${pct}%`;
  }

  if (idealWeightEl) {
    idealWeightEl.innerText = `${profile.idealWeightMin} - ${profile.idealWeightMax} kg`;
  }
}

function renderDiary() {
  const tr = t();
  const profile = state.userProfile || defaultProfile;
  const meals = state.loggedMeals || [];

  // Update calculator inputs if form is loaded
  const ageInput = document.getElementById('calc-age') as HTMLInputElement | null;
  if (ageInput && document.activeElement !== ageInput && ageInput.value !== profile.age.toString()) {
    ageInput.value = profile.age.toString();
  }
  
  const weightInput = document.getElementById('calc-weight') as HTMLInputElement | null;
  if (weightInput && document.activeElement !== weightInput && weightInput.value !== profile.weight.toString()) {
    weightInput.value = profile.weight.toString();
  }
  
  const heightInput = document.getElementById('calc-height') as HTMLInputElement | null;
  if (heightInput && document.activeElement !== heightInput && heightInput.value !== profile.height.toString()) {
    heightInput.value = profile.height.toString();
  }

  const formulaSelect = document.getElementById('calc-formula') as HTMLSelectElement | null;
  if (formulaSelect && profile.formula && formulaSelect.value !== profile.formula) {
    formulaSelect.value = profile.formula;
  }

  const activitySelect = document.getElementById('calc-activity') as HTMLSelectElement | null;
  if (activitySelect && profile.activity && activitySelect.value !== profile.activity) {
    activitySelect.value = profile.activity;
  }

  const goalSelect = document.getElementById('calc-goal') as HTMLSelectElement | null;
  if (goalSelect && profile.goal && goalSelect.value !== profile.goal) {
    goalSelect.value = profile.goal;
  }

  document.querySelectorAll<HTMLButtonElement>('.gender-btn').forEach(btn => {
    if (btn.dataset.gender === profile.gender) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  updateLiveCalculatorOutput();

  // Sum today's meals
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = Math.round(meals.reduce((sum, m) => sum + m.protein, 0));
  const totalFat = Math.round(meals.reduce((sum, m) => sum + m.fat, 0));
  const totalCarbs = Math.round(meals.reduce((sum, m) => sum + m.carbs, 0));
  const totalFiber = Math.round((totalCalories / 1000) * 14 * 0.8);

  state.diaryConsumed = totalCalories;

  // Update Energy Gauge & Center Text
  const consumedEl = document.getElementById('consumed-calories');
  if (consumedEl) consumedEl.innerText = totalCalories.toLocaleString();

  const labelEl = document.getElementById('consumed-label-text');
  if (labelEl) {
    labelEl.innerText = tr.consumedLabel.replace('{target}', profile.targetCalories.toLocaleString());
  }

  const progressBar = document.getElementById('calorie-progress-bar') as SVGCircleElement | null;
  if (progressBar) {
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const ratio = Math.min(totalCalories / profile.targetCalories, 1.0);
    const offset = Math.max(0, circumference - (circumference * ratio));
    progressBar.style.strokeDasharray = `${circumference}`;
    progressBar.style.strokeDashoffset = `${offset}`;
  }

  // Update Calorie Balance Flow Panel
  const valTarget = document.getElementById('val-cal-target');
  const valFood = document.getElementById('val-cal-food');
  const valRemaining = document.getElementById('val-cal-remaining');

  if (valTarget) valTarget.innerText = profile.targetCalories.toLocaleString();
  if (valFood) valFood.innerText = totalCalories.toLocaleString();

  const remaining = profile.targetCalories - totalCalories;
  if (valRemaining) {
    if (remaining >= 0) {
      valRemaining.innerText = remaining.toLocaleString();
      valRemaining.style.color = 'var(--accent-primary)';
    } else {
      valRemaining.innerText = `+${Math.abs(remaining).toLocaleString()}`;
      valRemaining.style.color = '#ef4444';
    }
  }

  // Update 4 Macro Progress Bars
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

  const fibText = document.getElementById('macro-fiber');
  if (fibText) fibText.innerText = `${totalFiber} g / ${profile.targetFiber} g`;
  const fillFib = document.getElementById('fill-fiber');
  if (fillFib) fillFib.style.width = `${Math.min(100, Math.round((totalFiber / profile.targetFiber) * 100))}%`;

  // Update Hydration Tracker
  const waterConsumed = state.waterConsumedMl || 0;
  const targetWater = profile.targetWaterMl || 2800;

  const waterTextEl = document.getElementById('water-consumed-text');
  if (waterTextEl) {
    waterTextEl.innerText = `${waterConsumed.toLocaleString()} / ${targetWater.toLocaleString()} ml`;
  }

  const waterFillEl = document.getElementById('water-progress-fill');
  if (waterFillEl) {
    waterFillEl.style.width = `${Math.min(100, Math.round((waterConsumed / targetWater) * 100))}%`;
  }

  const waterCupsRow = document.getElementById('water-cups-row');
  if (waterCupsRow) {
    const totalCups = Math.max(8, Math.ceil(targetWater / 250));
    let cupsHtml = '';
    for (let i = 0; i < totalCups; i++) {
      const isFilled = (i + 1) * 250 <= waterConsumed;
      cupsHtml += `
        <button type="button" class="water-cup-btn ${isFilled ? 'filled' : ''}" data-cup-idx="${i}" title="${(i + 1) * 250} ml">
          ${isFilled ? '💧' : '🥛'}
        </button>
      `;
    }
    waterCupsRow.innerHTML = cupsHtml;

    waterCupsRow.querySelectorAll<HTMLButtonElement>('.water-cup-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const idx = parseInt(btn.dataset.cupIdx || '0');
        const newWater = (idx + 1) * 250;
        state.waterConsumedMl = newWater;
        try {
          await authService.updateWater(newWater, 'set');
        } catch (e) {
          console.warn('[Prisma] Water update error:', e);
        }
        renderAll();
      });
    });
  }

  // Render Meals List (with category filtering)
  const mealsList = document.getElementById('meals-list');
  if (mealsList) {
    const filteredMeals = activeMealCategoryFilter === 'all'
      ? meals
      : meals.filter(m => m.mealType === activeMealCategoryFilter);

    if (filteredMeals.length === 0) {
      mealsList.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 30px 10px; font-size: 0.9rem;">
          🍽️ ${tr.diaryEmptyCategory || 'В этой категории пока нет записей'}
        </div>
      `;
    } else {
      const mealTypeIcons: Record<string, string> = {
        breakfast: '🌅',
        lunch: '☀️',
        dinner: '🌙',
        snack: '🍎'
      };

      mealsList.innerHTML = filteredMeals.map(m => `
        <div class="meal-item">
          <div class="meal-item-header">
            <span class="meal-type-badge ${m.mealType}">
              ${mealTypeIcons[m.mealType] || '🍽️'} ${tr[m.mealType === 'breakfast' ? 'mealBreakfast' : (m.mealType === 'lunch' ? 'mealLunch' : (m.mealType === 'dinner' ? 'mealDinner' : 'mealSnack'))]}
            </span>
            <span class="meal-time">⏱️ ${m.time}</span>
          </div>
          <div class="meal-item-body">
            <div class="meal-name">${m.name}</div>
            <div class="meal-macros">
              <span>🥩 ${m.protein}g</span>
              <span>🥑 ${m.fat}g</span>
              <span>🌾 ${m.carbs}g</span>
            </div>
          </div>
          <div class="meal-item-footer">
            <strong class="meal-kcal">${m.calories} kcal</strong>
            <button type="button" class="btn-delete-meal" data-id="${m.id}" title="Удалить">🗑️</button>
          </div>
        </div>
      `).join('');

      mealsList.querySelectorAll<HTMLButtonElement>('.btn-delete-meal').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.dataset.id;
          if (id) {
            await authService.deleteDiaryMeal(id).catch(console.error);
            state.loggedMeals = (state.loggedMeals || []).filter(m => m.id !== id);
            renderAll();
          }
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

// --- Authentication & User Profile Modals (Prisma-backed) ---
function initAuth() {
  const authModal = document.getElementById('auth-modal');
  const profileModal = document.getElementById('profile-modal');
  const btnCloseAuth = document.getElementById('btn-close-auth-modal');
  const btnCloseProfile = document.getElementById('btn-close-profile-modal');
  const avatarBtn = document.querySelector('.user-avatar');

  const tabLogin = document.getElementById('tab-auth-login');
  const tabRegister = document.getElementById('tab-auth-register');
  const authNameGroup = document.getElementById('auth-name-group');
  const authForm = document.getElementById('auth-form') as HTMLFormElement | null;
  const inputName = document.getElementById('auth-input-name') as HTMLInputElement | null;
  const inputEmail = document.getElementById('auth-input-email') as HTMLInputElement | null;
  const inputPassword = document.getElementById('auth-input-password') as HTMLInputElement | null;
  const btnAuthSubmit = document.getElementById('btn-auth-submit') as HTMLButtonElement | null;
  const authSubtitle = document.getElementById('auth-modal-subtitle');
  const authError = document.getElementById('auth-error-msg');
  const authSuccess = document.getElementById('auth-success-msg');

  let currentAuthMode: 'login' | 'register' = 'login';

  const showAuthError = (msg: string) => {
    if (authError) {
      authError.textContent = msg;
      authError.classList.remove('hidden');
    }
    if (authSuccess) authSuccess.classList.add('hidden');
  };

  const showAuthSuccess = (msg: string) => {
    if (authSuccess) {
      authSuccess.textContent = msg;
      authSuccess.classList.remove('hidden');
    }
    if (authError) authError.classList.add('hidden');
  };

  const clearAuthMessages = () => {
    if (authError) authError.classList.add('hidden');
    if (authSuccess) authSuccess.classList.add('hidden');
  };

  const setAuthMode = (mode: 'login' | 'register') => {
    currentAuthMode = mode;
    clearAuthMessages();
    const lang = state.currentLang;

    if (mode === 'login') {
      tabLogin?.classList.add('active');
      tabRegister?.classList.remove('active');
      authNameGroup?.classList.add('hidden');
      if (authSubtitle) {
        authSubtitle.textContent = lang === 'pl' ? 'Zaloguj się do swojego konta' : (lang === 'en' ? 'Log in to your account' : 'Войдите в свой аккаунт');
      }
      if (btnAuthSubmit) {
        btnAuthSubmit.textContent = lang === 'pl' ? 'ZALOGUJ SIĘ' : (lang === 'en' ? 'LOG IN' : 'ВОЙТИ');
      }
    } else {
      tabRegister?.classList.add('active');
      tabLogin?.classList.remove('active');
      authNameGroup?.classList.remove('hidden');
      if (authSubtitle) {
        authSubtitle.textContent = lang === 'pl' ? 'Stwórz nowe konto ZUVIA' : (lang === 'en' ? 'Create new ZUVIA account' : 'Создайте новый аккаунт ZUVIA');
      }
      if (btnAuthSubmit) {
        btnAuthSubmit.textContent = lang === 'pl' ? 'ZAREJESTRUJ SIĘ' : (lang === 'en' ? 'REGISTER' : 'ЗАРЕГИСТРИРОВАТЬСЯ');
      }
    }
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    authModal?.classList.remove('hidden');
  };

  const closeAuthModal = () => {
    authModal?.classList.add('hidden');
    clearAuthMessages();
  };

  const openProfileModal = async () => {
    const user = authService.getUser();
    if (!user) {
      openAuthModal('login');
      return;
    }

    const nameEl = document.getElementById('profile-display-name');
    const emailEl = document.getElementById('profile-display-email');
    const avatarLargeEl = document.getElementById('profile-avatar-display');
    const targetCalEl = document.getElementById('stat-target-cal');

    const displayName = user.name || user.email.split('@')[0];
    const initials = (user.name ? user.name.split(' ').map(s => s[0]).join('') : user.email.slice(0, 2)).toUpperCase();

    if (nameEl) nameEl.textContent = displayName;
    if (emailEl) emailEl.textContent = user.email;
    if (avatarLargeEl) avatarLargeEl.innerHTML = `<span>${initials}</span>`;
    if (targetCalEl) targetCalEl.textContent = (user.targetCalories || state.userProfile?.targetCalories || 2200).toLocaleString();

    switchProfileTab('history');
    profileModal?.classList.remove('hidden');

    await Promise.all([
      loadProfileHistory(),
      loadProfileDiary(),
      loadProfileFavorites()
    ]);
  };

  const closeProfileModal = () => {
    profileModal?.classList.add('hidden');
  };

  // Avatar click handler
  avatarBtn?.addEventListener('click', () => {
    if (authService.isAuthenticated()) {
      openProfileModal();
    } else {
      openAuthModal('login');
    }
  });

  // Tabs in Auth Modal
  tabLogin?.addEventListener('click', () => setAuthMode('login'));
  tabRegister?.addEventListener('click', () => setAuthMode('register'));

  // Close modals
  btnCloseAuth?.addEventListener('click', closeAuthModal);
  authModal?.addEventListener('click', (e) => {
    if (e.target === authModal) closeAuthModal();
  });

  btnCloseProfile?.addEventListener('click', closeProfileModal);
  profileModal?.addEventListener('click', (e) => {
    if (e.target === profileModal) closeProfileModal();
  });

  // Auth Form Submit
  authForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAuthMessages();

    const email = inputEmail?.value.trim() || '';
    const password = inputPassword?.value.trim() || '';
    const name = inputName?.value.trim() || '';

    if (!email || !password) {
      showAuthError(state.currentLang === 'pl' ? 'Wprowadź adres e-mail i hasło' : (state.currentLang === 'en' ? 'Please enter email and password' : 'Введите e-mail и пароль'));
      return;
    }

    if (currentAuthMode === 'register' && password.length < 6) {
      showAuthError(state.currentLang === 'pl' ? 'Hasło musi mieć co najmniej 6 znaków' : (state.currentLang === 'en' ? 'Password must be at least 6 characters' : 'Пароль должен содержать от 6 символов'));
      return;
    }

    if (btnAuthSubmit) {
      btnAuthSubmit.disabled = true;
      btnAuthSubmit.textContent = '...';
    }

    try {
      if (currentAuthMode === 'register') {
        await authService.register(email, password, name);
        showAuthSuccess(state.currentLang === 'pl' ? 'Konto zostało pomyślnie utworzone!' : (state.currentLang === 'en' ? 'Account created successfully!' : 'Аккаунт успешно создан!'));
        setTimeout(() => {
          closeAuthModal();
          openProfileModal();
        }, 600);
      } else {
        await authService.login(email, password);
        showAuthSuccess(state.currentLang === 'pl' ? 'Zalogowano pomyślnie!' : (state.currentLang === 'en' ? 'Logged in successfully!' : 'Вход выполнен успешно!'));
        setTimeout(() => {
          closeAuthModal();
        }, 500);
      }
    } catch (err: any) {
      showAuthError(err.message || (state.currentLang === 'pl' ? 'Wystąpił błąd' : 'Error occurred'));
    } finally {
      if (btnAuthSubmit) {
        btnAuthSubmit.disabled = false;
        setAuthMode(currentAuthMode);
      }
    }
  });

  // Profile Modal Subtabs
  const tabHistory = document.getElementById('tab-profile-history');
  const tabDiary = document.getElementById('tab-profile-diary');
  const tabFavs = document.getElementById('tab-profile-favorites');

  const contentHistory = document.getElementById('prof-content-history');
  const contentDiary = document.getElementById('prof-content-diary');
  const contentFavs = document.getElementById('prof-content-favorites');

  const switchProfileTab = (tab: 'history' | 'diary' | 'favorites') => {
    [tabHistory, tabDiary, tabFavs].forEach(b => b?.classList.remove('active'));
    [contentHistory, contentDiary, contentFavs].forEach(c => c?.classList.add('hidden'));

    if (tab === 'history') {
      tabHistory?.classList.add('active');
      contentHistory?.classList.remove('hidden');
    } else if (tab === 'diary') {
      tabDiary?.classList.add('active');
      contentDiary?.classList.remove('hidden');
    } else {
      tabFavs?.classList.add('active');
      contentFavs?.classList.remove('hidden');
    }
  };

  tabHistory?.addEventListener('click', () => switchProfileTab('history'));
  tabDiary?.addEventListener('click', () => switchProfileTab('diary'));
  tabFavs?.addEventListener('click', () => switchProfileTab('favorites'));

  // Logout button
  document.getElementById('btn-profile-logout')?.addEventListener('click', async () => {
    authService.logout();
    closeProfileModal();
    await syncPrismaUserData();
  });

  // Render History List
  const loadProfileHistory = async () => {
    const historyList = document.getElementById('profile-history-list');
    const cookedCountEl = document.getElementById('stat-cooked-count');
    if (!historyList) return;

    try {
      const history = await authService.fetchCookingHistory();
      if (cookedCountEl) cookedCountEl.textContent = history.length.toString();

      if (history.length === 0) {
        historyList.innerHTML = `
          <div style="text-align: center; color: var(--text-muted); padding: 30px; font-size: 0.9rem;">
            <div style="font-size: 2.2rem; margin-bottom: 8px;">🍳</div>
            <p>${t().profileEmptyHistory}</p>
          </div>
        `;
        return;
      }

      historyList.innerHTML = history.map(item => {
        const dateStr = new Date(item.cookedAt).toLocaleDateString(state.currentLang === 'pl' ? 'pl-PL' : (state.currentLang === 'en' ? 'en-US' : 'ru-RU'), {
          day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
        });
        const img = item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80';
        return `
          <div class="profile-record-item">
            <img src="${img}" alt="${item.title}" class="profile-record-img" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80';">
            <div class="profile-record-info">
              <div class="profile-record-title">${item.title}</div>
              <div class="profile-record-meta">
                <span>🔥 ${item.calories} kcal</span>
                <span>⏱️ ${dateStr}</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm btn-reopen-recipe" data-recipe-id="${item.recipeId}" title="Otwórz przepis">
              📖
            </button>
          </div>
        `;
      }).join('');

      historyList.querySelectorAll<HTMLButtonElement>('.btn-reopen-recipe').forEach(btn => {
        btn.addEventListener('click', () => {
          const rId = btn.dataset.recipeId;
          if (rId) {
            closeProfileModal();
            openRecipeModal(rId);
          }
        });
      });
    } catch (err) {
      console.error('Failed to load cooking history:', err);
    }
  };

  // Render Diary List
  const loadProfileDiary = async () => {
    const diaryList = document.getElementById('profile-diary-list');
    const diaryCountEl = document.getElementById('stat-diary-count');
    if (!diaryList) return;

    try {
      const meals = await authService.fetchDiary();
      if (diaryCountEl) diaryCountEl.textContent = meals.length.toString();

      if (meals.length === 0) {
        diaryList.innerHTML = `
          <div style="text-align: center; color: var(--text-muted); padding: 30px; font-size: 0.9rem;">
            <div style="font-size: 2.2rem; margin-bottom: 8px;">📊</div>
            <p>${t().profileEmptyDiary}</p>
          </div>
        `;
        return;
      }

      diaryList.innerHTML = meals.map(m => {
        return `
          <div class="profile-record-item">
            <div style="font-size: 1.6rem; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: var(--bg-card); border-radius: var(--radius-md); flex-shrink: 0; margin-right: 12px;">
              ${m.mealType === 'breakfast' ? '🌅' : m.mealType === 'dinner' ? '🌙' : m.mealType === 'snack' ? '🍎' : '☀️'}
            </div>
            <div class="profile-record-info">
              <div class="profile-record-title">${m.name}</div>
              <div class="profile-record-meta">
                <span>🔥 ${m.calories} kcal</span>
                <span>P: ${m.protein}g</span>
                <span>F: ${m.fat}g</span>
                <span>C: ${m.carbs}g</span>
                <span>📅 ${m.date} ${m.time || ''}</span>
              </div>
            </div>
            <button class="btn-remove-meal" data-meal-id="${m.id}" title="Usuń wpis">🗑️</button>
          </div>
        `;
      }).join('');

      diaryList.querySelectorAll<HTMLButtonElement>('.btn-remove-meal').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.dataset.mealId;
          if (id) {
            await authService.deleteDiaryMeal(id);
            await loadProfileDiary();
            renderDiary();
          }
        });
      });
    } catch (err) {
      console.error('Failed to load diary history:', err);
    }
  };

  // Render Favorites List
  const loadProfileFavorites = async () => {
    const favList = document.getElementById('profile-favorites-list');
    if (!favList) return;

    try {
      const favorites = await authService.fetchFavorites();
      if (favorites.length === 0) {
        favList.innerHTML = `
          <div style="text-align: center; color: var(--text-muted); padding: 30px; font-size: 0.9rem;">
            <div style="font-size: 2.2rem; margin-bottom: 8px;">⭐</div>
            <p>${t().profileEmptyFavorites}</p>
          </div>
        `;
        return;
      }

      favList.innerHTML = favorites.map(item => {
        const img = item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80';
        return `
          <div class="profile-record-item">
            <img src="${img}" alt="${item.title}" class="profile-record-img" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80';">
            <div class="profile-record-info">
              <div class="profile-record-title">${item.title}</div>
              <div class="profile-record-meta">
                <span>🔥 ${item.calories} kcal</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm btn-reopen-recipe" data-recipe-id="${item.recipeId}" title="Otwórz przepis">
              📖
            </button>
          </div>
        `;
      }).join('');

      favList.querySelectorAll<HTMLButtonElement>('.btn-reopen-recipe').forEach(btn => {
        btn.addEventListener('click', () => {
          const rId = btn.dataset.recipeId;
          if (rId) {
            closeProfileModal();
            openRecipeModal(rId);
          }
        });
      });
    } catch (err) {
      console.error('Failed to load favorites:', err);
    }
  };

  // Auth state listener (Synchronizes directly with Prisma ORM)
  authService.onAuthStateChanged(async (user) => {
    const avatarEl = document.querySelector('.user-avatar');
    if (!avatarEl) return;

    if (user) {
      applyPrismaUserToState(user);

      const initials = (user.name ? user.name.split(' ').map(s => s[0]).join('') : user.email.slice(0, 2)).toUpperCase();
      avatarEl.innerHTML = `<span style="font-weight: 700; font-size: 0.85rem; color: #fff; line-height: 1;">${initials}</span>`;
      avatarEl.setAttribute('title', `${user.name || user.email} (ZUVIA Account)`);
      avatarEl.classList.add('user-avatar-active');

      try {
        const todayStr = new Date().toISOString().split('T')[0];
        const backendMeals = await authService.fetchDiary(todayStr);
        if (backendMeals && Array.isArray(backendMeals)) {
          state.loggedMeals = backendMeals.map(bm => ({
            id: bm.id,
            name: bm.name,
            calories: bm.calories,
            protein: bm.protein,
            fat: bm.fat,
            carbs: bm.carbs,
            mealType: bm.mealType,
            time: bm.time || '12:00'
          }));
          renderDiary();
          renderHomeDashboard();
        }
      } catch (e) {
        console.warn('Could not sync meals on auth change:', e);
      }
    } else {
      avatarEl.innerHTML = `
        <svg class="user-avatar-svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      `;
      avatarEl.setAttribute('title', 'ZUVIA ACCOUNT');
      avatarEl.classList.remove('user-avatar-active');
    }
  });

  (window as any).openAuthModal = openAuthModal;
  (window as any).openProfileModal = openProfileModal;
}

