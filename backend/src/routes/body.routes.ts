import { Router } from 'express';
import { bodyController } from '../controllers/body.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { auditMiddleware } from '../middlewares/audit.middleware.js';

export const bodyRoutes = Router();
bodyRoutes.use(authMiddleware);
bodyRoutes.get('/metrics', bodyController.list);
bodyRoutes.post('/metrics', auditMiddleware('记录身体数据', 'BODY'), bodyController.upsert);
bodyRoutes.get('/trend', bodyController.trend);
bodyRoutes.get('/goals', bodyController.goals);
bodyRoutes.put('/goals', bodyController.updateGoals);
