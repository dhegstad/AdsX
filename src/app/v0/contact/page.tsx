"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Calendar,
  MessageSquare,
  Zap,
  Clock,
  ArrowRight,
  Mail,
  Building2,
  TrendingUp,
  Shield
} from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  message?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

const benefits = [
  {
    icon: Zap,
    title: "Free AI Visibility Audit",
    description: "See exactly how your brand appears across ChatGPT, Gemini, Claude, and Perplexity",
  },
  {
    icon: Calendar,
    title: "Strategy Roadmap",
    description: "Get a custom plan to capture the AI search channel before your competitors",
  },
  {
    icon: TrendingUp,
    title: "Growth Projections",
    description: "Understand the potential impact on leads, traffic, and revenue",
  },
];

const stats = [
  { value: "340%", label: "Avg. increase in AI mentions" },
  { value: "24hr", label: "Response time" },
  { value: "52", label: "Brands launched" },
];

const faqs = [
  {
    q: "What happens after I submit?",
    a: "We'll review your submission and respond within 24 hours with available times for a strategy call.",
  },
  {
    q: "Is the consultation free?",
    a: "Yes. The initial strategy call and AI visibility audit are completely free with no obligation.",
  },
  {
    q: "How long is the call?",
    a: "Initial calls are typically 30 minutes. We'll assess your needs and share relevant insights.",
  },
];

export default function ContactPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setStatusMessage(data.message || "Thank you! We'll be in touch soon.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          budget: "",
          message: "",
        });
      } else {
        setStatus("error");
        if (data.errors) {
          setErrors(data.errors);
        }
        setStatusMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Unable to submit. Please try again later.");
    }
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDark ? "bg-black text-white" : "bg-white text-neutral-900"
    )}>
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className={cn(
              "mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm",
              isDark
                ? "border-emerald-500/30 bg-emerald-500/10"
                : "border-emerald-500/30 bg-emerald-500/10"
            )}>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className={isDark ? "text-emerald-400" : "text-emerald-600"}>
                Free AI visibility audit included
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s capture your <span className="gradient-text">AI search</span> opportunity
            </h1>
            <p className={cn(
              "mt-6 text-lg sm:text-xl",
              isDark ? "text-white/60" : "text-neutral-600"
            )}>
              Book a strategy call to see how your brand appears in AI assistants—and how to improve it.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={cn(
        "border-y py-8",
        isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-neutral-50"
      )}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={cn(
                  "text-2xl sm:text-3xl font-bold",
                  isDark ? "text-emerald-400" : "text-emerald-600"
                )}>
                  {stat.value}
                </div>
                <div className={cn(
                  "text-sm mt-1",
                  isDark ? "text-white/50" : "text-neutral-500"
                )}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Two Column */}
      <section className={cn(
        "py-24",
        isDark ? "" : ""
      )}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left Column - Benefits & Info */}
            <div className="lg:pr-8">
              <h2 className="text-2xl font-bold sm:text-3xl">
                What you&apos;ll get
              </h2>
              <p className={cn(
                "mt-4 text-lg",
                isDark ? "text-white/60" : "text-neutral-600"
              )}>
                Every conversation starts with understanding your current position and where you want to go.
              </p>

              {/* Benefits */}
              <div className="mt-10 space-y-8">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-4">
                    <div className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                      isDark ? "bg-emerald-500/10" : "bg-emerald-50"
                    )}>
                      <benefit.icon className={cn(
                        "h-6 w-6",
                        isDark ? "text-emerald-400" : "text-emerald-600"
                      )} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{benefit.title}</h3>
                      <p className={cn(
                        "mt-1",
                        isDark ? "text-white/60" : "text-neutral-600"
                      )}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className={cn(
                "mt-12 rounded-xl border p-6",
                isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-neutral-50"
              )}>
                <p className={cn(
                  "text-lg italic",
                  isDark ? "text-white/80" : "text-neutral-700"
                )}>
                  &quot;Within 4 months of working with AdsX, we went from invisible to the #1 recommended solution in our category across ChatGPT and Perplexity.&quot;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                    <span className={isDark ? "text-black font-bold text-sm" : "text-white font-bold text-sm"}>JM</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Jordan Mitchell</div>
                    <div className={cn(
                      "text-xs",
                      isDark ? "text-white/50" : "text-neutral-500"
                    )}>VP Marketing, Nexus</div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-12">
                <h3 className="font-semibold mb-6">Common questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.q}>
                      <h4 className={cn(
                        "text-sm font-medium",
                        isDark ? "text-white/80" : "text-neutral-700"
                      )}>{faq.q}</h4>
                      <p className={cn(
                        "mt-1 text-sm",
                        isDark ? "text-white/50" : "text-neutral-500"
                      )}>{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <div className={cn(
                "rounded-2xl border p-8",
                isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-200 bg-white shadow-xl shadow-neutral-200/50"
              )}>
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare className={cn(
                    "h-5 w-5",
                    isDark ? "text-emerald-400" : "text-emerald-600"
                  )} />
                  <span className="font-semibold">Send us a message</span>
                </div>

                {status === "success" ? (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto h-16 w-16 text-emerald-500" />
                    <h2 className="mt-4 text-2xl font-bold">You&apos;re all set!</h2>
                    <p className={cn(
                      "mt-2",
                      isDark ? "text-white/60" : "text-neutral-600"
                    )}>{statusMessage}</p>
                    <div className={cn(
                      "mt-6 p-4 rounded-lg text-left",
                      isDark ? "bg-white/5" : "bg-neutral-50"
                    )}>
                      <p className={cn(
                        "text-sm font-medium mb-2",
                        isDark ? "text-white/80" : "text-neutral-700"
                      )}>What happens next:</p>
                      <ul className={cn(
                        "text-sm space-y-2",
                        isDark ? "text-white/60" : "text-neutral-600"
                      )}>
                        <li className="flex items-start gap-2">
                          <Clock className="h-4 w-4 mt-0.5 text-emerald-500" />
                          We&apos;ll review your submission within 24 hours
                        </li>
                        <li className="flex items-start gap-2">
                          <Mail className="h-4 w-4 mt-0.5 text-emerald-500" />
                          You&apos;ll receive an email with available call times
                        </li>
                        <li className="flex items-start gap-2">
                          <Building2 className="h-4 w-4 mt-0.5 text-emerald-500" />
                          We&apos;ll prepare a custom AI visibility audit
                        </li>
                      </ul>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      className={cn(
                        "mt-6 rounded-lg border px-6 py-2 text-sm font-medium transition-colors",
                        isDark
                          ? "border-white/20 hover:bg-white/5"
                          : "border-neutral-300 hover:bg-neutral-50"
                      )}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {status === "error" && statusMessage && (
                      <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <p className="text-sm text-red-400">{statusMessage}</p>
                      </div>
                    )}

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className={cn(
                          "block text-sm font-medium",
                          isDark ? "text-white/80" : "text-neutral-700"
                        )}>
                          First name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={cn(
                            "mt-2 block w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-0",
                            errors.firstName ? "border-red-500/50" : (isDark ? "border-white/10" : "border-neutral-300"),
                            isDark
                              ? "bg-white/5 text-white placeholder:text-white/30 focus:border-emerald-500/50"
                              : "bg-white text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500"
                          )}
                          placeholder="Jane"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="lastName" className={cn(
                          "block text-sm font-medium",
                          isDark ? "text-white/80" : "text-neutral-700"
                        )}>
                          Last name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={cn(
                            "mt-2 block w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-0",
                            errors.lastName ? "border-red-500/50" : (isDark ? "border-white/10" : "border-neutral-300"),
                            isDark
                              ? "bg-white/5 text-white placeholder:text-white/30 focus:border-emerald-500/50"
                              : "bg-white text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500"
                          )}
                          placeholder="Smith"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className={cn(
                        "block text-sm font-medium",
                        isDark ? "text-white/80" : "text-neutral-700"
                      )}>
                        Work email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={cn(
                          "mt-2 block w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-0",
                          errors.email ? "border-red-500/50" : (isDark ? "border-white/10" : "border-neutral-300"),
                          isDark
                            ? "bg-white/5 text-white placeholder:text-white/30 focus:border-emerald-500/50"
                            : "bg-white text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500"
                        )}
                        placeholder="jane@company.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="company" className={cn(
                        "block text-sm font-medium",
                        isDark ? "text-white/80" : "text-neutral-700"
                      )}>
                        Company <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={cn(
                          "mt-2 block w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-0",
                          errors.company ? "border-red-500/50" : (isDark ? "border-white/10" : "border-neutral-300"),
                          isDark
                            ? "bg-white/5 text-white placeholder:text-white/30 focus:border-emerald-500/50"
                            : "bg-white text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500"
                        )}
                        placeholder="Acme Inc"
                      />
                      {errors.company && <p className="mt-1 text-sm text-red-400">{errors.company}</p>}
                    </div>
                    <div>
                      <label htmlFor="budget" className={cn(
                        "block text-sm font-medium",
                        isDark ? "text-white/80" : "text-neutral-700"
                      )}>
                        Monthly budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={cn(
                          "mt-2 block w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-0",
                          isDark
                            ? "border-white/10 bg-white/5 text-white focus:border-emerald-500/50"
                            : "border-neutral-300 bg-white text-neutral-900 focus:border-emerald-500"
                        )}
                      >
                        <option value="" className={isDark ? "bg-black" : "bg-white"}>
                          Select a range
                        </option>
                        <option value="5k-10k" className={isDark ? "bg-black" : "bg-white"}>
                          $5,000 - $10,000
                        </option>
                        <option value="10k-25k" className={isDark ? "bg-black" : "bg-white"}>
                          $10,000 - $25,000
                        </option>
                        <option value="25k+" className={isDark ? "bg-black" : "bg-white"}>
                          $25,000+
                        </option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className={cn(
                        "block text-sm font-medium",
                        isDark ? "text-white/80" : "text-neutral-700"
                      )}>
                        How can we help? <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className={cn(
                          "mt-2 block w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-0",
                          errors.message ? "border-red-500/50" : (isDark ? "border-white/10" : "border-neutral-300"),
                          isDark
                            ? "bg-white/5 text-white placeholder:text-white/30 focus:border-emerald-500/50"
                            : "bg-white text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500"
                        )}
                        placeholder="Tell us about your AI search goals..."
                      />
                      {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className={cn(
                        "w-full rounded-lg py-4 text-base font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                        isDark
                          ? "bg-emerald-500 text-black hover:bg-emerald-400"
                          : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25"
                      )}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Get Your Free Audit
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    {/* Trust Signals */}
                    <div className={cn(
                      "pt-4 flex items-center justify-center gap-4 text-xs",
                      isDark ? "text-white/40" : "text-neutral-500"
                    )}>
                      <span className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        No spam, ever
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        24hr response
                      </span>
                    </div>
                  </form>
                )}
              </div>

              {/* Alternative Contact */}
              <div className={cn(
                "mt-8 text-center",
                isDark ? "text-white/50" : "text-neutral-500"
              )}>
                <p className="text-sm">
                  Prefer email?{" "}
                  <a
                    href="mailto:hello@adsx.com"
                    className={cn(
                      "font-medium transition-colors",
                      isDark ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-600 hover:text-emerald-700"
                    )}
                  >
                    hello@adsx.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={cn(
        "border-t py-16",
        isDark ? "border-white/10" : "border-neutral-200 bg-neutral-50"
      )}>
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-2xl font-bold">Not ready to talk yet?</h2>
          <p className={cn(
            "mt-3",
            isDark ? "text-white/60" : "text-neutral-600"
          )}>
            Explore our resources to learn more about AI search advertising.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/blog"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition-colors",
                isDark
                  ? "border-white/20 hover:bg-white/5"
                  : "border-neutral-300 bg-white hover:bg-neutral-50"
              )}
            >
              Read the Blog
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/case-studies"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition-colors",
                isDark
                  ? "border-white/20 hover:bg-white/5"
                  : "border-neutral-300 bg-white hover:bg-neutral-50"
              )}
            >
              View Case Studies
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition-colors",
                isDark
                  ? "border-white/20 hover:bg-white/5"
                  : "border-neutral-300 bg-white hover:bg-neutral-50"
              )}
            >
              See Pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
