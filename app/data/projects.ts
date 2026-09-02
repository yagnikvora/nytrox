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
 * client shares verified numbers, add them then — with their sign-off.
 *
 * `preview` points at a capture of the client's homepage in public/previews,
 * taken at 1280x800. These are snapshots of someone else's live site, so they
 * drift: re-shoot a card's preview whenever that client redesigns, and shoot a
 * new one at the same size before adding an entry here.
 */

export type Project = {
  slug: string;
  /** Business name, as written on the live site. */
  title: string;
  /** Sector, shown as the card's chip. */
  category: string;
  /** Where the client operates. */
  location: string;
  /** The live site. */
  url: string;
  summary: string;
  /** What the build includes — all of it observable on the live site. */
  highlights: string[];
  /** Tailwind gradient stops framing the cover panel. */
  cover: string;
  /** RGB triplet driving the card's accent glow; keeps step with `cover`. */
  accent: string;
  /** 1280x800 homepage capture under public/previews. */
  preview: string;
};

/** Domain shown under the title — derived so the URL stays the only source. */
export function domainOf(url: string): string {
  return new URL(url).host.replace(/^www\./, "");
}

export const PROJECTS: Project[] = [
  {
    slug: "isha-hospital",
    title: "Isha Hospital",
    category: "Healthcare",
    location: "Rajkot, India",
    url: "https://ishahospitals.com/",
    summary:
      "A multi-speciality clinic covering cardiac, pulmonary, liver, renal, neuro, and haematology care. The site keeps consulting hours, the doctors' credentials, and the emergency number within reach of every section.",
    highlights: ["Doctor profiles", "Consulting hours", "Care-journey walkthrough", "FAQ & enquiry"],
    cover: "from-cyan-400 via-blue-500 to-indigo-600",
    accent: "34 211 238",
    preview: "/previews/isha-hospital.jpg",
  },
  {
    slug: "samrat-security-force",
    title: "Samrat Security Force",
    category: "Security Services",
    location: "Rajkot, India",
    url: "https://samratsecurityforce.com/",
    summary:
      "Manned guarding, event and corporate security, CCTV and access control, plus a housekeeping arm — each service broken out on its own, with the client roster, certifications, and team gallery doing the trust-building.",
    highlights: ["Six service lines", "Client roster", "Certification slider", "Blog & FAQ"],
    cover: "from-indigo-400 via-violet-500 to-violet-700",
    accent: "139 92 246",
    preview: "/previews/samrat-security-force.jpg",
  },
  {
    slug: "careforu-rehab",
    title: "CareForU Rehab",
    category: "Healthcare",
    location: "Mississauga, Canada",
    url: "https://www.careforurehab.ca/",
    summary:
      "A five-discipline rehab clinic — physiotherapy, chiropractic, massage, acupuncture, naturopathy. Eighteen-plus conditions are listed by name, so patients can find their own before they book.",
    highlights: ["Appointment booking", "Conditions treated", "Service enquiry form", "Products & orthotics"],
    cover: "from-sky-400 via-cyan-500 to-blue-600",
    accent: "56 189 248",
    preview: "/previews/careforu-rehab.jpg",
  },
  {
    slug: "param-web-designs",
    title: "Param Web Designs",
    category: "Design Agency",
    location: "Rajkot, India",
    url: "https://www.paramwebdesigns.com/",
    summary:
      "An agency site that has to carry its own portfolio: service pages running fifteen deep, a project showcase linking out to live client work, and a 360° walk-through of the studio.",
    highlights: ["Portfolio showcase", "Service catalogue", "360° studio tour", "Enquiry form"],
    cover: "from-fuchsia-500 via-purple-500 to-indigo-600",
    accent: "217 70 239",
    preview: "/previews/param-web-designs.jpg",
  },
  {
    slug: "shree-hari-metacast",
    title: "Shree Hari Metacast",
    category: "Manufacturing",
    location: "Rajkot, India",
    url: "https://www.shreeharimetacast.com/",
    summary:
      "Precision castings in grey iron, ductile iron, and mild steel. A thirty-plus piece product gallery, the material specifications buyers actually ask for, and an export map covering eight countries.",
    highlights: ["Product gallery", "Material specifications", "Global export map", "Quote request"],
    cover: "from-violet-500 via-indigo-500 to-indigo-700",
    accent: "99 102 241",
    preview: "/previews/shree-hari-metacast.jpg",
  },
  {
    slug: "vp-global-exim",
    title: "VP Global Exim",
    category: "Export & Trade",
    location: "Gondal, India",
    url: "https://www.vpglobalexim.com/",
    summary:
      "A merchant exporter's catalogue across nine categories — apparel, engineering components, tiles, sanitary ware and more — with an enquiry form that captures country, product, and quantity in a single pass.",
    highlights: ["Nine product categories", "Engineering solutions", "Export markets map", "Quote enquiry form"],
    cover: "from-pink-500 via-fuchsia-500 to-violet-600",
    accent: "236 72 153",
    preview: "/previews/vp-global-exim.jpg",
  },
  {
    slug: "hitesh-mobile",
    title: "Hitesh Mobile",
    category: "Retail",
    location: "Rajkot, India",
    url: "https://www.hiteshmobile.in/",
    summary:
      "A pre-owned phone store's live stock, online — mobiles, watches, and audio listed with condition grade, battery health, and the saving against retail, with WhatsApp standing in for a checkout.",
    highlights: ["Live stock catalogue", "Condition & battery grading", "Category browsing", "WhatsApp enquiry"],
    cover: "from-violet-400 via-fuchsia-500 to-pink-500",
    accent: "168 85 247",
    preview: "/previews/hitesh-mobile.jpg",
  },
];
