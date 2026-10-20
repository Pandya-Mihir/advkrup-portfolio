import type { MetadataRoute } from "next";
import { SITE_URL, abs } from "@/lib/seo/site";
import { LOCAL_PAGES } from "@/lib/seo/locations";
import { getAllPosts } from "@/lib/sanity/queries";

/** Re-generate daily so new blog posts appear without a redeploy. */
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    // SITE_URL, not abs("/"): Next.js normalises the home canonical to have
    // no trailing slash, and the sitemap must list the same string.
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: abs("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: abs("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // The hub for every local landing page (it was the homepage's last panel).
    { url: abs("/areas"), lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: abs("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  // Local landing pages. Area pages outrank service pages on priority only
  // because they are the ones the "near me" queries land on.
  const local: MetadataRoute.Sitemap = LOCAL_PAGES.map((page) => ({
    url: abs(`/${page.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: page.kind === "area" ? 0.85 : 0.8,
  }));

  // A Sanity outage must not fail the build or empty the sitemap.
  let posts: MetadataRoute.Sitemap = [];
  try {
    const all = await getAllPosts();
    posts = all.map((post) => ({
      url: abs(`/blog/${post.slug}`),
      lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(post.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("[sitemap] could not load blog posts from Sanity:", error);
  }

  return [...core, ...local, ...posts];
}
