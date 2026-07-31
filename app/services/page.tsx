import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import SpaceBackground from "../components/SpaceBackground";
import CursorFX from "../components/CursorFX";
import Reveal from "../components/Reveal";
import SectionKicker from "../components/SectionKicker";
import SpotlightCard from "../components/SpotlightCard";
import GlareHover from "../components/GlareHover";
import CtaBand from "../components/CtaBand";
import Footer from "../components/Footer";
import MaskedHeading from "../components/MaskedHeading";
import ScrollReveal from "../components/ScrollReveal";
import { SERVICES } from "../data/services";

export const metadata: Metadata = {
  title: "Services — Nytrox",
  description:
    "Mobile apps, web platforms, UI/UX design, QA, project planning, and ongoing support — everything Nytrox builds, end to end.",
};

export default function ServicesPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-clip">
      <CursorFX />
      <SpaceBackground />

      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionKicker>What we do</SectionKicker>
            <MaskedHeading
              as="h1"
              text="Every stage of the product journey"
              accent="product journey"
              stagger={60}
              className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl"
            />
            <ScrollReveal className="mx-auto mt-6 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
              One studio for strategy, design, engineering, and the long tail of
              support that comes after launch — so you brief a single team instead
              of stitching five together.
            </ScrollReveal>
          </Reveal>
        </section>

        {/* Service detail cards */}
        <section className="mx-auto max-w-7xl px-6 pb-8">
          <div className="grid gap-5 lg:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal
                as="div"
                key={s.slug}
                delay={(i % 2) * 80}
                // the two columns slide in toward each other
                variant={i % 2 === 0 ? "left" : "right"}
                className="h-full"
              >
                {/* wrapper carries the anchor target for /services#slug links */}
                <div id={s.slug} className="h-full scroll-mt-28">
                  <SpotlightCard className="card-glow glass h-full">
                    {/* padding lives on the glare layer so the sweep spans the whole card */}
                    <GlareHover className="h-full rounded-2xl p-7 sm:p-8">
                      <div className="flex items-center gap-4">
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-violet-200 ring-1 ring-white/10">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                            {s.icon}
                          </svg>
                        </div>
                        <h2 className="font-display text-xl font-semibold text-white">{s.title}</h2>
                      </div>

                      <p className="mt-5 text-sm leading-7 text-ink-muted">{s.detail}</p>

                      <ul className="mt-6 flex flex-wrap gap-2">
                        {s.deliverables.map((d) => (
                          <li
                            key={d}
                            className="rounded-full px-3 py-1.5 text-xs font-medium text-violet-200 ring-1 ring-white/10"
                          >
                            {d}
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
