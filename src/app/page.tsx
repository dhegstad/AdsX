import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { getAllPosts } from "@/lib/blog";
import { publicationTopics } from "@/lib/publication";

export default function HomePage() {
  const latest = getAllPosts().slice(0, 4);
  return <BrutalistLayout>
    <section className="border-b border-[#333] grid lg:grid-cols-[1.5fr_1fr]">
      <div className="p-8 md:p-16 lg:border-r border-[#333]">
        <p className="text-xs tracking-widest text-[#10b981] mb-6">SHOPIFY · ECOMMERCE · WHAT COMES NEXT</p>
        <h1 className="text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-3xl">Build a store.<br />Make it work better.</h1>
        <p className="text-lg md:text-xl text-[#aaa] max-w-2xl leading-relaxed mt-8">Practical guides to Shopify apps, running an ecommerce business, advertising, and AI. From your first product to the decisions that come after checkout.</p>
        <div className="flex flex-wrap gap-4 mt-9"><Link href="/topics" className="cta-btn cta-btn-primary">Find your next step →</Link><Link href="/blog" className="cta-btn">Read the publication →</Link></div>
      </div>
      <aside className="p-8 md:p-12 bg-[#101411] flex flex-col justify-center border-t lg:border-t-0 border-[#333]">
        <p className="text-xs tracking-widest text-[#10b981] mb-5">MAKE A BETTER APP DECISION</p>
        <h2 className="text-3xl md:text-4xl leading-tight">The right tools for the store you run.</h2>
        <p className="text-[#aaa] leading-relaxed mt-5 mb-7">Understand app categories, compare features and pricing, and check what Shopify already provides before adding another subscription.</p>
        <Link href="/topics/shopify-apps" className="text-[#10b981] underline underline-offset-4">Explore Shopify apps →</Link>
      </aside>
    </section>
    <section className="p-8 md:p-12 border-b border-[#333]">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8"><h2 className="text-3xl">What are you working on?</h2><Link href="/topics" className="text-[#10b981]">All topics →</Link></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{publicationTopics.map((topic, i) => <Link href={`/topics/${topic.slug}`} key={topic.slug} className="border border-[#333] p-6 hover:border-[#10b981] transition-colors"><p className="text-xs text-[#10b981] mb-4">0{i + 1}</p><h3 className="text-2xl mb-3">{topic.name}</h3><p className="text-[#aaa] leading-relaxed">{topic.description}</p></Link>)}</div>
    </section>
    <section className="grid md:grid-cols-2 border-b border-[#333]">
      <div className="p-8 md:p-12 md:border-r border-b md:border-b-0 border-[#333]"><p className="text-xs text-[#10b981] mb-4">YOUR FIRST STORE</p><h2 className="text-3xl mb-5">Decide before you subscribe.</h2><p className="text-[#aaa] mb-6 leading-relaxed">Work out whether Shopify fits your products, budget, and selling process. Then follow a setup guide built around the essentials.</p><Link href="/is-shopify-right-for-you" className="cta-btn">Check the fit →</Link></div>
      <div className="p-8 md:p-12"><p className="text-xs text-[#10b981] mb-4">FREE TOOLS</p><h2 className="text-3xl mb-5">Put numbers behind the decision.</h2><p className="text-[#aaa] mb-6 leading-relaxed">Check return on ad spend or review the completeness of a product feed before committing more budget.</p><div className="flex flex-wrap gap-4"><Link href="/tools/roas-calculator" className="cta-btn">ROAS calculator →</Link><Link href="/tools/feed-readiness-checker" className="text-[#10b981] self-center underline">Feed checker →</Link></div></div>
    </section>
    <section className="p-8 md:p-12"><h2 className="text-3xl mb-8">Latest from the publication</h2><div className="grid md:grid-cols-2 gap-6">{latest.map(post => <Link href={`/blog/${post.slug}`} key={post.slug} className="border-b border-[#333] pb-6"><p className="text-xs text-[#10b981] mb-3">{post.category} · {post.readingTime}</p><h3 className="text-xl mb-3 hover:text-[#10b981]">{post.title}</h3><p className="text-[#aaa] leading-relaxed">{post.excerpt}</p></Link>)}</div><p className="text-sm text-[#888] mt-8">AdsX is independent. We may earn a commission from qualifying Shopify referrals. <Link href="/editorial-policy" className="underline">Read our editorial and affiliate policy.</Link></p></section>
  </BrutalistLayout>;
}
