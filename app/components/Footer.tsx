import Link from "next/link";
import LogoMark from "./Logo";
import { SERVICES } from "../data/services";

const SOCIAL_PATHS = [
  "M22 12a10 10 0 10-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6v1.9h2.7l-.4 2.9h-2.3v7A10 10 0 0022 12z",
  "M18.9 5H21l-6.6 7.5L22 21h-6l-4.7-5.7L5.8 21H3.7l7-8L2 5h6.2l4.2 5.2L18.9 5z",
  "M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6H10v-9h4v1.5A4 4 0 0116 8zM6 9H2v11h4V9zM4 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5z",
];

/** Site footer, shared by every page. */
export default function Footer() {
  const cols = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Portfolio", href: "/#products" },
        { label: "Careers", href: "/contact" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: SERVICES.slice(0, 4).map((s) => ({
        label: s.title,
        href: `/services#${s.slug}`,
      })),
    },
    {
      title: "Products",
      links: [
        { label: "Mousepads", href: "/#products" },
        { label: "Store", href: "/#products" },
        { label: "Cart", href: "/#products" },
        { label: "Shipping", href: "/#products" },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark />
              <span className="font-display text-lg font-bold text-white">Nytrox</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-ink-muted">
              A software studio building mobile apps, web platforms, and digital
              products that launch brands into orbit.
            </p>
            <div className="mt-5 flex gap-2.5">
              {SOCIAL_PATHS.map((d, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-lg text-white/60 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-sm font-semibold text-white">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-muted transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-ink-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Nytrox. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <a href="#" className="transition-colors hover:text-white">Terms</a>
            <a href="mailto:hello@nytrox.com" className="transition-colors hover:text-white">hello@nytrox.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
