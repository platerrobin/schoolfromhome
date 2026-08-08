# SchoolFromHome

This is the starter scaffold for the SchoolFromHome app.

Features included on branch `homeschool-starter`:
- Next.js + TypeScript + Tailwind
- NextAuth (Email + Google) skeleton
- Prisma schema and seed script (demo teacher + 4 students provided, you can add more later)
- Editable worksheet editor (Markdown/WYSIWYG placeholder) and PDF export hook
- Gradebook API and UI skeleton
- Games engine templates and a few sample games per subject (data-driven)
- Reading library (upload PDF/EPUB and simple reader placeholder)

Local setup
1. copy `.env.example` to `.env` and fill values (see variables below)
2. npm install
3. npx prisma generate
4. npx prisma migrate dev --name init
5. npm run seed
6. npm run dev

.env variables to set (see .env.example)

Deployment: recommended Vercel + Neon (or Supabase) for Postgres. Use S3-compatible storage for uploads.

