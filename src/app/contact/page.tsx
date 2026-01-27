import type { Metadata } from "next";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with AdsX. Book a strategy call or send us a message.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s talk <span className="gradient-text">AI search</span>
            </h1>
            <p className="mt-6 text-lg text-white/60 sm:text-xl">
              Book a strategy call or send us a message. We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <form className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-white/80">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:outline-none focus:ring-0"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-white/80">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:outline-none focus:ring-0"
                  placeholder="Smith"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80">
                Work email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:outline-none focus:ring-0"
                placeholder="jane@company.com"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-white/80">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:outline-none focus:ring-0"
                placeholder="Acme Inc"
              />
            </div>
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-white/80">
                Monthly budget
              </label>
              <select
                id="budget"
                name="budget"
                className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-emerald-500/50 focus:outline-none focus:ring-0"
              >
                <option value="" className="bg-black">Select a range</option>
                <option value="5k-10k" className="bg-black">$5,000 - $10,000</option>
                <option value="10k-25k" className="bg-black">$10,000 - $25,000</option>
                <option value="25k+" className="bg-black">$25,000+</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80">
                How can we help?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:outline-none focus:ring-0"
                placeholder="Tell us about your goals..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-500 py-4 text-base font-medium text-black transition-all hover:bg-emerald-400"
            >
              Send Message
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-white/50">
              Prefer to book directly?{" "}
              <a href="#" className="text-emerald-400 hover:text-emerald-300">
                Schedule a call
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
