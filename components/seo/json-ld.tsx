/**
 * Renders a JSON-LD graph into the document.
 *
 * Server component — the markup must be in the initial HTML, because the
 * crawlers that read structured data most reliably read the raw response.
 */

/** `<` is escaped so a stray "</script>" inside a string can't break out. */
function serialize(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data, id }: { data: unknown; id?: string }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Static, server-built object — no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}
