import Link from "next/link";
import Reveal from "../Reveal";
import SectionKicker from "../SectionKicker";
import ScrollReveal from "../ScrollReveal";
import { serviceHref } from "../../data/services";
import ProjectCard from "./ProjectCard";
import { PORTFOLIO } from "./shared";

/**
 * Layout 1 - "Sections". The same shape as the /services page: jump links,
 * then one section per category, and inside it each service with its projects
 * in a grid beneath its own heading. Everything is on the page at once.
 */
export default function LayoutSections() {
  return (
    <>
      {/* Jump links - one per category, with its project count */}
      <section className="mx-auto max-w-7xl px-6 pb-6">
        <Reveal className="flex flex-wrap items-center justify-center gap-2.5">
          {PORTFOLIO.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="glass group inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-white/10 hover:text-white"
            >
              {group.title}
              <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-xs font-semibold text-violet-200 transition-colors group-hover:bg-violet-500/30">
                {group.count}
              </span>
            </a>
          ))}
        </Reveal>
      </section>

      {PORTFOLIO.map((group, g) => (
        <section key={group.id} id={group.id} className="mx-auto max-w-7xl scroll-mt-28 px-6 py-12">
          <Reveal className="max-w-2xl">
            <SectionKicker>{`${group.count} projects`}</SectionKicker>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {group.title}
            </h2>
            <ScrollReveal className="mt-3 text-base leading-7 text-ink-muted">{group.blurb}</ScrollReveal>
          </Reveal>

          {group.services.map(({ service, entries }, s) => (
            <div key={service.slug} id={service.slug} className="scroll-mt-28 pt-12">
              {/* the service's own heading row, linking through to its page */}
              <Reveal>
                <div
                  data-accent={service.category}
                  className="accent flex flex-wrap items-center gap-4 border-b border-white/10 pb-5"
                >
                  <div className="accent-icon grid h-11 w-11 shrink-0 place-items-center rounded-xl">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                      {service.icon}
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">{service.title}</h3>
                  <span className="accent-chip rounded-full px-2.5 py-1 text-xs font-semibold">
                    {entries.length}
                  </span>
                  <Link
                    href={serviceHref(service.slug)}
                    className="accent-more group ml-auto inline-flex items-center gap-1.5 text-sm font-medium"
                  >
                    About this service
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </Reveal>

              <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {entries.map((entry, i) => (
                  <Reveal as="div" key={entry.slug} delay={(i % 3) * 70} variant="blur" className="h-full">
                    {/* the id keeps /projects#slug links (the footer's) landing on the card */}
                    <div id={entry.slug} className="h-full scroll-mt-28">
                      <ProjectCard
                        entry={entry}
                        icon={service.icon}
                        // only the very first row of the page is above the fold
                        priority={g === 0 && s === 0 && i < 3}
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </>
  );
}
