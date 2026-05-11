import type { Metadata } from "next";
import { AgencyLandingPage } from "@/components/marketing/agency-landing-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Shopify AI Ads Agency: ChatGPT, Perplexity & LLM Advertising for DTC Brands",
  description:
    "AdsX is the AI ads agency built for Shopify DTC brands. We manage paid placements and visibility across ChatGPT, Perplexity, Claude, and Google AI — so your store gets recommended where buyers are actually searching in 2026.",
  path: "/shopify-ai-ads-agency",
  keywords: [
    "shopify ai ads agency",
    "shopify chatgpt ads agency",
    "ai ads agency for shopify",
    "shopify llm ads agency",
    "shopify ai advertising",
    "dtc ai ads agency",
    "shopify ai visibility agency",
    "openai ads for shopify",
  ],
});

export default function Page() {
  return (
    <AgencyLandingPage
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Shopify AI Ads Agency", path: "/shopify-ai-ads-agency" },
      ]}
      serviceName="Shopify AI Ads & Visibility Management"
      serviceDescription="Full-service AI ads agency for Shopify DTC brands. We manage paid placements and brand visibility across ChatGPT, Perplexity, Claude, Google AI, and Amazon Rufus."
      eyebrow="SHOPIFY AI ADS AGENCY"
      heroTop="AI ads agency"
      heroBottom="for Shopify brands."
      subtitle="ChatGPT, Perplexity, Claude, Google AI, and Amazon Rufus now drive a meaningful share of product discovery for Shopify DTC. We're the agency that gets your store recommended on them — and runs the paid placements when they're available."
      audience={{
        title: "Built for Shopify operators who need to win in AI search.",
        items: [
          "Shopify DTC brands doing $50K-$5M/month who see AI assistants in customer conversations but don't know how to show up in them",
          "Founders who've maxed out Meta and Google and need a new acquisition channel that competitors aren't already saturating",
          "Marketing leads at scaling Shopify brands who want AI search handled by specialists instead of internalizing yet another channel",
          "Stores running on Shopify, Shopify Plus, or Shopify Headless — we work natively with the platform",
          "Brands willing to commit 3+ months because AI visibility, like SEO, compounds rather than spikes",
        ],
      }}
      painPoints={{
        title: "If your AI strategy is 'we'll figure it out later,' you're already losing share.",
        items: [
          {
            title: "ChatGPT Shopping recommends your competitors, not you",
            description:
              "When a buyer asks ChatGPT 'best [your category] for under $X,' you should be in the answer. Most Shopify brands aren't, because they've never optimized for AI retrieval the way they've optimized for Google.",
          },
          {
            title: "Your Google Shopping traffic is leaking to AI Overviews",
            description:
              "Google AI Mode and AI Overviews now intercept 20-40% of commercial queries before the user ever sees a blue link. Without a strategy for AI citation, your impressions go up while your clicks go down.",
          },
          {
            title: "Perplexity, Rufus, and Gemini are eating your branded search",
            description:
              "Buyers research on AI assistants first and search Google second. If the AI never mentions you, the Google search you used to win never happens. The funnel starts earlier than it used to.",
          },
          {
            title: "Paid placements on LLMs need ad-buyer expertise",
            description:
              "ChatGPT Ads, Perplexity Sponsored Answers, and Google AI Mode placements have different auction dynamics than Meta or Google Search. Treating them like Facebook campaigns burns budget without the learnings.",
          },
        ],
      }}
      whatsIncluded={{
        title: "Full-service AI visibility + paid placements for your Shopify store.",
        sections: [
          {
            category: "AI VISIBILITY OPTIMIZATION",
            items: [
              "Audit of how ChatGPT, Perplexity, Claude, and Gemini currently describe your brand",
              "Share-of-model tracking versus your direct competitors",
              "Product schema and structured data implementation for AI retrieval",
              "Content optimization for citation-readiness (Reddit, Wikipedia, review aggregators)",
              "Third-party publication outreach to build AI-citable mentions",
              "Up to 10 pages optimized or created monthly",
            ],
          },
          {
            category: "AI PAID PLACEMENTS",
            items: [
              "ChatGPT Ads campaign setup and management (where available in your category)",
              "Perplexity Sponsored Answers campaign management",
              "Google AI Mode shopping ads optimization",
              "Amazon Rufus optimization for sponsored placements",
              "Creative production and A/B testing for AI-native ad formats",
              "Conversion tracking back to your Shopify store",
            ],
          },
          {
            category: "SHOPIFY-NATIVE EXECUTION",
            items: [
              "Direct work in your Shopify admin (or with your agency / dev team)",
              "Shopify schema markup and product feed optimization",
              "Klaviyo integration for AI-discovered customer LTV tracking",
              "Pixel and CAPI configuration alongside AI campaign measurement",
              "Product catalog optimization for ChatGPT Shopping and Rufus",
            ],
          },
          {
            category: "REPORTING & STRATEGY",
            items: [
              "Real-time AI visibility dashboard you can share with leadership",
              "Monthly strategic review with insights and next-month priorities",
              "Quarterly competitive benchmarking versus 3-5 named competitors",
              "Direct Slack or email access to your dedicated AI strategist",
            ],
          },
        ],
      }}
      process={[
        {
          step: "01",
          title: "Free AI Visibility Audit",
          description:
            "We map how ChatGPT, Perplexity, Claude, and Gemini currently describe your brand and where you appear (or don't) versus competitors. You get the audit whether you hire us or not.",
        },
        {
          step: "02",
          title: "Strategy Call",
          description:
            "30-minute call to review findings, agree on the keywords and platforms that matter to your business, and align on the metric we'll measure (typically share of voice plus attributed revenue).",
        },
        {
          step: "03",
          title: "Engagement & Execution",
          description:
            "Onboarding takes 1-2 weeks. After that, we ship optimizations, run campaigns, and report monthly. Most clients see measurable AI visibility lift inside 6-10 weeks.",
        },
      ]}
      whyAdsx={[
        {
          title: "We only work with Shopify DTC brands",
          description:
            "We're not a generalist SEO agency that learned AI on the side. Shopify and DTC growth is the only thing we do. We know what works for $50K/month brands and what works for $5M/month brands, and we won't waste your time pretending those need the same playbook.",
        },
        {
          title: "One client per competitive category",
          description:
            "We don't take on your direct competitors. The reason matters: AI visibility is zero-sum in the way SEO never quite was. If we're optimizing your brand for 'best [category] for [use case]' queries, we shouldn't also be optimizing the brand you compete with.",
        },
        {
          title: "Paid placements and organic visibility under one team",
          description:
            "Most agencies do one or the other. ChatGPT visibility and ChatGPT ads share infrastructure, audience signal, and creative learnings. We run them together because they perform better that way.",
        },
        {
          title: "Founder-led, not associate-led",
          description:
            "You'll work with senior operators who've personally managed AI campaigns. We're capped at the number of clients we can take, on purpose. If you don't get a real strategist, you'll hate working with us — and we'd rather not waste either of our time.",
        },
      ]}
      faqs={[
        {
          q: "Are ChatGPT Ads actually available to my brand?",
          a: "Depends on your category and merchant scale. OpenAI's ad rollout is gated and category-restricted (no firearms, regulated supplements, alcohol in some regions, etc.). Part of our onboarding is determining eligibility on each platform — ChatGPT, Perplexity Sponsored Answers, Google AI Mode, Amazon Rufus — and prioritizing where you can actually buy placements today versus where you should optimize for organic citation.",
        },
        {
          q: "What kind of results should I expect, and when?",
          a: "Most clients see measurable AI visibility lift inside 6-10 weeks — share-of-model improvements, increased branded query volume, and citation lifts on review aggregators. Revenue impact follows but takes 3-6 months to attribute cleanly because AI-influenced purchases often show up as branded direct or branded search in Shopify analytics rather than as AI-attributed.",
        },
        {
          q: "How is this different from SEO?",
          a: "Traditional SEO optimizes for Google's blue-link ranking algorithm. AI visibility optimizes for retrieval and citation by LLMs — different signals (third-party mentions weigh more than backlinks, schema matters more than keyword density, structured product data is mandatory), different tooling, different competitive dynamics. We don't replace SEO; we work alongside it for the increasing share of queries that never reach a blue-link SERP.",
        },
        {
          q: "Will you sign an NDA and exclusivity?",
          a: "Yes to NDAs as standard. Yes to category exclusivity by default — we don't work with your direct competitors. If you're in a crowded category, we sign on a first-come basis.",
        },
        {
          q: "What if I'm not on Shopify?",
          a: "Then we're probably not the right fit. We specialize in Shopify because the platform, app ecosystem, and operator profile is what we know deeply. We'll happily refer you to a generalist agency.",
        },
        {
          q: "Do you have a minimum ad spend requirement?",
          a: "Our minimum engagement is $4,250/month in agency fees. Ad spend is separate and depends on your strategy — some clients spend $5K/month on AI placements, others spend $50K+. We don't require minimum ad spend, but campaigns under ~$3K/month on a given platform won't generate enough signal to optimize properly.",
        },
        {
          q: "How does this work with our existing Meta and Google ads?",
          a: "We coordinate. Most of our clients have an existing Meta/Google operator (in-house or agency) and we run AI ads alongside without conflict. Where there's overlap — for example, product catalog and feed quality affecting both Google Shopping and ChatGPT Shopping — we handle it so it's not on your team.",
        },
        {
          q: "What's the onboarding process?",
          a: "Week 1: AI visibility audit + access provisioning (read-only Shopify, ad accounts, Klaviyo, GSC). Week 2: Strategy call + competitive benchmarking. Week 3: First optimizations shipped + tracking configured. Week 4+: Monthly cadence with weekly Slack updates.",
        },
      ]}
      closingHeadline="Get your free Shopify AI visibility audit"
      closingBody="We'll map exactly how ChatGPT, Perplexity, Claude, and Gemini describe your brand today — and where the biggest opportunity gap sits against your top 3 competitors. Yours to keep, no commitment to engage."
    />
  );
}
