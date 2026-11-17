import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import {
  SlideIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animations";
import { ParallaxWrapper } from "@/components/ui/parallax";
import { LadyJustice } from "@/components/ui/lady-justice";
import { KrupalWordmark } from "@/components/ui/krupal-letters";
import { CoreMandates } from "@/components/ui/core-mandates";
import { HorizontalTrack } from "@/components/ui/horizontal-track";
import { LocalTime } from "@/components/ui/local-time";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/seo/faq-section";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/seo/schema";
import { HOME_CLIENTS, HOME_FAQS, HOME_FORUMS, HOME_STEPS } from "@/lib/seo/home";
import { AREA_PAGES, SERVICE_PAGES } from "@/lib/seo/locations";

/** "Advocate in Makarba, Ahmedabad — Land & Property Law" → "Advocate in Makarba, Ahmedabad" */
const guideLabel = (h1: string) => h1.split(" — ")[0].split(" for ")[0];

export const metadata: Metadata = {
  // `absolute` — the root layout's title.default already names the practice,
  // so the "| Adv. Krupal Savjani" suffix would be a duplication here.
  title: {
    absolute: "Land & Revenue Advocate in Ahmedabad | Adv. Krupal Savjani",
  },
  description:
    "Advocate in Ahmedabad for land and revenue law: land disputes, 7/12 record corrections, title verification, sale deeds and revenue appeals. Makarba office.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="bg-[#f6f4f0] text-[#161513]">
      <JsonLd
        id="schema-home"
        data={graph(
          webPageSchema({
            path: "/",
            name: "Land & Revenue Advocate in Ahmedabad — Adv. Krupal P. Savjani",
            description:
              "Land and revenue law practice in Ahmedabad, Gujarat: land disputes, revenue records, title verification and property documentation.",
          }),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          faqSchema(HOME_FAQS, "/"),
        )}
      />

      <Navbar />

      <HorizontalTrack>
        {/*
          ── Hero ───────────────────────────────────────────────────────
          One screen, two things: the figure and the name. Everything that
          used to sit here — the eyebrow, the headline block, the discipline
          tags, the lede and the two calls to action — is gone; the practice
          areas and the consultation link are a scroll away, in the sections
          that are actually about them.

          The page's H1 travels with the wordmark (see KrupalWordmark), so
          removing this block cost the layout nothing and the document
          nothing.
        */}
        <section
          data-rail
          className="relative isolate flex w-full shrink-0 min-h-screen md:h-full md:min-h-0 flex-col justify-end overflow-hidden px-6 pb-10 pt-32 md:px-10 md:pb-14 md:pt-36"
        >
          {/* Held to the left two-thirds so the figure stands clear of the
              name instead of being read through it. Her height drives her size
              (the vw cap only catches extreme windows), and the clearance
              works because her ink in the band the letters occupy is all
              body and drapery, which starts ~39% into her box — the scales,
              which reach the far left of it, hang well above the letters.
              Below md she is hidden, so the name takes the full width. */}
          <KrupalWordmark className="w-full md:max-w-[74%] lg:max-w-[77%] xl:max-w-[80%]" />

          {/* The foot rail, with Lady Justice standing on its line.

              She is positioned against this wrapper rather than the section,
              so her base lands on the rule whatever the rail's height comes
              to (it wraps on narrow screens): `bottom-full` puts her bottom
              edge on the wrapper's top edge, which is exactly where the
              border is drawn, and the photo's bottom row is the pedestal's
              own edge. The wrapper sets no z-index, so she still layers
              under the name (z-[5] against its z-10) as before.

              Her height is what is left above the rail after ~7rem of
              headroom; the width follows from her 675×1100 aspect ratio,
              with the vw cap only catching very wide-and-short windows.
              `-right-10` cancels the section's padding so she stands at the
              hero's edge, as before.

              On a phone she is the photograph, faded back (see
              globals.css): 64% of the screen tall, standing on the same
              line at the right edge and reaching up behind the name, light
              enough that the solid letters still read over her. `svh` so
              she does not resize as the browser's toolbar slides away. */}
          <div className="relative mt-7">
            <LadyJustice className="absolute -right-6 bottom-full z-[5] h-[64svh] max-w-[86vw] text-[#161513] md:-right-10 md:h-[calc(100vh-13rem)] md:max-w-[34vw]" />

            {/* Foot rail: where the practice is, and that it is open. Both sit
              at the left — the right end of the rail runs under the statue's
              pedestal, where a label would be lost against the bronze. */}
            <div className="relative z-10 flex flex-wrap items-baseline gap-x-12 gap-y-3 border-t border-black/10 pt-5">
              <span className="t-eyebrow t-eyebrow-muted">
                Ahmedabad, Gujarat <LocalTime className="ml-2" />
              </span>
              <span className="t-eyebrow t-eyebrow-muted hidden sm:inline">
                Accepting briefs
              </span>
            </div>
          </div>
        </section>

        <CoreMandates className="w-full shrink-0 min-h-screen md:h-full md:min-h-0" />

        {/* ── Journal / Editorial Teaser ─────────────────────────────── */}
        <section
          data-rail
          className="relative flex w-full shrink-0 min-h-screen md:h-full md:min-h-0 items-center overflow-hidden bg-[#eeebe5]"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 w-full min-h-[600px]">
            {/* Image with parallax */}
            <SlideIn
              from="left"
              className="md:col-span-7 relative overflow-hidden min-h-[300px] md:min-h-0"
            >
              <ParallaxWrapper
                speed={0.15}
                className="w-full h-full absolute inset-0"
              >
                <Image
                  src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1600&q=90"
                  alt="Law library — legal books and documents"
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover scale-105"
                />
              </ParallaxWrapper>
            </SlideIn>

            {/* Text */}
            <SlideIn
              from="right"
              delay={0.1}
              className="md:col-span-5 flex flex-col justify-center px-8 md:px-12 py-16 bg-[#eeebe5]"
            >
              <StaggerContainer>
                <StaggerItem>
                  <span className="t-eyebrow mb-12 block">
                    Journal / Legal Insights
                  </span>
                </StaggerItem>
                <StaggerItem>
                  <h2 className="t-section mb-12">
                    The Anatomy of Land Rights.
                  </h2>
                </StaggerItem>
                <StaggerItem>
                  <p className="t-lede measure-narrow mb-12">
                    Exploring the statutory framework of the Gujarat Land
                    Revenue Code and its practical implications for landowners
                    and claimants.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <Link
                    href="/blog"
                    className="group flex items-center space-x-4"
                  >
                    <span className="t-action text-[#161513] border-b border-[#161513] group-hover:text-[#fe5545] group-hover:border-[#fe5545] transition-colors duration-200">
                      Read the Journal
                    </span>
                    <span className="t-action text-[#fe5545] group-hover:translate-x-2 transition-transform duration-300 inline-block">
                      →
                    </span>
                  </Link>
                </StaggerItem>
              </StaggerContainer>
            </SlideIn>
          </div>
        </section>
      </HorizontalTrack>

      {/*
        The sideways run ends with the journal. From here the page scrolls
        down as an ordinary page: the closing quote and call to action, then
        the footer. The track's spacer releases its sticky stage when the
        journal panel has slid fully into view, so the next section simply
        rises in from below — no extra wiring needed.
      */}

      {/* ── The practice ─────────────────────────────────────────────
          Plain text about what the practice does and where matters are
          heard. The sections above are display type and motion; this is
          what search and answer engines (and a first-time visitor) read to
          learn what the practice is. Copy lives in lib/seo/home.ts. */}
      <section
        data-rail
        aria-labelledby="practice-title"
        className="border-t border-[#cdc6b9]/60 bg-[#f6f4f0] px-6 py-20 md:px-12 md:py-28"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <p className="t-eyebrow mb-4">The practice</p>
            <h2 id="practice-title" className="t-section">
              Land, records and title, in Ahmedabad and across Gujarat.
            </h2>
          </div>
          <div className="space-y-6 md:col-span-7">
            <p className="t-lede measure">
              Land in Gujarat is held on paper before it is held on the
              ground. Who owns a parcel, on what tenure and with what
              restrictions is read from the 7/12 Utara, the 8-A extract, the
              mutation entries and the registered chain of deeds, and a single
              wrong entry can hold up a sale, a loan or an inheritance for
              years.
            </p>
            <p className="t-body measure text-[#161513]/75">
              The practice of Adv. Krupal P. Savjani is built around that paper
              trail. From the office at Titanium Business Park, Makarba, it
              advises landowners, buyers, heirs and developers: correcting
              revenue records, verifying title before money changes hands,
              drafting the deeds and agreements that transfer land, and
              carrying disputes through the revenue authorities and the
              courts.
            </p>
            <p className="t-body measure text-[#161513]/75">
              Most matters begin with the documents rather than the dispute.
              The first step is to read the 7/12, the 8-A, the mutation entries
              and the deeds together, find where the record and the facts part
              ways, and decide which forum can put that right.
            </p>
          </div>
        </div>

        <h3 className="t-eyebrow mt-20 mb-6 md:mt-24">Where a land matter is heard</h3>
        <ol className="grid grid-cols-1 border-t border-[#cdc6b9]/60 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
          {HOME_FORUMS.map((forum, i) => (
            <li key={forum.name} className="border-b border-[#cdc6b9]/60 py-6 md:py-7">
              <span aria-hidden className="t-meta mb-3 block text-[#161513]/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="t-card mb-2">{forum.name}</p>
              <p className="t-body-sm text-[#161513]/75">{forum.note}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Who the practice acts for ─────────────────────────────── */}
      <section
        data-rail
        aria-labelledby="clients-title"
        className="bg-[#eeebe5] px-6 py-20 md:px-12 md:py-28"
      >
        <p className="t-eyebrow mb-4">Who the practice acts for</p>
        <h2 id="clients-title" className="t-section mb-12 md:mb-16">
          Owners, buyers, heirs and developers.
        </h2>
        <ul className="grid grid-cols-1 border-t border-[#cdc6b9] sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-4">
          {HOME_CLIENTS.map((c) => (
            <li key={c.who} className="flex flex-col border-b border-[#cdc6b9] py-7 md:py-8">
              <h3 className="t-card mb-3">{c.who}</h3>
              <p className="t-body-sm mb-5 text-[#161513]/75">{c.what}</p>
              <Link
                href={c.href}
                className="t-action mt-auto text-[var(--color-accent-ink,#a8321f)] transition-colors duration-200 hover:text-[#161513]"
              >
                {c.label} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── How a matter is handled ───────────────────────────────── */}
      <section
        data-rail
        aria-labelledby="steps-title"
        className="bg-[#f6f4f0] px-6 py-20 md:px-12 md:py-28"
      >
        <p className="t-eyebrow mb-4">How a matter is handled</p>
        <h2 id="steps-title" className="t-section mb-12 md:mb-16">
          From the first document to the final order.
        </h2>
        <ol className="grid grid-cols-1 border-t border-[#cdc6b9]/60 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-4">
          {HOME_STEPS.map((step, i) => (
            <li key={step.title} className="border-b border-[#cdc6b9]/60 py-7 md:py-8">
              <span aria-hidden className="t-meta mb-3 block text-[#fe5545]">
                Step {i + 1}
              </span>
              <h3 className="t-card mb-3">{step.title}</h3>
              <p className="t-body-sm text-[#161513]/75">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <FaqSection
        faqs={HOME_FAQS}
        eyebrow="Questions"
        title="What clients ask first"
        className="border-t border-[#cdc6b9]/60 bg-[#f6f4f0]"
      />

      {/* ── Guides index ─────────────────────────────────────────────
          Every local guide, linked from the strongest page on the site
          with its keyword-bearing name as the anchor text. */}
      <section
        data-rail
        aria-labelledby="guides-title"
        className="bg-[#eeebe5] px-6 py-20 md:px-12 md:py-28"
      >
        <p className="t-eyebrow mb-4">Guides</p>
        <h2 id="guides-title" className="t-section mb-12 md:mb-16">
          Find your matter, or your area.
        </h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <nav aria-label="Guides by matter" className="md:col-span-7">
            <h3 className="t-eyebrow t-eyebrow-muted mb-4">By matter</h3>
            <ul className="grid grid-cols-1 border-t border-[#cdc6b9] sm:grid-cols-2 sm:gap-x-10">
              {SERVICE_PAGES.map((page) => (
                <li key={page.slug} className="border-b border-[#cdc6b9]">
                  <Link
                    href={`/${page.slug}`}
                    className="t-body-sm group flex items-baseline justify-between gap-4 py-3.5 text-[#161513] transition-colors duration-200 hover:text-[#fe5545]"
                  >
                    {guideLabel(page.h1)}
                    <span aria-hidden className="text-[#fe5545] transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Guides by area" className="md:col-span-5">
            <h3 className="t-eyebrow t-eyebrow-muted mb-4">By area</h3>
            <ul className="grid grid-cols-1 border-t border-[#cdc6b9]">
              {AREA_PAGES.map((page) => (
                <li key={page.slug} className="border-b border-[#cdc6b9]">
                  <Link
                    href={`/${page.slug}`}
                    className="t-body-sm group flex items-baseline justify-between gap-4 py-3.5 text-[#161513] transition-colors duration-200 hover:text-[#fe5545]"
                  >
                    {guideLabel(page.h1)}
                    <span aria-hidden className="text-[#fe5545] transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ── Quote + CTA ──────────────────────────────────────────── */}
      <section
        data-rail
        className="w-full min-h-screen grid grid-cols-1 content-center items-center gap-16 overflow-hidden bg-[#f6f4f0] px-8 py-24 md:grid-cols-2 md:gap-24 md:px-12"
      >
        <SlideIn from="left">
          {/*
              The opening quote mark, drawn rather than typeset: PP Neue
              Montreal's “ outline, cropped to its ink. As a 20rem glyph
              pulled up under the text with a negative margin, where it
              landed depended on the font's side bearing and line box, so
              every font change moved it — off the text's left edge and down
              into the first line. As ink-cropped SVG its left edge IS the
              text's left edge, and the gap below it is just the margin.

              One optical correction: the I that opens the quote carries a
              left side bearing of 0.082em, so the text's visible edge sits
              that far in from its box. The mark takes `t-quote` only so that
              `em` here is the quote's font size and the shift tracks its
              clamp() at every width; the colour utility overrides the
              class's own, and the height is in rem, so nothing else of it
              applies.
            */}
          <svg
            viewBox="0 0 218 205"
            aria-hidden="true"
            focusable="false"
            className="t-quote mb-6 ml-[0.082em] block h-12 w-auto text-[#d2ccc0]/40 md:mb-8 md:h-16"
          >
            <path
              fill="currentColor"
              d="M0 205H84V121H43C42 73 52 54 84 43V0C16 21 0 64 0 121ZM176 121C176 73 185 54 217 43V0C149 21 134 64 134 121V205H218V121Z"
            />
          </svg>
          <p className="t-quote measure">
            In land law, the strength of your title is only as certain as the
            precision of your documentation.
          </p>
        </SlideIn>

        <SlideIn from="right" delay={0.1} className="md:pl-16 space-y-12">
          <h4 className="t-eyebrow t-eyebrow-muted">Begin Your Case</h4>
          <p className="t-body measure">
            Whether you face a land dispute, need revenue record corrections, or
            require property documentation — professional counsel begins with a
            single conversation.
          </p>
          <Link
            href="/contact"
            className="t-action block w-full py-6 text-center text-white bg-[#fe5545] hover:bg-[#161513] hover:text-[#f6f4f0] transition-colors duration-200"
          >
            Initiate Consultation
          </Link>
          {/* Phone and email as contact values: t-card, the same
                treatment as the footer, /contact and the local pages.
                Stacked, because at that size the address does not fit
                half of this column. */}
          <div className="grid grid-cols-1 gap-6 pt-4">
            <div>
              <p className="t-eyebrow mb-2">Phone</p>
              <a
                href="tel:+918128800351"
                className="t-card text-[#161513] transition-colors hover:text-[#fe5545]"
              >
                +91 81288 00351
              </a>
            </div>
            <div>
              <p className="t-eyebrow mb-2">Email</p>
              <a
                href="mailto:adv.krupalsavjani@gmail.com"
                className="t-card break-all text-[#161513] transition-colors hover:text-[#fe5545]"
              >
                adv.krupalsavjani@gmail.com
              </a>
            </div>
          </div>
        </SlideIn>
      </section>

      <Footer />
    </main>
  );
}
