import { Language } from '../i18n/translations';

export type CategoryType = 'all' | 'breakfast' | 'lunch' | 'dinner' | 'healthy' | 'fast' | 'dessert';

export interface LocalizedString {
  ru: string;
  en: string;
  pl: string;
}

export interface Ingredient {
  name: LocalizedString;
  qty: number;
  unit: LocalizedString;
  basePrice: number;
  checked?: boolean;
}

export interface Recipe {
  id: string;
  title: LocalizedString;
  category: CategoryType;
  prepTime: LocalizedString;
  calories: number;
  rating: number;
  difficulty: LocalizedString;
  image: string;
  videoUrl: string;
  description: LocalizedString;
  ingredients: Ingredient[];
  steps: LocalizedString[];
}

export interface Supermarket {
  id: string;
  name: string;
  logo: string;
  priceMultiplier: number;
  distanceMeters: number;
  walkTime: LocalizedString;
  badge: LocalizedString;
  deliveryAvailable: boolean;
  mapUrl: string;
  deliveryUrl: string;
  lat: number;
  lng: number;
  address: LocalizedString;
  totalCost?: number;
}

export interface ScanPreset {
  id: string;
  title: LocalizedString;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  healthScore: LocalizedString;
  summary: LocalizedString;
  image: string;
}

export type GenderType = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
export type GoalType = 'lose' | 'maintain' | 'gain';

export interface UserProfile {
  gender: GenderType;
  age: number;
  weight: number; // kg
  height: number; // cm
  activity: ActivityLevel;
  goal: GoalType;
  bmr: number;
  tdee: number;
  targetCalories: number;
  targetProtein: number; // grams
  targetFat: number; // grams
  targetCarbs: number; // grams
}

export interface MealEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  time: string;
}

export interface AppState {
  currentLang: Language;
  currentView: string;
  recipes: Recipe[];
  activeFilter: CategoryType;
  searchQuery: string;
  activeRecipeForShopping: Recipe;
  servingsCount: number;
  shoppingList: Ingredient[];
  storeFilterMode: 'best-price' | 'nearest';
  diaryConsumed: number;
  cameraStream: MediaStream | null;
  theme: 'dark' | 'light';
  userLocation: { lat: number; lng: number } | null;
  isStoresListExpanded?: boolean;
  lastScanResult?: any;
  userProfile?: UserProfile;
  loggedMeals?: MealEntry[];
}
