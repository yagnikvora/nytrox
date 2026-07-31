"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useState } from "react";

/** r=22 circle centred in a 48×48 box, drawn as two arcs from 12 o'clock. */
const DIAL = "M24 2 A22 22 0 1 1 24 46 A22 22 0 1 1 24 2";

/**
 * Back-to-top button that doubles as a progress dial: the ring around it traces
 * how far down the page you are. Appears once you're a screen or so in, so it
 * never covers the hero.
 */
export default function ScrollToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [shown, setShown] = useState(false);

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (y) => {
    setShown(y > 700);
  });

  return (
    <motion.button
      type="button"
      // An explicit behavior wins over the stylesheet either way, so this stays
      // smooth whether or not SmoothScroll is driving.
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      initial={false}
      animate={{
        opacity: shown ? 1 : 0,
        scale: shown ? 1 : 0.6,
        y: shown ? 0 : 14,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: shown ? "auto" : "none" }}
      className="glass group fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full text-white/80 transition-colors hover:text-white hover:shadow-[0_0_28px_-6px_rgba(139,92,246,0.9)]"
    >
      {/* progress dial */}
      <svg
        viewBox="0 0 48 48"
        className="absolute inset-0 h-full w-full -rotate-90"
        aria-hidden
      >
        {/* Two arcs rather than a <circle>: pathLength animation needs an
            element with a measurable path length in every browser. */}
        <path
          d={DIAL}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
        />
        <motion.path
          d={DIAL}
          fill="none"
          stroke="url(#scroll-dial)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength }}
        />
        <defs>
          <linearGradient id="scroll-dial" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className="relative transition-transform duration-300 group-hover:-translate-y-0.5"
        aria-hidden
      >
        <path
          d="M12 19V5M6 11l6-6 6 6"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}
