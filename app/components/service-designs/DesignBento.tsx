import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "../Reveal";
import SectionKicker from "../SectionKicker";
import StarBorder from "../StarBorder";
import GradientText from "../GradientText";
import MaskedHeading from "../MaskedHeading";
import ScrollReveal from "../ScrollReveal";
import TiltedCard from "../TiltedCard";
import CountUp from "../CountUp";
import { EffortDonut, InputCurve } from "../ServiceCharts";
import { ENGAGEMENT_MODELS, type Service } from "../../data/services";
import { STATS } from "../../data/stats";
import { DeliverableExplorer, ProcessStepper } from "./Interactive";
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
 * Design 3 - "Bento". The showiest of the three: a glowing centred header, a
 * moving strip of everything the service covers, then the facts and charts
 * packed into one mosaic of tiles. Deliverables and process are things you
 * click through rather than scroll past.
 */

/** One tile of the mosaic. `className` carries its span in the grid. */
function Tile({
  className = "",
  label,
  children,
  delay = 0,
}: {
  className?: string;
  label?: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal as="div" delay={delay} variant="scale" className={className}>
      <div className="accent-panel glass relative h-full overflow-hidden rounded-3xl p-6 sm:p-7">
        {label && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">{label}</p>
        )}
        {children}
      </div>
    </Reveal>
  );
}

function SectionHeading({ kicker, text, accent }: { kicker: string; text: string; accent: string }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <SectionKicker>{kicker}</SectionKicker>
      <MaskedHeading
        text={text}
        accent={accent}
        className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
      />
    </Reveal>
  );
}

export default function DesignBento({ service, view }: { service: Service; view: ServiceView }) {
  const { group, stages, facts, faqs, work } = view;
  // two copies, so the strip can travel half its width and loop without a seam
  const strip = [...service.scope, ...service.scope];

  return (
    <div style={accentStyle(service.category)}>
      {/* Header - centred, with the category colour glowing behind the title */}
      <section className="relative mx-auto max-w-7xl px-6 pb-12 pt-16 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[min(820px,92vw)] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgb(var(--accent) / 0.28), transparent)" }}
        />
        <Reveal className="relative mx-auto max-w-4xl">
          <Link
            href={`/services#${group.id}`}
            className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-xs font-medium text-ink transition-colors hover:text-white"
          >
            <span className="accent-icon grid h-7 w-7 place-items-center rounded-full">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                {service.icon}
              </svg>
            </span>
            {group.title}
          </Link>

          <MaskedHeading
            as="h1"
            text={service.title}
            accent={service.title.split(" ").at(-1)}
            stagger={60}
            className="mt-7 font-display text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-8xl"
          />
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-ink-muted sm:text-lg">
            {service.desc}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="btn-gradient group inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold transition-transform duration-300 ease-out hover:-translate-y-0.5 sm:w-auto"
            >
              Get Quote
              <Arrow className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <StarBorder as={Link} href="/services" color="#a78bfa" speed="5s" className="text-sm font-semibold">
              <GradientText inline>All services</GradientText>
            </StarBorder>
          </div>
        </Reveal>
      </section>

      {/* Everything it covers, drifting past */}
      <section aria-label="What this service covers" className="pb-14">
        <div
          className="marquee-viewport group overflow-hidden py-2"
          style={{
            maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          }}
        >
          <ul
            className="animate-marquee flex w-max group-hover:[animation-play-state:paused]"
            style={{ animationDuration: "48s" }}
          >
            {strip.map((item, i) => (
              <li
                key={`${item}-${i}`}
                aria-hidden={i >= service.scope.length}
                // padding rather than gap, so two copies are exactly twice one
                className="shrink-0 pr-3"
              >
                <span className="accent-chip flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))]" />
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The mosaic */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="grid gap-5 lg:grid-cols-12">
          <Tile className="lg:col-span-7" label="Overview">
            <ScrollReveal className="mt-4 font-display text-xl leading-9 text-ink sm:text-2xl sm:leading-10">
              {service.detail}
            </ScrollReveal>
          </Tile>

          <Tile className="lg:col-span-5" label="Right for you if" delay={80}>
            <ul className="mt-5 space-y-4">
              {service.fit.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="accent-icon mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full">
                    <Check size={12} />
                  </span>
                  <span className="text-sm leading-6 text-ink">{f}</span>
                </li>
              ))}
            </ul>
          </Tile>

          <Tile className="lg:col-span-5" label="Where the effort goes">
            <div className="mt-6">
              <EffortDonut stages={stages} />
            </div>
          </Tile>

          <Tile className="lg:col-span-4" label="When we need you" delay={80}>
            <div className="mt-4">
              <InputCurve stages={stages} />
            </div>
          </Tile>

          <Tile className="lg:col-span-3" label="At a glance" delay={160}>
            <dl className="mt-3 divide-y divide-white/[0.07]">
              {facts.map((f) => (
                <div key={f.label} className="py-3">
                  <dt className="text-xs text-ink-muted">{f.label}</dt>
                  <dd className="mt-1 font-display text-base font-semibold text-white">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Tile>

          <Tile className="lg:col-span-8" label="Tools we work in">
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {service.tools.map((t) => (
                <li key={t} className="accent-chip rounded-full px-4 py-2 text-sm font-medium">
                  {t}
                </li>
              ))}
            </ul>
          </Tile>

          {/* the studio's numbers, stacked to fit the narrow tile */}
          <Tile className="lg:col-span-4" label="The studio" delay={80}>
            <dl className="mt-4 grid grid-cols-3 gap-3">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-3xl font-bold text-white">
                    <CountUp to={s.to} duration={2} />
                    {s.suffix}
                  </dd>
                  <dt className="mt-1 text-xs leading-4 text-ink-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
          </Tile>
        </div>
        <Reveal delay={120}>
          <p className="mt-5 text-center text-xs text-ink-muted">
            The effort and involvement charts are an indicative picture of a typical
            project, not a quote.
          </p>
        </Reveal>
      </section>

      {/* Outcomes - three cards that tilt toward the pointer */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading kicker="Why it matters" text="What changes for you" accent="for you" />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {service.outcomes.map((o, i) => (
            <Reveal as="div" key={o.title} delay={i * 90} variant="blur" className="h-full">
              <TiltedCard max={7} className="h-full">
                <div
                  data-accent={service.category}
                  className="accent accent-panel glass relative h-full overflow-hidden rounded-3xl p-8"
                >
                  <span className="text-gradient font-display text-6xl font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-white">{o.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-muted">{o.desc}</p>
                </div>
              </TiltedCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Deliverables - pick one on the left, read it on the right */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading kicker="What’s included" text="What you walk away with" accent="walk away with" />
        <Reveal className="mt-14">
          <DeliverableExplorer items={service.deliverables} />
        </Reveal>
      </section>

      {/* Process - a stepper */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading kicker="How it runs" text="Stage by stage, in the open" accent="in the open" />
        <Reveal className="mt-14">
          <ProcessStepper stages={stages} />
        </Reveal>
      </section>

      {/* Ways to work - the middle option lifted, the way a pricing table lifts one plan */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading kicker="Ways to work" text="Set up around how you work" accent="how you work" />
        <div className="mt-14 grid items-stretch gap-5 md:grid-cols-3">
          {ENGAGEMENT_MODELS.map((m, i) => {
            const featured = i === 1;
            return (
              <Reveal as="div" key={m.title} delay={i * 80} className="h-full">
                <div
                  className={`relative flex h-full flex-col rounded-3xl p-7 ${
                    featured
                      ? "border border-[rgb(var(--accent)/0.45)] bg-[rgb(var(--accent)/0.07)] md:-my-3 md:py-10"
                      : "glass"
                  }`}
                >
                  {featured && (
                    <span className="accent-chip absolute -top-3 left-7 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
                      For ongoing work
                    </span>
                  )}
                  <h3 className="font-display text-xl font-semibold text-white">{m.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-muted">{m.desc}</p>
                  <ul className="mt-auto space-y-3 border-t border-white/10 pt-6">
                    {m.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <span className="accent-icon mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full">
                          <Check size={11} />
                        </span>
                        <span className="text-sm leading-6 text-ink">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Recent work */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading kicker="From the studio" text="Recent work, live now" accent="live now" />
        <div className="mt-14">
          <WorkGrid work={work} />
        </div>
        <Reveal delay={120} className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-violet-300 transition-colors hover:text-white"
          >
            See all projects
            <Arrow size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </section>

      {/* FAQ - heading pinned on the left while the answers scroll */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionKicker>Good questions</SectionKicker>
              <MaskedHeading
                text="Worth asking up front"
                accent="up front"
                className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
              />
              <p className="mt-5 text-sm leading-7 text-ink-muted">
                Something else on your mind?{" "}
                <Link href="/contact" className="font-medium text-violet-300 transition-colors hover:text-white">
                  Ask us directly
                </Link>
                .
              </p>
            </Reveal>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading kicker="Pairs well with" text="Related services" accent="services" />
        <div className="mt-14">
          <RelatedGrid service={service} />
        </div>
      </section>
    </div>
  );
}
