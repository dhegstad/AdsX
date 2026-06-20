import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, getRelatedPosts, getAuthorByName } from "@/lib/blog";
import { BrutalistBlogPostContent } from "@/components/brutalist-blog-post-content";
import { createArticleMetadata } from "@/lib/seo/metadata";
import {
  createArticleSchema,
  createBreadcrumbSchema,
  createHowToSchema,
  extractVideoSchemas,
  SchemaScript,
} from "@/lib/seo/schemas";
import { getRelatedPages } from "@/lib/seo/internal-linking";

// ISR: generate on first request, cache for 24 hours
export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
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

  const relatedPosts = getRelatedPosts(slug, post.category, 5, post.tags);
  const relatedPages = getRelatedPages(post, 8);

  // Resolve the byline to the full author entity for E-E-A-T (bio, sameAs, knowsAbout).
  const author = getAuthorByName(post.author.name);
  const authorSameAs = author
    ? [
        author.twitter ? `https://twitter.com/${author.twitter}` : null,
        author.linkedin ? `https://www.linkedin.com/${author.linkedin}` : null,
      ].filter((u): u is string => Boolean(u))
    : undefined;

  // Create schemas using factories
  const articleSchema = createArticleSchema({
    title: post.title,
    description: post.excerpt,
    slug,
    publishedTime: post.date,
    modifiedTime: post.updated,
    author: post.author.name,
    authorRole: post.author.role,
    authorBio: author?.bio,
    authorUrl: author ? `https://www.adsx.com/blog/author/${author.slug}` : undefined,
    authorSameAs,
    authorKnowsAbout: author?.knowsAbout,
    image: post.image,
    tags: post.tags,
    category: post.category,
    faqs: post.faqs,
    articleType: post.articleType,
  });

  const howToSchema = post.howto?.steps?.length
    ? createHowToSchema({
        name: post.howto.name || post.title,
        description: post.excerpt,
        totalTime: post.howto.totalTime,
        steps: post.howto.steps,
      })
    : null;

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${slug}` },
  ]);

  const videoSchemas = extractVideoSchemas(post.content, post.title, post.date);

  return (
    <>
      <SchemaScript schema={articleSchema} />
      <SchemaScript schema={breadcrumbSchema} />
      {howToSchema && <SchemaScript schema={howToSchema} />}
      {videoSchemas.map((vs, i) => (
        <SchemaScript key={`video-${i}`} schema={vs} />
      ))}
      <BrutalistBlogPostContent
        post={post}
        slug={slug}
        relatedPosts={relatedPosts}
        relatedPages={relatedPages}
        author={
          author
            ? {
                slug: author.slug,
                name: author.name,
                role: author.role,
                bio: author.bio,
              }
            : null
        }
      />
    </>
  );
}
