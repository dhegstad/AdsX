import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import {
  getAllCategories,
  getPostsByCategory,
  getCategoryBySlug,
} from "@/lib/blog";

interface PageProps {
  params: Promise<{ category: string }>;
}

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
    <BrutalistLayout>
      {/* Header */}
      <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
        <div
          className="text-xs tracking-widest text-[#888] mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-[#EAEAEA]">BLOG</Link>
          <span className="mx-2">/</span>
          <span className="text-[#10b981]">{category.toUpperCase()}</span>
        </div>
        <h1
          className="uppercase"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 5vw, 60px)",
            lineHeight: 0.95,
            letterSpacing: "-1px",
          }}
        >
          {category}
        </h1>
        <p className="mt-4 text-[#888]">
          {posts.length} article{posts.length !== 1 ? "s" : ""} in this category
        </p>
      </div>

      {/* Posts Grid */}
      <div className="border-b border-[#333]">
        <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
          <div
            className="text-xs tracking-widest text-[#10b981]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ARTICLES
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, idx) => (
            <article
              key={post.slug}
              className={`group p-6 ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b`}
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="aspect-video overflow-hidden mb-4 relative bg-[#111]">
                  <Image
                    src={`/blog/${post.slug}/opengraph-image`}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-[#888]">{post.readingTime}</span>
                </div>
                <h2 className="mt-3 text-xl font-bold transition-colors group-hover:text-[#10b981]">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-[#888]">
                  {post.excerpt}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-[#10b981]">
                  Read article
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Other Categories */}
      <div className="border-b border-[#333]">
        <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
          <div
            className="text-xs tracking-widest text-[#888]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            BROWSE OTHER CATEGORIES
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-3">
            {allCategories
              .filter((c) => c.slug !== categorySlug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/blog/category/${c.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-[#333] text-[#888] hover:border-[#10b981] hover:text-[#10b981] transition-colors"
                >
                  {c.category}
                  <span className="text-[#555]">({c.count})</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </BrutalistLayout>
  );
}
