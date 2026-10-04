import type { Response } from 'express';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
  }
}

export const ok = <T>(res: Response, data: T, status = 200) => {
  return res.status(status).json({ success: true, data });
};
