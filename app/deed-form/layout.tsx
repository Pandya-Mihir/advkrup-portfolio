import type { Metadata } from "next";

/**
 * Client intake form — useful to clients who are sent the link, but it is a
 * form rather than content, so it is kept out of the index (and out of
 * robots.txt's allow list) to avoid diluting the site's topical signals.
 */
export const metadata: Metadata = {
  title: "Deed Details Form",
  description:
    "Secure intake form for deed and agreement details — Adv. Krupal P. Savjani, Advocate, Ahmedabad.",
  robots: { index: false, follow: false },
};

export default function DeedFormLayout({ children }: { children: React.ReactNode }) {
  return children;
}
