import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe/client";
import { db } from "@/lib/db/client";
import { subscription, payment, organization, user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getPlan } from "@/lib/stripe/plans";
import {
  sendPaymentSuccessEmail,
  sendPaymentFailedEmail,
  sendTrialEndingSoonEmail,
} from "@/lib/email/send";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

if (!WEBHOOK_SECRET) {
  throw new Error("STRIPE_WEBHOOK_SECRET is not set in environment variables");
}

/**
 * Stripe webhook handler
 * Processes subscription lifecycle events from Stripe
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    console.error("No stripe-signature header found");
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log(`Received Stripe event: ${event.type}`);

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case "customer.subscription.trial_will_end":
        await handleTrialWillEnd(event.data.object as Stripe.Subscription);
        break;

      case "invoice.payment_succeeded":
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case "invoice.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`Error processing webhook: ${error}`);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

/**
 * Handle subscription creation or update
 */
async function handleSubscriptionUpdated(stripeSubscription: Stripe.Subscription) {
  console.log(`Processing subscription update: ${stripeSubscription.id}`);

  const customerId = stripeSubscription.customer as string;
  const subscriptionId = stripeSubscription.id;
  const priceId = stripeSubscription.items.data[0]?.price.id;
  const productId = stripeSubscription.items.data[0]?.price.product as string;

  // Determine plan based on price ID
  let planType: "trial" | "starter" | "pro" | "agency" = "trial";
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID) {
    planType = "starter";
  } else if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID) {
    planType = "pro";
  } else if (priceId === process.env.NEXT_PUBLIC_STRIPE_AGENCY_PRICE_ID) {
    planType = "agency";
  }

  const plan = getPlan(planType);

  // Find existing subscription by customer ID
  const [existingSub] = await db
    .select()
    .from(subscription)
    .where(eq(subscription.stripeCustomerId, customerId))
    .limit(1);

  const subscriptionData = {
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscriptionId,
    stripePriceId: priceId || "",
    stripeCurrentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
    plan: planType,
    status: stripeSubscription.status,
    maxAdAccounts: plan.limits.maxAdAccounts,
    maxSeats: plan.limits.maxSeats,
    maxChangeEventsPerMonth: plan.limits.maxChangeEventsPerMonth,
    cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
    canceledAt: stripeSubscription.canceled_at
      ? new Date(stripeSubscription.canceled_at * 1000)
      : null,
    trialEndsAt: stripeSubscription.trial_end
      ? new Date(stripeSubscription.trial_end * 1000)
      : null,
    updatedAt: new Date(),
  };

  if (existingSub) {
    // Update existing subscription
    await db
      .update(subscription)
      .set(subscriptionData)
      .where(eq(subscription.id, existingSub.id));

    console.log(`[CHECK] Updated subscription: ${subscriptionId}`);
  } else {
    console.warn(`[WARNING] No subscription found for customer: ${customerId}`);
    // This shouldn't happen in normal flow, but log it for debugging
  }
}

/**
 * Handle subscription deletion
 */
async function handleSubscriptionDeleted(stripeSubscription: Stripe.Subscription) {
  console.log(`Processing subscription deletion: ${stripeSubscription.id}`);

  const customerId = stripeSubscription.customer as string;

  // Update subscription to canceled status
  await db
    .update(subscription)
    .set({
      status: "canceled",
      canceledAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(subscription.stripeCustomerId, customerId));

  console.log(`[CHECK] Subscription deleted: ${stripeSubscription.id}`);
}

/**
 * Handle trial ending soon
 */
async function handleTrialWillEnd(stripeSubscription: Stripe.Subscription) {
  console.log(`Trial ending soon for subscription: ${stripeSubscription.id}`);

  const customerId = stripeSubscription.customer as string;

  // Find subscription for this customer
  const [sub] = await db
    .select()
    .from(subscription)
    .where(eq(subscription.stripeCustomerId, customerId))
    .limit(1);

  if (!sub) {
    console.warn(`[WARNING] No subscription found for customer: ${customerId}`);
    return;
  }

  // Get organization owner to send email
  const [org] = await db
    .select()
    .from(organization)
    .where(eq(organization.id, sub.organizationId))
    .limit(1);

  if (!org || !org.createdBy) {
    console.warn("[WARNING] No organization or owner found");
    return;
  }

  // Get user info
  const [ownerUser] = await db
    .select()
    .from(user)
    .where(eq(user.id, org.createdBy))
    .limit(1);

  if (!ownerUser || !ownerUser.email) {
    console.warn("[WARNING] No owner user or email found");
    return;
  }

  // Calculate days remaining
  const trialEnd = stripeSubscription.trial_end
    ? new Date(stripeSubscription.trial_end * 1000)
    : null;

  if (!trialEnd) return;

  const daysRemaining = Math.ceil(
    (trialEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  // Send email
  await sendTrialEndingSoonEmail(
    ownerUser.email,
    ownerUser.name || "there",
    daysRemaining,
    `${process.env.NEXT_PUBLIC_APP_URL}/${org.slug}/settings/billing`
  );

  console.log(`[CHECK] Trial ending email sent to ${ownerUser.email}`);
}

/**
 * Handle successful payment
 */
async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log(`Processing successful payment: ${invoice.id}`);

  const customerId = invoice.customer as string;

  // Find subscription for this customer
  const [sub] = await db
    .select()
    .from(subscription)
    .where(eq(subscription.stripeCustomerId, customerId))
    .limit(1);

  if (!sub) {
    console.warn(`[WARNING] No subscription found for customer: ${customerId}`);
    return;
  }

  // Record payment
  await db.insert(payment).values({
    organizationId: sub.organizationId,
    stripePaymentIntentId: invoice.payment_intent as string,
    amount: invoice.amount_paid,
    currency: invoice.currency,
    status: "succeeded",
    description: invoice.description || "Subscription payment",
    receiptUrl: invoice.hosted_invoice_url || undefined,
  });

  console.log(`[CHECK] Payment recorded: ${invoice.id}`);

  // Get organization owner to send email
  const [org] = await db
    .select()
    .from(organization)
    .where(eq(organization.id, sub.organizationId))
    .limit(1);

  if (!org || !org.createdBy) {
    console.warn("[WARNING] No organization or owner found");
    return;
  }

  // Get user info
  const [ownerUser] = await db
    .select()
    .from(user)
    .where(eq(user.id, org.createdBy))
    .limit(1);

  if (!ownerUser || !ownerUser.email) {
    console.warn("[WARNING] No owner user or email found");
    return;
  }

  // Get plan name
  const plan = getPlan(sub.plan as any);

  // Send payment success email
  await sendPaymentSuccessEmail(
    ownerUser.email,
    ownerUser.name || "there",
    invoice.amount_paid,
    plan.name,
    invoice.hosted_invoice_url || undefined
  );

  console.log(`[CHECK] Payment success email sent to ${ownerUser.email}`);
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log(`Processing failed payment: ${invoice.id}`);

  const customerId = invoice.customer as string;

  // Find subscription for this customer
  const [sub] = await db
    .select()
    .from(subscription)
    .where(eq(subscription.stripeCustomerId, customerId))
    .limit(1);

  if (!sub) {
    console.warn(`[WARNING] No subscription found for customer: ${customerId}`);
    return;
  }

  // Update subscription status
  await db
    .update(subscription)
    .set({
      status: "past_due",
      updatedAt: new Date(),
    })
    .where(eq(subscription.id, sub.id));

  console.log(`[WARNING] Subscription marked as past_due: ${sub.id}`);

  // Get organization owner to send email
  const [org] = await db
    .select()
    .from(organization)
    .where(eq(organization.id, sub.organizationId))
    .limit(1);

  if (!org || !org.createdBy) {
    console.warn("[WARNING] No organization or owner found");
    return;
  }

  // Get user info
  const [ownerUser] = await db
    .select()
    .from(user)
    .where(eq(user.id, org.createdBy))
    .limit(1);

  if (!ownerUser || !ownerUser.email) {
    console.warn("[WARNING] No owner user or email found");
    return;
  }

  // Get plan name
  const plan = getPlan(sub.plan as any);

  // Send payment failed email
  await sendPaymentFailedEmail(
    ownerUser.email,
    ownerUser.name || "there",
    plan.name,
    `${process.env.NEXT_PUBLIC_APP_URL}/${org.slug}/settings/billing`
  );

  console.log(`[WARNING] Payment failed email sent to ${ownerUser.email}`);
}

/**
 * Handle successful checkout session
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log(`Processing checkout completion: ${session.id}`);

  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  if (!customerId || !subscriptionId) {
    console.warn("Missing customer or subscription ID in checkout session");
    return;
  }

  console.log(`[CHECK] Checkout completed - Customer: ${customerId}, Subscription: ${subscriptionId}`);

  // The subscription.created event will handle creating the subscription record
}
