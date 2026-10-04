import type { Request, Response } from 'express';
import { trainingService } from '../services/training.service.js';
import { ok } from '../utils/response.js';

export const trainingController = {
  list: (req: Request, res: Response) => ok(res, trainingService.list(req.user)),
  detail: (req: Request, res: Response) => ok(res, trainingService.detail(String(req.params.id), req.user)),
  create: (req: Request, res: Response) => ok(res, trainingService.create(req.body, req.user), 201),
  update: (req: Request, res: Response) => ok(res, trainingService.update(String(req.params.id), req.body, req.user)),
  activate: (req: Request, res: Response) => ok(res, trainingService.activate(String(req.params.id), req.user)),
  pause: (req: Request, res: Response) => ok(res, trainingService.pause(String(req.params.id), req.user)),
  complete: (req: Request, res: Response) => ok(res, trainingService.complete(String(req.params.id), req.user)),
  completeExercise: (req: Request, res: Response) => ok(res, trainingService.completeExercise(req.body.exerciseId, req.user)),
};
