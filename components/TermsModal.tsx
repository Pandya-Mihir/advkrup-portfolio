"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsStudio } from "@/components/ui/is-studio";

/**
 * Legal disclaimer overlay.
 *
 * IMPORTANT — do not reintroduce a gate on `children`.
 *
 * This component previously rendered `{accepted && children}` and returned
 * `null` while its mount effect was pending. That meant the server HTML for
 * every route contained no page content at all, and a crawler that did execute
 * the JS was shown a modal it could never accept. The site was effectively
 * invisible to search engines.
 *
 * The disclaimer is now a presentational overlay: `children` are always
 * rendered and always present in the initial HTML, and the overlay is mounted
 * client-side only, after we know whether the visitor has already accepted.
 */
export default function TermsModal({ children }: { children: React.ReactNode }) {
  const isStudio = useIsStudio();
  const [checked, setChecked] = useState(false);
  /** null = not yet determined on the client; the overlay stays unmounted. */
  const [accepted, setAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("terms-accepted");
    } catch {
      // Private mode / storage blocked — treat as accepted so the overlay
      // never becomes a wall the visitor cannot get past.
      stored = "true";
    }
    setAccepted(stored === "true");
  }, []);

  // Lock background scroll only while the overlay is actually up. The
  // `isStudio` term matters: without it the CMS would have its scroll locked
  // by a modal that is never rendered there.
  useEffect(() => {
    if (accepted !== false || isStudio) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [accepted, isStudio]);

  const handleAccept = () => {
    try {
      localStorage.setItem("terms-accepted", "true");
    } catch {
      // Non-fatal: the overlay still closes for this session.
    }
    setAccepted(true);
  };

  return (
    <>
      {children}

      <AnimatePresence>
        {accepted === false && !isStudio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-disclaimer-title"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#ffffff]/90 backdrop-blur-md p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
              className="bg-[#f6f4f0] border border-[#cdc6b9]/25 max-w-lg w-full"
            >
              {/* Header */}
              <div className="border-b border-[#cdc6b9]/20 px-8 py-6 flex items-center gap-4">
                <span className="w-6 h-px bg-[#fe5545] flex-shrink-0" />
                <p className="t-eyebrow">
                  Legal Disclaimer
                </p>
              </div>

              {/* Headline */}
              <div className="px-8 pt-8 pb-6">
                <h2
                  id="legal-disclaimer-title"
                  className="t-section mb-2"
                >
                  Before You Proceed.
                </h2>
              </div>

              {/* Scrollable body */}
              <div className="px-8 max-h-52 overflow-y-auto space-y-4 t-body-sm text-[#161513]/50 mb-6
                             [&::-webkit-scrollbar]:w-px [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#cdc6b9]/40">
                <p>
                  The information provided on this website is for general informational purposes
                  only and does not constitute legal advice. Viewing this website or communicating
                  with Adv. Krupal Savjani through this website does not establish an
                  attorney-client relationship.
                </p>
                <p>
                  This website is not an advertisement or a solicitation of work. The contents are
                  published for the purpose of general information at the request of visitors who
                  wish to know more about Adv. Krupal Savjani and the areas in which he practises.
                </p>
                <p>
                  The content is provided &ldquo;as is&rdquo; without any guarantees of
                  completeness, accuracy, or timeliness. Laws and legal interpretations change
                  frequently, and the information may not reflect the most current legal
                  developments.
                </p>
                <p>
                  Do not act or refrain from acting based on information on this website without
                  first seeking professional legal counsel from a qualified attorney licensed in
                  your jurisdiction.
                </p>
                <p>
                  Adv. Krupal Savjani specializes in Land &amp; Revenue law in Gujarat, India.
                  Content on this website primarily pertains to Indian law, specifically Gujarat
                  state law.
                </p>
              </div>

              {/* Checkbox */}
              <div className="px-8 mb-8">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative mt-1 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                      className="sr-only peer"
                    />
                    {/* Custom checkbox */}
                    <div className="w-4 h-4 border border-[#cdc6b9]/50 peer-checked:border-[#fe5545] peer-checked:bg-[#fe5545] transition-colors duration-200 flex items-center justify-center">
                      {checked && (
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="t-body-sm text-[#161513]/40 group-hover:text-[#161513]/60 transition-colors">
                    I have read and agree to the legal disclaimer. I understand this website does
                    not provide legal advice and no attorney-client relationship is formed.
                  </span>
                </label>
              </div>

              {/* CTA */}
              <div className="border-t border-[#cdc6b9]/20">
                <button
                  onClick={handleAccept}
                  disabled={!checked}
                  className="t-action w-full py-5
                             bg-[#fe5545] text-white
                             hover:bg-[#161513] hover:text-[#f6f4f0]
                             disabled:bg-[#e8e4dc] disabled:text-[#161513]/20 disabled:cursor-not-allowed
                             transition-colors duration-300"
                >
                  Accept &amp; Enter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
