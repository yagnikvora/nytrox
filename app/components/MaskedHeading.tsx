"use client";

import { Fragment, useEffect, useRef, useState } from "react";

type MaskedHeadingProps = {
  text: string;
  /** Substring of `text` to render in the cosmic gradient, e.g. "into orbit". */
  accent?: string;
  className?: string;
  /** Stagger between words, in ms. */
  stagger?: number;
  /** Delay before the first word starts, in ms. */
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
};

/**
 * Headline that rises into view word by word from behind its own baseline, the
 * way a title card resolves — each word sits in an overflow-hidden sleeve, so it
 * is genuinely masked rather than just faded.
 *
 * The words are aria-hidden and the whole string is exposed once via aria-label,
 * so assistive tech reads a sentence rather than a list of words.
 */
export default function MaskedHeading({
  text,
  accent,
  className = "",
  stagger = 70,
  delay = 0,
  as: Tag = "h2",
}: MaskedHeadingProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // shown in a frame callback rather than synchronously in the effect, so
      // the reveal state isn't set during the effect pass
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const accentWords = accent ? accent.trim().split(/\s+/) : [];
  const words = text.split(/\s+/);
  // Match the accent as a run of consecutive words, so a word that also appears
  // elsewhere in the headline isn't coloured by accident.
  const accentStart = accentWords.length
    ? words.findIndex((_, i) =>
        accentWords.every((w, j) => words[i + j] === w)
      )
    : -1;

  return (
    <Tag ref={ref as React.Ref<never>} aria-label={text} className={className}>
      {words.map((word, i) => {
        const isAccent =
          accentStart >= 0 && i >= accentStart && i < accentStart + accentWords.length;
        return (
          <Fragment key={i}>
            <span
              aria-hidden
              // The sleeve clips the word while it is still below the baseline.
              // `pb`/`-mb` give descenders (g, y, p) room inside the clip.
              className="inline-flex overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]"
            >
              <span
                className={`inline-block will-change-transform ${isAccent ? "text-gradient" : ""}`}
                style={{
                  transitionProperty: "transform, opacity",
                  transitionDuration: "820ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: `${delay + i * stagger}ms`,
                  transform: shown ? "translateY(0)" : "translateY(105%)",
                  opacity: shown ? 1 : 0,
                }}
              >
                {word}
              </span>
            </span>
            {/* A real space *between* sleeves, not inside one — otherwise the
                headline has no break opportunity and never wraps. */}
            {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </Tag>
  );
}
