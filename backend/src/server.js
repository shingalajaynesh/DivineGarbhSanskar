import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import { getOrCreateEventSetting } from './models/EventSetting.js';
import apiRoutes from './routes/apiRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4100;

// Enable CORS for frontend Vite dev server and production
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-password']
}));

// Body parsers with generous limits
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Root endpoint for Render / Uptime robot health checks
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Divya Garbh Yatra Backend API',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    event: 'દિવ્ય ગર્ભયાત્રા (Divya Garbh Yatra)',
    date: '19 December 2026, શનિવાર',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api', apiRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err);
  res.status(500).json({ error: err.message || 'ઇન્ટરનલ સર્વર એરર.' });
});

// Start Server & Connect Database
const start = async () => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`🚀 Divya Garbh Yatra Backend running on port ${PORT}`);
    console.log(`🎯 Health check: http://0.0.0.0:${PORT}/api/health`);
    console.log(`=======================================================`);
  });

  try {
    const conn = await connectDB();
    if (conn) {
      await getOrCreateEventSetting();
    }
  } catch (err) {
    console.warn('[Database] Initial connection deferred:', err.message);
    console.warn('[Database] Backend is live. Awaiting database connection string...');
  }
};

start();
