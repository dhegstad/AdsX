import { MetadataRoute } from 'next';

// Cache sitemap for 24 hours to avoid regenerating on every crawl request
export const revalidate = 86400;

import { getAllPosts } from '@/lib/blog';
import { getAllIndustries } from '@/lib/industries';
import { getAllComparisons } from '@/lib/comparisons';
import { getAllLocations } from '@/lib/locations';
import { getAllPersonas } from '@/lib/personas';
import { getAllIntegrations } from '@/lib/integrations';
import { getAllTerms } from '@/lib/glossary';
import { getAllPlatforms } from '@/lib/platforms';
import { getAllExamples } from '@/lib/examples';
import { getAllLists } from '@/lib/curated-lists';

const BLOG_POSTS_PER_SITEMAP = 200;

export async function generateSitemaps() {
  const posts = getAllPosts();
  const blogSitemapCount = Math.ceil(posts.length / BLOG_POSTS_PER_SITEMAP);

  // ID 0 = core + programmatic pages, IDs 1+ = blog post chunks
  const ids = [{ id: 0 }];
  for (let i = 1; i <= blogSitemapCount; i++) {
    ids.push({ id: i });
  }
  return ids;
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.adsx.com';

  // Sitemap 0: all non-blog URLs
  if (id === 0) {
    return [
      // Core pages
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/pricing`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/services`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/case-studies`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      // Tools
      {
        url: `${baseUrl}/tools/free-audit`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      // Blog index
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      },
      // Comparison pages (programmatic)
      {
        url: `${baseUrl}/compare`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllComparisons().map((comparison) => ({
        url: `${baseUrl}/compare/ai-visibility-vs-${comparison.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // Industry pages (programmatic)
      {
        url: `${baseUrl}/industries`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllIndustries().map((industry) => ({
        url: `${baseUrl}/industries/${industry.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
      // Location pages (programmatic)
      {
        url: `${baseUrl}/locations`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllLocations().map((location) => ({
        url: `${baseUrl}/locations/${location.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
      // Persona pages (programmatic)
      {
        url: `${baseUrl}/for`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllPersonas().map((persona) => ({
        url: `${baseUrl}/for/${persona.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // Integration pages (programmatic)
      {
        url: `${baseUrl}/integrations`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllIntegrations().map((integration) => ({
        url: `${baseUrl}/integrations/${integration.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // Glossary pages (programmatic)
      {
        url: `${baseUrl}/glossary`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllTerms().map((term) => ({
        url: `${baseUrl}/glossary/${term.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      })),
      // AI Platform pages (programmatic)
      {
        url: `${baseUrl}/platforms`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllPlatforms().map((platform) => ({
        url: `${baseUrl}/platforms/${platform.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // Brand Examples (programmatic)
      {
        url: `${baseUrl}/examples`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllExamples().map((example) => ({
        url: `${baseUrl}/examples/${example.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // Curated Lists / Best Of (programmatic)
      {
        url: `${baseUrl}/best`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...getAllLists().map((list) => ({
        url: `${baseUrl}/best/${list.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // Legal
      {
        url: `${baseUrl}/privacy`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
      },
    ].filter((entry, index, self) =>
      index === self.findIndex((e) => e.url === entry.url)
    );
  }

  // Sitemaps 1+: blog post chunks (200 per sitemap)
  const posts = getAllPosts();
  const start = (id - 1) * BLOG_POSTS_PER_SITEMAP;
  const end = start + BLOG_POSTS_PER_SITEMAP;
  const chunk = posts.slice(start, end);

  return chunk.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
}
