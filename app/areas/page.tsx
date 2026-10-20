import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { HeroReveal, FadeUp } from "@/components/ui/animations";
import { WordReveal } from "@/components/ui/parallax";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/seo/schema";
import { AREA_PAGES, SERVICE_PAGES } from "@/lib/seo/locations";
import { ADDRESS_LINE, PRACTICE } from "@/lib/seo/site";

/**
 * Where we practise — the index of every local landing page.
 *
 * This used to be the last panel of the homepage's horizontal track, where
 * it ran to two screens wide on desktop and three screens tall on a phone.
 * It is its own page now: the homepage stays about the practice, and this
 * page is the one place that lays out where the practice reaches.
 *
 * It is also the hub for the local pages. Every area and matter page is one
 * in-content link from here, with that page's own lede as the text beside
 * the link, so the hub carries real, page-specific copy rather than a bare
 * list of place names. The footer links the same pages sitewide.
 */

const DESCRIPTION =
  "Areas served by Adv. Krupal P. Savjani, land and revenue advocate in Ahmedabad: Makarba, Prahladnagar, Vejalpur, Ghodasar, Isanpur, Odhav, the rest of Ahmedabad and land matters across Gujarat.";

export const metadata: Metadata = {
  // `absolute` — the global "| Adv. Krupal Savjani" suffix would push this
  // past where Google truncates.
  title: { absolute: "Areas Served — Land & Revenue Advocate in Ahmedabad" },
  description: DESCRIPTION,
  keywords: [
    "advocate in ahmedabad",
    "land lawyer gujarat",
    "advocate in makarba",
    "advocate in prahladnagar",
    "advocate in vejalpur",
    "advocate in ghodasar",
    "advocate in isanpur",
    "advocate in odhav",
  ],
  alternates: { canonical: "/areas" },
  // Both objects are written out in full: in this Next version a page's
  // `openGraph` and `twitter` REPLACE the layout's rather than merging into
  // them, so anything omitted here (the share image, site name, locale, the
  // @handles) would simply be missing from /areas.
  openGraph: {
    type: "website",
    url: "/areas",
    siteName: PRACTICE.name,
    locale: "en_IN",
    title: "Areas Served — Land & Revenue Advocate in Ahmedabad",
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Areas served — Adv. Krupal P. Savjani, Ahmedabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SavjaniKrupal",
    creator: "@SavjaniKrupal",
    title: "Areas Served — Land & Revenue Advocate in Ahmedabad",
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${PRACTICE.address.street}, ${PRACTICE.address.locality}, ${PRACTICE.address.postalCode}`
)}`;

/** The one-line reach of an area page, shown above its name. */
function reach(place: (typeof AREA_PAGES)[number]["place"]) {
  if (place.type === "state") return "Statewide";
  if (place.type === "city") return "City-wide";
  return place.containedIn ?? "Ahmedabad";
}

export default function AreasPage() {
  return (
    <main className="bg-[#f6f4f0] text-[#161513]">
      <JsonLd
        id="schema-areas"
        data={graph(
          webPageSchema({
            path: "/areas",
            name: "Areas Served — Land & Revenue Advocate in Ahmedabad",
            description: DESCRIPTION,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Areas Served", path: "/areas" },
          ])
        )}
      />

      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        data-rail
        className="relative flex flex-col justify-end px-6 pb-14 pt-32 md:min-h-[88vh] md:px-12 md:pb-16 md:pt-36"
      >
        <HeroReveal delay={0.05}>
          <div className="mb-8 flex items-center gap-4 md:mb-10">
            <span className="h-px w-8 bg-[#fe5545]" />
            <p className="t-eyebrow">Where we practise</p>
          </div>
        </HeroReveal>

        <HeroReveal delay={0.15}>
          {/* The display lines keep the brand voice; the H1 still says what
              the page is and where, so both live in one heading. */}
          <h1 className="mb-10 md:mb-14">
            <span className="t-display block">
              <WordReveal text="Ahmedabad," delay={0.15} />
              <br />
              <WordReveal text="and across Gujarat." delay={0.3} />
            </span>
            <span className="t-hero-sub measure-wide mt-6 block md:mt-7">
              Areas served — land &amp; revenue advocate in Ahmedabad, Gujarat
            </span>
          </h1>
        </HeroReveal>

        <HeroReveal delay={0.4}>
          <div className="grid max-w-5xl grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-12">
            <p className="t-lede measure">
              The office is at {PRACTICE.address.street},{" "}
              {PRACTICE.address.locality}. Land and revenue matters are handled
              across Ahmedabad and throughout Gujarat; the pages below cover
              the areas clients most often come from, and the matters they
              most often bring.
            </p>
            <div className="flex flex-col gap-2 md:items-end md:text-right">
              <p className="t-meta">Office</p>
              <p className="t-body-sm max-w-xs text-[#161513]/80">
                {ADDRESS_LINE}
              </p>
              <p className="t-body-sm text-[#161513]/60">
                {PRACTICE.openingHours.display}
              </p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="t-action mt-2 text-[#fe5545] transition-colors duration-200 hover:text-[#161513]"
              >
                Directions →
              </a>
            </div>
          </div>
        </HeroReveal>
      </section>

      {/* ── By area ───────────────────────────────────────────────── */}
      <section
        data-rail
        aria-labelledby="areas-by-place"
        className="border-t border-[#cdc6b9]/40 bg-[#eeebe5] px-6 py-20 md:px-12 md:py-28"
      >
        <FadeUp>
          <p className="t-eyebrow mb-4">By area</p>
          <h2 id="areas-by-place" className="t-section mb-12 md:mb-16">
            Where clients come from
          </h2>
        </FadeUp>

        <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {AREA_PAGES.map((area, i) => (
            <li key={area.slug}>
              <FadeUp delay={(i % 4) * 0.06} className="h-full">
                {/* Named by its heading and described by its lede, so a
                    screen reader announces "Advocate in Makarba" rather than
                    the whole card run together as one link. */}
                <Link
                  href={`/${area.slug}`}
                  aria-labelledby={`area-${area.slug}-name`}
                  aria-describedby={`area-${area.slug}-lede`}
                  className="group flex h-full flex-col border-t border-[#cdc6b9]/60 py-6 transition-colors duration-300 hover:border-[#fe5545] md:py-8"
                >
                  <span className="t-meta mb-3 block">{reach(area.place)}</span>
                  <h3
                    id={`area-${area.slug}-name`}
                    className="t-card mb-3 transition-colors duration-200 group-hover:text-[#fe5545]"
                  >
                    Advocate in {area.place.name}
                  </h3>
                  <p
                    id={`area-${area.slug}-lede`}
                    className="t-body-sm mb-5 text-[#161513]/65"
                  >
                    {area.lede}
                  </p>
                  <span
                    aria-hidden="true"
                    className="t-action mt-auto text-[#161513]/70 transition-colors duration-200 group-hover:text-[#fe5545]">
                    {area.place.name} page{" "}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </span>
                </Link>
              </FadeUp>
            </li>
          ))}
        </ul>
      </section>

      {/* ── By matter ─────────────────────────────────────────────── */}
      <section
        data-rail
        aria-labelledby="areas-by-matter"
        className="px-6 py-20 md:px-12 md:py-28"
      >
        <FadeUp>
          <p className="t-eyebrow mb-4">By matter</p>
          <h2 id="areas-by-matter" className="t-section mb-4">
            The matters clients bring
          </h2>
          <p className="t-body measure mb-12 text-[#161513]/70 md:mb-16">
            Each has its own page — what the matter involves, which offices it
            runs through in Gujarat, and the questions clients ask first.
          </p>
        </FadeUp>

        {/* A ruled index rather than cards: ten rows read down in one pass,
            and on a phone each is a single tap-sized line, not a block. */}
        <ul className="grid grid-cols-1 border-t border-[#cdc6b9]/60 md:grid-cols-2 md:gap-x-12">
          {SERVICE_PAGES.map((svc, i) => (
            <li key={svc.slug} className="border-b border-[#cdc6b9]/60">
              <FadeUp delay={(i % 2) * 0.05}>
                <Link
                  href={`/${svc.slug}`}
                  className="group flex items-baseline justify-between gap-6 py-5 md:py-6"
                >
                  <span>
                    <span className="t-card block transition-colors duration-200 group-hover:text-[#fe5545]">
                      {svc.displayLines.join(" ")}
                    </span>
                    <span className="t-body-sm mt-1 block text-[#161513]/60">
                      {svc.h1}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[#fe5545] transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </Link>
              </FadeUp>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Close ─────────────────────────────────────────────────── */}
      <section
        data-rail
        className="border-t border-[#cdc6b9]/40 bg-[#ece2cf] px-6 py-20 md:px-12 md:py-24"
      >
        <FadeUp>
          <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="t-eyebrow mb-4">Not on the list?</p>
              <h2 className="t-section measure">
                The practice takes land matters from anywhere in Gujarat.
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <Link
                href="/contact"
                className="t-action block w-full bg-[#fe5545] py-6 text-center text-white transition-colors duration-200 hover:bg-[#161513] hover:text-[#f6f4f0]"
              >
                Initiate Consultation
              </Link>
              <a
                href={`tel:${PRACTICE.telephone}`}
                className="t-action text-center text-[#161513]/70 transition-colors duration-200 hover:text-[#161513] md:text-left"
              >
                Or call {PRACTICE.telephoneDisplay}
              </a>
            </div>
          </div>
        </FadeUp>
      </section>

      <Footer />
    </main>
  );
}
