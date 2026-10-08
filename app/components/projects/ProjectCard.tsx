import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import SpotlightCard from "../SpotlightCard";
import GlareHover from "../GlareHover";
import { domainOf, isSample, type PortfolioEntry } from "../../data/projects";

/**
 * One portfolio entry. A real project is a link to its live site, shown as a
 * capture of the homepage in a browser frame. A sample has no site to show, so
 * its cover is the service's icon on the card's gradient, labelled "Sample",
 * and the card goes nowhere.
 *
 * `compact` drops the highlight chips and shortens the summary, for layouts
 * that pack many cards into a row. The technology list shows either way.
 */
export default function ProjectCard({
  entry,
  icon,
  compact = false,
  priority = false,
}: {
  entry: PortfolioEntry;
  /** The service's icon paths, used as a sample's cover art. */
  icon: ReactNode;
  compact?: boolean;
  /** Load the preview eagerly - for cards above the fold. */
  priority?: boolean;
}) {
  const sample = isSample(entry);

  const body = (
    <SpotlightCard className="accent-panel card-glow glass h-full" spotlightColor={`rgb(${entry.accent} / 0.2)`}>
      {/* padding lives on the glare layer so the sweep spans the whole card */}
      <GlareHover className={`flex h-full flex-col rounded-2xl ${compact ? "p-5" : "p-6"}`}>
        {sample ? (
          <div className={`relative aspect-[16/10] shrink-0 overflow-hidden rounded-lg bg-gradient-to-br ${entry.cover}`}>
            {/* darkened, with a faint grid, so it reads as a placeholder rather than artwork */}
            <div
              className="absolute inset-0 bg-[#05050f]/70"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <span className="accent-icon grid h-16 w-16 place-items-center rounded-2xl">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
                  {icon}
                </svg>
              </span>
            </div>
            <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
              Sample
            </span>
          </div>
        ) : (
          <div className="relative shrink-0">
            <div className="overflow-hidden rounded-lg bg-[#05050f] shadow-[0_18px_40px_-22px_rgba(0,0,0,0.95)]">
              {/* browser chrome */}
              <div className="flex items-center gap-2 bg-black/35 px-3 py-2">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="h-2 w-2 rounded-full bg-white/30" />
                  <span className="h-2 w-2 rounded-full bg-white/30" />
                  <span className="h-2 w-2 rounded-full bg-white/30" />
                </span>
                <span className="truncate rounded bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/70">
                  {domainOf(entry.url)}
                </span>
              </div>
              {/* the capture is 1280x800, so 16/10 shows all of it */}
              <div className="relative aspect-[16/10]">
                <Image
                  src={entry.preview}
                  alt={`Homepage of ${entry.title}`}
                  fill
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
                  priority={priority}
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover/glare:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-medium">
          <span className="accent-chip rounded-full px-2.5 py-1">{entry.category}</span>
          {!sample && <span className="text-ink-muted">{entry.location}</span>}
        </div>

        <h3 className={`mt-3 font-display font-semibold text-white ${compact ? "text-lg" : "text-xl"}`}>
          {entry.title}
        </h3>
        {!sample && <p className="accent-more mt-1 text-sm font-medium">{domainOf(entry.url)}</p>}

        <p className={`mt-3 text-sm text-ink-muted ${compact ? "line-clamp-3 leading-6" : "leading-7"}`}>
          {entry.summary}
        </p>

        {!compact && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {entry.highlights.map((h) => (
              <li key={h} className="accent-chip rounded-full px-3 py-1.5 text-xs font-medium">
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Technology used - squared, monospace chips, so they read as a spec
            line and not as more of the feature chips above. mt-auto pins this
            block and the link under it to the bottom, so a row of cards with
            different amounts of text still lines up. */}
        <div className={`mt-auto ${compact ? "pt-4" : "pt-6"}`}>
        <div className={`border-t border-white/10 ${compact ? "pt-4" : "pt-5"}`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Technology used
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {entry.tech.map((t) => (
              <li
                key={t}
                className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-ink ring-1 ring-inset ring-white/10"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
        </div>

        {sample ? (
          <span className="pt-5 text-xs text-ink-muted">Sample project - real work coming soon</span>
        ) : (
          <span className="accent-more inline-flex items-center gap-1.5 pt-5 text-sm font-semibold">
            Visit live site
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform duration-300 group-hover/glare:-translate-y-0.5 group-hover/glare:translate-x-0.5"
              aria-hidden
            >
              <path d="M8 16L16 8M9 8h7v7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </GlareHover>
    </SpotlightCard>
  );

  return (
    // the wrapper carries the accent every layer below inherits
    <div className="accent h-full" style={{ "--accent": entry.accent } as CSSProperties}>
      {sample ? (
        body
      ) : (
        <a href={entry.url} target="_blank" rel="noopener noreferrer" className="block h-full">
          {body}
        </a>
      )}
    </div>
  );
}
