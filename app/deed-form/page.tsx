"use client";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

/*
 * Palette for this page only: "Paper & Vermilion" — a bright, legible theme
 * for a form clients fill on their phone, reusing the site's existing
 * accent red (#FE5545) so it still reads as the same practice.
 * bg #FAF7F2 · ink #1A1A1A · muted #6B6B6B · accent #FE5545 · line #E4DED4
 */

/* ── Office contact — used by the Send buttons ─────────────────────────── */
const OFFICE = {
  whatsapp: "918128800351",
  email: "adv.krupalsavjani@gmail.com",
};
const STORE_KEY = "deedDetailsForm.v3";
const CONTACTS_KEY = "deedDetailsForm.contacts.v1";
const MAX_CONTACTS = 500;

const DOC_OPTIONS = [
  "Sale Deed",
  "Agreement to Sell (Notarised)",
  "Agreement to Sell (Registered)",
  "MOU",
];
function isATS(doc: string) {
  return doc === "Agreement to Sell (Notarised)" || doc === "Agreement to Sell (Registered)";
}

const WITNESS_MAX = 2;
const PAYMENT_MAX = 5;
const PAYMENT_MODES = ["Cheque", "RTGS", "NEFT", "IMPS", "UPI", "DD", "Cash"];

type Party = {
  name: string;
  age: string;
  occupation: string;
  aadhaar: string;
  pan: string;
  address: string;
};
type Payment = { date: string; amount: string; mode: string; ref: string };

const emptyParty = (): Party => ({ name: "", age: "", occupation: "", aadhaar: "", pan: "", address: "" });
const emptyPayment = (): Payment => ({ date: "", amount: "", mode: "", ref: "" });

/* ── Saved contacts (this browser only) — autofill repeat parties ────── */
type Contact = Party & { updatedAt: number };
function loadContacts(): Contact[] {
  try {
    const raw = localStorage.getItem(CONTACTS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function findContact(contacts: Contact[], name: string): Contact | undefined {
  const key = name.trim().toLowerCase();
  if (!key) return undefined;
  return contacts
    .filter((c) => c.name.trim().toLowerCase() === key)
    .sort((a, b) => b.updatedAt - a.updatedAt)[0];
}

type FormState = {
  doc: string;
  village: string;
  taluka: string;
  district: string;
  surveyNew: string;
  surveyOld: string;
  area: string;
  zone: string;
  tp: string;
  fp: string;
  fpSize: string;
  sellers: Party[];
  buyers: Party[];
  witnesses: Party[];
  consideration: string;
  dueDate: string;
  paymentCount: number;
  payments: Payment[];
  senderName: string;
  senderMobile: string;
};

function initialState(): FormState {
  return {
    doc: "",
    village: "",
    taluka: "",
    district: "",
    surveyNew: "",
    surveyOld: "",
    area: "",
    zone: "",
    tp: "",
    fp: "",
    fpSize: "",
    sellers: [emptyParty()],
    buyers: [emptyParty()],
    witnesses: [emptyParty()],
    consideration: "",
    dueDate: "",
    paymentCount: 0,
    payments: Array.from({ length: PAYMENT_MAX }, emptyPayment),
    senderName: "",
    senderMobile: "",
  };
}

/* ── Formatting helpers ─────────────────────────────────────────────── */
function onlyDigits(s: string) {
  return (s || "").replace(/\D/g, "");
}
function fmtINR(numStr: string): string {
  const d = onlyDigits(numStr).replace(/^0+(?=\d)/, "");
  if (!d) return "";
  let last3 = d.slice(-3);
  const rest = d.slice(0, -3);
  if (rest) last3 = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3;
  return last3;
}
function fmtAadhaar(s: string): string {
  const d = onlyDigits(s);
  return d.length === 12 ? d.replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3") : (s || "").trim();
}
function fmtDateDMY(v: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((v || "").trim());
  return m ? `${m[3]}-${m[2]}-${m[1]}` : (v || "").trim();
}
function fmtArea(v: string): string {
  const t = (v || "").trim();
  if (!t) return "";
  const n = Number(t.replace(/,/g, ""));
  if (Number.isNaN(n)) return `${t} sq. mtrs`;
  const parts = String(n).split(".");
  return `${fmtINR(parts[0])}${parts[1] ? "." + parts[1] : ""} sq. mtrs`;
}
function show(v: string): string {
  return v && v.trim() ? v.trim() : "—";
}
function isValidPAN(v: string) {
  const up = v.toUpperCase().trim();
  return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(up) || /^form\s*60$/i.test(up);
}
function isValidMobile(v: string) {
  return onlyDigits(v).replace(/^91(?=\d{10}$)/, "").length === 10;
}

/* ── Validation ─────────────────────────────────────────────────────── */
function runValidation(state: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!state.doc) errors.doc = "Select one document type";

  const req = (id: string, v: string, msg: string) => {
    if (!v.trim()) errors[id] = msg;
  };
  req("village", state.village, "Enter the village");
  req("taluka", state.taluka, "Enter the taluka");
  req("district", state.district, "Enter the district");
  req("surveyNew", state.surveyNew, "Enter the new survey / block number");
  req("area", state.area, "Enter the area being sold");
  req("consideration", state.consideration, "Enter the total consideration amount");
  req("senderName", state.senderName, "Enter your name");

  if (!state.senderMobile.trim() || !isValidMobile(state.senderMobile)) {
    errors.senderMobile = "Enter a 10-digit mobile number";
  }
  if (isATS(state.doc)) req("dueDate", state.dueDate, "Enter the date by which the balance is payable");

  function checkParty(prefix: string, p: Party, requireOccupation: boolean) {
    if (!p.name.trim()) errors[prefix + "name"] = "Required";
    if (requireOccupation && !p.occupation.trim()) errors[prefix + "occupation"] = "Required";
    if (onlyDigits(p.aadhaar).length !== 12) errors[prefix + "aadhaar"] = "Aadhaar number must be 12 digits";
    if (!isValidPAN(p.pan)) errors[prefix + "pan"] = "Enter 10-character PAN (like ABCDE1234F) or write Form 60";
    if (!p.address.trim()) errors[prefix + "address"] = "Required";
  }
  state.sellers.forEach((p, i) => checkParty(`seller-${i}-`, p, true));
  state.buyers.forEach((p, i) => checkParty(`buyer-${i}-`, p, true));
  state.witnesses.forEach((p, i) => checkParty(`witness-${i}-`, p, false));

  for (let i = 0; i < state.paymentCount; i++) {
    const p = state.payments[i];
    const prefix = `payment-${i}-`;
    if (!p.date) errors[prefix + "date"] = "Required";
    if (!onlyDigits(p.amount)) errors[prefix + "amount"] = "Required";
    if (!p.mode) errors[prefix + "mode"] = "Required";
  }
  return errors;
}

/* ── WhatsApp-style message builder ────────────────────────────────── */
function buildText(state: FormState): string {
  const L: string[] = [];
  L.push("*DEED DETAILS FORM*");
  L.push(`Document: ${show(state.doc)}`);
  L.push("");
  L.push("*LAND*");
  L.push(`Village: ${show(state.village)}`);
  L.push(`Taluka: ${show(state.taluka)}`);
  L.push(`District: ${show(state.district)}`);
  L.push(`Survey No. (New): ${show(state.surveyNew)}`);
  L.push(`Survey No. (Old): ${show(state.surveyOld)}`);
  L.push(`Sellable Area: ${show(fmtArea(state.area))}`);
  L.push(`Zone: ${show(state.zone)}`);
  L.push(`TP Scheme No.: ${show(state.tp)}`);
  L.push(`Final Plot No.: ${show(state.fp)}`);
  L.push(`Final Plot Size: ${show(fmtArea(state.fpSize))}`);

  function pushParty(label: string, p: Party, i: number, includeOccupation: boolean) {
    L.push("");
    L.push(`*${label} ${i + 1}*`);
    L.push(`Name: ${show(p.name)}`);
    L.push(`Age: ${show(p.age)}`);
    if (includeOccupation) L.push(`Occupation: ${show(p.occupation)}`);
    L.push(`Aadhaar: ${show(fmtAadhaar(p.aadhaar))}`);
    L.push(`PAN: ${show(p.pan.toUpperCase())}`);
    L.push(`Address: ${show(p.address.replace(/[\s,]*\n[\s,]*/g, ", "))}`);
  }

  L.push("");
  L.push("*SELLERS*");
  state.sellers.forEach((p, i) => pushParty("SELLER", p, i, true));

  L.push("");
  L.push("*BUYERS*");
  state.buyers.forEach((p, i) => pushParty("BUYER", p, i, true));

  L.push("");
  L.push("*WITNESSES*");
  state.witnesses.forEach((p, i) => pushParty("WITNESS", p, i, false));

  L.push("");
  L.push("*PAYMENT*");
  const cons = onlyDigits(state.consideration);
  L.push(`Total Consideration: ${cons ? "Rs. " + fmtINR(cons) : "—"}`);
  if (isATS(state.doc)) L.push(`Payment Due Date: ${show(fmtDateDMY(state.dueDate))}`);

  let paid = 0;
  let anyPaid = false;
  if (state.paymentCount === 0) {
    L.push("Payments made: None");
  } else {
    for (let i = 0; i < state.paymentCount; i++) {
      const p = state.payments[i];
      const amt = onlyDigits(p.amount);
      if (amt) {
        paid += Number(amt);
        anyPaid = true;
      }
      L.push(
        `Paid ${i + 1}: ${show(fmtDateDMY(p.date))} · ${amt ? "Rs. " + fmtINR(amt) : "—"} · ${show(p.mode)} · ${show(p.ref)}`
      );
    }
  }
  if (cons && anyPaid) {
    L.push(`Total Paid: Rs. ${fmtINR(String(paid))}`);
    L.push(`Balance: Rs. ${fmtINR(String(Math.max(0, Number(cons) - paid)))}`);
  }

  L.push("");
  L.push("*SENT BY*");
  L.push(`Name: ${show(state.senderName)}`);
  L.push(`Mobile: ${show(state.senderMobile)}`);
  const now = new Date();
  L.push(`Filled on: ${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-${now.getFullYear()}`);
  return L.join("\n");
}

function subjectLine(state: FormState): string {
  const parts: string[] = [];
  if (state.surveyNew) parts.push(`Survey No. ${state.surveyNew}`);
  if (state.village) parts.push(state.village);
  return "Deed Details" + (parts.length ? " – " + parts.join(", ") : "");
}

/* ── Small presentational pieces ───────────────────────────────────── */
function SectionHeading({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-headline italic text-3xl text-[#FE5545]">{n}</span>
      <h2 className="font-headline italic text-3xl text-[#1A1A1A]">{title}</h2>
    </div>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "font-label font-semibold uppercase tracking-[0.15em] text-[10px] bg-[#FE5545] text-white px-4 py-2.5"
          : "font-label font-semibold uppercase tracking-[0.15em] text-[10px] text-[#6B6B6B] border border-[#E4DED4] px-4 py-2.5 hover:border-[#FE5545] hover:text-[#1A1A1A] transition-colors duration-300"
      }
    >
      {label}
    </button>
  );
}

function CountChips({
  min,
  max,
  value,
  onChange,
  label,
}: {
  min: number;
  max: number;
  value: number;
  onChange: (n: number) => void;
  label: string;
}) {
  const options: number[] = [];
  for (let n = min; n <= max; n++) options.push(n);
  return (
    <div className="mb-8">
      <p className="font-label font-semibold uppercase tracking-[0.15em] text-[10px] text-[#6B6B6B] mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((n) => (
          <Chip key={n} label={n === 0 ? "None" : String(n)} active={value === n} onClick={() => onChange(n)} />
        ))}
      </div>
    </div>
  );
}

function RequiredMark() {
  return (
    <span className="text-[#FE5545]" aria-hidden="true">
      {" "}*
    </span>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  mono?: boolean;
  unit?: string;
  prefix?: string;
  type?: string;
  inputMode?: "numeric" | "decimal" | "tel" | "text";
  maxLength?: number;
  required?: boolean;
  hint?: string;
  hintOk?: boolean;
  listOptions?: string[];
};
function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  mono,
  unit,
  prefix,
  type = "text",
  inputMode,
  maxLength,
  required,
  hint,
  hintOk,
  listOptions,
}: FieldProps) {
  const listId = listOptions && listOptions.length > 0 ? `${id}-list` : undefined;
  return (
    <div className="flex flex-col gap-2 min-w-0">
      <label htmlFor={id} className="font-label font-semibold uppercase tracking-[0.15em] text-[10px] text-[#6B6B6B]">
        {label}
        {required && <RequiredMark />}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-sm text-[#1A1A1A]/40 pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={type}
          inputMode={inputMode}
          maxLength={maxLength}
          list={listId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full bg-transparent border-0 border-b py-2.5 text-sm text-[#1A1A1A] placeholder:text-black/25 focus:outline-none transition-colors ${
            mono ? "font-mono" : "font-label"
          } ${prefix ? "pl-7" : "pl-0"} ${unit ? "pr-16" : "pr-0"} ${
            error ? "border-[#FE5545]" : "border-[#E4DED4] focus:border-[#FE5545]"
          }`}
        />
        {listId && (
          <datalist id={listId}>
            {listOptions!.map((o) => (
              <option key={o} value={o} />
            ))}
          </datalist>
        )}
        {unit && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2 font-label text-[11px] text-[#6B6B6B] pointer-events-none">
            {unit}
          </span>
        )}
      </div>
      {(error || hint) && (
        <div className="flex items-center justify-between gap-2">
          {error && <p className="text-[11px] text-[#FE5545]">{error}</p>}
          {hint && (
            <span
              className={`ml-auto font-mono text-[11px] ${hintOk ? "text-[#1A9F5C]" : "text-[#6B6B6B]"}`}
            >
              {hint}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function TextAreaField({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 min-w-0">
      <label htmlFor={id} className="font-label font-semibold uppercase tracking-[0.15em] text-[10px] text-[#6B6B6B]">
        {label}
        {required && <RequiredMark />}
      </label>
      <textarea
        id={id}
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-transparent border-0 border-b py-2.5 font-label text-sm text-[#1A1A1A] placeholder:text-black/25 focus:outline-none transition-colors resize-none ${
          error ? "border-[#FE5545]" : "border-[#E4DED4] focus:border-[#FE5545]"
        }`}
      />
      {error && <p className="text-[11px] text-[#FE5545]">{error}</p>}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  error,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 min-w-0">
      <label htmlFor={id} className="font-label font-semibold uppercase tracking-[0.15em] text-[10px] text-[#6B6B6B]">
        {label}
        {required && <RequiredMark />}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-transparent border-0 border-b py-2.5 font-label text-sm text-[#1A1A1A] focus:outline-none transition-colors ${
          error ? "border-[#FE5545]" : "border-[#E4DED4] focus:border-[#FE5545]"
        }`}
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <p className="text-[11px] text-[#FE5545]">{error}</p>}
    </div>
  );
}

function PartyCard({
  group,
  index,
  value,
  onChange,
  errors,
  onRemove,
  contacts,
  onAutofill,
}: {
  group: "seller" | "buyer" | "witness";
  index: number;
  value: Party;
  onChange: (key: keyof Party, v: string) => void;
  errors: Record<string, string>;
  onRemove?: () => void;
  contacts: Contact[];
  onAutofill?: (msg: string) => void;
}) {
  const idPrefix = `${group}-${index}-`;
  const label = group.charAt(0).toUpperCase() + group.slice(1);
  const nameOptions = Array.from(new Set(contacts.map((c) => c.name.trim()).filter(Boolean))).sort();

  function handleNameChange(v: string) {
    onChange("name", v);
    const match = findContact(contacts, v);
    if (!match) return;
    const fields: (keyof Party)[] = group === "witness" ? ["age", "aadhaar", "pan", "address"] : ["age", "occupation", "aadhaar", "pan", "address"];
    let filled = false;
    fields.forEach((f) => {
      if (!value[f] && match[f]) {
        onChange(f, match[f]);
        filled = true;
      }
    });
    if (filled) onAutofill?.(`Filled details for ${match.name.trim()}`);
  }

  return (
    <fieldset className="bg-white border border-[#E4DED4] p-6 md:p-8 mb-6">
      <legend className="flex items-center justify-between w-full gap-3 px-2">
        <span className="flex items-center gap-3">
          <span className="font-headline italic text-2xl text-[#FE5545]">{String(index + 1).padStart(2, "0")}</span>
          <span className="font-label font-semibold uppercase tracking-[0.2em] text-xs text-[#1A1A1A]/70">
            {label} {index + 1}
          </span>
        </span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="font-label font-semibold uppercase tracking-[0.15em] text-[10px] text-[#6B6B6B] underline underline-offset-4 hover:text-[#FE5545] transition-colors"
          >
            Remove
          </button>
        )}
      </legend>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        <TextField
          id={idPrefix + "name"}
          label="Full Name"
          placeholder="As printed on Aadhaar card"
          value={value.name}
          onChange={handleNameChange}
          error={errors[idPrefix + "name"]}
          listOptions={nameOptions}
          required
        />
        <TextField
          id={idPrefix + "age"}
          label="Age"
          placeholder="Years"
          mono
          inputMode="numeric"
          maxLength={3}
          value={value.age}
          onChange={(v) => onChange("age", onlyDigits(v))}
        />
        {group !== "witness" && (
          <TextField
            id={idPrefix + "occupation"}
            label="Occupation"
            placeholder="Agriculture / Business / Service"
            value={value.occupation}
            onChange={(v) => onChange("occupation", v)}
            error={errors[idPrefix + "occupation"]}
            required
          />
        )}
        <TextField
          id={idPrefix + "aadhaar"}
          label="Aadhaar No."
          placeholder="12 digits"
          mono
          inputMode="numeric"
          maxLength={14}
          value={value.aadhaar}
          onChange={(v) => onChange("aadhaar", v)}
          error={errors[idPrefix + "aadhaar"]}
          hint={`${onlyDigits(value.aadhaar).length}/12`}
          hintOk={onlyDigits(value.aadhaar).length === 12}
          required
        />
        <TextField
          id={idPrefix + "pan"}
          label="PAN No."
          placeholder="ABCDE1234F"
          mono
          maxLength={10}
          value={value.pan}
          onChange={(v) => onChange("pan", v.toUpperCase())}
          error={errors[idPrefix + "pan"]}
          required
        />
        <div className="md:col-span-2 lg:col-span-3">
          <TextAreaField
            id={idPrefix + "address"}
            label="Address"
            placeholder="House / street, village or city, taluka, district, PIN"
            value={value.address}
            onChange={(v) => onChange("address", v)}
            error={errors[idPrefix + "address"]}
            required
          />
        </div>
      </div>
    </fieldset>
  );
}

function AddPartyButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-4 font-label font-semibold uppercase tracking-[0.2em] text-xs border border-dashed border-[#E4DED4] text-[#6B6B6B] hover:border-[#FE5545] hover:text-[#1A1A1A] transition-colors duration-300"
    >
      <span className="text-[#FE5545]">+</span> {label}
    </button>
  );
}

function PaymentCard({
  index,
  value,
  onChange,
  errors,
}: {
  index: number;
  value: Payment;
  onChange: (key: keyof Payment, v: string) => void;
  errors: Record<string, string>;
}) {
  const idPrefix = `payment-${index}-`;
  return (
    <fieldset className="bg-white border border-[#E4DED4] p-6 md:p-8 mb-6">
      <legend className="flex items-center gap-3 px-2">
        <span className="font-headline italic text-2xl text-[#FE5545]">{String(index + 1).padStart(2, "0")}</span>
        <span className="font-label font-semibold uppercase tracking-[0.2em] text-xs text-[#1A1A1A]/70">Payment {index + 1}</span>
      </legend>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        <TextField
          id={idPrefix + "date"}
          label="Date"
          type="date"
          mono
          value={value.date}
          onChange={(v) => onChange("date", v)}
          error={errors[idPrefix + "date"]}
          required
        />
        <TextField
          id={idPrefix + "amount"}
          label="Amount"
          placeholder="e.g. 5,00,000"
          mono
          inputMode="numeric"
          prefix="Rs."
          value={value.amount}
          onChange={(v) => onChange("amount", v)}
          onBlur={() => onChange("amount", fmtINR(value.amount))}
          error={errors[idPrefix + "amount"]}
          required
        />
        <SelectField
          id={idPrefix + "mode"}
          label="Mode"
          value={value.mode}
          onChange={(v) => onChange("mode", v)}
          options={PAYMENT_MODES}
          error={errors[idPrefix + "mode"]}
          required
        />
        <TextField
          id={idPrefix + "ref"}
          label="UTR / Cheque No."
          placeholder="Transaction or cheque number"
          mono
          value={value.ref}
          onChange={(v) => onChange("ref", v)}
        />
      </div>
    </fieldset>
  );
}

/* ── Page ───────────────────────────────────────────────────────────── */
export default function DeedFormPage() {
  const [state, setState] = useState<FormState>(initialState());
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPanel, setShowPanel] = useState(false);
  const [previewText, setPreviewText] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [clearArmed, setClearArmed] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Restore any in-progress form from this browser
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setState({ ...initialState(), ...JSON.parse(raw) });
    } catch {
      /* storage unavailable */
    }
    setContacts(loadContacts());
    setHydrated(true);
  }, []);

  // Debounced autosave — also upserts any fully-identified party into
  // the saved-contacts list (keyed by Aadhaar) so future forms can
  // autofill repeat sellers/buyers/witnesses by name.
  useEffect(() => {
    if (!hydrated) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(state));
      } catch {
        /* storage unavailable */
      }
      const complete = [...state.sellers, ...state.buyers, ...state.witnesses].filter(
        (p) => p.name.trim() && onlyDigits(p.aadhaar).length === 12
      );
      if (complete.length === 0) return;
      setContacts((prev) => {
        const byAadhaar = new Map(prev.map((c) => [onlyDigits(c.aadhaar), c]));
        const now = Date.now();
        complete.forEach((p) => byAadhaar.set(onlyDigits(p.aadhaar), { ...p, updatedAt: now }));
        let next = Array.from(byAadhaar.values()).sort((a, b) => b.updatedAt - a.updatedAt);
        if (next.length > MAX_CONTACTS) next = next.slice(0, MAX_CONTACTS);
        try {
          localStorage.setItem(CONTACTS_KEY, JSON.stringify(next));
        } catch {
          /* storage unavailable */
        }
        return next;
      });
    }, 250);
  }, [state, hydrated]);

  // Live re-validate once the user has attempted a submit
  useEffect(() => {
    if (attempted) setErrors(runValidation(state));
  }, [state, attempted]);

  function update(patch: Partial<FormState>) {
    setState((s) => ({ ...s, ...patch }));
  }
  function updateParty(group: "sellers" | "buyers" | "witnesses", index: number, key: keyof Party, v: string) {
    setState((s) => {
      const list = [...s[group]];
      list[index] = { ...list[index], [key]: v };
      return { ...s, [group]: list };
    });
  }
  function addParty(group: "sellers" | "buyers" | "witnesses") {
    setState((s) => {
      if (group === "witnesses" && s.witnesses.length >= WITNESS_MAX) return s;
      return { ...s, [group]: [...s[group], emptyParty()] };
    });
  }
  function removeParty(group: "sellers" | "buyers" | "witnesses", index: number) {
    setState((s) => {
      if (s[group].length <= 1) return s;
      return { ...s, [group]: s[group].filter((_, i) => i !== index) };
    });
  }
  function updatePayment(index: number, key: keyof Payment, v: string) {
    setState((s) => {
      const list = [...s.payments];
      list[index] = { ...list[index], [key]: v };
      return { ...s, payments: list };
    });
  }

  function toast(msg: string) {
    setToastMsg(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 2200);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAttempted(true);
    const errs = runValidation(state);
    setErrors(errs);
    const keys = Object.keys(errs);
    if (keys.length > 0) {
      setShowPanel(false);
      const target = document.getElementById(keys[0]);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => target.focus?.(), 350);
      }
      return;
    }
    setPreviewText(buildText(state));
    setShowPanel(true);
    setTimeout(() => document.getElementById("send-panel")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(previewText);
      toast("Message copied");
    } catch {
      toast("Long-press the message to copy it");
    }
  }

  function handleClear() {
    if (!clearArmed) {
      setClearArmed(true);
      clearTimer.current = setTimeout(() => setClearArmed(false), 4000);
      return;
    }
    clearTimeout(clearTimer.current);
    setClearArmed(false);
    setState(initialState());
    setErrors({});
    setAttempted(false);
    setShowPanel(false);
    try {
      localStorage.removeItem(STORE_KEY);
    } catch {
      /* storage unavailable */
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast("Form cleared");
  }

  const showDue = isATS(state.doc);
  const waHref = `https://wa.me/${OFFICE.whatsapp}?text=${encodeURIComponent(previewText)}`;
  const mailHref = `mailto:${OFFICE.email}?subject=${encodeURIComponent(subjectLine(state))}&body=${encodeURIComponent(previewText)}`;
  const errorCount = Object.keys(errors).length;

  return (
    <main className="bg-[#FAF7F2] text-[#1A1A1A]">
      <Navbar />

      <section className="pt-40 pb-12 px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <p className="font-label font-semibold uppercase tracking-[0.3em] text-[11px] text-[#FE5545] mb-4">Client Intake</p>
            <h1
              className="font-headline italic leading-[0.9] tracking-tighter text-[#1A1A1A]"
              style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
            >
              Deed Details Form
            </h1>
          </div>
          <div className="lg:col-span-4 lg:text-right pb-2">
            <p className="max-w-sm lg:ml-auto font-light leading-relaxed text-sm text-[#6B6B6B]">
              For Agreement to Sell (ATS) and Sale Deed. Fill every field below, then send it directly on WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <form id="deedForm" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <section id="sec-doc" className="px-8 md:px-12 py-12 border-t border-[#E4DED4]">
          <SectionHeading n="01" title="Document" />
          <p className="font-label font-semibold uppercase tracking-[0.15em] text-[10px] text-[#6B6B6B] mb-4">
            Which document is to be prepared?
            <RequiredMark />
          </p>
          <div id="doc" className="flex flex-wrap gap-3">
            {DOC_OPTIONS.map((opt) => (
              <Chip key={opt} label={opt} active={state.doc === opt} onClick={() => update({ doc: opt })} />
            ))}
          </div>
          {errors.doc && <p className="text-[11px] text-[#FE5545] mt-3">{errors.doc}</p>}
        </section>

        <section id="sec-land" className="px-8 md:px-12 py-12 border-t border-[#E4DED4]">
          <SectionHeading n="02" title="Land" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
            <TextField id="village" label="Village" placeholder="e.g. Sangasar" value={state.village} onChange={(v) => update({ village: v })} error={errors.village} required />
            <TextField id="taluka" label="Taluka" placeholder="e.g. Dholera" value={state.taluka} onChange={(v) => update({ taluka: v })} error={errors.taluka} required />
            <TextField id="district" label="District" placeholder="e.g. Ahmedabad" value={state.district} onChange={(v) => update({ district: v })} error={errors.district} required />
            <TextField id="surveyNew" label="Survey No. (New)" placeholder="e.g. 125/2 or 410 Paiki 1" mono value={state.surveyNew} onChange={(v) => update({ surveyNew: v })} error={errors.surveyNew} required />
            <TextField id="surveyOld" label="Survey No. (Old)" placeholder="Old number, if any" mono value={state.surveyOld} onChange={(v) => update({ surveyOld: v })} />
            <TextField id="area" label="Sellable Area" placeholder="e.g. 10000" mono inputMode="decimal" unit="sq. mtrs" value={state.area} onChange={(v) => update({ area: v })} error={errors.area} required />
            <TextField id="zone" label="Zone" placeholder="e.g. Residential" value={state.zone} onChange={(v) => update({ zone: v })} />
            <TextField id="tp" label="TP Scheme No." placeholder="e.g. 3" mono value={state.tp} onChange={(v) => update({ tp: v })} />
            <TextField id="fp" label="Final Plot No." placeholder="e.g. 210" mono value={state.fp} onChange={(v) => update({ fp: v })} />
            <TextField id="fpSize" label="Final Plot Size" placeholder="e.g. 5000" mono inputMode="decimal" unit="sq. mtrs" value={state.fpSize} onChange={(v) => update({ fpSize: v })} />
          </div>
        </section>

        <section id="sec-seller" className="px-8 md:px-12 py-12 border-t border-[#E4DED4]">
          <SectionHeading n="03" title="Sellers" />
          {state.sellers.map((p, i) => (
            <PartyCard
              key={i}
              group="seller"
              index={i}
              value={p}
              onChange={(k, v) => updateParty("sellers", i, k, v)}
              errors={errors}
              onRemove={state.sellers.length > 1 ? () => removeParty("sellers", i) : undefined}
              contacts={contacts}
              onAutofill={toast}
            />
          ))}
          <AddPartyButton label="Add Another Seller" onClick={() => addParty("sellers")} />
        </section>

        <section id="sec-buyer" className="px-8 md:px-12 py-12 border-t border-[#E4DED4]">
          <SectionHeading n="04" title="Buyers" />
          {state.buyers.map((p, i) => (
            <PartyCard
              key={i}
              group="buyer"
              index={i}
              value={p}
              onChange={(k, v) => updateParty("buyers", i, k, v)}
              errors={errors}
              onRemove={state.buyers.length > 1 ? () => removeParty("buyers", i) : undefined}
              contacts={contacts}
              onAutofill={toast}
            />
          ))}
          <AddPartyButton label="Add Another Buyer" onClick={() => addParty("buyers")} />
        </section>

        <section id="sec-witness" className="px-8 md:px-12 py-12 border-t border-[#E4DED4]">
          <SectionHeading n="05" title="Witnesses" />
          {state.witnesses.map((p, i) => (
            <PartyCard
              key={i}
              group="witness"
              index={i}
              value={p}
              onChange={(k, v) => updateParty("witnesses", i, k, v)}
              errors={errors}
              onRemove={state.witnesses.length > 1 ? () => removeParty("witnesses", i) : undefined}
              contacts={contacts}
              onAutofill={toast}
            />
          ))}
          {state.witnesses.length < WITNESS_MAX && (
            <AddPartyButton label="Add Another Witness" onClick={() => addParty("witnesses")} />
          )}
        </section>

        <section id="sec-payment" className="px-8 md:px-12 py-12 border-t border-[#E4DED4]">
          <SectionHeading n="06" title="Payment" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mb-8">
            <TextField
              id="consideration"
              label="Total Consideration"
              placeholder="e.g. 50,00,000"
              mono
              inputMode="numeric"
              prefix="Rs."
              value={state.consideration}
              onChange={(v) => update({ consideration: v })}
              onBlur={() => update({ consideration: fmtINR(state.consideration) })}
              error={errors.consideration}
              required
            />
            {showDue && (
              <TextField id="dueDate" label="Payment Due Date" type="date" mono value={state.dueDate} onChange={(v) => update({ dueDate: v })} error={errors.dueDate} required />
            )}
          </div>
          <CountChips min={0} max={PAYMENT_MAX} value={state.paymentCount} onChange={(n) => update({ paymentCount: n })} label="Payments already made?" />
          {Array.from({ length: state.paymentCount }).map((_, i) => (
            <PaymentCard key={i} index={i} value={state.payments[i]} onChange={(k, v) => updatePayment(i, k, v)} errors={errors} />
          ))}
        </section>

        <section id="sec-send" className="px-8 md:px-12 py-12 border-t border-[#E4DED4]">
          <SectionHeading n="07" title="Send" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mb-10">
            <TextField id="senderName" label="Your Name" placeholder="Person filling this form" value={state.senderName} onChange={(v) => update({ senderName: v })} error={errors.senderName} required />
            <TextField id="senderMobile" label="Your Mobile No." placeholder="10-digit mobile" type="tel" mono inputMode="tel" value={state.senderMobile} onChange={(v) => update({ senderMobile: v })} error={errors.senderMobile} required />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FE5545] text-white px-8 py-5 font-label font-semibold uppercase tracking-[0.25em] text-sm hover:bg-[#1A1A1A] hover:text-[#FAF7F2] transition-colors duration-300"
          >
            Review &amp; Send
          </button>

          {attempted && !showPanel && errorCount > 0 && (
            <p className="mt-4 text-sm text-[#FE5545]" role="alert">
              {errorCount === 1
                ? "1 field still needs to be filled. It is marked above."
                : `${errorCount} fields still need to be filled. They are marked above.`}
            </p>
          )}

          {showPanel && (
            <div id="send-panel" className="mt-10">
              <p className="font-label font-semibold uppercase tracking-[0.15em] text-[10px] text-[#6B6B6B] mb-4">
                Check the message, then send it.
              </p>
              <textarea
                readOnly
                value={previewText}
                aria-label="Message to be sent"
                spellCheck={false}
                className="w-full min-h-[280px] max-h-[480px] bg-white border border-[#E4DED4] text-[#1A1A1A] p-5 font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap resize-y focus:outline-none focus:border-[#FE5545]"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md:col-span-2 flex items-center justify-center gap-3 bg-[#FE5545] text-white px-8 py-4 font-label font-semibold uppercase tracking-[0.2em] text-xs hover:bg-[#1A1A1A] hover:text-[#FAF7F2] transition-colors duration-300"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className="w-4 h-4">
                    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.96 9.96 0 1 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.07.89.9-2.99-.2-.31a8.2 8.2 0 1 1 6.86 3.74Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.06s.88 2.39 1 2.56c.12.16 1.74 2.66 4.22 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.29Z" />
                  </svg>
                  Send on WhatsApp
                </a>
                <a
                  href={mailHref}
                  className="flex items-center justify-center gap-3 border border-[#E4DED4] text-[#1A1A1A] px-8 py-4 font-label font-semibold uppercase tracking-[0.2em] text-xs hover:border-[#FE5545] hover:text-[#FE5545] transition-colors duration-300"
                >
                  Send by Email
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-3 border border-[#E4DED4] text-[#1A1A1A] px-8 py-4 font-label font-semibold uppercase tracking-[0.2em] text-xs hover:border-[#FE5545] hover:text-[#FE5545] transition-colors duration-300"
                >
                  Copy Message
                </button>
              </div>
              <div className="mt-6 bg-white border-l-2 border-[#FE5545] p-5">
                <p className="text-sm leading-relaxed text-[#1A1A1A]/80">
                  After sending, share <b className="text-[#1A1A1A] font-semibold">photos of Aadhaar card and PAN card</b> of
                  every seller, buyer and witness on the same WhatsApp chat.
                </p>
              </div>
            </div>
          )}

          <div className="mt-10">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-medium text-[#6B6B6B] underline underline-offset-4 hover:text-[#1A1A1A] transition-colors"
            >
              {clearArmed ? "Tap again to clear everything" : "Clear this form"}
            </button>
          </div>
        </section>
      </form>

      <Footer />

      {toastMsg && (
        <div className="fixed left-1/2 bottom-8 -translate-x-1/2 bg-[#1A1A1A] text-[#FAF7F2] px-5 py-2.5 font-label font-semibold text-xs uppercase tracking-wide z-[999]">
          {toastMsg}
        </div>
      )}
    </main>
  );
}
