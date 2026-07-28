/**
 * About-page content.
 *
 * NOTE: the MILESTONES below are a plausible draft history inferred from the
 * "5+ years" figure the site already claims — dates and events are NOT verified.
 * Replace them with the studio's real timeline before publishing. The same goes
 * for the DISCIPLINES blurbs, which describe how the team is organised.
 */

export const STORY = [
  "Nytrox started with a stubborn belief: most software fails long before it fails technically. It fails when nobody agrees what's being built, when design and engineering work from different maps, and when the people who ship it stop caring the day it goes live.",
  "So we built the studio we wanted to hire — one team that carries a product from the first messy conversation through design, engineering, testing, launch, and the unglamorous years afterwards. No handoffs between agencies, no finger-pointing, no translating your product vision three times.",
  "Today that team ships mobile apps, web platforms, and design systems for founders and product leaders who need work that holds up under real users. The brief changes every time. The standard doesn't.",
];

/** Short claims that sit beside the story as a quick scan. */
export const STORY_FACTS = [
  { label: "Founded", value: "2021" },
  { label: "Model", value: "Remote-first" },
  { label: "Engagements", value: "Project & retainer" },
  { label: "Handover", value: "Full IP, always" },
];

export type Value = {
  title: string;
  desc: string;
  icon: string;
};

export const VALUES: Value[] = [
  {
    title: "Craft over shortcuts",
    desc: "We build things properly the first time. Speed comes from clear decisions, not from skipping the parts that are hard to see.",
    icon: "M12 3l2.4 5.4 5.6.6-4.2 3.9 1.2 5.6L12 15.7 6.9 18.5l1.2-5.6L4 9l5.6-.6L12 3z",
  },
  {
    title: "Transparency by default",
    desc: "Working software at the end of every sprint, honest status when something slips, and costs you can see coming.",
    icon: "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12zm9.5 2.8a2.8 2.8 0 100-5.6 2.8 2.8 0 000 5.6z",
  },
  {
    title: "One team, end to end",
    desc: "Strategy, design, engineering, and QA sit together. Nothing gets lost in a handoff between three different vendors.",
    icon: "M8.5 11a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zm8 1a2.7 2.7 0 100-5.4 2.7 2.7 0 000 5.4zM2.5 19.5c0-3 2.7-5 6-5s6 2 6 5m2-5.2c2.5.4 4 2.2 4 4.7",
  },
  {
    title: "Built to hand over",
    desc: "Clean architecture, real documentation, and a walkthrough for your team. You own everything we make — no lock-in.",
    icon: "M4 7.5A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v9a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 16.5v-9zm4 3h8m-8 3.5h5",
  },
  {
    title: "Momentum over meetings",
    desc: "Short feedback loops beat long status calls. We'd rather show you something running than describe it on a slide.",
    icon: "M13 2.5L4.5 13.5H11l-1 8 8.5-11H12l1-7.5z",
  },
  {
    title: "Outcomes, not output",
    desc: "Shipping isn't the goal — the number that moves afterwards is. We measure ourselves on what your product actually does.",
    icon: "M12 21a9 9 0 110-18 9 9 0 010 18zm0-4.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm0-3.3a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z",
  },
];

export type Discipline = {
  name: string;
  desc: string;
  focus: string[];
};

/** We describe the crew by discipline rather than by named profiles. */
export const DISCIPLINES: Discipline[] = [
  {
    name: "Engineering",
    desc: "Mobile and web engineers who care about the shape of the codebase as much as the shape of the release.",
    focus: ["iOS & Android", "React & Next.js", "APIs & infrastructure"],
  },
  {
    name: "Design",
    desc: "Product designers working from research and flows outward, building systems rather than one-off screens.",
    focus: ["Research", "UI & design systems", "Prototyping"],
  },
  {
    name: "Quality",
    desc: "QA engineers who automate the boring checks so the team can spend its attention on the interesting failures.",
    focus: ["Automation", "Device coverage", "Performance"],
  },
  {
    name: "Delivery",
    desc: "Product leads who keep scope honest, decisions moving, and everyone pointed at the same version of done.",
    focus: ["Roadmaps", "Sprint cadence", "Client comms"],
  },
];

export type Milestone = {
  year: string;
  title: string;
  desc: string;
};

export const MILESTONES: Milestone[] = [
  {
    year: "2021",
    title: "The studio opens",
    desc: "Nytrox starts out taking on web builds for small teams who needed more care than a template could offer.",
  },
  {
    year: "2022",
    title: "Mobile joins the stack",
    desc: "Our first native apps ship, and the studio grows into full product engagements rather than one-off builds.",
  },
  {
    year: "2023",
    title: "Design becomes a practice",
    desc: "A dedicated design team forms, and design systems become part of how every project is delivered.",
  },
  {
    year: "2024",
    title: "Quality gets automated",
    desc: "Automated testing and CI pipelines become standard on every engagement, not an optional extra.",
  },
  {
    year: "2025",
    title: "100 projects delivered",
    desc: "The hundredth product ships, across eight industries — and long-term support becomes a service in its own right.",
  },
  {
    year: "Today",
    title: "Still building",
    desc: "A remote-first crew shipping mobile, web, and design work for founders and product teams worldwide.",
  },
];
