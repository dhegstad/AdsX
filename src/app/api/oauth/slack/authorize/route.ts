import { NextRequest, NextResponse } from "next/server";

/**
 * Slack OAuth authorization endpoint
 * Redirects user to Slack to authorize the app
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orgId = searchParams.get("org");

  if (!orgId) {
    return NextResponse.json({ error: "Organization ID required" }, { status: 400 });
  }

  const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;
  if (!SLACK_CLIENT_ID) {
    console.error("SLACK_CLIENT_ID not configured");
    return NextResponse.json({ error: "Slack not configured" }, { status: 500 });
  }

  // Slack OAuth scopes we need
  const scopes = [
    "chat:write",           // Send messages
    "chat:write.public",    // Send messages to public channels without joining
    "channels:read",        // List public channels
    "groups:read",          // List private channels
    "im:write",             // Send DMs
    "users:read",           // Read user information
  ].join(",");

  // Build Slack OAuth URL
  const slackAuthUrl = new URL("https://slack.com/oauth/v2/authorize");
  slackAuthUrl.searchParams.set("client_id", SLACK_CLIENT_ID);
  slackAuthUrl.searchParams.set("scope", scopes);
  slackAuthUrl.searchParams.set("redirect_uri", `${request.nextUrl.origin}/api/oauth/slack/callback`);
  slackAuthUrl.searchParams.set("state", orgId); // Pass org ID in state

  return NextResponse.redirect(slackAuthUrl.toString());
}
