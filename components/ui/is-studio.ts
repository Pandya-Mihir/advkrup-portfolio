"use client";
import { usePathname } from "next/navigation";

/**
 * True on the Sanity Studio routes.
 *
 * `/studio` lives under the same root layout as the public site, so without
 * this it inherits the marketing chrome: the legal-disclaimer overlay
 * (full-screen, z-9999, and it locks body scroll), the opaque load overlay
 * from the animation gate, and the reading-progress bar. On a CMS those are
 * at best noise and at worst a wall you have to dismiss before you can edit
 * anything. The chrome components call this and opt out.
 */
export function useIsStudio(): boolean {
  const pathname = usePathname();
  return pathname?.startsWith("/studio") ?? false;
}
