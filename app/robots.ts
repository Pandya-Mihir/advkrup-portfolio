import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

/** Never crawled by anyone: the CMS, the API, and the client intake form. */
const PRIVATE = [
  "/studio",      // Sanity Studio — never index the CMS
  "/studio/",
  "/api/",
  "/deed-form",   // client intake form, thin + duplicative for search
];

/*
 * AI search and assistant crawlers, named explicitly and welcomed.
 *
 * Being cited by ChatGPT search, Perplexity, Claude, Gemini / Google AI
 * Overviews and Apple Intelligence is how a growing share of people now find
 * a lawyer, and each of these only cites what its crawler may read. They are
 * already allowed by the `*` group below; naming them makes the choice
 * explicit and survives any future tightening of `*`.
 *
 * A crawler that matches a named group ignores the `*` group entirely, so
 * each group repeats the private paths.
 */
const AI_CRAWLERS = [
  "GPTBot",            // OpenAI — model training
  "OAI-SearchBot",     // OpenAI — ChatGPT search results
  "ChatGPT-User",      // OpenAI — pages fetched for a user's question
  "PerplexityBot",     // Perplexity — answer index
  "Perplexity-User",   // Perplexity — pages fetched for a user's question
  "ClaudeBot",         // Anthropic — model training
  "Claude-SearchBot",  // Anthropic — Claude search results
  "Claude-User",       // Anthropic — pages fetched for a user's question
  "Google-Extended",   // Google — Gemini and AI Overviews grounding
  "Applebot-Extended", // Apple — Apple Intelligence
  "Bingbot",           // Microsoft — Bing and Copilot answers
  "DuckAssistBot",     // DuckDuckGo — AI-assisted answers
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: PRIVATE })),
      { userAgent: "*", allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
