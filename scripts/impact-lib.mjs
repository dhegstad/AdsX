/**
 * IMPACT-LIB — impact.com (Impact Radius) Media Partner API client, zero deps.
 *
 * The affiliate half of the pipeline. Where gsc-lib measures Google→adsx.com
 * (inbound search), this measures adsx.com→Shopify (outbound affiliate clicks)
 * and the bounties they earn. Talks to the Partner REST API with global fetch
 * and HTTP Basic auth — no SDK, identical behaviour locally and in CI.
 *
 * Credentials (read once, in this order):
 *   1. IMPACT_ACCOUNT_SID + IMPACT_AUTH_TOKEN — env vars (used in CI secrets)
 *   2. impact-auth.json  { account_sid, auth_token } — git-ignored local file
 *
 * The Account SID (a ~34-char string starting "IR…") and Auth Token both live
 * on impact.com → Settings → Technical Settings → API. Read-only usage here.
 * Auth is HTTP Basic: username = Account SID, password = Auth Token.
 * Base path for a partner: https://api.impact.com/Mediapartners/{AccountSID}/
 */
import fs from "node:fs";

// Override only for local testing against a mock server; defaults to production.
const API = process.env.IMPACT_API_BASE || "https://api.impact.com";

// ---------------------------------------------------------------- credentials
export function loadCredentials() {
  let account_sid = process.env.IMPACT_ACCOUNT_SID;
  let auth_token = process.env.IMPACT_AUTH_TOKEN;
  let source = "env";
  if ((!account_sid || !auth_token) && fs.existsSync("impact-auth.json")) {
    let j;
    try {
      j = JSON.parse(fs.readFileSync("impact-auth.json", "utf8"));
    } catch {
      throw new Error("impact-auth.json is not valid JSON.");
    }
    account_sid = account_sid || j.account_sid || j.AccountSid || j.accountSid;
    auth_token = auth_token || j.auth_token || j.AuthToken || j.authToken;
    source = "impact-auth.json";
  }
  if (!account_sid || !auth_token) return null; // caller decides: skip vs. fail
  return { account_sid, auth_token, source };
}

/** Mask the SID for committed output — it's an identifier, not the secret, but keep it terse. */
export function maskSid(sid) {
  return sid.length > 8 ? `${sid.slice(0, 4)}…${sid.slice(-4)}` : "IR…";
}

function authHeader({ account_sid, auth_token }) {
  return `Basic ${Buffer.from(`${account_sid}:${auth_token}`).toString("base64")}`;
}

// -------------------------------------------------------------------- requests
/**
 * GET JSON from a Mediapartners path ("/Actions", "/Reports") or an absolute
 * uri (e.g. an @nextpageuri). `params` are appended as query string.
 */
export async function apiGet(creds, pathOrUri, params) {
  const base = pathOrUri.startsWith("http")
    ? pathOrUri
    : `${API}/Mediapartners/${creds.account_sid}${pathOrUri}`;
  const url = new URL(base);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, v);
    }
  }
  const res = await fetch(url, {
    headers: { Authorization: authHeader(creds), Accept: "application/json" },
  });
  if (!res.ok) {
    const body = (await res.text()).replace(/\s+/g, " ").slice(0, 300);
    const hint =
      res.status === 401
        ? " (401 = bad Account SID / Auth Token — check Settings → Technical Settings)"
        : "";
    throw new Error(`Impact GET ${url.pathname}${url.search} → ${res.status}${hint}: ${body}`);
  }
  return res.json();
}

/**
 * Page through an Impact collection. Responses wrap the items in a named key
 * alongside paging fields: { "@page", "@numpages", "@total", <itemsKey>: [...] }.
 * Loops Page=1..@numpages (robust to @nextpageuri format changes).
 */
export async function apiGetAll(creds, path, params, itemsKey) {
  const out = [];
  let page = 1;
  let numpages = 1;
  do {
    const json = await apiGet(creds, path, { PageSize: 20000, ...params, Page: page });
    const items = json[itemsKey] || [];
    out.push(...items);
    numpages = Number(json["@numpages"] || 1) || 1;
    page += 1;
  } while (page <= numpages);
  return out;
}

// ----------------------------------------------------------------- date helpers
export function isoDate(d) {
  return d.toISOString().slice(0, 10);
}
export function today() {
  return isoDate(new Date());
}
export function daysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return isoDate(d);
}

/**
 * Split [startDate, endDate] into ≤`maxSpan`-day sub-windows (inclusive ISO
 * dates). Impact caps some date filters at 45 days; 30 keeps us clear with room.
 */
export function dateWindows(startDate, endDate, maxSpan = 30) {
  const windows = [];
  let cursor = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);
  while (cursor <= end) {
    const winEnd = new Date(cursor);
    winEnd.setUTCDate(winEnd.getUTCDate() + maxSpan - 1);
    windows.push({ start: isoDate(cursor), end: isoDate(winEnd < end ? winEnd : end) });
    cursor = new Date(winEnd);
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return windows;
}
