import type { DietRecord } from '../types/diet';

export const sumNutrition = (records: DietRecord[]) => records.reduce(
  (sum, record) => ({
    calories: sum.calories + record.calories,
    protein: sum.protein + record.protein,
    carbs: sum.carbs + record.carbs,
    fat: sum.fat + record.fat,
  }),
  { calories: 0, protein: 0, carbs: 0, fat: 0 },
);
