# Security & Performance

This document outlines the security measures and performance optimizations implemented in AdsX.

## Security Measures

### 1. HTTP Security Headers

All responses include comprehensive security headers via middleware:

- **Content Security Policy (CSP)**: Prevents XSS and data injection attacks
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-XSS-Protection**: Enables browser XSS filtering
- **Strict-Transport-Security**: Forces HTTPS in production
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts browser features

### 2. Rate Limiting

API routes are protected with rate limiting:

- **General API routes**: 200 requests per minute per IP
- **Webhook/OAuth endpoints**: 100 requests per minute per IP
- Implemented in edge middleware for low latency

### 3. CSRF Protection

- Better Auth provides built-in CSRF protection
- SameSite cookies enabled
- Origin validation on all mutations
- Additional validation utilities available in `/src/lib/security/csrf.ts`

### 4. Authentication & Authorization

- Better Auth with secure session management
- Role-based access control (Owner, Admin, Member)
- Organization-level data isolation
- Secure password hashing with bcrypt

### 5. Data Protection

- Environment variables for sensitive data
- No secrets in client-side code
- Stripe integration uses secure webhooks
- OAuth tokens encrypted at rest

### 6. Error Handling

- Sentry integration for error tracking
- Errors logged without exposing sensitive data
- User-friendly error messages (no stack traces to users)
- Global error boundaries

## Performance Optimizations

### 1. Caching Strategy

**Static Assets**:
- 1-year cache with immutable flag
- Automatic versioning via Next.js

**Pages**:
- 60-second cache with stale-while-revalidate
- Incremental Static Regeneration (ISR)

**API Responses**:
- Cached with `unstable_cache` for expensive queries
- Cache invalidation via tags
- See `/src/lib/cache/index.ts` for utilities

### 2. Database Optimization

**Connection Pooling**:
- Neon Serverless Postgres with automatic pooling
- Min connections: 0 (serverless)
- Max connections: 10 per instance

**Query Optimization**:
- Prepared statements (automatic with Drizzle)
- Indexed columns for common queries
- Pagination limits (max 100 items)
- Query batching with `Promise.all`
- Utilities in `/src/lib/db/optimization.ts`

**Recommended Indexes**:
```sql
-- User lookups
CREATE INDEX idx_user_email ON user(email);

-- Organization lookups
CREATE INDEX idx_org_slug ON organization(slug);

-- Member lookups
CREATE INDEX idx_member_org_user ON member(organization_id, user_id);

-- Ad account lookups
CREATE INDEX idx_ad_account_org ON ad_account(organization_id);
CREATE INDEX idx_ad_account_platform ON ad_account(platform, platform_account_id);

-- Change events
CREATE INDEX idx_change_event_org_detected ON change_event(organization_id, detected_at DESC);
CREATE INDEX idx_change_event_platform ON change_event(platform);
CREATE INDEX idx_change_event_type ON change_event(change_type);

-- Notification rules
CREATE INDEX idx_notification_rule_org ON notification_rule(organization_id);
```

### 3. Image Optimization

- Next.js Image component with automatic optimization
- AVIF and WebP format support
- Responsive image sizes
- Lazy loading by default
- 60-second minimum cache TTL

### 4. Font Optimization

- Geist font family self-hosted
- Variable fonts for smaller payload
- Font display: swap for faster rendering
- Preloaded via Next.js font system

### 5. Bundle Optimization

- Package import optimization for lucide-react and Radix UI
- Tree-shaking enabled
- Code splitting via dynamic imports
- Gzip/Brotli compression enabled

### 6. Monitoring

**Analytics**:
- PostHog for product analytics
- Privacy-focused tracking
- Custom event tracking for key actions

**Error Tracking**:
- Sentry for client and server errors
- Source maps for better debugging
- Performance monitoring
- Session replay for debugging

## Environment Variables

Required environment variables for security:

```bash
# Database
DATABASE_URL=                    # Neon Postgres connection string
DATABASE_AUTH_TOKEN=             # Neon auth token

# Auth
BETTER_AUTH_SECRET=              # Random 32+ char secret
BETTER_AUTH_URL=                 # App URL

# OAuth
META_APP_ID=                     # Meta app ID
META_APP_SECRET=                 # Meta app secret (keep secret!)
GOOGLE_CLIENT_ID=                # Google client ID
GOOGLE_CLIENT_SECRET=            # Google client secret (keep secret!)
SLACK_CLIENT_ID=                 # Slack client ID
SLACK_CLIENT_SECRET=             # Slack client secret (keep secret!)

# Services
STRIPE_SECRET_KEY=               # Stripe secret key (keep secret!)
STRIPE_WEBHOOK_SECRET=           # Stripe webhook secret (keep secret!)
RESEND_API_KEY=                  # Resend API key (keep secret!)

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=          # Sentry DSN
NEXT_PUBLIC_POSTHOG_KEY=         # PostHog project key

# APIs
META_WEBHOOK_VERIFY_TOKEN=       # Random secret for webhook verification
GOOGLE_ADS_DEVELOPER_TOKEN=      # Google Ads developer token
```

## Security Checklist

Before deploying to production:

- [ ] All environment variables set
- [ ] HTTPS enabled
- [ ] Database connection pooling configured
- [ ] Rate limiting tested
- [ ] Error tracking (Sentry) configured
- [ ] CSP policy tested with browser console
- [ ] OAuth redirect URIs whitelisted
- [ ] Webhook endpoints secured
- [ ] Secret keys rotated
- [ ] Backup strategy in place
- [ ] Monitoring alerts configured

## Performance Checklist

Before deploying to production:

- [ ] Database indexes created
- [ ] Cache strategy implemented
- [ ] Image optimization verified
- [ ] Bundle size analyzed
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals passing
- [ ] API response times < 500ms
- [ ] Database queries optimized

## Reporting Security Issues

If you discover a security vulnerability, please email security@adsx.app instead of using the issue tracker.
