import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "../Reveal";
import { EffortDonut, InputCurve } from "../ServiceCharts";
import { ENGAGEMENT_MODELS, INPUT_LEVELS, serviceHref, relatedServices, type Service } from "../../data/services";
import { STATS } from "../../data/stats";
import { Arrow, Check, WorkGrid, accentStyle, type ServiceView } from "./shared";

/*
 * Design 6 - "Bold". A poster rather than a brochure: square corners, thick
 * white outlines, hard offset shadows in the category colour, solid colour
 * blocks with black type, and headings set large in capitals. No glass, no
 * blur, no tabs - every piece of information is on the page, in the open.
 */

/** Outlined box with a hard accent shadow that pushes out further on hover. */
const BOX =
  "border-2 border-white bg-[#0a0a14] shadow-[6px_6px_0_0_rgb(var(--accent))] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_0_rgb(var(--accent))]";

/** Solid colour block - black type on the category colour. */
const BLOCK = "border-2 border-white bg-[rgb(var(--accent))] text-black shadow-[6px_6px_0_0_#ffffff]";

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block border-2 border-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.14em] text-white">
      {children}
    </span>
  );
}

function Heading({ tag, children }: { tag: string; children: ReactNode }) {
  return (
    <Reveal>
      <Tag>{tag}</Tag>
      <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">
        {children}
      </h2>
    </Reveal>
  );
}

/** A word or phrase picked out with a solid accent slab behind it. */
function Slab({ children }: { children: ReactNode }) {
  return <span className="bg-[rgb(var(--accent))] px-2 text-black">{children}</span>;
}

export default function DesignBold({ service, view }: { service: Service; view: ServiceView }) {
  const { group, stages, facts, faqs, work } = view;
  const longest = Math.max(...stages.map((s) => s.share));
  // two copies, so the band can travel half its width and loop without a seam
  const band = [...service.scope, ...service.scope];
  const words = service.title.split(" ");
  const lastWord = words.pop();

  return (
    <div style={accentStyle(service.category)}>
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 pb-14 pt-14">
        <Reveal>
          <div className="flex flex-wrap gap-3">
            <Link href="/services" className="transition-transform hover:-translate-y-0.5">
              <Tag>Services</Tag>
            </Link>
            <Link href={`/services#${group.id}`} className="transition-transform hover:-translate-y-0.5">
              <Tag>{group.title}</Tag>
            </Link>
          </div>
          <h1 className="mt-8 font-display text-6xl font-bold uppercase leading-[0.9] tracking-tight text-white sm:text-8xl xl:text-9xl">
            {words.join(" ")} <Slab>{lastWord}</Slab>
          </h1>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <p className="max-w-2xl text-xl leading-9 text-white">{service.desc}</p>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                href="/contact"
                className={`${BLOCK} group inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold uppercase tracking-[0.1em] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_0_#ffffff]`}
              >
                Get Quote
                <Arrow className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className={`${BOX} inline-flex items-center justify-center px-7 py-4 text-sm font-bold uppercase tracking-[0.1em] text-white`}
              >
                All services
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Scope band - everything it covers, on a tilted colour strip */}
      <section aria-label="What this service covers" className="overflow-hidden py-6">
        <div className="-mx-4 -rotate-1 border-y-2 border-white bg-[rgb(var(--accent))] py-4">
          <ul className="animate-marquee flex w-max" style={{ animationDuration: "44s" }}>
            {band.map((item, i) => (
              <li
                key={`${item}-${i}`}
                aria-hidden={i >= service.scope.length}
                className="flex shrink-0 items-center gap-6 pr-6 font-display text-xl font-bold uppercase tracking-tight text-black"
              >
                {item}
                <span aria-hidden>✦</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Facts */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <Reveal>
          <dl className="grid grid-cols-2 border-2 border-white lg:grid-cols-4">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`border-white p-6 ${i % 2 === 0 ? "border-r-2" : ""} ${i < 2 ? "border-b-2 lg:border-b-0" : ""} ${i < 3 ? "lg:border-r-2" : "lg:border-r-0"}`}
              >
                <dt className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
                  {f.label}
                </dt>
                <dd className="mt-3 font-display text-xl font-bold uppercase text-white">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* Overview + fit */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Heading tag="01 / Overview">
              What the work <Slab>involves</Slab>
            </Heading>
            <Reveal delay={100}>
              <p className="mt-8 text-xl leading-9 text-white">{service.detail}</p>
            </Reveal>
          </div>
          <Reveal delay={140} variant="right">
            <div className={`${BLOCK} p-8`}>
              <h3 className="font-display text-2xl font-bold uppercase">Right for you if</h3>
              <ul className="mt-6 space-y-5">
                {service.fit.map((f) => (
                  <li key={f} className="flex gap-3 text-base font-medium leading-7">
                    <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center bg-black text-white">
                      <Check size={13} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Outcomes */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <Heading tag="02 / Why it matters">
          What changes <Slab>for you</Slab>
        </Heading>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {service.outcomes.map((o, i) => (
            <Reveal as="div" key={o.title} delay={i * 90} className="h-full">
              <div className={`${BOX} h-full p-7`}>
                <span className="font-display text-7xl font-bold leading-none text-[rgb(var(--accent))]">
                  {i + 1}
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold uppercase leading-tight text-white">
                  {o.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-ink">{o.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Deliverables - filled and outlined boxes alternating like a chequerboard */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <Heading tag="03 / What’s included">
          What you <Slab>walk away with</Slab>
        </Heading>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {service.deliverables.map((d, i) => {
            const filled = i === 0 || i === 3;
            return (
              <Reveal as="div" key={d.title} delay={(i % 2) * 90} className="h-full">
                <div className={`${filled ? BLOCK : BOX} h-full p-8`}>
                  <span className="font-mono text-sm font-bold uppercase tracking-[0.14em]">
                    Deliverable {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`mt-4 font-display text-3xl font-bold uppercase leading-tight ${filled ? "" : "text-white"}`}>
                    {d.title}
                  </h3>
                  <p className={`mt-4 text-base leading-7 ${filled ? "font-medium" : "text-ink"}`}>{d.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Full scope + tools */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <Heading tag="04 / Full scope">
          Everything this <Slab>can cover</Slab>
        </Heading>
        <Reveal delay={100}>
          <ul className="mt-12 grid border-l-2 border-t-2 border-white sm:grid-cols-2 lg:grid-cols-3">
            {service.scope.map((item, i) => (
              <li
                key={item}
                className="flex items-center gap-4 border-b-2 border-r-2 border-white px-5 py-5 text-base font-semibold text-white transition-colors hover:bg-[rgb(var(--accent))] hover:text-black"
              >
                <span className="font-mono text-xs opacity-60">{String(i + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
              Tools we work in:
            </span>
            {service.tools.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <Heading tag="05 / How it runs">
          Stage by stage, <Slab>in the open</Slab>
        </Heading>
        <ol className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {stages.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 80} className="h-full">
              <div className={`${BOX} flex h-full flex-col p-6`}>
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center bg-[rgb(var(--accent))] font-display text-lg font-bold text-black">
                    {s.step}
                  </span>
                  {i < stages.length - 1 && <Arrow size={22} className="hidden text-white xl:block" />}
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold uppercase text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink">{s.desc}</p>
                <dl className="mt-auto space-y-3 pt-6">
                  <div>
                    <dt className="flex justify-between font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
                      Share of work <span className="text-white">{s.share}%</span>
                    </dt>
                    <dd className="mt-2 border-2 border-white">
                      <div className="h-3 bg-[rgb(var(--accent))]" style={{ width: `${(s.share / longest) * 100}%` }} />
                    </dd>
                  </div>
                  <div className="flex justify-between font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
                    <dt>Your input</dt>
                    <dd className="text-white">{INPUT_LEVELS[s.input]}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Charts */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal variant="left" className="h-full">
            <div className={`${BOX} h-full p-7`}>
              <h3 className="font-display text-2xl font-bold uppercase text-white">Where the effort goes</h3>
              <div className="mt-8">
                <EffortDonut stages={stages} />
              </div>
            </div>
          </Reveal>
          <Reveal variant="right" delay={80} className="h-full">
            <div className={`${BOX} h-full p-7`}>
              <h3 className="font-display text-2xl font-bold uppercase text-white">When we need you</h3>
              <div className="mt-6">
                <InputCurve stages={stages} />
              </div>
            </div>
          </Reveal>
        </div>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.1em] text-ink-muted">
          * Indicative picture of a typical project, not a quote.
        </p>
      </section>

      {/* Ways to work */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <Heading tag="06 / Ways to work">
          Set up around <Slab>how you work</Slab>
        </Heading>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {ENGAGEMENT_MODELS.map((m, i) => (
            <Reveal as="div" key={m.title} delay={i * 90} className="h-full">
              <div className={`${BOX} flex h-full flex-col p-7`}>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[rgb(var(--accent))]">
                  Option {String.fromCharCode(65 + i)}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold uppercase text-white">{m.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ink">{m.desc}</p>
                <ul className="mt-auto space-y-3 border-t-2 border-white pt-6">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm font-medium leading-6 text-white">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center bg-[rgb(var(--accent))] text-black">
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

      {/* Studio numbers - one solid block */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <Reveal>
          <dl className={`${BLOCK} grid gap-8 p-10 text-center sm:grid-cols-3`}>
            {STATS.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-7xl font-bold leading-none">
                  {s.to}
                  {s.suffix}
                </dd>
                <dt className="mt-3 font-mono text-sm font-bold uppercase tracking-[0.14em]">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* Recent work */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <Heading tag="07 / From the studio">
          Recent work, <Slab>live now</Slab>
        </Heading>
        <div className="mt-12">
          <WorkGrid work={work} />
        </div>
      </section>

      {/* FAQ - every answer open, nothing to click */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <Heading tag="08 / Good questions">
          Worth asking <Slab>up front</Slab>
        </Heading>
        <dl className="mt-12 border-t-2 border-white">
          {faqs.map((f, i) => (
            <Reveal as="div" key={f.q} delay={(i % 3) * 60}>
              <div className="grid gap-4 border-b-2 border-white py-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
                <dt className="font-display text-xl font-bold uppercase leading-snug text-white">{f.q}</dt>
                <dd className="text-base leading-7 text-ink">{f.a}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <Heading tag="09 / Pairs well with">
          Related <Slab>services</Slab>
        </Heading>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {relatedServices(service).map((s, i) => (
            <Reveal as="div" key={s.slug} delay={i * 90} className="h-full">
              <Link href={serviceHref(s.slug)} className={`${BOX} group flex h-full flex-col p-7`}>
                <span className="grid h-12 w-12 place-items-center border-2 border-white text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    {s.icon}
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold uppercase text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink">{s.desc}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold uppercase tracking-[0.1em] text-[rgb(var(--accent))]">
                  Learn more
                  <Arrow size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
