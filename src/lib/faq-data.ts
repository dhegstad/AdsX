/**
 * Single source of truth for FAQ content
 * Used by both the FAQ component and structured data schema
 * Keeping this centralized prevents content drift between UI and SEO
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export const homepageFAQs: FAQItem[] = [
  {
    question: "What is AI search advertising?",
    answer:
      "AI search advertising focuses on getting your brand recommended by AI assistants like ChatGPT, Claude, Perplexity, and Gemini. Unlike traditional SEO which optimizes for search engine rankings, AI search advertising ensures your brand appears in AI-generated responses and recommendations.",
  },
  {
    question: "How is this different from traditional SEO?",
    answer:
      "Traditional SEO optimizes for keyword rankings on Google. AI search optimization focuses on how LLMs understand and recommend your brand. This includes structured data, content formatting for AI parsing, and building signals that influence AI recommendations.",
  },
  {
    question: "Which AI platforms do you cover?",
    answer:
      "We optimize for all major AI assistants including ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google), Perplexity, Grok (xAI), and Microsoft Copilot. Our strategies adapt as new platforms emerge.",
  },
  {
    question: "How long until I see results?",
    answer:
      "Initial visibility improvements typically occur within 4-6 weeks. However, AI search optimization is an ongoing process—LLMs continuously update their knowledge, so sustained effort produces compounding results over time.",
  },
  {
    question: "What's the minimum engagement?",
    answer:
      "We require a 3-month minimum engagement starting at $4,250/month. This allows sufficient time to implement strategies, measure results, and optimize. After the initial period, clients can continue month-to-month.",
  },
  {
    question: "Do you guarantee results?",
    answer:
      "We don't guarantee specific rankings or mentions, as AI responses vary by user context. However, we do guarantee dedicated strategy execution, regular reporting, and continuous optimization based on measured performance.",
  },
];

export const pricingFAQs: FAQItem[] = [
  {
    question: "What's included in the monthly fee?",
    answer:
      "The monthly fee includes comprehensive AI visibility audits, content optimization, multi-platform monitoring (ChatGPT, Claude, Perplexity, Gemini, Grok), strategic recommendations, monthly reporting, and dedicated support. Ad spend for sponsored placements is billed separately.",
  },
  {
    question: "Why is there a 3-month minimum?",
    answer:
      "AI search optimization requires time to implement properly. The first month focuses on auditing and strategy, month two on implementation, and month three on optimization. This minimum ensures we can deliver meaningful results.",
  },
  {
    question: "Can I cancel after the minimum period?",
    answer:
      "Yes, after the initial 3-month period, you can continue on a month-to-month basis or cancel with 30 days notice. We believe in earning your business through results, not contracts.",
  },
  {
    question: "Do you offer discounts for annual commitments?",
    answer:
      "Yes, we offer a 10% discount for clients who commit to 12 months upfront. Contact us to discuss annual pricing and custom arrangements for larger engagements.",
  },
  {
    question: "What determines the final price?",
    answer:
      "Pricing starts at $4,250/month and varies based on the number of platforms covered, competitive intensity in your category, content volume requirements, and any sponsored placement budgets.",
  },
  {
    question: "Is ad spend included?",
    answer:
      "No, the monthly fee covers strategy and optimization services. Sponsored placements on platforms like ChatGPT or Perplexity require additional ad spend, which is billed separately and managed transparently.",
  },
];

export const servicesFAQs: FAQItem[] = [
  {
    question: "How do you track AI visibility?",
    answer:
      "We use proprietary monitoring tools that query AI platforms with relevant prompts for your category, tracking how often and how positively your brand is mentioned. We provide monthly reports with visibility scores, sentiment analysis, and competitive benchmarking.",
  },
  {
    question: "Can you help with ChatGPT ads specifically?",
    answer:
      "Yes, we're among the first agencies with access to ChatGPT's advertising program. We can help you plan, launch, and optimize sponsored placements within ChatGPT conversations.",
  },
  {
    question: "Do you write content for us?",
    answer:
      "We provide content optimization recommendations and can coordinate with your team or content partners. For clients who need content creation, we offer this as an add-on service or can recommend trusted partners.",
  },
  {
    question: "How do you protect our brand in AI responses?",
    answer:
      "We monitor AI responses for inaccuracies about your brand and implement correction strategies including structured data updates, authoritative content creation, and direct platform feedback where available.",
  },
];

/**
 * Get all FAQs for a specific page
 */
export function getFAQsForPage(
  page: "homepage" | "pricing" | "services"
): FAQItem[] {
  switch (page) {
    case "homepage":
      return homepageFAQs;
    case "pricing":
      return pricingFAQs;
    case "services":
      return servicesFAQs;
    default:
      return homepageFAQs;
  }
}
