import Link from "next/link";
import Image from "next/image";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { WhopLaunchChecklist } from "@/components/whop-launch-checklist";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata = createPageMetadata({
  title: "Whop Launch Checklist: Product, Checkout & Delivery",
  description: "An interactive Whop launch checklist with 18 checks for your offer, fees, checkout, fulfillment, exceptions, and first orders. No email required.",
  path: "/resources/whop-launch-checklist",
  image: "https://www.adsx.com/images/whop/ecommerce-workflow.png",
});

export default function WhopLaunchChecklistPage() {
  return <BrutalistLayout><main data-whop-checklist>
    <SchemaScript schema={createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Whop", path: "/topics/whop" }, { name: "Launch checklist", path: "/resources/whop-launch-checklist" }])} />
    <header data-resource-header className="p-6 md:p-12 border-b border-[#333]">
      <Link className="text-[#10b981] text-sm" href="/topics/whop">← Whop guides</Link>
      <h1 className="text-4xl md:text-6xl max-w-4xl mt-6">Your Whop launch checklist</h1>
      <p className="text-[#bbb] max-w-3xl mt-6 text-lg leading-relaxed">Take one offer from a clear promise to a correctly delivered order. Work through these 18 checks before expanding your catalog or sending more traffic to checkout.</p>
      <p className="text-sm text-[#888] mt-4">Published October 4, 2026 · No email required · An AdsX planning resource</p>
      <p className="text-sm text-[#aaa] mt-4 max-w-3xl">AdsX owner Dennis Hegstad is employed at Whop, and AdsX participates in Whop’s partner referral program. <Link className="underline text-[#10b981]" href="/editorial-policy">Read our editorial policy.</Link></p>
      <Image src="/images/whop/ecommerce-workflow.png" alt="Four connected stages: offer, payment, delivery, and support." width={1280} height={720} className="mt-8 max-w-3xl w-full border border-[#333]" />
    </header>
    <WhopLaunchChecklist />
    <section className="p-6 md:p-12 border-b border-[#333]">
      <h2 className="text-2xl mb-5">How to use this checklist</h2>
      <p className="text-[#bbb] max-w-3xl leading-relaxed">Work with one representative product. Keep a separate note with the evidence for each check: the reviewed price, the tested access result, or the matching fulfillment record. A checked box is your record of a review; this page does not validate your account or connect to Whop.</p>
      <p className="text-[#bbb] max-w-3xl leading-relaxed mt-5">For the current platform steps, use Whop’s <a className="underline text-[#10b981]" href="https://docs.whop.com/manage-your-business/products/create-product">product setup</a>, <a className="underline text-[#10b981]" href="https://docs.whop.com/manage-your-business/payment-processing/create-checkout-link">checkout-link instructions</a>, and <a className="underline text-[#10b981]" href="https://docs.whop.com/supported-business-models/dtc-ecommerce">DTC ecommerce guide</a>. The public physical-product pages and setup documentation differ in integration detail; confirm the fulfillment connection supported for your account.</p>
      <p className="text-[#bbb] max-w-3xl leading-relaxed mt-5">This planning aid does not cover every product, country, or business obligation. Add the checks specific to what you sell. If you are still choosing a platform, start with our <Link className="underline text-[#10b981]" href="/blog/whop-vs-shopify">Whop and Shopify comparison</Link>.</p>
    </section>
  </main></BrutalistLayout>;
}
