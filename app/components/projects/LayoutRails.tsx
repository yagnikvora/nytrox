import Link from "next/link";
import Reveal from "../Reveal";
import SectionKicker from "../SectionKicker";
import SnapCarousel from "../SnapCarousel";
import { serviceHref } from "../../data/services";
import ProjectCard from "./ProjectCard";
import { PORTFOLIO } from "./shared";

/**
 * Layout 3 - "Rails". Each category gets a panel with its name pinned on the
 * left; on the right, every service is one sideways-scrolling row of compact
 * cards. The whole portfolio fits in a few screens, and a service with many
 * projects takes no more height than one with two.
 */
export default function LayoutRails() {
  return (
    <>
      {PORTFOLIO.map((group, g) => (
        <section key={group.id} id={group.id} className="mx-auto max-w-7xl scroll-mt-28 px-6 py-10">
          <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12">
            {/* the category, held in place while its rails scroll past */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <SectionKicker>{`${group.count} projects`}</SectionKicker>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white">
                  {group.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-ink-muted">{group.blurb}</p>
                <ul className="mt-6 hidden space-y-1 border-l border-white/10 lg:block">
                  {group.services.map(({ service, entries }) => (
                    <li key={service.slug}>
                      <a
                        href={`#${service.slug}`}
                        className="-ml-px flex items-baseline justify-between gap-3 border-l border-transparent py-1.5 pl-4 text-sm text-ink-muted transition-colors hover:border-violet-400 hover:text-white"
                      >
                        {service.title}
                        <span className="text-xs tabular-nums opacity-60">{entries.length}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="min-w-0 space-y-12">
              {group.services.map(({ service, entries }, s) => (
                <Reveal as="div" key={service.slug} delay={s * 60}>
                  <div id={service.slug} className="scroll-mt-28">
                    <div data-accent={service.category} className="accent mb-5 flex flex-wrap items-center gap-3">
                      <div className="accent-icon grid h-10 w-10 shrink-0 place-items-center rounded-xl">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                          {service.icon}
                        </svg>
                      </div>
                      <h3 className="font-display text-xl font-semibold text-white">{service.title}</h3>
                      <span className="accent-chip rounded-full px-2.5 py-1 text-xs font-semibold">
                        {entries.length}
                      </span>
                      <Link
                        href={serviceHref(service.slug)}
                        className="accent-more ml-auto text-sm font-medium transition-colors hover:text-white"
                      >
                        About this service
                      </Link>
                    </div>

                    <SnapCarousel label={`${service.title} projects`}>
                      {entries.map((entry, i) => (
                        <div key={entry.slug} className="w-[82vw] shrink-0 snap-start sm:w-[340px]">
                          <ProjectCard
                            entry={entry}
                            icon={service.icon}
                            compact
                            // only the first rail of the page is above the fold
                            priority={g === 0 && s === 0 && i < 2}
                          />
                        </div>
                      ))}
                    </SnapCarousel>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
