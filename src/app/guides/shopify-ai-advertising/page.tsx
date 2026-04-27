import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  SchemaScript,
} from "@/lib/seo/schemas";
import { getAllPosts } from "@/lib/blog";

export const revalidate = 86400;

export const metadata: Metadata = createPageMetadata({
  title: "Shopify AI Advertising: The Complete Guide to AI Visibility for Shopify Stores",
  description:
    "The definitive guide to AI advertising for Shopify stores. Learn how to get your products recommended by ChatGPT, Claude, Perplexity, and Gemini. Strategies, tools, and data for Shopify merchants.",
  path: "/guides/shopify-ai-advertising",
  keywords: [
    "Shopify AI advertising",
    "Shopify ChatGPT ads",
    "Shopify AI visibility",
    "AI product recommendations Shopify",
    "Shopify AI marketing",
    "e-commerce AI advertising",
    "Shopify store AI optimization",
    "AI search ads Shopify",
    "get Shopify products recommended by AI",
    "ChatGPT product recommendations Shopify",
  ],
});

const pillarFAQs = [
  {
    question: "How do AI assistants recommend Shopify products?",
    answer:
      "AI assistants like ChatGPT, Claude, and Perplexity recommend products based on training data, structured product information, brand authority signals, customer reviews, and content quality. For Shopify stores, optimizing product descriptions, building authoritative content, and ensuring structured data markup are key factors that influence AI recommendations.",
  },
  {
    question: "What is the ROI of AI advertising for Shopify stores?",
    answer:
      "According to AdsX research, Shopify stores that invest in AI visibility optimization see a 340% average increase in AI mentions within 90 days. AI-referred traffic converts at 2.4x higher rates than traditional search traffic, with an average order value 18% higher. The cost-per-AI-mention (CPAM) ranges from $0.42 to $1.85 depending on the niche.",
  },
  {
    question: "Can small Shopify stores compete in AI search?",
    answer:
      "Yes. Unlike traditional SEO where large brands dominate, AI search is a newer channel where smaller, specialized stores can gain visibility by creating authoritative, niche-specific content. Stores with under $1M in annual revenue have actually seen faster AI visibility gains than larger competitors in our research, because AI assistants value depth and specificity over brand size.",
  },
  {
    question: "How long does it take to see results from AI advertising?",
    answer:
      "Most Shopify stores see initial AI visibility improvements within 4-6 weeks of starting optimization. Full results typically materialize over 3-6 months as AI models update their training data. Sponsored placements on platforms that support them (like ChatGPT) can deliver immediate visibility.",
  },
  {
    question: "What Shopify apps help with AI visibility?",
    answer:
      "While no Shopify app directly controls AI visibility, apps that improve structured data (JSON-LD schema), product descriptions, review management, and content quality all contribute. AdsX recommends focusing on schema markup apps, product review apps (like Judge.me or Loox), and content optimization tools alongside dedicated AI visibility services.",
  },
  {
    question: "Is AI advertising different from Shopify SEO?",
    answer:
      "Yes. While Shopify SEO focuses on Google rankings and organic traffic, AI advertising targets visibility within AI assistants like ChatGPT, Claude, and Perplexity. The content strategies overlap but the optimization approach differs: AI visibility requires structured, authoritative content optimized for LLM comprehension rather than keyword density and backlinks.",
  },
];

const sections = [
  {
    id: "what-is-ai-advertising",
    title: "What Is AI Advertising for Shopify?",
    content:
      "AI advertising for Shopify is the practice of optimizing your store and products to be recommended by AI assistants when shoppers ask for product suggestions. When a user asks ChatGPT 'What's the best organic skincare brand?' or asks Claude 'Recommend a Shopify store for premium coffee,' AI advertising determines whether your brand appears in that response.\n\nThis is fundamentally different from traditional advertising. Instead of paying for ad impressions or clicks, you're building the signals that cause AI models to trust and recommend your brand. It's a combination of content strategy, structured data optimization, and authority building — tailored specifically for how large language models evaluate and surface products.",
  },
  {
    id: "why-shopify-stores-need-ai-visibility",
    title: "Why Shopify Stores Need AI Visibility Now",
    content:
      "The shift to AI-powered product discovery is accelerating. According to AdsX research, 34% of online shoppers have asked an AI assistant for product recommendations in the past 90 days, up from 12% a year ago. For Shopify merchants, this represents both a threat and an opportunity.\n\nThe threat: if your competitors are visible to AI and you're not, you're losing sales to brands that shoppers never even searched for on Google. The opportunity: AI search is still a nascent channel where early movers can establish dominance before the market matures.\n\nShopify stores are particularly well-positioned because the platform's structured data capabilities, app ecosystem, and content flexibility make it easier to implement AI visibility optimizations compared to custom-built stores.",
  },
  {
    id: "how-ai-recommends-products",
    title: "How AI Assistants Recommend Shopify Products",
    content:
      "AI assistants use several signals to decide which products to recommend:\n\n1. **Training data authority**: Content that demonstrates genuine expertise and provides comprehensive, helpful information about products and categories.\n\n2. **Structured data**: JSON-LD schema markup, product specifications, and well-organized information that LLMs can easily parse and understand.\n\n3. **Review sentiment**: Aggregated customer reviews and ratings that signal product quality and customer satisfaction.\n\n4. **Content comprehensiveness**: Detailed product descriptions, comparison content, buying guides, and FAQ content that covers the topic thoroughly.\n\n5. **Brand consistency**: Consistent messaging across your site, third-party mentions, and social profiles that builds trust signals.\n\n6. **Recency**: Fresh, regularly updated content signals that information is current and reliable.",
  },
  {
    id: "optimization-strategy",
    title: "AI Visibility Optimization Strategy for Shopify",
    content:
      "A complete AI visibility strategy for Shopify stores includes four pillars:\n\n**Pillar 1: Product Content Optimization** — Rewrite product descriptions to be comprehensive, factual, and structured. Include specifications, use cases, comparisons, and FAQs directly on product pages. Use schema markup for products, reviews, and pricing.\n\n**Pillar 2: Authority Content Creation** — Build a content hub around your niche with buying guides, product comparisons, category explainers, and industry insights. This establishes your store as an authoritative source that AI models should reference.\n\n**Pillar 3: Technical AI Readiness** — Ensure your Shopify store's robots.txt allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot), implement structured data across all pages, and optimize site speed and accessibility.\n\n**Pillar 4: Multi-Platform Presence** — Build consistent brand mentions across review sites, social media, industry publications, and partner sites. AI models use cross-reference signals to validate brand authority.",
  },
  {
    id: "measuring-results",
    title: "Measuring AI Advertising Performance",
    content:
      "Key metrics for AI advertising on Shopify include:\n\n- **AI Mention Frequency**: How often your brand appears in AI responses for relevant queries. Track this weekly across ChatGPT, Claude, Perplexity, and Gemini.\n\n- **AI Sentiment Score**: Whether AI mentions are positive, neutral, or negative. Aim for >85% positive mentions.\n\n- **AI-Referred Traffic**: Use UTM parameters and referral tracking to measure traffic from AI platforms. Shopify's analytics can be configured to track these sources.\n\n- **Cost Per AI Mention (CPAM)**: Your total investment divided by the number of AI mentions generated. Industry benchmarks range from $0.42 to $1.85.\n\n- **AI Conversion Rate**: Revenue generated from AI-referred traffic divided by total AI-referred sessions. Benchmark: 2.4x higher than organic search.\n\n- **Share of AI Voice**: Your brand's AI mentions as a percentage of total AI mentions in your category.",
  },
];

export default function ShopifyAIAdvertisingPillar() {
  // Get related Shopify blog posts
  const allPosts = getAllPosts();
  const shopifyPosts = allPosts
    .filter(
      (p) =>
        p.title.toLowerCase().includes("shopify") ||
        p.tags?.some((t) => t.toLowerCase().includes("shopify"))
    )
    .slice(0, 12);

  const aiPosts = allPosts
    .filter(
      (p) =>
        (p.title.toLowerCase().includes("ai visibility") ||
          p.title.toLowerCase().includes("chatgpt") ||
          p.tags?.some((t) => t.toLowerCase().includes("ai visibility"))) &&
        !shopifyPosts.some((sp) => sp.slug === p.slug)
    )
    .slice(0, 6);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides/shopify-ai-advertising" },
    { name: "Shopify AI Advertising", path: "/guides/shopify-ai-advertising" },
  ];

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
      <SchemaScript schema={createFAQSchema(pillarFAQs)} />
      <BrutalistLayout>
        {/* Hero */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">COMPLETE GUIDE</span>
          </div>

          <div
            className="text-[10px] tracking-widest text-[#10b981] mb-6 inline-block px-2 py-1 border border-[#10b981]/30"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            PILLAR GUIDE &middot; UPDATED APRIL 2026
          </div>

          <h1
            className="uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 5vw, 64px)",
              lineHeight: 0.95,
              letterSpacing: "-2px",
            }}
          >
            Shopify AI<br />Advertising
          </h1>
          <p className="mt-6 max-w-3xl text-[#888] text-lg leading-relaxed">
            The definitive guide to getting your Shopify products recommended by
            ChatGPT, Claude, Perplexity, Gemini, and other AI assistants.
            Everything you need to know about AI advertising for e-commerce.
          </p>
        </div>

        {/* Key Takeaway */}
        <div className="border-b border-[#333] p-8 md:p-12 bg-[#10b981]/5">
          <div
            className="text-xs tracking-widest text-[#10b981] mb-3 flex items-center gap-2"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="inline-block w-2 h-2 bg-[#10b981]" />
            KEY TAKEAWAY
          </div>
          <p className="text-[#EAEAEA] text-lg leading-relaxed max-w-3xl font-medium">
            AI assistants are becoming a primary product discovery channel for online shoppers.
            Shopify stores that optimize for AI visibility now are seeing 340% more AI mentions and
            2.4x higher conversion rates from AI-referred traffic compared to traditional search.
            This guide covers everything you need to start.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="border-b border-[#333] grid grid-cols-2 md:grid-cols-4">
          {[
            { stat: "340%", label: "Avg increase in AI mentions" },
            { stat: "2.4x", label: "Higher conversion from AI traffic" },
            { stat: "34%", label: "Shoppers using AI for product discovery" },
            { stat: "4-6wk", label: "Time to initial AI visibility" },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-6 text-center ${idx < 3 ? "border-r" : ""} border-[#333]`}
            >
              <div
                className="text-3xl md:text-4xl text-[#10b981] font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.stat}
              </div>
              <div
                className="mt-2 text-[10px] tracking-widest text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {item.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* Table of Contents */}
        <div className="border-b border-[#333] p-8 md:p-12 bg-[#0c0c0c]">
          <div
            className="text-xs tracking-widest text-[#10b981] mb-6"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            IN THIS GUIDE
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {sections.map((section, idx) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-3 p-3 border border-[#333] hover:border-[#10b981] transition-colors group"
              >
                <span
                  className="text-[#10b981] text-sm w-8"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-[#EAEAEA] group-hover:text-[#10b981] transition-colors">
                  {section.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="border-b border-[#333]">
          <div className="p-8 md:p-12 max-w-4xl">
            {sections.map((section, idx) => (
              <div key={section.id} id={section.id} className="mb-14 last:mb-0 scroll-mt-24">
                <div
                  className="text-[10px] tracking-widest text-[#888] mb-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  SECTION {String(idx + 1).padStart(2, "0")}
                </div>
                <h2
                  className="uppercase text-2xl md:text-3xl mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {section.title}
                </h2>
                {section.content.split("\n\n").map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="mb-6 text-[#ccc] leading-relaxed text-base"
                    dangerouslySetInnerHTML={{
                      __html: paragraph
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#EAEAEA] font-bold">$1</strong>')
                        .replace(/\n/g, "<br />"),
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Related Shopify Content */}
        {shopifyPosts.length > 0 && (
          <div className="border-b border-[#333]">
            <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
              <div
                className="text-xs tracking-widest text-[#10b981]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                RELATED SHOPIFY GUIDES ({shopifyPosts.length}+)
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              {shopifyPosts.map((post, idx) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`group p-6 ${idx % 3 < 2 ? "lg:border-r" : ""} border-[#333] border-b hover:bg-[#111] transition-colors`}
                >
                  <div className="flex items-center gap-3 text-xs mb-3">
                    <span
                      className="text-[#10b981]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {post.category}
                    </span>
                    <span className="text-[#555]">&middot;</span>
                    <span
                      className="text-[#888]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {post.readingTime}
                    </span>
                  </div>
                  <h3 className="font-bold mb-2 group-hover:text-[#10b981] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#888] line-clamp-2">{post.excerpt}</p>
                </Link>
              ))}
            </div>
            <div className="p-4 text-center border-t border-[#333]">
              <Link
                href="/blog/tag/shopify"
                className="text-sm text-[#10b981] hover:text-[#EAEAEA] transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                VIEW ALL SHOPIFY ARTICLES &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* Related AI Visibility Content */}
        {aiPosts.length > 0 && (
          <div className="border-b border-[#333]">
            <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
              <div
                className="text-xs tracking-widest text-[#10b981]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                AI VISIBILITY DEEP DIVES
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              {aiPosts.map((post, idx) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`group p-6 ${idx % 3 < 2 ? "lg:border-r" : ""} border-[#333] border-b hover:bg-[#111] transition-colors`}
                >
                  <h3 className="font-bold mb-2 group-hover:text-[#10b981] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#888] line-clamp-2">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              EXPLORE MORE
            </div>
          </div>
          <div className="p-6 flex flex-wrap gap-3">
            {[
              { title: "AI Visibility for E-commerce", path: "/industries/ecommerce" },
              { title: "AI Ads vs Google Shopping", path: "/compare/ai-visibility-vs-google-shopping" },
              { title: "AI Ads vs Meta Ads", path: "/compare/ai-visibility-vs-meta-ads-ecommerce" },
              { title: "AI Visibility Research", path: "/research" },
              { title: "Best Shopify AI Tools", path: "/best/shopify-ai-visibility-apps" },
              { title: "Free AI Visibility Audit", path: "/tools/free-audit" },
              { title: "AI Visibility Glossary", path: "/glossary" },
              { title: "Pricing", path: "/pricing" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="px-4 py-2 border border-[#333] text-sm text-[#888] hover:border-[#10b981] hover:text-[#10b981] transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              FREQUENTLY ASKED QUESTIONS
            </div>
          </div>
          <div className="p-8 md:p-12 max-w-3xl space-y-8">
            {pillarFAQs.map((faq, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                <p className="text-[#888] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 md:p-16 text-center">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to get your Shopify store recommended by AI?
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            See how your store appears across ChatGPT, Claude, Perplexity, and more with a free AI visibility audit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/free-audit" className="cta-btn cta-btn-primary">
              Get Your Free Audit
            </Link>
            <Link href="/contact" className="cta-btn">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
