import Link from "next/link";
import LogoMark from "./components/Logo";
import Navbar from "./components/Navbar";
import SpaceBackground from "./components/SpaceBackground";
import ScrollDeck from "./components/ScrollDeck";
import Reveal from "./components/Reveal";
import CursorFX from "./components/CursorFX";

/* ---------------------------------------------------------------------------
   Content
--------------------------------------------------------------------------- */
const SERVICES = [
  {
    title: "Mobile App Development",
    desc: "Native and cross-platform apps built for speed, scale, and delight — from concept to the App Store.",
    icon: (
      <>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10.5 18.5h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Web Development",
    desc: "Blazing-fast web platforms and dashboards engineered with modern frameworks and rock-solid architecture.",
    icon: (
      <>
        <rect x="2.5" y="4" width="19" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M2.5 8h19M6 21h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "UI/UX Design",
    desc: "Research-driven interfaces and design systems that feel effortless and convert visitors into fans.",
    icon: (
      <>
        <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
  {
    title: "QA & Testing",
    desc: "Automated and manual testing pipelines that ship confidence — fewer bugs, faster releases.",
    icon: (
      <>
        <path d="M9 12.5l2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3l7 2.5v6c0 5-3.5 7.5-7 9.5-3.5-2-7-4.5-7-9.5v-6L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Project Planning",
    desc: "Agile roadmaps, sprint management, and clear communication that keep your mission on schedule.",
    icon: (
      <>
        <rect x="3.5" y="4.5" width="17" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3.5 9h17M8 3v3M16 3v3M8 13h4M8 16.5h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
];

const STATS = [
  { value: "100+", label: "Projects delivered" },
  { value: "8+", label: "Industries served" },
  { value: "5+", label: "Years of experience" },
];

const PROCESS = [
  { step: "01", title: "Ideate", desc: "Requirement discovery & product strategy" },
  { step: "02", title: "Design", desc: "Wireframes, UI systems & prototypes" },
  { step: "03", title: "Develop", desc: "Clean, scalable engineering" },
  { step: "04", title: "Test", desc: "QA, automation & hardening" },
  { step: "05", title: "Deploy", desc: "Launch to production, at scale" },
  { step: "06", title: "Maintain", desc: "Monitoring, support & iteration" },
];

const TESTIMONIALS = [
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
];

/* ---------------------------------------------------------------------------
   Page
--------------------------------------------------------------------------- */
const DECK_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "stats", label: "Impact" },
  { id: "about", label: "Process" },
  { id: "products", label: "Clients" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-clip">
      <CursorFX />
      <SpaceBackground />

      <Navbar />

      <ScrollDeck sections={DECK_SECTIONS}>
        <Hero />
        <Services />
        <Stats />
        <Process />
        <Testimonials />
        <ContactPanel />
      </ScrollDeck>
    </div>
  );
}

/* The final panel bundles the call-to-action with the full footer; in deck
   mode it scrolls internally to reveal the footer, then advances at the edge. */
function ContactPanel() {
  return (
    <div id="contact-panel">
      <CtaBand />
      <Footer />
    </div>
  );
}

/* ------------------------------- Hero ----------------------------------- */
function Hero() {
  return (
    <section id="home" className="relative mx-auto max-w-7xl px-6 py-10">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div>
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.8)]" />
              Software studio for the next frontier
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
              We build software that
              <br className="hidden sm:block" />{" "}
              <span className="text-gradient">launches brands</span> into orbit
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-7 text-ink-muted sm:text-lg">
              Nytrox designs and engineers mobile apps, web platforms, and digital
              products end-to-end. From the first spark of an idea to launch and
              beyond — we make ambitious ideas take flight.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_44px_-10px_rgba(139,92,246,0.95)] transition-transform hover:scale-[1.03]"
              >
                Book a Consultation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="#services"
                className="glass inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                View our Work
              </Link>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 flex items-center gap-6 text-sm text-ink-muted">
              <div className="flex -space-x-2.5">
                {["from-violet-500 to-indigo-500", "from-cyan-400 to-blue-500", "from-pink-500 to-violet-500", "from-indigo-500 to-cyan-400"].map(
                  (g, i) => (
                    <span key={i} className={`h-9 w-9 rounded-full bg-gradient-to-br ${g} ring-2 ring-[#050510]`} />
                  )
                )}
              </div>
              <p>
                Trusted by <span className="font-semibold text-white">50+ teams</span> across the galaxy
              </p>
            </div>
          </Reveal>
        </div>

        {/* Orbit visual */}
        <Reveal delay={200} className="relative hidden lg:block">
          <OrbitVisual />
        </Reveal>
      </div>
    </section>
  );
}

function OrbitVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.35),transparent_62%)] blur-2xl" />

      {/* Rings */}
      <div className="orbit-ring h-[92%] w-[92%] animate-spin-slower">
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_16px_4px_rgba(34,211,238,0.9)]" />
      </div>
      <div className="orbit-ring h-[68%] w-[68%] animate-spin-slow" style={{ animationDirection: "reverse" }}>
        <span className="absolute top-1/2 -right-1.5 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-violet-300 shadow-[0_0_16px_4px_rgba(167,139,250,0.9)]" />
      </div>
      <div className="orbit-ring h-[44%] w-[44%] animate-spin-slower">
        <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-pink-300 shadow-[0_0_14px_4px_rgba(244,114,182,0.9)]" />
      </div>

      {/* Planet core */}
      <div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center animate-float">
        <div className="relative h-full w-full rounded-full bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 shadow-[0_0_70px_-6px_rgba(139,92,246,0.9)]">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.55),transparent_45%)]" />
          <div className="absolute left-1/2 top-1/2 h-[150%] w-[26px] -translate-x-1/2 -translate-y-1/2 -rotate-[24deg] rounded-full border border-white/25" />
        </div>
      </div>

      {/* Floating chips */}
      <div className="glass absolute -left-2 top-6 animate-float-slow rounded-xl px-3 py-2 text-xs font-medium text-white">
        🚀 Shipping v2.0
      </div>
      <div className="glass absolute -right-1 bottom-10 animate-float rounded-xl px-3 py-2 text-xs font-medium text-white" style={{ animationDelay: "1.2s" }}>
        ⚡ 99.9% uptime
      </div>
    </div>
  );
}

/* ------------------------------ Services -------------------------------- */
function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionKicker>What we do</SectionKicker>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Services that go the distance
        </h2>
        <p className="mt-4 text-ink-muted">
          A full-stack studio covering every stage of your product journey — so you
          launch with one team, not five.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal as="div" key={s.title} delay={i * 70}>
            <article className="card-glow glass group h-full rounded-2xl p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-violet-200 ring-1 ring-white/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                  {s.icon}
                </svg>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{s.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-violet-300 opacity-0 transition-opacity group-hover:opacity-100">
                Learn more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </article>
          </Reveal>
        ))}

        {/* CTA tile */}
        <Reveal as="div" delay={SERVICES.length * 70}>
          <Link
            href="#contact"
            className="card-glow flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-violet-600/30 via-indigo-600/20 to-cyan-500/20 p-6 ring-1 ring-white/10"
          >
            <div>
              <h3 className="font-display text-lg font-semibold text-white">Have a mission in mind?</h3>
              <p className="mt-2 text-sm leading-6 text-ink-muted">
                Tell us your goal and we&apos;ll chart the flight path.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
              Start a project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Stats --------------------------------- */
function Stats() {
  return (
    <section id="stats" className="mx-auto max-w-7xl px-6 py-10">
      <Reveal>
        <div className="glass grid grid-cols-1 gap-8 rounded-3xl px-8 py-12 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-violet-300 sm:text-6xl">
                {s.value}
              </div>
              <p className="mt-2 text-sm text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------- Process -------------------------------- */
function Process() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionKicker>Inside our process</SectionKicker>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          From idea to orbit
        </h2>
        <p className="mt-4 text-ink-muted">
          Every product follows a proven lifecycle — transparent at each stage, so
          you always know exactly where your mission stands.
        </p>
      </Reveal>

      <div className="relative mt-16">
        {/* connecting line */}
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3">
          {PROCESS.map((p, i) => (
            <Reveal as="li" key={p.step} delay={i * 70} className="relative">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-cyan-400/20 font-display text-sm font-bold text-white ring-1 ring-white/15 lg:mx-0">
                {p.step}
              </div>
              <h3 className="mt-4 text-center font-display text-base font-semibold text-white lg:text-left">
                {p.title}
              </h3>
              <p className="mt-1.5 text-center text-sm leading-6 text-ink-muted lg:text-left">
                {p.desc}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------- Testimonials ----------------------------- */
function Testimonials() {
  return (
    <section id="products" className="scroll-mt-24 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionKicker>Signals from clients</SectionKicker>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Loved across the system
          </h2>
        </Reveal>
      </div>

      <Reveal>
        <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scroll-padding-left:1.5rem]">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="glass w-[85vw] shrink-0 snap-start rounded-2xl p-7 sm:w-[380px]"
            >
              <div className="flex gap-1 text-cyan-300" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.9 6.26L21.5 9l-4.9 4.35L18 20l-6-3.4L6 20l1.4-6.65L2.5 9l6.6-.74L12 2z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 text-[15px] leading-7 text-ink">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${t.from} text-sm font-semibold text-white`}>
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{t.name}</span>
                  <span className="block text-xs text-ink-muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
          <div className="w-2 shrink-0" aria-hidden />
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------ CTA band -------------------------------- */
function CtaBand() {
  return (
    <section id="contact" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-violet-600/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-cyan-500/25 blur-3xl" />
          <h2 className="relative font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to launch your next product?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-ink-muted">
            Book a free consultation and let&apos;s map the journey from idea to
            liftoff — no strings attached.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="mailto:hello@nytrox.com"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_44px_-10px_rgba(139,92,246,0.95)] transition-transform hover:scale-[1.03]"
            >
              Book a Consultation
            </Link>
            <Link
              href="mailto:hello@nytrox.com"
              className="glass inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              hello@nytrox.com
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------- Footer --------------------------------- */
function Footer() {
  const cols = [
    { title: "Company", links: ["About Us", "Portfolio", "Careers", "Insights"] },
    { title: "Services", links: ["Mobile Apps", "Web Development", "UI/UX Design", "QA & Testing"] },
    { title: "Products", links: ["Mousepads", "Store", "Cart", "Shipping"] },
  ];
  return (
    <footer className="border-t border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark />
              <span className="font-display text-lg font-bold text-white">Nytrox</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-ink-muted">
              A software studio building mobile apps, web platforms, and digital
              products that launch brands into orbit.
            </p>
            <div className="mt-5 flex gap-2.5">
              {["M22 12a10 10 0 10-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6v1.9h2.7l-.4 2.9h-2.3v7A10 10 0 0022 12z", "M18.9 5H21l-6.6 7.5L22 21h-6l-4.7-5.7L5.8 21H3.7l7-8L2 5h6.2l4.2 5.2L18.9 5z", "M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6H10v-9h4v1.5A4 4 0 0116 8zM6 9H2v11h4V9zM4 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"].map(
                (d, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="Social link"
                    className="grid h-9 w-9 place-items-center rounded-lg text-white/60 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d={d} />
                    </svg>
                  </a>
                )
              )}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-sm font-semibold text-white">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-ink-muted transition-colors hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-ink-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Nytrox. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <a href="#" className="transition-colors hover:text-white">Terms</a>
            <a href="mailto:hello@nytrox.com" className="transition-colors hover:text-white">hello@nytrox.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------- Helpers -------------------------------- */
function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
      <span className="h-px w-6 bg-gradient-to-r from-transparent to-violet-400" />
      {children}
      <span className="h-px w-6 bg-gradient-to-l from-transparent to-violet-400" />
    </span>
  );
}
