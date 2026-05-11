import type { Metadata } from "next";
import { AgencyLandingPage } from "@/components/marketing/agency-landing-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "ChatGPT Ads Agency: OpenAI Ads & ChatGPT Shopping for Shopify Brands",
  description:
    "AdsX runs ChatGPT Ads and ChatGPT Shopping placements for Shopify DTC brands. We handle eligibility, setup, creative, and campaign optimization on OpenAI's emerging ad surface.",
  path: "/chatgpt-ads-agency",
  keywords: [
    "chatgpt ads agency",
    "openai ads agency",
    "chatgpt advertising agency",
    "chatgpt shopping agency",
    "chatgpt ads for shopify",
    "openai advertising agency",
    "chatgpt instant checkout merchant",
    "ai ads agency",
  ],
});

export default function Page() {
  return (
    <AgencyLandingPage
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "ChatGPT Ads Agency", path: "/chatgpt-ads-agency" },
      ]}
      serviceName="ChatGPT Ads Management"
      serviceDescription="Specialized ChatGPT Ads and ChatGPT Shopping agency for Shopify DTC brands. We handle eligibility, setup, creative, and ongoing optimization on OpenAI's ad surface."
      eyebrow="CHATGPT ADS AGENCY"
      heroTop="ChatGPT Ads."
      heroBottom="Built for Shopify."
      subtitle="ChatGPT is now where buyers research before they search. Sponsored placements, ChatGPT Shopping listings, and Instant Checkout are the emerging acquisition channel. We're one of the few agencies actually running campaigns there for Shopify brands today."
      audience={{
        title: "Built for brands ready to test the ChatGPT ad surface.",
        items: [
          "Shopify DTC brands in eligible categories (not regulated supplements, alcohol, firearms, or adult content)",
          "Operators who've validated their offer on Meta and Google and want a less-saturated channel",
          "Brands with at least $30K/month in existing paid ad spend (we need room to test ChatGPT alongside, not as a sole channel)",
          "Founders who want to be in the first wave on OpenAI's ad platform before competitors arrive",
          "Stores where AOV is high enough ($60+) that even early-stage CPMs are sustainable",
        ],
      }}
      painPoints={{
        title: "ChatGPT is the channel most agencies still can't help you with.",
        items: [
          {
            title: "Eligibility is gated and category-restricted",
            description:
              "OpenAI's ad rollout is partner-mediated and limited by category. Most agencies don't even know how to apply. We've been in the program from early access and know which categories are live versus waitlisted.",
          },
          {
            title: "The ad formats are new and the rules keep changing",
            description:
              "ChatGPT Ads, Sponsored Suggestions, ChatGPT Shopping, and Instant Checkout each behave differently. Treating them like Meta or Google placements wastes budget. The auction logic, creative requirements, and measurement infrastructure are new and evolving.",
          },
          {
            title: "Conversion attribution is messy",
            description:
              "Users discover your product in ChatGPT and convert via direct search or branded query. Your Shopify analytics shows 'direct' or 'branded organic' as the source. We've built attribution patterns that surface actual ChatGPT contribution.",
          },
          {
            title: "ChatGPT visibility and ChatGPT Ads share infrastructure",
            description:
              "Brands that rank organically in ChatGPT responses spend dramatically less on paid placements to convert. Most agencies handle one or the other. We run them together because the economics demand it.",
          },
        ],
      }}
      whatsIncluded={{
        title: "Full ChatGPT Ads management for your Shopify store.",
        sections: [
          {
            category: "ELIGIBILITY & ACCESS",
            items: [
              "Category eligibility assessment for OpenAI's current ad program",
              "Application and approval support where required",
              "Account setup, billing, and creative submission",
              "Coordination with OpenAI's merchant program team",
            ],
          },
          {
            category: "CAMPAIGN MANAGEMENT",
            items: [
              "Campaign structure for Sponsored Suggestions and ChatGPT Shopping",
              "Creative production tailored to conversational ad formats",
              "Audience targeting where available (geo, device, query context)",
              "A/B testing of creative, copy, and offer combinations",
              "Bid management and pacing optimization",
            ],
          },
          {
            category: "CHATGPT SHOPPING & INSTANT CHECKOUT",
            items: [
              "Catalog optimization for ChatGPT Shopping visibility",
              "Instant Checkout merchant eligibility and integration",
              "Product schema and feed quality for AI retrieval",
              "Inventory accuracy and fulfillment SLA compliance",
            ],
          },
          {
            category: "MEASUREMENT & REPORTING",
            items: [
              "Attribution tracking for ChatGPT-driven traffic and revenue",
              "Branded search lift tracking (the secondary signal that matters most)",
              "Share-of-voice tracking versus competitors in ChatGPT responses",
              "Monthly performance reports plus weekly Slack updates",
            ],
          },
        ],
      }}
      process={[
        {
          step: "01",
          title: "Eligibility Audit",
          description:
            "Free assessment of your eligibility for ChatGPT Ads, ChatGPT Shopping, and Instant Checkout. Most brands don't know what they qualify for — we'll tell you in writing within 5 business days.",
        },
        {
          step: "02",
          title: "Setup & Approval",
          description:
            "We handle the application process, account configuration, creative production, and merchant program enrollment. Onboarding takes 2-4 weeks depending on OpenAI's review timing.",
        },
        {
          step: "03",
          title: "Run, Test, Scale",
          description:
            "Daily campaign management, weekly creative iterations, monthly strategic reviews. Most clients see initial conversion signals within 30 days of launch.",
        },
      ]}
      whyAdsx={[
        {
          title: "We've been running ChatGPT campaigns since early access",
          description:
            "When OpenAI's ad platform opened to partners, we were among the first agencies to onboard clients. That's pattern recognition you can't get from a generalist agency that started yesterday.",
        },
        {
          title: "We run organic visibility alongside paid",
          description:
            "ChatGPT Ads work better when your brand is already cited organically in responses. We optimize both — paid placements plus citation-readiness through schema, content, and third-party mentions.",
        },
        {
          title: "Shopify-native execution",
          description:
            "We work directly in your Shopify admin and Klaviyo to instrument the attribution infrastructure ChatGPT campaigns need. No translation layer between agency and platform.",
        },
        {
          title: "Honest about what doesn't work yet",
          description:
            "Not every category is eligible. Not every campaign type is worth running today. We'll tell you when ChatGPT isn't the right channel for your brand right now — and what to optimize for instead until the platform catches up.",
        },
      ]}
      faqs={[
        {
          q: "Is my brand eligible for ChatGPT Ads?",
          a: "OpenAI's ad program is currently gated by category, geography, and brand quality signals. Generally eligible: apparel, beauty, home goods, accessories, food (non-regulated), tech accessories. Generally not eligible: regulated supplements, CBD, alcohol in some regions, firearms, adult content, gambling. We'll confirm your specific eligibility in our free audit.",
        },
        {
          q: "How much should I budget for ChatGPT Ads?",
          a: "Minimum useful budget is roughly $3,000-5,000/month on ChatGPT campaigns. Below that, you won't generate enough signal to optimize. Most clients start at $5-15K/month on ChatGPT alongside their existing $30-200K/month on Meta and Google.",
        },
        {
          q: "How does ChatGPT Ads compare to Meta or Google performance?",
          a: "Early stage. CPMs are higher than mature platforms (the auction is less crowded but the user base is smaller and more valuable). Conversion intent is higher for ChatGPT Shopping users than Meta cold audiences. We're seeing 1.5-3x CTR versus Meta in matched accounts. ROAS is comparable to Meta when measured correctly with branded-search lift included.",
        },
        {
          q: "What's the difference between ChatGPT Ads and ChatGPT Shopping?",
          a: "ChatGPT Ads = sponsored suggestions appearing in conversational responses. ChatGPT Shopping = product listings appearing in shopping-intent queries. Instant Checkout = in-chat purchase completion. We typically run all three together for eligible Shopify brands; they each capture different intent.",
        },
        {
          q: "How do I attribute revenue to ChatGPT?",
          a: "Imperfect today but improving. Direct ChatGPT-attributed revenue shows up via UTMs on Sponsored Suggestion clicks. Indirect revenue (branded search lift, direct traffic spike) is what we measure via Geo holdout tests and branded query velocity tracking. We'll show you the methodology in onboarding.",
        },
        {
          q: "Will ChatGPT Ads cannibalize my Meta or Google ads?",
          a: "Some, mostly for branded queries. Net incremental is what matters. We measure incrementality directly so you know what's additive versus what's substitutional. In most accounts we've worked on, ChatGPT adds 5-15% incremental revenue on top of existing channels.",
        },
        {
          q: "Can you run ChatGPT campaigns without my other ads?",
          a: "Possible but not recommended. ChatGPT works best as a complementary channel alongside Meta and Google. If you want us to run ChatGPT only, we will — but we'll be transparent that the economics are weaker than a multi-channel approach.",
        },
        {
          q: "What if OpenAI changes the rules?",
          a: "They will. Frequently. That's part of why you hire us — we're tracking the platform full-time, attending OpenAI partner briefings, and adjusting strategy as the surface evolves. We don't lock you into multi-year commitments because the channel is still maturing.",
        },
      ]}
      closingHeadline="Get your free ChatGPT Ads eligibility audit"
      closingBody="We'll assess your eligibility for ChatGPT Ads, ChatGPT Shopping, and Instant Checkout — plus map the organic visibility work that makes paid campaigns dramatically more efficient. Written report within 5 business days."
    />
  );
}
