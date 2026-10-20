"use client";
import { motion } from "framer-motion";
import { useHydrated } from "@/components/ui/use-hydrated";

/**
 * Page-transition wrapper.
 *
 * This wraps *every* route, so its `initial={{ opacity: 0 }}` meant the server
 * HTML for the whole site was one transparent div — measured at 99% of all
 * body text on every page, including routes that use no other animation.
 *
 * The transition is only meaningful on client-side navigation, where there is
 * a previous page to move away from. On the first load there is nothing to
 * transition from, so the server markup is rendered plainly and the animated
 * wrapper takes over once hydrated.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated();
  if (!hydrated) return <div>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
