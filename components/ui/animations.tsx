"use client";
import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useAnimationGate } from "./animation-gate";
import { useHydrated } from "./use-hydrated";

/*
 * Every wrapper below starts at `opacity: 0` and reveals on scroll. That is
 * the intended effect in a browser, but it must not reach the server HTML —
 * see `use-hydrated.ts`. So each one renders plain, visible markup until
 * hydration, then swaps to the animated version. React reuses the same <div>,
 * so there is no layout change and no hydration mismatch.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Reveal as soon as any part of the element enters the viewport.
 *
 * Do NOT change this back to a fractional `amount` (it used to be 0.15).
 * `amount` is a fraction OF THE ELEMENT, so for anything taller than about
 * 6.7x the viewport the threshold is unreachable no matter how far you
 * scroll — IntersectionObserver never fires, `isInView` stays false, and the
 * content is left at `opacity: 0` permanently.
 *
 * That is not hypothetical: a blog post body measured 5,947px against an
 * 842px viewport, so 15% of the element was 892px of a viewport that could
 * only ever show 842px. The entire article was invisible, on every screen
 * size, forever.
 */
const IN_VIEW = { once: true, amount: "some" } as const;

interface BaseProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/* ── Page-load hero reveal (plays immediately, not on scroll) ── */
export function HeroReveal({ children, delay = 0, className = "" }: BaseProps) {
  const gateReady = useAnimationGate();
  const hydrated = useHydrated();
  if (!hydrated) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 52 }}
      animate={gateReady ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Fade + slide up on scroll ── */
export function FadeUp({ children, delay = 0, className = "" }: BaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, IN_VIEW);
  const gateReady = useAnimationGate();
  const hydrated = useHydrated();
  if (!hydrated) return <div className={className}>{children}</div>;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={gateReady && isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Fade in only (no Y movement) ── */
export function FadeIn({ children, delay = 0, className = "" }: BaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, IN_VIEW);
  const gateReady = useAnimationGate();
  const hydrated = useHydrated();
  if (!hydrated) return <div className={className}>{children}</div>;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={gateReady && isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Slide in from side ── */
export function SlideIn({
  children,
  delay = 0,
  className = "",
  from = "left",
}: BaseProps & { from?: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, IN_VIEW);
  const gateReady = useAnimationGate();
  const hydrated = useHydrated();
  if (!hydrated) return <div className={className}>{children}</div>;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: from === "left" ? -64 : 64 }}
      animate={gateReady && isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger container: children with stagger-item variant animate in sequence ── */
const staggerContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easeOut } },
};

export function StaggerContainer({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, IN_VIEW);
  const gateReady = useAnimationGate();
  const hydrated = useHydrated();
  if (!hydrated) return <div className={className}>{children}</div>;
  return (
    <motion.div
      ref={ref}
      variants={staggerContainerVariants}
      initial="hidden"
      animate={gateReady && isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Wrap individual children inside StaggerContainer */
export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  const hydrated = useHydrated();
  if (!hydrated) return <div className={className}>{children}</div>;
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Line draw: horizontal rule that extends from 0 to full width ── */
export function DrawLine({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, IN_VIEW);
  const gateReady = useAnimationGate();
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0, originX: 0 }}
      animate={gateReady && isInView ? { scaleX: 1 } : {}}
      transition={{ duration: 1, delay, ease: easeOut }}
      className={className}
      style={{ transformOrigin: "left" }}
    />
  );
}
