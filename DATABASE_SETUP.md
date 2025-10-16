# Database Setup Guide

## Quick Start (5 minutes)

### Step 1: Create a Neon Database

1. Go to [https://neon.tech](https://neon.tech) and sign up (it's free!)
2. Click "Create Project"
3. Name your project: `adsx-app` or `adtrail`
4. Select a region (choose one closest to you)
5. Click "Create Project"

### Step 2: Get Your Connection String

After creating the project, you'll see a connection string that looks like:

```
postgresql://username:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Copy this entire string!** You'll need it in the next step.

### Step 3: Update Your .env File

Open `.env` and replace the `DATABASE_URL` placeholder:

```bash
# Before
DATABASE_URL=postgresql://placeholder

# After (use YOUR connection string from Neon)
DATABASE_URL=postgresql://username:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Note:** The `BETTER_AUTH_SECRET` has already been generated for you!

### Step 4: Generate and Run Migrations

Now let's create the database tables:

```bash
# Generate migration files from your schema
npm run db:generate

# Apply migrations to your database
npm run db:migrate
```

You should see output showing all the tables being created:
- user, session, account, verification (auth tables)
- organization, member, invitation (multi-tenancy)
- ad_account, monitoring_job, change_event (ad monitoring)
- slack_integration, notification_rule (notifications)
- subscription, usage_record, payment (billing)

### Step 5: Verify Everything Works

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000/acme/overview](http://localhost:3000/acme/overview)

You should see the dashboard! 🎉

---

## Troubleshooting

### "Database connection string format" error

Make sure your connection string includes `?sslmode=require` at the end.

**Correct:**
```
postgresql://user:pass@host.neon.tech/db?sslmode=require
```

**Incorrect:**
```
postgresql://user:pass@host.neon.tech/db
```

### "Permission denied" on migration

Make sure you copied the **pooled connection string** from Neon, not the direct one.

### Check Database Tables

You can view your tables in the Neon console or use Drizzle Studio:

```bash
npm run db:studio
```

This opens a visual database browser at [https://local.drizzle.studio](https://local.drizzle.studio)

---

## What's Next?

Once the database is set up, you can:

1. ✅ **Test the app** - Visit the dashboard
2. 🔐 **Build auth flows** - Sign in/up pages (next todo)
3. 📊 **Add real data** - Connect ad accounts
4. 🔔 **Set up notifications** - Slack integration

---

## Database Schema Overview

### Authentication (Better Auth)
- `user` - User accounts
- `session` - Active sessions
- `account` - OAuth providers
- `verification` - Email verification tokens

### Organizations (Multi-tenancy)
- `organization` - Companies/teams
- `member` - Organization members with roles
- `invitation` - Pending invites

### Ad Monitoring
- `ad_account` - Connected Meta/Google accounts
- `monitoring_job` - Polling jobs for Google Ads
- `change_event` - Detected changes with diffs
- `api_usage_log` - Rate limiting & billing data
- `audit_log` - Security & compliance

### Notifications
- `slack_integration` - Connected Slack workspaces
- `notification_rule` - Alert rules & filters
- `notification_log` - Delivery tracking

### Billing (Stripe)
- `subscription` - Stripe subscriptions
- `usage_record` - Metered billing events
- `payment` - Payment history

---

Need help? Check the [Better Auth docs](https://www.better-auth.com/docs) or [Drizzle docs](https://orm.drizzle.team/docs/overview).
