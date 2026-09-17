import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import SpaceBackground from "../../components/SpaceBackground";
import CursorFX from "../../components/CursorFX";
import Reveal from "../../components/Reveal";
import SectionKicker from "../../components/SectionKicker";
import SpotlightCard from "../../components/SpotlightCard";
import GlareHover from "../../components/GlareHover";
import StarBorder from "../../components/StarBorder";
import GradientText from "../../components/GradientText";
import ProcessTimeline from "../../components/ProcessTimeline";
import CtaBand from "../../components/CtaBand";
import Footer from "../../components/Footer";
import MaskedHeading from "../../components/MaskedHeading";
import ScrollReveal from "../../components/ScrollReveal";
import {
  CATEGORY_SPOTLIGHT,
  SERVICES,
  groupOf,
  relatedServices,
  serviceHref,
} from "../../data/services";

/*
 * One page per entry in SERVICES. The export has no server to render a slug on
 * request, so every page is built up front and anything else is a 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

const findService = (slug: string) => SERVICES.find((s) => s.slug === slug);

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = findService((await params).slug);
  if (!service) return {};
  return {
    title: `${service.title} — Nytrox`,
    description: service.desc,
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = findService((await params).slug);
  if (!service) notFound();

  const group = groupOf(service);
  const spotlight = CATEGORY_SPOTLIGHT[service.category];
  const steps = service.process.map((p, i) => ({
    step: String(i + 1).padStart(2, "0"),
    ...p,
  }));

  return (
    <div className="relative flex min-h-screen flex-col overflow-clip">
      <CursorFX />
      <SpaceBackground />

      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal className="mx-auto max-w-3xl text-center">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-medium text-ink-muted">
                <li>
                  <Link href="/services" className="transition-colors hover:text-white">
                    Services
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <Chevron />
                  <Link href={`/services#${group.id}`} className="transition-colors hover:text-white">
                    {group.title}
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <Chevron />
                  <span aria-current="page" className="text-white">
                    {service.title}
                  </span>
                </li>
              </ol>
            </nav>

            {/* the category accent, lit the way the card icons are on hover */}
            <div data-accent={service.category} className="accent mt-10 flex justify-center">
              <div className="accent-icon grid h-16 w-16 place-items-center rounded-2xl">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
                  {service.icon}
                </svg>
              </div>
            </div>

            <div className="mt-7">
              <SectionKicker>{group.title}</SectionKicker>
            </div>
            <MaskedHeading
              as="h1"
              text={service.title}
              // the last word takes the gradient, like the closing phrase on
              // every other page heading
              accent={service.title.split(" ").at(-1)}
              stagger={60}
              className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            />
            {/* plain text rather than ScrollReveal: this sits at the top of the
                page, where there is too little scroll left to ever sharpen it */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
              {service.desc}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="btn-gradient group inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-transform duration-300 ease-out hover:-translate-y-0.5 sm:w-auto"
              >
                Get Quote
                <Arrow className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <StarBorder
                as={Link}
                href="/services"
                color="#a78bfa"
                speed="5s"
                className="text-sm font-semibold"
              >
                <GradientText inline>All services</GradientText>
              </StarBorder>
            </div>
          </Reveal>
        </section>

        {/* Overview + fit */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <Reveal>
                <SectionKicker>Overview</SectionKicker>
                <MaskedHeading
                  text="What the work involves"
                  accent="involves"
                  className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
                />
              </Reveal>
              <ScrollReveal className="mt-5 text-base leading-8 text-ink-muted sm:text-lg">
                {service.detail}
              </ScrollReveal>
            </div>

            <Reveal delay={120} variant="right">
              <div data-accent={service.category} className="accent">
                <div className="accent-panel glass relative overflow-hidden rounded-2xl p-7 sm:p-8">
                  <h3 className="font-display text-lg font-semibold text-white">
                    Right for you if…
                  </h3>
                  <ul className="mt-6 space-y-5">
                    {service.fit.map((f) => (
                      <li key={f} className="flex gap-3.5">
                        <span className="accent-icon mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path
                              d="M5 12.5l4.2 4.2L19 7"
                              stroke="currentColor"
                              strokeWidth="2.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="text-sm leading-6 text-ink">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Deliverables */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionKicker>What’s included</SectionKicker>
            <MaskedHeading
              text="What you walk away with"
              accent="walk away with"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {service.deliverables.map((d, i) => (
              <Reveal
                as="div"
                key={d.title}
                delay={(i % 2) * 80}
                // the two columns slide in toward each other
                variant={i % 2 === 0 ? "left" : "right"}
                className="h-full"
              >
                <div data-accent={service.category} className="accent h-full">
                  <SpotlightCard
                    className="accent-panel card-glow glass h-full"
                    spotlightColor={spotlight}
                  >
                    {/* padding lives on the glare layer so the sweep spans the whole card */}
                    <GlareHover className="h-full rounded-2xl p-7 sm:p-8">
                      <div className="flex items-center gap-4">
                        <span className="accent-icon grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-sm font-bold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-lg font-semibold text-white">{d.title}</h3>
                      </div>
                      <p className="mt-5 text-sm leading-7 text-ink-muted">{d.desc}</p>
                    </GlareHover>
                  </SpotlightCard>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionKicker>How it runs</SectionKicker>
            <MaskedHeading
              text="Stage by stage, in the open"
              accent="in the open"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
          </Reveal>

          <ProcessTimeline steps={steps} />
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-6 py-16">
          <Reveal className="text-center">
            <SectionKicker>Good questions</SectionKicker>
            <MaskedHeading
              text="Worth asking up front"
              accent="up front"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
          </Reveal>

          <div className="mt-12 flex flex-col gap-3">
            {service.faqs.map((f, i) => (
              <Reveal as="div" key={f.q} delay={i * 60}>
                {/* native <details> → accordion behaviour with no JS */}
                <details className="group glass overflow-hidden rounded-2xl transition-colors hover:bg-white/[0.06]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left font-display text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      className="shrink-0 text-violet-300 transition-transform duration-300 group-open:rotate-45"
                    >
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-6 text-sm leading-7 text-ink-muted">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-10 text-center">
            <p className="text-sm text-ink-muted">
              Something else on your mind?{" "}
              <Link
                href="/contact"
                className="font-medium text-violet-300 transition-colors hover:text-white"
              >
                Ask us directly
              </Link>
              .
            </p>
          </Reveal>
        </section>

        {/* Related services */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionKicker>Pairs well with</SectionKicker>
            <MaskedHeading
              text="Related services"
              accent="services"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices(service).map((s, i) => (
              <Reveal as="div" key={s.slug} delay={i * 70} variant="blur" className="h-full">
                <Link href={serviceHref(s.slug)} data-accent={s.category} className="accent block h-full">
                  <SpotlightCard
                    className="accent-panel card-glow glass h-full"
                    spotlightColor={CATEGORY_SPOTLIGHT[s.category]}
                  >
                    <GlareHover className="flex h-full flex-col rounded-2xl p-6">
                      <div className="accent-icon grid h-12 w-12 place-items-center rounded-xl">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                          {s.icon}
                        </svg>
                      </div>
                      <h3 className="mt-5 font-display text-lg font-semibold text-white">{s.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-muted">{s.desc}</p>
                      {/* mt-auto pins this to the bottom so the row lines up */}
                      <span className="accent-more mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium">
                        Learn more
                        <Arrow size={14} className="transition-transform group-hover/glare:translate-x-0.5" />
                      </span>
                    </GlareHover>
                  </SpotlightCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Back to services */}
        <section className="mx-auto max-w-7xl px-6 pb-4">
          <Reveal className="flex justify-center">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform group-hover:-translate-x-0.5"
                aria-hidden
              >
                <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to all services
            </Link>
          </Reveal>
        </section>

        <CtaBand />
        <Footer />
      </main>
    </div>
  );
}

function Arrow({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white/30" aria-hidden>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
