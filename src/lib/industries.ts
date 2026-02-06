/**
 * Industry data for programmatic SEO
 * Each industry generates a dedicated landing page at /industries/[slug]
 */

export interface IndustryChallenge {
  title: string;
  description: string;
}

export interface IndustryStat {
  value: string;
  label: string;
}

export interface IndustryUseCase {
  title: string;
  description: string;
}

export interface Industry {
  slug: string;
  name: string;
  headline: string;
  subheadline: string;
  description: string;
  challenges: IndustryChallenge[];
  stats: IndustryStat[];
  useCases: IndustryUseCase[];
  keywords: string[];
}

export const industries: Industry[] = [
  {
    slug: "saas",
    name: "SaaS",
    headline: "AI Search Visibility for SaaS Companies",
    subheadline:
      "Get your software recommended when prospects ask AI for solutions",
    description:
      "SaaS buyers increasingly turn to AI assistants for software recommendations. We help B2B software companies appear in ChatGPT, Claude, and Perplexity responses when users search for solutions in your category.",
    challenges: [
      {
        title: "Crowded Categories",
        description:
          "Dozens of competitors in most SaaS categories make AI visibility crucial for differentiation.",
      },
      {
        title: "Complex Buying Journeys",
        description:
          "B2B buyers research extensively—AI assistants are becoming a key touchpoint in this journey.",
      },
      {
        title: "Feature Comparison Queries",
        description:
          'When users ask "What\'s the best CRM for startups?", your product needs to be in the answer.',
      },
      {
        title: "Review Aggregation",
        description:
          "AI pulls from G2, Capterra, and other review sites—your presence there directly impacts AI recommendations.",
      },
    ],
    stats: [
      { value: "73%", label: "of B2B buyers use AI for software research" },
      { value: "4.2x", label: "higher conversion from AI referrals vs ads" },
      { value: "340%", label: "avg increase in AI mentions for clients" },
    ],
    useCases: [
      {
        title: "Product Recommendations",
        description:
          'Appear when users ask "What\'s the best [category] software?"',
      },
      {
        title: "Competitor Comparisons",
        description:
          "Show up favorably in head-to-head comparison queries.",
      },
      {
        title: "Integration Queries",
        description:
          'Get mentioned when users ask "What tools integrate with [platform]?"',
      },
      {
        title: "Use Case Matching",
        description:
          "Be recommended for specific use cases and company sizes.",
      },
    ],
    keywords: [
      "SaaS AI visibility",
      "B2B software AI search",
      "ChatGPT software recommendations",
      "AI search for SaaS",
    ],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    headline: "AI Search Visibility for E-commerce Brands",
    subheadline: "Get your products recommended in AI shopping conversations",
    description:
      "Consumers are asking AI assistants for product recommendations before making purchases. We help e-commerce brands appear in ChatGPT Shopping, Perplexity product searches, and AI-powered buying guides.",
    challenges: [
      {
        title: "Product Discovery Shift",
        description:
          "Shoppers now ask AI 'What's the best [product] for [need]?' instead of browsing.",
      },
      {
        title: "Review Synthesis",
        description:
          "AI aggregates reviews from multiple sources—your review strategy directly impacts recommendations.",
      },
      {
        title: "Price Comparison",
        description:
          "AI can compare prices and value propositions across competitors instantly.",
      },
      {
        title: "Inventory Visibility",
        description:
          "Product data feeds need optimization for AI platforms to surface your products accurately.",
      },
    ],
    stats: [
      { value: "65%", label: "of shoppers trust AI product recommendations" },
      { value: "2.8x", label: "higher AOV from AI-referred customers" },
      { value: "40%", label: "of Gen Z prefers AI over Google for shopping" },
    ],
    useCases: [
      {
        title: "Product Recommendations",
        description:
          'Appear in "best [product] for [use case]" queries.',
      },
      {
        title: "Gift Suggestions",
        description:
          "Get recommended in gift guide and occasion-based searches.",
      },
      {
        title: "Comparison Shopping",
        description:
          "Show up favorably when users compare products in your category.",
      },
      {
        title: "Problem-Solution Matching",
        description:
          'Be recommended when users describe problems your products solve.',
      },
    ],
    keywords: [
      "e-commerce AI visibility",
      "ChatGPT shopping",
      "AI product recommendations",
      "e-commerce AI search optimization",
    ],
  },
  {
    slug: "fintech",
    name: "Fintech",
    headline: "AI Search Visibility for Fintech Companies",
    subheadline:
      "Build trust and visibility when users ask AI for financial guidance",
    description:
      "Financial decisions are increasingly informed by AI assistants. We help fintech companies appear credibly in ChatGPT, Claude, and other AI responses about financial products, comparisons, and advice.",
    challenges: [
      {
        title: "Trust & Credibility",
        description:
          "Financial recommendations require high trust—AI must present your brand accurately and positively.",
      },
      {
        title: "Regulatory Sensitivity",
        description:
          "AI responses about financial products must be accurate to avoid compliance issues.",
      },
      {
        title: "Comparison Queries",
        description:
          "Users frequently ask AI to compare rates, fees, and features across financial products.",
      },
      {
        title: "Complex Products",
        description:
          "AI needs to understand and accurately explain complex financial products.",
      },
    ],
    stats: [
      { value: "58%", label: "of consumers ask AI about financial products" },
      { value: "3.1x", label: "higher trust in AI-recommended financial tools" },
      { value: "127%", label: "increase in AI-driven fintech traffic" },
    ],
    useCases: [
      {
        title: "Product Comparisons",
        description:
          "Appear favorably in rate and fee comparison queries.",
      },
      {
        title: "Financial Advice Context",
        description:
          "Get mentioned when AI provides financial guidance and tool recommendations.",
      },
      {
        title: "Use Case Matching",
        description:
          'Be recommended for specific needs like "best app for budgeting" or "easiest way to invest."',
      },
      {
        title: "Trust Building",
        description:
          "Ensure accurate, positive representation in AI responses about your brand.",
      },
    ],
    keywords: [
      "fintech AI visibility",
      "financial services AI search",
      "ChatGPT fintech recommendations",
      "AI search for financial products",
    ],
  },
];

/**
 * Get all industries for static generation
 */
export function getAllIndustries(): Industry[] {
  return industries;
}

/**
 * Get a specific industry by slug
 */
export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

/**
 * Get all industry slugs for generateStaticParams
 */
export function getAllIndustrySlugs(): string[] {
  return industries.map((i) => i.slug);
}
