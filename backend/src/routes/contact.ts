import { Router, Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

const router = Router();
const dataFilePath = path.join(__dirname, '../../data/contacts.json');

// Ensure the data directory and file exist
const initDataFile = async () => {
  try {
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
    try {
      await fs.access(dataFilePath);
    } catch {
      await fs.writeFile(dataFilePath, JSON.stringify([]));
    }
  } catch (error) {
    console.error('[Contact] ❌ Error initializing data file:', error);
  }
};
initDataFile();

// ─── POST /api/contact ────────────────────────────────────────────────────────
// Save a new contact message to JSON file
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

    // Save to JSON
    const fileData = await fs.readFile(dataFilePath, 'utf-8');
    const contacts = JSON.parse(fileData);
    
    const newContact = {
      id: Date.now(), // simple numeric ID
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    };
    
    contacts.push(newContact);
    await fs.writeFile(dataFilePath, JSON.stringify(contacts, null, 2));

    console.log(`[Contact] ✅ New message from ${name} (${email}) — ID: ${newContact.id}`);

    // Send email notification
    try {
      // Create a test account if no SMTP settings are provided
      let transporter;
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
      } else {
        // Fallback to ethereal for testing
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
      }

      const info = await transporter.sendMail({
        from: `"${name}" <${email}>`, // sender address
        to: process.env.NOTIFICATION_EMAIL || "portfolio-admin@example.com", // list of receivers
        subject: "New Contact Message from Portfolio", // Subject line
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // plain text body
      });

      console.log("[Contact] ✅ Email notification sent! Message ID: %s", info.messageId);
      if (!process.env.SMTP_USER) {
        console.log("[Contact] 🔗 Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
    } catch (emailError) {
      console.error('[Contact] ❌ Error sending email notification:', emailError);
      // We don't want to fail the request if email sending fails, so we just log it.
    }

    return res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you shortly.',
      id: newContact.id,
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
    const fileData = await fs.readFile(dataFilePath, 'utf-8');
    const contacts = JSON.parse(fileData);
    // Sort descending by createdAt
    contacts.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('[Contact] ❌ GET error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// ─── GET /api/contact/health ──────────────────────────────────────────────────
// Health check
router.get('/health', async (_req: Request, res: Response) => {
  try {
    await fs.access(dataFilePath);
    return res.status(200).json({
      success: true,
      status: 'healthy',
      service: 'Portfolio Backend API',
      database: 'JSON File Storage',
      timestamp: new Date().toISOString(),
    });
  } catch {
    return res.status(503).json({ success: false, status: 'unhealthy', database: 'disconnected' });
  }
});

export default router;
