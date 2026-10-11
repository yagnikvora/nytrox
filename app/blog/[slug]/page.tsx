import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import SpaceBackground from "../../components/SpaceBackground";
import CursorFX from "../../components/CursorFX";
import Reveal from "../../components/Reveal";
import SectionKicker from "../../components/SectionKicker";
import SpotlightCard from "../../components/SpotlightCard";
import GlareHover from "../../components/GlareHover";
import CtaBand from "../../components/CtaBand";
import Footer from "../../components/Footer";
import MaskedHeading from "../../components/MaskedHeading";
import PortableText, { headingsOf } from "../../components/blog/PortableText";
import PostCard, { PostCover } from "../../components/blog/PostCard";
import {
  categoryOf,
  formatDate,
  getPost,
  getPosts,
  postHref,
  readingMinutes,
} from "../../data/blog";
import { sanityImage } from "../../data/sanity";
import { CATEGORY_SPOTLIGHT, SERVICES, serviceHref } from "../../data/services";
import { SITE_NAME, SITE_URL, pageMetadata } from "../../data/site";

/*
 * One page per post in Sanity. The posts that exist at build time are built
 * up front; one published afterwards is rendered the first time it is asked
 * for and cached from then on, and a slug that matches nothing is a 404.
 */
export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

/** How many other posts to suggest at the foot of the page. */
const MORE_COUNT = 3;

/** The size link previews are drawn at. */
const SHARE_IMAGE = { width: 1200, height: 630 };

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return pageMetadata({
    title: `${post.seoTitle || post.title} - Nytrox`,
    description: post.seoDescription || post.excerpt,
    path: `${postHref(post.slug)}/`,
    image: post.cover
      ? {
          url: sanityImage(post.cover.url, SHARE_IMAGE.width, SHARE_IMAGE.height),
          ...SHARE_IMAGE,
          alt: post.cover.alt || post.title,
        }
      : undefined,
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      section: categoryOf(post).title,
    },
  });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const category = categoryOf(post);
  const headings = headingsOf(post.body);
  const url = `${SITE_URL}${postHref(post.slug)}/`;
  const services = (post.relatedServices ?? []).flatMap(
    (slug) => SERVICES.find((s) => s.slug === slug) ?? []
  );
  // the same category first, then whatever is newest
  const others = (await getPosts()).filter((p) => p.slug !== post.slug);
  const more = [
    ...others.filter((p) => p.category === post.category),
    ...others.filter((p) => p.category !== post.category),
  ].slice(0, MORE_COUNT);

  /*
   * BlogPosting is what makes the post eligible for an article result - the
   * date and author shown under the title in search. BreadcrumbList swaps the
   * raw URL in that result for "Nytrox > Blog > title".
   */
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        mainEntityOfPage: url,
        headline: post.title,
        description: post.seoDescription || post.excerpt,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        articleSection: category.title,
        // a named person where there is one; otherwise the studio itself
        author:
          post.author === `${SITE_NAME} Team`
            ? { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/` }
            : { "@type": "Person", name: post.author },
        publisher: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: SITE_NAME,
          url: `${SITE_URL}/`,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-icon.png` },
        },
        ...(post.cover && {
          image: [sanityImage(post.cover.url, SHARE_IMAGE.width, SHARE_IMAGE.height)],
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog/` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
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
        <article data-accent={category.accent} className="accent">
          {/* Header */}
          <header className="mx-auto max-w-4xl px-6 pb-10 pt-16">
            <Reveal className="text-center">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-medium text-ink-muted">
                  <li>
                    <Link href="/" className="transition-colors hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <Chevron />
                    <Link href="/blog" className="transition-colors hover:text-white">
                      Blog
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <Chevron />
                    <span className="text-white">{category.title}</span>
                  </li>
                </ol>
              </nav>

              <div className="mt-9">
                <SectionKicker>{category.title}</SectionKicker>
              </div>
              <MaskedHeading
                as="h1"
                text={post.title}
                stagger={40}
                className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl"
              />
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
                {post.excerpt}
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-ink-muted">
                <span>
                  By <span className="font-medium text-white">{post.author}</span>
                </span>
                <Dot />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <Dot />
                <span>{readingMinutes(post)} min read</span>
              </div>
            </Reveal>

            {/* Only a real image earns the space up here - the drawn cover is
                for cards, where every post needs something in the frame. */}
            {post.cover && (
              <Reveal delay={160} variant="scale" className="mt-12">
                <PostCover
                  post={post}
                  priority
                  sizes="(min-width: 896px) 848px, 92vw"
                  className="rounded-2xl ring-1 ring-white/10"
                />
              </Reveal>
            )}
          </header>

          <div className="mx-auto max-w-3xl px-6 pb-16">
            {/* On this page - only worth showing when there is somewhere to jump */}
            {headings.length > 1 && (
              <Reveal>
                <nav aria-label="On this page" className="glass rounded-2xl p-6 sm:p-7">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                    On this page
                  </h2>
                  <ol className="mt-4 space-y-2.5">
                    {headings.map((h, i) => (
                      <li key={h.id} className="flex gap-3 text-sm leading-6">
                        <span className="font-display font-bold text-ink-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <a href={`#${h.id}`} className="text-ink transition-colors hover:text-white">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </Reveal>
            )}

            {/* The article itself is not wrapped in a reveal: it is what the
                visitor came for, and what a crawler reads. */}
            <div className="mt-4">
              <PortableText body={post.body} />
            </div>

            {/* Related services */}
            {services.length > 0 && (
              <aside className="mt-16 border-t border-white/10 pt-10">
                <h2 className="font-display text-xl font-semibold text-white">
                  Need a hand with this?
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  This is work we do for clients. The services behind this article:
                </p>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {services.map((s) => (
                    <li key={s.slug} data-accent={s.category} className="accent">
                      <Link href={serviceHref(s.slug)} className="block h-full">
                        <SpotlightCard
                          className="accent-panel card-glow glass h-full"
                          spotlightColor={CATEGORY_SPOTLIGHT[s.category]}
                        >
                          <GlareHover className="flex h-full items-start gap-4 rounded-2xl p-5">
                            <div className="accent-icon grid h-11 w-11 shrink-0 place-items-center rounded-xl">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                                {s.icon}
                              </svg>
                            </div>
                            <div>
                              <h3 className="font-display text-base font-semibold text-white">{s.title}</h3>
                              <p className="mt-1 line-clamp-2 text-sm leading-6 text-ink-muted">{s.desc}</p>
                            </div>
                          </GlareHover>
                        </SpotlightCard>
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </article>

        {/* More posts */}
        {more.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 py-16">
            <Reveal className="mx-auto max-w-2xl text-center">
              <SectionKicker>Keep reading</SectionKicker>
              <MaskedHeading
                text="More from the blog"
                accent="the blog"
                className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
              />
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p, i) => (
                <Reveal as="div" key={p.slug} delay={i * 70} variant="blur" className="h-full">
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Back to the blog */}
        <section className="mx-auto max-w-7xl px-6 pb-4">
          <Reveal className="flex justify-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform group-hover:-translate-x-0.5"
                aria-hidden
              >
                <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to all articles
            </Link>
          </Reveal>
        </section>

        <CtaBand />
        <Footer />
      </main>
    </div>
  );
}

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white/30" aria-hidden>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dot() {
  return <span aria-hidden className="h-1 w-1 rounded-full bg-white/25" />;
}
