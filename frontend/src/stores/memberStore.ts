import { create } from 'zustand';
import { memberApi } from '../api/member';
import type { Member } from '../types/member';

interface MemberState {
  members: Member[];
  rules: Record<string, number>;
  fetchMembers: () => Promise<void>;
}

export const useMemberStore = create<MemberState>((set) => ({
  members: [],
  rules: {},
  async fetchMembers() {
    const [members, rules] = await Promise.all([memberApi.list(), memberApi.rules()]);
    set({ members, rules });
  },
}));
