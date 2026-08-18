/**
 * GSC-LIB — Google Search Console API client, zero dependencies.
 *
 * Mints a service-account access token with Node's built-in crypto (RS256 JWT,
 * the standard 2-legged OAuth flow) and talks to the Search Console REST API
 * with global fetch. No `googleapis` / `google-auth-library` — nothing to
 * install, identical behaviour locally and in CI, fully auditable.
 *
 * Credentials (read once, in this order):
 *   1. GSC_SA_KEY       — the service-account JSON, inline (used in CI secrets)
 *   2. GSC_SA_KEY_FILE  — path to the JSON key file (default: gsc-sa-key.json)
 *
 * Scope is webmasters.readonly — this client can never mutate your property.
 */
import crypto from "node:crypto";
import fs from "node:fs";

const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const API = "https://searchconsole.googleapis.com";
const DEFAULT_KEY_FILE = "gsc-sa-key.json";

// ---------------------------------------------------------------- credentials
export function loadServiceAccount() {
  let raw = process.env.GSC_SA_KEY;
  let source = "GSC_SA_KEY env";
  if (!raw) {
    const file = process.env.GSC_SA_KEY_FILE || DEFAULT_KEY_FILE;
    if (!fs.existsSync(file)) {
      throw new Error(
        `No Search Console credentials found.\n` +
          `  Set GSC_SA_KEY (inline JSON) or place the key at ${file} ` +
          `(or point GSC_SA_KEY_FILE at it).\n` +
          `  See GSC-SETUP.md for the 5-minute setup.`
      );
    }
    raw = fs.readFileSync(file, "utf8");
    source = file;
  }
  let sa;
  try {
    sa = JSON.parse(raw);
  } catch {
    throw new Error(`Service-account credentials in ${source} are not valid JSON.`);
  }
  if (!sa.client_email || !sa.private_key) {
    throw new Error(`Service-account JSON in ${source} is missing client_email / private_key.`);
  }
  return sa;
}

// ------------------------------------------------------------------ jwt / auth
function b64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function signJwt(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: sa.client_email,
    scope: SCOPE,
    aud: sa.token_uri || "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const signingInput = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(claim))}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(signingInput);
  signer.end();
  const signature = b64url(signer.sign(sa.private_key));
  return `${signingInput}.${signature}`;
}

let _tokenCache = null; // { token, expiresAt }
export async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  if (_tokenCache && _tokenCache.expiresAt - 60 > now) return _tokenCache.token;
  const assertion = signJwt(sa);
  const res = await fetch(sa.token_uri || "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) {
    throw new Error(
      `Google token exchange failed (${res.status}): ${await res.text()}\n` +
        `  Common cause: the service account isn't added as a user on the GSC property, ` +
        `or the Search Console API isn't enabled for its project.`
    );
  }
  const json = await res.json();
  _tokenCache = { token: json.access_token, expiresAt: now + (json.expires_in || 3600) };
  return _tokenCache.token;
}

// -------------------------------------------------------------------- requests
async function api(token, path, { method = "GET", body } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) {
    const detail = await res.text();
    const err = new Error(`GSC ${method} ${path} → ${res.status}: ${detail}`);
    err.status = res.status;
    // Sitemap writes need the read-WRITE scope; a readonly token 403s here.
    if (res.status === 403 && /insufficient|scope|permission/i.test(detail)) {
      err.insufficientScope = true;
    }
    throw err;
  }
  // Sitemap PUT/DELETE succeed with an empty body — don't try to parse it.
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

const enc = (siteUrl) => encodeURIComponent(siteUrl);

/** List every property this service account can see. */
export async function listSites(token) {
  const json = await api(token, `/webmasters/v3/sites`);
  return json.siteEntry || [];
}

/**
 * Resolve which property to query. Explicit GSC_SITE_URL wins; otherwise prefer
 * a domain property (covers www + apex + http/https), then any adsx property,
 * then the first verified one. Returns { siteUrl, autoPicked, available }.
 */
export async function resolveSiteUrl(token, preferred = process.env.GSC_SITE_URL) {
  const sites = await listSites(token);
  const usable = sites.filter((s) => s.permissionLevel && s.permissionLevel !== "siteUnverifiedUser");
  if (preferred) {
    const match = usable.find((s) => s.siteUrl === preferred);
    if (!match) {
      throw new Error(
        `GSC_SITE_URL="${preferred}" is not among the properties this service account can access:\n` +
          usable.map((s) => `  - ${s.siteUrl} (${s.permissionLevel})`).join("\n") +
          `\n  Add the service account as a user on that property, or fix GSC_SITE_URL.`
      );
    }
    return { siteUrl: preferred, autoPicked: false, available: usable };
  }
  if (!usable.length) {
    throw new Error(
      `The service account can't access any GSC property yet.\n` +
        `  Add its email as a user in Search Console → Settings → Users and permissions.`
    );
  }
  const domain = usable.find((s) => s.siteUrl.startsWith("sc-domain:"));
  const adsx = usable.find((s) => /adsx/i.test(s.siteUrl));
  const pick = (domain || adsx || usable[0]).siteUrl;
  return { siteUrl: pick, autoPicked: true, available: usable };
}

/**
 * Search Analytics query with automatic pagination. Returns normalized rows
 * with named dimensions: [{ <dim>: value, ..., clicks, impressions, ctr, position }].
 */
export async function querySearchAnalytics(token, siteUrl, opts) {
  const {
    startDate,
    endDate,
    dimensions = [],
    rowLimit = 25000,
    dataState = "final",
    dimensionFilterGroups,
    type,
  } = opts;
  const path = `/webmasters/v3/sites/${enc(siteUrl)}/searchAnalytics/query`;
  const out = [];
  let startRow = 0;
  for (;;) {
    const body = { startDate, endDate, dimensions, rowLimit, startRow, dataState };
    if (dimensionFilterGroups) body.dimensionFilterGroups = dimensionFilterGroups;
    if (type) body.type = type;
    const json = await api(token, path, { method: "POST", body });
    const rows = json.rows || [];
    for (const r of rows) {
      const rec = {};
      dimensions.forEach((d, i) => {
        rec[d] = r.keys[i];
      });
      rec.clicks = r.clicks ?? 0;
      rec.impressions = r.impressions ?? 0;
      rec.ctr = r.ctr ?? 0;
      rec.position = r.position ?? 0;
      out.push(rec);
    }
    if (rows.length < rowLimit) break;
    startRow += rowLimit;
  }
  return out;
}

/** Sitemaps + their submitted/indexed counts (the real "indexed pages" number). */
export async function listSitemaps(token, siteUrl) {
  const json = await api(token, `/webmasters/v3/sites/${enc(siteUrl)}/sitemaps`);
  return (json.sitemap || []).map((s) => ({
    path: s.path,
    lastSubmitted: s.lastSubmitted || null,
    lastDownloaded: s.lastDownloaded || null,
    isPending: !!s.isPending,
    isSitemapsIndex: !!s.isSitemapsIndex,
    warnings: Number(s.warnings || 0),
    errors: Number(s.errors || 0),
    contents: (s.contents || []).map((c) => ({
      type: c.type,
      submitted: Number(c.submitted || 0),
      indexed: Number(c.indexed || 0),
    })),
  }));
}

/**
 * Register a sitemap with the property (idempotent — re-submitting refreshes it).
 * Requires the read-write `webmasters` scope; a readonly credential gets a 403
 * with `insufficientScope` set on the error.
 */
export async function submitSitemap(token, siteUrl, feedpath) {
  await api(token, `/webmasters/v3/sites/${enc(siteUrl)}/sitemaps/${enc(feedpath)}`, {
    method: "PUT",
  });
  return feedpath;
}

/** Un-register a sitemap. Use for stale paths that now 404 in GSC. */
export async function deleteSitemap(token, siteUrl, feedpath) {
  await api(token, `/webmasters/v3/sites/${enc(siteUrl)}/sitemaps/${enc(feedpath)}`, {
    method: "DELETE",
  });
  return feedpath;
}

/**
 * URL Inspection — per-URL index status. Rate limited (2000/day, 600/min) so
 * this is for sampling, not a nightly full scan. Returns the inspectionResult.
 */
export async function inspectUrl(token, siteUrl, inspectionUrl) {
  const json = await api(token, `/v1/urlInspection/index:inspect`, {
    method: "POST",
    body: { inspectionUrl, siteUrl, languageCode: "en-US" },
  });
  return json.inspectionResult || null;
}

// ----------------------------------------------------------------- date helpers
export function isoDate(d) {
  return d.toISOString().slice(0, 10);
}
export function daysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return isoDate(d);
}
export function today() {
  return isoDate(new Date());
}

// --------------------------------------------------------------- OAuth (user)
// Preferred when an org policy blocks service-account keys, or when you'd rather
// authenticate as yourself (you already own the GSC property — no user to add).
// Mint the refresh token once with `npm run gsc:auth`.
function loadOAuthConfig() {
  let client_id = process.env.GSC_OAUTH_CLIENT_ID;
  let client_secret = process.env.GSC_OAUTH_CLIENT_SECRET;
  let refresh_token = process.env.GSC_OAUTH_REFRESH_TOKEN;
  if ((!client_id || !client_secret || !refresh_token) && fs.existsSync("gsc-oauth.json")) {
    const j = JSON.parse(fs.readFileSync("gsc-oauth.json", "utf8"));
    client_id = client_id || j.client_id;
    client_secret = client_secret || j.client_secret;
    refresh_token = refresh_token || j.refresh_token;
  }
  return { client_id, client_secret, refresh_token };
}

let _oauthCache = null;
async function getAccessTokenOAuth(cfg) {
  const now = Math.floor(Date.now() / 1000);
  if (_oauthCache && _oauthCache.expiresAt - 60 > now) return _oauthCache.token;
  if (!cfg.client_id || !cfg.client_secret) {
    throw new Error("OAuth refresh token is set but GSC_OAUTH_CLIENT_ID / GSC_OAUTH_CLIENT_SECRET are missing.");
  }
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: cfg.client_id,
      client_secret: cfg.client_secret,
      refresh_token: cfg.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) {
    throw new Error(
      `OAuth token refresh failed (${res.status}): ${await res.text()}\n` +
        `  If this says invalid_grant, the refresh token was revoked/expired — re-run \`npm run gsc:auth\`.`
    );
  }
  const json = await res.json();
  _oauthCache = { token: json.access_token, expiresAt: now + (json.expires_in || 3600) };
  return _oauthCache.token;
}

/** Get an access token via whichever method is configured (OAuth preferred). */
export async function getToken() {
  const oauth = loadOAuthConfig();
  if (oauth.refresh_token) {
    return { token: await getAccessTokenOAuth(oauth), principal: "OAuth user credential" };
  }
  if (process.env.GSC_SA_KEY || process.env.GSC_SA_KEY_FILE || fs.existsSync(DEFAULT_KEY_FILE)) {
    const sa = loadServiceAccount();
    return { token: await getAccessToken(sa), principal: sa.client_email };
  }
  throw new Error(
    `No Search Console credentials configured. Two options (see GSC-SETUP.md):\n` +
      `  OAuth (recommended — works even when the org blocks service-account keys):\n` +
      `    run \`npm run gsc:auth\` once, or set GSC_OAUTH_CLIENT_ID / _SECRET / _REFRESH_TOKEN.\n` +
      `  Service account: set GSC_SA_KEY (inline JSON) or place the key at ${DEFAULT_KEY_FILE}.`
  );
}

/** One call that authenticates and resolves the property. */
export async function connect() {
  const { token, principal } = await getToken();
  const { siteUrl, autoPicked, available } = await resolveSiteUrl(token);
  return { token, siteUrl, autoPicked, available, principal };
}
