import { BLOG_DESCRIPTION, BLOG_TITLE, categoryOf, getPosts, postHref } from "../../data/blog";
import { SITE_URL } from "../../data/site";

/*
 * The blog as an RSS feed, at /blog/feed.xml - for feed readers, and for the
 * services that syndicate or announce new posts from one. /blog links to it
 * from its <head>. Cached and refreshed along with the blog itself.
 */

const escape = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function GET() {
  const posts = await getPosts();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}${postHref(post.slug)}/`;
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${escape(categoryOf(post).title)}</category>
      <description>${escape(post.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(BLOG_TITLE)}</title>
    <link>${SITE_URL}/blog/</link>
    <description>${escape(BLOG_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
