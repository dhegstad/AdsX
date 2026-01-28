"use client";

import Link from "next/link";
import { ArrowRight, Zap, Target, TrendingUp, MessageSquare, BarChart3, Shield, Search, Sparkles, Rocket, LineChart, Quote } from "lucide-react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { MatrixRain } from "@/components/marketing/matrix-rain";
import { AiVisibilityDemo } from "@/components/marketing/ai-visibility-demo";
import { ChatGptAdMock } from "@/components/marketing/chatgpt-ad-mock";
import { AnimatedStats } from "@/components/marketing/animated-stats";
import { FaqSection } from "@/components/marketing/faq-section";
import { OpenAIIcon, ClaudeIcon, PerplexityIcon, GeminiIcon, GrokIcon } from "@/components/marketing/platform-icons";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

const clients = [
  { name: "Nexus", logo: "◈" },
  { name: "Vertex", logo: "△" },
  { name: "Prism", logo: "◇" },
  { name: "Helix", logo: "⬡" },
  { name: "Quantum", logo: "◎" },
  { name: "Apex", logo: "▲" },
];

const platforms = [
  { name: "ChatGPT", icon: OpenAIIcon },
  { name: "Perplexity", icon: PerplexityIcon },
  { name: "Claude", icon: ClaudeIcon },
  { name: "Gemini", icon: GeminiIcon },
  { name: "Grok", icon: GrokIcon },
];

const stats = [
  { value: "340%", label: "Avg. increase in AI mentions" },
  { value: "$47M", label: "Revenue attributed to AI search" },
  { value: "52", label: "Brands launched in AI search" },
  { value: "4.2x", label: "Average ROI for clients" },
];

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Audit",
    description: "We analyze your current AI visibility across all major platforms and identify gaps in your competitive landscape.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Strategy",
    description: "We build a custom playbook combining sponsored placements, content optimization, and brand positioning tactics.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Launch",
    description: "We execute campaigns across ChatGPT, Perplexity, and emerging AI platforms with real-time optimization.",
  },
  {
    icon: LineChart,
    number: "04",
    title: "Scale",
    description: "We continuously monitor, iterate, and expand your AI presence as new platforms and opportunities emerge.",
  },
];

const services = [
  {
    icon: Target,
    title: "AI Search Strategy",
    description: "Audit your brand's visibility across ChatGPT, Perplexity, and emerging AI platforms. Identify gaps and build a capture plan.",
  },
  {
    icon: MessageSquare,
    title: "ChatGPT Ads",
    description: "Early access to ChatGPT's new ad platform. Sponsored placements, conversational ads, and brand chat integrations.",
  },
  {
    icon: Zap,
    title: "Content Optimization",
    description: "Structure your content to be surfaced by LLMs. Get recommended when users ask AI for solutions in your category.",
  },
  {
    icon: BarChart3,
    title: "Visibility Tracking",
    description: "Monitor your brand mentions across AI platforms. Track share of voice, sentiment, and competitive positioning.",
  },
  {
    icon: Shield,
    title: "Brand Protection",
    description: "Ensure accurate representation in AI responses. Correct misinformation and protect your brand narrative.",
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description: "Measure ROI from AI search channels. Custom dashboards tracking traffic, leads, and revenue attribution.",
  },
];

export default function HomePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDark ? "bg-black text-white" : "bg-white text-neutral-900"
    )}>
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Grid graph background */}
        <div className="absolute inset-0 grid-pattern" />

        {/* Matrix rain effect */}
        <MatrixRain />

        {/* Gradient overlay */}
        <div className={cn(
          "absolute inset-0",
          isDark
            ? "bg-gradient-to-b from-black/30 via-black/60 to-black"
            : "bg-gradient-to-b from-white/30 via-white/50 to-white/90"
        )} style={{ zIndex: 2 }} />

        <div className="relative mx-auto max-w-5xl px-6 py-16 text-center lg:px-8" style={{ zIndex: 10 }}>
          {/* Announcement badge */}
          <div className={cn(
            "mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm",
            isDark
              ? "border-emerald-500/30 bg-emerald-500/10"
              : "border-emerald-500/30 bg-emerald-500/10"
          )}>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={cn(
              "font-medium",
              isDark ? "text-emerald-400" : "text-emerald-600"
            )}>Limited spots available — book your audit</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Advertising for the
            <br />
            <span className="gradient-text">AI Search Era</span>
          </h1>

          {/* Subheadline */}
          <p className={cn(
            "mx-auto mt-8 max-w-2xl text-lg sm:text-xl",
            isDark ? "text-white/60" : "text-neutral-600"
          )}>
            Your customers are asking ChatGPT for recommendations. We help you show up in the answer—through sponsored placements, content optimization, and AI-native strategies.
          </p>

          {/* CTAs */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className={cn(
                "group flex items-center gap-2 rounded-lg px-8 py-4 text-base font-medium transition-all",
                isDark
                  ? "bg-emerald-500 text-black hover:bg-emerald-400"
                  : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25"
              )}
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/case-studies"
              className={cn(
                "flex items-center gap-2 rounded-lg border px-8 py-4 text-base font-medium transition-all",
                isDark
                  ? "border-white/20 hover:bg-white/5 hover:border-white/30"
                  : "border-neutral-300 bg-white hover:bg-neutral-50 hover:border-neutral-400"
              )}
            >
              See Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className={cn(
        "border-t py-16",
        isDark ? "border-white/10" : "border-neutral-200 bg-neutral-50"
      )}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className={cn(
            "text-center text-sm uppercase tracking-wider",
            isDark ? "text-white/40" : "text-neutral-500"
          )}>
            We optimize for all major AI platforms
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {platforms.map((platform) => (
              <div key={platform.name} className={cn(
                "flex items-center gap-3 transition-colors",
                isDark
                  ? "text-white/50 hover:text-white/70"
                  : "text-neutral-600 hover:text-neutral-900"
              )}>
                <platform.icon className={cn(
                  "h-6 w-6",
                  isDark ? "text-emerald-500" : "text-emerald-600"
                )} />
                <span className="text-lg font-medium">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={cn(
        "border-t py-24",
        isDark ? "border-white/10" : "border-neutral-200"
      )}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How It Works
            </h2>
            <p className={cn(
              "mt-4 text-lg",
              isDark ? "text-white/60" : "text-neutral-600"
            )}>
              A proven process to capture the AI search channel
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-[2px] bg-gradient-to-r from-emerald-500/50 to-transparent -translate-x-4" />
                )}
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-2xl border",
                    isDark
                      ? "bg-emerald-500/10 border-emerald-500/20"
                      : "bg-emerald-500/10 border-emerald-500/20"
                  )}>
                    <step.icon className={cn(
                      "h-7 w-7",
                      isDark ? "text-emerald-500" : "text-emerald-600"
                    )} />
                  </div>
                  <div className={cn(
                    "mt-4 text-xs font-medium tracking-wider",
                    isDark ? "text-emerald-500/70" : "text-emerald-600"
                  )}>{step.number}</div>
                  <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                  <p className={cn(
                    "mt-2 text-sm",
                    isDark ? "text-white/60" : "text-neutral-600"
                  )}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className={cn(
        "border-t py-24",
        isDark ? "border-white/10" : "border-neutral-200 bg-neutral-50"
      )}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The Visibility Gap
            </h2>
            <p className={cn(
              "mt-4 text-lg",
              isDark ? "text-white/60" : "text-neutral-600"
            )}>
              See what happens when AI users ask about your category
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Before */}
            <div className={cn(
              "rounded-2xl border p-6 lg:p-8",
              isDark
                ? "border-red-500/20 bg-red-500/5"
                : "border-red-200 bg-red-50"
            )}>
              <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Without AI Optimization
              </div>
              <div className="mt-6 space-y-4">
                <div className={cn(
                  "rounded-xl p-4",
                  isDark ? "bg-white/5" : "bg-white border border-neutral-200"
                )}>
                  <p className={cn(
                    "text-sm italic",
                    isDark ? "text-white/50" : "text-neutral-500"
                  )}>&quot;What&apos;s the best CRM for startups?&quot;</p>
                </div>
                <div className={cn(
                  "rounded-xl p-4",
                  isDark ? "bg-white/5" : "bg-white border border-neutral-200"
                )}>
                  <p className={cn(
                    "text-sm",
                    isDark ? "text-white/70" : "text-neutral-700"
                  )}>Here are some popular options:</p>
                  <ul className={cn(
                    "mt-2 space-y-1 text-sm",
                    isDark ? "text-white/50" : "text-neutral-500"
                  )}>
                    <li>• HubSpot - Great free tier</li>
                    <li>• Salesforce - Enterprise standard</li>
                    <li>• Pipedrive - Sales-focused</li>
                  </ul>
                  <p className="mt-3 text-xs text-red-500">Your brand: Not mentioned</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className={isDark ? "text-white/40" : "text-neutral-500"}>AI Visibility Score</span>
                <span className="text-red-400 font-medium">12%</span>
              </div>
              <div className={cn(
                "mt-2 h-2 rounded-full",
                isDark ? "bg-white/10" : "bg-neutral-200"
              )}>
                <div className="h-full w-[12%] rounded-full bg-red-400" />
              </div>
            </div>

            {/* After */}
            <div className={cn(
              "rounded-2xl border p-6 lg:p-8",
              isDark
                ? "border-emerald-500/20 bg-emerald-500/5"
                : "border-emerald-200 bg-emerald-50"
            )}>
              <div className={cn(
                "flex items-center gap-2 text-sm font-medium",
                isDark ? "text-emerald-400" : "text-emerald-600"
              )}>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                With AdsX Optimization
              </div>
              <div className="mt-6 space-y-4">
                <div className={cn(
                  "rounded-xl p-4",
                  isDark ? "bg-white/5" : "bg-white border border-neutral-200"
                )}>
                  <p className={cn(
                    "text-sm italic",
                    isDark ? "text-white/50" : "text-neutral-500"
                  )}>&quot;What&apos;s the best CRM for startups?&quot;</p>
                </div>
                <div className={cn(
                  "rounded-xl p-4",
                  isDark ? "bg-white/5" : "bg-white border border-neutral-200"
                )}>
                  <p className={cn(
                    "text-sm",
                    isDark ? "text-white/70" : "text-neutral-700"
                  )}>Here are some popular options:</p>
                  <ul className={cn(
                    "mt-2 space-y-1 text-sm",
                    isDark ? "text-white/50" : "text-neutral-500"
                  )}>
                    <li>• <strong className={isDark ? "text-emerald-400" : "text-emerald-600"}>Your Brand</strong> - Built for modern startups</li>
                    <li>• HubSpot - Great free tier</li>
                    <li>• Pipedrive - Sales-focused</li>
                  </ul>
                  <p className={cn(
                    "mt-3 text-xs",
                    isDark ? "text-emerald-400/80" : "text-emerald-600"
                  )}>Your brand: Recommended first</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className={isDark ? "text-white/40" : "text-neutral-500"}>AI Visibility Score</span>
                <span className={isDark ? "text-emerald-400" : "text-emerald-600"} >84%</span>
              </div>
              <div className={cn(
                "mt-2 h-2 rounded-full",
                isDark ? "bg-white/10" : "bg-neutral-200"
              )}>
                <div className="h-full w-[84%] rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Visibility Demo */}
      <section className={cn(
        "border-t py-24",
        isDark ? "border-white/10" : "border-neutral-200"
      )}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Track Your AI Visibility
            </h2>
            <p className={cn(
              "mt-4 text-lg",
              isDark ? "text-white/60" : "text-neutral-600"
            )}>
              See how your brand appears across AI platforms in real-time
            </p>
          </div>
          <div className="mt-12">
            <AiVisibilityDemo />
          </div>

          {/* Animated Stats */}
          <div className="mt-16">
            <AnimatedStats stats={stats} />
          </div>
        </div>
      </section>

      {/* The Shift + ChatGPT Ad Mock */}
      <section className={cn(
        "border-t py-24",
        isDark ? "border-white/10" : "border-neutral-200 bg-neutral-50"
      )}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Search is being rebuilt.
                <br />
                <span className={isDark ? "text-white/60" : "text-neutral-500"}>Your ads strategy should be too.</span>
              </h2>
              <p className={cn(
                "mt-6 text-lg",
                isDark ? "text-white/60" : "text-neutral-600"
              )}>
                ChatGPT now has sponsored placements. Perplexity is testing ads. AI assistants are becoming the primary way people discover products and make decisions.
              </p>
              <p className={cn(
                "mt-4 text-lg",
                isDark ? "text-white/60" : "text-neutral-600"
              )}>
                The brands that establish presence now will have compounding advantages for years. We help you capture this channel before your competitors do.
              </p>
              <div className="mt-8">
                <Link
                  href="/services"
                  className={cn(
                    "inline-flex items-center gap-2 font-medium transition-colors",
                    isDark
                      ? "text-emerald-400 hover:text-emerald-300"
                      : "text-emerald-600 hover:text-emerald-700"
                  )}
                >
                  Learn about our approach
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div>
              <ChatGptAdMock />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className={cn(
        "border-t py-24",
        isDark ? "border-white/10" : "border-neutral-200"
      )}>
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="relative">
            <Quote className={cn(
              "absolute -top-4 -left-4 h-16 w-16",
              isDark ? "text-emerald-500/10" : "text-emerald-500/20"
            )} />
            <blockquote className="relative">
              <p className={cn(
                "text-2xl font-medium leading-relaxed sm:text-3xl",
                isDark ? "text-white/90" : "text-neutral-800"
              )}>
                &quot;AdsX helped us go from invisible to the #1 recommended solution in our category across ChatGPT and Perplexity. Our inbound leads from AI referrals increased 340% in four months.&quot;
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <span className={isDark ? "text-black font-bold" : "text-white font-bold"}>JM</span>
                </div>
                <div>
                  <div className="font-medium">Jordan Mitchell</div>
                  <div className={cn(
                    "text-sm",
                    isDark ? "text-white/50" : "text-neutral-500"
                  )}>VP Marketing, Nexus</div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className={cn(
        "border-t py-12",
        isDark ? "border-white/10" : "border-neutral-200 bg-neutral-50"
      )}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className={cn(
            "text-center text-sm uppercase tracking-wider",
            isDark ? "text-white/40" : "text-neutral-500"
          )}>
            Trusted by growth teams at
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {clients.map((client) => (
              <div key={client.name} className={cn(
                "flex items-center gap-2 transition-colors",
                isDark
                  ? "text-white/30 hover:text-white/50"
                  : "text-neutral-400 hover:text-neutral-600"
              )}>
                <span className="text-2xl">{client.logo}</span>
                <span className="text-lg font-medium tracking-wide">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className={cn(
        "border-t py-24",
        isDark ? "border-white/10" : "border-neutral-200"
      )}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What We Build
            </h2>
            <p className={cn(
              "mt-4 text-lg",
              isDark ? "text-white/60" : "text-neutral-600"
            )}>
              Full-stack AI search advertising for growth-focused brands
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className={cn(
                  "group rounded-xl border p-6 transition-all",
                  isDark
                    ? "border-white/10 bg-white/[0.02] hover:border-emerald-500/30 hover:bg-white/[0.04]"
                    : "border-neutral-200 bg-white hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5"
                )}
              >
                <service.icon className={cn(
                  "h-8 w-8",
                  isDark ? "text-emerald-500/70" : "text-emerald-600"
                )} />
                <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
                <p className={cn(
                  "mt-2 text-sm",
                  isDark ? "text-white/60" : "text-neutral-600"
                )}>{service.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className={cn(
                "inline-flex items-center gap-2 transition-colors",
                isDark
                  ? "text-emerald-400 hover:text-emerald-300"
                  : "text-emerald-600 hover:text-emerald-700"
              )}
            >
              View all capabilities
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={cn(
        "border-t py-24",
        isDark ? "border-white/10" : "border-neutral-200 bg-neutral-50"
      )}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className={cn(
              "mt-4 text-lg",
              isDark ? "text-white/60" : "text-neutral-600"
            )}>
              Everything you need to know about AI search advertising
            </p>
          </div>
          <div className="mt-12">
            <FaqSection />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={cn(
        "border-t py-24",
        isDark ? "border-white/10" : "border-neutral-200"
      )}>
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            First mover advantage is real.
          </h2>
          <p className={cn(
            "mt-6 text-lg",
            isDark ? "text-white/60" : "text-neutral-600"
          )}>
            Get a free audit of your brand&apos;s current AI search visibility and a roadmap for capturing this emerging channel.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-medium transition-all",
                isDark
                  ? "bg-emerald-500 text-black hover:bg-emerald-400"
                  : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25"
              )}
            >
              Get Your Free Audit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
