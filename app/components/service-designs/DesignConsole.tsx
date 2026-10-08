import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "../Reveal";
import SectionKicker from "../SectionKicker";
import MaskedHeading from "../MaskedHeading";
import CountUp from "../CountUp";
import { EffortDonut, InputCurve } from "../ServiceCharts";
import { ENGAGEMENT_MODELS, INPUT_LEVELS, type Service } from "../../data/services";
import { Tabs } from "./Interactive";
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
 * Design 5 - "Console". Laid out like a product dashboard rather than a
 * brochure: a compact title bar, a row of counters, a summary panel that stays
 * put on the left, and the detail split across tabs on the right - so the
 * whole service fits in about one screen instead of a long scroll. Monospace
 * labels and bracketed corners give it the instrument-panel feel.
 */

/** Small monospace caption used for every panel label. */
function Label({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">{children}</p>
  );
}

/** A panel with a title strip and accent brackets on two corners. */
function Panel({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative rounded-2xl border border-white/10 bg-[#090918]/80 ${className}`}>
      <span aria-hidden className="absolute -left-px -top-px h-4 w-4 rounded-tl-2xl border-l-2 border-t-2 border-[rgb(var(--accent))]" />
      <span aria-hidden className="absolute -bottom-px -right-px h-4 w-4 rounded-br-2xl border-b-2 border-r-2 border-[rgb(var(--accent))]" />
      <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-3">
        <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))] shadow-[0_0_8px_1px_rgb(var(--accent)/0.9)]" />
        <Label>{title}</Label>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}

export default function DesignConsole({ service, view }: { service: Service; view: ServiceView }) {
  const { group, stages, facts, faqs, work } = view;
  const longest = Math.max(...stages.map((s) => s.share));

  // Counts taken straight from this service's entry - nothing estimated.
  const counters = [
    { label: "Core deliverables", value: service.deliverables.length },
    { label: "Process stages", value: service.process.length },
    { label: "Areas covered", value: service.scope.length },
    { label: "Tools in use", value: service.tools.length },
  ];

  const overview = (
    <div className="space-y-5">
      <Panel title="Summary">
        <p className="font-display text-lg leading-8 text-ink sm:text-xl sm:leading-9">{service.detail}</p>
      </Panel>
      <Panel title="What changes for you">
        <ol className="divide-y divide-white/[0.07]">
          {service.outcomes.map((o, i) => (
            <li key={o.title} className="grid gap-2 py-5 first:pt-0 last:pb-0 sm:grid-cols-[2.5rem_1fr_1.5fr] sm:gap-6">
              <span className="accent-more font-mono text-sm">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-base font-semibold text-white">{o.title}</h3>
              <p className="text-sm leading-6 text-ink-muted">{o.desc}</p>
            </li>
          ))}
        </ol>
      </Panel>
      <div className="grid gap-5 xl:grid-cols-2">
        <Panel title="Effort by stage">
          <EffortDonut stages={stages} />
        </Panel>
        <Panel title="Your involvement">
          <InputCurve stages={stages} />
        </Panel>
      </div>
      <p className="font-mono text-[11px] leading-5 text-ink-muted">
        {"// charts are an indicative picture of a typical project, not a quote"}
      </p>
    </div>
  );

  const deliverables = (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        {service.deliverables.map((d, i) => (
          <Panel key={d.title} title={`Deliverable ${String(i + 1).padStart(2, "0")}`} className="h-full">
            <h3 className="font-display text-lg font-semibold text-white">{d.title}</h3>
            <p className="mt-2 text-sm leading-7 text-ink-muted">{d.desc}</p>
          </Panel>
        ))}
      </div>
      <Panel title={`Full scope - ${service.scope.length} areas`}>
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {service.scope.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-ink">
              <span className="accent-more mt-1.5 shrink-0">
                <Check size={11} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Tools">
        <ul className="flex flex-wrap gap-2">
          {service.tools.map((t) => (
            <li key={t} className="accent-chip rounded-md px-3 py-1.5 font-mono text-xs">
              {t}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );

  const process = (
    <div className="space-y-5">
      <Panel title="Stages">
        <ol className="space-y-7">
          {stages.map((s) => (
            <li key={s.step} className="grid gap-3 sm:grid-cols-[3rem_1fr]">
              <span className="accent-icon grid h-10 w-10 place-items-center rounded-lg font-mono text-sm font-bold">
                {s.step}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-display text-base font-semibold text-white">{s.title}</h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                    your input: <span className="text-ink">{INPUT_LEVELS[s.input]}</span>
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-6 text-ink-muted">{s.desc}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1">
                    <div
                      className="h-1.5 rounded-r bg-[rgb(var(--accent))]"
                      style={{ width: `${(s.share / longest) * 100}%` }}
                    />
                  </div>
                  <span className="w-10 text-right font-mono text-sm font-semibold text-white">{s.share}%</span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Panel>
      <div className="grid gap-5 lg:grid-cols-3">
        {ENGAGEMENT_MODELS.map((m, i) => (
          <Panel key={m.title} title={`Option ${String(i + 1).padStart(2, "0")}`} className="h-full">
            <h3 className="font-display text-base font-semibold text-white">{m.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-muted">{m.desc}</p>
            <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
              {m.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm leading-6 text-ink">
                  <span className="accent-more mt-1.5 shrink-0">
                    <Check size={11} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>
    </div>
  );

  return (
    <div style={accentStyle(service.category)}>
      {/* Title bar */}
      <section className="mx-auto max-w-7xl px-6 pb-6 pt-12">
        <Reveal>
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted">
            <Link href="/services" className="transition-colors hover:text-white">
              services
            </Link>
            <span className="px-2 text-white/30">/</span>
            <Link href={`/services#${group.id}`} className="transition-colors hover:text-white">
              {group.id}
            </Link>
            <span className="px-2 text-white/30">/</span>
            <span className="text-white">{service.slug}</span>
          </nav>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start gap-5">
              <div className="accent-icon grid h-16 w-16 shrink-0 place-items-center rounded-2xl">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
                  {service.icon}
                </svg>
              </div>
              <div>
                <MaskedHeading
                  as="h1"
                  text={service.title}
                  accent={service.title.split(" ").at(-1)}
                  stagger={60}
                  className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl"
                />
                <p className="mt-3 max-w-2xl text-base leading-7 text-ink-muted">{service.desc}</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="btn-gradient group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-transform duration-300 ease-out hover:-translate-y-0.5"
            >
              Get Quote
              <Arrow className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Counters */}
      <section className="mx-auto max-w-7xl px-6 pb-6">
        <Reveal delay={100}>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
            {counters.map((c) => (
              <div key={c.label} className="bg-[#07071a] px-5 py-5">
                <dt>
                  <Label>{c.label}</Label>
                </dt>
                <dd className="mt-2 font-display text-4xl font-bold text-white">
                  <CountUp to={c.value} duration={1.4} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* Summary on the left, tabbed detail on the right */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside>
            <div className="space-y-5 lg:sticky lg:top-28">
              <Reveal delay={140}>
                <Panel title="Profile">
                  <dl className="divide-y divide-white/[0.07]">
                    {facts.map((f) => (
                      <div key={f.label} className="flex items-baseline justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                        <dt className="text-xs text-ink-muted">{f.label}</dt>
                        <dd className="text-right text-sm font-semibold text-white">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Panel>
              </Reveal>
              <Reveal delay={200}>
                <Panel title="Right for you if">
                  <ul className="space-y-3.5">
                    {service.fit.map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm leading-6 text-ink">
                        <span className="accent-more mt-1.5 shrink-0">
                          <Check size={11} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </Panel>
              </Reveal>
            </div>
          </aside>

          <Reveal delay={180} className="min-w-0">
            <Tabs
              tabs={[
                { label: "Overview", content: overview },
                { label: "Deliverables", content: deliverables },
                { label: "Process", content: process },
                { label: "FAQ", content: <FaqList faqs={faqs} /> },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* Recent work */}
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
