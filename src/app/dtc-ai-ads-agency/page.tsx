import type { Metadata } from "next";
import { AgencyLandingPage } from "@/components/marketing/agency-landing-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "DTC AI Ads Agency: AI Search Advertising for Direct-to-Consumer Brands",
  description:
    "AdsX is the AI ads agency for DTC brands. We run paid and organic visibility across ChatGPT, Perplexity, Claude, Google AI Mode, and Amazon Rufus for direct-to-consumer ecommerce.",
  path: "/dtc-ai-ads-agency",
  keywords: [
    "dtc ai ads agency",
    "dtc advertising agency",
    "direct to consumer ai agency",
    "ai search advertising agency",
    "generative engine optimization agency",
    "geo agency",
    "ai search ads dtc",
    "llm advertising agency",
  ],
});

export default function Page() {
  return (
    <AgencyLandingPage
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "DTC AI Ads Agency", path: "/dtc-ai-ads-agency" },
      ]}
      serviceName="DTC AI Ads & Visibility"
      serviceDescription="Full-service AI search advertising and visibility agency for direct-to-consumer brands. ChatGPT, Perplexity, Claude, Google AI Mode, and Amazon Rufus under one team."
      eyebrow="DTC AI ADS AGENCY"
      heroTop="AI search ads."
      heroBottom="For DTC."
      subtitle="Direct-to-consumer brands win or lose in AI search the same way they won or lost in Google ten years ago — early, with the right partner. We're the agency that runs both paid placements and organic visibility for DTC brands on ChatGPT, Perplexity, Claude, Google AI Mode, and Amazon Rufus."
      audience={{
        title: "Built for DTC brands ready for the AI search shift.",
        items: [
          "DTC brands on Shopify, Shopify Plus, or comparable platforms doing $50K-$10M/month",
          "Operators who've watched Google AI Overview eat their traffic and want to get ahead of the next wave",
          "Brands with high consideration purchase cycles (skincare, supplements, home goods, premium apparel) where AI assistants are increasingly part of buyer research",
          "Founders who saw the SEO and Meta playbooks mature and want a head start on the next channel",
          "Marketing leads at scaling DTC brands who need a specialist partner for AI ads, not another generalist taking on AI as a side gig",
        ],
      }}
      painPoints={{
        title: "DTC brands face a specific set of AI search problems.",
        items: [
          {
            title: "Your Google Shopping traffic is being intercepted by AI Overviews",
            description:
              "Google AI Mode now answers shopping queries in-SERP without sending clicks. Brands without an AI visibility strategy are watching impressions rise while clicks fall. This trend accelerates monthly.",
          },
          {
            title: "ChatGPT recommends your category but not your brand",
            description:
              "When buyers ask ChatGPT for product recommendations in your category, you're either in the answer or invisible. The brands in the answer share specific traits — third-party citations, structured product data, clear category positioning. Most brands haven't optimized for any of them.",
          },
          {
            title: "Amazon Rufus is changing how 250M+ shoppers discover products",
            description:
              "Rufus now mediates a significant share of Amazon product discovery, especially for considered purchases. Brands selling on Amazon and DTC need Rufus optimization that traditional Amazon agencies don't offer.",
          },
          {
            title: "Perplexity and Gemini are emerging research channels with no playbook",
            description:
              "Both have growing usage among the 25-45 demo. Most agencies have no idea how to optimize for either. The brands taking these channels seriously are positioning for a meaningful share of category discovery within 12-24 months.",
          },
        ],
      }}
      whatsIncluded={{
        title: "Full AI search ads and visibility for your DTC brand.",
        sections: [
          {
            category: "AI VISIBILITY OPTIMIZATION",
            items: [
              "Share-of-model tracking across ChatGPT, Perplexity, Claude, Gemini",
              "Citation building through Reddit, review aggregators, and third-party publications",
              "Schema and structured data implementation for AI retrieval",
              "Content optimization for citation-readiness across category and product pages",
              "Competitive benchmarking against your top 3-5 named competitors",
            ],
          },
          {
            category: "AI PAID PLACEMENTS",
            items: [
              "ChatGPT Ads, Sponsored Suggestions, and Shopping (eligibility permitting)",
              "Perplexity Sponsored Answers",
              "Google AI Mode shopping placements",
              "Amazon Rufus optimization for sponsored visibility",
              "Cross-platform creative production tailored to AI ad formats",
            ],
          },
          {
            category: "MEASUREMENT INFRASTRUCTURE",
            items: [
              "Server-side tracking with conversion API for all major ad platforms",
              "Branded search lift tracking as AI visibility's primary outcome metric",
              "Geo-holdout incrementality testing to validate AI channel contribution",
              "Custom dashboards showing AI-attributed traffic and revenue",
              "Monthly incrementality reports separating real lift from attribution shifts",
            ],
          },
          {
            category: "DTC-SPECIFIC EXECUTION",
            items: [
              "Klaviyo integration for AI-discovered customer LTV analysis",
              "Cross-channel attribution combining AI, Meta, Google, and TikTok",
              "Product catalog and feed optimization across multiple AI platforms",
              "Coordination with your existing creative, ops, and customer service teams",
            ],
          },
        ],
      }}
      process={[
        {
          step: "01",
          title: "Free AI Visibility Audit",
          description:
            "We map your brand's current visibility across ChatGPT, Perplexity, Claude, Gemini, and Rufus. You get the audit and competitive benchmarking whether you engage us or not.",
        },
        {
          step: "02",
          title: "Strategy Session",
          description:
            "60-minute session to review findings, prioritize platforms and keywords by business fit, and define the metrics we'll be accountable to.",
        },
        {
          step: "03",
          title: "Engagement & Execution",
          description:
            "2-week onboarding covers tracking setup, account access, baseline benchmarking, and first optimizations. Most clients see measurable share-of-model lift within 8-12 weeks.",
        },
      ]}
      whyAdsx={[
        {
          title: "DTC ecommerce is the only thing we do",
          description:
            "We don't take on B2B SaaS, professional services, or local businesses. Our entire client portfolio is DTC brands on Shopify, Shopify Plus, and comparable platforms. The patterns and benchmarks we use come from running this work for brands exactly like yours.",
        },
        {
          title: "We run both organic and paid",
          description:
            "Most agencies handle one or the other. AI visibility (organic) and AI paid placements share infrastructure, audience signal, and creative learnings. We run them together because the economics demand it — paid CTR drops 40%+ when organic citation is weak.",
        },
        {
          title: "Honest measurement, not dashboard theater",
          description:
            "AI attribution is genuinely hard. We run incrementality tests, geo-holdouts, and branded-search lift analysis to give you real numbers — not the inflated platform-reported ROAS most agencies sell.",
        },
        {
          title: "Category exclusivity by default",
          description:
            "We don't work with your direct competitors. AI visibility is more zero-sum than SEO ever was — if we're optimizing your brand for a given query cluster, we shouldn't also be optimizing the brand you compete with for the same audience.",
        },
      ]}
      faqs={[
        {
          q: "What's the difference between AI ads and traditional SEO?",
          a: "SEO optimizes for Google's blue-link ranking algorithm and click-through. AI search ads (and visibility) optimize for retrieval and citation by LLMs — different signals, different infrastructure, different success metrics. Traditional SEO measures rankings and clicks; AI search measures share of voice in responses, citation rate, and downstream branded search lift. Both still matter, for different parts of the funnel.",
        },
        {
          q: "Is GEO (generative engine optimization) the same as AEO or LLMO?",
          a: "Mostly yes. The industry hasn't settled on terminology. GEO (Generative Engine Optimization), AEO (Answer Engine Optimization), and LLMO (LLM Optimization) refer to the same broad practice of optimizing content and brand signals for AI assistants. We use 'AI visibility' internally because it's clearer to clients, but the work is the same.",
        },
        {
          q: "How long until I see results from AI visibility work?",
          a: "Measurable share-of-model lift typically shows up within 8-12 weeks. Revenue attribution follows but takes longer to validate — 3-6 months for clean attribution because AI-influenced purchases often appear as direct or branded search in your analytics.",
        },
        {
          q: "What ad budget should I plan for AI search channels?",
          a: "Most DTC clients allocate $5-25K/month to AI paid placements alongside their existing Meta/Google/TikTok spend. AI campaigns can scale higher in eligible categories, but starting smaller lets us validate the channel before committing larger budgets.",
        },
        {
          q: "Do I need to be on Shopify?",
          a: "Most of our clients are on Shopify or Shopify Plus, but we also work with BigCommerce, WooCommerce, and custom platforms. The tracking and integration work is more straightforward on Shopify, which is why most of our case studies live there.",
        },
        {
          q: "What's the engagement minimum?",
          a: "3 months minimum, then month-to-month with 30 days notice. AI visibility compounds — quitting after 6 weeks usually means leaving most of the value on the table.",
        },
        {
          q: "How is your pricing structured?",
          a: "Flat retainer starting at $4,250/month, scaling with scope. No percentage-of-spend fees. Ad spend is separate, billed directly to your accounts.",
        },
        {
          q: "Can you handle our existing Meta and Google ads too?",
          a: "Yes — we offer combined paid acquisition management for Shopify DTC brands. See our Shopify Paid Ads Agency page for the broader scope. Many clients hire us for AI + traditional paid under one team.",
        },
      ]}
      closingHeadline="Get your free DTC AI visibility audit"
      closingBody="We'll map exactly how AI assistants describe your brand today, where the biggest gap is versus your top competitors, and which platform deserves your attention first. Yours to keep."
    />
  );
}
