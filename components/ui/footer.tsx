import Link from "next/link";
import { Linkedin, Mail, Phone, MessageCircle, Scale, MapPin } from "lucide-react";
import { AnimatedDock } from "@/components/ui/animated-dock";
import { PRACTICE } from "@/lib/seo/site";
import { AREA_PAGES, SERVICE_PAGES } from "@/lib/seo/locations";
import { NAV_LINKS } from "@/lib/nav";

const socialItems = [
  {
    link: "https://linkedin.com/in/krupal-savjani-a6a52a1b0/",
    target: "_blank",
    label: "LinkedIn",
    Icon: <Linkedin size={16} />,
  },
  {
    link: "mailto:adv.krupalsavjani@gmail.com",
    label: "Email",
    Icon: <Mail size={16} />,
  },
  {
    link: "tel:+918128800351",
    label: "Call",
    Icon: <Phone size={16} />,
  },
  {
    link: "https://wa.me/918128800351",
    target: "_blank",
    label: "WhatsApp",
    Icon: <MessageCircle size={16} />,
  },
  {
    link: "https://x.com/SavjaniKrupal",
    target: "_blank",
    label: "Twitter / X",
    Icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    link: PRACTICE.googleBusinessProfile,
    target: "_blank",
    label: "Google Business Profile",
    Icon: <MapPin size={16} />,
  },
  {
    link: "/contact",
    label: "Consult",
    Icon: <Scale size={16} />,
  },
];

export function Footer() {
  return (
    <footer data-rail className="w-full flex flex-col justify-end bg-[#eeebe5]">
      <div className="w-full px-8 md:px-12 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left */}
        <div className="space-y-10">
          <p className="t-body measure-narrow">
            Expert Land &amp; Revenue Law representation in Ahmedabad, Gujarat.
            Precision advocacy for those who demand excellence.
          </p>
          <div className="space-y-1">
            <p className="t-eyebrow">Phone</p>
            <a
              href={`tel:${PRACTICE.telephone}`}
              className="t-card text-[#161513] hover:text-[#fe5545] transition-colors"
            >
              {PRACTICE.telephoneDisplay}
            </a>
          </div>
          <div className="space-y-1">
            <p className="t-eyebrow">Email</p>
            <a
              href={`mailto:${PRACTICE.email}`}
              className="t-card text-[#161513] hover:text-[#fe5545] transition-colors break-all"
            >
              {PRACTICE.email}
            </a>
          </div>

          {/* Animated Social Dock */}
          <div>
            <p className="t-eyebrow mb-5">
              Connect
            </p>
            <AnimatedDock items={socialItems} />
          </div>
        </div>

        {/* Right */}
        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col space-y-4">
            <span className="t-eyebrow mb-2">
              Navigate
            </span>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="t-action text-[#161513]/60 hover:text-[#161513] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col space-y-4">
            <span className="t-eyebrow mb-2">
              Office
            </span>
            <address className="not-italic flex flex-col space-y-1">
              <span className="t-body-sm text-[#161513]/60">
                {PRACTICE.address.street}
              </span>
              <span className="t-body-sm text-[#161513]/60">
                {PRACTICE.address.locality} — {PRACTICE.address.postalCode}
              </span>
              <span className="t-body-sm text-[#161513]/60">
                {PRACTICE.address.region}, {PRACTICE.address.countryName}
              </span>
            </address>
            <span className="t-body-sm text-[#161513]/60 mt-2">
              {PRACTICE.openingHours.display}
            </span>
            <a
              href={PRACTICE.googleBusinessProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="t-action text-[#fe5545] hover:text-[#161513] transition-colors duration-200 mt-2"
            >
              Directions →
            </a>
          </div>
        </div>
      </div>

      {/* ── Areas & matters ─────────────────────────────────────────
          Sitewide links so every local landing page is one hop from every
          other page — crawlable from anywhere, including deep blog pages. */}
      <nav
        aria-label="Areas served and practice guides"
        className="px-8 md:px-12 py-10 border-t border-[#cdc6b9]/40 grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        <div>
          <div className="mb-5 flex items-baseline justify-between gap-6">
            <p className="t-eyebrow">Areas Served</p>
            <Link
              href="/areas"
              className="t-action text-[#161513]/60 hover:text-[#fe5545] transition-colors duration-200"
            >
              All areas →
            </Link>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {AREA_PAGES.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/${area.slug}`}
                  className="t-body-sm text-[#161513]/60 hover:text-[#fe5545] transition-colors duration-200"
                >
                  Advocate in {area.place.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="t-eyebrow mb-5">
            By Matter
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {SERVICE_PAGES.map((svc) => (
              <li key={svc.slug}>
                <Link
                  href={`/${svc.slug}`}
                  className="t-body-sm text-[#161513]/60 hover:text-[#fe5545] transition-colors duration-200"
                >
                  {svc.displayLines.join(" ")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="t-meta px-8 md:px-12 py-8 flex flex-col md:flex-row justify-between border-t border-[#cdc6b9]/40 gap-4">
        <div>© {new Date().getFullYear()} ADV. KRUPAL SAVJANI. ALL RIGHTS RESERVED.</div>
        <div className="opacity-80">
          Land &amp; Revenue Law · Ahmedabad, Gujarat
        </div>
      </div>

      {/* The Advocate — centered watermark at very bottom */}
      <div
        className="hidden w-full select-none overflow-hidden text-center font-headline leading-none text-[#161513]/45 md:block"
        style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
        aria-hidden="true"
      >
        The Advocate
      </div>
    </footer>
  );
}
