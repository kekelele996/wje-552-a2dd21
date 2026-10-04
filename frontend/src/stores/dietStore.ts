import { create } from 'zustand';
import { dietApi } from '../api/diet';
import { MealType } from '../constants/enums';
import type { DietRecord, FoodLibraryItem } from '../types/diet';
import { sumNutrition } from '../utils/nutrition';

interface DietState {
  date: string;
  records: DietRecord[];
  foodLibrary: FoodLibraryItem[];
  totals: { calories: number; protein: number; carbs: number; fat: number };
  setDate: (date: string) => void;
  fetchRecords: () => Promise<void>;
  quickAdd: (food: FoodLibraryItem, mealType: MealType) => Promise<void>;
}

export const useDietStore = create<DietState>((set, get) => ({
  date: new Date().toISOString().slice(0, 10),
  records: [],
  foodLibrary: [],
  totals: { calories: 0, protein: 0, carbs: 0, fat: 0 },
  setDate: (date) => set({ date }),
  async fetchRecords() {
    const records = await dietApi.records(get().date);
    const foodLibrary = await dietApi.foodLibrary();
    set({ records, foodLibrary, totals: sumNutrition(records) });
  },
  async quickAdd(food, mealType) {
    await dietApi.create({ foodName: food.name, mealType, quantity: 100, calories: food.calories, protein: food.protein, carbs: food.carbs, fat: food.fat, recordDate: get().date });
    await get().fetchRecords();
  },
}));
