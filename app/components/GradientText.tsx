"use client";

// Adapted from React Bits (https://reactbits.dev) — GradientText, ported to
// TS + Tailwind for this project. Two changes from upstream: an `inline` mode,
// so a run of gradient text can sit mid-sentence instead of always being a
// fit-content flex block, and the sweep holds still under prefers-reduced-motion.
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "motion/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * React Bits' GradientText stops — electric violet → pink → lilac. Shared with
 * the `.text-gradient` utility in globals.css, so component text and inline
 * text are the same gradient wherever they sit next to each other.
 */
export const GRADIENT_STOPS = ["#5227FF", "#FF9FFC", "#B497CF"];

type GradientTextProps = {
  children: ReactNode;
  className?: string;
  colors?: string[];
  /** Seconds for one pass across the gradient. */
  animationSpeed?: number;
  /** Wrap the text in an animated 1px gradient border. */
  showBorder?: boolean;
  direction?: "horizontal" | "vertical" | "diagonal";
  pauseOnHover?: boolean;
  /** Sweep back and forth (default) rather than looping one way. */
  yoyo?: boolean;
  /** Render as a span in the text flow instead of a centred block. */
  inline?: boolean;
};

export default function GradientText({
  children,
  className = "",
  colors = GRADIENT_STOPS,
  animationSpeed = 8,
  showBorder = false,
  direction = "horizontal",
  pauseOnHover = false,
  yoyo = true,
  inline = false,
}: GradientTextProps) {
  const [isPaused, setIsPaused] = useState(false);
  const reduce = usePrefersReducedMotion();
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  const animationDuration = animationSpeed * 1000;

  useAnimationFrame((time) => {
    if (isPaused || reduce) {
      lastTimeRef.current = null;
      return;
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    if (yoyo) {
      // one pass out, one pass back, so the sweep never jumps at the seam
      const fullCycle = animationDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;
      progress.set(
        cycleTime < animationDuration
          ? (cycleTime / animationDuration) * 100
          : 100 - ((cycleTime - animationDuration) / animationDuration) * 100
      );
    } else {
      progress.set((elapsedRef.current / animationDuration) * 100);
    }
  });

  useEffect(() => {
    elapsedRef.current = 0;
    progress.set(0);
  }, [animationSpeed, yoyo, progress]);

  const backgroundPosition = useTransform(progress, (p) =>
    direction === "vertical" ? `50% ${p}%` : `${p}% 50%`
  );

  const onEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);
  const onLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const angle =
    direction === "horizontal"
      ? "to right"
      : direction === "vertical"
        ? "to bottom"
        : "to bottom right";

  // First colour repeated at the end so the loop closes seamlessly.
  const gradientStyle = {
    backgroundImage: `linear-gradient(${angle}, ${[...colors, colors[0]].join(", ")})`,
    backgroundSize:
      direction === "horizontal"
        ? "300% 100%"
        : direction === "vertical"
          ? "100% 300%"
          : "300% 300%",
    backgroundRepeat: "repeat",
  };

  const Wrapper = inline ? motion.span : motion.div;
  const Inner = inline ? motion.span : motion.div;

  return (
    <Wrapper
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={
        inline
          ? `relative inline-block ${showBorder ? "px-2 py-1" : ""} ${className}`
          : `relative mx-auto flex max-w-fit flex-row items-center justify-center overflow-hidden rounded-[1.25rem] font-medium ${
              showBorder ? "px-2 py-1" : ""
            } ${className}`
      }
    >
      {showBorder && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 rounded-[1.25rem]"
          style={{ ...gradientStyle, backgroundPosition }}
        >
          {/* inset fill leaves a 1px ring of the gradient showing */}
          <span className="absolute left-1/2 top-1/2 z-[-1] -translate-x-1/2 -translate-y-1/2 rounded-[1.25rem] bg-[#05050f] [height:calc(100%-2px)] [width:calc(100%-2px)]" />
        </motion.span>
      )}
      <Inner
        className="relative z-[2] inline-block bg-clip-text text-transparent"
        style={{
          ...gradientStyle,
          backgroundPosition,
          WebkitBackgroundClip: "text",
        }}
      >
        {children}
      </Inner>
    </Wrapper>
  );
}
