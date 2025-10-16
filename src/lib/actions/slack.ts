"use server";

import { db } from "@/lib/db/client";
import { slackIntegration } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { WebClient } from "@slack/web-api";

/**
 * Get Slack integration for an organization
 */
export async function getSlackIntegration(organizationId: string) {
  try {
    const [integration] = await db
      .select()
      .from(slackIntegration)
      .where(eq(slackIntegration.organizationId, organizationId))
      .limit(1);

    return { success: true, integration: integration || null };
  } catch (error) {
    console.error("Error fetching Slack integration:", error);
    return { success: false, integration: null };
  }
}

/**
 * Disconnect Slack integration
 */
export async function disconnectSlack(data: {
  integrationId: string;
  organizationId: string;
}) {
  try {
    await db
      .delete(slackIntegration)
      .where(
        and(
          eq(slackIntegration.id, data.integrationId),
          eq(slackIntegration.organizationId, data.organizationId)
        )
      );

    return { success: true };
  } catch (error) {
    console.error("Error disconnecting Slack:", error);
    return { success: false, error: "Failed to disconnect Slack" };
  }
}

/**
 * List Slack channels available in the connected workspace
 */
export async function listSlackChannels(organizationId: string) {
  try {
    const [integration] = await db
      .select()
      .from(slackIntegration)
      .where(
        and(
          eq(slackIntegration.organizationId, organizationId),
          eq(slackIntegration.isActive, true)
        )
      )
      .limit(1);

    if (!integration) {
      return { success: false, channels: [], error: "Slack not connected" };
    }

    const slackClient = new WebClient(integration.accessToken);

    // Get public channels
    const publicChannels = await slackClient.conversations.list({
      exclude_archived: true,
      types: "public_channel",
      limit: 200,
    });

    // Get private channels the bot is a member of
    const privateChannels = await slackClient.conversations.list({
      exclude_archived: true,
      types: "private_channel",
      limit: 200,
    });

    const channels = [
      ...(publicChannels.channels || []),
      ...(privateChannels.channels || []),
    ].map((channel: any) => ({
      id: channel.id,
      name: channel.name,
      isPrivate: channel.is_private,
      isMember: channel.is_member,
    }));

    return { success: true, channels };
  } catch (error: any) {
    console.error("Error listing Slack channels:", error);
    return {
      success: false,
      channels: [],
      error: error.message || "Failed to fetch channels",
    };
  }
}

/**
 * Test Slack integration by sending a test message
 */
export async function testSlackIntegration(data: {
  organizationId: string;
  channelId: string;
  channelName: string;
}) {
  try {
    const [integration] = await db
      .select()
      .from(slackIntegration)
      .where(
        and(
          eq(slackIntegration.organizationId, data.organizationId),
          eq(slackIntegration.isActive, true)
        )
      )
      .limit(1);

    if (!integration) {
      return { success: false, error: "Slack not connected" };
    }

    const slackClient = new WebClient(integration.accessToken);

    await slackClient.chat.postMessage({
      channel: data.channelId,
      text: "🎉 Success! Your Slack integration is working correctly.",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "✅ Test Message from AdsX",
            emoji: true,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Your Slack integration is configured correctly! You'll receive notifications here when changes are detected in your ad accounts.",
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `Channel: #${data.channelName} | Integration: ${integration.teamName}`,
            },
          ],
        },
      ],
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error testing Slack integration:", error);
    return {
      success: false,
      error: error.message || "Failed to send test message",
    };
  }
}
