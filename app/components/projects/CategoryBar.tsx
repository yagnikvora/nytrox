"use client";

import { useEffect, useState } from "react";

type Category = { id: string; title: string; count: number };

/**
 * Floating bar at the foot of the projects page with one tab per category.
 * A tab jumps to that category's section, and the one being read is marked
 * current, so the bar doubles as a "you are here".
 */
export default function CategoryBar({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    // A band across the middle of the viewport: the section crossing it is the
    // one in view. Above the first section, or past the last, nothing is - so
    // no tab is lit over the header or the footer.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
          else setActive((current) => (current === entry.target.id ? "" : current));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    for (const c of categories) {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [categories]);

  return (
    <nav
      aria-label="Project categories"
      className="fixed bottom-5 left-1/2 z-[60] flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-[#0c0c1c]/95 p-1.5 text-sm shadow-[0_18px_50px_-12px_rgba(0,0,0,0.9)] backdrop-blur"
    >
      {categories.map((c) => {
        const on = c.id === active;
        return (
          <a
            key={c.id}
            href={`#${c.id}`}
            aria-current={on ? "location" : undefined}
            className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 font-medium transition-colors sm:px-4 ${
              on ? "bg-white text-black" : "text-ink hover:bg-white/10 hover:text-white"
            }`}
          >
            {/* the full names don't fit three across on a phone, so there the first word stands in */}
            <span className="sm:hidden">{c.title.split(" ")[0]}</span>
            <span className="hidden sm:inline">{c.title}</span>
            <span className={`text-xs tabular-nums ${on ? "opacity-60" : "opacity-50"}`}>{c.count}</span>
          </a>
        );
      })}
    </nav>
  );
}
