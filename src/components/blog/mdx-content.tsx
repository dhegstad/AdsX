"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
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
            <h2 id={id} {...props}>
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
            <h3 id={id} {...props}>
              {children}
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
        // Custom blockquote styling
        blockquote: ({ children, ...props }) => (
          <blockquote
            className="border-l-4 border-emerald-500 pl-4 italic text-white/70"
            {...props}
          >
            {children}
          </blockquote>
        ),
        // Custom table styling
        table: ({ children, ...props }) => (
          <div className="overflow-x-auto">
            <table className="w-full" {...props}>
              {children}
            </table>
          </div>
        ),
        th: ({ children, ...props }) => (
          <th className="border border-white/10 bg-white/5 px-4 py-2 text-left" {...props}>
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td className="border border-white/10 px-4 py-2" {...props}>
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
