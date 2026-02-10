import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { BrutalistLayout } from "@/components/brutalist-layout";
import { authors, getAuthorBySlug, getPostsByAuthor } from "@/lib/blog";

interface PageProps {
  params: Promise<{ author: string }>;
}

const deprecatedAuthors = ["sarah-chen", "marcus-rodriguez", "dr-james-liu"];

export async function generateStaticParams() {
  return [...authors.map((a) => ({ author: a.slug })), ...deprecatedAuthors.map((a) => ({ author: a }))];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { author: authorSlug } = await params;

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
    robots: { index: false, follow: true },
  };
}

function AuthorSchema({ author }: { author: NonNullable<ReturnType<typeof getAuthorBySlug>> }) {
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
      <BrutalistLayout>
        {/* Header */}
        <div className="border-b-2 border-[#EAEAEA] p-8 md:p-16">
          <div
            className="text-xs tracking-widest text-[#888] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Link href="/" className="hover:text-[#EAEAEA]">HOME</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-[#EAEAEA]">BLOG</Link>
            <span className="mx-2">/</span>
            <span className="text-[#10b981]">AUTHOR</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-8">
            <div className="h-24 w-24 bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center flex-shrink-0">
              <span className="text-black font-bold text-3xl">
                {author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>

            <div>
              <h1
                className="uppercase"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 5vw, 48px)",
                  lineHeight: 1,
                  letterSpacing: "-1px",
                }}
              >
                {author.name}
              </h1>
              <p className="mt-2 text-xl text-[#10b981]">{author.role}</p>
              <p className="mt-4 text-[#888] max-w-2xl">{author.bio}</p>

              {(author.twitter || author.linkedin) && (
                <div className="mt-6 flex items-center gap-3">
                  {author.twitter && (
                    <a
                      href={`https://twitter.com/${author.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 border border-[#333] text-[#888] hover:border-[#10b981] hover:text-[#10b981] transition-colors text-sm"
                    >
                      Twitter
                    </a>
                  )}
                  {author.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${author.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 border border-[#333] text-[#888] hover:border-[#10b981] hover:text-[#10b981] transition-colors text-sm"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="border-b border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ARTICLES BY {author.name.split(" ")[0].toUpperCase()} ({posts.length})
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, idx) => (
              <article
                key={post.slug}
                className={`group p-6 ${idx % 3 !== 2 ? "lg:border-r" : ""} ${idx % 2 !== 1 ? "md:border-r lg:border-r-0" : ""} border-[#333] border-b`}
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="aspect-video overflow-hidden mb-4 relative bg-[#111]">
                    <Image
                      src={`/blog/${post.slug}/opengraph-image`}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[#10b981]">{post.category}</span>
                    <span className="text-[#555]">&middot;</span>
                    <span className="text-[#888]">{post.readingTime}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold transition-colors group-hover:text-[#10b981]">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[#888]">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm text-[#10b981]">
                    Read article
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 md:p-16 text-center bg-[#0c0c0c]">
          <h2
            className="text-2xl md:text-3xl uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Work with our team
          </h2>
          <p className="text-[#888] mb-8 max-w-lg mx-auto">
            Get expert guidance on AI search advertising from {author.name.split(" ")[0]} and the AdsX team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="cta-btn cta-btn-primary">
              Get in Touch
            </Link>
          </div>
        </div>
      </BrutalistLayout>
    </>
  );
}
