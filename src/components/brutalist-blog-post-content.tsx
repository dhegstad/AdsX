"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { BrutalistLayout } from "@/components/brutalist-layout";
import type { BlogPost, BlogPostMeta } from "@/lib/blog";

interface BrutalistBlogPostContentProps {
  post: BlogPost;
  slug: string;
  relatedPosts: BlogPostMeta[];
}

export function BrutalistBlogPostContent({ post, slug, relatedPosts }: BrutalistBlogPostContentProps) {
  return (
    <BrutalistLayout>
      {/* Breadcrumb */}
      <div className="border-b border-[#333] p-4 flex items-center gap-2">
        <Link
          href="/blog"
          className="text-xs tracking-widest text-[#888] hover:text-[#EAEAEA] transition-colors"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          TRANSMISSIONS
        </Link>
        <span className="text-[#333]">/</span>
        <span
          className="text-xs tracking-widest text-[#10b981]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {post.category.toUpperCase()}
        </span>
      </div>

      {/* Article Header */}
      <div className="border-b border-[#333]">
        <div className="grid lg:grid-cols-3">
          {/* Main Title Area */}
          <div className="lg:col-span-2 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888] mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).toUpperCase()}
              {post.updated && (
                <span className="text-[#10b981]">
                  {" // UPDATED "}
                  {new Date(post.updated).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).toUpperCase()}
                </span>
              )}
            </div>
            <h1
              className="uppercase mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 5vw, 56px)",
                lineHeight: 1,
                letterSpacing: "-1px",
              }}
            >
              {post.title}
            </h1>
            <p className="text-lg text-[#888] max-w-2xl">{post.excerpt}</p>
          </div>

          {/* Meta Sidebar */}
          <div className="p-8 md:p-12 bg-[#111] flex flex-col justify-between">
            {/* Author */}
            <div className="mb-8">
              <div
                className="text-xs tracking-widest text-[#10b981] mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                AUTHOR
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-[#10b981] flex items-center justify-center">
                  <span
                    className="text-[#10b981] text-sm"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">{post.author.name}</div>
                  <div
                    className="text-xs text-[#888]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {post.author.role.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* Reading Time */}
            <div className="mb-8">
              <div
                className="text-xs tracking-widest text-[#888] mb-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                READ TIME
              </div>
              <div
                className="text-2xl text-[#10b981]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {post.readingTime.replace(" read", "").toUpperCase()}
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div>
                <div
                  className="text-xs tracking-widest text-[#888] mb-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  TAGS
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 border border-[#333] text-xs text-[#888]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="border-b border-[#333]">
        <div className="grid lg:grid-cols-4">
          {/* Table of Contents Sidebar */}
          <div className="hidden lg:block p-8 border-r border-[#333] sticky top-0 self-start">
            <div
              className="text-xs tracking-widest text-[#10b981] mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              CONTENTS
            </div>
            <nav className="space-y-2">
              <div
                className="text-xs text-[#888] hover:text-[#EAEAEA] transition-colors cursor-pointer"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                → INTRODUCTION
              </div>
              <div
                className="text-xs text-[#888] hover:text-[#EAEAEA] transition-colors cursor-pointer"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                → KEY INSIGHTS
              </div>
              <div
                className="text-xs text-[#888] hover:text-[#EAEAEA] transition-colors cursor-pointer"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                → CONCLUSION
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 p-8 md:p-12">
            <article className="v1-prose max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children, ...props }) => {
                    const id = children
                      ?.toString()
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, "");
                    return (
                      <h2
                        id={id}
                        className="scroll-mt-24 uppercase mt-12 mb-6 text-2xl tracking-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                        {...props}
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children, ...props }) => {
                    const id = children
                      ?.toString()
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, "");
                    return (
                      <h3
                        id={id}
                        className="scroll-mt-24 uppercase mt-8 mb-4 text-xl"
                        style={{ fontFamily: "var(--font-display)" }}
                        {...props}
                      >
                        {children}
                      </h3>
                    );
                  },
                  a: ({ href, children, ...props }) => {
                    const isExternal = href?.startsWith("http");
                    return (
                      <a
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="text-[#10b981] underline underline-offset-4 hover:text-[#EAEAEA] transition-colors"
                        {...props}
                      >
                        {children}
                      </a>
                    );
                  },
                  p: ({ children, ...props }) => (
                    <p className="mb-6 text-[#ccc] leading-relaxed text-base" style={{ fontFamily: "var(--font-body)" }} {...props}>
                      {children}
                    </p>
                  ),
                  strong: ({ children, ...props }) => (
                    <strong className="text-[#EAEAEA] font-bold" {...props}>
                      {children}
                    </strong>
                  ),
                  ul: ({ children, ...props }) => (
                    <ul className="mb-6 space-y-2 ml-4" {...props}>
                      {children}
                    </ul>
                  ),
                  ol: ({ children, ...props }) => (
                    <ol className="mb-6 space-y-2 ml-4 list-decimal list-inside" {...props}>
                      {children}
                    </ol>
                  ),
                  li: ({ children, ...props }) => (
                    <li className="text-[#ccc] text-base before:content-['+'] before:text-[#10b981] before:mr-2" {...props}>
                      {children}
                    </li>
                  ),
                  blockquote: ({ children, ...props }) => (
                    <blockquote
                      className="my-8 border-l-[3px] border-[#10b981] pl-6 italic text-[#888] text-base"
                      {...props}
                    >
                      {children}
                    </blockquote>
                  ),
                  code: ({ children, className, ...props }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code
                          className="bg-[#10b981]/10 text-[#10b981] px-1.5 py-0.5 text-sm"
                          style={{ fontFamily: "var(--font-mono)" }}
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code style={{ fontFamily: "var(--font-mono)" }} {...props}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children, ...props }) => (
                    <pre
                      className="my-8 bg-[#111] border border-[#333] p-6 overflow-x-auto"
                      {...props}
                    >
                      {children}
                    </pre>
                  ),
                  hr: () => <hr className="my-12 border-[#333]" />,
                  img: ({ src, alt }) => {
                    if (!src) return null;
                    if (src.startsWith("http")) {
                      return (
                        <figure className="my-8">
                          <div className="relative aspect-video border border-[#333] overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={alt || ""}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          {alt && (
                            <figcaption
                              className="mt-3 text-center text-xs text-[#888]"
                              style={{ fontFamily: "var(--font-mono)" }}
                            >
                              {alt.toUpperCase()}
                            </figcaption>
                          )}
                        </figure>
                      );
                    }
                    return (
                      <figure className="my-8">
                        <div className="relative aspect-video border border-[#333] overflow-hidden">
                          <Image
                            src={src}
                            alt={alt || ""}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 800px"
                          />
                        </div>
                        {alt && (
                          <figcaption
                            className="mt-3 text-center text-xs text-[#888]"
                            style={{ fontFamily: "var(--font-mono)" }}
                          >
                            {alt.toUpperCase()}
                          </figcaption>
                        )}
                      </figure>
                    );
                  },
                  table: ({ children, ...props }) => (
                    <div className="my-8 overflow-x-auto border border-[#333]">
                      <table className="w-full" {...props}>
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children, ...props }) => (
                    <thead className="bg-[#111]" {...props}>
                      {children}
                    </thead>
                  ),
                  th: ({ children, ...props }) => (
                    <th
                      className="border-b border-[#333] px-4 py-3 text-left text-xs tracking-wider text-[#10b981]"
                      style={{ fontFamily: "var(--font-mono)" }}
                      {...props}
                    >
                      {children}
                    </th>
                  ),
                  td: ({ children, ...props }) => (
                    <td className="border-b border-[#333] px-4 py-3 text-base text-[#888]" {...props}>
                      {children}
                    </td>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>
          </div>
        </div>
      </div>

      {/* Share / Actions Bar */}
      <div className="border-b border-[#333] p-6 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex gap-4">
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://adsx.com/blog/${slug}`)}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-[#333] text-xs tracking-wider text-[#888] hover:border-[#EAEAEA] hover:text-[#EAEAEA] transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            SHARE ON X
          </a>
          <button
            onClick={() => navigator.clipboard.writeText(`https://adsx.com/blog/${slug}`)}
            className="px-4 py-2 border border-[#333] text-xs tracking-wider text-[#888] hover:border-[#EAEAEA] hover:text-[#EAEAEA] transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            COPY LINK
          </button>
        </div>
        <Link
          href="/blog"
          className="text-xs tracking-wider text-[#10b981] hover:text-[#EAEAEA] transition-colors"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          ← BACK TO TRANSMISSIONS
        </Link>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="border-b border-[#333]">
          <div className="p-4 border-b border-[#333]">
            <span
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              RELATED TRANSMISSIONS
            </span>
          </div>
          <div className="grid md:grid-cols-3">
            {relatedPosts.map((relatedPost, idx) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="border-r border-b border-[#333] p-6 group hover:bg-[#111] transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <span
                    className="text-xs text-[#888]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-xs text-[#888]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {relatedPost.readingTime.toUpperCase()}
                  </span>
                </div>
                <h3
                  className="text-lg uppercase mb-3 group-hover:text-[#10b981] transition-colors"
                  style={{ fontFamily: "var(--font-display)", lineHeight: 1.2 }}
                >
                  {relatedPost.title}
                </h3>
                <p className="text-base text-[#888] line-clamp-2">{relatedPost.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="p-8 md:p-16 text-center">
        <h2
          className="text-2xl md:text-3xl uppercase mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ready to Dominate AI Search?
        </h2>
        <p className="text-[#888] mb-8 max-w-lg mx-auto">
          Get your free AI visibility audit and see how your brand appears across ChatGPT, Claude, and more.
        </p>
        <Link href="/contact" className="cta-btn cta-btn-primary">
          Get Your Free Audit
        </Link>
      </div>
    </BrutalistLayout>
  );
}
