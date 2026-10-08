"use client";

import { useRef, type ReactNode } from "react";

/**
 * A row of cards that scrolls sideways and snaps to each one. Touch and
 * trackpads scroll it directly; the arrows are there for a mouse, which has
 * no easy way to scroll sideways.
 */
export default function SnapCarousel({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (direction: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={ref}
        role="group"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent)/0.6)]"
      >
        {children}
      </div>
      <div className="mt-6 flex items-center gap-3">
        {([-1, 1] as const).map((direction) => (
          <button
            key={direction}
            type="button"
            onClick={() => move(direction)}
            aria-label={direction === -1 ? "Previous" : "Next"}
            className="glass grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              className={direction === -1 ? "rotate-180" : ""}
            >
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
        <span className="text-xs uppercase tracking-[0.2em] text-ink-muted">Drag or use the arrows</span>
      </div>
    </div>
  );
}
