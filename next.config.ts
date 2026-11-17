import type { NextConfig } from "next";

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
