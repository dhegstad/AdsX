import Link from "next/link";
import { notFound } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { ArticleCTA } from "@/components/blog/article-cta";
import { publicationTopics, getTopicSlugs, whopReadingPaths } from "@/lib/publication";
import { getAllPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export function generateStaticParams() { return publicationTopics.map(topic => ({ topic: topic.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params;
  const topic = publicationTopics.find(t => t.slug === slug);
  return topic ? createPageMetadata({ title: `${topic.name}: Guides & Resources`, description: topic.description, path: `/topics/${slug}` }) : {};
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params;
  const topic = publicationTopics.find(t => t.slug === slug);
  if (!topic) notFound();
  const posts = getAllPosts().filter(p => getTopicSlugs(p).includes(slug));
  const picked = topic.picks.map(pick => posts.find(p => p.slug === pick)).filter(p => p !== undefined);
  const rest = posts.filter(p => !picked.some(pick => pick.slug === p.slug));
  const whopUnassigned = posts.filter(post => !whopReadingPaths.some(path => path.slugs.includes(post.slug)));
  return <BrutalistLayout>
    <SchemaScript schema={createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Topics", path: "/topics" }, { name: topic.name, path: `/topics/${slug}` }])} />
    <header className="border-b border-[#333] p-8 md:p-16"><Link href="/topics" className="text-[#10b981] text-sm">← All topics</Link><h1 className="text-4xl md:text-6xl tracking-tight mt-6">{topic.name}</h1><p className="max-w-3xl text-lg text-[#aaa] leading-relaxed mt-6">{topic.intro}</p><p className="text-xs text-[#10b981] mt-5">{posts.length} ARTICLES · CURATED READING PATH</p></header>
    {slug === "whop" && <p className="px-8 md:px-16 py-5 text-sm text-[#aaa] border-b border-[#333]">AdsX owner Dennis Hegstad is employed at Whop, and AdsX participates in Whop’s partner referral program. <Link href="/editorial-policy" className="underline text-[#10b981]">Read our editorial policy.</Link></p>}
    {slug === "whop" && <section className="p-8 md:p-12 border-b border-[#333] bg-[#101a15]"><p className="text-xs text-[#10b981] mb-3">FREE LAUNCH RESOURCE</p><h2 className="text-2xl mb-3">Check the whole journey before your first sale.</h2><p className="text-[#aaa] max-w-2xl mb-5">Work through 18 checks for your offer, costs, checkout, delivery, and exception handling. No email required.</p><Link href="/resources/whop-launch-checklist" className="text-[#10b981] underline underline-offset-4">Use the Whop launch checklist →</Link></section>}
    {slug === "start-a-store" && <section className="p-8 md:p-12 border-b border-[#333] bg-[#101a15]"><p className="text-xs text-[#10b981] mb-3">FREE PLANNING TOOL</p><h2 className="text-2xl mb-3">Put a budget behind your store idea.</h2><p className="text-[#aaa] max-w-2xl mb-5">Estimate upfront spending, monthly commitments, and the orders needed to cover your costs.</p><Link href="/tools/shopify-startup-cost-calculator" className="text-[#10b981] underline underline-offset-4">Use the Shopify startup cost calculator →</Link><p className="mt-4"><Link href="/resources/shopify-launch-checklist" className="text-[#10b981] underline underline-offset-4">Use the launch checklist →</Link></p></section>}
    {slug !== "whop" && <section className="p-8 md:p-12 border-b border-[#333]"><h2 className="text-2xl mb-6">Start here</h2><ol className="grid md:grid-cols-2 gap-6">{picked.map((post, i) => <li key={post.slug} className="border border-[#333] p-6"><Link href={`/blog/${post.slug}`}><span className="text-[#10b981] text-xs">{String(i + 1).padStart(2, "0")} · {post.readingTime}</span><h3 className="text-xl mt-3 mb-2 hover:text-[#10b981]">{post.title}</h3><p className="text-[#aaa] text-sm leading-relaxed">{post.excerpt}</p></Link></li>)}</ol></section>}
    {slug !== "whop" && rest.length > 0 && <section className="p-8 md:p-12"><h2 className="text-2xl mb-6">More in {topic.name.toLowerCase()}</h2><div className="grid md:grid-cols-2 gap-x-10">{rest.map(post => <Link key={post.slug} href={`/blog/${post.slug}`} className="py-5 border-b border-[#333]"><h3 className="text-lg hover:text-[#10b981]">{post.title}</h3><p className="text-sm text-[#aaa] mt-2">{post.excerpt}</p></Link>)}</div></section>}
    {slug === "whop" && <>
      <nav aria-label="Whop reading paths" className="p-8 md:px-12 border-b border-[#333]">
        <p className="text-sm text-[#aaa] mb-4">Choose your reading path</p>
        <div className="flex flex-wrap gap-3">{whopReadingPaths.map(path => <a key={path.id} href={`#${path.id}`} className="border border-[#444] px-4 py-3 text-sm hover:border-[#10b981] hover:text-[#10b981]">{path.name}</a>)}</div>
      </nav>
      {whopReadingPaths.map(path => <section key={path.id} id={path.id} className="p-8 md:p-12 border-b border-[#333] scroll-mt-24">
        <h2 className="text-2xl md:text-3xl">{path.name}</h2>
        <p className="text-[#aaa] mt-3 mb-6 max-w-2xl">{path.description}</p>
        <div className="grid md:grid-cols-2 gap-x-10">{path.slugs.map(articleSlug => posts.find(post => post.slug === articleSlug)).filter(post => post !== undefined).map(post => <Link key={post.slug} href={`/blog/${post.slug}`} className="py-5 border-b border-[#333] group">
          <span className="text-xs text-[#10b981]">{post.readingTime}</span>
          <h3 className="text-xl mt-2 group-hover:text-[#10b981]">{post.title}</h3>
          <p className="text-sm text-[#aaa] leading-relaxed mt-2">{post.excerpt}</p>
        </Link>)}</div>
      </section>)}
      {whopUnassigned.length > 0 && <section className="p-8 md:p-12 border-b border-[#333]">
        <h2 className="text-2xl mb-6">More Whop guides</h2>
        <div className="grid md:grid-cols-2 gap-x-10">{whopUnassigned.map(post => <Link key={post.slug} href={`/blog/${post.slug}`} className="py-5 border-b border-[#333]"><h3 className="text-xl hover:text-[#10b981]">{post.title}</h3><p className="text-sm text-[#aaa] mt-2">{post.excerpt}</p></Link>)}</div>
      </section>}
    </>}
    <div className="p-8 md:p-12"><ArticleCTA slug={`topic-${slug}`} intent={topic.intent} placement="cta-footer" /></div>
  </BrutalistLayout>;
}
