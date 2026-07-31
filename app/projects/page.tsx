import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import SpaceBackground from "../components/SpaceBackground";
import CursorFX from "../components/CursorFX";
import Reveal from "../components/Reveal";
import SectionKicker from "../components/SectionKicker";
import SpotlightCard from "../components/SpotlightCard";
import GlareHover from "../components/GlareHover";
import ShinyText from "../components/ShinyText";
import CountUp from "../components/CountUp";
import CtaBand from "../components/CtaBand";
import Footer from "../components/Footer";
import MaskedHeading from "../components/MaskedHeading";
import ScrollReveal from "../components/ScrollReveal";
import { PROJECTS } from "../data/projects";

export const metadata: Metadata = {
  title: "Projects — Nytrox",
  description:
    "Selected work from the Nytrox studio — trading apps, storefronts, design systems, and logistics platforms shipped end to end.",
};

export default function ProjectsPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-clip">
      <CursorFX />
      <SpaceBackground />

      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionKicker>Selected work</SectionKicker>
            <MaskedHeading
              as="h1"
              text="Products we put into orbit"
              accent="into orbit"
              stagger={60}
              className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl"
            />
            <ScrollReveal className="mx-auto mt-6 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
              A cross-section of what we build — native apps, server-rendered
              platforms, and the design systems that hold them together. Each one
              shipped, measured, and handed over.
            </ScrollReveal>
            <span className="glass mt-8 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.8)]" />
              <ShinyText
                text={`${PROJECTS.length} case studies`}
                speed={4}
                color="#8b8fb8"
                shineColor="#ffffff"
              />
            </span>
          </Reveal>
        </section>

        {/* Project cards */}
        <section className="mx-auto max-w-7xl px-6 pb-8">
          <div className="grid gap-5 md:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <Reveal
                as="div"
                key={p.slug}
                delay={(i % 2) * 80}
                // the two columns slide in toward each other
                variant={i % 2 === 0 ? "left" : "right"}
                className="h-full"
              >
                {/* wrapper carries the anchor target for /projects#slug links */}
                <div id={p.slug} className="h-full scroll-mt-28">
                  <SpotlightCard className="card-glow glass h-full">
                    {/* padding lives on the glare layer so the sweep spans the whole card */}
                    <GlareHover className="flex h-full flex-col rounded-2xl p-6 sm:p-7">
                      {/* Cover panel. Stands in for a screenshot — a real one
                          would be a claim about work that doesn't exist yet. */}
                      <div
                        className={`relative grid h-36 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br ${p.cover}`}
                        aria-hidden
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_55%)]" />
                        <span className="relative font-display text-4xl font-bold tracking-tight text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                          {p.monogram}
                        </span>
                      </div>

                      <div className="mt-5 flex items-center gap-2 text-xs font-medium">
                        <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-violet-200 ring-1 ring-white/10">
                          {p.category}
                        </span>
                        <span className="text-ink-muted">{p.year}</span>
                      </div>

                      <h2 className="mt-3 font-display text-xl font-semibold text-white">
                        {p.title}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-violet-300">{p.client}</p>

                      <p className="mt-3 text-sm leading-7 text-ink-muted">{p.summary}</p>

                      {/* Metrics — counted up as the card scrolls into view */}
                      <dl className="mt-6 grid grid-cols-2 gap-3">
                        {p.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="rounded-xl bg-white/[0.03] p-3.5 ring-1 ring-white/10"
                          >
                            <dt className="sr-only">{m.label}</dt>
                            <dd>
                              <span className="font-display text-2xl font-bold text-white">
                                <CountUp to={m.value} duration={1.6} />
                                {m.suffix}
                              </span>
                              <span className="mt-1 block text-xs leading-5 text-ink-muted">
                                {m.label}
                              </span>
                            </dd>
                          </div>
                        ))}
                      </dl>

                      {/* mt-auto pins the tags to the bottom so cards of
                          different summary lengths still line up */}
                      <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                        {p.tags.map((t) => (
                          <li
                            key={t}
                            className="rounded-full px-3 py-1.5 text-xs font-medium text-violet-200 ring-1 ring-white/10"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </GlareHover>
                  </SpotlightCard>
                </div>
              </Reveal>
            ))}
          </div>
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
