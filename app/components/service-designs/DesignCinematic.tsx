import Link from "next/link";
import type { CSSProperties } from "react";
import Reveal from "../Reveal";
import SectionKicker from "../SectionKicker";
import StarBorder from "../StarBorder";
import GradientText from "../GradientText";
import MaskedHeading from "../MaskedHeading";
import ScrollReveal from "../ScrollReveal";
import OrbitVisual from "../OrbitVisual";
import Parallax from "../Parallax";
import StatsBand from "../StatsBand";
import { EffortDonut, InputCurve } from "../ServiceCharts";
import { ENGAGEMENT_MODELS, INPUT_LEVELS, type Service } from "../../data/services";
import { SnapCarousel } from "./Interactive";
import {
  Arrow,
  Check,
  FaqList,
  RelatedGrid,
  WorkGrid,
  accentStyle,
  type ServiceView,
} from "./shared";

/*
 * Design 4 - "Cinematic". Built around scale and movement: the orbit visual
 * beside a very large title, the overview as one big statement, outcomes as
 * oversized outlined numerals, deliverables on a sideways carousel, and the
 * process as cards that stack on top of one another as the page scrolls.
 */

/** Outlined numeral - the stroke carries the accent, the fill stays empty. */
const OUTLINE: CSSProperties = {
  WebkitTextStroke: "1.5px rgb(var(--accent) / 0.75)",
  color: "transparent",
};

/** Where the first process card pins, and how far each later one sits below it. */
const STACK_TOP_REM = 7;
const STACK_STEP_REM = 1.5;

export default function DesignCinematic({ service, view }: { service: Service; view: ServiceView }) {
  const { group, stages, faqs, work } = view;
  const [first, second] = service.deliverables;

  return (
    <div style={accentStyle(service.category)}>
      {/* Header - title on the left, the orbit on the right */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-12">
        <div className="grid items-center gap-10 lg:min-h-[72vh] lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <Link
              href={`/services#${group.id}`}
              className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-white"
            >
              <span className="h-px w-10 bg-[rgb(var(--accent))]" />
              {group.title}
            </Link>
            <MaskedHeading
              as="h1"
              text={service.title}
              accent={service.title.split(" ").at(-1)}
              stagger={70}
              className="mt-7 font-display text-5xl font-bold leading-[0.98] tracking-tight text-white sm:text-7xl xl:text-8xl"
            />
            <p className="mt-8 max-w-xl text-lg leading-8 text-ink-muted">{service.desc}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="btn-gradient group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold transition-transform duration-300 ease-out hover:-translate-y-0.5"
              >
                Get Quote
                <Arrow className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <StarBorder as={Link} href="/services" color="#a78bfa" speed="5s" className="text-sm font-semibold">
                <GradientText inline>All services</GradientText>
              </StarBorder>
            </div>
          </Reveal>

          <Reveal delay={160} variant="scale">
            <Parallax speed={30}>
              <OrbitVisual chips={[first.title, second.title]} />
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* The overview, as one statement */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <Reveal>
          <SectionKicker>Overview</SectionKicker>
        </Reveal>
        <ScrollReveal className="mt-8 font-display text-2xl font-medium leading-[1.45] text-white sm:text-4xl sm:leading-[1.4]">
          {service.detail}
        </ScrollReveal>
      </section>

      {/* Right for you if - three plain columns under a rule */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
            Right for you if
          </h2>
        </Reveal>
        <ul className="mt-6 grid border-t border-white/10 md:grid-cols-3">
          {service.fit.map((f, i) => (
            <Reveal as="li" key={f} delay={i * 90} className="h-full">
              <div className="h-full border-b border-white/10 py-7 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                <span className="accent-more font-display text-sm font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-base leading-7 text-ink">{f}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Outcomes - alternating sides, each behind an outlined numeral */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <SectionKicker>Why it matters</SectionKicker>
          <MaskedHeading
            text="What changes for you"
            accent="for you"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          />
        </Reveal>
        <ol className="mt-12">
          {service.outcomes.map((o, i) => {
            const flipped = i % 2 === 1;
            return (
              <Reveal as="li" key={o.title} variant={flipped ? "right" : "left"}>
                <div
                  className={`flex flex-col gap-4 border-t border-white/10 py-12 md:items-center md:gap-14 ${
                    flipped ? "md:flex-row-reverse md:text-right" : "md:flex-row"
                  }`}
                >
                  <span
                    aria-hidden
                    className="font-display text-[7rem] font-bold leading-none sm:text-[11rem]"
                    style={OUTLINE}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="max-w-xl">
                    <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">{o.title}</h3>
                    <p className="mt-4 text-base leading-8 text-ink-muted">{o.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </section>

      {/* Deliverables - sideways carousel */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <SectionKicker>What’s included</SectionKicker>
          <MaskedHeading
            text="What you walk away with"
            accent="walk away with"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          />
        </Reveal>
        <Reveal className="mt-12">
          <SnapCarousel label="Deliverables">
            {service.deliverables.map((d, i) => (
              <article
                key={d.title}
                data-accent={service.category}
                className="accent accent-panel glass relative flex min-h-[320px] w-[84vw] shrink-0 snap-start flex-col overflow-hidden rounded-3xl p-8 sm:w-[440px]"
              >
                <span aria-hidden className="font-display text-7xl font-bold leading-none" style={OUTLINE}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-auto pt-10 font-display text-2xl font-bold text-white">{d.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-muted">{d.desc}</p>
              </article>
            ))}
          </SnapCarousel>
        </Reveal>
      </section>

      {/* Process - each card pins a little lower than the last, so they stack */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Reveal className="text-center">
          <SectionKicker>How it runs</SectionKicker>
          <MaskedHeading
            text="Stage by stage, in the open"
            accent="in the open"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          />
        </Reveal>
        <ol className="mt-14">
          {stages.map((s, i) => (
            <li
              key={s.step}
              className="sticky pb-6"
              style={{ top: `${STACK_TOP_REM + i * STACK_STEP_REM}rem` }}
            >
              {/* opaque, so the card underneath doesn't show through the glass */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a1c] p-7 shadow-[0_-18px_50px_-20px_rgba(0,0,0,0.9)] sm:p-10">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgb(var(--accent) / 0.9), transparent)" }}
                />
                <div className="grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center">
                  <span className="font-display text-6xl font-bold leading-none sm:text-7xl" style={OUTLINE}>
                    {s.step}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">{s.title}</h3>
                    <p className="mt-3 max-w-xl text-base leading-7 text-ink-muted">{s.desc}</p>
                  </div>
                  <dl className="flex gap-8 md:flex-col md:gap-4 md:text-right">
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                        Share of work
                      </dt>
                      <dd className="mt-1 font-display text-2xl font-bold text-white">{s.share}%</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                        Your input
                      </dt>
                      <dd className="mt-1 font-display text-2xl font-bold text-white">
                        {INPUT_LEVELS[s.input]}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* The two charts, side by side in one wide panel */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="accent-panel glass relative overflow-hidden rounded-3xl p-7 sm:p-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h3 className="font-display text-xl font-semibold text-white">Where the effort goes</h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  How the work divides across the four stages.
                </p>
                <div className="mt-8">
                  <EffortDonut stages={stages} />
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-white">When we need you</h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  How much of your time each stage asks for.
                </p>
                <div className="mt-6">
                  <InputCurve stages={stages} />
                </div>
              </div>
            </div>
            <p className="mt-8 border-t border-white/10 pt-5 text-xs text-ink-muted">
              An indicative picture of a typical project, not a quote. The real
              balance is set once we know yours.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Scope - heading pinned on the left, the list running down the right */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionKicker>Full scope</SectionKicker>
              <MaskedHeading
                text="Everything this can cover"
                accent="can cover"
                className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
              />
              <p className="mt-5 text-base leading-7 text-ink-muted">
                No project needs all of it. We agree the pieces yours calls for
                and leave the rest out of the proposal.
              </p>
              <h3 className="mt-9 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
                Tools we work in
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {service.tools.map((t) => (
                  <li key={t} className="accent-chip rounded-full px-3 py-1.5 text-xs font-medium">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <ul className="grid sm:grid-cols-2 sm:gap-x-10">
            {service.scope.map((item, i) => (
              <Reveal as="li" key={item} delay={(i % 2) * 60}>
                <div className="group flex items-center gap-4 border-b border-white/10 py-5 transition-colors hover:border-[rgb(var(--accent)/0.6)]">
                  <span className="w-6 text-xs tabular-nums text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-medium text-ink transition-colors group-hover:text-white">
                    {item}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Ways to work - a table rather than cards */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <SectionKicker>Ways to work</SectionKicker>
          <MaskedHeading
            text="Set up around how you work"
            accent="how you work"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          />
        </Reveal>
        <div className="mt-12 border-t border-white/10">
          {ENGAGEMENT_MODELS.map((m, i) => (
            <Reveal as="div" key={m.title} delay={i * 80}>
              <div className="group grid gap-5 border-b border-white/10 py-9 transition-colors hover:bg-white/[0.02] md:grid-cols-[1fr_1.3fr_1.2fr] md:gap-10 md:px-4">
                <h3 className="font-display text-2xl font-bold text-white">{m.title}</h3>
                <p className="text-base leading-7 text-ink-muted">{m.desc}</p>
                <ul className="space-y-2.5">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm leading-6 text-ink">
                      <span className="accent-more mt-1.5 shrink-0">
                        <Check size={11} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <StatsBand />
      </section>

      {/* Recent work */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionKicker>From the studio</SectionKicker>
            <MaskedHeading
              text="Recent work, live now"
              accent="live now"
              className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
            />
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-violet-300 transition-colors hover:text-white"
          >
            See all projects
            <Arrow size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
        <div className="mt-12">
          <WorkGrid work={work} />
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <Reveal className="text-center">
          <SectionKicker>Good questions</SectionKicker>
          <MaskedHeading
            text="Worth asking up front"
            accent="up front"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          />
        </Reveal>
        <div className="mt-12">
          <FaqList faqs={faqs} />
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <SectionKicker>Pairs well with</SectionKicker>
          <MaskedHeading
            text="Related services"
            accent="services"
            className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          />
        </Reveal>
        <div className="mt-12">
          <RelatedGrid service={service} />
        </div>
      </section>
    </div>
  );
}
