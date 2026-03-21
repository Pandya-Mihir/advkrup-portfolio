import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow ngrok tunnels (and any *.ngrok-free.app / *.ngrok.io domain)
  // to load the dev server without HMR websocket blocking the page.
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok.io"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
