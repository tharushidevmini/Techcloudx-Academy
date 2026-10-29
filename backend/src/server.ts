import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import courseRoutes from './routes/course.routes';
import batchRoutes from './routes/batch.routes';
import { pool } from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || process.env.BACKEND_PORT || 5000;

// CORS configuration supporting Vite dev server
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Dev-friendly fallback
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', async (req: Request, res: Response) => {
  try {
    const dbTest = await pool.query('SELECT NOW()');
    res.status(200).json({
      status: 'healthy',
      service: 'TechCloudX Academy Node.js Backend',
      database: 'connected',
      timestamp: dbTest.rows[0].now,
    });
  } catch (error: any) {
    res.status(200).json({
      status: 'degraded',
      service: 'TechCloudX Academy Node.js Backend',
      database: 'disconnected',
      error: error.message,
    });
  }
});

// Root API information
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to TechCloudX Academy API (TypeScript / Express)',
    endpoints: {
      health: '/health',
      auth: '/api/v1/auth',
      courses: '/api/v1/courses',
      batches: '/api/v1/batches/:id',
    },
  });
});

// Mount Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/auth', authRoutes); // Convenience alias
app.use('/api/v1/courses', courseRoutes);
app.use('/api/courses', courseRoutes); // Convenience alias
app.use('/api/v1/batches', batchRoutes);
app.use('/api/batches', batchRoutes); // Convenience alias

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[UNHANDLED ERROR]', err);
  res.status(500).json({
    success: false,
    message: 'An unexpected internal error occurred.',
  });
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[TechCloudX Academy] Server running on port ${PORT}`);
    console.log(`[TechCloudX Academy] Health check: http://localhost:${PORT}/health`);
  });
}

export default app;
