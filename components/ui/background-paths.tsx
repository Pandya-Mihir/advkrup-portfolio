"use client";
import { useEffect, useRef } from "react";
import { useAnimationGate } from "./animation-gate";

/**
 * Topographic contour lines + survey grid + a ghosted compass rose — layers
 * that evoke a land-survey / elevation map, tying the hero background to the
 * firm's land & revenue practice.
 *
 * The lines and compass are pre-rendered static SVG assets
 * (public/hero-contours.svg, public/hero-compass.svg) revealed with a single
 * plain CSS opacity transition each — no per-path JS-driven animation, no
 * Framer Motion involved here at all, so there's effectively zero runtime
 * cost beyond loading two small static images.
 *
 * The contour lines are only revealed within a soft radius of the cursor
 * (like exploring a map with a flashlight) — position is written straight
 * to a CSS custom property on mousemove, bypassing React entirely, so it's
 * one GPU-composited mask lookup per frame, not a re-render.
 */
export function BackgroundPaths() {
  const gateReady = useAnimationGate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function handleMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      el!.style.setProperty("--reveal-x", inside ? `${e.clientX - rect.left}px` : "-9999px");
      el!.style.setProperty("--reveal-y", inside ? `${e.clientY - rect.top}px` : "-9999px");
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      {/* Radial glow — lighting depth behind the hero text, always on, zero cost */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 28% 42%, rgba(254,85,69,0.09), transparent 65%), radial-gradient(ellipse 45% 60% at 85% 15%, rgba(226,226,226,0.05), transparent 70%)",
        }}
      />

      {/* Faint cadastral/survey grid — pure CSS, no runtime cost */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(226,226,226,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(226,226,226,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* eslint-disable-next-line @next/next/no-img-element -- tiny decorative vector, not an LCP candidate */}
      <img
        src="/hero-compass.svg"
        alt=""
        aria-hidden="true"
        className="absolute -top-[18%] -right-[12%] w-[70vw] h-[70vw] max-w-[640px] max-h-[640px] transition-opacity duration-[1800ms] ease-out motion-reduce:transition-none"
        style={{ opacity: gateReady ? 0.07 : 0 }}
      />

      {/* eslint-disable-next-line @next/next/no-img-element -- tiny decorative vector, not an LCP candidate */}
      <img
        src="/hero-contours.svg"
        alt=""
        aria-hidden="true"
        className="hero-drift hero-spotlight absolute inset-0 w-full h-full object-cover transition-opacity duration-[1600ms] ease-out motion-reduce:transition-none"
        style={{ opacity: gateReady ? 1 : 0 }}
      />
    </div>
  );
}
