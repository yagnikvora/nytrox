"use client";

import { useEffect } from "react";

/**
 * Inertial page scrolling. A wheel tick nudges a *target* offset and the page
 * eases toward it over the next few frames, so a flick glides to a stop instead
 * of stepping. Same idea as Lenis, minus the dependency.
 *
 * It scrolls the real document (`window.scrollTo`) rather than transforming a
 * wrapper element, which matters: a transformed wrapper becomes the containing
 * block for `position: fixed`, which would break the navbar, the cursor, the
 * star canvas, and every sticky section on the site.
 *
 * Skipped on coarse pointers — touch platforms already have momentum scrolling,
 * and hijacking it there fights the OS — and under prefers-reduced-motion.
 */

/** Fraction of the remaining distance covered each frame. Higher = tighter. */
const EASE = 0.11;
/** Below this many px we've arrived; stop the loop rather than crawl. */
const SNAP = 0.35;

export default function SmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const html = document.documentElement;
    // The stylesheet sets `scroll-behavior: smooth` for anchor jumps. Left on,
    // the browser would re-smooth every scrollTo below and fight the lerp — so
    // the flag switches it off (see globals.css) while we're driving.
    html.dataset.smoothScroll = "on";

    let target = window.scrollY;
    let current = target;
    let raf = 0;
    let running = false;

    const limit = () =>
      Math.max(0, html.scrollHeight - window.innerHeight);
    const clamp = (v: number) => Math.min(limit(), Math.max(0, v));

    const frame = () => {
      const delta = target - current;
      if (Math.abs(delta) < SNAP) {
        current = target;
        window.scrollTo(0, current);
        running = false;
        return;
      }
      current += delta * EASE;
      window.scrollTo(0, current);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    /**
     * True when the wheel is over something that scrolls itself in this
     * direction (a rail, a modal, a code block) — those keep native scrolling.
     */
    const overInnerScroller = (node: EventTarget | null, dy: number) => {
      let el = node instanceof Element ? node : null;
      while (el && el !== document.body && el !== html) {
        if (el.hasAttribute("data-smooth-ignore")) return true;
        const style = getComputedStyle(el);
        const scrollable =
          (style.overflowY === "auto" || style.overflowY === "scroll") &&
          el.scrollHeight > el.clientHeight + 1;
        if (scrollable) {
          const room =
            dy > 0
              ? el.scrollTop + el.clientHeight < el.scrollHeight - 1
              : el.scrollTop > 1;
          if (room) return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    const onWheel = (e: WheelEvent) => {
      // ctrl+wheel is pinch-zoom on most setups; never swallow it
      if (e.ctrlKey || e.metaKey || e.defaultPrevented) return;
      // Sideways gesture (trackpad swipe over a horizontal rail) — hands off,
      // or preventDefault below would swallow the axis we don't handle.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (overInnerScroller(e.target, e.deltaY)) return;
      e.preventDefault();
      // deltaMode: 0 = px, 1 = lines, 2 = pages
      const step =
        e.deltaMode === 1
          ? e.deltaY * 18
          : e.deltaMode === 2
            ? e.deltaY * window.innerHeight
            : e.deltaY;
      target = clamp(target + step);
      start();
    };

    // Anything that moves the page without going through us — scrollbar drag,
    // arrow keys, find-in-page, a restored scroll position — resyncs the
    // target, so the next wheel tick continues from where the page actually is.
    const onScroll = () => {
      if (Math.abs(window.scrollY - current) > 2) {
        current = target = window.scrollY;
      }
    };

    const glideTo = (el: Element) => {
      // Respect the element's own scroll-margin-top, which is how the pages
      // already clear the fixed navbar (`scroll-mt-24` / `scroll-mt-28`).
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      target = clamp(el.getBoundingClientRect().top + window.scrollY - margin);
      start();
    };

    // In-page anchors glide instead of jumping — CSS smooth scrolling is off
    // while we're driving, so this replaces it.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.includes("#")) return;

      const url = new URL(a.href, location.href);
      // Different route? Let Next.js navigate; only same-page hashes are ours.
      if (url.origin !== location.origin || url.pathname !== location.pathname) {
        return;
      }
      const id = decodeURIComponent(url.hash.slice(1));
      const el = id ? document.getElementById(id) : html;
      if (!el) return;

      e.preventDefault();
      glideTo(el);
      history.pushState(null, "", url.hash || location.pathname);
    };

    const onResize = () => {
      target = clamp(target);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Capture phase, so this runs before React's own root-level listener:
    // next/link bails out of navigating once the event is defaultPrevented, and
    // an in-page hash is ours to animate.
    document.addEventListener("click", onClick, true);

    return () => {
      cancelAnimationFrame(raf);
      delete html.dataset.smoothScroll;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
