import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    project: '🎓 Santhoskrishna G — M.Sc Software Systems Portfolio',
    framework: 'Next.js 14 (App Router) + React + TypeScript',
    architecture: 'Full-Stack Monorepo',
    endpoints: {
      'POST /api/contact': 'Submit contact message',
      'GET  /api/contact': 'List saved contact messages',
      'GET  /api/info': 'Project architecture & info',
    },
    status: 'online',
    timestamp: new Date().toISOString(),
  });
}
