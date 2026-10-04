import { api } from './request';
import type { DietRecord, FoodLibraryItem } from '../types/diet';

export const dietApi = {
  records: (date: string) => api.get<DietRecord[]>('/diet/records', { params: { date } }),
  create: (data: Partial<DietRecord>) => api.post<DietRecord>('/diet/records', data),
  remove: (id: string) => api.delete<DietRecord>(`/diet/records/${id}`),
  stats: () => api.get<Array<{ date: string; calories: number; target: number; protein: number }>>('/diet/stats'),
  foodLibrary: (q = '') => api.get<FoodLibraryItem[]>('/diet/food-library', { params: { q } }),
};
