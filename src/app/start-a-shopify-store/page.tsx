import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/metadata";
import { HubPage } from "@/components/marketing/hub-page";

export const metadata = createPageMetadata({
  title: "How to Start a Shopify Store (2026) — Step-by-Step",
  description:
    "Start a Shopify store the practical way: what the signup actually asks, which plan to pick, and the $1/month deal that covers your first three months. No credit card to begin.",
  path: "/start-a-shopify-store",
  keywords: [
    "start a shopify store",
    "how to start shopify",
    "shopify signup",
    "create shopify store",
    "shopify free trial",
  ],
});

export default function StartAShopifyStorePage() {
  return (
    <HubPage
      slug="start-a-shopify-store"
      eyebrow="SHOPIFY // GET STARTED"
      title="Start a Shopify Store"
      subtitle="Everything you need to launch is an afternoon of work — not a business plan. Here's exactly what the signup asks, which plan to pick, and how the $1/month deal covers your first three months."
      intro={
        <>
          <p>
            The hardest part of starting a store isn&rsquo;t the software — it&rsquo;s
            the decisions people think they have to make first. You don&rsquo;t need
            a registered business, a finished brand, product photography, or a
            credit card to open a Shopify account. You need an email address and
            a rough idea of what you&rsquo;ll sell. Everything else is changeable
            later.
          </p>
          <p>
            This page is the short version of the whole path: sign up free, pick
            a plan when you&rsquo;re ready, and spend your first hour on the four
            things that actually make a store real. For the screen-by-screen
            walkthrough, see the{" "}
            <Link
              href="/blog/how-to-sign-up-shopify-step-by-step"
              className="text-[#10b981] underline underline-offset-4 hover:text-[#EAEAEA] transition-colors"
            >
              step-by-step signup guide
            </Link>
            .
          </p>
        </>
      }
      sections={[
        {
          heading: "What you actually need",
          body: (
            <>
              <p>Before you sign up, have ready:</p>
              <ul className="ml-4 space-y-2">
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  An <strong className="text-[#EAEAEA]">email address</strong> you
                  check (or a Google, Apple, or passkey login)
                </li>
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  A <strong className="text-[#EAEAEA]">rough idea</strong> of what
                  you&rsquo;ll sell — useful for the questionnaire, but skippable
                </li>
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  About <strong className="text-[#EAEAEA]">15 minutes</strong> for
                  signup plus the first-hour basics
                </li>
              </ul>
              <p>
                What you do <em>not</em> need: a credit card, a registered
                business, a domain name, product photos, or a finished brand.
                Every one of those can come later.
              </p>
            </>
          ),
        },
        {
          heading: "The five steps to launch",
          body: (
            <>
              <ol className="ml-4 list-decimal list-inside space-y-2">
                <li>
                  <strong className="text-[#EAEAEA]">Start the free trial.</strong>{" "}
                  Begin from Shopify&rsquo;s free-trial page — it drops you into
                  the guided flow instead of a marketing maze.
                </li>
                <li>
                  <strong className="text-[#EAEAEA]">Skip or answer the
                  questionnaire.</strong>{" "}
                  It customizes your dashboard; none of it is a commitment.
                </li>
                <li>
                  <strong className="text-[#EAEAEA]">Create your account.</strong>{" "}
                  Email or passkey — no card. Your store&rsquo;s admin opens with
                  the trial already running.
                </li>
                <li>
                  <strong className="text-[#EAEAEA]">Add one product.</strong>{" "}
                  One real product is enough to make the store feel alive and to
                  test checkout.
                </li>
                <li>
                  <strong className="text-[#EAEAEA]">Pick a plan when
                  ready.</strong>{" "}
                  You choose <em>after</em> the trial starts — that&rsquo;s when
                  the $1/month promo applies.
                </li>
              </ol>
            </>
          ),
        },
        {
          heading: "Which plan to start on",
          body: (
            <>
              <p>
                Start on <strong className="text-[#EAEAEA]">Basic</strong>. It has
                everything a new store needs, and Shopify&rsquo;s 2026 promotion
                makes it <strong className="text-[#EAEAEA]">$1/month for your
                first 3 months</strong>. After the promo, Basic is $39/month,
                Grow is $105/month, and Advanced is $399/month — upgrading later
                takes two clicks and zero migration, so there&rsquo;s no reason to
                overpay on day one.
              </p>
              <p>
                On card processing, Basic is 2.9% + 30&cent; online (Grow 2.7%,
                Advanced 2.5%). Turn on{" "}
                <strong className="text-[#EAEAEA]">Shopify Payments</strong> unless
                you have a specific reason not to — a third-party gateway adds a
                2% surcharge per order on Basic (1% on Grow, 0.6% on Advanced),
                and Shopify Payments is what unlocks Shop Pay&rsquo;s accelerated
                checkout. Full breakdown in{" "}
                <Link
                  href="/blog/hidden-shopify-costs-how-to-avoid"
                  className="text-[#10b981] underline underline-offset-4 hover:text-[#EAEAEA] transition-colors"
                >
                  hidden Shopify costs
                </Link>{" "}
                and{" "}
                <Link
                  href="/blog/shopify-payments-vs-stripe-vs-paypal"
                  className="text-[#10b981] underline underline-offset-4 hover:text-[#EAEAEA] transition-colors"
                >
                  Shopify Payments vs Stripe vs PayPal
                </Link>
                .
              </p>
            </>
          ),
        },
        {
          heading: "Your first hour: the four setups that matter",
          body: (
            <>
              <ul className="ml-4 space-y-2">
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  <strong className="text-[#EAEAEA]">Domain.</strong> Buy one
                  through Shopify (DNS handled for you) or connect one you own.
                </li>
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  <strong className="text-[#EAEAEA]">Payments.</strong> Activate
                  Shopify Payments so you can actually get paid — and get Shop Pay.
                </li>
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  <strong className="text-[#EAEAEA]">One product.</strong> Real
                  title, real price, one clear photo. Enough to test the flow.
                </li>
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  <strong className="text-[#EAEAEA]">One free theme.</strong> Pick
                  a free theme and customize later. Don&rsquo;t buy a theme on day
                  one.
                </li>
              </ul>
              <p>
                Everything else — apps, email, extra products, branding — can wait
                until there&rsquo;s a store worth optimizing.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: "Do I need a credit card to start a Shopify store?",
          answer:
            "No. As of 2026, Shopify's free trial requires only an email address (or a Google, Apple, or passkey login). You add billing details later, when you choose a paid plan to keep the store running after the trial.",
        },
        {
          question: "How much does it cost to start?",
          answer:
            "Signing up and building your store is free during the trial. When you pick a plan, new stores typically get $1/month for the first 3 months on Basic, Grow, or Advanced. After that, Basic is $39/month.",
        },
        {
          question: "How long does it take to set up?",
          answer:
            "The signup itself takes about two minutes. Budget roughly an hour for the four setups that make a store real: domain, Shopify Payments, one product, and a free theme.",
        },
        {
          question: "Can I change my store name or plan later?",
          answer:
            "Yes. Your store name isn't permanent, and you can upgrade or downgrade plans in two clicks with no migration. Start small and change things as the store grows.",
        },
      ]}
      relatedTitle="Keep reading"
      related={[
        { title: "Step-by-step signup guide", href: "/blog/how-to-sign-up-shopify-step-by-step" },
        { title: "Shopify free trial (2026)", href: "/blog/shopify-free-trial-2026-complete-guide" },
        { title: "How to start an online store", href: "/blog/how-to-start-online-store-2026" },
        { title: "The $1/mo for 3 months deal", href: "/shopify-free-trial-deal" },
        { title: "Is Shopify right for you?", href: "/is-shopify-right-for-you" },
      ]}
    />
  );
}
