import type { ErrorRequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { ZodError } from 'zod';
import { config } from '../config/index.js';
import { AppError } from '../utils/response.js';

const { JsonWebTokenError, TokenExpiredError } = jwt;

export const errorHandlerMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ success: false, error: { code: error.code, message: error.message, details: error.details } });
  }
  if (error instanceof ZodError) {
    return res.status(422).json({ success: false, error: { code: 'VALIDATION_ERROR', message: '参数校验失败', details: error.flatten() } });
  }
  if (error instanceof TokenExpiredError) {
    return res.status(401).json({ success: false, error: { code: 'TOKEN_EXPIRED', message: '登录已过期，请重新登录' } });
  }
  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ success: false, error: { code: 'INVALID_TOKEN', message: '登录凭证无效' } });
  }
  if (error?.code === 'P2002') {
    return res.status(409).json({ success: false, error: { code: 'CONFLICT', message: '该记录已存在' } });
  }
  if (error?.code === 'P2025') {
    return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: '请求的记录不存在' } });
  }
  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: '服务器异常，请稍后重试',
      details: config.nodeEnv === 'production' ? undefined : error?.stack,
    },
  });
};
