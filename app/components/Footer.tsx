import Link from "next/link";
import { LogoLockup } from "./Logo";
import { SERVICES } from "../data/services";
import { PROJECTS } from "../data/projects";
import { CONTACT_EMAIL, SOCIALS } from "../data/contact";

/** Site footer, shared by every page. */
export default function Footer() {
  const cols = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Careers", href: "/contact" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      // a sample, then the door to the other eight
      links: [
        ...SERVICES.slice(0, 4).map((s) => ({
          label: s.title,
          href: `/services#${s.slug}`,
        })),
        { label: "All services", href: "/services" },
      ],
    },
    {
      title: "Projects",
      links: PROJECTS.slice(0, 4).map((p) => ({
        label: p.title,
        href: `/projects#${p.slug}`,
      })),
    },
  ];

  return (
    <footer className="border-t border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center">
              <LogoLockup markClassName="h-9" nameClassName="h-[17px]" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-ink-muted">
              A software studio building mobile apps, web platforms, and digital
              products that launch brands into orbit.
            </p>
            {/* Only the accounts that actually have a URL. See SOCIALS in
                data/contact.ts — these were all href="#" before, so every one
                of them just jumped the visitor back to the top of the page. */}
            {SOCIALS.some((social) => social.href) && (
              <div className="mt-5 flex gap-2.5">
                {SOCIALS.filter((social) => social.href).map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid h-11 w-11 place-items-center rounded-lg text-white/60 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d={social.d} />
                    </svg>
                  </a>
                ))}
              </div>
            )}
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
          {/* Privacy and Terms used to sit here as href="#". Neither page
              exists, and a policy is not something to stub out with filler —
              add the routes, then link them here. The address is also no
              longer duplicated as a literal; it comes from CONTACT_EMAIL. */}
          <div className="flex gap-6">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="transition-colors hover:text-white"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
