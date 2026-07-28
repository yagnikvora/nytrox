"use client";

// Inspired by React Bits (https://reactbits.dev) — Magnet.
import { useEffect, useRef, useState, type ReactNode } from "react";

type MagnetProps = {
  children: ReactNode;
  className?: string;
  /** How far outside the element the pull starts, in px. */
  padding?: number;
  /** 0 = no movement, 1 = follows the cursor exactly. */
  strength?: number;
};

/**
 * Nudges its child toward the cursor while the pointer is nearby, then springs
 * back on exit. Ignored on touch/coarse pointers and for reduced-motion users,
 * where it renders as a plain wrapper.
 */
export default function Magnet({
  children,
  className = "",
  padding = 90,
  strength = 0.32,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const withinX = Math.abs(e.clientX - cx) < r.width / 2 + padding;
      const withinY = Math.abs(e.clientY - cy) < r.height / 2 + padding;

      if (withinX && withinY) {
        setActive(true);
        setOffset({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
      } else if (active) {
        setActive(false);
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [active, padding, strength]);

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        // snappy while engaged, softer spring on release
        transition: active
          ? "transform 120ms cubic-bezier(0.22, 1, 0.36, 1)"
          : "transform 620ms cubic-bezier(0.22, 1.6, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}
