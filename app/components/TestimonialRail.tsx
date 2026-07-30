"use client";

import { useState } from "react";
import { TESTIMONIALS } from "../data/testimonials";
import TiltedCard from "./TiltedCard";

/** Seconds for one full pass of the track — slow enough to read a card in passing. */
const SPEED = 70;

/**
 * Endless testimonial rail. Same approach as LogoLoop: the track holds two
 * identical copies and travels exactly half its width, so the loop has no
 * visible seam, and the whole rail is masked at both edges so cards fade out
 * instead of clipping mid-word.
 *
 * The spacing between cards is per-item padding rather than a flex `gap`,
 * because a gap is only applied *between* items — the track would be one gap
 * short of two whole copies and the seam would jump by that much on every lap.
 *
 * Motion pauses on hover, on keyboard focus, and via the toggle beneath the
 * rail; content that moves on its own needs a way to stop it, and hovering
 * isn't one for anyone using a keyboard.
 */
export default function TestimonialRail() {
  const [paused, setPaused] = useState(false);
  const track = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div>
      <div
        className="marquee-viewport group relative overflow-hidden py-2"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <ul
          className={`animate-marquee flex w-max group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] ${
            paused ? "[animation-play-state:paused]" : ""
          }`}
          style={{ animationDuration: `${SPEED}s` }}
        >
          {track.map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              // the second copy is decorative; only the first pass is read out
              aria-hidden={i >= TESTIMONIALS.length}
              className="w-[85vw] shrink-0 pr-5 sm:w-[400px]"
            >
              <TiltedCard max={6}>
                <figure className="glass h-full rounded-2xl p-7">
                  <div className="flex gap-1 text-cyan-300" aria-hidden>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l2.9 6.26L21.5 9l-4.9 4.35L18 20l-6-3.4L6 20l1.4-6.65L2.5 9l6.6-.74L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-4 text-[15px] leading-7 text-ink">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br ${t.from} text-sm font-semibold text-white`}
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
            </li>
          ))}
        </ul>
      </div>

      {/* Rail controls */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? "Resume testimonials" : "Pause testimonials"}
          className="marquee-control glass grid h-10 w-10 place-items-center rounded-full text-white transition-colors hover:bg-white/10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            {paused ? (
              <path d="M8 5.5v13l11-6.5-11-6.5z" />
            ) : (
              <>
                <rect x="7" y="5.5" width="3.4" height="13" rx="1.2" />
                <rect x="13.6" y="5.5" width="3.4" height="13" rx="1.2" />
              </>
            )}
          </svg>
        </button>
        <span className="text-xs uppercase tracking-[0.2em] text-ink-muted">
          {TESTIMONIALS.length} stories
        </span>
      </div>
    </div>
  );
}
