import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

/**
 * Animated planet with tilted orbits and gliding satellites.
 *
 * Originally the hero visual (commit 8b6a6e5); revived here as the About page
 * centrepiece. Pure CSS — every keyframe it uses (`animate-halo`,
 * `animate-planet-spin`, `animate-spin-slow*`, `animate-twinkle`,
 * `animate-float*`) already lives in globals.css and is disabled under
 * prefers-reduced-motion.
 */

const ORBIT_SQUASH = 0.42; // vertical squash → fakes a ~65° viewing angle

/* Storm/cloud features that scroll across the planet to make the rotation
   clearly visible. Darker bands + brighter swirls give strong, drifting contrast;
   every blob fades to transparent so two side-by-side copies loop seamlessly. */
const PLANET_CLOUDS =
  "radial-gradient(32% 15% at 26% 34%, rgba(22,12,66,0.42), transparent 62%)," +
  "radial-gradient(26% 13% at 64% 60%, rgba(12,7,46,0.38), transparent 62%)," +
  "radial-gradient(20% 12% at 88% 74%, rgba(22,12,66,0.32), transparent 62%)," +
  "radial-gradient(34% 22% at 16% 26%, rgba(255,255,255,0.22), transparent 64%)," +
  "radial-gradient(26% 17% at 78% 40%, rgba(184,150,255,0.30), transparent 62%)";

export default function OrbitVisual({
  chips = [],
}: {
  /** Optional floating labels — [top-left, bottom-right]. */
  chips?: [string, string] | [];
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* Rotating aurora glow */}
      <div className="absolute left-1/2 top-1/2 h-[84%] w-[84%] -translate-x-1/2 -translate-y-1/2 animate-spin-slowest rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(139,92,246,0.35),transparent_34%,rgba(34,211,238,0.32),transparent_62%,rgba(236,72,153,0.28),transparent)] blur-2xl" />

      {/* Pulsing core halo */}
      <div className="absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 animate-halo rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.55),transparent_66%)] blur-2xl" />

      {/* Twinkling stars */}
      <span className="absolute left-[14%] top-[20%] h-1 w-1 animate-twinkle rounded-full bg-white" />
      <span className="absolute right-[18%] top-[26%] h-1.5 w-1.5 animate-twinkle rounded-full bg-cyan-200" style={{ animationDelay: "1.1s" }} />
      <span className="absolute bottom-[16%] left-[22%] h-1 w-1 animate-twinkle rounded-full bg-violet-200" style={{ animationDelay: "2s" }} />
      <span className="absolute bottom-[24%] right-[13%] h-1 w-1 animate-twinkle rounded-full bg-white" style={{ animationDelay: "0.6s" }} />

      {/* Tilted orbits + gliding satellites (behind the planet) */}
      <Orbit size="96%" spin="animate-spin-slower">
        <Satellite pos="top-0 left-1/2" size="h-3 w-3" tone="bg-cyan-300 shadow-[0_0_18px_5px_rgba(34,211,238,0.9)]" />
        <Satellite pos="top-1/2 left-0" size="h-1.5 w-1.5" tone="bg-white/80 shadow-[0_0_10px_3px_rgba(255,255,255,0.6)]" />
      </Orbit>
      <Orbit size="70%" spin="animate-spin-slow" reverse>
        <Satellite pos="top-1/2 right-0" size="h-2.5 w-2.5" tone="bg-violet-300 shadow-[0_0_18px_5px_rgba(167,139,250,0.9)]" />
      </Orbit>
      <Orbit size="48%" spin="animate-spin-slow">
        <Satellite pos="bottom-0 left-1/2" size="h-2 w-2" tone="bg-pink-300 shadow-[0_0_16px_5px_rgba(244,114,182,0.9)]" />
      </Orbit>

      {/* Planet with a ring that wraps around it */}
      <div className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 animate-float">
        {/* far half of the ring — sits behind the planet */}
        <SaturnRing half="back" />

        {/* planet body — overflow-hidden + every layer rounded-full so nothing
            shows a square edge */}
        <div className="absolute inset-0 overflow-hidden rounded-full ring-1 ring-white/10 shadow-[0_0_90px_-6px_rgba(139,92,246,0.85)]">
          {/* base sphere shading (fixed light source) */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_34%_30%,#ece4ff_0%,#b9a6fb_24%,#7c6bef_48%,#4b3fce_70%,#241a5e_100%)]" />
          {/* faint latitude bands (kept subtle so the moving clouds read as the spin) */}
          <div className="absolute inset-0 rounded-full opacity-30 bg-[repeating-linear-gradient(0deg,transparent_0_5%,rgba(24,12,64,0.15)_5%_6.2%,transparent_6.2%_11%)]" />
          {/* rotating cloud surface → the visible spin */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute inset-y-0 left-0 flex w-[200%] animate-planet-spin">
              <div className="h-full w-1/2" style={{ backgroundImage: PLANET_CLOUDS }} />
              <div className="h-full w-1/2" style={{ backgroundImage: PLANET_CLOUDS }} />
            </div>
          </div>
          {/* broad terminator shadow (fixed) */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_76%_82%,rgba(3,2,16,0.55),transparent_58%)]" />
          {/* specular highlight (fixed) */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_26%,rgba(255,255,255,0.55),transparent_40%)]" />
          {/* cyan rim light along the lower edge (fixed) */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_116%,rgba(34,211,238,0.45),transparent_40%)]" />
        </div>

        {/* near half of the ring — passes in front of the planet */}
        <SaturnRing half="front" />
      </div>

      {/* Floating chips */}
      {chips.length === 2 && (
        <>
          <div className="glass absolute -left-2 top-6 animate-float-slow rounded-xl px-3 py-2 text-xs font-medium text-white">
            {chips[0]}
          </div>
          <div
            className="glass absolute -right-1 bottom-10 animate-float rounded-xl px-3 py-2 text-xs font-medium text-white"
            style={{ animationDelay: "1.2s" }}
          >
            {chips[1]}
          </div>
        </>
      )}
    </div>
  );
}

type SatelliteProps = {
  pos: string;
  size: string;
  tone: string;
  /* injected by Orbit so each satellite can cancel the arm's rotation */
  spin?: string;
  armReverse?: boolean;
};

/* A circular orbit squashed vertically so it reads as a tilted ellipse, with a
   spinning arm that carries one or more satellites around it. The arm's spin
   class is handed to each satellite so it can counter-rotate. */
function Orbit({
  size,
  spin,
  reverse = false,
  children,
}: {
  size: string;
  spin: string;
  reverse?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{ width: size, height: size, transform: `translate(-50%, -50%) scaleY(${ORBIT_SQUASH})` }}
    >
      {/* orbit path */}
      <div className="absolute inset-0 rounded-full border border-white/[0.10]" />
      {/* spinning arm carrying the satellites */}
      <div className={`absolute inset-0 ${spin}`} style={reverse ? { animationDirection: "reverse" } : undefined}>
        {Children.map(children, (child) =>
          isValidElement<SatelliteProps>(child)
            ? cloneElement(child as ReactElement<SatelliteProps>, { spin, armReverse: reverse })
            : child
        )}
      </div>
    </div>
  );
}

/* A satellite on the orbit. The tilted orbit both squashes it (scaleY) and, via
   the spinning arm, rotates it — so a static counter-scale alone would smear it
   into an oval. We instead counter-rotate at the same rate (cancelling the arm)
   and then counter-squash, which keeps the dot perfectly round at every angle
   and glued to the ellipse. */
function Satellite({ pos, size, tone, spin = "", armReverse = false }: SatelliteProps) {
  return (
    <span className={`absolute ${pos} block`} style={{ transform: "translate(-50%, -50%)" }}>
      <span className={`block ${spin}`} style={{ animationDirection: armReverse ? "normal" : "reverse" }}>
        <span className={`block ${size} rounded-full ${tone}`} style={{ transform: `scaleY(${1 / ORBIT_SQUASH})` }} />
      </span>
    </span>
  );
}

/* Half of the planet's ring. The full ring is a squashed circle; clipping it to
   its top or bottom lets us paint the far half behind the planet and the near
   half in front, so the ring truly wraps around the sphere. */
function SaturnRing({ half }: { half: "back" | "front" }) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 h-[196%] w-[196%]"
      style={{
        transform: `translate(-50%, -50%) scaleY(${ORBIT_SQUASH})`,
        clipPath: half === "front" ? "inset(50% -40% -40% -40%)" : "inset(-40% -40% 50% -40%)",
      }}
    >
      <div className="absolute inset-0 rounded-full border-2 border-white/35 shadow-[0_0_22px_rgba(160,170,255,0.35)]" />
      <div className="absolute inset-[7%] rounded-full border border-white/10" />
    </div>
  );
}
