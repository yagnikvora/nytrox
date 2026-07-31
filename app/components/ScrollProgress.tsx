"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Hairline reading-progress bar across the top of the page. Sits above the
 * navbar (z-50) and is spring-smoothed so it glides rather than tracking the
 * wheel one-to-one.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-violet-500 via-indigo-400 to-cyan-300 shadow-[0_0_18px_rgba(139,92,246,0.75)]"
    />
  );
}
