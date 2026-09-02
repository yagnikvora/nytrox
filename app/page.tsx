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
import LogoLoop from "./components/LogoLoop";
import CtaBand from "./components/CtaBand";
import Footer from "./components/Footer";
import GradientText from "./components/GradientText";
import HorizontalShowcase from "./components/HorizontalShowcase";
import MaskedHeading from "./components/MaskedHeading";
import Parallax from "./components/Parallax";
import ProcessTimeline from "./components/ProcessTimeline";
import ScrollReveal from "./components/ScrollReveal";
import { SERVICES, HOME_SERVICE_COUNT } from "./data/services";
import { STACK } from "./data/stack";
import { PROJECTS } from "./data/projects";

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

      {/* Normal, native document scroll (eased by SmoothScroll on desktop).
          pt clears the fixed navbar. */}
      <main className="pt-20">
        <Hero />
        <Services />
        <HorizontalShowcase projects={PROJECTS} />
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
              {/* Plain hover: a small lift, nothing else. No halo behind the
                  button and no cursor-follow — the glow smeared into the copy
                  beside it, and the follow pulled the button out of the row
                  while you were still reading. */}
              <Link
                href="/contact"
                className="btn-gradient group inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-transform duration-300 ease-out hover:-translate-y-0.5 sm:w-auto"
              >
                Book a Consultation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <StarBorder
                as={Link}
                href="/services"
                color="#a78bfa"
                speed="5s"
                className="text-sm font-semibold"
              >
                <GradientText inline>Explore our Services</GradientText>
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

        {/* Hero video — sits below the copy on small screens, beside it on
            large. The parallax lets it drift a little slower than the page, so
            the hero peels apart as you scroll out of it. */}
        <Reveal delay={200} variant="scale" duration={900} className="relative">
          <Parallax speed={38} zoom={1.03}>
            <HeroVideo />
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Services -------------------------------- */
/**
 * The home tiles alternate two hues card by card — violet, green, violet — so
 * the grid reads as one set. (The /services page keeps the per-category
 * accents, where three families across twelve cards earn their keep.)
 *
 * `name` selects the wrapper accent in globals.css; `pixels` is the matching
 * PixelCard dissolve palette, overriding the cosmic variant's violet→cyan so
 * no third colour creeps into the section.
 */
const HOME_ACCENTS = [
  { name: "violet", pixels: "#c4b5fd,#a78bfa,#8b5cf6" },
  { name: "green", pixels: "#6ee7b7,#34d399,#10b981" },
] as const;

function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionKicker>What we do</SectionKicker>
        <MaskedHeading
          text="Services that go the distance"
          accent="the distance"
          className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
        />
        <ScrollReveal className="mt-4 text-ink-muted">
          A full-stack studio covering every stage of your product journey — so you
          launch with one team, not five.
        </ScrollReveal>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.slice(0, HOME_SERVICE_COUNT).map((s, i) => {
          const accent = HOME_ACCENTS[i % HOME_ACCENTS.length];
          return (
            <Reveal as="div" key={s.slug} delay={i * 70} variant="blur">
              <Link
                href={`/services#${s.slug}`}
                data-accent={accent.name}
                className="accent block h-full"
              >
                <PixelCard
                  variant="cosmic"
                  colors={accent.pixels}
                  className="card-glow glass group h-full rounded-2xl p-6"
                >
                  {/* Icon tile picks up the card's hover: lifts with it, warms
                      from a faint wash to its lit accent, and throws a soft
                      glow. See .accent-icon in globals.css. */}
                  <div className="accent-icon grid h-12 w-12 place-items-center rounded-xl">
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
                  <span className="accent-more mt-5 inline-flex items-center gap-1.5 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </PixelCard>
              </Link>
            </Reveal>
          );
        })}
      </div>

      {/* View more → Services page */}
      <Reveal delay={120} className="mt-12 flex justify-center">
        <Link
          href="/services"
          className="glass group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          <GradientText inline>View all {SERVICES.length} services</GradientText>
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
      <Parallax speed={26}>
        <StatsBand />
      </Parallax>
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
        {/* the rail slides against the page as well as running on its own */}
        <Parallax speed={-18}>
          <LogoLoop items={STACK} speed={46} />
        </Parallax>
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
        <MaskedHeading
          text="From idea to orbit"
          accent="to orbit"
          className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
        />
        <ScrollReveal className="mt-4 text-ink-muted">
          Every product follows a proven lifecycle — transparent at each stage, so
          you always know exactly where your mission stands.
        </ScrollReveal>
      </Reveal>

      {/* The rail draws itself as the section scrolls; each stage lights up as
          the line reaches it. */}
      <ProcessTimeline steps={PROCESS} />
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
          <MaskedHeading
            text="Loved across the system"
            accent="across the system"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          />
        </Reveal>
      </div>

      <Reveal className="mt-14">
        <TestimonialRail />
      </Reveal>
    </section>
  );
}
