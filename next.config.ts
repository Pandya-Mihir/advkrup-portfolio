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
};

export default nextConfig;
