import Image from "next/image";
import Link from "next/link";
import SpotlightCard from "../SpotlightCard";
import GlareHover from "../GlareHover";
import { CATEGORY_SPOTLIGHT } from "../../data/services";
import {
  categoryOf,
  formatDate,
  postHref,
  readingMinutes,
  type PostSummary,
} from "../../data/blog";
import { sanityImage } from "../../data/sanity";

/**
 * A post's cover at 16:9. With an image set in the Studio that is what shows;
 * without one the cover is drawn in the category's accent, so a post never
 * needs artwork before it can go out. Must sit inside an `.accent` wrapper.
 */
export function PostCover({
  post,
  sizes,
  priority = false,
  className = "",
}: {
  post: PostSummary;
  /** How wide the cover renders, as for next/image. */
  sizes: string;
  /** Load eagerly - for a cover above the fold. */
  priority?: boolean;
  className?: string;
}) {
  const { cover } = post;

  return (
    <div className={`relative aspect-video overflow-hidden rounded-lg bg-[#05050f] ${className}`}>
      {cover ? (
        <Image
          // cropped by the CDN to the frame, so no more is sent than is shown
          src={sanityImage(cover.url, 1600, 900)}
          alt={cover.alt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover/glare:scale-[1.03]"
        />
      ) : (
        <div aria-hidden className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(60% 80% at 18% 12%, rgb(var(--accent) / 0.55), transparent 70%), radial-gradient(55% 75% at 88% 96%, rgb(var(--accent) / 0.28), transparent 70%)",
            }}
          />
          {/* the same faint grid as the sample covers on /projects */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <span className="absolute bottom-4 left-5 font-display text-[clamp(1.75rem,6cqw,3.5rem)] font-bold leading-none tracking-tight text-white/15">
            {categoryOf(post).title}
          </span>
        </div>
      )}
    </div>
  );
}

/** Category chip, date, and reading time - the line above a post's title. */
export function PostMeta({ post }: { post: PostSummary }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium">
      <span className="accent-chip rounded-full px-2.5 py-1">{categoryOf(post).title}</span>
      <time dateTime={post.publishedAt} className="text-ink-muted">
        {formatDate(post.publishedAt)}
      </time>
      <span aria-hidden className="h-1 w-1 rounded-full bg-white/25" />
      <span className="text-ink-muted">{readingMinutes(post)} min read</span>
    </div>
  );
}

/**
 * One post in a grid. `featured` lays the cover beside the text on wide
 * screens - the newest post at the top of /blog.
 */
export default function PostCard({
  post,
  featured = false,
  heading: Heading = "h3",
}: {
  post: PostSummary;
  featured?: boolean;
  /** Level of the title, so the card fits the outline of whichever page it is on. */
  heading?: "h2" | "h3";
}) {
  const { accent } = categoryOf(post);

  return (
    <article data-accent={accent} className="accent h-full">
      <Link href={postHref(post.slug)} className="block h-full">
        <SpotlightCard
          className="accent-panel card-glow glass h-full [container-type:inline-size]"
          spotlightColor={CATEGORY_SPOTLIGHT[accent]}
        >
          {/* padding lives on the glare layer so the sweep spans the whole card */}
          <GlareHover
            className={`flex h-full flex-col rounded-2xl p-5 ${
              featured ? "gap-6 lg:grid lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-10 lg:p-7" : ""
            }`}
          >
            <PostCover
              post={post}
              priority={featured}
              sizes={
                featured
                  ? "(min-width: 1024px) 50vw, 92vw"
                  : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
              }
            />

            <div className={`flex flex-1 flex-col ${featured ? "" : "mt-5"}`}>
              <PostMeta post={post} />
              <Heading
                className={`mt-3 font-display font-semibold text-white ${
                  featured ? "text-2xl leading-tight sm:text-3xl" : "text-lg leading-snug"
                }`}
              >
                {post.title}
              </Heading>
              <p
                className={`mt-3 text-sm text-ink-muted ${
                  featured ? "leading-7 sm:text-base" : "line-clamp-3 leading-6"
                }`}
              >
                {post.excerpt}
              </p>
              {/* mt-auto pins this to the bottom so a row of cards lines up */}
              <span className="accent-more mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold">
                Read article
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform duration-300 group-hover/glare:translate-x-0.5"
                  aria-hidden
                >
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </GlareHover>
        </SpotlightCard>
      </Link>
    </article>
  );
}
