"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TermsModal({ children }: { children: React.ReactNode }) {
  const [accepted, setAccepted] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("terms-accepted");
    if (hasAccepted === "true") setAccepted(true);
    setLoading(false);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("terms-accepted", "true");
    setAccepted(true);
  };

  if (loading) return null;

  return (
    <>
      <AnimatePresence>
        {!accepted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0e0e0e]/90 backdrop-blur-md p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
              className="bg-[#131313] border border-[#5b403c]/25 max-w-lg w-full"
            >
              {/* Header */}
              <div className="border-b border-[#5b403c]/20 px-8 py-6 flex items-center gap-4">
                <span className="w-6 h-px bg-[#fe5545] flex-shrink-0" />
                <p className="font-label uppercase tracking-[0.35em] text-[10px] text-[#fe5545]">
                  Legal Disclaimer
                </p>
              </div>

              {/* Headline */}
              <div className="px-8 pt-8 pb-6">
                <h2 className="font-headline italic text-4xl leading-tight text-[#e2e2e2] mb-2">
                  Before You Proceed.
                </h2>
              </div>

              {/* Scrollable body */}
              <div className="px-8 max-h-52 overflow-y-auto space-y-4 text-[#e2e2e2]/50 text-sm leading-relaxed font-light mb-6
                             [&::-webkit-scrollbar]:w-px [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#5b403c]/40">
                <p>
                  The information provided on this website is for general informational purposes
                  only and does not constitute legal advice. Viewing this website or communicating
                  with Adv. Krupal Savjani through this website does not establish an
                  attorney-client relationship.
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
                  <div className="relative mt-0.5 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                      className="sr-only peer"
                    />
                    {/* Custom checkbox */}
                    <div className="w-4 h-4 border border-[#5b403c]/50 peer-checked:border-[#fe5545] peer-checked:bg-[#fe5545] transition-colors duration-200 flex items-center justify-center">
                      {checked && (
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-[#e2e2e2]/40 text-xs leading-relaxed font-label tracking-wide group-hover:text-[#e2e2e2]/60 transition-colors">
                    I have read and agree to the legal disclaimer. I understand this website does
                    not provide legal advice and no attorney-client relationship is formed.
                  </span>
                </label>
              </div>

              {/* CTA */}
              <div className="border-t border-[#5b403c]/20">
                <button
                  onClick={handleAccept}
                  disabled={!checked}
                  className="w-full py-5 font-label uppercase tracking-[0.3em] text-sm
                             bg-[#fe5545] text-white
                             hover:bg-[#e2e2e2] hover:text-[#131313]
                             disabled:bg-[#1f1f1f] disabled:text-[#e2e2e2]/20 disabled:cursor-not-allowed
                             transition-colors duration-300"
                >
                  Accept &amp; Enter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {accepted && children}
    </>
  );
}
