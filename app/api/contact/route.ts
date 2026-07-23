import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

const dataFilePath = path.join(process.cwd(), 'data', 'contacts.json');

// Helper to ensure data directory and file exist
async function ensureDataFile() {
  try {
    const dir = path.dirname(dataFilePath);
    await fs.mkdir(dir, { recursive: true });
    try {
      await fs.access(dataFilePath);
    } catch {
      await fs.writeFile(dataFilePath, JSON.stringify([], null, 2));
    }
  } catch (error) {
    console.error('[API Contact] ⚠️ Warning initializing contacts storage file:', error);
  }
}

// ─── POST /api/contact ────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body as {
      name?: string;
      email?: string;
      message?: string;
    };

    // 1. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields (name, email, message) are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const newContact = {
      id: Date.now(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    // 2. Local file persistence (Graceful fallback if filesystem is read-only e.g. Vercel)
    try {
      await ensureDataFile();
      const fileData = await fs.readFile(dataFilePath, 'utf-8');
      const contacts = JSON.parse(fileData);
      contacts.push(newContact);
      await fs.writeFile(dataFilePath, JSON.stringify(contacts, null, 2));
    } catch (fsError) {
      console.warn('[API Contact] ⚠️ Could not write to local JSON storage (expected in serverless environments):', fsError);
    }

    console.log(`[API Contact] ✅ Message received from ${name} (${email})`);

    // 3. Email Notification via Nodemailer
    try {
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
        from: `"${name}" <${email}>`,
        to: process.env.NOTIFICATION_EMAIL || 'portfolio-admin@example.com',
        subject: 'New Contact Message from Next.js Portfolio',
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });

      console.log('[API Contact] 📧 Notification sent! ID:', info.messageId);
    } catch (emailError) {
      console.error('[API Contact] ❌ Error sending email notification:', emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message received! I will get back to you shortly.',
        id: newContact.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API Contact] ❌ POST Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// ─── GET /api/contact ─────────────────────────────────────────────────────────
export async function GET() {
  try {
    await ensureDataFile();
    const fileData = await fs.readFile(dataFilePath, 'utf-8');
    const contacts = JSON.parse(fileData);
    contacts.sort(
      (a: { createdAt: string }, b: { createdAt: string }) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('[API Contact] ❌ GET Error:', error);
    return NextResponse.json({ success: true, count: 0, data: [] });
  }
}
