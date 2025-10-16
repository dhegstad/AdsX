# Quick Start Guide

Get AdsX running locally in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- A Neon Postgres database (free tier is fine)

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Run the setup script:

```bash
chmod +x scripts/setup-env.sh
./scripts/setup-env.sh
```

This will:
- Create `.env` from `.env.example`
- Generate secure secrets
- Guide you through entering your database URL

**Or manually create `.env`**:

```bash
cp .env.example .env
```

Then edit `.env` and add at minimum:

```bash
# Required for local development
DATABASE_URL="postgresql://user:pass@your-neon-url/dbname"
BETTER_AUTH_SECRET="generate-with-openssl-rand-base64-32"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Run Database Migrations

```bash
npm run db:migrate
```

This creates all tables in your database.

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Next Steps

### Create Your First Account

1. Click "Sign Up"
2. Create an account with email/password
3. Complete onboarding by creating an organization

### Optional: Configure Integrations

To test integrations locally, add these to `.env`:

**Meta Ads** (optional):
```bash
META_APP_ID="your-app-id"
META_APP_SECRET="your-app-secret"
META_WEBHOOK_VERIFY_TOKEN="any-random-string"
```

**Google Ads** (optional):
```bash
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
GOOGLE_ADS_DEVELOPER_TOKEN="your-dev-token"
```

**Stripe** (test mode):
```bash
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..." # from Stripe CLI
NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID="price_..."
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID="price_..."
NEXT_PUBLIC_STRIPE_AGENCY_PRICE_ID="price_..."
```

**Email** (optional):
```bash
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="AdsX <noreply@yourdomain.com>"
```

Restart dev server after adding variables.

## Testing Webhooks Locally

### Stripe Webhooks

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# In another terminal, trigger test events
stripe trigger payment_intent.succeeded
```

### Meta Webhooks

Use a tunnel service like ngrok:

```bash
# Install ngrok
brew install ngrok

# Start tunnel
ngrok http 3000

# Use the HTTPS URL in Meta webhook configuration
# Example: https://abc123.ngrok.io/api/webhooks/meta
```

## Common Issues

### Database Connection Fails

- Check `DATABASE_URL` is correct
- Ensure Neon project is active (free tier may sleep)
- Verify your IP is allowed (Neon allows all by default)

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Try building again
npm run build
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Or use a different port
PORT=3001 npm run dev
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run db:generate  # Generate new migration
npm run db:migrate   # Run migrations
npm run db:studio    # Open Drizzle Studio (database UI)
npm run lint         # Run ESLint
```

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Public auth pages
│   ├── (dashboard)/         # Protected dashboard
│   └── api/                 # API routes & webhooks
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── activity/            # Activity feed
│   ├── connections/         # Ad account connections
│   └── rules/               # Notification rules
└── lib/                     # Core logic
    ├── actions/             # Server actions
    ├── db/                  # Database & schema
    ├── auth/                # Better Auth config
    ├── stripe/              # Stripe integration
    └── email/               # Email templates
```

## What's Next?

- **Production deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Security best practices**: See [SECURITY.md](./SECURITY.md)
- **Full feature documentation**: See [README.md](./README.md)

## Getting Help

- Check the [README.md](./README.md) for detailed docs
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
- Check [SECURITY.md](./SECURITY.md) for security info

Happy coding! 🚀
