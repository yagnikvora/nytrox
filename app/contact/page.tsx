import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import SpaceBackground from "../components/SpaceBackground";
import CursorFX from "../components/CursorFX";
import Reveal from "../components/Reveal";
import SectionKicker from "../components/SectionKicker";
import SpotlightCard from "../components/SpotlightCard";
import GlareHover from "../components/GlareHover";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import { CHANNELS, CONTACT_EMAIL, FAQS, NEXT_STEPS } from "../data/contact";

export const metadata: Metadata = {
  title: "Contact — Nytrox",
  description:
    "Tell us about your product and we'll map the flight path. Every enquiry gets a human reply within one business day.",
};

const SOCIALS = [
  {
    label: "Facebook",
    d: "M22 12a10 10 0 10-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6v1.9h2.7l-.4 2.9h-2.3v7A10 10 0 0022 12z",
  },
  {
    label: "X",
    d: "M18.9 5H21l-6.6 7.5L22 21h-6l-4.7-5.7L5.8 21H3.7l7-8L2 5h6.2l4.2 5.2L18.9 5z",
  },
  {
    label: "LinkedIn",
    d: "M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6H10v-9h4v1.5A4 4 0 0116 8zM6 9H2v11h4V9zM4 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5z",
  },
];

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-clip">
      <CursorFX />
      <SpaceBackground />

      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionKicker>Get in touch</SectionKicker>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl">
              Let&apos;s chart your <span className="text-gradient">flight path</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
              Whether you have a fully-specced brief or a rough idea scribbled on
              a napkin, tell us where you want to go. Every enquiry gets a human
              reply within one business day.
            </p>
          </Reveal>
        </section>

        {/* Channels + form */}
        <section className="mx-auto max-w-7xl px-6 pb-8">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
            {/* Left: ways to reach us. Ordered after the form on small screens
                so the primary action isn't buried under five cards. */}
            <div className="order-2 flex flex-col gap-5 lg:order-1">
              {CHANNELS.map((c, i) => (
                <Reveal as="div" key={c.label} delay={i * 70}>
                  <SpotlightCard className="card-glow glass h-full">
                    {/* padding lives on the glare layer so the sweep spans the whole card */}
                    <GlareHover className="h-full rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-violet-200 ring-1 ring-white/10">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path
                              d={c.icon}
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                            {c.label}
                          </p>
                          {c.href ? (
                            <a
                              href={c.href}
                              className="mt-1.5 block break-words font-display text-lg font-semibold text-white transition-colors hover:text-violet-300"
                            >
                              {c.value}
                            </a>
                          ) : (
                            <p className="mt-1.5 font-display text-lg font-semibold text-white">
                              {c.value}
                            </p>
                          )}
                          <p className="mt-1 text-sm leading-6 text-ink-muted">{c.hint}</p>
                        </div>
                      </div>
                    </GlareHover>
                  </SpotlightCard>
                </Reveal>
              ))}

              {/* Socials */}
              <Reveal as="div" delay={CHANNELS.length * 70}>
                <div className="glass rounded-2xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                    Follow the mission
                  </p>
                  <div className="mt-4 flex gap-2.5">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.label}
                        href="#"
                        aria-label={s.label}
                        className="grid h-10 w-10 place-items-center rounded-lg text-white/60 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d={s.d} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: enquiry form */}
            <Reveal as="div" delay={120} className="order-1 lg:order-2">
              <ContactForm />
            </Reveal>
          </div>
        </section>

        {/* What happens next */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionKicker>What happens next</SectionKicker>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              No black holes, no silence
            </h2>
          </Reveal>

          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {NEXT_STEPS.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 80}>
                <div className="glass h-full rounded-2xl p-7">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-cyan-400/20 font-display text-sm font-bold text-white ring-1 ring-white/15">
                    {s.step}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-6 py-16">
          <Reveal className="text-center">
            <SectionKicker>Before you write</SectionKicker>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Questions we get a lot
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-col gap-3">
            {FAQS.map((f, i) => (
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
              Still unsure?{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-violet-300 transition-colors hover:text-white"
              >
                Email us
              </a>{" "}
              and we&apos;ll point you in the right direction — even if that&apos;s
              somewhere other than us.
            </p>
          </Reveal>
        </section>

        {/* Back to home */}
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <Reveal className="flex justify-center">
            <Link
              href="/"
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
              Back to home
            </Link>
          </Reveal>
        </section>

        <Footer />
      </main>
    </div>
  );
}
