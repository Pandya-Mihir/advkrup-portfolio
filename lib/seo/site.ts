/**
 * Single source of truth for everything SEO reads: the canonical origin, the
 * practice's NAP (Name / Address / Phone), and the service + geography lists.
 *
 * Why one file: local ranking depends on the SAME name, address and phone
 * appearing identically on the site, in the JSON-LD, and on the Google
 * Business Profile. Any drift between those three splits the signal. Change a
 * value here and it propagates to metadata, schema, sitemap and the footer.
 */

/** Canonical origin — no trailing slash. Override per-environment if needed. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://advkrupalsavjani.in"
).replace(/\/+$/, "");

/** Absolute URL for a site-relative path. */
export function abs(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const PRACTICE = {
  /** Must match the Google Business Profile name character-for-character. */
  name: "Adv. Krupal P. Savjani",
  shortName: "Adv. Krupal Savjani",
  /** Used as the business/firm name in LocalBusiness schema. */
  legalName: "Adv. Krupal P. Savjani — Advocate, Land & Revenue Law",
  jobTitle: "Advocate",
  tagline: "Land & Revenue Law Advocate in Ahmedabad, Gujarat",

  address: {
    street: "C-1207, Titanium Business Park, Makarba",
    locality: "Ahmedabad",
    region: "Gujarat",
    postalCode: "380051",
    country: "IN",
    countryName: "India",
  },

  /**
   * Taken from the Google Maps embed of the verified "Krupal Savjani
   * (Advocate)" listing on the contact page, so the schema pin and the
   * Business Profile pin are the same point.
   */
  geo: { latitude: 22.997621, longitude: 72.501757 },

  /**
   * The verified Google Business Profile, by its map CID (decimal form of the
   * 0x8af1ade1b0beed57 identifier in the contact-page embed). Listing this in
   * `sameAs` is how the site tells Google that this entity and that listing
   * are the same practice — which is what consolidates local ranking signals.
   */
  googleBusinessProfile: "https://maps.google.com/?cid=10011974631465872727",

  telephone: "+918128800351",
  telephoneDisplay: "+91 81288 00351",
  whatsapp: "918128800351",
  email: "adv.krupalsavjani@gmail.com",

  /** Mon–Sat, 10:30–19:00 IST (matches the Google Business Profile and Justdial). */
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:30",
    closes: "19:00",
    display: "Mon–Sat, 10:30 am – 7:00 pm",
  },

  /** Profiles that corroborate the entity. Keep these live and consistent. */
  sameAs: [
    "https://maps.google.com/?cid=10011974631465872727",
    "https://linkedin.com/in/krupal-savjani-a6a52a1b0/",
    "https://x.com/SavjaniKrupal",
    "https://www.justdial.com/Ahmedabad/Krupal-Savjaniadvocate-Makraba-Makarba/079PXX79-XX79-241211190605-M1X6_BZDET",
  ],

  priceRange: "₹₹",
  languages: ["Gujarati", "Hindi", "English"],
  foundingLocation: "Ahmedabad, Gujarat, India",
} as const;

/**
 * When the site's page content last changed — the date search engines and AI
 * answer engines are told (WebPage dateModified, sitemap lastmod). Bump it
 * when page copy changes. It used to be "now" on every build, which marks
 * every page as freshly changed on every deploy; crawlers learn to ignore a
 * lastmod that always moves.
 */
export const CONTENT_UPDATED = "2026-11-18";

/** Formatted one-line address — use wherever the address is shown as text. */
export const ADDRESS_LINE = `${PRACTICE.address.street}, ${PRACTICE.address.locality} — ${PRACTICE.address.postalCode}, ${PRACTICE.address.region}, ${PRACTICE.address.countryName}`;

/**
 * Practice areas. `slug` is only used for anchors on /services today, but the
 * list doubles as the `hasOfferCatalog` in LocalBusiness schema.
 */
export const PRACTICE_AREAS = [
  {
    slug: "land-dispute-litigation",
    name: "Land Dispute Litigation",
    description:
      "Ownership, possession, boundary and encroachment disputes over agricultural and non-agricultural land, carried from the revenue authorities through to the civil courts.",
  },
  {
    slug: "revenue-records",
    name: "Revenue Records & 7/12 Corrections",
    description:
      "7/12 Utara and 8-A corrections, mutation and entry proceedings, village form disputes, and appeals before the revenue hierarchy.",
  },
  {
    slug: "property-documentation",
    name: "Property Documentation & Title Verification",
    description:
      "Title search and verification, sale deeds, gift deeds, agreements to sell, banakhat, MOUs, NOC procurement and registration support.",
  },
  {
    slug: "land-acquisition",
    name: "Land Acquisition & Compensation",
    description:
      "Compensation claims, enhancement references and objections in acquisition proceedings affecting private landholdings.",
  },
  {
    slug: "agricultural-land",
    name: "Agricultural Land Matters",
    description:
      "Tenure restrictions, agriculturist eligibility, fragmentation, and transfer permissions for agricultural holdings in Gujarat.",
  },
  {
    slug: "land-use-conversion",
    name: "Conversion of Land Use (N.A. / Bin-Kheti)",
    description:
      "Non-agricultural permission applications, bin-kheti conversions, premium assessments and conditions of use.",
  },
  {
    slug: "tenancy-tenure",
    name: "Tenancy & Tenure Laws",
    description:
      "Tenancy rights, restricted-tenure land, new and impartible tenure conditions, and regularisation of past breaches.",
  },
  {
    slug: "appeals-representation",
    name: "Appeals & Revenue Representation",
    description:
      "Appeals and revisions before the Collector, the Special Secretary (Revenue) and the Gujarat Revenue Tribunal.",
  },
  {
    slug: "land-policy-consultation",
    name: "Land Policy Consultation & Due Diligence",
    description:
      "Pre-acquisition due diligence and advisory for developers, investors and institutions on landholdings, tenure, scheme position and development constraints.",
  },
  {
    slug: "court-representation",
    name: "Court Representation",
    description:
      "Representation before the Gujarat High Court, the City Civil Court at Ahmedabad and the district courts in land and property matters.",
  },
] as const;

export type PracticeArea = (typeof PRACTICE_AREAS)[number];
