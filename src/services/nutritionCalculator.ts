import { ActivityLevel, GenderType, GoalType, UserProfile } from '../types';

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,   // Малоподвижный образ жизни / Мало движения
  light: 1.375,     // Легкие тренировки 1-3 раза в неделю
  moderate: 1.55,   // Умеренная активность 3-5 тренировок в неделю
  very: 1.725,      // Высокая активность 6-7 тренировок в неделю
  extra: 1.9        // Экстремальная активность / Физическая работа + спорт
};

/**
 * Calculates Basal Metabolic Rate (BMR) using Mifflin-St Jeor Formula
 */
export function calculateBMR(weightKg: number, heightCm: number, ageYears: number, gender: GenderType): number {
  if (!weightKg || !heightCm || !ageYears) return 0;
  
  if (gender === 'male') {
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5);
  } else {
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161);
  }
}

/**
 * Calculates Total Daily Energy Expenditure (TDEE)
 */
export function calculateTDEE(bmr: number, activity: ActivityLevel): number {
  const multiplier = ACTIVITY_MULTIPLIERS[activity] || 1.375;
  return Math.round(bmr * multiplier);
}

/**
 * Calculates Target Daily Calories based on Goal
 */
export function calculateTargetCalories(tdee: number, goal: GoalType): number {
  switch (goal) {
    case 'lose':
      return Math.round(tdee * 0.85); // 15% Caloric Deficit for healthy fat loss
    case 'gain':
      return Math.round(tdee * 1.15); // 15% Caloric Surplus for lean muscle gain
    case 'maintain':
    default:
      return Math.round(tdee);
  }
}

/**
 * Calculates Target Macronutrients (Protein, Fat, Carbs in grams)
 */
export function calculateMacros(targetCalories: number, weightKg: number): { protein: number; fat: number; carbs: number } {
  // Protein: 2.0g per kg of body weight (4 kcal per gram of protein)
  const protein = Math.round(Math.min(weightKg * 2.0, targetCalories * 0.35 / 4));
  
  // Fat: 28% of total daily calories (9 kcal per gram of fat)
  const fat = Math.round((targetCalories * 0.28) / 9);
  
  // Carbs: Remaining daily calories divided by 4 (4 kcal per gram of carbs)
  const proteinCalories = protein * 4;
  const fatCalories = fat * 9;
  const remainingCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
  const carbs = Math.round(remainingCalories / 4);

  return { protein, fat, carbs };
}

/**
 * Generates full UserProfile object from inputs
 */
export function createFullUserProfile(
  gender: GenderType,
  age: number,
  weight: number,
  height: number,
  activity: ActivityLevel,
  goal: GoalType
): UserProfile {
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activity);
  const targetCalories = calculateTargetCalories(tdee, goal);
  const { protein, fat, carbs } = calculateMacros(targetCalories, weight);

  return {
    gender,
    age,
    weight,
    height,
    activity,
    goal,
    bmr,
    tdee,
    targetCalories,
    targetProtein: protein,
    targetFat: fat,
    targetCarbs: carbs
  };
}
