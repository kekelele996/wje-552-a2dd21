import { create } from 'zustand';
import { bodyApi } from '../api/body';
import type { BodyGoal, BodyMetric } from '../types/body';

interface BodyMetricState {
  metrics: BodyMetric[];
  goals?: BodyGoal;
  fetchMetrics: () => Promise<void>;
  saveMetric: (data: Partial<BodyMetric>) => Promise<void>;
}

export const useBodyMetricStore = create<BodyMetricState>((set, get) => ({
  metrics: [],
  async fetchMetrics() {
    const [metrics, goals] = await Promise.all([bodyApi.list(), bodyApi.goals()]);
    set({ metrics, goals });
  },
  async saveMetric(data) {
    await bodyApi.create(data);
    await get().fetchMetrics();
  },
}));
