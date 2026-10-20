/**
 * The /contact enquiry: its choices, limits and validation rules, shared by
 * the form (components/ui/contact-form.tsx) and the API route
 * (app/api/contact/route.ts) so the two can never disagree about what a
 * valid enquiry is. Pure TypeScript — safe to import on either side.
 */

/** "What is it about?" — in display order. `value` is what is stored. */
export const MATTER_TYPES = [
  { value: "Land dispute", hint: "Possession, boundary" },
  { value: "7/12 / revenue records", hint: "Entries, mutation, 8-A" },
  { value: "Sale deed / documentation", hint: "Deeds, title check, registration" },
  { value: "Agreement to sell", hint: "Banakhat, MOU" },
  { value: "Land acquisition", hint: "Compensation, objections" },
  { value: "Tenancy / tenure", hint: "New tenure, restricted land" },
  { value: "Appeal / court matter", hint: "Revenue appeal, High Court" },
  { value: "Other", hint: "Something else" },
] as const;

/** "How should we reply?" — in display order. */
export const REPLY_OPTIONS = [
  { value: "Call", hint: "We ring you back" },
  { value: "WhatsApp", hint: "A message on your number" },
  { value: "Email", hint: "A written reply" },
] as const;

export type MatterType = (typeof MATTER_TYPES)[number]["value"];
export type ReplyVia = (typeof REPLY_OPTIONS)[number]["value"];

/** Maximum lengths, in characters. Mirrored by the inputs' `maxLength`. */
export const LIMITS = {
  name: 120,
  phone: 32,
  email: 254,
  message: 5000,
} as const;

export type Enquiry = {
  name: string;
  phone: string;
  email: string;
  message: string;
  matterType: MatterType | "";
  replyVia: ReplyVia | "";
};

/** The fields that can be marked invalid, in the order they appear. */
export const ERROR_FIELDS = ["name", "phone", "email"] as const;
export type ErrorField = (typeof ERROR_FIELDS)[number];
export type FieldErrors = Partial<Record<ErrorField, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isMatterType(v: unknown): v is MatterType {
  return MATTER_TYPES.some((m) => m.value === v);
}
export function isReplyVia(v: unknown): v is ReplyVia {
  return REPLY_OPTIONS.some((r) => r.value === v);
}

/**
 * The field-level rules, worded as the client sees them:
 * · a name is required;
 * · at least one of phone or email;
 * · the reply method decides which of the two is needed (Call / WhatsApp →
 *   phone, Email → email);
 * · an email, if given, must look complete. A phone number is taken as
 *   written (Gujarati numerals, two numbers, a note) — only its length is
 *   capped, by LIMITS.phone.
 * The type of matter and the reply method themselves are optional.
 */
export function enquiryErrors(e: Enquiry): FieldErrors {
  const errors: FieldErrors = {};
  const name = e.name.trim();
  const phone = e.phone.trim();
  const email = e.email.trim();

  if (!name) errors.name = "Please tell us your name.";

  if (!phone && (e.replyVia === "Call" || e.replyVia === "WhatsApp")) {
    errors.phone = `You chose a ${
      e.replyVia === "Call" ? "call" : "WhatsApp reply"
    }. Please add the number.`;
  } else if (!phone && !email) {
    errors.phone = "Add a phone number or an email, so we can reply.";
  }

  if (!email && e.replyVia === "Email") {
    errors.email = "You chose an email reply. Please add your email.";
  } else if (email && !EMAIL_RE.test(email)) {
    errors.email = "This email doesn’t look complete. Please check it.";
  }

  return errors;
}

/**
 * When no reply method was chosen: a call if there is a number, otherwise
 * an email. This is what the client is told after sending, so it is also
 * what is sent and stored.
 */
export function effectiveReply(e: Pick<Enquiry, "phone" | "replyVia">): ReplyVia {
  return e.replyVia || (e.phone.trim() ? "Call" : "Email");
}

export type ParseResult =
  | { ok: true; enquiry: Enquiry }
  | { ok: false; error: string; fields?: FieldErrors };

/**
 * Server-side: turn an untrusted JSON body into an Enquiry, or say why not.
 * Checks types, lengths and allowed values before the field rules above.
 */
export function parseEnquiry(body: unknown): ParseResult {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { ok: false, error: "The enquiry was not in the expected format." };
  }
  const raw = body as Record<string, unknown>;

  const text = (key: keyof typeof LIMITS): string | null => {
    const v = raw[key];
    if (v === undefined || v === null) return "";
    if (typeof v !== "string") return null;
    return v.trim();
  };

  const name = text("name");
  const phone = text("phone");
  const email = text("email");
  const message = text("message");
  if (name === null || phone === null || email === null || message === null) {
    return { ok: false, error: "The enquiry was not in the expected format." };
  }
  for (const [key, value] of Object.entries({ name, phone, email, message })) {
    if (value.length > LIMITS[key as keyof typeof LIMITS]) {
      return { ok: false, error: `The ${key} is too long.` };
    }
  }

  const matterRaw = raw.matterType ?? "";
  const replyRaw = raw.replyVia ?? "";
  if (matterRaw !== "" && !isMatterType(matterRaw)) {
    return { ok: false, error: "Unknown type of matter." };
  }
  if (replyRaw !== "" && !isReplyVia(replyRaw)) {
    return { ok: false, error: "Unknown reply method." };
  }

  const enquiry: Enquiry = {
    name,
    phone,
    email,
    message,
    matterType: matterRaw as MatterType | "",
    replyVia: replyRaw as ReplyVia | "",
  };
  const fields = enquiryErrors(enquiry);
  if (Object.keys(fields).length) {
    return { ok: false, error: "Some details are missing or incomplete.", fields };
  }
  return { ok: true, enquiry };
}
