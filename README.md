# 🎓 Santhoskrishna G — Portfolio

> M.Sc Software Systems | Full-Stack Developer | AI & Cloud Enthusiast

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Express](https://img.shields.io/badge/Express.js-4.18-000000?style=flat-square&logo=express)](https://expressjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-5.7-2D3748?style=flat-square&logo=prisma)](https://prisma.io)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite)](https://sqlite.org)

---

## 🏗️ Architecture

This is a **full-stack monorepo** with clearly separated frontend and backend layers.

```
Future Interns/
├── frontend/          ← React Client (Next.js 14)      [port 3000]
│   ├── app/           ← App Router pages & global CSS
│   ├── components/    ← 16 modular React components
│   └── public/        ← Static assets (images, resume)
│
├── backend/           ← REST API Server (Express.js)   [port 5000]
│   ├── src/
│   │   ├── server.ts          ← Express entry point
│   │   ├── routes/contact.ts  ← POST/GET /api/contact
│   │   └── lib/prisma.ts      ← Prisma DB singleton
│   └── prisma/
│       ├── schema.prisma      ← DB model definition
│       └── portfolio.db       ← SQLite database file
│
└── package.json       ← Root scripts (run both together)
```

### Data Flow

```
Browser
  │
  ▼
Next.js Frontend (localhost:3000)
  │  /api/* proxy (next.config.js rewrites)
  ▼
Express Backend (localhost:5000)
  │  Prisma ORM
  ▼
SQLite Database (portfolio.db)
```

---

## 🛠️ Tech Stack

| Layer      | Technology               | Purpose                          |
|------------|--------------------------|----------------------------------|
| Frontend   | Next.js 14 (App Router)  | Server-side rendering + routing  |
| UI         | React 18 + TypeScript    | Component-based UI               |
| Styling    | Vanilla CSS (48KB system)| Custom design system, dark mode  |
| Backend    | Express.js + TypeScript  | REST API server                  |
| Database   | SQLite (via Prisma ORM)  | Persistent contact messages      |
| Dev Tools  | tsx, Prisma CLI          | Hot-reload, DB migrations        |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# 1. Install all dependencies (frontend + backend)
npm run install:all

# 2. Initialize the database
npm run db:push
```

### Running Locally

```bash
# Option A — Run both frontend + backend together (opens two terminals)
npm run dev

# Option B — Run separately
npm run backend    # starts Express API at http://localhost:5000
npm run frontend   # starts Next.js app at http://localhost:3000
```

---

## 📡 API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| GET    | `/`                   | API info & architecture overview |
| POST   | `/api/contact`        | Submit a contact message       |
| GET    | `/api/contact`        | List all contact messages      |
| GET    | `/api/contact/health` | Database health check          |

### Example: Submit a Message

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello!"}'
```

### Example: View All Messages

```bash
curl http://localhost:5000/api/contact
```

---

## 🗂️ Frontend Components

| Component             | Description                          |
|-----------------------|--------------------------------------|
| `Header.tsx`          | Sticky nav with theme toggle         |
| `HeroSection.tsx`     | Animated hero with profile avatar    |
| `AboutSection.tsx`    | Bio, stats, key highlights           |
| `TimelineSection.tsx` | Education & experience timeline      |
| `SkillsSection.tsx`   | Animated skill bars with categories  |
| `ProjectsSection.tsx` | Project cards with tech badges       |
| `LeadershipSection.tsx`| Leadership roles & contributions    |
| `AchievementsSection.tsx`| Certifications & awards           |
| `GithubGridSection.tsx`| GitHub contribution heat-map        |
| `ContactSection.tsx`  | Full-stack contact form (→ backend)  |
| `Footer.tsx`          | Links, socials, copyright            |
| `VisualEffects.tsx`   | Particle canvas, cursor, tilt        |

---

## 👤 About

**Santhoskrishna G** — M.Sc Software Systems student passionate about building scalable full-stack applications with modern technologies.

- 📧 Email: santhoshkrishna@example.com
- 💼 LinkedIn: [linkedin.com/in/santhoskrishna](https://linkedin.com/in/santhoskrishna)
- 🐙 GitHub: [github.com/santhoskrishna](https://github.com/santhoskrishna)

---

*Built with ❤️ using Next.js, Express.js, Prisma & SQLite*
