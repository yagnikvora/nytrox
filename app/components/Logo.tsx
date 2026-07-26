type LogoMarkProps = {
  /** Tailwind sizing utilities for the tile (default 36px square). */
  className?: string;
};

/* Nytrox mark — an "N" monogram set in the brand's cosmic gradient, finished
   with a glossy planet-like highlight and a small orbiting spark. Shared by
   the navbar and footer so the identity stays consistent. */
export default function LogoMark({ className = "h-9 w-9" }: LogoMarkProps) {
  return (
    <span
      className={`relative grid ${className} shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 shadow-[0_0_22px_-4px_rgba(139,92,246,0.9)]`}
    >
      {/* glossy highlight, like light catching a planet */}
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.5),transparent_58%)]" />

      <svg viewBox="0 0 24 24" fill="none" className="relative h-[58%] w-[58%]" aria-hidden>
        {/* N monogram */}
        <path
          d="M6.5 17.5V6.5L17.5 17.5V6.5"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* orbiting spark */}
        <g transform="translate(19.6 4.3) scale(0.2)">
          <path
            d="M0 -10C0.6 -3 3 -0.6 10 0C3 0.6 0.6 3 0 10C-0.6 3 -3 0.6 -10 0C-3 -0.6 -0.6 -3 0 -10Z"
            fill="white"
          />
        </g>
      </svg>
    </span>
  );
}
