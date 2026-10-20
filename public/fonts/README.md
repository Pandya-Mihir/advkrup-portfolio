# Licensed font files

The site is set in two Pangram Pangram families:

- **PP Editorial Old** — the name in the hero, the chapter marks, the serif
  section plates and the menu links.
- **PP Neue Montreal** — everything else.

Both are commercial and **not** redistributable, so the files are not in this
repo. Drop them here and the site picks them up on the next load. No build
step, no code change.

## What to add

`.woff2` only — every browser this site supports reads it, and adding
`.woff`/`.ttf` alongside just doubles what gets downloaded.

```
public/fonts/
  PPEditorialOld-Regular.woff2      → weight 400
  PPEditorialOld-Italic.woff2       → weight 400, italic
  PPEditorialOld-Ultralight.woff2   → weight 200   (optional)

  PPNeueMontreal-Book.woff2         → weight 400
  PPNeueMontreal-Italic.woff2       → weight 300–400, italic
  PPNeueMontreal-Medium.woff2       → weight 500
  PPNeueMontreal-SemiBold.woff2     → weight 600   (not yet — Bold stands in)
  PPNeueMontreal-Bold.woff2         → serves weight 600 until SemiBold exists
  PPNeueMontreal-Thin.woff2         → not used: too thin to stand in for 300
  PPNeueMontreal-Light.woff2        → weight 300 (not yet — Book stands in)
```

The names must match exactly — they are the `src` URLs in the `@font-face`
block at the top of `app/globals.css`. If the cut you licensed is named
differently (Neue Montreal ships "Book" where other families say "Regular"),
either rename the file or edit that one line.

Any file you leave out simply does not load; the weight falls back rather
than breaking.

## Why @font-face and not next/font

`next/font/local` resolves its `src` at build time and **fails the build** if
a file is missing. That would mean this repo could not compile until the
licensed files were in it — bad for anyone cloning it, and bad for CI. A
missing `@font-face` just falls through to the next family in the stack, so
the site builds and runs either way.

The trade is that these are not preloaded the way `next/font` preloads. If
that matters later, add to `app/layout.tsx`:

```tsx
<link rel="preload" href="/fonts/PPEditorialOld-Regular.woff2"
      as="font" type="font/woff2" crossOrigin="anonymous" />
```

## Until then

Inter stands in for PP Neue Montreal and Playfair Display for PP Editorial
Old, both loaded through `next/font` in `lib/fonts.ts`. They are the same
kind of typeface in each case — a neo-grotesk and a high-contrast serif — so
the layout, sizing and spacing are already tuned for what will replace them.

One thing is measured rather than assumed, for exactly this reason: the hero
wordmark reads its cap height from the font at runtime (`inkBearings` in
`components/ui/krupal-letters.tsx`) instead of trusting a constant, so the
letters stay flush to their box when the serif swaps in.

## Licence

A law practice website is commercial use. Check the licence you hold from
Pangram Pangram covers it before this goes live — their free tier is
personal use only.
