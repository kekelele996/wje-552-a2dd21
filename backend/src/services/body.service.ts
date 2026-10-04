import { randomUUID } from 'node:crypto';
import { AppError } from '../utils/response.js';
import { db, visibleUserIds } from './data.js';

const bmi = (weight: number, height: number) => Number((weight / ((height / 100) ** 2)).toFixed(1));

export const bodyService = {
  list(user: Express.Request['user']) {
    return db.bodyMetrics.filter((record) => visibleUserIds(user!).includes(record.userId));
  },
  upsert(user: Express.Request['user'], input: any) {
    if (input.weight < 20 || input.weight > 300) throw new AppError(422, 'VALIDATION_ERROR', '体重必须在 20-300 范围内');
    if (input.bodyFat < 3 || input.bodyFat > 60) throw new AppError(422, 'VALIDATION_ERROR', '体脂率必须在 3-60 范围内');
    if (input.height < 100 || input.height > 250) throw new AppError(422, 'VALIDATION_ERROR', '身高必须在 100-250 范围内');
    const current = db.bodyMetrics.find((record) => record.userId === user!.id && record.recordDate === input.recordDate);
    const data = { ...input, bmi: bmi(input.weight, input.height) };
    if (current) return Object.assign(current, data);
    const record = { id: randomUUID(), userId: user!.id, ...data };
    db.bodyMetrics.push(record);
    return record;
  },
  trend(user: Express.Request['user'], metric = 'weight') {
    return this.list(user).map((record) => ({ date: record.recordDate, [metric]: (record as any)[metric] }));
  },
  goals(user: Express.Request['user']) {
    return db.bodyGoals.find((goal) => goal.userId === user!.id) ?? { userId: user!.id, targetWeight: 75, targetBodyFat: 16 };
  },
  updateGoals(user: Express.Request['user'], input: any) {
    const current = db.bodyGoals.find((goal) => goal.userId === user!.id);
    if (current) return Object.assign(current, input);
    const goal = { userId: user!.id, targetWeight: input.targetWeight, targetBodyFat: input.targetBodyFat };
    db.bodyGoals.push(goal);
    return goal;
  },
};
