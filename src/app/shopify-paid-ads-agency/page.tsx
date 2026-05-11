import type { Metadata } from "next";
import { AgencyLandingPage } from "@/components/marketing/agency-landing-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Shopify Paid Ads Agency: Meta, Google, TikTok & AI Search for DTC Brands",
  description:
    "Full-service paid ads agency for Shopify DTC. We manage Meta, Google, TikTok, and emerging AI search placements (ChatGPT, Perplexity, Gemini) — under one team, with one strategy.",
  path: "/shopify-paid-ads-agency",
  keywords: [
    "shopify paid ads agency",
    "shopify ads agency",
    "shopify meta ads agency",
    "shopify google ads agency",
    "shopify tiktok ads agency",
    "dtc paid ads agency",
    "ecommerce paid ads agency",
    "shopify advertising agency",
  ],
});

export default function Page() {
  return (
    <AgencyLandingPage
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Shopify Paid Ads Agency", path: "/shopify-paid-ads-agency" },
      ]}
      serviceName="Shopify Paid Ads Management"
      serviceDescription="Full-service paid ads agency for Shopify DTC brands. We manage Meta, Google, TikTok, and AI search placements under one strategic team."
      eyebrow="SHOPIFY PAID ADS AGENCY"
      heroTop="Paid ads agency"
      heroBottom="for Shopify DTC."
      subtitle="Meta, Google, TikTok, and now ChatGPT, Perplexity, and Google AI Mode. We run all of them under one team and one strategy — built around the specific economics of running a Shopify store at scale."
      audience={{
        title: "Built for Shopify operators ready to scale paid acquisition.",
        items: [
          "Shopify DTC brands spending $30K-$500K/month on paid acquisition who need a real strategic partner, not a junior media buyer",
          "Founders running ads themselves who've hit a ceiling on time or expertise and want to hand it off to specialists",
          "Marketing leads at scaling brands frustrated with a generalist agency that doesn't understand Shopify economics",
          "Brands that have outgrown a freelancer and want senior-led campaign management without enterprise-agency overhead",
          "Operators preparing for the shift toward AI search and want a partner who can run both traditional paid and emerging AI placements",
        ],
      }}
      painPoints={{
        title: "Common signs your current paid ads setup is leaving money on the table.",
        items: [
          {
            title: "Your ROAS dashboard says 4x but blended MER is 2x",
            description:
              "Platform-reported ROAS overstates by 30-60% in most accounts. If your blended marketing efficiency ratio doesn't match what the dashboards claim, you're scaling on a number that isn't real.",
          },
          {
            title: "You're stuck below $100K/month in spend",
            description:
              "Scaling past $50-100K/month requires creative volume, multi-channel diversification, and infrastructure most accounts don't have. We've taken brands from $50K to $300K+/month and we know which levers actually matter.",
          },
          {
            title: "Creative fatigue is eating your account every 3 weeks",
            description:
              "If you're scrambling for new creative every cycle, your production pipeline isn't built for scale. We run UGC creator pools, in-house production, and AI-assisted iteration — together, on a calendar.",
          },
          {
            title: "AI search is coming and you have no plan",
            description:
              "ChatGPT, Perplexity, and Google AI Mode are intercepting a growing share of commercial queries. Most paid ads agencies are pretending this isn't happening. We're actively running AI campaigns alongside Meta and Google for our clients.",
          },
        ],
      }}
      whatsIncluded={{
        title: "Full-funnel paid ads management for your Shopify store.",
        sections: [
          {
            category: "META ADS",
            items: [
              "Account structure rebuild (Advantage+ Shopping plus targeted retargeting)",
              "Conversions API installation and EMQ optimization (target 8.0+)",
              "Creative testing pipeline — 8-15 new creatives per month",
              "Audience strategy and lookalike management",
              "Daily monitoring with weekly optimization cycles",
            ],
          },
          {
            category: "GOOGLE ADS",
            items: [
              "Performance Max asset group structure (hero, best-seller, long-tail)",
              "Brand defense plus generic search campaigns",
              "Shopping feed optimization (40-point audit)",
              "Brand exclusion configuration to stop PMax cannibalization",
              "YouTube Shorts and Demand Gen integration",
            ],
          },
          {
            category: "TIKTOK & EMERGING CHANNELS",
            items: [
              "Spark Ads with creator pool sourcing and management",
              "Brand-handle creative production",
              "Pinterest Shopping Ads (for visual-fit categories)",
              "AppLovin and programmatic testing where economics work",
            ],
          },
          {
            category: "AI SEARCH ADS",
            items: [
              "ChatGPT Ads campaign management (eligibility permitting)",
              "Perplexity Sponsored Answers",
              "Google AI Mode shopping placements",
              "Amazon Rufus optimization",
              "Cross-channel measurement so AI traffic shows up in your reporting",
            ],
          },
        ],
      }}
      process={[
        {
          step: "01",
          title: "Free Account Audit",
          description:
            "We review your current Meta, Google, and TikTok accounts (read-only access) and identify the 3-5 highest-leverage changes. Audit is yours whether you engage us or not.",
        },
        {
          step: "02",
          title: "Strategy & Onboarding",
          description:
            "2-week onboarding covering account structure rebuild, creative pipeline setup, tracking validation, and Shopify integration. You'll have weekly Slack updates from day one.",
        },
        {
          step: "03",
          title: "Run, Optimize, Scale",
          description:
            "Weekly optimization cycles, monthly strategic reviews, quarterly scaling plans. Most clients see meaningful MER improvement within 30-45 days.",
        },
      ]}
      whyAdsx={[
        {
          title: "Shopify-native, not generalist",
          description:
            "We don't run ads for SaaS, B2B, or local services. Shopify DTC is the only thing we do. Your strategist knows Shopify Plus, Markets, Klaviyo flows, and 3PL economics because they think about them every day for other clients.",
        },
        {
          title: "AI ads under the same roof",
          description:
            "ChatGPT, Perplexity, and Google AI Mode shouldn't be a separate agency. We run them alongside Meta and Google because the audience signal, creative learnings, and measurement infrastructure should be unified.",
        },
        {
          title: "One client per competitive category",
          description:
            "Category exclusivity is standard. If we're optimizing your brand for a given keyword set or audience, we're not also running ads for your direct competitor. First-come basis.",
        },
        {
          title: "Senior operators, not associates",
          description:
            "You'll work with senior media buyers and strategists — not handed off to a junior after the pitch call. We cap our client load on purpose so the people who sold you the engagement are the ones who run it.",
        },
      ]}
      faqs={[
        {
          q: "What ad spend levels do you work with?",
          a: "Sweet spot is $30K-$500K/month in ad spend. Below $30K, you're better off with a strong freelancer. Above $500K, in-house typically starts winning economically. Our minimum is $30K/month in client ad spend (separate from our $4,250/month minimum agency fee).",
        },
        {
          q: "How is your pricing structured?",
          a: "Flat monthly retainer starting at $4,250, scaling with scope. No percentage-of-spend fees — we don't want misaligned incentives where we make more by spending more. Ad spend is billed directly to your accounts.",
        },
        {
          q: "Do you take a percentage of revenue or ROAS bonus?",
          a: "We can structure a performance bonus on top of the base retainer if you want it. Most clients don't bother — the flat fee aligns better with scaling decisions because we won't push spend just to grow our fee.",
        },
        {
          q: "Can you work alongside my existing in-house team?",
          a: "Yes, frequently. Many clients have an in-house creative team or operator and hire us to handle media buying, account structure, and AI channels. We coordinate via Slack and weekly syncs.",
        },
        {
          q: "What about creative production?",
          a: "We have UGC creator partnerships and in-house production support included in the retainer up to a monthly volume cap. Heavy creative needs (high-frequency UGC, premium production) are quoted separately at cost.",
        },
        {
          q: "How fast can you onboard?",
          a: "Standard onboarding is 2 weeks from contract signature to first campaign optimization. We can compress to 1 week for urgent timelines (product launch, BFCM prep) but most accounts benefit from the full 2-week audit and structure work.",
        },
        {
          q: "Do you work with brands outside the US?",
          a: "Yes — most of our clients are US-based but we work with UK, Canada, and Australia Shopify brands. International expansion strategy is part of the standard scope.",
        },
        {
          q: "What's the minimum commitment?",
          a: "3 months minimum, then month-to-month with 30 days notice. We're not interested in 12-month lockups — if the engagement isn't working you should be able to leave.",
        },
      ]}
      closingHeadline="Get a free audit of your Shopify ad accounts"
      closingBody="We'll review your Meta, Google, and TikTok accounts and send back a written audit covering the 3-5 highest-leverage changes. No call required to receive it."
    />
  );
}
