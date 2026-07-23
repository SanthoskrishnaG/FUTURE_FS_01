import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import contactRouter from './routes/contact';
const app = express();
const PORT = process.env.PORT ?? 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS — allow the Next.js frontend on port 3000
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/contact', contactRouter);

import path from 'path';

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// Root info
app.get('/api/info', (_req, res) => {
  res.json({
    project: '🎓 Santhoskrishna G — M.Sc Software Systems Portfolio',
    architecture: 'Full-Stack (Monorepo)',
    layers: {
      frontend: 'Next.js 14 + React + TypeScript (port 3000)',
      backend: 'Express.js + TypeScript (port 5000)',
      database: 'JSON File Storage',
    },
    endpoints: {
      'POST /api/contact': 'Save a contact message',
      'GET  /api/contact': 'List all contact messages',
      'GET  /api/contact/health': 'Storage health check',
    },
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

// ─── Start ────────────────────────────────────────────────────────────────────
const start = async () => {

  const server = app.listen(PORT, () => {
    console.log('');
    console.log('╔══════════════════════════════════════════════════════╗');
    console.log('║     🚀 Portfolio Backend API — Running               ║');
    console.log('╠══════════════════════════════════════════════════════╣');
    console.log(`║  Server   : http://localhost:${PORT}                    ║`);
    console.log('║  Database : JSON File Storage                        ║');
    console.log('║  CORS     : http://localhost:3000                    ║');
    console.log('╠══════════════════════════════════════════════════════╣');
    console.log('║  Endpoints:                                          ║');
    console.log('║   GET  /                       — API info            ║');
    console.log('║   POST /api/contact            — Save message        ║');
    console.log('║   GET  /api/contact            — List messages       ║');
    console.log('║   GET  /api/contact/health     — Storage health check║');
    console.log('╚══════════════════════════════════════════════════════╝');
    console.log('');
  });

  // Handle port already in use — give a clear, actionable error
  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ Port ${PORT} is already in use.`);
      console.error(`   Stop the other process first, then re-run: npm run dev\n`);
      process.exit(1);
    } else {
      throw err;
    }
  });
};

start();

export default app;
