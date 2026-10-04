import { randomUUID } from 'node:crypto';
import { MealType } from '../constants/enums.js';
import { AppError } from '../utils/response.js';
import { db, visibleUserIds } from './data.js';

export const dietService = {
  records(user: Express.Request['user'], date: string) {
    return db.dietRecords.filter((record) => visibleUserIds(user!).includes(record.userId) && record.recordDate === date);
  },
  create(user: Express.Request['user'], input: any) {
    if (new Date(input.recordDate) > new Date()) throw new AppError(422, 'VALIDATION_ERROR', '记录日期不能是未来日期');
    for (const key of ['calories', 'protein', 'carbs', 'fat']) if (input[key] < 0) throw new AppError(422, 'VALIDATION_ERROR', '营养数据必须大于等于 0');
    const duplicate = db.dietRecords.find((record) => record.userId === user!.id && record.recordDate === input.recordDate && record.mealType === input.mealType && record.foodName === input.foodName);
    if (duplicate) throw new AppError(409, 'CONFLICT', '同一天同一餐次同一食物不可重复记录，请修改数量');
    const record = { id: randomUUID(), userId: user!.id, ...input, mealType: input.mealType as MealType };
    db.dietRecords.push(record);
    return record;
  },
  delete(user: Express.Request['user'], id: string) {
    const index = db.dietRecords.findIndex((record) => record.id === id && record.userId === user!.id);
    if (index < 0) throw new AppError(404, 'NOT_FOUND', '请求的记录不存在');
    if (db.dietRecords[index].recordDate !== new Date().toISOString().slice(0, 10)) throw new AppError(422, 'VALIDATION_ERROR', '只能删除当天的饮食记录');
    return db.dietRecords.splice(index, 1)[0];
  },
  stats(user: Express.Request['user']) {
    const records = db.dietRecords.filter((record) => visibleUserIds(user!).includes(record.userId));
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      const key = date.toISOString().slice(0, 10);
      const total = records.filter((record) => record.recordDate === key).reduce((sum, record) => sum + record.calories, 0);
      return { date: key, calories: total, target: 2100, protein: records.filter((record) => record.recordDate === key).reduce((sum, record) => sum + record.protein, 0) };
    });
  },
  foodLibrary(q = '') {
    return db.foodLibrary.filter((food) => food.name.includes(q)).slice(0, 30);
  },
};
