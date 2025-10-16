/**
 * Email templates with professional SaaS copywriting
 * All templates are plain text for better deliverability and personal feel
 */

interface VerifyEmailParams {
  name: string;
  verificationLink: string;
}

export function verifyEmailTemplate({ name, verificationLink }: VerifyEmailParams) {
  return {
    subject: "Verify your email to get started with AdsX",
    text: `Hi ${name},

Thanks for signing up for AdsX! You're one step away from gaining complete visibility into your ad account changes.

Click the link below to verify your email and unlock your account:

${verificationLink}

This link expires in 24 hours for security reasons.

Once verified, you'll be able to:
→ Connect your Meta and Google Ads accounts
→ Get real-time alerts on campaign changes
→ Set up custom notification rules
→ Invite your team members

Need help? Just reply to this email—we're here to help.

Best,
The AdsX Team

---

If you didn't create an AdsX account, you can safely ignore this email.`,
  };
}

interface WelcomeEmailParams {
  name: string;
  dashboardLink: string;
}

export function welcomeEmailTemplate({ name, dashboardLink }: WelcomeEmailParams) {
  return {
    subject: "Welcome to AdsX! Here's how to get started",
    text: `Hi ${name},

Your email is verified! Welcome to AdsX.

You now have access to the most powerful ad monitoring platform built for performance marketers who can't afford to miss a change.

Here's what to do next:

1. Connect your first ad account
   Link your Meta or Google Ads account in 2 clicks. We'll start monitoring immediately.

2. Set up your first alert rule
   Get notified on Slack or email when budgets change, campaigns pause, or anything else happens.

3. Invite your team
   Collaboration is better. Add teammates so everyone stays informed.

→ Get started now: ${dashboardLink}

Pro tip: Most teams set up budget change alerts first. They catch mistakes before they become expensive.

Questions? Reply to this email or check out our help center.

Cheers,
The AdsX Team

P.S. Your 14-day trial includes everything. No credit card required.`,
  };
}

interface PasswordResetParams {
  name: string;
  resetLink: string;
}

export function passwordResetTemplate({ name, resetLink }: PasswordResetParams) {
  return {
    subject: "Reset your AdsX password",
    text: `Hi ${name},

We received a request to reset your password for your AdsX account.

Click here to choose a new password:

${resetLink}

This link expires in 1 hour for security.

If you didn't request this password reset, no worries—your account is still secure. You can safely ignore this email.

Need help? Just reply and we'll sort it out.

Best,
The AdsX Team`,
  };
}

interface TrialEndingSoonParams {
  name: string;
  daysRemaining: number;
  billingLink: string;
}

export function trialEndingSoonTemplate({
  name,
  daysRemaining,
  billingLink,
}: TrialEndingSoonParams) {
  return {
    subject: `Your AdsX trial ends in ${daysRemaining} days`,
    text: `Hi ${name},

Just a friendly heads up: your AdsX trial ends in ${daysRemaining} days.

Here's what happens next:

→ Your trial ends on [date]
→ After that, you'll need a paid plan to keep monitoring your ad accounts
→ All your data, rules, and integrations stay safe

Want to keep the peace of mind that comes from never missing an ad change?

Choose a plan: ${billingLink}

Our most popular plan is Pro at $49/month. It includes:
• Up to 10 ad accounts
• Unlimited team members
• 50,000 change events per month
• Slack & email notifications
• Priority support

Questions about which plan is right for you? Reply to this email—I'm happy to help you choose.

Cheers,
The AdsX Team

P.S. If you're not ready yet, that's okay! Your account will be paused after the trial, but your data will be safe for 30 days if you want to come back.`,
  };
}

interface PaymentSuccessParams {
  name: string;
  amount: number;
  plan: string;
  receiptLink?: string;
}

export function paymentSuccessTemplate({
  name,
  amount,
  plan,
  receiptLink,
}: PaymentSuccessParams) {
  const amountFormatted = (amount / 100).toFixed(2);
  const receiptText = receiptLink
    ? `\nView your receipt: ${receiptLink}`
    : "";

  return {
    subject: "Payment received—you're all set",
    text: `Hi ${name},

Thanks for your payment! Your ${plan} plan is active and ready to go.

Payment details:
• Amount: $${amountFormatted}
• Plan: ${plan}
• Status: Paid${receiptText}

Your subscription will automatically renew next month. You can update your payment method or cancel anytime from your billing settings.

As always, if you have any questions, just reply to this email.

Best,
The AdsX Team

---

Questions about your subscription? Visit your billing settings or reply to this email.`,
  };
}

interface PaymentFailedParams {
  name: string;
  plan: string;
  billingLink: string;
}

export function paymentFailedTemplate({
  name,
  plan,
  billingLink,
}: PaymentFailedParams) {
  return {
    subject: "Action required: Payment failed",
    text: `Hi ${name},

We tried to charge your card for your ${plan} subscription, but the payment didn't go through.

This happens sometimes—cards expire, banks flag transactions, limits are reached. No worries, it's usually a quick fix.

→ Update your payment method: ${billingLink}

Your account is still active for now, but we'll need to receive payment within 7 days to keep your service running.

Why this matters:
• Your ad monitoring will stop if payment isn't updated
• You'll miss critical changes to your campaigns
• Your team will lose access to notifications

Update your payment method now and we'll retry the charge immediately.

Need help? Reply to this email and we'll sort it out together.

Best,
The AdsX Team

P.S. If you're experiencing issues or need to discuss your plan, I'm here to help. Just reply.`,
  };
}

interface TeamInviteParams {
  inviterName: string;
  organizationName: string;
  inviteLink: string;
}

export function teamInviteTemplate({
  inviterName,
  organizationName,
  inviteLink,
}: TeamInviteParams) {
  return {
    subject: `${inviterName} invited you to join ${organizationName} on AdsX`,
    text: `Hi there,

${inviterName} has invited you to join "${organizationName}" on AdsX.

AdsX helps marketing teams monitor their ad accounts and get instant alerts when campaigns change. Never miss a budget increase, paused campaign, or targeting update again.

Accept your invitation: ${inviteLink}

Once you join, you'll be able to:
→ See all ad account changes in real-time
→ Get notifications for important events
→ Collaborate with your team on monitoring rules
→ Keep everyone in sync

This invitation expires in 7 days.

See you inside,
The AdsX Team

---

If you're not sure why you received this, reply and we'll sort it out.`,
  };
}

interface CriticalChangeAlertParams {
  name: string;
  changeType: string;
  resourceName: string;
  accountName: string;
  details: string;
  viewLink: string;
}

export function criticalChangeAlertTemplate({
  name,
  changeType,
  resourceName,
  accountName,
  details,
  viewLink,
}: CriticalChangeAlertParams) {
  return {
    subject: `[ALERT] ${changeType} detected: ${resourceName}`,
    text: `Hi ${name},

We detected a critical change in your ad account that needs your attention.

What changed:
• ${changeType}
• Campaign: ${resourceName}
• Account: ${accountName}

${details}

→ View full details: ${viewLink}

This alert was triggered by one of your notification rules. If this was expected, great! If not, you can review and update the change immediately.

Why you're seeing this:
Your team set up rules to catch important changes like this. These alerts help prevent budget overruns, catch mistakes early, and keep everyone informed.

Questions? Reply to this email.

Best,
The AdsX Team

---

To adjust your notification preferences, visit your rules settings.`,
  };
}
