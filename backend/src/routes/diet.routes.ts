import { Router } from 'express';
import { dietController } from '../controllers/diet.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { auditMiddleware } from '../middlewares/audit.middleware.js';

export const dietRoutes = Router();
dietRoutes.use(authMiddleware);
dietRoutes.get('/records', dietController.records);
dietRoutes.post('/records', auditMiddleware('新增饮食记录', 'DIET'), dietController.create);
dietRoutes.delete('/records/:id', auditMiddleware('删除饮食记录', 'DIET'), dietController.delete);
dietRoutes.get('/stats', dietController.stats);
dietRoutes.get('/food-library', dietController.foodLibrary);
