import type { Metadata } from "next";
import { Newsreader, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import TermsModal from "@/components/TermsModal";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { AnimationGateProvider } from "@/components/ui/animation-gate";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  style: ["italic"],
  weight: ["400"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  weight: ["400"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adv. Krupal Savjani | Expert Land & Revenue Lawyer — Ahmedabad",
  description:
    "Expert Land & Revenue Lawyer in Ahmedabad, Gujarat. Specializing in land disputes, property documentation, revenue records, and court representation.",
  keywords:
    "lawyer ahmedabad, land dispute lawyer gujarat, revenue lawyer, property documentation ahmedabad, krupal savjani",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable} ${cormorant.variable}`}>
      <body className="font-body selection:bg-[#fe5545] selection:text-white">
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
