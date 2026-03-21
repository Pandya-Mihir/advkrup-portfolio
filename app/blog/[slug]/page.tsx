import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { FadeUp, SlideIn } from "@/components/ui/animations";
import { getPostBySlug, getAllPosts } from "@/lib/sanity/queries";
import { urlFor, formatSanityDate } from "@/lib/sanity/client";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, allPosts] = await Promise.all([
    getPostBySlug(slug),
    getAllPosts(),
  ]);

  if (!article) notFound();

  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <main className="bg-[#131313] text-[#e2e2e2]">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="pt-40 pb-0 px-8 md:px-12">
        <FadeUp>
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 font-label uppercase tracking-[0.25em] text-[10px] text-[#e2e2e2]/40 hover:text-[#ffb4a9] transition-colors mb-12 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
            Journal
          </Link>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-8">
            <FadeUp delay={0.05}>
              <div className="flex items-center gap-4 mb-8">
                <span className="font-label uppercase tracking-[0.3em] text-[10px] text-[#ffb4a9]">
                  {article.category}
                </span>
                <span className="w-8 h-px bg-[#5b403c]/40" />
                <span className="font-label uppercase tracking-[0.3em] text-[10px] text-[#e2e2e2]/30">
                  {formatSanityDate(article.publishedAt)}
                </span>
              </div>
            </FadeUp>
            <FadeUp delay={0.12}>
              <h1
                className="font-headline italic leading-[0.88] tracking-tighter text-[#e2e2e2]"
                style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
              >
                {article.title}
              </h1>
            </FadeUp>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <FadeUp delay={0.2}>
              <p className="text-[#e2e2e2]/50 text-sm leading-relaxed font-light">
                {article.excerpt}
              </p>
            </FadeUp>
          </div>
        </div>
      </header>

      {/* ── Feature Image ─────────────────────────────────────── */}
      {article.mainImage && (
        <SlideIn from="left" className="px-8 md:px-12 mb-24">
          <div className="w-full overflow-hidden bg-[#1b1b1b]">
            <Image
              src={urlFor(article.mainImage).width(1800).height(900).url()}
              alt={article.title}
              width={1800}
              height={900}
              className="w-full h-[45vw] max-h-[600px] object-cover grayscale contrast-125 brightness-75"
              priority
            />
          </div>
        </SlideIn>
      )}

      {/* ── Article Body ──────────────────────────────────────── */}
      <section className="px-8 md:px-12 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <FadeUp>
              <div className="sticky top-32 space-y-8">
                <div>
                  <span className="font-label uppercase tracking-[0.3em] text-[10px] text-[#fe5545] block mb-2">
                    Practice Area
                  </span>
                  <p className="text-[#e2e2e2] text-sm">{article.category}</p>
                </div>
                <div>
                  <span className="font-label uppercase tracking-[0.3em] text-[10px] text-[#fe5545] block mb-2">
                    Published
                  </span>
                  <p className="text-[#e2e2e2] text-sm">{formatSanityDate(article.publishedAt)}</p>
                </div>
                <div className="pt-8 border-t border-[#5b403c]/15">
                  <p className="font-label uppercase tracking-[0.3em] text-[10px] text-[#e2e2e2]/30 mb-4">
                    Need Counsel?
                  </p>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 text-[#fe5545] font-label uppercase tracking-[0.2em] text-[10px] border-b border-[#fe5545] pb-1 hover:text-white hover:bg-[#fe5545] hover:border-[#fe5545] px-2 py-1 transition-all duration-300"
                  >
                    Consult Now →
                  </Link>
                </div>
              </div>
            </FadeUp>
          </aside>

          {/* Body */}
          <FadeUp delay={0.1} className="lg:col-span-7 lg:col-start-5">
            <div className="prose-noir">
              {article.body && (
                <PortableText
                  value={article.body}
                  components={{
                    block: {
                      normal: ({ children }) => <p>{children}</p>,
                      h2: ({ children }) => <h2>{children}</h2>,
                      h3: ({ children }) => <h3>{children}</h3>,
                      blockquote: ({ children }) => <blockquote>{children}</blockquote>,
                    },
                    marks: {
                      em: ({ children }) => <em>{children}</em>,
                      strong: ({ children }) => <strong>{children}</strong>,
                      link: ({ value, children }) => (
                        <a href={value?.href} target="_blank" rel="noopener noreferrer">
                          {children}
                        </a>
                      ),
                    },
                    types: {
                      image: ({ value }) =>
                        value?.asset ? (
                          <Image
                            src={urlFor(value).width(900).url()}
                            alt={value.alt ?? ''}
                            width={900}
                            height={500}
                            className="w-full object-cover my-8"
                          />
                        ) : null,
                    },
                  }}
                />
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── More Articles ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="px-8 md:px-12 py-24 border-t border-[#5b403c]/10">
          <FadeUp>
            <h4 className="font-label uppercase tracking-[0.4em] text-[10px] text-[#e2e2e2]/30 mb-16">
              Continue Reading
            </h4>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {related.map((rel, i) => (
              <FadeUp key={rel._id} delay={i * 0.1}>
                <Link href={`/blog/${rel.slug}`} className="group block">
                  <div className="overflow-hidden bg-[#1b1b1b] mb-6">
                    {rel.mainImage ? (
                      <Image
                        src={urlFor(rel.mainImage).width(700).height(300).url()}
                        alt={rel.title}
                        width={700}
                        height={300}
                        className="w-full h-48 object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-48 bg-[#1f1f1f] flex items-center justify-center">
                        <span className="font-headline italic text-[#fe5545] text-4xl opacity-20">
                          {String(i + 1).padStart(2, "0")}.
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="font-label uppercase tracking-[0.2em] text-[10px] text-[#ffb4a9] block mb-3">
                    {rel.category}
                  </span>
                  <h3 className="font-headline italic text-2xl leading-tight text-[#e2e2e2] group-hover:text-[#ffb4a9] transition-colors">
                    {rel.title}
                  </h3>
                </Link>
              </FadeUp>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
