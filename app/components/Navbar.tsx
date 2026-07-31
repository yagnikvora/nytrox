"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoMark from "./Logo";
import GooeyNav from "./GooeyNav";
import GradientText from "./GradientText";

/* Root-relative hrefs so the same bar works from any route, not just "/". */
const NAV = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* Highlight the entry matching the current route (home otherwise). */
  const activeIndex = Math.max(
    NAV.findIndex((item) => item.href === pathname),
    0
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* overflow-hidden clips the gooey effect's black backdrop to the bar
            so it can't spill onto the page content below; the solid-ish dark
            fill gives the metaballs a surface and masks content scrolling
            underneath. */}
        <nav
          className={`mt-3 flex items-center justify-between overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-300 px-4 py-2.5 ${
            scrolled
              ? "bg-[#05050f]/90 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]"
              : "bg-[#05050f]/70"
          }`}
        >
          {/* Logo */}
          <Link href="/#home" className="flex items-center gap-2.5">
            <LogoMark />
            <GradientText
              inline
              className="font-display text-lg font-bold tracking-tight"
            >
              Nytrox
            </GradientText>
          </Link>

          {/* Desktop menu — gooey nav */}
          <div className="hidden text-sm font-medium md:block">
            <GooeyNav
              key={pathname}
              items={NAV}
              particleCount={12}
              particleDistances={[55, 8]}
              initialActiveIndex={activeIndex}
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <Link
              href="/contact"
              className="btn-gradient hidden rounded-lg px-4 py-2 text-sm font-semibold shadow-[0_0_30px_-8px_rgba(178,86,255,0.9)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_38px_-6px_rgba(255,159,252,0.9)] sm:block"
            >
              Book a Demo
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="ml-1 grid h-9 w-9 place-items-center rounded-lg text-white/80 hover:bg-white/10 md:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="glass mt-2 rounded-2xl p-3 md:hidden">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-gradient mt-2 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold"
            >
              Book a Demo
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
