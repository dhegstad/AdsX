import { NextRequest, NextResponse } from "next/server";
import { WebClient } from "@slack/web-api";
import { db } from "@/lib/db/client";
import { slackIntegration } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * Slack OAuth callback handler
 * Exchanges code for access token and stores integration
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state"); // Organization ID
  const error = searchParams.get("error");

  // Check for OAuth errors
  if (error) {
    console.error("Slack OAuth error:", error);
    return NextResponse.redirect(
      `${request.nextUrl.origin}/${state}/settings?error=slack_auth_failed`
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      `${request.nextUrl.origin}/${state}/settings?error=invalid_request`
    );
  }

  const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;
  const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;

  if (!SLACK_CLIENT_ID || !SLACK_CLIENT_SECRET) {
    console.error("Slack credentials not configured");
    return NextResponse.redirect(
      `${request.nextUrl.origin}/${state}/settings?error=server_config`
    );
  }

  try {
    // Exchange code for access token
    const slackClient = new WebClient();
    const response = await slackClient.oauth.v2.access({
      client_id: SLACK_CLIENT_ID,
      client_secret: SLACK_CLIENT_SECRET,
      code,
      redirect_uri: `${request.nextUrl.origin}/api/oauth/slack/callback`,
    });

    if (!response.ok || !response.access_token) {
      throw new Error("Failed to exchange code for token");
    }

    console.log("✅ Slack OAuth successful:", response.team?.name);

    // Check if integration already exists for this organization
    const [existingIntegration] = await db
      .select()
      .from(slackIntegration)
      .where(eq(slackIntegration.organizationId, state))
      .limit(1);

    if (existingIntegration) {
      // Update existing integration
      await db
        .update(slackIntegration)
        .set({
          teamId: response.team?.id || "",
          teamName: response.team?.name || "",
          accessToken: response.access_token,
          botUserId: response.bot_user_id,
          scope: response.scope,
          isActive: true,
          updatedAt: new Date(),
        })
        .where(eq(slackIntegration.id, existingIntegration.id));

      console.log("Updated existing Slack integration");
    } else {
      // Create new integration
      await db.insert(slackIntegration).values({
        organizationId: state,
        teamId: response.team?.id || "",
        teamName: response.team?.name || "",
        accessToken: response.access_token,
        botUserId: response.bot_user_id,
        scope: response.scope,
        isActive: true,
      });

      console.log("Created new Slack integration");
    }

    // Redirect back to settings with success
    return NextResponse.redirect(
      `${request.nextUrl.origin}/${state}/settings?success=slack_connected`
    );
  } catch (error) {
    console.error("Error in Slack OAuth callback:", error);
    return NextResponse.redirect(
      `${request.nextUrl.origin}/${state}/settings?error=slack_auth_failed`
    );
  }
}
