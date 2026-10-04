import { randomUUID } from 'node:crypto';
import { PlanStatus, UserRole } from '../constants/enums.js';
import { AppError } from '../utils/response.js';
import { db, visibleUserIds } from './data.js';

const enrichPlan = (plan: (typeof db.trainingPlans)[number]) => ({
  ...plan,
  days: plan.days.map((day) => ({
    ...day,
    exercises: day.exercises.map((item) => ({ ...item, exercise: db.exercises.find((exercise) => exercise.id === item.exerciseId) })),
  })),
});

export const trainingService = {
  list(user: Express.Request['user']) {
    if (!user) throw new AppError(401, 'UNAUTHORIZED', '请先登录');
    const ids = visibleUserIds(user);
    return db.trainingPlans.filter((plan) => ids.includes(plan.userId)).map(enrichPlan);
  },
  detail(id: string, user: Express.Request['user']) {
    const plan = this.list(user).find((item) => item.id === id);
    if (!plan) throw new AppError(404, 'NOT_FOUND', '请求的记录不存在');
    return plan;
  },
  create(input: any, user: Express.Request['user']) {
    if (!user) throw new AppError(401, 'UNAUTHORIZED', '请先登录');
    if (new Date(input.endDate) <= new Date(input.startDate)) throw new AppError(422, 'VALIDATION_ERROR', '结束日期必须大于开始日期');
    if (!input.days?.length) throw new AppError(422, 'VALIDATION_ERROR', '计划至少包含一个训练日');
    for (const day of input.days) if (!day.exercises?.length) throw new AppError(422, 'VALIDATION_ERROR', '每个训练日至少包含一个训练动作');
    const plan = {
      id: randomUUID(),
      userId: user.role === UserRole.ADMIN && input.userId ? input.userId : user.id,
      name: input.name,
      type: input.type,
      startDate: input.startDate,
      endDate: input.endDate,
      status: PlanStatus.DRAFT,
      description: input.description ?? '',
      days: input.days.map((day: any) => ({
        id: randomUUID(),
        weekday: day.weekday,
        title: day.title,
        completed: false,
        exercises: day.exercises.map((exercise: any, index: number) => ({ id: randomUUID(), sortOrder: index + 1, completed: false, ...exercise })),
      })),
    };
    db.trainingPlans.push(plan);
    return enrichPlan(plan);
  },
  update(id: string, input: any, user: Express.Request['user']) {
    const plan = db.trainingPlans.find((item) => item.id === id && visibleUserIds(user!).includes(item.userId));
    if (!plan) throw new AppError(404, 'NOT_FOUND', '请求的记录不存在');
    if (![PlanStatus.DRAFT, PlanStatus.PAUSED].includes(plan.status)) throw new AppError(422, 'VALIDATION_ERROR', '仅草稿和暂停状态可编辑');
    Object.assign(plan, input);
    return enrichPlan(plan);
  },
  activate(id: string, user: Express.Request['user']) {
    const plan = db.trainingPlans.find((item) => item.id === id && visibleUserIds(user!).includes(item.userId));
    if (!plan) throw new AppError(404, 'NOT_FOUND', '请求的记录不存在');
    if (![PlanStatus.DRAFT, PlanStatus.PAUSED].includes(plan.status)) throw new AppError(422, 'VALIDATION_ERROR', '仅草稿或暂停计划可启动');
    const active = db.trainingPlans.find((item) => item.userId === plan.userId && item.status === PlanStatus.ACTIVE && item.id !== id);
    if (active) throw new AppError(409, 'ACTIVE_PLAN_EXISTS', '同一用户同一时间只能有一个进行中计划');
    plan.status = PlanStatus.ACTIVE;
    return enrichPlan(plan);
  },
  pause(id: string, user: Express.Request['user']) {
    const plan = db.trainingPlans.find((item) => item.id === id && visibleUserIds(user!).includes(item.userId));
    if (!plan || plan.status !== PlanStatus.ACTIVE) throw new AppError(422, 'VALIDATION_ERROR', '仅进行中计划可暂停');
    plan.status = PlanStatus.PAUSED;
    return enrichPlan(plan);
  },
  complete(id: string, user: Express.Request['user']) {
    const plan = db.trainingPlans.find((item) => item.id === id && visibleUserIds(user!).includes(item.userId));
    if (!plan || plan.status !== PlanStatus.ACTIVE) throw new AppError(422, 'VALIDATION_ERROR', '仅进行中计划可完成');
    plan.status = PlanStatus.COMPLETED;
    return enrichPlan(plan);
  },
  completeExercise(id: string, user: Express.Request['user']) {
    const plans = db.trainingPlans.filter((plan) => visibleUserIds(user!).includes(plan.userId));
    for (const plan of plans) for (const day of plan.days) {
      const exercise = day.exercises.find((item) => item.id === id);
      if (exercise) {
        exercise.completed = true;
        day.completed = day.exercises.every((item) => item.completed);
        return enrichPlan(plan);
      }
    }
    throw new AppError(404, 'NOT_FOUND', '请求的记录不存在');
  },
};
