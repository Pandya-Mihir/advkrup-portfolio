"use client";
import { useSyncExternalStore } from "react";

/**
 * False during server rendering and the hydration render; true afterwards.
 *
 * Used by the entrance animations so that the **server HTML never contains
 * `opacity: 0`**. Those animations hide their content until an
 * IntersectionObserver fires, which meant the markup shipped in the HTTP
 * response described a page of fully transparent text — fine for a browser
 * that runs the JS, useless for every crawler that does not (Bing's renderer
 * is weaker than Google's, and GPTBot, PerplexityBot, ClaudeBot and most
 * social scrapers do not execute JavaScript at all).
 *
 * With this, the response carries ordinary visible markup and the animated
 * version mounts a frame later, while the load overlay in
 * `animation-gate.tsx` is still covering the page.
 *
 * `useSyncExternalStore` rather than `useState` + `useEffect`: the store never
 * changes, so the only difference between the two snapshots is server vs.
 * client. That is precisely what this needs, and it avoids the cascading
 * re-render of setting state from an effect.
 */

/** The store never emits, so unsubscribing is a no-op. */
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function useHydrated(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
