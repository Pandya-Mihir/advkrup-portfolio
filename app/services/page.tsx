import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { HeroReveal, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { WordReveal } from "@/components/ui/parallax";
import { BackgroundPaths } from "@/components/ui/background-paths";

const stats = [
  { value: "Gujarat", label: "High Court & Revenue Tribunals" },
  { value: "500+", label: "Matters Resolved" },
];

export default function ServicesPage() {
  return (
    <main className="bg-[#131313] text-[#e2e2e2]">
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-36 pb-0">

        {/* Animated lines background */}
        <BackgroundPaths />

        {/* Ghost § legal symbol — decorative anchor */}
        <span
          aria-hidden="true"
          className="absolute right-[-0.1em] top-[10%] font-headline italic text-[#e2e2e2] select-none pointer-events-none"
          style={{ fontSize: "clamp(18rem, 40vw, 52rem)", opacity: 0.025, lineHeight: 1 }}
        >
          §
        </span>

        {/* Top content */}
        <div className="relative z-10 px-8 md:px-12 flex-1 flex flex-col justify-center">
          <HeroReveal delay={0.05}>
            <div className="flex items-center gap-4 mb-10">
              <span className="w-8 h-px bg-[#fe5545]" />
              <p className="font-label uppercase tracking-[0.35em] text-[11px] text-[#fe5545]">
                Expertise &amp; Mandate
              </p>
            </div>
          </HeroReveal>

          <HeroReveal delay={0.15}>
            <h1
              className="font-headline italic leading-[0.85] tracking-tighter mb-12"
              style={{ fontSize: "clamp(4rem, 12vw, 11rem)" }}
            >
              <WordReveal text="Architecting" delay={0.15} />
              <br />
              <WordReveal text="the Verdict." delay={0.3} />
            </h1>
          </HeroReveal>

          <HeroReveal delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-5xl">
              <p className="text-[#c6c6c7] text-lg leading-relaxed font-light">
                We operate at the intersection of legal precision and strategic dominance. Our
                services are tailored for those who require more than representation — they require
                an architect of resolution.
              </p>
              <div className="flex flex-col gap-4 md:items-end md:text-right">
                <p className="font-label uppercase tracking-[0.25em] text-[10px] text-[#e2e2e2]/30">
                  Jurisdiction
                </p>
                <p className="font-headline italic text-2xl text-[#e3beb9]">
                  Gujarat Revenue Courts<br />& High Court
                </p>
              </div>
            </div>
          </HeroReveal>
        </div>

        {/* Stats bar pinned to bottom */}
        <FadeUp delay={0.2} className="relative z-10 mt-12">
          <div className="border-t border-[#5b403c]/20 grid grid-cols-2">
            {stats.map((s, i) => (
              <div
                key={i}
                className="px-8 md:px-12 py-10 border-r border-[#5b403c]/15 last:border-r-0"
              >
                <p className="font-headline italic text-4xl md:text-5xl text-[#e2e2e2] mb-2">
                  {s.value}
                </p>
                <p className="font-label uppercase tracking-[0.2em] text-[9px] text-[#e2e2e2]/35">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── Service 01: Land Dispute Litigation ─────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center mb-16 group">
        <div className="absolute inset-0 z-0 opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1600&q=85"
            alt="Legal documents and pen"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/30 to-transparent" />
        </div>
        <div className="relative z-10 px-8 md:px-12">
          <span className="font-label uppercase tracking-[0.4em] text-[10px] text-[#ffb4a9] mb-4 block">
            Practice Area 01
          </span>
          <h2
            className="font-headline italic leading-none tracking-tighter text-[#e2e2e2] mb-12"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            LAND DISPUTE<br />LITIGATION
          </h2>
          <div className="flex flex-col md:flex-row gap-20 items-start">
            <div className="w-full md:w-1/3 flex flex-col gap-6">
              <div className="h-px w-full bg-[#5b403c]/30" />
              <ul className="space-y-4">
                {[
                  "Ownership & Possession Disputes",
                  "Boundary &amp; Encroachment Matters",
                  "Agricultural Land Conflicts",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group/item">
                    <span className="text-[#ffb4a9] font-headline italic text-xl">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <span
                      className="font-label uppercase tracking-widest text-xs text-[#c6c6c7] group-hover/item:text-[#e2e2e2] transition-colors"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="max-w-md pt-6">
              <p className="text-[#c6c6c7]/70 leading-relaxed text-sm tracking-wide">
                The revenue court is not a place for ambiguity; it is a place for evidence-backed
                authority. We enter every dispute with a meticulous map of the record chain and
                a singular focus on securing your rightful interest in the land.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service 02: Revenue Records ──────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center mb-16 group">
        <div className="absolute inset-0 z-0 opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=85"
            alt="Revenue documents and records"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-[#131313]/20 to-[#131313]" />
        </div>
        <div className="relative z-10 px-8 md:px-12 text-right">
          <div className="flex flex-col items-end">
            <span className="font-label uppercase tracking-[0.4em] text-[10px] text-[#ffb4a9] mb-4 block">
              Practice Area 02
            </span>
            <h2
              className="font-headline italic leading-none tracking-tighter text-[#e2e2e2] mb-12"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              REVENUE<br />RECORDS
            </h2>
          </div>
          <div className="flex flex-col md:flex-row-reverse gap-20 items-start">
            <div className="w-full md:w-1/3 flex flex-col gap-6 text-right">
              <div className="h-px w-full bg-[#5b403c]/30" />
              <ul className="space-y-4">
                {[
                  ["7/12 Utara Corrections", "04."],
                  ["8-A & Village Form Disputes", "05."],
                  ["Mutation & Entry Proceedings", "06."],
                ].map(([item, num], i) => (
                  <li key={i} className="flex items-center justify-end gap-4 group/item">
                    <span className="font-label uppercase tracking-widest text-xs text-[#c6c6c7] group-hover/item:text-[#e2e2e2] transition-colors">
                      {item}
                    </span>
                    <span className="text-[#ffb4a9] font-headline italic text-xl">{num}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="max-w-md pt-6 text-right ml-auto">
              <p className="text-[#c6c6c7]/70 leading-relaxed text-sm tracking-wide">
                Preventing the error in the record is far more valuable than correcting it through
                litigation. We provide the clinical foresight needed to maintain accurate revenue
                records and contest erroneous entries with absolute precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service 03: Property Documentation ──────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center mb-16 group">
        <div className="absolute inset-0 z-0 opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=85"
            alt="Property documentation"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-transparent to-[#131313]" />
        </div>
        <div className="relative z-10 px-8 md:px-12">
          <span className="font-label uppercase tracking-[0.4em] text-[10px] text-[#ffb4a9] mb-4 block">
            Practice Area 03
          </span>
          <h2
            className="font-headline italic leading-none tracking-tighter text-[#e2e2e2] mb-12"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            PROPERTY<br />DOCUMENTATION
          </h2>
          <div className="flex flex-col md:flex-row gap-20 items-start">
            <div className="w-full md:w-1/3 flex flex-col gap-6">
              <div className="h-px w-full bg-[#5b403c]/30" />
              <ul className="space-y-4">
                {[
                  "Title Verification & Search",
                  "Sale &amp; Gift Deed Drafting",
                  "NOC &amp; Court Representation",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group/item">
                    <span className="text-[#ffb4a9] font-headline italic text-xl">
                      {String(i + 7).padStart(2, "0")}.
                    </span>
                    <span
                      className="font-label uppercase tracking-widest text-xs text-[#c6c6c7] group-hover/item:text-[#e2e2e2] transition-colors"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="max-w-md pt-6">
              <p className="text-[#c6c6c7]/70 leading-relaxed text-sm tracking-wide">
                In property law, your most vulnerable asset is a title left unverified. We defend
                it with a combination of meticulous record analysis and aggressive legal enforcement.
                We don&apos;t just protect — we institutionalize your right.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service 04: Land Acquisition ────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center mb-16 group">
        <div className="absolute inset-0 z-0 opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&q=85"
            alt="Land acquisition"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-[#131313]/20 to-[#131313]" />
        </div>
        <div className="relative z-10 px-8 md:px-12 text-right">
          <div className="flex flex-col items-end">
            <span className="font-label uppercase tracking-[0.4em] text-[10px] text-[#ffb4a9] mb-4 block">
              Practice Area 04
            </span>
            <h2
              className="font-headline italic leading-none tracking-tighter text-[#e2e2e2] mb-12"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              LAND<br />ACQUISITION
            </h2>
          </div>
          <div className="flex flex-col md:flex-row-reverse gap-20 items-start">
            <div className="w-full md:w-1/3 flex flex-col gap-6 text-right">
              <div className="h-px w-full bg-[#5b403c]/30" />
              <ul className="space-y-4">
                {[
                  ["Compensation Claims & Disputes", "10."],
                  ["Government Acquisition Defense", "11."],
                  ["Rehabilitation & Resettlement", "12."],
                ].map(([item, num], i) => (
                  <li key={i} className="flex items-center justify-end gap-4 group/item">
                    <span className="font-label uppercase tracking-widest text-xs text-[#c6c6c7] group-hover/item:text-[#e2e2e2] transition-colors">
                      {item}
                    </span>
                    <span className="text-[#ffb4a9] font-headline italic text-xl">{num}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="max-w-md pt-6 text-right ml-auto">
              <p className="text-[#c6c6c7]/70 leading-relaxed text-sm tracking-wide">
                When the state exercises its power of compulsory acquisition, your right to fair
                compensation and due process must be defended with equal authority. We challenge
                inadequate awards and ensure every entitlement under the law is secured.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service 05: Agricultural Land Issues ─────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center mb-16 group">
        <div className="absolute inset-0 z-0 opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=85"
            alt="Agricultural land"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/30 to-transparent" />
        </div>
        <div className="relative z-10 px-8 md:px-12">
          <span className="font-label uppercase tracking-[0.4em] text-[10px] text-[#ffb4a9] mb-4 block">
            Practice Area 05
          </span>
          <h2
            className="font-headline italic leading-none tracking-tighter text-[#e2e2e2] mb-12"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            AGRICULTURAL<br />LAND ISSUES
          </h2>
          <div className="flex flex-col md:flex-row gap-20 items-start">
            <div className="w-full md:w-1/3 flex flex-col gap-6">
              <div className="h-px w-full bg-[#5b403c]/30" />
              <ul className="space-y-4">
                {[
                  "Sale & Transfer of Agricultural Land",
                  "Inheritance & Succession Disputes",
                  "Farmer Rights & Rural Property",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group/item">
                    <span className="text-[#ffb4a9] font-headline italic text-xl">
                      {String(i + 13).padStart(2, "0")}.
                    </span>
                    <span className="font-label uppercase tracking-widest text-xs text-[#c6c6c7] group-hover/item:text-[#e2e2e2] transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="max-w-md pt-6">
              <p className="text-[#c6c6c7]/70 leading-relaxed text-sm tracking-wide">
                Gujarat&apos;s agricultural land laws carry layers of restriction that require
                specialist navigation. From inheritance succession to sale and transfer compliance,
                we ensure rural landowners are protected at every stage of their transaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service 06: Conversion of Land Use ───────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center mb-16 group">
        <div className="absolute inset-0 z-0 opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=85"
            alt="Urban land conversion"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-[#131313]/20 to-[#131313]" />
        </div>
        <div className="relative z-10 px-8 md:px-12 text-right">
          <div className="flex flex-col items-end">
            <span className="font-label uppercase tracking-[0.4em] text-[10px] text-[#ffb4a9] mb-4 block">
              Practice Area 06
            </span>
            <h2
              className="font-headline italic leading-none tracking-tighter text-[#e2e2e2] mb-12"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              CONVERSION OF<br />LAND USE
            </h2>
          </div>
          <div className="flex flex-col md:flex-row-reverse gap-20 items-start">
            <div className="w-full md:w-1/3 flex flex-col gap-6 text-right">
              <div className="h-px w-full bg-[#5b403c]/30" />
              <ul className="space-y-4">
                {[
                  ["Agricultural to Non-Agricultural", "16."],
                  ["Compliance with Gujarat NA Rules", "17."],
                  ["Permission & Approval Proceedings", "18."],
                ].map(([item, num], i) => (
                  <li key={i} className="flex items-center justify-end gap-4 group/item">
                    <span className="font-label uppercase tracking-widest text-xs text-[#c6c6c7] group-hover/item:text-[#e2e2e2] transition-colors">
                      {item}
                    </span>
                    <span className="text-[#ffb4a9] font-headline italic text-xl">{num}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="max-w-md pt-6 text-right ml-auto">
              <p className="text-[#c6c6c7]/70 leading-relaxed text-sm tracking-wide">
                Converting agricultural land to non-agricultural use in Gujarat demands meticulous
                procedural compliance. We manage the entire conversion process — from initial
                application to final permission — ensuring zero defect in documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service 07: Tenancy and Tenure Laws ──────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center mb-16 group">
        <div className="absolute inset-0 z-0 opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=85"
            alt="Tenancy law"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-transparent to-[#131313]" />
        </div>
        <div className="relative z-10 px-8 md:px-12">
          <span className="font-label uppercase tracking-[0.4em] text-[10px] text-[#ffb4a9] mb-4 block">
            Practice Area 07
          </span>
          <h2
            className="font-headline italic leading-none tracking-tighter text-[#e2e2e2] mb-12"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            TENANCY &amp;<br />TENURE LAWS
          </h2>
          <div className="flex flex-col md:flex-row gap-20 items-start">
            <div className="w-full md:w-1/3 flex flex-col gap-6">
              <div className="h-px w-full bg-[#5b403c]/30" />
              <ul className="space-y-4">
                {[
                  "Tenancy Rights & Disputes",
                  "Landlord–Tenant Proceedings",
                  "Inheritance of Tenancy Rights",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group/item">
                    <span className="text-[#ffb4a9] font-headline italic text-xl">
                      {String(i + 19).padStart(2, "0")}.
                    </span>
                    <span className="font-label uppercase tracking-widest text-xs text-[#c6c6c7] group-hover/item:text-[#e2e2e2] transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="max-w-md pt-6">
              <p className="text-[#c6c6c7]/70 leading-relaxed text-sm tracking-wide">
                Tenancy law in Gujarat is a discipline requiring absolute command of both statute and
                custom. We represent landlords and tenants alike in disputes over rights, evictions,
                and the inheritance of tenancy — with the precision the law demands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service 08: Appeals and Representation ───────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center mb-16 group">
        <div className="absolute inset-0 z-0 opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=85"
            alt="Court appeals"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-[#131313]/20 to-[#131313]" />
        </div>
        <div className="relative z-10 px-8 md:px-12 text-right">
          <div className="flex flex-col items-end">
            <span className="font-label uppercase tracking-[0.4em] text-[10px] text-[#ffb4a9] mb-4 block">
              Practice Area 08
            </span>
            <h2
              className="font-headline italic leading-none tracking-tighter text-[#e2e2e2] mb-12"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              APPEALS &amp;<br />REPRESENTATION
            </h2>
          </div>
          <div className="flex flex-col md:flex-row-reverse gap-20 items-start">
            <div className="w-full md:w-1/3 flex flex-col gap-6 text-right">
              <div className="h-px w-full bg-[#5b403c]/30" />
              <ul className="space-y-4">
                {[
                  ["Collector & Deputy Collector Appeals", "22."],
                  ["Gujarat Revenue Tribunal", "23."],
                  ["Revision & Review Petitions", "24."],
                ].map(([item, num], i) => (
                  <li key={i} className="flex items-center justify-end gap-4 group/item">
                    <span className="font-label uppercase tracking-widest text-xs text-[#c6c6c7] group-hover/item:text-[#e2e2e2] transition-colors">
                      {item}
                    </span>
                    <span className="text-[#ffb4a9] font-headline italic text-xl">{num}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="max-w-md pt-6 text-right ml-auto">
              <p className="text-[#c6c6c7]/70 leading-relaxed text-sm tracking-wide">
                Revenue appeals demand not just legal knowledge but an authoritative command of
                procedural hierarchy. We represent clients before the Collector, Deputy Collector,
                and the Gujarat Revenue Tribunal with the full weight of evidence and argument.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service 09: Legal Consultation on Land Policies ──────── */}
      <section className="relative min-h-screen flex flex-col justify-center mb-16 group">
        <div className="absolute inset-0 z-0 opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=85"
            alt="Legal consultation"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/30 to-transparent" />
        </div>
        <div className="relative z-10 px-8 md:px-12">
          <span className="font-label uppercase tracking-[0.4em] text-[10px] text-[#ffb4a9] mb-4 block">
            Practice Area 09
          </span>
          <h2
            className="font-headline italic leading-none tracking-tighter text-[#e2e2e2] mb-12"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            LAND POLICY<br />CONSULTATION
          </h2>
          <div className="flex flex-col md:flex-row gap-20 items-start">
            <div className="w-full md:w-1/3 flex flex-col gap-6">
              <div className="h-px w-full bg-[#5b403c]/30" />
              <ul className="space-y-4">
                {[
                  "State Land Policy Advisory",
                  "Revenue Law Amendments & Impact",
                  "Property Ownership Structuring",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group/item">
                    <span className="text-[#ffb4a9] font-headline italic text-xl">
                      {String(i + 25).padStart(2, "0")}.
                    </span>
                    <span className="font-label uppercase tracking-widest text-xs text-[#c6c6c7] group-hover/item:text-[#e2e2e2] transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="max-w-md pt-6">
              <p className="text-[#c6c6c7]/70 leading-relaxed text-sm tracking-wide">
                The landscape of Gujarat land policy evolves constantly. We provide strategic
                advisory on state amendments, policy implications for existing holdings, and
                structuring property ownership to remain fully compliant and defensively sound.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service 10: Court Representation ─────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center mb-32 group">
        <div className="absolute inset-0 z-0 opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=1600&q=85"
            alt="Court representation"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-[#131313]/20 to-[#131313]" />
        </div>
        <div className="relative z-10 px-8 md:px-12 text-right">
          <div className="flex flex-col items-end">
            <span className="font-label uppercase tracking-[0.4em] text-[10px] text-[#ffb4a9] mb-4 block">
              Practice Area 10
            </span>
            <h2
              className="font-headline italic leading-none tracking-tighter text-[#e2e2e2] mb-12"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              COURT<br />REPRESENTATION
            </h2>
          </div>
          <div className="flex flex-col md:flex-row-reverse gap-20 items-start">
            <div className="w-full md:w-1/3 flex flex-col gap-6 text-right">
              <div className="h-px w-full bg-[#5b403c]/30" />
              <ul className="space-y-4">
                {[
                  ["Civil Courts & Revenue Forums", "28."],
                  ["Gujarat High Court", "29."],
                  ["Supreme Court of India", "30."],
                ].map(([item, num], i) => (
                  <li key={i} className="flex items-center justify-end gap-4 group/item">
                    <span className="font-label uppercase tracking-widest text-xs text-[#c6c6c7] group-hover/item:text-[#e2e2e2] transition-colors">
                      {item}
                    </span>
                    <span className="text-[#ffb4a9] font-headline italic text-xl">{num}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="max-w-md pt-6 text-right ml-auto">
              <p className="text-[#c6c6c7]/70 leading-relaxed text-sm tracking-wide">
                From civil courts to the Supreme Court of India, Adv. Savjani carries your matter
                to every level of the judicial hierarchy. Appellate strategy, writ petitions, and
                special leave petitions executed with the full force of specialist land law expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="px-8 md:px-12 py-32 md:py-48 bg-[#1b1b1b]">
        <StaggerContainer className="flex flex-col items-center text-center">
          <StaggerItem>
            <p className="font-label uppercase tracking-[0.5em] text-[10px] text-[#c6c6c7] mb-12">
              The Next Move
            </p>
          </StaggerItem>
          <StaggerItem>
            <h3 className="text-6xl md:text-8xl font-headline italic mb-16 tracking-tighter">
              Secure the Verdict.
            </h3>
          </StaggerItem>
          <StaggerItem>
            <Link
              href="/contact"
              className="px-16 py-6 bg-[#fe5545] text-white font-label uppercase tracking-[0.2em] text-xs hover:bg-[#e2e2e2] hover:text-[#131313] transition-colors duration-300"
            >
              Inquire for Counsel
            </Link>
          </StaggerItem>
        </StaggerContainer>
      </section>

      <Footer />
    </main>
  );
}
