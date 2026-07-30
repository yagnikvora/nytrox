import Link from "next/link";
import Navbar from "./components/Navbar";
import SpaceBackground from "./components/SpaceBackground";
import Reveal from "./components/Reveal";
import CursorFX from "./components/CursorFX";
import HeroVideo from "./components/HeroVideo";
import RotatingWords from "./components/RotatingWords";
import AvatarStack from "./components/AvatarStack";
import PixelCard from "./components/PixelCard";
import ShinyText from "./components/ShinyText";
import StarBorder from "./components/StarBorder";
import SectionKicker from "./components/SectionKicker";
import StatsBand from "./components/StatsBand";
import TestimonialRail from "./components/TestimonialRail";
import SplitText from "./components/SplitText";
import Magnet from "./components/Magnet";
import LogoLoop from "./components/LogoLoop";
import CtaBand from "./components/CtaBand";
import Footer from "./components/Footer";
import { SERVICES, HOME_SERVICE_COUNT } from "./data/services";
import { STACK } from "./data/stack";

/* ---------------------------------------------------------------------------
   Content
--------------------------------------------------------------------------- */
const PROCESS = [
  { step: "01", title: "Ideate", desc: "Requirement discovery & product strategy" },
  { step: "02", title: "Design", desc: "Wireframes, UI systems & prototypes" },
  { step: "03", title: "Develop", desc: "Clean, scalable engineering" },
  { step: "04", title: "Test", desc: "QA, automation & hardening" },
  { step: "05", title: "Deploy", desc: "Launch to production, at scale" },
  { step: "06", title: "Maintain", desc: "Monitoring, support & iteration" },
];

/* ---------------------------------------------------------------------------
   Page
--------------------------------------------------------------------------- */
export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-clip">
      <CursorFX />
      <SpaceBackground />

      <Navbar />

      {/* Normal, native document scroll. pt clears the fixed navbar. */}
      <main className="pt-20">
        <Hero />
        <Services />
        <Stats />
        <Stack />
        <Process />
        <Testimonials />
        <div id="contact-panel">
          <CtaBand />
          <Footer />
        </div>
      </main>
    </div>
  );
}

/* ------------------------------- Hero ----------------------------------- */
function Hero() {
  return (
    <section id="home" className="relative mx-auto max-w-7xl px-6 py-10">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-8">
        {/* Copy */}
        <div>
          {/* Label */}
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.8)]" />
              <ShinyText
                text="Software studio for the next frontier"
                speed={4}
                color="#8b8fb8"
                shineColor="#ffffff"
              />
            </span>
          </Reveal>

          <Reveal delay={80}>
            {/* Three lines by construction. The lg size is fluid because the copy
                column is only ~400–511px wide — a fixed size that fits line one at
                1440 wraps it into two lines at the lg breakpoint. */}
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[clamp(2.25rem,3.35vw,2.9rem)]">
              <SplitText text="We build software that" className="block" delay={22} />
              <span className="mt-1 block">
                <RotatingWords
                  words={["launches brands", "scales startups", "ships products", "elevates teams"]}
                  interval={2800}
                  className="text-gradient"
                />
              </span>
              <span className="block">into orbit</span>
            </h1>
          </Reveal>

          {/* Details */}
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-7 text-ink-muted sm:text-lg">
              Nytrox designs and engineers mobile apps, web platforms, and digital
              products end-to-end. From the first spark of an idea to launch and
              beyond — we make ambitious ideas take flight.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnet className="w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_44px_-10px_rgba(139,92,246,0.95)] transition-transform hover:scale-[1.03] sm:w-auto"
                >
                  Book a Consultation
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </Magnet>
              <StarBorder
                as={Link}
                href="/services"
                color="#a78bfa"
                speed="5s"
                className="text-sm font-semibold"
              >
                Explore our Services
              </StarBorder>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 flex items-center gap-3.5">
              {/* The +46 chip closes out the "50+" in the line beside it */}
              <AvatarStack overflow="+46" />
              <p className="text-sm text-ink-muted">
                Trusted by <span className="font-semibold text-white">50+ teams</span> across the galaxy
              </p>
            </div>
          </Reveal>
        </div>

        {/* Hero video — sits below the copy on small screens, beside it on large */}
        <Reveal delay={200} className="relative">
          <HeroVideo />
        </Reveal>
      </div>
    </section>
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
        {SERVICES.slice(0, HOME_SERVICE_COUNT).map((s, i) => (
          <Reveal as="div" key={s.slug} delay={i * 70}>
            <Link href={`/services#${s.slug}`} className="block h-full">
              <PixelCard
                variant="cosmic"
                className="card-glow glass group h-full rounded-2xl p-6"
              >
                {/* Icon tile picks up the card's hover: lifts with it, warms from
                    a faint wash to a lit violet/cyan, and throws a soft glow. */}
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-violet-200 shadow-[0_0_0_0_rgba(139,92,246,0)] ring-1 ring-white/10 transition-[translate,scale,box-shadow,color,--tw-gradient-from,--tw-gradient-to] duration-[350ms] ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.08] group-hover:from-violet-500/45 group-hover:to-cyan-400/45 group-hover:text-white group-hover:shadow-[0_10px_28px_-10px_rgba(139,92,246,0.9)] group-hover:ring-violet-400/45">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-transform duration-[350ms] ease-out group-hover:scale-110"
                    aria-hidden
                  >
                    {s.icon}
                  </svg>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted transition-colors duration-300 group-hover:text-ink">
                  {s.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-violet-300 opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </PixelCard>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* View more → Services page */}
      <Reveal delay={120} className="mt-12 flex justify-center">
        <Link
          href="/services"
          className="glass group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          View more services
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </Reveal>
    </section>
  );
}

/* -------------------------------- Stats --------------------------------- */
function Stats() {
  return (
    <section id="stats" className="mx-auto max-w-7xl px-6 py-10">
      <StatsBand />
    </section>
  );
}

/* -------------------------------- Stack --------------------------------- */
function Stack() {
  return (
    <section className="py-12">
      <Reveal className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
          The stack we build on
        </p>
      </Reveal>
      <Reveal className="mt-7">
        <LogoLoop items={STACK} speed={46} />
      </Reveal>
    </section>
  );
}

/* ------------------------------- Process -------------------------------- */
function Process() {
  return (
    <section id="process" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16">
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
    <section id="testimonials" className="scroll-mt-24 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionKicker>Signals from clients</SectionKicker>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Loved across the system
          </h2>
        </Reveal>
      </div>

      <Reveal className="mt-14">
        <TestimonialRail />
      </Reveal>
    </section>
  );
}
