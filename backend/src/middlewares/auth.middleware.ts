import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { db } from '../services/data.js';
import { AppError } from '../utils/response.js';

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return next(new AppError(401, 'UNAUTHORIZED', '请先登录'));
  try {
    const payload = jwt.verify(token, config.jwtSecret) as { id: string };
    const user = db.users.find((item) => item.id === payload.id);
    if (!user) return next(new AppError(401, 'UNAUTHORIZED', '登录凭证无效'));
    req.user = { id: user.id, username: user.username, name: user.name, role: user.role };
    return next();
  } catch (error) {
    return next(error);
  }
};
