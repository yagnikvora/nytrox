/**
 * Single source of truth for the service catalogue.
 *
 * The home page shows `title` + `desc` in the card grid; the /services page
 * additionally renders `detail` and `deliverables`.
 */

export type Service = {
  slug: string;
  title: string;
  /** Short line used on the home page tiles. */
  desc: string;
  /** Longer paragraph shown on the Services page. */
  detail: string;
  deliverables: string[];
  icon: React.ReactNode;
};

export const SERVICES: Service[] = [
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    desc: "Native and cross-platform apps built for speed, scale, and delight — from concept to the App Store.",
    detail:
      "iOS, Android, and cross-platform builds engineered for smooth 60fps interaction and offline-first reliability. We handle the whole route: architecture, integrations, store submission, and post-launch releases.",
    deliverables: ["iOS & Android", "React Native / Flutter", "App Store release", "Offline-first sync"],
    icon: (
      <>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10.5 18.5h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    slug: "web-development",
    title: "Web Development",
    desc: "Blazing-fast web platforms and dashboards engineered with modern frameworks and rock-solid architecture.",
    detail:
      "Marketing sites, SaaS products, and internal dashboards built on modern React frameworks — typed end to end, server-rendered for speed, and structured so your team can keep shipping after we hand over the keys.",
    deliverables: ["Next.js & React", "APIs & integrations", "Headless CMS", "Core Web Vitals tuning"],
    icon: (
      <>
        <rect x="2.5" y="4" width="19" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M2.5 8h19M6 21h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    desc: "Research-driven interfaces and design systems that feel effortless and convert visitors into fans.",
    detail:
      "We start with your users, not a template. Research and flows come first, then wireframes, high-fidelity UI, and a component library your engineers can build against without guesswork.",
    deliverables: ["User research", "Wireframes & prototypes", "Design systems", "Motion & interaction"],
    icon: (
      <>
        <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
  {
    slug: "qa-testing",
    title: "QA & Testing",
    desc: "Automated and manual testing pipelines that ship confidence — fewer bugs, faster releases.",
    detail:
      "A layered safety net: unit and integration coverage in CI, end-to-end suites across real devices, plus exploratory passes before every release — so regressions get caught long before your users find them.",
    deliverables: ["Automated E2E suites", "CI pipelines", "Cross-device testing", "Performance audits"],
    icon: (
      <>
        <path d="M9 12.5l2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3l7 2.5v6c0 5-3.5 7.5-7 9.5-3.5-2-7-4.5-7-9.5v-6L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </>
    ),
  },
  {
    slug: "project-planning",
    title: "Project Planning",
    desc: "Agile roadmaps, sprint management, and clear communication that keep your mission on schedule.",
    detail:
      "A dedicated lead, a roadmap you can actually read, and a demo at the end of every sprint. You always know what shipped, what's next, and what it costs — no status-report archaeology required.",
    deliverables: ["Product roadmaps", "Sprint management", "Weekly demos", "Transparent reporting"],
    icon: (
      <>
        <rect x="3.5" y="4.5" width="17" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3.5 9h17M8 3v3M16 3v3M8 13h4M8 16.5h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    desc: "Monitoring, updates, and on-call support that keep your product healthy long after launch.",
    detail:
      "Launch day is the start, not the finish. We watch uptime and errors, keep dependencies and OS targets current, and ship steady improvements against a support agreement sized to your product.",
    deliverables: ["Uptime monitoring", "Security patching", "SLA-backed support", "Continuous improvement"],
    icon: (
      <>
        <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M19.4 15a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.34 1.7 1.7 0 00-1.03 1.56V21a2 2 0 11-4 0v-.09A1.7 1.7 0 008.4 19.3a1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.7 1.7 0 00.34-1.87 1.7 1.7 0 00-1.56-1.03H3a2 2 0 110-4h.09A1.7 1.7 0 004.7 8.4a1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06a1.7 1.7 0 001.87.34H9a1.7 1.7 0 001.03-1.56V3a2 2 0 114 0v.09a1.7 1.7 0 001.03 1.56 1.7 1.7 0 001.87-.34l.06-.06a2 2 0 112.83 2.83l-.06.06a1.7 1.7 0 00-.34 1.87V9a1.7 1.7 0 001.56 1.03H21a2 2 0 110 4h-.09A1.7 1.7 0 0019.4 15z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];

/** How many service tiles the home page shows before the "View more" button. */
export const HOME_SERVICE_COUNT = 6;
