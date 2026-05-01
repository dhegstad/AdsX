import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { submitUrlsForIndexing } from "@/lib/google-search-console";

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

  const results = await submitUrlsForIndexing(googleAccount.accessToken, urls);

  const succeeded = results.filter((r) => !r.result.error).length;
  const failed = results.filter((r) => r.result.error).length;

  return NextResponse.json({
    submitted: results.length,
    succeeded,
    failed,
    results,
  });
}
