"use client";

import { useEffect, useRef, useState } from "react";
import { INPUT_LEVELS } from "../data/services";

/*
 * The two charts on a service detail page. Both animate in once, the first
 * time they scroll into view, and both write their values out beside the
 * drawing, so nothing has to be read off a shape or a hover alone.
 */

export type ChartStage = {
  step: string;
  title: string;
  /** Share of the work, as a percentage. */
  share: number;
  /** Index into INPUT_LEVELS. */
  input: 1 | 2 | 3;
  /** This stage's step of the category ramp (see CATEGORY_RAMP). */
  color: string;
};

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/** True once the element has entered the viewport - or at once, under reduced motion. */
function useShown<T extends Element>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // in a frame callback rather than synchronously in the effect body
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, shown };
}

// Donut geometry, in viewBox units.
const DONUT = 200;
const RADIUS = 80;
const STROKE = 16;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
/** Surface gap between neighbouring segments. */
const GAP = 3;

/**
 * Donut of how the work divides across the process stages. The largest stage
 * is named in the middle; the legend beside it carries every stage and share.
 */
export function EffortDonut({ stages }: { stages: ChartStage[] }) {
  const { ref, shown } = useShown<HTMLDivElement>();
  const largest = stages.reduce((a, b) => (b.share > a.share ? b : a));
  // each segment starts where the ones before it end
  const starts = stages.map((_, i) =>
    stages.slice(0, i).reduce((sum, s) => sum + s.share, 0)
  );

  return (
    <div ref={ref} className="flex flex-col items-center gap-8 sm:flex-row sm:gap-10">
      <div className="relative w-[200px] shrink-0">
        <svg viewBox={`0 0 ${DONUT} ${DONUT}`} className="block w-full -rotate-90" aria-hidden>
          <circle
            cx={DONUT / 2}
            cy={DONUT / 2}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={STROKE}
          />
          {stages.map((s, i) => {
            const length = Math.max((s.share / 100) * CIRCUMFERENCE - GAP, 0);
            return (
              <circle
                key={s.step}
                cx={DONUT / 2}
                cy={DONUT / 2}
                r={RADIUS}
                fill="none"
                stroke={s.color}
                strokeWidth={STROKE}
                strokeDasharray={`${shown ? length : 0} ${CIRCUMFERENCE}`}
                strokeDashoffset={-(starts[i] / 100) * CIRCUMFERENCE}
                className="motion-reduce:transition-none"
                style={{ transition: `stroke-dasharray 1000ms ${EASE} ${i * 140}ms` }}
              >
                <title>{`${s.title}: ${s.share}%`}</title>
              </circle>
            );
          })}
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <div className="font-display text-4xl font-bold text-white">{largest.share}%</div>
            <div className="mt-1 text-xs text-ink-muted">{largest.title}</div>
          </div>
        </div>
      </div>

      <ol className="w-full flex-1 divide-y divide-white/[0.07]">
        {stages.map((s) => (
          <li key={s.step} className="flex items-center gap-3 py-3 text-sm">
            <span className="h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ background: s.color }} />
            <span className="text-ink-muted">{s.step}</span>
            <span className="font-medium text-ink">{s.title}</span>
            <span className="ml-auto font-semibold tabular-nums text-white">{s.share}%</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// Curve geometry, in viewBox units.
const CW = 400;
const CH = 220;
const PLOT_LEFT = 92;
const PLOT_RIGHT = 384;
const BASELINE = 186;
/** y for each input level; index 0 is unused, matching INPUT_LEVELS. */
const LEVEL_Y = [0, 160, 96, 32];

/**
 * How much of the client's time each stage asks for, drawn as one curve from
 * the first stage to the last. The axis is Light / Moderate / High rather than
 * a number, and the list underneath says the same thing in words.
 */
export function InputCurve({ stages }: { stages: ChartStage[] }) {
  const { ref, shown } = useShown<HTMLDivElement>();
  const gap = (PLOT_RIGHT - PLOT_LEFT - 32) / Math.max(stages.length - 1, 1);
  const points = stages.map((s, i) => [PLOT_LEFT + 16 + i * gap, LEVEL_Y[s.input]] as const);

  // Each span eases out of one point and into the next with level tangents, so
  // the curve never overshoots a stage's value.
  const line = points
    .map(([x, y], i) => {
      if (i === 0) return `M${x},${y}`;
      const [px, py] = points[i - 1];
      const mid = (px + x) / 2;
      return `C${mid},${py} ${mid},${y} ${x},${y}`;
    })
    .join(" ");
  const area = `${line} L${points[points.length - 1][0]},${BASELINE} L${points[0][0]},${BASELINE} Z`;

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${CW} ${CH}`} className="mx-auto block w-full max-w-[480px]" aria-hidden>
        {[3, 2, 1].map((level) => (
          <g key={level}>
            <line
              x1={PLOT_LEFT}
              x2={PLOT_RIGHT}
              y1={LEVEL_Y[level]}
              y2={LEVEL_Y[level]}
              stroke="rgba(255,255,255,0.09)"
              strokeWidth="1"
            />
            <text
              x={PLOT_LEFT - 14}
              y={LEVEL_Y[level]}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-ink-muted text-[13px]"
            >
              {INPUT_LEVELS[level]}
            </text>
          </g>
        ))}

        <path
          d={area}
          className="motion-reduce:transition-none"
          style={{
            fill: "rgb(var(--accent) / 0.12)",
            opacity: shown ? 1 : 0,
            transition: "opacity 900ms ease 500ms",
          }}
        />
        <path
          d={line}
          pathLength={1}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1"
          strokeDashoffset={shown ? 0 : 1}
          className="motion-reduce:transition-none"
          style={{ stroke: "rgb(var(--accent))", transition: `stroke-dashoffset 1400ms ${EASE}` }}
        />

        {stages.map((s, i) => {
          const [x, y] = points[i];
          return (
            <g key={s.step}>
              {/* ringed in the surface colour so the marker stays legible on the line */}
              <circle
                cx={x}
                cy={y}
                r="5"
                stroke="#07071a"
                strokeWidth="2"
                className="motion-reduce:transition-none"
                style={{
                  fill: "rgb(var(--accent))",
                  opacity: shown ? 1 : 0,
                  transition: `opacity 400ms ease ${300 + i * 260}ms`,
                }}
              >
                <title>{`${s.title}: ${INPUT_LEVELS[s.input]}`}</title>
              </circle>
              <text x={x} y={CH - 8} textAnchor="middle" className="fill-ink-muted text-[13px]">
                {s.step}
              </text>
            </g>
          );
        })}
      </svg>

      {/* the curve in words - which stage each number is, and what it asks for */}
      <ol className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
        {stages.map((s) => (
          <li key={s.step} className="flex items-baseline gap-2">
            <span className="text-ink-muted">{s.step}</span>
            <span className="font-medium text-ink">{s.title}</span>
            <span className="ml-auto text-xs text-ink-muted">{INPUT_LEVELS[s.input]}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
