import type { Request, Response } from 'express';
import { dashboardService } from '../services/dashboard.service.js';
import { ok } from '../utils/response.js';

export const dashboardController = {
  summary: (req: Request, res: Response) => ok(res, dashboardService.summary(req.user)),
};
