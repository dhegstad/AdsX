"use client";

import { useId, useState } from "react";

// Real, stateful email capture — replaces the decorative <input> that used to
// sit in the blog listing (no form, no handler, did nothing). Posts to
// /api/subscribe, fires a GA4 `email_subscribe` event on success, and carries a
// honeypot for bots. Drop it anywhere; `source` is stored for attribution.

type Status = "idle" | "loading" | "success" | "error";

interface EmailCaptureProps {
  /** Where this form lives (page/slug) — stored as the subscriber source. */
  source: string;
  /** "panel" = the big centered block; "inline" = a slim bordered box for posts. */
  variant?: "panel" | "inline";
  heading?: string;
  blurb?: string;
  cta?: string;
  className?: string;
}

function trackSubscribe(source: string) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  gtag?.("event", "email_subscribe", { source });
}

export function EmailCapture({
  source,
  variant = "panel",
  heading = "The online-store starter series",
  blurb = "A short, no-fluff email course on what to sell, what it really costs, and the mistakes that sink most first stores.",
  cta = "Get the series",
  className = "",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const fieldId = useId();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, company }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        outcome?: string;
        message?: string;
      };
      if (res.ok && data.success) {
        setStatus("success");
        setMessage(
          data.outcome === "exists"
            ? "You're already on the list — check your inbox."
            : "You're in. Check your inbox for the first email.",
        );
        setEmail("");
        trackSubscribe(source);
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  const isInline = variant === "inline";

  const form = (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-3 sm:flex-row ${isInline ? "" : "mx-auto max-w-md justify-center"}`}
      noValidate
    >
      <label htmlFor={fieldId} className="sr-only">
        Email address
      </label>
      <input
        id={fieldId}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        autoComplete="email"
        disabled={status === "success"}
        className="flex-grow border border-[#333] bg-[#0d0d0d] px-4 py-3 text-sm text-[#EAEAEA] placeholder:text-[#666] focus:border-[#10b981] focus:outline-none disabled:opacity-60"
        style={{ fontFamily: "var(--font-mono)" }}
      />
      {/* Honeypot: hidden from humans, catches bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="hidden"
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="whitespace-nowrap border border-[#EAEAEA] bg-[#EAEAEA] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#080808] transition-all hover:border-[#10b981] hover:bg-[#10b981] hover:text-black hover:shadow-[4px_4px_0_#10b981] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {status === "loading" ? "Joining…" : status === "success" ? "Done ✓" : cta}
      </button>
    </form>
  );

  const status_line = message ? (
    <p
      aria-live="polite"
      className={`mt-3 text-xs ${status === "error" ? "text-red-400" : "text-[#10b981]"}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {message}
    </p>
  ) : null;

  if (isInline) {
    return (
      <aside
        aria-label="Subscribe to the online-store starter series"
        className={`my-10 border border-[#10b981]/40 bg-[#0d0d0d] p-6 md:p-8 ${className}`}
      >
        <div
          className="mb-3 flex items-center gap-2 text-xs tracking-widest text-[#10b981]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span className="inline-block h-2 w-2 bg-[#10b981]" />
          FREE EMAIL SERIES
        </div>
        <h3
          className="mb-2 text-xl uppercase md:text-2xl"
          style={{ fontFamily: "var(--font-display)", lineHeight: 1.1 }}
        >
          {heading}
        </h3>
        <p className="mb-5 max-w-xl text-sm text-[#aaa]">{blurb}</p>
        {form}
        {status_line}
        <p className="mt-3 text-[11px] text-[#666]" style={{ fontFamily: "var(--font-mono)" }}>
          NO SPAM. UNSUBSCRIBE ANY TIME.
        </p>
      </aside>
    );
  }

  return (
    <div className={`p-8 text-center md:p-16 ${className}`}>
      <h2
        className="mb-4 text-2xl uppercase md:text-3xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {heading}
      </h2>
      <p className="mx-auto mb-8 max-w-lg text-[#888]">{blurb}</p>
      {form}
      {status_line}
      <p className="mt-4 text-[11px] text-[#666]" style={{ fontFamily: "var(--font-mono)" }}>
        NO SPAM. UNSUBSCRIBE ANY TIME.
      </p>
    </div>
  );
}
