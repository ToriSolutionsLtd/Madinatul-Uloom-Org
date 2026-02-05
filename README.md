# Madinatul Uloom - Modern Mosque Management Platform

<div align="center">
  <h1>🕌 Madinatul Uloom</h1>
  <p><strong>A comprehensive full-stack platform for modern mosque management</strong></p>
  
  ![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)
  ![pnpm](https://img.shields.io/badge/pnpm-9%2B-F69220?logo=pnpm&logoColor=white)
  ![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)
  ![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?logo=nestjs&logoColor=white)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)

  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#project-structure">Structure</a> •
    <a href="#development">Development</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## ✅ Current Status

The live site is a public-facing brochure experience (Home, About, Programs, Campus & Facilities, Contact, Donate) with i18n and a downloadable prospectus. The admin portal and advanced platform modules are planned but not yet implemented.

## 🌟 Features
### Public-Facing Website
#### Live on site
- ✅ **Core Pages** - Home, About, Programs, Campus & Facilities, Contact
- ✅ **Prospectus Download** - PDF download from the website
- ✅ **Donation Information** - Bank and bKash details displayed on the site
- ✅ **Multi-language** - i18n support (English, Arabic, Bengali)

#### Planned (Not yet implemented)
- ⏳ **Prayer Times** - Accurate daily prayer schedules with Athan API integration
- ⏳ **Events Calendar** - Community events with RSVP functionality
- ⏳ **Sermon Archive** - Audio/video library with search and filtering
- ⏳ **Online Donations** - Stripe integration for Zakat, Sadaqah, and general donations

### Admin Portal
#### Planned (Not yet implemented)
- ⏳ **User Management** - Role-based access control (Admin, Imam, Volunteer, Member)
- ⏳ **Dashboard** - Comprehensive analytics and reporting
- ⏳ **Content Management** - Announcements, events, and sermon management
- ⏳ **Donation Tracking** - Financial reports and donor management
- ⏳ **Communication Tools** - Newsletter and notification system

### Future Roadmap (Phase 2)
- 🎓 LMS Integration (Moodle) for Islamic education
- 🔔 Push notifications
- 📱 Progressive Web App (PWA)
- 🏫 Multi-tenant support for multiple mosques

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **i18n**: [next-intl](https://next-intl-docs.vercel.app/)

### Backend
- **Framework**: [NestJS 10](https://nestjs.com/)
- **Database**: [PostgreSQL 16](https://www.postgresql.org/) + [Prisma ORM 6](https://www.prisma.io/)
- **Caching**: [Redis 7](https://redis.io/) + [ioredis](https://github.com/redis/ioredis)
- **Authentication**: JWT with [Passport.js](http://www.passportjs.org/)
- **Payments**: [Stripe](https://stripe.com/)
- **API Documentation**: [Swagger/OpenAPI](https://swagger.io/)
- **Validation**: [class-validator](https://github.com/typestack/class-validator) + [Zod](https://zod.dev/)

### DevOps & Tooling
- **Monorepo**: [pnpm 9](https://pnpm.io/) workspaces + [Turborepo](https://turbo.build/)
- **Containers**: [Docker](https://www.docker.com/) + Docker Compose
- **CI/CD**: GitHub Actions (Planned/Not yet implemented)
- **Code Quality**: ESLint + Prettier + [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/okonet/lint-staged)
- **Commits**: [Commitlint](https://commitlint.js.org/) with Conventional Commits
- **Hosting**: Vercel (Frontend) + Railway/Fly.io (Backend) (Planned/Not yet implemented for backend)

---

## 📁 Project Structure

```
madinatul-uloom-core/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/[locale]/   # App router pages
│   │   │   ├── components/     # React components
│   │   │   ├── lib/            # Utilities
│   │   │   ├── hooks/          # Custom hooks
│   │   │   └── i18n/           # Internationalization
│   │   └── public/             # Static assets
│   │
│   └── api/                    # NestJS backend
│       ├── src/
│       │   ├── modules/        # Feature modules
│       │   │   ├── auth/       # Authentication & JWT
│       │   │   ├── users/      # User management
│       │   │   ├── events/     # Event management
│       │   │   ├── donations/  # Donation processing
│       │   │   ├── programs/   # Islamic programs
│       │   │   ├── sermons/    # Sermon archive
│       │   │   ├── prayer-times/  # Prayer schedules
│       │   │   └── health/     # Health check endpoint
│       │   └── prisma/         # Database service
│       └── prisma/
│           └── schema.prisma   # Database schema
│
├── packages/
│   └── shared/                 # Shared types & utilities
│       └── src/
│           ├── types/          # TypeScript interfaces
│           ├── schemas/        # Zod validation schemas
│           ├── constants/      # Shared constants
│           └── utils/          # Utility functions
│
├── docker-compose.yml          # Local development services
├── turbo.json                  # Turborepo configuration
├── pnpm-workspace.yaml         # Workspace configuration
└── package.json                # Root package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **pnpm** 9+ (`npm install -g pnpm` or `corepack enable`)
- **Docker** Desktop ([Download](https://www.docker.com/products/docker-desktop/))

### Quick Setup

#### Windows (PowerShell)
```powershell
# Clone the repository
git clone https://github.com/Tori-Solutions/Madinatul-Uloom.git
cd Madinatul-Uloom

# Run setup script
.\scripts\setup.ps1
```

#### macOS/Linux (Bash)
```bash
# Clone the repository
git clone https://github.com/Tori-Solutions/Madinatul-Uloom.git
cd Madinatul-Uloom

# Make setup script executable and run
chmod +x scripts/setup.sh
./scripts/setup.sh
```

#### Manual Setup
```bash
# 1. Clone and enter directory
git clone https://github.com/Tori-Solutions/Madinatul-Uloom.git
cd Madinatul-Uloom

# 2. Copy environment files
cp .env.example .env
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env

# 3. Start Docker services (PostgreSQL + Redis)
docker compose up -d

# 4. Install dependencies
pnpm install

# 5. Generate Prisma client
pnpm db:generate

# 6. Push database schema
pnpm db:push

# 7. Start development servers
pnpm dev
```

### Access Points

| Service       | URL                          |
|---------------|------------------------------|
| Frontend      | http://localhost:3000        |
| Backend API   | http://localhost:3001/api    |
| API Docs      | http://localhost:3001/docs   |
| Adminer (DB)  | http://localhost:8080        |
| Redis UI      | http://localhost:8081        |

---

## 💻 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start all apps in development mode

# Building
pnpm build            # Build all packages

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm format           # Format with Prettier
pnpm format:check     # Check formatting without changes
pnpm typecheck        # Run TypeScript checks

# Database
pnpm db:generate      # Generate Prisma client
pnpm db:push          # Push schema to database
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Prisma Studio

# Cleaning
pnpm clean            # Clean all build outputs and node_modules
```

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add prayer times component
fix: resolve donation form validation
docs: update README setup instructions
style: format code with prettier
refactor: reorganize auth module
test: add unit tests for user service
chore: update dependencies
```

### Adding a New Feature Module (Backend)

```bash
# Navigate to API directory
cd apps/api

# Generate a new NestJS module
pnpm nest g module modules/announcements
pnpm nest g controller modules/announcements
pnpm nest g service modules/announcements
```

### Adding UI Components (Frontend)

```bash
# Navigate to web directory
cd apps/web

# Add shadcn/ui components
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add form
pnpm dlx shadcn@latest add table
```

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |
| `JWT_SECRET` | JWT signing secret (min 32 chars) |
| `STRIPE_SECRET_KEY` | Stripe API secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |

### Optional Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key |
| `SANITY_API_TOKEN` | Sanity CMS token |
| `POSTMARK_API_KEY` | Postmark email API key |
| `SENTRY_DSN` | Sentry error tracking DSN |

See [.env.example](https://github.com/Tori-Solutions/Madinatul-Uloom/blob/main/.env.example) for all available variables.

---

## 📦 Deployment

### Frontend (Vercel)

1. Connect repository to Vercel
2. Set environment variables
3. Deploy with default Next.js preset

### Backend (Railway)

1. Create new Railway project
2. Add PostgreSQL and Redis services
3. Deploy from GitHub repository
4. Configure environment variables

### Docker Production Build
> Note: Production compose file is planned. Only `docker-compose.yml` exists currently.

```bash
# Build production images
docker compose -f docker-compose.prod.yml build

# Run production stack
docker compose -f docker-compose.prod.yml up -d
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 🤲 Acknowledgments

- Built with ❤️ for the Muslim community
- Inspired by modern mosque needs and community feedback
- Developed by [Tori Solutions](https://github.com/Tori-Solutions)

---

<div align="center">
  <p><strong>Madinatul Uloom</strong> - Empowering mosques with modern technology</p>
  <p>
    <a href="https://madinatululoom.org">Website</a> •
    <a href="mailto:dev@madinatululoom.org">Contact</a> •
    <a href="https://github.com/Tori-Solutions/Madinatul-Uloom">GitHub</a>
  </p>
</div>
