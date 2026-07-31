"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export type Milestone = {
  year: string;
  title: string;
  desc: string;
};

/**
 * The flight log, drawn as you scroll: the spine grows downward through the
 * list and each milestone's node ignites as the line reaches it, so the history
 * assembles itself in order instead of arriving all at once.
 *
 * Under prefers-reduced-motion the spine is full and every node lit from the
 * start.
 */
export default function MilestoneTimeline({ items }: { items: Milestone[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const [reached, setReached] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    setReached(Math.min(items.length, Math.floor(v * items.length + 0.7)));
  });

  return (
    <ol ref={ref} className="relative mt-14">
      {/* spine — a dim full-height track with a lit line growing down it */}
      <div
        className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10 sm:left-[calc(6rem+7px)]"
        aria-hidden
      >
        <motion.div
          className="h-full w-full origin-top bg-gradient-to-b from-violet-400 via-indigo-400 to-cyan-300 shadow-[0_0_12px_rgba(139,92,246,0.75)]"
          style={{ scaleY: reduce ? 1 : progress }}
        />
      </div>

      {items.map((m, i) => {
        const lit = reduce || i < reached;
        return (
          <li key={m.year} className="relative pb-10 last:pb-0">
            <div className="flex gap-6 sm:gap-8">
              {/* year rail (desktop) */}
              <span
                className={`hidden w-24 shrink-0 pt-px text-right font-display text-sm font-bold transition-colors duration-500 sm:block ${
                  lit ? "text-white" : "text-ink-muted/60"
                }`}
              >
                {m.year}
              </span>

              {/* node */}
              <span
                className={`relative mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full ring-4 ring-[#05050f] transition-all duration-500 ease-out ${
                  lit
                    ? "scale-110 bg-gradient-to-br from-violet-400 to-cyan-300 shadow-[0_0_16px_3px_rgba(139,92,246,0.65)]"
                    : "bg-white/20"
                }`}
                aria-hidden
              />

              <div
                className="min-w-0 pb-1 transition-all duration-500 ease-out"
                style={{
                  opacity: lit ? 1 : 0.42,
                  transform: lit ? "translateY(0)" : "translateY(10px)",
                }}
              >
                <span className="font-display text-sm font-bold text-violet-300 sm:hidden">
                  {m.year}
                </span>
                <h3 className="mt-1 font-display text-lg font-semibold text-white sm:mt-0">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-ink-muted">{m.desc}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
