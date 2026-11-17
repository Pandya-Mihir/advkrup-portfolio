import { llmsFullTxt } from "@/lib/seo/llms";

/**
 * /llms-full.txt — /llms.txt plus every area and matter page's summary and
 * FAQs, so an assistant can answer common questions from one file.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
