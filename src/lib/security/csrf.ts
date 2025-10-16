import { headers } from "next/headers";

/**
 * CSRF Protection Utilities
 *
 * Note: Better Auth and Next.js Server Actions already provide CSRF protection through:
 * - SameSite cookies
 * - Origin header checking
 * - POST-only mutations
 *
 * These utilities provide additional validation for custom forms.
 */

/**
 * Validate request origin matches host
 */
export async function validateOrigin(): Promise<boolean> {
  const headersList = await headers();
  const origin = headersList.get("origin");
  const host = headersList.get("host");

  // If no origin (same-origin request), allow
  if (!origin) {
    return true;
  }

  // Validate origin matches host
  try {
    const originUrl = new URL(origin);
    return originUrl.host === host;
  } catch {
    return false;
  }
}

/**
 * Generate a simple CSRF token (for additional validation)
 */
export function generateToken(): string {
  return Buffer.from(crypto.randomUUID()).toString("base64");
}

/**
 * Validate CSRF token
 */
export function validateToken(token: string, expected: string): boolean {
  if (!token || !expected) {
    return false;
  }
  return token === expected;
}
