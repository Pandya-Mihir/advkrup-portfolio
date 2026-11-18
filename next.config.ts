import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/*
 * Content-Security-Policy for the public site.
 *
 * Pages are statically prerendered and cached at Cloudflare, so a per-request
 * nonce is not possible without making every page dynamic. Inline scripts
 * (Next's bootstrap and the JSON-LD blocks) and inline styles (framer-motion)
 * are therefore allowed, while everything else is locked to the site itself:
 * no third-party scripts, no plugins, no framing by other sites, and forms
 * may only post back here. Images may come from any https host (Sanity,
 * Unsplash); the only embedded frame is the Google Map on /contact.
 * Dev additionally needs 'unsafe-eval' for React Refresh.
 */
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self'${isProd ? "" : " ws: wss:"}`,
  "frame-src https://www.google.com https://maps.google.com",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

/** Sent on every response, Studio included. */
const SECURITY_HEADERS = [
  // HTTPS only, for a year, on this domain and its subdomains (www is the
  // only one, and it redirects here over HTTPS). Not preloaded: preloading
  // is near-permanent and can be added later on purpose.
  ...(isProd
    ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }]
    : []),
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  // Allow ngrok tunnels (and any *.ngrok-free.app / *.ngrok.io domain)
  // to load the dev server without HMR websocket blocking the page.
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok.io"],
  images: {
    /*
     * Images go straight to Sanity's / Unsplash's CDN rather than through the
     * Next image optimizer — see lib/image-loader.ts for why (Next 16's
     * private-IP guard blocks cdn.sanity.io on NAT64 networks, and both hosts
     * already optimise their own output).
     */
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",

    /*
     * Unused while the custom loader is active (nothing is fetched
     * server-side), but kept so the allowed hosts stay documented and the
     * default optimizer works immediately if the loader is ever removed.
     */
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // Don't advertise the framework in every response (`X-Powered-By`).
  poweredByHeader: false,

  /*
   * One host for the whole site. www.advkrupalsavjani.in used to serve the
   * same pages with a 200, so search engines saw two copies of every URL.
   * Every www request now gets a single permanent 301 to the bare domain,
   * keeping the path (and query). 301 rather than Next's default 308
   * because SEO checkers and some older clients expect it.
   *
   * The front proxy already sends http → https; this only needs the Host
   * header it passes through, so it works on either scheme.
   */
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      // Sanity Studio is a full SPA that talks to *.sanity.io, loads its own
      // assets and opens a login popup, so the page-level CSP and COOP are
      // kept off it.
      {
        source: "/((?!studio).*)",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.advkrupalsavjani.in" }],
        destination: "https://advkrupalsavjani.in/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
