"use client";

import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import type { BlogPostMeta } from "@/lib/blog";

interface Category {
  category: string;
  slug: string;
  count: number;
}

interface BrutalistBlogListingProps {
  posts: BlogPostMeta[];
  categories: Category[];
}

export function BrutalistBlogListing({ posts, categories }: BrutalistBlogListingProps) {
  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const otherPosts = posts.filter((p) => p.slug !== featuredPost?.slug);

  return (
    <BrutalistLayout>
      {/* Hero */}
      <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
        <div
          className="text-[10px] tracking-widest text-[#888] mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          SECTION: TRANSMISSIONS
        </div>
        <h1
          className="uppercase"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 6vw, 72px)",
            lineHeight: 0.9,
            letterSpacing: "-2px",
          }}
        >
          Intel &<br />insights
        </h1>
        <p className="mt-6 max-w-2xl text-[#888] text-lg">
          Strategic intelligence on AI search visibility, optimization tactics, and the future of brand discovery.
        </p>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-3 border-b border-[#333]">
        {[
          { label: "TOTAL TRANSMISSIONS", value: String(posts.length).padStart(2, "0") },
          { label: "CATEGORIES", value: String(categories.length).padStart(2, "0") },
          { label: "AVG READ TIME", value: "8M" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 md:p-6 border-r last:border-r-0 border-[#333] text-center"
          >
            <div
              className="text-2xl md:text-3xl text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {stat.value}
            </div>
            <div
              className="text-[8px] md:text-[9px] tracking-widest text-[#888] mt-1"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="border-b border-[#333] p-4 md:p-6 flex flex-wrap gap-3">
        <span
          className="text-[10px] tracking-widest text-[#888] mr-4 self-center"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          FILTER:
        </span>
        <Link
          href="/blog"
          className="px-3 py-1 border border-[#10b981] text-[#10b981] text-[10px] tracking-wider hover:bg-[#10b981] hover:text-black transition-colors"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          ALL
        </Link>
        {categories.slice(0, 5).map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog/category/${cat.slug}`}
            className="px-3 py-1 border border-[#333] text-[#888] text-[10px] tracking-wider hover:border-[#EAEAEA] hover:text-[#EAEAEA] transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {cat.category.toUpperCase()}
          </Link>
        ))}
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="border-b border-[#333]">
          <div className="p-4 border-b border-[#333]">
            <span
              className="text-[10px] tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              FEATURED TRANSMISSION
            </span>
          </div>
          <Link href={`/blog/${featuredPost.slug}`} className="block group">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#333] bg-[#111] group-hover:bg-[#1a1a1a] transition-colors">
                <div
                  className="text-[10px] tracking-widest text-[#888] mb-4"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {new Date(featuredPost.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).toUpperCase().replace(",", "")}
                  {" // "}
                  {featuredPost.readingTime.toUpperCase()}
                </div>
                <h2
                  className="text-2xl md:text-3xl uppercase mb-4 group-hover:text-[#10b981] transition-colors"
                  style={{ fontFamily: "var(--font-display)", lineHeight: 1.1 }}
                >
                  {featuredPost.title}
                </h2>
                <p className="text-[#888] mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-[#10b981] flex items-center justify-center">
                    <span
                      className="text-[#10b981] text-[10px]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {featuredPost.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm">{featuredPost.author.name}</div>
                    <div
                      className="text-[9px] text-[#888]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {featuredPost.author.role.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div
                  className="text-[10px] tracking-widest text-[#888] mb-4"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  CATEGORY
                </div>
                <div
                  className="text-xl uppercase mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {featuredPost.category}
                </div>
                {featuredPost.tags && featuredPost.tags.length > 0 && (
                  <>
                    <div
                      className="text-[10px] tracking-widest text-[#888] mb-3"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      TAGS
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {featuredPost.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 border border-[#333] text-[9px] text-[#888]"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {tag.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </>
                )}
                <div className="mt-8">
                  <span className="cta-btn group-hover:bg-[#10b981] group-hover:text-black group-hover:border-[#10b981]">
                    READ TRANSMISSION →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Post Grid */}
      <div className="border-b border-[#333]">
        <div className="p-4 border-b border-[#333]">
          <span
            className="text-[10px] tracking-widest text-[#888]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ALL TRANSMISSIONS
          </span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map((post, idx) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card border-r border-b border-[#333] p-6 flex flex-col group hover:bg-[#EAEAEA] transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <span
                  className="text-[11px] text-[#888] group-hover:text-[#333]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-[9px] text-[#888] group-hover:text-[#333]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                  }).toUpperCase()}
                </span>
              </div>
              <div
                className="px-2 py-1 border border-[#333] group-hover:border-[#333] text-[9px] text-[#888] group-hover:text-[#333] w-fit mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {post.category.toUpperCase()}
              </div>
              <h3
                className="text-lg uppercase mb-3 group-hover:text-[#080808] transition-colors"
                style={{ fontFamily: "var(--font-display)", lineHeight: 1.2 }}
              >
                {post.title}
              </h3>
              <p className="text-sm text-[#888] group-hover:text-[#555] mb-4 flex-grow line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-[#333] group-hover:border-[#ccc]">
                <span
                  className="text-[9px] text-[#888] group-hover:text-[#555]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {post.readingTime.toUpperCase()}
                </span>
                <span
                  className="text-[9px] text-[#10b981] group-hover:text-[#080808]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  READ →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 md:p-16 text-center">
        <h2
          className="text-2xl md:text-3xl uppercase mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Stay Informed
        </h2>
        <p className="text-[#888] mb-8 max-w-lg mx-auto">
          Get the latest AI search intelligence delivered to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="v1-input flex-grow"
          />
          <button className="cta-btn cta-btn-primary whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </BrutalistLayout>
  );
}
