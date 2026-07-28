import CountUp from "./CountUp";
import Reveal from "./Reveal";
import { STATS } from "../data/stats";

/** Glass band of counting headline figures. */
export default function StatsBand() {
  return (
    <Reveal>
      <div className="glass grid grid-cols-1 gap-8 rounded-3xl px-8 py-12 sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-5xl font-bold tracking-tight sm:text-6xl">
              <span className="bg-gradient-to-b from-white to-violet-300 bg-clip-text text-transparent">
                <CountUp to={s.to} duration={2.2} />
                {s.suffix}
              </span>
            </div>
            <p className="mt-2 text-sm text-ink-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
