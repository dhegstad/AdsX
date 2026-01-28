import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, Tag, Share2, Linkedin, Twitter } from "lucide-react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/blog";
import { MDXContent } from "@/components/blog/mdx-content";

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
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | AdsX Blog`,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: post.image ? [{ url: post.image, alt: post.imageAlt || post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://adsx.com/blog/${slug}`,
    },
  };
}

function ArticleSchema({ post, slug }: { post: NonNullable<ReturnType<typeof getPostBySlug>>; slug: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image || "https://adsx.com/og-image.png",
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "AdsX",
      logo: {
        "@type": "ImageObject",
        url: "https://adsx.com/logo.png",
      },
    },
    datePublished: post.date,
    dateModified: post.updated || post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://adsx.com/blog/${slug}`,
    },
    keywords: post.tags?.join(", "),
    articleSection: post.category,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function BreadcrumbSchema({ post, slug }: { post: NonNullable<ReturnType<typeof getPostBySlug>>; slug: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://adsx.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://adsx.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://adsx.com/blog/${slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, post.category);
  const shareUrl = encodeURIComponent(`https://adsx.com/blog/${slug}`);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <div className="min-h-screen bg-black text-white">
      <ArticleSchema post={post} slug={slug} />
      <BreadcrumbSchema post={post} slug={slug} />
      <Header />

      {/* Article Header */}
      <article className="relative pt-32 pb-16">
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </nav>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-emerald-400">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-white/50">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1 text-white/50">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>

          {/* Excerpt */}
          <p className="mt-6 text-xl text-white/60">{post.excerpt}</p>

          {/* Author */}
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-8">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <span className="text-white font-bold">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-sm text-white/50">{post.author.role}</div>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/50 mr-2">Share:</span>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-12">
          <div className="prose prose-invert prose-emerald max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-emerald-300 prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10">
            <MDXContent content={post.content} />
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-4 w-4 text-white/50" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/5 px-3 py-1 text-sm text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-white/10 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-12">Related Articles</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group">
                  <article>
                    <div className="aspect-video rounded-xl bg-white/5 overflow-hidden mb-4 relative">
                      <Image
                        src={`/blog/${relatedPost.slug}/opengraph-image`}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-emerald-400 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/60 line-clamp-2">{relatedPost.excerpt}</p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to dominate AI search?</h2>
          <p className="mt-4 text-white/60">
            Get a free audit of your brand&apos;s AI visibility and a roadmap for capturing this emerging channel.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 font-medium text-black hover:bg-emerald-400 transition-colors"
            >
              Get Your Free Audit
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
