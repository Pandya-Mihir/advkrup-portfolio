import type { PracticeArea } from "@/lib/seo/site";

/**
 * The ten practice areas as /services lays them out: one ledger row each.
 *
 * `slug` is the practice-area slug from PRACTICE_AREAS (lib/seo/site.ts). It
 * is the row's id — so /services#land-acquisition opens that row — and the
 * key PAGE_BY_PRACTICE_AREA uses to find the area's detail page, whose link
 * sits inside the row.
 *
 * `summary` is the one line shown on the closed row; `description` and
 * `matters` are the copy the page has always carried for the area. The
 * matters are numbered straight through the page (01–30), so their numbers
 * are derived from the row's position rather than written down here.
 */
export type LedgerArea = {
  slug: PracticeArea["slug"];
  name: string;
  summary: string;
  description: string;
  matters: [string, string, string];
  image: { src: string; alt: string };
};

export const LEDGER_AREAS: LedgerArea[] = [
  {
    slug: "land-dispute-litigation",
    name: "Land Dispute Litigation",
    summary: "Ownership, possession, boundary and encroachment disputes.",
    description:
      "The revenue court is not a place for ambiguity; it is a place for evidence-backed authority. We enter every dispute with a meticulous map of the record chain and a singular focus on securing your rightful interest in the land.",
    matters: [
      "Ownership & Possession Disputes",
      "Boundary & Encroachment Matters",
      "Agricultural Land Conflicts",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1600&q=85",
      alt: "Legal documents and pen",
    },
  },
  {
    slug: "revenue-records",
    name: "Revenue Records",
    summary: "7/12 Utara, 8-A and village forms; mutation entries.",
    description:
      "Preventing the error in the record is far more valuable than correcting it through litigation. We provide the clinical foresight needed to maintain accurate revenue records and contest erroneous entries with absolute precision.",
    matters: [
      "7/12 Utara Corrections",
      "8-A & Village Form Disputes",
      "Mutation & Entry Proceedings",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=85",
      alt: "Revenue documents and records",
    },
  },
  {
    slug: "property-documentation",
    name: "Property Documentation",
    summary: "Title verification, sale and gift deeds, NOCs.",
    description:
      "In property law, your most vulnerable asset is a title left unverified. We defend it with a combination of meticulous record analysis and aggressive legal enforcement. We don't just protect — we institutionalize your right.",
    matters: [
      "Title Verification & Search",
      "Sale & Gift Deed Drafting",
      "NOC & Court Representation",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=85",
      alt: "Property documentation",
    },
  },
  {
    slug: "land-acquisition",
    name: "Land Acquisition",
    summary: "Compensation, acquisition defence, rehabilitation.",
    description:
      "When the state exercises its power of compulsory acquisition, your right to fair compensation and due process must be defended with equal authority. We challenge inadequate awards and ensure every entitlement under the law is secured.",
    matters: [
      "Compensation Claims & Disputes",
      "Government Acquisition Defense",
      "Rehabilitation & Resettlement",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&q=85",
      alt: "Land acquisition",
    },
  },
  {
    slug: "agricultural-land",
    name: "Agricultural Land Issues",
    summary: "Sale, transfer and succession of agricultural land.",
    description:
      "Gujarat's agricultural land laws carry layers of restriction that require specialist navigation. From inheritance succession to sale and transfer compliance, we ensure rural landowners are protected at every stage of their transaction.",
    matters: [
      "Sale & Transfer of Agricultural Land",
      "Inheritance & Succession Disputes",
      "Farmer Rights & Rural Property",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=85",
      alt: "Agricultural land",
    },
  },
  {
    slug: "land-use-conversion",
    name: "Conversion of Land Use",
    summary: "N.A. conversion, Gujarat NA rules, permissions.",
    description:
      "Converting agricultural land to non-agricultural use in Gujarat demands meticulous procedural compliance. We manage the entire conversion process — from initial application to final permission — ensuring zero defect in documentation.",
    matters: [
      "Agricultural to Non-Agricultural",
      "Compliance with Gujarat NA Rules",
      "Permission & Approval Proceedings",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=85",
      alt: "Urban land conversion",
    },
  },
  {
    slug: "tenancy-tenure",
    name: "Tenancy & Tenure Laws",
    summary: "Tenancy rights, landlord–tenant proceedings, succession.",
    description:
      "Tenancy law in Gujarat is a discipline requiring absolute command of both statute and custom. We represent landlords and tenants alike in disputes over rights, evictions, and the inheritance of tenancy — with the precision the law demands.",
    matters: [
      "Tenancy Rights & Disputes",
      "Landlord–Tenant Proceedings",
      "Inheritance of Tenancy Rights",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=85",
      alt: "Tenancy law",
    },
  },
  {
    slug: "appeals-representation",
    name: "Appeals & Representation",
    summary: "Collector appeals, Revenue Tribunal, revisions.",
    description:
      "Revenue appeals demand not just legal knowledge but an authoritative command of procedural hierarchy. We represent clients before the Collector, Deputy Collector, and the Gujarat Revenue Tribunal with the full weight of evidence and argument.",
    matters: [
      "Collector & Deputy Collector Appeals",
      "Gujarat Revenue Tribunal",
      "Revision & Review Petitions",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=85",
      alt: "Court appeals",
    },
  },
  {
    slug: "land-policy-consultation",
    name: "Land Policy Consultation",
    summary: "Policy advisory, amendments, ownership structuring.",
    description:
      "The landscape of Gujarat land policy evolves constantly. We provide strategic advisory on state amendments, policy implications for existing holdings, and structuring property ownership to remain fully compliant and defensively sound.",
    matters: [
      "State Land Policy Advisory",
      "Revenue Law Amendments & Impact",
      "Property Ownership Structuring",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=85",
      alt: "Legal consultation",
    },
  },
  {
    slug: "court-representation",
    name: "Court Representation",
    summary: "Civil courts to the Gujarat High Court and Supreme Court.",
    description:
      "From civil courts to the Supreme Court of India, Adv. Savjani carries your matter to every level of the judicial hierarchy. Appellate strategy, writ petitions, and special leave petitions executed with the full force of specialist land law expertise.",
    matters: [
      "Civil Courts & Revenue Forums",
      "Gujarat High Court",
      "Supreme Court of India",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=1600&q=85",
      alt: "Court representation",
    },
  },
];

/** Two-digit ledger number: 1 → "01". */
export function ledgerNo(n: number): string {
  return String(n).padStart(2, "0");
}
