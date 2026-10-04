import type { NextFunction, Request, Response } from 'express';
import { UserRole } from '../constants/enums.js';
import { db } from '../services/data.js';
import { AppError } from '../utils/response.js';

export const roleMiddleware = (...roles: UserRole[]) => (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user) return next(new AppError(401, 'UNAUTHORIZED', '请先登录'));
  if (!roles.includes(req.user.role)) return next(new AppError(403, 'FORBIDDEN', '无权限执行此操作'));
  return next();
};

export const assertCoachStudent = (coachId: string, userId: string) => {
  if (coachId === userId) return true;
  return db.coachUsers.some((row) => row.coachId === coachId && row.userId === userId);
};
