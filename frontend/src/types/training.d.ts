import type { PlanStatus } from '../constants/enums';

export interface TrainingPlan {
  id: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  status: PlanStatus;
  description?: string;
  days: TrainingDay[];
}

export interface TrainingDay {
  id: string;
  weekday: number;
  title: string;
  completed: boolean;
  exercises: TrainingExercise[];
}

export interface TrainingExercise {
  id: string;
  exerciseId: string;
  sets: number;
  reps: number;
  weight?: number;
  restSeconds: number;
  completed: boolean;
  exercise?: { id: string; name: string; muscleGroup: string };
}
