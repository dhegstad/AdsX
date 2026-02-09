import { getAllIndustries } from "@/lib/industries";
import { getAllComparisons } from "@/lib/comparisons";
import { getAllLocations } from "@/lib/locations";
import { getAllPersonas } from "@/lib/personas";
import { getAllIntegrations } from "@/lib/integrations";
import { getAllTerms } from "@/lib/glossary";
import { getAllPlatforms } from "@/lib/platforms";
import type { BlogPostMeta } from "@/lib/blog";

export interface RelatedPage {
  title: string;
  path: string;
  type: "industry" | "comparison" | "service" | "tool" | "location" | "persona" | "integration" | "glossary" | "platform";
  relevance: number; // 0-1 score for sorting
}

/**
 * Finds related pages for a blog post based on content analysis
 * Used to add contextual internal links at the end of blog posts
 */
export function getRelatedPages(
  post: BlogPostMeta,
  limit: number = 3
): RelatedPage[] {
  const relatedPages: RelatedPage[] = [];
  const tags = post.tags?.map((t) => t.toLowerCase()) || [];
  const category = post.category.toLowerCase();
  const title = post.title.toLowerCase();

  // Check industry pages
  const industries = getAllIndustries();
  for (const industry of industries) {
    let relevance = 0;

    // Check if post tags match industry keywords
    for (const tag of tags) {
      if (
        industry.keywords.some((k) => k.toLowerCase().includes(tag)) ||
        tag.includes(industry.slug) ||
        tag.includes(industry.name.toLowerCase())
      ) {
        relevance += 0.3;
      }
    }

    // Check if title mentions industry
    if (
      title.includes(industry.slug) ||
      title.includes(industry.name.toLowerCase())
    ) {
      relevance += 0.4;
    }

    // E-commerce related content
    if (
      industry.slug === "ecommerce" &&
      (tags.includes("e-commerce") ||
        tags.includes("shopping") ||
        tags.includes("product") ||
        title.includes("shop") ||
        title.includes("product"))
    ) {
      relevance += 0.3;
    }

    // SaaS related content
    if (
      industry.slug === "saas" &&
      (tags.includes("b2b") ||
        tags.includes("software") ||
        title.includes("saas") ||
        title.includes("software"))
    ) {
      relevance += 0.3;
    }

    // Fintech related content
    if (
      industry.slug === "fintech" &&
      (tags.includes("finance") ||
        tags.includes("banking") ||
        title.includes("fintech") ||
        title.includes("financial"))
    ) {
      relevance += 0.3;
    }

    if (relevance > 0) {
      relatedPages.push({
        title: `AI Visibility for ${industry.name}`,
        path: `/industries/${industry.slug}`,
        type: "industry",
        relevance: Math.min(relevance, 1),
      });
    }
  }

  // Check comparison pages
  const comparisons = getAllComparisons();
  for (const comparison of comparisons) {
    let relevance = 0;

    // SEO comparison relevant to SEO-tagged content
    if (
      comparison.slug === "seo" &&
      (tags.includes("seo") ||
        tags.includes("search") ||
        title.includes("seo") ||
        category === "strategy")
    ) {
      relevance += 0.4;
    }

    // PR comparison relevant to marketing content
    if (
      comparison.slug === "pr" &&
      (tags.includes("marketing") ||
        tags.includes("brand") ||
        title.includes("brand"))
    ) {
      relevance += 0.3;
    }

    // DIY comparison relevant to guide content
    if (comparison.slug === "diy" && category === "guide") {
      relevance += 0.2;
    }

    if (relevance > 0) {
      relatedPages.push({
        title: comparison.headline,
        path: `/compare/ai-visibility-vs-${comparison.slug}`,
        type: "comparison",
        relevance: Math.min(relevance, 1),
      });
    }
  }

  // Always consider linking to free audit tool for actionable content
  if (category === "guide" || category === "how-to") {
    relatedPages.push({
      title: "Free AI Visibility Audit",
      path: "/tools/free-audit",
      type: "tool",
      relevance: 0.5,
    });
  }

  // Check location pages for local/regional content
  const locations = getAllLocations();
  const cityKeywords = ["new york", "nyc", "san francisco", "sf", "los angeles", "la", "chicago", "austin", "seattle", "boston", "miami", "denver", "atlanta"];
  for (const location of locations) {
    let relevance = 0;
    const cityLower = location.city.toLowerCase();

    if (title.includes(cityLower) || title.includes(location.state.toLowerCase())) {
      relevance += 0.4;
    }

    for (const tag of tags) {
      if (tag.includes(cityLower) || cityKeywords.some(k => tag.includes(k) && location.city.toLowerCase().includes(k.split(" ")[0]))) {
        relevance += 0.3;
      }
    }

    if (relevance > 0) {
      relatedPages.push({
        title: `AI Visibility in ${location.city}`,
        path: `/locations/${location.slug}`,
        type: "location",
        relevance: Math.min(relevance, 1),
      });
    }
  }

  // Check persona pages for role-specific content
  const personas = getAllPersonas();
  const roleKeywords = {
    "cmo": ["cmo", "chief marketing", "marketing executive"],
    "vp-marketing": ["vp marketing", "vice president marketing"],
    "head-of-growth": ["growth", "acquisition", "growth marketing"],
    "marketing-director": ["marketing director", "director of marketing"],
    "ecommerce-manager": ["ecommerce", "e-commerce", "online store"],
    "brand-manager": ["brand", "branding"],
    "content-director": ["content", "content marketing", "editorial"],
    "digital-marketing-manager": ["digital marketing", "digital marketer"],
  };

  for (const persona of personas) {
    let relevance = 0;
    const keywords = roleKeywords[persona.slug as keyof typeof roleKeywords] || [];

    for (const keyword of keywords) {
      if (title.includes(keyword)) {
        relevance += 0.35;
      }
      for (const tag of tags) {
        if (tag.includes(keyword)) {
          relevance += 0.25;
        }
      }
    }

    if (relevance > 0) {
      relatedPages.push({
        title: `AI Visibility for ${persona.title}s`,
        path: `/for/${persona.slug}`,
        type: "persona",
        relevance: Math.min(relevance, 1),
      });
    }
  }

  // Check integration pages for platform-specific content
  const integrations = getAllIntegrations();
  for (const integration of integrations) {
    let relevance = 0;
    const platformLower = integration.name.toLowerCase();

    if (title.includes(platformLower)) {
      relevance += 0.4;
    }

    for (const tag of tags) {
      if (tag.includes(platformLower)) {
        relevance += 0.3;
      }
    }

    // Category matching
    if (integration.category === "ecommerce" && (tags.includes("e-commerce") || tags.includes("ecommerce") || tags.includes("shopping"))) {
      relevance += 0.2;
    }

    if (relevance > 0) {
      relatedPages.push({
        title: `AI Visibility for ${integration.name}`,
        path: `/integrations/${integration.slug}`,
        type: "integration",
        relevance: Math.min(relevance, 1),
      });
    }
  }

  // Check glossary terms for technical/educational content
  const glossaryTerms = getAllTerms();
  const technicalKeywords = ["llm", "ai", "chatgpt", "claude", "perplexity", "optimization", "training", "model", "natural language", "nlp"];
  const isTechnicalContent = technicalKeywords.some(k => title.includes(k) || tags.some(t => t.includes(k)));

  if (isTechnicalContent) {
    for (const term of glossaryTerms.slice(0, 10)) {
      let relevance = 0;
      const termLower = term.term.toLowerCase();

      if (title.includes(termLower) || title.includes(term.slug.replace(/-/g, " "))) {
        relevance += 0.35;
      }

      for (const tag of tags) {
        if (tag.includes(term.slug.replace(/-/g, " ")) || term.keywords.some(k => k.toLowerCase().includes(tag))) {
          relevance += 0.25;
        }
      }

      if (relevance > 0) {
        relatedPages.push({
          title: `What is ${term.term}?`,
          path: `/glossary/${term.slug}`,
          type: "glossary",
          relevance: Math.min(relevance, 1),
        });
      }
    }
  }

  // Check AI platform pages for platform-specific content
  const aiPlatforms = getAllPlatforms();
  const platformKeywords = ["chatgpt", "claude", "perplexity", "gemini", "copilot", "ai assistant", "ai platform"];
  const isPlatformContent = platformKeywords.some(k => title.includes(k) || tags.some(t => t.includes(k)));

  if (isPlatformContent) {
    for (const platform of aiPlatforms) {
      let relevance = 0;
      const platformLower = platform.name.toLowerCase();

      if (title.includes(platformLower)) {
        relevance += 0.45;
      }

      for (const tag of tags) {
        if (tag.includes(platformLower)) {
          relevance += 0.3;
        }
      }

      if (relevance > 0) {
        relatedPages.push({
          title: `AI Visibility for ${platform.name}`,
          path: `/platforms/${platform.slug}`,
          type: "platform",
          relevance: Math.min(relevance, 1),
        });
      }
    }
  }

  // Sort by relevance and limit
  return relatedPages
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit);
}

/**
 * Generates breadcrumb items for a page
 */
export function getBreadcrumbs(
  path: string,
  pageTitle: string
): { name: string; path: string }[] {
  const breadcrumbs = [{ name: "Home", path: "/" }];

  const segments = path.split("/").filter(Boolean);

  if (segments[0] === "blog") {
    breadcrumbs.push({ name: "Blog", path: "/blog" });

    if (segments[1] === "category" && segments[2]) {
      breadcrumbs.push({
        name: "Categories",
        path: "/blog",
      });
    } else if (segments[1] === "tag" && segments[2]) {
      breadcrumbs.push({
        name: "Tags",
        path: "/blog",
      });
    } else if (segments[1] && segments[1] !== "category" && segments[1] !== "tag") {
      // It's a blog post
    }

    breadcrumbs.push({ name: pageTitle, path });
  } else if (segments[0] === "industries" && segments[1]) {
    breadcrumbs.push({ name: "Industries", path: "/industries" });
    breadcrumbs.push({ name: pageTitle, path });
  } else if (segments[0] === "compare") {
    breadcrumbs.push({ name: "Comparisons", path: "/compare" });
    if (segments[1]) {
      breadcrumbs.push({ name: pageTitle, path });
    }
  } else if (segments[0] === "locations") {
    breadcrumbs.push({ name: "Locations", path: "/locations" });
    if (segments[1]) {
      breadcrumbs.push({ name: pageTitle, path });
    }
  } else if (segments[0] === "for") {
    breadcrumbs.push({ name: "Solutions", path: "/for" });
    if (segments[1]) {
      breadcrumbs.push({ name: pageTitle, path });
    }
  } else if (segments[0] === "integrations") {
    breadcrumbs.push({ name: "Integrations", path: "/integrations" });
    if (segments[1]) {
      breadcrumbs.push({ name: pageTitle, path });
    }
  } else if (segments[0] === "glossary") {
    breadcrumbs.push({ name: "Glossary", path: "/glossary" });
    if (segments[1]) {
      breadcrumbs.push({ name: pageTitle, path });
    }
  } else if (segments[0] === "platforms") {
    breadcrumbs.push({ name: "AI Platforms", path: "/platforms" });
    if (segments[1]) {
      breadcrumbs.push({ name: pageTitle, path });
    }
  } else {
    breadcrumbs.push({ name: pageTitle, path });
  }

  return breadcrumbs;
}
