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
    console.error("Meta OAuth error:", error);
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
    const tokenUrl = "https://graph.facebook.com/v18.0/oauth/access_token";
    const tokenParams = new URLSearchParams({
      client_id: process.env.META_APP_ID!,
      client_secret: process.env.META_APP_SECRET!,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/meta/callback`,
      code,
    });

    const tokenResponse = await fetch(`${tokenUrl}?${tokenParams.toString()}`);
    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Failed to exchange code for token:", tokenData);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/${org.slug}/connections?error=token_exchange_failed`
      );
    }

    const accessToken = tokenData.access_token;

    // Get user's ad accounts
    const adAccountsUrl = `https://graph.facebook.com/v18.0/me/adaccounts`;
    const adAccountsParams = new URLSearchParams({
      access_token: accessToken,
      fields: "id,name,account_status",
    });

    const adAccountsResponse = await fetch(
      `${adAccountsUrl}?${adAccountsParams.toString()}`
    );
    const adAccountsData = await adAccountsResponse.json();

    if (!adAccountsResponse.ok || !adAccountsData.data) {
      console.error("Failed to fetch ad accounts:", adAccountsData);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/${org.slug}/connections?error=fetch_accounts_failed`
      );
    }

    // Store the first ad account (TODO: Let user select which accounts to connect)
    if (adAccountsData.data.length > 0) {
      const firstAccount = adAccountsData.data[0];

      await createAdAccount({
        organizationId,
        platform: "meta",
        accountId: firstAccount.id,
        accountName: firstAccount.name || "Meta Ad Account",
        accessToken,
        expiresAt: tokenData.expires_in
          ? new Date(Date.now() + tokenData.expires_in * 1000)
          : undefined,
      });
    }

    // Redirect back to connections page
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/${org.slug}/connections?success=meta_connected`
    );
  } catch (error) {
    console.error("Error in Meta OAuth callback:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}?error=oauth_callback_failed`
    );
  }
}
