"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "../data/testimonials";
import TiltedCard from "./TiltedCard";
import GradualBlur from "./GradualBlur";

/** Gap between cards (`gap-5` = 1.25rem) — needed to compute one scroll step. */
const GAP = 20;

/**
 * Horizontally scrollable testimonial rail. Free swipe/drag on touch, with
 * arrow buttons for pointer users that advance exactly one card at a time.
 */
export default function TestimonialRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEdges = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft >= max - 8);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    syncEdges();
    el.addEventListener("scroll", syncEdges, { passive: true });
    window.addEventListener("resize", syncEdges);
    return () => {
      el.removeEventListener("scroll", syncEdges);
      window.removeEventListener("resize", syncEdges);
    };
  }, [syncEdges]);

  const step = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-testimonial]");
    const distance = card ? card.offsetWidth + GAP : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * distance, behavior: "smooth" });
  };

  return (
    <div>
      {/* `relative` anchors the edge blur to the rail */}
      <div className="relative">
        {/* The rail bleeds off the right edge to signal that it scrolls, but its
            first card lines up with the max-w-7xl page gutter on the left. */}
        <div
          ref={railRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-6 [scroll-padding-left:max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
        >
          {TESTIMONIALS.map((t) => (
            <div key={t.name} data-testimonial className="w-[85vw] shrink-0 snap-start sm:w-[380px]">
              <TiltedCard max={6}>
                <figure className="glass h-full rounded-2xl p-7">
                  <div className="flex gap-1 text-cyan-300" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l2.9 6.26L21.5 9l-4.9 4.35L18 20l-6-3.4L6 20l1.4-6.65L2.5 9l6.6-.74L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-4 text-[15px] leading-7 text-ink">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${t.from} text-sm font-semibold text-white`}
                    >
                      {t.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">{t.name}</span>
                      <span className="block text-xs text-ink-muted">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </TiltedCard>
            </div>
          ))}
          <div className="w-2 shrink-0" aria-hidden />
        </div>

        {/* cards blur out of frame instead of stopping at a hard edge — each
            side only while there is still rail to scroll that way */}
        <GradualBlur side="left" width="4rem" active={!atStart} />
        <GradualBlur side="right" width="6rem" active={!atEnd} />
      </div>

      {/* Rail controls */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <RailButton label="Previous testimonials" disabled={atStart} onClick={() => step(-1)}>
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </RailButton>
        <span className="text-xs uppercase tracking-[0.2em] text-ink-muted">
          {TESTIMONIALS.length} stories
        </span>
        <RailButton label="More testimonials" disabled={atEnd} onClick={() => step(1)}>
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </RailButton>
      </div>
    </div>
  );
}

function RailButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="glass grid h-10 w-10 place-items-center rounded-full text-white transition-all hover:bg-white/10 disabled:pointer-events-none disabled:opacity-30"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        {children}
      </svg>
    </button>
  );
}
