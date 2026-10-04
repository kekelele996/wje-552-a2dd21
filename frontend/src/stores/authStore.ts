import { create } from 'zustand';
import { authApi } from '../api/auth';
import type { CurrentUser } from '../types/common';
import { storage } from '../utils/storage';

interface AuthState {
  user?: CurrentUser;
  token?: string;
  login: (username: string, password: string) => Promise<void>;
  loadMe: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: storage.getToken() ?? undefined,
  async login(username, password) {
    const result = await authApi.login({ username, password });
    storage.setToken(result.token);
    set({ token: result.token, user: result.user });
  },
  async loadMe() {
    if (!storage.getToken()) return;
    const user = await authApi.me();
    set({ user, token: storage.getToken() ?? undefined });
  },
  logout() {
    storage.clear();
    set({ token: undefined, user: undefined });
  },
}));
