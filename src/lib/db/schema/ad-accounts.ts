import { pgTable, text, timestamp, jsonb, boolean, integer, index } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { organization } from "./auth";

/**
 * Ad platform account connections
 */
export const adAccount = pgTable("ad_account", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  organizationId: text("organizationId")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  platform: text("platform").notNull(), // 'meta' | 'google'
  platformAccountId: text("platformAccountId").notNull(),
  platformAccountName: text("platformAccountName").notNull(),
  accessToken: text("accessToken").notNull(),
  refreshToken: text("refreshToken"),
  tokenExpiresAt: timestamp("tokenExpiresAt"),
  scope: text("scope"),
  isActive: boolean("isActive").notNull().default(true),
  lastSyncAt: timestamp("lastSyncAt"),
  metadata: jsonb("metadata"), // Store additional platform-specific data
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
}, (table) => ({
  orgIdx: index("ad_account_org_idx").on(table.organizationId),
  platformIdx: index("ad_account_platform_idx").on(table.platform),
}));

/**
 * Monitoring jobs for polling (primarily for Google Ads)
 */
export const monitoringJob = pgTable("monitoring_job", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  adAccountId: text("adAccountId")
    .notNull()
    .references(() => adAccount.id, { onDelete: "cascade" }),
  jobType: text("jobType").notNull(), // 'poll' | 'webhook'
  isActive: boolean("isActive").notNull().default(true),
  lastRunAt: timestamp("lastRunAt"),
  nextRunAt: timestamp("nextRunAt"),
  failureCount: integer("failureCount").notNull().default(0),
  lastError: text("lastError"),
  config: jsonb("config"), // Poll interval, filters, etc.
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
}, (table) => ({
  adAccountIdx: index("monitoring_job_account_idx").on(table.adAccountId),
  activeIdx: index("monitoring_job_active_idx").on(table.isActive),
}));

/**
 * Snapshots of ad resources for change detection
 */
export const resourceSnapshot = pgTable("resource_snapshot", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  adAccountId: text("adAccountId")
    .notNull()
    .references(() => adAccount.id, { onDelete: "cascade" }),
  platform: text("platform").notNull(), // 'meta' | 'google'
  resourceType: text("resourceType").notNull(), // 'campaign' | 'ad_set' | 'ad' | 'keyword'
  resourceId: text("resourceId").notNull(),
  resourceName: text("resourceName").notNull(),
  state: jsonb("state").notNull(), // Full resource state at this point in time
  hash: text("hash").notNull(), // Hash of state for quick comparison
  capturedAt: timestamp("capturedAt").notNull().defaultNow(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
}, (table) => ({
  adAccountIdx: index("resource_snapshot_account_idx").on(table.adAccountId),
  resourceIdx: index("resource_snapshot_resource_idx").on(table.resourceType, table.resourceId),
  capturedAtIdx: index("resource_snapshot_captured_idx").on(table.capturedAt),
  // Unique constraint to avoid duplicate snapshots
  uniqueSnapshot: index("resource_snapshot_unique_idx").on(table.adAccountId, table.resourceId, table.capturedAt),
}));

/**
 * Change events detected across ad platforms
 */
export const changeEvent = pgTable("change_event", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  adAccountId: text("adAccountId")
    .notNull()
    .references(() => adAccount.id, { onDelete: "cascade" }),
  platform: text("platform").notNull(), // 'meta' | 'google'
  resourceType: text("resourceType").notNull(), // 'campaign' | 'ad_set' | 'ad' | 'keyword'
  resourceId: text("resourceId").notNull(),
  resourceName: text("resourceName").notNull(),
  changeType: text("changeType").notNull(), // 'created' | 'updated' | 'deleted' | 'paused' | 'resumed'
  severity: text("severity").notNull(), // 'critical' | 'warning' | 'info'
  beforeValue: jsonb("beforeValue"),
  afterValue: jsonb("afterValue"),
  diff: jsonb("diff"), // Field-level differences
  metadata: jsonb("metadata"), // Additional context
  isAcknowledged: boolean("isAcknowledged").notNull().default(false),
  acknowledgedBy: text("acknowledgedBy"),
  acknowledgedAt: timestamp("acknowledgedAt"),
  detectedAt: timestamp("detectedAt").notNull().defaultNow(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
}, (table) => ({
  adAccountIdx: index("change_event_account_idx").on(table.adAccountId),
  detectedAtIdx: index("change_event_detected_idx").on(table.detectedAt),
  severityIdx: index("change_event_severity_idx").on(table.severity),
  resourceIdx: index("change_event_resource_idx").on(table.resourceType, table.resourceId),
}));

/**
 * API usage tracking for rate limiting and billing
 */
export const apiUsageLog = pgTable("api_usage_log", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  organizationId: text("organizationId")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  endpoint: text("endpoint").notNull(),
  method: text("method").notNull(),
  statusCode: integer("statusCode"),
  responseTime: integer("responseTime"), // in ms
  userId: text("userId"),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
}, (table) => ({
  orgIdx: index("api_usage_org_idx").on(table.organizationId),
  timestampIdx: index("api_usage_timestamp_idx").on(table.timestamp),
}));

/**
 * Audit logs for security and compliance
 */
export const auditLog = pgTable("audit_log", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  organizationId: text("organizationId")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  userId: text("userId"),
  action: text("action").notNull(), // 'create', 'update', 'delete', 'invite', 'connect', etc.
  resourceType: text("resourceType").notNull(), // 'ad_account', 'rule', 'member', etc.
  resourceId: text("resourceId"),
  metadata: jsonb("metadata"),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
}, (table) => ({
  orgIdx: index("audit_log_org_idx").on(table.organizationId),
  timestampIdx: index("audit_log_timestamp_idx").on(table.timestamp),
  actionIdx: index("audit_log_action_idx").on(table.action),
}));
