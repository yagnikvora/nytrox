/**
 * Portfolio entries for the /projects page.
 *
 * NOTE: every entry below is invented — the clients, the dates, and especially
 * the metrics. They exist so the page has shape while the real case studies are
 * written. A portfolio reads as a factual claim about work delivered, so replace
 * these before the site goes live rather than editing around them.
 *
 * The client names deliberately match the fictional companies quoted in
 * data/testimonials.ts, so the two pages tell the same story.
 */

export type ProjectMetric = {
  /** Numeric part, counted up when the card scrolls into view. */
  value: number;
  /** Rendered straight after the number — "%", "x", "k", etc. */
  suffix?: string;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  tags: string[];
  metrics: ProjectMetric[];
  /** Tailwind gradient stops for the card's cover panel. */
  cover: string;
  /** Monogram shown on the cover, in place of a screenshot. */
  monogram: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "finorbit-trading",
    title: "Orbit Trading",
    client: "FinOrbit",
    category: "Mobile App",
    year: "2025",
    summary:
      "A ground-up rebuild of a retail trading app — real-time positions, biometric auth, and a chart engine that stays smooth on five-year-old hardware.",
    tags: ["React Native", "TypeScript", "GraphQL", "Node.js"],
    metrics: [
      { value: 40, suffix: "%", label: "Faster cold start" },
      { value: 4.8, label: "App Store rating" },
    ],
    cover: "from-violet-500 via-indigo-500 to-indigo-700",
    monogram: "FO",
  },
  {
    slug: "lunacart-commerce",
    title: "LunaCart Storefront",
    client: "LunaCart",
    category: "Web Platform",
    year: "2025",
    summary:
      "Replatformed a legacy storefront onto a server-rendered stack, then rebuilt the checkout around a single-page flow with saved payment methods.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    metrics: [
      { value: 27, suffix: "%", label: "Checkout conversion" },
      { value: 1.2, suffix: "s", label: "Largest paint" },
    ],
    cover: "from-cyan-400 via-blue-500 to-indigo-600",
    monogram: "LC",
  },
  {
    slug: "medispace-scheduling",
    title: "Patient Scheduling",
    client: "MediSpace",
    category: "Product Design",
    year: "2024",
    summary:
      "Clinic booking rebuilt around how reception actually works — one calendar, drag-to-reschedule, and an audit trail that satisfies compliance review.",
    tags: ["Figma", "React", "Node.js", "Playwright"],
    metrics: [
      { value: 62, suffix: "%", label: "Fewer no-shows" },
      { value: 9, suffix: "k", label: "Bookings / month" },
    ],
    cover: "from-pink-500 via-fuchsia-500 to-violet-600",
    monogram: "MS",
  },
  {
    slug: "nova-bank-design-system",
    title: "Constellation",
    client: "Nova Bank",
    category: "Design System",
    year: "2024",
    summary:
      "One component library across web and mobile, with accessibility baked into every primitive and a token pipeline that keeps design and code in step.",
    tags: ["React", "Figma", "TypeScript", "Storybook"],
    metrics: [
      { value: 120, suffix: "+", label: "Components shipped" },
      { value: 3, suffix: "x", label: "Faster feature build" },
    ],
    cover: "from-indigo-400 via-violet-500 to-cyan-500",
    monogram: "NB",
  },
  {
    slug: "feastly-ordering",
    title: "Feastly Order",
    client: "Feastly",
    category: "Mobile App",
    year: "2024",
    summary:
      "Table-side ordering for a restaurant group, built offline-first so a patchy dining-room signal never costs the kitchen a ticket.",
    tags: ["Flutter", "Swift", "Kotlin", "AWS"],
    metrics: [
      { value: 35, suffix: "%", label: "Larger avg. order" },
      { value: 18, suffix: "s", label: "Order to kitchen" },
    ],
    cover: "from-fuchsia-500 via-purple-500 to-indigo-600",
    monogram: "FL",
  },
  {
    slug: "atlas-freight-tracking",
    title: "Atlas Control",
    client: "Atlas Freight",
    category: "Web Platform",
    year: "2023",
    summary:
      "A live logistics dashboard tracking thousands of shipments — map clustering, exception alerts, and reporting the ops team builds without us.",
    tags: ["Next.js", "PostgreSQL", "GraphQL", "AWS"],
    metrics: [
      { value: 8, suffix: "k", label: "Shipments tracked" },
      { value: 99.9, suffix: "%", label: "Uptime" },
    ],
    cover: "from-sky-400 via-cyan-500 to-blue-600",
    monogram: "AF",
  },
];
