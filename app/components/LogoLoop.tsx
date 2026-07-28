// Inspired by React Bits (https://reactbits.dev) — LogoLoop. CSS-only marquee
// (see the `marquee` keyframes in globals.css), so it stays a server component.

type LogoLoopProps = {
  items: string[];
  /** Seconds for one full pass. */
  speed?: number;
  reverse?: boolean;
};

/**
 * Endless horizontal rail of labels. The track holds two identical copies and
 * scrolls exactly half its width, so the loop has no visible seam; the whole
 * rail is masked at both edges so items fade in and out rather than clipping.
 *
 * Pauses on hover, and holds still under prefers-reduced-motion.
 */
export default function LogoLoop({ items, speed = 38, reverse = false }: LogoLoopProps) {
  const track = [...items, ...items];

  return (
    <div
      className="group relative overflow-hidden py-2"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <ul
        className="animate-marquee flex w-max items-center gap-3 group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : undefined,
        }}
      >
        {track.map((item, i) => (
          <li
            key={`${item}-${i}`}
            // the duplicate half is decorative; only the first pass is read out
            aria-hidden={i >= items.length}
            className="glass shrink-0 rounded-xl px-5 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-white"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
