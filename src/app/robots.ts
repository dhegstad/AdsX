import { MetadataRoute } from 'next';

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
    ],
    sitemap: 'https://adsx.com/sitemap.xml',
  };
}
