"use server";

import { db } from "@/lib/db/client";
import { notificationRule } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";

export interface RuleConditions {
  platforms?: ("meta" | "google")[];
  adAccountIds?: string[];
  changeTypes?: string[];
  resourceTypes?: string[];
  severity?: ("critical" | "warning" | "info")[];
  budgetChange?: {
    operator: "greater_than" | "less_than" | "equals";
    value: number;
  };
  statusChanges?: string[];
}

export async function getNotificationRules(organizationId: string) {
  try {
    const rules = await db
      .select()
      .from(notificationRule)
      .where(eq(notificationRule.organizationId, organizationId))
      .orderBy(desc(notificationRule.createdAt));

    return { success: true, rules };
  } catch (error) {
    console.error("Error fetching notification rules:", error);
    return { success: false, rules: [] };
  }
}

export async function createNotificationRule(data: {
  organizationId: string;
  name: string;
  description?: string;
  isActive: boolean;
  priority: "low" | "normal" | "high";
  conditions: RuleConditions;
  slackChannelId?: string;
  slackChannelName?: string;
  emailRecipients?: string;
  webhookUrl?: string;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  quietHoursTimezone?: string;
  digestMode?: "hourly" | "daily" | null;
  digestTime?: string;
  createdBy: string;
}) {
  try {
    const [rule] = await db
      .insert(notificationRule)
      .values({
        organizationId: data.organizationId,
        name: data.name,
        description: data.description,
        isActive: data.isActive,
        priority: data.priority,
        conditions: data.conditions,
        slackChannelId: data.slackChannelId,
        slackChannelName: data.slackChannelName,
        emailRecipients: data.emailRecipients,
        webhookUrl: data.webhookUrl,
        quietHoursStart: data.quietHoursStart,
        quietHoursEnd: data.quietHoursEnd,
        quietHoursTimezone: data.quietHoursTimezone || "UTC",
        digestMode: data.digestMode,
        digestTime: data.digestTime,
        createdBy: data.createdBy,
      })
      .returning();

    return { success: true, rule };
  } catch (error) {
    console.error("Error creating notification rule:", error);
    return { success: false, error: "Failed to create notification rule" };
  }
}

export async function updateNotificationRule(data: {
  ruleId: string;
  organizationId: string;
  name?: string;
  description?: string;
  isActive?: boolean;
  priority?: "low" | "normal" | "high";
  conditions?: RuleConditions;
  slackChannelId?: string;
  slackChannelName?: string;
  emailRecipients?: string;
  webhookUrl?: string;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  quietHoursTimezone?: string;
  digestMode?: "hourly" | "daily" | null;
  digestTime?: string;
}) {
  try {
    const [rule] = await db
      .update(notificationRule)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(notificationRule.id, data.ruleId),
          eq(notificationRule.organizationId, data.organizationId)
        )
      )
      .returning();

    if (!rule) {
      return { success: false, error: "Rule not found" };
    }

    return { success: true, rule };
  } catch (error) {
    console.error("Error updating notification rule:", error);
    return { success: false, error: "Failed to update notification rule" };
  }
}

export async function deleteNotificationRule(data: {
  ruleId: string;
  organizationId: string;
}) {
  try {
    await db
      .delete(notificationRule)
      .where(
        and(
          eq(notificationRule.id, data.ruleId),
          eq(notificationRule.organizationId, data.organizationId)
        )
      );

    return { success: true };
  } catch (error) {
    console.error("Error deleting notification rule:", error);
    return { success: false, error: "Failed to delete notification rule" };
  }
}

export async function toggleRuleStatus(data: {
  ruleId: string;
  organizationId: string;
  isActive: boolean;
}) {
  try {
    const [rule] = await db
      .update(notificationRule)
      .set({
        isActive: data.isActive,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(notificationRule.id, data.ruleId),
          eq(notificationRule.organizationId, data.organizationId)
        )
      )
      .returning();

    if (!rule) {
      return { success: false, error: "Rule not found" };
    }

    return { success: true, rule };
  } catch (error) {
    console.error("Error toggling rule status:", error);
    return { success: false, error: "Failed to toggle rule status" };
  }
}
