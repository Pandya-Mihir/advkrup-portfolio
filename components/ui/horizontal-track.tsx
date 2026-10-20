"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Turns the page into one horizontal run: the wheel still scrolls down, the
 * content moves sideways.
 *
 * The mechanism is a tall empty spacer with a sticky stage inside it. The
 * spacer's height is the viewport plus however far the track has to travel,
 * so the browser scrolls natively — nothing is hijacked, which is what
 * keeps the trackpad, the keyboard, the scrollbar, find-in-page and the
 * progress bar all behaving the way they already did.
 *
 * It switches itself off, falling back to ordinary vertical stacking, in
 * two cases: below `md`, where a phone has no room for it and a sideways
 * page fights the natural gesture, and under `prefers-reduced-motion`,
 * where scroll-coupled movement is the specific thing being asked to stop.
 * The markup is identical either way — only the layout changes.
 */
export function HorizontalTrack({ children }: { children: ReactNode }) {
  const spacer = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [enabled, setEnabled] = useState(false);

  // How far the track has to travel, and whether it should travel at all.
  useEffect(() => {
    const wide = matchMedia("(min-width: 768px)");
    const still = matchMedia("(prefers-reduced-motion: reduce)");

    const measure = () => {
      const on = wide.matches && !still.matches;
      setEnabled(on);
      const el = track.current;
      const frame = stage.current;
      if (!on || !el || !frame) {
        setDistance(0);
        return;
      }
      setDistance(Math.max(0, el.scrollWidth - frame.clientWidth));
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (track.current) observer.observe(track.current);
    wide.addEventListener("change", measure);
    still.addEventListener("change", measure);
    return () => {
      observer.disconnect();
      wide.removeEventListener("change", measure);
      still.removeEventListener("change", measure);
    };
  }, [children]);

  // Scroll position → sideways offset, followed rather than mirrored.
  useEffect(() => {
    if (!enabled || distance <= 0) {
      if (track.current) track.current.style.transform = "";
      return;
    }

    /*
      The offset eases toward the scroll position instead of being set from
      it directly.

      Frame times here were already fine — the stutter was not dropped
      frames. A scroll handler runs after the compositor has already moved
      the page, so a transform written from one lands a beat late, and a
      trackpad's deltas arrive in uneven lumps. Mirroring those lumps
      one-for-one is what reads as judder. Easing toward the target absorbs
      the unevenness and turns it into a glide; the slight lag behind the
      scroll is the weight of the thing moving.

      The spacer's offset is cached rather than measured each frame:
      getBoundingClientRect() inside a scroll handler forces a synchronous
      layout, which is the one thing guaranteed to cost a frame.

      This runs on every engine, Chromium included. A scroll-driven CSS
      animation would keep the travel off the main thread, but it mirrors
      the scroll exactly — each mouse-wheel notch became a visible sideways
      jump — and its view timeline is inset by `scroll-padding-top`, which
      left the track ~6rem along at the very top of the page and clipped
      the K. The follower costs well under a millisecond a frame.
    */
    let top = spacer.current?.offsetTop ?? 0;
    let current = 0;
    let frame = 0;
    let then = 0;

    const target = () => Math.min(Math.max(window.scrollY - top, 0), distance);

    const run = (now: number) => {
      const el = track.current;
      if (!el) {
        frame = 0;
        return;
      }
      // The same glide at 60Hz and 120Hz: the easing is per unit of time,
      // not per frame, so a faster display does not make it twice as twitchy.
      const dt = then ? Math.min(now - then, 64) : 16.7;
      then = now;
      const ease = 1 - Math.pow(1 - 0.12, dt / 16.7);
      const want = target();
      const delta = want - current;
      // Snap home rather than crawling the last fraction of a pixel.
      current = Math.abs(delta) < 0.1 ? want : current + delta * ease;
      el.style.transform = `translate3d(${-current}px, 0, 0)`;
      if (current === want) {
        frame = 0;
        then = 0;
      } else {
        frame = requestAnimationFrame(run);
      }
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };

    /*
      Magnetic section starts.

      The track scrolls freely, but a scroll that comes to rest within 1.5%
      of a section's start — 98.5% of the way there, from either side — is
      carried the last few pixels so the section sits square in the frame.
      Anywhere else it is left exactly where it stopped: this is a nudge for
      the near miss, not mandatory paging.

      Not CSS scroll-snap: `proximity` uses a browser-chosen zone (a large
      share of the viewport in Chromium) that cannot be set, and
      `mandatory` would page through the wide sections. And it only acts
      once scrolling has ENDED — `scrollend`, which waits out trackpad
      momentum and smooth-scroll animations; a short idle timer where the
      event is missing — so it never pulls against a gesture in progress.

      Stops are each section's left edge in track space (`offsetLeft`
      against the sticky stage, which the transform does not change),
      clamped to the end of travel, plus the end itself.
    */
    const SNAP_ZONE = 0.015;
    let stops: number[] = [];
    let frameWidth = 0;
    let idle = 0;

    const measureStops = () => {
      frameWidth = stage.current?.clientWidth ?? 0;
      const sections = track.current ? Array.from(track.current.children) : [];
      stops = sections.map((el) =>
        Math.min((el as HTMLElement).offsetLeft, distance)
      );
      stops.push(distance);
    };

    const settle = () => {
      const pos = target();
      let nearest = pos;
      let gap = Infinity;
      for (const stop of stops) {
        const d = Math.abs(stop - pos);
        if (d < gap) {
          gap = d;
          nearest = stop;
        }
      }
      if (gap > 0.5 && gap <= frameWidth * SNAP_ZONE) {
        window.scrollTo({ top: top + nearest, behavior: "smooth" });
      }
    };

    const hasScrollEnd = "onscrollend" in window;
    const onScroll = () => {
      wake();
      if (!hasScrollEnd) {
        clearTimeout(idle);
        idle = window.setTimeout(settle, 160);
      }
    };

    const remeasure = () => {
      top = spacer.current?.offsetTop ?? 0;
      measureStops();
      wake();
    };

    // Land on the right offset immediately — a reload halfway down the page
    // should not animate in from the start of the track.
    current = target();
    if (track.current) {
      track.current.style.transform = `translate3d(${-current}px, 0, 0)`;
    }
    measureStops();

    window.addEventListener("scroll", onScroll, { passive: true });
    if (hasScrollEnd) window.addEventListener("scrollend", settle);
    window.addEventListener("resize", remeasure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", settle);
      window.removeEventListener("resize", remeasure);
      clearTimeout(idle);
      cancelAnimationFrame(frame);
    };
  }, [enabled, distance]);

  return (
    <div
      ref={spacer}
      style={
        enabled
          ? ({
              height: `calc(100vh + ${distance}px)`,
              "--track-distance": `${distance}px`,
            } as React.CSSProperties)
          : undefined
      }
    >
      <div
        ref={stage}
        className={enabled ? "sticky top-0 h-screen overflow-hidden" : undefined}
      >
        <div
          ref={track}
          className={
            enabled
              ? "flex h-screen will-change-transform"
              : undefined
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}
