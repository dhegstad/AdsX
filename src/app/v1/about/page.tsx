"use client";

import Link from "next/link";
import { V1Layout } from "@/components/v1/v1-layout";

const values = [
  {
    idx: "01",
    title: "First-Mover Wins",
    desc: "The brands that establish AI search presence now will have compounding advantages for years.",
  },
  {
    idx: "02",
    title: "Quality Over Hacks",
    desc: "We don't chase shortcuts. We build sustainable visibility through genuine value.",
  },
  {
    idx: "03",
    title: "Transparency Always",
    desc: "You'll always know what we're doing, why we're doing it, and how it's performing.",
  },
  {
    idx: "04",
    title: "Results Matter",
    desc: "Visibility is a means to an end. We measure success by business outcomes.",
  },
  {
    idx: "05",
    title: "Stay Curious",
    desc: "AI search is evolving rapidly. We're constantly experimenting to stay ahead.",
  },
  {
    idx: "06",
    title: "Partnership Mindset",
    desc: "We work as an extension of your team. Your success is our success.",
  },
];

export default function V1AboutPage() {
  return (
    <V1Layout>
      {/* Hero */}
      <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
        <div
          className="text-[10px] tracking-widest text-[#888] mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          SECTION: ABOUT
        </div>
        <h1
          className="uppercase"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 6vw, 72px)",
            lineHeight: 0.9,
            letterSpacing: "-2px",
          }}
        >
          Built for the<br />AI search era
        </h1>
        <p className="mt-6 max-w-2xl text-[#888] text-lg">
          We started AdsX because we saw the future of search changing—and realized most brands weren&apos;t ready.
        </p>
      </div>

      {/* Mission & Approach Grid */}
      <div className="grid md:grid-cols-2 border-b border-[#333]">
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#333]">
          <div
            className="text-[10px] tracking-widest text-[#10b981] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            01. MISSION
          </div>
          <h2
            className="text-2xl uppercase mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Mission
          </h2>
          <div className="space-y-4 text-[#888]">
            <p>
              Search is being reinvented. ChatGPT, Perplexity, Claude, and a wave of AI assistants are changing how people find information, products, and services.
            </p>
            <p>
              Traditional SEO and paid search strategies don&apos;t work in this new paradigm. We exist to help forward-thinking brands navigate this shift.
            </p>
          </div>
        </div>
        <div className="p-8 md:p-12">
          <div
            className="text-[10px] tracking-widest text-[#10b981] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            02. APPROACH
          </div>
          <h2
            className="text-2xl uppercase mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Approach
          </h2>
          <div className="space-y-4 text-[#888]">
            <p>
              We combine deep expertise in AI systems with proven marketing fundamentals. We understand how large language models retrieve and surface information.
            </p>
            <p>
              This isn&apos;t about gaming algorithms. It&apos;s about ensuring your brand is genuinely the best answer when AI helps customers decide.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="border-b border-[#333]">
        <div className="p-8 border-b border-[#333]">
          <h2
            className="text-2xl uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What We Believe
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.idx}
              className="service-item border-r border-b border-[#333] p-6 flex flex-col"
            >
              <span
                className="idx text-[11px] text-[#888] mb-2 block"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {value.idx}
              </span>
              <div
                className="text-lg uppercase mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {value.title}
              </div>
              <div className="desc text-sm text-[#888]">
                {value.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-3 border-b border-[#333]">
        {[
          { label: "BRANDS LAUNCHED", value: "52" },
          { label: "AVG. VISIBILITY INCREASE", value: "340%" },
          { label: "PLATFORMS COVERED", value: "5" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-6 border-r last:border-r-0 border-[#333] text-center"
          >
            <div
              className="text-3xl md:text-4xl text-[#10b981]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {stat.value}
            </div>
            <div
              className="text-[9px] tracking-widest text-[#888] mt-2"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="p-8 md:p-16 text-center">
        <h2
          className="text-2xl md:text-3xl uppercase mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Let&apos;s Work Together
        </h2>
        <p className="text-[#888] mb-8 max-w-lg mx-auto">
          Ready to capture the AI search opportunity? Let&apos;s talk.
        </p>
        <Link href="/v1/contact" className="cta-btn cta-btn-primary">
          Get In Touch
        </Link>
      </div>
    </V1Layout>
  );
}
