import Link from "next/link";
import { createFAQSchema, SchemaScript } from "@/lib/seo/schemas";
import { MobileMenuButton } from "@/components/home/mobile-menu";
import { ParallaxHero } from "@/components/home/parallax-hero";
import styles from "./home.module.css";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "BLOG", href: "/blog" },
  { label: "ABOUT", href: "/about" },
  { label: "PRICING", href: "/pricing" },
  { label: "CONTACT", href: "/contact" },
];

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
  resources: [
    { label: "Free Audit", href: "/tools/free-audit" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Services", href: "/services" },
  ],
  agency: [
    { label: "Shopify AI Ads Agency", href: "/shopify-ai-ads-agency" },
    { label: "Shopify Paid Ads Agency", href: "/shopify-paid-ads-agency" },
    { label: "ChatGPT Ads Agency", href: "/chatgpt-ads-agency" },
    { label: "DTC AI Ads Agency", href: "/dtc-ai-ads-agency" },
  ],
  explore: [
    { label: "Integrations", href: "/integrations" },
    { label: "Best Of", href: "/best" },
    { label: "ROAS Calculator", href: "/tools/roas-calculator" },
    { label: "Feed Readiness Checker", href: "/tools/feed-readiness-checker" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const services = [
  {
    idx: "01. AUDIT",
    name: "Visibility Scan",
    desc: "See exactly how ChatGPT, Claude, and Perplexity describe your brand today.",
  },
  {
    idx: "02. OPTIMIZE",
    name: "Content Engineering",
    desc: "Restructure your content so AI systems understand and recommend you.",
  },
  {
    idx: "03. AMPLIFY",
    name: "Third-Party Signals",
    desc: "Build the external citations and authority that AI trusts.",
  },
  {
    idx: "04. TRACK",
    name: "Live Monitoring",
    desc: "Real-time alerts when AI mentions change. Know before your competitors do.",
  },
  {
    idx: "05. COMPARE",
    name: "Share of Voice",
    desc: "Track how often AI recommends you vs. competitors in your category.",
  },
  {
    idx: "06. SCALE",
    name: "Full Protocol",
    desc: "End-to-end AI visibility management. Strategy, execution, and ongoing optimization.",
    cta: true,
  },
];

const stats = [
  { label: "AI QUERIES/DAY", value: "2.5B+" },
  { label: "PLATFORMS", value: "5" },
  { label: "ZERO-CLICK", value: "60%" },
];

// Homepage FAQ — rendered visibly below AND used to generate the FAQPage schema
// from a single source of truth (keeps structured data valid).
const homeFaqs = [
  {
    question: "How long until we see results?",
    answer:
      "Most clients see measurable improvements in AI visibility within 4-6 weeks. Sponsored placements can drive traffic immediately, while organic AI optimization compounds over time as models update their training data.",
  },
  {
    question: "What's the minimum engagement?",
    answer:
      "We require a 3-month minimum to give our strategies time to take effect. After that, you can continue month-to-month with 30 days notice to cancel.",
  },
  {
    question: "Do you guarantee placements in ChatGPT responses?",
    answer:
      "We can guarantee sponsored ad placements through official channels. For organic mentions, we optimize your content and digital presence to maximize the likelihood of being recommended, but no one can guarantee specific AI outputs.",
  },
  {
    question: "How do you measure AI visibility?",
    answer:
      "We use proprietary monitoring tools that query AI platforms thousands of times daily across relevant prompts in your category. We track mention frequency, sentiment, positioning, and competitive share of voice.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We work primarily with B2B SaaS, fintech, e-commerce, and professional services. Any brand where customers research solutions through AI assistants is a good fit.",
  },
  {
    question: "How is this different from traditional SEO?",
    answer:
      "Traditional SEO optimizes for search engine crawlers and ranking algorithms. AI optimization focuses on how LLMs understand, categorize, and recommend your brand. The tactics overlap but the strategies are fundamentally different.",
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
                  SYS: ONLINE
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
                <h1 className="contents">Get recommended<br />by AI platforms</h1>
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

            {/* Problem/Value Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#333]">
              <div className="p-6 lg:p-10 lg:border-r border-[#333]">
                <div
                  className="text-[10px] text-[#10b981] mb-4 uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  STATUS: CRITICAL
                </div>
                <h2
                  className="text-2xl md:text-3xl uppercase mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  The new search is here
                </h2>
                <p className="text-[#888] text-base mb-4">
                  800M+ users now ask AI for product recommendations instead of Googling.
                  ChatGPT, Claude, and Perplexity are the new gatekeepers.
                </p>
                <p className="text-[#888] text-base">
                  <span className="text-[#EAEAEA]">The problem:</span> Ranking #1 on Google doesn&apos;t mean AI will recommend you.
                  Fewer than 10% of AI-cited sources rank in Google&apos;s top 10.
                </p>
              </div>
              <div className="p-6 lg:p-10 bg-[#0c0c0c] flex flex-col justify-center">
                <div
                  className="text-[10px] text-[#10b981] mb-4 uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  DIAGNOSTIC AVAILABLE
                </div>
                <h3
                  className="text-xl md:text-2xl uppercase mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Check your visibility
                </h3>
                <p className="text-[#888] text-base mb-6">
                  Run a free audit to see how ChatGPT and Claude currently describe your brand.
                  Real queries. Real answers. 30 seconds.
                </p>
                <Link href="/tools/free-audit" className={styles.ctaBtn}>
                  Run Free Audit →
                </Link>
              </div>
            </div>

            {/* Services Header */}
            <div className="border-b border-[#333] p-5">
              <div
                className="text-[10px] text-[#888] uppercase tracking-widest"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                SERVICE MODULES
              </div>
            </div>

            {/* Data Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] min-h-[400px] border-b border-[#333]">

              {/* Left Column */}
              <div className="hidden lg:flex border-r border-[#333] p-6 flex-col justify-between relative">
                <div
                  className="text-[#888] text-lg"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  v2.0
                </div>

                <div className={`${styles.globeIcon} absolute bottom-10 left-10 z-10`}>
                  <div className={styles.globeGrid} />
                </div>

                <div className={styles.outlineNumber}>AI</div>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <div
                    key={service.idx}
                    className={`${styles.serviceItem} border-r border-b border-[#333] p-5 flex flex-col`}
                  >
                    <span
                      className="idx text-xs text-[#888] mb-3 block"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {service.idx}
                    </span>
                    <div
                      className="text-xl uppercase mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {service.name}
                    </div>
                    <div className="desc text-base text-[#888] max-w-[90%]">
                      {service.desc}
                    </div>
                    {service.cta && (
                      <Link href="/contact" className={styles.ctaBtn}>
                        Start Project
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Process Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#333]">
              {[
                { step: "01", title: "SCAN", desc: "We audit how AI platforms currently see your brand" },
                { step: "02", title: "OPTIMIZE", desc: "Restructure content and build authority signals" },
                { step: "03", title: "MONITOR", desc: "Track visibility and outpace competitors" },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className={`p-6 ${i < 2 ? "md:border-r" : ""} border-b md:border-b-0 border-[#333]`}
                >
                  <div
                    className="text-[#10b981] text-xs mb-2"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    STEP {item.step}
                  </div>
                  <div
                    className="text-xl uppercase mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </div>
                  <p className="text-[#888] text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Platform Strip */}
            <div className="border-b border-[#333] p-6">
              <div
                className="text-[10px] text-[#888] mb-4 uppercase tracking-widest"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Target Platforms
              </div>
              <div className="flex flex-wrap gap-4">
                {["ChatGPT", "Claude", "Perplexity", "Gemini", "Grok"].map((platform) => (
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
            <div className="border-b border-[#333] p-8 md:p-12 text-center bg-[#0c0c0c]">
              <h2
                className="text-2xl md:text-3xl uppercase mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Initialize visibility scan
              </h2>
              <p className="text-[#888] max-w-lg mx-auto mb-6">
                Find out if AI is recommending your brand—or sending customers to competitors.
              </p>
              <Link href="/tools/free-audit" className={styles.ctaBtn}>
                Run Free Audit →
              </Link>
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
                    AI search advertising for forward-thinking brands.
                  </p>
                  <div
                    className="border border-[#EAEAEA] p-2 w-fit text-[10px] leading-tight"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    AI SEARCH IS THE NEW FRONTIER
                  </div>
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
                  </ul>
                </div>

                {/* Resources Links */}
                <div>
                  <div
                    className="text-xs tracking-widest text-[#10b981] mb-4"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    RESOURCES
                  </div>
                  <ul className="space-y-3">
                    {footerLinks.resources.map((link) => (
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

                {/* Industries Links */}
                <div>
                  <div
                    className="text-xs tracking-widest text-[#10b981] mb-4"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    AGENCY
                  </div>
                  <ul className="space-y-3">
                    {footerLinks.agency.map((link) => (
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

                {/* Explore Links */}
                <div>
                  <div
                    className="text-xs tracking-widest text-[#10b981] mb-4"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    EXPLORE
                  </div>
                  <ul className="space-y-3">
                    {footerLinks.explore.map((link) => (
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

                {/* Legal Links */}
                <div>
                  <div
                    className="text-xs tracking-widest text-[#10b981] mb-4"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    LEGAL
                  </div>
                  <ul className="space-y-3">
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
                  &copy; {new Date().getFullYear()} ADSX. All rights reserved.
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href="https://twitter.com/adsx"
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
