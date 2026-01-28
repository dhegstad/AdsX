export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AdsX',
    description: 'The first advertising agency built for AI search. We help brands get recommended by ChatGPT, Claude, Perplexity, Gemini, and other AI platforms.',
    url: 'https://adsx.com',
    logo: 'https://adsx.com/icon-512',
    sameAs: [
      'https://twitter.com/adsx',
      'https://linkedin.com/company/adsx',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: 'https://adsx.com/contact',
    },
    areaServed: 'Worldwide',
    serviceType: [
      'AI Search Advertising',
      'ChatGPT Advertising',
      'AI Visibility Optimization',
      'LLM Marketing',
      'AI Brand Mentions',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AdsX',
    description: 'Advertising for the AI Search Era. Get your brand recommended by ChatGPT, Claude, Perplexity & more.',
    url: 'https://adsx.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://adsx.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is AI search advertising?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI search advertising is the practice of optimizing your brand to appear in AI-generated responses from platforms like ChatGPT, Claude, Perplexity, and Gemini. This includes sponsored placements, content optimization, and strategic positioning to ensure AI assistants recommend your products or services.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long until we see results from AI advertising?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most clients see measurable improvements in AI visibility within 4-6 weeks. Sponsored placements can drive traffic immediately, while organic AI optimization compounds over time as models update their training data.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you guarantee placements in ChatGPT responses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We can guarantee sponsored ad placements through official channels. For organic mentions, we optimize your content and digital presence to maximize the likelihood of being recommended, but no one can guarantee specific AI outputs.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you measure AI visibility?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We use proprietary monitoring tools that query AI platforms thousands of times daily across relevant prompts in your category. We track mention frequency, sentiment, positioning, and competitive share of voice.',
        },
      },
      {
        '@type': 'Question',
        name: 'What industries does AdsX work with?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We work primarily with B2B SaaS, fintech, e-commerce, and professional services. Any brand where customers research solutions through AI assistants is a good fit for our services.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is AI advertising different from traditional SEO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Traditional SEO optimizes for search engine crawlers and ranking algorithms. AI optimization focuses on how LLMs understand, categorize, and recommend your brand. The tactics overlap but the strategies are fundamentally different.',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'AI Search Advertising',
    provider: {
      '@type': 'Organization',
      name: 'AdsX',
      url: 'https://adsx.com',
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
