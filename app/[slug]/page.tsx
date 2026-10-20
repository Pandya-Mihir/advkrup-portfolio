import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { HeroReveal, FadeUp, DrawLine } from "@/components/ui/animations";
import { WordReveal } from "@/components/ui/parallax";
import { JsonLd } from "@/components/seo/json-ld";
import { LOCAL_PAGES, getLocalPage, type LocalPage } from "@/lib/seo/locations";
import { ADDRESS_LINE, PRACTICE, PRACTICE_AREAS, abs } from "@/lib/seo/site";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  localServiceSchema,
  webPageSchema,
} from "@/lib/seo/schema";

/**
 * One route, every local landing page.
 *
 * `dynamicParams = false` means only the slugs returned by
 * generateStaticParams exist — any other `/<something>` 404s instead of being
 * rendered on demand. Next.js resolves the static routes (/blog, /services,
 * /areas, /contact, /studio, /deed-form) before this dynamic segment, so they
 * are unaffected.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCAL_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocalPage(slug);
  if (!page) return {};

  const path = `/${page.slug}`;
  return {
    /*
     * `absolute` drops the global "| Adv. Krupal Savjani" suffix. These
     * titles are already 46–57 characters of pure query match; the 22-char
     * brand suffix would push every one of them past where Google truncates,
     * cutting the keyword instead of the branding. The brand is still carried
     * by the displayed URL and the site name in the result.
     */
    title: { absolute: page.title },
    description: page.metaDescription,
    keywords: [...page.keywords],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: abs(path),
      title: page.title,
      description: page.metaDescription,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: page.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
      images: ["/og-image.png"],
    },
  };
}

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${PRACTICE.address.street}, ${PRACTICE.address.locality}, ${PRACTICE.address.postalCode}`
)}`;

export default async function LocalPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLocalPage(slug);
  if (!page) notFound();

  const path = `/${page.slug}`;
  const areas = page.focusAreas
    .map((s) => PRACTICE_AREAS.find((a) => a.slug === s))
    .filter((a): a is (typeof PRACTICE_AREAS)[number] => Boolean(a));
  const nearby = page.nearby
    .map((s) => getLocalPage(s))
    .filter((p): p is LocalPage => Boolean(p));

  const trail = [
    { name: "Home", path: "/" },
    { name: page.place.name, path },
  ];

  return (
    <main className="bg-[#f6f4f0] text-[#161513]">
      <JsonLd
        id={`schema-${page.slug}`}
        data={graph(
          webPageSchema({ path, name: page.h1, description: page.metaDescription }),
          breadcrumbSchema(trail),
          // This page's geography rides on the Service node; the LegalService
          // entity itself is emitted once, sitewide, from the root layout.
          localServiceSchema({
            path,
            name: page.h1,
            description: page.metaDescription,
            areaServed: page.areaServed,
            serviceTypes: areas.map((a) => a.name),
          }),
          faqSchema(page.faqs, path)
        )}
      />

      <Navbar />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center pt-40 pb-20 px-8 md:px-12 overflow-hidden">
        <div className="relative z-10 w-full max-w-6xl">
          {/* Visible breadcrumb — mirrors the BreadcrumbList above. */}
          <HeroReveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="t-meta flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-[#fe5545] transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-[#fe5545]">{page.place.name}</li>
              </ol>
            </nav>
          </HeroReveal>

          <HeroReveal delay={0.05}>
            <div className="mb-8 flex items-center gap-4">
              <span className="w-6 h-px bg-[#fe5545]" />
              <span className="t-eyebrow">
                {page.eyebrow}
              </span>
            </div>
          </HeroReveal>

          {/*
            One H1 carrying both the display treatment and the full keyword
            phrase. The oversized lines alone ("Advocate in / Makarba.") read
            well but say less than the query does, so the phrase follows in
            the same heading rather than being hidden or split into an H2.
          */}
          <h1 className="mb-10">
            <span className="t-display block">
              <WordReveal text={page.displayLines[0]} delay={0.1} />
              <br />
              <WordReveal text={page.displayLines[1]} delay={0.3} />
            </span>
            <span className="t-hero-sub measure-wide mt-7 block">
              {page.h1}
            </span>
          </h1>

          <FadeUp delay={0.5}>
            <p className="t-lede measure">
              {page.lede}
            </p>
          </FadeUp>

          <FadeUp delay={0.65} className="mt-12 flex flex-col sm:flex-row gap-4">
            {/* Hover is a flat colour swap — the sliding background panel was
                removed, along with the `overflow-hidden` it required. */}
            <a
              href={`tel:${PRACTICE.telephone}`}
              className="t-action inline-flex items-center gap-3 border border-[#fe5545] px-6 py-3 text-[#fe5545] hover:bg-[#fe5545] hover:text-white transition-colors duration-200"
            >
              Call {PRACTICE.telephoneDisplay}
            </a>
            <a
              href={`https://wa.me/${PRACTICE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="t-action inline-flex items-center gap-3 px-6 py-3 text-[#161513]/50 hover:text-[#161513] transition-colors duration-200"
            >
              WhatsApp the documents
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ── NAP strip — the single most-copied block in local SEO ── */}
      <section
        aria-label="Office details"
        className="border-y border-[#cdc6b9]/30 bg-[#eeebe5] px-8 md:px-12 py-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <p className="t-eyebrow mb-3">
              Office
            </p>
            <address className="t-body-sm not-italic text-[#161513]">
              {PRACTICE.address.street}
              <br />
              {PRACTICE.address.locality} — {PRACTICE.address.postalCode}
              <br />
              {PRACTICE.address.region}, {PRACTICE.address.countryName}
            </address>
          </div>
          <div>
            <p className="t-eyebrow mb-3">
              Phone
            </p>
            <a
              href={`tel:${PRACTICE.telephone}`}
              className="t-card text-[#161513] hover:text-[#fe5545] transition-colors"
            >
              {PRACTICE.telephoneDisplay}
            </a>
            <p className="mt-3">
              <a
                href={`mailto:${PRACTICE.email}`}
                className="t-card text-[#161513]/50 hover:text-[#fe5545] transition-colors break-all"
              >
                {PRACTICE.email}
              </a>
            </p>
          </div>
          <div>
            <p className="t-eyebrow mb-3">
              Hours
            </p>
            <p className="t-body-sm text-[#161513]">
              {PRACTICE.openingHours.display}
              <br />
              <span className="text-[#161513]/40">By appointment</span>
            </p>
          </div>
          <div>
            <p className="t-eyebrow mb-3">
              Serving
            </p>
            <p className="t-body-sm text-[#161513]/70">
              {page.areaServed.join(" · ")}
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="t-action mt-3 inline-block text-[#fe5545] hover:text-[#161513] transition-colors duration-200"
            >
              Directions →
            </a>
          </div>
        </div>
      </section>

      {/* ── Intro ──────────────────────────────────────────────── */}
      <section className="px-8 md:px-12 py-20 md:py-28">
        <div className="max-w-3xl space-y-8">
          {page.intro.map((para, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <p className="t-lede">
                {para}
              </p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Local context ──────────────────────────────────────── */}
      <section className="px-8 md:px-12 pb-20 md:pb-28">
        <FadeUp>
          <h2 className="t-section mb-4">
            {page.contextHeading ?? `What makes ${page.place.name} different`}
          </h2>
          <DrawLine className="h-px bg-[#cdc6b9]/30 w-full mb-16" />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {page.localContext.map((block, i) => (
            <FadeUp key={block.heading} delay={i * 0.1}>
              <span className="t-section leading-none text-[#fe5545] block mb-6">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="t-card mb-5">
                {block.heading}
              </h3>
              <p className="t-body">{block.body}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Focus areas ────────────────────────────────────────── */}
      <section className="bg-[#eeebe5] px-8 md:px-12 py-20 md:py-28">
        <FadeUp>
          <h2 className="t-section mb-4">
            {page.kind === "area"
              ? `Legal services for ${page.place.name}`
              : "What this work covers"}
          </h2>
          <DrawLine className="h-px bg-[#cdc6b9]/30 w-full mb-16" />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {areas.map((area, i) => (
            <FadeUp key={area.slug} delay={i * 0.06}>
              <h3 className="t-card mb-4">
                {area.name}
              </h3>
              <p className="t-body">{area.description}</p>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3} className="mt-16">
          <Link
            href="/services"
            className="t-action group inline-flex items-center gap-2 text-[#161513] pb-1 border-b border-[#161513]/40 hover:border-[#fe5545] hover:text-[#fe5545] transition-colors duration-300"
          >
            All practice areas
            <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-[#fe5545]">
              →
            </span>
          </Link>
        </FadeUp>
      </section>

      {/* ── Offices & forums ───────────────────────────────────── */}
      <section className="px-8 md:px-12 py-20 md:py-28">
        <FadeUp>
          <h2 className="t-section mb-4">
            Offices &amp; forums your matter passes through
          </h2>
          <DrawLine className="h-px bg-[#cdc6b9]/30 w-full mb-16" />
        </FadeUp>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
          {page.offices.map((office, i) => (
            <FadeUp key={office.name} delay={i * 0.04}>
              <div className="border-t border-[#cdc6b9]/25 py-6">
                <dt className="t-card mb-2">{office.name}</dt>
                <dd className="t-body-sm">
                  {office.note}
                </dd>
              </div>
            </FadeUp>
          ))}
        </dl>
      </section>

      {/* ── FAQs ───────────────────────────────────────────────── */}
      <section className="bg-[#eeebe5] px-8 md:px-12 py-20 md:py-28">
        <FadeUp>
          <span className="t-eyebrow mb-6 block">
            Frequently asked
          </span>
          <h2 className="t-section mb-4">
            {page.faqHeading ?? `${page.place.name} — common questions`}
          </h2>
          <DrawLine className="h-px bg-[#cdc6b9]/30 w-full mb-16" />
        </FadeUp>

        <div className="max-w-4xl space-y-12">
          {page.faqs.map((faq, i) => (
            <FadeUp key={faq.q} delay={i * 0.05}>
              <h3 className="t-card measure-wide mb-4">
                {faq.q}
              </h3>
              <p className="t-body">{faq.a}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Nearby / related ───────────────────────────────────── */}
      {nearby.length > 0 && (
        <section className="px-8 md:px-12 py-20 md:py-24">
          <FadeUp>
            <h2 className="t-eyebrow mb-10">
              {page.kind === "area" ? "Nearby areas we serve" : "Related pages"}
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearby.map((other, i) => (
              <FadeUp key={other.slug} delay={i * 0.06}>
                <Link
                  href={`/${other.slug}`}
                  className="group block border border-[#cdc6b9]/25 p-6 hover:border-[#fe5545]/60 transition-colors duration-300 h-full"
                >
                  <span className="t-card group-hover:text-[#fe5545] transition-colors duration-300 block mb-3">
                    {other.place.name}
                  </span>
                  <span className="t-body-sm opacity-70">
                    {other.h1}
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="px-8 md:px-12 pb-28">
        <FadeUp>
          <div className="border border-[#cdc6b9]/30 p-10 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="t-section mb-6">
                Start with the documents, not the argument.
              </h2>
              <p className="t-body">
                Send your 7/12 Utara, property card, deeds or any notice you have received. You
                will be told what the issue actually is and which forum it belongs in before you
                commit to anything.
              </p>
              <p className="t-body-sm mt-6 text-[#161513]/40">{ADDRESS_LINE}</p>
            </div>
            <div className="flex flex-col gap-4">
              <a
                href={`tel:${PRACTICE.telephone}`}
                className="t-action block w-full py-5 text-center text-white bg-[#fe5545] hover:bg-[#161513] hover:text-[#f6f4f0] transition-colors duration-200"
              >
                Call {PRACTICE.telephoneDisplay}
              </a>
              <a
                href={`https://wa.me/${PRACTICE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="t-action block w-full py-5 text-center border border-[#cdc6b9]/50 text-[#161513] hover:border-[#fe5545] hover:text-[#fe5545] transition-colors duration-200"
              >
                WhatsApp
              </a>
              <Link
                href="/contact"
                className="t-action block w-full py-5 text-center text-[#161513]/50 hover:text-[#161513] transition-colors duration-200"
              >
                Request a consultation
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>

      <Footer />
    </main>
  );
}
