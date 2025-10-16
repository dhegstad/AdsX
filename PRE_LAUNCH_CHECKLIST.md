# Pre-Launch Checklist

Complete this checklist before launching AdsX to production.

## ☑️ Pre-Deployment

### Code & Repository
- [ ] All code committed to `main` branch
- [ ] No sensitive data (API keys, passwords) in code
- [ ] `.env` is in `.gitignore`
- [ ] `README.md` is up to date
- [ ] Version number updated in `package.json`

### Database
- [ ] Production database created on Neon
- [ ] All migrations run successfully
- [ ] Performance indexes created (see `DEPLOYMENT.md`)
- [ ] Database backup strategy in place
- [ ] Connection pooling configured

### Environment Variables
- [ ] All required env vars documented in `.env.example`
- [ ] Production values ready for all services
- [ ] No test/development keys in production env vars
- [ ] Secrets generated with cryptographically secure methods

## ☑️ Service Configuration

### Meta Ads
- [ ] Meta app created and verified
- [ ] Facebook Login product added
- [ ] Ads Management API enabled
- [ ] OAuth redirect URI configured for production
- [ ] Webhook URL configured and verified
- [ ] App reviewed and approved (if required)

### Google Ads
- [ ] Google Cloud project created
- [ ] Google Ads API enabled
- [ ] OAuth credentials created
- [ ] Redirect URI configured for production
- [ ] Developer token obtained and approved
- [ ] API quota limits understood

### Slack
- [ ] Slack app created
- [ ] OAuth scopes configured correctly
- [ ] Redirect URI configured for production
- [ ] App installed to test workspace
- [ ] Posting messages tested successfully

### Stripe
- [ ] Account verified for production
- [ ] Products created (Starter, Pro, Agency)
- [ ] Prices configured with correct amounts
- [ ] Webhook endpoint configured for production
- [ ] Webhook secret saved securely
- [ ] Test mode thoroughly tested
- [ ] Switched to live mode keys

### Resend
- [ ] Domain added and verified
- [ ] DNS records (SPF, DKIM) configured
- [ ] Email sending tested successfully
- [ ] Production API key generated
- [ ] From email address configured

### PostHog
- [ ] Project created
- [ ] API key generated
- [ ] Event ingestion tested
- [ ] Key user events defined and tracking

### Sentry
- [ ] Project created for Next.js
- [ ] DSN configured
- [ ] Source maps upload configured
- [ ] Error alerts configured
- [ ] Team members invited

## ☑️ Vercel Deployment

### Project Setup
- [ ] GitHub repository connected
- [ ] Project created in Vercel
- [ ] Framework preset: Next.js
- [ ] Build settings verified
- [ ] Node.js version set (18.x or higher)

### Environment Variables
- [ ] All production env vars added to Vercel
- [ ] Sensitive variables encrypted
- [ ] URLs point to production domain
- [ ] Stripe keys are live mode (not test)
- [ ] All OAuth redirect URIs updated

### Domain Configuration
- [ ] Custom domain added to Vercel
- [ ] DNS records configured correctly
- [ ] SSL certificate issued (automatic)
- [ ] www subdomain configured
- [ ] Domain verified and active

### Deployment
- [ ] Initial deployment successful
- [ ] Build completed without errors
- [ ] No runtime errors in Function logs
- [ ] Static pages load correctly
- [ ] API routes respond correctly

## ☑️ Post-Deployment Testing

### Authentication
- [ ] Sign up flow works
- [ ] Email verification (if enabled)
- [ ] Sign in works
- [ ] Password reset works
- [ ] Session persists correctly
- [ ] Sign out works

### Organization Management
- [ ] Can create organization
- [ ] Organization slug generation works
- [ ] Organization settings update
- [ ] Can invite team members
- [ ] Member roles work correctly
- [ ] Can remove members

### Ad Account Connections
- [ ] Meta OAuth flow completes
- [ ] Meta accounts listed correctly
- [ ] Google OAuth flow completes
- [ ] Google accounts listed correctly
- [ ] Can disconnect accounts
- [ ] Subscription limits enforced

### Change Detection
- [ ] Meta webhooks receiving events
- [ ] Google Ads polling runs (check cron)
- [ ] Changes appear in activity feed
- [ ] Diff display shows correctly
- [ ] Change event detail page works
- [ ] Filtering works correctly

### Notification Rules
- [ ] Can create rules
- [ ] Rule conditions save correctly
- [ ] Can edit rules
- [ ] Can delete rules
- [ ] Rules can be toggled active/inactive
- [ ] Slack channel picker works
- [ ] Email notification works
- [ ] Slack notification works

### Billing & Subscriptions
- [ ] Checkout flow works
- [ ] Trial period starts correctly
- [ ] Subscription creation webhook received
- [ ] Plan limits enforced
- [ ] Usage tracking works
- [ ] Customer portal accessible
- [ ] Can upgrade/downgrade plans
- [ ] Can cancel subscription
- [ ] Payment failure webhook works
- [ ] Invoice emails sent

### Emails
- [ ] Welcome email sent
- [ ] Verification email sent (if enabled)
- [ ] Team invitation email sent
- [ ] Trial ending email sent
- [ ] Payment success email sent
- [ ] Payment failed email sent
- [ ] All emails display correctly
- [ ] Links in emails work

## ☑️ Performance & Monitoring

### Performance
- [ ] Lighthouse score > 90 (mobile)
- [ ] Lighthouse score > 95 (desktop)
- [ ] Core Web Vitals passing
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] API response times < 500ms (p95)
- [ ] Database queries optimized
- [ ] Images optimized (WebP/AVIF)

### Monitoring
- [ ] Sentry receiving errors
- [ ] Sentry alerts configured
- [ ] PostHog receiving events
- [ ] Vercel Analytics enabled
- [ ] Uptime monitoring configured
- [ ] Error rate alerts set
- [ ] Performance alerts set

### Security
- [ ] HTTPS enforced
- [ ] Security headers present (check devtools)
- [ ] CSP policy not blocking resources
- [ ] Rate limiting active (test with API)
- [ ] CORS configured correctly
- [ ] No sensitive data in client bundles
- [ ] Webhook signatures verified
- [ ] SQL injection prevented (ORM parameterization)

## ☑️ Documentation

### User-Facing
- [ ] Help center/docs published (if applicable)
- [ ] Terms of Service available
- [ ] Privacy Policy available
- [ ] Pricing page accurate
- [ ] FAQ published (if applicable)

### Internal
- [ ] README.md complete
- [ ] DEPLOYMENT.md reviewed
- [ ] SECURITY.md reviewed
- [ ] Environment variables documented
- [ ] Runbook for common issues created
- [ ] Incident response plan documented

## ☑️ Legal & Compliance

### Required Documents
- [ ] Terms of Service published
- [ ] Privacy Policy published
- [ ] Cookie Policy (if applicable)
- [ ] GDPR compliance (if EU users)
- [ ] CCPA compliance (if CA users)

### Business
- [ ] Company formation complete
- [ ] Business bank account set up
- [ ] Payment processing legal entity set
- [ ] Tax obligations understood
- [ ] Insurance obtained (if required)

## ☑️ Marketing & Launch

### Pre-Launch
- [ ] Landing page live
- [ ] Social media accounts created
- [ ] Email list set up
- [ ] Analytics tracking configured
- [ ] SEO basics implemented
- [ ] Meta tags set correctly

### Launch Day
- [ ] Support email monitored
- [ ] Team on standby
- [ ] Announcement prepared
- [ ] Social media posts scheduled
- [ ] Error monitoring dashboard open

## ☑️ 24-Hour Post-Launch

### Monitor These
- [ ] No critical errors in Sentry
- [ ] API response times normal
- [ ] Database performance good
- [ ] Webhook success rate > 95%
- [ ] Email delivery rate > 95%
- [ ] No user-reported blockers
- [ ] Server costs within budget

### Success Metrics
- [ ] First user signed up
- [ ] First organization created
- [ ] First ad account connected
- [ ] First notification sent
- [ ] First payment processed
- [ ] Core user flow completed end-to-end

## ☑️ Week 1 Post-Launch

### Review & Optimize
- [ ] User feedback collected
- [ ] Error trends analyzed
- [ ] Performance bottlenecks identified
- [ ] Most used features identified
- [ ] Least used features identified
- [ ] Database query optimization needed?
- [ ] Caching strategy effective?

### Communication
- [ ] Thank early users
- [ ] Send onboarding tips
- [ ] Request feedback
- [ ] Address top issues
- [ ] Plan improvements

## Notes & Issues

Use this space to track any issues found during the checklist:

```
Issue #1:
- Description:
- Severity: Critical / High / Medium / Low
- Status: Open / In Progress / Resolved
- Assigned to:

Issue #2:
...
```

## Sign-Off

- [ ] Technical Lead reviewed and approved
- [ ] Product Owner reviewed and approved
- [ ] All critical items completed
- [ ] All high priority items completed
- [ ] Go/No-Go decision: **GO** / NO-GO

**Deployment Date**: _______________

**Deployed By**: _______________

**Version**: _______________

---

🎉 **Ready to launch!** Good luck!
