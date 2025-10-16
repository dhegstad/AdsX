import { db } from "@/lib/db/client";
import { subscription, adAccount, member, changeEvent } from "@/lib/db/schema";
import { eq, and, gte, count } from "drizzle-orm";
import { getPlan } from "@/lib/stripe/plans";

/**
 * Usage statistics for an organization
 */
export interface OrganizationUsage {
  adAccountsUsed: number;
  adAccountsLimit: number;
  changeEventsUsed: number;
  changeEventsLimit: number;
  seatsUsed: number;
  seatsLimit: number;
  isWithinLimits: boolean;
  limitExceeded?: {
    resource: "ad_accounts" | "change_events" | "seats";
    used: number;
    limit: number;
  };
}

/**
 * Get current usage statistics for an organization
 */
export async function getOrganizationUsage(
  organizationId: string
): Promise<OrganizationUsage> {
  // Get subscription to determine limits
  const [sub] = await db
    .select()
    .from(subscription)
    .where(eq(subscription.organizationId, organizationId))
    .limit(1);

  // Use trial limits if no subscription
  const plan = sub ? getPlan(sub.plan as any) : getPlan("trial");
  const limits = plan.limits;

  // Count ad accounts
  const adAccountsResult = await db
    .select({ count: count() })
    .from(adAccount)
    .where(eq(adAccount.organizationId, organizationId));

  const adAccountsUsed = adAccountsResult[0]?.count || 0;

  // Count change events this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const changeEventsResult = await db
    .select({ count: count() })
    .from(changeEvent)
    .where(
      and(
        eq(changeEvent.organizationId, organizationId),
        gte(changeEvent.createdAt, startOfMonth)
      )
    );

  const changeEventsUsed = changeEventsResult[0]?.count || 0;

  // Count team members
  const membersResult = await db
    .select({ count: count() })
    .from(member)
    .where(eq(member.organizationId, organizationId));

  const seatsUsed = membersResult[0]?.count || 0;

  // Check if any limits exceeded
  let isWithinLimits = true;
  let limitExceeded: OrganizationUsage["limitExceeded"];

  if (adAccountsUsed >= limits.maxAdAccounts) {
    isWithinLimits = false;
    limitExceeded = {
      resource: "ad_accounts",
      used: adAccountsUsed,
      limit: limits.maxAdAccounts,
    };
  } else if (changeEventsUsed >= limits.maxChangeEventsPerMonth) {
    isWithinLimits = false;
    limitExceeded = {
      resource: "change_events",
      used: changeEventsUsed,
      limit: limits.maxChangeEventsPerMonth,
    };
  } else if (seatsUsed >= limits.maxSeats) {
    isWithinLimits = false;
    limitExceeded = {
      resource: "seats",
      used: seatsUsed,
      limit: limits.maxSeats,
    };
  }

  return {
    adAccountsUsed,
    adAccountsLimit: limits.maxAdAccounts,
    changeEventsUsed,
    changeEventsLimit: limits.maxChangeEventsPerMonth,
    seatsUsed,
    seatsLimit: limits.maxSeats,
    isWithinLimits,
    limitExceeded,
  };
}

/**
 * Check if organization can add a new ad account
 */
export async function canAddAdAccount(organizationId: string): Promise<{
  allowed: boolean;
  reason?: string;
}> {
  const usage = await getOrganizationUsage(organizationId);

  if (usage.adAccountsUsed >= usage.adAccountsLimit) {
    return {
      allowed: false,
      reason: `You've reached your limit of ${usage.adAccountsLimit} ad accounts. Upgrade your plan to add more.`,
    };
  }

  return { allowed: true };
}

/**
 * Check if organization can add a new team member
 */
export async function canAddMember(organizationId: string): Promise<{
  allowed: boolean;
  reason?: string;
}> {
  const usage = await getOrganizationUsage(organizationId);

  if (usage.seatsUsed >= usage.seatsLimit) {
    return {
      allowed: false,
      reason: `You've reached your limit of ${usage.seatsLimit} team members. Upgrade your plan to add more.`,
    };
  }

  return { allowed: true };
}

/**
 * Check if organization can record more change events
 */
export async function canRecordChangeEvent(organizationId: string): Promise<{
  allowed: boolean;
  reason?: string;
}> {
  const usage = await getOrganizationUsage(organizationId);

  if (usage.changeEventsUsed >= usage.changeEventsLimit) {
    return {
      allowed: false,
      reason: `You've reached your monthly limit of ${usage.changeEventsLimit.toLocaleString()} change events. Upgrade your plan for higher limits.`,
    };
  }

  return { allowed: true };
}

/**
 * Track a change event usage (to be called when recording change events)
 */
export async function trackChangeEventUsage(organizationId: string): Promise<void> {
  // This function can be used to track usage for metered billing
  // For now, we just rely on the count in the database
  // In the future, you could report this to Stripe for metered billing

  const usage = await getOrganizationUsage(organizationId);

  if (usage.changeEventsUsed >= usage.changeEventsLimit) {
    console.warn(
      `[WARNING] Organization ${organizationId} exceeded change events limit: ${usage.changeEventsUsed}/${usage.changeEventsLimit}`
    );
  }
}

/**
 * Get usage percentage for display
 */
export function getUsagePercentage(used: number, limit: number): number {
  if (limit === 0) return 0;
  return Math.min(Math.round((used / limit) * 100), 100);
}
