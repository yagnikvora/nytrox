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
import { SERVICE_GROUPS, type ServiceCategory } from "../data/services";

/** The cursor-follow spotlight, tuned to each category's accent. */
const SPOTLIGHT: Record<
  ServiceCategory,
  `rgba(${number}, ${number}, ${number}, ${number})`
> = {
  design: "rgba(139, 92, 246, 0.22)",
  build: "rgba(34, 211, 238, 0.2)",
  growth: "rgba(236, 72, 153, 0.2)",
};

export const metadata: Metadata = {
  title: "Services — Nytrox",
  description:
    "Twelve services across design, engineering, and growth — UI/UX, websites, custom development, mobile apps, AI automation, branding, packaging, video, and performance marketing.",
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
              Twelve services across design, engineering, and growth — so you
              brief a single team instead of stitching five together, and every
              piece ships knowing what the others are doing.
            </ScrollReveal>
          </Reveal>
        </section>

        {/* Jump links — twelve cards is a long scroll, so the three categories
            get shortcuts before the grid starts. */}
        <section className="mx-auto max-w-7xl px-6 pb-6">
          <Reveal className="flex flex-wrap items-center justify-center gap-2.5">
            {SERVICE_GROUPS.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="glass group inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-white/10 hover:text-white"
              >
                {group.title}
                <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-xs font-semibold text-violet-200 transition-colors group-hover:bg-violet-500/30">
                  {group.services.length}
                </span>
              </a>
            ))}
          </Reveal>
        </section>

        {/* Service detail cards, grouped by category */}
        {SERVICE_GROUPS.map((group) => (
          <section
            key={group.id}
            id={group.id}
            className="mx-auto max-w-7xl scroll-mt-28 px-6 py-10"
          >
            <Reveal className="max-w-2xl">
              <SectionKicker>{`${group.services.length} services`}</SectionKicker>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {group.title}
              </h2>
              <ScrollReveal className="mt-3 text-base leading-7 text-ink-muted">
                {group.blurb}
              </ScrollReveal>
            </Reveal>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {group.services.map((s, i) => (
                <Reveal
                  as="div"
                  key={s.slug}
                  delay={(i % 2) * 80}
                  // the two columns slide in toward each other
                  variant={i % 2 === 0 ? "left" : "right"}
                  className="h-full"
                >
                  {/* wrapper carries the anchor target for /services#slug links,
                      and the category accent every layer below inherits */}
                  <div
                    id={s.slug}
                    data-accent={s.category}
                    className="svc h-full scroll-mt-28"
                  >
                    <SpotlightCard
                      className="svc-card card-glow glass h-full"
                      spotlightColor={SPOTLIGHT[s.category]}
                    >
                      {/* padding lives on the glare layer so the sweep spans the whole card */}
                      <GlareHover className="h-full rounded-2xl p-7 sm:p-8">
                        <div className="flex items-center gap-4">
                          <div className="svc-icon grid h-12 w-12 shrink-0 place-items-center rounded-xl">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                              {s.icon}
                            </svg>
                          </div>
                          <h3 className="font-display text-xl font-semibold text-white">{s.title}</h3>
                        </div>

                        <p className="mt-5 text-sm leading-7 text-ink-muted">{s.detail}</p>

                        <ul className="mt-6 flex flex-wrap gap-2">
                          {s.deliverables.map((d) => (
                            <li
                              key={d}
                              className="svc-chip rounded-full px-3 py-1.5 text-xs font-medium"
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
        ))}

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
