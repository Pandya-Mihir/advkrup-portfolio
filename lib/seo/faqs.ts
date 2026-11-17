import { ADDRESS_LINE, PRACTICE, PRACTICE_AREAS } from "@/lib/seo/site";
import { PAGE_BY_PRACTICE_AREA } from "@/lib/seo/locations";

/**
 * Question-and-answer blocks for the main pages — the format answer engines
 * (Google AI Overviews, ChatGPT search, Perplexity) quote most readily.
 *
 * Each FAQ is rendered visibly on its page AND emitted as FAQPage JSON-LD
 * from the same object, so the markup can never claim an answer the page
 * does not show. Every answer is built from facts the site already states
 * (PRACTICE, PRACTICE_AREAS, the contact form's own wording) — no new claims.
 */

export type SiteFaq = {
  q: string;
  a: string;
  /** Optional "read more" link shown under the answer (not part of the answer text). */
  link?: { href: string; label: string };
};

/** The question a client would actually type, per practice area. */
const AREA_QUESTIONS: Record<string, string> = {
  "land-dispute-litigation": "What kinds of land disputes do you handle?",
  "revenue-records": "Can you get a 7/12 Utara or 8-A entry corrected?",
  "property-documentation": "Do you verify title before a property purchase?",
  "land-acquisition": "Do you handle land acquisition and compensation claims?",
  "agricultural-land": "Can you help with buying or transferring agricultural land?",
  "land-use-conversion": "Do you handle N.A. (bin-kheti) conversion of land?",
  "tenancy-tenure": "Do you handle tenancy and tenure matters?",
  "appeals-representation": "Do you take appeals against revenue orders?",
  "land-policy-consultation": "Do you advise developers and institutions on land?",
  "court-representation": "Do you appear in the civil courts and the Gujarat High Court?",
};

export const SERVICES_FAQS: SiteFaq[] = PRACTICE_AREAS.map((area) => {
  const page = PAGE_BY_PRACTICE_AREA[area.slug];
  return {
    q: AREA_QUESTIONS[area.slug] ?? `What does ${area.name} cover?`,
    a: `Yes. ${area.description}`,
    link: page ? { href: `/${page.slug}`, label: page.title.split(" | ")[0] } : undefined,
  };
});

export const CONTACT_FAQS: SiteFaq[] = [
  {
    q: "Where is the office?",
    a: `${ADDRESS_LINE}. Directions open in Google Maps from the office section of this page.`,
  },
  {
    q: "What are the office hours?",
    a: `${PRACTICE.openingHours.display}. The office is closed on Sundays.`,
  },
  {
    q: "Can I contact the office on WhatsApp?",
    a: `Yes. WhatsApp or call ${PRACTICE.telephoneDisplay}. You can also send the enquiry form on this page and choose how you would like a reply.`,
  },
  {
    q: "Which languages can I consult in?",
    a: `${PRACTICE.languages.join(", ").replace(/, ([^,]*)$/, " and $1")}.`,
  },
  {
    q: "How soon will I hear back after sending an enquiry?",
    a: "Enquiries sent through the form are answered within one working day (Monday to Saturday), by call, WhatsApp or email as you choose. If it is urgent, call the office.",
  },
  {
    q: "What should I include in my enquiry?",
    a: "A few lines on what has happened, the survey or block number, the village and taluka, and any date coming up. Please do not send original documents yet.",
  },
  {
    q: "Does sending an enquiry make you my advocate?",
    a: "No. Sending the form does not create an advocate–client relationship, and nothing on this site is legal advice.",
  },
];
