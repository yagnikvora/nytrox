"use client";

import { useEffect, useState } from "react";

/**
 * Whether the visitor asked for reduced motion — false during SSR and the first
 * client render, then true from the frame after mount if the query matches.
 *
 * That delay is deliberate. A media query can only be read on the client, and
 * React does *not* patch attribute mismatches it finds while hydrating: if the
 * server renders `opacity: 0.45` (its scroll-driven "not yet revealed" state)
 * and the first client render says `opacity: 1`, the server's value stays on
 * screen for good. Flipping a frame later is an ordinary re-render, which React
 * does apply — so reduced-motion visitors end up with everything visible.
 *
 * Prefer this over motion's `useReducedMotion()` for anything that affects the
 * first render: that one reads the query during render (hydration mismatch) and
 * never updates afterwards.
 */
export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduce;
}
