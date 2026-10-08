import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "../Reveal";
import SectionKicker from "../SectionKicker";
import SpotlightCard from "../SpotlightCard";
import GlareHover from "../GlareHover";
import StarBorder from "../StarBorder";
import GradientText from "../GradientText";
import MaskedHeading from "../MaskedHeading";
import TiltedCard from "../TiltedCard";
import StatsBand from "../StatsBand";
import { ENGAGEMENT_MODELS, INPUT_LEVELS, type Service } from "../../data/services";
import { ScrollSpyNav, Tabs } from "./Interactive";
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
 * Design 2 - "Editorial". Reads like a long-form article: a left-aligned
 * header with the facts on a card beside it, then numbered chapters down a
 * single column, with a contents rail that follows the scroll. Fewer boxes
 * than the classic page - rows and hairlines carry most of the structure.
 */

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "outcomes", label: "Why it matters" },
  { id: "included", label: "What’s included" },
  { id: "scope", label: "Scope & tools" },
  { id: "process", label: "How it runs" },
  { id: "engagement", label: "Ways to work" },
  { id: "faq", label: "Questions" },
];

/** A numbered chapter: the number and title on one line, a hairline under them. */
function Chapter({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  const number = String(SECTIONS.findIndex((s) => s.id === id) + 1).padStart(2, "0");
  return (
    <section id={id} className="scroll-mt-28 py-14 first:pt-0">
      <Reveal>
        <div className="flex items-baseline gap-5 border-b border-white/10 pb-5">
          <span className="accent-more font-display text-sm font-bold tabular-nums">{number}</span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
        </div>
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function DesignEditorial({ service, view }: { service: Service; view: ServiceView }) {
  const { group, stages, facts, faqs, work, spotlight } = view;
  const longest = Math.max(...stages.map((s) => s.share));

  return (
    <div style={accentStyle(service.category)}>
      {/* Header - copy on the left, the facts on a tilting card on the right */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-14">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-ink-muted">
                <li>
                  <Link href="/services" className="transition-colors hover:text-white">
                    Services
                  </Link>
                </li>
                <li aria-hidden className="text-white/30">/</li>
                <li>
                  <Link href={`/services#${group.id}`} className="transition-colors hover:text-white">
                    {group.title}
                  </Link>
                </li>
              </ol>
            </nav>

            <MaskedHeading
              as="h1"
              text={service.title}
              accent={service.title.split(" ").at(-1)}
              stagger={60}
              className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
            />
            <p className="mt-7 max-w-xl text-lg leading-8 text-ink-muted">{service.desc}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="btn-gradient group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-transform duration-300 ease-out hover:-translate-y-0.5"
              >
                Get Quote
                <Arrow className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <StarBorder as={Link} href="/services" color="#a78bfa" speed="5s" className="text-sm font-semibold">
                <GradientText inline>All services</GradientText>
              </StarBorder>
            </div>
          </Reveal>

          <Reveal delay={140} variant="right">
            <TiltedCard max={5}>
              <div
                data-accent={service.category}
                className="accent accent-panel glass relative overflow-hidden rounded-3xl p-7 sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <div className="accent-icon grid h-14 w-14 place-items-center rounded-2xl">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                      {service.icon}
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                      At a glance
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold text-white">{service.title}</p>
                  </div>
                </div>

                <dl className="mt-7 divide-y divide-white/[0.07]">
                  {facts.map((f) => (
                    <div key={f.label} className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-sm text-ink-muted">{f.label}</dt>
                      <dd className="text-right text-sm font-semibold text-white">{f.value}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {service.deliverables.map((d) => (
                    <li key={d.title} className="accent-chip rounded-full px-3 py-1.5 text-xs font-medium">
                      {d.title}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltedCard>
          </Reveal>
        </div>
      </section>

      {/* Body - contents rail on the left, chapters on the right */}
      <div className="mx-auto max-w-7xl px-6 pb-8">
        <div className="grid gap-12 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <ScrollSpyNav sections={SECTIONS} />
              <Link
                href="/contact"
                className="accent-more group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold"
              >
                Start a project
                <Arrow size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </aside>

          <div className="min-w-0">
            <Chapter id="overview" title="What the work involves">
              <Reveal>
                {/* the opening paragraph set large, the way an article's standfirst is */}
                <p className="font-display text-xl leading-9 text-ink sm:text-2xl sm:leading-10">
                  {service.detail}
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h3 className="mt-12 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                  Right for you if
                </h3>
              </Reveal>
              <ul className="mt-5 grid gap-4 md:grid-cols-3">
                {service.fit.map((f, i) => (
                  <Reveal as="li" key={f} delay={i * 80} className="h-full">
                    <div className="glass h-full rounded-2xl p-5">
                      <span className="accent-icon grid h-7 w-7 place-items-center rounded-full">
                        <Check size={13} />
                      </span>
                      <p className="mt-4 text-sm leading-6 text-ink">{f}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </Chapter>

            <Chapter id="outcomes" title="What changes for you">
              <ol>
                {service.outcomes.map((o, i) => (
                  <Reveal as="li" key={o.title} delay={i * 80}>
                    <div className="group grid gap-3 border-b border-white/[0.07] py-7 transition-colors hover:border-[rgb(var(--accent)/0.5)] sm:grid-cols-[5rem_1fr_1.4fr] sm:gap-8">
                      <span className="font-display text-4xl font-bold text-white/15 transition-colors duration-300 group-hover:text-[rgb(var(--accent))]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-white">{o.title}</h3>
                      <p className="text-sm leading-7 text-ink-muted">{o.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </Chapter>

            <Chapter id="included" title="What you walk away with">
              <div className="grid gap-5 md:grid-cols-2">
                {service.deliverables.map((d, i) => (
                  <Reveal as="div" key={d.title} delay={(i % 2) * 80} className="h-full">
                    <div data-accent={service.category} className="accent h-full">
                      <SpotlightCard className="accent-panel card-glow glass h-full" spotlightColor={spotlight}>
                        <GlareHover className="h-full rounded-2xl p-7">
                          <span className="accent-more font-display text-sm font-bold">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="mt-3 font-display text-lg font-semibold text-white">{d.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-ink-muted">{d.desc}</p>
                        </GlareHover>
                      </SpotlightCard>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Chapter>

            <Chapter id="scope" title="Everything this can cover">
              <Reveal>
                <Tabs
                  tabs={[
                    {
                      label: "Scope",
                      content: (
                        <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
                          {service.scope.map((item) => (
                            <li key={item} className="flex items-start gap-3 border-b border-white/[0.06] pb-4">
                              <span className="accent-icon mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full">
                                <Check size={11} />
                              </span>
                              <span className="text-sm leading-6 text-ink">{item}</span>
                            </li>
                          ))}
                        </ul>
                      ),
                    },
                    {
                      label: "Tools",
                      content: (
                        <div>
                          <ul className="flex flex-wrap gap-2.5">
                            {service.tools.map((t) => (
                              <li key={t} className="accent-chip rounded-full px-4 py-2 text-sm font-medium">
                                {t}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-6 max-w-xl text-sm leading-6 text-ink-muted">
                            Already set up on something else? Tell us - where it makes
                            sense, we work in what you have.
                          </p>
                        </div>
                      ),
                    },
                  ]}
                />
              </Reveal>
            </Chapter>

            <Chapter id="process" title="Stage by stage, in the open">
              {/* the process and the effort chart as one: each stage carries its own bar */}
              <ol className="relative">
                <span aria-hidden className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-white/10" />
                {stages.map((s, i) => (
                  <Reveal as="li" key={s.step} delay={i * 80}>
                    <div className="relative flex gap-6 pb-10 last:pb-0">
                      <span className="accent-icon relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#07071a] font-display text-sm font-bold">
                        {s.step}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                          <h3 className="font-display text-lg font-semibold text-white">{s.title}</h3>
                          <span className="text-xs text-ink-muted">
                            Your input: <span className="font-medium text-ink">{INPUT_LEVELS[s.input]}</span>
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-ink-muted">{s.desc}</p>
                        <div className="mt-4 flex items-center gap-3">
                          <div className="flex-1">
                            <div
                              className="h-2 rounded-r bg-[rgb(var(--accent))]"
                              style={{ width: `${(s.share / longest) * 100}%` }}
                            />
                          </div>
                          <span className="w-24 text-right text-xs text-ink-muted">
                            <span className="text-sm font-semibold tabular-nums text-white">{s.share}%</span> of
                            the work
                          </span>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
              <Reveal delay={120}>
                <p className="mt-8 text-xs leading-5 text-ink-muted">
                  An indicative picture of a typical project, not a quote. The real
                  balance is set once we know yours.
                </p>
              </Reveal>
            </Chapter>

            <Chapter id="engagement" title="Set up around how you work">
              <div className="grid gap-5 md:grid-cols-3">
                {ENGAGEMENT_MODELS.map((m, i) => (
                  <Reveal as="div" key={m.title} delay={i * 80} className="h-full">
                    <div className="glass flex h-full flex-col rounded-2xl p-6">
                      <h3 className="font-display text-lg font-semibold text-white">{m.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-ink-muted">{m.desc}</p>
                      <ul className="mt-auto space-y-2.5 border-t border-white/10 pt-5">
                        {m.points.map((p) => (
                          <li key={p} className="flex items-start gap-2.5 text-sm leading-6 text-ink">
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
            </Chapter>

            <Chapter id="faq" title="Worth asking up front">
              <FaqList faqs={faqs} />
            </Chapter>
          </div>
        </div>
      </div>

      {/* Full-width close: numbers, work, related */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <StatsBand />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionKicker>From the studio</SectionKicker>
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
