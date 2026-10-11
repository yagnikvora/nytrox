import Link from "next/link";
import Navbar from "../components/Navbar";
import SpaceBackground from "../components/SpaceBackground";
import CursorFX from "../components/CursorFX";
import Reveal from "../components/Reveal";
import SectionKicker from "../components/SectionKicker";
import CtaBand from "../components/CtaBand";
import Footer from "../components/Footer";
import MaskedHeading from "../components/MaskedHeading";
import PostCard from "../components/blog/PostCard";
import { BLOG_DESCRIPTION, BLOG_TITLE, getPosts, postHref } from "../data/blog";
import { SITE_NAME, SITE_URL, pageMetadata } from "../data/site";

const PATH = "/blog/";

export const metadata = {
  ...pageMetadata({
    title: "Blog - Web, App, Design & SEO Insights | Nytrox",
    description: BLOG_DESCRIPTION,
    path: PATH,
  }),
  // lets feed readers find the RSS feed from the page itself
  alternates: {
    canonical: PATH,
    types: { "application/rss+xml": [{ url: "/blog/feed.xml", title: BLOG_TITLE }] },
  },
};

/*
 * The blog's front page: the newest post large, the rest in a grid. Posts come
 * from Sanity (data/blog.ts); the page is prerendered and refreshed in the
 * background, so publishing in the Studio needs no deploy.
 */
export default async function BlogPage() {
  const posts = await getPosts();
  const [latest, ...rest] = posts;

  // Tells search engines this is a blog and which posts it lists.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}${PATH}#blog`,
    name: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    publisher: { "@id": `${SITE_URL}/#organization`, "@type": "Organization", name: SITE_NAME },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `${SITE_URL}${postHref(post.slug)}/`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
    })),
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <CursorFX />
      <SpaceBackground />

      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionKicker>The Nytrox blog</SectionKicker>
            <MaskedHeading
              as="h1"
              text="Notes from the studio floor"
              accent="studio floor"
              stagger={60}
              className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl"
            />
            {/* plain text rather than ScrollReveal: this sits at the top of the
                page, where there is too little scroll left to ever sharpen it */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
              Practical writing on building websites and apps, design, SEO, and
              AI automation - what we have learned doing the work, for the
              people commissioning it.
            </p>
          </Reveal>
        </section>

        {latest ? (
          <>
            {/* Latest post */}
            <section className="mx-auto max-w-7xl px-6 pb-5">
              <Reveal variant="blur">
                <PostCard post={latest} featured heading="h2" />
              </Reveal>
            </section>

            {/* Everything else */}
            {rest.length > 0 && (
              <section className="mx-auto max-w-7xl px-6 pb-16">
                <h2 className="sr-only">More articles</h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post, i) => (
                    <Reveal as="div" key={post.slug} delay={(i % 3) * 70} variant="blur" className="h-full">
                      <PostCard post={post} />
                    </Reveal>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="mx-auto max-w-7xl px-6 pb-16">
            <Reveal className="glass mx-auto max-w-xl rounded-2xl p-10 text-center">
              <h2 className="font-display text-xl font-semibold text-white">First posts on the way</h2>
              <p className="mt-3 text-sm leading-7 text-ink-muted">
                We are writing the first articles now. In the meantime, the
                services pages cover how we work.
              </p>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-300 transition-colors hover:text-white"
              >
                Explore our services
              </Link>
            </Reveal>
          </section>
        )}

        <CtaBand />
        <Footer />
      </main>
    </div>
  );
}
