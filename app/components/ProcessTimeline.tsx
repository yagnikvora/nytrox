"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export type ProcessStep = {
  step: string;
  title: string;
  desc: string;
};

/**
 * The process, drawn as you read it: a gradient line traces the section as it
 * scrolls past — left to right on desktop, top to bottom on narrow screens —
 * and each stage lights up the moment the line reaches it.
 *
 * Under prefers-reduced-motion every stage renders lit and the line is full, so
 * nothing is hidden behind an animation that never runs.
 */
export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  // Starts when the block is three-quarters up the viewport and completes as it
  // leaves — so the line is drawing during the part of the scroll you're
  // actually looking at it.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const [reached, setReached] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    // +0.55 lights a stage as the line arrives at it rather than after it.
    setReached(Math.min(steps.length, Math.floor(v * steps.length + 0.55)));
  });

  const lit = (i: number) => reduce || i < reached;

  return (
    <div ref={ref} className="relative mt-16">
      {/* Rail — horizontal from lg up, level with the middle of the number
          tiles; vertical below that, threaded through their centres. */}
      <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-white/10 lg:block">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-300 shadow-[0_0_12px_rgba(139,92,246,0.8)]"
          style={{ scaleX: reduce ? 1 : progress }}
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-7 top-0 w-px bg-white/10 lg:hidden">
        <motion.div
          className="w-full origin-top bg-gradient-to-b from-violet-400 via-indigo-400 to-cyan-300 shadow-[0_0_12px_rgba(139,92,246,0.8)]"
          style={{ scaleY: reduce ? 1 : progress }}
        />
      </div>

      <ol className="grid gap-8 lg:grid-cols-6 lg:gap-3">
        {steps.map((p, i) => (
          <li key={p.step} className="relative flex gap-5 lg:block">
            {/* Number tile. Sits on the rail, so it needs an opaque-ish
                backdrop to break the line rather than let it run underneath. */}
            <div
              className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl font-display text-sm font-bold transition-all duration-500 ease-out ${
                lit(i)
                  ? "scale-105 bg-gradient-to-br from-violet-500/70 to-cyan-400/50 text-white ring-1 ring-violet-300/50 shadow-[0_0_30px_-6px_rgba(139,92,246,0.95)]"
                  : "bg-[#07071a] text-ink-muted ring-1 ring-white/10"
              }`}
            >
              {p.step}
              {/* soft halo, only once lit */}
              <span
                aria-hidden
                className={`absolute -inset-1.5 -z-10 rounded-2xl bg-violet-500/25 blur-md transition-opacity duration-500 ${
                  lit(i) ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            <div
              className="transition-all duration-500 ease-out"
              style={{
                opacity: lit(i) ? 1 : 0.45,
                transform: lit(i) ? "translateY(0)" : "translateY(8px)",
              }}
            >
              <h3 className="mt-0 font-display text-base font-semibold text-white lg:mt-4">
                {p.title}
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-ink-muted">{p.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
