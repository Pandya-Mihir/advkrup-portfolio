"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useIsStudio } from "./is-studio";

/**
 * Site-wide "ready to animate" signal. Stays false until web fonts have
 * finished loading (no more font-swap reflow pending) and hydration has
 * settled, so every entrance animation — and the navbar's backdrop-blur —
 * starts after that initial load burst instead of competing with it.
 *
 * Page content itself is never gated by this (it's always in the SSR'd
 * HTML); only the *timing* of entrance animations is. A translucent
 * overlay covers the page until then.
 */
const AnimationGateContext = createContext(false);

export function useAnimationGate() {
  return useContext(AnimationGateContext);
}

export function AnimationGateProvider({ children }: { children: ReactNode }) {
  const isStudio = useIsStudio();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fontsReady =
      typeof document !== "undefined" && "fonts" in document ? document.fonts.ready : Promise.resolve();
    const safetyCeiling = new Promise<void>((resolve) => setTimeout(resolve, 2500));
    const minVisible = new Promise<void>((resolve) => setTimeout(resolve, 300));

    Promise.race([fontsReady, safetyCeiling]).then(() =>
      minVisible.then(() => {
        if (!cancelled) setReady(true);
      })
    );
    return () => {
      cancelled = true;
    };
  }, []);

  // The CMS gets neither the overlay nor the gate: nothing inside Sanity
  // Studio is waiting on our entrance animations.
  if (isStudio) {
    return <AnimationGateContext.Provider value>{children}</AnimationGateContext.Provider>;
  }

  return (
    <AnimationGateContext.Provider value={ready}>
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[200] bg-[#f6f4f0] flex items-center justify-center transition-opacity duration-500 ${
          ready ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span className="t-meta animate-pulse">
          Adv. Krupal Savjani
        </span>
      </div>
      {children}
    </AnimationGateContext.Provider>
  );
}
