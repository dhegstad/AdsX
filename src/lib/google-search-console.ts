import type {
  InspectionResult,
  IndexingSubmitResult,
  AnalyticsRow,
} from "@/types/search-console";

const INSPECTION_API =
  "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";
const INDEXING_API =
  "https://indexing.googleapis.com/v3/urlNotifications:publish";
const SEARCH_ANALYTICS_API =
  "https://www.googleapis.com/webmasters/v3/sites";

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function verifySiteAccess(
  token: string,
  siteUrl: string
): Promise<boolean> {
  const encoded = encodeURIComponent(siteUrl);
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encoded}`,
    { headers: authHeaders(token) }
  );
  return res.ok;
}

export async function inspectUrl(
  token: string,
  url: string,
  siteUrl: string
): Promise<InspectionResult | null> {
  const res = await fetch(INSPECTION_API, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({
      inspectionUrl: url,
      siteUrl,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`URL Inspection failed for ${url}:`, err);
    return null;
  }

  const data = await res.json();
  return data.inspectionResult as InspectionResult;
}

export async function inspectUrls(
  token: string,
  urls: string[],
  siteUrl: string
): Promise<Map<string, InspectionResult | null>> {
  const results = new Map<string, InspectionResult | null>();
  const batchSize = 10;

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map((url) => inspectUrl(token, url, siteUrl))
    );

    batch.forEach((url, idx) => {
      results.set(url, batchResults[idx]);
    });

    // Rate limit: pause between batches
    if (i + batchSize < urls.length) {
      await delay(1000);
    }
  }

  return results;
}

export async function submitUrlForIndexing(
  token: string,
  url: string
): Promise<IndexingSubmitResult> {
  const res = await fetch(INDEXING_API, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({
      url,
      type: "URL_UPDATED",
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`Indexing submit failed for ${url}:`, errText);
    return {
      error: {
        code: res.status,
        message: errText,
        status: res.statusText,
      },
    };
  }

  return res.json();
}

export async function submitUrlsForIndexing(
  token: string,
  urls: string[]
): Promise<{ url: string; result: IndexingSubmitResult }[]> {
  const results: { url: string; result: IndexingSubmitResult }[] = [];
  const batchSize = 10;

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(async (url) => ({
        url,
        result: await submitUrlForIndexing(token, url),
      }))
    );

    results.push(...batchResults);

    if (i + batchSize < urls.length) {
      await delay(1000);
    }
  }

  return results;
}

export async function getSearchAnalytics(
  token: string,
  siteUrl: string,
  options: { days?: number } = {}
): Promise<AnalyticsRow[]> {
  const days = options.days || 28;
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const format = (d: Date) => d.toISOString().split("T")[0];

  const encoded = encodeURIComponent(siteUrl);
  const res = await fetch(
    `${SEARCH_ANALYTICS_API}/${encoded}/searchAnalytics/query`,
    {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({
        startDate: format(startDate),
        endDate: format(endDate),
        dimensions: ["page"],
        rowLimit: 5000,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Search Analytics failed:", err);
    return [];
  }

  const data = await res.json();
  return (data.rows || []) as AnalyticsRow[];
}
