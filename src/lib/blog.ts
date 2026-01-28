import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

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

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
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
      image: data.image,
      readingTime: stats.text,
      featured: data.featured || false,
    };
  });

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPostMeta[] {
  const allPosts = getAllPosts();
  return allPosts
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
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
      slug: category.toLowerCase().replace(/\s+/g, "-"),
    }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByCategory(categorySlug: string): BlogPostMeta[] {
  const posts = getAllPosts();
  return posts.filter(
    (post) => post.category.toLowerCase().replace(/\s+/g, "-") === categorySlug
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
      slug: tag.toLowerCase().replace(/\s+/g, "-"),
    }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tagSlug: string): BlogPostMeta[] {
  const posts = getAllPosts();
  return posts.filter((post) =>
    post.tags?.some((tag) => tag.toLowerCase().replace(/\s+/g, "-") === tagSlug)
  );
}

export function getTagBySlug(slug: string): string | null {
  const tags = getAllTags();
  const found = tags.find((t) => t.slug === slug);
  return found ? found.tag : null;
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
}

export const authors: Author[] = [
  {
    slug: "sarah-chen",
    name: "Sarah Chen",
    role: "Head of AI Strategy",
    bio: "Sarah leads AI strategy at AdsX, helping brands navigate the shift to AI-powered search. With 10+ years in digital marketing and a background in machine learning, she bridges the gap between technical AI capabilities and practical marketing applications.",
    twitter: "sarahchen",
    linkedin: "sarahchen",
  },
  {
    slug: "marcus-rodriguez",
    name: "Marcus Rodriguez",
    role: "Director of Paid Media",
    bio: "Marcus oversees paid media strategy at AdsX, specializing in emerging ad platforms including ChatGPT Ads and Perplexity Sponsored Answers. Previously led performance marketing at two Fortune 500 companies.",
    twitter: "marcusrodriguez",
    linkedin: "marcusrodriguez",
  },
  {
    slug: "dr-james-liu",
    name: "Dr. James Liu",
    role: "AI Research Lead",
    bio: "James leads AI research at AdsX, focusing on how large language models process and recommend brands. He holds a PhD in Machine Learning from Stanford and previously worked on recommendation systems at Google.",
    twitter: "drjamesliu",
    linkedin: "drjamesliu",
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
