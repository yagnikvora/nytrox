"use client";

// Inspired by React Bits (https://reactbits.dev) — TiltedCard.
import { useRef, useState, type ReactNode } from "react";

type TiltedCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt away from flat, in degrees. */
  max?: number;
  /** Lens depth — lower is a stronger 3D effect. */
  perspective?: number;
};

/**
 * Tips its contents toward the pointer in 3D, with a highlight that tracks the
 * cursor. Falls flat (literally) for reduced-motion visitors and never engages
 * on touch, where there is no hover to key off.
 */
export default function TiltedCard({
  children,
  className = "",
  max = 8,
  perspective = 900,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ rx: (0.5 - py) * max * 2, ry: (px - 0.5) * max * 2 });
    setGlow({ x: px * 100, y: py * 100, on: true });
  };

  const reset = () => {
    setTilt({ rx: 0, ry: 0 });
    setGlow((g) => ({ ...g, on: false }));
  };

  return (
    <div style={{ perspective: `${perspective}px` }} className="h-full">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className={`relative h-full transition-transform duration-300 ease-out ${className}`}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: glow.on ? 1 : 0,
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(196,181,253,0.16), transparent 55%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
}
