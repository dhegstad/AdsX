import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "About",
  description: "We're the agency built for the AI search era. Learn about our mission to help brands show up where customers are actually searching.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Built for the <span className="gradient-text">AI search era</span>
            </h1>
            <p className="mt-6 text-lg text-white/60 sm:text-xl">
              We started AdsX because we saw the future of search changing—and realized most brands weren&apos;t ready.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Our mission</h2>
              <p className="mt-6 text-lg text-white/60">
                Search is being reinvented. ChatGPT, Perplexity, Claude, and a wave of AI assistants are changing how people find information, products, and services.
              </p>
              <p className="mt-4 text-lg text-white/60">
                Traditional SEO and paid search strategies don&apos;t work in this new paradigm. We exist to help forward-thinking brands navigate this shift and capture visibility where their customers are actually searching.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Our approach</h2>
              <p className="mt-6 text-lg text-white/60">
                We combine deep expertise in AI systems with proven marketing fundamentals. We understand how large language models retrieve and surface information—and we use that knowledge to position your brand effectively.
              </p>
              <p className="mt-4 text-lg text-white/60">
                This isn&apos;t about gaming algorithms. It&apos;s about ensuring your brand is genuinely the best answer when AI platforms help customers make decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight">What we believe</h2>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "First-mover wins",
                description: "The brands that establish AI search presence now will have compounding advantages for years to come.",
              },
              {
                title: "Quality over hacks",
                description: "We don't chase shortcuts. We build sustainable visibility through genuine value and authority.",
              },
              {
                title: "Transparency always",
                description: "You'll always know what we're doing, why we're doing it, and how it's performing.",
              },
              {
                title: "Results matter",
                description: "Visibility is a means to an end. We measure success by business outcomes, not vanity metrics.",
              },
              {
                title: "Stay curious",
                description: "AI search is evolving rapidly. We're constantly experimenting and learning to stay ahead.",
              },
              {
                title: "Partnership mindset",
                description: "We work as an extension of your team, not a vendor. Your success is our success.",
              },
            ].map((value) => (
              <div key={value.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="mt-3 text-white/60">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s work together
          </h2>
          <p className="mt-6 text-lg text-white/60">
            Ready to capture the AI search opportunity? Let&apos;s talk.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 text-base font-medium text-black transition-all hover:bg-emerald-400"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
