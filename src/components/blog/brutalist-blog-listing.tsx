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
  currentPage?: number;
  totalPages?: number;
  totalPosts?: number;
}

export function BrutalistBlogListing({ posts, categories, currentPage, totalPages, totalPosts }: BrutalistBlogListingProps) {
  const isPaginated = currentPage !== undefined && totalPages !== undefined;
  const showFeatured = !isPaginated || currentPage === 1;
  const featuredPost = showFeatured ? (posts.find((p) => p.featured) || posts[0]) : null;
  const otherPosts = featuredPost ? posts.filter((p) => p.slug !== featuredPost.slug) : posts;
  const displayTotal = totalPosts ?? posts.length;

  return (
    <BrutalistLayout>
      {/* Hero */}
      <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
        <div
          className="text-xs tracking-widest text-[#888] mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          SECTION: BLOG
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
          AI Search<br />Optimization Blog
        </h1>
        <p className="mt-6 max-w-2xl text-[#888] text-lg">
          Strategic intelligence on AI search visibility, optimization tactics, and the future of brand discovery.
        </p>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-3 border-b border-[#333]">
        {[
          { label: "TOTAL POSTS", value: String(displayTotal).padStart(2, "0") },
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
              className="text-[10px] md:text-xs tracking-widest text-[#888] mt-1"
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
          className="text-xs tracking-widest text-[#888] mr-4 self-center"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          FILTER:
        </span>
        <Link
          href="/blog"
          className="px-3 py-1 border border-[#10b981] text-[#10b981] text-xs tracking-wider hover:bg-[#10b981] hover:text-black transition-colors"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          ALL
        </Link>
        {categories.slice(0, 5).map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog/category/${cat.slug}`}
            className="px-3 py-1 border border-[#333] text-[#888] text-xs tracking-wider hover:border-[#EAEAEA] hover:text-[#EAEAEA] transition-colors"
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
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              FEATURED POST
            </span>
          </div>
          <Link href={`/blog/${featuredPost.slug}`} className="block group">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#333] bg-[#111] group-hover:bg-[#1a1a1a] transition-colors">
                <div
                  className="text-xs tracking-widest text-[#888] mb-4"
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
                <p className="text-[#888] mb-6 text-base">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-[#10b981] flex items-center justify-center">
                    <span
                      className="text-[#10b981] text-xs"
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
                      className="text-xs text-[#888]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {featuredPost.author.role.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div
                  className="text-xs tracking-widest text-[#888] mb-4"
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
                      className="text-xs tracking-widest text-[#888] mb-3"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      TAGS
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {featuredPost.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 border border-[#333] text-xs text-[#888]"
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
                    READ POST →
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
            className="text-xs tracking-widest text-[#888]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {isPaginated && currentPage! > 1 ? `POSTS — PAGE ${currentPage}` : "ALL POSTS"}
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
                  className="text-xs text-[#888] group-hover:text-[#333]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-xs text-[#888] group-hover:text-[#333]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                  }).toUpperCase()}
                </span>
              </div>
              <div
                className="px-2 py-1 border border-[#333] group-hover:border-[#333] text-xs text-[#888] group-hover:text-[#333] w-fit mb-4"
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
              <p className="text-base text-[#888] group-hover:text-[#555] mb-4 flex-grow line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-[#333] group-hover:border-[#ccc]">
                <span
                  className="text-xs text-[#888] group-hover:text-[#555]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {post.readingTime.toUpperCase()}
                </span>
                <span
                  className="text-xs text-[#10b981] group-hover:text-[#080808]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  READ →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {isPaginated && totalPages! > 1 && (
        <div className="border-b border-[#333] p-6 md:p-8">
          <nav aria-label="Blog pagination" className="flex flex-wrap items-center justify-center gap-2">
            {currentPage! > 1 && (
              <Link
                href={currentPage === 2 ? "/blog" : `/blog/page/${currentPage! - 1}`}
                className="px-4 py-2 border border-[#333] text-[#888] text-xs tracking-wider uppercase hover:border-[#10b981] hover:text-[#10b981] transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                ← PREV
              </Link>
            )}
            {(() => {
              const pages: (number | string)[] = [];
              const total = totalPages!;
              const current = currentPage!;
              if (total <= 7) {
                for (let i = 1; i <= total; i++) pages.push(i);
              } else {
                pages.push(1);
                if (current > 3) pages.push("...");
                const start = Math.max(2, current - 1);
                const end = Math.min(total - 1, current + 1);
                for (let i = start; i <= end; i++) pages.push(i);
                if (current < total - 2) pages.push("...");
                pages.push(total);
              }
              return pages.map((p, idx) =>
                typeof p === "string" ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 py-2 text-[#888] text-xs"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    ...
                  </span>
                ) : (
                  <Link
                    key={p}
                    href={p === 1 ? "/blog" : `/blog/page/${p}`}
                    className={`px-3 py-2 border text-xs tracking-wider uppercase transition-colors ${
                      p === current
                        ? "border-[#10b981] text-[#10b981] bg-[#10b981]/10"
                        : "border-[#333] text-[#888] hover:border-[#10b981] hover:text-[#10b981]"
                    }`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {String(p).padStart(2, "0")}
                  </Link>
                )
              );
            })()}
            {currentPage! < totalPages! && (
              <Link
                href={`/blog/page/${currentPage! + 1}`}
                className="px-4 py-2 border border-[#333] text-[#888] text-xs tracking-wider uppercase hover:border-[#10b981] hover:text-[#10b981] transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                NEXT →
              </Link>
            )}
          </nav>
          <div className="text-center mt-4">
            <span
              className="text-xs tracking-widest text-[#888]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              PAGE {currentPage} OF {totalPages}
            </span>
          </div>
        </div>
      )}

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
