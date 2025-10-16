/**
 * Subscription plan definitions
 * These should match your Stripe product/price IDs
 */

export type PlanType = "trial" | "starter" | "pro" | "agency";

export interface Plan {
  id: PlanType;
  name: string;
  description: string;
  price: number; // Monthly price in dollars
  stripePriceId: string; // Set in environment variables
  features: string[];
  limits: {
    maxAdAccounts: number;
    maxSeats: number;
    maxChangeEventsPerMonth: number;
  };
  recommended?: boolean;
}

export const PLANS: Record<PlanType, Plan> = {
  trial: {
    id: "trial",
    name: "Trial",
    description: "Try AdsX free for 14 days",
    price: 0,
    stripePriceId: "", // No Stripe price for trial
    features: [
      "Up to 3 ad accounts",
      "10,000 change events per month",
      "Slack notifications",
      "Email notifications",
      "Basic support",
    ],
    limits: {
      maxAdAccounts: 3,
      maxSeats: 1,
      maxChangeEventsPerMonth: 10000,
    },
  },

  starter: {
    id: "starter",
    name: "Starter",
    description: "Perfect for small teams and startups",
    price: 49,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || "",
    features: [
      "Up to 5 ad accounts",
      "50,000 change events per month",
      "Slack & email notifications",
      "Webhook integrations",
      "Priority email support",
      "14-day free trial",
    ],
    limits: {
      maxAdAccounts: 5,
      maxSeats: 3,
      maxChangeEventsPerMonth: 50000,
    },
  },

  pro: {
    id: "pro",
    name: "Professional",
    description: "For growing marketing teams",
    price: 149,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "",
    features: [
      "Up to 20 ad accounts",
      "250,000 change events per month",
      "All notification channels",
      "Custom notification rules",
      "Advanced filtering",
      "API access",
      "Priority support",
      "14-day free trial",
    ],
    limits: {
      maxAdAccounts: 20,
      maxSeats: 10,
      maxChangeEventsPerMonth: 250000,
    },
    recommended: true,
  },

  agency: {
    id: "agency",
    name: "Agency",
    description: "For agencies managing multiple clients",
    price: 499,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_AGENCY_PRICE_ID || "",
    features: [
      "Unlimited ad accounts",
      "1,000,000 change events per month",
      "All notification channels",
      "White-label options",
      "Dedicated account manager",
      "API access with higher limits",
      "Custom integrations",
      "SLA guarantee",
      "14-day free trial",
    ],
    limits: {
      maxAdAccounts: 999999,
      maxSeats: 50,
      maxChangeEventsPerMonth: 1000000,
    },
  },
};

/**
 * Get plan by ID
 */
export function getPlan(planId: PlanType): Plan {
  return PLANS[planId];
}

/**
 * Get all plans as array
 */
export function getAllPlans(): Plan[] {
  return Object.values(PLANS);
}

/**
 * Get paid plans only (excluding trial)
 */
export function getPaidPlans(): Plan[] {
  return getAllPlans().filter((plan) => plan.id !== "trial");
}
