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

// Root info — visible proof of full-stack architecture
app.get('/', (_req, res) => {
  res.json({
    project: '🎓 Santhoskrishna G — M.Sc Software Systems Portfolio',
    architecture: 'Full-Stack (Monorepo)',
    layers: {
      frontend: 'Next.js 14 + React + TypeScript (port 3000)',
      backend: 'Express.js + TypeScript (port 5000)',
      database: 'SQLite via Prisma ORM',
    },
    endpoints: {
      'POST /api/contact': 'Save a contact message',
      'GET  /api/contact': 'List all contact messages',
      'GET  /api/contact/health': 'Database health check',
    },
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║     🚀 Portfolio Backend API — Running               ║');
  console.log('╠══════════════════════════════════════════════════════╣');
  console.log(`║  Server   : http://localhost:${PORT}                    ║`);
  console.log('║  Database : SQLite (Prisma ORM)                      ║');
  console.log('║  CORS     : http://localhost:3000                    ║');
  console.log('╠══════════════════════════════════════════════════════╣');
  console.log('║  Endpoints:                                          ║');
  console.log('║   GET  /                       — API info            ║');
  console.log('║   POST /api/contact            — Save message        ║');
  console.log('║   GET  /api/contact            — List messages       ║');
  console.log('║   GET  /api/contact/health     — DB health check     ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log('');
});

export default app;
