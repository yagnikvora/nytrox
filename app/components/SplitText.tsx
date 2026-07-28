"use client";

// Inspired by React Bits (https://reactbits.dev) — SplitText, rebuilt for this
// project: the upstream version drives GSAP, this one stages plain CSS
// transitions so it adds no dependency and matches Reveal's approach.
import { useEffect, useRef, useState } from "react";

type SplitTextProps = {
  text: string;
  className?: string;
  /** Animate one unit at a time, or whole words. */
  splitBy?: "chars" | "words";
  /** Stagger between units, in ms. */
  delay?: number;
  /** Delay before the first unit starts, in ms. */
  startDelay?: number;
  duration?: number;
  as?: "span" | "h1" | "h2" | "p";
};

/**
 * Reveals text one character (or word) at a time when it scrolls into view:
 * each unit rises, unblurs, and fades up.
 *
 * The split units are aria-hidden and the whole string is exposed once via
 * aria-label, so assistive tech reads a sentence rather than loose letters.
 */
export default function SplitText({
  text,
  className = "",
  splitBy = "chars",
  delay = 28,
  startDelay = 0,
  duration = 620,
  as: Tag = "span",
}: SplitTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Split into words first so a word never breaks across lines mid-animation.
  const words = text.split(" ");
  let unitIndex = 0;

  return (
    <Tag
      ref={ref as React.Ref<never>}
      aria-label={text}
      className={`inline-block ${className}`}
    >
      {words.map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap" aria-hidden>
          {splitBy === "words"
            ? renderUnit(word, unitIndex++, shown, delay, startDelay, duration)
            : [...word].map((char) =>
                renderUnit(char, unitIndex++, shown, delay, startDelay, duration)
              )}
          {w < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}

function renderUnit(
  content: string,
  index: number,
  shown: boolean,
  delay: number,
  startDelay: number,
  duration: number
) {
  return (
    <span
      key={index}
      className="inline-block will-change-transform"
      style={{
        transitionProperty: "opacity, transform, filter",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${startDelay + index * delay}ms`,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(0.45em)",
        filter: shown ? "blur(0)" : "blur(6px)",
      }}
    >
      {content}
    </span>
  );
}
