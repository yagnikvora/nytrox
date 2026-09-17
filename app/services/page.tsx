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
import { CATEGORY_SPOTLIGHT, SERVICE_GROUPS, serviceHref } from "../data/services";
import { pageMetadata } from "../data/site";

export const metadata = pageMetadata({
  title: "Services — Nytrox",
  description:
    "Twelve services across design, engineering, and growth — UI/UX, websites, custom development, mobile apps, AI automation, branding, packaging, video, and performance marketing.",
  path: "/services/",
});

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
                  {/* the whole card opens the service's own page; the id keeps
                      older /services#slug links landing on the card */}
                  <Link
                    href={serviceHref(s.slug)}
                    id={s.slug}
                    data-accent={s.category}
                    className="accent block h-full scroll-mt-28"
                  >
                    <SpotlightCard
                      className="accent-panel card-glow glass h-full"
                      spotlightColor={CATEGORY_SPOTLIGHT[s.category]}
                    >
                      {/* padding lives on the glare layer so the sweep spans the whole card */}
                      <GlareHover className="flex h-full flex-col rounded-2xl p-7 sm:p-8">
                        <div className="flex items-center gap-4">
                          <div className="accent-icon grid h-12 w-12 shrink-0 place-items-center rounded-xl">
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
                              key={d.title}
                              className="accent-chip rounded-full px-3 py-1.5 text-xs font-medium"
                            >
                              {d.title}
                            </li>
                          ))}
                        </ul>

                        {/* mt-auto pins this to the bottom so cards of different
                            lengths still line up */}
                        <span className="accent-more mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold">
                          Learn more
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="transition-transform duration-300 group-hover/glare:translate-x-0.5"
                            aria-hidden
                          >
                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </GlareHover>
                    </SpotlightCard>
                  </Link>
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
