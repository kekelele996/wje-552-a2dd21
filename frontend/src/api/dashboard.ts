import { api } from './request';

export const dashboardApi = {
  summary: () => api.get<any>('/dashboard/summary'),
};
