import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/blog";
import { BrutalistBlogPostContent } from "@/components/brutalist-blog-post-content";
import { createArticleMetadata } from "@/lib/seo/metadata";
import {
  createArticleSchema,
  createBreadcrumbSchema,
  SchemaScript,
} from "@/lib/seo/schemas";
import { getRelatedPages } from "@/lib/seo/internal-linking";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return createArticleMetadata({
    title: post.title,
    description: post.excerpt,
    slug,
    publishedTime: post.date,
    modifiedTime: post.updated,
    author: post.author.name,
    tags: post.tags,
    image: post.image,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, post.category, 3, post.tags);
  const relatedPages = getRelatedPages(post);

  // Create schemas using factories
  const articleSchema = createArticleSchema({
    title: post.title,
    description: post.excerpt,
    slug,
    publishedTime: post.date,
    modifiedTime: post.updated,
    author: post.author.name,
    authorRole: post.author.role,
    image: post.image,
    tags: post.tags,
    category: post.category,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${slug}` },
  ]);

  return (
    <>
      <SchemaScript schema={articleSchema} />
      <SchemaScript schema={breadcrumbSchema} />
      <BrutalistBlogPostContent
        post={post}
        slug={slug}
        relatedPosts={relatedPosts}
        relatedPages={relatedPages}
      />
    </>
  );
}
