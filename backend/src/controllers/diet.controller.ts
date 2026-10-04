import type { Request, Response } from 'express';
import { dietService } from '../services/diet.service.js';
import { ok } from '../utils/response.js';

export const dietController = {
  records: (req: Request, res: Response) => ok(res, dietService.records(req.user, String(req.query.date ?? new Date().toISOString().slice(0, 10)))),
  create: (req: Request, res: Response) => ok(res, dietService.create(req.user, req.body), 201),
  delete: (req: Request, res: Response) => ok(res, dietService.delete(req.user, String(req.params.id))),
  stats: (req: Request, res: Response) => ok(res, dietService.stats(req.user)),
  foodLibrary: (req: Request, res: Response) => ok(res, dietService.foodLibrary(String(req.query.q ?? ''))),
};
