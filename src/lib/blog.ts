import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Hosts that next/image is allowed to optimize (must mirror next.config.ts
// remotePatterns). We only promote an in-body image to a listing thumbnail when
// it comes from one of these hosts, so cards never point at an image the
// optimizer will reject.
const THUMBNAIL_HOSTS = new Set([
  "images.unsplash.com",
  "storage.googleapis.com",
  "cdn.shopify.com",
]);

// Pull the first usable in-body markdown image (`![alt](url)`) to use as the
// listing thumbnail when a post has no explicit frontmatter `image`. Skips
// non-http and disallowed hosts (e.g. chart images) so the listing falls back
// to a gradient placeholder instead of a broken card image.
export function extractFirstImage(content: string): string | undefined {
  const re = /!\[[^\]]*\]\(\s*(https?:\/\/[^\s)]+)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(content)) !== null) {
    const url = match[1];
    try {
      if (THUMBNAIL_HOSTS.has(new URL(url).hostname)) {
        return url;
      }
    } catch {
      // ignore malformed URLs
    }
  }
  return undefined;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  updated?: string;
  category: string;
  tags?: string[];
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  image?: string;
  imageAlt?: string;
  readingTime: string;
  featured?: boolean;
  faqs?: FAQItem[];
  tldr?: string;
  /** Override the Article schema @type. Use "TechArticle" for developer/code guides. */
  articleType?: "Article" | "TechArticle";
  /** Optional HowTo steps — emitted as schema.org HowTo for step-by-step tutorials. */
  howto?: {
    name?: string;
    totalTime?: string;
    steps: { name: string; text: string }[];
  };
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags?: string[];
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  image?: string;
  readingTime: string;
  featured?: boolean;
}

// Module-level cache: with 1000+ posts, reading and parsing MDX on every call is
// the dominant cost during build. The blog directory is immutable at build time,
// so caching per worker process is safe and removes the timeout that hits paginated routes.
let _allPostsCache: BlogPostMeta[] | null = null;

export function getAllPosts(): BlogPostMeta[] {
  if (_allPostsCache) {
    return _allPostsCache;
  }

  if (!fs.existsSync(BLOG_DIR)) {
    _allPostsCache = [];
    return _allPostsCache;
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(".mdx", "");
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || slug,
      excerpt: data.excerpt || "",
      date: data.date || new Date().toISOString(),
      category: data.category || "Uncategorized",
      tags: data.tags || [],
      author: data.author || { name: "AdsX Team", role: "AI Search Experts" },
      image: data.image || extractFirstImage(content),
      readingTime: stats.text,
      featured: data.featured || false,
    };
  });

  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  _allPostsCache = posts;
  return _allPostsCache;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || "",
    content,
    date: data.date || new Date().toISOString(),
    updated: data.updated,
    category: data.category || "Uncategorized",
    tags: data.tags || [],
    author: data.author || { name: "AdsX Team", role: "AI Search Experts" },
    image: data.image,
    imageAlt: data.imageAlt,
    readingTime: stats.text,
    featured: data.featured || false,
    faqs: data.faqs || undefined,
    tldr: data.tldr || undefined,
    articleType: data.articleType || undefined,
    howto: data.howto || undefined,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3, currentTags?: string[]): BlogPostMeta[] {
  const allPosts = getAllPosts();
  const candidates = allPosts.filter((post) => post.slug !== currentSlug);

  if (!currentTags || currentTags.length === 0) {
    return candidates
      .filter((post) => post.category === category)
      .slice(0, limit);
  }

  const currentTagSet = new Set(currentTags.map((t) => t.toLowerCase()));

  const scored = candidates.map((post) => {
    const postTagSet = new Set((post.tags || []).map((t) => t.toLowerCase()));
    const intersection = [...currentTagSet].filter((t) => postTagSet.has(t)).length;
    const union = new Set([...currentTagSet, ...postTagSet]).size;
    const jaccard = union > 0 ? intersection / union : 0;

    let score = jaccard;
    if (post.category === category) score += 0.1;
    // Small recency bonus (up to 0.05 for posts within last 90 days)
    const ageInDays = (Date.now() - new Date(post.date).getTime()) / (1000 * 60 * 60 * 24);
    if (ageInDays < 90) score += 0.05 * (1 - ageInDays / 90);

    return { post, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // If top results have no tag overlap, fall back to category matching
  if (scored.length > 0 && scored[0].score < 0.15) {
    return candidates
      .filter((post) => post.category === category)
      .slice(0, limit);
  }

  return scored.slice(0, limit).map((s) => s.post);
}

// Pagination
export interface PaginatedPosts {
  posts: BlogPostMeta[];
  totalPages: number;
  currentPage: number;
  totalPosts: number;
}

export function getPaginatedPosts(page: number, perPage: number): PaginatedPosts {
  const allPosts = getAllPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / perPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * perPage;
  const posts = allPosts.slice(start, start + perPage);

  return { posts, totalPages, currentPage, totalPosts };
}

// Category functions
export function getAllCategories(): { category: string; count: number; slug: string }[] {
  const posts = getAllPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    const count = categoryMap.get(post.category) || 0;
    categoryMap.set(post.category, count + 1);
  });

  return Array.from(categoryMap.entries())
    .map(([category, count]) => ({
      category,
      count,
      slug: slugify(category),
    }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByCategory(categorySlug: string): BlogPostMeta[] {
  const posts = getAllPosts();
  return posts.filter(
    (post) => slugify(post.category) === categorySlug
  );
}

export function getCategoryBySlug(slug: string): string | null {
  const categories = getAllCategories();
  const found = categories.find((c) => c.slug === slug);
  return found ? found.category : null;
}

// Tag functions
export function getAllTags(): { tag: string; count: number; slug: string }[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      const count = tagMap.get(tag) || 0;
      tagMap.set(tag, count + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({
      tag,
      count,
      slug: slugify(tag),
    }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tagSlug: string): BlogPostMeta[] {
  const posts = getAllPosts();
  return posts.filter((post) =>
    post.tags?.some((tag) => slugify(tag) === tagSlug)
  );
}

export function getTagBySlug(slug: string): string | null {
  const tags = getAllTags();
  const found = tags.find((t) => t.slug === slug);
  return found ? found.tag : null;
}

export function getPostsByTagCount(tagSlug: string): number {
  return getPostsByTag(tagSlug).length;
}

// Author functions
export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  twitter?: string;
  linkedin?: string;
  /** Topics this author is an expert in — emitted as schema.org `knowsAbout` for E-E-A-T. */
  knowsAbout?: string[];
}

export const authors: Author[] = [
  {
    slug: "adsx-team",
    name: "AdsX Team",
    role: "AI Search Specialists",
    bio: "The AdsX team helps brands navigate AI-powered search and get recommended by ChatGPT, Claude, Perplexity, and other AI platforms. With deep expertise in LLM optimization, paid media, and e-commerce growth, our team has driven a 340% average increase in AI mentions for clients across industries.",
    linkedin: "company/adsx",
    twitter: "adsx",
  },
  {
    slug: "dennis-hegstad",
    name: "Dennis Hegstad",
    role: "Founder & CEO",
    bio: "Dennis Hegstad is the founder and CEO of AdsX, the first advertising agency built for AI search. With a background in performance marketing and e-commerce growth, Dennis identified the shift toward AI-powered product discovery early and built AdsX to help brands capitalize on this new channel. He specializes in AI visibility strategy, Shopify growth, and building scalable paid acquisition systems.",
    linkedin: "dennishegstad",
    twitter: "dennishegstad",
    knowsAbout: [
      "AI Search Optimization",
      "Shopify Growth",
      "Paid Media",
      "E-commerce",
    ],
  },
  {
    slug: "adsx-engineering",
    name: "AdsX Engineering",
    role: "Shopify API & Commerce Engineering",
    bio: "The AdsX engineering team builds the data pipelines that turn a Shopify product catalog into high-performing ad feeds across Google, Meta, and AI shopping agents. We work hands-on with the Shopify Admin GraphQL API, the Product Feed and Catalog APIs, metafields, and bulk operations every day, and these guides document the patterns we use in production.",
    linkedin: "company/adsx",
    twitter: "adsx",
    knowsAbout: [
      "Shopify Admin API",
      "Shopify GraphQL API",
      "Shopify Storefront API",
      "Product Catalog Management",
      "Product Feeds",
      "GraphQL",
      "E-commerce Engineering",
    ],
  },
];

export function getAuthorBySlug(slug: string): Author | null {
  return authors.find((a) => a.slug === slug) || null;
}

export function getAuthorByName(name: string): Author | null {
  return authors.find((a) => a.name === name) || null;
}

export function getPostsByAuthor(authorName: string): BlogPostMeta[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.author.name === authorName);
}
