import type { MetadataRoute } from "next";
import { SERVICES, serviceHref } from "./data/services";
import { SITE_URL } from "./data/site";

/*
 * Every public page, written to out/sitemap.xml at build time. Service pages
 * come straight from the catalogue, so a new service is listed without
 * touching this file — a new top-level page still has to be added by hand.
 *
 * No lastModified: a build timestamp would mark every page as changed on every
 * deploy, and Google stops trusting a sitemap whose dates are always new.
 */
// `output: "export"` refuses metadata routes that aren't declared static.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services/",
    ...SERVICES.map((s) => `${serviceHref(s.slug)}/`),
    "/projects/",
    "/about/",
    "/contact/",
  ];

  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
