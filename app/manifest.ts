import type { MetadataRoute } from "next";
import { PRACTICE } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PRACTICE.name} — ${PRACTICE.tagline}`,
    short_name: PRACTICE.shortName,
    description:
      "Land and revenue law practice in Ahmedabad, Gujarat — land disputes, revenue records, title verification and property documentation.",
    start_url: "/",
    display: "standalone",
    background_color: "#131313",
    theme_color: "#131313",
    lang: "en-IN",
    categories: ["business", "legal"],
    icons: [
      { src: "/logo.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  };
}
