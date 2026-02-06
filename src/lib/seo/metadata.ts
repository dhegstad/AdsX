import type { Metadata } from "next";

const SITE_URL = "https://www.adsx.com";
const SITE_NAME = "AdsX";

interface PageMetadataConfig {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * Creates consistent metadata for any page
 * Centralizes SEO configuration to ensure consistency
 */
export function createPageMetadata(config: PageMetadataConfig): Metadata {
  const canonical = `${SITE_URL}${config.path}`;
  const ogImage = config.image || `${SITE_URL}/opengraph-image`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonical,
      siteName: SITE_NAME,
      type: config.type || "website",
      images: [{ url: ogImage, alt: config.title }],
      ...(config.publishedTime && { publishedTime: config.publishedTime }),
      ...(config.modifiedTime && { modifiedTime: config.modifiedTime }),
      ...(config.author && { authors: [config.author] }),
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [ogImage],
    },
    ...(config.noIndex && {
      robots: {
        index: false,
        follow: true,
      },
    }),
  };
}

interface ArticleMetadataConfig {
  title: string;
  description: string;
  slug: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  tags?: string[];
  image?: string;
}

/**
 * Creates metadata specifically for blog articles
 */
export function createArticleMetadata(config: ArticleMetadataConfig): Metadata {
  const canonical = `${SITE_URL}/blog/${config.slug}`;
  const ogImage = config.image || `${SITE_URL}/blog/${config.slug}/opengraph-image`;

  return {
    title: `${config.title} | AdsX Blog`,
    description: config.description,
    authors: [{ name: config.author }],
    keywords: config.tags,
    alternates: {
      canonical,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonical,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: config.publishedTime,
      modifiedTime: config.modifiedTime || config.publishedTime,
      authors: [config.author],
      tags: config.tags,
      images: [{ url: ogImage, alt: config.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [ogImage],
    },
  };
}

/**
 * Creates metadata for category/tag listing pages
 */
export function createListingMetadata(config: {
  type: "category" | "tag" | "author";
  name: string;
  slug: string;
  count: number;
  noIndex?: boolean;
}): Metadata {
  const path = `/blog/${config.type}/${config.slug}`;
  const canonical = `${SITE_URL}${path}`;

  const titles = {
    category: `${config.name} Articles`,
    tag: `Articles Tagged "${config.name}"`,
    author: `${config.name} - Articles`,
  };

  const descriptions = {
    category: `Browse ${config.count} ${config.name.toLowerCase()} articles about AI search advertising and visibility optimization.`,
    tag: `${config.count} articles tagged with "${config.name}" - insights on AI search advertising and optimization.`,
    author: `Articles by ${config.name} on AI search advertising and visibility.`,
  };

  return {
    title: titles[config.type],
    description: descriptions[config.type],
    alternates: { canonical },
    openGraph: {
      title: `${titles[config.type]} | AdsX Blog`,
      description: descriptions[config.type],
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
    },
    ...(config.noIndex && {
      robots: { index: false, follow: true },
    }),
  };
}
