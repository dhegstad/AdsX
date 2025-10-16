"use server";

import { db } from "@/lib/db/client";
import { subscription, payment, organization } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { stripe } from "@/lib/stripe/client";
import { getPlan } from "@/lib/stripe/plans";
import type { PlanType } from "@/lib/stripe/plans";

/**
 * Get subscription for an organization
 */
export async function getSubscription(organizationId: string) {
  try {
    const [sub] = await db
      .select()
      .from(subscription)
      .where(eq(subscription.organizationId, organizationId))
      .limit(1);

    return { success: true, subscription: sub || null };
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return { success: false, subscription: null };
  }
}

/**
 * Create Stripe checkout session for subscription
 */
export async function createCheckoutSession(data: {
  organizationId: string;
  planId: PlanType;
  successUrl: string;
  cancelUrl: string;
}) {
  try {
    // Get organization
    const [org] = await db
      .select()
      .from(organization)
      .where(eq(organization.id, data.organizationId))
      .limit(1);

    if (!org) {
      return { success: false, error: "Organization not found" };
    }

    // Get plan details
    const plan = getPlan(data.planId);

    if (!plan.stripePriceId) {
      return { success: false, error: "Invalid plan selected" };
    }

    // Check if organization already has a Stripe customer
    const [existingSub] = await db
      .select()
      .from(subscription)
      .where(eq(subscription.organizationId, data.organizationId))
      .limit(1);

    let customerId: string | undefined;

    if (existingSub?.stripeCustomerId) {
      customerId = existingSub.stripeCustomerId;
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : org.name, // Use org name as placeholder
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: data.successUrl,
      cancel_url: data.cancelUrl,
      subscription_data: {
        trial_period_days: 14, // 14-day free trial
        metadata: {
          organizationId: data.organizationId,
        },
      },
      metadata: {
        organizationId: data.organizationId,
        planId: data.planId,
      },
    });

    // If new customer, create subscription record
    if (!existingSub && session.customer) {
      await db.insert(subscription).values({
        organizationId: data.organizationId,
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: session.subscription as string,
        stripePriceId: plan.stripePriceId,
        stripeCurrentPeriodEnd: null,
        plan: data.planId,
        status: "trialing",
        maxAdAccounts: plan.limits.maxAdAccounts,
        maxSeats: plan.limits.maxSeats,
        maxChangeEventsPerMonth: plan.limits.maxChangeEventsPerMonth,
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      });
    }

    return { success: true, url: session.url };
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Create customer portal session for managing subscription
 */
export async function createPortalSession(data: {
  organizationId: string;
  returnUrl: string;
}) {
  try {
    // Get subscription
    const [sub] = await db
      .select()
      .from(subscription)
      .where(eq(subscription.organizationId, data.organizationId))
      .limit(1);

    if (!sub || !sub.stripeCustomerId) {
      return { success: false, error: "No active subscription found" };
    }

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: sub.stripeCustomerId,
      return_url: data.returnUrl,
    });

    return { success: true, url: session.url };
  } catch (error: any) {
    console.error("Error creating portal session:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Cancel subscription at period end
 */
export async function cancelSubscription(organizationId: string) {
  try {
    // Get subscription
    const [sub] = await db
      .select()
      .from(subscription)
      .where(eq(subscription.organizationId, organizationId))
      .limit(1);

    if (!sub || !sub.stripeSubscriptionId) {
      return { success: false, error: "No active subscription found" };
    }

    // Cancel at period end
    await stripe.subscriptions.update(sub.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    // Update database
    await db
      .update(subscription)
      .set({
        cancelAtPeriodEnd: true,
        updatedAt: new Date(),
      })
      .where(eq(subscription.id, sub.id));

    return { success: true };
  } catch (error: any) {
    console.error("Error canceling subscription:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Reactivate canceled subscription
 */
export async function reactivateSubscription(organizationId: string) {
  try {
    // Get subscription
    const [sub] = await db
      .select()
      .from(subscription)
      .where(eq(subscription.organizationId, organizationId))
      .limit(1);

    if (!sub || !sub.stripeSubscriptionId) {
      return { success: false, error: "No subscription found" };
    }

    // Remove cancellation
    await stripe.subscriptions.update(sub.stripeSubscriptionId, {
      cancel_at_period_end: false,
    });

    // Update database
    await db
      .update(subscription)
      .set({
        cancelAtPeriodEnd: false,
        updatedAt: new Date(),
      })
      .where(eq(subscription.id, sub.id));

    return { success: true };
  } catch (error: any) {
    console.error("Error reactivating subscription:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Get payment history for an organization
 */
export async function getPaymentHistory(organizationId: string) {
  try {
    const payments = await db
      .select()
      .from(payment)
      .where(eq(payment.organizationId, organizationId))
      .orderBy(payment.createdAt);

    return { success: true, payments };
  } catch (error) {
    console.error("Error fetching payment history:", error);
    return { success: false, payments: [] };
  }
}

/**
 * Change subscription plan
 */
export async function changeSubscriptionPlan(data: {
  organizationId: string;
  newPlanId: PlanType;
}) {
  try {
    // Get current subscription
    const [sub] = await db
      .select()
      .from(subscription)
      .where(eq(subscription.organizationId, data.organizationId))
      .limit(1);

    if (!sub || !sub.stripeSubscriptionId) {
      return { success: false, error: "No active subscription found" };
    }

    const newPlan = getPlan(data.newPlanId);

    if (!newPlan.stripePriceId) {
      return { success: false, error: "Invalid plan selected" };
    }

    // Update subscription in Stripe
    const stripeSubscription = await stripe.subscriptions.retrieve(
      sub.stripeSubscriptionId
    );

    await stripe.subscriptions.update(sub.stripeSubscriptionId, {
      items: [
        {
          id: stripeSubscription.items.data[0].id,
          price: newPlan.stripePriceId,
        },
      ],
      proration_behavior: "create_prorations",
    });

    // Update database
    await db
      .update(subscription)
      .set({
        plan: data.newPlanId,
        stripePriceId: newPlan.stripePriceId,
        maxAdAccounts: newPlan.limits.maxAdAccounts,
        maxSeats: newPlan.limits.maxSeats,
        maxChangeEventsPerMonth: newPlan.limits.maxChangeEventsPerMonth,
        updatedAt: new Date(),
      })
      .where(eq(subscription.id, sub.id));

    return { success: true };
  } catch (error: any) {
    console.error("Error changing subscription plan:", error);
    return { success: false, error: error.message };
  }
}
