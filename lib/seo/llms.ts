import { ADDRESS_LINE, PRACTICE, PRACTICE_AREAS, SITE_URL, abs } from "@/lib/seo/site";
import { AREA_PAGES, LOCAL_PAGES, PAGE_BY_PRACTICE_AREA, SERVICE_PAGES } from "@/lib/seo/locations";

/**
 * /llms.txt and /llms-full.txt — the site, summarised for AI assistants and
 * answer engines (ChatGPT, Perplexity, Claude, Gemini / AI Overviews).
 *
 * Format follows the llms.txt proposal (llmstxt.org): an H1, a one-paragraph
 * summary in a blockquote, then sections of annotated links. Everything here
 * is built from the same data the pages render (PRACTICE, PRACTICE_AREAS,
 * LOCAL_PAGES), so the summary can never drift from the site or say anything
 * the site does not. The "full" variant adds every page's lede and FAQs, so a
 * model can answer common questions without crawling each page.
 */

function contactBlock(): string {
  return [
    `- Office: ${ADDRESS_LINE}`,
    `- Phone / WhatsApp: ${PRACTICE.telephoneDisplay}`,
    `- Email: ${PRACTICE.email}`,
    `- Hours: ${PRACTICE.openingHours.display}`,
    `- Languages: ${PRACTICE.languages.join(", ")}`,
    `- Google Business Profile: ${PRACTICE.googleBusinessProfile}`,
  ].join("\n");
}

function summary(): string {
  return `${PRACTICE.name} is an advocate in Ahmedabad, Gujarat, India, practising land and revenue law: land disputes, 7/12 Utara and revenue-record corrections, mutation entries, title verification and title certificates, sale deeds and agreements to sell, N.A. (bin-kheti) conversion, tenancy and tenure, land acquisition, revenue appeals and court representation. Office at Makarba, Ahmedabad; matters handled across Ahmedabad and Gujarat.`;
}

function practiceAreaLines(): string {
  return PRACTICE_AREAS.map((area) => {
    const page = PAGE_BY_PRACTICE_AREA[area.slug];
    const link = page ? abs(`/${page.slug}`) : abs("/services");
    return `- [${area.name}](${link}): ${area.description}`;
  }).join("\n");
}

function pageLines(pages: typeof LOCAL_PAGES): string {
  return pages.map((p) => `- [${p.h1}](${abs(`/${p.slug}`)}): ${p.lede}`).join("\n");
}

export function llmsTxt(): string {
  return `# ${PRACTICE.name} — ${PRACTICE.tagline}

> ${summary()}

## Contact

${contactBlock()}

## Key pages

- [Home](${SITE_URL}): the practice at a glance.
- [Practice areas](${abs("/services")}): the ten areas of land and revenue law the practice handles.
- [Areas served](${abs("/areas")}): every area and matter page, Ahmedabad and Gujarat.
- [Contact](${abs("/contact")}): call, WhatsApp, the enquiry form and the office location.
- [Journal](${abs("/blog")}): articles on Gujarat land and revenue law.

## Practice areas

${practiceAreaLines()}

## Areas served

${pageLines(AREA_PAGES)}

## Guides by matter

${pageLines(SERVICE_PAGES)}

## Optional

- [Full text for AI assistants](${abs("/llms-full.txt")}): every page's summary and frequently asked questions in one file.
`;
}

export function llmsFullTxt(): string {
  const pages = LOCAL_PAGES.map((p) => {
    const faqs = p.faqs.map((f) => `**Q: ${f.q}**\n\nA: ${f.a}`).join("\n\n");
    return `## ${p.h1}

URL: ${abs(`/${p.slug}`)}

${p.lede}

${p.intro.join("\n\n")}

### Frequently asked questions

${faqs}`;
  }).join("\n\n---\n\n");

  return `# ${PRACTICE.name} — ${PRACTICE.tagline} (full text)

> ${summary()}

Information on this site is general and is not legal advice; contacting the practice does not create an advocate–client relationship.

## Contact

${contactBlock()}

## Practice areas

${practiceAreaLines()}

---

${pages}
`;
}
