"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cosmic cursor: a precise dot with a trailing ring.
 * Disabled on touch/coarse pointers, and de-animated for reduced-motion users.
 */
export default function CursorFX() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return; // touch devices keep the native cursor

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("cursor-none");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let shown = false;

    const show = () => {
      if (shown) return;
      shown = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      show();
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement)?.closest?.(
        "a, button, input, textarea, select, [data-cursor='hover']"
      );
      ring.classList.toggle("cursor-ring--hover", !!interactive);
    };

    const onDown = () => ring.classList.add("cursor-ring--down");
    const onUp = () => ring.classList.remove("cursor-ring--down");

    const onLeave = () => {
      shown = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const tick = () => {
      const ringEase = reduce ? 1 : 0.2;
      rx += (mx - rx) * ringEase;
      ry += (my - ry) * ringEase;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    tick();

    return () => {
      document.documentElement.classList.remove("cursor-none");
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
