import { cache } from "react";
import { sanityQuery } from "./sanity";
import type { ServiceCategory } from "./services";

/*
 * The blog. Posts are written in the Sanity Studio (studio/schemaTypes/post.ts)
 * and read here; the field names in the queries below have to match that
 * schema - change one and change the other.
 *
 * A post is live once it is published in the Studio and its `publishedAt` has
 * passed, so every query filters on both.
 */

export const BLOG_TITLE = "Nytrox Blog";
export const BLOG_DESCRIPTION =
  "Practical notes from the Nytrox studio on building websites and apps, design, SEO, and AI automation - written for the people commissioning the work.";

export const postHref = (slug: string) => `/blog/${slug}`;

/**
 * The categories a post can be filed under. Keys match POST_CATEGORIES in the
 * Studio schema. `accent` borrows the service categories' colours (see .accent
 * in globals.css), so a post about engineering is cyan like the build services.
 */
export const BLOG_CATEGORIES: Record<string, { title: string; accent: ServiceCategory }> = {
  design: { title: "Design", accent: "design" },
  engineering: { title: "Engineering", accent: "build" },
  growth: { title: "Growth", accent: "growth" },
  ai: { title: "AI", accent: "build" },
};

/** A post filed under a category this file doesn't know still renders. */
export const categoryOf = (post: { category: string }) =>
  BLOG_CATEGORIES[post.category] ?? { title: "Article", accent: "design" as const };

export type SanityImage = {
  url: string;
  width: number;
  height: number;
  alt: string | null;
};

/** What a card needs - everything but the body. */
export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  cover: SanityImage | null;
  /** Length of the body as plain text, for the reading time. */
  characters: number;
};

export type Span = { _type: "span"; _key: string; text: string; marks?: string[] };

export type TextBlock = {
  _type: "block";
  _key: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children: Span[];
  markDefs?: { _key: string; _type: string; href?: string }[];
};

export type ImageBlock = SanityImage & { _type: "image"; _key: string; caption: string | null };

export type CodeBlock = { _type: "codeBlock"; _key: string; language?: string; code: string };

export type BodyBlock = TextBlock | ImageBlock | CodeBlock;

export type Post = PostSummary & {
  seoTitle: string | null;
  seoDescription: string | null;
  /** Service slugs from data/services.tsx. */
  relatedServices: string[] | null;
  body: BodyBlock[];
};

const IMAGE_FIELDS = `
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  alt`;

const LIVE_POSTS = `*[_type == "post" && defined(slug.current) && publishedAt <= now()]`;

const SUMMARY_FIELDS = `
  "slug": slug.current,
  title,
  excerpt,
  category,
  author,
  publishedAt,
  "updatedAt": _updatedAt,
  "cover": coverImage{${IMAGE_FIELDS}},
  "characters": length(pt::text(body))`;

/** Every live post, newest first. */
export const getPosts = cache(() =>
  sanityQuery<PostSummary[]>(
    `${LIVE_POSTS} | order(publishedAt desc){${SUMMARY_FIELDS}}`,
    {},
    []
  )
);

/** One post with its body, or null when the slug matches nothing live. */
export const getPost = cache((slug: string) =>
  sanityQuery<Post | null>(
    `${LIVE_POSTS}[slug.current == $slug][0]{
      ${SUMMARY_FIELDS},
      seoTitle,
      seoDescription,
      relatedServices,
      body[]{
        ...,
        _type == "image" => {${IMAGE_FIELDS}, caption}
      }
    }`,
    { slug },
    null
  )
);

/** Read at an unhurried pace, and never less than a minute. */
export const readingMinutes = (post: { characters: number }) =>
  Math.max(1, Math.round(post.characters / 1100));

/** "11 October 2026", on the studio's own calendar wherever the server runs. */
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
