import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories, getAllTags } from '@/lib/blog';
import { getAllIndustries } from '@/lib/industries';
import { getAllComparisons } from '@/lib/comparisons';
import { getAllLocations } from '@/lib/locations';
import { getAllPersonas } from '@/lib/personas';
import { getAllIntegrations } from '@/lib/integrations';
import { getAllTerms } from '@/lib/glossary';
import { getAllPlatforms } from '@/lib/platforms';
import { getAllExamples } from '@/lib/examples';
import { getAllLists } from '@/lib/curated-lists';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.adsx.com';

  // Get all blog posts
  const posts = getAllPosts();
  const blogPostUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Get all categories
  const categories = getAllCategories();
  const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/blog/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  // Get only tags with 2+ posts to avoid thin content pages
  const tags = getAllTags();
  const tagUrls: MetadataRoute.Sitemap = tags
    .filter((tag) => tag.count >= 2)
    .map((tag) => ({
      url: `${baseUrl}/blog/tag/${tag.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.4,
    }));

  // Author pages excluded - using single team author

  return [
    // Core pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Tools
    {
      url: `${baseUrl}/tools/free-audit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Blog
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    // Comparison pages (programmatic)
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...getAllComparisons().map((comparison) => ({
      url: `${baseUrl}/compare/ai-visibility-vs-${comparison.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    // Industry pages (programmatic)
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
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    // Blog posts
    ...blogPostUrls,
    // Category pages
    ...categoryUrls,
    // Tag pages (only those with 2+ posts)
    ...tagUrls,
  ];
}
