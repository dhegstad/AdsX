import { launchChecklistGroups as groups } from "@/lib/shopify-launch-checklist";
import type { Metadata } from "next";
import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { AffiliateCTA } from "@/components/blog/affiliate-cta";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({title:"Shopify Launch Checklist: Budget, Setup & First Order",description:"A free, printable Shopify launch checklist covering costs, products, payments, delivery, test orders, and a first-week review. No email required.",path:"/resources/shopify-launch-checklist"});

export default function LaunchChecklistPage(){return <BrutalistLayout><main>
  <header className="p-6 md:p-12 border-b border-[#333]"><p className="text-xs text-[#10b981] tracking-widest mb-5">FREE STORE PLANNING RESOURCE</p><h1 className="text-4xl md:text-6xl max-w-4xl">Your Shopify launch checklist</h1><p className="text-[#aaa] max-w-3xl mt-6 leading-relaxed">Work through the decisions that turn a store design into a working business. Check each item on paper or in your own notes. This is a planning checklist; your business and location may require additional steps.</p><a className="inline-block mt-6 border border-[#555] px-5 py-3" href="/downloads/shopify-launch-checklist.html" target="_blank" rel="noopener">Open printable checklist →</a><p className="text-xs text-[#888] mt-4">Reviewed September 16, 2026 · No email required</p></header>
  <div className="grid md:grid-cols-2">{groups.map(group=><section key={group.name} className="p-6 md:p-10 border-b border-r border-[#333]"><h2 className="text-2xl mb-5">{group.name}</h2><ul className="space-y-4 text-sm text-[#bbb] leading-relaxed">{group.items.map(item=><li key={item} className="flex gap-3"><span aria-hidden="true" className="mt-1 w-3 h-3 shrink-0 border border-[#888]"/>{item}</li>)}</ul><Link href={group.href} className="inline-block text-[#10b981] underline mt-6">{group.label} →</Link></section>)}</div>
  <section className="p-6 md:p-12 border-b border-[#333]"><h2 className="text-2xl mb-5">Use the official setup instructions for your store.</h2><p className="text-[#aaa] max-w-3xl leading-relaxed">Our sequence is an editorial planning aid. For the current platform steps, see Shopify's <a className="underline" href="https://help.shopify.com/en/manual/intro-to-shopify/initial-setup">setup guide</a> and <a className="underline" href="https://help.shopify.com/en/manual/checkout-settings/test-orders">test order instructions</a>. Confirm current pricing and eligibility before selecting a paid plan.</p></section>
  <div className="p-6 md:p-12"><AffiliateCTA slug="shopify-launch-checklist" placement="cta-footer"/></div>
</main></BrutalistLayout>;}
