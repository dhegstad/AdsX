import { MetadataRoute } from 'next';

// Cache sitemap for 24 hours to avoid regenerating on every crawl request
export const revalidate = 86400;

import { getAllPosts, authors } from '@/lib/blog';
import { getAllIntegrations } from '@/lib/integrations';
import { getAllLists } from '@/lib/curated-lists';

// Single sitemap served at /sitemap.xml. With ~1,450 URLs we are far under the
// 50,000-URL / 50MB per-file limit, so there is no need to split into chunks via
// generateSitemaps() (which also avoids the Next 16 async-id pitfall entirely).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.adsx.com';

  // Use a fixed date for static/programmatic pages so Google doesn't see
  // a new lastModified on every crawl (which causes it to distrust the signal).
  // Update these dates only when the actual page content changes.
  const CORE_PAGES_UPDATED = new Date('2026-04-15');
  const PROGRAMMATIC_PAGES_UPDATED = new Date('2026-04-01');
  const LEGAL_PAGES_UPDATED = new Date('2026-01-15');

  // For the blog index, use the most recent post date
  const allPosts = getAllPosts();
  const latestPostDate = allPosts.length > 0
    ? new Date(allPosts[0].date)
    : CORE_PAGES_UPDATED;

  const urls: MetadataRoute.Sitemap = [
      // Core pages
      {
        url: baseUrl,
        lastModified: CORE_PAGES_UPDATED,
        changeFrequency: 'weekly' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: CORE_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/pricing`,
        lastModified: CORE_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: CORE_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/services`,
        lastModified: CORE_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      // Agency landing pages (commercial buyer intent)
      {
        url: `${baseUrl}/shopify-ai-ads-agency`,
        lastModified: CORE_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/shopify-paid-ads-agency`,
        lastModified: CORE_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/chatgpt-ads-agency`,
        lastModified: CORE_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/dtc-ai-ads-agency`,
        lastModified: CORE_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/case-studies`,
        lastModified: CORE_PAGES_UPDATED,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      // Tools
      {
        url: `${baseUrl}/tools/free-audit`,
        lastModified: CORE_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/tools/roas-calculator`,
        lastModified: CORE_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/tools/feed-readiness-checker`,
        lastModified: CORE_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      // Pillar guides
      {
        url: `${baseUrl}/guides/shopify-ai-advertising`,
        lastModified: CORE_PAGES_UPDATED,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      },
      // Blog index
      {
        url: `${baseUrl}/blog`,
        lastModified: latestPostDate,
        changeFrequency: 'daily' as const,
        priority: 0.8,
      },
      // Integration pages (programmatic)
      {
        url: `${baseUrl}/integrations`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllIntegrations().map((integration) => ({
        url: `${baseUrl}/integrations/${integration.slug}`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // Curated Lists / Best Of (programmatic)
      {
        url: `${baseUrl}/best`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllLists().map((list) => ({
        url: `${baseUrl}/best/${list.slug}`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // Author pages (E-E-A-T)
      ...authors.map((author) => ({
        url: `${baseUrl}/blog/author/${author.slug}`,
        lastModified: CORE_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      })),
      // Legal
      {
        url: `${baseUrl}/privacy`,
        lastModified: LEGAL_PAGES_UPDATED,
        changeFrequency: 'yearly' as const,
        priority: 0.3,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: LEGAL_PAGES_UPDATED,
        changeFrequency: 'yearly' as const,
        priority: 0.3,
      },
    // All blog posts
    ...allPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  // De-dupe by URL.
  return urls.filter((entry, index, self) =>
    index === self.findIndex((e) => e.url === entry.url)
  );
}
