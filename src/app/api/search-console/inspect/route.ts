import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { inspectUrls } from "@/lib/google-search-console";
import type { UrlStatus } from "@/types/search-console";

const SITE_URL = process.env.SITE_URL || "https://www.adsx.com";

export async function POST(req: NextRequest) {
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

  const body = await req.json();
  const urls: string[] = body.urls;

  if (!Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json({ error: "urls array required" }, { status: 400 });
  }

  if (urls.length > 50) {
    return NextResponse.json({ error: "Maximum 50 URLs per request" }, { status: 400 });
  }

  const results = await inspectUrls(googleAccount.accessToken, urls, SITE_URL);

  const urlStatuses: UrlStatus[] = urls.map((url) => {
    const inspection = results.get(url);
    return {
      url,
      verdict: inspection?.indexStatusResult?.verdict,
      coverageState: inspection?.indexStatusResult?.coverageState,
      lastCrawlTime: inspection?.indexStatusResult?.lastCrawlTime,
      pageFetchState: inspection?.indexStatusResult?.pageFetchState,
      indexingState: inspection?.indexStatusResult?.indexingState,
    };
  });

  return NextResponse.json({ urls: urlStatuses });
}
