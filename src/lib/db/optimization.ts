import { SQL, sql } from "drizzle-orm";

/**
 * Database query optimization utilities
 */

/**
 * Pagination helper with optimized queries
 */
export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginatedResult<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
};

export function calculatePagination(params: PaginationParams) {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(100, Math.max(1, params.limit || 50)); // Max 100 per page
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

/**
 * Batch query helper to reduce database round trips
 */
export async function batchQueries<T extends Record<string, () => Promise<any>>>(
  queries: T
): Promise<{ [K in keyof T]: Awaited<ReturnType<T[K]>> }> {
  const entries = Object.entries(queries);
  const results = await Promise.all(entries.map(([, query]) => query()));

  return Object.fromEntries(
    entries.map(([key], index) => [key, results[index]])
  ) as any;
}

/**
 * Query performance hints
 */
export const queryHints = {
  /**
   * Use index hint (PostgreSQL specific)
   */
  useIndex: (indexName: string) => sql.raw(`/*+ INDEX(${indexName}) */`),

  /**
   * Force index scan over sequential scan
   */
  forceIndexScan: () => sql.raw(`/*+ IndexScan */`),

  /**
   * Hint for parallel query execution
   */
  parallel: (workers: number) => sql.raw(`/*+ PARALLEL(${workers}) */`),
};

/**
 * Common query patterns
 */
export const queryPatterns = {
  /**
   * Efficient "exists" check - stops after finding first match
   */
  exists: (condition: SQL) => sql`EXISTS (SELECT 1 WHERE ${condition})`,

  /**
   * Get count efficiently
   */
  count: () => sql<number>`count(*)::int`,

  /**
   * Date range filter (uses index on created_at)
   */
  dateRange: (column: SQL, startDate: Date, endDate: Date) =>
    sql`${column} >= ${startDate} AND ${column} <= ${endDate}`,

  /**
   * Case-insensitive search with index support
   */
  ilike: (column: SQL, search: string) =>
    sql`LOWER(${column}) LIKE LOWER(${`%${search}%`})`,
};

/**
 * Connection pool recommendations:
 *
 * For Neon/Serverless:
 * - Use connection pooling (already configured)
 * - Min connections: 0 (serverless)
 * - Max connections: 10 per instance
 * - Connection timeout: 10s
 *
 * Query optimization checklist:
 * 1. Add indexes on frequently queried columns
 * 2. Use SELECT only needed columns (avoid SELECT *)
 * 3. Use LIMIT for pagination
 * 4. Use prepared statements (Drizzle does this automatically)
 * 5. Batch related queries with Promise.all
 * 6. Cache expensive queries
 * 7. Use database-level timestamps for consistency
 */

/**
 * Example usage:
 *
 * // Batching queries
 * const { users, posts } = await batchQueries({
 *   users: () => db.select().from(user).where(eq(user.id, userId)),
 *   posts: () => db.select().from(post).where(eq(post.authorId, userId))
 * });
 *
 * // Pagination
 * const { page, limit, offset } = calculatePagination({ page: 1, limit: 20 });
 * const data = await db.select().from(table).limit(limit).offset(offset);
 */
