"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/** How the content is hidden before it enters the viewport. */
export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "blur"
  | "clip";

const HIDDEN: Record<RevealVariant, CSSProperties> = {
  up: { opacity: 0, transform: "translateY(2rem)" },
  down: { opacity: 0, transform: "translateY(-2rem)" },
  left: { opacity: 0, transform: "translateX(-2.5rem)" },
  right: { opacity: 0, transform: "translateX(2.5rem)" },
  scale: { opacity: 0, transform: "scale(0.93)" },
  blur: { opacity: 0, transform: "translateY(1.5rem)", filter: "blur(12px)" },
  // Wipes up from behind its own bottom edge — no fade, so it reads as a
  // reveal rather than an appearance.
  clip: { clipPath: "inset(100% 0 0 0)", transform: "translateY(1rem)" },
};

const SHOWN: Record<RevealVariant, CSSProperties> = {
  up: { opacity: 1, transform: "translateY(0)" },
  down: { opacity: 1, transform: "translateY(0)" },
  left: { opacity: 1, transform: "translateX(0)" },
  right: { opacity: 1, transform: "translateX(0)" },
  scale: { opacity: 1, transform: "scale(1)" },
  // A zero-radius blur is NOT the same as no filter: it keeps the element on
  // its own compositor layer for the life of the page. The home page alone
  // finished with forty of those still live — memory and raster work that
  // Android phones pay for and never get back. This settles to "none"
  // instead; BLUR_LANDING below is how it gets there without killing the
  // animation on the way.
  blur: { opacity: 1, transform: "translateY(0)", filter: "none" },
  clip: { clipPath: "inset(0% 0 0 0)", transform: "translateY(0)" },
};

/**
 * The blur variant mid-transition. A filter cannot animate to "none", so the
 * reveal has to land on a real zero radius first and only then be dropped.
 */
const BLUR_LANDING: CSSProperties = {
  opacity: 1,
  transform: "translateY(0)",
  filter: "blur(0px)",
};

/**
 * Reveals its content the first time it scrolls into view. `variant` picks how:
 * a rise, a slide from either side, a scale-up, a de-blur, or a clip wipe.
 *
 * Falls back to visible when IntersectionObserver is unavailable, and skips the
 * animation entirely under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 700,
  variant = "up",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: RevealVariant;
  as?: "div" | "section" | "li" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  /** True once the reveal has played out and its filter layer can be released. */
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // in a frame callback rather than synchronously in the effect body
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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Once the transition has finished, drop the compositor layer. A timer
  // rather than transitionend: filter is only one of four animated properties
  // here, and an element already in view can finish before a listener lands.
  useEffect(() => {
    if (!shown || settled) return;
    const timer = setTimeout(() => setSettled(true), delay + duration + 60);
    return () => clearTimeout(timer);
  }, [shown, settled, delay, duration]);

  return createElement(
    as,
    {
      ref,
      style: {
        transitionProperty: "opacity, transform, filter, clip-path",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
        ...(shown
          ? variant === "blur" && !settled
            ? BLUR_LANDING
            : SHOWN[variant]
          : HIDDEN[variant]),
      } satisfies CSSProperties,
      className,
    },
    children
  );
}
