# Madinatul Uloom - Modern Mosque Management Platform

<div align="center">
  <h1>🕌 Madinatul Uloom</h1>
  <p><strong>A comprehensive full-stack platform for modern mosque management</strong></p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#project-structure">Structure</a> •
    <a href="#development">Development</a>
  </p>
</div>

---

## 🌟 Features

### Public-Facing Website
- 📅 **Prayer Times** - Accurate daily prayer schedules with Athan API integration
- 🗓️ **Events Calendar** - Community events with RSVP functionality
- 📖 **Sermon Archive** - Audio/video library with search and filtering
- 📚 **Islamic Programs** - Quran circles, youth programs, and educational classes
- 💰 **Online Donations** - Secure Stripe integration for Zakat, Sadaqah, and general donations
- 🌐 **Multi-language** - Full i18n support (English, Arabic, Bengali)

### Admin Portal
- 👥 **User Management** - Role-based access control (Admin, Imam, Volunteer, Member)
- 📊 **Dashboard** - Comprehensive analytics and reporting
- 📝 **Content Management** - Announcements, events, and sermon management
- 💳 **Donation Tracking** - Financial reports and donor management
- 📧 **Communication Tools** - Newsletter and notification system

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
- **Database**: [PostgreSQL 16](https://www.postgresql.org/) + [Prisma ORM](https://www.prisma.io/)
- **Caching**: [Redis 7](https://redis.io/)
- **Authentication**: JWT (Passport.js)
- **Payments**: [Stripe](https://stripe.com/)

### DevOps
- **Monorepo**: [pnpm](https://pnpm.io/) workspaces + [Turborepo](https://turbo.build/)
- **Containers**: [Docker](https://www.docker.com/)
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (Frontend) + Railway/Fly.io (Backend)

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
│       │   │   ├── auth/       # Authentication
│       │   │   ├── users/      # User management
│       │   │   ├── events/     # Event management
│       │   │   ├── donations/  # Donation processing
│       │   │   ├── programs/   # Islamic programs
│       │   │   ├── sermons/    # Sermon archive
│       │   │   └── prayer-times/  # Prayer schedules
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
- **pnpm** 9+ (`npm install -g pnpm`)
- **Docker** Desktop ([Download](https://www.docker.com/products/docker-desktop/))

### Quick Setup

#### Windows (PowerShell)
```powershell
# Clone the repository
git clone https://github.com/your-org/madinatul-uloom-core.git
cd madinatul-uloom-core

# Run setup script
.\scripts\setup.ps1
```

#### macOS/Linux (Bash)
```bash
# Clone the repository
git clone https://github.com/your-org/madinatul-uloom-core.git
cd madinatul-uloom-core

# Make setup script executable and run
chmod +x scripts/setup.sh
./scripts/setup.sh
```

#### Manual Setup
```bash
# 1. Clone and enter directory
git clone https://github.com/your-org/madinatul-uloom-core.git
cd madinatul-uloom-core

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
pnpm dev:web          # Start frontend only
pnpm dev:api          # Start backend only

# Building
pnpm build            # Build all packages
pnpm build:web        # Build frontend
pnpm build:api        # Build backend

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm format           # Format with Prettier
pnpm typecheck        # Run TypeScript checks

# Database
pnpm db:generate      # Generate Prisma client
pnpm db:push          # Push schema to database
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Prisma Studio
pnpm db:seed          # Seed database

# Testing
pnpm test             # Run all tests
pnpm test:e2e         # Run E2E tests
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

See [.env.example](.env.example) for all available variables.

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

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤲 Acknowledgments

- Built with ❤️ for the Muslim community
- Inspired by modern mosque needs and community feedback
- Thanks to all contributors and supporters

---

<div align="center">
  <p><strong>Madinatul Uloom</strong> - Empowering mosques with modern technology</p>
  <p>
    <a href="https://madinatululoom.org">Website</a> •
    <a href="mailto:dev@madinatululoom.org">Contact</a>
  </p>
</div>
