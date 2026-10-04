import { Router } from 'express';
import { memberController } from '../controllers/member.controller.js';
import { UserRole } from '../constants/enums.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { auditMiddleware } from '../middlewares/audit.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

export const memberRoutes = Router();
memberRoutes.use(authMiddleware, roleMiddleware(UserRole.ADMIN));
memberRoutes.get('/', memberController.list);
memberRoutes.put('/:id/level', auditMiddleware('调整会员等级', 'MEMBER'), memberController.updateLevel);
memberRoutes.put('/:id/points', auditMiddleware('调整会员积分', 'MEMBER'), memberController.updatePoints);
memberRoutes.get('/points-rules', memberController.rules);
memberRoutes.put('/points-rules', memberController.updateRules);
