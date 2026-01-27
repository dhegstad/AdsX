"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

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

export function FaqSectionLight() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-xl border border-neutral-200 bg-white overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-neutral-50 transition-colors"
            >
              <span className="font-medium text-neutral-900">{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 text-neutral-500 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ${
                openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-4 text-neutral-600">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
