"use client";

import {
  shopifyAffiliateHref,
  trackAffiliateClick,
  type AffiliatePlacement,
} from "@/lib/affiliate";

// Land CTA clicks on Shopify's free-trial flow (the guided signup) rather than
// the marketing homepage, while still setting the affiliate cookie.
const FREE_TRIAL_DEEP_LINK = "https://www.shopify.com/free-trial";

// Verified against Shopify's 2026 offer (see how-to-sign-up-shopify-step-by-step):
// cardless free trial, then $1/month for the first 3 months on a paid plan.
const BENEFITS = [
  "No credit card to start your trial",
  "$1/month for your first 3 months on Basic, Grow, or Advanced",
  "Sell online, in person, and across social + AI shopping agents",
];

interface AffiliateCTAProps {
  /** Slug of the host post — reported to Impact (subId1) and GA4 (post_slug). */
  slug: string;
  placement: Extract<AffiliatePlacement, "cta-top" | "cta-mid" | "cta-footer">;
  /** "compact" is a slim one-line bar for above-the-fold; "full" is the box. */
  variant?: "full" | "compact";
}

export function AffiliateCTA({
  slug,
  placement,
  variant = "full",
}: AffiliateCTAProps) {
  const href = shopifyAffiliateHref({
    slug,
    placement,
    deepLink: FREE_TRIAL_DEEP_LINK,
  });
  const onClick = () => trackAffiliateClick({ slug, placement });

  if (variant === "compact") {
    return (
      <aside
        aria-label="Start a Shopify store"
        className="my-8 flex flex-col gap-4 border border-[#10b981]/40 bg-[#10b981]/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="text-sm text-[#ccc]">
          <span className="font-semibold text-[#EAEAEA]">
            Starting a store?
          </span>{" "}
          Build on Shopify free, then $1/month for your first 3 months.
        </p>
        <a
          href={href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={onClick}
          className="cta-btn cta-btn-primary shrink-0 whitespace-nowrap text-center"
        >
          Start free trial →
        </a>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Start a Shopify store"
      className="my-12 border border-[#10b981]/40 bg-[#0d0d0d]"
    >
      <div
        className="flex items-center justify-between gap-3 border-b border-[#10b981]/30 bg-[#10b981]/[0.06] px-6 py-3"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span className="flex items-center gap-2 text-xs tracking-widest text-[#10b981]">
          <span className="inline-block h-2 w-2 bg-[#10b981]" />
          START YOUR STORE
        </span>
        <span className="text-[10px] tracking-widest text-[#666]">
          SHOPIFY OFFER
        </span>
      </div>

      <div className="p-6 md:p-8">
        <h3
          className="mb-3 text-xl uppercase md:text-2xl"
          style={{ fontFamily: "var(--font-display)", lineHeight: 1.1 }}
        >
          Launch your Shopify store for $1/month
        </h3>
        <p className="mb-6 max-w-xl text-base text-[#aaa]">
          Start a free trial — no credit card needed. When you&rsquo;re ready to
          sell, it&rsquo;s just{" "}
          <strong className="text-[#EAEAEA]">
            $1/month for your first 3 months
          </strong>{" "}
          on any plan.
        </p>

        <ul className="mb-7 list-none space-y-2 p-0">
          {BENEFITS.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-2 text-sm text-[#ccc]"
            >
              <span className="mt-0.5 text-[#10b981]">+</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <a
          href={href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={onClick}
          className="cta-btn cta-btn-primary"
        >
          Start your free trial →
        </a>

        <p
          className="mt-4 text-[11px] text-[#666]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          AFFILIATE LINK — WE MAY EARN A COMMISSION AT NO EXTRA COST TO YOU
        </p>
      </div>
    </aside>
  );
}
