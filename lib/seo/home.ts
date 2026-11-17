import { PRACTICE } from "@/lib/seo/site";
import type { SiteFaq } from "@/lib/seo/faqs";

/**
 * Copy for the home page's two text sections ("The practice" and the FAQ).
 *
 * The home page is mostly display type and motion, which left it at ~285
 * words, too thin for search and answer engines to say what the practice does.
 * These sections add plain, useful text without new claims: the forums and
 * remedies are the ones the local pages already describe, and the FAQ is
 * rendered visibly and emitted as FAQPage JSON-LD from this same array.
 */

/** Where a Gujarat land matter is heard, bottom of the ladder first. */
export const HOME_FORUMS = [
  { name: "Talati & Mamlatdar's Office", note: "Mutation entries, 7/12 and 8-A corrections, village form records." },
  { name: "Deputy Collector (Prant)", note: "First appeals against mutation and record orders." },
  { name: "Collector", note: "Revisions, non-agricultural permissions, tenure and premium matters." },
  { name: "Special Secretary (Revenue)", note: "Revision applications against the Collector's orders." },
  { name: "Gujarat Revenue Tribunal", note: "Revisions against revenue orders, notably in tenancy and tenure matters." },
  { name: "Civil Courts & Gujarat High Court", note: "Title, partition and injunction suits; writ petitions against revenue orders." },
] as const;

/** Who the practice acts for, each pointed at the guide that fits them best. */
export const HOME_CLIENTS = [
  {
    who: "Landowners & farmers",
    what: "Record corrections, tenure and tenancy questions, N.A. conversion and acquisition compensation for agricultural and village land.",
    href: "/agricultural-land-lawyer-in-gujarat",
    label: "Agricultural land",
  },
  {
    who: "Buyers",
    what: "Title verification before any payment, the agreement to sell or banakhat, and the sale deed and its registration.",
    href: "/property-lawyer-in-ahmedabad",
    label: "Buying property",
  },
  {
    who: "Heirs & families",
    what: "Bringing an inheritance onto the 7/12 or the property card, family settlements, gift deeds and the partition of jointly held land.",
    href: "/revenue-record-lawyer-in-ahmedabad",
    label: "Records and inheritance",
  },
  {
    who: "Developers & institutions",
    what: "Due diligence on landholdings, tenure, scheme position and development constraints before land is acquired.",
    href: "/land-due-diligence-in-gujarat",
    label: "Land due diligence",
  },
] as const;

/** How a matter is taken on, in order. */
export const HOME_STEPS = [
  {
    title: "Send what you have",
    body: "Share the 7/12, the 8-A, the deeds and any notice by WhatsApp or email, even if the set is incomplete. Gaps in the chain are normal, and filling them is part of the work.",
  },
  {
    title: "The record is read",
    body: "The documents are read together to find where the record and the facts part ways, and which forum can put that right.",
  },
  {
    title: "Scope in writing",
    body: "The work, the route and the fees are confirmed in writing before anything is drafted or filed.",
  },
  {
    title: "Carried through",
    body: "The application, appeal, hearing or deed is carried through to the order or the registration, and the record is updated afterwards.",
  },
] as const;

export const HOME_FAQS: SiteFaq[] = [
  {
    q: "What does a land and revenue advocate do?",
    a: "Works on the questions that decide who can deal with a piece of land: what the revenue record says, whether the title is clean, what tenure and conditions attach to it, and how a wrong entry or a dispute is put right. In Gujarat that work runs through the Mamlatdar, the Deputy Collector, the Collector and the Gujarat Revenue Tribunal, as well as the civil courts and the High Court.",
    link: { href: "/services", label: "All practice areas" },
  },
  {
    q: "My 7/12 Utara is wrong. Where do I start?",
    a: "Start by finding out why it is wrong. A clerical slip, a mutation that was never entered, an inheritance that was never recorded and an entry certified without notice to you each have a different remedy and a different forum. Collect the current 7/12, the 8-A and the mutation entries behind them; reading those together usually shows where the record and the facts parted ways.",
    link: { href: "/revenue-record-lawyer-in-ahmedabad", label: "Revenue records and 7/12 corrections" },
  },
  {
    q: "Should I have title verified before buying property in Ahmedabad?",
    a: "Yes, before any money is paid. Registering a sale deed records the transfer; it does not cure a defect in the seller's title. Verification traces the chain through the registration and revenue records, checks tenure, conditions, dues and pending proceedings, and tells you in writing which defects can be cured before you buy.",
    link: { href: "/property-lawyer-in-ahmedabad", label: "Title verification and property documents" },
  },
  {
    q: "Does every land dispute go to court?",
    a: "No. Disputes about entries, mutation, tenure and land-use conditions generally go through the revenue authorities first, with appeals and revisions above them. Questions of title, partition and possession go to a civil court. Many matters involve both, and choosing the right forum first saves the most time.",
    link: { href: "/land-dispute-lawyer-in-ahmedabad", label: "Land disputes" },
  },
  {
    q: "What documents should I bring to the first meeting?",
    a: "Whatever you have, even if it is incomplete: the latest 7/12 or property card, the 8-A for agricultural land, every deed or agreement in the chain, the registration receipts or index-II, and any notice or order you have received. If links in the chain are missing, say so at the start; reconstructing them is ordinary work.",
  },
  {
    q: "How long does a land matter take?",
    a: "The forum sets the timeline more than the facts do. A record correction before the revenue authority can take a few months; an appeal or a revision takes longer; a civil suit for title or partition runs for years. The first assessment tells you which of these you are facing.",
  },
  {
    q: "Which areas do you serve?",
    a: "Matters are taken from across Ahmedabad, including Makarba, Prahladnagar, Vejalpur, Ghodasar, Isanpur and Odhav, and from Gandhinagar and the other districts of Gujarat. Record work, drafting and title searches do not depend on where you live; hearings are attended wherever the matter is listed.",
    link: { href: "/areas", label: "All areas served" },
  },
  {
    q: "How do I book a consultation?",
    a: `Call or WhatsApp ${PRACTICE.telephoneDisplay}, or send the enquiry form on the contact page. The office at Titanium Business Park, Makarba is open ${PRACTICE.openingHours.display}. Sending your documents ahead lets them be read before you meet.`,
    link: { href: "/contact", label: "Contact the office" },
  },
];
