import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/metadata";
import { HubPage } from "@/components/marketing/hub-page";

export const metadata = createPageMetadata({
  title: "Is Shopify Right for You? (2026 Decision Guide) | AdsX",
  description:
    "An honest 2026 decision guide: who Shopify is genuinely the best fit for, who should look elsewhere, how it compares to the alternatives, and a 60-second checklist to decide.",
  path: "/is-shopify-right-for-you",
  keywords: [
    "is shopify right for me",
    "is shopify worth it",
    "should i use shopify",
    "shopify for beginners",
    "shopify alternatives",
  ],
});

export default function IsShopifyRightForYouPage() {
  return (
    <HubPage
      slug="is-shopify-right-for-you"
      eyebrow="SHOPIFY // DECISION GUIDE"
      title="Is Shopify Right for You?"
      subtitle="No hype. Here's who Shopify genuinely fits best, who should look elsewhere, and a 60-second checklist so you can decide before you spend an afternoon setting it up."
      intro={
        <>
          <p>
            Shopify is the default recommendation for most people starting an
            online store — but &ldquo;most&rdquo; isn&rsquo;t &ldquo;everyone.&rdquo;
            The honest answer depends on <em>what</em> you sell, <em>how</em> you
            want to own the relationship with your customers, and whether you plan
            to sell across more than one channel. Below is the fit test.
          </p>
        </>
      }
      sections={[
        {
          heading: "Who Shopify fits best",
          body: (
            <>
              <ul className="ml-4 space-y-2">
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  <strong className="text-[#EAEAEA]">Brands that want to own
                  their store</strong> — your domain, your customer list, your
                  checkout — rather than renting a spot on a marketplace.
                </li>
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  <strong className="text-[#EAEAEA]">Physical-product and DTC
                  sellers</strong> who need inventory, variants, shipping, and a
                  real checkout out of the box.
                </li>
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  <strong className="text-[#EAEAEA]">Sellers who want to be
                  everywhere</strong> — one catalog syncing to Google, Meta,
                  TikTok, in-person POS, and increasingly AI shopping agents.
                </li>
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  <strong className="text-[#EAEAEA]">People who&rsquo;d rather not
                  manage hosting or security</strong> — it&rsquo;s handled, with
                  predictable monthly pricing.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "Who might look elsewhere",
          body: (
            <>
              <p>Shopify is not the obvious pick if you&rsquo;re:</p>
              <ul className="ml-4 space-y-2">
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  <strong className="text-[#EAEAEA]">Purely a marketplace
                  seller</strong> (Amazon/Etsy only) with no interest in a
                  branded storefront — though many sellers run both, using
                  Shopify as the owned channel that builds repeat-buyer LTV.
                </li>
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  <strong className="text-[#EAEAEA]">Selling a single digital
                  product or membership</strong> where a lighter tool may be
                  enough — compare{" "}
                  <Link
                    href="/blog/shopify-vs-teachable-comparison"
                    className="text-[#10b981] underline underline-offset-4 hover:text-[#EAEAEA] transition-colors"
                  >
                    Shopify vs Teachable
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/blog/shopify-vs-patreon-comparison"
                    className="text-[#10b981] underline underline-offset-4 hover:text-[#EAEAEA] transition-colors"
                  >
                    Shopify vs Patreon
                  </Link>
                  .
                </li>
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  <strong className="text-[#EAEAEA]">Only collecting payments</strong>,
                  not building a store — see{" "}
                  <Link
                    href="/blog/stripe-checkout-vs-shopify-store"
                    className="text-[#10b981] underline underline-offset-4 hover:text-[#EAEAEA] transition-colors"
                  >
                    Stripe Checkout vs a Shopify store
                  </Link>
                  .
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "How it compares",
          body: (
            <>
              <p>
                The right question usually isn&rsquo;t &ldquo;Shopify or
                not&rdquo; — it&rsquo;s &ldquo;Shopify or which specific
                alternative, for my situation.&rdquo; A few head-to-heads worth
                reading:
              </p>
              <ul className="ml-4 space-y-2">
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  <Link
                    href="/blog/kartra-vs-shopify-2026"
                    className="text-[#10b981] underline underline-offset-4 hover:text-[#EAEAEA] transition-colors"
                  >
                    Kartra vs Shopify
                  </Link>{" "}
                  — all-in-one funnels vs a real store
                </li>
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  <Link
                    href="/blog/shopify-vs-opencart-comparison"
                    className="text-[#10b981] underline underline-offset-4 hover:text-[#EAEAEA] transition-colors"
                  >
                    Shopify vs OpenCart
                  </Link>{" "}
                  — hosted simplicity vs self-managed control
                </li>
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  <Link
                    href="/blog/shopify-plus-vs-advanced-when-to-upgrade"
                    className="text-[#10b981] underline underline-offset-4 hover:text-[#EAEAEA] transition-colors"
                  >
                    Shopify Plus vs Advanced
                  </Link>{" "}
                  — when scale justifies the jump
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "The 60-second decision",
          body: (
            <>
              <p>
                If you can say <strong className="text-[#EAEAEA]">yes</strong> to
                most of these, Shopify is very likely your answer:
              </p>
              <ul className="ml-4 space-y-2">
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  I want my own branded store, not just a marketplace listing.
                </li>
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  I&rsquo;ll sell more than one product, or sell across more than
                  one channel.
                </li>
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  I&rsquo;d rather pay a predictable monthly fee than manage
                  hosting, security, and updates myself.
                </li>
                <li className="before:mr-2 before:text-[#10b981] before:content-['+']">
                  I want to be discoverable by Google, Meta, and AI shopping
                  agents from one product catalog.
                </li>
              </ul>
              <p>
                The lowest-risk way to decide is to just try it — the trial is
                free and cardless, so you can build a real store and see how it
                feels before paying anything.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: "Is Shopify worth it for a beginner?",
          answer:
            "For most beginners, yes. It handles hosting, security, checkout, and payments out of the box, so you focus on products and customers instead of infrastructure. The free, cardless trial lets you test it at no risk.",
        },
        {
          question: "Is Shopify good if I already sell on Amazon or Etsy?",
          answer:
            "Often yes, as a complement. Marketplaces own the customer relationship; a Shopify store gives you your own channel, email list, and higher repeat-buyer value. Many sellers run both and sync one catalog to each.",
        },
        {
          question: "When is Shopify NOT the right choice?",
          answer:
            "If you only need to collect payments (not run a store), sell a single membership or course, or want full server-level control of a self-hosted platform, a lighter or more specialized tool may fit better. The comparison guides above cover those cases.",
        },
        {
          question: "How much does Shopify cost to try?",
          answer:
            "Nothing to start — the trial requires no credit card. When you pick a plan, new stores typically get $1/month for the first 3 months on Basic, Grow, or Advanced.",
        },
      ]}
      relatedTitle="Compare & decide"
      related={[
        { title: "Kartra vs Shopify", href: "/blog/kartra-vs-shopify-2026" },
        { title: "Shopify vs Teachable", href: "/blog/shopify-vs-teachable-comparison" },
        { title: "Stripe Checkout vs Shopify", href: "/blog/stripe-checkout-vs-shopify-store" },
        { title: "Shopify Plus vs Advanced", href: "/blog/shopify-plus-vs-advanced-when-to-upgrade" },
        { title: "Start a Shopify store", href: "/start-a-shopify-store" },
        { title: "The $1/mo free-trial deal", href: "/shopify-free-trial-deal" },
      ]}
    />
  );
}
