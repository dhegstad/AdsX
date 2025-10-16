import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const organizationId = searchParams.get("org");

  if (!organizationId) {
    return NextResponse.json(
      { error: "Organization ID is required" },
      { status: 400 }
    );
  }

  // Meta OAuth configuration
  const clientId = process.env.META_APP_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/meta/callback`;

  if (!clientId) {
    console.error("META_APP_ID is not configured");
    return NextResponse.json(
      { error: "OAuth not configured" },
      { status: 500 }
    );
  }

  // Scopes required for Meta Ads API
  const scopes = [
    "ads_read",
    "ads_management",
    "business_management",
  ].join(",");

  // State parameter to prevent CSRF and pass organization ID
  const state = Buffer.from(
    JSON.stringify({ organizationId, timestamp: Date.now() })
  ).toString("base64");

  // Construct Meta OAuth URL
  const authUrl = new URL("https://www.facebook.com/v18.0/dialog/oauth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("scope", scopes);
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("response_type", "code");

  // Redirect to Meta OAuth
  return NextResponse.redirect(authUrl.toString());
}
