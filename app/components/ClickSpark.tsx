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

    let lastW = 0;
    const resize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Resizing the backing store clears it. On Android the URL bar sliding
      // away fires resize mid-scroll, which wiped a burst that was still
      // playing; a width-only check skips that case.
      if (lastW === vw && canvas.height >= Math.floor(vh * dpr)) return;
      lastW = vw;
      canvas.width = Math.floor(vw * dpr);
      canvas.height = Math.floor(vh * dpr);
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
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
      // A click synthesised from the keyboard (Enter on a focused button)
      // reports clientX/clientY as 0, so the burst fired in the top-left
      // corner of the screen instead of at the control. detail is 0 for
      // exactly those events and 1+ for real pointer clicks.
      if (e.detail === 0) return;
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
