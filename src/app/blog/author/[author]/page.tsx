import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Twitter, Linkedin } from "lucide-react";
import { ThemedLayout } from "@/components/themed-layout";
import { authors, getAuthorBySlug, getPostsByAuthor } from "@/lib/blog";

interface PageProps {
  params: Promise<{ author: string }>;
}

// Old fake author slugs - redirect to team page
const deprecatedAuthors = ["sarah-chen", "marcus-rodriguez", "dr-james-liu"];

export async function generateStaticParams() {
  // Include both current and deprecated authors for static generation
  return [...authors.map((a) => ({ author: a.slug })), ...deprecatedAuthors.map((a) => ({ author: a }))];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { author: authorSlug } = await params;

  // Redirect deprecated authors
  if (deprecatedAuthors.includes(authorSlug)) {
    return {
      title: "Redirecting...",
      robots: { index: false, follow: false },
    };
  }

  const author = getAuthorBySlug(authorSlug);

  if (!author) {
    return { title: "Author Not Found" };
  }

  return {
    title: `${author.name} - ${author.role}`,
    description: author.bio,
    alternates: {
      canonical: `https://www.adsx.com/blog/author/${authorSlug}`,
    },
    openGraph: {
      title: `${author.name} | AdsX Blog`,
      description: author.bio,
      url: `https://www.adsx.com/blog/author/${authorSlug}`,
    },
    // Noindex author pages - content lives on blog posts
    robots: { index: false, follow: true },
  };
}

function AuthorSchema({ author }: { author: NonNullable<ReturnType<typeof getAuthorBySlug>> }) {
  // Use Organization schema for team author
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: author.name,
    description: author.bio,
    url: "https://www.adsx.com",
    parentOrganization: {
      "@type": "Organization",
      name: "AdsX",
      url: "https://www.adsx.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function AuthorPage({ params }: PageProps) {
  const { author: authorSlug } = await params;

  // Redirect deprecated fake author pages to the team author
  if (deprecatedAuthors.includes(authorSlug)) {
    redirect("/blog/author/adsx-team");
  }

  const author = getAuthorBySlug(authorSlug);

  if (!author) {
    notFound();
  }

  const posts = getPostsByAuthor(author.name);

  return (
    <>
      <AuthorSchema author={author} />
      <ThemedLayout>
        {/* Header */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-40" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <nav className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm transition-colors text-neutral-600 hover:text-emerald-600 dark:text-white/60 dark:hover:text-emerald-400"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </nav>

            <div className="flex flex-col sm:flex-row items-start gap-8">
              {/* Avatar */}
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-3xl">
                  {author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>

              {/* Info */}
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {author.name}
                </h1>
                <p className="mt-2 text-xl text-emerald-600 dark:text-emerald-400">
                  {author.role}
                </p>
                <p className="mt-4 text-lg text-neutral-600 dark:text-white/60 max-w-2xl">
                  {author.bio}
                </p>

                {/* Social Links */}
                <div className="mt-6 flex items-center gap-3">
                  {author.twitter && (
                    <a
                      href={`https://twitter.com/${author.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg transition-colors bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {author.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${author.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg transition-colors bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Posts */}
        <section className="border-t py-16 border-neutral-200 dark:border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">
              Articles by {author.name.split(" ")[0]} ({posts.length})
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="aspect-video rounded-xl overflow-hidden mb-4 relative bg-neutral-100 dark:bg-white/5">
                      <Image
                        src={`/blog/${post.slug}/opengraph-image`}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-emerald-600 dark:text-emerald-400">
                        {post.category}
                      </span>
                      <span className="text-neutral-300 dark:text-white/30">
                        &middot;
                      </span>
                      <span className="flex items-center gap-1 text-neutral-500 dark:text-white/50">
                        <Clock className="h-3 w-3" />
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-neutral-600 dark:text-white/60">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                      Read article
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t py-24 border-neutral-200 bg-neutral-50 dark:border-white/10 dark:bg-transparent">
          <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Work with our team
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-white/60">
              Get expert guidance on AI search advertising from {author.name.split(" ")[0]} and the AdsX team.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg px-8 py-4 font-medium transition-colors bg-emerald-500 text-white hover:bg-emerald-600 dark:text-black dark:hover:bg-emerald-400"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </ThemedLayout>
    </>
  );
}
