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

// Load persisted water consumption
const savedWaterRaw = localStorage.getItem('cookcraft_water_consumed');
const defaultWater = savedWaterRaw ? parseInt(savedWaterRaw) || 0 : 750;

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
  currentView: 'view-recipes',
  recipes: RECIPES_DATA,
  activeFilter: 'all',
  searchQuery: '',
  activeRecipeForShopping: defaultRecipe,
  servingsCount: defaultServings,
  shoppingList: defaultShoppingList,
  storeFilterMode: 'best-price',
  diaryConsumed: 1040,
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

function startApp() {
  initLangSwitcher();
  initNavigation();
  initRecipes();
  initShopping();
  initScanner();
  initDiary();
  initThemeToggle();
  renderAll();
  renderPromotions();
  updateStaticTexts();
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
  // Gender buttons
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

  // Inputs
  const inputs = ['calc-age', 'calc-weight', 'calc-height', 'calc-activity', 'calc-goal', 'calc-formula'];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('input', updateLiveCalculatorOutput);
    el?.addEventListener('change', updateLiveCalculatorOutput);
  });

  // Apply Target to Diary Button
  document.getElementById('btn-apply-profile')?.addEventListener('click', () => {
    const profile = getProfileFromInputs();
    state.userProfile = profile;
    localStorage.setItem('cookcraft_user_profile', JSON.stringify(profile));
    renderDiary();
    const msg = state.currentLang === 'pl' 
      ? `✅ Zapisano cel w dzienniku: ${profile.targetCalories.toLocaleString()} kcal!` 
      : (state.currentLang === 'en' ? `✅ Calorie target saved: ${profile.targetCalories.toLocaleString()} kcal!` : `✅ Цель сохранена в дневнике: ${profile.targetCalories.toLocaleString()} ккал!`);
    alert(msg);
  });

  // Clear Day Button
  document.getElementById('btn-clear-diary-day')?.addEventListener('click', () => {
    const confirmMsg = state.currentLang === 'pl'
      ? 'Czy na pewno chcesz wyczyścić dzisiejszy dziennik i licznik wody?'
      : (state.currentLang === 'en' ? 'Are you sure you want to clear today\'s diary and water intake?' : 'Вы уверены, что хотите очистить записи за сегодня и счетчик воды?');
    
    if (confirm(confirmMsg)) {
      state.loggedMeals = [];
      state.waterConsumedMl = 0;
      localStorage.setItem('cookcraft_logged_meals', JSON.stringify([]));
      localStorage.setItem('cookcraft_water_consumed', '0');
      renderDiary();
    }
  });

  // Water Tracker controls
  document.getElementById('btn-water-add')?.addEventListener('click', () => {
    state.waterConsumedMl = (state.waterConsumedMl || 0) + 250;
    localStorage.setItem('cookcraft_water_consumed', state.waterConsumedMl.toString());
    renderDiary();
  });

  document.getElementById('btn-water-sub')?.addEventListener('click', () => {
    state.waterConsumedMl = Math.max(0, (state.waterConsumedMl || 0) - 250);
    localStorage.setItem('cookcraft_water_consumed', state.waterConsumedMl.toString());
    renderDiary();
  });

  document.getElementById('btn-water-reset')?.addEventListener('click', () => {
    state.waterConsumedMl = 0;
    localStorage.setItem('cookcraft_water_consumed', '0');
    renderDiary();
  });

  // Meal Category Filter Pills
  const filterTabs = document.querySelectorAll<HTMLButtonElement>('#meal-filter-tabs .pill');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeMealCategoryFilter = (tab.dataset.mealFilter as any) || 'all';
      renderDiary();
    });
  });

  // Meal Logging Modal
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

    // Populate preset dropdown with recipes + smart presets
    if (presetSelect) {
      presetSelect.innerHTML = `<option value="">-- ${state.currentLang === 'pl' ? 'Wybierz gotowe danie lub wpisz własne' : (state.currentLang === 'en' ? 'Choose preset or type custom meal' : 'Выберите готовое блюдо или введите свое')} --</option>`;

      // Add smart presets
      const presetGroup = document.createElement('optgroup');
      presetGroup.label = state.currentLang === 'pl' ? '💡 Popularne zdrowe posiłki' : (state.currentLang === 'en' ? '💡 Popular Healthy Meals' : '💡 Популярные ПП блюда');
      SMART_MEAL_PRESETS.forEach((p, idx) => {
        const opt = document.createElement('option');
        opt.value = `smart_${idx}`;
        opt.textContent = `${p.name[lang]} (${p.calories} kcal)`;
        presetGroup.appendChild(opt);
      });
      presetSelect.appendChild(presetGroup);

      // Add recipes from app
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

  // Preset Selection Change
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
          else if (recipe.category === 'lunch') mealTypeSelect.value = 'lunch';
          else if (recipe.category === 'dinner') mealTypeSelect.value = 'dinner';
          else mealTypeSelect.value = 'lunch';
        }
        if (mealKcalInput) mealKcalInput.value = recipe.calories.toString();
        // Estimated macro distribution for recipe
        if (mealPInput) mealPInput.value = Math.round((recipe.calories * 0.25) / 4).toString();
        if (mealFInput) mealFInput.value = Math.round((recipe.calories * 0.28) / 9).toString();
        if (mealCInput) mealCInput.value = Math.round((recipe.calories * 0.47) / 4).toString();
      }
    }
  });

  // Auto-estimate macros if user manually changes kcal
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

  // Save Meal to Diary
  document.getElementById('btn-save-meal-entry')?.addEventListener('click', () => {
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

    if (!state.loggedMeals) state.loggedMeals = [];
    state.loggedMeals.push(newMeal);
    localStorage.setItem('cookcraft_logged_meals', JSON.stringify(state.loggedMeals));
    closeMealModal();
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

  if (bmrEl) bmrEl.innerText = `${profile.bmr.toLocaleString()} ${kcalUnit}`;
  if (tdeeEl) tdeeEl.innerText = `${profile.tdee.toLocaleString()} ${kcalUnit}`;
  if (targetEl) targetEl.innerText = `${profile.targetCalories.toLocaleString()} ${kcalUnit}`;

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
    // Map BMI range (15 to 35) to percentage (4% to 96%)
    const pct = Math.max(4, Math.min(96, ((profile.bmi - 14) / 22) * 100));
    bmiNeedleEl.style.left = `${pct}%`;
  }

  if (idealWeightEl) {
    idealWeightEl.innerText = `${profile.idealWeightMin} - ${profile.idealWeightMax} kg`;
  }
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

  const formulaSelect = document.getElementById('calc-formula') as HTMLSelectElement | null;
  if (formulaSelect && profile.formula && formulaSelect.value !== profile.formula) {
    formulaSelect.value = profile.formula;
  }

  updateLiveCalculatorOutput();

  // Sum today's meals
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = Math.round(meals.reduce((sum, m) => sum + m.protein, 0));
  const totalFat = Math.round(meals.reduce((sum, m) => sum + m.fat, 0));
  const totalCarbs = Math.round(meals.reduce((sum, m) => sum + m.carbs, 0));
  const totalFiber = Math.round((totalCalories / 1000) * 14 * 0.8); // Estimated consumed fiber

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
    const circumference = 2 * Math.PI * radius; // ~263.89
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
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.cupIdx || '0');
        state.waterConsumedMl = (idx + 1) * 250;
        localStorage.setItem('cookcraft_water_consumed', state.waterConsumedMl.toString());
        renderDiary();
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
      const emptyMsg = state.currentLang === 'pl' 
        ? 'Brak wpisanych dań w tej kategorii. Kliknij «+ Dodaj блюдо», aby zapisać posiłek.' 
        : (state.currentLang === 'en' ? 'No meals logged in this category. Click «+ Add Meal» to record food.' : 'В этой категории пока нет записей. Нажмите «+ Добавить блюдо».');

      mealsList.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 28px 20px; font-size: 0.9rem; background: var(--bg-input); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
          <div style="font-size: 2rem; margin-bottom: 8px;">🍽️</div>
          ${emptyMsg}
        </div>
      `;
    } else {
      const getCategoryIcon = (type: string) => {
        switch (type) {
          case 'breakfast': return '🌅';
          case 'lunch': return '☀️';
          case 'dinner': return '🌙';
          case 'snack': return '🍎';
          default: return '🍴';
        }
      };

      mealsList.innerHTML = filteredMeals.map(m => `
        <div class="meal-item">
          <div class="meal-info-left">
            <span class="meal-title-name">${getCategoryIcon(m.mealType)} ${m.name}</span>
            <span class="meal-time-tag">⏱️ ${m.time}</span>
            <div class="meal-macro-pills">
              <span class="meal-macro-pill p">P: ${m.protein}g</span>
              <span class="meal-macro-pill f">F: ${m.fat}g</span>
              <span class="meal-macro-pill c">C: ${m.carbs}g</span>
            </div>
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
