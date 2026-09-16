import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import {
  FadeUp,
  SlideIn,
  StaggerContainer,
  StaggerItem,
  DrawLine,
} from "@/components/ui/animations";
import { ParallaxWrapper, WordReveal } from "@/components/ui/parallax";
import { BackgroundPaths } from "@/components/ui/background-paths";

export default function Home() {
  return (
    <main className="bg-[#131313] text-[#e2e2e2]">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-48 px-12 md:px-20">

        {/* Layer 0 — animated SVG evidence threads (lowest layer) */}
        <BackgroundPaths />

        {/* Layer 3 — hero text */}
        <div className="relative z-10 w-full max-w-7xl">

          {/* Case number — editorial micro-detail */}
          <FadeUp delay={0.05} className="mb-6 flex items-center gap-4">
            <span className="w-6 h-px bg-[#fe5545]" />
            <span className="font-label uppercase tracking-[0.35em] text-[9px] text-[#fe5545]">
              Adv. Krupal Savjani — Est. Gujarat Bar
            </span>
          </FadeUp>

          {/* Main headline */}
          <h1 className="font-hero italic leading-[0.85]  text-[#e2e2e2]"
            style={{ fontSize: "clamp(4.5rem, 14vw, 12rem)" }}>
            <WordReveal text="The Land" delay={0.1} />
            <br />
            <WordReveal text="Advocate" delay={0.35} />
          </h1>

          {/* Discipline tags — appear after headline */}
          <FadeUp delay={0.55} className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Land Disputes", accent: true },
              { label: "Revenue Records", accent: false },
              { label: "Property Law", accent: false },
            ].map(({ label, accent }) => (
              <span
                key={label}
                className={
                  accent
                    ? "font-label uppercase tracking-[0.25em] text-[9px] bg-[#fe5545] text-white px-4 py-2"
                    : "font-label uppercase tracking-[0.25em] text-[9px] text-[#fe5545] border border-[#fe5545]/40 px-4 py-2 hover:border-[#fe5545] transition-colors duration-300"
                }
              >
                {label}
              </span>
            ))}
          </FadeUp>

          {/* Subtitle + CTA */}
          <FadeUp delay={0.7} className="mt-8 md:mt-10 max-w-xl md:ml-[55%]">
            <p className="text-lg md:text-xl font-light leading-relaxed text-[#e3beb9]/80 italic mb-10">
              Precision in land &amp; revenue litigation. Strategic counsel for those who demand
              clarity in the complex terrain of Gujarat property law.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 text-[#fe5545] font-label uppercase tracking-[0.3em] text-sm overflow-hidden border border-[#fe5545] px-6 py-3"
              >
                {/* fill on hover */}
                <span className="absolute inset-0 bg-[#fe5545] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative group-hover:text-white transition-colors duration-300">
                  Request Consultation
                </span>
                <span className="relative group-hover:translate-x-1 group-hover:text-white transition-all duration-300">→</span>
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center gap-3 text-[#e2e2e2]/40 font-label uppercase tracking-[0.3em] text-sm px-6 py-3 hover:text-[#e2e2e2] transition-colors duration-300"
              >
                View Practice Areas
              </Link>
            </div>
          </FadeUp>
        </div>

      </section>

      {/* ── Practice Areas ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-8 md:px-12 bg-[#131313]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {/* Left column */}
          <div className="space-y-12">
            <FadeUp>
              <h2 className="font-headline italic text-5xl text-[#e2e2e2] mb-4">Core Mandates</h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <DrawLine className="h-px bg-[#5b403c]/30 w-full" />
              <div className="pt-12">
                <span className="font-headline italic text-7xl text-[#fe5545] block mb-6">01</span>
                <h3 className="font-headline text-4xl mb-6">Land Dispute Resolution</h3>
                <p className="text-[#e3beb9] text-lg leading-relaxed max-w-md">
                  Structural legal defense in land ownership, possession, and boundary disputes.
                  We navigate the revenue hierarchy to achieve decisive outcomes.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <DrawLine className="h-px bg-[#5b403c]/30 w-full" />
              <div className="pt-12">
                <span className="font-headline italic text-7xl text-[#fe5545] block mb-6">02</span>
                <h3 className="font-headline text-4xl mb-6">Revenue Records</h3>
                <p className="text-[#e3beb9] text-lg leading-relaxed max-w-md">
                  Expert navigation of the 7/12 Utara, 8-A, and village form records.
                  Corrections, mutations, and revenue court proceedings executed with precision.
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Right column — offset downward on desktop */}
          <div className="md:mt-48 space-y-12">
            <FadeUp delay={0.15}>
              <DrawLine className="h-px bg-[#5b403c]/30 w-full" />
              <div className="pt-12">
                <span className="font-headline italic text-7xl text-[#fe5545] block mb-6">03</span>
                <h3 className="font-headline text-4xl mb-6">Property Documentation</h3>
                <p className="text-[#e3beb9] text-lg leading-relaxed max-w-md">
                  Title verification, sale deeds, gift deeds, and NOC procurement.
                  Meticulous documentation that forecloses future disputes.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="pt-12">
                <Link
                  href="/services"
                  className="group relative inline-flex items-center gap-2 text-[#e2e2e2] font-label uppercase tracking-[0.2em] text-xs pb-1"
                >
                  <span className="group-hover:text-[#fe5545] transition-colors duration-300">
                    View all practice areas
                  </span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-[#fe5545]">
                    →
                  </span>
                  <span className="absolute bottom-0 left-0 h-px bg-[#e2e2e2] w-full group-hover:bg-[#fe5545] transition-colors duration-300" />
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Journal / Editorial Teaser ─────────────────────────────── */}
      <section className="min-h-[600px] relative flex items-center bg-[#1b1b1b]">
        <div className="grid grid-cols-1 md:grid-cols-12 w-full min-h-[600px]">
          {/* Image with parallax */}
          <SlideIn from="left" className="md:col-span-7 relative overflow-hidden min-h-[300px] md:min-h-0">
            <ParallaxWrapper speed={0.15} className="w-full h-full absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1600&q=90"
                alt="Law library — legal books and documents"
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover grayscale contrast-125 brightness-75 scale-110 hover:scale-[1.15] transition-transform duration-700"
              />
            </ParallaxWrapper>
            <div className="absolute inset-0 bg-[#131313]/50 hover:bg-[#131313]/30 transition-colors duration-500 z-10" />
          </SlideIn>

          {/* Text */}
          <SlideIn from="right" delay={0.1} className="md:col-span-5 flex flex-col justify-center px-8 md:px-12 py-16 bg-[#1b1b1b]">
            <StaggerContainer>
              <StaggerItem>
                <span className="font-label uppercase tracking-[0.4em] text-[10px] text-[#fe5545] mb-12 block">
                  Journal / Legal Insights
                </span>
              </StaggerItem>
              <StaggerItem>
                <h2 className="font-headline italic text-5xl md:text-7xl leading-tight mb-12">
                  The Anatomy of Land Rights.
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="text-[#e3beb9] text-xl leading-relaxed mb-12 max-w-md">
                  Exploring the statutory framework of the Gujarat Land Revenue Code and its
                  practical implications for landowners and claimants.
                </p>
              </StaggerItem>
              <StaggerItem>
                <Link href="/blog" className="group flex items-center space-x-4">
                  <span className="font-label uppercase tracking-[0.2em] text-sm text-[#e2e2e2] border-b border-[#e2e2e2] group-hover:text-[#fe5545] group-hover:border-[#fe5545] transition-colors duration-300">
                    Read the Journal
                  </span>
                  <span className="text-[#fe5545] group-hover:translate-x-2 transition-transform duration-300 inline-block">
                    →
                  </span>
                </Link>
              </StaggerItem>
            </StaggerContainer>
          </SlideIn>
        </div>
      </section>

      {/* ── Quote + CTA ──────────────────────────────────────────── */}
      <section className="py-32 md:py-48 px-8 md:px-12 bg-[#131313] grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <SlideIn from="left">
          <span
            className="font-headline italic text-[14rem] md:text-[20rem] leading-none text-[#353535]/40 block select-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="font-headline italic text-4xl md:text-5xl -mt-40 md:-mt-56 relative z-10 leading-tight">
            In land law, the strength of your title is only as certain as the precision of
            your documentation.
          </p>
        </SlideIn>

        <SlideIn from="right" delay={0.1} className="md:pl-16 space-y-12">
          <h4 className="font-label uppercase tracking-[0.2em] text-xs text-[#e2e2e2]/40">
            Begin Your Case
          </h4>
          <p className="text-[#e3beb9] leading-relaxed">
            Whether you face a land dispute, need revenue record corrections, or require
            property documentation — professional counsel begins with a single conversation.
          </p>
          <Link
            href="/contact"
            className="group block w-full py-6 text-center text-white bg-[#fe5545] font-label uppercase tracking-[0.3em] text-sm hover:bg-[#e2e2e2] hover:text-[#131313] transition-colors duration-300 relative overflow-hidden"
          >
            Initiate Consultation
          </Link>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div>
              <p className="font-label uppercase tracking-[0.2em] text-[10px] text-[#fe5545] mb-2">Phone</p>
              <p className="text-[#e2e2e2]">+91 81288 00351</p>
            </div>
            <div>
              <p className="font-label uppercase tracking-[0.2em] text-[10px] text-[#fe5545] mb-2">Email</p>
              <p className="text-[#e2e2e2] text-sm">adv.krupalsavjani@gmail.com</p>
            </div>
          </div>
        </SlideIn>
      </section>

      <Footer />
    </main>
  );
}
