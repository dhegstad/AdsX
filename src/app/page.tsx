import Link from "next/link";
import { createFAQSchema, SchemaScript } from "@/lib/seo/schemas";
import { MobileMenuButton } from "@/components/home/mobile-menu";
import { ParallaxHero } from "@/components/home/parallax-hero";
import { AffiliateCTA } from "@/components/blog/affiliate-cta";
import styles from "./home.module.css";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "BLOG", href: "/blog" },
  { label: "START A STORE", href: "/start-a-shopify-store" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

const footerLinks = {
  start: [
    { label: "Start a Shopify Store", href: "/start-a-shopify-store" },
    { label: "Free Trial + $1/mo Deal", href: "/shopify-free-trial-deal" },
    { label: "Is Shopify Right for You?", href: "/is-shopify-right-for-you" },
  ],
  learn: [
    { label: "All Guides", href: "/blog" },
    { label: "Best Of", href: "/best" },
    { label: "Integrations", href: "/integrations" },
  ],
  tools: [
    { label: "ROAS Calculator", href: "/tools/roas-calculator" },
    { label: "Feed Readiness Checker", href: "/tools/feed-readiness-checker" },
    { label: "Free Audit", href: "/tools/free-audit" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

// The three conversion hubs, front and center.
const hubs = [
  {
    idx: "01. START",
    name: "Start a Shopify Store",
    desc: "What you actually need, the five steps to launch, which plan to pick, and the four first-hour setups that matter.",
    href: "/start-a-shopify-store",
  },
  {
    idx: "02. SAVE",
    name: "Free Trial + $1/mo Deal",
    desc: "Build free with no credit card, then pay $1/month for your first three months. What's included and how to activate it.",
    href: "/shopify-free-trial-deal",
  },
  {
    idx: "03. DECIDE",
    name: "Is Shopify Right for You?",
    desc: "An honest fit guide — who Shopify is best for, who should look elsewhere, and a 60-second decision checklist.",
    href: "/is-shopify-right-for-you",
  },
];

// What the library covers — each pillar links into the relevant content.
const pillars = [
  {
    idx: "GUIDES",
    name: "Starting a Store",
    desc: "Signup walkthroughs, the free trial, first-store setup — domain, payments, theme, first product.",
    href: "/start-a-shopify-store",
  },
  {
    idx: "MONEY",
    name: "Plans & Costs",
    desc: "Basic vs Grow vs Advanced, real cost breakdowns, payment fees, and the hidden costs to avoid.",
    href: "/is-shopify-right-for-you",
  },
  {
    idx: "NICHES",
    name: "Selling Your Product",
    desc: "Practical “can I sell X on Shopify” guides with fee math and category-specific tactics.",
    href: "/blog",
  },
  {
    idx: "DEV",
    name: "Shopify for Developers",
    desc: "The Admin & Storefront GraphQL APIs, the Product Catalog and Feed APIs, bulk operations, and metafields.",
    href: "/blog/shopify-product-catalog-api-guide",
  },
  {
    idx: "AI",
    name: "AI & Agentic Commerce",
    desc: "Get your store recommended by ChatGPT, Claude, and Perplexity — agentic checkout and AI-readable product data.",
    href: "/blog/agentic-checkout-optimization-shopify",
  },
  {
    idx: "TOOLS",
    name: "Free Tools",
    desc: "A ROAS calculator and a product-feed readiness checker to sanity-check your store's ad economics and data.",
    href: "/tools/roas-calculator",
  },
];

const stats = [
  { label: "TO START", value: "$0" },
  { label: "FIRST 3 MONTHS", value: "$1/mo" },
  { label: "TO LAUNCH", value: "~1 HR" },
];

// Homepage FAQ — rendered visibly below AND used to generate the FAQPage schema
// from a single source of truth (keeps structured data valid).
const homeFaqs = [
  {
    question: "Do I need a credit card to start a Shopify store?",
    answer:
      "No. As of 2026, Shopify's free trial requires only an email address (or a Google, Apple, or passkey login). You add billing details later, when you choose a paid plan to keep the store running after the trial.",
  },
  {
    question: "How much does Shopify cost?",
    answer:
      "New stores typically get $1/month for their first 3 months on Basic, Grow, or Advanced. After that, Basic is $39/month, Grow is $105/month, and Advanced is $399/month, plus card processing starting at 2.9% + 30¢ online on Basic.",
  },
  {
    question: "How long does it take to launch a store?",
    answer:
      "Signup takes about two minutes. Budget roughly an hour for the four setups that make a store real: your domain, Shopify Payments, one product, and a free theme. Everything else can wait.",
  },
  {
    question: "Is Shopify right for me?",
    answer:
      "Shopify fits most people who want their own branded store (not just a marketplace listing), sell physical or digital products, and want to be discoverable across Google, Meta, and AI shopping agents. See our decision guide for the full fit test.",
  },
  {
    question: "Can I sell my specific product on Shopify?",
    answer:
      "Almost certainly. Shopify handles physical, digital, and service products across nearly every category. Our blog has practical, product-specific guides with fee math and category tactics for dozens of niches.",
  },
  {
    question: "Is AdsX affiliated with Shopify?",
    answer:
      "AdsX is an independent resource, not Shopify. We participate in Shopify's official affiliate program, so some links to Shopify are affiliate links — at no extra cost to you.",
  },
];

export default function HomePage() {
  return (
    <>
      <SchemaScript schema={createFAQSchema(homeFaqs)} />

      <div className={`${styles.vPage} min-h-screen bg-[#080808] text-[#EAEAEA]`} style={{ fontFamily: "var(--font-body)" }}>
        <div className={styles.noiseOverlay} />

        <div className="w-full min-h-screen flex flex-col max-w-[1600px] mx-auto p-3">
          <div className="border border-[#333] bg-[#0a0a0a] flex-grow flex flex-col">

            {/* Header */}
            <header className="relative border-b border-[#333] h-[60px] flex justify-between items-center px-4 md:px-6">
              <Link href="/" className="text-2xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                ADSX
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-[12px] tracking-widest text-[#888] hover:text-[#EAEAEA] transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex gap-3 items-center">
                <div
                  className="hidden sm:block border border-[#EAEAEA] bg-[#EAEAEA] text-[#080808] px-2 py-1 text-[10px] font-bold"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  SHOPIFY RESOURCE
                </div>

                <MobileMenuButton />
              </div>
            </header>

            {/* Hero Section */}
            <ParallaxHero />

            {/* Title Strip */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] border-b border-[#333]">
              <div
                className="p-5 lg:border-r border-[#333] uppercase"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 4vw, 56px)",
                  lineHeight: 0.95,
                  letterSpacing: "-2px"
                }}
              >
                <h1 className="contents">Start a store<br />on Shopify</h1>
              </div>
              <div
                className="p-5 flex flex-col justify-center bg-[#111] text-[#888]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="mb-3 last:mb-0">
                    <strong className="text-[#EAEAEA] text-sm block mb-1">{stat.label}</strong>
                    <span className="text-[#10b981] text-xl font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Start Here — the three hubs */}
            <div className="border-b border-[#333] p-5">
              <div
                className="text-[10px] text-[#888] uppercase tracking-widest"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                START HERE
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#333]">
              {hubs.map((hub, i) => (
                <Link
                  key={hub.href}
                  href={hub.href}
                  className={`${styles.serviceItem} p-6 flex flex-col border-b md:border-b-0 border-[#333] ${i < 2 ? "md:border-r" : ""}`}
                >
                  <span
                    className="idx text-xs text-[#888] mb-3 block"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {hub.idx}
                  </span>
                  <div
                    className="text-xl uppercase mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {hub.name}
                  </div>
                  <div className="desc text-base text-[#888]">{hub.desc}</div>
                  <span
                    className="mt-4 text-xs tracking-widest text-[#10b981]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    OPEN →
                  </span>
                </Link>
              ))}
            </div>

            {/* Primary offer CTA */}
            <div className="border-b border-[#333] p-6 md:p-10">
              <AffiliateCTA slug="home" placement="cta-top" />
            </div>

            {/* What you'll find */}
            <div className="border-b border-[#333] p-5">
              <div
                className="text-[10px] text-[#888] uppercase tracking-widest"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                WHAT YOU&apos;LL FIND HERE
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-b border-[#333]">
              {pillars.map((pillar) => (
                <Link
                  key={pillar.name}
                  href={pillar.href}
                  className={`${styles.serviceItem} border-r border-b border-[#333] p-5 flex flex-col`}
                >
                  <span
                    className="idx text-xs text-[#888] mb-3 block"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {pillar.idx}
                  </span>
                  <div
                    className="text-xl uppercase mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {pillar.name}
                  </div>
                  <div className="desc text-base text-[#888] max-w-[90%]">
                    {pillar.desc}
                  </div>
                </Link>
              ))}
            </div>

            {/* Get found across AI shopping assistants */}
            <div className="border-b border-[#333] p-6">
              <div
                className="text-[10px] text-[#888] mb-4 uppercase tracking-widest"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Get your store recommended across
              </div>
              <div className="flex flex-wrap gap-4">
                {["ChatGPT", "Claude", "Perplexity", "Gemini", "Google AI"].map((platform) => (
                  <div
                    key={platform}
                    className="border border-[#EAEAEA] px-4 py-2 text-xs flex items-center gap-2"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    <div className="w-2 h-2 bg-[#10b981]" />
                    {platform.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="border-b border-[#333] p-8 md:p-12 bg-[#080808]">
              <h2
                className="text-2xl md:text-3xl uppercase mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Frequently asked questions
              </h2>
              <div className="max-w-3xl mx-auto divide-y divide-[#222]">
                {homeFaqs.map((faq) => (
                  <div key={faq.question} className="py-5">
                    <h3 className="text-base md:text-lg mb-2 text-[#EAEAEA]">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-[#888] leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <div className="border-b border-[#333] p-6 md:p-10">
              <AffiliateCTA slug="home" placement="cta-footer" />
            </div>

            {/* Footer */}
            <footer className="bg-[#050505] border-t border-[#333]">
              {/* Main Footer Content */}
              <div className="p-6 md:p-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {/* Brand Column */}
                <div className="col-span-2 md:col-span-3 lg:col-span-1">
                  <Link
                    href="/"
                    className="text-2xl tracking-tight inline-block mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    ADSX
                  </Link>
                  <p className="text-sm text-[#888] mb-6">
                    Guides and tools for starting and growing your store on Shopify.
                  </p>
                  <div
                    className="border border-[#EAEAEA] p-2 w-fit text-[10px] leading-tight"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    START YOUR STORE ON SHOPIFY
                  </div>
                </div>

                {/* Start Links */}
                <div>
                  <div
                    className="text-xs tracking-widest text-[#10b981] mb-4"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    START
                  </div>
                  <ul className="space-y-3">
                    {footerLinks.start.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-[#888] hover:text-[#EAEAEA] transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learn Links */}
                <div>
                  <div
                    className="text-xs tracking-widest text-[#10b981] mb-4"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    LEARN
                  </div>
                  <ul className="space-y-3">
                    {footerLinks.learn.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-[#888] hover:text-[#EAEAEA] transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools Links */}
                <div>
                  <div
                    className="text-xs tracking-widest text-[#10b981] mb-4"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    TOOLS
                  </div>
                  <ul className="space-y-3">
                    {footerLinks.tools.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-[#888] hover:text-[#EAEAEA] transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company Links */}
                <div>
                  <div
                    className="text-xs tracking-widest text-[#10b981] mb-4"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    COMPANY
                  </div>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-[#888] hover:text-[#EAEAEA] transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    {footerLinks.legal.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-[#888] hover:text-[#EAEAEA] transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="px-6 md:px-10 py-4 border-t border-[#222] flex flex-col sm:flex-row justify-between items-center gap-4">
                <div
                  className="text-xs text-[#888]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  &copy; {new Date().getFullYear()} ADSX. All rights reserved. Shopify links may be affiliate links.
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href="https://x.com/adsxcom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#888] hover:text-[#EAEAEA] transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    X/TWITTER
                  </a>
                  <a
                    href="https://linkedin.com/company/adsx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#888] hover:text-[#EAEAEA] transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    LINKEDIN
                  </a>
                  <a
                    href="mailto:hello@adsx.com"
                    className="text-xs text-[#888] hover:text-[#EAEAEA] transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    EMAIL
                  </a>
                </div>
              </div>
            </footer>

          </div>
        </div>
      </div>
    </>
  );
}
