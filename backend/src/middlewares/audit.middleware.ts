import type { NextFunction, Request, Response } from 'express';
import { auditService } from '../services/audit.service.js';

export const auditMiddleware = (action: string, module: 'TRAINING' | 'DIET' | 'BODY' | 'MEMBER') => {
  return (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
      if (req.user && res.statusCode < 400 && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
        auditService.record({
          userId: req.user.id,
          action,
          module,
          targetId: req.params.id ? String(req.params.id) : undefined,
          detail: { body: req.body, params: req.params },
          ip: req.ip,
        });
      }
    });
    next();
  };
};
