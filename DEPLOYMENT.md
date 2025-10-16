# Deployment Guide

Complete guide for deploying AdsX to production on Vercel.

## Prerequisites

Before deploying, ensure you have:

- [ ] GitHub repository with your code
- [ ] Vercel account
- [ ] Neon Postgres database
- [ ] Meta Developer account & app
- [ ] Google Cloud project & OAuth credentials
- [ ] Stripe account with products configured
- [ ] Resend account for emails
- [ ] (Optional) PostHog account
- [ ] (Optional) Sentry account
- [ ] (Optional) Slack app for integrations

## Step 1: Set Up Database

### Create Neon Database

1. Go to [neon.tech](https://neon.tech) and create a new project
2. Copy your connection string (looks like: `postgresql://user:pass@host/dbname`)
3. Save for later as `DATABASE_URL`

### Run Migrations

```bash
# Locally, to test migrations
DATABASE_URL="your-connection-string" npm run db:migrate
```

### Create Performance Indexes

In your Neon SQL Editor, run:

```sql
-- User lookups
CREATE INDEX IF NOT EXISTS idx_user_email ON "user"(email);

-- Organization lookups
CREATE INDEX IF NOT EXISTS idx_org_slug ON organization(slug);

-- Member lookups
CREATE INDEX IF NOT EXISTS idx_member_org_user ON member(organization_id, user_id);

-- Ad account lookups
CREATE INDEX IF NOT EXISTS idx_ad_account_org ON ad_account(organization_id);
CREATE INDEX IF NOT EXISTS idx_ad_account_platform ON ad_account(platform, platform_account_id);

-- Change events (most queried)
CREATE INDEX IF NOT EXISTS idx_change_event_org_detected ON change_event(organization_id, detected_at DESC);
CREATE INDEX IF NOT EXISTS idx_change_event_platform ON change_event(platform);
CREATE INDEX IF NOT EXISTS idx_change_event_type ON change_event(change_type);

-- Notification rules
CREATE INDEX IF NOT EXISTS idx_notification_rule_org ON notification_rule(organization_id);

-- Subscriptions
CREATE INDEX IF NOT EXISTS idx_subscription_org ON subscription(organization_id);
CREATE INDEX IF NOT EXISTS idx_subscription_customer ON subscription(stripe_customer_id);
```

## Step 2: Configure OAuth Apps

### Meta Ads

1. Go to [Meta for Developers](https://developers.facebook.com)
2. Create or select your app
3. Add products:
   - Facebook Login
   - Ads Management API
4. Configure OAuth Redirect URI:
   ```
   https://yourdomain.com/api/oauth/meta/callback
   ```
5. Copy **App ID** and **App Secret**
6. Generate a random **Webhook Verify Token**:
   ```bash
   openssl rand -hex 32
   ```

### Google Ads

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable **Google Ads API**
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URI:
     ```
     https://yourdomain.com/api/oauth/google/callback
     ```
5. Copy **Client ID** and **Client Secret**
6. Apply for Google Ads API access (if not done)
7. Get your **Developer Token** from Google Ads

### Slack (Optional)

1. Go to [Slack API](https://api.slack.com/apps)
2. Create a new app
3. Add OAuth scopes:
   - `chat:write`
   - `channels:read`
   - `groups:read`
4. Configure redirect URI:
   ```
   https://yourdomain.com/api/oauth/slack/callback
   ```
5. Copy **Client ID** and **Client Secret**

## Step 3: Set Up Stripe

### Create Products

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Create 3 products with recurring pricing:

**Starter Plan**
- Price: $19/month
- Features: 3 ad accounts, 5 seats, 10K events/month

**Pro Plan**
- Price: $49/month
- Features: 10 ad accounts, unlimited seats, 50K events/month

**Agency Plan**
- Price: $149/month
- Features: 50 ad accounts, unlimited seats, 500K events/month

3. Copy each **Price ID** (starts with `price_`)

### Configure Webhook

1. Add webhook endpoint:
   ```
   https://yourdomain.com/api/webhooks/stripe
   ```

2. Select events to listen for:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `customer.subscription.trial_will_end`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `checkout.session.completed`

3. Copy **Webhook Signing Secret** (starts with `whsec_`)

## Step 4: Set Up Email

### Resend

1. Go to [Resend](https://resend.com)
2. Add and verify your domain
3. Create an API key
4. Copy API key (starts with `re_`)
5. Configure sender email: `AdsX <noreply@yourdomain.com>`

## Step 5: Configure Monitoring (Optional)

### PostHog

1. Go to [PostHog](https://posthog.com)
2. Create a project
3. Copy **Project API Key** (starts with `phc_`)

### Sentry

1. Go to [Sentry](https://sentry.io)
2. Create a new project (Next.js)
3. Copy **DSN** URL
4. Copy **Org** and **Project** slugs for source maps

## Step 6: Deploy to Vercel

### Import Project

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Add Environment Variables

Add all environment variables in Vercel dashboard:

```bash
# Database
DATABASE_URL=postgresql://...
DATABASE_AUTH_TOKEN=  # Leave empty for standard Postgres

# Auth
BETTER_AUTH_SECRET=  # Generate: openssl rand -base64 32
BETTER_AUTH_URL=https://yourdomain.com

# Meta Ads
META_APP_ID=
META_APP_SECRET=
META_WEBHOOK_VERIFY_TOKEN=

# Google Ads
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_ADS_DEVELOPER_TOKEN=

# Slack (optional)
SLACK_CLIENT_ID=
SLACK_CLIENT_SECRET=

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_AGENCY_PRICE_ID=price_...

# Email
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=AdsX <noreply@yourdomain.com>

# Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Error Tracking (optional)
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project

# App
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Deploy

1. Click **Deploy**
2. Wait for build to complete (2-3 minutes)
3. Get your production URL

## Step 7: Post-Deployment Setup

### Update OAuth Redirect URIs

Update all OAuth apps with your production URL:

**Meta**: `https://yourdomain.com/api/oauth/meta/callback`
**Google**: `https://yourdomain.com/api/oauth/google/callback`
**Slack**: `https://yourdomain.com/api/oauth/slack/callback`

### Test Webhooks

**Stripe Webhook**:
```bash
stripe listen --forward-to https://yourdomain.com/api/webhooks/stripe
stripe trigger payment_intent.succeeded
```

**Meta Webhook**:
1. Configure in Meta App Dashboard:
   - URL: `https://yourdomain.com/api/webhooks/meta`
   - Verify Token: Your `META_WEBHOOK_VERIFY_TOKEN`
2. Subscribe to:
   - `ads_insights`
   - `adaccount_update`
   - `campaign_update`

### Verify Cron Job

The Google Ads polling job should run automatically every 5 minutes. Check in:
1. Vercel Dashboard → Your Project → Cron
2. Verify job is scheduled and running

### Run Database Migrations (if needed)

```bash
# If migrations weren't run automatically
DATABASE_URL="your-production-url" npm run db:migrate
```

## Step 8: Domain Setup

### Add Custom Domain

1. In Vercel, go to Project → Settings → Domains
2. Add your custom domain: `yourdomain.com`
3. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait for SSL certificate (5-10 minutes)

### Update Environment Variables

Update these to use your custom domain:
- `BETTER_AUTH_URL=https://yourdomain.com`
- `NEXT_PUBLIC_APP_URL=https://yourdomain.com`

Redeploy to apply changes.

## Step 9: Security Checklist

Before going live:

- [ ] All API keys are production keys (not test)
- [ ] `BETTER_AUTH_SECRET` is cryptographically random
- [ ] Database has all recommended indexes
- [ ] OAuth redirect URIs point to production URL
- [ ] Stripe webhook is using production environment
- [ ] Meta webhook is verified and working
- [ ] Email sender domain is verified
- [ ] Sentry is capturing errors
- [ ] PostHog is receiving events
- [ ] Cron job is running successfully
- [ ] Rate limiting is active (test with API calls)
- [ ] HTTPS is enforced (check `Strict-Transport-Security` header)
- [ ] CSP policy doesn't block anything (check browser console)

## Step 10: Monitoring & Alerts

### Vercel

Set up alerts in Vercel:
- Deployment failures
- Function errors
- High response times

### Sentry

Configure alerts for:
- Error rate spikes
- Performance degradation
- New error types

### Uptime Monitoring

Use a service like:
- Vercel Analytics
- Better Uptime
- UptimeRobot

Set up checks for:
- Homepage: `https://yourdomain.com`
- Health check: `https://yourdomain.com/api/health` (if implemented)
- Webhook endpoints (Meta, Stripe)

## Troubleshooting

### Build Failures

**Error: Module not found**
```bash
# Clear cache and rebuild
npm run build
```

**Error: Environment variable missing**
- Check all required env vars are set in Vercel
- Redeploy after adding variables

### Database Issues

**Connection timeout**
- Check `DATABASE_URL` is correct
- Verify Neon project is active
- Check connection pooling limits

**Migration errors**
```bash
# Reset and re-run migrations
npm run db:generate
npm run db:migrate
```

### OAuth Errors

**Redirect URI mismatch**
- Verify URLs match exactly (no trailing slash)
- Check HTTPS vs HTTP

**Invalid credentials**
- Regenerate keys in platform dashboard
- Update environment variables
- Redeploy

### Webhook Failures

**Stripe webhook failing**
```bash
# Test locally
stripe listen --forward-to https://yourdomain.com/api/webhooks/stripe
stripe trigger payment_intent.succeeded
```
- Check webhook secret is correct
- Verify endpoint returns 200

**Meta webhook verification failing**
- Verify token must match exactly
- Check endpoint is accessible (not rate limited)

## Performance Optimization

### After Launch

1. **Monitor Core Web Vitals** in Vercel Analytics
2. **Run Lighthouse** audit monthly
3. **Check bundle size** - aim for <300KB initial load
4. **Monitor API response times** - aim for <500ms p95
5. **Database query performance** - use Neon's query insights

### Scaling Considerations

When you reach 1000+ organizations:

1. **Database**: Upgrade Neon tier for more connections
2. **Caching**: Add Redis for session storage
3. **Queue**: Add job queue (Inngest/BullMQ) for async tasks
4. **Rate Limiting**: Move to Redis-based rate limiting
5. **CDN**: Use Vercel Edge Network for static assets

## Support

If you encounter issues:

1. Check [SECURITY.md](./SECURITY.md) for security best practices
2. Review Vercel logs for errors
3. Check Sentry for application errors
4. Verify all environment variables are set correctly

## Next Steps

After deployment:

1. Create your first organization
2. Connect a test ad account
3. Create a notification rule
4. Test Slack integration
5. Set up billing plan
6. Invite team members
7. Monitor for 24 hours
8. Announce to users! 🎉
