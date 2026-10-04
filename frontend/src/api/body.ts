import { api } from './request';
import type { BodyGoal, BodyMetric } from '../types/body';

export const bodyApi = {
  list: () => api.get<BodyMetric[]>('/body/metrics'),
  create: (data: Partial<BodyMetric>) => api.post<BodyMetric>('/body/metrics', data),
  trend: (metric: string) => api.get<Array<Record<string, number | string>>>('/body/trend', { params: { metric } }),
  goals: () => api.get<BodyGoal>('/body/goals'),
  updateGoals: (data: Partial<BodyGoal>) => api.put<BodyGoal>('/body/goals', data),
};
