"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { OrganizationSchema, WebSiteSchema, FAQSchema } from "@/components/seo/structured-data";

const services = [
  {
    idx: "01. VISIBILITY",
    name: "AI Search Audit",
    desc: "Deep analysis of your brand presence across ChatGPT, Claude, Perplexity, and Gemini.",
  },
  {
    idx: "02. OPTIMIZATION",
    name: "Content Strategy",
    desc: "Restructure your digital presence for maximum AI recommendation rates.",
  },
  {
    idx: "03. PLACEMENT",
    name: "Sponsored Ads",
    desc: "Direct placement within AI-generated responses and recommendations.",
  },
  {
    idx: "04. MONITORING",
    name: "Real-Time Tracking",
    desc: "Continuous monitoring of brand mentions across all major AI platforms.",
  },
  {
    idx: "05. ANALYSIS",
    name: "Competitor Intel",
    desc: "Track competitor visibility and identify positioning opportunities.",
  },
  {
    idx: "06. GROWTH",
    name: "Scale Program",
    desc: "Full-stack AI visibility management for enterprise brands.",
    cta: true,
  },
];

const stats = [
  { label: "AI MENTIONS", value: "+340%" },
  { label: "PLATFORMS", value: "5" },
  { label: "BRANDS LIVE", value: "52" },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const img = imgRef.current;
    if (!hero || !img) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      img.style.transform = `scale(1.05) translate(${(x - 0.5) * -20}px, ${(y - 0.5) * -20}px)`;
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <FAQSchema />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=JetBrains+Mono:wght@400;700;800&family=Space+Grotesk:wght@300;400;700&display=swap');

        .v1-page {
          --bg-color: #080808;
          --text-main: #EAEAEA;
          --text-dim: #888888;
          --border-color: #333333;
          --accent: #10b981;
          --font-display: 'Archivo Black', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
          --font-body: 'Space Grotesk', sans-serif;
        }

        .v1-page * {
          cursor: crosshair;
        }

        .v1-page a, .v1-page button {
          cursor: pointer;
        }

        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.06;
          background: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
        }

        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: rgba(16, 185, 129, 0.3);
          animation: scanline 4s linear infinite;
          z-index: 2;
          pointer-events: none;
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(60vh); }
        }

        .hero-img-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);
          z-index: 0;
          transition: transform 0.2s ease-out;
        }

        .hero-img-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 50%);
        }

        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 1;
        }

        .outline-number {
          font-family: var(--font-display);
          font-size: 160px;
          line-height: 0.8;
          color: transparent;
          -webkit-text-stroke: 1px var(--text-main);
          position: absolute;
          bottom: 20px;
          left: -10px;
          z-index: 0;
          opacity: 0.3;
        }

        .service-item {
          transition: background 0.15s, color 0.15s;
        }

        .service-item:hover {
          background: var(--text-main);
          color: var(--bg-color);
        }

        .service-item:hover .idx {
          color: var(--bg-color);
        }

        .service-item:hover .desc {
          color: #333;
        }

        .cta-btn {
          background: transparent;
          color: var(--text-main);
          border: 1px solid var(--text-main);
          padding: 12px 32px;
          font-family: var(--font-mono);
          font-weight: 700;
          text-transform: uppercase;
          font-size: 12px;
          transition: all 0.2s;
          margin-top: 16px;
          display: inline-block;
          text-decoration: none;
        }

        .cta-btn:hover {
          background: var(--accent);
          color: black;
          border-color: var(--accent);
          box-shadow: 4px 4px 0px var(--accent);
          transform: translate(-2px, -2px);
        }

        .barcode {
          height: 40px;
          width: 80px;
          background: repeating-linear-gradient(
            90deg,
            #fff,
            #fff 2px,
            #000 2px,
            #000 4px
          );
        }

        .globe-icon {
          width: 60px;
          height: 60px;
          border: 1px solid var(--text-main);
          border-radius: 50%;
          background: black;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .globe-grid {
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(0deg, transparent, transparent 4px, var(--accent) 5px),
                      repeating-linear-gradient(90deg, transparent, transparent 4px, var(--accent) 5px);
          border-radius: 50%;
          opacity: 0.4;
        }
      `}</style>

      <div className="v1-page min-h-screen bg-[#080808] text-[#EAEAEA]" style={{ fontFamily: "var(--font-body)" }}>
        <div className="noise-overlay" />

        <div className="w-full min-h-screen flex flex-col max-w-[1600px] mx-auto p-3">
          <div className="border border-[#333] bg-[#0a0a0a] flex-grow flex flex-col">

            {/* Header */}
            <header className="border-b border-[#333] h-[60px] flex justify-between items-center px-6">
              <Link href="/" className="text-2xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                ADSX
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                {[
                  { label: "HOME", href: "/" },
                  { label: "BLOG", href: "/blog" },
                  { label: "ABOUT", href: "/about" },
                  { label: "PRICING", href: "/pricing" },
                  { label: "CONTACT", href: "/contact" },
                ].map((item) => (
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
              <div className="flex gap-5">
                <div
                  className="border border-[#EAEAEA] bg-[#EAEAEA] text-[#080808] px-2 py-1 text-[10px] font-bold"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  SYS: ONLINE
                </div>
              </div>
            </header>

            {/* Hero Section */}
            <div
              ref={heroRef}
              className="relative h-[60vh] w-full border-b-2 border-[#EAEAEA] overflow-hidden flex items-center justify-center"
            >
              <div className="scan-line" />
              <div ref={imgRef} className="hero-img-bg" />
              <div className="grid-pattern" />

              <div className="relative z-10 text-center" style={{ mixBlendMode: "exclusion" }}>
                <h1
                  className="text-white whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(48px, 10vw, 140px)",
                    lineHeight: 0.85,
                    letterSpacing: "-0.04em",
                    transform: "scaleX(1.05)"
                  }}
                >
                  AI_SEARCH
                </h1>
                <div
                  className="bg-white text-black inline-block px-3 py-1 mt-6 font-extrabold text-xs tracking-[0.2em]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  ADVERTISING PROTOCOL
                </div>
              </div>
            </div>

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
                Get recommended<br />by AI platforms
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

            {/* Data Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] min-h-[400px] border-b border-[#333]">

              {/* Left Column */}
              <div className="hidden lg:flex border-r border-[#333] p-6 flex-col justify-between relative">
                <div
                  className="text-[#888] text-lg"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  VOL/1
                </div>

                <div className="globe-icon absolute bottom-10 left-10 z-10">
                  <div className="globe-grid" />
                </div>

                <div className="outline-number">AI</div>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <div
                    key={service.idx}
                    className="service-item border-r border-b border-[#333] p-5 flex flex-col"
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
                    <div className="desc text-sm text-[#888] max-w-[90%]">
                      {service.desc}
                    </div>
                    {service.cta && (
                      <Link href="/contact" className="cta-btn">
                        Start Project
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Strip */}
            <div className="border-b border-[#333] p-6">
              <div
                className="text-[10px] text-[#888] mb-4 uppercase tracking-widest"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Supported Platforms
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

            {/* Footer Strip */}
            <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 bg-[#050505]">
              <div className="flex gap-6 items-center">
                <div
                  className="text-3xl"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-1px" }}
                >
                  AX
                </div>

                <div
                  className="text-[9px] text-[#888]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  &copy; {new Date().getFullYear()} ADSX
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <div
                  className="border border-[#EAEAEA] p-1.5 w-[120px] text-[8px] leading-tight text-justify"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  AI SEARCH IS THE NEW FRONTIER. YOUR COMPETITORS ARE ALREADY OPTIMIZING.
                </div>
                <div className="barcode" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
