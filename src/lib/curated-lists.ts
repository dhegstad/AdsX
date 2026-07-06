/**
 * Curated Lists data for programmatic SEO
 * Each list generates a dedicated page at /best/[category]
 */

export interface ListItem {
  name: string;
  description: string;
  highlight: string;
  link?: string;
}

export interface ListFAQ {
  question: string;
  answer: string;
}

export interface CuratedList {
  slug: string;
  title: string;
  headline: string;
  description: string;
  intro: string;
  methodology: string;
  items: ListItem[];
  considerations: string[];
  faqs: ListFAQ[];
  keywords: string[];
  category: "tools" | "strategies" | "resources" | "guides";
  lastUpdated: string;
}

export const curatedLists: CuratedList[] = [
  {
    slug: "ai-visibility-courses",
    title: "Best AI Visibility Courses and Training",
    headline: "Top AI Visibility Courses and Training Programs for 2026",
    description: "Curated list of the best courses and training programs for learning AI visibility optimization.",
    intro: "AI visibility is an emerging discipline, and quality education resources are essential for building expertise. This guide covers the best courses, certifications, and training programs for mastering AI visibility optimization.",
    methodology: "We evaluated courses based on curriculum comprehensiveness, instructor credentials, practical applicability, student outcomes, and value for investment. We prioritized programs with hands-on components and current content.",
    items: [
      {
        name: "AdsX AI Visibility Certification",
        description: "Comprehensive certification program covering all aspects of AI visibility optimization. Includes practical exercises and real-world case studies.",
        highlight: "Most comprehensive AI visibility certification available",
        link: "/contact",
      },
      {
        name: "HubSpot AI Marketing Course",
        description: "Free introductory course covering AI's impact on marketing, including visibility considerations. Good starting point for marketers.",
        highlight: "Free, good for fundamentals",
      },
      {
        name: "Search Engine Journal AI SEO Training",
        description: "Course covering the intersection of SEO and AI, including visibility optimization strategies. Taught by industry practitioners.",
        highlight: "Strong SEO-to-AI bridge content",
      },
      {
        name: "Coursera AI for Marketing",
        description: "Academic-style course covering AI fundamentals for marketers. Provides theoretical foundation for understanding AI systems.",
        highlight: "Strong theoretical foundation",
      },
      {
        name: "LinkedIn Learning AI Marketing Paths",
        description: "Collection of courses on AI marketing topics. Flexible learning paths for different skill levels.",
        highlight: "Self-paced, LinkedIn credential",
      },
      {
        name: "Content Marketing Institute AI Workshop",
        description: "Intensive workshop on AI-optimized content creation. Practical focus on content that AI systems value.",
        highlight: "Content-focused AI training",
      },
    ],
    considerations: [
      "Check course update dates—AI visibility is evolving rapidly",
      "Look for courses with practical, hands-on components",
      "Consider your current skill level when choosing",
      "Instructor credentials in AI visibility specifically matter",
      "Community and ongoing support add significant value",
    ],
    faqs: [
      {
        question: "Do I need technical skills for AI visibility training?",
        answer: "Basic marketing and digital skills are sufficient for most courses. Technical courses exist for those wanting deeper understanding, but aren't required for effective optimization.",
      },
      {
        question: "How long does it take to learn AI visibility?",
        answer: "Fundamentals can be learned in a few weeks. Mastery takes months of practice and testing. The field is evolving, so continuous learning is essential.",
      },
      {
        question: "Are AI visibility certifications worth it?",
        answer: "Quality certifications demonstrate expertise to employers and clients. Look for certifications with practical components and industry recognition.",
      },
    ],
    keywords: ["AI visibility courses", "AI marketing training", "ChatGPT optimization course", "AI SEO certification"],
    category: "resources",
    lastUpdated: "2026-02-01",
  },
];

/**
 * Get all curated lists
 */
export function getAllLists(): CuratedList[] {
  return curatedLists;
}

/**
 * Get a specific list by slug
 */
export function getListBySlug(slug: string): CuratedList | undefined {
  return curatedLists.find((l) => l.slug === slug);
}

/**
 * Get all list slugs
 */
export function getAllListSlugs(): string[] {
  return curatedLists.map((l) => l.slug);
}

/**
 * Get lists by category
 */
export function getListsByCategory(
  category: CuratedList["category"]
): CuratedList[] {
  return curatedLists.filter((l) => l.category === category);
}

/**
 * Get list categories with counts
 */
export function getListCategories(): { slug: string; name: string; count: number }[] {
  const categoryNames: Record<CuratedList["category"], string> = {
    tools: "Tools & Software",
    strategies: "Strategies",
    resources: "Resources",
    guides: "Guides",
  };

  const counts: Record<string, number> = {};
  for (const list of curatedLists) {
    counts[list.category] = (counts[list.category] || 0) + 1;
  }

  return Object.entries(categoryNames).map(([slug, name]) => ({
    slug,
    name,
    count: counts[slug] || 0,
  }));
}
