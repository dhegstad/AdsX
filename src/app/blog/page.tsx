import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on AI search advertising, emerging platforms, and strategies for capturing visibility in the new search landscape.",
};

const posts = [
  {
    slug: "chatgpt-ads-what-brands-need-to-know",
    title: "ChatGPT Ads Are Here: What Brands Need to Know",
    excerpt: "OpenAI just announced advertising in ChatGPT. Here's what it means for your brand and how to prepare.",
    date: "2025-01-20",
    category: "News",
  },
  {
    slug: "what-is-ai-search-advertising",
    title: "What is AI Search Advertising?",
    excerpt: "A comprehensive guide to advertising in ChatGPT, Perplexity, Claude, and other AI-powered search platforms.",
    date: "2025-01-15",
    category: "Guide",
  },
  {
    slug: "optimizing-content-for-llms",
    title: "How to Optimize Content for Large Language Models",
    excerpt: "Practical strategies for structuring your content to be surfaced by AI assistants and chatbots.",
    date: "2025-01-10",
    category: "Strategy",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Insights & <span className="gradient-text">Updates</span>
            </h1>
            <p className="mt-6 text-lg text-white/60 sm:text-xl">
              The latest on AI search advertising, platform updates, and strategies for capturing visibility.
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-12">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group border-b border-white/10 pb-12 last:border-0"
              >
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-emerald-400">{post.category}</span>
                  <span className="text-white/30">&middot;</span>
                  <time className="text-white/50">{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
                </div>
                <h2 className="mt-4 text-2xl font-bold">
                  <Link href={`/blog/${post.slug}`} className="hover:text-emerald-400 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-white/60">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  Read more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
