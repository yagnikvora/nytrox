import type { MetadataRoute } from "next";
import { SITE_URL } from "./data/site";

/*
 * Written to out/robots.txt at build time. Without it the host answered
 * /robots.txt with the HTML 404 page, which crawlers then tried to parse.
 */
// `output: "export"` refuses metadata routes that aren't declared static.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
