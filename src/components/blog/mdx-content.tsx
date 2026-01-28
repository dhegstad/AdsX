"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

interface MDXContentProps {
  content: string;
}

// YouTube embed component
function YouTubeEmbed({ videoId, title }: { videoId: string; title?: string }) {
  return (
    <div className="my-8 aspect-video rounded-xl overflow-hidden bg-white/5">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || "YouTube video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}

// Info callout component
function Callout({ type = "info", children }: { type?: "info" | "warning" | "tip"; children: React.ReactNode }) {
  const styles = {
    info: "bg-blue-500/10 border-blue-500/30 text-blue-300",
    warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
    tip: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
  };

  const icons = {
    info: "ℹ️",
    warning: "⚠️",
    tip: "💡",
  };

  return (
    <div className={`my-6 p-4 rounded-lg border ${styles[type]}`}>
      <span className="mr-2">{icons[type]}</span>
      {children}
    </div>
  );
}

export function MDXContent({ content }: MDXContentProps) {
  // Process content to handle custom embeds
  const processedContent = content
    // Convert YouTube links to embed syntax
    .replace(
      /\[youtube:\s*([a-zA-Z0-9_-]+)\s*(?:\|\s*([^\]]+))?\]/g,
      '::youtube{#$1 title="$2"}'
    );

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Custom heading anchors for SEO
        h2: ({ children, ...props }) => {
          const id = children
            ?.toString()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
          return (
            <h2 id={id} className="scroll-mt-24" {...props}>
              <a href={`#${id}`} className="no-underline hover:underline">
                {children}
              </a>
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
            <h3 id={id} className="scroll-mt-24" {...props}>
              <a href={`#${id}`} className="no-underline hover:underline">
                {children}
              </a>
            </h3>
          );
        },
        // External links open in new tab
        a: ({ href, children, ...props }) => {
          const isExternal = href?.startsWith("http");
          return (
            <a
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              {...props}
            >
              {children}
            </a>
          );
        },
        // Enhanced image handling
        img: ({ src, alt, ...props }) => {
          if (!src) return null;

          // Check if it's a YouTube thumbnail request
          if (src.includes("youtube.com") || src.includes("youtu.be")) {
            const videoId = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)?.[1];
            if (videoId) {
              return <YouTubeEmbed videoId={videoId} title={alt} />;
            }
          }

          // Check for Unsplash or other external images
          if (src.startsWith("http")) {
            return (
              <figure className="my-8">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt || ""}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {alt && (
                  <figcaption className="mt-3 text-center text-sm text-white/50">
                    {alt}
                  </figcaption>
                )}
              </figure>
            );
          }

          // Local images
          return (
            <figure className="my-8">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5">
                <Image
                  src={src}
                  alt={alt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              {alt && (
                <figcaption className="mt-3 text-center text-sm text-white/50">
                  {alt}
                </figcaption>
              )}
            </figure>
          );
        },
        // Custom blockquote styling
        blockquote: ({ children, ...props }) => (
          <blockquote
            className="my-6 border-l-4 border-emerald-500 pl-6 italic text-white/70"
            {...props}
          >
            {children}
          </blockquote>
        ),
        // Custom table styling
        table: ({ children, ...props }) => (
          <div className="my-8 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full" {...props}>
              {children}
            </table>
          </div>
        ),
        thead: ({ children, ...props }) => (
          <thead className="bg-white/5" {...props}>
            {children}
          </thead>
        ),
        th: ({ children, ...props }) => (
          <th className="border-b border-white/10 px-4 py-3 text-left font-semibold" {...props}>
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td className="border-b border-white/5 px-4 py-3" {...props}>
            {children}
          </td>
        ),
        // Code blocks
        pre: ({ children, ...props }) => (
          <pre
            className="my-6 overflow-x-auto rounded-xl bg-white/5 p-4 text-sm"
            {...props}
          >
            {children}
          </pre>
        ),
        code: ({ children, className, ...props }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code
                className="rounded bg-white/10 px-1.5 py-0.5 text-emerald-300 text-sm"
                {...props}
              >
                {children}
              </code>
            );
          }
          return <code {...props}>{children}</code>;
        },
        // Lists
        ul: ({ children, ...props }) => (
          <ul className="my-4 space-y-2 list-disc list-inside" {...props}>
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol className="my-4 space-y-2 list-decimal list-inside" {...props}>
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li className="text-white/80" {...props}>
            {children}
          </li>
        ),
        // Horizontal rule
        hr: () => <hr className="my-12 border-white/10" />,
        // Paragraphs
        p: ({ children, node, ...props }) => {
          // Check if this paragraph contains only an image (to avoid wrapping)
          const hasOnlyImage =
            node?.children?.length === 1 &&
            node?.children?.[0]?.type === 'element' &&
            (node?.children?.[0] as any)?.tagName === 'img';

          if (hasOnlyImage) {
            return <>{children}</>;
          }

          return <p className="my-4 leading-relaxed" {...props}>{children}</p>;
        },
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
}
