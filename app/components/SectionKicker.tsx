import ShinyText from "./ShinyText";

/** Small eyebrow label that sits above every section heading. */
export default function SectionKicker({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
      <span className="h-px w-6 bg-gradient-to-r from-transparent to-violet-400" />
      <ShinyText text={children} speed={4} color="#c4b5fd" shineColor="#ffffff" />
      <span className="h-px w-6 bg-gradient-to-l from-transparent to-violet-400" />
    </span>
  );
}
