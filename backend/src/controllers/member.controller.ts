import type { Request, Response } from 'express';
import { memberService } from '../services/member.service.js';
import { ok } from '../utils/response.js';

export const memberController = {
  list: (req: Request, res: Response) => ok(res, memberService.list(req.user, req.query)),
  updateLevel: (req: Request, res: Response) => ok(res, memberService.updateLevel(String(req.params.id), req.body.level)),
  updatePoints: (req: Request, res: Response) => ok(res, memberService.updatePoints(String(req.params.id), Number(req.body.points))),
  rules: (_req: Request, res: Response) => ok(res, memberService.rules()),
  updateRules: (req: Request, res: Response) => ok(res, memberService.updateRules(req.body)),
};
