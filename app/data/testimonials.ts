/** Client testimonials shown in the scrollable rail on the home page. */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  /** Tailwind gradient stops for the avatar chip. */
  from: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Nytrox rebuilt our platform from the ground up and shipped weeks ahead of schedule. The craft is on another planet.",
    name: "Aarav Mehta",
    role: "CTO, FinOrbit",
    initials: "AM",
    from: "from-violet-500 to-indigo-500",
  },
  {
    quote:
      "Their design team gave our app a personality. Engagement jumped 40% within the first month of launch.",
    name: "Sofia Reyes",
    role: "Head of Product, LunaCart",
    initials: "SR",
    from: "from-cyan-400 to-blue-500",
  },
  {
    quote:
      "Reliable, transparent, and genuinely invested in outcomes. It feels like an extension of our own team.",
    name: "Daniel Cho",
    role: "Founder, MediSpace",
    initials: "DC",
    from: "from-pink-500 to-violet-500",
  },
  {
    quote:
      "From roadmap to release, everything was structured and calm. Best engineering partner we've worked with.",
    name: "Priya Nair",
    role: "VP Engineering, Nova Bank",
    initials: "PN",
    from: "from-indigo-500 to-cyan-400",
  },
  {
    quote:
      "They obsess over the details most agencies skip. The result speaks for itself — pixel-perfect and fast.",
    name: "Marcus Bell",
    role: "CEO, Feastly",
    initials: "MB",
    from: "from-fuchsia-500 to-purple-500",
  },
  {
    quote:
      "We came in with a rough idea and left with a shipped product. The discovery phase alone was worth the engagement.",
    name: "Hannah Weiss",
    role: "Co-founder, Atlas Freight",
    initials: "HW",
    from: "from-sky-400 to-indigo-500",
  },
  {
    quote:
      "Our checkout was losing customers for years. Six weeks with Nytrox and conversion is up 27% — measured, not guessed.",
    name: "Rohan Desai",
    role: "Director of Growth, Vellum",
    initials: "RD",
    from: "from-violet-500 to-fuchsia-500",
  },
  {
    quote:
      "Handover was flawless. Clean code, real documentation, and our in-house team was productive on day one.",
    name: "Elena Petrova",
    role: "Head of Engineering, Cerula Health",
    initials: "EP",
    from: "from-cyan-400 to-violet-500",
  },
];
