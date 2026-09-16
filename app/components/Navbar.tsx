"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoLockup } from "./Logo";
import GooeyNav from "./GooeyNav";

/* Root-relative hrefs so the same bar works from any route, not just "/". */
const NAV = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** "/services/", "/services" and "/#home" all reduce to a comparable path. */
const routeOf = (href: string) => {
  const path = href.split("#")[0];
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
};

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  /**
   * The mobile menu is open only while this matches the route it was opened
   * on, so a route change closes it by itself.
   *
   * The links already close it on click, but a back/forward gesture does not
   * go through them and used to leave the panel hanging open over the new
   * page. Deriving it from the pathname rather than clearing it in an effect
   * keeps that fix without a second render pass on every navigation.
   */
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);

  /* Highlight the entry matching the current route (home otherwise).

     `trailingSlash: true` in next.config.ts means usePathname() hands back
     "/services/", while the hrefs above are written "/services" — comparing
     them raw never matched, so every page lit "Home". Both sides are stripped
     to a bare path (and the hash dropped) before they are compared. */
  const activeIndex = Math.max(
    NAV.findIndex((item) => routeOf(item.href) === routeOf(pathname)),
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
          <Link href="/#home" className="flex items-center">
            <LogoLockup markClassName="h-8" nameClassName="h-[15px]" />
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
              className="btn-gradient hidden rounded-lg px-4 py-2 text-sm font-semibold transition-transform duration-300 ease-out hover:-translate-y-0.5 sm:block"
            >
              Book a Demo
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
              // h-11/w-11 = 44px, the minimum comfortable tap target; the
              // -mr-1 keeps the bar’s optical right edge where it was.
              className="-mr-1 ml-1 grid h-11 w-11 place-items-center rounded-lg text-white/80 hover:bg-white/10 md:hidden"
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
          // Deliberately NOT .glass. This panel floats over headings and body
          // copy, and a translucent fill let them read straight through the
          // links underneath — worst on Android, where the blur was being
          // dropped entirely (see .glass in globals.css). An opaque fill is the
          // only thing that guarantees the menu is legible over any content.
          <div className="mt-2 rounded-2xl border border-white/10 bg-[#05050f] p-3 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.95)] md:hidden">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-ink-muted transition-colors hover:bg-white/5 hover:text-white"
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
