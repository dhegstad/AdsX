import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getPaginatedPosts, getAllCategories } from "@/lib/blog";
import { BrutalistBlogListing } from "@/components/blog/brutalist-blog-listing";
import { createBreadcrumbSchema, SchemaScript } from "@/lib/seo/schemas";

const POSTS_PER_PAGE = 20;

interface PageProps {
  params: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  const pageNum = parseInt(page, 10);
  const { totalPages } = getPaginatedPosts(pageNum, POSTS_PER_PAGE);

  if (isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) {
    return {};
  }

  const title = `Blog - Page ${pageNum} | AI Search Insights`;
  const description = `Page ${pageNum} of expert insights on AI search advertising, ChatGPT ads, and strategies for AI visibility.`;
  const canonical = `https://www.adsx.com/blog/page/${pageNum}`;

  const links: Record<string, string> = {};
  if (pageNum > 1) {
    links.prev = pageNum === 2 ? "https://www.adsx.com/blog" : `https://www.adsx.com/blog/page/${pageNum - 1}`;
  }
  if (pageNum < totalPages) {
    links.next = `https://www.adsx.com/blog/page/${pageNum + 1}`;
  }

  return {
    title,
    description,
    openGraph: {
      title: `Blog - Page ${pageNum} | AdsX`,
      description,
      type: "website",
    },
    alternates: {
      canonical,
    },
    other: links,
  };
}

export function generateStaticParams() {
  const { totalPages } = getPaginatedPosts(1, POSTS_PER_PAGE);
  // Skip page 1 since it's handled by /blog
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export default async function PaginatedBlogPage({ params }: PageProps) {
  const { page } = await params;
  const pageNum = parseInt(page, 10);

  // Redirect page 1 to canonical /blog
  if (pageNum === 1) {
    redirect("/blog");
  }

  const { posts, totalPages, currentPage, totalPosts } = getPaginatedPosts(pageNum, POSTS_PER_PAGE);
  const categories = getAllCategories();

  // Redirect invalid pages
  if (isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) {
    redirect("/blog");
  }

  return (
    <>
      <SchemaScript schema={createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: `Page ${currentPage}`, path: `/blog/page/${currentPage}` },
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
