const SITE_URL = "https://www.adsx.com";
const SITE_NAME = "AdsX";
const SITE_LOGO = `${SITE_URL}/icon-512`;

/**
 * Creates Article structured data for blog posts
 */
export function createArticleSchema(config: {
  title: string;
  description: string;
  slug: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  authorRole?: string;
  image?: string;
  tags?: string[];
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: config.title,
    description: config.description,
    image: config.image || `${SITE_URL}/blog/${config.slug}/opengraph-image`,
    author: {
      "@type": config.author === "AdsX Team" ? "Organization" : "Person",
      name: config.author,
      ...(config.authorRole && { jobTitle: config.authorRole }),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: SITE_LOGO,
      },
    },
    datePublished: config.publishedTime,
    dateModified: config.modifiedTime || config.publishedTime,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${config.slug}`,
    },
    ...(config.tags && { keywords: config.tags.join(", ") }),
    ...(config.category && { articleSection: config.category }),
  };
}

/**
 * Creates BreadcrumbList structured data
 */
export function createBreadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/**
 * Creates FAQ structured data from FAQ items
 */
export function createFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Creates Organization structured data
 */
export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: SITE_LOGO,
    description:
      "The first advertising agency built for AI search. Get your brand recommended by ChatGPT, Claude, Perplexity, Gemini & more.",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@adsx.com",
    },
    sameAs: ["https://linkedin.com/company/adsx", "https://twitter.com/adsx"],
    serviceType: [
      "AI Search Advertising",
      "ChatGPT Advertising",
      "AI Visibility Optimization",
      "LLM Marketing",
    ],
  };
}

/**
 * Creates WebSite structured data with search action
 */
export function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "AI Search Advertising Agency - Get recommended by ChatGPT, Claude, Perplexity, and more",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

/**
 * Creates Service structured data
 */
export function createServiceSchema(config: {
  name: string;
  description: string;
  price?: string;
  priceCurrency?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: config.name,
    description: config.description,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(config.price && {
      offers: {
        "@type": "Offer",
        price: config.price,
        priceCurrency: config.priceCurrency || "USD",
      },
    }),
  };
}

/**
 * Helper to render schema as JSON-LD script tag
 */
export function SchemaScript({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
