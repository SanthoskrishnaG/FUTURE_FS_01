import { Router, Request, Response } from 'express';
import pool from '../lib/db';

const router = Router();

// ─── POST /api/contact ────────────────────────────────────────────────────────
// Save a new contact message to PostgreSQL
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body as {
      name?: string;
      email?: string;
      message?: string;
    };

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields (name, email, message) are required.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    // Save to PostgreSQL
    const result = await pool.query(
      `INSERT INTO "ContactMessage" (name, email, message) VALUES ($1, $2, $3) RETURNING id, "createdAt"`,
      [name, email, message],
    );

    const record = result.rows[0];
    console.log(`[Contact] ✅ New message from ${name} (${email}) — ID: ${record.id}`);

    return res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you shortly.',
      id: record.id,
    });
  } catch (error) {
    console.error('[Contact] ❌ POST error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.',
    });
  }
});

// ─── GET /api/contact ─────────────────────────────────────────────────────────
// Retrieve all saved messages (admin view)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT * FROM "ContactMessage" ORDER BY "createdAt" DESC`,
    );

    return res.status(200).json({
      success: true,
      count: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    console.error('[Contact] ❌ GET error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// ─── GET /api/contact/health ──────────────────────────────────────────────────
// Health check — proves full-stack architecture is running
router.get('/health', async (_req: Request, res: Response) => {
  try {
    await pool.query('SELECT 1');
    return res.status(200).json({
      success: true,
      status: 'healthy',
      service: 'Portfolio Backend API',
      database: 'PostgreSQL (connected)',
      timestamp: new Date().toISOString(),
    });
  } catch {
    return res.status(503).json({ success: false, status: 'unhealthy', database: 'disconnected' });
  }
});

export default router;
