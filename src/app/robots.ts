import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

// Must match BLOG_POSTS_PER_SITEMAP in sitemap.ts.
const BLOG_POSTS_PER_SITEMAP = 200;

// Next's generateSitemaps does not expose an index at /sitemap.xml (that URL
// 404s), so point robots directly at every child sitemap (0 = core/programmatic,
// 1+ = blog chunks).
function sitemapUrls(): string[] {
  const blogChunks = Math.ceil(getAllPosts().length / BLOG_POSTS_PER_SITEMAP);
  const urls = ['https://www.adsx.com/sitemap/0.xml'];
  for (let i = 1; i <= blogChunks; i++) {
    urls.push(`https://www.adsx.com/sitemap/${i}.xml`);
  }
  return urls;
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/login',
          '/signup',
          '/dashboard',
          '/v0/',
        ],
      },
      // AI bots - explicitly allowed for AI visibility
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/login', '/signup', '/dashboard', '/v0/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/api/', '/login', '/signup', '/dashboard', '/v0/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/api/', '/login', '/signup', '/dashboard', '/v0/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/api/', '/login', '/signup', '/dashboard', '/v0/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/api/', '/login', '/signup', '/dashboard', '/v0/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/login', '/signup', '/dashboard', '/v0/'],
      },
      // OpenAI's search crawler (powers ChatGPT search citations) — distinct from GPTBot (training)
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/api/', '/login', '/signup', '/dashboard', '/v0/'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/api/', '/login', '/signup', '/dashboard', '/v0/'],
      },
      {
        userAgent: 'Amazonbot',
        allow: '/',
        disallow: ['/api/', '/login', '/signup', '/dashboard', '/v0/'],
      },
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
        disallow: ['/api/', '/login', '/signup', '/dashboard', '/v0/'],
      },
    ],
    sitemap: sitemapUrls(),
    host: 'https://www.adsx.com',
  };
}
