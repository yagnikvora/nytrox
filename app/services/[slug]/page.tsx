import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import SpaceBackground from "../../components/SpaceBackground";
import CursorFX from "../../components/CursorFX";
import Reveal from "../../components/Reveal";
import SectionKicker from "../../components/SectionKicker";
import SpotlightCard from "../../components/SpotlightCard";
import GlareHover from "../../components/GlareHover";
import StarBorder from "../../components/StarBorder";
import GradientText from "../../components/GradientText";
import ProcessTimeline from "../../components/ProcessTimeline";
import { EffortDonut, InputCurve } from "../../components/ServiceCharts";
import StatsBand from "../../components/StatsBand";
import CtaBand from "../../components/CtaBand";
import Footer from "../../components/Footer";
import MaskedHeading from "../../components/MaskedHeading";
import ScrollReveal from "../../components/ScrollReveal";
import {
  CATEGORY_RAMP,
  CATEGORY_SPOTLIGHT,
  COMMON_FAQS,
  ENGAGEMENT_MODELS,
  SERVICES,
  SERVICE_SHAPE,
  groupOf,
  relatedServices,
  serviceHref,
} from "../../data/services";
import { STORY_FACTS, VALUES } from "../../data/about";
import { PROJECTS, domainOf } from "../../data/projects";
import { pageMetadata } from "../../data/site";
import { DesignSwitcher } from "../../components/service-designs/shared";

/*
 * One page per entry in SERVICES. The export has no server to render a slug on
 * request, so every page is built up front and anything else is a 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

const findService = (slug: string) => SERVICES.find((s) => s.slug === slug);

/** Jump links under the header - the page is long, so each section gets a shortcut. */
const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "outcomes", label: "Why it matters" },
  { id: "included", label: "What’s included" },
  { id: "scope", label: "Scope & tools" },
  { id: "process", label: "Process" },
  { id: "shape", label: "At a glance" },
  { id: "engagement", label: "Ways to work" },
  { id: "faq", label: "FAQ" },
];

/** One per outcome card, in order: a rising line, a shield, a stack. */
const OUTCOME_ICONS = [
  "M3.5 17l5.5-5.5 4 4L20.5 8M15 8h5.5v5.5",
  "M12 3.2l7 2.8v5.4c0 4.3-2.9 7.9-7 9.4-4.1-1.5-7-5.1-7-9.4V6l7-2.8zM9 12l2.2 2.2 4-4.2",
  "M12 3.5l8.5 4.5-8.5 4.5L3.5 8 12 3.5zM3.5 12.5l8.5 4.5 8.5-4.5M3.5 16.5L12 21l8.5-4.5",
];

/** How many of the studio's values and projects a service page borrows. */
const VALUE_COUNT = 4;
const WORK_COUNT = 3;

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = findService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.title} - Nytrox`,
    description: service.desc,
    path: `${serviceHref(service.slug)}/`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = findService((await params).slug);
  if (!service) notFound();

  const group = groupOf(service);
  const spotlight = CATEGORY_SPOTLIGHT[service.category];
  const steps = service.process.map((p, i) => ({
    step: String(i + 1).padStart(2, "0"),
    ...p,
  }));
  const shape = SERVICE_SHAPE[service.slug];
  const ramp = CATEGORY_RAMP[service.category];
  const stages = steps.map((s, i) => ({
    step: s.step,
    title: s.title,
    share: shape.effort[i],
    input: shape.input[i],
    color: ramp[i % ramp.length],
  }));
  const facts = [
    { label: "Category", value: group.title },
    ...STORY_FACTS.filter((f) => f.label !== "Founded"),
  ];
  const faqs = [...service.faqs, ...COMMON_FAQS];
  // Start from this service's place in the catalogue and wrap round, so the
  // eleven pages don't all show the same three projects.
  const offset = SERVICES.indexOf(service);
  const work = Array.from(
    { length: WORK_COUNT },
    (_, k) => PROJECTS[(offset + k) % PROJECTS.length]
  );

  return (
    <div className="relative flex min-h-screen flex-col overflow-clip">
      <CursorFX />
      <SpaceBackground />

      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="mx-auto max-w-7xl px-6 pb-10 pt-16">
          <Reveal className="mx-auto max-w-3xl text-center">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-medium text-ink-muted">
                <li>
                  <Link href="/services" className="transition-colors hover:text-white">
                    Services
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <Chevron />
                  <Link href={`/services#${group.id}`} className="transition-colors hover:text-white">
                    {group.title}
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <Chevron />
                  <span aria-current="page" className="text-white">
                    {service.title}
                  </span>
                </li>
              </ol>
            </nav>

            {/* the category accent, lit the way the card icons are on hover */}
            <div data-accent={service.category} className="accent mt-10 flex justify-center">
              <div className="accent-icon grid h-16 w-16 place-items-center rounded-2xl">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
                  {service.icon}
                </svg>
              </div>
            </div>

            <div className="mt-7">
              <SectionKicker>{group.title}</SectionKicker>
            </div>
            <MaskedHeading
              as="h1"
              text={service.title}
              // the last word takes the gradient, like the closing phrase on
              // every other page heading
              accent={service.title.split(" ").at(-1)}
              stagger={60}
              className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            />
            {/* plain text rather than ScrollReveal: this sits at the top of the
                page, where there is too little scroll left to ever sharpen it */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
              {service.desc}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="btn-gradient group inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-transform duration-300 ease-out hover:-translate-y-0.5 sm:w-auto"
              >
                Get Quote
                <Arrow className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <StarBorder
                as={Link}
                href="/services"
                color="#a78bfa"
                speed="5s"
                className="text-sm font-semibold"
              >
                <GradientText inline>All services</GradientText>
              </StarBorder>
            </div>
          </Reveal>

          {/* At a glance - the same fact strip as the About page */}
          <Reveal delay={160} className="mx-auto mt-14 max-w-4xl">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="bg-[#05050f] px-4 py-5 text-center">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                    {f.label}
                  </dt>
                  <dd className="mt-2 font-display text-base font-semibold text-white">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* Jump links */}
        <section className="mx-auto max-w-7xl px-6 pb-6">
          <Reveal>
            <nav aria-label="On this page" className="flex flex-wrap items-center justify-center gap-2.5">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="glass rounded-full px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-white/10 hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </Reveal>
        </section>

        {/* Overview + fit */}
        <section id="overview" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <Reveal>
                <SectionKicker>Overview</SectionKicker>
                <MaskedHeading
                  text="What the work involves"
                  accent="involves"
                  className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
                />
              </Reveal>
              <ScrollReveal className="mt-5 text-base leading-8 text-ink-muted sm:text-lg">
                {service.detail}
              </ScrollReveal>

              {/* the deliverables as a quick scan; the cards further down carry the detail */}
              <Reveal delay={120}>
                <ul data-accent={service.category} className="accent mt-7 flex flex-wrap gap-2">
                  {service.deliverables.map((d) => (
                    <li key={d.title} className="accent-chip rounded-full px-3 py-1.5 text-xs font-medium">
                      {d.title}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={120} variant="right">
              <div data-accent={service.category} className="accent">
                <div className="accent-panel glass relative overflow-hidden rounded-2xl p-7 sm:p-8">
                  <h3 className="font-display text-lg font-semibold text-white">
                    Right for you if…
                  </h3>
                  <ul className="mt-6 space-y-5">
                    {service.fit.map((f) => (
                      <li key={f} className="flex gap-3.5">
                        <span className="accent-icon mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full">
                          <Check size={13} />
                        </span>
                        <span className="text-sm leading-6 text-ink">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Outcomes */}
        <section id="outcomes" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionKicker>Why it matters</SectionKicker>
            <MaskedHeading
              text="What changes for you"
              accent="for you"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
            <ScrollReveal className="mt-4 text-ink-muted">
              The deliverables are what we hand over. This is the difference
              they are meant to make once they are in use.
            </ScrollReveal>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {service.outcomes.map((o, i) => (
              <Reveal as="div" key={o.title} delay={i * 80} variant="blur" className="h-full">
                <div data-accent={service.category} className="accent h-full">
                  <SpotlightCard
                    className="accent-panel card-glow glass h-full"
                    spotlightColor={spotlight}
                  >
                    <GlareHover className="h-full rounded-2xl p-7">
                      <div className="accent-icon grid h-12 w-12 place-items-center rounded-xl">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path
                            d={OUTCOME_ICONS[i % OUTCOME_ICONS.length]}
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h3 className="mt-5 font-display text-lg font-semibold text-white">{o.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-ink-muted">{o.desc}</p>
                    </GlareHover>
                  </SpotlightCard>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Deliverables */}
        <section id="included" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionKicker>What’s included</SectionKicker>
            <MaskedHeading
              text="What you walk away with"
              accent="walk away with"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {service.deliverables.map((d, i) => (
              <Reveal
                as="div"
                key={d.title}
                delay={(i % 2) * 80}
                // the two columns slide in toward each other
                variant={i % 2 === 0 ? "left" : "right"}
                className="h-full"
              >
                <div data-accent={service.category} className="accent h-full">
                  <SpotlightCard
                    className="accent-panel card-glow glass h-full"
                    spotlightColor={spotlight}
                  >
                    {/* padding lives on the glare layer so the sweep spans the whole card */}
                    <GlareHover className="h-full rounded-2xl p-7 sm:p-8">
                      <div className="flex items-center gap-4">
                        <span className="accent-icon grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-sm font-bold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-lg font-semibold text-white">{d.title}</h3>
                      </div>
                      <p className="mt-5 text-sm leading-7 text-ink-muted">{d.desc}</p>
                    </GlareHover>
                  </SpotlightCard>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Scope + tools */}
        <section id="scope" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionKicker>Full scope</SectionKicker>
            <MaskedHeading
              text="Everything this can cover"
              accent="can cover"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
            <ScrollReveal className="mt-4 text-ink-muted">
              No project needs all of it. We agree the pieces yours calls for
              and leave the rest out of the proposal.
            </ScrollReveal>
          </Reveal>

          <div
            data-accent={service.category}
            className="accent mt-14 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]"
          >
            <Reveal variant="left" className="h-full">
              <div className="accent-panel glass relative h-full overflow-hidden rounded-2xl p-7 sm:p-8">
                <h3 className="font-display text-lg font-semibold text-white">
                  Covered under {service.title}
                </h3>
                <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {service.scope.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="accent-icon mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full">
                        <Check size={11} />
                      </span>
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <div className="flex flex-col gap-5">
              <Reveal variant="right" delay={80}>
                <div className="glass rounded-2xl p-7">
                  <h3 className="font-display text-lg font-semibold text-white">
                    Tools we work in
                  </h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {service.tools.map((t) => (
                      <li key={t} className="accent-chip rounded-full px-3 py-1.5 text-xs font-medium">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm leading-6 text-ink-muted">
                    Already set up on something else? Tell us - where it makes
                    sense, we work in what you have.
                  </p>
                </div>
              </Reveal>

              <Reveal variant="right" delay={160} className="flex-1">
                <div className="glass flex h-full flex-col justify-center rounded-2xl p-7">
                  <h3 className="font-display text-lg font-semibold text-white">
                    Not sure what you need?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">
                    Describe the problem rather than the solution, and we will
                    tell you which of these it actually calls for.
                  </p>
                  <Link
                    href="/contact"
                    className="accent-more group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
                  >
                    Talk it through
                    <Arrow size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionKicker>How it runs</SectionKicker>
            <MaskedHeading
              text="Stage by stage, in the open"
              accent="in the open"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
          </Reveal>

          <ProcessTimeline steps={steps} />
        </section>

        {/* Shape of the engagement - the two charts */}
        <section id="shape" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionKicker>At a glance</SectionKicker>
            <MaskedHeading
              text="The shape of the engagement"
              accent="the engagement"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
            <ScrollReveal className="mt-4 text-ink-muted">
              {/* one string, not text + expression: ScrollReveal splits its child into words */}
              {`An indicative picture of a typical ${service.title} project, not a quote. The real balance is set once we know yours.`}
            </ScrollReveal>
          </Reveal>

          <div data-accent={service.category} className="accent mt-14 grid gap-5 lg:grid-cols-2">
            <Reveal variant="left" className="h-full">
              <div className="accent-panel glass relative flex h-full flex-col overflow-hidden rounded-2xl p-7 sm:p-8">
                <h3 className="font-display text-lg font-semibold text-white">
                  Where the effort goes
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  How the work divides across the four stages, with the
                  largest one in the middle.
                </p>
                {/* centred in whatever height the taller card beside it sets */}
                <div className="mt-8 grid flex-1 items-center">
                  <EffortDonut stages={stages} />
                </div>
              </div>
            </Reveal>

            <Reveal variant="right" delay={80} className="h-full">
              <div className="accent-panel glass relative h-full overflow-hidden rounded-2xl p-7 sm:p-8">
                <h3 className="font-display text-lg font-semibold text-white">
                  When we need you
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  How much of your time each stage asks for, from the first
                  conversation to the last.
                </p>
                <div className="mt-6">
                  <InputCurve stages={stages} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Studio numbers */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <StatsBand />
        </section>

        {/* Engagement models */}
        <section id="engagement" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionKicker>Ways to work</SectionKicker>
            <MaskedHeading
              text="Set up around how you work"
              accent="how you work"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
            <ScrollReveal className="mt-4 text-ink-muted">
              The same work can be arranged three ways. We will suggest the one
              that fits once we know what you are trying to get done.
            </ScrollReveal>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {ENGAGEMENT_MODELS.map((m, i) => (
              <Reveal as="div" key={m.title} delay={i * 80} className="h-full">
                <div data-accent={service.category} className="accent h-full">
                  <div className="accent-panel card-glow glass relative flex h-full flex-col overflow-hidden rounded-2xl p-7">
                    <span className="font-display text-sm font-bold text-ink-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-semibold text-white">{m.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-muted">{m.desc}</p>
                    {/* mt-auto pins the list to the bottom so the three line up */}
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
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Why Nytrox */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div>
              <Reveal>
                <SectionKicker>Why Nytrox</SectionKicker>
                <MaskedHeading
                  text="The habits behind the work"
                  accent="behind the work"
                  className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
                />
              </Reveal>
              <ScrollReveal className="mt-5 text-base leading-7 text-ink-muted">
                Whichever service you come in for, it is delivered by one team
                working to the same standards - the ones that decide whether a
                project still holds up after the launch.
              </ScrollReveal>
              <Reveal delay={120}>
                <Link
                  href="/about"
                  className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-300 transition-colors hover:text-white"
                >
                  More about the studio
                  <Arrow size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {VALUES.slice(0, VALUE_COUNT).map((v, i) => (
                <Reveal as="div" key={v.title} delay={i * 70} variant="blur" className="h-full">
                  <SpotlightCard className="card-glow glass h-full">
                    <GlareHover className="h-full rounded-2xl p-6">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-violet-200 ring-1 ring-white/10">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path
                            d={v.icon}
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h3 className="mt-5 font-display text-lg font-semibold text-white">{v.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-muted">{v.desc}</p>
                    </GlareHover>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Recent work */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionKicker>From the studio</SectionKicker>
            <MaskedHeading
              text="Recent work, live now"
              accent="live now"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
            <ScrollReveal className="mt-4 text-ink-muted">
              Client sites this team has shipped and handed over. Each card
              opens the site itself, so you can judge the work directly.
            </ScrollReveal>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {work.map((p, i) => (
              <Reveal as="div" key={p.slug} delay={i * 70} variant="blur" className="h-full">
                <div className="accent h-full" style={{ "--accent": p.accent } as CSSProperties}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <SpotlightCard
                      className="accent-panel card-glow glass h-full"
                      spotlightColor={`rgb(${p.accent} / 0.2)`}
                    >
                      <GlareHover className="flex h-full flex-col rounded-2xl p-5">
                        {/* the same browser frame as the /projects cards */}
                        <div className="overflow-hidden rounded-lg bg-[#05050f] shadow-[0_18px_40px_-22px_rgba(0,0,0,0.95)]">
                          <div className="flex items-center gap-2 bg-black/35 px-3 py-2">
                            <span className="flex gap-1.5" aria-hidden>
                              <span className="h-2 w-2 rounded-full bg-white/30" />
                              <span className="h-2 w-2 rounded-full bg-white/30" />
                              <span className="h-2 w-2 rounded-full bg-white/30" />
                            </span>
                            <span className="truncate rounded bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/70">
                              {domainOf(p.url)}
                            </span>
                          </div>
                          <div className="relative aspect-[16/10]">
                            <Image
                              src={p.preview}
                              alt={`Homepage of ${p.title}`}
                              fill
                              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                              className="object-cover object-top transition-transform duration-700 ease-out group-hover/glare:scale-[1.03]"
                            />
                          </div>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-medium">
                          <span className="accent-chip rounded-full px-2.5 py-1">{p.category}</span>
                          <span className="text-ink-muted">{p.location}</span>
                        </div>
                        <h3 className="mt-3 font-display text-lg font-semibold text-white">{p.title}</h3>
                        <span className="accent-more mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold">
                          Visit live site
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="transition-transform duration-300 group-hover/glare:translate-x-0.5 group-hover/glare:-translate-y-0.5"
                            aria-hidden
                          >
                            <path d="M8 16L16 8M9 8h7v7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </GlareHover>
                    </SpotlightCard>
                  </a>
                </div>
              </Reveal>
            ))}
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

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-16">
          <Reveal className="text-center">
            <SectionKicker>Good questions</SectionKicker>
            <MaskedHeading
              text="Worth asking up front"
              accent="up front"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
          </Reveal>

          <div className="mt-12 flex flex-col gap-3">
            {faqs.map((f, i) => (
              <Reveal as="div" key={f.q} delay={i * 60}>
                {/* native <details> → accordion behaviour with no JS */}
                <details className="group glass overflow-hidden rounded-2xl transition-colors hover:bg-white/[0.06]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left font-display text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      className="shrink-0 text-violet-300 transition-transform duration-300 group-open:rotate-45"
                    >
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-6 text-sm leading-7 text-ink-muted">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-10 text-center">
            <p className="text-sm text-ink-muted">
              Something else on your mind?{" "}
              <Link
                href="/contact"
                className="font-medium text-violet-300 transition-colors hover:text-white"
              >
                Ask us directly
              </Link>
              .
            </p>
          </Reveal>
        </section>

        {/* Related services */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionKicker>Pairs well with</SectionKicker>
            <MaskedHeading
              text="Related services"
              accent="services"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices(service).map((s, i) => (
              <Reveal as="div" key={s.slug} delay={i * 70} variant="blur" className="h-full">
                <Link href={serviceHref(s.slug)} data-accent={s.category} className="accent block h-full">
                  <SpotlightCard
                    className="accent-panel card-glow glass h-full"
                    spotlightColor={CATEGORY_SPOTLIGHT[s.category]}
                  >
                    <GlareHover className="flex h-full flex-col rounded-2xl p-6">
                      <div className="accent-icon grid h-12 w-12 place-items-center rounded-xl">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                          {s.icon}
                        </svg>
                      </div>
                      <h3 className="mt-5 font-display text-lg font-semibold text-white">{s.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-muted">{s.desc}</p>
                      {/* mt-auto pins this to the bottom so the row lines up */}
                      <span className="accent-more mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium">
                        Learn more
                        <Arrow size={14} className="transition-transform group-hover/glare:translate-x-0.5" />
                      </span>
                    </GlareHover>
                  </SpotlightCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Back to services */}
        <section className="mx-auto max-w-7xl px-6 pb-4">
          <Reveal className="flex justify-center">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform group-hover:-translate-x-0.5"
                aria-hidden
              >
                <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to all services
            </Link>
          </Reveal>
        </section>

        <CtaBand />
        <Footer />
      </main>

      {/* development only - links to the alternative designs being compared */}
      <DesignSwitcher slug={service.slug} current="1" />
    </div>
  );
}

function Arrow({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white/30" aria-hidden>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
