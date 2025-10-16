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

  // Google OAuth configuration
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/google/callback`;

  if (!clientId) {
    console.error("GOOGLE_CLIENT_ID is not configured");
    return NextResponse.json(
      { error: "OAuth not configured" },
      { status: 500 }
    );
  }

  // Scopes required for Google Ads API
  const scopes = [
    "https://www.googleapis.com/auth/adwords",
    "https://www.googleapis.com/auth/userinfo.email",
  ].join(" ");

  // State parameter to prevent CSRF and pass organization ID
  const state = Buffer.from(
    JSON.stringify({ organizationId, timestamp: Date.now() })
  ).toString("base64");

  // Construct Google OAuth URL
  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("scope", scopes);
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");

  // Redirect to Google OAuth
  return NextResponse.redirect(authUrl.toString());
}
