import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { HeroReveal, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { WordReveal } from "@/components/ui/parallax";
import { getAllPosts } from "@/lib/sanity/queries";
import { urlFor, formatSanityDate } from "@/lib/sanity/client";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, graph, webPageSchema, ID } from "@/lib/seo/schema";
import { abs } from "@/lib/seo/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Journal — Gujarat Land & Revenue Law Insights",
  description:
    "Practical analysis of Gujarat land and revenue law by Adv. Krupal P. Savjani, advocate in Ahmedabad — 7/12 records, title and tenure, land-use conversion, acquisition and the revenue hierarchy.",
  keywords: [
    "gujarat land law blog",
    "gujarat land revenue code articles",
    "7/12 utara explained",
    "land law insights ahmedabad",
    "property law gujarat articles",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Journal — Gujarat Land & Revenue Law Insights",
    description:
      "Legal insights on land & revenue law in Gujarat — practical analysis for landowners, claimants and practitioners.",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="bg-[#f6f4f0] text-[#161513]">
      <JsonLd
        id="schema-blog"
        data={graph(
          webPageSchema({
            path: "/blog",
            name: "Journal — Gujarat Land & Revenue Law Insights",
            description:
              "Practical analysis of Gujarat land and revenue law for landowners, claimants and practitioners.",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/blog" },
          ]),
          {
            "@type": "Blog",
            "@id": `${abs("/blog")}#blog`,
            name: "Journal — Gujarat Land & Revenue Law",
            url: abs("/blog"),
            inLanguage: "en-IN",
            publisher: { "@id": ID.practice },
            author: { "@id": ID.person },
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              "@id": `${abs(`/blog/${post.slug}`)}#article`,
              headline: post.title.slice(0, 110),
              url: abs(`/blog/${post.slug}`),
              datePublished: post.publishedAt,
              dateModified: post._updatedAt ?? post.publishedAt,
              articleSection: post.category,
              author: { "@id": ID.person },
            })),
          }
        )}
      />

      <Navbar />

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="pt-40 pb-20 px-8 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-end mb-16">
        <div className="md:col-span-8">
          <HeroReveal delay={0.05}>
            <div className="t-eyebrow mb-6">
              Dispatch &amp; Perspective
            </div>
          </HeroReveal>
          <HeroReveal delay={0.2}>
            <h1>
              <span className="t-display block">
                <WordReveal text="Journal" delay={0.2} />
              </span>
              <span className="t-hero-sub measure-wide mt-7 block">
                Gujarat land &amp; revenue law — insights from an advocate in Ahmedabad
              </span>
            </h1>
          </HeroReveal>
        </div>
        <HeroReveal delay={0.4} className="md:col-span-4 md:text-right">
          <p className="t-body-sm max-w-xs md:ml-auto">
            Legal insights on Land &amp; Revenue law in Gujarat — practical analysis for landowners,
            claimants, and practitioners.
          </p>
        </HeroReveal>
      </header>

      {/* ── Article Grid ─────────────────────────────────────────
          A uniform card grid rather than the previous magazine layout
          (one full-width "featured" post with a 614px-tall image, then two
          asymmetric slots). With a small number of posts that layout gave a
          single article the entire viewport; every card is equal weight
          here, and the grid simply fills as posts are added. ────────── */}
      <section className="px-8 md:px-12 pb-8">
        {posts.length === 0 ? (
          <div className="t-meta py-32 text-center">No articles published yet.</div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {posts.map((post, i) => (
              <StaggerItem key={post._id}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  {/*
                    The card is a real surface — border, background, padding —
                    rather than an image with loose text beneath it. Both the
                    border and the background shift on hover, which is the only
                    hover affordance left now that the image effects are gone.
                  */}
                  <article className="flex h-full flex-col border border-[#cdc6b9]/25 bg-[#eeebe5] transition-colors duration-200 group-hover:border-[#fe5545]/50 group-hover:bg-[#e8e4dc]">
                    {/* Image bleeds to the card's top and side edges. A fixed
                        3:2 box keeps every row aligned whatever the source
                        image's dimensions are. */}
                    <div className="relative aspect-[3/2] overflow-hidden bg-[#f6f4f0]">
                      {post.mainImage ? (
                        <Image
                          src={urlFor(post.mainImage).width(800).height(534).url()}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          /* Grayscale for the house style, but no brightness
                             crush — stacking brightness-75 and contrast-110 on
                             an already dark photo just made it muddy. */
                          className="object-cover grayscale"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#e8e4dc]">
                          <span className="t-display-sm text-[#fe5545] opacity-20">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="t-eyebrow">{post.category}</span>
                        <span className="t-meta">{formatSanityDate(post.publishedAt)}</span>
                      </div>

                      <h2 className="t-card mb-3 group-hover:text-[#c43b27] transition-colors duration-200">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="t-body-sm mb-5 line-clamp-3">{post.excerpt}</p>
                      )}

                      {/* mt-auto pins this to the card's bottom edge so the CTA
                          lines up across cards with different title lengths. */}
                      <span className="t-action mt-auto inline-flex items-center gap-2 text-[#fe5545]">
                        Read
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </section>

      {/* ── Pagination ──────────────────────────────────────────── */}
      {posts.length > 0 && (
        <div className="px-8 md:px-12 mt-32 flex justify-between items-center border-t border-[#cdc6b9]/10 pt-12 mb-24">
          <span className="t-meta">
            Showing 01 — {String(posts.length).padStart(2, "0")} of {String(posts.length).padStart(2, "0")}
          </span>
        </div>
      )}

      <Footer />
    </main>
  );
}
