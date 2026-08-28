/**
 * Single source of truth for the service catalogue.
 *
 * The home page shows `title` + `desc` in the card grid; the /services page
 * additionally renders `detail` and `deliverables`, laid out by `category`
 * (see SERVICE_GROUPS at the bottom of this file).
 *
 * Array order is the running order everywhere: the home grid takes the first
 * HOME_SERVICE_COUNT, the footer the first few, and each category section on
 * /services keeps its members in this sequence.
 */

export type ServiceCategory = "design" | "build" | "growth";

export type Service = {
  slug: string;
  title: string;
  /** Short line used on the home page tiles. */
  desc: string;
  /** Longer paragraph shown on the Services page. */
  detail: string;
  deliverables: string[];
  category: ServiceCategory;
  icon: React.ReactNode;
};

export const SERVICES: Service[] = [
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    desc: "Research-driven interfaces and design systems that feel effortless and convert visitors into fans.",
    detail:
      "We start with your users, not a template. Research and flows come first, then wireframes, high-fidelity UI, and a component library your engineers can build against without guesswork.",
    deliverables: ["User research", "Wireframes & prototypes", "Design systems", "Motion & interaction"],
    category: "design",
    icon: (
      <>
        {/* artboard crop marks + cursor */}
        <path
          d="M4 9.5v-4a1.5 1.5 0 011.5-1.5h4M20 14.5v4a1.5 1.5 0 01-1.5 1.5h-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M9 8.6l7.2 3-2.9 1.3-1.3 2.9-3-7.2z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    slug: "website",
    title: "Website",
    desc: "Fast, responsive sites — marketing pages, storefronts, and CMS builds your team can edit without a developer.",
    detail:
      "Landing pages, multi-page marketing sites, and storefronts built to load fast and rank well. Content lives in a CMS your team actually controls, and every page is responsive, accessible, and tuned for Core Web Vitals before it goes live.",
    deliverables: ["Marketing sites", "E-commerce storefronts", "Headless CMS", "Core Web Vitals tuning"],
    category: "build",
    icon: (
      <>
        <rect x="2.5" y="4" width="19" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M2.5 8.5h19M5.7 6.2h.01M8.3 6.2h.01"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    slug: "development",
    title: "Development",
    desc: "Custom software, SaaS platforms, and the APIs behind them — engineered on architecture that holds up.",
    detail:
      "SaaS products, internal dashboards, and the services that feed them — typed end to end, server-rendered for speed, and structured so your team can keep shipping after we hand over the keys.",
    deliverables: ["Next.js & React", "APIs & integrations", "Database design", "Cloud deployment"],
    category: "build",
    icon: (
      <>
        <path
          d="M8.6 8.2L4.8 12l3.8 3.8M15.4 8.2L19.2 12l-3.8 3.8M13.4 5.5l-2.8 13"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    slug: "mobile-app-development",
    title: "Mobile Application Development",
    desc: "Native and cross-platform apps built for speed, scale, and delight — from concept to the App Store.",
    detail:
      "iOS, Android, and cross-platform builds engineered for smooth 60fps interaction and offline-first reliability. We handle the whole route: architecture, integrations, store submission, and post-launch releases.",
    deliverables: ["iOS & Android", "React Native / Flutter", "App Store release", "Offline-first sync"],
    category: "build",
    icon: (
      <>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10.5 18.5h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    desc: "Campaigns, content, and social that put your product in front of the people who will actually use it.",
    detail:
      "Strategy first, then execution: audience research, a content calendar you can sustain, and campaigns across social, email, and organic channels — all reporting into one dashboard, so you can see what is working instead of guessing.",
    deliverables: ["Channel strategy", "Content & social", "Email campaigns", "Analytics dashboards"],
    category: "growth",
    icon: (
      <>
        {/* megaphone */}
        <path
          d="M4.5 10.5v3a1 1 0 001 1H8l9.5 4.5V5L8 9.5H5.5a1 1 0 00-1 1z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M20 9.8a3.4 3.4 0 010 4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    desc: "Paid acquisition run on numbers, not hunches — tracked, tested, and optimised for return on ad spend.",
    detail:
      "Google, Meta, and LinkedIn campaigns built on a clean conversion-tracking setup. We test creative and audiences in structured cycles, cut what does not earn its keep, and report on cost per acquisition rather than impressions.",
    deliverables: ["Google & Meta Ads", "Conversion tracking", "A/B testing", "ROAS reporting"],
    category: "growth",
    icon: (
      <>
        <circle cx="11" cy="13" r="7.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="11" cy="13" r="3.3" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M11 13l6.6-6.6M15.7 4.6h3.7v3.7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    desc: "Print and digital collateral — decks, social kits, and campaign artwork that hold the line on your brand.",
    detail:
      "Pitch decks, ad creative, social kits, brochures, and everything in between, drawn from one set of templates — so the tenth asset still looks like it came from the same studio as the first.",
    deliverables: ["Social & ad creative", "Pitch decks", "Print collateral", "Template kits"],
    category: "design",
    icon: (
      <>
        <path
          d="M4.6 19.4l1.7-4.9 9.2-9.2a2.3 2.3 0 013.2 3.2l-9.2 9.2-4.9 1.7z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M14.2 6.7l3.1 3.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    slug: "seo",
    title: "SEO",
    desc: "Technical and content SEO that earns rankings which hold — no shortcuts, no rented traffic.",
    detail:
      "A technical audit to clear whatever is holding you back, then keyword and content work aimed at intent rather than raw volume. Schema, internal linking, and page speed get handled alongside it, because rankings follow the whole picture.",
    deliverables: ["Technical audits", "Keyword strategy", "On-page & schema", "Rank reporting"],
    category: "growth",
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="6.8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M15.5 15.5L20.5 20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path
          d="M8 12.4v-1.6M10.5 12.4V8.7M13 12.4v-2.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    slug: "ai-automation",
    title: "AI Automation & Solutions",
    desc: "Custom AI agents and automations that take the repetitive work off your team's desk.",
    detail:
      "Chatbots, document pipelines, and internal agents wired into the tools you already run. We scope the workflow first, prove the value on a single process, then extend — with a human kept in the loop wherever the stakes call for one.",
    deliverables: ["AI agents & chatbots", "Workflow automation", "LLM integrations", "Internal tooling"],
    category: "build",
    icon: (
      <>
        <rect x="7" y="7" width="10" height="10" rx="2.4" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M10 3.4v2.2M14 3.4v2.2M10 18.4v2.2M14 18.4v2.2M3.4 10h2.2M3.4 14h2.2M18.4 10h2.2M18.4 14h2.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M12 9.8l.75 1.45L14.2 12l-1.45.75L12 14.2l-.75-1.45L9.8 12l1.45-.75L12 9.8z" fill="currentColor" />
      </>
    ),
  },
  {
    slug: "package-design",
    title: "Package Design",
    desc: "Retail-ready packaging — structure, artwork, and dielines that survive contact with the printer.",
    detail:
      "Concepts through to print-ready artwork: structural options, shelf-impact studies, and dielines prepared to your printer's spec — with mockups, so you can see the box before you commit to a run of ten thousand.",
    deliverables: ["Structural concepts", "Print-ready dielines", "Label & carton artwork", "3D mockups"],
    category: "design",
    icon: (
      <>
        <path
          d="M12 3.2l8 4v9.6l-8 4-8-4V7.2l8-4z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M4 7.2l8 4 8-4M12 11.2v9.6M8 5.2l8 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    slug: "brand-design",
    title: "Brand Design",
    desc: "Logos, identity systems, and guidelines that make you recognisable everywhere you show up.",
    detail:
      "Positioning and naming through to a full identity — logo suite, palette, type scale, and the usage rules written down. The guidelines matter: the brand has to survive being handed to a printer, an agency, or a new hire.",
    deliverables: ["Logo & identity suite", "Brand guidelines", "Typography & palette", "Collateral system"],
    category: "design",
    icon: (
      <>
        <path
          d="M7.6 3.6h8.8l4 5.6-8.4 11.2L3.6 9.2l4-5.6z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M3.6 9.2h16.8M9.6 9.2L12 20.4l2.4-11.2L12 3.6 9.6 9.2z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    desc: "Product demos, ads, and social cuts edited to hold attention past the first three seconds.",
    detail:
      "Raw footage, screen recordings, or a blank page — we edit, grade, and score product demos, launch films, and short-form social cuts, delivered in every aspect ratio the platforms ask for.",
    deliverables: ["Product demos & ads", "Short-form social cuts", "Motion graphics", "Colour & sound"],
    category: "design",
    icon: (
      <>
        <rect x="2.8" y="4.8" width="18.4" height="14.4" rx="2.6" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M10.2 9.4l4.6 2.6-4.6 2.6V9.4z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];

/** How many service tiles the home page shows before the "View more" button. */
export const HOME_SERVICE_COUNT = 6;

/**
 * Category sections for the /services page. Twelve detail cards in one
 * undifferentiated grid reads as a wall, so they are split three ways — and the
 * `id` doubles as the anchor target for the jump links above the grid.
 */
const GROUP_META = [
  {
    id: "design",
    title: "Design & Brand",
    blurb:
      "Identity, interface, and everything else people actually see — drawn from one system, so the tenth touchpoint looks like it belongs with the first.",
  },
  {
    id: "build",
    title: "Build & Engineering",
    blurb:
      "The software itself: sites, apps, platforms, and the automations behind them — built so your team can keep shipping long after launch week.",
  },
  {
    id: "growth",
    title: "Growth & Marketing",
    blurb:
      "Getting it in front of the right people and proving it worked — organic and paid, measured against revenue rather than impressions.",
  },
] as const satisfies readonly { id: ServiceCategory; title: string; blurb: string }[];

export const SERVICE_GROUPS = GROUP_META.map((group) => ({
  ...group,
  services: SERVICES.filter((s) => s.category === group.id),
}));
