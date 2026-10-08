import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "../Reveal";
import SectionKicker from "../SectionKicker";
import SpotlightCard from "../SpotlightCard";
import GlareHover from "../GlareHover";
import StarBorder from "../StarBorder";
import GradientText from "../GradientText";
import MaskedHeading from "../MaskedHeading";
import ScrollReveal from "../ScrollReveal";
import StatsBand from "../StatsBand";
import { EffortDonut, InputCurve } from "../ServiceCharts";
import { ENGAGEMENT_MODELS, INPUT_LEVELS, type Service } from "../../data/services";
import { ScrollSpine } from "./Interactive";
import {
  Arrow,
  Check,
  RelatedGrid,
  WorkGrid,
  accentStyle,
  type ServiceView,
} from "./shared";

/*
 * Design 7 - "Mission". The site already talks in launches and orbits, so
 * this page takes the idea all the way: the service is written up as a
 * mission brief in seven phases, hung off a single line down the left that
 * lights up as the page scrolls. Nothing is tucked behind a tab or a click -
 * every phase is laid out in full, in the order a client would ask about it.
 */

const PHASES = [
  { id: "briefing", name: "Briefing" },
  { id: "objectives", name: "Objectives" },
  { id: "payload", name: "Payload" },
  { id: "systems", name: "Systems" },
  { id: "flight-plan", name: "Flight plan" },
  { id: "crew", name: "Crew options" },
  { id: "mission-control", name: "Mission control" },
];

/** One phase on the spine: a node on the line, a phase label, then the content. */
function Phase({
  id,
  title,
  accent,
  intro,
  children,
}: {
  id: string;
  title: string;
  /** Words of `title` to set in the gradient. */
  accent: string;
  intro?: string;
  children: ReactNode;
}) {
  const index = PHASES.findIndex((p) => p.id === id);
  return (
    <section id={id} className="relative scroll-mt-28 pb-24 pl-12 last:pb-4 md:pl-24">
      {/* the node - sits on the spine, with an opaque centre so the line stops at it */}
      <span
        aria-hidden
        className="absolute left-[4px] top-0 grid h-6 w-6 place-items-center rounded-full border-2 border-[rgb(var(--accent))] bg-[#05050f] shadow-[0_0_18px_rgb(var(--accent)/0.7)] md:left-[16px]"
      >
        <span className="h-2 w-2 rounded-full bg-[rgb(var(--accent))]" />
      </span>

      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink-muted">
          Phase {String(index + 1).padStart(2, "0")}
          <span className="px-2 text-white/25">/</span>
          <span className="accent-more">{PHASES[index].name}</span>
        </p>
        <MaskedHeading
          text={title}
          accent={accent}
          className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl"
        />
        {intro && <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">{intro}</p>}
      </Reveal>
      <div className="mt-10">{children}</div>
    </section>
  );
}

export default function DesignMission({ service, view }: { service: Service; view: ServiceView }) {
  const { group, stages, facts, faqs, work, spotlight } = view;

  return (
    <div style={accentStyle(service.category)}>
      {/* Header - the brief's cover sheet */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-14">
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
            <span className="inline-flex items-center gap-2 text-white">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[rgb(var(--accent))] opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[rgb(var(--accent))]" />
              </span>
              Mission brief
            </span>
            <span className="text-white/25">/</span>
            <Link href={`/services#${group.id}`} className="transition-colors hover:text-white">
              {group.title}
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <MaskedHeading
                as="h1"
                text={service.title}
                accent={service.title.split(" ").at(-1)}
                stagger={60}
                className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-7xl"
              />
              <p className="mt-6 text-lg leading-8 text-ink-muted">{service.desc}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/contact"
                className="btn-gradient group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold transition-transform duration-300 ease-out hover:-translate-y-0.5"
              >
                Get Quote
                <Arrow className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <StarBorder as={Link} href="/services" color="#a78bfa" speed="5s" className="text-center text-sm font-semibold">
                <GradientText inline>All services</GradientText>
              </StarBorder>
            </div>
          </div>
        </Reveal>

        {/* Mission data + the phase list, which doubles as the page's contents */}
        <Reveal delay={140}>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-[1fr_1.4fr]">
            <dl className="grid grid-cols-2 gap-px bg-white/10">
              {facts.map((f) => (
                <div key={f.label} className="bg-[#05050f] px-5 py-5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">{f.label}</dt>
                  <dd className="mt-2 font-display text-base font-semibold text-white">{f.value}</dd>
                </div>
              ))}
            </dl>
            <nav aria-label="Phases" className="bg-[#05050f] px-5 py-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                Seven phases
              </p>
              <ol className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
                {PHASES.map((p, i) => (
                  <li key={p.id}>
                    <a
                      href={`#${p.id}`}
                      className="group flex items-baseline gap-3 py-1.5 text-sm text-ink transition-colors hover:text-white"
                    >
                      <span className="accent-more font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                      {p.name}
                      <Arrow size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </Reveal>
      </section>

      {/* The spine and its seven phases */}
      <div className="mx-auto max-w-7xl px-6 pb-8">
        <ScrollSpine>
          <Phase id="briefing" title="What the work involves" accent="involves">
            <ScrollReveal className="max-w-4xl font-display text-xl leading-9 text-ink sm:text-2xl sm:leading-10">
              {service.detail}
            </ScrollReveal>
            <Reveal delay={100}>
              <h3 className="mt-12 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
                Cleared for launch if
              </h3>
            </Reveal>
            <ul className="mt-5 grid gap-5 md:grid-cols-3">
              {service.fit.map((f, i) => (
                <Reveal as="li" key={f} delay={i * 80} className="h-full">
                  <div className="glass flex h-full gap-3.5 rounded-2xl p-5">
                    <span className="accent-icon mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full">
                      <Check size={12} />
                    </span>
                    <p className="text-sm leading-6 text-ink">{f}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Phase>

          <Phase
            id="objectives"
            title="What changes for you"
            accent="for you"
            intro="The deliverables are what we hand over. These are what they are meant to achieve once they are in use."
          >
            <div className="grid gap-5 md:grid-cols-3">
              {service.outcomes.map((o, i) => (
                <Reveal as="div" key={o.title} delay={i * 80} variant="blur" className="h-full">
                  <div data-accent={service.category} className="accent h-full">
                    <SpotlightCard className="accent-panel card-glow glass h-full" spotlightColor={spotlight}>
                      <GlareHover className="h-full rounded-2xl p-7">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
                          Objective {String(i + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-4 font-display text-xl font-semibold text-white">{o.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-ink-muted">{o.desc}</p>
                      </GlareHover>
                    </SpotlightCard>
                  </div>
                </Reveal>
              ))}
            </div>
          </Phase>

          <Phase id="payload" title="What you walk away with" accent="walk away with">
            <div className="grid gap-5 md:grid-cols-2">
              {service.deliverables.map((d, i) => (
                <Reveal as="div" key={d.title} delay={(i % 2) * 80} className="h-full">
                  <div data-accent={service.category} className="accent h-full">
                    <SpotlightCard className="accent-panel card-glow glass h-full" spotlightColor={spotlight}>
                      <GlareHover className="flex h-full gap-5 rounded-2xl p-7">
                        <span className="accent-icon grid h-12 w-12 shrink-0 place-items-center rounded-xl font-display text-sm font-bold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-display text-lg font-semibold text-white">{d.title}</h3>
                          <p className="mt-2 text-sm leading-7 text-ink-muted">{d.desc}</p>
                        </div>
                      </GlareHover>
                    </SpotlightCard>
                  </div>
                </Reveal>
              ))}
            </div>
          </Phase>

          <Phase
            id="systems"
            title="Everything this can cover"
            accent="can cover"
            intro="No project needs all of it. We agree the pieces yours calls for and leave the rest out of the proposal."
          >
            <Reveal>
              <div className="glass rounded-2xl p-6 sm:p-8">
                <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                  {service.scope.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="accent-icon mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full">
                        <Check size={11} />
                      </span>
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
                    Instruments on board
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {service.tools.map((t) => (
                      <li key={t} className="accent-chip rounded-full px-3.5 py-1.5 text-xs font-medium">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </Phase>

          <Phase id="flight-plan" title="Stage by stage, in the open" accent="in the open">
            <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {stages.map((s, i) => (
                <Reveal as="li" key={s.step} delay={i * 80} className="h-full">
                  <div className="glass flex h-full flex-col rounded-2xl p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
                      Stage {s.step}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-muted">{s.desc}</p>
                    {/* mt-auto pins the readout to the bottom so the four cards line up */}
                    <div className="mt-auto pt-5">
                    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-white/10">
                      <div className="bg-[#07071a] px-3 py-3">
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                          Share
                        </dt>
                        <dd className="mt-1 font-display text-lg font-bold text-white">{s.share}%</dd>
                      </div>
                      <div className="bg-[#07071a] px-3 py-3">
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                          Your input
                        </dt>
                        <dd className="mt-1 font-display text-lg font-bold text-white">
                          {INPUT_LEVELS[s.input]}
                        </dd>
                      </div>
                    </dl>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <Reveal variant="left" className="h-full">
                <div className="glass h-full rounded-2xl p-6 sm:p-8">
                  <h3 className="font-display text-lg font-semibold text-white">Where the effort goes</h3>
                  <div className="mt-8">
                    <EffortDonut stages={stages} />
                  </div>
                </div>
              </Reveal>
              <Reveal variant="right" delay={80} className="h-full">
                <div className="glass h-full rounded-2xl p-6 sm:p-8">
                  <h3 className="font-display text-lg font-semibold text-white">When we need you</h3>
                  <div className="mt-6">
                    <InputCurve stages={stages} />
                  </div>
                </div>
              </Reveal>
            </div>
            <p className="mt-5 text-xs leading-5 text-ink-muted">
              An indicative picture of a typical project, not a quote. The real
              balance is set once we know yours.
            </p>
          </Phase>

          <Phase id="crew" title="Set up around how you work" accent="how you work">
            <div className="grid gap-5 md:grid-cols-3">
              {ENGAGEMENT_MODELS.map((m, i) => (
                <Reveal as="div" key={m.title} delay={i * 80} className="h-full">
                  <div className="glass flex h-full flex-col rounded-2xl p-7">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
                      Configuration {String.fromCharCode(65 + i)}
                    </p>
                    <h3 className="mt-3 font-display text-lg font-semibold text-white">{m.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-muted">{m.desc}</p>
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
              ))}
            </div>
          </Phase>

          <Phase id="mission-control" title="Worth asking up front" accent="up front">
            <div className="max-w-3xl">
              {/* answers shown open, like every other phase - nothing to click */}
              <dl className="space-y-4">
                {faqs.map((f, i) => (
                  <Reveal as="div" key={f.q} delay={(i % 3) * 60}>
                    <div className="glass rounded-2xl p-6">
                      <dt className="font-display text-base font-semibold text-white">{f.q}</dt>
                      <dd className="mt-3 text-sm leading-7 text-ink-muted">{f.a}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
              <Reveal delay={120}>
                <p className="mt-8 text-sm text-ink-muted">
                  Something else on your mind?{" "}
                  <Link href="/contact" className="font-medium text-violet-300 transition-colors hover:text-white">
                    Ask us directly
                  </Link>
                  .
                </p>
              </Reveal>
            </div>
          </Phase>
        </ScrollSpine>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <StatsBand />
      </section>

      {/* Recent work */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionKicker>Previous launches</SectionKicker>
            <MaskedHeading
              text="Recent work, live now"
              accent="live now"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
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
        <div className="mt-10">
          <WorkGrid work={work} />
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <Reveal>
          <SectionKicker>Pairs well with</SectionKicker>
          <MaskedHeading
            text="Related services"
            accent="services"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          />
        </Reveal>
        <div className="mt-10">
          <RelatedGrid service={service} />
        </div>
      </section>
    </div>
  );
}
