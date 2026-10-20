/**
 * Custom `next/image` loader — images are served straight from their own CDN
 * and are never fetched or re-encoded by the Next.js server.
 *
 * Why this exists
 * ───────────────
 * Next 16 refuses to fetch an upstream image whose hostname resolves to a
 * private IP (an SSRF guard). `cdn.sanity.io` publishes no AAAA record, so on
 * an IPv6/DNS64 network it is synthesised to a NAT64 address:
 *
 *   cdn.i.sanity.io has address 35.190.90.94
 *   cdn.i.sanity.io has IPv6 address 64:ff9b::23be:5a5e   ← 64:ff9b::/96
 *
 * Next classifies `64:ff9b::/96` as private and returns
 * `400 "url" parameter is not allowed`, so every Sanity image 404s in the
 * browser. It is network-dependent, which is why it can appear out of nowhere
 * without any code change.
 *
 * Routing around the optimizer is also simply the right call here: Sanity and
 * Unsplash (imgix) are both full image pipelines that already resize, crop and
 * negotiate format. Passing their output through a second optimizer re-encodes
 * an already-optimised image and makes our server do work a CDN does better.
 *
 * `images.remotePatterns` is no longer consulted while this loader is active —
 * nothing is fetched server-side for it to validate.
 */

type LoaderArgs = { src: string; width: number; quality?: number };

/** Both CDNs speak the same query-parameter dialect (imgix-style). */
function withCdnParams(src: string, width: number, quality: number): string {
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    // Relative/local path — nothing to rewrite.
    return src;
  }

  const existingW = Number(url.searchParams.get("w"));
  const existingH = Number(url.searchParams.get("h"));

  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality));
  // Serve AVIF/WebP where the browser accepts it.
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");

  /*
   * Keep the intended crop. The callers build URLs like
   * `.width(800).height(534)`, so the ratio is deliberate; recompute the
   * height for each srcset width instead of dropping it, otherwise a wide
   * candidate comes back at the source image's own aspect ratio.
   */
  if (existingW > 0 && existingH > 0) {
    url.searchParams.set("h", String(Math.round(width * (existingH / existingW))));
  }

  return url.toString();
}

export default function imageLoader({ src, width, quality }: LoaderArgs): string {
  const q = quality ?? 75;

  if (src.includes("cdn.sanity.io") || src.includes("images.unsplash.com")) {
    return withCdnParams(src, width, q);
  }

  // Anything else (local files, other hosts) is passed through untouched.
  return src;
}
