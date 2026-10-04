import { api } from './request';
import type { CurrentUser } from '../types/common';

export const authApi = {
  login: (data: { username: string; password: string }) => api.post<{ token: string; user: CurrentUser }>('/auth/login', data),
  register: (data: { username: string; password: string; name: string }) => api.post<{ token: string; user: CurrentUser }>('/auth/register', data),
  me: () => api.get<CurrentUser>('/auth/me'),
};
