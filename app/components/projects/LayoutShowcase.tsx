"use client";

import Link from "next/link";
import { useState } from "react";
import Reveal from "../Reveal";
import SectionKicker from "../SectionKicker";
import { serviceHref } from "../../data/services";
import { isSample } from "../../data/projects";
import ProjectCard from "./ProjectCard";
import { PORTFOLIO, type PortfolioGroup } from "./shared";

/**
 * Layout 2 - "Showcase". Each category is a two-sided stage: on the left, an
 * index of its projects under their service names; on the right, one large
 * card that stays in view and changes to whichever project is pointed at or
 * picked. It reads like a contents page with a live preview beside it.
 *
 * That needs room and a pointer, so below the `lg` breakpoint each service
 * falls back to a plain stack of cards.
 */
export default function LayoutShowcase() {
  return (
    <>
      {PORTFOLIO.map((group) => (
        <CategoryStage key={group.id} group={group} />
      ))}
    </>
  );
}

function CategoryStage({ group }: { group: PortfolioGroup }) {
  const all = group.services.flatMap((s) => s.entries.map((entry) => ({ entry, service: s.service })));
  const [activeSlug, setActiveSlug] = useState(all[0]?.entry.slug);
  const active = all.find((a) => a.entry.slug === activeSlug) ?? all[0];
  // one running number down the whole category, across its services
  const numberOf = (slug: string) => String(all.findIndex((a) => a.entry.slug === slug) + 1).padStart(2, "0");

  return (
    <section id={group.id} className="mx-auto max-w-7xl scroll-mt-28 px-6 py-14">
      <Reveal className="max-w-2xl">
        <SectionKicker>{`${group.count} projects`}</SectionKicker>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
          {group.title}
        </h2>
        <p className="mt-3 text-base leading-7 text-ink-muted">{group.blurb}</p>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        {/* The index */}
        <div className="min-w-0">
          {group.services.map(({ service, entries }) => (
            <div key={service.slug} id={service.slug} className="scroll-mt-28 pb-10 last:pb-0">
              <Reveal>
                <div data-accent={service.category} className="accent flex items-center gap-3">
                  <div className="accent-icon grid h-9 w-9 shrink-0 place-items-center rounded-lg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                      {service.icon}
                    </svg>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">{service.title}</h3>
                  <Link
                    href={serviceHref(service.slug)}
                    className="accent-more ml-auto text-xs font-medium transition-colors hover:text-white"
                  >
                    About this service
                  </Link>
                </div>
              </Reveal>

              {/* Wide screens: rows that drive the preview on the right */}
              <ul className="mt-4 hidden border-t border-white/10 lg:block">
                {entries.map((entry) => {
                  const on = entry.slug === active.entry.slug;
                  return (
                    <li key={entry.slug}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onMouseEnter={() => setActiveSlug(entry.slug)}
                        onFocus={() => setActiveSlug(entry.slug)}
                        onClick={() => setActiveSlug(entry.slug)}
                        className={`group flex w-full items-center gap-5 border-b border-white/10 px-3 py-5 text-left transition-all duration-300 ${
                          on ? "bg-white/[0.04] pl-5" : "hover:bg-white/[0.02]"
                        }`}
                      >
                        <span
                          className={`font-mono text-xs tabular-nums transition-colors ${
                            on ? "text-violet-300" : "text-ink-muted"
                          }`}
                        >
                          {numberOf(entry.slug)}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block truncate font-display text-xl font-semibold transition-colors ${
                              on ? "text-white" : "text-ink-muted group-hover:text-ink"
                            }`}
                          >
                            {entry.title}
                          </span>
                          <span className="mt-1 block text-xs text-ink-muted">
                            {entry.category}
                            {isSample(entry) ? " · Sample" : ` · ${entry.location}`}
                          </span>
                        </span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden
                          className={`shrink-0 transition-all duration-300 ${
                            on ? "translate-x-0 text-white opacity-100" : "-translate-x-2 opacity-0"
                          }`}
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Narrow screens: no room for a preview pane, so the cards themselves */}
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:hidden">
                {entries.map((entry) => (
                  <ProjectCard key={entry.slug} entry={entry} icon={service.icon} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* The preview - held in view while the index scrolls */}
        <div className="hidden lg:block">
          {/* Capped to the window and scrollable on its own: the card can be
              taller than a laptop screen, and a pinned panel that runs off the
              bottom would hide its last lines until the section ended. */}
          <div
            className="no-scrollbar sticky top-28 max-h-[calc(100vh-8.5rem)] overflow-y-auto overscroll-contain rounded-2xl"
            aria-live="polite"
          >
            <p className="mb-3 flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
              <span>
                {numberOf(active.entry.slug)} / {String(all.length).padStart(2, "0")}
              </span>
              <span>{active.service.title}</span>
            </p>
            {/* keyed, so the card re-runs its entrance each time the choice changes */}
            <div key={active.entry.slug} className="design-swap">
              <ProjectCard entry={active.entry} icon={active.service.icon} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
