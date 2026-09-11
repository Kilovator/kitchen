import { ActivityLevel, BmrFormulaType, GenderType, GoalType, UserProfile } from '../types';

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,   // Sedentary (office work, minimal movement)
  light: 1.375,     // Light exercise (1-3 days/week)
  moderate: 1.55,   // Moderate exercise (3-5 days/week)
  very: 1.725,      // Heavy exercise (6-7 days/week)
  extra: 1.9        // Athlete / heavy manual labor + daily training
};

/**
 * Calculates Basal Metabolic Rate (BMR) supporting Mifflin-St Jeor, Harris-Benedict (revised), and WHO/FAO
 */
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  ageYears: number,
  gender: GenderType,
  formula: BmrFormulaType = 'mifflin'
): number {
  if (!weightKg || !heightCm || !ageYears) return 0;

  switch (formula) {
    case 'harris': {
      // Roza & Shizgal (1984) Revised Harris-Benedict Equation
      if (gender === 'male') {
        return Math.round(88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * ageYears));
      } else {
        return Math.round(447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * ageYears));
      }
    }
    case 'who': {
      // WHO / FAO / UNU Equation
      if (gender === 'male') {
        if (ageYears < 30) return Math.round(15.057 * weightKg + 692.2);
        if (ageYears < 60) return Math.round(11.472 * weightKg + 873.1);
        return Math.round(11.711 * weightKg + 587.7);
      } else {
        if (ageYears < 30) return Math.round(14.818 * weightKg + 486.6);
        if (ageYears < 60) return Math.round(8.126 * weightKg + 845.6);
        return Math.round(9.082 * weightKg + 658.5);
      }
    }
    case 'mifflin':
    default: {
      // Mifflin-St Jeor (1990) - Most reliable validated clinical standard
      if (gender === 'male') {
        return Math.round(10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5);
      } else {
        return Math.round(10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161);
      }
    }
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
      return Math.round(tdee * 0.85); // 15% Healthy Caloric Deficit
    case 'gain':
      return Math.round(tdee * 1.15); // 15% Lean Hypertrophy Caloric Surplus
    case 'maintain':
    default:
      return Math.round(tdee);
  }
}

/**
 * Calculates Target Macronutrients (Protein, Fat, Carbs in grams) based on scientific sports nutrition guidelines
 */
export function calculateMacros(
  targetCalories: number,
  weightKg: number,
  goal: GoalType
): { protein: number; fat: number; carbs: number; fiber: number } {
  // Protein scaling: 2.2g/kg on deficit (muscle sparing), 1.8g/kg on maintenance, 2.0g/kg on surplus
  let proteinPerKg = 1.8;
  if (goal === 'lose') proteinPerKg = 2.2;
  if (goal === 'gain') proteinPerKg = 2.0;

  const proteinGrams = Math.round(Math.min(weightKg * proteinPerKg, (targetCalories * 0.35) / 4));
  const proteinCalories = proteinGrams * 4;

  // Fat: 28% of total daily calories (essential for hormonal balance and fat-soluble vitamin absorption)
  const fatGrams = Math.round((targetCalories * 0.28) / 9);
  const fatCalories = fatGrams * 9;

  // Carbs: Remainder of daily energy (4 kcal per gram)
  const remainingCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
  const carbsGrams = Math.round(remainingCalories / 4);

  // Fiber: 14g per 1,000 kcal (WHO / Institute of Medicine standard)
  const fiberGrams = Math.round((targetCalories / 1000) * 14);

  return { protein: proteinGrams, fat: fatGrams, carbs: carbsGrams, fiber: fiberGrams };
}

/**
 * Calculates Body Mass Index (BMI) and category classification
 */
export function calculateBMI(weightKg: number, heightCm: number): { bmi: number; category: 'underweight' | 'normal' | 'overweight' | 'obese' } {
  if (!weightKg || !heightCm) return { bmi: 22, category: 'normal' };
  const heightM = heightCm / 100;
  const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10;

  let category: 'underweight' | 'normal' | 'overweight' | 'obese' = 'normal';
  if (bmi < 18.5) category = 'underweight';
  else if (bmi < 25.0) category = 'normal';
  else if (bmi < 30.0) category = 'overweight';
  else category = 'obese';

  return { bmi, category };
}

/**
 * Calculates Healthy Ideal Weight Range for a given height based on WHO BMI 18.5 - 24.9
 */
export function calculateIdealWeightRange(heightCm: number): { min: number; max: number } {
  const heightM = heightCm / 100;
  const min = Math.round(18.5 * heightM * heightM * 10) / 10;
  const max = Math.round(24.9 * heightM * heightM * 10) / 10;
  return { min, max };
}

/**
 * Calculates Daily Water Intake (in milliliters) based on body mass and activity
 */
export function calculateDailyWater(weightKg: number, activity: ActivityLevel): number {
  let baseWater = weightKg * 35; // 35 ml per kg
  const activityWaterOffset: Record<ActivityLevel, number> = {
    sedentary: 0,
    light: 350,
    moderate: 500,
    very: 750,
    extra: 1000
  };
  return Math.round(baseWater + (activityWaterOffset[activity] || 500));
}

/**
 * Generates full UserProfile object from all inputs
 */
export function createFullUserProfile(
  gender: GenderType,
  age: number,
  weight: number,
  height: number,
  activity: ActivityLevel,
  goal: GoalType,
  formula: BmrFormulaType = 'mifflin'
): UserProfile {
  const bmr = calculateBMR(weight, height, age, gender, formula);
  const tdee = calculateTDEE(bmr, activity);
  const targetCalories = calculateTargetCalories(tdee, goal);
  const { protein, fat, carbs, fiber } = calculateMacros(targetCalories, weight, goal);
  const { bmi, category } = calculateBMI(weight, height);
  const idealRange = calculateIdealWeightRange(height);
  const targetWaterMl = calculateDailyWater(weight, activity);

  return {
    gender,
    age,
    weight,
    height,
    activity,
    goal,
    formula,
    bmr,
    tdee,
    targetCalories,
    targetProtein: protein,
    targetFat: fat,
    targetCarbs: carbs,
    targetFiber: fiber,
    targetWaterMl,
    bmi,
    bmiCategory: category,
    idealWeightMin: idealRange.min,
    idealWeightMax: idealRange.max
  };
}
