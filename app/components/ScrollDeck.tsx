"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Section = { id: string; label: string };

const TRANSITION_MS = 850;
// Slack (px) around a panel's scroll edges — absorbs sub-pixel/padding
// overflow so a scroll still advances instead of nudging content a few px.
const EDGE = 28;

/**
 * Full-screen "panel deck". Scrolling doesn't move the document — each
 * gesture transitions to the next section (fade + drift). Panels that are
 * taller than the viewport scroll internally first, then advance at the edges.
 *
 * Falls back to normal document scrolling on touch / small / reduced-motion
 * so the page is never broken.
 */
export default function ScrollDeck({
  sections,
  children,
}: {
  sections: Section[];
  children: ReactNode;
}) {
  const panels = Children.toArray(children);
  const count = panels.length;

  const [active, setActive] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const activeRef = useRef(0);
  const lockRef = useRef(false);
  const touchStart = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Decide whether the deck experience is appropriate for this device.
  useEffect(() => {
    const decide = () => {
      const fine = window.matchMedia("(pointer: fine)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const bigEnough = window.innerWidth >= 1000 && window.innerHeight >= 680;
      setEnabled(fine && !reduce && bigEnough);
    };
    decide();
    window.addEventListener("resize", decide);
    return () => window.removeEventListener("resize", decide);
  }, []);

  const go = useCallback(
    (dir: number) => {
      if (lockRef.current) return;
      const next = Math.min(count - 1, Math.max(0, activeRef.current + dir));
      if (next === activeRef.current) return;
      lockRef.current = true;
      setActive(next);
      window.setTimeout(() => {
        lockRef.current = false;
      }, TRANSITION_MS);
    },
    [count]
  );

  const jump = useCallback((i: number) => {
    if (lockRef.current || i === activeRef.current) return;
    lockRef.current = true;
    setActive(i);
    window.setTimeout(() => {
      lockRef.current = false;
    }, TRANSITION_MS);
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";

    const activeScroller = () =>
      document.querySelector<HTMLElement>(".deck-panel--active .deck-scroll");

    const onWheel = (e: WheelEvent) => {
      const el = activeScroller();
      if (el) {
        const atTop = el.scrollTop <= EDGE;
        const atBottom =
          el.scrollTop + el.clientHeight >= el.scrollHeight - EDGE;
        // Let the panel scroll internally until it reaches an edge.
        if (e.deltaY > 0 && !atBottom) return;
        if (e.deltaY < 0 && !atTop) return;
      }
      e.preventDefault();
      if (Math.abs(e.deltaY) < 8) return;
      go(e.deltaY > 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      const el = activeScroller();
      const canInnerScroll =
        el && el.scrollHeight > el.clientHeight + EDGE;
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
        case " ": {
          if (canInnerScroll) {
            const atBottom =
              el!.scrollTop + el!.clientHeight >= el!.scrollHeight - EDGE;
            if (!atBottom) return;
          }
          e.preventDefault();
          go(1);
          break;
        }
        case "ArrowUp":
        case "PageUp": {
          if (canInnerScroll) {
            const atTop = el!.scrollTop <= EDGE;
            if (!atTop) return;
          }
          e.preventDefault();
          go(-1);
          break;
        }
        case "Home":
          e.preventDefault();
          jump(0);
          break;
        case "End":
          e.preventDefault();
          jump(count - 1);
          break;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStart.current - e.changedTouches[0].clientY;
      const el = activeScroller();
      if (el) {
        const atTop = el.scrollTop <= EDGE;
        const atBottom =
          el.scrollTop + el.clientHeight >= el.scrollHeight - EDGE;
        if (dy > 0 && !atBottom) return;
        if (dy < 0 && !atTop) return;
      }
      if (Math.abs(dy) > 45) go(dy > 0 ? 1 : -1);
    };

    // Route in-page anchor links (nav, CTAs) to the matching panel.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.(
        "a[href^='#']"
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const idx = sections.findIndex((s) => s.id === id);
      if (idx >= 0) {
        e.preventDefault();
        jump(idx);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("click", onClick);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("click", onClick);
    };
  }, [enabled, go, jump, count, sections]);

  // Reset internal scroll of a panel whenever it becomes active.
  useEffect(() => {
    if (!enabled) return;
    const el = document.querySelector<HTMLElement>(
      ".deck-panel--active .deck-scroll"
    );
    if (el) el.scrollTop = 0;
  }, [active, enabled]);

  // ---- Fallback: plain document scroll ----
  if (!enabled) {
    return <div className="deck-fallback pt-16">{panels}</div>;
  }

  // ---- Deck experience ----
  return (
    <div className="fixed inset-0 z-10">
      {panels.map((panel, i) => {
        const rel = i - active;
        const isActive = rel === 0;
        return (
          <div
            key={i}
            aria-hidden={!isActive}
            className={`deck-panel absolute inset-0 ${
              isActive ? "deck-panel--active" : ""
            }`}
            style={{
              transform: `translateY(${isActive ? 0 : rel > 0 ? "7vh" : "-7vh"})`,
              opacity: isActive ? 1 : 0,
              visibility: Math.abs(rel) <= 1 ? "visible" : "hidden",
              pointerEvents: isActive ? "auto" : "none",
              transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${
                TRANSITION_MS - 200
              }ms ease`,
            }}
          >
            <div className="deck-scroll h-full overflow-y-auto no-scrollbar">
              <div className="flex min-h-full items-center justify-center px-6 pt-24 pb-16">
                <div className="w-full">{panel}</div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Top progress bar */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-40 h-[3px] bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 transition-[width] duration-700 ease-out"
        style={{ width: `${(active / (count - 1)) * 100}%` }}
      />

      {/* Right-side dot rail */}
      <nav
        aria-label="Section navigation"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3.5 md:flex"
      >
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => jump(i)}
            aria-label={s.label}
            aria-current={i === active}
            className="group flex items-center gap-2.5"
          >
            <span
              className={`whitespace-nowrap text-xs font-medium tracking-wide transition-all duration-300 ${
                i === active
                  ? "text-white opacity-100"
                  : "text-ink-muted opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === active
                  ? "h-2.5 w-2.5 bg-gradient-to-br from-violet-400 to-cyan-300 shadow-[0_0_12px_2px_rgba(139,92,246,0.8)]"
                  : "h-2 w-2 bg-white/25 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </nav>

      {/* Scroll hint (first panel only) */}
      <div
        className={`pointer-events-none fixed bottom-7 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-500 ${
          active === 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-[11px] uppercase tracking-[0.25em] text-ink-muted">
          Scroll to explore
        </span>
        <span className="deck-mouse">
          <span className="deck-mouse-wheel" />
        </span>
      </div>
    </div>
  );
}
