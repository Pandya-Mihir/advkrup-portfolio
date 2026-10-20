"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/nav";

const links = NAV_LINKS;

const linkVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.06 + 0.12,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/**
 * A link whose label fills in from wherever the pointer entered it.
 *
 * Two copies of the word sit on top of each other — a dim one and a lit one
 * — and the lit copy is clipped to a circle centred on the pointer. Hover
 * grows that circle past the width of the label, so the colour floods out
 * from under the cursor rather than switching all at once.
 *
 * `clip-path` is the animated property because a circle() radius
 * interpolates natively; masking with a radial-gradient would have needed
 * an @property registration to animate at all, and silently snaps where
 * that is unsupported. The pointer position is written straight to CSS
 * custom properties — no state, so moving the mouse never re-renders.
 *
 * `radius` scales with the label: the flood should take a few hundred
 * milliseconds to cross the word whether it is a 12px rail label or a
 * 5rem heading.
 */
function FloodLink({
  href,
  label,
  active,
  radius,
  className = "",
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  radius: number;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const track = (event: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    el.style.setProperty("--x", `${event.clientX - box.left}px`);
    el.style.setProperty("--y", `${event.clientY - box.top}px`);
  };

  return (
    <Link
      ref={ref}
      href={href}
      onClick={onClick}
      onPointerEnter={track}
      onPointerMove={track}
      aria-current={active ? "page" : undefined}
      style={{ "--r": `${radius}px` } as React.CSSProperties}
      className={`group relative inline-block ${
        // The current page is marked in the full accent — the same red the
        // hover flood fills with — not a faded tint of it.
        active ? "text-[#fe5545]" : "text-[#161513]/40"
      } ${className}`}
    >
      {label}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-[#fe5545] transition-[clip-path] duration-[650ms] ease-[cubic-bezier(0.45,0,0.25,1)] [clip-path:circle(0px_at_var(--x,50%)_var(--y,50%))] group-hover:[clip-path:circle(var(--r)_at_var(--x,50%)_var(--y,50%))] motion-reduce:hidden"
      >
        {label}
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /*
    The bar is transparent over the top of the page and only takes a
    background once you have scrolled past it, so the hero runs edge to edge
    behind it instead of starting under a slab.

    A scroll listener rather than `backdrop-filter`: a fixed, full-width
    element with a backdrop filter forces the compositor to re-sample and
    re-blur everything behind it every frame, which was the dominant cause
    of scroll jank on this site. This costs one comparison per frame, and
    React only re-renders on the crossing.
  */
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 8);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  /*
    The chrome takes the colour of the section it sits against, so it reads
    as the page's own margin rather than a strip laid over it: the rail on
    desktop, the top bar on a phone (once it has a background at all).

    Sections opt in with `data-rail`; the colour is their own computed
    background, read once, so nothing is written down twice. A section with
    no background of its own (the hero) leaves the chrome on its default
    cream. Targets may nest — the footer is one, inside the home page's
    footer frame — and the innermost one under the probe wins.

    "Against" is asked of an IntersectionObserver whose root is shrunk to a
    2px probe: just right of the rail at half height on desktop, just under
    the top bar on a phone, each set 1px INTO the content: a probe lying
    exactly on a boundary would count a section that merely touches it, and
    at the end of the home page's track that left the rail on the previous
    panel's colour. That works for the sideways track and the
    stacked layout alike, and costs nothing per scroll frame — the browser
    only reports crossings. The result is one custom property on <html>,
    `--section-bg`, which both the rail and the bar read. The probe is
    rebuilt on resize because rootMargin takes pixels here, and because the
    breakpoint decides which probe applies.
  */
  const railRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rail = railRef.current;
    const bar = barRef.current;
    if (!rail || !bar) return;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-rail]"),
    );
    if (!targets.length) return;

    const root = document.documentElement;
    const tint = new Map<Element, string>();
    for (const el of targets) {
      const bg = getComputedStyle(el).backgroundColor;
      const clear = bg === "transparent" || bg === "rgba(0, 0, 0, 0)";
      tint.set(el, clear ? "" : bg);
    }

    const under = new Set<Element>();
    const apply = () => {
      let pick: Element | undefined;
      for (const el of under) if (!pick || pick.contains(el)) pick = el;
      const colour = pick ? tint.get(pick) : "";
      if (colour) root.style.setProperty("--section-bg", colour);
      else root.style.removeProperty("--section-bg");
    };

    let observer: IntersectionObserver | undefined;
    const watch = () => {
      observer?.disconnect();
      under.clear();
      // clientWidth/Height, not innerWidth: the observer's root excludes
      // the scrollbar, and counting it would collapse the probe to nothing.
      const w = document.documentElement.clientWidth;
      const h = document.documentElement.clientHeight;
      const edge = rail.offsetWidth; // 0 below md, where the rail is hidden
      let rootMargin: string;
      if (edge) {
        const top = Math.floor(h / 2);
        rootMargin = `${-top}px ${-(w - edge - 3)}px ${-(h - top - 2)}px ${-(edge + 1)}px`;
      } else {
        const top = bar.offsetHeight;
        const left = Math.floor(w / 2);
        rootMargin = `${-(top + 1)}px ${-(w - left - 2)}px ${-(h - top - 3)}px ${-left}px`;
      }
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) under.add(entry.target);
            else under.delete(entry.target);
          }
          apply();
        },
        { rootMargin },
      );
      for (const el of targets) observer.observe(el);
    };

    watch();
    window.addEventListener("resize", watch);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", watch);
      root.style.removeProperty("--section-bg");
    };
  }, [pathname]);

  /*
    A navigation should not leave its own menu standing open behind it.
    Adjusted during render rather than in an effect — React's documented
    way to reset state when a prop changes, and it avoids the cascading
    extra render that `useEffect(() => setOpen(false), [pathname])` costs
    on every route change.
  */
  const [routeWhenOpened, setRouteWhenOpened] = useState(pathname);
  if (pathname !== routeWhenOpened) {
    setRouteWhenOpened(pathname);
    if (open) setOpen(false);
  }

  // While the overlay is up it owns the screen: Escape closes it, and the
  // page behind it does not scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/*
        The rail. A fixed 64px strip down the left edge that survives every
        section and the menu overlay: the trigger at the top, the practice
        and the name set vertically through the middle, the year at the
        foot. The page is inset by the same 4rem in globals.css, so nothing
        runs underneath it.

        On a phone there is no room for a rail, so it becomes a top bar with
        the name and the trigger instead.
      */}
      <div
        ref={railRef}
        className="pointer-events-none fixed inset-y-0 left-0 z-[60] hidden w-16 flex-col items-center justify-between border-r border-black/10 bg-[var(--section-bg,#f6f4f0)] py-6 transition-[background-color] duration-500 ease-out md:flex"
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="pointer-events-auto flex h-8 w-8 items-center justify-center text-[#161513]/70 transition-colors duration-200 hover:text-[#161513]"
        >
          <span aria-hidden="true" className="relative block h-[9px] w-[18px]">
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ease-out ${
                open ? "top-[4px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ease-out ${
                open ? "top-[4px] -rotate-45" : "top-[8px]"
              }`}
            />
          </span>
        </button>

        {/* Set vertically, reading bottom-to-top, as on a spine.

            The rail's labels are ink at 65%, not the site's 40% muted tone:
            the rail takes each section's colour, and 40% ink measured ~2.5:1
            on every one of them — faint on cream, washed out on the
            parchment. 65% holds above 5:1 on cream, stone and parchment. */}
        <span
          className="t-eyebrow whitespace-nowrap text-[#161513]/65"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Advocate — Gujarat Bar
        </span>

        <Link
          href="/"
          className="t-serif-sm whitespace-nowrap text-[13px] text-[#161513]/80 transition-colors duration-200 hover:text-[#161513] pointer-events-auto"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Krupal Savjani
        </Link>

        <span
          className="t-eyebrow whitespace-nowrap text-[#161513]/65"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          © {new Date().getFullYear()}
        </span>
      </div>

      {/* Phones get a top bar instead: the name at the left — the rail that
          carries it on desktop is hidden here — and the trigger at the
          right. Transparent over the top of the page, then the colour of
          the section beneath it, like the rail. */}
      <div
        ref={barRef}
        className={`fixed top-0 z-[60] flex w-full items-center justify-between px-6 py-5 transition-[background-color] duration-500 ease-out md:hidden ${
          scrolled && !open
            ? "bg-[var(--section-bg,#f6f4f0)]"
            : "bg-transparent"
        }`}
      >
        <Link
          href="/"
          className="t-serif-sm whitespace-nowrap text-[15px] leading-none text-[#161513]/85"
        >
          Krupal Savjani
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="t-action flex items-center gap-3 text-[#161513]/70"
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span aria-hidden="true" className="relative block h-[9px] w-[16px]">
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ease-out ${
                open ? "top-[4px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ease-out ${
                open ? "top-[4px] -rotate-45" : "top-[8px]"
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[55] overflow-y-auto overscroll-contain bg-[#faf9f6] md:pl-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {/*
              The links are centred in the space ABOVE the contact strip, and
              the strip sits in normal flow beneath them rather than pinned
              to the bottom — with five links, a pinned strip collided with
              "Contact" on short laptop windows and landscape phones. The type
              also tracks the screen's height (11svh), not only its width,
              and if a screen is shorter still the dialog scrolls instead of
              clipping "Home" off the top.
            */}
            <div className="relative flex min-h-full flex-col px-6 md:px-10">
              <div className="flex flex-1 flex-col justify-center py-20 md:py-12">
                <nav className="flex flex-col items-start gap-1 md:gap-2">
                  {links.map((link, i) => (
                    <motion.div
                      key={link.href}
                      custom={i}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FloodLink
                        href={link.href}
                        label={link.label}
                        active={pathname === link.href}
                        radius={520}
                        onClick={() => setOpen(false)}
                        className="t-serif-sm leading-[1.1] text-[clamp(2.25rem,min(8vw,11svh),5.5rem)]"
                      />
                    </motion.div>
                  ))}
                </nav>
              </div>

              <motion.div
                className="shrink-0 pb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="mb-5 h-px w-full bg-black/10" />
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <p className="t-meta">Adv. Krupal P. Savjani — Ahmedabad</p>
                  <a
                    href="tel:+918128800351"
                    className="t-meta transition-colors duration-200 hover:text-[#161513]"
                  >
                    +91 81288 00351
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
