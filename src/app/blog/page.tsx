import type { Metadata } from "next";
import { getPaginatedPosts, getAllCategories } from "@/lib/blog";
import { BrutalistBlogListing } from "@/components/blog/brutalist-blog-listing";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

// Enable ISR for blog listing - revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog | Shopify & Ecommerce Guides",
  description: "Practical guides to Shopify apps, ecommerce, advertising, AI, and starting an online store.",
  openGraph: {
    title: "Blog | AdsX - Shopify & Ecommerce Guides",
    description: "Shopify apps, ecommerce, advertising, AI, and store setup guides.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.adsx.com/blog",
  },
};

export default function BlogPage() {
  const { posts, totalPages, currentPage, totalPosts } = getPaginatedPosts(1, 20);
  const categories = getAllCategories();

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ])} />
      <BrutalistBlogListing
        posts={posts}
        categories={categories}
        currentPage={currentPage}
        totalPages={totalPages}
        totalPosts={totalPosts}
      />
    </>
  );
}
