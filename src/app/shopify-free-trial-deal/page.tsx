import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/metadata";
import { HubPage } from "@/components/marketing/hub-page";

export const metadata = createPageMetadata({
  title: "Shopify Free Trial + $1/Month Deal (2026) — How It Works | AdsX",
  description:
    "The real Shopify offer in 2026: a cardless free trial, then $1/month for your first 3 months on Basic, Grow, or Advanced. What's included, how to activate it, and who qualifies for more.",
  path: "/shopify-free-trial-deal",
  keywords: [
    "shopify free trial",
    "shopify $1 a month",
    "shopify 3 months for $1",
    "shopify deal 2026",
    "shopify promo",
  ],
});

export default function ShopifyFreeTrialDealPage() {
  return (
    <HubPage
      slug="shopify-free-trial-deal"
      eyebrow="SHOPIFY // THE OFFER"
      title="Shopify Free Trial + $1/Month Deal"
      subtitle="Build your store free with no credit card, then pay just $1/month for your first 3 months on any plan. Here's exactly what's included and how to lock it in."
      intro={
        <>
          <p>
            Shopify&rsquo;s 2026 model isn&rsquo;t &ldquo;test free for a
            month.&rdquo; It&rsquo;s a short, cardless free window to look around,
            followed by heavily discounted first months once you pick a plan:{" "}
            <strong className="text-[#EAEAEA]">$1/month for your first three
            months</strong>. Treat the trial as the door and the $1 promo as the
            runway — together they let you launch, run real traffic, and see
            actual orders before full price starts.
          </p>
        </>
      }
      sections={[
        {
          heading: "What the free trial includes",
          body: (
            <>
              <p>
                The trial is a fully functional store. You can add products,
                choose and customize a theme, set up your domain, and configure
                payments — everything except keeping it live long-term without a
                plan. Two things worth knowing:
              </p>
              <ul className="ml-4 space-y-2">
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  <strong className="text-[#EAEAEA]">No credit card</strong> to
                  start — just an email or passkey.
                </li>
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  The free window is <strong className="text-[#EAEAEA]">short</strong>
                  ; the value is in the discounted first months, not a long free
                  ride. Use the trial to get set up, then activate the promo.
                </li>
              </ul>
              <p>
                Full detail in the{" "}
                <Link
                  href="/blog/shopify-free-trial-2026-complete-guide"
                  className="text-[#10b981] underline underline-offset-4 hover:text-[#EAEAEA] transition-colors"
                >
                  complete free trial guide
                </Link>{" "}
                and what to prioritize in{" "}
                <Link
                  href="/blog/shopify-free-trial-what-to-setup-2026"
                  className="text-[#10b981] underline underline-offset-4 hover:text-[#EAEAEA] transition-colors"
                >
                  what to set up during your trial
                </Link>
                .
              </p>
            </>
          ),
        },
        {
          heading: "How the $1/month deal works",
          body: (
            <>
              <p>
                When you select <strong className="text-[#EAEAEA]">Basic, Grow,
                or Advanced</strong> as a new store, Shopify&rsquo;s standard 2026
                promotion applies:{" "}
                <strong className="text-[#EAEAEA]">$1/month for three
                months</strong>. Three months at a dollar is a genuinely useful
                runway — enough to launch, drive traffic, and see whether the
                store converts before full price ($39/month on Basic) kicks in.
              </p>
              <p>
                Most new stores should take the promo on{" "}
                <strong className="text-[#EAEAEA]">Basic</strong> and upgrade only
                when the math justifies it. The deep dive lives in the{" "}
                <Link
                  href="/blog/shopify-1-dollar-3-months-deal-2026"
                  className="text-[#10b981] underline underline-offset-4 hover:text-[#EAEAEA] transition-colors"
                >
                  $1-for-3-months deal guide
                </Link>
                , including what happens at month four.
              </p>
            </>
          ),
        },
        {
          heading: "How to activate it",
          body: (
            <>
              <ol className="ml-4 list-decimal list-inside space-y-2">
                <li>Start the free trial and build your store.</li>
                <li>
                  When you&rsquo;re ready, open{" "}
                  <strong className="text-[#EAEAEA]">Choose a plan</strong> in your
                  admin and select Basic, Grow, or Advanced.
                </li>
                <li>
                  The discounted price shows right on the plan cards. Enter your
                  billing details and{" "}
                  <strong className="text-[#EAEAEA]">verify the promo price
                  appears on the confirmation screen</strong> before you confirm.
                </li>
              </ol>
              <p>
                Activation is usually automatic in the plan-selection flow —
                charges begin at the $1 promo rate when your trial ends, not
                before.
              </p>
            </>
          ),
        },
        {
          heading: "Eligible for something better?",
          body: (
            <>
              <p>
                Founders who qualify for the{" "}
                <strong className="text-[#EAEAEA]">1MBB (1 Million Black
                Businesses)</strong> program can get a{" "}
                <strong className="text-[#EAEAEA]">120-day extended trial</strong>{" "}
                instead of the standard short one — four full months to build
                before paying. If that might be you, read the{" "}
                <Link
                  href="/blog/shopify-1mbb-120-day-free-trial-guide"
                  className="text-[#10b981] underline underline-offset-4 hover:text-[#EAEAEA] transition-colors"
                >
                  1MBB 120-day trial guide
                </Link>{" "}
                <em>before</em> signing up through the standard flow, because the
                entry point is different.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: "Is the Shopify free trial really free?",
          answer:
            "Yes. As of 2026 the trial requires no credit card — just an email or passkey. You only enter billing details later, when you pick a plan to keep the store running.",
        },
        {
          question: "How does the $1/month deal work?",
          answer:
            "When a new store selects Basic, Grow, or Advanced, Shopify's standard 2026 promotion applies: $1/month for the first 3 months. After that you pay the normal plan price (Basic is $39/month).",
        },
        {
          question: "Do I get the $1 promo on any plan?",
          answer:
            "The $1/month for 3 months promo applies to Basic, Grow, and Advanced for new stores. Basic is the right starting point for almost every new store; you can upgrade later with no migration.",
        },
        {
          question: "What happens after the 3 months?",
          answer:
            "Billing continues at the standard plan price — $39/month on Basic. You can downgrade, upgrade, or cancel at any time before renewal.",
        },
      ]}
      relatedTitle="Keep reading"
      related={[
        { title: "The $1/mo for 3 months deal", href: "/blog/shopify-1-dollar-3-months-deal-2026" },
        { title: "Shopify free trial (2026)", href: "/blog/shopify-free-trial-2026-complete-guide" },
        { title: "1MBB 120-day trial", href: "/blog/shopify-1mbb-120-day-free-trial-guide" },
        { title: "What to set up during your trial", href: "/blog/shopify-free-trial-what-to-setup-2026" },
        { title: "Start a Shopify store", href: "/start-a-shopify-store" },
        { title: "Is Shopify right for you?", href: "/is-shopify-right-for-you" },
      ]}
    />
  );
}
