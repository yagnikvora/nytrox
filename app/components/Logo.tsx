/* Nytrox identity — the mark and the NYTROX wordmark are the supplied artwork
   (public/Only-Logo.svg, public/Only-Name.svg) painted through a CSS mask, so
   the shapes come from the source files while the colour comes from the site
   palette instead of the artwork's gold. See `.brand-art` in globals.css: it
   carries the same stops and the same 8s beat as `.text-gradient`, so the logo
   travels with every other gradient on the page.

   Both pieces are height-driven — pass a `h-*` utility and the width follows
   from the source viewBox. Shared by the navbar and the footer so the identity
   stays consistent. */

/** Aspect ratios lifted from the source files' viewBox. */
const MARK_RATIO = "3167.88 / 2622.44";
const NAME_RATIO = "5066.09 / 822.2";

type BrandProps = {
  /** Tailwind height utility; the width follows the artwork (default 36px tall). */
  className?: string;
};

export default function LogoMark({ className = "h-9" }: BrandProps) {
  /* The glow lives on the wrapper, not on the shape: masking is applied after
     filters, so a drop-shadow on the masked element itself gets masked away
     with it. From out here the filter sees the finished glyph. */
  return (
    <span
      className={`inline-block shrink-0 drop-shadow-[0_0_16px_rgba(139,92,246,0.55)] ${className}`}
      aria-hidden
    >
      <span
        className="brand-art brand-mark block h-full"
        style={{ aspectRatio: MARK_RATIO }}
      />
    </span>
  );
}

export function LogoWordmark({ className = "h-[17px]" }: BrandProps) {
  return (
    <span
      className={`brand-art brand-name inline-block ${className}`}
      style={{ aspectRatio: NAME_RATIO }}
      aria-hidden
    />
  );
}

type LockupProps = {
  className?: string;
  markClassName?: string;
  nameClassName?: string;
};

/** Mark + wordmark, sized to sit together on one line. */
export function LogoLockup({
  className = "",
  markClassName,
  nameClassName,
}: LockupProps) {
  return (
    <span
      role="img"
      aria-label="Nytrox"
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <LogoMark className={markClassName} />
      <LogoWordmark className={nameClassName} />
    </span>
  );
}
