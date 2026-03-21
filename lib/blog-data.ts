export type Article = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  body: string; // HTML string — swap for CMS rich-text when ready
  featured?: boolean;
};

export const articles: Article[] = [
  {
    slug: "7-12-utara-guide",
    category: "Case Study",
    date: "March 2025",
    title: "The 7/12 Utara: Understanding Gujarat's Land Record System.",
    excerpt:
      "A comprehensive breakdown of how the 7/12 extract works, what each column signifies, and how discrepancies can affect your property rights.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=85",
    featured: true,
    body: `
      <p>The 7/12 Utara (Satbara Utara) is the most critical land record document in Gujarat. It derives its name from Register 7 (ownership details) and Register 12 (cultivation details) of the village records maintained under the Gujarat Land Revenue Code, 1879.</p>
      <h2>What the 7/12 Contains</h2>
      <p>The extract is divided into two primary sections. The upper portion (Register 7) records the survey number, area of the land parcel, and most critically, the names of the owners — both possession holders and title holders. The lower portion (Register 12) records the actual cultivator, the type of crop grown in the season, and any encumbrances or government dues attached to the land.</p>
      <h2>Common Discrepancies and Their Legal Impact</h2>
      <p>A mismatch between the name recorded in the 7/12 and the name on the sale deed is the single most common source of land litigation in Gujarat. Such discrepancies arise from transliteration errors in Gujarati records, informal transfers not accompanied by mutation entries, and partition disputes where division is made physically but not recorded.</p>
      <h2>Correcting a 7/12 Entry</h2>
      <p>Corrections to the 7/12 must be pursued before the Talati (village revenue officer), with appeals lying to the Circle Officer, Mamlatdar, and ultimately the Revenue Tribunal. The process requires submitting original title documents, identity proof, and a formal application under Section 135D of the Gujarat Land Revenue Code.</p>
      <p>Adv. Krupal Savjani has successfully argued for corrections before the Mamlatdar's court in Ahmedabad, establishing that the burden of proof lies with the applicant to demonstrate clear chain of title without ambiguity.</p>
    `,
  },
  {
    slug: "mutation-of-land-records",
    category: "Property Law",
    date: "Feb 2025",
    title: "Mutation of Land Records: Process & Pitfalls.",
    excerpt:
      "A practical guide to the mutation process in Gujarat, including timelines, required documents, and how to contest wrongful mutations.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&q=85",
    body: `
      <p>Mutation (Namantaran) is the process by which the transfer of land ownership is recorded in the government's revenue records. In Gujarat, mutation is governed by Sections 135A to 135D of the Gujarat Land Revenue Code, 1879.</p>
      <h2>When Is Mutation Required?</h2>
      <p>Mutation is required after any change in ownership — whether by sale, gift, inheritance, partition, or court decree. It is important to note that mutation itself does not confer title; it is only a fiscal record for revenue purposes. However, an un-mutated record can severely hamper your ability to sell, mortgage, or develop the property.</p>
      <h2>The Mutation Process</h2>
      <p>An application for mutation must be filed before the Talati of the relevant village or the City Survey Office for urban properties. The Talati issues a public notice and, if no objection is received within 15 days, records the mutation. If an objection is filed, the matter is heard quasi-judicially by the Mamlatdar.</p>
      <h2>Wrongful Mutations: A Rising Concern</h2>
      <p>A significant number of land fraud cases in Gujarat involve wrongful mutations — where records are altered without the true owner's knowledge through forged documents or collusion with revenue officials. The legal remedy is a revision petition before the Collector under Section 211 of the Gujarat Land Revenue Code, which must be filed within three months of becoming aware of the wrongful entry.</p>
    `,
  },
  {
    slug: "adverse-possession-analysis",
    category: "Litigation",
    date: "Jan 2025",
    title: "Adverse Possession Under Indian Law: A Critical Analysis.",
    excerpt:
      "An examination of Section 27 of the Limitation Act and its application to land disputes in Gujarat courts.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1400&q=85",
    body: `
      <p>Adverse possession is a legal doctrine that allows a person who has been in open, continuous, and hostile possession of land for a prescribed period to claim ownership, extinguishing the original owner's title. Under the Limitation Act, 1963, the period is 12 years for private land and 30 years for government land.</p>
      <h2>The Essential Elements</h2>
      <p>Gujarat courts have consistently held that to succeed in an adverse possession claim, the claimant must establish: (1) actual, physical possession of the land; (2) possession that is open and visible, not clandestine; (3) possession that is continuous and uninterrupted for the statutory period; (4) possession that is hostile — i.e., without the owner's permission; and (5) an animus possidendi — the intention to possess as owner.</p>
      <h2>The Supreme Court's Shifting Position</h2>
      <p>The Supreme Court of India significantly altered the landscape in <em>Hemaji Waghaji Jat v. Bhikhabhai Khengarbhai Harijan</em> (2009), observing that adverse possession is a "highly unjust law" that rewards a wrongdoer. While the law itself was not struck down, courts have since applied it with greater scrutiny, requiring strict proof of all five elements.</p>
      <h2>Strategic Implications</h2>
      <p>For landowners, the practical lesson is that periodic inspections and prompt legal action upon discovering trespass are essential. For those relying on adverse possession, the evidentiary burden has never been higher — revenue records, witness testimony, and photographic evidence across the 12-year period must all be assembled meticulously.</p>
    `,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
