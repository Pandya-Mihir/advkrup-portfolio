"use client";
import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

interface BaseProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/* ── Page-load hero reveal (plays immediately, not on scroll) ── */
export function HeroReveal({ children, delay = 0, className = "" }: BaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 52 }}
      animate={{ opacity: 1, y: 0 }}
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
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
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
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
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
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: from === "left" ? -64 : 64 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
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
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div
      ref={ref}
      variants={staggerContainerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Wrap individual children inside StaggerContainer */
export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Line draw: horizontal rule that extends from 0 to full width ── */
export function DrawLine({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0, originX: 0 }}
      animate={isInView ? { scaleX: 1 } : {}}
      transition={{ duration: 1, delay, ease: easeOut }}
      className={className}
      style={{ transformOrigin: "left" }}
    />
  );
}
