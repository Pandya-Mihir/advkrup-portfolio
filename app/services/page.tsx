import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { HeroReveal, FadeUp } from "@/components/ui/animations";
import { WordReveal } from "@/components/ui/parallax";
import { LedgerIndex, LedgerPrompt } from "@/components/ui/practice-ledger";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/seo/schema";
import { FaqSection } from "@/components/seo/faq-section";
import { SERVICES_FAQS } from "@/lib/seo/faqs";
import { PAGE_BY_PRACTICE_AREA, SERVICE_PAGES } from "@/lib/seo/locations";
import { PRACTICE } from "@/lib/seo/site";
import { LEDGER_AREAS, ledgerNo } from "@/lib/practice-ledger";

export const metadata: Metadata = {
  /*
   * `absolute` — with the global "| Adv. Krupal Savjani" suffix this ran to 80
   * rendered characters and Google truncated the useful half.
   */
  title: { absolute: "Practice Areas — Land & Revenue Law in Ahmedabad" },
  description:
    "Land and revenue law practice in Ahmedabad: land disputes, 7/12 records, title verification, acquisition, N.A. conversion, tenancy and appeals.",
  keywords: [
    "land dispute lawyer ahmedabad",
    "revenue record lawyer ahmedabad",
    "property documentation advocate ahmedabad",
    "land acquisition lawyer gujarat",
    "agricultural land lawyer gujarat",
    "na conversion lawyer ahmedabad",
    "tenancy tenure advocate gujarat",
    "revenue tribunal advocate ahmedabad",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "/services",
    /*
     * `absolute` — with the global "| Adv. Krupal Savjani" suffix this ran to 80
     * rendered characters and Google truncated the useful half.
     */
    title: { absolute: "Practice Areas — Land & Revenue Law in Ahmedabad" },
    description:
      "Ten practice areas across land disputes, revenue records, property documentation and court representation in Ahmedabad and across Gujarat.",
  },
};

/**
 * Links a practice-area row to the page that is its detail page.
 *
 * This is the link that matters most for these ten pages: it is the
 * in-content, keyword-anchored route from the hub to the spoke, which is how
 * Google works out that `/land-acquisition-lawyer-in-gujarat` — not this
 * row of `/services` — is the URL that owns that topic. It sits inside the
 * row's <details>, so it is in the server HTML whether the row is open or not.
 */
function PracticeAreaGuideLink({ area }: { area: string }) {
  const page = PAGE_BY_PRACTICE_AREA[area];
  if (!page) return null;
  // Anchor text carries the target page's primary phrase, not "read more".
  const label = page.title.split(" | ")[0];
  // The last word and the arrow share a nowrap span, so the arrow can never
  // drop onto a line of its own.
  const cut = label.lastIndexOf(" ");
  const head = cut === -1 ? "" : label.slice(0, cut + 1);
  const tail = cut === -1 ? label : label.slice(cut + 1);
  return (
    <div>
      <p className="t-meta mb-1 text-[#161513]/70">Detailed guide</p>
      {/* min-h-11 keeps the tap target at 44px; the rule sits on the text. */}
      <Link
        href={`/${page.slug}`}
        className="t-action group inline-flex min-h-11 items-center text-accent-ink transition-colors duration-200 hover:text-[#161513]"
      >
        <span className="border-b border-accent-ink/40 pb-1.5 leading-normal transition-colors duration-200 group-hover:border-[#161513]">
          {head}
          <span className="whitespace-nowrap">
            {tail}{" "}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </span>
        </span>
      </Link>
    </div>
  );
}

const stats = [
  { value: "Gujarat", label: "High Court & Revenue Tribunals" },
  { value: "500+", label: "Matters Resolved" },
];

/*
 * One grid for a ledger row's summary and, from xl up, for its open panel,
 * so the photograph sits exactly under the area's name and the text under
 * its summary. Below xl the summary drops under the name and the panel is a
 * single column.
 */
const ROW_GRID =
  "grid-cols-[2.25rem_minmax(0,1fr)_1.25rem] gap-x-3 md:grid-cols-[3.5rem_minmax(0,1fr)_2rem] md:gap-x-8 xl:grid-cols-[3.5rem_minmax(0,1.1fr)_minmax(0,1fr)_2rem] xl:gap-x-10";

export default function ServicesPage() {
  return (
    <main className="bg-[#f6f4f0] text-[#161513]">
      <JsonLd
        id="schema-services"
        data={graph(
          webPageSchema({
            path: "/services",
            name: "Practice Areas — Land, Revenue & Property Law in Ahmedabad",
            description:
              "Land and revenue law practice in Ahmedabad: land disputes, 7/12 records, title verification, acquisition, N.A. conversion, tenancy and appeals.",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Practice Areas", path: "/services" },
          ]),
          faqSchema(SERVICES_FAQS, "/services")
        )}
      />

      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section
        data-rail
        className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-32 md:pt-36"
      >
        {/* Ghost § legal symbol — decorative anchor */}
        <span
          aria-hidden="true"
          className="absolute right-[-0.1em] top-[10%] font-headline text-[#161513] select-none pointer-events-none"
          style={{ fontSize: "clamp(18rem, 40vw, 52rem)", opacity: 0.025, lineHeight: 1 }}
        >
          §
        </span>

        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 md:px-12">
          <HeroReveal delay={0.05}>
            <div className="mb-10 flex items-center gap-4">
              <span className="h-px w-8 bg-[#fe5545]" />
              <p className="t-eyebrow">Expertise &amp; Mandate</p>
            </div>
          </HeroReveal>

          <HeroReveal delay={0.15}>
            {/* Display line keeps the brand voice; the H1 still has to say
                what the page is and where, so both live in one heading. */}
            <h1 className="mb-12">
              <span className="t-display block">
                <WordReveal text="Architecting" delay={0.15} />
                <br />
                <WordReveal text="the Verdict." delay={0.3} />
              </span>
              <span className="t-hero-sub measure-wide mt-7 block">
                Practice areas — land, revenue &amp; property law in Ahmedabad, Gujarat
              </span>
            </h1>
          </HeroReveal>

          <HeroReveal delay={0.4}>
            <div className="grid max-w-5xl grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-12">
              <p className="t-lede measure">
                We operate at the intersection of legal precision and strategic dominance. Our
                services are tailored for those who require more than representation — they require
                an architect of resolution.
              </p>
              <div className="flex flex-col gap-4 md:items-end md:text-right">
                <p className="t-meta">Jurisdiction</p>
                <p className="t-card text-[#5c4a46]">
                  Gujarat Revenue Courts<br />& High Court
                </p>
              </div>
            </div>
          </HeroReveal>
        </div>

        {/* Stats bar pinned to bottom */}
        <FadeUp delay={0.2} className="relative z-10 mt-12">
          <div className="grid grid-cols-2 border-t border-[#cdc6b9]/60 md:grid-cols-3">
            {stats.map((s, i) => (
              <div
                key={s.value}
                className={`border-[#cdc6b9]/50 px-6 py-8 md:border-r md:px-12 md:py-10 ${
                  i === 0 ? "border-r" : ""
                }`}
              >
                <p className="t-section mb-2 text-[#161513]">{s.value}</p>
                <p className="t-meta">{s.label}</p>
              </div>
            ))}
            <a
              href="#ledger"
              className="group col-span-2 block border-t border-[#cdc6b9]/50 px-6 py-8 md:col-span-1 md:border-t-0 md:px-12 md:py-10"
            >
              <span className="mb-2 flex items-baseline gap-3">
                <span className="t-section text-[#161513] transition-colors duration-200 group-hover:text-[#fe5545]">
                  {LEDGER_AREAS.length}
                </span>
                <span aria-hidden="true" className="t-section text-[#fe5545]">
                  ↓
                </span>
              </span>
              <span className="t-meta block">Practice areas — see the ledger</span>
            </a>
          </div>
        </FadeUp>
      </section>

      {/* ── The Ledger ──────────────────────────────────────────── */}
      <section
        id="ledger"
        data-rail
        aria-label="Practice areas"
        className="bg-[#ece2cf] px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mb-12 grid grid-cols-1 items-end gap-6 md:mb-16 md:grid-cols-[1fr_auto] md:gap-8">
          <div>
            <p className="t-eyebrow flex items-center gap-4 text-accent-ink">
              <span className="h-px w-8 bg-[#e0472f]" />
              Ten areas · Thirty matters
            </p>
            <p className="t-serif-display mt-5">The Ledger</p>
          </div>
          <p className="t-body-sm measure-narrow text-[#161513]/75 md:text-right">
            Open any area to see what it covers, the matters we take on, and the
            detailed guide for it.
          </p>
        </div>

        {/* The index column is a little wider at lg, where 3/12 left most
            area names wrapping onto two lines. */}
        <div className="lg:grid lg:grid-cols-[minmax(0,3.6fr)_minmax(0,8.4fr)] lg:gap-x-10 xl:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] xl:gap-x-16">
          {/* The side index — and, mounted at every width, the behaviour the
              rows need (first row open on desktop, deep links). Below lg the
              rows themselves are the index, so it is not shown. */}
          <aside className="hidden lg:block">
            <LedgerIndex
              items={LEDGER_AREAS.map(({ slug, name }) => ({ slug, name }))}
            />
          </aside>

          <div>
            <ol className="border-t border-black/10">
              {LEDGER_AREAS.map((area, i) => {
                const first = i * 3 + 1;
                return (
                  <li key={area.slug} className="border-b border-black/10">
                    <details
                      id={area.slug}
                      name="practice-area"
                      className="ledger-row group/row"
                    >
                      <summary
                        className={`grid cursor-pointer list-none items-baseline py-6 outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#e0472f] md:py-8 ${ROW_GRID}`}
                      >
                        <span className="t-meta col-start-1 row-start-1 text-[#161513]/70 transition-colors duration-300 group-open/row:text-accent-ink group-hover/row:text-accent-ink">
                          {ledgerNo(i + 1)}
                        </span>
                        <h2 className="t-section col-start-2 row-start-1">{area.name}</h2>
                        <span className="t-body-sm col-span-2 col-start-2 row-start-2 mt-2 block text-[#161513]/70 transition-colors duration-300 group-hover/row:text-[#161513] group-open/row:hidden xl:col-span-1 xl:col-start-3 xl:row-start-1 xl:mt-0 xl:group-open/row:block">
                          {area.summary}
                        </span>
                        {/* Plus / minus. Boxed to one line of the heading so it
                            centres on the name's first line at every size. */}
                        <span
                          aria-hidden="true"
                          className="t-section relative col-start-3 row-start-1 h-[1.15em] self-start xl:col-start-4"
                        >
                          <span className="absolute right-0 top-1/2 h-px w-3.5 bg-[#161513] transition-colors duration-300 group-open/row:bg-[#e0472f] md:w-[18px]" />
                          <span className="absolute right-0 top-1/2 h-px w-3.5 rotate-90 bg-[#161513] transition-[rotate,background-color] duration-500 group-open/row:rotate-0 group-open/row:bg-[#e0472f] md:w-[18px]" />
                        </span>
                      </summary>

                      <div
                        className={`pb-12 md:pb-14 md:pl-[5.5rem] xl:grid xl:pl-0 ${ROW_GRID}`}
                      >
                        <figure className="mb-8 md:max-w-xl xl:col-start-2 xl:mb-0 xl:max-w-none">
                          {/* A cream mat around a full-strength print. */}
                          <div className="border border-black/10 bg-[#f6f4f0] p-2">
                            <div className="relative aspect-[16/10] overflow-hidden bg-[#eeebe5] md:aspect-[3/2]">
                              <Image
                                src={area.image.src}
                                alt={area.image.alt}
                                fill
                                sizes="(min-width: 1280px) 28vw, (min-width: 768px) 576px, calc(100vw - 3rem)"
                                className="object-cover grayscale contrast-[1.08]"
                              />
                            </div>
                          </div>
                          <figcaption className="mt-3 flex justify-between gap-4">
                            <span className="t-meta text-[#161513]/70">
                              Practice area {ledgerNo(i + 1)}
                            </span>
                            <span className="t-meta text-[#161513]/70">
                              Matters {ledgerNo(first)}–{ledgerNo(first + 2)}
                            </span>
                          </figcaption>
                        </figure>

                        <div className="flex flex-col xl:col-span-2 xl:col-start-3">
                          <p className="t-lede measure mb-8">{area.description}</p>
                          <ul className="mb-9 border-t border-black/10">
                            {area.matters.map((matter, j) => (
                              <li
                                key={matter}
                                className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline border-b border-black/10 py-3.5 md:grid-cols-[3.25rem_minmax(0,1fr)] md:py-4"
                              >
                                <span className="t-meta text-accent-ink">
                                  {ledgerNo(first + j)}
                                </span>
                                <span className="t-card">{matter}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-auto">
                            <PracticeAreaGuideLink area={area.slug} />
                          </div>
                        </div>
                      </div>
                    </details>
                  </li>
                );
              })}
            </ol>

            {/* The prompt shows under the side index only on xl screens at
                least 800px tall; everywhere else (no index below lg, a
                crowded one at lg or on short windows) it comes here, so
                exactly one copy is visible at any size. */}
            <div className="mt-12 xl:[@media(min-height:800px)]:hidden">
              <LedgerPrompt />
            </div>
          </div>
        </div>
      </section>

      {/* ── Common questions (also emitted as FAQPage JSON-LD above) ── */}
      <FaqSection faqs={SERVICES_FAQS} eyebrow="Questions clients ask" title="Common questions about the practice" />

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section data-rail className="bg-[#eeebe5] px-6 py-24 md:px-12 md:py-32">
        <FadeUp>
          <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-[1.2fr_1fr] md:gap-12">
            <div>
              <p className="t-eyebrow mb-4">The Next Move</p>
              <h2 className="t-display-sm">Secure the Verdict.</h2>
            </div>
            <div className="flex flex-col gap-5">
              <p className="t-body-sm measure-narrow">
                Consultations at the Makarba office, Titanium Business Park —{" "}
                {PRACTICE.openingHours.display}.
              </p>
              <Link
                href="/contact"
                className="t-action block bg-[#fe5545] px-8 py-6 text-center text-white transition-colors duration-200 hover:bg-[#161513] hover:text-[#f6f4f0]"
              >
                Inquire for Counsel
              </Link>
              <a
                href={`tel:${PRACTICE.telephone}`}
                className="t-action inline-flex min-h-11 items-center justify-center text-[#161513]/70 transition-colors duration-200 hover:text-[#161513]"
              >
                Or call {PRACTICE.telephoneDisplay}
              </a>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── Deep-dive pages ─────────────────────────────────────── */}
      <section
        data-rail
        aria-labelledby="guides-by-matter"
        className="border-t border-[#cdc6b9]/40 px-6 py-20 md:px-12 md:py-24"
      >
        <FadeUp>
          <p className="t-eyebrow mb-4">Go deeper</p>
          <h2 id="guides-by-matter" className="t-section mb-10 md:mb-12">
            Detailed guides by matter
          </h2>
        </FadeUp>
        {/* A ruled index, two columns from md: each guide's name with its
            page's heading under it. */}
        <ul className="grid grid-cols-1 border-t border-[#cdc6b9]/60 md:grid-cols-2 md:gap-x-12">
          {SERVICE_PAGES.map((svc) => (
            <li key={svc.slug} className="border-b border-[#cdc6b9]/60">
              <Link
                href={`/${svc.slug}`}
                className="group flex items-baseline justify-between gap-6 py-5"
              >
                <span>
                  <span className="t-card block transition-colors duration-200 group-hover:text-[#fe5545]">
                    {svc.displayLines.join(" ")}
                  </span>
                  <span className="t-body-sm mt-1 block text-[#161513]/65">
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
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </main>
  );
}
