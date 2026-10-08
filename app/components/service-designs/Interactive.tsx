"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { INPUT_LEVELS, type Deliverable } from "../../data/services";
import type { Stage } from "./shared";

/*
 * The parts of the alternative service designs that respond to the visitor:
 * a contents rail that tracks the scroll, tabs, a deliverable explorer, and a
 * process stepper. All of them take the category accent from the nearest
 * .accent wrapper (--accent).
 */

/**
 * Sticky contents rail. The section nearest the top of the viewport is marked
 * current, so the rail doubles as a "you are here".
 */
export function ScrollSpyNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    // A band across the upper part of the viewport: whichever section is
    // crossing it is the one being read.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav aria-label="On this page">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
        On this page
      </p>
      <ol className="mt-4 border-l border-white/10">
        {sections.map((s, i) => {
          const current = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={current ? "location" : undefined}
                className={`-ml-px flex items-baseline gap-3 border-l py-2 pl-4 text-sm transition-colors ${
                  current
                    ? "border-[rgb(var(--accent))] font-medium text-white"
                    : "border-transparent text-ink-muted hover:text-white"
                }`}
              >
                <span className="text-xs tabular-nums opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** A small set of tabs. Every panel stays in the page, hidden, so nothing is lost to search or print. */
export function Tabs({ tabs }: { tabs: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const id = useId();

  return (
    <div>
      <div role="tablist" className="glass inline-flex gap-1 rounded-full p-1.5">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            onClick={() => setActive(i)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              i === active ? "bg-white text-black" : "text-ink-muted hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.label}
          role="tabpanel"
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={i !== active}
          className="mt-6"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}

/** Deliverables as a list on the left and the chosen one, large, on the right. */
export function DeliverableExplorer({ items }: { items: Deliverable[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <ul className="flex flex-col gap-3">
        {items.map((d, i) => {
          const on = i === active;
          return (
            <li key={d.title}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                  on
                    ? "border-[rgb(var(--accent)/0.5)] bg-[rgb(var(--accent)/0.08)]"
                    : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-sm font-bold transition-colors duration-300 ${
                    on ? "bg-[rgb(var(--accent))] text-black" : "bg-white/[0.06] text-ink-muted"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`font-display text-base font-semibold ${on ? "text-white" : "text-ink"}`}>
                  {d.title}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className={`ml-auto shrink-0 transition-all duration-300 ${
                    on ? "translate-x-0 text-white opacity-100" : "-translate-x-1 opacity-0"
                  }`}
                >
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="accent-panel glass relative min-h-[260px] overflow-hidden rounded-2xl p-8 sm:p-10" aria-live="polite">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 -top-8 font-display text-[9rem] font-bold leading-none text-white/[0.04]"
        >
          {String(active + 1).padStart(2, "0")}
        </span>
        {/* keyed so the text re-runs its entrance whenever the choice changes */}
        <div key={active} className="design-swap relative">
          <p className="accent-more text-xs font-semibold uppercase tracking-[0.18em]">
            Deliverable {active + 1} of {items.length}
          </p>
          <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">{current.title}</h3>
          <p className="mt-4 text-base leading-8 text-ink-muted">{current.desc}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * The process as a stepper: pick a stage to see what happens in it, how much
 * of the work it is, and how much of the client's time it needs.
 */
export function ProcessStepper({ stages }: { stages: Stage[] }) {
  const [active, setActive] = useState(0);
  const current = stages[active];
  const last = stages.length - 1;

  return (
    <div>
      <div className="relative">
        {/* track, with the lit part running up to the chosen stage */}
        <div className="absolute left-0 right-0 top-6 h-px bg-white/10" aria-hidden>
          <div
            className="h-full bg-[rgb(var(--accent))] transition-all duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${last ? (active / last) * 100 : 0}%` }}
          />
        </div>
        <ol className="relative flex justify-between">
          {stages.map((s, i) => {
            const reached = i <= active;
            return (
              <li key={s.step} className="flex flex-col items-center first:items-start last:items-end">
                <button
                  type="button"
                  aria-pressed={i === active}
                  aria-label={`Stage ${i + 1}: ${s.title}`}
                  onClick={() => setActive(i)}
                  className={`grid h-12 w-12 place-items-center rounded-2xl font-display text-sm font-bold transition-all duration-300 ${
                    i === active
                      ? "scale-110 bg-[rgb(var(--accent))] text-black shadow-[0_0_30px_-4px_rgb(var(--accent)/0.9)]"
                      : reached
                        ? "bg-[rgb(var(--accent)/0.25)] text-white ring-1 ring-[rgb(var(--accent)/0.5)]"
                        : "bg-[#0c0c1c] text-ink-muted ring-1 ring-white/10 hover:text-white"
                  }`}
                >
                  {s.step}
                </button>
                <span
                  className={`mt-3 hidden text-sm font-medium sm:block ${
                    i === active ? "text-white" : "text-ink-muted"
                  }`}
                >
                  {s.title}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="accent-panel glass relative mt-10 overflow-hidden rounded-2xl p-7 sm:p-9" aria-live="polite">
        <div key={active} className="design-swap grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="accent-more text-xs font-semibold uppercase tracking-[0.18em]">
              Stage {active + 1} of {stages.length}
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold text-white">{current.title}</h3>
            <p className="mt-3 text-base leading-8 text-ink-muted">{current.desc}</p>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
            <div className="bg-[#07071a] px-5 py-5">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Share of the work
              </dt>
              <dd className="mt-2 font-display text-3xl font-bold text-white">{current.share}%</dd>
            </div>
            <div className="bg-[#07071a] px-5 py-5">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Your input
              </dt>
              <dd className="mt-2 font-display text-3xl font-bold text-white">
                {INPUT_LEVELS[current.input]}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

// Shared with the projects page, so it lives outside this folder.
export { default as SnapCarousel } from "../SnapCarousel";

/**
 * A vertical line down the left of its content that fills with the accent as
 * the page scrolls past - the spine the "Mission" design hangs its phases on.
 * Under reduced motion the line is simply drawn full.
 */
export function ScrollSpine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  // Fills as each phase reaches the middle of the viewport, so the lit part of
  // the line ends about where the visitor is reading.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 55%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute bottom-0 left-[15px] top-2 w-px bg-white/10 md:left-[27px]">
        <motion.div
          className="h-full w-full origin-top bg-[rgb(var(--accent))] shadow-[0_0_14px_rgb(var(--accent)/0.9)]"
          style={{ scaleY: reduce ? 1 : progress }}
        />
      </div>
      {children}
    </div>
  );
}
