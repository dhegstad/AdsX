import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import {
  getAllCategories,
  getPostsByCategory,
  getCategoryBySlug,
} from "@/lib/blog";

interface PageProps {
  params: Promise<{ category: string }>;
}

const categoryIcons: Record<string, string> = {
  Guide: "📚",
  Strategy: "🎯",
  Research: "🔬",
  "How-To": "🛠️",
  "Case Studies": "📊",
  Analysis: "🔍",
  Resource: "📋",
};

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category} Articles`,
    description: `Browse all ${category.toLowerCase()} articles about AI search advertising, ChatGPT ads, and AI visibility optimization.`,
    alternates: {
      canonical: `https://www.adsx.com/blog/category/${categorySlug}`,
    },
    openGraph: {
      title: `${category} | AdsX Blog`,
      description: `Browse all ${category.toLowerCase()} articles about AI search advertising.`,
      url: `https://www.adsx.com/blog/category/${categorySlug}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(categorySlug);
  const allCategories = getAllCategories();

  return (
    <ThemedLayout>
      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm transition-colors text-neutral-600 hover:text-emerald-600 dark:text-white/60 dark:hover:text-emerald-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{categoryIcons[category] || "📝"}</span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {category}
            </h1>
          </div>
          <p className="text-lg text-neutral-600 dark:text-white/60">
            {posts.length} article{posts.length !== 1 ? "s" : ""} in this category
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="border-t py-16 border-neutral-200 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
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
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex items-center gap-1 text-neutral-500 dark:text-white/50">
                      <Clock className="h-3 w-3" />
                      {post.readingTime}
                    </span>
                  </div>
                  <h2 className="mt-3 text-xl font-bold transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-neutral-600 dark:text-white/60">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                    Read article
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Other Categories */}
      <section className="border-t py-16 border-neutral-200 bg-neutral-50 dark:border-white/10 dark:bg-transparent">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Browse Other Categories</h2>
          <div className="flex flex-wrap gap-3">
            {allCategories
              .filter((c) => c.slug !== categorySlug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/blog/category/${c.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors border-neutral-200 hover:border-emerald-500 hover:bg-emerald-50 dark:border-white/10 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-500/10"
                >
                  <span>{categoryIcons[c.category] || "📝"}</span>
                  {c.category}
                  <span className="text-neutral-400 dark:text-white/40">
                    ({c.count})
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </ThemedLayout>
  );
}
