import { Inter, Playfair_Display } from "next/font/google";
// import localFont from "next/font/local";   ← uncomment for Alliance

/**
 * Site typography — one family, everywhere.
 *
 * Headings and body share a single grotesk; hierarchy comes from size,
 * weight and letter-spacing rather than from mixing a serif with a sans.
 * Both fonts below expose the same CSS variable (`--font-site`), which is the
 * only thing `globals.css` reads, so swapping one for the other changes
 * nothing else in the codebase.
 *
 * ── Switching to Alliance ────────────────────────────────────────────────
 *  1. Add the four .woff2 files to `app/fonts/` (see the README there).
 *  2. Uncomment the `localFont` import above and the ALLIANCE block below.
 *  3. Change the final export to `export const siteFont = alliance;`
 *     and delete (or comment out) the `inter` block.
 *
 * It has to be done by commenting rather than a boolean flag: next/font
 * loaders are a compile-time transform and must be called and assigned to a
 * `const` at module scope. A conditional call fails the build with
 * "Font loaders must be called and assigned to a const in the module scope",
 * and a missing file is a build error rather than a silent fallback — which
 * is why Alliance stays commented until its files actually exist.
 */

/* ── ACTIVE: Inter ─────────────────────────────────────────────────────── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-site",
  display: "swap",
  // Hierarchy is carried by these four steps across the whole type scale.
  weight: ["300", "400", "500", "600"],
});

/* ── ALLIANCE — uncomment once app/fonts/ has the files ────────────────────
const alliance = localFont({
  variable: "--font-site",
  display: "swap",
  // Keeps the fallback from reflowing the page when the real font swaps in.
  adjustFontFallback: "Arial",
  src: [
    { path: "../app/fonts/AllianceNo2-Light.woff2", weight: "300", style: "normal" },
    { path: "../app/fonts/AllianceNo2-Regular.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/AllianceNo2-Medium.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/AllianceNo2-SemiBold.woff2", weight: "600", style: "normal" },
  ],
});
──────────────────────────────────────────────────────────────────────────── */

/* ── DISPLAY SERIF ────────────────────────────────────────────────────────
 * A second family, used only for the chapter marks and the serif section
 * titles. It is deliberately a high-contrast didone against the grotesk:
 * the two are doing different jobs — one labels the structure of the page,
 * the other carries the reading — and that only works if they are visibly
 * unalike. 400 and 500 only; it never sets body copy.
 * ──────────────────────────────────────────────────────────────────────── */
const displaySerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif-display",
  display: "swap",
  weight: ["400", "500"],
});

export const siteFont = inter;
export const serifFont = displaySerif;
