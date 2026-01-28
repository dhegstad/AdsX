"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import { cn } from "@/lib/utils";
import type { BlogPostMeta } from "@/lib/blog";

const categoryIcons: Record<string, string> = {
  Guide: "📚",
  Strategy: "🎯",
  Research: "🔬",
  "How-To": "🛠️",
  "Case Studies": "📊",
  Analysis: "🔍",
  Resource: "📋",
};

interface BlogListingContentProps {
  posts: BlogPostMeta[];
}

export function BlogListingContent({ posts }: BlogListingContentProps) {
  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const otherPosts = posts.filter((post) => post.slug !== featuredPost?.slug);

  return (
    <ThemedLayout>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              AI Search <span className="gradient-text">Insights</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-white/60">
              Expert guides on AI search advertising, ChatGPT optimization, and strategies for getting your brand recommended by AI.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="border-t py-16 border-neutral-200 dark:border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-8">
              <span className="text-sm font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Featured</span>
            </div>
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <article className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="aspect-video rounded-2xl overflow-hidden relative bg-neutral-100 dark:bg-white/5">
                  <Image
                    src={`/blog/${featuredPost.slug}/opengraph-image`}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <span>{categoryIcons[featuredPost.category] || "📝"}</span>
                      {featuredPost.category}
                    </span>
                    <span className="text-neutral-300 dark:text-white/30">&middot;</span>
                    <time className="text-neutral-500 dark:text-white/50">
                      {new Date(featuredPost.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <span className="text-neutral-300 dark:text-white/30">&middot;</span>
                    <span className="flex items-center gap-1 text-neutral-500 dark:text-white/50">
                      <Clock className="h-3 w-3" />
                      {featuredPost.readingTime}
                    </span>
                  </div>
                  <h2 className="mt-4 text-3xl font-bold transition-colors lg:text-4xl group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 text-lg text-neutral-600 dark:text-white/60">{featuredPost.excerpt}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {featuredPost.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{featuredPost.author.name}</div>
                      <div className="text-sm text-neutral-500 dark:text-white/50">{featuredPost.author.role}</div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="border-t py-24 border-neutral-200 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-12">All Articles</h2>

          {posts.length === 0 ? (
            <p className="text-neutral-600 dark:text-white/60">No posts yet. Check back soon!</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((post) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="aspect-video rounded-xl overflow-hidden mb-4 relative bg-neutral-100 dark:bg-white/5">
                      <Image
                        src={`/blog/${post.slug}/opengraph-image`}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                        <span>{categoryIcons[post.category] || "📝"}</span>
                        {post.category}
                      </span>
                      <span className="text-neutral-300 dark:text-white/30">&middot;</span>
                      <span className="flex items-center gap-1 text-neutral-500 dark:text-white/50">
                        <Clock className="h-3 w-3" />
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-neutral-600 dark:text-white/60">{post.excerpt}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                      Read article
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t py-24 border-neutral-200 bg-neutral-50 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Stay ahead of AI search</h2>
          <p className="mt-4 text-neutral-600 dark:text-white/60">
            Get weekly insights on AI advertising trends, platform updates, and optimization strategies.
          </p>
          <form className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border px-4 py-3 focus:outline-none focus:ring-1 border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:ring-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:border-emerald-500/50 dark:focus:ring-emerald-500/50"
            />
            <button
              type="submit"
              className="rounded-lg px-6 py-3 font-medium transition-colors bg-emerald-500 text-white hover:bg-emerald-600 dark:text-black dark:hover:bg-emerald-400"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </ThemedLayout>
  );
}
