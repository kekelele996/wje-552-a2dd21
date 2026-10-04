import { Router } from 'express';
import { trainingController } from '../controllers/training.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { auditMiddleware } from '../middlewares/audit.middleware.js';

export const trainingRoutes = Router();
trainingRoutes.use(authMiddleware);
trainingRoutes.get('/plans', trainingController.list);
trainingRoutes.post('/plans', auditMiddleware('创建训练计划', 'TRAINING'), trainingController.create);
trainingRoutes.get('/plans/:id', trainingController.detail);
trainingRoutes.put('/plans/:id', trainingController.update);
trainingRoutes.post('/plans/:id/activate', auditMiddleware('启动训练计划', 'TRAINING'), trainingController.activate);
trainingRoutes.post('/plans/:id/pause', auditMiddleware('暂停训练计划', 'TRAINING'), trainingController.pause);
trainingRoutes.post('/plans/:id/complete', auditMiddleware('完成训练计划', 'TRAINING'), trainingController.complete);
trainingRoutes.post('/exercises/complete', auditMiddleware('标记动作完成', 'TRAINING'), trainingController.completeExercise);
