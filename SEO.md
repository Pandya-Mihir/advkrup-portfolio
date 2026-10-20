# SEO — what is in the code, and what only you can do

Target queries: `best advocate in ahmedabad`, `advocate near makarba`,
`advocate in ahmedabad`, `best advocate in gujarat`, plus the
Makarba / Ghodasar / Isanpur / Odhav neighbourhood cluster.

---

## 1. The bug that was costing everything

`components/TermsModal.tsx` wrapped every page and rendered
`{accepted && children}`, returning `null` while its mount effect was pending.

Consequence: **the server HTML for every route contained no page content.**
Measured on the previous build, `/`'s `<body>` held 531 bytes — a scroll bar and
a loading splash. All real content existed only inside the React flight payload
in `<script>` tags. A crawler that executed the JS was then shown a disclaimer
modal it had no way to accept, so it never reached the content either.

No amount of keyword work matters while that is true. It is fixed: `children`
now always render, and the disclaimer is a client-mounted overlay on top.

Indexable text in the server HTML, before → after:

| Page | Before | After |
|---|---|---|
| `/` | 0 | 3,132 chars |
| `/advocate-in-ahmedabad` | — | 9,061 chars |
| `/advocate-in-makarba` | — | 7,774 chars |
| `/services` | 0 | 5,450 chars |

Across all 23 built pages: **23,654 indexable words, 0 characters hidden at
`opacity: 0`.**

**Do not reintroduce a gate on `children`.** If the disclaimer must block
interaction, block it with the overlay, never by withholding the content.

---

## 2. What is now in the code

**Technical foundation**
- `metadataBase` + per-page `alternates.canonical` — every page emits a
  canonical tag. Previously none did, so none could.
- `lang="en-IN"`, `openGraph` + `twitter` cards, `max-image-preview:large`.
- `app/robots.ts` — allows everything except `/studio`, `/api`, `/deed-form`;
  points at the sitemap.
- `app/sitemap.ts` — static routes (including /areas) + all 18 local pages + blog posts from
  Sanity, with real `lastmod`. Revalidates daily.
- `app/manifest.ts`, `app/og-image.png/route.tsx` (generated social card at a
  stable URL so JSON-LD can reference it too).
- `/studio` and `/deed-form` are `noindex`.

**Structured data** (`lib/seo/schema.ts`) — one connected entity, not three
unrelated blobs:
- `WebSite` → `LegalService`/`Attorney` → `Person`/`Attorney`, joined by stable
  `@id`s and rendered sitewide.
- `sameAs` and `hasMap` point at your **verified** Google Business Profile
  (`cid=10011974631465872727`, read off the map embed on the contact page).
  This is how the site tells Google the listing and the site are one practice.
- `BreadcrumbList`, `WebPage`, `Service`, `FAQPage` per page; `BlogPosting` per
  article; `ContactPage` on `/contact`.
- Deliberately **no** `aggregateRating`/`review`. Google disallows self-serving
  review markup on `LocalBusiness` and it risks a manual action. Ratings belong
  on the Business Profile, where clients leave them.

**Headings.** Every H1 was brand poetry — "The Land Advocate", "Architecting
the Verdict.", "INITIATE", "Journal" — carrying no query signal. The display
line is kept, and the keyword phrase now sits inside the same H1 rather than
being hidden or demoted to a paragraph.

Also fixed: `WordReveal` split text into spans with CSS margins but no space
character, so `textContent` read "TheLandAdvocate". Every animated headline on
the site was unreadable as a phrase.

**NAP.** The footer said `Ahmedabad — 380007`. The office is in Makarba, which
is 380015 (380007 is Paldi). A wrong pincode on the site that disagrees with
the Business Profile splits the local signal. It now comes from
`lib/seo/site.ts`, as does every other copy of the address, phone and hours.

**18 new pages** (`lib/seo/locations.ts` → `app/[slug]/page.tsx`).

Eight geography pages, targeting "<advocate> in <place>":

| URL | Primary intent |
|---|---|
| `/advocate-in-ahmedabad` | advocate / best advocate in Ahmedabad |
| `/advocate-in-gujarat` | advocate / best advocate in Gujarat |
| `/advocate-in-makarba` | **advocate near makarba** |
| `/advocate-in-prahladnagar` | advocate near Prahladnagar, Corporate Road |
| `/advocate-in-vejalpur` | advocate in Vejalpur |
| `/advocate-in-ghodasar` | advocate in Ghodasar |
| `/advocate-in-isanpur` | advocate in Isanpur |
| `/advocate-in-odhav` | advocate in Odhav, GIDC industrial |

Ten matter pages — **one per practice-area section on `/services`**, so each of
the ten has its own title, description, canonical, H1, FAQs and `Service`
schema instead of being an anchor on one long page:

| `/services` section | Page |
|---|---|
| Land Dispute Litigation | `/land-dispute-lawyer-in-ahmedabad` |
| Revenue Records | `/revenue-record-lawyer-in-ahmedabad` |
| Property Documentation | `/property-lawyer-in-ahmedabad` |
| Land Acquisition | `/land-acquisition-lawyer-in-gujarat` |
| Agricultural Land | `/agricultural-land-lawyer-in-gujarat` |
| Conversion of Land Use | `/na-conversion-lawyer-in-gujarat` |
| Tenancy & Tenure | `/tenancy-tenure-lawyer-in-gujarat` |
| Appeals & Representation | `/revenue-tribunal-advocate-in-gujarat` |
| Land Policy Consultation | `/land-due-diligence-in-gujarat` |
| Court Representation | `/high-court-land-advocate-in-ahmedabad` |

**One page per intent, deliberately.** There is no `/best-advocate-in-ahmedabad`
alongside `/advocate-in-ahmedabad`, and no generic `/land-disputes` alongside
`/land-dispute-lawyer-in-ahmedabad`. Two pages chasing one query split their
own authority and Google picks one anyway — usually not the one you wanted. If
you add pages later, add a new *intent*, not a synonym.

Each page carries its own prose, its own three context blocks, its own 4–6 FAQs,
its own office/forum list and its own internal links — 1,000–1,400 words of
distinct copy, verified page by page. That is deliberate: pages that only swap
a name into a shared template are **doorway pages** under Google's spam
policies and get filtered out or worse. If you add areas or matters later,
write real copy for them.

One route handles all 18, with `dynamicParams = false`, so any other
`/<something>` 404s rather than rendering an empty page.

**Internal linking.** Each of the ten `/services` sections now carries an
in-content link to its own page, with the target page's primary phrase as the
anchor text rather than "read more" — that is what tells Google which URL owns
which topic. On top of that, `/areas` is a "Where we practise" hub page (linked
from the menu and the footer's "All areas →") that lists every area and matter
page with its own lede, and the footer carries every one of the 18 pages sitewide, so each is a single hop from
anywhere, including deep blog pages.

---

## 3. Verify before you believe any of it

Nothing above ranks until it is deployed and Google has recrawled.

- [ ] `NEXT_PUBLIC_SITE_URL=https://advkrupalsavjani.in` set in the server
      environment. The fallback in `lib/seo/site.ts` is already that domain, so
      it works either way — but set it, and never let it be the wrong value.
- [ ] `curl -s https://advkrupalsavjani.in | grep -c "Land Dispute"` returns
      ≥ 1. If it returns 0, the content is not in the HTML and nothing else
      matters.
- [ ] `https://advkrupalsavjani.in/robots.txt` and `/sitemap.xml` both load.
- [ ] Search Console → submit `sitemap.xml`. Then **URL Inspection → Request
      indexing** on `/`, `/advocate-in-ahmedabad` and `/advocate-in-makarba`
      individually. Don't wait for the natural crawl.
- [ ] Search Console → URL Inspection → *View crawled page* on `/`. Confirm
      Google sees the body text, not the loading splash.
- [ ] Rich Results Test on `/advocate-in-makarba` — expect `LegalService`,
      `FAQPage` and `BreadcrumbList` to validate.
- [ ] Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` if you want the meta-tag
      verification method in addition to whatever you used.

---

## 4. The part that actually wins "advocate near makarba"

For a `near me` query the map pack sits above every blue link, and the website
is not what ranks in it — **the Business Profile is.** The site supports it.
Your profile is already verified, which is the hard part. What remains:

1. **Primary category must be exactly `Lawyer`** (or `Legal services`). If it
   is something broader, change it — category is the single strongest local
   ranking factor after proximity. Add secondary categories for the land and
   property specialisms.
2. **Address must match the site character-for-character:**
   `C-1207, Titanium Business Park, Makarba, Ahmedabad, Gujarat 380015`.
   Fix it on whichever side is wrong — the 380007 in the old footer may also be
   sitting in directory listings.
3. **Service areas** — add Makarba, Prahladnagar, Vejalpur, Ghodasar, Isanpur,
   Odhav, Satellite, Bopal, Sarkhej. This is what `near me` matches against.
4. **Services** — add each of the ten practice areas as a named service with
   its description. Copy them from `lib/seo/site.ts`.
5. **Photos** — real ones: the office exterior with the building name legible,
   the entrance, the interior, and a portrait. Geotagged is a myth; recent and
   genuine is not. Add a few every month.
6. **Reviews — the highest-leverage item on this list.** Ask every client who
   finishes a matter. Ask in person, then send the short link. Reply to all of
   them. Reviews that mention *what* the matter was and *where* the client is
   ("7/12 correction", "Makarba") carry local relevance that a generic
   five-star does not.
7. **Q&A** — seed it yourself with the real questions clients ask, and answer
   them. It is a live section of the profile that almost nobody uses.
8. **Posts** — one a month. Low direct ranking weight, visible activity signal.
9. Add the website link, and add `/advocate-in-makarba` as the link on any
   Makarba-specific service entry.

### Citations — consistent NAP in the places Indians actually search
Same name, same address, same phone, every time. Inconsistency is worse than
absence.

JustDial · Sulekha · IndiaMART · Lawrato · VakilSearch · Pathlegal ·
LegalServiceIndia · AsiaLaw / LawyerGuru · Bing Places · Apple Business Connect
· Facebook Page · Practo-style local directories · the Bar Council of Gujarat
roll (make sure your enrolment entry is findable and correct).

### Backlinks worth having
- Bar Council of Gujarat and Ahmedabad Bar Association member listings.
- Your law college alumni directory.
- Guest articles on Indian legal portals (Bar & Bench, LiveLaw community,
  LawctopUs, Mondaq) on Gujarat land law — your `/blog` content is already the
  raw material.
- Local Ahmedabad business associations and the Titanium Business Park /
  Corporate Road tenant directories.
- Any matter of yours that gets reported — ask for the link.

---

## 5. Content work that compounds

The blog has **one** post. That is the biggest remaining on-site gap: topical
authority in land law is what will carry the competitive head terms.

Write these — each one is a query people actually type, and each one links back
to a local page:

- How to correct a wrong entry in your 7/12 Utara (step by step)
- Banakhat vs registered Agreement to Sell — which to use and when
- Who can buy agricultural land in Gujarat?
- Checking a title before you buy in Ahmedabad — a buyer's checklist
- What N.A. / bin-kheti conversion actually involves, and what it costs
- Mutation entry certified without notice to you — what to do, and by when
- New & impartible tenure: what you can and cannot do with the land
- Society share certificate is not title — the Ghodasar/Isanpur problem
- Buying a shed in a GIDC estate: the permission nobody checks
- Original survey number vs TP final plot — reading Makarba land records

One a fortnight beats ten in a burst. Put the real answer in the post; a thin
post is worse than none.

Then consider **Gujarati versions** of the local pages. `વકીલ અમદાવાદ` and
similar queries have real volume and almost no competent competition. The
`hreflang` structure is ready for it — the pages would go at `/gu/<slug>` with
`alternates.languages` pointing both ways. Needs your review of the legal
wording, which is why it was left out of this pass.

---

## 6. Two judgement calls you should know about

**"Best advocate in …" and the Bar Council.** BCI Rule 36 restricts advertising
and soliciting by advocates. The accepted reading permits a website with your
name, contact details, enrolment particulars and areas of practice; bald
superlatives and claims of results are where practices get into trouble, and
"best advocate in Ahmedabad" as a self-description in a title tag is the kind of
phrase that gets cited.

So the pages **target** that query — `/advocate-in-ahmedabad` ranks for it via
its H2, its FAQ ("How do I choose the best advocate in Ahmedabad…") and its
body copy — without the site asserting in its own voice that you are the best.
The disclaimer modal now also carries the standard "not an advertisement or
solicitation" wording. You lose very little ranking this way: Google matches
the query against page content, and the phrase is on the page. If you want the
superlative in the title tag regardless, it is one line in
`lib/seo/locations.ts` — but that is your call against your own regulator, not
a technical decision.

**The load overlay.** `components/ui/animation-gate.tsx` covers the page with
an opaque panel for up to 2.8s while fonts settle. Content is in the HTML, so
indexing is unaffected — but it delays when a real visitor sees anything, and
that is a Core Web Vitals and bounce-rate cost on slow mobile connections.
Left as-is because it was a deliberate anti-flicker fix. Worth measuring in
PageSpeed Insights once deployed; if LCP is poor, shortening the 2,500 ms
ceiling is the first lever.

---

## 7. Where things live

```
lib/seo/site.ts        NAP, geo, hours, socials, practice areas — single source
                       of truth. Change the address here and it changes
                       everywhere, including the schema.
lib/seo/locations.ts   All 18 local pages: copy, FAQs, keywords, links.
lib/seo/schema.ts      JSON-LD builders.
components/seo/json-ld.tsx
app/[slug]/page.tsx    The local page template.
app/areas/page.tsx     The /areas hub: every area and matter page.
app/robots.ts · app/sitemap.ts · app/manifest.ts · app/og-image.png/route.tsx
```

Adding a page = one record in `LOCAL_PAGES`. It then appears in the sitemap,
the footer and the /areas hub automatically; set `practiceArea` as well and
the matching `/services` section links to it too. Write it real copy.
