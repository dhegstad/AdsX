"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function extractHeadings(content: string): TOCItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    headings.push({ id, text, level });
  }

  return headings;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const headings = extractHeadings(content);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length < 3) {
    return null;
  }

  return (
    <nav className="rounded-xl border p-6 border-neutral-200 bg-neutral-50 dark:border-white/10 dark:bg-white/[0.02]">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-white/50 mb-4">
        Table of Contents
      </h2>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: heading.level === 3 ? "1rem" : 0 }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                  setActiveId(heading.id);
                }
              }}
              className={cn(
                "block py-1 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400",
                activeId === heading.id
                  ? "text-emerald-600 dark:text-emerald-400 font-medium"
                  : "text-neutral-600 dark:text-white/60"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Inline version for mobile
export function TableOfContentsInline({ content }: TableOfContentsProps) {
  const headings = extractHeadings(content);

  if (headings.length < 3) {
    return null;
  }

  return (
    <details className="rounded-xl border p-4 mb-8 border-neutral-200 bg-neutral-50 dark:border-white/10 dark:bg-white/[0.02] lg:hidden">
      <summary className="cursor-pointer text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-white/50">
        Table of Contents
      </summary>
      <ul className="mt-4 space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: heading.level === 3 ? "1rem" : 0 }}
          >
            <a
              href={`#${heading.id}`}
              className="block py-1 text-neutral-600 dark:text-white/60 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
