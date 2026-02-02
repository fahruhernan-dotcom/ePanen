import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { initializeDatabase } from './config/supabase.js';
import routes from './routes/index.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    body: req.body,
    query: req.query,
    user: req.user?.id
  });
  next();
});

// API Routes
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'ePanen API',
    version: '1.0.0',
    description: 'API platform untuk petani Indonesia - Powered by Supabase + OpenRouter',
    database: 'Supabase PostgreSQL',
    ai: 'OpenRouter (Grok 4.1 Fast)',
    endpoints: {
      auth: '/api/auth',
      chat: '/api/chat',
      articles: '/api/articles',
      market: '/api/market',
      discussions: '/api/discussions',
      admin: '/api/admin',
      webhook: '/api/webhook'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Terjadi kesalahan internal server',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Initialize database and start server
async function startServer() {
  try {
    // Initialize Supabase tables
    console.log('🔌 Connecting to Supabase...');
    await initializeDatabase();
    console.log('✅ Supabase initialized successfully');

    // Test OpenRouter connection (optional)
    if (process.env.AI_API_KEY) {
      console.log('🤖 Testing OpenRouter connection...');
      const aiService = (await import('./services/aiService.js')).default;
      await aiService.testConnection();
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║              ePanen API Server is Running!              ║
║                                                          ║
║  Database: Supabase PostgreSQL                          ║
║  AI:       OpenRouter (Grok 4.1 Fast)                    ║
║                                                          ║
║  - Local:   http://localhost:${PORT}                     ║
║  - API:     http://localhost:${PORT}/api                 ║
║  - Health:  http://localhost:${PORT}/api/health          ║
║                                                          ║
║  Yakin Kita Bisa!                                       ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
