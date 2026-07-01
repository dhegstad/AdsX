import { MetadataRoute } from 'next';

// Cache sitemap for 24 hours to avoid regenerating on every crawl request
export const revalidate = 86400;

import { getAllPosts, authors } from '@/lib/blog';
import { getAllIndustries } from '@/lib/industries';
import { getAllComparisons } from '@/lib/comparisons';
import { getAllLocations } from '@/lib/locations';
import { getAllPersonas } from '@/lib/personas';
import { getAllIntegrations } from '@/lib/integrations';
import { getAllTerms } from '@/lib/glossary';
import { getAllPlatforms } from '@/lib/platforms';
import { getAllExamples } from '@/lib/examples';
import { getAllLists } from '@/lib/curated-lists';
import { getAllProducts } from '@/lib/sell-products';
import { getAllReports } from '@/lib/research-reports';
import { getAllNicheStores } from '@/lib/niche-stores';
import { getAllAiAdsNiches } from '@/lib/ai-ads-niches';
import { getAllProfitCalculators } from '@/lib/profit-calculators';
import { getAllAppDirectories } from '@/lib/app-directories';
import { getAllShopifyComparisons } from '@/lib/shopify-comparisons';
import { getAllAdComparisons } from '@/lib/ad-comparisons';
import { getAllMigrations } from '@/lib/migrations';

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
      // Comparison pages (programmatic)
      {
        url: `${baseUrl}/compare`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllComparisons().map((comparison) => ({
        url: `${baseUrl}/compare/ai-visibility-vs-${comparison.slug}`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // Industry pages (programmatic)
      {
        url: `${baseUrl}/industries`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllIndustries().map((industry) => ({
        url: `${baseUrl}/industries/${industry.slug}`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
      // Location pages (programmatic)
      {
        url: `${baseUrl}/locations`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllLocations().map((location) => ({
        url: `${baseUrl}/locations/${location.slug}`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
      // Persona pages (programmatic)
      {
        url: `${baseUrl}/for`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllPersonas().map((persona) => ({
        url: `${baseUrl}/for/${persona.slug}`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
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
      // Glossary pages (programmatic)
      {
        url: `${baseUrl}/glossary`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllTerms().map((term) => ({
        url: `${baseUrl}/glossary/${term.slug}`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      })),
      // AI Platform pages (programmatic)
      {
        url: `${baseUrl}/platforms`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllPlatforms().map((platform) => ({
        url: `${baseUrl}/platforms/${platform.slug}`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // Brand Examples (programmatic)
      {
        url: `${baseUrl}/examples`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllExamples().map((example) => ({
        url: `${baseUrl}/examples/${example.slug}`,
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
      // Sell Products (programmatic)
      {
        url: `${baseUrl}/sell`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllProducts().map((product) => ({
        url: `${baseUrl}/sell/${product.slug}`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // Research reports
      {
        url: `${baseUrl}/research`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      ...getAllReports().map((report) => ({
        url: `${baseUrl}/research/${report.slug}`,
        lastModified: new Date(report.publishDate),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
      // Niche store starter pages (programmatic) — /start/[niche]
      {
        url: `${baseUrl}/start`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllNicheStores().map((store) => ({
        url: `${baseUrl}/start/${store.slug}`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // AI ads niche pages (programmatic) — /ai-ads-for/[niche]
      {
        url: `${baseUrl}/ai-ads-for`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllAiAdsNiches().map((niche) => ({
        url: `${baseUrl}/ai-ads-for/${niche.slug}`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // Profit calculators (programmatic tools) — /tools/shopify-[niche]-profit-calculator
      ...getAllProfitCalculators().map((calc) => ({
        url: `${baseUrl}/tools/shopify-${calc.slug}-profit-calculator`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // App category directories (programmatic) — /apps/best-shopify-[slug]-apps
      {
        url: `${baseUrl}/apps`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllAppDirectories().map((dir) => ({
        url: `${baseUrl}/apps/best-shopify-${dir.slug}-apps`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // Shopify vs platform comparisons (programmatic) — /compare/shopify-vs-[platform]
      ...getAllShopifyComparisons().map((comp) => ({
        url: `${baseUrl}/compare/shopify-vs-${comp.slug}`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // AI ads vs channel comparisons (programmatic) — /compare/ai-ads-vs-[channel]
      ...getAllAdComparisons().map((comp) => ({
        url: `${baseUrl}/compare/ai-ads-vs-${comp.slug}`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // Platform migration pages (programmatic) — /migrate/[platform]
      {
        url: `${baseUrl}/migrate`,
        lastModified: PROGRAMMATIC_PAGES_UPDATED,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllMigrations().map((migration) => ({
        url: `${baseUrl}/migrate/${migration.slug}`,
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
