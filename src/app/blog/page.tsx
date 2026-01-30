import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { BrutalistBlogListing } from "@/components/blog/brutalist-blog-listing";

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
  const categories = getAllCategories();

  return <BrutalistBlogListing posts={posts} categories={categories} />;
}
