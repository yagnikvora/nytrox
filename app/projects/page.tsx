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
import CtaBand from "../components/CtaBand";
import Footer from "../components/Footer";
import MaskedHeading from "../components/MaskedHeading";
import ScrollReveal from "../components/ScrollReveal";
import Image from "next/image";
import { PROJECTS, domainOf } from "../data/projects";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "Projects — Nytrox",
  description:
    "Live client work from the Nytrox studio — hospital and rehab clinics, security services, precision manufacturing, export catalogues, and retail storefronts.",
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
              Clinics, security firms, foundries, exporters, and retailers — all
              shipped, handed over, and running in production. Every card opens
              the site itself, so you can judge the work rather than our write-up.
            </ScrollReveal>
            <span className="glass mt-8 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.8)]" />
              <ShinyText
                text={`${PROJECTS.length} live sites`}
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
                {/* wrapper carries the anchor target for /projects#slug links,
                    and the accent every layer below inherits */}
                <div
                  id={p.slug}
                  className="accent h-full scroll-mt-28"
                  style={{ "--accent": p.accent } as CSSProperties}
                >
                  {/* the whole card opens the live site */}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <SpotlightCard
                      className="accent-panel card-glow glass h-full"
                      spotlightColor={`rgb(${p.accent} / 0.2)`}
                    >
                      {/* padding lives on the glare layer so the sweep spans the whole card */}
                      <GlareHover className="flex h-full flex-col rounded-2xl p-6 sm:p-7">
                        {/* Cover — the live homepage, sat in a browser frame so
                            it reads as a site rather than a stock image. The
                            frame sits straight on the card: a mat around it read
                            as a thick coloured border and fought the artwork. */}
                        <div className="relative shrink-0">
                          <div className="overflow-hidden rounded-lg bg-[#05050f] shadow-[0_18px_40px_-22px_rgba(0,0,0,0.95)]">
                            {/* browser chrome */}
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

                            {/* the capture is 1280x800, so 16/10 shows all of it */}
                            <div className="relative aspect-[16/10]">
                              <Image
                                src={p.preview}
                                alt={`Homepage of ${p.title}`}
                                fill
                                sizes="(min-width: 1024px) 45vw, 92vw"
                                // the first row is above the fold and lands as
                                // the LCP; the rest stay lazy
                                priority={i < 2}
                                className="object-cover object-top transition-transform duration-700 ease-out group-hover/glare:scale-[1.03]"
                              />
                            </div>
                          </div>

                          {/* external-link glyph, lit on hover */}
                          <span
                            className="absolute right-3 top-10 grid h-8 w-8 place-items-center rounded-lg bg-black/50 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/glare:opacity-100 group-hover/glare:text-white"
                            aria-hidden
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M8 16L16 8M9 8h7v7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-medium">
                          <span className="accent-chip rounded-full px-2.5 py-1">
                            {p.category}
                          </span>
                          <span className="text-ink-muted">{p.location}</span>
                        </div>

                        <h2 className="mt-3 font-display text-xl font-semibold text-white">
                          {p.title}
                        </h2>
                        <p className="accent-more mt-1 text-sm font-medium">
                          {domainOf(p.url)}
                        </p>

                        <p className="mt-3 text-sm leading-7 text-ink-muted">{p.summary}</p>

                        <ul className="mt-6 flex flex-wrap gap-2">
                          {p.highlights.map((h) => (
                            <li
                              key={h}
                              className="accent-chip rounded-full px-3 py-1.5 text-xs font-medium"
                            >
                              {h}
                            </li>
                          ))}
                        </ul>

                        {/* mt-auto pins this to the bottom so cards of different
                            summary lengths still line up */}
                        <span className="accent-more mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold">
                          Visit live site
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="transition-transform duration-300 group-hover/glare:translate-x-0.5 group-hover/glare:-translate-y-0.5"
                            aria-hidden
                          >
                            <path
                              d="M8 16L16 8M9 8h7v7"
                              stroke="currentColor"
                              strokeWidth="1.9"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </GlareHover>
                    </SpotlightCard>
                  </a>
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
