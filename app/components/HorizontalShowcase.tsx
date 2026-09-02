"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { domainOf, type Project } from "../data/projects";
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
        <GradientText inline>All {projects.length} live sites</GradientText>
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
        <div className="relative mt-7">
          {/* Same headroom problem as the pinned rail: overflow-x-auto clips
              the vertical axis too, so pt-3 keeps a hovered card's top edge in
              view. mt-7 + pt-3 leaves the gap the mt-10 gave. */}
          <ul
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 pt-3"
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
          className="relative py-8"
          // cards fade out at both edges instead of clipping mid-card — same
          // treatment as the logo and testimonial rails.
          //
          // The space above and below the cards is padding rather than a margin
          // on purpose: mask-clip is border-box, so nothing outside this box
          // gets painted — with the cards flush to the edge, a card's 6px hover
          // lift sheared its own top border off. The padding puts that slack
          // (and room for the hover glow) inside the masked box; the siblings
          // drop their matching margins, so the layout is unchanged.
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
        <div className="mx-auto w-full max-w-7xl px-6">
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
    <Link
      href={`/projects#${p.slug}`}
      className="accent block h-full"
      style={{ "--accent": p.accent } as CSSProperties}
    >
      <article className="card-glow glass group flex h-full flex-col overflow-hidden rounded-2xl p-5">
        {/* Cover — the top of the live homepage. The rail is pinned inside one
            viewport height, so this stays at h-36 and crops rather than growing
            the card; the full capture is on the /projects page. */}
        <div
          className={`relative h-36 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br ${p.cover}`}
        >
          <Image
            src={p.preview}
            alt={`Homepage of ${p.title}`}
            fill
            sizes="360px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium">
          <span className="accent-chip rounded-full px-2.5 py-1">{p.category}</span>
          <span className="text-ink-muted">{p.location}</span>
        </div>

        <h3 className="mt-3 font-display text-lg font-semibold text-white">
          {p.title}
        </h3>
        <p className="accent-more text-sm font-medium">{domainOf(p.url)}</p>
        <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-ink-muted">
          {p.summary}
        </p>

        {/* mt-auto keeps this on the bottom edge whatever the summary length */}
        <ul className="mt-auto flex flex-wrap gap-2 pt-5">
          {p.highlights.slice(0, 3).map((h) => (
            <li key={h} className="accent-chip rounded-full px-2.5 py-1 text-[11px] font-medium">
              {h}
            </li>
          ))}
        </ul>
      </article>
    </Link>
  );
}
