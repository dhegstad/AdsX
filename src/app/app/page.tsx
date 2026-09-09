import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({ title: "AdsX Shopify App — In Development", description: "AdsX is developing a free Shopify app for third-party offers on Thank you and Order status pages, with advertising revenue shared with merchants.", path: "/app" });

export default function AppPage() {
  return <BrutalistLayout>
    <header className="p-8 md:p-16 border-b border-[#333]"><p className="text-[#10b981] text-xs tracking-widest mb-5">ADSX FOR SHOPIFY · IN DEVELOPMENT</p><h1 className="text-4xl md:text-6xl max-w-4xl tracking-tight">A new way to earn after checkout.</h1><p className="max-w-2xl text-lg text-[#aaa] leading-relaxed mt-6">We are building a free Shopify app that would display third-party advertisements on your Thank you and Order status pages and share the advertising revenue with your store.</p><div className="flex flex-wrap gap-4 mt-8"><Link href="/contact" className="cta-btn cta-btn-primary">Ask about AdsX →</Link><Link href="/topics/running-a-store" className="cta-btn">Explore merchant guides →</Link></div></header>
    <section className="grid md:grid-cols-3 border-b border-[#333]">{[
      ["01", "A free app", "The planned merchant offer is free installation. AdsX would earn through advertising and share that revenue with participating stores."],
      ["02", "Offers after checkout", "The intended placements are the Thank you and Order status pages, where customers return for confirmation and order information."],
      ["03", "A share for your store", "Your store would receive a share of qualifying advertising revenue. Revenue-share percentages, payout terms, and eligibility will be announced before launch."],
    ].map(([n, title, body]) => <div key={n} className="p-8 md:p-10 border-r border-[#333]"><p className="text-xs text-[#10b981] mb-4">{n}</p><h2 className="text-2xl mb-3">{title}</h2><p className="text-[#aaa] leading-relaxed">{body}</p></div>)}</section>
    <section className="p-8 md:p-16 max-w-4xl"><h2 className="text-3xl mb-6">What is available today?</h2><p className="text-[#aaa] leading-relaxed">The AdsX publication and free tools are available now. The Shopify app is near completion and has not yet been submitted to Shopify for approval. There is no public installation link or announced launch date yet. We will publish supported plans, placement details, merchant controls, and commercial terms when they are confirmed.</p><h2 className="text-3xl mt-10 mb-5">Who is it being built for?</h2><p className="text-[#aaa] leading-relaxed">Shopify merchants interested in evaluating an additional source of revenue after a purchase. Order information and the customer relationship still come first. The publication covers the broader work of choosing apps and running a store.</p><h2 className="text-3xl mt-10 mb-5">Will it work for my store?</h2><p className="text-[#aaa] leading-relaxed">Store and market eligibility are not finalized. Contact us about your use case. We are not publishing earnings estimates as product results, and an inquiry does not install an app or commit your store to participation.</p><Link href="/contact" className="cta-btn mt-8">Discuss your store →</Link></section>
  </BrutalistLayout>;
}
