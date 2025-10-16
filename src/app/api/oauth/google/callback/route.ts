import { NextRequest, NextResponse } from "next/server";
import { createAdAccount } from "@/lib/actions/ad-accounts";
import { db } from "@/lib/db/client";
import { organization } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  // Handle OAuth errors
  if (error) {
    console.error("Google OAuth error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}?error=oauth_failed`
    );
  }

  if (!code || !state) {
    return NextResponse.json(
      { error: "Missing code or state" },
      { status: 400 }
    );
  }

  try {
    // Decode state to get organization ID
    const stateData = JSON.parse(Buffer.from(state, "base64").toString());
    const organizationId = stateData.organizationId;

    // Get organization slug for redirect
    const [org] = await db
      .select()
      .from(organization)
      .where(eq(organization.id, organizationId))
      .limit(1);

    if (!org) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      );
    }

    // Exchange code for access token
    const tokenUrl = "https://oauth2.googleapis.com/token";
    const tokenBody = new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/google/callback`,
      grant_type: "authorization_code",
    });

    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: tokenBody.toString(),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Failed to exchange code for token:", tokenData);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/${org.slug}/connections?error=token_exchange_failed`
      );
    }

    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;

    // Get user's Google Ads accounts using Google Ads API
    // Note: This is a simplified version. In production, you'd use the Google Ads API client library
    const adsApiUrl = "https://googleads.googleapis.com/v16/customers:listAccessibleCustomers";

    const adsResponse = await fetch(adsApiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
      },
    });

    const adsData = await adsResponse.json();

    if (!adsResponse.ok) {
      console.error("Failed to fetch Google Ads accounts:", adsData);
      // Store a placeholder account even if we can't fetch the list
      await createAdAccount({
        organizationId,
        platform: "google",
        accountId: "google-ads-account",
        accountName: "Google Ads Account",
        accessToken,
        refreshToken,
        expiresAt: tokenData.expires_in
          ? new Date(Date.now() + tokenData.expires_in * 1000)
          : undefined,
      });

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/${org.slug}/connections?success=google_connected`
      );
    }

    // Store the first accessible customer (TODO: Let user select which accounts to connect)
    if (adsData.resourceNames && adsData.resourceNames.length > 0) {
      const firstCustomer = adsData.resourceNames[0];
      const customerId = firstCustomer.split("/")[1]; // Extract customer ID from resource name

      await createAdAccount({
        organizationId,
        platform: "google",
        accountId: customerId,
        accountName: `Google Ads - ${customerId}`,
        accessToken,
        refreshToken,
        expiresAt: tokenData.expires_in
          ? new Date(Date.now() + tokenData.expires_in * 1000)
          : undefined,
      });
    } else {
      // No accounts found, store placeholder
      await createAdAccount({
        organizationId,
        platform: "google",
        accountId: "google-ads-account",
        accountName: "Google Ads Account",
        accessToken,
        refreshToken,
        expiresAt: tokenData.expires_in
          ? new Date(Date.now() + tokenData.expires_in * 1000)
          : undefined,
      });
    }

    // Redirect back to connections page
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/${org.slug}/connections?success=google_connected`
    );
  } catch (error) {
    console.error("Error in Google OAuth callback:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}?error=oauth_callback_failed`
    );
  }
}
