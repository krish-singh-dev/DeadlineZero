import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApiResponse } from '../types';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080; // Standard Google Cloud Run container port

// Security & Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));

// Health Check Endpoint (Required for Google Cloud Run Liveness Probes)
app.get('/api/health', (_req: Request, res: Response) => {
  const response: ApiResponse = {
    success: true,
    data: {
      status: 'ONLINE',
      service: 'DeadlineZero API Gateway & Agent Core',
      environment: process.env.NODE_ENV || 'production',
      cloudHost: 'Google Cloud Run',
      timestamp: new Date().toISOString(),
    },
    meta: {
      timestamp: new Date().toISOString(),
      requestId: Math.random().toString(36).substring(2, 11),
    },
  };
  res.status(200).json(response);
});

// API Routes
import tasksRouter from './routes/tasks.routes';
import chatRouter from './routes/chat.routes';
import analyticsRouter from './routes/analytics.routes';

app.use('/api/tasks', tasksRouter);
app.use('/api/chat', chatRouter);
app.use('/api/analytics', analyticsRouter);

// Global Error Handler Middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled Gateway Exception:', err);
  const status = err.statusCode || 500;
  const errorResponse: ApiResponse = {
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected error occurred in the agent gateway.',
      statusCode: status,
    },
    meta: {
      timestamp: new Date().toISOString(),
      requestId: Math.random().toString(36).substring(2, 11),
    },
  };
  res.status(status).json(errorResponse);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 DeadlineZero Cloud Run Gateway listening on port ${PORT}`);
  });
}

export default app;
