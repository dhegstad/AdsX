"use client";

import { useEffect, useRef } from "react";

export function ParallaxHero() {
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
          VISIBILITY PROTOCOL
        </div>
        <p
          className="mt-6 text-white/70 text-sm md:text-base max-w-md mx-auto"
          style={{ fontFamily: "var(--font-body)" }}
        >
          When customers ask ChatGPT for recommendations, is your brand in the answer?
        </p>
      </div>
    </div>
  );
}
