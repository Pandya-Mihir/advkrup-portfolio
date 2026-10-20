# Alliance font files

Alliance (Degarism Studio) is a commercial family and is **not** redistributable,
so the files are not in this repo. Drop them here and the site picks them up.

## What to add

Put the `.woff2` files in this directory with exactly these names:

```
app/fonts/
  AllianceNo2-Light.woff2       → weight 300
  AllianceNo2-Regular.woff2     → weight 400
  AllianceNo2-Medium.woff2      → weight 500
  AllianceNo2-SemiBold.woff2    → weight 600
```

Alliance No.1 works just as well — if that is what you have licensed, keep the
same four weights and rename the files to match the list above, or edit the
`src` entries in `lib/fonts.ts`.

Only `.woff2` is needed. Every browser this site supports reads it, and adding
`.woff`/`.ttf` alongside just doubles what gets downloaded.

## Then flip the switch

In `lib/fonts.ts`:

1. Uncomment the `import localFont from "next/font/local";` line.
2. Uncomment the `ALLIANCE` block.
3. Change the last line to `export const siteFont = alliance;` and comment out
   the `inter` block above it.

It is a comment-swap rather than a boolean, because `next/font` loaders are a
compile-time transform: they must be called and assigned to a `const` at module
scope. A conditional call fails the build outright with *"Font loaders must be
called and assigned to a const in the module scope"*.

The type system already routes every heading, label and paragraph through one
family token (`--font-site`), so nothing else needs touching.

## Licence

A law practice website is commercial use. Make sure the licence you hold from
Degarism covers it before this goes live — the free tier is personal use only.

## Until then

The `inter` block keeps Inter active. Inter is also a neo-grotesk, so the
layout, sizing and spacing are already tuned for this kind of typeface; only
the glyphs change when you flip it.
