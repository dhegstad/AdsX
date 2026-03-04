import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { BrutalistBlogListing } from "@/components/blog/brutalist-blog-listing";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Blog | AI Search Advertising Insights",
  description: "Expert insights on AI search advertising, ChatGPT ads, content optimization for LLMs, and strategies for capturing visibility in AI-powered search.",
  openGraph: {
    title: "Blog | AdsX - AI Search Advertising Insights",
    description: "Expert insights on AI search advertising, ChatGPT ads, and strategies for AI visibility.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.adsx.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ])} />
      <BrutalistBlogListing posts={posts} categories={categories} />
    </>
  );
}
