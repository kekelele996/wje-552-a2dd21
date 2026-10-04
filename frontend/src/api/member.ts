import { api } from './request';
import type { Member } from '../types/member';

export const memberApi = {
  list: (params?: Record<string, string>) => api.get<Member[]>('/members', { params }),
  updateLevel: (id: string, level: string) => api.put<Member>(`/members/${id}/level`, { level }),
  updatePoints: (id: string, points: number) => api.put<Member>(`/members/${id}/points`, { points }),
  rules: () => api.get<Record<string, number>>('/members/points-rules'),
  updateRules: (data: Record<string, number>) => api.put<Record<string, number>>('/members/points-rules', data),
};
