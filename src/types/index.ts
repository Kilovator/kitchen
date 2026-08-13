import { Language } from '../i18n/translations';

export type CategoryType = 'all' | 'breakfast' | 'lunch' | 'healthy' | 'fast';

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
  name: LocalizedString;
  logo: string;
  priceMultiplier: number;
  distanceMeters: number;
  walkTime: LocalizedString;
  badge: LocalizedString;
  deliveryAvailable: boolean;
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
}
