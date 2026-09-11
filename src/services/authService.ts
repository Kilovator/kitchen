// Auth & User Data Service backed by Prisma backend

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  gender?: string;
  age?: number;
  weight?: number;
  height?: number;
  activity?: string;
  goal?: string;
  targetCalories?: number;
  targetProtein?: number;
  targetFat?: number;
  targetCarbs?: number;
  createdAt: string;
}

export interface UserStats {
  cookedCount: number;
  diaryCount: number;
  savedCount: number;
}

export interface CookedRecipeRecord {
  id: string;
  recipeId: string;
  title: string;
  image?: string;
  calories: number;
  servings: number;
  notes?: string;
  cookedAt: string;
}

export interface SavedRecipeRecord {
  id: string;
  recipeId: string;
  title: string;
  image?: string;
  calories: number;
  savedAt: string;
}

class AuthService {
  private tokenKey = 'zuvia_auth_token';
  private currentUser: AuthUser | null = null;
  private currentStats: UserStats | null = null;
  private listeners: ((user: AuthUser | null) => void)[] = [];

  constructor() {
    // Check initial user from token on load
    const token = this.getToken();
    if (token) {
      this.fetchMe().catch(() => {
        this.logout();
      });
    }
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  public removeToken() {
    localStorage.removeItem(this.tokenKey);
    this.currentUser = null;
    this.currentStats = null;
    this.notify();
  }

  public getUser(): AuthUser | null {
    return this.currentUser;
  }

  public getStats(): UserStats | null {
    return this.currentStats;
  }

  public isAuthenticated(): boolean {
    return !!this.getToken() && !!this.currentUser;
  }

  public onAuthStateChanged(cb: (user: AuthUser | null) => void) {
    this.listeners.push(cb);
    cb(this.currentUser);
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.currentUser));
  }

  private getAuthHeaders(): HeadersInit {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  }

  // --- Auth Methods ---
  public async register(email: string, password: string, name?: string): Promise<AuthUser> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Błąd rejestracji');
    }

    this.setToken(data.token);
    this.currentUser = data.user;
    this.notify();
    return data.user;
  }

  public async login(email: string, password: string): Promise<AuthUser> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Nieprawidłowy e-mail lub hasło');
    }

    this.setToken(data.token);
    this.currentUser = data.user;
    await this.fetchMe();
    this.notify();
    return data.user;
  }

  public async fetchMe(): Promise<{ user: AuthUser; stats: UserStats }> {
    const token = this.getToken();
    if (!token) throw new Error('Brak tokenu');

    const res = await fetch('/api/auth/me', {
      headers: this.getAuthHeaders()
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      this.removeToken();
      throw new Error(data.error || 'Sesja wygasła');
    }

    this.currentUser = data.user;
    this.currentStats = data.stats;
    this.notify();
    return { user: data.user, stats: data.stats };
  }

  public logout() {
    this.removeToken();
  }

  // --- Diary API Sync ---
  public async fetchDiary(date?: string): Promise<any[]> {
    if (!this.isAuthenticated()) return [];
    const q = date ? `?date=${encodeURIComponent(date)}` : '';
    const res = await fetch(`/api/user/diary${q}`, {
      headers: this.getAuthHeaders()
    });
    const data = await res.json();
    return data.success ? data.meals : [];
  }

  public async saveDiaryMeal(meal: {
    name: string;
    calories: number;
    protein?: number;
    fat?: number;
    carbs?: number;
    mealType?: string;
    date?: string;
    time?: string;
  }): Promise<any> {
    if (!this.isAuthenticated()) return null;
    const res = await fetch('/api/user/diary', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(meal)
    });
    const data = await res.json();
    if (this.currentStats) this.currentStats.diaryCount++;
    return data.success ? data.meal : null;
  }

  public async deleteDiaryMeal(id: string): Promise<boolean> {
    if (!this.isAuthenticated()) return false;
    const res = await fetch(`/api/user/diary/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    const data = await res.json();
    if (this.currentStats && this.currentStats.diaryCount > 0) this.currentStats.diaryCount--;
    return !!data.success;
  }

  // --- Cooking History ---
  public async fetchCookingHistory(): Promise<CookedRecipeRecord[]> {
    if (!this.isAuthenticated()) return [];
    const res = await fetch('/api/user/history', {
      headers: this.getAuthHeaders()
    });
    const data = await res.json();
    return data.success ? data.history : [];
  }

  public async recordCookedRecipe(recipe: {
    recipeId: string;
    title: string;
    image?: string;
    calories: number;
    servings?: number;
    notes?: string;
  }): Promise<CookedRecipeRecord | null> {
    if (!this.isAuthenticated()) return null;
    const res = await fetch('/api/user/history', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(recipe)
    });
    const data = await res.json();
    if (this.currentStats) this.currentStats.cookedCount++;
    return data.success ? data.cooked : null;
  }

  // --- Favorites ---
  public async fetchFavorites(): Promise<SavedRecipeRecord[]> {
    if (!this.isAuthenticated()) return [];
    const res = await fetch('/api/user/favorites', {
      headers: this.getAuthHeaders()
    });
    const data = await res.json();
    return data.success ? data.favorites : [];
  }

  public async toggleFavorite(recipe: {
    recipeId: string;
    title: string;
    image?: string;
    calories: number;
  }): Promise<boolean> {
    if (!this.isAuthenticated()) return false;
    const res = await fetch('/api/user/favorites', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(recipe)
    });
    const data = await res.json();
    return !!data.saved;
  }

  // --- Profile Settings ---
  public async updateProfile(settings: {
    gender?: string;
    age?: number;
    weight?: number;
    height?: number;
    activity?: string;
    goal?: string;
    targetCalories?: number;
    targetProtein?: number;
    targetFat?: number;
    targetCarbs?: number;
  }): Promise<AuthUser | null> {
    if (!this.isAuthenticated()) return null;
    const res = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(settings)
    });
    const data = await res.json();
    if (data.success && data.user) {
      this.currentUser = data.user;
      this.notify();
      return data.user;
    }
    return null;
  }
}

export const authService = new AuthService();
