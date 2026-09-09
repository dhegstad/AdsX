import { getTopicSlugs, getContentIntent, publicationTopics } from "@/lib/publication";
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
  const topics = getTopicSlugs(post);
  const pages: RelatedPage[] = publicationTopics.filter(t => topics.includes(t.slug)).map(t => ({ title: t.name, path: `/topics/${t.slug}`, type: "guide", relevance: 1 }));
  if (topics.includes("start-a-store")) pages.push({ title: "Shopify startup cost calculator", path: "/tools/shopify-startup-cost-calculator", type: "tool", relevance: 0.9 });
  if (getContentIntent(post) === "affiliate") pages.push({ title: "Start a Shopify store", path: "/start-a-shopify-store", type: "guide", relevance: 0.9 }, { title: "Is Shopify right for you?", path: "/is-shopify-right-for-you", type: "guide", relevance: 0.8 });
  if (topics.includes("advertising")) pages.push({ title: "Free ROAS calculator", path: "/tools/roas-calculator", type: "tool", relevance: 0.8 });
  if (topics.includes("development") || topics.includes("ai-commerce")) pages.push({ title: "Product feed readiness checker", path: "/tools/feed-readiness-checker", type: "tool", relevance: 0.8 });
  if (!pages.length) pages.push({ title: "Explore Shopify and ecommerce topics", path: "/topics", type: "guide", relevance: 0.5 });
  return pages.slice(0, limit);
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
