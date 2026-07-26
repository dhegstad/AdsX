#!/usr/bin/env node
/**
 * GSC AUTH — one-time OAuth consent to mint a long-lived refresh token.
 *
 * Use this when service-account keys are blocked by an org policy (Workspace),
 * or when you'd rather authenticate as yourself (you already own the property).
 * Authorize once in the browser; this saves gsc-oauth.json (git-ignored) which
 * the pipeline picks up automatically, and prints the three GitHub secrets.
 *
 * Needs an OAuth client of type **Desktop app** (loopback redirect). Provide it via:
 *   GSC_OAUTH_CLIENT_FILE=~/Downloads/client_secret_*.json  npm run gsc:auth
 *   # or: GSC_OAUTH_CLIENT_ID=... GSC_OAUTH_CLIENT_SECRET=... npm run gsc:auth
 */
import http from "node:http";
import crypto from "node:crypto";
import fs from "node:fs";
import { exec } from "node:child_process";

const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

function loadClient() {
  let id = process.env.GSC_OAUTH_CLIENT_ID;
  let secret = process.env.GSC_OAUTH_CLIENT_SECRET;
  const file = process.env.GSC_OAUTH_CLIENT_FILE;
  if ((!id || !secret) && file) {
    const path = file.replace(/^~(?=$|\/)/, process.env.HOME || "~");
    const j = JSON.parse(fs.readFileSync(path, "utf8"));
    const c = j.installed || j.web || j; // Desktop clients nest under "installed"
    id = id || c.client_id;
    secret = secret || c.client_secret;
  }
  if (!id || !secret) {
    console.error(
      "\n  Missing OAuth client. Provide one of:\n" +
        "    GSC_OAUTH_CLIENT_FILE=~/Downloads/client_secret_*.json  (the JSON you downloaded)\n" +
        "    GSC_OAUTH_CLIENT_ID=... GSC_OAUTH_CLIENT_SECRET=...\n" +
        "  Create a 'Desktop app' OAuth client — see GSC-SETUP.md.\n"
    );
    process.exit(1);
  }
  return { id, secret };
}

async function main() {
  const { id, secret } = loadClient();
  const state = crypto.randomBytes(16).toString("hex");

  // Local loopback server catches Google's redirect.
  const server = http.createServer();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const port = server.address().port;
  const redirectUri = `http://127.0.0.1:${port}`;

  const codePromise = new Promise((resolve, reject) => {
    server.on("request", (req, res) => {
      const url = new URL(req.url, redirectUri);
      const code = url.searchParams.get("code");
      const error = url.searchParams.get("error");
      if (!code && !error) {
        res.writeHead(404);
        res.end();
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h2>AdsX GSC — authorization received. You can close this tab.</h2>");
      server.close();
      if (error) return reject(new Error("Authorization denied: " + error));
      if (url.searchParams.get("state") !== state) return reject(new Error("State mismatch (possible CSRF)."));
      resolve(code);
    });
  });

  const authUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: id,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: SCOPE,
      access_type: "offline", // ← returns a refresh_token
      prompt: "consent", // ← forces a fresh refresh_token even on re-auth
      state,
    });

  console.log(`\n  Opening your browser to authorize.`);
  console.log(`  ▶ Approve with the Google account that owns the AdsX Search Console property.\n`);
  console.log(`  If the browser doesn't open, paste this URL:\n\n  ${authUrl}\n`);
  exec(`open '${authUrl}' 2>/dev/null || xdg-open '${authUrl}' 2>/dev/null`, () => {});

  const code = await codePromise;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: id,
      client_secret: secret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
  });
  if (!res.ok) {
    console.error(`\n  ✗ Token exchange failed (${res.status}): ${await res.text()}\n`);
    process.exit(1);
  }
  const tok = await res.json();
  if (!tok.refresh_token) {
    console.error(
      `\n  ✗ No refresh_token returned. Re-run — make sure you fully approve the consent screen.\n`
    );
    process.exit(1);
  }

  fs.writeFileSync(
    "gsc-oauth.json",
    JSON.stringify({ client_id: id, client_secret: secret, refresh_token: tok.refresh_token }, null, 2)
  );

  console.log(`\n  ✓ Authorized. Saved gsc-oauth.json (git-ignored) — local runs work now:`);
  console.log(`      npm run gsc:pull && npm run gsc:audit\n`);
  console.log(`  For the nightly GitHub Action, add three repo secrets — their values live in`);
  console.log(`  gsc-oauth.json (never printed here, never committed):`);
  console.log(`      GSC_OAUTH_CLIENT_ID   GSC_OAUTH_CLIENT_SECRET   GSC_OAUTH_REFRESH_TOKEN\n`);
}

main().catch((e) => {
  console.error(`\n  ✗ gsc:auth failed: ${e.message}\n`);
  process.exit(1);
});
