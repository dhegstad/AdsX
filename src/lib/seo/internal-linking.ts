import { getAllIntegrations } from "@/lib/integrations";
import { getAllLists } from "@/lib/curated-lists";
import { getAllPosts, type BlogPostMeta } from "@/lib/blog";

export interface RelatedPage {
  title: string;
  path: string;
  type: "service" | "tool" | "integration" | "guide";
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

  // Link to free audit tool for actionable content
  if (category === "guide" || category === "how-to") {
    relatedPages.push({
      title: "Free AI Visibility Audit",
      path: "/tools/free-audit",
      type: "tool",
      relevance: 0.5,
    });
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

  // Check curated lists for guide/resource content
  const curatedLists = getAllLists();
  const guideKeywords = ["best", "top", "guide", "how to", "tools", "resources"];
  const isGuideContent = guideKeywords.some(k => title.includes(k) || category === "guide");

  if (isGuideContent) {
    for (const list of curatedLists.slice(0, 5)) {
      let relevance = 0;

      // Check if list keywords match post content
      for (const keyword of list.keywords) {
        if (title.includes(keyword.toLowerCase())) {
          relevance += 0.35;
        }
        for (const tag of tags) {
          if (keyword.toLowerCase().includes(tag)) {
            relevance += 0.2;
          }
        }
      }

      if (relevance > 0) {
        relatedPages.push({
          title: list.title,
          path: `/best/${list.slug}`,
          type: "guide",
          relevance: Math.min(relevance, 1),
        });
      }
    }
  }

  // Always include the free audit tool as a conversion link
  relatedPages.push({
    title: "Free AI Visibility Audit",
    path: "/tools/free-audit",
    type: "tool",
    relevance: 0.35,
  });

  // Always include the services page
  relatedPages.push({
    title: "Our AI Advertising Services",
    path: "/services",
    type: "service",
    relevance: 0.15,
  });

  // Deduplicate by path and sort by relevance
  const seen = new Set<string>();
  return relatedPages
    .sort((a, b) => b.relevance - a.relevance)
    .filter((page) => {
      if (seen.has(page.path)) return false;
      seen.add(page.path);
      return true;
    })
    .slice(0, limit);
}

/**
 * Finds related blog articles for a programmatic page based on keyword matching.
 * Used to add contextual blog links on industry, platform, glossary, etc. pages.
 */
export function getRelatedArticlesForPage(
  keywords: string[],
  pageName: string,
  limit: number = 3
): BlogPostMeta[] {
  const allPosts = getAllPosts();
  const searchTerms = [
    ...keywords.map((k) => k.toLowerCase()),
    pageName.toLowerCase(),
  ];

  const scored = allPosts.map((post) => {
    const titleLower = post.title.toLowerCase();
    const tagsLower = (post.tags || []).map((t) => t.toLowerCase());
    const categoryLower = post.category.toLowerCase();
    let score = 0;

    for (const term of searchTerms) {
      if (titleLower.includes(term)) score += 0.4;
      if (tagsLower.some((tag) => tag.includes(term) || term.includes(tag))) score += 0.3;
      if (categoryLower.includes(term)) score += 0.1;
    }

    return { post, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
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
  } else if (segments[0] === "integrations") {
    breadcrumbs.push({ name: "Integrations", path: "/integrations" });
    if (segments[1]) {
      breadcrumbs.push({ name: pageTitle, path });
    }
  } else if (segments[0] === "best") {
    breadcrumbs.push({ name: "Best Of", path: "/best" });
    if (segments[1]) {
      breadcrumbs.push({ name: pageTitle, path });
    }
  } else if (segments[0] === "tools") {
    breadcrumbs.push({ name: "Tools", path: "/tools/free-audit" });
    if (segments[1]) {
      breadcrumbs.push({ name: pageTitle, path });
    }
  } else {
    breadcrumbs.push({ name: pageTitle, path });
  }

  return breadcrumbs;
}
