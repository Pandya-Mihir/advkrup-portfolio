"use client";
import { motion, useReducedMotion } from "framer-motion";

/** Single floating SVG path layer — rendered twice (mirrored) for density */
function FloatingPaths({ position }: { position: number }) {
  const reducedMotion = useReducedMotion();
  const paths = Array.from({ length: 16 }, (_, i) => {
    const offset = i * 5 * position;
    const vOffset = i * 6;
    return {
      id: i,
      d: `M${-380 - offset} ${-189 + vOffset}C${-380 - offset} ${-189 + vOffset} ${-312 + offset * 0.3} ${216 - vOffset} ${152 + offset * 0.2} ${343 - vOffset}C${616 + offset * 0.2} ${470 - vOffset} ${684 - offset * 0.1} ${875 - vOffset} ${684 - offset * 0.1} ${875 - vOffset}`,
      /* Subtle vermilion tint on every 4th path, pure white/grey otherwise */
      stroke:
        i % 4 === 0
          ? `rgba(254, 85, 69, ${0.12 + i * 0.006})`
          : `rgba(226, 226, 226, ${0.07 + i * 0.004})`,
      width: 1.2 + i * 0.07,
      duration: 6 + i * 0.3,
      delay: i * 0.08,
    };
  });

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 696 876"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {paths.map((path) =>
        reducedMotion ? (
          <path
            key={path.id}
            d={path.d}
            stroke={path.stroke}
            strokeWidth={path.width}
            strokeLinecap="round"
            opacity={0.4}
          />
        ) : (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={path.stroke}
            strokeWidth={path.width}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 0.6, 1],
              opacity: [0, 0.8, 0.4, 0],
              pathOffset: [0, 0, 1],
            }}
            transition={{
              duration: path.duration,
              delay: path.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.3, 1],
            }}
          />
        )
      )}
    </svg>
  );
}

/**
 * Drop this inside any `relative overflow-hidden` container.
 * It fills the parent with two mirrored SVG path layers.
 */
export function BackgroundPaths() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}
