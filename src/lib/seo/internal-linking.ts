import { getAllIndustries } from "@/lib/industries";
import { getAllComparisons } from "@/lib/comparisons";
import type { BlogPostMeta } from "@/lib/blog";

export interface RelatedPage {
  title: string;
  path: string;
  type: "industry" | "comparison" | "service" | "tool";
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
  } else {
    breadcrumbs.push({ name: pageTitle, path });
  }

  return breadcrumbs;
}
