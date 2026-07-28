"use client";

// Inspired by React Bits (https://reactbits.dev) — ClickSpark, written against
// this project's canvas conventions (see SpaceBackground) and mounted once at
// the page root instead of wrapping children.
import { useEffect, useRef } from "react";

type Spark = { x: number; y: number; angle: number; born: number };

type ClickSparkProps = {
  sparkColor?: string;
  /** Length of each spark line, in px. */
  sparkSize?: number;
  /** How far the sparks travel from the click point, in px. */
  sparkRadius?: number;
  sparkCount?: number;
  /** Lifetime of one burst, in ms. */
  duration?: number;
};

/**
 * Scatters a short burst of sparks from every click, on a fixed overlay canvas.
 * Silent for reduced-motion visitors, and pointer-events-none so it never
 * intercepts a click of its own.
 */
export default function ClickSpark({
  sparkColor = "#a78bfa",
  sparkSize = 11,
  sparkRadius = 22,
  sparkCount = 9,
  duration = 420,
}: ClickSparkProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let sparks: Spark[] = [];
    let raf = 0;

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    // easeOutCubic — quick flick outward, gentle settle
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const draw = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks = sparks.filter((s) => now - s.born < duration);

      ctx.lineCap = "round";
      for (const s of sparks) {
        const t = ease((now - s.born) / duration);
        const fade = 1 - (now - s.born) / duration;
        const dist = sparkRadius * t;
        const x1 = s.x + Math.cos(s.angle) * dist;
        const y1 = s.y + Math.sin(s.angle) * dist;
        const x2 = s.x + Math.cos(s.angle) * (dist + sparkSize * fade);
        const y2 = s.y + Math.sin(s.angle) * (dist + sparkSize * fade);

        ctx.strokeStyle = sparkColor;
        ctx.globalAlpha = fade;
        ctx.lineWidth = 2 * dpr;
        ctx.beginPath();
        ctx.moveTo(x1 * dpr, y1 * dpr);
        ctx.lineTo(x2 * dpr, y2 * dpr);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      raf = sparks.length ? requestAnimationFrame(draw) : 0;
    };

    const onClick = (e: MouseEvent) => {
      const now = performance.now();
      for (let i = 0; i < sparkCount; i++) {
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          angle: (Math.PI * 2 * i) / sparkCount,
          born: now,
        });
      }
      if (!raf) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("click", onClick);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9997] h-full w-full"
    />
  );
}
