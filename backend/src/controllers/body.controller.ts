import type { Request, Response } from 'express';
import { bodyService } from '../services/body.service.js';
import { ok } from '../utils/response.js';

export const bodyController = {
  list: (req: Request, res: Response) => ok(res, bodyService.list(req.user)),
  upsert: (req: Request, res: Response) => ok(res, bodyService.upsert(req.user, req.body), 201),
  trend: (req: Request, res: Response) => ok(res, bodyService.trend(req.user, String(req.query.metric ?? 'weight'))),
  goals: (req: Request, res: Response) => ok(res, bodyService.goals(req.user)),
  updateGoals: (req: Request, res: Response) => ok(res, bodyService.updateGoals(req.user, req.body)),
};
