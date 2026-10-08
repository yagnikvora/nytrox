/**
 * Portfolio entries for the /projects page.
 *
 * Every entry below is a real, live client site, and each `summary` and
 * `highlights` list describes what is actually on it. That constraint is the
 * point: a portfolio is a factual claim about work delivered, so nothing here
 * should be written that could not be checked by opening `url`.
 *
 * There are deliberately no performance metrics. The previous placeholder
 * entries carried invented ones ("+27% checkout conversion"), which is a
 * different and much worse thing to publish once the clients are real. If a
 * client shares verified numbers, add them then - with their sign-off.
 *
 * `preview` points at a capture of the client's homepage in public/previews,
 * taken at 1280x800. These are snapshots of someone else's live site, so they
 * drift: re-shoot a card's preview whenever that client redesigns, and shoot a
 * new one at the same size before adding an entry here.
 */

type ProjectBase = {
  slug: string;
  /** Business name, as written on the live site. */
  title: string;
  /** Sector, shown as the card's chip. */
  category: string;
  /** Slug of the service (data/services.tsx) this is filed under on /projects. */
  service: string;
  summary: string;
  /** What the build includes - all of it observable on the live site. */
  highlights: string[];
  /**
   * Technology used. For a live site this lists only what can be seen from the
   * site itself - its framework, styling, CMS, and host - not what is assumed.
   */
  tech: string[];
  /** Tailwind gradient stops framing the cover panel. */
  cover: string;
  /** RGB triplet driving the card's accent glow; keeps step with `cover`. */
  accent: string;
};

/** A real, live client project. */
export type Project = ProjectBase & {
  /** Where the client operates. */
  location: string;
  /** The live site. */
  url: string;
  /** 1280x800 homepage capture under public/previews. */
  preview: string;
};

/**
 * A placeholder holding a slot on /projects until real work is added for that
 * service. It has no client, no link, and no screenshot, and the page labels
 * it "Sample" - see SAMPLE_PROJECTS below.
 */
export type SampleProject = ProjectBase & { sample: true };

export type PortfolioEntry = Project | SampleProject;

export const isSample = (entry: PortfolioEntry): entry is SampleProject => "sample" in entry;

/** Domain shown under the title - derived so the URL stays the only source. */
export function domainOf(url: string): string {
  return new URL(url).host.replace(/^www\./, "");
}

export const PROJECTS: Project[] = [
  {
    slug: "isha-hospital",
    title: "Isha Hospital",
    category: "Healthcare",
    service: "website-development",
    location: "Rajkot, India",
    url: "https://ishahospitals.com/",
    summary:
      "A multi-speciality clinic covering cardiac, pulmonary, liver, renal, neuro, and haematology care. The site keeps consulting hours, the doctors' credentials, and the emergency number within reach of every section.",
    highlights: ["Doctor profiles", "Consulting hours", "Care-journey walkthrough", "FAQ & enquiry"],
    tech: ["Next.js", "React", "Tailwind CSS"],
    cover: "from-cyan-400 via-blue-500 to-indigo-600",
    accent: "34 211 238",
    preview: "/previews/isha-hospital.jpg",
  },
  {
    slug: "samrat-security-force",
    title: "Samrat Security Force",
    category: "Security Services",
    service: "website-development",
    location: "Rajkot, India",
    url: "https://samratsecurityforce.com/",
    summary:
      "Manned guarding, event and corporate security, CCTV and access control, plus a housekeeping arm - each service broken out on its own, with the client roster, certifications, and team gallery doing the trust-building.",
    highlights: ["Six service lines", "Client roster", "Certification slider", "Blog & FAQ"],
    tech: ["Next.js", "React", "Tailwind CSS", "Sanity"],
    cover: "from-indigo-400 via-violet-500 to-violet-700",
    accent: "139 92 246",
    preview: "/previews/samrat-security-force.jpg",
  },
  {
    slug: "careforu-rehab",
    title: "CareForU Rehab",
    category: "Healthcare",
    service: "website-development",
    location: "Mississauga, Canada",
    url: "https://www.careforurehab.ca/",
    summary:
      "A five-discipline rehab clinic - physiotherapy, chiropractic, massage, acupuncture, naturopathy. Eighteen-plus conditions are listed by name, so patients can find their own before they book.",
    highlights: ["Appointment booking", "Conditions treated", "Service enquiry form", "Products & orthotics"],
    tech: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    cover: "from-sky-400 via-cyan-500 to-blue-600",
    accent: "56 189 248",
    preview: "/previews/careforu-rehab.jpg",
  },
  {
    slug: "shree-hari-metacast",
    title: "Shree Hari Metacast",
    category: "Manufacturing",
    service: "website-development",
    location: "Rajkot, India",
    url: "https://www.shreeharimetacast.com/",
    summary:
      "Precision castings in grey iron, ductile iron, and mild steel. A thirty-plus piece product gallery, the material specifications buyers actually ask for, and an export map covering eight countries.",
    highlights: ["Product gallery", "Material specifications", "Global export map", "Quote request"],
    tech: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    cover: "from-violet-500 via-indigo-500 to-indigo-700",
    accent: "99 102 241",
    preview: "/previews/shree-hari-metacast.jpg",
  },
  {
    slug: "vp-global-exim",
    title: "VP Global Exim",
    category: "Export & Trade",
    service: "website-development",
    location: "Gondal, India",
    url: "https://www.vpglobalexim.com/",
    summary:
      "A merchant exporter's catalogue across nine categories - apparel, engineering components, tiles, sanitary ware and more - with an enquiry form that captures country, product, and quantity in a single pass.",
    highlights: ["Nine product categories", "Engineering solutions", "Export markets map", "Quote enquiry form"],
    tech: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    cover: "from-pink-500 via-fuchsia-500 to-violet-600",
    accent: "236 72 153",
    preview: "/previews/vp-global-exim.jpg",
  },
  {
    slug: "hitesh-mobile",
    title: "Hitesh Mobile",
    category: "Retail",
    service: "website-development",
    location: "Rajkot, India",
    url: "https://www.hiteshmobile.in/",
    summary:
      "A pre-owned phone store's live stock, online - mobiles, watches, and audio listed with condition grade, battery health, and the saving against retail, with WhatsApp standing in for a checkout.",
    highlights: ["Live stock catalogue", "Condition & battery grading", "Category browsing", "WhatsApp enquiry"],
    tech: ["Angular", "Tailwind CSS", "Vercel"],
    cover: "from-violet-400 via-fuchsia-500 to-pink-500",
    accent: "168 85 247",
    preview: "/previews/hitesh-mobile.jpg",
  },
];

/*
 * Placeholders, two per service that has no real project yet, so every
 * section of /projects has something in it while the layout is being chosen.
 *
 * THESE ARE NOT REAL WORK. They break the rule at the top of this file on
 * purpose, and to keep that honest they name no client, link nowhere, carry no
 * results, and are shown with a "Sample" label. Replace each one with a real
 * project (move it into PROJECTS, with a url and a preview) or delete it
 * before the page is used to win work.
 */
const VIOLET = { cover: "from-violet-500 via-indigo-500 to-indigo-700", accent: "139 92 246" };
const CYAN = { cover: "from-cyan-400 via-blue-500 to-indigo-600", accent: "34 211 238" };
const PINK = { cover: "from-pink-500 via-fuchsia-500 to-violet-600", accent: "236 72 153" };

/** What a sample lists as its technology: the usual tools for its service. */
const SAMPLE_TECH: Record<string, string[]> = {
  "ui-ux-design": ["Figma", "FigJam", "Maze"],
  "mobile-app-development": ["React Native", "TypeScript", "Node.js", "Firebase"],
  "ai-automation": ["Claude", "n8n", "Node.js", "PostgreSQL"],
  "digital-marketing": ["Meta Business Suite", "Mailchimp", "Google Analytics"],
  "performance-marketing": ["Google Ads", "Meta Ads Manager", "Google Tag Manager"],
  seo: ["Google Search Console", "Google Analytics 4", "Screaming Frog"],
  "graphic-design": ["Adobe Illustrator", "Adobe InDesign", "Figma"],
  "package-design": ["Adobe Illustrator", "Adobe Dimension", "Blender"],
  "brand-design": ["Adobe Illustrator", "Adobe InDesign", "Figma"],
  "video-editing": ["Adobe Premiere Pro", "Adobe After Effects", "DaVinci Resolve"],
};

const sample = (
  service: string,
  n: 1 | 2,
  tone: { cover: string; accent: string },
  title: string,
  category: string,
  summary: string,
  highlights: string[]
): SampleProject => ({
  slug: `sample-${service}-${n}`,
  sample: true,
  service,
  title,
  category,
  summary,
  highlights,
  tech: SAMPLE_TECH[service],
  ...tone,
});

export const SAMPLE_PROJECTS: SampleProject[] = [
  sample("ui-ux-design", 1, VIOLET, "Clinic booking app redesign", "Healthcare",
    "A patient booking flow rebuilt from research up: interviews, a mapped journey, and a tested prototype before any screen was polished.",
    ["User interviews", "Journey map", "Clickable prototype", "Component library"]),
  sample("ui-ux-design", 2, VIOLET, "Logistics dashboard design system", "Logistics",
    "A shared set of tokens and components for a dispatch dashboard, documented so design and engineering work from the same version.",
    ["Design tokens", "Component states", "Dark & light themes", "Developer handoff"]),

  sample("mobile-app-development", 1, CYAN, "Field-service app for technicians", "Field services",
    "A cross-platform app for crews who work where the signal drops: jobs, checklists, and photos stored on the device and synced when it returns.",
    ["iOS & Android", "Offline-first sync", "Photo capture", "Push notifications"]),
  sample("mobile-app-development", 2, CYAN, "Loyalty app for a retail chain", "Retail",
    "Points, offers, and store locations in one app, with the backend and the store-listing work handled by the same team.",
    ["Loyalty wallet", "Store finder", "In-app offers", "App Store release"]),

  sample("ai-automation", 1, CYAN, "Support assistant for an online store", "E-commerce",
    "An assistant that answers from the store's own help content and order data, and hands over to a person when a question is beyond it.",
    ["Knowledge-base answers", "Order lookups", "Human handover", "Conversation logs"]),
  sample("ai-automation", 2, CYAN, "Invoice processing for an accounts team", "Finance operations",
    "Incoming invoices read, checked against purchase orders, and queued for approval, with a review screen for anything the system is unsure of.",
    ["Document extraction", "PO matching", "Approval queue", "Review screen"]),

  sample("digital-marketing", 1, PINK, "Launch campaign for a consumer brand", "Consumer goods",
    "A pre-launch plan across social and email: audience research, a content calendar, and the creative to fill it.",
    ["Channel strategy", "Content calendar", "Email sequence", "Launch creative"]),
  sample("digital-marketing", 2, PINK, "Always-on social for a clinic group", "Healthcare",
    "Ongoing content and community management in one brand voice, reported in a single view across every channel.",
    ["Monthly content plan", "Post production", "Community replies", "Channel reporting"]),

  sample("performance-marketing", 1, PINK, "Lead-generation ads for an exporter", "Export & Trade",
    "Search and LinkedIn campaigns built on tracking that was fixed first, so every enquiry can be traced back to the ad that produced it.",
    ["Tracking audit", "Search campaigns", "LinkedIn ads", "CPA reporting"]),
  sample("performance-marketing", 2, PINK, "Shopping campaigns for an online store", "E-commerce",
    "Product feed, shopping, and remarketing campaigns set up together, with creative and audiences tested in structured rounds.",
    ["Product feed", "Shopping campaigns", "Remarketing", "A/B testing"]),

  sample("seo", 1, PINK, "Technical SEO for a multi-location clinic", "Healthcare",
    "A crawl and indexing audit, the fixes in priority order, and location pages structured so each branch can be found for its own area.",
    ["Technical audit", "Location pages", "Structured data", "Rank tracking"]),
  sample("seo", 2, PINK, "Content strategy for an industrial supplier", "Manufacturing",
    "Keywords mapped to what buyers actually search for, grouped into pages, and briefed for the client's own writers.",
    ["Keyword research", "Intent mapping", "Content briefs", "Internal linking"]),

  sample("graphic-design", 1, VIOLET, "Investor pitch deck", "Startup",
    "A fundraising deck where the structure does as much work as the visuals, built in the tool the founders present from.",
    ["Story structure", "Slide design", "Data slides", "Editable template"]),
  sample("graphic-design", 2, VIOLET, "Trade-show kit for a manufacturer", "Manufacturing",
    "Stand graphics, brochures, and handouts designed as one set and prepared to the printer's specification.",
    ["Stand graphics", "Product brochure", "Handouts", "Print-ready files"]),

  sample("package-design", 1, VIOLET, "Snack range packaging", "Food & beverage",
    "A pouch system for a range of flavours: easy to tell apart on the shelf, and unmistakably one brand.",
    ["Range system", "Pouch artwork", "Print-ready dielines", "3D mockups"]),
  sample("package-design", 2, VIOLET, "Skincare cartons and labels", "Beauty",
    "Cartons and bottle labels with the regulatory detail set out legibly, and finishes specified for the printer.",
    ["Carton artwork", "Bottle labels", "Finish specification", "Printer proofs"]),

  sample("brand-design", 1, VIOLET, "Identity for a new café chain", "Hospitality",
    "A logo suite, palette, and type system, with guidelines written so the next shopfitter or printer can apply them correctly.",
    ["Logo suite", "Colour & type", "Brand guidelines", "Menu & signage"]),
  sample("brand-design", 2, VIOLET, "Rebrand for an engineering firm", "Engineering",
    "An existing mark refined rather than replaced, with a fuller identity system built around it.",
    ["Logo refresh", "Identity system", "Stationery", "Presentation templates"]),

  sample("video-editing", 1, VIOLET, "Product demo for a software launch", "Software",
    "A demo cut from screen recordings and motion graphics, structured to explain the product in its opening seconds.",
    ["Script & structure", "Screen capture edit", "Motion graphics", "Captions"]),
  sample("video-editing", 2, VIOLET, "Short-form series for a fitness studio", "Fitness",
    "A batch of vertical cuts from one shoot, captioned and exported for each platform.",
    ["Vertical edits", "Captions", "Colour & sound", "Multi-format exports"]),
];

/** Everything filed under one service on /projects: real work first, then any placeholders. */
export function entriesFor(service: string): PortfolioEntry[] {
  return [
    ...PROJECTS.filter((p) => p.service === service),
    ...SAMPLE_PROJECTS.filter((p) => p.service === service),
  ];
}
