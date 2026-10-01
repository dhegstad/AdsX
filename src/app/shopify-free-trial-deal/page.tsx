import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/metadata";
import { withShopifyAffiliate } from "@/lib/affiliate";
import { HubPage } from "@/components/marketing/hub-page";

const linkStyle = "text-[#10b981] underline underline-offset-4 hover:text-[#EAEAEA] transition-colors";

export const metadata = createPageMetadata({
  title: "Shopify Free Trial + $1/Month: Check Your Offer",
  description:
    "Check Shopify's current trial and $1/month promotion, eligibility, billing dates, and renewal costs. A practical checklist before choosing a paid plan.",
  path: "/shopify-free-trial-deal",
  keywords: ["shopify free trial", "shopify $1 a month", "shopify trial offer", "shopify promo"],
});

export default function ShopifyFreeTrialDealPage() {
  return (
    <HubPage
      slug="shopify-free-trial-deal"
      eyebrow="SHOPIFY // THE OFFER"
      title="Shopify Free Trial + $1/Month Deal"
      subtitle="Check the offer available to your store, then plan for the full subscription cost. Pricing, currency, and eligibility can vary."
      intro={
        <p>
          <strong className="text-[#EAEAEA]">Reviewed October 1, 2026:</strong>{" "}
          <a href={withShopifyAffiliate("https://www.shopify.com/pricing", { slug: "shopify-free-trial-deal", placement: "inline" })} rel="sponsored" className={linkStyle}>Shopify&rsquo;s U.S. pricing page</a>{" "}
          advertises three days free followed by $1/month for three months.
          That is $3 in promotional plan charges, with other store expenses
          separate. Confirm your own offer before selecting a paid plan.
        </p>
      }
      sections={[
        {
          heading: "Check the offer you actually receive",
          body: (
            <>
              <p>
                Record the currency, eligible plan, promotional end date, normal
                renewal amount, and billing frequency. Keep the confirmation
                for your first invoice review. An advertised monthly equivalent
                and an annual charge require different cash budgets.
              </p>
              <p>
                The <Link href="/blog/shopify-1-dollar-3-months-deal-2026" className={linkStyle}>promotion and billing guide</Link>{" "}
                includes a worksheet for the discount and later costs. Use the{" "}
                <Link href="/tools/shopify-startup-cost-calculator" className={linkStyle}>startup cost calculator</Link>{" "}
                to add your domain, apps, and operating assumptions.
              </p>
            </>
          ),
        },
        {
          heading: "Plan your trial before starting",
          body: (
            <>
              <p>
                Shopify&rsquo;s <a href="https://help.shopify.com/en/manual/intro-to-shopify/pricing-plans/free-trial" className={linkStyle}>trial documentation</a>{" "}
                explains that the trial starts at signup. Accepting customer
                orders requires a selected paid plan and configured payments;
                checkout is not automatically open just because a trial store exists.
              </p>
              <p>
                Prepare product details, shipping assumptions, and a short list
                of required features first. Then use the{" "}
                <Link href="/blog/shopify-free-trial-evaluation-scorecard" className={linkStyle}>trial evaluation scorecard</Link>{" "}
                to record what works and what still needs attention. Choose one
                realistic customer journey to evaluate, from finding a product
                through receiving the order confirmation.
              </p>
            </>
          ),
        },
        {
          heading: "Budget for the end of the promotion",
          body: (
            <>
              <p>
                Set a reminder before the discounted period ends. Review the
                normal subscription price alongside app renewals, fulfillment,
                and other costs. Judge the store against a budget you could
                sustain after the introductory offer.
              </p>
              <p>
                Considering annual billing? Compare the timing of the full
                payment with your inventory and launch expenses using the{" "}
                <Link href="/blog/shopify-annual-vs-monthly-billing-cash-flow" className={linkStyle}>annual versus monthly cash-flow guide</Link>.
              </p>
            </>
          ),
        },
        {
          heading: "Before you confirm a plan",
          body: (
            <>
              <ol className="ml-4 list-decimal list-inside space-y-2">
                <li>Verify the exact promotion shown to your account.</li>
                <li>Check the first charge and the normal renewal commitment.</li>
                <li>Review separately purchased apps, domains, and themes.</li>
                <li>Save the confirmation and your store evaluation notes.</li>
              </ol>
              <p>
                If you decide to stop, follow Shopify&rsquo;s{" "}
                <a href="https://help.shopify.com/en/manual/your-account/manage-orgs-and-stores/manage-pricing-plan/deactivate-store" className={linkStyle}>cancellation instructions</a>.
                Outstanding charges and externally billed services still need attention.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: "Is the offer $1 total for three months?",
          answer: "No. At $1 per month, three promotional months add up to $3 in subscription charges. Apps and other store expenses are separate.",
        },
        {
          question: "Does every store receive the same promotion?",
          answer: "No. Confirm the offer, currency, and eligible plan presented to your account. Do not rely on an old price screenshot or assume a partner link guarantees eligibility.",
        },
        {
          question: "What should I record before choosing a plan?",
          answer: "Save the promotional price and end date, normal renewal amount, billing frequency, and any separate purchases. Use those details for your budget and invoice review.",
        },
      ]}
      relatedTitle="Plan your first store"
      related={[
        { title: "Promotion and billing checks", href: "/blog/shopify-1-dollar-3-months-deal-2026" },
        { title: "Complete free-trial guide", href: "/blog/shopify-free-trial-2026-complete-guide" },
        { title: "Trial evaluation scorecard", href: "/blog/shopify-free-trial-evaluation-scorecard" },
        { title: "Startup cost calculator", href: "/tools/shopify-startup-cost-calculator" },
        { title: "Budget for your first orders", href: "/blog/shopify-store-budget-10-50-100-orders" },
        { title: "Is Shopify right for you?", href: "/is-shopify-right-for-you" },
      ]}
    />
  );
}
