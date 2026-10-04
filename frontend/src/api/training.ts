import { api } from './request';
import type { TrainingPlan } from '../types/training';

export const trainingApi = {
  list: () => api.get<TrainingPlan[]>('/training/plans'),
  create: (data: unknown) => api.post<TrainingPlan>('/training/plans', data),
  update: (id: string, data: unknown) => api.put<TrainingPlan>(`/training/plans/${id}`, data),
  activate: (id: string) => api.post<TrainingPlan>(`/training/plans/${id}/activate`),
  pause: (id: string) => api.post<TrainingPlan>(`/training/plans/${id}/pause`),
  complete: (id: string) => api.post<TrainingPlan>(`/training/plans/${id}/complete`),
  completeExercise: (exerciseId: string) => api.post('/training/exercises/complete', { exerciseId }),
};
