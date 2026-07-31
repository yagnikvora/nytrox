"use client";

import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import type { Project } from "../data/projects";
import GradientText from "./GradientText";
import MaskedHeading from "./MaskedHeading";
import SectionKicker from "./SectionKicker";

/** Card width in px. The gap between cards is the `gap-6` class below. */
const CARD = 360;

/** Soft falloff at both ends of the rail. */
const EDGE_FADE =
  "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)";

/**
 * Selected work as a pinned horizontal rail: the section holds still for one
 * screen-height per card while your vertical scroll drives the cards sideways
 * past a fixed frame — the page reads like a reel instead of a grid.
 *
 * The pin only engages on wide, fine-pointer screens with motion allowed.
 * Everywhere else the same cards render as a native swipe rail, which is what a
 * phone wants anyway.
 */
export default function HorizontalShowcase({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const reduce = usePrefersReducedMotion();

  const [pinned, setPinned] = useState(false);
  /** Px the track must travel for its last card to land inside the frame. */
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const decide = () => setPinned(mq.matches && !reduce);
    decide();
    mq.addEventListener("change", decide);
    return () => mq.removeEventListener("change", decide);
  }, [reduce]);

  // Track width is content-driven (cards + padding), so measure rather than
  // compute: a font swap or a wrapped tag row changes it.
  useEffect(() => {
    // Only the pinned branch reads `travel`, so there's nothing to reset here —
    // it gets re-measured whenever the pin engages.
    if (!pinned) return;
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      setTravel(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned, projects.length]);

  // 0 as the pin engages (section top at viewport top), 1 as it releases.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.0005,
  });
  const x = useTransform(p, [0, 1], [0, -travel]);

  const header = (
    <div className="mx-auto flex w-full max-w-7xl flex-wrap items-end justify-between gap-6 px-6">
      <div>
        <SectionKicker>Selected work</SectionKicker>
        <MaskedHeading
          text="Products we put into orbit"
          accent="into orbit"
          className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
        />
      </div>
      <Link
        href="/projects"
        className="group inline-flex items-center gap-2 text-sm font-semibold text-violet-300 transition-colors hover:text-white"
      >
        <GradientText inline>All {projects.length} case studies</GradientText>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="transition-transform group-hover:translate-x-0.5"
          aria-hidden
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );

  /* ------------------------- swipe rail (fallback) ---------------------- */
  if (!pinned) {
    return (
      // The ref stays attached here too: `useScroll` above runs either way and
      // warns if its target was never mounted.
      <section id="work" ref={sectionRef} className="scroll-mt-24 py-16">
        {header}
        <div className="relative mt-10">
          <ul
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4"
            data-smooth-ignore
          >
            {projects.map((project) => (
              <li
                key={project.slug}
                className="w-[85vw] shrink-0 snap-center sm:w-[360px]"
              >
                <RailCard project={project} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  /* ---------------------------- pinned rail ---------------------------- */
  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative scroll-mt-24"
      // One screen for the pin, plus however far the rail has to travel.
      style={{ height: `calc(100vh + ${travel}px)` }}
    >
      {/* pt clears the fixed navbar — the frame is centred inside what's left */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pb-14 pt-28">
        {header}

        <div
          className="relative mt-8"
          // cards fade out at both edges instead of clipping mid-card — same
          // treatment as the logo and testimonial rails
          style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
        >
          <motion.ul
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-6 px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
          >
            {projects.map((project) => (
              <li key={project.slug} style={{ width: CARD }} className="shrink-0">
                <RailCard project={project} />
              </li>
            ))}
          </motion.ul>
        </div>

        {/* rail progress */}
        <div className="mx-auto mt-8 w-full max-w-7xl px-6">
          <div className="h-px w-full bg-white/10">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-violet-400 to-cyan-300"
              style={{ scaleX: p }}
            />
          </div>
          <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-ink-muted">
            Keep scrolling
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- the card ------------------------------- */
function RailCard({ project: p }: { project: Project }) {
  return (
    <Link href={`/projects#${p.slug}`} className="block h-full">
      <article className="card-glow glass group flex h-full flex-col overflow-hidden rounded-2xl p-5">
        <div
          className={`relative grid h-36 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br ${p.cover}`}
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_55%)]" />
          <span className="relative font-display text-4xl font-bold tracking-tight text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-110">
            {p.monogram}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs font-medium">
          <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-violet-200 ring-1 ring-white/10">
            {p.category}
          </span>
          <span className="text-ink-muted">{p.year}</span>
        </div>

        <h3 className="mt-3 font-display text-lg font-semibold text-white">
          {p.title}
        </h3>
        <p className="text-sm font-medium text-violet-300">{p.client}</p>
        <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-ink-muted">
          {p.summary}
        </p>

        <dl className="mt-auto grid grid-cols-2 gap-2.5 pt-5">
          {p.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl bg-white/[0.03] p-3 ring-1 ring-white/10"
            >
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="font-display text-xl font-bold text-white">
                  {m.value}
                  {m.suffix}
                </span>
                <span className="mt-0.5 block text-[11px] leading-4 text-ink-muted">
                  {m.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </article>
    </Link>
  );
}
