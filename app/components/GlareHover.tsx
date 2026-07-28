// Inspired by React Bits (https://reactbits.dev) — GlareHover. Implemented with
// a CSS-only sweep so it stays a server component and costs nothing at runtime.
import type { ReactNode } from "react";

type GlareHoverProps = {
  children: ReactNode;
  className?: string;
  /** Tilt of the light band, in degrees. */
  angle?: number;
};

/**
 * Sweeps a soft band of light diagonally across its contents on hover — the
 * "polished glass" catch you get when tilting a card toward a window.
 *
 * The tilt sits on an outer wrapper (via the standalone `rotate` property) and
 * the sweep on an inner one, so the rotation can't clobber the translate the
 * hover transition animates.
 */
export default function GlareHover({
  children,
  className = "",
  angle = 20,
}: GlareHoverProps) {
  return (
    <div className={`group/glare relative overflow-hidden ${className}`}>
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-y-32 inset-x-0 z-10 motion-reduce:hidden"
        style={{ rotate: `${angle}deg` }}
      >
        <span
          className="absolute inset-y-0 left-0 w-1/4 -translate-x-[250%] opacity-0 blur-md transition-all duration-[900ms] ease-out group-hover/glare:translate-x-[500%] group-hover/glare:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.14) 45%, rgba(196,181,253,0.22) 55%, transparent)",
          }}
        />
      </span>
      {children}
    </div>
  );
}
