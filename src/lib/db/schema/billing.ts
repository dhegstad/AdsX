import { pgTable, text, timestamp, integer, boolean, index } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { organization } from "./auth";

/**
 * Stripe subscription management
 */
export const subscription = pgTable("subscription", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  organizationId: text("organizationId")
    .notNull()
    .unique()
    .references(() => organization.id, { onDelete: "cascade" }),
  stripeCustomerId: text("stripeCustomerId").notNull().unique(),
  stripeSubscriptionId: text("stripeSubscriptionId").unique(),
  stripePriceId: text("stripePriceId"),
  stripeCurrentPeriodEnd: timestamp("stripeCurrentPeriodEnd"),

  plan: text("plan").notNull().default("trial"), // 'trial' | 'starter' | 'pro' | 'agency'
  status: text("status").notNull().default("active"), // 'active' | 'canceled' | 'past_due' | 'trialing'

  // Limits based on plan
  maxAdAccounts: integer("maxAdAccounts").notNull().default(3),
  maxSeats: integer("maxSeats").notNull().default(1),
  maxChangeEventsPerMonth: integer("maxChangeEventsPerMonth").notNull().default(10000),

  // Trial info
  trialEndsAt: timestamp("trialEndsAt"),

  // Billing
  cancelAtPeriodEnd: boolean("cancelAtPeriodEnd").notNull().default(false),
  canceledAt: timestamp("canceledAt"),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
}, (table) => ({
  orgIdx: index("subscription_org_idx").on(table.organizationId),
  customerIdx: index("subscription_customer_idx").on(table.stripeCustomerId),
}));

/**
 * Usage tracking for metered billing
 */
export const usageRecord = pgTable("usage_record", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  organizationId: text("organizationId")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  metricType: text("metricType").notNull(), // 'change_events' | 'api_calls' | 'notifications'
  quantity: integer("quantity").notNull().default(1),
  periodStart: timestamp("periodStart").notNull(),
  periodEnd: timestamp("periodEnd").notNull(),
  reportedToStripe: boolean("reportedToStripe").notNull().default(false),
  stripeUsageRecordId: text("stripeUsageRecordId"),
  metadata: text("metadata"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
}, (table) => ({
  orgIdx: index("usage_record_org_idx").on(table.organizationId),
  periodIdx: index("usage_record_period_idx").on(table.periodStart, table.periodEnd),
  reportedIdx: index("usage_record_reported_idx").on(table.reportedToStripe),
}));

/**
 * Payment history
 */
export const payment = pgTable("payment", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  organizationId: text("organizationId")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  stripePaymentIntentId: text("stripePaymentIntentId").notNull().unique(),
  amount: integer("amount").notNull(), // in cents
  currency: text("currency").notNull().default("usd"),
  status: text("status").notNull(), // 'succeeded' | 'failed' | 'pending'
  description: text("description"),
  receiptUrl: text("receiptUrl"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
}, (table) => ({
  orgIdx: index("payment_org_idx").on(table.organizationId),
  statusIdx: index("payment_status_idx").on(table.status),
}));
