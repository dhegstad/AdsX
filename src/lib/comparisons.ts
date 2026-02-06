/**
 * Comparison page data for programmatic SEO
 * Each comparison generates a page at /compare/ai-visibility-vs-[slug]
 */

export interface ComparisonPoint {
  feature: string;
  adsX: string;
  alternative: string;
  winner: "adsx" | "alternative" | "tie";
}

export interface ComparisonBenefit {
  title: string;
  description: string;
}

export interface Comparison {
  slug: string;
  alternativeName: string;
  alternativeShortName: string;
  headline: string;
  subheadline: string;
  description: string;
  comparisonPoints: ComparisonPoint[];
  adsXBenefits: ComparisonBenefit[];
  alternativeBenefits: ComparisonBenefit[];
  verdict: string;
  keywords: string[];
}

export const comparisons: Comparison[] = [
  {
    slug: "seo",
    alternativeName: "Traditional SEO",
    alternativeShortName: "SEO",
    headline: "AI Visibility vs Traditional SEO",
    subheadline: "Why ranking on Google isn't enough anymore",
    description:
      "Traditional SEO focuses on Google rankings. AI visibility optimization ensures your brand gets recommended by ChatGPT, Claude, Perplexity, and other AI assistants. Here's how they differ.",
    comparisonPoints: [
      {
        feature: "Primary Goal",
        adsX: "Get recommended by AI assistants",
        alternative: "Rank higher on Google SERPs",
        winner: "tie",
      },
      {
        feature: "Traffic Source",
        adsX: "AI-referred visitors with high intent",
        alternative: "Organic search clicks",
        winner: "adsx",
      },
      {
        feature: "Content Strategy",
        adsX: "Structured for LLM comprehension",
        alternative: "Optimized for keywords and backlinks",
        winner: "tie",
      },
      {
        feature: "Competitive Moat",
        adsX: "First-mover advantage in emerging channel",
        alternative: "Established but highly competitive",
        winner: "adsx",
      },
      {
        feature: "Measurement",
        adsX: "AI mention tracking, sentiment analysis",
        alternative: "Rankings, traffic, conversions",
        winner: "tie",
      },
      {
        feature: "Time to Results",
        adsX: "4-6 weeks for initial visibility",
        alternative: "3-6 months for ranking improvements",
        winner: "adsx",
      },
    ],
    adsXBenefits: [
      {
        title: "Capture Emerging Channel",
        description:
          "800M+ users now ask AI for recommendations. This traffic is growing while traditional search plateaus.",
      },
      {
        title: "Higher Intent Traffic",
        description:
          "Users asking AI for recommendations are further down the funnel than casual searchers.",
      },
      {
        title: "Less Competition (For Now)",
        description:
          "Most brands haven't optimized for AI search, creating first-mover opportunities.",
      },
    ],
    alternativeBenefits: [
      {
        title: "Established Channel",
        description:
          "Google search is a known quantity with proven ROI measurement.",
      },
      {
        title: "Larger Current Volume",
        description:
          "More total searches happen on Google than AI assistants (for now).",
      },
      {
        title: "More Tooling",
        description:
          "Mature ecosystem of SEO tools and established best practices.",
      },
    ],
    verdict:
      "AI visibility and SEO aren't mutually exclusive—the best strategy uses both. But if you're only doing SEO, you're missing a rapidly growing channel where your competitors may already be establishing presence.",
    keywords: [
      "AI visibility vs SEO",
      "AI search optimization vs SEO",
      "ChatGPT vs Google",
      "AI search vs traditional search",
    ],
  },
  {
    slug: "pr",
    alternativeName: "Traditional PR",
    alternativeShortName: "PR",
    headline: "AI Visibility vs Traditional PR",
    subheadline: "Why press coverage alone won't get you recommended by AI",
    description:
      "Traditional PR focuses on media placements and brand awareness. AI visibility ensures your brand gets recommended when users ask AI assistants for solutions. Here's the key difference.",
    comparisonPoints: [
      {
        feature: "Primary Goal",
        adsX: "Get recommended by AI at point of decision",
        alternative: "Build awareness through media coverage",
        winner: "tie",
      },
      {
        feature: "Timing",
        adsX: "Present when user is actively seeking solutions",
        alternative: "Brand building over time",
        winner: "adsx",
      },
      {
        feature: "Measurability",
        adsX: "Track AI mentions, sentiment, recommendations",
        alternative: "Media impressions, share of voice",
        winner: "adsx",
      },
      {
        feature: "Control",
        adsX: "Optimize content AI uses to understand your brand",
        alternative: "Dependent on journalists and editors",
        winner: "adsx",
      },
      {
        feature: "Longevity",
        adsX: "Persistent presence in AI knowledge",
        alternative: "News cycle dependent",
        winner: "adsx",
      },
      {
        feature: "Cost",
        adsX: "Predictable monthly investment",
        alternative: "Variable, often high for quality placements",
        winner: "tie",
      },
    ],
    adsXBenefits: [
      {
        title: "Point of Decision Presence",
        description:
          "Appear when users are actively asking for recommendations, not just building general awareness.",
      },
      {
        title: "Measurable Impact",
        description:
          "Track exactly how often and how positively AI mentions your brand.",
      },
      {
        title: "Persistent Visibility",
        description:
          "AI knowledge persists beyond the news cycle of any single PR hit.",
      },
    ],
    alternativeBenefits: [
      {
        title: "Credibility Building",
        description:
          "Third-party media coverage builds brand credibility and trust.",
      },
      {
        title: "Broader Reach",
        description:
          "PR can reach audiences not yet using AI assistants.",
      },
      {
        title: "Crisis Management",
        description:
          "PR expertise valuable for reputation management and crisis response.",
      },
    ],
    verdict:
      "PR builds awareness; AI visibility captures demand. Press coverage can actually help AI visibility (LLMs learn from news), but PR alone won't ensure you get recommended when it matters most.",
    keywords: [
      "AI visibility vs PR",
      "AI search vs public relations",
      "ChatGPT recommendations vs press coverage",
    ],
  },
  {
    slug: "diy",
    alternativeName: "DIY Approach",
    alternativeShortName: "DIY",
    headline: "AdsX vs DIY AI Optimization",
    subheadline: "Why doing it yourself may cost more than you think",
    description:
      "You could try to optimize for AI search yourself. But here's why working with specialists often delivers better results faster.",
    comparisonPoints: [
      {
        feature: "Time Investment",
        adsX: "We handle everything",
        alternative: "20+ hours/month of your team's time",
        winner: "adsx",
      },
      {
        feature: "Platform Coverage",
        adsX: "All major AI platforms monitored",
        alternative: "Likely only 1-2 platforms",
        winner: "adsx",
      },
      {
        feature: "Expertise",
        adsX: "Dedicated AI search specialists",
        alternative: "Learning curve for your team",
        winner: "adsx",
      },
      {
        feature: "Tools & Monitoring",
        adsX: "Proprietary tracking across platforms",
        alternative: "Manual checking, limited visibility",
        winner: "adsx",
      },
      {
        feature: "Strategy Updates",
        adsX: "Continuous optimization as platforms evolve",
        alternative: "Reactive to changes you notice",
        winner: "adsx",
      },
      {
        feature: "Cost",
        adsX: "$4,250+/month",
        alternative: "Internal time + opportunity cost",
        winner: "tie",
      },
    ],
    adsXBenefits: [
      {
        title: "Faster Results",
        description:
          "We've already learned what works. Skip months of trial and error.",
      },
      {
        title: "Comprehensive Coverage",
        description:
          "Monitor and optimize across all major AI platforms, not just one.",
      },
      {
        title: "Dedicated Focus",
        description:
          "Your team stays focused on core business while we handle AI visibility.",
      },
    ],
    alternativeBenefits: [
      {
        title: "Lower Direct Cost",
        description:
          "No agency fees if you have available internal bandwidth.",
      },
      {
        title: "Internal Learning",
        description:
          "Team builds expertise that stays with the company.",
      },
      {
        title: "Full Control",
        description:
          "Direct control over all decisions and priorities.",
      },
    ],
    verdict:
      "DIY can work if you have dedicated bandwidth and are willing to invest in learning. But most teams find the opportunity cost and slower results make working with specialists the better investment.",
    keywords: [
      "AI visibility agency vs DIY",
      "hire AI search agency",
      "AI optimization agency benefits",
    ],
  },
];

/**
 * Get all comparisons for static generation
 */
export function getAllComparisons(): Comparison[] {
  return comparisons;
}

/**
 * Get a specific comparison by slug
 */
export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

/**
 * Get all comparison slugs for generateStaticParams
 */
export function getAllComparisonSlugs(): string[] {
  return comparisons.map((c) => c.slug);
}
