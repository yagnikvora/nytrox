"use client";

import { useEffect, useId, useState, type ReactNode } from "react";

/*
 * The parts of the service page that respond to the visitor: the contents
 * rail that tracks the scroll, and the Scope / Tools tabs. Both take the
 * category accent from the page's --accent.
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
