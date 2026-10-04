export interface BodyMetric {
  id: string;
  weight: number;
  bodyFat: number;
  height: number;
  muscleMass: number;
  bmi: number;
  recordDate: string;
}

export interface BodyGoal {
  userId: string;
  targetWeight: number;
  targetBodyFat: number;
}
