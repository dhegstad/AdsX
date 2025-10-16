import { unstable_cache } from "next/cache";

/**
 * Cache utilities for optimizing expensive operations
 */

export type CacheOptions = {
  revalidate?: number | false;
  tags?: string[];
};

/**
 * Create a cached version of a function
 */
export function createCachedFunction<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyPrefix: string,
  options: CacheOptions = {}
): T {
  return unstable_cache(fn, [keyPrefix], {
    revalidate: options.revalidate ?? 60, // Default 60 seconds
    tags: options.tags,
  }) as T;
}

/**
 * Cache key generators for common patterns
 */
export const cacheKeys = {
  user: (userId: string) => `user:${userId}`,
  organization: (orgId: string) => `org:${orgId}`,
  adAccounts: (orgId: string) => `ad-accounts:${orgId}`,
  changeEvents: (orgId: string, filters?: string) =>
    `change-events:${orgId}:${filters || "all"}`,
  notificationRules: (orgId: string) => `rules:${orgId}`,
  subscription: (orgId: string) => `subscription:${orgId}`,
  usage: (orgId: string, month: string) => `usage:${orgId}:${month}`,
};

/**
 * Cache tags for invalidation
 */
export const cacheTags = {
  user: (userId: string) => [`user-${userId}`],
  organization: (orgId: string) => [`org-${orgId}`],
  adAccounts: (orgId: string) => [`ad-accounts-${orgId}`, `org-${orgId}`],
  changeEvents: (orgId: string) => [`change-events-${orgId}`, `org-${orgId}`],
  notificationRules: (orgId: string) => [`rules-${orgId}`, `org-${orgId}`],
  subscription: (orgId: string) => [`subscription-${orgId}`, `org-${orgId}`],
};

/**
 * Example usage:
 *
 * const getCachedAdAccounts = createCachedFunction(
 *   getAdAccounts,
 *   'ad-accounts',
 *   { revalidate: 300, tags: ['ad-accounts'] }
 * );
 */
