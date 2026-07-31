"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Eases each route in instead of swapping it hard. Keying on the pathname
 * restarts the CSS animation on every navigation.
 *
 * Deliberately opacity-only (see `.route-fade` in globals.css): a transform
 * here would make this element the containing block for the fixed navbar,
 * cursor, and star canvas underneath it.
 */
export default function RouteFade({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="route-fade">
      {children}
    </div>
  );
}
