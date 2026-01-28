import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogListingContent } from "@/components/blog/blog-listing-content";

export const metadata: Metadata = {
  title: "Blog | AI Search Advertising Insights",
  description: "Expert insights on AI search advertising, ChatGPT ads, content optimization for LLMs, and strategies for capturing visibility in AI-powered search.",
  openGraph: {
    title: "Blog | AdsX - AI Search Advertising Insights",
    description: "Expert insights on AI search advertising, ChatGPT ads, and strategies for AI visibility.",
    type: "website",
  },
  alternates: {
    canonical: "https://adsx.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogListingContent posts={posts} />;
}
