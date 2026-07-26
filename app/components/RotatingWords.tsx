"use client";

// A small, robust rotating word for the hero headline.
//
// Design goals (why this exists instead of a per-character rotator):
//   * Only ONE whole phrase is mounted at a time (AnimatePresence mode="wait"),
//     so two phrases can never occupy the same line.
//   * Each phrase is a single, non-splitting unit that slides vertically inside
//     an overflow-hidden box — so it can never wrap or smear horizontally.
//   * An invisible sizer reserves the width/height of the longest phrase, so the
//     box never resizes and the text after it ("into orbit") never jumps.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function RotatingWords({
  words,
  interval = 2800,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(
      () => setIndex((p) => (p + 1) % words.length),
      interval
    );
    return () => clearInterval(id);
  }, [words.length, interval]);

  const longest = words.reduce((a, b) => (b.length >= a.length ? b : a), "");

  return (
    <span className="relative inline-grid overflow-hidden pb-[0.12em] leading-[1.12] align-bottom">
      {/* invisible sizer keeps the box at the widest phrase */}
      <span aria-hidden className={`invisible [grid-area:1/1] whitespace-nowrap ${className}`}>
        {longest}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          className={`[grid-area:1/1] whitespace-nowrap ${className}`}
          initial={{ y: "115%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-115%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
