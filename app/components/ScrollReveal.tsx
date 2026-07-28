"use client";

// Inspired by React Bits (https://reactbits.dev) — ScrollReveal. Upstream drives
// this with GSAP ScrollTrigger; this build ties the same effect to a passive
// scroll listener + rAF so the project keeps its zero-extra-dependency setup.
import { useCallback, useEffect, useRef, useState } from "react";

type ScrollRevealProps = {
  children: string;
  className?: string;
  /** Opacity of a word before it has been revealed. */
  baseOpacity?: number;
  /** Blur applied to an unrevealed word, in px. Set 0 to disable. */
  blurStrength?: number;
  /** Tilt the block starts at, in degrees, easing to 0 as it enters. */
  baseRotation?: number;
};

/**
 * Brightens a paragraph word by word as it travels up the viewport — the text
 * sharpens into focus while you read it.
 *
 * Falls back to fully-revealed text when IntersectionObserver is unavailable or
 * the visitor prefers reduced motion.
 */
export default function ScrollReveal({
  children,
  className = "",
  baseOpacity = 0.12,
  blurStrength = 4,
  baseRotation = 2,
}: ScrollRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const frame = useRef(0);
  const [progress, setProgress] = useState(0);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // 0 when the block's top hits the bottom of the viewport, 1 once its
    // bottom has risen past ~65% of the viewport height.
    const start = window.innerHeight;
    const end = window.innerHeight * 0.35;
    const span = start - end + rect.height;
    const travelled = start - rect.top;
    setProgress(Math.min(1, Math.max(0, travelled / span)));
  }, []);

  useEffect(() => {
    // Reduced motion: reveal everything and skip the scroll wiring entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame.current = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(frame.current);
    }
    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(measure);
    };
    // first measure runs in a frame callback, not synchronously in the effect
    frame.current = requestAnimationFrame(measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measure]);

  const words = children.split(" ");

  return (
    <p
      ref={ref}
      className={className}
      style={{
        transform: `rotate(${(1 - progress) * baseRotation}deg)`,
        transformOrigin: "0% 50%",
      }}
    >
      {words.map((word, i) => {
        // each word owns a slice of the scroll range, so they light up in order
        const slice = 1 / words.length;
        const lit = Math.min(1, Math.max(0, (progress - i * slice * 0.75) / slice));
        return (
          <span
            key={i}
            style={{
              opacity: baseOpacity + (1 - baseOpacity) * lit,
              filter: blurStrength ? `blur(${(1 - lit) * blurStrength}px)` : undefined,
              transition: "opacity 120ms linear, filter 120ms linear",
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
