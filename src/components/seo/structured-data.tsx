// Organization, WebSite, and FAQ schemas were consolidated into
// @/lib/seo/schemas (used site-wide in layout.tsx). Only ServiceSchema
// remains here, consumed by the /services page.

export function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'AI Search Advertising',
    provider: {
      '@type': 'Organization',
      name: 'AdsX',
      url: 'https://www.adsx.com',
    },
    description: 'Full-stack AI search advertising services including ChatGPT ads, AI visibility optimization, content strategy, and performance analytics.',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Advertising Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Search Strategy',
            description: 'Audit your brand visibility across ChatGPT, Perplexity, and emerging AI platforms.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'ChatGPT Ads',
            description: 'Early access to ChatGPT advertising platform with sponsored placements and conversational ads.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Visibility Tracking',
            description: 'Monitor brand mentions across AI platforms with share of voice and sentiment analysis.',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
