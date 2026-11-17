/**
 * JSON-LD builders.
 *
 * Everything hangs off three stable @ids so that Google resolves the site, the
 * practice and the person as one connected entity rather than three unrelated
 * blobs repeated on every page:
 *
 *   {SITE_URL}/#website   WebSite
 *   {SITE_URL}/#practice  LegalService (a LocalBusiness subtype)
 *   {SITE_URL}/#advocate  Person
 *
 * Page-level graphs reference those @ids instead of restating them.
 *
 * Deliberately absent: aggregateRating / review. Google disallows self-serving
 * review markup on LocalBusiness, and inventing ratings risks a manual action.
 * Ratings belong on the Google Business Profile, where clients leave them.
 */
import { CONTENT_UPDATED, PRACTICE, PRACTICE_AREAS, SITE_URL, abs } from "./site";
import type { LocalFaq } from "./locations";

type Json = Record<string, unknown>;

export const ID = {
  website: `${SITE_URL}/#website`,
  practice: `${SITE_URL}/#practice`,
  person: `${SITE_URL}/#advocate`,
} as const;

const postalAddress: Json = {
  "@type": "PostalAddress",
  streetAddress: PRACTICE.address.street,
  addressLocality: PRACTICE.address.locality,
  addressRegion: PRACTICE.address.region,
  postalCode: PRACTICE.address.postalCode,
  addressCountry: PRACTICE.address.country,
};

const geoCoordinates: Json = {
  "@type": "GeoCoordinates",
  latitude: PRACTICE.geo.latitude,
  longitude: PRACTICE.geo.longitude,
};

const openingHoursSpecification: Json = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: [...PRACTICE.openingHours.days],
  opens: PRACTICE.openingHours.opens,
  closes: PRACTICE.openingHours.closes,
};

/**
 * The practice as a local business.
 *
 * Emitted exactly once, in the root layout. It has a fixed `@id`, so a second
 * copy on a page — even with a different `areaServed` — is two nodes claiming
 * to be the same entity with conflicting properties. Page-specific geography
 * belongs on that page's `Service` node instead, which is what
 * `localServiceSchema` is for.
 */
export function legalServiceSchema(): Json {
  return {
    "@type": ["LegalService", "Attorney"],
    "@id": ID.practice,
    name: PRACTICE.legalName,
    alternateName: PRACTICE.name,
    url: SITE_URL,
    description:
      "Land and revenue law practice in Ahmedabad, Gujarat — land disputes, 7/12 Utara and revenue record corrections, title verification, property documentation, non-agricultural conversion and representation before the revenue authorities and the courts.",
    image: abs("/og-image.png"),
    logo: abs("/logo.svg"),
    telephone: PRACTICE.telephone,
    email: PRACTICE.email,
    address: postalAddress,
    geo: geoCoordinates,
    hasMap: PRACTICE.googleBusinessProfile,
    openingHoursSpecification,
    priceRange: PRACTICE.priceRange,
    currenciesAccepted: "INR",
    availableLanguage: [...PRACTICE.languages],
    knowsLanguage: [...PRACTICE.languages],
    areaServed: [
      "Ahmedabad",
      "Makarba",
      "Prahladnagar",
      "Vejalpur",
      "Ghodasar",
      "Isanpur",
      "Odhav",
      "Gandhinagar",
      "Gujarat",
    ].map((name) => ({ "@type": "Place", name })),
    sameAs: [...PRACTICE.sameAs],
    founder: { "@id": ID.person },
    employee: { "@id": ID.person },
    isPartOf: { "@id": ID.website },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Legal services — land & revenue law",
      itemListElement: PRACTICE_AREAS.map((area) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: area.name,
          description: area.description,
          serviceType: area.name,
          provider: { "@id": ID.practice },
          areaServed: { "@type": "AdministrativeArea", name: "Gujarat, India" },
        },
      })),
    },
  };
}

export function personSchema(): Json {
  return {
    "@type": ["Person", "Attorney"],
    "@id": ID.person,
    name: PRACTICE.name,
    alternateName: PRACTICE.shortName,
    jobTitle: PRACTICE.jobTitle,
    description:
      "Advocate practising land and revenue law in Ahmedabad, Gujarat — land disputes, revenue records, title verification and property documentation.",
    url: SITE_URL,
    image: abs("/og-image.png"),
    telephone: PRACTICE.telephone,
    email: PRACTICE.email,
    address: postalAddress,
    worksFor: { "@id": ID.practice },
    workLocation: { "@type": "Place", name: "Ahmedabad, Gujarat, India", address: postalAddress },
    knowsLanguage: [...PRACTICE.languages],
    knowsAbout: [
      "Gujarat Land Revenue Code",
      "Land dispute litigation",
      "7/12 Utara and revenue records",
      "Mutation entries",
      "Title verification and title certificates",
      "Agreement to sell and banakhat drafting",
      "Non-agricultural (bin-kheti) conversion",
      "Tenancy and tenure law",
      "Land acquisition and compensation",
      "Transfer of Property Act, 1882",
    ],
    sameAs: [...PRACTICE.sameAs],
  };
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": ID.website,
    url: SITE_URL,
    name: `${PRACTICE.name} — ${PRACTICE.tagline}`,
    inLanguage: "en-IN",
    publisher: { "@id": ID.practice },
    about: { "@id": ID.practice },
  };
}

/** Sitewide graph — rendered once, in the root layout. */
export function siteGraph(): Json {
  return {
    "@context": "https://schema.org",
    "@graph": [websiteSchema(), legalServiceSchema(), personSchema()],
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    "@id": `${abs(trail[trail.length - 1]?.path ?? "/")}#breadcrumb`,
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function faqSchema(faqs: readonly LocalFaq[], path: string): Json {
  return {
    "@type": "FAQPage",
    "@id": `${abs(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function webPageSchema(opts: {
  path: string;
  name: string;
  description: string;
  breadcrumbPath?: string;
  primaryImage?: string;
  /** ISO date the page content last changed; defaults to CONTENT_UPDATED. */
  dateModified?: string;
}): Json {
  return {
    "@type": "WebPage",
    dateModified: opts.dateModified ?? CONTENT_UPDATED,
    "@id": `${abs(opts.path)}#webpage`,
    url: abs(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": ID.website },
    about: { "@id": ID.practice },
    primaryImageOfPage: opts.primaryImage,
    breadcrumb: { "@id": `${abs(opts.breadcrumbPath ?? opts.path)}#breadcrumb` },
  };
}

/** A geography- or service-scoped service offering, for the local pages. */
export function localServiceSchema(opts: {
  path: string;
  name: string;
  description: string;
  areaServed: readonly string[];
  serviceTypes: readonly string[];
}): Json {
  return {
    "@type": "Service",
    "@id": `${abs(opts.path)}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: [...opts.serviceTypes],
    provider: { "@id": ID.practice },
    areaServed: opts.areaServed.map((name) => ({ "@type": "Place", name })),
    audience: { "@type": "Audience", audienceType: "Landowners, buyers, heirs and developers" },
    url: abs(opts.path),
  };
}

export function blogPostingSchema(opts: {
  path: string;
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  section?: string;
}): Json {
  return {
    "@type": "BlogPosting",
    "@id": `${abs(opts.path)}#article`,
    mainEntityOfPage: abs(opts.path),
    headline: opts.headline.slice(0, 110),
    description: opts.description,
    image: opts.image ? [opts.image] : undefined,
    articleSection: opts.section,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    inLanguage: "en-IN",
    author: { "@id": ID.person },
    publisher: { "@id": ID.practice },
    isPartOf: { "@id": ID.website },
  };
}

export function contactPageSchema(path: string): Json {
  return {
    "@type": "ContactPage",
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    dateModified: CONTENT_UPDATED,
    name: `Contact ${PRACTICE.name}`,
    inLanguage: "en-IN",
    isPartOf: { "@id": ID.website },
    about: { "@id": ID.practice },
    breadcrumb: { "@id": `${abs(path)}#breadcrumb` },
    mainEntity: { "@id": ID.practice },
  };
}

/** Wrap page-level nodes in a @graph with the shared @context. */
export function graph(...nodes: (Json | null | undefined)[]): Json {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) as Json[] };
}
