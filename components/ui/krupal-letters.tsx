"use client";
import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

/**
 * KRUPAL — the name as a six-letter index of the practice.
 *
 * Pointing at a letter lights it, drops the other five to a ghost, and
 * names the term it stands for in the caption below. State is one integer
 * and every transition is opacity, so nothing lays out while the pointer
 * moves — and nothing is fetched, either: the whole thing is type.
 *
 * Both the name and the terms are SVG text fitted with `textLength`, which no
 * font-size clamp can do reliably — the name by stretching the glyphs
 * themselves (`spacingAndGlyphs`, so the row fills the line like a masthead),
 * the terms by stretching only the tracking (`spacing`, so a six-letter word
 * and a thirteen-letter one both land flush without distorting).
 *
 * The name always reads as one word on one line. On a phone that makes it
 * shorter than a desktop masthead, but splitting it into KRU / PAL broke the
 * name itself, which matters more than its scale.
 */

const LETTERS = [
  {
    char: "K",
    term: "Knowledge",
    gloss:
      "Notice of a fact — actual or constructive — of the kind the law treats as binding on a party.",
  },
  {
    char: "R",
    term: "Real Property",
    gloss:
      "Land, and whatever is permanently fastened to it, together with the rights that run with it.",
  },
  {
    char: "U",
    term: "Unified",
    gloss:
      "Operating as a single unit: title, drafting and appearance carried by one hand, start to finish.",
  },
  {
    char: "P",
    term: "Prosecution",
    gloss:
      "The carrying forward of a cause, from the day it is instituted to the day it is decided.",
  },
  {
    char: "A",
    term: "Advocacy",
    gloss:
      "The pleading of another's cause: the argument put on the record, in their name and on their instructions.",
  },
  {
    char: "L",
    term: "Lawyer",
    gloss:
      "One licensed to advise, to draft, and to appear for another before the courts and the revenue authorities.",
  },
];

/** Cap height as a fraction of the em, used until the real one is measured.
 *  It sets the viewBox height, so the box is exactly as tall as the capitals
 *  with no slack above or below. Inter's value; every family differs, which
 *  is why it is only the opening guess. */
const CAP_HEIGHT = 0.727;

/** The name is the one thing on the site set in the editorial serif. */
const SERIF = '"PP Editorial Old", var(--font-serif-display), Georgia, serif';

type Column = { left: number; width: number };

/**
 * Where a word's ink starts and ends, as fractions of its advance width, and
 * how tall its capitals are as a fraction of the em — all measured in the
 * font the element is actually rendering in.
 *
 * The cap height matters because the viewBox is sized to it: hard-coding
 * Inter's 0.727 would clip the tops of a serif with taller capitals the
 * moment the licensed family loads — PP Editorial Old's is 0.816.
 *
 * The two answers are judged separately, each against what a real typeface
 * could give, and either comes back null on its own. They used to share one
 * check, and Editorial Old's K overhangs its origin by 0.3% of the word —
 * enough to fail a `start >= 0` test — which threw the cap height away with
 * the bearings and clipped the tops of all six letters.
 */
let scratch: CanvasRenderingContext2D | null | undefined;

function inkBearings(node: SVGTextElement, word: string) {
  if (scratch === undefined)
    scratch = document.createElement("canvas").getContext("2d");
  const ctx = scratch;
  if (!ctx) return { cap: null, bearings: null };
  const css = getComputedStyle(node);
  try {
    // Not in every engine; without it the advance is a few percent long.
    (
      ctx as CanvasRenderingContext2D & { letterSpacing: string }
    ).letterSpacing = css.letterSpacing;
  } catch {
    /* ignore */
  }
  ctx.font = `${css.fontWeight} ${css.fontSize} ${css.fontFamily}`;
  const m = ctx.measureText(word);
  if (!m.width || m.actualBoundingBoxRight === undefined)
    return { cap: null, bearings: null };
  const start = -m.actualBoundingBoxLeft / m.width;
  const end = m.actualBoundingBoxRight / m.width;
  const em = parseFloat(css.fontSize) || 0;
  const cap = em ? m.actualBoundingBoxAscent / em : 0;
  // A first letter may overhang its origin slightly (start just below 0),
  // just as a last one may overshoot its advance.
  const saneBearings =
    start > -0.03 &&
    start < 0.08 &&
    end > 0.9 &&
    end <= 1.03 &&
    end - start > 0.85;
  return {
    cap: cap > 0.55 && cap < 0.95 ? cap : null,
    bearings: saneBearings ? { start, end } : null,
  };
}

/**
 * One fitted row of letters, with a hit zone per glyph.
 *
 * The zones come from the glyphs' measured extents rather than an even split:
 * side bearings differ per letter, and an even split leaves each highlight
 * visibly off its letter. Measuring in viewBox units makes the result
 * scale-invariant, so it survives every resize and is only redone when the
 * webfont swaps in and the advance widths change.
 */
function LetterRow({
  chars,
  offset,
  fontSize,
  onActivate,
}: {
  chars: typeof LETTERS;
  offset: number;
  fontSize: number;
  /** Reports which letter the pointer is over, for the caption below. The
   *  row itself no longer draws a state for it — the letters stay as they
   *  are and only the spotlight moves. */
  onActivate: (index: number) => void;
}) {
  const rowId = useId().replace(/:/g, "");
  const wordId = `krupal-word-${rowId}`;
  const spotId = `krupal-spot-${rowId}`;
  const spotRef = useRef<SVGRadialGradientElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const frameRef = useRef(0);
  const radiusRef = useRef(0);
  const [capRatio, setCapRatio] = useState(CAP_HEIGHT);
  const height = Math.round(fontSize * capRatio);
  const textRef = useRef<SVGTextElement>(null);
  const [columns, setColumns] = useState<Column[]>(() =>
    chars.map((_, i) => ({
      left: (i * 100) / chars.length,
      width: 100 / chars.length,
    })),
  );
  const [viewBox, setViewBox] = useState(`0 0 1000 ${height}`);

  useEffect(() => {
    function measure() {
      const node = textRef.current;
      if (!node) return;
      let boxes, ink;
      try {
        boxes = chars.map((_, i) => node.getExtentOfChar(i));
        ink = node.getBBox();
      } catch {
        return; // throws if the text has not been laid out yet
      }
      if (!ink.width) return;

      // `textLength` fits the ADVANCE widths to the box, but what the eye
      // lines up on is the ink — and K carries a fat left side bearing while
      // L has almost none, so the word sits visibly indented on the left and
      // flush on the right. Cropping the viewBox to the ink makes both edges
      // true without scaling the glyphs.
      //
      // SVG can't report that ink: getBBox() on a `textLength` text returns
      // the advance box. Canvas can, via actualBoundingBox*. Those are taken
      // as FRACTIONS of the advance width, which survives the horizontal
      // stretch `spacingAndGlyphs` applies, and the result is ignored unless
      // it is within the range a real font could produce — so a browser
      // without letter-spacing support, or a future font swap, degrades to
      // the advance box rather than to a mangled crop.
      let x = ink.x;
      let width = ink.width;
      const { cap, bearings } = inkBearings(
        node,
        chars.map((c) => c.char).join(""),
      );
      if (cap) setCapRatio(cap);
      if (bearings) {
        x = ink.x + bearings.start * ink.width;
        width = (bearings.end - bearings.start) * ink.width;
      }
      setViewBox(`${x} 0 ${width} ${height}`);

      // Each zone runs to the midpoint of the gap with its neighbour, so the
      // row has no dead strips between letters. Expressed as a percentage of
      // the ink box, which is what the buttons are positioned against.
      const pct = (v: number) => ((v - x) / width) * 100;
      setColumns(
        boxes.map((box, i) => {
          const left =
            i === 0 ? x : (boxes[i - 1].x + boxes[i - 1].width + box.x) / 2;
          const right =
            i === boxes.length - 1
              ? x + width
              : (box.x + box.width + boxes[i + 1].x) / 2;
          return { left: pct(left), width: pct(right) - pct(left) };
        }),
      );
    }

    measure();
    if ("fonts" in document) document.fonts.ready.then(measure);
  }, [chars, height]);

  /*
    The spotlight follows the pointer by moving the gradient's centre, in
    viewBox units, straight on the DOM node. No state and no re-render: a
    mouse crossing the word touches two attributes per frame.
  */
  const track = (event: ReactPointerEvent<HTMLDivElement>) => {
    const svg = svgRef.current;
    const spot = spotRef.current;
    if (!svg || !spot) return;
    const box = svg.getBoundingClientRect();
    if (!box.width) return;
    const [vbX, , vbW] = viewBox.split(" ").map(Number);
    const scale = vbW / box.width;
    spot.setAttribute("cx", String(vbX + (event.clientX - box.left) * scale));
    spot.setAttribute("cy", String((event.clientY - box.top) * scale));
  };

  /*
    …and opens by growing, rather than arriving at full size.

    Tweened in rAF against the `r` attribute rather than in CSS: `r` is an
    SVG geometry property and only some engines expose it to CSS
    transitions, so a stylesheet version would silently snap wherever it is
    unsupported — which is the exact thing being fixed here.
  */
  const SPOT_RADIUS = Math.round(fontSize * 0.62);

  const tweenRadius = (target: number, duration: number) => {
    const spot = spotRef.current;
    if (!spot) return;
    cancelAnimationFrame(frameRef.current);

    const reduced =
      typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || duration === 0) {
      radiusRef.current = target;
      spot.setAttribute("r", String(target));
      return;
    }

    const from = radiusRef.current;
    const started = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      radiusRef.current = from + (target - from) * eased;
      spot.setAttribute("r", String(radiusRef.current));
      if (t < 1) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return (
    <div
      className="relative"
      onPointerEnter={(e) => {
        track(e);
        tweenRadius(SPOT_RADIUS, 620);
      }}
      onPointerMove={track}
      onPointerLeave={() => tweenRadius(0, 340)}
    >
      {/* overflow-visible: the box is sized to the MEASURED cap height, and
          until a measurement lands (or if one is ever rejected) it is sized
          to a guess. A wrong guess should leave the box a little off, not
          slice the tops off the name. */}
      <svg
        ref={svgRef}
        viewBox={viewBox}
        className="pointer-events-none block w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/*
            The spotlight. A soft-edged disc that follows the pointer and
            reveals an orange copy of the word underneath it — the letters
            themselves never change, so nothing is taken away from the
            characters the pointer is not over.
          */}
          <radialGradient
            ref={spotRef}
            id={spotId}
            gradientUnits="userSpaceOnUse"
            r={0}
            cx={-9999}
            cy={-9999}
          >
            <stop offset="0" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="0.55" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <mask id={`${spotId}-mask`} maskUnits="userSpaceOnUse" x={-2000} y={-2000} width={6000} height={6000}>
            <rect x={-2000} y={-2000} width={6000} height={6000} fill={`url(#${spotId})`} />
          </mask>
        </defs>

        {/*
          The word is written once and painted twice: the ink copy, and an
          orange copy of the SAME element through the spotlight mask. A
          second <text> would not do — `textLength` distributes across the
          glyphs differently in two elements, and the copies would drift
          apart by several percent.

          The colour travels on a custom property because a `fill` attribute
          on the <use> cannot override one set inside the referenced node,
          while an inherited custom property reaches into it cleanly.
        */}
        <text
          ref={textRef}
          id={wordId}
          x={500}
          y={height}
          textAnchor="middle"
          textLength={992}
          lengthAdjust="spacingAndGlyphs"
          style={{
            fontFamily: SERIF,
            fontSize,
            fontWeight: 400,
            letterSpacing: "-0.01em",
            fill: "var(--word-ink, #161513)",
          }}
        >
          {chars.map((letter) => letter.char).join("")}
        </text>

        <g
          mask={`url(#${spotId}-mask)`}
          style={{ "--word-ink": "#fe5545" } as React.CSSProperties}
        >
          <use href={`#${wordId}`} />
        </g>
      </svg>

      <div className="absolute inset-0">
        {chars.map((letter, i) => (
          <button
            key={letter.char}
            type="button"
            onPointerEnter={() => onActivate(offset + i)}
            onClick={() => onActivate(offset + i)}
            onFocus={() => onActivate(offset + i)}
            aria-label={`${letter.char} — ${letter.term}. ${letter.gloss}`}
            style={{
              left: `${columns[i].left}%`,
              width: `${columns[i].width}%`,
            }}
            className="absolute inset-y-0 cursor-default outline-none"
          />
        ))}
      </div>
    </div>
  );
}

/**
 * The wordmark as the hero's centrepiece: the name, the term behind it, and
 * one line of definition. No section chrome of its own — the hero owns the
 * padding and the background, so this drops into that composition rather
 * than fighting it for vertical space.
 *
 * It fills whatever width it is given (the letters are fitted to the box),
 * so `className` is how the hero keeps it clear of the figure beside it.
 */
export function KrupalWordmark({ className = "" }: { className?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : LETTERS[active];

  return (
    <>
      <div
        className={`relative z-10 ${className}`}
        onPointerLeave={() => setActive(null)}
      >
        {/*
          The page's H1. The hero shows the name and nothing else, so the
          heading belongs to the name — spelled out here for search engines
          and screen readers, which cannot read six tspans as a word, let
          alone as a practice in a city.
        */}
        <h1 className="sr-only">
          Krupal — Adv. Krupal P. Savjani, Land &amp; Revenue Advocate in
          Ahmedabad, Gujarat
        </h1>

        {/* The title the name is read under, set in the same serif as the
            chapter marks and well below the name's scale so the masthead
            stays the name. Left-aligned to the K's ink, which is the box
            edge because the row's viewBox is cropped to the ink. Hidden
            from assistive tech: the H1 above already says "Adv.". */}
        <p
          aria-hidden="true"
          className="t-serif-sm mb-3 text-[clamp(1.5rem,2.8vw,2.75rem)] leading-none text-[#161513]/70 md:mb-5"
        >
          Advocate
        </p>

        <LetterRow
          chars={LETTERS}
          offset={0}
          fontSize={274}
          onActivate={setActive}
        />

        {/*
        Caption. The height is FIXED, not a minimum: the hero stacks from the
        bottom, so a caption that grows when a gloss appears would push the
        whole wordmark upward, and the letters would seem to jump on hover.
        The tallest gloss runs to two lines at this measure on desktop and
        three on a phone, and the box is sized for that.
      */}
        <div className="mt-5 flex h-[7rem] justify-end md:h-[5.75rem]">
          {/* A FIXED width, not a max: the box is a flex item, so a max-width
            lets it shrink to the idle caption and then jump ~300px wider when
            a gloss replaces it. The height is reserved for the same reason,
            one axis each. */}
          <div className="w-[26rem] max-w-full text-right">
            <span className="t-eyebrow block text-[#fe5545]">
              {current?.term}
            </span>
            <p className="t-body-sm mt-2 text-[#161513]/55">{current?.gloss}</p>
          </div>
        </div>
      </div>
    </>
  );
}
