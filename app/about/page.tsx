import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import SpaceBackground from "../components/SpaceBackground";
import CursorFX from "../components/CursorFX";
import Reveal from "../components/Reveal";
import SectionKicker from "../components/SectionKicker";
import SpotlightCard from "../components/SpotlightCard";
import GlareHover from "../components/GlareHover";
import ScrollReveal from "../components/ScrollReveal";
import OrbitVisual from "../components/OrbitVisual";
import StatsBand from "../components/StatsBand";
import CtaBand from "../components/CtaBand";
import Footer from "../components/Footer";
import { DISCIPLINES, MILESTONES, STORY, STORY_FACTS, VALUES } from "../data/about";

export const metadata: Metadata = {
  title: "About — Nytrox",
  description:
    "Nytrox is a remote-first software studio that carries products from the first messy conversation through design, engineering, launch, and the years afterwards.",
};

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-clip">
      <CursorFX />
      <SpaceBackground />

      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionKicker>Who we are</SectionKicker>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl">
              A small crew with a{" "}
              <span className="text-gradient whitespace-nowrap">wide orbit</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
              We&apos;re the software studio behind products you&apos;ve probably
              used without knowing our name — and we like it that way. The work
              should be the loud part.
            </p>
          </Reveal>
        </section>

        {/* Story + orbit visual */}
        <section className="mx-auto max-w-7xl px-6 pb-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Why the studio exists
                </h2>
              </Reveal>

              {/* words sharpen into focus as the paragraph rises up the viewport */}
              {STORY.map((para, i) => (
                <ScrollReveal key={i} className="mt-5 text-base leading-7 text-ink-muted">
                  {para}
                </ScrollReveal>
              ))}

              <Reveal delay={320}>
                <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-4">
                  {STORY_FACTS.map((f) => (
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
            </div>

            <Reveal delay={160}>
              <OrbitVisual chips={["🚀 100+ launches", "🛰 5+ years in orbit"]} />
            </Reveal>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <StatsBand />
        </section>

        {/* Values */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionKicker>What we stand for</SectionKicker>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Six rules we don&apos;t bend
            </h2>
            <p className="mt-4 text-ink-muted">
              Every studio says it cares about quality. These are the specific
              habits that make ours hold up when a deadline gets tight.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal as="div" key={v.title} delay={i * 70} className="h-full">
                <SpotlightCard className="card-glow glass h-full">
                  {/* padding lives on the glare layer so the sweep spans the whole card */}
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
        </section>

        {/* The crew, by discipline */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionKicker>The crew</SectionKicker>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Four disciplines, one mission
            </h2>
            <p className="mt-4 text-ink-muted">
              You get the whole crew on a project — not a salesperson up front and
              a stranger doing the work.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {DISCIPLINES.map((d, i) => (
              <Reveal as="div" key={d.name} delay={(i % 2) * 80} className="h-full">
                <div className="card-glow glass h-full rounded-2xl p-7">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-sm font-bold text-violet-300">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-white">{d.name}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-ink-muted">{d.desc}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {d.focus.map((f) => (
                      <li
                        key={f}
                        className="rounded-full px-3 py-1.5 text-xs font-medium text-violet-200 ring-1 ring-white/10"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140} className="mt-10 text-center">
            <p className="text-sm text-ink-muted">
              Want to join the crew?{" "}
              <Link
                href="/contact"
                className="font-medium text-violet-300 transition-colors hover:text-white"
              >
                Tell us what you build
              </Link>
              .
            </p>
          </Reveal>
        </section>

        {/* Timeline */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <Reveal className="text-center">
            <SectionKicker>The flight log</SectionKicker>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How we got here
            </h2>
          </Reveal>

          <ol className="relative mt-14">
            {/* spine */}
            <div
              className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-400/60 via-white/15 to-transparent sm:left-[calc(6rem+7px)]"
              aria-hidden
            />
            {MILESTONES.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 70} className="relative pb-10 last:pb-0">
                <div className="flex gap-6 sm:gap-8">
                  {/* year rail (desktop) */}
                  <span className="hidden w-24 shrink-0 pt-px text-right font-display text-sm font-bold text-white sm:block">
                    {m.year}
                  </span>
                  {/* node */}
                  <span
                    className="relative mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full bg-gradient-to-br from-violet-400 to-cyan-300 shadow-[0_0_16px_3px_rgba(139,92,246,0.65)] ring-4 ring-[#05050f]"
                    aria-hidden
                  />
                  <div className="min-w-0 pb-1">
                    <span className="font-display text-sm font-bold text-violet-300 sm:hidden">
                      {m.year}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-semibold text-white sm:mt-0">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-ink-muted">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Back to home */}
        <section className="mx-auto max-w-7xl px-6 pb-4">
          <Reveal className="flex justify-center">
            <Link
              href="/"
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
              Back to home
            </Link>
          </Reveal>
        </section>

        <CtaBand />
        <Footer />
      </main>
    </div>
  );
}
