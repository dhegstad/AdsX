import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limiting store (in-memory for edge runtime)
const rateLimit = new Map<string, { count: number; resetAt: number }>();

// Simple rate limiter
function checkRateLimit(identifier: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimit.get(identifier);

  if (!record || now > record.resetAt) {
    rateLimit.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get client identifier (IP or user ID from session)
  const clientId = request.ip || request.headers.get("x-forwarded-for") || "anonymous";

  // Apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    // More strict rate limiting for sensitive endpoints
    if (
      request.nextUrl.pathname.includes("/webhooks") ||
      request.nextUrl.pathname.includes("/oauth")
    ) {
      // 100 requests per minute for webhooks
      if (!checkRateLimit(`${clientId}:${request.nextUrl.pathname}`, 100, 60 * 1000)) {
        return new NextResponse("Too Many Requests", { status: 429 });
      }
    } else {
      // 200 requests per minute for general API routes
      if (!checkRateLimit(`${clientId}:api`, 200, 60 * 1000)) {
        return new NextResponse("Too Many Requests", { status: 429 });
      }
    }
  }

  // Security Headers
  const headers = response.headers;

  // Prevent clickjacking
  headers.set("X-Frame-Options", "DENY");

  // Prevent MIME type sniffing
  headers.set("X-Content-Type-Options", "nosniff");

  // Enable XSS protection
  headers.set("X-XSS-Protection", "1; mode=block");

  // Referrer policy
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions policy
  headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // Content Security Policy
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://js.stripe.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data:;
    connect-src 'self' https://api.stripe.com https://app.posthog.com https://*.sentry.io;
    frame-src 'self' https://js.stripe.com https://hooks.stripe.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  headers.set("Content-Security-Policy", cspHeader);

  // HSTS - Force HTTPS (only in production)
  if (process.env.NODE_ENV === "production") {
    headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }

  // Add cache control for static assets
  if (
    request.nextUrl.pathname.startsWith("/_next/static") ||
    request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|woff|woff2)$/)
  ) {
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  }

  // Cache control for pages (revalidate)
  if (!request.nextUrl.pathname.startsWith("/api")) {
    headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
