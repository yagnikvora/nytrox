"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LogoMark from "./Logo";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={`mt-3 flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
            scrolled
              ? "glass shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]"
              : "border border-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Nytrox
            </span>
          </Link>

          {/* Desktop menu */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <Link
              href="#contact"
              className="hidden rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(139,92,246,0.9)] transition-transform hover:scale-[1.03] sm:block"
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
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Book a Demo
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
