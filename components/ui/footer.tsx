import Link from "next/link";
import { Linkedin, Mail, Phone, MessageCircle, Scale } from "lucide-react";
import { AnimatedDock } from "@/components/ui/animated-dock";

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
    link: "/contact",
    label: "Consult",
    Icon: <Scale size={16} />,
  },
];

export function Footer() {
  return (
    <footer className="w-full flex flex-col justify-end bg-[#1b1b1b]">
      <div className="w-full px-8 md:px-12 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left */}
        <div className="space-y-10">
          <p className="text-[#e3beb9] max-w-sm font-light tracking-wide leading-relaxed">
            Expert Land &amp; Revenue Law representation in Ahmedabad, Gujarat.
            Precision advocacy for those who demand excellence.
          </p>
          <div className="space-y-1">
            <p className="font-label uppercase tracking-[0.2em] text-[10px] text-[#fe5545]">Phone</p>
            <p className="text-[#e2e2e2] text-lg">+91 81288 00351</p>
          </div>
          <div className="space-y-1">
            <p className="font-label uppercase tracking-[0.2em] text-[10px] text-[#fe5545]">Email</p>
            <p className="text-[#e2e2e2] text-lg">adv.krupalsavjani@gmail.com</p>
          </div>

          {/* Animated Social Dock */}
          <div>
            <p className="font-label uppercase tracking-[0.2em] text-[10px] text-[#fe5545] mb-5">
              Connect
            </p>
            <AnimatedDock items={socialItems} />
          </div>
        </div>

        {/* Right */}
        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col space-y-4">
            <span className="font-label uppercase tracking-[0.2em] text-[10px] text-[#fe5545] mb-2">
              Navigate
            </span>
            {[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { href: "/blog", label: "Journal" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#e2e2e2]/40 hover:text-[#e2e2e2] transition-colors font-label uppercase tracking-widest text-xs"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col space-y-4">
            <span className="font-label uppercase tracking-[0.2em] text-[10px] text-[#fe5545] mb-2">
              Office
            </span>
            <span className="text-[#e2e2e2]/40 font-label text-xs leading-relaxed">
              C-1207, Titanium Business Park
            </span>
            <span className="text-[#e2e2e2]/40 font-label text-xs">Ahmedabad — 380007</span>
            <span className="text-[#e2e2e2]/40 font-label text-xs">Gujarat, India</span>
            <span className="text-[#e2e2e2]/40 font-label text-xs mt-2">Mon–Sat, 10am–7pm</span>
          </div>
        </div>
      </div>

      <div className="px-8 md:px-12 py-8 flex flex-col md:flex-row justify-between border-t border-[#5b403c]/40 text-[10px] font-label tracking-[0.2em] text-[#e2e2e2]/40 gap-4">
        <div>© 2025 ADV. KRUPAL SAVJANI. ALL RIGHTS RESERVED.</div>
        <div className="italic font-headline opacity-80 text-sm">
          Land &amp; Revenue Law · Ahmedabad, Gujarat
        </div>
      </div>

      {/* The Advocate — centered watermark at very bottom */}
      <div
        className="w-full text-center font-headline italic leading-none text-[#e2e2e2]/45 select-none overflow-hidden"
        style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
        aria-hidden="true"
      >
        The Advocate
      </div>
    </footer>
  );
}
