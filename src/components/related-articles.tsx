import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";

interface RelatedArticlesProps {
  articles: BlogPostMeta[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <div className="border-b border-[#333]">
      <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
        <div
          className="text-xs tracking-widest text-[#10b981]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          RELATED ARTICLES
        </div>
      </div>
      <div className="grid md:grid-cols-3">
        {articles.map((article, idx) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className={`group p-6 ${idx < 2 ? "md:border-r" : ""} border-[#333] hover:bg-[#111] transition-colors`}
          >
            <div className="flex justify-between items-start mb-3">
              <span
                className="text-xs text-[#10b981]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {article.category.toUpperCase()}
              </span>
              <span
                className="text-xs text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {article.readingTime.toUpperCase()}
              </span>
            </div>
            <h3
              className="text-lg uppercase mb-2 group-hover:text-[#10b981] transition-colors"
              style={{ fontFamily: "var(--font-display)", lineHeight: 1.2 }}
            >
              {article.title}
            </h3>
            <p className="text-sm text-[#888] line-clamp-2">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
