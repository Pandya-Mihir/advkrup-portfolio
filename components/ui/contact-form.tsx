"use client";
import { useEffect, useRef, useState, type FormEvent, type ReactNode, type Ref } from "react";
import { flushSync } from "react-dom";
import { PRACTICE } from "@/lib/seo/site";
import {
  ERROR_FIELDS,
  LIMITS,
  MATTER_TYPES,
  REPLY_OPTIONS,
  effectiveReply,
  enquiryErrors,
  type Enquiry,
  type ErrorField,
  type MatterType,
  type ReplyVia,
} from "@/lib/contact";

/**
 * The /contact "guided enquiry": three numbered steps on one page — what the
 * matter is about, a few details, and how to reply — with a step index that
 * fills in as the client answers (a sticky column on desktop, a sticky
 * three-part bar on smaller screens).
 *
 * The page around it (`app/contact/page.tsx`) stays a Server Component so it
 * can export `metadata`. The rules for a valid enquiry live in
 * `lib/contact.ts`, shared with the API route.
 */

type TextField = "name" | "phone" | "email" | "message";
type Status = "idle" | "sending" | "sent" | "failed";
type Receipt = { first: string; reply: ReplyVia; to: string; matter: string };

const STEPS = [
  { n: 1, title: "What is it about?", bar: "About" },
  { n: 2, title: "Tell us briefly", bar: "Details" },
  { n: 3, title: "How should we reply?", bar: "Reply" },
] as const;

const COUNT_WORDS = ["", "One thing is", "Two things are", "Three things are"];

const EMPTY = { name: "", phone: "", email: "", message: "" };

/* Shared class strings. */
const HAIR = "border-[#cdc6b9]/75";
const INPUT =
  "t-body block min-h-14 w-full appearance-none rounded-none border px-4 py-3.5 text-[#161513] transition-colors duration-150 placeholder:text-[#161513]/45 focus:border-[#161513] focus:shadow-[inset_0_-2px_0_#fe5545] focus:outline-none";
const INPUT_OK = "border-[#cdc6b9] bg-[#fbfaf7] hover:border-[#161513]/50";
const INPUT_BAD = "border-[#fe5545] bg-[#fff6f4]";
/* A fieldset with no box of its own: its wrapper carries the rule and padding,
   since a browser draws a fieldset's legend inside its top border. */
const FIELDSET = "m-0 min-w-0 border-0 p-0";

export function ContactEnquiry() {
  const [values, setValues] = useState(EMPTY);
  const [matterType, setMatterType] = useState<MatterType | "">("");
  const [replyVia, setReplyVia] = useState<ReplyVia | "">("");
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [inView, setInView] = useState(1);
  const [attempt, setAttempt] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLElement>(null);
  const firstChoiceRef = useRef<HTMLInputElement>(null);
  const restarted = useRef(false);
  const fieldRefs = useRef<Partial<Record<ErrorField, HTMLInputElement | null>>>({});

  const enquiry: Enquiry = { ...values, matterType, replyVia };
  const name = values.name.trim();
  const phone = values.phone.trim();
  const email = values.email.trim();

  // Errors show only once a send has been tried, then follow every edit.
  const errors = tried ? enquiryErrors(enquiry) : {};
  const errorCount = ERROR_FIELDS.filter((f) => errors[f]).length;

  const done = [!!matterType, !!(name && (phone || email)), !!replyVia];
  const summaries = [
    matterType || "Not chosen yet",
    name ? `${name}${phone ? ` · ${phone}` : email ? ` · ${email}` : ""}` : "Your matter, name and number",
    replyVia || "Call, WhatsApp or email",
  ];

  // Which step is under a line 40% of the way down the window.
  useEffect(() => {
    const steps = [1, 2, 3]
      .map((n) => document.getElementById(`step-${n}`))
      .filter((el): el is HTMLElement => el !== null);
    if (!steps.length || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(Number((entry.target as HTMLElement).dataset.step));
          }
        }
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );
    for (const step of steps) observer.observe(step);
    return () => observer.disconnect();
  }, [status]);

  // After a send: bring the thank-you into view and move focus to it.
  // After "Send another enquiry": back to the first question.
  useEffect(() => {
    if (status === "sent") {
      sectionRef.current?.scrollIntoView({ block: "start" });
      successRef.current?.focus({ preventScroll: true });
    } else if (status === "idle" && restarted.current) {
      restarted.current = false;
      sectionRef.current?.scrollIntoView({ block: "start" });
      firstChoiceRef.current?.focus({ preventScroll: true });
    }
  }, [status]);

  const setField = (field: TextField, value: string) =>
    setValues((v) => ({ ...v, [field]: value }));

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const found = enquiryErrors(enquiry);
    const firstBad = ERROR_FIELDS.find((f) => found[f]);
    // Render the errors (and the fields' aria-describedby) before focusing,
    // so the field is announced with its message. A new `attempt` re-mounts
    // the alert's text, so a repeated send announces it again.
    flushSync(() => {
      setTried(true);
      setAttempt((n) => n + 1);
    });
    if (firstBad) {
      fieldRefs.current[firstBad]?.focus();
      return;
    }

    const reply = effectiveReply(enquiry);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: values.message.trim(),
          matterType,
          replyVia: reply,
        }),
      });
      const data: unknown = await res.json().catch(() => null);
      const ok =
        res.ok &&
        typeof data === "object" &&
        data !== null &&
        (data as { success?: unknown }).success === true;
      if (!ok) throw new Error(`Enquiry not accepted (${res.status})`);

      setReceipt({
        first: name.split(/\s+/)[0],
        reply,
        to: reply === "Email" ? email : phone,
        matter: matterType || "Not given",
      });
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("failed");
    }
  }

  function startAgain() {
    setValues(EMPTY);
    setMatterType("");
    setReplyVia("");
    setTried(false);
    setReceipt(null);
    restarted.current = true;
    setStatus("idle");
  }

  const sent = status === "sent" && receipt !== null;

  // Under step 3: where the reply will go, or what is still needed for it.
  let replyNote = "";
  let replyNoteBad = false;
  if (replyVia === "Email") {
    if (email) replyNote = `We will write to ${email}.`;
    else {
      replyNote = "Add your email in step 2, or choose Call or WhatsApp.";
      replyNoteBad = true;
    }
  } else if (replyVia) {
    if (phone) {
      replyNote =
        replyVia === "Call" ? `We will call ${phone}.` : `We will message ${phone} on WhatsApp.`;
    } else {
      replyNote = `Add your phone number in step 2 so we can ${
        replyVia === "Call" ? "call you." : "message you."
      }`;
      replyNoteBad = true;
    }
  }

  // Announced when the reply choice changes, or the contact it needs goes
  // between missing and given — never the typed number or email itself, so
  // typing in step 2 does not queue an announcement per keystroke.
  let replyAnnounce = "";
  if (replyVia === "Email") {
    replyAnnounce = email
      ? "Reply by email to the address you gave."
      : "Add your email in step 2, or choose Call or WhatsApp.";
  } else if (replyVia) {
    replyAnnounce = phone
      ? `Reply by ${replyVia === "Call" ? "a call" : "WhatsApp"} to the phone number you gave.`
      : `Add your phone number in step 2 so we can ${
          replyVia === "Call" ? "call you." : "message you."
        }`;
  }

  const field = (
    id: ErrorField,
    label: string,
    tag: string,
    input: {
      type: string;
      autoComplete: string;
      inputMode?: "text" | "tel" | "email";
      placeholder: string;
    },
    describedBy?: string,
    full = false,
  ) => {
    const error = errors[id];
    const describers = [error ? `e-${id}` : "", describedBy ?? ""].filter(Boolean).join(" ");
    return (
      <div className={full ? "md:col-span-2" : undefined}>
        <label htmlFor={`f-${id}`} className="mb-2.5 flex items-baseline justify-between gap-3">
          <span className="t-body leading-[1.4] text-[#161513]">{label}</span>
          <span className="t-meta tracking-[0.12em] text-[#161513]/60">{tag}</span>
        </label>
        <input
          ref={(el) => {
            fieldRefs.current[id] = el;
          }}
          id={`f-${id}`}
          name={id}
          {...input}
          maxLength={LIMITS[id]}
          value={values[id]}
          onChange={(e) => setField(id, e.target.value)}
          aria-required={id === "name" ? true : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describers || undefined}
          className={`${INPUT} ${error ? INPUT_BAD : INPUT_OK}`}
        />
        {error ? (
          <p id={`e-${id}`} className="t-body-sm mt-2 flex gap-2 text-accent-ink">
            <span aria-hidden="true">!</span>
            {error}
          </p>
        ) : null}
      </div>
    );
  };

  let alert: ReactNode = null;
  if (errorCount > 0) {
    alert = `${COUNT_WORDS[errorCount]} missing. Please check the field${
      errorCount > 1 ? "s" : ""
    } marked in red.`;
  } else if (status === "failed") {
    alert = (
      <>
        Sorry, your enquiry could not be sent. Please try again, or call{" "}
        <a
          href={`tel:${PRACTICE.telephone}`}
          className="whitespace-nowrap border-b border-[#161513] text-[#161513]"
        >
          {PRACTICE.telephoneDisplay}
        </a>
        .
      </>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="scroll-mt-4 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start lg:gap-12 min-[68.8125rem]:grid-cols-[320px_minmax(0,1fr)] min-[68.8125rem]:gap-20"
    >
      {/* ── The step index ─────────────────────────────────────────── */}
      <aside className="lg:sticky lg:top-10">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-8 flex-none bg-[#fe5545]" />
          <p className="t-eyebrow">Send an enquiry</p>
        </div>
        <h2 id="enquiry-title" className="t-section mt-3.5 mb-2.5 lg:mt-[18px] lg:mb-3.5">
          Three short questions.
        </h2>
        <p className="t-body-sm lg:mb-9">
          About two minutes. Only your name and a phone number or email are required.
        </p>
        <nav aria-label="Enquiry steps" className="hidden lg:block">
          <ol className={`border-t ${HAIR}`}>
            {STEPS.map((step, i) => {
              const isDone = done[i];
              const isCurrent = !sent && inView === step.n;
              const strong = isDone || isCurrent;
              return (
                <li key={step.n} className={`border-b ${HAIR}`}>
                  <a
                    href={`#step-${step.n}`}
                    aria-current={isCurrent ? "step" : undefined}
                    className="grid grid-cols-[40px_minmax(0,1fr)] gap-y-1 py-4"
                  >
                    <span
                      aria-hidden="true"
                      className={`t-meta row-span-2 grid size-[26px] place-items-center border tracking-normal transition-colors duration-200 ${
                        isDone
                          ? "border-[#161513] bg-[#161513] text-[#f6f4f0]"
                          : isCurrent
                            ? "border-[#161513] text-[#161513]"
                            : "border-[#cdc6b9] text-[#161513]/60"
                      }`}
                    >
                      {step.n}
                    </span>
                    <span
                      className={`t-body-sm transition-colors duration-200 ${
                        strong ? "text-[#161513]" : "text-[#161513]/65"
                      }`}
                    >
                      <span className="sr-only">Step {step.n}: </span>
                      {step.title}
                    </span>
                    <span
                      className={`t-body-sm min-h-[1.5em] break-words ${
                        isDone ? "text-[#161513]" : "text-[#161513]/55"
                      }`}
                    >
                      {summaries[i]}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
        <p className="t-meta mt-7 hidden lg:block">Reply within one working day</p>
      </aside>

      {/* ── The step bar, below lg ─────────────────────────────────── */}
      {!sent ? (
        <nav
          aria-label="Progress"
          className={`sticky top-[54px] z-30 -mx-6 mt-6 grid grid-cols-3 gap-1.5 border-b ${HAIR} bg-[#f6f4f0] px-6 pt-2.5 pb-3 md:top-0 md:-mx-12 md:px-12 lg:hidden`}
        >
          {STEPS.map((step, i) => {
            const isCurrent = inView === step.n;
            return (
              <a
                key={step.n}
                href={`#step-${step.n}`}
                aria-current={isCurrent ? "step" : undefined}
                className="flex flex-col gap-[7px]"
              >
                <span
                  aria-hidden="true"
                  className={`h-[3px] transition-colors duration-200 ${
                    done[i] ? "bg-[#fe5545]" : isCurrent ? "bg-[#161513]" : "bg-[#cdc6b9]/75"
                  }`}
                />
                <span
                  className={`t-meta whitespace-nowrap text-[0.6875rem] tracking-[0.1em] ${
                    done[i] || isCurrent ? "text-[#161513]" : ""
                  }`}
                >
                  {step.n} · {step.bar}
                  {done[i] ? <span className="sr-only"> (done)</span> : null}
                </span>
              </a>
            );
          })}
        </nav>
      ) : null}

      {/* ── The form ───────────────────────────────────────────────── */}
      {/* method="post": if this form were ever submitted natively (before
          hydration, or with JS failing), the client's details go in a
          request body — never into the URL, history or server logs. */}
      <form method="post" noValidate onSubmit={onSubmit} aria-labelledby="enquiry-title" className="min-w-0">
        {!sent ? (
          <>
            {/* Step 1 */}
            <div
              id="step-1"
              data-step="1"
              className="scroll-mt-7 pt-8 pb-11 lg:scroll-mt-0 lg:pt-0 lg:pb-16"
            >
              <fieldset aria-describedby="step-1-help" className={FIELDSET}>
                <legend className="w-full p-0">
                  <span className="t-eyebrow mb-3 block">Step 1 of 3</span>
                  <h3 className="t-section">What is it about?</h3>
                </legend>
                <p id="step-1-help" className="t-body-sm mt-2.5">
                  Choose the closest one. Not sure? Choose &ldquo;Other&rdquo;.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-2 md:mt-7 md:gap-2.5 min-[68.8125rem]:grid-cols-3">
                  {MATTER_TYPES.map((m, i) => (
                    <Choice
                      key={m.value}
                      name="matterType"
                      value={m.value}
                      hint={m.hint}
                      checked={matterType === m.value}
                      onChange={() => setMatterType(m.value)}
                      inputRef={i === 0 ? firstChoiceRef : undefined}
                      hideHintOnPhone
                    />
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Step 2 */}
            <div
              id="step-2"
              data-step="2"
              className={`scroll-mt-7 border-t ${HAIR} pt-8 pb-11 lg:scroll-mt-0 lg:pt-12 lg:pb-16`}
            >
              <fieldset aria-describedby="step-2-help" className={FIELDSET}>
                <legend className="w-full p-0">
                  <span className="t-eyebrow mb-3 block">Step 2 of 3</span>
                  <h3 className="t-section">Tell us briefly</h3>
                </legend>
                <p id="step-2-help" className="t-body-sm mt-2.5">
                  A few lines is enough. You can write in Gujarati, Hindi or English.
                </p>
                <div className="mt-5 grid grid-cols-1 gap-[22px] md:mt-7 md:grid-cols-2 md:gap-x-6 md:gap-y-7">
                  <div className="md:col-span-2">
                    <label htmlFor="f-message" className="mb-2.5 flex items-baseline justify-between gap-3">
                      <span className="t-body leading-[1.4] text-[#161513]">Describe your matter</span>
                      <span className="t-meta tracking-[0.12em] text-[#161513]/60">Optional</span>
                    </label>
                    <textarea
                      id="f-message"
                      name="message"
                      rows={5}
                      maxLength={LIMITS.message}
                      value={values.message}
                      onChange={(e) => setField("message", e.target.value)}
                      placeholder="For example: village and survey number, what has happened so far, any date coming up"
                      className={`${INPUT} ${INPUT_OK} min-h-[148px] resize-y leading-[1.6]`}
                    />
                  </div>
                  {field("name", "Your name", "Required", {
                    type: "text",
                    autoComplete: "name",
                    placeholder: "e.g. Rajesh Patel",
                  })}
                  {field(
                    "phone",
                    "Phone",
                    "Phone or email",
                    {
                      type: "tel",
                      autoComplete: "tel",
                      inputMode: "tel",
                      placeholder: "+91 98765 43210",
                    },
                    "either-note",
                  )}
                  {field(
                    "email",
                    "Your email",
                    "Phone or email",
                    {
                      type: "email",
                      autoComplete: "email",
                      inputMode: "email",
                      placeholder: "name@example.com",
                    },
                    "either-note",
                    true,
                  )}
                  <p
                    id="either-note"
                    className="t-body-sm -mt-1.5 flex items-center gap-3 text-[#161513]/60 md:col-span-2 md:-mt-2"
                  >
                    <span aria-hidden="true" className="h-px w-3.5 flex-none bg-[#fe5545]" />
                    We need at least one way to reach you: a phone number or an email.
                  </p>
                </div>
              </fieldset>
            </div>

            {/* Step 3 */}
            <div
              id="step-3"
              data-step="3"
              className={`scroll-mt-7 border-t ${HAIR} pt-8 pb-5 lg:scroll-mt-0 lg:pt-12 lg:pb-8`}
            >
              <fieldset aria-describedby="reply-note" className={FIELDSET}>
                <legend className="w-full p-0">
                  <span className="t-eyebrow mb-3 block">Step 3 of 3</span>
                  <h3 className="t-section">How should we reply?</h3>
                </legend>
                <div className="mt-5 grid grid-cols-1 gap-2 md:mt-7 md:grid-cols-3 md:gap-2.5">
                  {REPLY_OPTIONS.map((r) => (
                    <Choice
                      key={r.value}
                      name="replyVia"
                      value={r.value}
                      hint={r.hint}
                      checked={replyVia === r.value}
                      onChange={() => setReplyVia(r.value)}
                      rowOnPhone
                    />
                  ))}
                </div>
                <p
                  id="reply-note"
                  className={`t-body-sm mt-4 min-h-[1.7em] ${
                    replyNoteBad ? "text-accent-ink" : "text-[#161513]/60"
                  }`}
                >
                  {replyNote}
                </p>
                <p className="sr-only" aria-live="polite">
                  {replyAnnounce}
                </p>
              </fieldset>
            </div>

            {/* Send */}
            <div className={`border-t ${HAIR} pt-7 md:pt-9`}>
              <div role="alert" aria-atomic="true">
                {alert ? (
                  <div
                    key={attempt}
                    className="mb-[18px] border-l-2 border-[#fe5545] bg-[#fff6f4] px-5 py-4 md:mb-6"
                  >
                    <p className="t-body-sm text-[#161513]">{alert}</p>
                  </div>
                ) : null}
              </div>
              <div className="grid grid-cols-1 items-center gap-[18px] md:grid-cols-[minmax(0,1fr)_auto] md:gap-x-12 md:gap-y-6">
                <p className="t-body-sm measure text-[#161513]/60">
                  Sending this form does not create an advocate&ndash;client relationship and is
                  not legal advice. {PRACTICE.shortName} practises in Gujarat, India.
                </p>
                <button
                  type="submit"
                  aria-disabled={status === "sending" || undefined}
                  className="t-action inline-flex min-h-16 w-full items-center justify-center gap-3.5 bg-[#fe5545] px-10 text-white transition-colors duration-200 hover:bg-[#161513] hover:text-[#f6f4f0] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#161513] aria-disabled:cursor-wait aria-disabled:bg-[#161513] aria-disabled:text-[#f6f4f0] md:w-auto"
                >
                  {status === "sending" ? "Sending…" : "Send enquiry"}{" "}
                  <span aria-hidden="true">→</span>
                </button>
                <p className="t-body-sm text-[#161513]/60 md:col-span-2">
                  Urgent, or a date coming up?{" "}
                  <a
                    href={`tel:${PRACTICE.telephone}`}
                    className="whitespace-nowrap border-b border-[#cdc6b9] text-[#161513] transition-colors duration-200 hover:border-[#fe5545]"
                  >
                    Call {PRACTICE.telephoneDisplay}
                  </a>{" "}
                  instead.
                </p>
              </div>
            </div>
          </>
        ) : (
          <section
            ref={successRef}
            tabIndex={-1}
            aria-labelledby="enquiry-sent"
            className="border-t border-[#161513] pt-8 focus:outline-none"
          >
            <div aria-hidden="true" className="mb-7 h-16 w-px bg-[#fe5545]" />
            <h3 id="enquiry-sent" className="t-section mb-3.5">
              Thank you, {receipt.first}. Your enquiry has been sent.
            </h3>
            <p className="t-body max-w-[52ch]">
              Adv. Savjani will reply by{" "}
              {receipt.reply === "Call" ? "phone" : receipt.reply === "WhatsApp" ? "WhatsApp" : "email"}{" "}
              within one working day (Mon–Sat). Urgent? Call {PRACTICE.telephoneDisplay}.
            </p>
            <dl className={`mt-6 mb-7 border-t ${HAIR}`}>
              {[
                ["Matter", receipt.matter],
                ["Reply by", `${receipt.reply} · ${receipt.to}`],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className={`grid grid-cols-[6.5rem_minmax(0,1fr)] border-b ${HAIR} py-3 md:grid-cols-[9rem_minmax(0,1fr)]`}
                >
                  <dt className="t-meta">{k}</dt>
                  <dd className="t-body-sm m-0 break-words text-[#161513]">{v}</dd>
                </div>
              ))}
            </dl>
            <button
              type="button"
              onClick={startAgain}
              className="t-action border-b border-[#161513] pb-[3px] text-[#161513] transition-colors duration-200 hover:border-[#fe5545] hover:text-accent-ink"
            >
              Send another enquiry
            </button>
          </section>
        )}
      </form>
    </div>
  );
}

/**
 * One tappable choice: a real radio input (visually hidden, still focusable
 * and announced) with the label's box as its hit area.
 */
function Choice({
  name,
  value,
  hint,
  checked,
  onChange,
  inputRef,
  hideHintOnPhone = false,
  rowOnPhone = false,
}: {
  name: string;
  value: string;
  hint: string;
  checked: boolean;
  onChange: () => void;
  inputRef?: Ref<HTMLInputElement>;
  hideHintOnPhone?: boolean;
  rowOnPhone?: boolean;
}) {
  return (
    <label className="relative block cursor-pointer">
      <input
        ref={inputRef}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className={`flex h-full min-h-[60px] border py-2.5 pr-[34px] pl-3.5 transition-colors duration-150 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#fe5545] md:min-h-[76px] md:py-3.5 md:pr-11 md:pl-[18px] ${
          rowOnPhone
            ? "flex-row items-center gap-3 md:flex-col md:items-stretch md:justify-center md:gap-0.5"
            : "flex-col justify-center gap-0.5"
        } ${
          checked
            ? "border-[#161513] bg-[#161513]"
            : "border-[#cdc6b9] bg-[#fbfaf7] hover:border-[#161513]"
        }`}
      >
        <span
          className={`t-body text-[0.9375rem] leading-[1.35] md:text-[1.0625rem] ${
            checked ? "text-[#f6f4f0]" : "text-[#161513]"
          }`}
        >
          {value}
        </span>
        <span
          className={`t-body-sm leading-[1.4] ${hideHintOnPhone ? "hidden md:block" : ""} ${
            checked ? "text-[#f6f4f0]/70" : "text-[#161513]/60"
          }`}
        >
          {hint}
        </span>
        <span
          aria-hidden="true"
          className={`absolute top-1/2 right-3 size-3 -translate-y-1/2 border md:right-4 md:size-3.5 ${
            checked ? "border-[#fe5545] bg-[#fe5545]" : "border-[#161513]/35"
          }`}
        />
      </span>
    </label>
  );
}
