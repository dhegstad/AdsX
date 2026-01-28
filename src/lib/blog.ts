import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

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
