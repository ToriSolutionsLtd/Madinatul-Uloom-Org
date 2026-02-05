# Madinatul Uloom Web

This `main` branch contains the standalone Next.js website for Madinatul Uloom.
The full monorepo (Next.js + NestJS API + shared packages + tooling) is preserved on the `legacy` branch.

## Tech Stack
- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- next-intl
- TanStack Query
- React Hook Form + Zod

## Getting Started

Prerequisites:
- Node.js 20+
- pnpm (recommended) or npm

Install and run:
```bash
pnpm install
pnpm dev
```

Build and start:
```bash
pnpm build
pnpm start
```

## Environment
Copy the example file and adjust values as needed:
```bash
cp .env.example .env.local
```

## Legacy Monorepo
If you need the backend API or shared packages, switch to the `legacy` branch.
