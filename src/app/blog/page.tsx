import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | AI Search Advertising Insights",
  description: "Expert insights on AI search advertising, ChatGPT ads, content optimization for LLMs, and strategies for capturing visibility in AI-powered search.",
  openGraph: {
    title: "Blog | AdsX - AI Search Advertising Insights",
    description: "Expert insights on AI search advertising, ChatGPT ads, and strategies for AI visibility.",
    type: "website",
  },
  alternates: {
    canonical: "https://adsx.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const otherPosts = posts.filter((post) => post.slug !== featuredPost?.slug);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              AI Search <span className="gradient-text">Insights</span>
            </h1>
            <p className="mt-6 text-lg text-white/60 sm:text-xl">
              Expert guides on AI search advertising, ChatGPT optimization, and strategies for getting your brand recommended by AI.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="border-t border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-8">
              <span className="text-sm font-medium text-emerald-400 uppercase tracking-wider">Featured</span>
            </div>
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <article className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                {featuredPost.image && (
                  <div className="aspect-video rounded-2xl bg-white/5 overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center">
                      <span className="text-6xl opacity-50">📊</span>
                    </div>
                  </div>
                )}
                <div className={featuredPost.image ? "" : "lg:col-span-2"}>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-emerald-400">{featuredPost.category}</span>
                    <span className="text-white/30">&middot;</span>
                    <time className="text-white/50">
                      {new Date(featuredPost.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <span className="text-white/30">&middot;</span>
                    <span className="flex items-center gap-1 text-white/50">
                      <Clock className="h-3 w-3" />
                      {featuredPost.readingTime}
                    </span>
                  </div>
                  <h2 className="mt-4 text-3xl font-bold group-hover:text-emerald-400 transition-colors lg:text-4xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 text-lg text-white/60">{featuredPost.excerpt}</p>
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
                      <div className="text-sm text-white/50">{featuredPost.author.role}</div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-12">All Articles</h2>

          {posts.length === 0 ? (
            <p className="text-white/60">No posts yet. Check back soon!</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((post) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="aspect-video rounded-xl bg-white/5 overflow-hidden mb-4">
                      <div className="h-full w-full bg-gradient-to-br from-emerald-500/10 to-transparent flex items-center justify-center group-hover:from-emerald-500/20 transition-colors">
                        <span className="text-4xl opacity-30">📝</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-emerald-400">{post.category}</span>
                      <span className="text-white/30">&middot;</span>
                      <span className="flex items-center gap-1 text-white/50">
                        <Clock className="h-3 w-3" />
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-white/60 line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-emerald-400 text-sm">
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
      <section className="border-t border-white/10 py-24 bg-white/[0.02]">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Stay ahead of AI search</h2>
          <p className="mt-4 text-white/60">
            Get weekly insights on AI advertising trends, platform updates, and optimization strategies.
          </p>
          <form className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
            />
            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-6 py-3 font-medium text-black hover:bg-emerald-400 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
