import Link from "next/link";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { publicationTopics, getTopicSlugs } from "@/lib/publication";
import { getAllPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({ title: "Shopify & Ecommerce Topics", description: "Explore Shopify apps, starting a store, post-purchase commerce, advertising, AI, and development with AdsX's curated guides.", path: "/topics" });

export default function TopicsPage() {
  const posts = getAllPosts();
  return <BrutalistLayout>
    <header className="border-b border-[#333] p-8 md:p-16"><p className="text-[#10b981] text-xs tracking-widest mb-4">THE ADSX PUBLICATION</p><h1 className="text-4xl md:text-6xl tracking-tight">What are you working on?</h1><p className="text-[#aaa] max-w-2xl text-lg mt-6">Start with your next decision. Find a reading path through our coverage of Shopify, apps, ecommerce, advertising, and AI.</p></header>
    <div className="grid md:grid-cols-2 lg:grid-cols-3">{publicationTopics.map(topic => <Link key={topic.slug} href={`/topics/${topic.slug}`} className="p-8 border-b border-r border-[#333] hover:bg-[#111] group"><p className="text-xs text-[#10b981] mb-4">{posts.filter(p => getTopicSlugs(p).includes(topic.slug)).length} ARTICLES</p><h2 className="text-2xl mb-3 group-hover:text-[#10b981]">{topic.name}</h2><p className="text-[#aaa] leading-relaxed">{topic.description}</p><p className="text-sm mt-6">Explore topic →</p></Link>)}</div>
    <div className="p-8 md:p-12 flex flex-wrap gap-5"><Link href="/blog" className="cta-btn">Latest articles →</Link><Link href="/editorial-policy" className="cta-btn">How we publish →</Link><a href="/feed.xml" className="cta-btn">Follow via RSS →</a></div>
  </BrutalistLayout>;
}
