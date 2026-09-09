import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { ShopifyStartupCostCalculator } from "@/components/shopify-startup-cost-calculator";
import { AffiliateCTA } from "@/components/blog/affiliate-cta";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, createFAQSchema, SchemaScript } from "@/lib/seo/schemas";

const PATH = "/tools/shopify-startup-cost-calculator";
const FAQS = [
  { question: "How much does it cost to start a Shopify store?", answer: "Your startup budget depends on inventory, setup work, recurring tools, fulfillment, and the cash buffer you choose. This calculator adds your one-time startup spending to a reserve for fixed monthly costs. Its example amounts are not Shopify prices or a recommended budget. Use actual quotes for your business." },
  { question: "Does the calculator use current Shopify plan prices?", answer: "No. The subscription field is an editable example. Enter the normal price quoted for your location and billing term, after any introductory promotion. For annual subscriptions, enter the monthly equivalent for operating costs and separately allow for the actual upfront payment in your cash plan." },
  { question: "Why are initial inventory and product cost separate?", answer: "Initial inventory is a cash purchase before you sell. Product cost per order is the cost of the items sold. The calculator includes opening inventory in upfront cash and deducts product costs from each order; it does not deduct the entire inventory purchase again from the monthly operating result." },
  { question: "How are break-even orders calculated?", answer: "The calculator divides fixed monthly costs, including the entered marketing budget, by contribution per order and rounds up to a whole order. Contribution is product revenue plus customer-paid shipping, less per-order costs and estimated fees. If contribution is zero or negative, sales cannot cover positive fixed costs. With zero fixed costs, zero orders breaks even." },
  { question: "Can I use this for digital products or print-on-demand?", answer: "Yes. Use zero for costs that do not apply, such as physical shipping for a download. Add relevant delivery software to monthly app costs and delivery or support charges to the appropriate per-order costs. For print-on-demand, enter the supplier's product and shipping charges separately and allow for the timing of supplier payments." },
  { question: "What does the estimate leave out?", answer: "The model excludes sales tax, duties, financing, income tax, and costs you have not entered. It assumes a representative order, one payment per order, and a fixed monthly marketing budget. Actual payment fee bases and rounding can differ. The buffer covers fixed costs only; annual prepayments, inventory replenishment, and delayed payouts can need additional cash. Owner pay is included only if you add it." },
  { question: "Can I save or share my budget?", answer: "Download a CSV worksheet containing your inputs, results, currency label, and assumptions. No account or email is needed. The numbers stay in this page and the file is created in your browser. Changing currency relabels the amounts; it does not convert them." },
];

export const metadata: Metadata = createPageMetadata({
  title: "Shopify Startup Cost Calculator: Budget & Break-Even",
  description: "Estimate Shopify startup costs, monthly expenses, contribution per order, and break-even sales. Free calculator with editable inputs and a downloadable budget worksheet.",
  path: PATH,
  keywords: ["Shopify startup cost calculator", "Shopify store cost calculator", "Shopify startup budget", "ecommerce break even calculator", "cost to start a Shopify store"],
});

export default function StartupCostCalculatorPage() {
  const breadcrumbs = [{ name: "Home", path: "/" }, { name: "Shopify startup cost calculator", path: PATH }];
  return <>
    <SchemaScript schema={createBreadcrumbSchema(breadcrumbs)} />
    <SchemaScript schema={createFAQSchema(FAQS)} />
    <SchemaScript schema={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Shopify Startup Cost Calculator", description: "Estimate upfront store spending, a fixed-cost cash buffer, monthly operating costs, and break-even orders using your own inputs.", url: `https://www.adsx.com${PATH}`, applicationCategory: "BusinessApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "AdsX", url: "https://www.adsx.com" }, isAccessibleForFree: true }} />
    <BrutalistLayout>
      <header className="p-6 sm:p-8 md:p-14 border-b border-[#333]">
        <p className="text-xs tracking-widest text-[#10b981] mb-6"><Link href="/" className="hover:underline">ADSX</Link><span className="mx-3 text-[#777]">/</span>FREE STORE PLANNING TOOL</p>
        <h1 className="max-w-4xl text-4xl md:text-6xl tracking-tight leading-[1.03]" style={{ fontFamily: "var(--font-display)" }}>Shopify startup cost calculator</h1>
        <p className="max-w-3xl text-lg text-[#aaa] mt-6 leading-relaxed">Work out what it takes to open your store—and how many orders cover the monthly costs. Adjust an example budget, explore the tradeoffs, and download your worksheet.</p>
        <div className="flex flex-wrap gap-x-7 gap-y-3 mt-7 text-xs text-[#aaa]"><span>01 &nbsp; Startup spending</span><span>02 &nbsp; Monthly commitments</span><span>03 &nbsp; Order economics</span></div>
      </header>

      <section className="p-5 sm:p-8 md:p-12 border-b border-[#333]" aria-label="Interactive startup budget">
        <ShopifyStartupCostCalculator />
      </section>

      <section className="p-6 sm:p-8 md:p-12 border-b border-[#333]">
        <p className="text-xs tracking-widest text-[#10b981] mb-5">UNDERSTAND THE ESTIMATE</p>
        <h2 className="text-3xl mb-8">A budget you can check line by line.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div><h3 className="text-xl mb-3">Startup cash</h3><p className="text-sm text-[#ccc] leading-relaxed">Opening inventory + theme, design and setup + other one-time costs. The fixed-cost buffer adds the monthly commitments multiplied by your chosen number of months.</p><p className="text-sm text-[#999] leading-relaxed mt-3">The buffer is money set aside. It is not deducted from monthly operating results.</p></div>
          <div><h3 className="text-xl mb-3">Contribution per order</h3><p className="text-sm text-[#ccc] leading-relaxed">Product revenue + shipping collected − product cost − packaging and fulfillment − shipping labels − refund/replacement allowance − estimated payment and platform fees.</p><p className="text-sm text-[#999] leading-relaxed mt-3">Percentage fees use product revenue plus shipping. Fee estimates are rounded to cents per order; actual provider rules may differ.</p></div>
          <div><h3 className="text-xl mb-3">Monthly break-even</h3><p className="text-sm text-[#ccc] leading-relaxed">Fixed monthly costs ÷ contribution per order, rounded up. Your operating result is contribution per order × monthly orders − fixed monthly costs.</p><p className="text-sm text-[#999] leading-relaxed mt-3">This covers the month at the entered marketing budget. It does not tell you when you recover your initial investment.</p></div>
        </div>
        <div className="border border-[#333] bg-[#111] p-6 mt-9 max-w-4xl">
          <h3 className="text-lg mb-3">The example, explained</h3>
          <p className="text-sm text-[#aaa] leading-relaxed">The starting USD example has $1,500 of upfront spending and $250 in fixed monthly costs. A three-month fixed-cost buffer adds $750, for a $2,250 planning amount. Each $54 order, including shipping, contributes $22.08 after the entered variable costs. Twelve orders cover the fixed monthly costs. At 50 orders, the modeled monthly operating result is $854 before income tax.</p>
          <p className="text-xs text-[#999] leading-relaxed mt-3">These numbers explain the example, not a typical merchant outcome. Replace them with quotes and observed costs as your store develops.</p>
        </div>
      </section>

      <section className="p-6 sm:p-8 md:p-12 border-b border-[#333]">
        <h2 className="text-3xl mb-5">Use your actual prices and payment terms.</h2>
        <p className="text-[#aaa] leading-relaxed max-w-3xl">Check the <a href="https://www.shopify.com/pricing" target="_blank" rel="noopener noreferrer" className="text-[#10b981] underline underline-offset-4">Shopify quote for your location</a> and the costs of your chosen apps. Shopify distinguishes recurring, usage-based, and one-time charges in its <a href="https://help.shopify.com/en/manual/your-account/manage-billing/billing-charges" target="_blank" rel="noopener noreferrer" className="text-[#10b981] underline underline-offset-4">billing documentation</a>. The calculator uses a normal operating month, so keep introductory discounts and annual upfront payments in a separate cash timeline.</p>
        <div className="grid sm:grid-cols-2 gap-4 mt-8">{[
          ["/blog/shopify-pricing-2026-every-plan-real-cost", "Compare plans and the full store cost"],
          ["/blog/true-cost-running-shopify-store-first-year", "Build your first-year cost worksheet"],
          ["/blog/how-to-validate-product-demand-before-shopify-store", "Validate the product before buying stock"],
          ["/blog/first-30-days-shopify-store-checklist", "Work through the first-month checklist"],
        ].map(([href, title]) => <Link href={href} key={href} className="border border-[#333] hover:border-[#10b981] p-5 text-[#ccc] hover:text-[#10b981]">{title} →</Link>)}</div>
      </section>

      <section className="p-6 sm:p-8 md:p-12 border-b border-[#333]">
        <h2 className="text-3xl mb-8">Startup budget questions</h2>
        <div className="max-w-4xl space-y-8">{FAQS.map(faq => <div key={faq.question}><h3 className="text-lg font-semibold mb-3">{faq.question}</h3><p className="text-sm text-[#aaa] leading-relaxed">{faq.answer}</p></div>)}</div>
      </section>
      <div className="p-6 sm:p-8 md:p-12"><AffiliateCTA slug="shopify-startup-cost-calculator" placement="cta-footer" /></div>
    </BrutalistLayout>
  </>;
}
