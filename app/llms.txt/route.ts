import { llmsTxt } from "@/lib/seo/llms";

/**
 * /llms.txt — a plain-text map of the site for AI assistants and answer
 * engines (see lib/seo/llms.ts). Built at deploy time from the site's data.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
