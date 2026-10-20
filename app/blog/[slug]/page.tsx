import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { FadeUp, SlideIn } from "@/components/ui/animations";
import { getPostBySlug, getAllPosts } from "@/lib/sanity/queries";
import { urlFor, formatSanityDate } from "@/lib/sanity/client";
import { JsonLd } from "@/components/seo/json-ld";
import { blogPostingSchema, breadcrumbSchema, graph } from "@/lib/seo/schema";
import { abs } from "@/lib/seo/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPostBySlug(slug);
  if (!article) return { title: "Article not found" };

  const path = `/blog/${slug}`;
  const image = article.mainImage
    ? urlFor(article.mainImage).width(1200).height(630).url()
    : "/og-image.png";

  return {
    title: article.title,
    description:
      article.excerpt ||
      `${article.title} — analysis of Gujarat land and revenue law by Adv. Krupal P. Savjani, advocate in Ahmedabad.`,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: abs(path),
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      modifiedTime: article._updatedAt ?? article.publishedAt,
      authors: [abs("/")],
      section: article.category,
      images: [{ url: image, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [image],
    },
  };
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

  const path = `/blog/${slug}`;
  const ogImage = article.mainImage
    ? urlFor(article.mainImage).width(1200).height(630).url()
    : abs("/og-image.png");

  return (
    <main className="bg-[#f6f4f0] text-[#161513]">
      <JsonLd
        id={`schema-article-${slug}`}
        data={graph(
          blogPostingSchema({
            path,
            headline: article.title,
            description: article.excerpt,
            image: ogImage,
            datePublished: article.publishedAt,
            dateModified: article._updatedAt ?? article.publishedAt,
            section: article.category,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/blog" },
            { name: article.title, path },
          ])
        )}
      />

      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="pt-40 pb-0 px-8 md:px-12">
        <FadeUp>
          <Link
            href="/blog"
            className="t-action inline-flex items-center gap-3 text-[#161513]/40 hover:text-[#c43b27] transition-colors duration-200 mb-12 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
            Journal
          </Link>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-8">
            <FadeUp delay={0.05}>
              <div className="flex items-center gap-4 mb-8">
                <span className="t-eyebrow">
                  {article.category}
                </span>
                <span className="w-8 h-px bg-[#cdc6b9]/40" />
                <span className="t-meta">
                  {formatSanityDate(article.publishedAt)}
                </span>
              </div>
            </FadeUp>
            <FadeUp delay={0.12}>
              <h1 className="t-display-sm measure-wide">
                {article.title}
              </h1>
            </FadeUp>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <FadeUp delay={0.2}>
              <p className="t-body-sm">
                {article.excerpt}
              </p>
            </FadeUp>
          </div>
        </div>
      </header>

      {/* ── Feature Image ─────────────────────────────────────── */}
      {article.mainImage && (
        <SlideIn from="left" className="px-8 md:px-12 mb-24">
          <div className="w-full overflow-hidden bg-[#eeebe5]">
            <Image
              src={urlFor(article.mainImage).width(1800).height(900).url()}
              alt={article.title}
              width={1800}
              height={900}
              className="w-full h-[45vw] max-h-[600px] object-cover grayscale"
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
                  <span className="t-eyebrow block mb-2">
                    Practice Area
                  </span>
                  <p className="t-body-sm text-[#161513]">{article.category}</p>
                </div>
                <div>
                  <span className="t-eyebrow block mb-2">
                    Published
                  </span>
                  <p className="t-body-sm text-[#161513]">{formatSanityDate(article.publishedAt)}</p>
                </div>
                <div className="pt-8 border-t border-[#cdc6b9]/15">
                  <p className="t-meta mb-4">
                    Need Counsel?
                  </p>
                  <Link
                    href="/contact"
                    className="t-action group inline-flex items-center gap-2 text-[#fe5545] border-b border-[#fe5545] pb-1 hover:text-white hover:bg-[#fe5545] px-2 py-1 transition-colors duration-200"
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
        <section className="px-8 md:px-12 py-24 border-t border-[#cdc6b9]/10">
          <FadeUp>
            <h4 className="t-meta mb-16">
              Continue Reading
            </h4>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {related.map((rel, i) => (
              <FadeUp key={rel._id} delay={i * 0.1}>
                <Link href={`/blog/${rel.slug}`} className="group block">
                  <div className="overflow-hidden bg-[#eeebe5] mb-6">
                    {rel.mainImage ? (
                      <Image
                        src={urlFor(rel.mainImage).width(700).height(300).url()}
                        alt={rel.title}
                        width={700}
                        height={300}
                        className="w-full h-48 object-cover grayscale"
                      />
                    ) : (
                      <div className="w-full h-48 bg-[#e8e4dc] flex items-center justify-center">
                        <span className="t-display-sm text-[#fe5545] opacity-20">
                          {String(i + 1).padStart(2, "0")}.
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="t-eyebrow block mb-3">
                    {rel.category}
                  </span>
                  <h3 className="t-card group-hover:text-[#c43b27] transition-colors duration-200">
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
