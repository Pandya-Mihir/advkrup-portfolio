"use client";
import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { FadeUp, SlideIn, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { WordReveal } from "@/components/ui/parallax";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#131313] text-[#e2e2e2]">
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="pt-40 pb-12 px-8 md:px-12 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <h1
              className="font-headline italic leading-[0.85] tracking-tighter text-[#e2e2e2]"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
            >
              <WordReveal text="INITIATE" delay={0.1} />
            </h1>
          </div>
          <div className="lg:col-span-4 lg:text-right pb-4">
            <p className="font-label uppercase tracking-[0.2em] text-[12px] text-[#fe5545] mb-4">
              Phase One
            </p>
            <p className="text-[#e3beb9] max-w-sm ml-auto font-light leading-relaxed">
              The resolution of your legal matter begins with a single point of contact.
              Professional counsel in land &amp; revenue law is not a commodity — it is an art.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <section className="px-8 md:px-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">

        {/* Left: Form */}
        <SlideIn from="left" className="lg:col-span-6">
          <h2 className="font-label uppercase tracking-[0.3em] text-[10px] text-[#e3beb9] mb-12">
            Intake Protocol
          </h2>

          {submitted ? (
            <div className="py-16">
              <div className="w-px h-24 bg-[#fe5545] mb-12" />
              <h3 className="font-headline italic text-5xl mb-6">Transmission Received.</h3>
              <p className="text-[#e3beb9] leading-relaxed mb-8 max-w-md">
                Your inquiry has been logged. Adv. Savjani will respond within one business day.
                For urgent matters, call directly at{" "}
                <span className="text-[#fe5545]">+91 81288 00351</span>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="font-label uppercase tracking-[0.2em] text-[10px] text-[#e2e2e2] border-b border-[#e2e2e2] pb-1 hover:text-[#fe5545] hover:border-[#fe5545] transition-colors"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-16">
              <div className="relative group">
                <label className="block font-label uppercase tracking-[0.1rem] text-[10px] text-[#e3beb9] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="FULL NAME"
                  className="w-full bg-transparent border-0 border-b border-[#5b403c]/40 focus:outline-none focus:border-[#fe5545] px-0 py-4 font-headline italic text-2xl placeholder:text-[#e2e2e2]/10 text-[#e2e2e2] transition-all"
                />
              </div>

              <div className="relative group">
                <label className="block font-label uppercase tracking-[0.1rem] text-[10px] text-[#e3beb9] mb-2">
                  Electronic Mail
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="YOUR@EMAIL.COM"
                  className="w-full bg-transparent border-0 border-b border-[#5b403c]/40 focus:outline-none focus:border-[#fe5545] px-0 py-4 font-headline italic text-2xl placeholder:text-[#e2e2e2]/10 text-[#e2e2e2] transition-all"
                />
              </div>

              <div className="relative group">
                <label className="block font-label uppercase tracking-[0.1rem] text-[10px] text-[#e3beb9] mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-transparent border-0 border-b border-[#5b403c]/40 focus:outline-none focus:border-[#fe5545] px-0 py-4 font-headline italic text-2xl placeholder:text-[#e2e2e2]/10 text-[#e2e2e2] transition-all"
                />
              </div>

              <div className="relative group">
                <label className="block font-label uppercase tracking-[0.1rem] text-[10px] text-[#e3beb9] mb-2">
                  Matter Description
                </label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="BRIEF YOUR MATTER"
                  rows={4}
                  className="w-full bg-transparent border-0 border-b border-[#5b403c]/40 focus:outline-none focus:border-[#fe5545] px-0 py-4 font-headline italic text-2xl placeholder:text-[#e2e2e2]/10 text-[#e2e2e2] transition-all resize-none"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex items-center gap-4 bg-[#fe5545] text-white px-12 py-6 font-label uppercase tracking-[0.2em] text-[12px] hover:bg-[#e2e2e2] hover:text-[#131313] transition-colors duration-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Transmitting…" : "Transmit Inquiry"}
                  <span className="text-sm">→</span>
                </button>
              </div>
            </form>
          )}
        </SlideIn>

        {/* Right: Info Grid */}
        <SlideIn from="right" delay={0.15} className="lg:col-span-6 flex flex-col gap-16">
          {/* Location block — Google Maps embed */}
          <div className="overflow-hidden relative aspect-[4/3]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14690.84741882463!2d72.501757!3d22.997621!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b1fd13c4317%3A0x8af1ade1b0beed57!2sKrupal%20Savjani(Advocate)!5e0!3m2!1sen!2sin!4v1774034559041!5m2!1sen!2sin"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location — Krupal Savjani Advocate"
            />
          </div>

          {/* Structured details grid */}
          <div className="grid grid-cols-2 gap-px bg-[#5b403c]/10">
            <div className="bg-[#131313] p-8">
              <span className="font-label uppercase tracking-[0.2em] text-[10px] text-[#fe5545] block mb-4">
                Telephone
              </span>
              <p className="text-[#e2e2e2] text-xl">+91 81288 00351</p>
            </div>
            <div className="bg-[#131313] p-8">
              <span className="font-label uppercase tracking-[0.2em] text-[10px] text-[#fe5545] block mb-4">
                Location
              </span>
              <p className="text-[#e2e2e2] text-base leading-relaxed">
                C-1207, Titanium Business Park<br />Ahmedabad — 380007
              </p>
            </div>
            <div className="bg-[#131313] p-8">
              <span className="font-label uppercase tracking-[0.2em] text-[10px] text-[#fe5545] block mb-4">
                Email
              </span>
              <p className="text-[#e2e2e2] text-base break-all">
                adv.krupalsavjani@gmail.com
              </p>
            </div>
            <div className="bg-[#131313] p-8">
              <span className="font-label uppercase tracking-[0.2em] text-[10px] text-[#fe5545] block mb-4">
                Availability
              </span>
              <p className="text-[#e2e2e2] text-base">Mon–Sat, 10am–7pm</p>
            </div>
          </div>

          {/* Disclaimer note */}
          <div className="border-t border-[#5b403c]/20 pt-8">
            <p className="text-[#e2e2e2]/30 text-xs leading-relaxed font-label tracking-wide">
              The information provided through this form is for general consultation purposes only
              and does not constitute legal advice or establish an attorney-client relationship.
              Adv. Krupal Savjani practices in Gujarat, India.
            </p>
          </div>
        </SlideIn>
      </section>

      <Footer />
    </main>
  );
}
