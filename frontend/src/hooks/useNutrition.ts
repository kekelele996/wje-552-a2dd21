import { sumNutrition } from '../utils/nutrition';
import type { DietRecord } from '../types/diet';

export const useNutrition = (records: DietRecord[]) => {
  const totals = sumNutrition(records);
  const macroTotal = totals.protein + totals.carbs + totals.fat || 1;
  return { totals, proteinRatio: totals.protein / macroTotal, carbsRatio: totals.carbs / macroTotal, fatRatio: totals.fat / macroTotal };
};
