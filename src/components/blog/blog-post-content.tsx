"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, Tag, Twitter, Linkedin, RefreshCw } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import { cn } from "@/lib/utils";
import { MDXContent } from "@/components/blog/mdx-content";
import { TableOfContentsInline } from "@/components/blog/table-of-contents";
import type { BlogPost, BlogPostMeta, Author } from "@/lib/blog";

interface BlogPostContentProps {
  post: BlogPost;
  slug: string;
  relatedPosts: BlogPostMeta[];
  authorData?: Author | null;
}

export function BlogPostContent({ post, slug, relatedPosts, authorData }: BlogPostContentProps) {
  const shareUrl = encodeURIComponent(`https://www.adsx.com/blog/${slug}`);
  const shareTitle = encodeURIComponent(post.title);
  const categorySlug = post.category.toLowerCase().replace(/\s+/g, "-");

  return (
    <ThemedLayout>
      {/* Article Header */}
      <article className="relative pt-32 pb-16">
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm transition-colors text-neutral-600 hover:text-emerald-600 dark:text-white/60 dark:hover:text-emerald-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </nav>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link
              href={`/blog/category/${categorySlug}`}
              className="rounded-full border px-3 py-1 transition-colors bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
            >
              {post.category}
            </Link>
            <span className="flex items-center gap-1 text-neutral-500 dark:text-white/50">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {post.updated && (
              <span className="flex items-center gap-1 text-neutral-500 dark:text-white/50">
                <RefreshCw className="h-4 w-4" />
                Updated {new Date(post.updated).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
            <span className="flex items-center gap-1 text-neutral-500 dark:text-white/50">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>

          {/* Excerpt */}
          <p className="mt-6 text-xl text-neutral-600 dark:text-white/60">{post.excerpt}</p>

          {/* Author */}
          <div className="mt-8 flex items-center justify-between border-t pt-8 border-neutral-200 dark:border-white/10">
            {authorData ? (
              <Link href={`/blog/author/${authorData.slug}`} className="flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <span className="text-white font-bold">
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {post.author.name}
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-white/50">{post.author.role}</div>
                </div>
              </Link>
            ) : (
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
                  <div className="text-sm text-neutral-500 dark:text-white/50">{post.author.role}</div>
                </div>
              </div>
            )}

            {/* Share */}
            <div className="flex items-center gap-2">
              <span className="text-sm mr-2 text-neutral-500 dark:text-white/50">Share:</span>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10"
                aria-label="Share on Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-12">
          {/* Table of Contents (mobile) */}
          <TableOfContentsInline content={post.content} />

          <div className="prose max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:no-underline hover:prose-a:underline prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-neutral prose-p:text-neutral-700 prose-li:text-neutral-700 prose-td:text-neutral-700 prose-th:text-neutral-700 prose-a:text-emerald-600 prose-strong:text-neutral-900 prose-code:text-emerald-700 prose-code:bg-emerald-50 prose-pre:bg-neutral-50 prose-pre:border prose-pre:border-neutral-200 prose-blockquote:text-neutral-600 prose-blockquote:border-emerald-500 dark:prose-invert dark:prose-p:text-white/80 dark:prose-li:text-white/80 dark:prose-td:text-white/80 dark:prose-th:text-white/80 dark:prose-a:text-emerald-400 dark:prose-strong:text-white dark:prose-code:text-emerald-300 dark:prose-code:bg-white/10 dark:prose-pre:bg-white/5 dark:prose-pre:border-white/10 dark:prose-blockquote:text-white/60">
            <MDXContent content={post.content} />
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-12 pt-8 border-t border-neutral-200 dark:border-white/10">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-4 w-4 text-neutral-500 dark:text-white/50" />
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-full px-3 py-1 text-sm transition-colors bg-neutral-100 text-neutral-600 hover:bg-emerald-100 hover:text-emerald-700 dark:bg-white/5 dark:text-white/60 dark:hover:bg-emerald-500/20 dark:hover:text-emerald-400"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t py-24 border-neutral-200 dark:border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-12">Related Articles</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group">
                  <article>
                    <div className="aspect-video rounded-xl overflow-hidden mb-4 relative bg-neutral-100 dark:bg-white/5">
                      <Image
                        src={`/blog/${relatedPost.slug}/opengraph-image`}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-lg font-bold transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-2 text-sm line-clamp-2 text-neutral-600 dark:text-white/60">{relatedPost.excerpt}</p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t py-24 border-neutral-200 bg-neutral-50 dark:border-white/10 dark:bg-transparent">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to dominate AI search?</h2>
          <p className="mt-4 text-neutral-600 dark:text-white/60">
            Get a free audit of your brand&apos;s AI visibility and a roadmap for capturing this emerging channel.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg px-8 py-4 font-medium transition-colors bg-emerald-500 text-white hover:bg-emerald-600 dark:text-black dark:hover:bg-emerald-400"
            >
              Get Your Free Audit
            </Link>
          </div>
        </div>
      </section>
    </ThemedLayout>
  );
}
