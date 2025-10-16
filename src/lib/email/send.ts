import { resend, FROM_EMAIL } from "./client";
import * as templates from "./templates";

/**
 * Send email verification
 */
export async function sendVerificationEmail(
  to: string,
  name: string,
  verificationLink: string
) {
  try {
    const { subject, text } = templates.verifyEmailTemplate({
      name,
      verificationLink,
    });

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      text,
    });

    if (error) {
      console.error("Failed to send verification email:", error);
      return { success: false, error };
    }

    console.log(`Verification email sent to ${to}`);
    return { success: true, data };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, error };
  }
}

/**
 * Send welcome email after verification
 */
export async function sendWelcomeEmail(
  to: string,
  name: string,
  dashboardLink: string
) {
  try {
    const { subject, text } = templates.welcomeEmailTemplate({
      name,
      dashboardLink,
    });

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      text,
    });

    if (error) {
      console.error("Failed to send welcome email:", error);
      return { success: false, error };
    }

    console.log(`Welcome email sent to ${to}`);
    return { success: true, data };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, error };
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  to: string,
  name: string,
  resetLink: string
) {
  try {
    const { subject, text } = templates.passwordResetTemplate({
      name,
      resetLink,
    });

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      text,
    });

    if (error) {
      console.error("Failed to send password reset email:", error);
      return { success: false, error };
    }

    console.log(`Password reset email sent to ${to}`);
    return { success: true, data };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return { success: false, error };
  }
}

/**
 * Send trial ending soon email
 */
export async function sendTrialEndingSoonEmail(
  to: string,
  name: string,
  daysRemaining: number,
  billingLink: string
) {
  try {
    const { subject, text } = templates.trialEndingSoonTemplate({
      name,
      daysRemaining,
      billingLink,
    });

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      text,
    });

    if (error) {
      console.error("Failed to send trial ending email:", error);
      return { success: false, error };
    }

    console.log(`Trial ending email sent to ${to}`);
    return { success: true, data };
  } catch (error) {
    console.error("Error sending trial ending email:", error);
    return { success: false, error };
  }
}

/**
 * Send payment success email
 */
export async function sendPaymentSuccessEmail(
  to: string,
  name: string,
  amount: number,
  plan: string,
  receiptLink?: string
) {
  try {
    const { subject, text } = templates.paymentSuccessTemplate({
      name,
      amount,
      plan,
      receiptLink,
    });

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      text,
    });

    if (error) {
      console.error("Failed to send payment success email:", error);
      return { success: false, error };
    }

    console.log(`Payment success email sent to ${to}`);
    return { success: true, data };
  } catch (error) {
    console.error("Error sending payment success email:", error);
    return { success: false, error };
  }
}

/**
 * Send payment failed email
 */
export async function sendPaymentFailedEmail(
  to: string,
  name: string,
  plan: string,
  billingLink: string
) {
  try {
    const { subject, text } = templates.paymentFailedTemplate({
      name,
      plan,
      billingLink,
    });

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      text,
    });

    if (error) {
      console.error("Failed to send payment failed email:", error);
      return { success: false, error };
    }

    console.log(`Payment failed email sent to ${to}`);
    return { success: true, data };
  } catch (error) {
    console.error("Error sending payment failed email:", error);
    return { success: false, error };
  }
}

/**
 * Send team invitation email
 */
export async function sendTeamInviteEmail(
  to: string,
  inviterName: string,
  organizationName: string,
  inviteLink: string
) {
  try {
    const { subject, text } = templates.teamInviteTemplate({
      inviterName,
      organizationName,
      inviteLink,
    });

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      text,
    });

    if (error) {
      console.error("Failed to send team invite email:", error);
      return { success: false, error };
    }

    console.log(`Team invite email sent to ${to}`);
    return { success: true, data };
  } catch (error) {
    console.error("Error sending team invite email:", error);
    return { success: false, error };
  }
}

/**
 * Send critical change alert email
 */
export async function sendCriticalChangeAlertEmail(
  to: string,
  name: string,
  changeType: string,
  resourceName: string,
  accountName: string,
  details: string,
  viewLink: string
) {
  try {
    const { subject, text } = templates.criticalChangeAlertTemplate({
      name,
      changeType,
      resourceName,
      accountName,
      details,
      viewLink,
    });

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      text,
    });

    if (error) {
      console.error("Failed to send critical change alert email:", error);
      return { success: false, error };
    }

    console.log(`Critical change alert sent to ${to}`);
    return { success: true, data };
  } catch (error) {
    console.error("Error sending critical change alert email:", error);
    return { success: false, error };
  }
}
