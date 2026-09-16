"use client";
import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAnimationGate } from "./animation-gate";

/**
 * ParallaxWrapper — children move at `speed * 100`% of scroll distance.
 * speed = 0 → no parallax; speed = 0.4 → image moves at 40% of scroll
 */
export function ParallaxWrapper({
  children,
  speed = 0.35,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }} className="relative w-full h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * WordReveal — splits text into words and staggers them up on mount.
 * Use inside a HeroReveal or at the top level for page-load effect.
 */
export function WordReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  const gateReady = useAnimationGate();
  return (
    <span className={`inline-flex flex-wrap leading-[inherit] ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex leading-[1.2] mr-[0.25em]">
          <motion.span
            className="inline-block transform-gpu will-change-transform"
            initial={{ y: "110%", opacity: 0 }}
            animate={gateReady ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.75,
              delay: delay + i * 0.09,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
