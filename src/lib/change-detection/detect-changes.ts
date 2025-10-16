import crypto from "crypto";
import { db } from "@/lib/db/client";
import { resourceSnapshot, changeEvent, adAccount } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { triggerNotifications } from "@/lib/notifications/trigger";
import { canRecordChangeEvent, trackChangeEventUsage } from "@/lib/usage/track";

/**
 * Resource state structure
 */
export interface ResourceState {
  id: string;
  name: string;
  status: string;
  budget?: number;
  bidding?: any;
  targeting?: any;
  schedule?: any;
  creative?: any;
  [key: string]: any;
}

/**
 * Change detection result
 */
export interface ChangeDetectionResult {
  hasChanges: boolean;
  changeType: "created" | "updated" | "deleted" | "paused" | "resumed";
  severity: "critical" | "warning" | "info";
  diff: Record<string, { before: any; after: any }>;
  beforeValue: any;
  afterValue: any;
}

/**
 * Generate a hash of the resource state for quick comparison
 */
export function generateStateHash(state: ResourceState): string {
  const normalized = JSON.stringify(state, Object.keys(state).sort());
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

/**
 * Compare two resource states and generate a diff
 */
export function compareStates(
  before: ResourceState | null,
  after: ResourceState | null
): ChangeDetectionResult {
  // Resource was created
  if (!before && after) {
    return {
      hasChanges: true,
      changeType: "created",
      severity: "info",
      diff: {},
      beforeValue: null,
      afterValue: after,
    };
  }

  // Resource was deleted
  if (before && !after) {
    return {
      hasChanges: true,
      changeType: "deleted",
      severity: "warning",
      diff: {},
      beforeValue: before,
      afterValue: null,
    };
  }

  // No change
  if (!before && !after) {
    return {
      hasChanges: false,
      changeType: "updated",
      severity: "info",
      diff: {},
      beforeValue: null,
      afterValue: null,
    };
  }

  // Both exist - check for changes
  const diff: Record<string, { before: any; after: any }> = {};
  const allKeys = new Set([
    ...Object.keys(before || {}),
    ...Object.keys(after || {}),
  ]);

  for (const key of allKeys) {
    const beforeVal = (before as any)?.[key];
    const afterVal = (after as any)?.[key];

    if (JSON.stringify(beforeVal) !== JSON.stringify(afterVal)) {
      diff[key] = { before: beforeVal, after: afterVal };
    }
  }

  // No actual changes
  if (Object.keys(diff).length === 0) {
    return {
      hasChanges: false,
      changeType: "updated",
      severity: "info",
      diff: {},
      beforeValue: before,
      afterValue: after,
    };
  }

  // Determine change type and severity
  let changeType: "updated" | "paused" | "resumed" = "updated";
  let severity: "critical" | "warning" | "info" = "info";

  // Check for status changes
  if (diff.status) {
    const beforeStatus = diff.status.before?.toLowerCase();
    const afterStatus = diff.status.after?.toLowerCase();

    if (afterStatus === "paused" || afterStatus === "disabled") {
      changeType = "paused";
      severity = "warning";
    } else if (
      (beforeStatus === "paused" || beforeStatus === "disabled") &&
      (afterStatus === "active" || afterStatus === "enabled")
    ) {
      changeType = "resumed";
      severity = "info";
    }
  }

  // Check for budget changes (critical)
  if (diff.budget) {
    const budgetChange = Math.abs(diff.budget.after - diff.budget.before);
    const budgetChangePercent =
      (budgetChange / diff.budget.before) * 100;

    if (budgetChangePercent > 50) {
      severity = "critical";
    } else if (budgetChangePercent > 20) {
      severity = "warning";
    }
  }

  // Check for targeting changes (warning)
  if (diff.targeting) {
    severity = severity === "critical" ? "critical" : "warning";
  }

  return {
    hasChanges: true,
    changeType,
    severity,
    diff,
    beforeValue: before,
    afterValue: after,
  };
}

/**
 * Store a snapshot of a resource's current state
 */
export async function captureSnapshot(
  adAccountId: string,
  platform: "meta" | "google",
  resourceType: string,
  resourceId: string,
  resourceName: string,
  state: ResourceState
): Promise<void> {
  const hash = generateStateHash(state);

  await db.insert(resourceSnapshot).values({
    adAccountId,
    platform,
    resourceType,
    resourceId,
    resourceName,
    state,
    hash,
  });
}

/**
 * Get the most recent snapshot for a resource
 */
export async function getLatestSnapshot(
  adAccountId: string,
  resourceId: string
): Promise<ResourceState | null> {
  const [snapshot] = await db
    .select()
    .from(resourceSnapshot)
    .where(
      and(
        eq(resourceSnapshot.adAccountId, adAccountId),
        eq(resourceSnapshot.resourceId, resourceId)
      )
    )
    .orderBy(desc(resourceSnapshot.capturedAt))
    .limit(1);

  return snapshot?.state as ResourceState | null;
}

/**
 * Detect changes and create change events
 */
export async function detectAndRecordChanges(
  adAccountId: string,
  platform: "meta" | "google",
  resourceType: string,
  resources: ResourceState[]
): Promise<number> {
  let changesDetected = 0;

  // Get organization ID from ad account
  const [account] = await db
    .select()
    .from(adAccount)
    .where(eq(adAccount.id, adAccountId))
    .limit(1);

  if (!account) {
    console.error(`Ad account not found: ${adAccountId}`);
    return 0;
  }

  const organizationId = account.organizationId;

  // Check if organization can record more change events
  const limitCheck = await canRecordChangeEvent(organizationId);

  if (!limitCheck.allowed) {
    console.warn(
      `⚠️ Organization ${organizationId} has reached change event limit. Skipping change detection.`
    );
    console.warn(`   Reason: ${limitCheck.reason}`);
    return 0;
  }

  for (const resource of resources) {
    // Get the previous snapshot
    const previousState = await getLatestSnapshot(adAccountId, resource.id);

    // Compare states
    const detection = compareStates(previousState, resource);

    // If there are changes, record them
    if (detection.hasChanges) {
      const [event] = await db.insert(changeEvent).values({
        adAccountId,
        platform,
        resourceType,
        resourceId: resource.id,
        resourceName: resource.name,
        changeType: detection.changeType,
        severity: detection.severity,
        beforeValue: detection.beforeValue,
        afterValue: detection.afterValue,
        diff: detection.diff,
      }).returning();

      changesDetected++;

      // Track usage
      await trackChangeEventUsage(organizationId);

      // Trigger notifications for this change
      if (event) {
        await triggerNotifications(event.id).catch((error) => {
          console.error(`Failed to trigger notifications for event ${event.id}:`, error);
        });
      }
    }

    // Always capture the current snapshot
    await captureSnapshot(
      adAccountId,
      platform,
      resourceType,
      resource.id,
      resource.name,
      resource
    );
  }

  return changesDetected;
}

/**
 * Detect deleted resources by comparing current resources with snapshots
 */
export async function detectDeletedResources(
  adAccountId: string,
  platform: "meta" | "google",
  resourceType: string,
  currentResourceIds: string[]
): Promise<number> {
  // Get organization ID from ad account
  const [account] = await db
    .select()
    .from(adAccount)
    .where(eq(adAccount.id, adAccountId))
    .limit(1);

  if (!account) {
    console.error(`Ad account not found: ${adAccountId}`);
    return 0;
  }

  const organizationId = account.organizationId;

  // Check if organization can record more change events
  const limitCheck = await canRecordChangeEvent(organizationId);

  if (!limitCheck.allowed) {
    console.warn(
      `⚠️ Organization ${organizationId} has reached change event limit. Skipping deletion detection.`
    );
    return 0;
  }

  // Get all unique resource IDs from snapshots
  const snapshots = await db
    .selectDistinct({ resourceId: resourceSnapshot.resourceId })
    .from(resourceSnapshot)
    .where(
      and(
        eq(resourceSnapshot.adAccountId, adAccountId),
        eq(resourceSnapshot.resourceType, resourceType)
      )
    );

  const snapshotResourceIds = snapshots.map((s) => s.resourceId);
  const deletedResourceIds = snapshotResourceIds.filter(
    (id) => !currentResourceIds.includes(id)
  );

  let deletedCount = 0;

  for (const resourceId of deletedResourceIds) {
    const previousState = await getLatestSnapshot(adAccountId, resourceId);

    if (previousState) {
      const [event] = await db.insert(changeEvent).values({
        adAccountId,
        platform,
        resourceType,
        resourceId,
        resourceName: previousState.name,
        changeType: "deleted",
        severity: "warning",
        beforeValue: previousState,
        afterValue: null,
        diff: {},
      }).returning();

      deletedCount++;

      // Track usage
      await trackChangeEventUsage(organizationId);

      // Trigger notifications for this deletion
      if (event) {
        await triggerNotifications(event.id).catch((error) => {
          console.error(`Failed to trigger notifications for deleted resource ${event.id}:`, error);
        });
      }
    }
  }

  return deletedCount;
}
