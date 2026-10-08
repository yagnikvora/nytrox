import Link from "next/link";
import { SERVICE_GROUPS } from "../../data/services";
import { entriesFor } from "../../data/projects";

/*
 * Shared by the three layouts of the /projects page: the portfolio grouped
 * the way the page shows it, and the bar for switching between layouts while
 * one is being chosen.
 */

/**
 * The portfolio as category -> service -> entries, in catalogue order.
 * Services with nothing filed under them are left out.
 */
export const PORTFOLIO = SERVICE_GROUPS.map((group) => {
  const services = group.services
    .map((service) => ({ service, entries: entriesFor(service.slug) }))
    .filter((s) => s.entries.length > 0);
  return {
    ...group,
    services,
    count: services.reduce((sum, s) => sum + s.entries.length, 0),
  };
});

export type PortfolioGroup = (typeof PORTFOLIO)[number];

/** The layouts on offer; "1" is /projects itself. */
export const LAYOUTS = [
  { id: "1", name: "Sections" },
  { id: "2", name: "Showcase" },
  { id: "3", name: "Rails" },
] as const;

/** The preview routes and the switcher exist in development only. */
export const LAYOUT_PREVIEWS = process.env.NODE_ENV === "development";

/**
 * Floating bar for hopping between the layouts. Renders nothing outside
 * development, so it can sit on the real page without reaching visitors.
 */
export function LayoutSwitcher({ current }: { current: string }) {
  if (!LAYOUT_PREVIEWS) return null;
  return (
    <nav
      aria-label="Layout preview"
      className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-[#0c0c1c]/95 p-1.5 text-sm shadow-[0_18px_50px_-12px_rgba(0,0,0,0.9)] backdrop-blur"
    >
      <span className="hidden px-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted sm:inline">
        Layout
      </span>
      {LAYOUTS.map((l) => (
        <Link
          key={l.id}
          href={l.id === "1" ? "/projects" : `/projects/style/${l.id}`}
          aria-current={l.id === current ? "page" : undefined}
          className={`rounded-full px-4 py-2 font-medium transition-colors ${
            l.id === current ? "bg-white text-black" : "text-ink hover:bg-white/10 hover:text-white"
          }`}
        >
          {l.id}. {l.name}
        </Link>
      ))}
    </nav>
  );
}
