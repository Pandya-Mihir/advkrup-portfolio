"use client";
import Link from "next/link";
import { useState } from "react";

/**
 * Core Mandates as an index: one hairline-separated row per mandate, with
 * the description belonging to whichever row is open.
 *
 * Same grammar as the wordmark in the hero — point at one and the rest
 * recede — so the two halves of the page read as one system rather than as
 * a poster followed by a brochure.
 *
 * On a pointer device exactly one row is always open (the first, until you
 * point at another) and the descriptions share a single fixed-height slot,
 * so moving between rows swaps text without the list below it moving. On a
 * phone there is no hover to drive that, so every description is simply
 * printed under its own row.
 *
 * Set on parchment (#ece2cf), so the practice reads as its own panel between
 * the cream hero and the stone journal either side of it on the track. The
 * accent is taken a shade deeper (#e0472f) than the site's #fe5545, which
 * goes thin against the yellower ground.
 */

const MANDATES = [
  {
    no: "01",
    title: "Land Dispute Resolution",
    body: "Structural legal defence in land ownership, possession and boundary disputes — carried through the revenue hierarchy to a decisive outcome.",
  },
  {
    no: "02",
    title: "Revenue Records",
    body: "The 7/12 Utara, 8-A and village forms: corrections, mutations and revenue court proceedings, executed with precision.",
  },
  {
    no: "03",
    title: "Property Documentation",
    body: "Title verification, sale deeds, gift deeds and NOC procurement — documentation meticulous enough to foreclose the next dispute.",
  },
];

export function CoreMandates({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(0);

  return (
    <section
      data-rail
      aria-labelledby="core-mandates"
      className={`relative flex flex-col justify-center bg-[#ece2cf] px-6 py-24 md:px-10 md:py-0 ${className}`}
      onPointerLeave={() => setOpen(0)}
    >
      <div className="mb-12 md:mb-16">
        <span className="t-eyebrow t-eyebrow-muted flex items-center gap-4">
          <span className="h-px w-6 bg-[#e0472f]" />
          Core Mandates
        </span>
        <h2 id="core-mandates" className="t-serif-display mt-5">
          The Practice
        </h2>
      </div>

      {/* Closed rows recede only from md up, where a pointer can open them;
          a phone has no hover, so every row there is at full strength. */}
      <ul className="border-t border-black/10">
        {MANDATES.map((mandate, i) => (
          <li
            key={mandate.no}
            onPointerEnter={() => setOpen(i)}
            className="border-b border-black/10"
          >
            <div className="grid grid-cols-1 items-baseline gap-x-10 py-7 md:grid-cols-[3rem_1fr] md:py-9">
              <span
                className={`t-meta hidden transition-colors duration-500 md:block ${
                  open === i ? "text-[#e0472f]" : "text-[#161513]/25"
                }`}
              >
                {mandate.no}
              </span>
              <h3
                className={`t-section transition-colors duration-500 ${
                  open === i ? "text-[#161513]" : "text-[#161513] md:text-[#161513]/30"
                }`}
              >
                {mandate.title}
              </h3>

              {/* Phones get the copy inline — there is no pointer to open a row. */}
              <p className="t-body-sm measure mt-4 text-[#161513]/60 md:hidden">
                {mandate.body}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* The open row's description, in a slot of its own. Fixed height for
          the longest of them, so swapping rows never moves the link below. */}
      <div className="mt-8 hidden h-[5.5rem] justify-end md:flex">
        <p className="t-body-sm w-[32rem] max-w-full text-right text-[#161513]/60">
          {MANDATES[open].body}
        </p>
      </div>

      <div className="mt-10 flex justify-end md:mt-4">
        <Link
          href="/services"
          className="t-action group inline-flex items-center gap-3 text-[#161513]/65 transition-colors duration-200 hover:text-[#161513]"
        >
          View all practice areas
          <span className="text-[#e0472f] transition-transform duration-200 group-hover:translate-x-1.5">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
