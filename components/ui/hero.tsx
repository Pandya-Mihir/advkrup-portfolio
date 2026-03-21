"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function LawyerHero() {
  return (
    <div className="min-h-screen bg-[#030B1A] relative overflow-hidden">

      {/* ── Lightweight CSS gradient orbs (no WebGL) ─────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large deep blue orb — top right */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-900/25 blur-[120px]" />
        {/* Mid blue orb — left center */}
        <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-blue-800/20 blur-[100px]" />
        {/* Accent indigo orb — bottom center */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-indigo-900/20 blur-[100px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Hero Copy — bottom-left ───────────────────────────────────────────── */}
      <div className="absolute bottom-10 left-6 md:left-12 z-20 max-w-2xl">

        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/25 bg-blue-500/5 backdrop-blur-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-blue-300/90 text-xs font-medium tracking-wide">
            Expert Land & Revenue Lawyer — Ahmedabad, Gujarat
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="block font-light text-white/80 text-4xl md:text-5xl mb-2 tracking-wider">
            Justice
          </span>
          <span className="block font-black text-white drop-shadow-2xl">
            Delivered.
          </span>
          <span
            className="block font-light italic"
            style={{
              background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #818CF8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            With Precision.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-base md:text-lg font-light text-zinc-400 mb-8 leading-relaxed max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Adv. Krupal Savjani specialises in Land Disputes, Revenue Records,
          Property Documentation, and Court Representation across civil courts,
          the Gujarat High Court, and the Supreme Court of India.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-900/30"
          >
            Book Consultation
          </Link>
          <Link
            href="#services"
            className="inline-block px-8 py-3.5 rounded-full border border-white/15 hover:border-blue-500/40 text-zinc-300 hover:text-white font-medium text-sm transition-all duration-200 backdrop-blur-sm"
          >
            Practice Areas
          </Link>
        </motion.div>
      </div>

      {/* ── Decorative right side — subtle abstract lines ─────────────────────── */}
      <div className="absolute right-0 top-0 h-full w-1/2 pointer-events-none overflow-hidden">
        {/* Vertical accent line */}
        <motion.div
          className="absolute right-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        {/* Circular accent */}
        <motion.div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full border border-blue-500/10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-40 h-40 rounded-full border border-blue-500/15"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
        {/* Scales of justice icon watermark */}
        <motion.div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 -translate-x-1/2 text-blue-500/5 select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <svg viewBox="0 0 200 200" className="w-48 h-48" fill="currentColor">
            <rect x="95" y="10" width="10" height="180" rx="4" />
            <rect x="30" y="10" width="140" height="10" rx="4" />
            <line x1="100" y1="15" x2="40" y2="80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            <line x1="100" y1="15" x2="160" y2="80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            <ellipse cx="40" cy="90" rx="30" ry="12" />
            <ellipse cx="160" cy="90" rx="30" ry="12" />
          </svg>
        </motion.div>
      </div>

      {/* ── Bottom bar — stats ────────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-10 right-6 md:right-12 z-20 hidden md:flex flex-col items-end gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        {[
          { value: "10+", label: "Years Practice" },
          { value: "500+", label: "Cases Handled" },
          { value: "3", label: "Court Tiers" },
        ].map((s) => (
          <div key={s.label} className="text-right">
            <div className="text-2xl font-bold text-blue-400">{s.value}</div>
            <div className="text-[10px] text-zinc-500 tracking-widest uppercase">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
