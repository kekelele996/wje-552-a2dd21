import { Router } from 'express';
import { z } from 'zod';
import { authController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateBody } from '../middlewares/validation.middleware.js';

export const authRoutes = Router();
authRoutes.post('/register', validateBody(z.object({ username: z.string().min(2), password: z.string().min(6), name: z.string().min(1) })), authController.register);
authRoutes.post('/login', validateBody(z.object({ username: z.string().min(1), password: z.string().min(1) })), authController.login);
authRoutes.get('/me', authMiddleware, authController.me);
