import type { MealType } from '../constants/enums';

export interface DietRecord {
  id: string;
  mealType: MealType;
  foodName: string;
  quantity: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  recordDate: string;
}

export interface FoodLibraryItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  unit: string;
}
