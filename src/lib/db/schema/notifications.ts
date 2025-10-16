import { pgTable, text, timestamp, jsonb, boolean, index } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { organization } from "./auth";

/**
 * Slack workspace integrations
 */
export const slackIntegration = pgTable("slack_integration", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  organizationId: text("organizationId")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  teamId: text("teamId").notNull(),
  teamName: text("teamName").notNull(),
  accessToken: text("accessToken").notNull(),
  botUserId: text("botUserId"),
  scope: text("scope"),
  defaultChannelId: text("defaultChannelId"),
  defaultChannelName: text("defaultChannelName"),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
}, (table) => ({
  orgIdx: index("slack_integration_org_idx").on(table.organizationId),
}));

/**
 * Notification rules engine
 */
export const notificationRule = pgTable("notification_rule", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  organizationId: text("organizationId")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  isActive: boolean("isActive").notNull().default(true),
  priority: text("priority").notNull().default("normal"), // 'low' | 'normal' | 'high'

  // Conditions (what triggers the rule)
  conditions: jsonb("conditions").notNull(), // {platform, adAccounts, changeTypes, severity, etc.}

  // Actions (what happens when triggered)
  slackChannelId: text("slackChannelId"),
  slackChannelName: text("slackChannelName"),
  emailRecipients: text("emailRecipients"), // Comma-separated emails
  webhookUrl: text("webhookUrl"),

  // Scheduling & throttling
  quietHoursStart: text("quietHoursStart"), // HH:MM format
  quietHoursEnd: text("quietHoursEnd"), // HH:MM format
  quietHoursTimezone: text("quietHoursTimezone").default("UTC"),
  digestMode: text("digestMode"), // null | 'hourly' | 'daily'
  digestTime: text("digestTime"), // For daily digests: HH:MM format

  createdBy: text("createdBy").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
}, (table) => ({
  orgIdx: index("notification_rule_org_idx").on(table.organizationId),
  activeIdx: index("notification_rule_active_idx").on(table.isActive),
}));

/**
 * Notification delivery log
 */
export const notificationLog = pgTable("notification_log", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  ruleId: text("ruleId")
    .references(() => notificationRule.id, { onDelete: "set null" }),
  changeEventId: text("changeEventId").notNull(), // References change_event
  channel: text("channel").notNull(), // 'slack' | 'email' | 'webhook'
  recipient: text("recipient").notNull(), // Channel ID, email, or webhook URL
  status: text("status").notNull(), // 'sent' | 'failed' | 'queued'
  errorMessage: text("errorMessage"),
  metadata: jsonb("metadata"),
  sentAt: timestamp("sentAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
}, (table) => ({
  ruleIdx: index("notification_log_rule_idx").on(table.ruleId),
  statusIdx: index("notification_log_status_idx").on(table.status),
  createdAtIdx: index("notification_log_created_idx").on(table.createdAt),
}));
