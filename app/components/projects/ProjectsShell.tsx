import Link from "next/link";
import type { ReactNode } from "react";
import Navbar from "../Navbar";
import SpaceBackground from "../SpaceBackground";
import CursorFX from "../CursorFX";
import Reveal from "../Reveal";
import SectionKicker from "../SectionKicker";
import ShinyText from "../ShinyText";
import CtaBand from "../CtaBand";
import Footer from "../Footer";
import MaskedHeading from "../MaskedHeading";
import ScrollReveal from "../ScrollReveal";
import { PROJECTS } from "../../data/projects";
import { LayoutSwitcher } from "./shared";

/**
 * Everything on /projects that is the same whichever layout is in use: the
 * page chrome, the header, and the close. The layout itself is the children.
 */
export default function ProjectsShell({ layout, children }: { layout: string; children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-clip">
      <CursorFX />
      <SpaceBackground />

      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionKicker>Selected work</SectionKicker>
            <MaskedHeading
              as="h1"
              text="Products we put into orbit"
              accent="into orbit"
              stagger={60}
              className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl"
            />
            <ScrollReveal className="mx-auto mt-6 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
              Work across design, engineering, and growth, filed under the
              service it belongs to. Live projects open the site itself, so you
              can judge the work rather than our write-up.
            </ScrollReveal>
            <span className="glass mt-8 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.8)]" />
              <ShinyText text={`${PROJECTS.length} live sites`} speed={4} color="#8b8fb8" shineColor="#ffffff" />
            </span>
          </Reveal>
        </section>

        {children}

        {/* Back to home */}
        <section className="mx-auto max-w-7xl px-6 pb-4 pt-8">
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

        <CtaBand />
        <Footer />
      </main>

      {/* development only - links to the other layouts being compared */}
      <LayoutSwitcher current={layout} />
    </div>
  );
}
