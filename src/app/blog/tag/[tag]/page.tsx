import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import { getAllTags, getPostsByTag, getTagBySlug } from "@/lib/blog";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = getTagBySlug(tagSlug);

  if (!tag) {
    return { title: "Tag Not Found" };
  }

  return {
    title: `Articles Tagged "${tag}"`,
    description: `Browse all articles tagged with "${tag}" - insights on AI search advertising, ChatGPT optimization, and AI visibility.`,
    alternates: {
      canonical: `https://adsx.com/blog/tag/${tagSlug}`,
    },
    openGraph: {
      title: `${tag} | AdsX Blog`,
      description: `Browse all articles tagged with "${tag}".`,
      url: `https://adsx.com/blog/tag/${tagSlug}`,
    },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag: tagSlug } = await params;
  const tag = getTagBySlug(tagSlug);

  if (!tag) {
    notFound();
  }

  const posts = getPostsByTag(tagSlug);
  const allTags = getAllTags();

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
            <Tag className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {tag}
            </h1>
          </div>
          <p className="text-lg text-neutral-600 dark:text-white/60">
            {posts.length} article{posts.length !== 1 ? "s" : ""} with this tag
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
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {post.category}
                    </span>
                    <span className="text-neutral-300 dark:text-white/30">
                      &middot;
                    </span>
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

      {/* Popular Tags */}
      <section className="border-t py-16 border-neutral-200 bg-neutral-50 dark:border-white/10 dark:bg-transparent">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Popular Tags</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 20).map((t) => (
              <Link
                key={t.slug}
                href={`/blog/tag/${t.slug}`}
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  t.slug === tagSlug
                    ? "bg-emerald-500 text-white dark:text-black"
                    : "bg-neutral-100 text-neutral-600 hover:bg-emerald-100 hover:text-emerald-700 dark:bg-white/5 dark:text-white/60 dark:hover:bg-emerald-500/20 dark:hover:text-emerald-400"
                }`}
              >
                {t.tag} ({t.count})
              </Link>
            ))}
          </div>
        </div>
      </section>
    </ThemedLayout>
  );
}
