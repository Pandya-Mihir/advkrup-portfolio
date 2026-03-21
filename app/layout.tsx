import type { Metadata } from "next";
import { Newsreader, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import TermsModal from "@/components/TermsModal";
import { CustomCursor } from "@/components/ui/cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
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
        {/* Global chrome — cursor & progress are client components */}
        <CustomCursor />
        <ScrollProgress />

        <ConvexClientProvider>
          <TermsModal>{children}</TermsModal>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
