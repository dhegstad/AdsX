"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How long until we see results?",
    answer:
      "Most clients see measurable improvements in AI visibility within 4-6 weeks. Sponsored placements can drive traffic immediately, while organic AI optimization compounds over time as models update their training data.",
  },
  {
    question: "What's the minimum engagement?",
    answer:
      "We work with brands on 6-month minimum engagements. AI search optimization requires consistent effort and iteration—short-term projects rarely deliver meaningful results in this space.",
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

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={cn(
              "rounded-xl border overflow-hidden",
              isDark
                ? "border-white/10 bg-white/[0.02]"
                : "border-neutral-200 bg-white"
            )}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between px-6 py-4 text-left"
            >
              <span className="font-medium">{faq.question}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 transition-transform",
                  isDark ? "text-white/50" : "text-neutral-500",
                  openIndex === index && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300",
                openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className={cn(
                  "px-6 pb-4",
                  isDark ? "text-white/60" : "text-neutral-600"
                )}>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
