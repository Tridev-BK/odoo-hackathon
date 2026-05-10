# TRAVELOOP

AI powered personalized travel planning platform for the Odoo Hackathon.

## Architecture

TRAVELOOP is a modular full-stack monorepo:

- `frontend`: React, Vite, Tailwind CSS, shadcn-style UI primitives, Framer Motion, React Router, Axios, Zustand.
- `backend`: Node.js, Express.js, JWT auth, Zod validation, Prisma ORM.
- `database`: PostgreSQL SQL schema and migration reference.
- `docs`: product and engineering notes.

## Phase 1 Scope

- JWT signup/login/me flow.
- Protected dashboard.
- Create trip.
- My Trips listing with delete support.
- Prisma schema for all core hackathon entities.
- SQL schema mirror for database review.

## Run Locally

```bash
cd traveloop
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run db:generate
npm run db:migrate
npm run dev:backend
npm run dev:frontend
```

The frontend defaults to `http://localhost:5173` and the backend defaults to `http://localhost:8080`.

## Deployment Targets

- Frontend: Vercel.
- Backend: Render or Railway.
- Database: Supabase PostgreSQL.
