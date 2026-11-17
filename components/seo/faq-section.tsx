import Link from "next/link";
import type { SiteFaq } from "@/lib/seo/faqs";

/**
 * A visible FAQ block — each question an h3, each answer plain text right
 * under it, nothing collapsed — so answer engines and screen readers get the
 * exact text the page's FAQPage JSON-LD claims. (The page emits that JSON-LD
 * from the same `faqs` array via faqSchema.)
 */
export function FaqSection({
  faqs,
  eyebrow = "Questions",
  title = "Common questions",
  className = "",
}: {
  faqs: SiteFaq[];
  eyebrow?: string;
  title?: string;
  className?: string;
}) {
  return (
    <section data-rail aria-labelledby="faq-title" className={`px-6 py-20 md:px-12 md:py-28 ${className}`}>
      <p className="t-eyebrow mb-4">{eyebrow}</p>
      <h2 id="faq-title" className="t-section mb-12 md:mb-16">
        {title}
      </h2>
      <div className="grid grid-cols-1 border-t border-[#cdc6b9]/60 md:grid-cols-2 md:gap-x-12">
        {faqs.map((faq) => (
          <div key={faq.q} className="border-b border-[#cdc6b9]/60 py-7 md:py-8">
            <h3 className="t-card mb-3">{faq.q}</h3>
            <div>
              <p className="t-body measure text-[#161513]/75">{faq.a}</p>
              {faq.link && (
                <Link
                  href={faq.link.href}
                  className="t-action mt-4 inline-block text-[var(--color-accent-ink,#a8321f)] transition-colors duration-200 hover:text-[#161513]"
                >
                  {faq.link.label} →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
