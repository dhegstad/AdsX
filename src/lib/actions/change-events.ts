"use server";

import { db } from "@/lib/db/client";
import { changeEvent, adAccount } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";

export async function getChangeEvents(params: {
  organizationId: string;
  platform?: "meta" | "google";
  changeType?: string;
  limit?: number;
}) {
  try {
    const { organizationId, platform, changeType, limit = 50 } = params;

    // Build query conditions
    const conditions: any[] = [eq(adAccount.organizationId, organizationId)];

    if (platform) {
      conditions.push(eq(adAccount.platform, platform));
    }

    if (changeType) {
      conditions.push(eq(changeEvent.changeType, changeType));
    }

    // Fetch change events with ad account info
    const query = db
      .select({
        id: changeEvent.id,
        adAccountId: changeEvent.adAccountId,
        changeType: changeEvent.changeType,
        entityType: changeEvent.resourceType,
        entityId: changeEvent.resourceId,
        entityName: changeEvent.resourceName,
        oldValue: changeEvent.beforeValue,
        newValue: changeEvent.afterValue,
        diff: changeEvent.diff,
        detectedAt: changeEvent.detectedAt,
        createdAt: changeEvent.createdAt,
        accountName: adAccount.platformAccountName,
        platform: adAccount.platform,
      })
      .from(changeEvent)
      .innerJoin(adAccount, eq(changeEvent.adAccountId, adAccount.id));

    // Apply conditions
    const events = await (conditions.length > 1
      ? query.where(and(...conditions))
      : query.where(conditions[0]))
      .orderBy(desc(changeEvent.detectedAt))
      .limit(limit);

    return { success: true, events };
  } catch (error) {
    console.error("Error fetching change events:", error);
    return { success: false, events: [] };
  }
}

export async function getChangeEventById(eventId: string) {
  try {
    const [event] = await db
      .select({
        id: changeEvent.id,
        adAccountId: changeEvent.adAccountId,
        changeType: changeEvent.changeType,
        entityType: changeEvent.resourceType,
        entityId: changeEvent.resourceId,
        entityName: changeEvent.resourceName,
        oldValue: changeEvent.beforeValue,
        newValue: changeEvent.afterValue,
        diff: changeEvent.diff,
        detectedAt: changeEvent.detectedAt,
        createdAt: changeEvent.createdAt,
        accountName: adAccount.platformAccountName,
        platform: adAccount.platform,
      })
      .from(changeEvent)
      .innerJoin(adAccount, eq(changeEvent.adAccountId, adAccount.id))
      .where(eq(changeEvent.id, eventId))
      .limit(1);

    if (!event) {
      return { success: false, error: "Event not found" };
    }

    return { success: true, event };
  } catch (error) {
    console.error("Error fetching change event:", error);
    return { success: false, error: "Failed to fetch event" };
  }
}

// Helper function to create sample change events for testing
export async function createSampleChangeEvent(data: {
  adAccountId: string;
  changeType: string;
  entityType: string;
  entityId: string;
  entityName: string;
  oldValue?: Record<string, any>;
  newValue?: Record<string, any>;
}) {
  try {
    const [event] = await db
      .insert(changeEvent)
      .values({
        adAccountId: data.adAccountId,
        changeType: data.changeType,
        entityType: data.entityType,
        entityId: data.entityId,
        entityName: data.entityName,
        oldValue: data.oldValue,
        newValue: data.newValue,
        diff: data.oldValue && data.newValue ? generateDiff(data.oldValue, data.newValue) : null,
        detectedAt: new Date(),
      })
      .returning();

    return { success: true, event };
  } catch (error) {
    console.error("Error creating change event:", error);
    return { success: false, error: "Failed to create event" };
  }
}

function generateDiff(
  oldValue: Record<string, any>,
  newValue: Record<string, any>
): Record<string, any> {
  const diff: Record<string, any> = {};

  const allKeys = new Set([...Object.keys(oldValue), ...Object.keys(newValue)]);

  for (const key of allKeys) {
    if (oldValue[key] !== newValue[key]) {
      diff[key] = {
        old: oldValue[key],
        new: newValue[key],
      };
    }
  }

  return diff;
}
