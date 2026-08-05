#!/usr/bin/env node
/**
 * X AUTH — one-time OAuth 2.0 (PKCE) consent to mint a refresh token for @adsxcom.
 *
 * Authorize once in the browser (logged in as the account that should post).
 * Saves x-oauth.json (git-ignored), seeds the token into Neon so the pipeline
 * works immediately, and prints the GitHub secrets to add for the scheduled run.
 *
 * Prereqs in your X app's *User authentication settings* (OAuth 2.0):
 *   - Type: Web App / Confidential client  (you get a Client ID + Secret)
 *   - App permissions: Read and write
 *   - Callback URI / Redirect URL:  http://127.0.0.1:8477/callback   ← must match exactly
 *   - Scopes used here: tweet.read tweet.write users.read offline.access
 *
 * Run:
 *   X_CLIENT_ID=... X_CLIENT_SECRET=... DATABASE_URL=... npm run x:auth
 */
import http from "node:http";
import crypto from "node:crypto";
import fs from "node:fs";
import { exec } from "node:child_process";

const REDIRECT_PORT = 8477;
const REDIRECT_URI = `http://127.0.0.1:${REDIRECT_PORT}/callback`;
const SCOPES = "tweet.read tweet.write users.read offline.access";
const AUTHORIZE_URL = "https://x.com/i/oauth2/authorize";
const TOKEN_URL = "https://api.x.com/2/oauth2/token";

const b64url = (buf) => buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

function loadClient() {
  const id = process.env.X_CLIENT_ID;
  const secret = process.env.X_CLIENT_SECRET || "";
  if (!id) {
    console.error(
      "\n  Missing X_CLIENT_ID.\n" +
        "  Set X_CLIENT_ID (and X_CLIENT_SECRET for a confidential client), then re-run.\n" +
        "  See X-AUTOPOST-SETUP.md.\n"
    );
    process.exit(1);
  }
  return { id, secret };
}

async function main() {
  const { id, secret } = loadClient();
  const state = crypto.randomBytes(16).toString("hex");
  const codeVerifier = b64url(crypto.randomBytes(48));
  const codeChallenge = b64url(crypto.createHash("sha256").update(codeVerifier).digest());

  const server = http.createServer();
  await new Promise((r) => server.listen(REDIRECT_PORT, "127.0.0.1", r));

  const codePromise = new Promise((resolve, reject) => {
    server.on("request", (req, res) => {
      const url = new URL(req.url, REDIRECT_URI);
      if (url.pathname !== "/callback") {
        res.writeHead(404);
        res.end();
        return;
      }
      const code = url.searchParams.get("code");
      const error = url.searchParams.get("error");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h2>AdsX X auth — authorization received. You can close this tab.</h2>");
      server.close();
      if (error) return reject(new Error("Authorization denied: " + error));
      if (url.searchParams.get("state") !== state) return reject(new Error("State mismatch (possible CSRF)."));
      if (!code) return reject(new Error("No authorization code returned."));
      resolve(code);
    });
  });

  const authUrl =
    AUTHORIZE_URL +
    "?" +
    new URLSearchParams({
      response_type: "code",
      client_id: id,
      redirect_uri: REDIRECT_URI,
      scope: SCOPES,
      state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });

  console.log(`\n  Opening your browser to authorize @${process.env.X_HANDLE || "adsxcom"}.`);
  console.log(`  ▶ Approve while logged in as the account that should post.\n`);
  console.log(`  If the browser doesn't open, paste this URL:\n\n  ${authUrl}\n`);
  exec(`open '${authUrl}' 2>/dev/null || xdg-open '${authUrl}' 2>/dev/null`, () => {});

  const code = await codePromise;

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    code_verifier: codeVerifier,
  });
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  if (secret) headers.Authorization = "Basic " + Buffer.from(`${id}:${secret}`).toString("base64");
  else body.set("client_id", id);

  const res = await fetch(TOKEN_URL, { method: "POST", headers, body });
  const txt = await res.text();
  if (!res.ok) {
    console.error(`\n  ✗ Token exchange failed (${res.status}): ${txt}\n`);
    process.exit(1);
  }
  const tok = JSON.parse(txt);
  if (!tok.refresh_token) {
    console.error(`\n  ✗ No refresh_token returned. Ensure the 'offline.access' scope is granted, then re-run.\n`);
    process.exit(1);
  }

  fs.writeFileSync(
    "x-oauth.json",
    JSON.stringify({ client_id: id, client_secret: secret, refresh_token: tok.refresh_token }, null, 2)
  );
  console.log(`\n  ✓ Authorized. Saved x-oauth.json (git-ignored).`);

  // Seed the DB so scheduled runs work immediately (and rotation is handled there).
  if (process.env.DATABASE_URL) {
    try {
      const { initDb, saveRefreshToken } = await import("./x-lib.mjs");
      await initDb();
      await saveRefreshToken(tok.refresh_token);
      console.log(`  ✓ Seeded the refresh token into Neon (x_oauth_state).`);
    } catch (e) {
      console.error(`  ! Could not seed DB (${e.message}). Set X_OAUTH_REFRESH_TOKEN in CI instead.`);
    }
  }

  console.log(`\n  Verify:   npm run x:preflight`);
  console.log(`  Preview:  npm run x:dry\n`);
  console.log(`  For the scheduled GitHub Action, add these repo secrets`);
  console.log(`  (values are in x-oauth.json — never printed here, never committed):`);
  console.log(`      X_CLIENT_ID   X_CLIENT_SECRET   X_OAUTH_REFRESH_TOKEN\n`);
}

main().catch((e) => {
  console.error(`\n  ✗ x:auth failed: ${e.message}\n`);
  process.exit(1);
});
