import { db } from "@/lib/db/client";
import { notificationRule, notificationLog, changeEvent, adAccount, slackIntegration } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { evaluateRule } from "@/lib/rules/evaluate";
import { WebClient } from "@slack/web-api";

/**
 * Trigger notifications for a change event
 * Evaluates all active rules and sends notifications for matches
 */
export async function triggerNotifications(changeEventId: string): Promise<number> {
  try {
    // Get the change event
    const [event] = await db
      .select()
      .from(changeEvent)
      .where(eq(changeEvent.id, changeEventId))
      .limit(1);

    if (!event) {
      console.error(`Change event not found: ${changeEventId}`);
      return 0;
    }

    // Get the ad account to find the organization
    const [account] = await db
      .select()
      .from(adAccount)
      .where(eq(adAccount.id, event.adAccountId))
      .limit(1);

    if (!account) {
      console.error(`Ad account not found: ${event.adAccountId}`);
      return 0;
    }

    // Get all active notification rules for this organization
    const rules = await db
      .select()
      .from(notificationRule)
      .where(
        and(
          eq(notificationRule.organizationId, account.organizationId),
          eq(notificationRule.isActive, true)
        )
      );

    console.log(`📋 Evaluating ${rules.length} rules for change event ${changeEventId}`);

    let notificationsSent = 0;

    for (const rule of rules) {
      try {
        // Evaluate if this rule matches the change event
        const matches = evaluateRule(rule.conditions as any, {
          platform: event.platform,
          adAccountId: event.adAccountId,
          changeType: event.changeType,
          resourceType: event.resourceType,
          severity: event.severity,
          beforeValue: event.beforeValue,
          afterValue: event.afterValue,
        });

        if (matches) {
          console.log(`✅ Rule matched: ${rule.name}`);

          // Send notifications to configured channels
          if (rule.slackChannelId) {
            await sendSlackNotification(rule, event);
            notificationsSent++;
          }

          if (rule.emailRecipients) {
            await sendEmailNotification(rule, event);
            notificationsSent++;
          }

          if (rule.webhookUrl) {
            await sendWebhookNotification(rule, event);
            notificationsSent++;
          }

          // Log the notification
          await db.insert(notificationLog).values({
            ruleId: rule.id,
            changeEventId: event.id,
            channel: getNotificationChannels(rule),
            status: "sent",
            sentAt: new Date(),
          });
        }
      } catch (error) {
        console.error(`Error evaluating rule ${rule.id}:`, error);

        // Log the failed notification
        await db.insert(notificationLog).values({
          ruleId: rule.id,
          changeEventId: event.id,
          channel: getNotificationChannels(rule),
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    console.log(`📨 Sent ${notificationsSent} notifications`);
    return notificationsSent;
  } catch (error) {
    console.error("Error triggering notifications:", error);
    return 0;
  }
}

/**
 * Get the notification channels for a rule
 */
function getNotificationChannels(rule: typeof notificationRule.$inferSelect): string {
  const channels: string[] = [];
  if (rule.slackChannelId) channels.push("slack");
  if (rule.emailRecipients) channels.push("email");
  if (rule.webhookUrl) channels.push("webhook");
  return channels.join(",");
}

/**
 * Send a Slack notification
 */
async function sendSlackNotification(
  rule: typeof notificationRule.$inferSelect,
  event: typeof changeEvent.$inferSelect
): Promise<void> {
  console.log(`💬 Sending Slack notification to #${rule.slackChannelName}`);

  if (!rule.slackChannelId) {
    throw new Error("Slack channel ID not configured");
  }

  // Get the ad account to find the organization
  const [account] = await db
    .select()
    .from(adAccount)
    .where(eq(adAccount.id, event.adAccountId))
    .limit(1);

  if (!account) {
    throw new Error(`Ad account not found: ${event.adAccountId}`);
  }

  // Get the Slack integration for this organization
  const [integration] = await db
    .select()
    .from(slackIntegration)
    .where(
      and(
        eq(slackIntegration.organizationId, account.organizationId),
        eq(slackIntegration.isActive, true)
      )
    )
    .limit(1);

  if (!integration) {
    throw new Error("Slack integration not found or inactive");
  }

  // Initialize Slack client with the access token
  const slackClient = new WebClient(integration.accessToken);

  // Build the message blocks for rich formatting
  const blocks = buildSlackBlocks(event, rule);

  try {
    await slackClient.chat.postMessage({
      channel: rule.slackChannelId,
      text: formatSlackMessage(event), // Fallback text for notifications
      blocks,
      unfurl_links: false,
      unfurl_media: false,
    });

    console.log(`✅ Slack notification sent successfully to #${rule.slackChannelName}`);
  } catch (error: any) {
    console.error("Failed to send Slack notification:", error);
    throw new Error(`Slack API error: ${error.message}`);
  }
}

/**
 * Send an email notification
 * TODO: Implement actual email sending with Resend
 */
async function sendEmailNotification(
  rule: typeof notificationRule.$inferSelect,
  event: typeof changeEvent.$inferSelect
): Promise<void> {
  const recipients = rule.emailRecipients?.split(",").map((e) => e.trim());
  console.log(`📧 Sending email notification to: ${recipients?.join(", ")}`);

  // In production, use Resend:
  // import { Resend } from 'resend';
  // const resend = new Resend(process.env.RESEND_API_KEY);
  //
  // await resend.emails.send({
  //   from: 'AdsX Alerts <alerts@adsx.app>',
  //   to: recipients,
  //   subject: `[${event.severity.toUpperCase()}] ${event.changeType} - ${event.resourceName}`,
  //   html: formatEmailHtml(event),
  // });

  console.log("⚠️ Email API integration pending");
}

/**
 * Send a webhook notification
 */
async function sendWebhookNotification(
  rule: typeof notificationRule.$inferSelect,
  event: typeof changeEvent.$inferSelect
): Promise<void> {
  if (!rule.webhookUrl) return;

  console.log(`🔗 Sending webhook notification to: ${rule.webhookUrl}`);

  try {
    const response = await fetch(rule.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "AdsX-Webhook/1.0",
      },
      body: JSON.stringify({
        event: {
          id: event.id,
          type: "change_detected",
          created_at: event.createdAt.toISOString(),
        },
        change: {
          platform: event.platform,
          resource_type: event.resourceType,
          resource_id: event.resourceId,
          resource_name: event.resourceName,
          change_type: event.changeType,
          severity: event.severity,
          before_value: event.beforeValue,
          after_value: event.afterValue,
          diff: event.diff,
        },
        rule: {
          id: rule.id,
          name: rule.name,
          priority: rule.priority,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook returned ${response.status}`);
    }

    console.log(`✅ Webhook notification sent successfully`);
  } catch (error) {
    console.error(`❌ Failed to send webhook notification:`, error);
    throw error;
  }
}

/**
 * Format change event for Slack message
 */
function formatSlackMessage(event: typeof changeEvent.$inferSelect): string {
  const emoji = getSeverityEmoji(event.severity);
  return `${emoji} *${event.changeType.toUpperCase()}* - ${event.resourceName} (${event.resourceType})`;
}

/**
 * Get emoji for severity level
 */
function getSeverityEmoji(severity: string): string {
  switch (severity) {
    case "critical":
      return "🚨";
    case "warning":
      return "⚠️";
    case "info":
      return "ℹ️";
    default:
      return "📋";
  }
}

/**
 * Build Slack message blocks with rich formatting
 */
function buildSlackBlocks(
  event: typeof changeEvent.$inferSelect,
  rule: typeof notificationRule.$inferSelect
): any[] {
  const emoji = getSeverityEmoji(event.severity);
  const severityColor = getSeverityColor(event.severity);

  const blocks: any[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `${emoji} ${event.changeType.toUpperCase()} - ${event.resourceName}`,
        emoji: true,
      },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Resource Type:*\n${event.resourceType}`,
        },
        {
          type: "mrkdwn",
          text: `*Platform:*\n${event.platform === "meta" ? "Meta Ads" : "Google Ads"}`,
        },
        {
          type: "mrkdwn",
          text: `*Severity:*\n${event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}`,
        },
        {
          type: "mrkdwn",
          text: `*Detected:*\n<!date^${Math.floor(event.detectedAt.getTime() / 1000)}^{date_short_pretty} at {time}|${event.detectedAt.toISOString()}>`,
        },
      ],
    },
  ];

  // Add diff section if there are changes
  if (event.diff && Object.keys(event.diff).length > 0) {
    const diffFields: any[] = [];

    for (const [key, changes] of Object.entries(event.diff as Record<string, any>)) {
      const before = typeof changes.before === "object"
        ? JSON.stringify(changes.before, null, 2)
        : String(changes.before || "N/A");
      const after = typeof changes.after === "object"
        ? JSON.stringify(changes.after, null, 2)
        : String(changes.after || "N/A");

      diffFields.push({
        type: "mrkdwn",
        text: `*${key}:*\n~${before}~ → *${after}*`,
      });
    }

    if (diffFields.length > 0) {
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Changes:*",
        },
      });

      blocks.push({
        type: "section",
        fields: diffFields.slice(0, 10), // Slack limits to 10 fields
      });
    }
  }

  blocks.push({
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: `Triggered by rule: *${rule.name}* | Priority: ${rule.priority}`,
      },
    ],
  });

  return blocks;
}

/**
 * Get Slack color for severity level
 */
function getSeverityColor(severity: string): string {
  switch (severity) {
    case "critical":
      return "#FF0000";
    case "warning":
      return "#FFA500";
    case "info":
      return "#0000FF";
    default:
      return "#808080";
  }
}
