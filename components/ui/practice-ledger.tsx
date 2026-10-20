"use client";
import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { ledgerNo } from "@/lib/practice-ledger";

/**
 * The sticky side index beside the /services ledger, and the little
 * behaviour the ledger's rows need.
 *
 * The rows themselves are server-rendered <details> elements (one shared
 * `name`, so opening one closes the rest) with their panels inside them: the
 * content is in the HTML, opens without JavaScript, and Chrome's
 * find-in-page can reveal a closed row. This component only adds to that:
 *
 * · The first row opens on load, on every screen size — so a visitor
 *   lands on a full practice area, not a closed list. (A deep link below
 *   takes precedence and opens its own row instead.)
 * · /services#<slug> — on load, and whenever the hash changes — opens that
 *   row and scrolls to it.
 * · The index: each item opens its row and scrolls it into view, and the
 *   item for whichever row is open is marked, with its number in the
 *   "0N / 10" counter. It follows the rows' own `toggle` events, so a row
 *   opened from the ledger, the index, a deep link or find-in-page all
 *   land on the same state.
 * · Opening a row closes the one above it, which would otherwise pull the
 *   row just tapped up the screen and out from under the pointer; the
 *   scroll is corrected so it stays put.
 *
 * The `open` attribute is never rendered by React — it is set on the DOM
 * after hydration — so the server and client markup cannot disagree.
 */

export type LedgerIndexItem = { slug: string; name: string };

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function rowFor(slug: string): HTMLDetailsElement | null {
  const el = document.getElementById(slug);
  return el instanceof HTMLDetailsElement ? el : null;
}

/**
 * Open one row (closing the others — `name` does that natively, this covers
 * browsers without exclusive accordions) and optionally bring it into view.
 */
function reveal(
  slugs: string[],
  slug: string,
  scroll: ScrollBehavior | false,
): boolean {
  const row = rowFor(slug);
  if (!row) return false;
  for (const other of slugs) {
    const el = rowFor(other);
    if (el && el !== row && el.open) el.open = false;
  }
  row.open = true;
  if (scroll) {
    // "auto" would defer to the page's `scroll-behavior: smooth`.
    const reduced = window.matchMedia(REDUCED_MOTION).matches;
    row.scrollIntoView({
      block: "start",
      behavior: reduced ? "instant" : scroll,
    });
  }
  return true;
}

export function LedgerIndex({ items }: { items: LedgerIndexItem[] }) {
  // The open row, if any, and the last row that was open — the counter
  // keeps showing that one while every row is closed.
  const [open, setOpen] = useState<string | null>(null);
  const [last, setLast] = useState(items[0]?.slug ?? "");

  useEffect(() => {
    const slugs = items.map((item) => item.slug);
    const rows = slugs
      .map(rowFor)
      .filter((row): row is HTMLDetailsElement => row !== null);

    const sync = () => {
      const current = rows.find((row) => row.open);
      setOpen(current ? current.id : null);
      if (current) setLast(current.id);

      // If the address is a ledger deep link, keep it pointing at the row
      // that is actually open (or drop it once every row is closed), so a
      // reload or a copied link lands where the reader is. A plain
      // /services visit is left alone: the first row opening on load must
      // not turn it into /services#<first-slug>. replaceState, not
      // location.hash, so no `hashchange` fires a second scroll.
      let hash = window.location.hash.slice(1);
      try {
        hash = decodeURIComponent(hash);
      } catch {
        // A malformed escape in the hash — compare it as it is.
      }
      if (slugs.includes(hash) && hash !== (current?.id ?? "")) {
        const url = current
          ? `#${current.id}`
          : window.location.pathname + window.location.search;
        window.history.replaceState(window.history.state, "", url);
      }
    };

    // Keep a tapped row where it is while the open row above it closes.
    const holdPlace = (event: Event) => {
      const summary = event.currentTarget as HTMLElement;
      const before = summary.getBoundingClientRect().top;
      requestAnimationFrame(() => {
        const shift = summary.getBoundingClientRect().top - before;
        if (Math.abs(shift) > 1) {
          window.scrollBy({ top: shift, behavior: "instant" });
        }
      });
    };

    const fromHash = (behavior: ScrollBehavior) => {
      let slug = window.location.hash.slice(1);
      try {
        slug = decodeURIComponent(slug);
      } catch {
        // A malformed escape in the hash — compare it as it is.
      }
      return slugs.includes(slug) && reveal(slugs, slug, behavior);
    };
    const onHashChange = () => {
      fromHash("smooth");
    };

    const summaries: HTMLElement[] = [];
    for (const row of rows) {
      row.addEventListener("toggle", sync);
      const summary = row.querySelector<HTMLElement>(":scope > summary");
      if (summary) {
        summary.addEventListener("click", holdPlace);
        summaries.push(summary);
      }
    }
    window.addEventListener("hashchange", onHashChange);

    if (!fromHash("instant") && slugs[0]) {
      reveal(slugs, slugs[0], false);
    }

    return () => {
      for (const row of rows) row.removeEventListener("toggle", sync);
      for (const summary of summaries) {
        summary.removeEventListener("click", holdPlace);
      }
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [items]);

  const onSelect = (event: MouseEvent<HTMLAnchorElement>, slug: string) => {
    // Let modified clicks (new tab, etc.) behave as ordinary links.
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    const slugs = items.map((item) => item.slug);
    if (reveal(slugs, slug, "smooth")) {
      // Keep the address shareable without firing `hashchange` (which would
      // scroll a second time).
      window.history.replaceState(window.history.state, "", `#${slug}`);
    }
  };

  const counter = Math.max(
    0,
    items.findIndex((item) => item.slug === (open ?? last)),
  );

  return (
    // The left padding gives the active item's dash room inside the box,
    // which scrolls on its own (with a thin, parchment-toned bar) if the
    // window is too short for all of it.
    <nav
      aria-label="Practice areas index"
      className="sticky top-24 -ml-5 max-h-[calc(100svh-8rem)] overflow-y-auto overscroll-contain pl-5 [scrollbar-color:rgb(0_0_0/0.15)_transparent] [scrollbar-width:thin]"
    >
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <p className="t-eyebrow text-accent-ink">The Practice</p>
        <p className="t-meta text-[#161513]/70">
          {ledgerNo(counter + 1)} / {ledgerNo(items.length)}
        </p>
      </div>

      <ol className="border-t border-black/10">
        {items.map((item, i) => {
          const active = item.slug === open;
          return (
            <li key={item.slug} className="border-b border-black/10">
              <a
                href={`#${item.slug}`}
                onClick={(event) => onSelect(event, item.slug)}
                aria-current={active ? "true" : undefined}
                className="group grid min-h-11 grid-cols-[2.25rem_minmax(0,1fr)] content-center items-baseline py-2.5 [@media(max-height:760px)]:py-1.5"
              >
                {/* The dash lives in the number's box, so it centres on the
                    number's line even when the name wraps to two. */}
                <span
                  className={`t-meta relative transition-colors duration-300 ${
                    active ? "text-accent-ink" : "text-[#161513]/70"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -left-5 top-1/2 h-px w-2.5 origin-left bg-[#e0472f] transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                  {ledgerNo(i + 1)}
                </span>
                <span
                  className={`t-body-sm transition-colors duration-300 ${
                    active
                      ? "text-[#161513]"
                      : "text-[#161513]/65 group-hover:text-[#161513]"
                  }`}
                >
                  {item.name}
                </span>
              </a>
            </li>
          );
        })}
      </ol>

      {/* Only where there is room for it (xl, 800px+ tall); otherwise the
          copy after the ledger shows instead. */}
      <div className="mt-10 hidden xl:[@media(min-height:800px)]:block">
        <LedgerPrompt />
      </div>
    </nav>
  );
}

/**
 * "Not sure which area…" — under the index on tall xl screens, and once
 * after the ledger everywhere else.
 */
export function LedgerPrompt() {
  return (
    <>
      <p className="t-body-sm mb-2 text-[#161513]/80">
        Not sure which area your matter falls under?
      </p>
      <Link
        href="/contact"
        className="t-action group inline-flex min-h-11 items-center gap-3 text-accent-ink transition-colors duration-200 hover:text-[#161513]"
      >
        <span className="border-b border-accent-ink/40 pb-1.5 transition-colors duration-200 group-hover:border-[#161513]">
          Inquire for{" "}
          <span className="whitespace-nowrap">
            counsel{" "}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </span>
        </span>
      </Link>
    </>
  );
}
