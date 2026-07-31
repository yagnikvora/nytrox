import CountUp from "./CountUp";
import GradientText from "./GradientText";
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
              {/* the figure counts up, and the gradient keeps travelling after
                  it lands so the band never reads as static */}
              <GradientText animationSpeed={7}>
                <CountUp to={s.to} duration={2.2} />
                {s.suffix}
              </GradientText>
            </div>
            <p className="mt-2 text-sm text-ink-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
