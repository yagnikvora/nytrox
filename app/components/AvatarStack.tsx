// Avatar cluster for the hero's social-proof row.
//
// These faces are drawn, not photographed. The line beside them makes a claim
// about how many teams Nytrox works with, and pairing that claim with photos of
// real, identifiable people would imply endorsements that don't exist. Stylised
// portraits read as "people" at 32px without standing in for anyone in
// particular — swap `PEOPLE` for real client photos once there are some to use.
//
// Each portrait gets its own hairstyle and shoulder width: four identical
// silhouettes in four colours is what makes a placeholder row look fake, and
// the silhouette is the only part still legible once these are 32px wide.

type HairStyle = "crop" | "long" | "bun" | "buzz";

type Person = {
  /** background gradient, top-left → bottom-right */
  bg: [string, string];
  skin: string;
  hair: string;
  hairStyle: HairStyle;
  /** collar / shoulders */
  top: string;
  /** shoulder half-width — small changes read as different builds */
  shoulders: number;
};

const PEOPLE: Person[] = [
  { bg: ["#a78bfa", "#4338ca"], skin: "#f0c6a0", hair: "#2b2136", hairStyle: "long", top: "#241f4d", shoulders: 14.5 },
  { bg: ["#67e8f9", "#1d4ed8"], skin: "#8d5524", hair: "#17100d", hairStyle: "buzz", top: "#0b3f66", shoulders: 16 },
  { bg: ["#f472b6", "#6d28d9"], skin: "#e0a074", hair: "#4a2c2a", hairStyle: "bun", top: "#3b0764", shoulders: 14 },
  { bg: ["#818cf8", "#0891b2"], skin: "#c68642", hair: "#221913", hairStyle: "crop", top: "#0e5f73", shoulders: 15.5 },
];

/* Head sits at cx=20 cy=17 r=7.2, so it spans y 9.8 → 24.2 in a 40×40 box. */
const HAIR: Record<HairStyle, string> = {
  // tight band following the crown
  buzz: "M12.9 15.4c0.2-3.6 3.3-6.4 7.1-6.4s6.9 2.8 7.1 6.4c-1.3-1.6-3.9-2.5-7.1-2.5s-5.8 0.9-7.1 2.5z",
  // fuller crop with a little height
  crop: "M12.8 16.6c0-4 3.2-7.2 7.2-7.2s7.2 3.2 7.2 7.2c-1.4-2.1-4-3.3-7.2-3.3s-5.8 1.2-7.2 3.3z",
  // falls past the jaw on both sides, framing the face
  long: "M12.4 22.5c-1.2-3.6-1.2-6.6-0.1-9C13.9 10.2 16.6 8.6 20 8.6s6.1 1.6 7.7 4.9c1.1 2.4 1.1 5.4-0.1 9-0.2-4.2-0.8-6.9-1.7-8.2-1.8 1.7-3.8 2.3-5.9 2.3s-4.1-0.6-5.9-2.3c-0.9 1.3-1.5 4-1.7 8.2z",
  // crop plus a knot on top, added separately below
  bun: "M12.8 16.6c0-4 3.2-7.2 7.2-7.2s7.2 3.2 7.2 7.2c-1.4-2.1-4-3.3-7.2-3.3s-5.8 1.2-7.2 3.3z",
};

function Portrait({ person, id }: { person: Person; id: number }) {
  const gradientId = `avatar-bg-${id}`;
  const clipId = `avatar-clip-${id}`;

  return (
    <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={person.bg[0]} />
          <stop offset="100%" stopColor={person.bg[1]} />
        </linearGradient>
        <clipPath id={clipId}>
          <circle cx="20" cy="20" r="20" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <rect width="40" height="40" fill={`url(#${gradientId})`} />
        {/* neck first, so the collar overlaps it the way a shirt would */}
        <rect x="16.8" y="20" width="6.4" height="10" rx="3.2" fill={person.skin} />
        <ellipse cx="20" cy="45" rx={person.shoulders} ry="15" fill={person.top} />
        <circle cx="20" cy="17" r="7.2" fill={person.skin} />
        {person.hairStyle === "bun" && <circle cx="20" cy="8.1" r="2.7" fill={person.hair} />}
        <path d={HAIR[person.hairStyle]} fill={person.hair} />
      </g>
    </svg>
  );
}

export default function AvatarStack({ overflow = "+46" }: { overflow?: string }) {
  return (
    <div className="group flex -space-x-2">
      {PEOPLE.map((person, i) => (
        <span
          key={i}
          className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-bg transition-transform duration-300 ease-out hover:z-10 hover:-translate-y-0.5"
        >
          <Portrait person={person} id={i} />
        </span>
      ))}
      <span className="relative grid h-8 w-8 place-items-center rounded-full bg-white/[0.07] text-[10px] font-semibold text-ink-muted ring-2 ring-bg backdrop-blur-sm transition-colors duration-300 group-hover:text-white">
        {overflow}
      </span>
    </div>
  );
}
