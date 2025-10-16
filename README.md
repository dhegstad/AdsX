# AdsX - Ad Account Change Monitoring Platform

🚀 **Production-Ready** SaaS platform for monitoring Meta and Google Ads account changes with real-time Slack and email notifications.

## ✨ Features

- 🔗 **Multi-Platform Integration** - Connect Meta Ads and Google Ads accounts via OAuth
- 🔔 **Real-time Notifications** - Get instant alerts on Slack or email for critical changes
- 📊 **Activity Feed** - Track all changes with detailed before/after diff views
- 🎯 **Custom Rules** - Create notification rules based on change types, platforms, and conditions
- 👥 **Team Management** - Invite members with role-based access control (Owner/Admin/Member)
- 💳 **Subscription Billing** - Stripe-powered billing with Trial, Starter, Pro, and Agency plans
- 📈 **Analytics & Monitoring** - PostHog for analytics, Sentry for error tracking
- 🔒 **Enterprise Security** - Rate limiting, CSRF protection, comprehensive security headers
- ⚡ **High Performance** - Optimized caching, database queries, and bundle size

## 🎨 Design

Built with a premium Vercel-inspired aesthetic:
- **Typography**: Geist Sans & Geist Mono
- **Colors**: Pure black & white with accent colors
- **UI**: shadcn/ui components with custom theming
- **Style**: Agency-grade design ($400k feel)

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript, Turbopack)
- **UI**: shadcn/ui, Tailwind CSS, Radix UI
- **Database**: Neon PostgreSQL (serverless)
- **ORM**: Drizzle ORM
- **Auth**: Better Auth (with organizations)
- **Monitoring**: PostHog (analytics), Sentry (errors)
- **Email**: Resend
- **Payments**: Stripe
- **Hosting**: Vercel

## 📦 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

Follow the guide in [DATABASE_SETUP.md](./DATABASE_SETUP.md)

**TL;DR:**
1. Create a free database at [neon.tech](https://neon.tech)
2. Copy the connection string to `.env`
3. Run migrations: `npm run db:generate && npm run db:migrate`

### 3. Start Development

```bash
npm run dev
```

Visit [http://localhost:3000/acme/overview](http://localhost:3000/acme/overview)

## 📁 Project Structure

```
src/
├── app/
│   ├── (dashboard)/[orgSlug]/     # Organization-scoped routes
│   │   ├── overview/              # Dashboard home
│   │   ├── activity/              # Change feed (TODO)
│   │   ├── ad-accounts/           # Connect accounts (TODO)
│   │   ├── rules/                 # Notification rules (TODO)
│   │   ├── integrations/          # Slack, webhooks (TODO)
│   │   └── settings/              # Settings (TODO)
│   └── api/
│       └── auth/[...all]/         # Better Auth endpoints
│
├── components/
│   ├── ui/                        # shadcn/ui components
│   ├── layout/                    # Sidebar, nav, user menu
│   └── dashboard/                 # Dashboard-specific components
│
├── lib/
│   ├── auth/                      # Better Auth config
│   ├── db/                        # Drizzle ORM + schemas
│   │   ├── schema/
│   │   │   ├── auth.ts           # User, session, organization
│   │   │   ├── ad-accounts.ts    # Ad monitoring tables
│   │   │   ├── notifications.ts  # Slack, rules
│   │   │   └── billing.ts        # Stripe subscriptions
│   │   └── client.ts             # Database client
│   └── utils.ts                   # Shared utilities
│
└── styles/
    └── globals.css                # Global styles + theme
```

## 🗄️ Database Schema

### Authentication (Better Auth)
- `user` - User accounts
- `session` - Active sessions
- `account` - OAuth providers
- `verification` - Email verification
- `organization` - Companies/workspaces
- `member` - Org members with roles
- `invitation` - Pending invites

### Ad Monitoring
- `ad_account` - Connected Meta/Google accounts
- `monitoring_job` - Polling jobs
- `change_event` - Detected changes
- `api_usage_log` - Rate limiting
- `audit_log` - Security logs

### Notifications
- `slack_integration` - Slack workspaces
- `notification_rule` - Alert rules
- `notification_log` - Delivery tracking

### Billing
- `subscription` - Stripe subscriptions
- `usage_record` - Metered billing
- `payment` - Payment history

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server (Turbopack)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run db:generate      # Generate migrations
npm run db:migrate       # Run migrations
npm run db:studio        # Open Drizzle Studio
```

## 🔐 Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
# Database
DATABASE_URL=              # Neon connection string

# Better Auth
BETTER_AUTH_SECRET=        # Auto-generated (see .env)
BETTER_AUTH_URL=           # http://localhost:3000

# OAuth (optional for now)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Services (set up later)
STRIPE_SECRET_KEY=
RESEND_API_KEY=
POSTHOG_KEY=
SENTRY_DSN=

# Ad Platforms (set up later)
META_APP_ID=
META_APP_SECRET=
GOOGLE_ADS_DEVELOPER_TOKEN=
```

## 🎯 Development Status

### ✅ Phase 1: Foundation (Complete)
- [x] Next.js 15 setup with App Router
- [x] Design system (Vercel-inspired theme)
- [x] Database schema with Drizzle ORM
- [x] Better Auth with organizations
- [x] Dashboard layout with sidebar

### ✅ Phase 2: Core Features (Complete)
- [x] Authentication flows (sign in/sign up/onboarding)
- [x] Organization management
- [x] Ad account connections (Meta & Google OAuth)
- [x] Change detection engine with diff algorithm
- [x] Activity feed with real-time updates
- [x] Change event detail views

### ✅ Phase 3: Notifications (Complete)
- [x] Slack OAuth integration
- [x] Notification rules engine
- [x] Visual rule builder with conditions
- [x] Email notifications via Resend
- [x] Team member invitations

### ✅ Phase 4: Billing (Complete)
- [x] Stripe integration with webhooks
- [x] Subscription plans (Trial/Starter/Pro/Agency)
- [x] Usage metering and tracking
- [x] Customer portal
- [x] Subscription limits enforcement

### ✅ Phase 5: Production (Complete)
- [x] PostHog analytics with event tracking
- [x] Sentry error tracking with source maps
- [x] Email templates with SaaS copywriting
- [x] Performance optimization (caching, DB queries)
- [x] Security hardening (rate limiting, headers, CSRF)
- [x] Error boundaries and loading states
- [x] Empty states with helpful CTAs

### 🚀 Ready for Deployment!

## 🏗️ Architecture Decisions

### Why Better Auth?
- Organization plugin for native multi-tenancy
- Type-safe with TypeScript
- Drizzle integration
- Flexible role-based access

### Why Drizzle ORM?
- Type-safety without code generation
- SQL-like syntax (readable)
- Excellent Neon integration
- Lightweight & fast

### Why Neon?
- Serverless PostgreSQL
- Instant provisioning
- Generous free tier
- Branch databases for previews

### Why shadcn/ui?
- Copy-paste components (full control)
- Radix UI primitives (accessible)
- Tailwind styling (customizable)
- No runtime overhead

## 📝 Development Guidelines

### Code Style
- Use TypeScript strict mode
- Follow ESLint rules
- Prefer functional components
- Use server components by default

### File Naming
- Components: `PascalCase.tsx`
- Utilities: `kebab-case.ts`
- Routes: Next.js conventions

### Git Workflow
- Meaningful commit messages
- Feature branches
- Pull requests for review

## 🤝 Contributing

This is a private project, but contributions from team members are welcome!

## 📄 License

Proprietary - All rights reserved

---

Built with precision and care. 🎨✨
