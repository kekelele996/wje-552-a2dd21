import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { config } from './config/index.js';
import './types/index.js';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware.js';
import { authRoutes } from './routes/auth.routes.js';
import { bodyRoutes } from './routes/body.routes.js';
import { dashboardRoutes } from './routes/dashboard.routes.js';
import { dietRoutes } from './routes/diet.routes.js';
import { memberRoutes } from './routes/member.routes.js';
import { trainingRoutes } from './routes/training.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/v1/health', (_req, res) => res.json({ success: true, data: { status: 'ok', time: new Date().toISOString() } }));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/training', trainingRoutes);
app.use('/api/v1/diet', dietRoutes);
app.use('/api/v1/body', bodyRoutes);
app.use('/api/v1/members', memberRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use(errorHandlerMiddleware);

app.listen(config.port, () => {
  console.log(`FitTracker Pro API listening on ${config.port}`);
});
