import { Resend } from "resend";
import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";
import { effectiveReply, parseEnquiry } from "@/lib/contact";

/**
 * Created per request rather than at module load: the constructor throws
 * when the key is missing, which would otherwise take the whole route (and
 * a build without the key) down instead of failing just the email.
 */
function mailer(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

const sanityWriter = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

/** Every user value goes through this before it reaches the email's HTML. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Keeps a header value (the subject) on one line. */
function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function row(label: string, valueHtml: string, last = false): string {
  return `
            <tr${last ? "" : ' style="border-bottom:1px solid #e0e0e0;"'}>
              <td style="padding:12px 0;color:#666;font-size:13px;width:140px;vertical-align:top;">${label}</td>
              <td style="padding:12px 0;color:#131313;font-weight:600;line-height:1.6;">${valueHtml}</td>
            </tr>`;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "The request was not valid JSON." },
      { status: 400 }
    );
  }

  const parsed = parseEnquiry(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { success: false, error: parsed.error, fields: parsed.fields },
      { status: 400 }
    );
  }

  const { name, email, phone, message, matterType } = parsed.enquiry;
  const replyVia = effectiveReply(parsed.enquiry);
  const matterLabel = matterType || "Not given";

  const emailHtml = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f9f9f9;border-radius:8px;">
          <h2 style="color:#131313;margin-bottom:24px;">New Client Inquiry</h2>
          <table style="width:100%;border-collapse:collapse;">${[
            row("Name", esc(name)),
            row("Type of matter", esc(matterLabel)),
            row("Reply by", esc(replyVia)),
            row("Phone", phone ? esc(phone) : "—"),
            row(
              "Email",
              email
                ? `<a href="mailto:${esc(email)}" style="color:#fe5545;">${esc(email)}</a>`
                : "—"
            ),
            row(
              "Message",
              message
                ? `<span style="font-weight:400;white-space:pre-wrap;">${esc(message)}</span>`
                : "—",
              true
            ),
          ].join("")}
          </table>
          <p style="margin-top:32px;font-size:12px;color:#999;">
            Submitted via advkrupalsavjani.in contact form
          </p>
        </div>
      `;

  const [sanityResult, emailResult] = await Promise.allSettled([
    sanityWriter.create({
      _type: "contactSubmission",
      name,
      email,
      phone,
      message,
      // Left out when not chosen, rather than stored as "".
      matterType: matterType || undefined,
      replyVia,
      submittedAt: new Date().toISOString(),
    }),
    // Resend reports API errors in the result rather than by throwing.
    Promise.resolve()
      .then(() =>
        mailer().emails.send({
          from: "onboarding@resend.dev",
          to: "adv.krupalsavjani@gmail.com",
          subject: oneLine(`New Inquiry — ${name} · ${matterLabel} · reply by ${replyVia}`),
          html: emailHtml,
        })
      )
      .then((result) => {
        if (result.error) throw result.error;
        return result;
      }),
  ]);

  if (sanityResult.status === "rejected") {
    console.error("Sanity write failed:", sanityResult.reason);
  }
  if (emailResult.status === "rejected") {
    console.error("Email failed:", emailResult.reason);
  }

  // Either one reaching the office is enough; only both failing is a failure.
  if (sanityResult.status === "rejected" && emailResult.status === "rejected") {
    return NextResponse.json(
      { success: false, error: "The enquiry could not be delivered." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
