import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { inspectUrls, getSearchAnalytics } from "@/lib/google-search-console";
import sitemap from "@/app/sitemap";
import type { UrlStatus, IndexCoverageStats } from "@/types/search-console";

const SITE_URL = process.env.SITE_URL || "https://www.adsx.com";

async function getGoogleToken(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const accounts = await auth.api.listUserAccounts({ headers: await headers() });
  if (!accounts) return null;

  const googleAccount = (accounts as { providerId: string; accessToken?: string }[]).find(
    (a) => a.providerId === "google"
  );
  return googleAccount?.accessToken || null;
}

export async function GET(req: NextRequest) {
  const token = await getGoogleToken(req);
  if (!token) {
    return NextResponse.json(
      { error: "Not authenticated or no Google account linked" },
      { status: 401 }
    );
  }

  const searchParams = req.nextUrl.searchParams;
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
  const offset = parseInt(searchParams.get("offset") || "0");

  // Get all site URLs from sitemap (core pages + all blog chunks)
  const { generateSitemaps } = await import("@/app/sitemap");
  const sitemapIds = await generateSitemaps();
  const allEntries = await Promise.all(
    sitemapIds.map((s) => sitemap(s))
  );
  const allUrls = allEntries.flat().map((entry) => entry.url);

  const total = allUrls.length;
  const paginatedUrls = allUrls.slice(offset, offset + limit);

  // Fetch inspection results and analytics in parallel
  const [inspectionResults, analyticsRows] = await Promise.all([
    inspectUrls(token, paginatedUrls, SITE_URL),
    offset === 0
      ? getSearchAnalytics(token, SITE_URL)
      : Promise.resolve([]),
  ]);

  // Build analytics lookup
  const analyticsMap = new Map<string, { clicks: number; impressions: number; position: number }>();
  for (const row of analyticsRows) {
    const pageUrl = row.keys[0];
    analyticsMap.set(pageUrl, {
      clicks: row.clicks,
      impressions: row.impressions,
      position: row.position,
    });
  }

  // Combine results
  const urls: UrlStatus[] = paginatedUrls.map((url) => {
    const inspection = inspectionResults.get(url);
    const analytics = analyticsMap.get(url);

    return {
      url,
      verdict: inspection?.indexStatusResult?.verdict,
      coverageState: inspection?.indexStatusResult?.coverageState,
      lastCrawlTime: inspection?.indexStatusResult?.lastCrawlTime,
      pageFetchState: inspection?.indexStatusResult?.pageFetchState,
      indexingState: inspection?.indexStatusResult?.indexingState,
      clicks: analytics?.clicks,
      impressions: analytics?.impressions,
      position: analytics?.position,
    };
  });

  // Calculate stats from this batch
  const stats: IndexCoverageStats = {
    total,
    indexed: urls.filter((u) => u.verdict === "PASS").length,
    notIndexed: urls.filter(
      (u) => u.verdict && u.verdict !== "PASS" && u.verdict !== "FAIL"
    ).length,
    errors: urls.filter((u) => u.verdict === "FAIL").length,
  };

  return NextResponse.json({ stats, urls, total, offset, limit });
}
