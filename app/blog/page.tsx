import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { HeroReveal, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { WordReveal } from "@/components/ui/parallax";
import { getAllPosts } from "@/lib/sanity/queries";
import { urlFor, formatSanityDate } from "@/lib/sanity/client";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllPosts();

  const featured = posts[0] ?? null;
  const secondary = posts.slice(1, 3);

  return (
    <main className="bg-[#131313] text-[#e2e2e2]">
      <Navbar />

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="pt-40 pb-20 px-8 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-end mb-16">
        <div className="md:col-span-8">
          <HeroReveal delay={0.05}>
            <div className="font-label uppercase tracking-[0.3em] text-[11px] text-[#ffb4a9] mb-6">
              Dispatch &amp; Perspective
            </div>
          </HeroReveal>
          <HeroReveal delay={0.2}>
            <h1 className="text-7xl md:text-[8rem] font-headline italic leading-[0.9] tracking-tighter text-[#e2e2e2]">
              <WordReveal text="Journal" delay={0.2} />
            </h1>
          </HeroReveal>
        </div>
        <HeroReveal delay={0.4} className="md:col-span-4 md:text-right">
          <p className="font-label text-[#e2e2e2]/50 text-xs tracking-widest uppercase leading-relaxed max-w-xs md:ml-auto">
            Legal insights on Land &amp; Revenue law in Gujarat — practical analysis for landowners,
            claimants, and practitioners.
          </p>
        </HeroReveal>
      </header>

      {/* ── Article Grid ────────────────────────────────────────── */}
      <section className="px-8 md:px-12">
        {posts.length === 0 ? (
          <div className="py-32 text-center text-[#e2e2e2]/30 font-label uppercase tracking-[0.3em] text-xs">
            No articles published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-12">

            {/* Featured Article */}
            {featured && (
              <FadeUp className="md:col-span-12">
                <Link href={`/blog/${featured.slug}`} className="block group">
                  <article className="cursor-pointer">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                      <div className="md:col-span-7 overflow-hidden bg-[#1b1b1b]">
                        {featured.mainImage ? (
                          <Image
                            src={urlFor(featured.mainImage).width(1400).height(614).url()}
                            alt={featured.title}
                            width={1400}
                            height={614}
                            className="w-full h-[400px] md:h-[614px] object-cover grayscale contrast-125 brightness-75 group-hover:scale-105 transition-transform duration-1000"
                          />
                        ) : (
                          <div className="w-full h-[400px] md:h-[614px] bg-[#1f1f1f] flex items-center justify-center">
                            <span className="font-headline italic text-[#fe5545] text-6xl opacity-20">01.</span>
                          </div>
                        )}
                      </div>
                      <div className="md:col-span-5">
                        <div className="flex gap-4 items-center mb-6">
                          <span className="font-label uppercase tracking-[0.2em] text-[10px] text-[#ffb4a9]">
                            {featured.category}
                          </span>
                          <span className="w-8 h-px bg-[#5b403c]/40" />
                          <span className="font-label uppercase tracking-[0.2em] text-[10px] text-[#e2e2e2]/40">
                            {formatSanityDate(featured.publishedAt)}
                          </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-headline italic leading-tight text-[#e2e2e2] mb-8 group-hover:text-[#ffb4a9] transition-colors">
                          {featured.title}
                        </h2>
                        <p className="text-[#e2e2e2]/60 text-lg leading-relaxed mb-8 max-w-md">
                          {featured.excerpt}
                        </p>
                        <div className="inline-flex items-center gap-2">
                          <span className="font-label uppercase tracking-[0.2em] text-[10px] text-[#e2e2e2]">
                            Read Statement
                          </span>
                          <span className="text-[14px] text-[#ffb4a9]">→</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </FadeUp>
            )}

            {/* Secondary Articles */}
            {secondary[0] && (
              <FadeUp delay={0.1} className="md:col-span-5 md:mt-24">
                <Link href={`/blog/${secondary[0].slug}`} className="block group">
                  <article className="cursor-pointer">
                    <div className="bg-[#1b1b1b] aspect-[4/5] overflow-hidden mb-8">
                      {secondary[0].mainImage ? (
                        <Image
                          src={urlFor(secondary[0].mainImage).width(800).height(1000).url()}
                          alt={secondary[0].title}
                          width={800}
                          height={1000}
                          className="w-full h-full object-cover grayscale contrast-150 brightness-50 group-hover:scale-105 transition-transform duration-1000"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#1f1f1f] flex items-center justify-center">
                          <span className="font-headline italic text-[#fe5545] text-6xl opacity-20">02.</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-4 items-center mb-4">
                      <span className="font-label uppercase tracking-[0.2em] text-[10px] text-[#ffb4a9]">
                        {secondary[0].category}
                      </span>
                      <span className="font-label uppercase tracking-[0.2em] text-[10px] text-[#e2e2e2]/40">
                        {formatSanityDate(secondary[0].publishedAt)}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-headline italic leading-tight text-[#e2e2e2] group-hover:text-[#ffb4a9] transition-colors">
                      {secondary[0].title}
                    </h3>
                  </article>
                </Link>
              </FadeUp>
            )}

            {secondary[0] && secondary[1] && <div className="hidden md:block md:col-span-1" />}

            {secondary[1] && (
              <FadeUp delay={0.2} className="md:col-span-6">
                <Link href={`/blog/${secondary[1].slug}`} className="block group">
                  <article className="cursor-pointer">
                    <div className="bg-[#1b1b1b] aspect-video overflow-hidden mb-8">
                      {secondary[1].mainImage ? (
                        <Image
                          src={urlFor(secondary[1].mainImage).width(900).height(506).url()}
                          alt={secondary[1].title}
                          width={900}
                          height={506}
                          className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:scale-105 transition-transform duration-1000"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#1f1f1f] flex items-center justify-center">
                          <span className="font-headline italic text-[#fe5545] text-6xl opacity-20">03.</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-4 items-center mb-4">
                      <span className="font-label uppercase tracking-[0.2em] text-[10px] text-[#ffb4a9]">
                        {secondary[1].category}
                      </span>
                      <span className="font-label uppercase tracking-[0.2em] text-[10px] text-[#e2e2e2]/40">
                        {formatSanityDate(secondary[1].publishedAt)}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-headline italic leading-tight text-[#e2e2e2] mb-4 group-hover:text-[#ffb4a9] transition-colors">
                      {secondary[1].title}
                    </h3>
                    <p className="text-[#e2e2e2]/50 text-sm leading-relaxed max-w-sm">
                      {secondary[1].excerpt}
                    </p>
                  </article>
                </Link>
              </FadeUp>
            )}

            {/* Additional Articles Grid */}
            {posts.length > 3 && (
              <div className="md:col-span-12 mt-12">
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {posts.slice(3).map((post, i) => (
                    <StaggerItem key={post._id}>
                      <Link href={`/blog/${post.slug}`} className="block group">
                        <article>
                          <div className="bg-[#1b1b1b] aspect-square overflow-hidden mb-8">
                            {post.mainImage ? (
                              <Image
                                src={urlFor(post.mainImage).width(600).height(600).url()}
                                alt={post.title}
                                width={600}
                                height={600}
                                className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-700"
                              />
                            ) : (
                              <div className="w-full h-full bg-[#1f1f1f] flex items-center justify-center">
                                <span className="font-headline italic text-[#fe5545] text-6xl opacity-20">
                                  {String(i + 4).padStart(2, "0")}.
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="font-label uppercase tracking-[0.2em] text-[10px] text-[#ffb4a9]/50 block mb-4">
                            {post.category}
                          </span>
                          <h3 className="text-3xl font-headline italic leading-tight text-[#e2e2e2] group-hover:text-[#ffb4a9] transition-colors">
                            {post.title}
                          </h3>
                        </article>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── Pagination ──────────────────────────────────────────── */}
      {posts.length > 0 && (
        <div className="px-8 md:px-12 mt-32 flex justify-between items-center border-t border-[#5b403c]/10 pt-12 mb-24">
          <span className="font-label uppercase tracking-[0.2em] text-[10px] text-[#e2e2e2]/30">
            Showing 01 — {String(posts.length).padStart(2, "0")} of {String(posts.length).padStart(2, "0")}
          </span>
        </div>
      )}

      <Footer />
    </main>
  );
}
