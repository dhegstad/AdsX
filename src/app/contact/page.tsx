"use client";

import { useState } from "react";
import { BrutalistLayout } from "@/components/brutalist-layout";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <BrutalistLayout>
      {/* Hero */}
      <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
        <div
          className="text-xs tracking-widest text-[#888] mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          SECTION: CONTACT
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
          Initiate<br />contact
        </h1>
        <p className="mt-6 max-w-2xl text-[#888] text-lg">
          Questions about AdsX, a correction to an article, or a Shopify topic we should cover? Send us a message.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 border-b border-[#333]">
        {/* Left - Info */}
        <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#333]">
          <div
            className="text-xs tracking-widest text-[#10b981] mb-6"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            GET IN TOUCH
          </div>

          <div className="space-y-8">
            {[
              {
                idx: "01",
                title: "Publication & Corrections",
                desc: "Include the article URL and the information you think needs updating.",
              },
              {
                idx: "02",
                title: "AdsX App",
                desc: "Ask about the app we are developing for Thank you and Order status page advertising.",
              },
              {
                idx: "03",
                title: "Research & Sources",
                desc: "Share a useful primary source or suggest a question for a future guide.",
              },
            ].map((item) => (
              <div key={item.idx} className="flex gap-4">
                <div
                  className="text-xs text-[#888] shrink-0"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {item.idx}
                </div>
                <div>
                  <h3
                    className="uppercase text-base mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-base text-[#888]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-12 border border-[#333] p-6">
            <p className="text-[#888] italic mb-4 text-base">
              &quot;Within 4 months of working with AdsX, we went from invisible to the #1 recommended solution in our category.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#10b981] flex items-center justify-center">
                <span
                  className="text-[#10b981] text-xs"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  JM
                </span>
              </div>
              <div>
                <div className="text-sm">Jordan Mitchell</div>
                <div
                  className="text-xs text-[#888]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  VP MARKETING, NEXUS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="p-8 md:p-12 bg-[#111]">
          <div
            className="text-xs tracking-widest text-[#10b981] mb-6"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            TRANSMISSION FORM
          </div>

          {status === "success" ? (
            <div className="text-center py-12">
              <div
                className="text-4xl text-[#10b981] mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &#10003;
              </div>
              <h2
                className="text-2xl uppercase mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Transmission Received
              </h2>
              <p className="text-[#888] mb-8">
                We&apos;ll respond as soon as we can with available call times.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="cta-btn"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === "error" && (
                <div className="border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400">
                  Transmission failed. Please try again.
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs tracking-widest text-[#888] mb-2"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    FIRST NAME *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="v1-input"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label
                    className="block text-xs tracking-widest text-[#888] mb-2"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    LAST NAME *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="v1-input"
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-xs tracking-widest text-[#888] mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  WORK EMAIL *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="v1-input"
                  placeholder="jane@company.com"
                />
              </div>

              <div>
                <label
                  className="block text-xs tracking-widest text-[#888] mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  COMPANY *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="v1-input"
                  placeholder="Acme Inc"
                />
              </div>

              <div>
                <label
                  className="block text-xs tracking-widest text-[#888] mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  MESSAGE *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="v1-input"
                  placeholder="How can we help? Include a relevant page URL if you have one."
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="cta-btn cta-btn-primary w-full disabled:opacity-50"
              >
                {status === "loading" ? "TRANSMITTING..." : "INITIATE CONTACT"}
              </button>

              <div
                className="text-xs text-[#888] text-center"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                PUBLICATION QUESTIONS · APP INQUIRIES · CORRECTIONS
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Alternative Contact */}
      <div className="p-8 text-center">
        <p className="text-[#888] text-sm">
          Prefer direct transmission?{" "}
          <a
            href="mailto:hello@adsx.com"
            className="text-[#10b981] hover:underline"
          >
            hello@adsx.com
          </a>
        </p>
      </div>
    </BrutalistLayout>
  );
}
