import { SERVICE_GROUPS } from "../../data/services";
import { entriesFor } from "../../data/projects";

/*
 * The portfolio grouped the way the /projects page shows it.
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
