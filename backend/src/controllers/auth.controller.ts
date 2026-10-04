import type { Request, Response } from 'express';
import { authService } from '../services/auth.service.js';
import { ok } from '../utils/response.js';

export const authController = {
  register: (req: Request, res: Response) => ok(res, authService.register(req.body), 201),
  login: (req: Request, res: Response) => ok(res, authService.login(req.body.username, req.body.password)),
  me: (req: Request, res: Response) => ok(res, authService.me(req.user!.id)),
};
