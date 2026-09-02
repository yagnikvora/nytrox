import Link from "next/link";
import GradientText from "./GradientText";
import Reveal from "./Reveal";

/** Closing call-to-action band, shared by every page. */
export default function CtaBand() {
  return (
    <section id="contact" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-violet-600/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-cyan-500/25 blur-3xl" />
          <h2 className="relative font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to launch your{" "}
            <GradientText inline>next product</GradientText>?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-ink-muted">
            Book a free consultation and let&apos;s map the journey from idea to
            liftoff — no strings attached.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="btn-gradient inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold transition-transform duration-300 ease-out hover:-translate-y-0.5"
            >
              Book a Consultation
            </Link>
            <Link
              href="mailto:hello@nytrox.com"
              className="glass inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <GradientText inline>hello@nytrox.com</GradientText>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
