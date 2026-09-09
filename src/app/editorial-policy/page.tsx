import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({ title: "Editorial Policy & Affiliate Disclosure", description: "How AdsX sources articles, handles corrections, discloses Shopify affiliate links, and separates editorial guidance from its developing app.", path: "/editorial-policy" });

export default function EditorialPolicy() {
  return <BrutalistLayout><article className="p-8 md:p-16 max-w-4xl space-y-7 leading-relaxed text-[#bbb]">
    <p className="text-[#10b981] text-xs tracking-widest">OUR PUBLICATION · SEPTEMBER 9, 2026</p><h1 className="text-4xl md:text-5xl text-[#EAEAEA]">How we publish</h1>
    <p>AdsX publishes practical guidance for people starting and running Shopify businesses. We cover apps, ecommerce operations, advertising, AI, and development. Our aim is to help readers make decisions they can explain and check.</p>
    <h2 className="text-2xl text-[#EAEAEA]">Sources and examples</h2><p>Our standard for new articles and substantive updates is to link changeable product, pricing, and technical claims to primary documentation. We identify the date or version when it matters. Worked examples are labeled as assumptions, not customer results. A feature comparison based on documentation is not described as a hands-on test.</p>
    <h2 className="text-2xl text-[#EAEAEA]">Authorship and AI assistance</h2><p>Articles may use AI assistance for research organization, drafting, or editing. A team byline identifies AdsX editorial work; it does not imply an interview, a named expert review, or a product test. We do not attribute an article to an individual who has not written or reviewed it.</p>
    <h2 className="text-2xl text-[#EAEAEA]">Shopify affiliate links</h2><p>AdsX participates in Shopify's affiliate program. We may receive a commission when an eligible reader follows a Shopify referral link and becomes a qualifying paid merchant. This adds no extra charge to the reader. Some links to Shopify, including links within articles, are affiliate links. Offers and eligibility can vary; check the terms shown by Shopify before choosing a plan.</p>
    <h2 className="text-2xl text-[#EAEAEA]">Our interest in post-purchase advertising</h2><p>AdsX is also developing a Shopify advertising app. We have a commercial interest in this category and identify that relationship in relevant new coverage. Proposed app capabilities and hypothetical advertising returns must not be presented as released features or proven earnings.</p>
    <h2 className="text-2xl text-[#EAEAEA]">Updates and corrections</h2><p>We are reviewing our existing library against these standards. Older articles may not yet meet every part of the current policy. An updated date should reflect a meaningful change, not a cosmetic date refresh. If you find an error, send the article URL, the disputed statement, and a supporting source to <a href="mailto:hello@adsx.com?subject=AdsX%20editorial%20correction" className="underline text-[#10b981]">hello@adsx.com</a>.</p>
    <Link href="/topics" className="cta-btn">Explore the publication →</Link>
  </article></BrutalistLayout>;
}
