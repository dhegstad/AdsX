import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { getAllTags, getPostsByTag, getTagBySlug, getPostsByTagCount } from "@/lib/blog";

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
  const postCount = getPostsByTagCount(tagSlug);

  if (!tag) {
    return { title: "Tag Not Found" };
  }

  const shouldIndex = postCount >= 2;

  return {
    title: `Articles Tagged "${tag}"`,
    description: `Browse all articles tagged with "${tag}" - insights on AI search advertising, ChatGPT optimization, and AI visibility.`,
    alternates: {
      canonical: `https://www.adsx.com/blog/tag/${tagSlug}`,
    },
    openGraph: {
      title: `${tag} | AdsX Blog`,
      description: `Browse all articles tagged with "${tag}".`,
      url: `https://www.adsx.com/blog/tag/${tagSlug}`,
    },
    robots: shouldIndex
      ? { index: true, follow: true }
      : { index: false, follow: true },
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
          <span className="text-[#10b981]">TAG: {tag.toUpperCase()}</span>
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
          {tag}
        </h1>
        <p className="mt-4 text-[#888]">
          {posts.length} article{posts.length !== 1 ? "s" : ""} with this tag
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
                  <span className="text-[#10b981]">{post.category}</span>
                  <span className="text-[#555]">&middot;</span>
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

      {/* Popular Tags */}
      <div className="border-b border-[#333]">
        <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
          <div
            className="text-xs tracking-widest text-[#888]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            POPULAR TAGS
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 20).map((t) => (
              <Link
                key={t.slug}
                href={`/blog/tag/${t.slug}`}
                className={`px-3 py-1 text-sm transition-colors ${
                  t.slug === tagSlug
                    ? "bg-[#10b981] text-black"
                    : "border border-[#333] text-[#888] hover:border-[#10b981] hover:text-[#10b981]"
                }`}
              >
                {t.tag} ({t.count})
              </Link>
            ))}
          </div>
        </div>
      </div>
    </BrutalistLayout>
  );
}
