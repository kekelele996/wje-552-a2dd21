import { create } from 'zustand';
import { trainingApi } from '../api/training';
import { PlanStatus } from '../constants/enums';
import type { TrainingPlan } from '../types/training';

interface TrainingState {
  plans: TrainingPlan[];
  activePlan?: TrainingPlan;
  fetchPlans: () => Promise<void>;
  activate: (id: string) => Promise<void>;
}

export const useTrainingStore = create<TrainingState>((set, get) => ({
  plans: [],
  async fetchPlans() {
    const plans = await trainingApi.list();
    set({ plans, activePlan: plans.find((plan) => plan.status === PlanStatus.ACTIVE) });
  },
  async activate(id) {
    await trainingApi.activate(id);
    await get().fetchPlans();
  },
}));
