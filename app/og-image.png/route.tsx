import { ImageResponse } from "next/og";
import { ADDRESS_LINE, PRACTICE } from "@/lib/seo/site";

/**
 * The social preview card, served at a stable `/og-image.png`.
 *
 * A route handler rather than the `opengraph-image.tsx` convention on purpose:
 * that convention appends a content hash to the URL, and this image is also
 * referenced from JSON-LD (`image` / `logo`), which needs a URL that does not
 * change between builds.
 */
export const contentType = "image/png";
const SIZE = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#131313",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top rule + eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 56, height: 2, background: "#fe5545" }} />
          <div
            style={{
              color: "#fe5545",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              fontFamily: "sans-serif",
            }}
          >
            Advocate · Gujarat Bar
          </div>
        </div>

        {/* Name + practice */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              color: "#e2e2e2",
              fontSize: 96,
              lineHeight: 1,
              letterSpacing: -2,
            }}
          >
            {PRACTICE.name}
          </div>
          <div style={{ color: "#e3beb9", fontSize: 38, lineHeight: 1.25 }}>
            Land &amp; Revenue Law · Ahmedabad, Gujarat
          </div>
        </div>

        {/* Footer: address + phone */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(91,64,60,0.6)",
            paddingTop: 28,
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ color: "rgba(226,226,226,0.55)", fontSize: 24, maxWidth: 720 }}>
            {ADDRESS_LINE}
          </div>
          <div style={{ color: "#e2e2e2", fontSize: 28 }}>{PRACTICE.telephoneDisplay}</div>
        </div>
      </div>
    ),
    SIZE
  );
}
