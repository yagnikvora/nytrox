// Inspired by React Bits (https://reactbits.dev) — GradualBlur.

type GradualBlurProps = {
  side: "left" | "right";
  /** Width of the blurred strip, e.g. "6rem". */
  width?: string;
  /** Peak blur at the outer edge, in px. */
  strength?: number;
  /** Fade the whole strip out — e.g. once the rail has nothing left to scroll. */
  active?: boolean;
};

/**
 * Soft focus falloff at the edge of a scroll rail: content doesn't stop at a
 * hard line, it blurs and fades out of frame. Stacked strips of increasing blur
 * (each masked to its own slice) give a smooth ramp that a single
 * backdrop-filter can't.
 */
export default function GradualBlur({
  side,
  width = "5rem",
  strength = 6,
  active = true,
}: GradualBlurProps) {
  const layers = [0.25, 0.5, 0.75, 1];
  const toEdge = side === "left" ? "270deg" : "90deg";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 z-10 transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-0"
      }`}
      style={{ width, [side]: 0 }}
    >
      {layers.map((step, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${strength * step}px)`,
            WebkitBackdropFilter: `blur(${strength * step}px)`,
            // each layer only paints over its slice nearest the edge
            maskImage: `linear-gradient(${toEdge}, #000 ${(1 - step) * 100}%, transparent ${
              (1 - step) * 100 + 25
            }%)`,
            WebkitMaskImage: `linear-gradient(${toEdge}, #000 ${(1 - step) * 100}%, transparent ${
              (1 - step) * 100 + 25
            }%)`,
          }}
        />
      ))}
    </div>
  );
}
