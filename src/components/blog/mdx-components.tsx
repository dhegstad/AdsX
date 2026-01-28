"use client";

import { cn } from "@/lib/utils";

// Key Takeaways component - prominent summary box for LLM extraction
export function KeyTakeaways({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-xl border-2 p-6 border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">💡</span>
        <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300 m-0">
          Key Takeaways
        </h3>
      </div>
      <div className="text-emerald-900 dark:text-emerald-100 [&>ul]:my-0 [&>ul]:space-y-2 [&>ul>li]:text-emerald-800 dark:[&>ul>li]:text-emerald-200">
        {children}
      </div>
    </div>
  );
}

// Stat Block component - highlight key statistics for easy citation
interface StatBlockProps {
  stat: string;
  label: string;
  source?: string;
  sourceUrl?: string;
}

export function StatBlock({ stat, label, source, sourceUrl }: StatBlockProps) {
  return (
    <div className="my-6 rounded-xl border p-6 text-center border-neutral-200 bg-neutral-50 dark:border-white/10 dark:bg-white/5">
      <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
        {stat}
      </div>
      <div className="mt-2 text-neutral-700 dark:text-white/70">{label}</div>
      {source && (
        <div className="mt-3 text-sm text-neutral-500 dark:text-white/50">
          Source:{" "}
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              {source}
            </a>
          ) : (
            source
          )}
        </div>
      )}
    </div>
  );
}

// Multi-stat grid for comparing multiple statistics
interface StatGridProps {
  stats: Array<{
    stat: string;
    label: string;
  }>;
  source?: string;
}

export function StatGrid({ stats, source }: StatGridProps) {
  return (
    <div className="my-8">
      <div
        className={cn(
          "grid gap-4",
          stats.length === 2 && "grid-cols-2",
          stats.length === 3 && "grid-cols-3",
          stats.length >= 4 && "grid-cols-2 md:grid-cols-4"
        )}
      >
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border p-4 text-center border-neutral-200 bg-neutral-50 dark:border-white/10 dark:bg-white/5"
          >
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {item.stat}
            </div>
            <div className="mt-1 text-sm text-neutral-600 dark:text-white/60">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      {source && (
        <div className="mt-2 text-center text-sm text-neutral-500 dark:text-white/50">
          Source: {source}
        </div>
      )}
    </div>
  );
}

// Quotable callout - designed for LLMs to easily extract and cite
export function Quote({
  children,
  author,
  role,
}: {
  children: React.ReactNode;
  author?: string;
  role?: string;
}) {
  return (
    <blockquote className="my-8 border-l-4 border-emerald-500 pl-6 py-2 bg-emerald-50/50 dark:bg-emerald-500/5 rounded-r-xl">
      <p className="text-lg italic text-neutral-700 dark:text-white/80 m-0">
        {children}
      </p>
      {author && (
        <footer className="mt-3 text-sm text-neutral-600 dark:text-white/60">
          — <cite className="not-italic font-medium">{author}</cite>
          {role && <span className="text-neutral-500 dark:text-white/50">, {role}</span>}
        </footer>
      )}
    </blockquote>
  );
}

// Definition component for glossary terms
export function Definition({
  term,
  children,
}: {
  term: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 rounded-xl border p-4 border-neutral-200 bg-white dark:border-white/10 dark:bg-white/[0.02]">
      <dt className="font-bold text-neutral-900 dark:text-white">{term}</dt>
      <dd className="mt-1 text-neutral-600 dark:text-white/60 m-0">
        {children}
      </dd>
    </div>
  );
}

// Pro Tip callout
export function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-xl border-l-4 border-emerald-500 bg-emerald-50 p-4 dark:bg-emerald-500/10">
      <div className="flex items-start gap-3">
        <span className="text-lg">💡</span>
        <div className="text-emerald-900 dark:text-emerald-100 [&>p]:m-0">
          <strong className="text-emerald-800 dark:text-emerald-300">Pro Tip:</strong>{" "}
          {children}
        </div>
      </div>
    </div>
  );
}

// Warning callout
export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-xl border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-500/10">
      <div className="flex items-start gap-3">
        <span className="text-lg">⚠️</span>
        <div className="text-yellow-900 dark:text-yellow-100 [&>p]:m-0">
          <strong className="text-yellow-800 dark:text-yellow-300">Warning:</strong>{" "}
          {children}
        </div>
      </div>
    </div>
  );
}
