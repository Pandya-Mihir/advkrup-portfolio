import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import TermsModal from "@/components/TermsModal";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { AnimationGateProvider } from "@/components/ui/animation-gate";
import { JsonLd } from "@/components/seo/json-ld";
import { siteGraph } from "@/lib/seo/schema";
import { PRACTICE, SITE_URL } from "@/lib/seo/site";
import { siteFont, serifFont } from "@/lib/fonts";


export const metadata: Metadata = {
  /**
   * Required for every relative URL below (canonicals, OG images) to resolve
   * to an absolute one. Without it Next.js cannot emit a canonical tag at all.
   */
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Land & Revenue Advocate in Ahmedabad | Adv. Krupal Savjani",
    template: "%s | Adv. Krupal Savjani",
  },
  description:
    "Advocate in Ahmedabad for land and revenue law: land disputes, 7/12 record corrections, title verification, sale deeds and revenue appeals. Makarba office.",
  keywords: [
    "advocate in ahmedabad",
    "best advocate in ahmedabad",
    "advocate near makarba",
    "advocate in gujarat",
    "land dispute lawyer ahmedabad",
    "property lawyer ahmedabad",
    "revenue record lawyer ahmedabad",
    "7/12 utara lawyer",
    "krupal savjani advocate",
  ],

  applicationName: PRACTICE.name,
  authors: [{ name: PRACTICE.name, url: SITE_URL }],
  creator: PRACTICE.name,
  publisher: PRACTICE.name,
  category: "Legal Services",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    siteName: PRACTICE.name,
    locale: "en_IN",
    url: SITE_URL,
    title: "Land & Revenue Advocate in Ahmedabad | Adv. Krupal Savjani",
    description:
      "Land disputes, revenue records, title verification and property documentation — a dedicated land and revenue practice in Ahmedabad, Gujarat.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Adv. Krupal P. Savjani — Land & Revenue Law, Ahmedabad, Gujarat",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@SavjaniKrupal",
    creator: "@SavjaniKrupal",
    title: "Land & Revenue Advocate in Ahmedabad | Adv. Krupal Savjani",
    description:
      "Land disputes, revenue records, title verification and property documentation in Ahmedabad, Gujarat.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  /** Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the token from Search Console. */
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,

  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.svg" }],
  },

  other: {
    /** Helps Google associate the page with the right place. */
    "geo.region": "IN-GJ",
    "geo.placename": "Makarba, Ahmedabad, Gujarat",
    "geo.position": `${PRACTICE.geo.latitude};${PRACTICE.geo.longitude}`,
    ICBM: `${PRACTICE.geo.latitude}, ${PRACTICE.geo.longitude}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f4f0",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${siteFont.variable} ${serifFont.variable}`}
    >
      <body className="font-body selection:bg-[#fe5545] selection:text-white">
        {/* Sitewide entity graph: WebSite → LegalService → Person. */}
        <JsonLd id="schema-site" data={siteGraph()} />

        {/* Global chrome — progress bar is a client component */}
        <ScrollProgress />

        <ConvexClientProvider>
          <AnimationGateProvider>
            <TermsModal>{children}</TermsModal>
          </AnimationGateProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
