import type { Metadata } from "next";

/**
 * Where the site lives and what it is called. Canonical URLs, the sitemap,
 * robots.txt, and the structured data on the home page all build on these, so
 * a domain move is a one-line change here.
 */
export const SITE_URL = "https://nytrox.in";
export const SITE_NAME = "Nytrox";

/*
 * The home page's search listing. The title leads with the name and then says
 * what the studio does in the words people search with — the tagline alone
 * ("Software Built for the Next Frontier") told a searcher nothing. Google
 * shows roughly the first 60 characters of a title and 155 of a description.
 */
export const HOME_TITLE = "Nytrox — Web, App & Software Development Studio";
export const HOME_DESCRIPTION =
  "Nytrox builds websites, mobile apps, custom software, and AI automation — plus the design and marketing that launch them. 100+ projects delivered.";

/**
 * Title, description, canonical URL, and link-preview tags for one page.
 *
 * Each page calls this rather than inheriting from the root layout: Open Graph
 * tags are not merged between segments, so a layout-level `openGraph` would
 * hand every page the home page's title and URL.
 *
 * `path` keeps its trailing slash to match `trailingSlash: true` in
 * next.config.ts. The canonical has to be the address the server actually
 * answers on — /services/, not /services — or search engines are pointed at a
 * redirect instead of the page.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: path,
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
