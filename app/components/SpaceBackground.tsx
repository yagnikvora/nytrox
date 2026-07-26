"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; z: number; r: number; tw: number };
type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  max: number;
};

/**
 * Live space scene rendered on a single canvas:
 *  - drifting, breathing nebula clouds (additive glow)
 *  - a parallax starfield that gently reacts to the mouse + twinkles + drifts
 *  - meteors that spawn on their own and streak across
 * Pauses when the tab is hidden. Renders a calm static frame for
 * prefers-reduced-motion.
 */
export default function SpaceBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let nextMeteor = 1;
    let t = 0;
    let raf = 0;

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const orbs = [
      { hue: [139, 92, 246], fx: 0.22, fy: 0.26, rf: 0.44, phase: 0.0, sp: 0.06 },
      { hue: [34, 211, 238], fx: 0.82, fy: 0.3, rf: 0.36, phase: 2.1, sp: 0.05 },
      { hue: [236, 72, 153], fx: 0.6, fy: 0.86, rf: 0.34, phase: 4.0, sp: 0.045 },
      { hue: [99, 102, 241], fx: 0.35, fy: 0.68, rf: 0.42, phase: 1.2, sp: 0.052 },
    ];

    const resize = () => {
      W = canvas.width = Math.floor(window.innerWidth * dpr);
      H = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const count = Math.min(
        340,
        Math.floor((window.innerWidth * window.innerHeight) / 6500)
      );
      stars = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          z,
          r: (z * 1.4 + 0.3) * dpr,
          tw: Math.random() * Math.PI * 2,
        };
      });
      mouse.x = mouse.tx = W / 2;
      mouse.y = mouse.ty = H / 2;
      if (reduce) draw();
    };

    const spawnMeteor = () => {
      const fromLeft = Math.random() > 0.5;
      const startX = fromLeft
        ? Math.random() * W * 0.35
        : W * 0.65 + Math.random() * W * 0.35;
      const startY = Math.random() * H * 0.3;
      const dir = fromLeft ? 1 : -1;
      const speed = (5 + Math.random() * 4) * dpr;
      meteors.push({
        x: startX,
        y: startY,
        vx: dir * speed * 0.8,
        vy: speed,
        len: (130 + Math.random() * 140) * dpr,
        life: 0,
        max: 55 + Math.random() * 45,
      });
    };

    function draw() {
      if (!reduce) t += 0.016;
      ctx!.clearRect(0, 0, W, H);

      if (!reduce) {
        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;
      }
      const ox = mouse.x - W / 2;
      const oy = mouse.y - H / 2;

      // --- nebula clouds (additive) ---
      ctx!.globalCompositeOperation = "lighter";
      for (const o of orbs) {
        const dx = Math.sin(t * o.sp + o.phase) * 0.06;
        const dy = Math.cos(t * o.sp * 0.9 + o.phase) * 0.06;
        const cx = (o.fx + dx) * W - ox * 0.02;
        const cy = (o.fy + dy) * H - oy * 0.02;
        const R = o.rf * Math.min(W, H) * (1 + 0.08 * Math.sin(t * 0.2 + o.phase));
        const [r, g, b] = o.hue;
        const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, R);
        grad.addColorStop(0, `rgba(${r},${g},${b},0.16)`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},0.05)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx!.fillStyle = grad;
        ctx!.fillRect(cx - R, cy - R, R * 2, R * 2);
      }

      // --- stars ---
      ctx!.globalCompositeOperation = "source-over";
      for (const s of stars) {
        const twinkle = reduce
          ? 0.7
          : 0.55 + 0.45 * Math.sin(s.tw + t * (0.6 + s.z));
        const x = s.x - ox * s.z * 0.03;
        const y = s.y - oy * s.z * 0.03;
        ctx!.beginPath();
        ctx!.arc(x, y, s.r, 0, Math.PI * 2);
        const tint = s.z > 0.85 ? "180,214,255" : "255,255,255";
        ctx!.fillStyle = `rgba(${tint}, ${0.2 + twinkle * 0.75 * s.z})`;
        ctx!.fill();
        if (!reduce) {
          s.y += (0.02 + s.z * 0.06) * dpr;
          if (s.y > H + 2) {
            s.y = -2;
            s.x = Math.random() * W;
          }
        }
      }

      // --- meteors ---
      if (!reduce) {
        if (t > nextMeteor) {
          spawnMeteor();
          nextMeteor = t + 1.1 + Math.random() * 2.6;
        }
        ctx!.globalCompositeOperation = "lighter";
        ctx!.lineCap = "round";
        meteors = meteors.filter(
          (m) => m.life < m.max && m.y < H + 60 && m.x > -60 && m.x < W + 60
        );
        for (const m of meteors) {
          m.x += m.vx;
          m.y += m.vy;
          m.life++;
          const fade = Math.sin((m.life / m.max) * Math.PI);
          const mag = Math.hypot(m.vx, m.vy) || 1;
          const tailX = m.x - (m.vx / mag) * m.len;
          const tailY = m.y - (m.vy / mag) * m.len;
          const grad = ctx!.createLinearGradient(m.x, m.y, tailX, tailY);
          grad.addColorStop(0, `rgba(255,255,255,${0.9 * fade})`);
          grad.addColorStop(0.3, `rgba(190,220,255,${0.45 * fade})`);
          grad.addColorStop(1, "rgba(190,220,255,0)");
          ctx!.strokeStyle = grad;
          ctx!.lineWidth = 2 * dpr;
          ctx!.beginPath();
          ctx!.moveTo(m.x, m.y);
          ctx!.lineTo(tailX, tailY);
          ctx!.stroke();
          ctx!.beginPath();
          ctx!.arc(m.x, m.y, 1.6 * dpr, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(255,255,255,${0.9 * fade})`;
          ctx!.fill();
        }
        ctx!.globalCompositeOperation = "source-over";
        raf = requestAnimationFrame(draw);
      }
    }

    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX * dpr;
      mouse.ty = e.clientY * dpr;
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    if (!reduce) {
      draw();
      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
    }
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
