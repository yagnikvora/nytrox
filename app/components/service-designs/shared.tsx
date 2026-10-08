import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import SpotlightCard from "../SpotlightCard";
import GlareHover from "../GlareHover";
import {
  CATEGORY_RAMP,
  CATEGORY_SPOTLIGHT,
  COMMON_FAQS,
  SERVICES,
  SERVICE_SHAPE,
  groupOf,
  relatedServices,
  serviceHref,
  type Service,
  type ServiceCategory,
  type ServiceFaq,
} from "../../data/services";
import { STORY_FACTS } from "../../data/about";
import { PROJECTS, domainOf, type Project } from "../../data/projects";

/*
 * What the alternative service-page designs (DesignEditorial, DesignBento, DesignCinematic,
 * DesignConsole, DesignBold, DesignMission)
 * have in common: the values derived from a service, and the few sections
 * that look the same whichever layout sits around them.
 *
 * These designs are previews to choose between. Once one is picked, it
 * replaces app/services/[slug]/page.tsx and the rest of this folder can go.
 */

/** The designs on offer; "1" is the page at /services/<slug> itself. */
export const DESIGNS = [
  { id: "1", name: "Classic" },
  { id: "2", name: "Editorial" },
  { id: "3", name: "Bento" },
  { id: "4", name: "Cinematic" },
  { id: "5", name: "Console" },
  { id: "6", name: "Bold" },
  { id: "7", name: "Mission" },
] as const;

/** The preview routes and the switcher exist in development only. */
export const DESIGN_PREVIEWS = process.env.NODE_ENV === "development";

const WORK_COUNT = 3;

/** The same triplets as the .accent[data-accent] rules in globals.css. */
const CATEGORY_ACCENT: Record<ServiceCategory, string> = {
  design: "139 92 246",
  build: "34 211 238",
  growth: "236 72 153",
};

/**
 * Sets --accent for a whole page of a design. Deliberately not the `.accent`
 * class: that one lights every icon and panel inside it on hover, which is
 * right for a single card and wrong for a wrapper the pointer never leaves.
 * Cards that want the hover treatment add `.accent` themselves.
 */
export const accentStyle = (category: ServiceCategory) =>
  ({ "--accent": CATEGORY_ACCENT[category] }) as CSSProperties;

/** Everything a design needs, worked out once from the service entry. */
export function buildServiceView(service: Service) {
  const group = groupOf(service);
  const shape = SERVICE_SHAPE[service.slug];
  const ramp = CATEGORY_RAMP[service.category];
  const stages = service.process.map((p, i) => ({
    step: String(i + 1).padStart(2, "0"),
    title: p.title,
    desc: p.desc,
    share: shape.effort[i],
    input: shape.input[i],
    color: ramp[i % ramp.length],
  }));
  // Start from this service's place in the catalogue and wrap round, so the
  // twelve pages don't all show the same three projects.
  const offset = SERVICES.indexOf(service);

  return {
    group,
    stages,
    spotlight: CATEGORY_SPOTLIGHT[service.category],
    facts: [
      { label: "Category", value: group.title },
      ...STORY_FACTS.filter((f) => f.label !== "Founded"),
    ],
    faqs: [...service.faqs, ...COMMON_FAQS],
    work: Array.from({ length: WORK_COUNT }, (_, k) => PROJECTS[(offset + k) % PROJECTS.length]),
  };
}

export type ServiceView = ReturnType<typeof buildServiceView>;
export type Stage = ServiceView["stages"][number];

export function Arrow({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Accordion of questions - native <details>, so it needs no JS. */
export function FaqList({ faqs }: { faqs: ServiceFaq[] }) {
  return (
    <div className="flex flex-col gap-3">
      {faqs.map((f, i) => (
        <Reveal as="div" key={f.q} delay={i * 60}>
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
  );
}

/** Three services that pair with this one, as cards linking to their pages. */
export function RelatedGrid({ service }: { service: Service }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
  );
}

/** Live client sites in a browser frame, each opening the site itself. */
export function WorkGrid({ work }: { work: Project[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {work.map((p, i) => (
        <Reveal as="div" key={p.slug} delay={i * 70} variant="blur" className="h-full">
          <div className="accent h-full" style={{ "--accent": p.accent } as CSSProperties}>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="block h-full">
              <SpotlightCard
                className="accent-panel card-glow glass h-full"
                spotlightColor={`rgb(${p.accent} / 0.2)`}
              >
                <GlareHover className="flex h-full flex-col rounded-2xl p-5">
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
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
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
  );
}

/**
 * Floating bar for hopping between the designs of one service. Renders
 * nothing outside development, so it can sit on the real page without ever
 * reaching visitors.
 */
export function DesignSwitcher({ slug, current }: { slug: string; current: string }) {
  if (!DESIGN_PREVIEWS) return null;
  return (
    <nav
      aria-label="Design preview"
      className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-[#0c0c1c]/95 p-1.5 text-sm shadow-[0_18px_50px_-12px_rgba(0,0,0,0.9)] backdrop-blur"
    >
      <span className="hidden px-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted sm:inline">
        Design
      </span>
      {DESIGNS.map((d) => (
        <Link
          key={d.id}
          href={d.id === "1" ? serviceHref(slug) : `${serviceHref(slug)}/design/${d.id}`}
          aria-current={d.id === current ? "page" : undefined}
          className={`rounded-full px-3.5 py-2 font-medium transition-colors ${
            d.id === current ? "bg-white text-black" : "text-ink hover:bg-white/10 hover:text-white"
          }`}
        >
          {d.id}
          {/* seven names only fit a wide screen; below that the numbers stand alone */}
          <span className="hidden xl:inline">. {d.name}</span>
        </Link>
      ))}
    </nav>
  );
}
