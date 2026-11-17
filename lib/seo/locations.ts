/**
 * Local landing pages — the content layer that targets the geography keywords.
 *
 * Each record renders one statically-generated page at `/<slug>` through
 * `app/[slug]/page.tsx`. Every record carries its OWN prose, its own local
 * context blocks and its own FAQs: pages that merely swap a place name into a
 * shared template read as doorway pages and get filtered out, so the unique
 * body copy here is the point, not decoration.
 *
 * `kind: "area"` targets "<advocate> in <place>" intent.
 * `kind: "service"` targets "<practice area> lawyer in <place>" intent.
 */

export type LocalFaq = { q: string; a: string };

export type LocalPage = {
  slug: string;
  kind: "area" | "service";

  /** <title> — keep under ~60 chars of meaningful text before the brand. */
  title: string;
  metaDescription: string;
  /** Query cluster this page owns. Also emitted as the keywords meta. */
  keywords: string[];

  /** Small uppercase label above the headline. */
  eyebrow: string;
  /** Two display lines for the oversized italic headline. */
  displayLines: [string, string];
  /** The real, keyword-bearing H1 text. */
  h1: string;
  lede: string;

  /** Place this page is about, for schema + prose. */
  place: { name: string; type: "neighbourhood" | "city" | "state"; containedIn?: string };

  /** Opening body paragraphs. */
  intro: string[];
  /** Three blocks of genuinely local substance. */
  localContext: { heading: string; body: string }[];
  /**
   * Heading overrides. The defaults ("What makes <place> different",
   * "<place> — common questions") read correctly on an area page but oddly on
   * a service page, where the subject is the matter rather than the place.
   */
  contextHeading?: string;
  faqHeading?: string;
  /**
   * For `kind: "service"` — the PRACTICE_AREAS slug this page is the detail
   * page for. `/services` uses it to link each section to its own page, which
   * is what tells Google which URL owns which topic.
   */
  practiceArea?: string;
  /** Practice-area slugs from PRACTICE_AREAS, ordered by local relevance. */
  focusAreas: string[];
  /** Authorities a client from this area actually deals with. */
  offices: { name: string; note: string }[];
  faqs: LocalFaq[];
  /** Slugs of sibling pages to link to — builds the internal link graph. */
  nearby: string[];
  /** areaServed values for this page's LocalBusiness schema. */
  areaServed: string[];
};

export const LOCAL_PAGES: LocalPage[] = [
  /* ──────────────────────────────────────────────────────────────────
     CITY — the hub page. Owns "advocate in Ahmedabad" and the
     "best advocate in Ahmedabad" cluster.
     ────────────────────────────────────────────────────────────────── */
  {
    slug: "advocate-in-ahmedabad",
    kind: "area",
    title: "Advocate in Ahmedabad | Land & Property Lawyer",
    metaDescription:
      "Advocate in Ahmedabad for land, property and revenue-record matters: 7/12 corrections, title verification, land disputes and court work. Office at Makarba.",
    keywords: [
      "advocate in ahmedabad",
      "best advocate in ahmedabad",
      "top advocate in ahmedabad",
      "lawyer in ahmedabad",
      "land advocate ahmedabad",
      "property lawyer ahmedabad",
      "revenue lawyer ahmedabad",
      "advocate ahmedabad gujarat",
    ],
    eyebrow: "Ahmedabad · Land & Revenue Practice",
    displayLines: ["Advocate in", "Ahmedabad."],
    h1: "Advocate in Ahmedabad for Land, Property & Revenue Matters",
    lede:
      "A land and revenue practice run out of Makarba, Ahmedabad — for owners, buyers, heirs and developers whose title, records or possession are in question.",
    place: { name: "Ahmedabad", type: "city", containedIn: "Gujarat" },
    intro: [
      "Most people searching for an advocate in Ahmedabad are not looking for general legal advice. They are holding a document that does not match a record: a 7/12 Utara that still names a grandfather, a sale deed whose boundaries do not line up with the survey number, a banakhat signed years ago that the other side now denies, or a notice from a revenue office they did not expect.",
      "This is a dedicated land and revenue practice. It does not take on every category of dispute — it takes on the ones where the answer lives in the land records, the registration trail and the revenue hierarchy, and where getting the paperwork right the first time is worth more than argument later.",
      "The office is at Titanium Business Park in Makarba, on the Corporate Road side of west Ahmedabad, which keeps it within reach of both the Gujarat High Court at Sola and the registration and revenue offices that most Ahmedabad land matters pass through.",
    ],
    localContext: [
      {
        heading: "Ahmedabad land records sit across two systems at once",
        body:
          "As the city absorbed the revenue villages around it, holdings that were recorded as agricultural land on a 7/12 Utara were brought onto City Survey property cards, and town planning schemes replaced original survey numbers with final plot numbers. A great many Ahmedabad title problems are simply the seam between those systems — an entry that was never carried forward, or a plot described in two incompatible ways in two live records. Reading both sides of that seam is the first step in almost every matter here.",
      },
      {
        heading: "Value moved faster than the paperwork",
        body:
          "Land on the city's western and eastern edges changed hands repeatedly through unregistered agreements, powers of attorney and family arrangements while it was still cheap. Once values rose, those informal links in the chain became the weak point — and the people who signed them are often no longer available to confirm anything. Reconstructing a defensible chain of title from that kind of record is a large part of this practice.",
      },
      {
        heading: "The revenue route often beats the court route",
        body:
          "A mutation entry, a correction application or a well-framed appeal before the Collector can resolve in months what a civil suit would take years to reach. Knowing which matters belong in the revenue hierarchy and which genuinely need a civil court or the High Court is the difference between a cost-effective outcome and a decade of litigation.",
      },
    ],
    focusAreas: [
      "land-dispute-litigation",
      "revenue-records",
      "property-documentation",
      "court-representation",
      "land-acquisition",
      "land-use-conversion",
    ],
    offices: [
      { name: "Gujarat High Court, Sola", note: "Writ petitions and appeals in land and revenue matters." },
      { name: "City Civil & Sessions Court, Ahmedabad", note: "Title, declaration, injunction and partition suits." },
      { name: "Collector's Office, Ahmedabad", note: "Appeals, revisions and non-agricultural permissions." },
      { name: "Mamlatdar's Office", note: "Mutation entries, 7/12 and 8-A corrections, village form records." },
      { name: "City Survey Superintendent's Office", note: "Property cards and city survey measurement records." },
      { name: "Sub-Registrar's Office", note: "Registration of sale deeds, gift deeds and agreements to sell." },
      { name: "Gujarat Revenue Tribunal", note: "Revisions against orders of the revenue authorities." },
      { name: "AMC / AUDA Town Planning", note: "Final plot records, TP scheme queries and development permissions." },
    ],
    faqs: [
      {
        q: "How do I choose the best advocate in Ahmedabad for a land matter?",
        a: "Ignore the adjectives and look at fit. Ask whether the advocate's practice is actually in land and revenue law or whether land is a sideline; ask how many matters they have run through the revenue hierarchy rather than only the civil courts; ask them to tell you, before you pay anything, whether your matter belongs before the Mamlatdar, the Collector, the Tribunal or a civil court — and why. An advocate who can map your problem to the right forum in the first meeting is worth more than one who promises an outcome.",
      },
      {
        q: "What documents should I bring to the first consultation?",
        a: "Whatever you have, even if it is incomplete: the latest 7/12 Utara or property card, the 8-A if it is agricultural land, every sale deed, banakhat, gift deed or agreement in the chain, any index-II or registration receipt, the property tax bill, and any notice or order you have received. Photographs of the land and a rough sketch of the boundaries help. If you are missing links in the chain, say so — reconstructing the gaps is normal work, not a reason to delay the meeting.",
      },
      {
        q: "Do you handle matters outside Ahmedabad city?",
        a: "Yes. Revenue and land matters across Gujarat are handled, including districts around Ahmedabad and the Dholera belt. Hearings in other districts are attended where required, and much of the record work — searches, corrections, drafting — does not depend on where you are.",
      },
      {
        q: "How long does a land dispute in Ahmedabad take?",
        a: "It depends entirely on the forum. A straightforward mutation or record correction before the revenue authority can take a few months. An appeal to the Collector or a revision to the Gujarat Revenue Tribunal typically runs longer. A civil suit for title or partition in the City Civil Court is a multi-year commitment. Part of the first assessment is telling you honestly which of these you are looking at, because the forum sets the timeline far more than the facts do.",
      },
      {
        q: "What are your consultation charges?",
        a: "Fees depend on the nature and stage of the matter — a title verification is priced differently from a contested suit. Call +91 81288 00351 or send the documents by WhatsApp or email first; the scope is confirmed in writing before any work begins, so there are no surprises.",
      },
      {
        q: "Where exactly is the office in Ahmedabad?",
        a: "C-1207, Titanium Business Park, Makarba, Ahmedabad — 380015, on the Corporate Road side of west Ahmedabad. Office hours are Monday to Saturday, 10:00 am to 7:00 pm. Appointments are preferred so that your documents can be read before you arrive.",
      },
    ],
    nearby: [
      "advocate-in-makarba",
      "advocate-in-prahladnagar",
      "advocate-in-vejalpur",
      "advocate-in-ghodasar",
      "advocate-in-isanpur",
      "advocate-in-odhav",
    ],
    areaServed: ["Ahmedabad", "Ahmedabad District", "Gandhinagar", "Gujarat"],
  },

  /* ──────────────────────────────────────────────────────────────────
     STATE
     ────────────────────────────────────────────────────────────────── */
  {
    slug: "advocate-in-gujarat",
    kind: "area",
    title: "Advocate in Gujarat | Land & Revenue Law Practice",
    metaDescription:
      "Advocate in Gujarat for land and revenue law: Land Revenue Code matters, tenancy and tenure, N.A. conversion, title certificates and Tribunal appeals.",
    keywords: [
      "advocate in gujarat",
      "best advocate in gujarat",
      "land advocate gujarat",
      "revenue lawyer gujarat",
      "gujarat land revenue code lawyer",
      "property lawyer gujarat",
      "land dispute lawyer gujarat",
    ],
    eyebrow: "Gujarat · Statewide Land Practice",
    displayLines: ["Advocate in", "Gujarat."],
    h1: "Advocate in Gujarat for Land, Revenue & Property Law",
    lede:
      "Land law in Gujarat is its own discipline — a stack of statutes, tenure conditions and record systems that behaves differently from general civil practice. This is a practice built on that stack.",
    place: { name: "Gujarat", type: "state", containedIn: "India" },
    intro: [
      "Land in Gujarat is governed by a layered body of law: the Gujarat Land Revenue Code, the tenancy and agricultural lands legislation, the fragmentation and consolidation statute, the Transfer of Property Act, the Registration Act and the Gujarat Stamp Act — each of which can decide the outcome of a transaction that looks simple on its face.",
      "The practical consequence is that a great many Gujarat land problems are not disputes at all. They are conditions: a tenure restriction nobody checked, a permission that was never obtained, a fragmentation bar, an agriculturist-eligibility question, a premium that was never paid. Those conditions sit quietly in the record until a sale, a loan or an inheritance brings them up.",
      "This practice works on exactly that material — statewide, from an office in Ahmedabad — for landowners, buyers, developers and heirs who need to know what their land can and cannot do before they commit to it.",
    ],
    localContext: [
      {
        heading: "Tenure decides what a transfer is even capable of",
        body:
          "A holding on new and impartible tenure, or on restricted tenure, cannot simply be sold the way freehold land can. Transfers may need prior permission, may attract a premium, and may be void or voidable without it. Checking tenure before anything is signed prevents the most expensive category of mistake in Gujarat land practice — a completed transaction that the record will not recognise.",
      },
      {
        heading: "Agricultural land carries eligibility questions of its own",
        body:
          "Who may purchase agricultural land in Gujarat, and on what terms, is a question with real teeth. So are fragmentation limits, which can invalidate a sub-division of a holding below the prescribed standard area. These are not technicalities that get waived — they are grounds on which a sale falls apart years later.",
      },
      {
        heading: "Non-agricultural conversion is a process, not a formality",
        body:
          "Converting agricultural land to non-agricultural use — the bin-kheti route — runs through applications, self-declarations, premium assessments and conditions of use that attach to the land afterwards. Breaches of those conditions surface at the worst possible moment, usually when the land is being sold or mortgaged. Getting the conversion and its conditions documented properly is cheaper than regularising it later.",
      },
    ],
    focusAreas: [
      "agricultural-land",
      "tenancy-tenure",
      "land-use-conversion",
      "revenue-records",
      "appeals-representation",
      "land-dispute-litigation",
    ],
    offices: [
      { name: "Gujarat High Court, Ahmedabad", note: "Writ and appellate jurisdiction in land and revenue matters." },
      { name: "Gujarat Revenue Tribunal", note: "Revisions against orders of revenue authorities across the state." },
      { name: "Office of the Special Secretary (Revenue)", note: "Revision applications in revenue proceedings." },
      { name: "District Collector's Offices", note: "Appeals, N.A. permissions and tenure-related applications." },
      { name: "Mamlatdar & Taluka Offices", note: "Mutation, 7/12 and 8-A records, village form entries." },
      { name: "Sub-Registrar's Offices", note: "Registration and index-II searches across districts." },
    ],
    faqs: [
      {
        q: "Do you take land matters from districts outside Ahmedabad?",
        a: "Yes. The practice is statewide. Record work — title searches, 7/12 and property card analysis, drafting, correction and permission applications — is handled for land anywhere in Gujarat, and hearings in district forums are attended where the matter requires it.",
      },
      {
        q: "Can a non-agriculturist buy agricultural land in Gujarat?",
        a: "Not freely. Eligibility to hold agricultural land in Gujarat is restricted, and the restrictions interact with the tenure on which the particular holding is recorded. Some situations have a lawful route through prior permission or conversion; others do not. This must be checked against the specific 7/12 and tenure entries before any money changes hands, because a transfer made in breach does not become valid by being registered.",
      },
      {
        q: "What is a title certificate and when do I need one?",
        a: "A title certificate is a written opinion, backed by a search of the registration and revenue records, on who holds the land, on what tenure, subject to what encumbrances, and with what gaps in the chain. Banks and institutional buyers usually require one. Private buyers should want one for any purchase of consequence — it is the cheapest point at which a defect can still be fixed.",
      },
      {
        q: "What does the Gujarat Revenue Tribunal actually decide?",
        a: "It exercises revisional jurisdiction over orders made by revenue authorities — the Mamlatdar, the Deputy Collector, the Collector — in matters such as mutation entries, tenancy, tenure and land-use conditions. It is the right forum for a large class of land problems that would otherwise be pushed into a civil suit, and reaching it on a properly framed record matters a great deal.",
      },
      {
        q: "How do I begin if my land is in another district?",
        a: "Send what you have — 7/12 Utara, 8-A, any deeds and any orders or notices — to +91 81288 00351 on WhatsApp or to adv.krupalsavjani@gmail.com. An initial read of the records will tell you what the issue is and which forum it belongs in before you travel anywhere.",
      },
    ],
    nearby: ["advocate-in-ahmedabad", "advocate-in-makarba", "land-dispute-lawyer-in-ahmedabad"],
    areaServed: [
      "Gujarat",
      "Ahmedabad",
      "Gandhinagar",
      "Dholera",
      "Kheda",
      "Anand",
      "Vadodara",
      "Surat",
      "Rajkot",
      "Mehsana",
      "Bhavnagar",
    ],
  },

  /* ──────────────────────────────────────────────────────────────────
     NEIGHBOURHOODS
     ────────────────────────────────────────────────────────────────── */
  {
    slug: "advocate-in-makarba",
    kind: "area",
    title: "Advocate in Makarba, Ahmedabad | Office at Titanium Park",
    metaDescription:
      "Advocate at Makarba, Ahmedabad (Titanium Business Park): land disputes, 7/12 and property card corrections, title verification and sale deeds.",
    keywords: [
      "advocate near makarba",
      "advocate in makarba",
      "lawyer in makarba ahmedabad",
      "advocate near me makarba",
      "makarba advocate office",
      "land lawyer makarba",
      "property lawyer makarba ahmedabad",
      "advocate titanium business park",
    ],
    eyebrow: "Makarba · The Office Itself",
    displayLines: ["Advocate in", "Makarba."],
    h1: "Advocate in Makarba, Ahmedabad — Land & Property Law",
    lede:
      "The office is in Makarba: C-1207, Titanium Business Park, on Corporate Road. If you are searching for an advocate near Makarba, this is a short walk or a two-minute drive rather than a trip across the city.",
    place: { name: "Makarba", type: "neighbourhood", containedIn: "Ahmedabad" },
    intro: [
      "Makarba is where this practice actually sits, which matters more than it sounds. Land and revenue work is document work: you will be bringing originals, signing drafts, collecting certified copies and sometimes doing all three in the same week. Having the office at Titanium Business Park, minutes from Prahladnagar and the S.G. Highway corridor, removes most of that friction for anyone in the Makarba, Vejalpur and Sarkhej belt.",
      "It also means the local record history is familiar ground. Makarba was a revenue village before the city reached it, and its land has been through the full sequence — agricultural 7/12 entries, non-agricultural conversion, town planning schemes, and finally city survey property cards and commercial towers.",
      "That sequence is the source of most title questions here. Each step left records behind, and the records do not always agree with one another.",
    ],
    localContext: [
      {
        heading: "Original survey numbers versus TP final plots",
        body:
          "Town planning schemes in and around Makarba replaced original survey numbers with final plot numbers, and reallocated area in the process. A deed or an old agreement that describes land by its original survey number can be genuinely difficult to map onto the plot as it exists today. Reconciling the two descriptions — and establishing which part of the original holding became which final plot — is routine work on Makarba properties and the first thing worth checking before a purchase.",
      },
      {
        heading: "Old informal agreements on now-expensive land",
        body:
          "A great deal of Makarba land changed hands on unregistered banakhats, powers of attorney and family understandings while it was still farmland on the city's edge. Values on Corporate Road have since made every one of those links worth contesting. Where a chain of title runs through documents that were never registered, the question is what can still be proved, what can be cured, and what has to be litigated — and that assessment should happen before a transaction, not after.",
      },
      {
        heading: "Commercial units need a different diligence than plots",
        body:
          "Buying or leasing an office floor in one of the business parks here is not the same exercise as buying land. The chain runs through the developer's title to the underlying land, the scheme and development permissions, the association or holding structure, and the specific unit's share in common areas. Each of those is a separate place where a defect can hide.",
      },
    ],
    focusAreas: [
      "property-documentation",
      "revenue-records",
      "land-dispute-litigation",
      "land-use-conversion",
      "court-representation",
    ],
    offices: [
      { name: "Sub-Registrar's Office (west Ahmedabad)", note: "Registration and index-II searches for Makarba properties." },
      { name: "City Survey Superintendent's Office", note: "Property cards for city-survey land in Makarba." },
      { name: "Mamlatdar's Office", note: "Mutation entries and 7/12 corrections where land is still on revenue records." },
      { name: "AUDA / AMC Town Planning", note: "TP scheme and final plot records for the Makarba belt." },
      { name: "Gujarat High Court, Sola", note: "A short run up the S.G. Highway from the office." },
    ],
    faqs: [
      {
        q: "Where is your office in Makarba?",
        a: "C-1207, Titanium Business Park, Makarba, Ahmedabad — 380015, on the Corporate Road side. Open Monday to Saturday, 10:00 am to 7:00 pm. Please call +91 81288 00351 to fix a time, so your documents can be read before you arrive rather than during the meeting.",
      },
      {
        q: "I searched for an advocate near me in Makarba — do you take small matters?",
        a: "Yes. A single 7/12 correction, one mutation entry, a notarised agreement to sell, an affidavit, or a read-through of a deed before you sign it are all normal work. Not every land question needs litigation, and a short consultation is often the entire answer.",
      },
      {
        q: "My deed describes the land by old survey number — is that a problem?",
        a: "It is a common situation in Makarba and usually solvable, but it does need to be addressed. The land has to be traced from the original survey number through the town planning scheme to the final plot number and the current property card, so that what you own on paper and what exists on the ground are described the same way. Doing this before a sale avoids a buyer's lawyer raising it at the worst moment.",
      },
      {
        q: "Can you verify title on a commercial unit in one of the business parks here?",
        a: "Yes. That verification covers the developer's title to the underlying land, the scheme and development permissions, the registration chain for the specific unit, encumbrances and dues, and the structure through which common areas and parking are held. It is reported to you in writing, with the defects separated from the merely untidy.",
      },
      {
        q: "Do you handle matters in Prahladnagar, Vejalpur and Sarkhej too?",
        a: "Yes — those are the adjoining areas and much of the record history is shared. See the Prahladnagar and Vejalpur pages, or simply call; the office serves the whole western belt of Ahmedabad.",
      },
    ],
    nearby: ["advocate-in-prahladnagar", "advocate-in-vejalpur", "advocate-in-ahmedabad", "property-lawyer-in-ahmedabad"],
    areaServed: ["Makarba", "Prahladnagar", "Vejalpur", "Sarkhej", "Bopal", "Ahmedabad"],
  },

  {
    slug: "advocate-in-prahladnagar",
    kind: "area",
    title: "Advocate in Prahladnagar, Ahmedabad | Property & Land Law",
    metaDescription:
      "Advocate near Prahladnagar, Ahmedabad for property matters: title verification, sale deeds, lease and licence drafting, land disputes. Office at Makarba.",
    keywords: [
      "advocate in prahladnagar",
      "advocate near prahladnagar",
      "lawyer in prahladnagar ahmedabad",
      "property lawyer prahladnagar",
      "commercial property advocate ahmedabad",
      "advocate corporate road ahmedabad",
    ],
    eyebrow: "Prahladnagar · Corporate Road",
    displayLines: ["Advocate in", "Prahladnagar."],
    h1: "Advocate in Prahladnagar, Ahmedabad — Property & Land Law",
    lede:
      "Prahladnagar runs on commercial property: office floors, retail units, leases and licences. The office is immediately adjacent, at Titanium Business Park in Makarba.",
    place: { name: "Prahladnagar", type: "neighbourhood", containedIn: "Ahmedabad" },
    intro: [
      "Prahladnagar and the Corporate Road stretch carry a different kind of property work from the rest of the city. The asset is usually a unit rather than a plot, the parties are usually businesses, and the documents are usually leases, licences, development agreements and unit sale deeds rather than 7/12 entries.",
      "What does not change is the diligence. A commercial unit is only as good as the developer's title to the land under it, the permissions the building was raised on, and the structure through which common areas, parking and amenities are held.",
      "Because the office is next door in Makarba, meetings, signings and document collection in Prahladnagar are same-day work rather than a scheduling problem.",
    ],
    localContext: [
      {
        heading: "The unit is downstream of the land",
        body:
          "Buyers of commercial floors often review only the unit's own chain and stop there. The defects that actually cost money are usually a level below — in the title to the underlying land, in the town planning scheme position, or in a development permission condition that was never complied with. Diligence here starts at the land and works upward to the unit.",
      },
      {
        heading: "Leave and licence versus lease is not a drafting preference",
        body:
          "The distinction changes the rights the occupier acquires, the protection available on expiry, the stamp duty payable and whether registration is required. Documents drafted loosely in this area create disputes that are entirely avoidable, and the cost of getting the instrument right is trivial next to the cost of arguing about it later.",
      },
      {
        heading: "Associations, maintenance and common areas",
        body:
          "How common areas, parking and maintenance are held and charged in a commercial building is a recurring source of conflict between unit owners, associations and developers. Those terms are set in the documents you sign at purchase, which is the point at which they can still be negotiated.",
      },
    ],
    focusAreas: [
      "property-documentation",
      "land-dispute-litigation",
      "court-representation",
      "revenue-records",
    ],
    offices: [
      { name: "Sub-Registrar's Office (west Ahmedabad)", note: "Registration of unit deeds and registered leases." },
      { name: "City Survey Superintendent's Office", note: "Property cards for the underlying land." },
      { name: "AMC / AUDA Town Planning", note: "Development permissions, final plot and scheme records." },
      { name: "City Civil Court, Ahmedabad", note: "Possession, specific performance and injunction matters." },
    ],
    faqs: [
      {
        q: "Do you review commercial lease and leave-and-licence agreements?",
        a: "Yes — drafting, review and negotiation, from either side. The review covers the term and renewal mechanics, lock-in and exit, escalation, deposit and its return, maintenance and outgoings, permitted use, and the stamp duty and registration position, which is frequently the part that gets handled wrongly.",
      },
      {
        q: "What does title diligence on an office unit in Prahladnagar cover?",
        a: "The developer's title to the land, the town planning and final plot position, development and occupancy permissions, the registration chain to your seller, encumbrance and dues searches, the association or holding structure, and the unit's documented share in common areas and parking. You receive a written report that separates real defects from untidy paperwork.",
      },
      {
        q: "How far is your office from Prahladnagar?",
        a: "A few minutes. C-1207, Titanium Business Park, Makarba, Ahmedabad — 380015, on Corporate Road. Monday to Saturday, 10:00 am to 7:00 pm, by appointment on +91 81288 00351.",
      },
      {
        q: "Can you act for a company rather than an individual?",
        a: "Yes. Corporate purchasers, lessees and lessors are regular clients for property documentation and for land diligence on sites being acquired or developed.",
      },
    ],
    nearby: ["advocate-in-makarba", "advocate-in-vejalpur", "advocate-in-ahmedabad", "property-lawyer-in-ahmedabad"],
    areaServed: ["Prahladnagar", "Makarba", "Vejalpur", "Satellite", "Ahmedabad"],
  },

  {
    slug: "advocate-in-vejalpur",
    kind: "area",
    title: "Advocate in Vejalpur, Ahmedabad | Land & Property Lawyer",
    metaDescription:
      "Advocate in Vejalpur, Ahmedabad: property card and 7/12 corrections, old gamtal title issues, society redevelopment, sale deeds and land disputes.",
    keywords: [
      "advocate in vejalpur",
      "advocate near vejalpur",
      "lawyer in vejalpur ahmedabad",
      "property lawyer vejalpur",
      "land advocate vejalpur ahmedabad",
      "juhapura advocate",
    ],
    eyebrow: "Vejalpur · West Ahmedabad",
    displayLines: ["Advocate in", "Vejalpur."],
    h1: "Advocate in Vejalpur, Ahmedabad — Land, Property & Records",
    lede:
      "Vejalpur's property questions are usually paperwork questions: thin chains of title on older plots, property cards that do not match possession, and societies trying to redevelop.",
    place: { name: "Vejalpur", type: "neighbourhood", containedIn: "Ahmedabad" },
    intro: [
      "Vejalpur grew as its own municipality before being brought into the city, and that history shows up in its records. Older plots in and around the original village site frequently have a documentary trail that is short, informal, or partly missing, even where possession has been undisturbed for decades.",
      "That combination — strong possession, weak paper — is workable, but it has to be addressed deliberately. It cannot simply be ignored until a buyer, a bank or an heir asks the question.",
      "The office is in Makarba, adjoining Vejalpur, so document collection and signings are local rather than a cross-city errand.",
    ],
    localContext: [
      {
        heading: "Old gamtal plots and short chains of title",
        body:
          "Properties on or around the original village site often rest on a handful of documents, sometimes unregistered, sometimes with a generation missing from the chain. The remedy is usually a combination of record correction, properly drafted declarations and, where the facts support it, a declaratory proceeding — not a single filing, but a sequence that ends with a title a buyer's advocate will accept.",
      },
      {
        heading: "Society redevelopment turns latent defects into live ones",
        body:
          "When an older co-operative housing society in Vejalpur moves to redevelop, every member's individual title is examined properly for the first time in years. Share certificates that were never aligned with registered documents, transfers recorded only in the society's books, and heirs who were never brought on record all surface at once. Sorting a member's title early is far cheaper than holding up the whole scheme later.",
      },
      {
        heading: "Property cards that have stopped matching reality",
        body:
          "Sub-divisions, amalgamations, inheritances and transfers that were never carried through to the city survey record leave a property card describing a state of affairs that no longer exists. Correcting it is an administrative process with a defined route, and it is almost always worth doing before a transaction rather than during one.",
      },
    ],
    focusAreas: [
      "revenue-records",
      "property-documentation",
      "land-dispute-litigation",
      "court-representation",
      "agricultural-land",
    ],
    offices: [
      { name: "City Survey Superintendent's Office", note: "Property card corrections and measurement records." },
      { name: "Sub-Registrar's Office (west Ahmedabad)", note: "Registration and index-II searches." },
      { name: "Mamlatdar's Office", note: "Mutation entries and village form records." },
      { name: "AMC Town Planning", note: "Final plot and scheme position for Vejalpur properties." },
      { name: "City Civil Court, Ahmedabad", note: "Declaratory, partition and injunction suits." },
    ],
    faqs: [
      {
        q: "My family has held a Vejalpur plot for decades but the papers are incomplete. What can be done?",
        a: "Long undisturbed possession is a real asset, but it has to be converted into documentation. The usual approach is to search and reconstruct whatever registration and revenue trail exists, correct the record where it can be corrected administratively, document the family position properly through declarations and, where that is not enough, seek a declaration from the court. The right mix depends on what the record actually shows, which is why the first step is a search rather than a filing.",
      },
      {
        q: "How do I correct a mistake in a property card?",
        a: "Through an application to the City Survey office, supported by the documents that prove the correct position — deeds, succession documents, prior entries, measurement records. Clerical errors are relatively quick. Where the correction effectively decides who owns what, the authority will not resolve it administratively and the matter has to be framed properly instead.",
      },
      {
        q: "Our society is redeveloping and members' titles are being questioned. Can you help individual members?",
        a: "Yes. Individual members are assisted with establishing and documenting their own title — aligning share certificates with registered documents, bringing heirs on record, and clearing gaps — so that they are not the reason the scheme stalls.",
      },
      {
        q: "Do you attend the Vejalpur and west Ahmedabad offices personally?",
        a: "Yes. Record work in this belt is handled directly rather than passed down a chain, which is usually why it moves.",
      },
    ],
    nearby: ["advocate-in-makarba", "advocate-in-prahladnagar", "advocate-in-ahmedabad", "revenue-record-lawyer-in-ahmedabad"],
    areaServed: ["Vejalpur", "Juhapura", "Makarba", "Sarkhej", "Ahmedabad"],
  },

  {
    slug: "advocate-in-ghodasar",
    kind: "area",
    title: "Advocate in Ghodasar, Ahmedabad | Land & Property Lawyer",
    metaDescription:
      "Advocate in Ghodasar, Ahmedabad: society title problems, 7/12 and property card corrections, inherited plots, sale deeds and land disputes.",
    keywords: [
      "advocate in ghodasar",
      "advocate near ghodasar",
      "lawyer in ghodasar ahmedabad",
      "property lawyer ghodasar",
      "land advocate ghodasar",
      "advocate near me ghodasar ahmedabad",
    ],
    eyebrow: "Ghodasar · South-East Ahmedabad",
    displayLines: ["Advocate in", "Ghodasar."],
    h1: "Advocate in Ghodasar, Ahmedabad — Land, Society & Property Matters",
    lede:
      "Ghodasar is co-operative society territory built on former farmland. Most title questions here are about what the society's books say versus what the registered record says.",
    place: { name: "Ghodasar", type: "neighbourhood", containedIn: "Ahmedabad" },
    intro: [
      "Ghodasar filled in as agricultural land on the south-east side of Ahmedabad was converted and laid out into co-operative housing societies and plotted schemes. Two generations of transfers have happened since, and a significant share of them were recorded in a society's register rather than in a registered instrument.",
      "That works until it does not. A sale, a loan application, a death in the family or a redevelopment proposal puts the question squarely: can you produce a title that an institution will accept?",
      "This practice does that work — reconciling society records with registered title, correcting the revenue and city survey record, bringing heirs on record, and litigating only where the record genuinely cannot be fixed administratively.",
    ],
    localContext: [
      {
        heading: "Share certificate is not title",
        body:
          "A society share certificate and an entry in the society's transfer register record your membership. They are not a substitute for a registered instrument showing how the property came to you. Where a chain runs through society paperwork alone, it needs to be reconstructed and regularised before anybody tries to sell, mortgage or inherit — and the people whose signatures would make that easy tend to become harder to find with time.",
      },
      {
        heading: "Converted farmland carries its conditions forward",
        body:
          "Land in this belt moved from agricultural 7/12 records through non-agricultural permission into plotted development. The conditions attached at conversion, and any premium or compliance left outstanding, do not disappear when the plots are sold on. They attach to the land and surface during diligence, sometimes decades later.",
      },
      {
        heading: "Inherited plots with nobody brought on record",
        body:
          "A very common Ghodasar matter: the recorded holder died years ago, the family divided the property informally, and nobody updated the record. The fix is a succession and mutation exercise done properly across all the heirs — which is straightforward while everyone is cooperative and considerably harder once one branch disagrees.",
      },
    ],
    focusAreas: [
      "property-documentation",
      "revenue-records",
      "land-dispute-litigation",
      "court-representation",
      "land-use-conversion",
    ],
    offices: [
      { name: "Sub-Registrar's Office (south/east Ahmedabad)", note: "Registration and index-II searches for Ghodasar." },
      { name: "City Survey Superintendent's Office", note: "Property cards for city-survey land." },
      { name: "Mamlatdar's Office", note: "Mutation, 7/12 and 8-A corrections." },
      { name: "District Registrar of Co-operative Societies", note: "Society membership and transfer disputes." },
      { name: "City Civil Court, Ahmedabad", note: "Title, partition and injunction suits." },
    ],
    faqs: [
      {
        q: "I only have a society share certificate for my Ghodasar plot. Is that enough to sell?",
        a: "Usually not, on its own. A buyer's advocate or a bank will want a registered chain of title and a clean revenue or city survey record behind the membership. The practical step is to establish what registered documents exist, identify the gaps, and regularise them — which is almost always possible, and much easier before you have a buyer waiting.",
      },
      {
        q: "The recorded owner died and nothing was ever updated. Where do we start?",
        a: "With a succession and mutation exercise: establishing the heirs, documenting the family's division if there is one, and applying to have the record corrected in the names entitled to it. Where all heirs agree, this is administrative work. Where one does not, it becomes a partition or declaratory matter — so it is worth doing while there is agreement.",
      },
      {
        q: "Do you handle disputes with the society itself?",
        a: "Yes — membership and transfer refusals, share transfer disputes, and the interaction between a society's internal decisions and a member's registered title.",
      },
      {
        q: "How far is Ghodasar from your office?",
        a: "The office is at Titanium Business Park, Makarba, on the west side of the city. Clients from Ghodasar generally come in by appointment, and much of the preliminary work can be done from documents sent on WhatsApp to +91 81288 00351 before you travel.",
      },
      {
        q: "Do you also cover Isanpur, Vatva and Maninagar?",
        a: "Yes — the whole south-east belt, which shares much of the same record history. See the Isanpur page, or call to discuss your specific property.",
      },
    ],
    nearby: ["advocate-in-isanpur", "advocate-in-odhav", "advocate-in-ahmedabad", "revenue-record-lawyer-in-ahmedabad"],
    areaServed: ["Ghodasar", "Isanpur", "Vatva", "Maninagar", "Narol", "Ahmedabad"],
  },

  {
    slug: "advocate-in-isanpur",
    kind: "area",
    title: "Advocate in Isanpur, Ahmedabad | Land & Property Lawyer",
    metaDescription:
      "Advocate in Isanpur, Ahmedabad: 7/12 and property card corrections, N.A. conversion, plotted-scheme title problems, sale deeds and land disputes.",
    keywords: [
      "advocate in isanpur",
      "advocate near isanpur",
      "lawyer in isanpur ahmedabad",
      "property lawyer isanpur",
      "land advocate isanpur ahmedabad",
      "advocate near me isanpur",
    ],
    eyebrow: "Isanpur · South Ahmedabad",
    displayLines: ["Advocate in", "Isanpur."],
    h1: "Advocate in Isanpur, Ahmedabad — Land, Revenue & Property Law",
    lede:
      "Isanpur sits where converted agricultural land met rapid plotted development. The records from that period are where most of its title problems come from.",
    place: { name: "Isanpur", type: "neighbourhood", containedIn: "Ahmedabad" },
    intro: [
      "South Ahmedabad around Isanpur developed quickly, and much of it developed on land that had just been converted from agricultural use. Plots were laid out, sold on, sub-divided and sold again — frequently faster than the revenue and city survey records could absorb.",
      "The result is a belt where the documents, the record and the ground do not always describe the same thing. Boundaries have drifted, sub-divisions were never recorded, and conversion conditions were sometimes left half-complied.",
      "Sorting that out is ordinary work for this practice: search the record, identify precisely where it diverges from the documents, and take the administrative route where one exists before considering litigation.",
    ],
    localContext: [
      {
        heading: "Sub-divisions that never reached the record",
        body:
          "A plot divided between brothers, or sold in two halves, often continued to exist as a single entry in the record for years afterwards. Every later transaction then inherits an ambiguity about what exactly is being sold. Recording the sub-division correctly — and checking it against fragmentation limits where the land is still agricultural — is what makes the plot sellable.",
      },
      {
        heading: "N.A. conversion conditions left outstanding",
        body:
          "Non-agricultural permission comes with conditions and sometimes with a premium. Where land in this belt was converted and developed in a hurry, compliance was occasionally incomplete. Those gaps are found during a buyer's diligence or a bank's valuation, usually at the worst possible time, and they are cheaper to regularise before that point.",
      },
      {
        heading: "Boundaries on the ground versus boundaries on paper",
        body:
          "Encroachment and boundary disputes in Isanpur are frequently not disputes about ownership at all — they are disagreements about where a line falls. Resolving them starts with the measurement record and the city survey position rather than with allegations, which is also what makes them settleable without a long suit.",
      },
    ],
    focusAreas: [
      "revenue-records",
      "land-use-conversion",
      "land-dispute-litigation",
      "property-documentation",
      "court-representation",
    ],
    offices: [
      { name: "Mamlatdar's Office", note: "Mutation entries, 7/12 and 8-A corrections." },
      { name: "City Survey Superintendent's Office", note: "Property cards and measurement for boundary questions." },
      { name: "Sub-Registrar's Office (south Ahmedabad)", note: "Registration and index-II searches." },
      { name: "Collector's Office, Ahmedabad", note: "N.A. permissions, conditions and appeals." },
      { name: "City Civil Court, Ahmedabad", note: "Possession, injunction and declaratory suits." },
    ],
    faqs: [
      {
        q: "My neighbour has built over the boundary. What is the first step?",
        a: "Not a notice — a measurement. Obtain the city survey measurement and the property card position for both properties, so that the actual line is established on record before anything is alleged. A surprising number of these matters settle once both sides are looking at the same measurement, and the ones that do not are far stronger in court for having started this way.",
      },
      {
        q: "We divided a family plot but never updated the record. Is that a problem?",
        a: "It will be at the point of sale, mortgage or inheritance, because the record will still show one undivided holding. The sub-division should be documented and recorded properly — and if the land is still agricultural, checked against fragmentation limits first, since a sub-division below the prescribed standard area can be invalid.",
      },
      {
        q: "How do I check whether N.A. conditions on my plot were complied with?",
        a: "By obtaining the conversion order and its conditions from the relevant office and comparing them against what was actually done and recorded, including any premium payable. Where there is a shortfall, there is usually a regularisation route, and taking it voluntarily is considerably better than having it raised by a buyer's advocate.",
      },
      {
        q: "Can the initial assessment be done without my visiting the office?",
        a: "Yes. Send the 7/12 Utara or property card, any deeds, and any notices or orders to +91 81288 00351 on WhatsApp or to adv.krupalsavjani@gmail.com. You will be told what the issue is and which forum it belongs in before you commit to anything.",
      },
    ],
    nearby: ["advocate-in-ghodasar", "advocate-in-odhav", "advocate-in-ahmedabad", "land-dispute-lawyer-in-ahmedabad"],
    areaServed: ["Isanpur", "Ghodasar", "Vatva", "Narol", "Maninagar", "Ahmedabad"],
  },

  {
    slug: "advocate-in-odhav",
    kind: "area",
    title: "Advocate in Odhav, Ahmedabad | Industrial & Land Lawyer",
    metaDescription:
      "Advocate in Odhav, Ahmedabad for industrial land: GIDC plot transfers, shed sale and lease documents, 7/12 corrections and land disputes.",
    keywords: [
      "advocate in odhav",
      "advocate near odhav",
      "lawyer in odhav ahmedabad",
      "gidc odhav lawyer",
      "industrial property advocate ahmedabad",
      "land advocate odhav",
      "advocate near me odhav",
    ],
    eyebrow: "Odhav · East Ahmedabad",
    displayLines: ["Advocate in", "Odhav."],
    h1: "Advocate in Odhav, Ahmedabad — Industrial Property & Land Law",
    lede:
      "Odhav is industrial estate country. The land questions here are about plot conditions, transfer permissions and lease terms as much as about ownership.",
    place: { name: "Odhav", type: "neighbourhood", containedIn: "Ahmedabad" },
    intro: [
      "East Ahmedabad around Odhav is built around industrial estate land and the sheds, units and plots on it, alongside dense residential pockets towards Nikol and Bapunagar. Property work here looks different from the rest of the city.",
      "An industrial plot allotted on lease or on conditions is not freely transferable in the way freehold land is. Transfers, sub-divisions, changes of use and changes in the constitution of the holder may each need permission, and the consequences of skipping that step land on whoever holds the plot next.",
      "This practice handles both sides of Odhav: the industrial documentation and permission work, and the ordinary land and revenue record matters on the residential side.",
    ],
    localContext: [
      {
        heading: "Allotment conditions travel with the plot",
        body:
          "Industrial plots typically come with conditions on use, on the period within which construction must happen, and on transfer. Those conditions bind successors. A buyer who does not read the allotment and lease documents alongside the title is buying an obligation they have not priced — and sometimes a breach that is already running.",
      },
      {
        heading: "Transfer permission is a step, not a formality",
        body:
          "Selling a shed or a plot in an industrial estate, bringing in a partner, or restructuring the entity that holds it can all amount to a transfer requiring prior permission. Transactions documented without that step tend to be unenforceable against the allotting authority, which is precisely the party whose recognition you need.",
      },
      {
        heading: "Sheds let out on loose paperwork",
        body:
          "A great deal of industrial space in Odhav is occupied under short, informal documents that do not address term, permitted use, who bears statutory compliance, deposit return, or what happens on expiry. Those omissions become possession disputes. They are cheap to fix at the drafting stage and expensive to argue about afterwards.",
      },
    ],
    focusAreas: [
      "property-documentation",
      "land-use-conversion",
      "land-dispute-litigation",
      "revenue-records",
      "court-representation",
    ],
    offices: [
      { name: "Industrial estate / allotting authority", note: "Transfer permissions, conditions and compliance." },
      { name: "Sub-Registrar's Office (east Ahmedabad)", note: "Registration of deeds and registered leases." },
      { name: "Mamlatdar's Office", note: "Mutation and 7/12 records on the non-estate land." },
      { name: "City Survey Superintendent's Office", note: "Property cards and measurement records." },
      { name: "City Civil Court, Ahmedabad", note: "Possession, specific performance and injunction matters." },
    ],
    faqs: [
      {
        q: "I am buying a shed in an industrial estate at Odhav. What should be checked?",
        a: "The allotment and lease documents and every condition in them, whether the required transfer permission has been or can be obtained, the construction and use compliance position, outstanding dues to the allotting authority, the registration chain, encumbrance searches, and the permitted-use position for what you actually intend to do there. A clean-looking sale deed on top of an unpermitted transfer is not a clean title.",
      },
      {
        q: "Can an industrial plot be transferred without permission?",
        a: "Generally not, where the allotment or lease requires it. Documenting a sale and leaving the permission for later creates a transaction the allotting authority need not recognise, and it is the authority's recognition that makes the plot usable and re-sellable. The permission route should be mapped before the agreement is signed, not after.",
      },
      {
        q: "Do you draft industrial lease and leave-and-licence documents?",
        a: "Yes, from either side — covering term and renewal, permitted use, who carries statutory and environmental compliance, deposit and its return, repairs, escalation, exit, and the stamp duty and registration position.",
      },
      {
        q: "Do you also handle residential matters in Nikol and Bapunagar?",
        a: "Yes. The ordinary land and revenue record work — 7/12 and property card corrections, succession and mutation, sale deeds, boundary matters — is handled across the east Ahmedabad belt.",
      },
      {
        q: "Can we start without coming to the office?",
        a: "Yes. Send the allotment letter, lease deed, any sale documents and the current record to +91 81288 00351 on WhatsApp or to adv.krupalsavjani@gmail.com, and you will get a read on the position first.",
      },
    ],
    nearby: ["advocate-in-isanpur", "advocate-in-ghodasar", "advocate-in-ahmedabad", "property-lawyer-in-ahmedabad"],
    areaServed: ["Odhav", "Nikol", "Bapunagar", "Vastral", "Ahmedabad"],
  },

  /* ──────────────────────────────────────────────────────────────────
     SERVICE × CITY — distinct topical intent, not geography duplicates.
     ────────────────────────────────────────────────────────────────── */
  {
    slug: "land-dispute-lawyer-in-ahmedabad",
    kind: "service",
    practiceArea: "land-dispute-litigation",
    title: "Land Dispute Lawyer in Ahmedabad | Title & Possession",
    metaDescription:
      "Land dispute lawyer in Ahmedabad for title, possession, boundary, encroachment and partition cases, from revenue appeals to the Gujarat High Court.",
    keywords: [
      "land dispute lawyer in ahmedabad",
      "land dispute advocate ahmedabad",
      "property dispute lawyer ahmedabad",
      "title dispute advocate ahmedabad",
      "encroachment lawyer ahmedabad",
      "partition suit lawyer ahmedabad",
      "best land lawyer in ahmedabad",
    ],
    eyebrow: "Practice · Land Disputes",
    displayLines: ["Land Dispute", "Lawyer."],
    h1: "Land Dispute Lawyer in Ahmedabad — Title, Possession & Boundaries",
    lede:
      "Ownership, possession, boundary, encroachment and partition disputes — taken through the forum that can actually decide them, not the one that is easiest to file in.",
    place: { name: "Ahmedabad", type: "city", containedIn: "Gujarat" },
    intro: [
      "A land dispute is rarely one dispute. It is usually a record problem, a documentation problem and a possession problem arriving together, and each of those can belong to a different forum. Filing everything as one civil suit is the common mistake, and it is the reason matters run for a decade.",
      "The first piece of work is therefore diagnostic: establish from the record what is actually in dispute, separate what can be fixed administratively from what needs adjudication, and identify who must be joined so the result binds everyone who matters.",
      "Only then does the question of where to file arise — the Mamlatdar, the Collector, the Gujarat Revenue Tribunal, the City Civil Court or the High Court.",
    ],
    localContext: [
      {
        heading: "Ownership and possession are separate fights",
        body:
          "You can own land you do not possess and possess land you do not own, and the remedies differ. Possession matters often need urgent interim protection while the ownership question is decided on a longer timeline. Treating them as one claim usually means losing the urgency of the first and weakening the proof of the second.",
      },
      {
        heading: "Boundary and encroachment start with measurement",
        body:
          "These disputes are won on the city survey measurement, the property card and the plot position under the town planning scheme — not on affidavits about what has always been understood. Establishing the line on record first is what makes a settlement possible and what makes the case strong if it is not.",
      },
      {
        heading: "Partition is a documentation exercise with a litigation fallback",
        body:
          "Where the family is in agreement, a partition can be completed by documentation and record correction, and everyone keeps their money. Where it is not, a suit is necessary. The worst outcome is a half-done informal division that nobody recorded, which is what a large share of these matters actually are when they arrive.",
      },
    ],
    contextHeading:
      "Why these matters run long — and what shortens them",
    faqHeading: "Land disputes — common questions",
    focusAreas: [
      "land-dispute-litigation",
      "court-representation",
      "revenue-records",
      "appeals-representation",
      "property-documentation",
    ],
    offices: [
      { name: "City Civil & Sessions Court, Ahmedabad", note: "Title, declaration, injunction and partition suits." },
      { name: "Gujarat High Court, Sola", note: "Writ petitions and appeals." },
      { name: "Gujarat Revenue Tribunal", note: "Revisions against revenue authority orders." },
      { name: "Collector's Office, Ahmedabad", note: "Appeals against mutation and revenue orders." },
      { name: "Mamlatdar's Office", note: "Mutation entries and record corrections." },
    ],
    faqs: [
      {
        q: "Should my land dispute go to a civil court or to the revenue authorities?",
        a: "It depends on what is actually in question. Disputes about entries, mutation, tenure and land-use conditions generally belong in the revenue hierarchy, with a revision to the Gujarat Revenue Tribunal above it. Disputes about who holds title, or claims for partition, declaration or specific performance, belong before a civil court. Many matters have components of both, and sequencing them correctly is most of the strategy.",
      },
      {
        q: "Someone has encroached on my land. How fast can I act?",
        a: "Interim protection can usually be sought quickly, but it is far more effective when it rests on an established record — the measurement, the property card and the plot position — rather than on assertion alone. The practical order is: secure the record, then seek protection, then press the substantive claim.",
      },
      {
        q: "How much does a land dispute cost to run in Ahmedabad?",
        a: "It varies by forum and stage, which is why the scope and fee are confirmed in writing at the outset. What can be said generally is that the administrative routes cost a fraction of a contested suit, so an honest assessment of whether your matter can be resolved on the record is worth having before you commit to litigation.",
      },
      {
        q: "The other side has an unregistered agreement to sell. Does it matter?",
        a: "It can. An unregistered agreement does not transfer title, but it may support a claim to specific performance and it may be evidence of possession, subject to limitation and to the stamp and registration position. What it does in your particular matter depends on the document and the surrounding facts, so it should be read rather than dismissed.",
      },
      {
        q: "Can an ongoing dispute still be settled?",
        a: "Often, yes — and frequently on better terms once the record position is clear to both sides. Settlement is actively pursued where it serves the client, with the settlement itself documented and carried through to the record so that it does not simply become the next dispute.",
      },
    ],
    nearby: ["advocate-in-ahmedabad", "revenue-record-lawyer-in-ahmedabad", "property-lawyer-in-ahmedabad", "advocate-in-gujarat"],
    areaServed: ["Ahmedabad", "Ahmedabad District", "Gandhinagar", "Gujarat"],
  },

  {
    slug: "property-lawyer-in-ahmedabad",
    kind: "service",
    practiceArea: "property-documentation",
    title: "Property Lawyer in Ahmedabad | Title Check & Sale Deeds",
    metaDescription:
      "Property lawyer in Ahmedabad: title verification and certificates, sale deeds, agreements to sell (banakhat), gift deeds and registration support.",
    keywords: [
      "property lawyer in ahmedabad",
      "property advocate ahmedabad",
      "title verification lawyer ahmedabad",
      "sale deed lawyer ahmedabad",
      "banakhat advocate ahmedabad",
      "agreement to sell lawyer ahmedabad",
      "title certificate ahmedabad",
      "best property lawyer in ahmedabad",
    ],
    eyebrow: "Practice · Property Documentation",
    displayLines: ["Property", "Lawyer."],
    h1: "Property Lawyer in Ahmedabad — Title Verification & Documentation",
    lede:
      "Title searches, title certificates, sale deeds, agreements to sell, banakhat and gift deeds — the work that decides whether a transaction holds up ten years later.",
    place: { name: "Ahmedabad", type: "city", containedIn: "Gujarat" },
    intro: [
      "Almost every expensive property dispute began as a cheap documentation decision. A chain that was never searched properly, a boundary described loosely, a condition nobody checked, an agreement drafted from a template that did not fit the transaction.",
      "This side of the practice is preventive. It establishes what the seller actually holds, on what tenure, subject to what encumbrances and with what gaps — and then documents the transaction so that the answer stays true.",
      "For buyers that means diligence before money moves. For sellers it means a property that survives the buyer's advocate. For both it means a document that says what the parties actually agreed.",
    ],
    localContext: [
      {
        heading: "A title search is a chain, not a document",
        body:
          "Reading the latest deed tells you very little. The work is to follow the property backwards through registered instruments, index-II entries, revenue and city survey records and the town planning position, far enough back to be confident that nobody with a better claim has been left out — and to say plainly where the chain is thin.",
      },
      {
        heading: "Banakhat and agreement to sell are where deals are won or lost",
        body:
          "The agreement sets the payment schedule, what happens on default by either side, who obtains which permission, how and when possession passes, and what the remedy is if the seller's title turns out to be defective. A well-drafted agreement makes the sale deed routine. A loose one makes it a negotiation under pressure, with money already paid.",
      },
      {
        heading: "Stamp duty and registration are substantive, not clerical",
        body:
          "The instrument you choose determines the duty payable and whether registration is compulsory. Under-stamping and non-registration do not just risk penalties — they can cost you the ability to rely on the document when you most need it. Getting the instrument right is part of the drafting, not an afterthought at the registration office.",
      },
    ],
    contextHeading:
      "Where property transactions go wrong",
    faqHeading: "Property documentation — common questions",
    focusAreas: [
      "property-documentation",
      "revenue-records",
      "agricultural-land",
      "tenancy-tenure",
      "land-dispute-litigation",
    ],
    offices: [
      { name: "Sub-Registrar's Offices, Ahmedabad", note: "Registration and index-II searches." },
      { name: "City Survey Superintendent's Office", note: "Property cards and measurement records." },
      { name: "Mamlatdar's Office", note: "7/12 Utara, 8-A and mutation records." },
      { name: "AMC / AUDA Town Planning", note: "Final plot and development permission position." },
      { name: "Collector's Office, Ahmedabad", note: "N.A. permission and tenure-related conditions." },
    ],
    faqs: [
      {
        q: "What does a title verification in Ahmedabad actually include?",
        a: "A search of the registration record and index-II, the revenue record or city survey property card, the town planning and final plot position where applicable, the tenure and any conditions attaching to the land, encumbrance and dues checks, and the succession position where the chain passes through an inheritance. You receive a written report that states the defects plainly and separates the ones that can be cured from the ones that cannot.",
      },
      {
        q: "Notarised or registered agreement to sell — which should I use?",
        a: "They are not equivalent. Registration gives the agreement a different evidentiary and protective standing and carries a different stamp duty consequence; a notarised agreement is quicker and cheaper but weaker where it counts. Which is appropriate depends on the value, the payment schedule, how long the gap to the sale deed will be and how much risk you are carrying in the interim. This should be a deliberate choice, not a default.",
      },
      {
        q: "How long does a title certificate take?",
        a: "It depends on how deep the chain is and how quickly certified copies and searches come back. A straightforward urban property is a matter of days once the documents are in hand; an agricultural holding with a long chain and an inheritance in the middle takes longer. You will be given a realistic timeline after the first look at the papers, not an optimistic one.",
      },
      {
        q: "I am buying from a builder. Is diligence still needed?",
        a: "Yes, and it looks different. The chain runs through the builder's title to the land, the development permissions and scheme position, the structure through which common areas are held, and the specific unit's documentation. A reputable name is not a substitute for reading those.",
      },
      {
        q: "Can you draft a gift deed or a family settlement?",
        a: "Yes — gift deeds, family arrangements and partition documents, drafted with the stamp duty and registration position addressed and carried through to the revenue or city survey record afterwards, so the record reflects the arrangement rather than contradicting it.",
      },
    ],
    nearby: ["advocate-in-ahmedabad", "land-dispute-lawyer-in-ahmedabad", "revenue-record-lawyer-in-ahmedabad", "advocate-in-makarba"],
    areaServed: ["Ahmedabad", "Makarba", "Prahladnagar", "Gandhinagar", "Gujarat"],
  },

  {
    slug: "revenue-record-lawyer-in-ahmedabad",
    kind: "service",
    practiceArea: "revenue-records",
    title: "7/12 Utara & Revenue Record Lawyer in Ahmedabad",
    metaDescription:
      "Revenue record lawyer in Ahmedabad: 7/12 and 8-A corrections, mutation entries, property cards, and appeals to the Collector and Revenue Tribunal.",
    keywords: [
      "7/12 utara lawyer ahmedabad",
      "revenue record lawyer in ahmedabad",
      "mutation entry advocate ahmedabad",
      "7 12 correction lawyer gujarat",
      "8-a correction advocate ahmedabad",
      "property card correction ahmedabad",
      "revenue tribunal advocate ahmedabad",
    ],
    eyebrow: "Practice · Revenue Records",
    displayLines: ["Revenue Record", "Lawyer."],
    h1: "7/12 Utara & Revenue Record Lawyer in Ahmedabad",
    lede:
      "Corrections, mutation entries and record disputes — handled through the revenue hierarchy, where they can be resolved in months rather than years.",
    place: { name: "Ahmedabad", type: "city", containedIn: "Gujarat" },
    intro: [
      "The 7/12 Utara, the 8-A, the village forms and the city survey property card are the records against which your ownership is tested by every buyer, every bank and every authority. When they are wrong, nothing downstream works — a sale stalls, a loan is refused, a succession cannot be completed.",
      "The good news is that a large share of these problems are administrative. They have a defined route, a defined authority and a defined appeal, and they do not require a civil suit.",
      "The work is knowing which route applies, framing the application so that the authority can actually grant it, and appealing properly when it does not.",
    ],
    localContext: [
      {
        heading: "Mutation entries decide more than people expect",
        body:
          "A mutation entry records a change in the person shown as holder, following a sale, an inheritance, a partition or a court order. Entries get certified without proper notice, get objected to by parties with no real interest, or simply never get made at all. Each of those has its own remedy, and the time to use it is well before the entry is relied on in a transaction.",
      },
      {
        heading: "The record is not the same thing as title",
        body:
          "An entry in the 7/12 raises a presumption; it does not by itself create ownership. That cuts both ways — a wrong entry against you is correctable, and a favourable entry is not a defence to a genuinely better claim. Understanding what the record can and cannot do for you determines whether your matter belongs before the revenue authority or before a civil court.",
      },
      {
        heading: "Appeals have a hierarchy and a clock",
        body:
          "Orders of the revenue authorities are appealable upward, with a revision to the Gujarat Revenue Tribunal above that, and each stage has a limitation period. The commonest avoidable loss in this area is a good case that arrived late. If you have received an order you disagree with, the date on it matters as much as its contents.",
      },
    ],
    contextHeading:
      "What actually goes wrong in the records",
    faqHeading: "Revenue records — common questions",
    focusAreas: [
      "revenue-records",
      "appeals-representation",
      "agricultural-land",
      "tenancy-tenure",
      "land-dispute-litigation",
    ],
    offices: [
      { name: "Mamlatdar's Office", note: "Mutation entries, 7/12 and 8-A corrections, village forms." },
      { name: "Deputy Collector / Prant Office", note: "Appeals against mutation and record orders." },
      { name: "Collector's Office, Ahmedabad", note: "Further appeals and tenure-related applications." },
      { name: "Gujarat Revenue Tribunal", note: "Revisions against revenue authority orders." },
      { name: "City Survey Superintendent's Office", note: "Property card corrections for city-survey land." },
    ],
    faqs: [
      {
        q: "My name is not on the 7/12 Utara even though I inherited the land. What do I do?",
        a: "Apply for a mutation on the basis of succession, supported by the death certificate, the heirship documents and the prior entries. Where all heirs agree, this is ordinarily administrative work. Where an heir objects, or where an earlier entry has to be undone first, the matter moves into contested proceedings — so it is worth starting while there is agreement in the family.",
      },
      {
        q: "How do I correct a wrong entry in the 7/12 or the 8-A?",
        a: "Through a correction application to the appropriate revenue authority, supported by the documents that establish the correct position. A clerical error is relatively quick. Where correcting the entry would effectively decide a dispute between two claimants, the authority will not do it administratively and the matter has to be framed accordingly — which is a judgement call worth making before you file, not after it is rejected.",
      },
      {
        q: "A mutation entry was certified without notice to me. Can it be challenged?",
        a: "Yes. Entries certified without proper notice to an interested person are challengeable, through appeal to the higher revenue authority and, further up, by revision to the Gujarat Revenue Tribunal. Limitation runs from the order, so the date you received or learned of it matters and should be established early.",
      },
      {
        q: "What is the difference between a 7/12 Utara and a property card?",
        a: "Broadly, the 7/12 Utara belongs to the revenue record system used for land recorded as agricultural, while the city survey property card is used for land brought under city survey. As the city expanded, holdings moved from one system to the other — and a great many Ahmedabad title questions come from that transition being recorded incompletely.",
      },
      {
        q: "Can you obtain certified copies and old records for me?",
        a: "Yes. Obtaining certified copies, index-II extracts, old entries and measurement records is part of the work and is usually the first step, because an accurate view of the record is what determines everything that follows.",
      },
    ],
    nearby: ["advocate-in-ahmedabad", "land-dispute-lawyer-in-ahmedabad", "property-lawyer-in-ahmedabad", "advocate-in-gujarat"],
    areaServed: ["Ahmedabad", "Ahmedabad District", "Gandhinagar", "Gujarat"],
  },

  {
    slug: "land-acquisition-lawyer-in-gujarat",
    kind: "service",
    practiceArea: "land-acquisition",
    title: "Land Acquisition & Compensation Lawyer in Gujarat",
    metaDescription:
      "Land acquisition lawyer in Gujarat: objections, compensation claims, references for enhancement, solatium and interest, and challenges to acquisition.",
    keywords: [
      "land acquisition lawyer in gujarat",
      "land acquisition advocate ahmedabad",
      "compensation enhancement land acquisition gujarat",
      "land acquisition notice reply gujarat",
      "solatium compensation land acquisition",
      "rfctlarr act lawyer gujarat",
      "land acquisition compensation claim ahmedabad",
    ],
    eyebrow: "Practice · Land Acquisition",
    displayLines: ["Land", "Acquisition."],
    h1: "Land Acquisition & Compensation Lawyer in Gujarat",
    lede:
      "When your land is being acquired, the two things that decide the outcome are both on a clock: what you say at the enquiry, and whether you seek a reference in time.",
    place: { name: "Gujarat", type: "state", containedIn: "India" },
    intro: [
      "Most landowners meet an acquisition as a notice. By the time it arrives, the purpose has usually been settled and the realistic fight is no longer whether the land goes, but what it is valued at, who is recognised as entitled to the money, and whether the procedure that was followed can be sustained.",
      "That reframing matters, because it changes where effort should go. Objecting to the public purpose rarely succeeds on its own. Establishing the correct market value, the correct classification of the land, the correct area, and your own recorded entitlement very often does.",
      "This practice handles acquisition work on both sides of the award: the representations and objections before it, and the references and challenges after it.",
    ],
    contextHeading: "The three places compensation is actually won or lost",
    localContext: [
      {
        heading: "What you put on record at the enquiry stage",
        body:
          "The enquiry is the one point at which your own material — comparable sale instances, the actual classification and potential of the land, standing crops, trees, wells, structures, and any business carried on from it — enters the record cheaply. Owners who attend without evidence and simply object to the acquisition are, in practice, accepting whatever valuation the record already supports. Everything claimed later is tested against what was said here.",
      },
      {
        heading: "How the land is classified and measured",
        body:
          "Compensation turns on what the land is taken to be: irrigated or dry, agricultural or capable of non-agricultural use, with or without frontage and access. It also turns on the area actually acquired, which is not always the area in the notification. A mismatch between the 7/12 or property card, the measurement on the ground and the area in the award is both a common error and a correctable one.",
      },
      {
        heading: "Whether a reference is sought, and in time",
        body:
          "Accepting the award without protest, or allowing the period for seeking a reference to lapse, generally closes the question of enhancement for good. This is the single most common avoidable loss in acquisition matters: a landowner with a strong valuation case who simply ran out of time. If you have an award in hand, the date on it is the first thing to establish.",
      },
    ],
    focusAreas: [
      "land-acquisition",
      "revenue-records",
      "appeals-representation",
      "court-representation",
      "property-documentation",
    ],
    offices: [
      { name: "Special Land Acquisition Officer", note: "Enquiry, objections and the award." },
      { name: "Collector's Office", note: "Acquisition proceedings and related revenue questions." },
      { name: "Reference Court / District Court", note: "References for enhancement of compensation." },
      { name: "Gujarat High Court, Sola", note: "Challenges to acquisition proceedings and appeals on compensation." },
      { name: "Mamlatdar & City Survey Offices", note: "Establishing recorded area, classification and entitlement." },
    ],
    faqHeading: "Land acquisition — common questions",
    faqs: [
      {
        q: "I have received an acquisition notice. What should I do first?",
        a: "Note the date and keep the envelope. Then gather the current 7/12 Utara or property card, the 8-A, your title documents, and evidence of what is on the land — structures, wells, trees, standing crop, any business run from it. The enquiry is where this material has to be placed on record, and a representation prepared with evidence is worth far more than an objection in general terms. Do not wait until the award to start assembling it.",
      },
      {
        q: "Can I get more than the compensation offered in the award?",
        a: "Often, yes — enhancement is the most commonly successful part of acquisition litigation, because awards frequently undervalue land by classifying it conservatively or by relying on weak comparables. It is pursued by seeking a reference, which must be done within the period allowed. Whether your case is strong depends on the comparable sale instances available for the area and period, which is assessed before you are advised to proceed.",
      },
      {
        q: "What is solatium, and is interest payable as well?",
        a: "Solatium is an additional sum payable over and above the assessed market value, in recognition of the compulsory nature of the acquisition. Interest is separately payable for periods of delay in payment, and additional amounts can run from the relevant notification. These components are frequently miscalculated or omitted in what is actually paid out, which is worth checking against the award itself rather than against the cheque.",
      },
      {
        q: "The acquired area does not match my 7/12. Does that matter?",
        a: "It matters a great deal, because you are paid for the area in the award, not the area you own. A discrepancy between the notification, the measurement on the ground and the revenue record should be raised and corrected on record at the earliest stage; once the award is made and accepted, correcting it is considerably harder.",
      },
      {
        q: "Several family members are recorded on the land. How is the money apportioned?",
        a: "Apportionment follows entitlement as established on the record, and disputes about who is entitled are decided separately from the question of how much is payable. Where the record has not been updated after a death or an informal family division, the apportionment question can hold up payment for everyone — so it is worth putting the record right alongside the compensation claim rather than afterwards.",
      },
      {
        q: "Can an acquisition itself be challenged?",
        a: "Sometimes, on procedural grounds — defects in notification or service, failure to hold a proper enquiry, or a lapse in the statutory sequence. These are genuinely available grounds but they are narrower than most landowners expect, and they are assessed honestly before you are advised to spend money on them. In the majority of matters the realistic and more valuable fight is over compensation.",
      },
    ],
    nearby: ["advocate-in-gujarat", "revenue-record-lawyer-in-ahmedabad", "revenue-tribunal-advocate-in-gujarat", "high-court-land-advocate-in-ahmedabad"],
    areaServed: ["Gujarat", "Ahmedabad", "Gandhinagar", "Dholera", "Kheda", "Vadodara", "Surat"],
  },

  {
    slug: "agricultural-land-lawyer-in-gujarat",
    kind: "service",
    practiceArea: "agricultural-land",
    title: "Agricultural Land Lawyer in Gujarat | Purchase & Transfer",
    metaDescription:
      "Agricultural land lawyer in Gujarat: farmland eligibility, transfer permissions, fragmentation and tenure limits, and 7/12 checks before you buy.",
    keywords: [
      "agricultural land lawyer in gujarat",
      "who can buy agricultural land in gujarat",
      "agricultural land purchase gujarat rules",
      "non agriculturist buying farm land gujarat",
      "fragmentation act gujarat lawyer",
      "farm land advocate ahmedabad",
      "agricultural land transfer permission gujarat",
    ],
    eyebrow: "Practice · Agricultural Land",
    displayLines: ["Agricultural", "Land."],
    h1: "Agricultural Land Lawyer in Gujarat — Purchase, Transfer & Eligibility",
    lede:
      "Agricultural land in Gujarat is not freely transferable. Who may buy it, in what quantity and on what tenure are statutory questions — and a sale made in breach of them does not become valid by being registered.",
    place: { name: "Gujarat", type: "state", containedIn: "India" },
    intro: [
      "The most expensive mistake in Gujarat farmland is also the most common: treating the transaction as a title question when it is first an eligibility question. A seller with perfect title still cannot lawfully sell to a buyer who is not permitted to hold agricultural land, and no amount of documentation fixes that afterwards.",
      "Three statutory layers have to be cleared before the title chain is even worth reading: whether the buyer is eligible to hold agricultural land at all, whether the particular holding's tenure permits transfer without prior permission, and whether the parcel being sold falls foul of fragmentation limits.",
      "This practice runs that check first, in writing, and then handles whatever route the answer requires — permission, conversion, restructuring the transaction, or advising against it.",
    ],
    contextHeading: "The three gates before title even matters",
    localContext: [
      {
        heading: "Agriculturist eligibility",
        body:
          "Gujarat restricts who may hold agricultural land, and the restriction has real consequences: a transfer in breach is open to being treated as invalid, and the land can become the subject of proceedings long after the money has been paid. Some buyers have a lawful route through prior permission or through converting the land's use before purchase; others do not. This has to be settled before any advance is paid, not discovered during registration.",
      },
      {
        heading: "Tenure on the particular holding",
        body:
          "Eligibility is not enough on its own. A holding recorded on new and impartible tenure, restricted tenure, or land subject to special conditions may need prior permission to transfer and may attract a premium. The tenure entry sits on the 7/12 and is routinely skimmed past. Reading it properly is the difference between a transaction that completes and one that is stuck pending a permission nobody budgeted for.",
      },
      {
        heading: "Fragmentation limits",
        body:
          "Gujarat's fragmentation and consolidation law bars the sub-division of a holding below a prescribed standard area for the local area. A sale of part of a survey number can therefore be invalid as creating a fragment, even where both parties are willing and the price is paid. This catches family divisions as often as it catches sales, and it is checked by reference to the specific holding rather than assumed.",
      },
    ],
    focusAreas: [
      "agricultural-land",
      "tenancy-tenure",
      "land-use-conversion",
      "revenue-records",
      "property-documentation",
    ],
    offices: [
      { name: "Mamlatdar's Office", note: "7/12 Utara, 8-A, tenure entries and mutation." },
      { name: "Collector's Office", note: "Transfer permissions, tenure conversion and premium." },
      { name: "District Inspector of Land Records", note: "Measurement, sub-division and fragmentation questions." },
      { name: "Sub-Registrar's Office", note: "Registration and index-II searches." },
      { name: "Gujarat Revenue Tribunal", note: "Revisions in tenancy and tenure matters." },
    ],
    faqHeading: "Agricultural land — common questions",
    faqs: [
      {
        q: "Can a non-agriculturist buy agricultural land in Gujarat?",
        a: "Not freely. Holding agricultural land in Gujarat is restricted, and the restriction interacts with the tenure recorded on the particular holding. Depending on the facts there may be a lawful route — prior permission, or converting the land to non-agricultural use before the purchase — and in some situations there is no route at all. The honest answer for your specific parcel comes from reading its 7/12 and tenure entries, which is where any serious advice has to start.",
      },
      {
        q: "What should I check on a 7/12 Utara before buying farmland?",
        a: "The recorded holders and whether any of them have died without the record being updated; the tenure entry and any conditions on it; the area and whether it matches the measurement on the ground; any other rights, mortgages or charges noted; the crop and classification entries; and the sequence of past mutation entries, which is where a break in the chain shows up. Alongside it, the 8-A and a registration search are needed — the 7/12 alone is not a title document.",
      },
      {
        q: "I am buying only part of a survey number. Is that allowed?",
        a: "It depends on whether the resulting parcel would be a fragment under Gujarat's fragmentation and consolidation law, which sets a standard area for the locality. If it would, the sub-division can be invalid even though both parties agree. The position should be checked against the specific holding, and where a sub-division is permissible it should be recorded properly so that what you buy exists as a distinct holding on the record.",
      },
      {
        q: "The seller is one of four recorded brothers. Can he sell the whole parcel?",
        a: "Not by himself, and this is a frequent source of litigation. He can deal with his own share, and even that needs care where the land is undivided and no partition has been recorded. A sale that purports to convey the whole holding on one co-owner's signature leaves you buying a lawsuit. The correct route is either to bring all entitled holders into the transaction or to document a partition first.",
      },
      {
        q: "Do I need permission to convert the land to non-agricultural use before building?",
        a: "Yes — agricultural land cannot lawfully be put to non-agricultural use without permission, and the conversion carries conditions and often a premium. If your purpose for the purchase is development, the conversion route and its cost should be assessed before you commit, because it affects both the price the land is worth to you and the timeline.",
      },
    ],
    nearby: ["na-conversion-lawyer-in-gujarat", "tenancy-tenure-lawyer-in-gujarat", "advocate-in-gujarat", "property-lawyer-in-ahmedabad"],
    areaServed: ["Gujarat", "Ahmedabad", "Gandhinagar", "Dholera", "Kheda", "Anand", "Mehsana", "Sanand"],
  },

  {
    slug: "na-conversion-lawyer-in-gujarat",
    kind: "service",
    practiceArea: "land-use-conversion",
    title: "N.A. / Bin-Kheti Conversion Lawyer in Gujarat",
    metaDescription:
      "N.A. (bin-kheti) conversion lawyer in Gujarat: permission applications, Parishisht declarations, premium, conditions of use and regularising breaches.",
    keywords: [
      "na conversion lawyer in gujarat",
      "bin kheti permission gujarat",
      "non agricultural permission gujarat lawyer",
      "na order gujarat procedure",
      "land use conversion advocate ahmedabad",
      "na premium gujarat",
      "bin kheti advocate ahmedabad",
    ],
    eyebrow: "Practice · Land-Use Conversion",
    displayLines: ["N.A. &", "Bin-Kheti."],
    h1: "N.A. / Bin-Kheti Conversion Lawyer in Gujarat",
    lede:
      "Converting agricultural land to non-agricultural use is a process with conditions attached — and the conditions outlive the order, travelling with the land to whoever owns it next.",
    place: { name: "Gujarat", type: "state", containedIn: "India" },
    intro: [
      "Non-agricultural permission — bin-kheti — is what makes agricultural land lawfully usable for building. It runs through an application, a self-declaration of the facts, scrutiny against the tenure and scheme position, an assessment of premium where payable, and an order that attaches conditions to the land.",
      "Two things about it are routinely underestimated. The first is that the conditions are binding and continuing: periods within which use must commence, limits on the use permitted, and compliance obligations that a later purchaser inherits. The second is that a breach does not quietly expire. It surfaces during a sale, a loan or a development permission, usually years later and always at the worst time.",
      "This practice handles conversions from the application through to the order, and regularises conversions where something was left incomplete.",
    ],
    contextHeading: "What the order actually commits you to",
    localContext: [
      {
        heading: "The declaration you sign is the record",
        body:
          "Conversion applications rest on a self-declaration of the facts about the land — its tenure, its area, what stands on it, what it is used for and what is intended. That declaration becomes the basis of the order, so an inaccuracy in it is not a clerical matter: it can make the permission vulnerable and the eventual breach yours. Getting the declaration right against the actual revenue record is most of the work.",
      },
      {
        heading: "Premium and tenure interact",
        body:
          "Where the land sits on a restricted or new and impartible tenure, conversion can involve both a permission and a premium, and in some cases a separate step to bring the land onto old tenure before it can be dealt with freely. Treating conversion and tenure as one combined problem — rather than discovering the tenure issue after the conversion application is filed — is what keeps the timeline predictable.",
      },
      {
        heading: "Conditions travel with the land",
        body:
          "An N.A. order typically requires that the non-agricultural use actually commence within a period, confines the land to the use permitted, and leaves the holder responsible for continuing compliance. A buyer who reads the order and sees only the grant, not the conditions, is acquiring an obligation that has already started running. Due diligence on converted land must read the conditions and verify compliance, not merely confirm that an order exists.",
      },
    ],
    focusAreas: [
      "land-use-conversion",
      "agricultural-land",
      "tenancy-tenure",
      "revenue-records",
      "appeals-representation",
    ],
    offices: [
      { name: "Collector's Office", note: "N.A. permission, conditions and premium assessment." },
      { name: "Mamlatdar's Office", note: "Tenure and 7/12 entries underlying the application." },
      { name: "AUDA / AMC Town Planning", note: "Scheme, final plot and development permission position." },
      { name: "District Inspector of Land Records", note: "Measurement and sub-division for the converted area." },
      { name: "Office of the Special Secretary (Revenue)", note: "Revisions where permission is refused or conditioned." },
    ],
    faqHeading: "N.A. conversion — common questions",
    faqs: [
      {
        q: "What does getting N.A. permission in Gujarat involve?",
        a: "In outline: establishing the land's current revenue and tenure position, preparing the application with an accurate self-declaration and the supporting records, addressing the town planning and scheme position where the land falls within one, meeting any premium assessed, and obtaining the order with its conditions. Where the tenure is restricted, a tenure step may be needed alongside. The sequence matters — filing before the tenure and scheme position is settled is the usual cause of delay.",
      },
      {
        q: "How long does it take?",
        a: "It depends on the tenure, whether the land falls inside a town planning scheme, whether a premium is assessed and how clean the underlying record is. A straightforward conversion of old-tenure land with a clean 7/12 moves considerably faster than one where the record needs correcting or a tenure question has to be resolved first. You will be given a realistic range after the records are read, not an optimistic one.",
      },
      {
        q: "I bought land described as N.A. but the conditions were never complied with. What now?",
        a: "This is common and usually fixable. The first step is to obtain the conversion order and its conditions and establish precisely what was required and what was done — including whether the use commenced within the period allowed and whether any premium remains outstanding. There is generally a regularisation route, and taking it voluntarily is substantially better than having it raised against you by a buyer's advocate or a bank.",
      },
      {
        q: "Do I need N.A. permission if the land already falls in a town planning scheme?",
        a: "Being inside a scheme and being lawfully convertible are different questions, and the scheme position affects how the conversion is dealt with rather than removing the need to address it. The two have to be read together, because a final plot allotment does not by itself resolve the revenue-side use position.",
      },
      {
        q: "Can permission be refused, and can a refusal be challenged?",
        a: "Yes to both. Refusals and conditional grants happen, commonly on tenure grounds, scheme constraints or defects in the application itself. Many are better met by curing the underlying defect and reapplying than by litigating; where the refusal is legally wrong, a revision lies to the higher revenue authority. Which of the two is the right response is the advice you should be getting.",
      },
    ],
    nearby: ["agricultural-land-lawyer-in-gujarat", "tenancy-tenure-lawyer-in-gujarat", "advocate-in-gujarat", "revenue-record-lawyer-in-ahmedabad"],
    areaServed: ["Gujarat", "Ahmedabad", "Gandhinagar", "Sanand", "Dholera", "Kheda", "Mehsana"],
  },

  {
    slug: "tenancy-tenure-lawyer-in-gujarat",
    kind: "service",
    practiceArea: "tenancy-tenure",
    title: "Tenancy & Tenure Lawyer in Gujarat | New Tenure Land",
    metaDescription:
      "Tenancy and tenure lawyer in Gujarat: new and restricted tenure, conversion to old tenure, premium, transfer permissions and tenancy rights.",
    keywords: [
      "tenancy tenure lawyer in gujarat",
      "new tenure land gujarat",
      "impartible tenure gujarat",
      "restricted tenure land transfer gujarat",
      "old tenure conversion premium gujarat",
      "gujarat tenancy act advocate",
      "ganot tenancy lawyer gujarat",
    ],
    eyebrow: "Practice · Tenancy & Tenure",
    displayLines: ["Tenancy &", "Tenure."],
    h1: "Tenancy & Tenure Lawyer in Gujarat — New Tenure & Restricted Land",
    lede:
      "Tenure decides what your land is capable of. Before anyone asks whether your title is good, the question is whether the land can be transferred at all without permission.",
    place: { name: "Gujarat", type: "state", containedIn: "India" },
    intro: [
      "Tenure is the least-read and most consequential entry on a Gujarat land record. Two parcels can sit side by side with identical ownership histories and behave completely differently on a sale, because one is old tenure and the other is not.",
      "Land on new and impartible tenure, or otherwise restricted, typically cannot be transferred, divided or put to a different use without prior permission, and the permission may carry a premium. Transfers made without it are vulnerable — and the vulnerability does not fade with time; it sits in the record waiting for the next transaction.",
      "This practice reads tenure first, obtains the permissions and conversions that make land dealable, and defends holdings where a past breach has been taken up by the authorities.",
    ],
    contextHeading: "Why tenure decides the deal",
    localContext: [
      {
        heading: "New and impartible tenure is a restriction, not a label",
        body:
          "Where land was granted or regularised on new and impartible tenure, the conditions attached to that grant continue to bind it. Transfer, sub-division and change of use generally require prior sanction, and a sale concluded without it can be set aside or regularised only on terms. The practical effect is that the seller's clean title is irrelevant until the tenure question is answered.",
      },
      {
        heading: "Conversion to old tenure has a price and a process",
        body:
          "Restricted land can often be brought onto old tenure by permission and payment of a premium, after which it can be dealt with freely. Whether that is worth doing, what it will cost and how long it takes are the questions that decide whether a transaction is viable — and they should be answered before an agreement is signed, because the premium is a real number that belongs in the price negotiation.",
      },
      {
        heading: "Tenancy rights can sit behind the recorded holder",
        body:
          "Gujarat's tenancy legislation created rights in cultivating tenants that still appear in the records and still surface in disputes, sometimes generations later. An entry suggesting a tenancy, or a history of cultivation by someone other than the holder, is a defect a buyer's advocate will find. It is better understood and addressed before a sale than argued about after one.",
      },
    ],
    focusAreas: [
      "tenancy-tenure",
      "agricultural-land",
      "revenue-records",
      "appeals-representation",
      "land-use-conversion",
    ],
    offices: [
      { name: "Mamlatdar's Office", note: "Tenure entries, tenancy records and mutation." },
      { name: "Collector's Office", note: "Transfer sanction, tenure conversion and premium." },
      { name: "Gujarat Revenue Tribunal", note: "Revisions in tenancy and tenure matters." },
      { name: "Office of the Special Secretary (Revenue)", note: "Revision applications in revenue proceedings." },
      { name: "Gujarat High Court, Sola", note: "Writ jurisdiction where the revenue route is exhausted." },
    ],
    faqHeading: "Tenancy & tenure — common questions",
    faqs: [
      {
        q: "How do I find out what tenure my land is on?",
        a: "It is recorded on the 7/12 Utara, in the tenure and other-rights entries, and corroborated by the mutation history and any grant or regularisation order behind it. The entries are often abbreviated and easy to misread, which is why tenure is so frequently missed. Reading it properly means reading the entry together with the order that created it.",
      },
      {
        q: "Can new tenure land be sold?",
        a: "Generally only with prior permission, and often on payment of a premium — and sometimes only after conversion to old tenure. A sale documented and registered without the required sanction is exposed: the authorities can take up the breach, and the transaction may be regularised only on terms or not at all. The permission route should be mapped and priced before the agreement, not treated as paperwork to follow.",
      },
      {
        q: "What does conversion to old tenure cost?",
        a: "A premium is payable, assessed by reference to the land and the applicable policy, so it is not a fixed figure and cannot be quoted reliably without the specific records. What can be done early is to establish that conversion is available for your holding and obtain a realistic estimate, so the cost sits in the negotiation rather than surfacing afterwards.",
      },
      {
        q: "A tenancy entry appears against my land from decades ago. Is that a problem?",
        a: "It needs to be addressed rather than ignored. Depending on what the entry records and what happened afterwards, it may be a historical artefact that can be cleared on the record, or it may represent a live claim. Either way a buyer's advocate will raise it, and establishing the correct position while the relevant people and documents are still available is far easier than doing it later.",
      },
      {
        q: "I bought restricted land years ago without permission. What are my options?",
        a: "Do not wait for the question to be raised. The position is assessed from the grant or regularisation order, the tenure entries and what has happened on the land since, and there is frequently a regularisation route available on payment. Approaching it voluntarily is both cheaper and materially stronger than responding to proceedings already started.",
      },
    ],
    nearby: ["agricultural-land-lawyer-in-gujarat", "na-conversion-lawyer-in-gujarat", "revenue-tribunal-advocate-in-gujarat", "advocate-in-gujarat"],
    areaServed: ["Gujarat", "Ahmedabad", "Gandhinagar", "Kheda", "Anand", "Mehsana", "Dholera"],
  },

  {
    slug: "revenue-tribunal-advocate-in-gujarat",
    kind: "service",
    practiceArea: "appeals-representation",
    title: "Revenue Appeals & Gujarat Revenue Tribunal Advocate",
    metaDescription:
      "Revenue appeals advocate in Gujarat: appeals to the Deputy Collector and Collector, revisions before SSRD and the Gujarat Revenue Tribunal.",
    keywords: [
      "gujarat revenue tribunal advocate",
      "revenue appeal lawyer gujarat",
      "collector appeal advocate ahmedabad",
      "revision application revenue gujarat",
      "mutation entry appeal gujarat",
      "revenue appeal limitation gujarat",
      "grt advocate ahmedabad",
    ],
    eyebrow: "Practice · Appeals & Revisions",
    displayLines: ["Revenue", "Appeals."],
    h1: "Revenue Appeals & Gujarat Revenue Tribunal Advocate",
    lede:
      "Most land problems in Gujarat can be fixed inside the revenue hierarchy, in months rather than years — if they are taken to the right authority, framed properly, and filed in time.",
    place: { name: "Gujarat", type: "state", containedIn: "India" },
    intro: [
      "The revenue hierarchy is the most under-used remedy in Gujarat land practice. Orders of the Mamlatdar and the Deputy Collector are appealable upward, and above the appellate stage a revision lies — before the Special Secretary (Revenue) or the Gujarat Revenue Tribunal depending on the statute under which the order was made.",
      "Used properly this route is faster and far cheaper than a civil suit, and for a large class of matters — mutation entries, record corrections, tenure and land-use conditions, tenancy questions — it is also the only forum that can actually grant what you want.",
      "Used badly it fails for reasons that have nothing to do with the merits: the wrong authority, a ground that was never pleaded below, a record that was never built, or an appeal filed after the period had run.",
    ],
    contextHeading: "Why good cases lose here",
    localContext: [
      {
        heading: "Limitation is the commonest cause of death",
        body:
          "Every stage has a period, and it generally runs from the order rather than from the day you found out about it. The single most frequent avoidable loss in this area is a strong case that arrived late. If you are holding an order you disagree with, the date on it is the first thing to establish and the reason not to wait — delay can sometimes be explained, but it has to be explained with material, and that is a fight you would rather not be having.",
      },
      {
        heading: "The appellate record is built at the first stage",
        body:
          "Appellate and revisional authorities work largely on the record made below. Documents not produced, contentions not raised and objections not taken at the first stage are difficult to introduce later. This is why the apparently minor proceeding before the Mamlatdar deserves to be taken seriously — it is where the case you may have to argue two levels up is either built or lost.",
      },
      {
        heading: "Picking the wrong forum costs a year",
        body:
          "Whether a matter belongs before the revenue authority or a civil court, and which revisional authority lies above it, depends on the statute under which the order was made and on what is really in dispute. A revenue authority will not decide a genuine question of title; a civil court will not correct an entry. Filing in the wrong place does not merely fail — it consumes the limitation period while it does so.",
      },
    ],
    focusAreas: [
      "appeals-representation",
      "revenue-records",
      "tenancy-tenure",
      "land-dispute-litigation",
      "court-representation",
    ],
    offices: [
      { name: "Mamlatdar's Office", note: "First-stage proceedings: mutation, entries and corrections." },
      { name: "Deputy Collector / Prant Office", note: "Appeals against orders of the Mamlatdar." },
      { name: "Collector's Office", note: "Appeals and applications at the district level." },
      { name: "Office of the Special Secretary (Revenue)", note: "Revision applications in revenue proceedings." },
      { name: "Gujarat Revenue Tribunal", note: "Revisional jurisdiction over revenue authority orders." },
      { name: "Gujarat High Court, Sola", note: "Writ jurisdiction once the hierarchy is exhausted." },
    ],
    faqHeading: "Revenue appeals — common questions",
    faqs: [
      {
        q: "A mutation entry was certified without notice to me. What can I do?",
        a: "An entry certified without notice to an interested person is challengeable, by appeal to the higher revenue authority and, above that, by revision. The important point is timing: limitation runs from the order, so establish the date and the manner in which you came to know of it at once. Bring the entry, the 7/12 showing it, and anything evidencing your interest in the land.",
      },
      {
        q: "How long do I have to appeal a revenue order?",
        a: "Each stage has its own period and it generally runs from the date of the order. Delay can sometimes be condoned where it is properly explained and supported, but that is an additional hurdle rather than a right. The practical rule is simple: treat the date on the order as a deadline and get the position assessed immediately rather than after taking advice from people who were not shown the order.",
      },
      {
        q: "What does the Gujarat Revenue Tribunal actually decide?",
        a: "It exercises revisional jurisdiction over orders of the revenue authorities in matters such as mutation and record entries, tenancy, tenure and land-use conditions. It is the right destination for a substantial class of land problems that would otherwise be pushed into a civil suit — and reaching it on a properly built record, with the grounds taken below, is what determines whether it can help you.",
      },
      {
        q: "Should I appeal, or file a civil suit?",
        a: "Depends on what is genuinely in dispute. If the real question is the correctness of an entry, a tenure condition or a land-use permission, the revenue route is both faster and the only one that can grant the relief. If the real question is who holds title, or you need a partition, declaration or specific performance, that is a civil court matter. Many disputes contain both, and sequencing them correctly is most of the strategy.",
      },
      {
        q: "Can you take over a matter that is already part-heard?",
        a: "Yes, and it is common. The first step is to read the entire record as it stands — the order under challenge, what was pleaded and produced below, and what the limitation position is — and then tell you frankly what can still be retrieved and what cannot.",
      },
    ],
    nearby: ["revenue-record-lawyer-in-ahmedabad", "high-court-land-advocate-in-ahmedabad", "tenancy-tenure-lawyer-in-gujarat", "advocate-in-gujarat"],
    areaServed: ["Gujarat", "Ahmedabad", "Gandhinagar", "Kheda", "Anand", "Vadodara", "Mehsana"],
  },

  {
    slug: "high-court-land-advocate-in-ahmedabad",
    kind: "service",
    practiceArea: "court-representation",
    title: "Court Representation in Land Matters | Ahmedabad",
    metaDescription:
      "Land and property litigation in Ahmedabad: Special Civil Applications in the Gujarat High Court; title, injunction and partition suits in civil court.",
    keywords: [
      "high court land advocate in ahmedabad",
      "gujarat high court land lawyer",
      "special civil application advocate ahmedabad",
      "city civil court land advocate ahmedabad",
      "partition suit lawyer ahmedabad",
      "specific performance suit lawyer ahmedabad",
      "injunction land matter advocate ahmedabad",
    ],
    eyebrow: "Practice · Court Representation",
    displayLines: ["Court", "Representation."],
    h1: "Court Representation in Land Matters — Ahmedabad & Gujarat High Court",
    lede:
      "Some land matters cannot be settled on the record. These are the ones that go to court — and the ones where the preparation done beforehand decides the result.",
    place: { name: "Ahmedabad", type: "city", containedIn: "Gujarat" },
    intro: [
      "Litigation is the expensive remedy, so it should be the chosen one rather than the default. A good deal of this practice consists of telling clients that their matter does not need a suit. What follows is about the matters that do.",
      "Broadly they fall into three groups: questions of title and entitlement that only a civil court can declare; claims to enforce or undo a transaction, such as specific performance or cancellation; and challenges to the acts of authorities, which go to the Gujarat High Court by way of a Special Civil Application once the remedies below are exhausted.",
      "Representation is handled before the Gujarat High Court at Sola, the City Civil and Sessions Court at Ahmedabad, and the district courts, with the revenue-side record work done in-house rather than farmed out — which is usually why these matters move.",
    ],
    contextHeading: "What decides a land suit",
    localContext: [
      {
        heading: "Who is on the record",
        body:
          "Land suits fail on parties more often than on merits. An heir never brought on record, a co-owner left out, a subsequent purchaser not joined — each produces a decree that does not bind the person it needed to bind, or an objection that restarts the matter years in. Establishing the full set of interested persons from the revenue and registration record, before filing, is unglamorous and decisive.",
      },
      {
        heading: "Interim relief is won on documents, not urgency",
        body:
          "In possession and encroachment matters the interim stage frequently determines the practical outcome, because it decides who holds the land for the years the suit runs. Interim orders are granted on the strength of the record placed before the court — the measurement, the property card, the registered chain — rather than on the vehemence of the claim. The record therefore has to be assembled before the application, not after.",
      },
      {
        heading: "A decree you cannot execute is not a win",
        body:
          "A declaration that is never carried into the revenue or city survey record leaves you holding a judgment and an unchanged 7/12. The matter is not finished when the order is passed; it is finished when the record reflects it. Carrying the result through to mutation is treated as part of the case here, not as a separate errand.",
      },
    ],
    focusAreas: [
      "court-representation",
      "land-dispute-litigation",
      "appeals-representation",
      "property-documentation",
      "revenue-records",
    ],
    offices: [
      { name: "Gujarat High Court, Sola", note: "Special Civil Applications, first and second appeals." },
      { name: "City Civil & Sessions Court, Ahmedabad", note: "Title, declaration, injunction, specific performance and partition suits." },
      { name: "District Courts, Ahmedabad", note: "Suits and appeals outside the city civil court's jurisdiction." },
      { name: "Gujarat Revenue Tribunal", note: "Exhausting the revenue remedy before invoking writ jurisdiction." },
      { name: "City Survey & Mamlatdar Offices", note: "Building the documentary record, and executing the result into it." },
    ],
    faqHeading: "Court representation — common questions",
    faqs: [
      {
        q: "How long does a land suit take in Ahmedabad?",
        a: "A contested title or partition suit in the City Civil Court is a multi-year commitment, and that should be priced into the decision before it is taken. The interim stage, which often decides who holds the land in the meantime, is reached much sooner. Part of the initial assessment is telling you plainly which timeline you are looking at, because the forum sets it far more than the facts do.",
      },
      {
        q: "When does a land matter go to the High Court?",
        a: "Principally where the act of an authority is being challenged — a revenue order made without jurisdiction or in breach of natural justice, or a refusal that is legally unsustainable — and ordinarily only after the appeal and revision remedies below have been exhausted. It also hears appeals from the civil courts. Going to the High Court prematurely usually results in being sent back, having lost time.",
      },
      {
        q: "Can I get an injunction to stop construction on disputed land?",
        a: "It is possible, and in encroachment matters it is often the relief that matters most. It is granted on the documentary record — the measurement, the property card, the registered chain and evidence of possession — so the realistic question is not how urgent it feels but how quickly a sound record can be put before the court. That is the work to do first.",
      },
      {
        q: "The seller is refusing to execute the sale deed although I have paid. What can I do?",
        a: "A suit for specific performance is the ordinary remedy, subject to limitation, to your having been and remaining ready and willing to perform, and to the stamp and registration position of the agreement you hold. The agreement should be read before anything else, because its terms and its date largely determine what is available to you.",
      },
      {
        q: "Can a pending suit still be settled?",
        a: "Frequently, and often on better terms once the record position is clear to both sides. Settlement is pursued wherever it serves the client, with the settlement documented properly and carried through into the revenue record — otherwise it simply becomes the next dispute.",
      },
    ],
    nearby: ["land-dispute-lawyer-in-ahmedabad", "revenue-tribunal-advocate-in-gujarat", "advocate-in-ahmedabad", "property-lawyer-in-ahmedabad"],
    areaServed: ["Ahmedabad", "Ahmedabad District", "Gandhinagar", "Gujarat"],
  },

  {
    slug: "land-due-diligence-in-gujarat",
    kind: "service",
    practiceArea: "land-policy-consultation",
    title: "Land Due Diligence in Gujarat | Developers & Investors",
    metaDescription:
      "Land due diligence in Gujarat for developers and investors: title investigation, tenure, TP scheme position, conversion limits and title certificates.",
    keywords: [
      "land due diligence gujarat",
      "title certificate lawyer gujarat",
      "land title investigation ahmedabad",
      "land due diligence for developers gujarat",
      "land advisory advocate ahmedabad",
      "title search report gujarat",
      "land aggregation legal advisor gujarat",
    ],
    eyebrow: "Practice · Due Diligence & Advisory",
    displayLines: ["Land Due", "Diligence."],
    h1: "Land Due Diligence in Gujarat — Developers, Investors & Institutions",
    lede:
      "A written answer to one question, before the money moves: what exactly can be done with this land, by this buyer, and what stands in the way.",
    place: { name: "Gujarat", type: "state", containedIn: "India" },
    intro: [
      "Diligence on a landholding is not a title search with a longer invoice. A title search tells you who owns the land. A developer or investor needs to know something harder: whether this buyer may lawfully acquire it, what the land may be used for, what permissions and payments stand between acquisition and use, and which of the defects in the chain are curable.",
      "That is a different exercise, and it has to be reported in a form a decision can be taken on — defects separated from untidiness, curable separated from fatal, with the cost and the time of each cure stated.",
      "This practice does that work for single parcels and for aggregations, including the awkward cases: multiple sellers, fragmented family holdings, restricted tenure, and parcels where the revenue record and the town planning record describe different things.",
    ],
    contextHeading: "What a usable diligence report has to answer",
    localContext: [
      {
        heading: "Can this buyer hold this land?",
        body:
          "Eligibility is the gate that no amount of documentation gets past. Whether the acquiring entity may lawfully hold the land, given its own constitution and the land's classification and tenure, must be settled before the chain of title is even worth reading. Deals that collapse late almost always collapse here, and they collapse after the advances have gone out.",
      },
      {
        heading: "What does the record permit, and at what cost?",
        body:
          "Tenure conditions, transfer sanctions and premiums, non-agricultural conversion with its conditions and periods, fragmentation limits, and the town planning and final plot position all set the real boundaries of what the land can become. Each has a cost and a timeline. A report that lists them without pricing them has moved the problem rather than solved it.",
      },
      {
        heading: "Which defects are curable, and who has to be alive to cure them?",
        body:
          "Most chains of title have gaps. The useful distinction is between a gap that can be cured — by mutation, by declarations from identifiable people, by regularisation on payment — and one that cannot, because the person whose signature would fix it is unreachable or because a limitation period has closed. That distinction is what should drive the price and the conditions, and it is what is reported here.",
      },
    ],
    focusAreas: [
      "land-policy-consultation",
      "property-documentation",
      "agricultural-land",
      "tenancy-tenure",
      "land-use-conversion",
    ],
    offices: [
      { name: "Sub-Registrar's Offices", note: "Registration chain and index-II searches across districts." },
      { name: "Mamlatdar's Offices", note: "7/12 Utara, 8-A, tenure and mutation history." },
      { name: "City Survey Superintendent's Office", note: "Property cards and measurement records." },
      { name: "AUDA / AMC and other planning authorities", note: "Scheme, final plot and development permission position." },
      { name: "Collector's Office", note: "Tenure sanction, N.A. permission and premium position." },
    ],
    faqHeading: "Due diligence — common questions",
    faqs: [
      {
        q: "What does a land due diligence report from you contain?",
        a: "The flow of title through the registered instruments and the revenue record, with the gaps identified; the tenure position and any conditions or sanctions required; eligibility of the proposed acquirer; the town planning, final plot and development position; non-agricultural conversion status and outstanding conditions; encumbrances, charges and dues; litigation and notices affecting the land; and a closing section separating curable defects — with cost and timeline for each — from those that are not. It is written to be acted on, not filed.",
      },
      {
        q: "How far back should the title be traced?",
        a: "Far enough to be confident that nobody with a better claim has been left out, which in practice means through the registered chain and the revenue mutation history to a secure root, and further where an inheritance, a tenancy entry or a tenure grant appears in the middle. Institutional lenders often specify a period; where they do, that is the floor rather than the standard.",
      },
      {
        q: "We are aggregating several parcels from different families. Can you handle that?",
        a: "Yes, and it is a distinct exercise from diligence on a single parcel. Aggregations need the parcels assessed both individually and as a block — contiguity and access, whether sub-divisions and fragmentation limits permit what is proposed, consistency of tenure across the parcels, and a sequencing plan so that the acquisition does not stall on the one holding that needs a permission nobody checked for.",
      },
      {
        q: "Can you issue a title certificate for a bank or institutional buyer?",
        a: "Yes — a written title certificate and report in the format required, backed by the searches behind it. Where the title does not support an unqualified certificate, you will be told that before the work is completed rather than handed a qualified document at the end.",
      },
      {
        q: "How long does diligence take, and what do you need to start?",
        a: "It depends on the depth of the chain and how quickly certified copies and searches return. To begin: the survey or final plot numbers and village, the current 7/12 or property card, whatever deeds the seller has produced, and the identity and constitution of the proposed acquirer. Send those to +91 81288 00351 or adv.krupalsavjani@gmail.com and you will get a realistic scope and timeline.",
      },
    ],
    nearby: ["property-lawyer-in-ahmedabad", "agricultural-land-lawyer-in-gujarat", "na-conversion-lawyer-in-gujarat", "advocate-in-gujarat"],
    areaServed: ["Gujarat", "Ahmedabad", "Gandhinagar", "Dholera", "Sanand", "Kheda", "Vadodara", "Surat"],
  },
];

/** Fast lookup by slug. */
export const LOCAL_PAGE_BY_SLUG: Record<string, LocalPage> = Object.fromEntries(
  LOCAL_PAGES.map((p) => [p.slug, p])
);

export function getLocalPage(slug: string): LocalPage | undefined {
  return LOCAL_PAGE_BY_SLUG[slug];
}

/**
 * PRACTICE_AREAS slug -> the local page that is its detail page.
 * `/services` reads this to link each section to the URL that owns the topic.
 */
export const PAGE_BY_PRACTICE_AREA: Record<string, LocalPage> = Object.fromEntries(
  LOCAL_PAGES.filter((p) => p.practiceArea).map((p) => [p.practiceArea as string, p])
);

/** Area pages only — used for the footer's "Areas we serve" block. */
export const AREA_PAGES = LOCAL_PAGES.filter((p) => p.kind === "area");
export const SERVICE_PAGES = LOCAL_PAGES.filter((p) => p.kind === "service");
