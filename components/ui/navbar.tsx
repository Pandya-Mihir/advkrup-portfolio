"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

const menuVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] as const },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.07 + 0.15, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-xl flex justify-between items-center px-8 md:px-12 py-6 md:py-8">
        {/* Logo */}
        <Link href="/" className="group relative">
          <span className="text-2xl md:text-3xl font-headline italic tracking-tighter text-[#e2e2e2] group-hover:text-[#ffb4a9] transition-colors duration-300">
            Krupal Savjani
          </span>
          {/* subtle underline on logo hover */}
          <span className="absolute -bottom-1 left-0 h-px bg-[#ffb4a9] w-0 group-hover:w-full transition-all duration-500 ease-out" />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-12">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className="relative group flex flex-col pb-1">
                {/* Label */}
                <span
                  className={`font-label uppercase tracking-[0.2em] text-[12px] transition-colors duration-300 ${
                    active
                      ? "text-[#fe5545] font-medium"
                      : "text-[#e2e2e2]/60 group-hover:text-[#e2e2e2]"
                  }`}
                >
                  {link.label}
                </span>

                {/* Silver hover underline — slides from left */}
                {!active && (
                  <span className="absolute -bottom-0.5 left-0 h-px bg-[#e2e2e2]/50 w-0 group-hover:w-full transition-all duration-300 ease-out" />
                )}

                {/* Vermilion active underline — always full width */}
                {active && (
                  <span className="absolute -bottom-0.5 left-0 h-px bg-[#fe5545] w-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <motion.button
          className="md:hidden text-[#e2e2e2] p-1"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          whileTap={{ scale: 0.85 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <motion.line x1="3" y1="6" x2="21" y2="6" />
            <motion.line x1="3" y1="12" x2="21" y2="12" />
            <motion.line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </motion.button>
      </nav>

      {/* Mobile full-screen slide-in menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[59] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[60] w-full max-w-sm bg-[#0e0e0e] flex flex-col justify-center items-start px-12"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Brand */}
              <motion.p
                className="font-label uppercase tracking-[0.3em] text-[10px] text-[#fe5545] mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Adv. Krupal Savjani
              </motion.p>

              {/* Nav links */}
              <nav className="flex flex-col space-y-5 w-full">
                {links.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      custom={i}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`font-headline text-5xl leading-tight block transition-all duration-200 ${
                          active
                            ? "text-[#fe5545] italic"
                            : "text-[#e2e2e2]/30 hover:text-[#e2e2e2] hover:italic hover:translate-x-2"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Close button */}
              <motion.button
                onClick={() => setMobileOpen(false)}
                className="mt-16 flex items-center gap-3 text-[#ffb4a9] group"
                aria-label="Close menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="group-hover:rotate-90 transition-transform duration-300"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                <span className="font-label uppercase tracking-[0.2em] text-[10px]">Close</span>
              </motion.button>

              {/* Bottom contact snippet */}
              <motion.div
                className="absolute bottom-10 left-12 right-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="h-px w-full bg-[#5b403c]/30 mb-6" />
                <p className="font-label uppercase tracking-[0.2em] text-[10px] text-[#e2e2e2]/30">
                  +91 81288 00351
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
