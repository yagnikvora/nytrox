import type { MetadataRoute } from "next";
import { getPosts, postHref } from "./data/blog";
import { SERVICES, serviceHref } from "./data/services";
import { SITE_URL } from "./data/site";

/*
 * Every public page, served at /sitemap.xml. Service pages come straight from
 * the catalogue and blog posts from Sanity, so a new service or a newly
 * published post is listed without touching this file - a new top-level page
 * still has to be added by hand.
 *
 * It is built with the site and refreshed in the background along with the
 * blog (see SANITY_REVALIDATE in data/sanity.ts).
 *
 * Only the blog carries lastModified, because only there is the date real: it
 * is when the post was last edited in the Studio. A build timestamp on the
 * other pages would mark every one as changed on every deploy, and Google
 * stops trusting a sitemap whose dates are always new.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  // ISO strings compare in date order
  const lastPostEdit = posts.map((post) => post.updatedAt).sort().at(-1);

  const paths = [
    "/",
    "/services/",
    ...SERVICES.map((s) => `${serviceHref(s.slug)}/`),
    "/projects/",
    "/about/",
    "/contact/",
  ];

  return [
    ...paths.map((path) => ({ url: `${SITE_URL}${path}` })),
    { url: `${SITE_URL}/blog/`, lastModified: lastPostEdit },
    ...posts.map((post) => ({
      url: `${SITE_URL}${postHref(post.slug)}/`,
      lastModified: post.updatedAt,
    })),
  ];
}
