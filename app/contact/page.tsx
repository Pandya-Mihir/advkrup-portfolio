import type { Metadata } from "next";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { WordReveal } from "@/components/ui/parallax";
import { ContactEnquiry } from "@/components/ui/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, contactPageSchema, graph } from "@/lib/seo/schema";
import { PRACTICE } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Contact — Advocate Office at Makarba, Ahmedabad",
  description:
    "Contact Adv. Krupal P. Savjani, advocate in Ahmedabad. Office at C-1207, Titanium Business Park, Makarba, Ahmedabad — 380015. Phone +91 81288 00351, Mon–Sat 10am–7pm. Land, revenue and property law.",
  keywords: [
    "advocate office ahmedabad",
    "advocate contact makarba ahmedabad",
    "lawyer near makarba contact",
    "krupal savjani advocate contact",
    "land lawyer ahmedabad phone number",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: "Contact — Advocate Office at Makarba, Ahmedabad",
    description:
      "C-1207, Titanium Business Park, Makarba, Ahmedabad — 380015. Phone +91 81288 00351. Mon–Sat, 10am–7pm.",
  },
};

/** "Mon–Sat · 10:00 am – 7:00 pm · Gujarati · Hindi · English" */
const AVAILABILITY = [
  ...PRACTICE.openingHours.display.split(", "),
  ...PRACTICE.languages,
].join(" · ");

const ADDRESS = `${PRACTICE.address.street}, ${PRACTICE.address.locality} — ${PRACTICE.address.postalCode}, ${PRACTICE.address.region}`;

export default function ContactPage() {
  return (
    <main className="bg-[#f6f4f0] text-[#161513]">
      <JsonLd
        id="schema-contact"
        data={graph(
          contactPageSchema("/contact"),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ])
        )}
      />

      <Navbar />

      {/* ── Header, and the two quick ways to talk ──────────────── */}
      <section
        data-rail
        className="grid grid-cols-1 gap-7 px-6 pt-[92px] pb-11 md:px-12 md:pt-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16 lg:pb-[72px]"
      >
        <div>
          <div className="mb-5 flex items-center gap-4 md:mb-8">
            <span aria-hidden="true" className="h-px w-8 flex-none bg-[#fe5545]" />
            <p className="t-eyebrow">
              Makarba, {PRACTICE.address.locality}
            </p>
          </div>
          {/* The display word keeps the page plain; the H1 still says who
              and where, as one heading. */}
          <h1>
            <span className="t-display block">
              <WordReveal text="Contact" delay={0.1} />
            </span>{" "}
            <span className="t-hero-sub measure-wide mt-3.5 block md:mt-[22px]">
              {`${PRACTICE.name} — advocate’s office at Makarba, Ahmedabad`}
            </span>
          </h1>
          <p className="t-lede measure-narrow mt-[18px] md:mt-9">
            The quickest way to reach us is a call or a WhatsApp message. If you would rather
            write, answer three short questions below.
          </p>
        </div>

        <div role="group" aria-label="Call or WhatsApp" className="flex flex-col gap-3">
          <p className="t-body-sm mb-1.5 hidden text-[#161513]/60 md:block">
            Would you rather just talk?
          </p>
          <a
            href={`tel:${PRACTICE.telephone}`}
            className="group grid min-h-[68px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 border border-[#fe5545] bg-[#fe5545] px-[18px] py-3 text-white transition-colors duration-200 hover:border-[#161513] hover:bg-[#161513] hover:text-[#f6f4f0] md:min-h-[84px] md:px-6 md:py-4"
          >
            <span className="t-action">Call</span>
            <span className="t-card col-start-1 text-inherit">{PRACTICE.telephoneDisplay}</span>
            <span
              aria-hidden="true"
              className="col-start-2 row-span-2 row-start-1 transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </a>
          <a
            href={`https://wa.me/${PRACTICE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid min-h-[68px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 border border-[#161513] px-[18px] py-3 text-[#161513] transition-colors duration-200 hover:bg-[#161513] hover:text-[#f6f4f0] md:min-h-[84px] md:px-6 md:py-4"
          >
            <span className="t-action">WhatsApp</span>
            <span className="t-card col-start-1 text-inherit">
              Send a message<span className="sr-only"> (opens WhatsApp)</span>
            </span>
            <span
              aria-hidden="true"
              className="col-start-2 row-span-2 row-start-1 transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </a>
          <p className="t-meta mt-1.5">{AVAILABILITY}</p>
        </div>
      </section>

      {/* ── The guided enquiry ──────────────────────────────────── */}
      <section
        id="enquiry"
        data-rail
        aria-labelledby="enquiry-title"
        className="border-t border-[#cdc6b9]/75 px-6 pt-11 pb-14 md:px-12 lg:pt-[72px] lg:pb-24"
      >
        <ContactEnquiry />
      </section>

      {/* ── Office & map ────────────────────────────────────────── */}
      <section
        id="office"
        data-rail
        aria-labelledby="office-title"
        className="grid grid-cols-1 gap-7 bg-[#eeebe5] px-6 py-14 md:px-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-stretch lg:gap-16 lg:py-[88px]"
      >
        <div>
          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-8 flex-none bg-[#fe5545]" />
            <p className="t-eyebrow">Visit the office</p>
          </div>
          <h2 id="office-title" className="t-section mt-3.5 mb-6 lg:mt-[18px] lg:mb-8">
            Titanium Business Park, Makarba.
          </h2>
          {/* The NAP block, from config so it never drifts from the schema
              or the Business Profile. */}
          <dl className="mb-8 border-t border-black/12">
            {(
              [
                ["Address", <address key="a" className="not-italic">{ADDRESS}</address>],
                ["Hours", PRACTICE.openingHours.display],
                ["Languages", PRACTICE.languages.join(" · ")],
                [
                  "Phone",
                  <a
                    key="p"
                    href={`tel:${PRACTICE.telephone}`}
                    className="border-b border-[#cdc6b9] transition-colors duration-200 hover:border-[#fe5545] hover:text-accent-ink"
                  >
                    {PRACTICE.telephoneDisplay}
                  </a>,
                ],
                [
                  "Email",
                  <a
                    key="e"
                    href={`mailto:${PRACTICE.email}`}
                    className="border-b border-[#cdc6b9] transition-colors duration-200 hover:border-[#fe5545] hover:text-accent-ink"
                  >
                    {PRACTICE.email.split("@")[0]}
                    <wbr />@{PRACTICE.email.split("@")[1]}
                  </a>,
                ],
              ] as const
            ).map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 border-b border-black/12 py-3.5 lg:grid-cols-[8.5rem_minmax(0,1fr)] lg:gap-4 lg:py-4"
              >
                <dt className="t-meta pt-1 text-[#161513]/60">{label}</dt>
                <dd className="t-body m-0 text-[#161513]">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="grid grid-cols-1 gap-3 md:flex md:flex-wrap">
            <a
              href={PRACTICE.googleBusinessProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="t-action inline-flex min-h-14 items-center justify-center gap-3 bg-[#161513] px-7 text-[#f6f4f0] transition-colors duration-200 hover:bg-[#fe5545] md:justify-start"
            >
              Directions <span aria-hidden="true">→</span>
            </a>
            <a
              href={`tel:${PRACTICE.telephone}`}
              className="t-action inline-flex min-h-14 items-center justify-center border border-[#161513] px-7 text-[#161513] transition-colors duration-200 hover:bg-[#161513] hover:text-[#f6f4f0] md:justify-start"
            >
              Call the office
            </a>
          </div>
        </div>

        {/* Google Maps embed of the verified listing */}
        <div className="relative aspect-[4/3.4] border border-black/12 bg-[#ece2cf] lg:aspect-auto lg:min-h-[460px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14690.84741882463!2d72.501757!3d22.997621!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b1fd13c4317%3A0x8af1ade1b0beed57!2sKrupal%20Savjani(Advocate)!5e0!3m2!1sen!2sin!4v1774034559041!5m2!1sen!2sin"
            className="absolute inset-0 h-full w-full border-0 [filter:grayscale(.35)_contrast(1.02)]"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office location — Adv. Krupal Savjani, Titanium Business Park, Makarba, Ahmedabad"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
