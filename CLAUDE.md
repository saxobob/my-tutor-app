# my-tutor-app Project Guidelines

## Development Commands
- **Install:** `npm install`
- **Dev Server:** `npm run dev` (Next.js development server)
- **Build:** `npm run build` (Production build)
- **Start:** `npm start` (Production server)
- **Linting:** `eslint` (ESLint v9)
- **Database:**
  - Generate Prisma Client: `npx prisma generate`
  - Run migrations: `npx prisma migrate dev`
  - Prisma Studio: `npx prisma studio`

## Code Style & Architecture
- **Tech Stack:**
  - **Framework:** Next.js 16.1.6 (App Router)
  - **UI Library:** React 19.2.3
  - **Language:** TypeScript 5
  - **Styling:** Tailwind CSS v4
  - **Database:** PostgreSQL with Prisma ORM 7.3.0
  - **Fonts:** Geist Sans & Geist Mono (via next/font/google)
- **Naming:** Use PascalCase for components, camelCase for functions/variables
- **State Management:** React Hooks (useState, useEffect, etc.)
- **API Pattern:** Next.js API Routes (App Router pattern)
- **Path Aliasing:** `@/*` maps to `./src/*`
- **TypeScript:** Strict mode enabled, ES2017 target

## Core Logic Locations
- **Components:** `src/components/` (to be created as needed)
- **Pages/Routes:** `src/app/` (Next.js App Router)
- **Types:** `src/types/` (to be created as needed)
- **Database Schema:** `prisma/schema.prisma`
- **Styles:** `src/app/globals.css`
- **Config Files:**
  - TypeScript: `tsconfig.json`
  - Next.js: `next.config.ts`
  - Prisma: `prisma.config.ts`
  - Tailwind: `postcss.config.mjs`
  - ESLint: `eslint.config.mjs`

## Database Architecture
The Prisma schema follows a multi-tenant tutoring business model with these layers:
1. **Multi-Tenancy & Auth:** Tenant, User, Accreditation
2. **CRM:** Contact, Student
3. **Scheduling:** Term, ClassTemplate, ClassSession, Enrolment
4. **Financials:** Invoice, StaffLedger, Expense

## Rules for Claude
1. **Plan First:** Always suggest a plan before writing complex code.
2. **Minimal Changes:** Only modify files relevant to the task.
3. **Be Concise:** Prefer short, readable functions over "clever" one-liners.
4. **Context Check:** If unsure about a dependency, check `package.json` before asking.