import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getSearchAnalytics } from "@/lib/google-search-console";

const SITE_URL = process.env.SITE_URL || "https://www.adsx.com";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const accounts = await auth.api.listUserAccounts({ headers: await headers() });
  if (!accounts) {
    return NextResponse.json({ error: "No Google account linked" }, { status: 401 });
  }

  const googleAccount = (accounts as { providerId: string; accessToken?: string }[]).find(
    (a) => a.providerId === "google"
  );
  if (!googleAccount?.accessToken) {
    return NextResponse.json({ error: "No Google account linked" }, { status: 401 });
  }

  const days = parseInt(req.nextUrl.searchParams.get("days") || "28");

  const rows = await getSearchAnalytics(googleAccount.accessToken, SITE_URL, {
    days,
  });

  return NextResponse.json({ rows, days });
}
