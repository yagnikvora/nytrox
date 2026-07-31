"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /**
   * Vertical drift, in px, across the element's whole trip through the
   * viewport: it starts `speed` px low and ends `speed` px high. Negative
   * values move it the other way (faster than the page).
   */
  speed?: number;
  /** Scale it starts at, easing to 1 as it centres. 1 disables. */
  zoom?: number;
  /** Fade in on entry and out on exit. */
  fade?: boolean;
};

/**
 * Depth on scroll: wrapped content drifts at its own rate as the page moves, so
 * foreground and background separate instead of travelling as one flat plane.
 *
 * Under prefers-reduced-motion it renders a plain, static wrapper.
 *
 * Note the transform makes this element the containing block for any
 * `position: fixed` descendant — wrap page content, never the navbar, the
 * cursor, or the star canvas.
 */
export default function Parallax({
  children,
  className = "",
  speed = 60,
  zoom = 1,
  fade = false,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Springing the progress keeps the drift from tracking every wheel jitter.
  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.0005,
  });

  const y = useTransform(p, [0, 1], [speed, -speed]);
  const scale = useTransform(p, [0, 0.5, 1], [zoom, 1, zoom]);
  const opacity = useTransform(p, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);

  // The ref stays attached in the static case too, so `useScroll` above never
  // warns about a target that was never mounted.
  if (reduce)
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y,
        scale: zoom === 1 ? undefined : scale,
        opacity: fade ? opacity : undefined,
      }}
    >
      {children}
    </motion.div>
  );
}
