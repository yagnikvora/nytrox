// Inspired by React Bits (https://reactbits.dev) - LogoLoop. CSS-only marquee
// (see the `marquee` keyframes in globals.css), so it stays a server component.
import Image from "next/image";
import type { CSSProperties } from "react";
import type { StackItem } from "../data/stack";

type LogoLoopProps = {
  items: StackItem[];
  /** Seconds for one full pass. */
  speed?: number;
  reverse?: boolean;
};

/**
 * Endless horizontal rail of logo chips - each technology's mark beside its
 * name. The track holds two identical copies and
 * scrolls exactly half its width, so the loop has no visible seam; the whole
 * rail is masked at both edges so items fade in and out rather than clipping.
 *
 * The logos sit a little muted so the rail reads as one quiet row; hovering a
 * chip brings its mark to full colour and lights the chip in that brand's hue
 * (--brand, see .stack-chip in globals.css). The rail pauses on hover, and
 * holds still under prefers-reduced-motion.
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
            key={`${item.name}-${i}`}
            // the duplicate half is decorative; only the first pass is read out
            aria-hidden={i >= items.length}
            style={{ "--brand": item.brand } as CSSProperties}
            className="stack-chip glass flex shrink-0 items-center gap-3 rounded-xl py-2.5 pl-3.5 pr-5 text-sm font-medium text-ink-muted"
          >
            <span className="stack-logo grid h-9 w-9 place-items-center rounded-lg">
              {/* the name sits right beside it, so the mark itself is decorative */}
              <Image
                src={item.logo}
                alt=""
                width={22}
                height={22}
                className="h-[22px] w-[22px] object-contain"
              />
            </span>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
