/**
 * Contact details and form options.
 *
 * NOTE: the phone number and studio address below are placeholders (the +1 555
 * prefix is reserved for fiction) — swap them for the real details before this
 * goes live.
 */

export const CONTACT_EMAIL = "hello@nytrox.com";
export const CONTACT_PHONE = "+1 (555) 018-2049";
export const CONTACT_PHONE_HREF = "tel:+15550182049";
export const CONTACT_ADDRESS = "Ahmedabad, Gujarat, India";

export type Channel = {
  label: string;
  value: string;
  hint: string;
  /** Omitted for channels that aren't links (e.g. response time). */
  href?: string;
  icon: string;
};

export const CHANNELS: Channel[] = [
  {
    label: "Email us",
    value: CONTACT_EMAIL,
    hint: "Best for briefs, proposals, and quotes",
    href: `mailto:${CONTACT_EMAIL}`,
    icon: "M3 6.5A2.5 2.5 0 015.5 4h13A2.5 2.5 0 0121 6.5v11a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 17.5v-11zm1.8-.2l7.2 5.4 7.2-5.4",
  },
  {
    label: "Call us",
    value: CONTACT_PHONE,
    hint: "Mon–Fri, 10:00 – 19:00 IST",
    href: CONTACT_PHONE_HREF,
    icon: "M6.5 3.5h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2.2 2A17 17 0 014.5 5.7 2 2 0 016.5 3.5z",
  },
  {
    label: "Studio",
    value: CONTACT_ADDRESS,
    hint: "Remote-first, working across time zones",
    icon: "M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11zm0-8.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z",
  },
  {
    label: "Response time",
    value: "Within 1 business day",
    hint: "Every enquiry gets a human reply",
    icon: "M12 21a9 9 0 110-18 9 9 0 010 18zm.8-13.5h-1.6v5.2l4.1 2.5.8-1.4-3.3-2z",
  },
];

export type Social = {
  label: string;
  /** SVG path for a 24x24 viewBox. */
  d: string;
  /**
   * Profile URL. Leave it empty and the icon is not rendered at all — the
   * footer and the contact page both skip it rather than shipping a link that
   * goes nowhere. Fill these in and both places light up at once.
   */
  href: string;
};

/**
 * Social accounts, shared by the footer and the contact page — they used to be
 * two separate hardcoded lists, both pointing at href="#", which meant six
 * links on every page that scrolled the visitor back to the top and did
 * nothing else.
 *
 * TODO(nytrox): add the real profile URLs. Until then these render as nothing,
 * which is the honest state — an icon that does nothing when tapped reads as a
 * broken site, and on a phone there is no hover to hint otherwise.
 */
export const SOCIALS: Social[] = [
  {
    label: "Facebook",
    href: "",
    d: "M22 12a10 10 0 10-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6v1.9h2.7l-.4 2.9h-2.3v7A10 10 0 0022 12z",
  },
  {
    label: "X",
    href: "",
    d: "M18.9 5H21l-6.6 7.5L22 21h-6l-4.7-5.7L5.8 21H3.7l7-8L2 5h6.2l4.2 5.2L18.9 5z",
  },
  {
    label: "LinkedIn",
    href: "",
    d: "M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6H10v-9h4v1.5A4 4 0 0116 8zM6 9H2v11h4V9zM4 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5z",
  },
];

/** Budget bands offered in the enquiry form. */
export const BUDGETS = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
  "Not sure yet",
];

/** Set after the form is submitted so the sender knows what happens next. */
export const NEXT_STEPS = [
  {
    step: "01",
    title: "We read it properly",
    desc: "A real person reviews your brief within one business day — no auto-responder loops.",
  },
  {
    step: "02",
    title: "A 30-minute call",
    desc: "We dig into goals, scope, and constraints to see whether we're the right fit for the mission.",
  },
  {
    step: "03",
    title: "Proposal & roadmap",
    desc: "You get a written scope, timeline, and cost — clear enough to decide without a second meeting.",
  },
];

export const FAQS = [
  {
    q: "How quickly can you start?",
    a: "Most engagements kick off within two to three weeks of signing. If your timeline is tighter, say so in your message — we keep some capacity for urgent work.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Often. We've taken products from a blank page to launch, and we can scope an MVP that proves the idea before you commit to the full build.",
  },
  {
    q: "What does a project typically cost?",
    a: "It depends on scope, but most builds land between $25k and $100k. Pick a band in the form and we'll tell you honestly what's achievable within it.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Yes. We start with an audit of the current code, infrastructure, and backlog, then propose a plan to stabilise it before shipping anything new.",
  },
  {
    q: "Who owns the work you deliver?",
    a: "You do — code, designs, and assets transfer to you in full, along with documentation and a handover session for your team.",
  },
];
