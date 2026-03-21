import { Resend } from "resend";
import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const sanityWriter = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json();

  const [, emailResult] = await Promise.allSettled([
    sanityWriter.create({
      _type: "contactSubmission",
      name,
      email,
      phone: phone || "",
      message,
      submittedAt: new Date().toISOString(),
    }),
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: "adv.krupalsavjani@gmail.com",
      subject: `New Inquiry — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f9f9f9;border-radius:8px;">
          <h2 style="color:#131313;margin-bottom:24px;">New Client Inquiry</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr style="border-bottom:1px solid #e0e0e0;">
              <td style="padding:12px 0;color:#666;font-size:13px;width:120px;">Name</td>
              <td style="padding:12px 0;color:#131313;font-weight:600;">${name}</td>
            </tr>
            <tr style="border-bottom:1px solid #e0e0e0;">
              <td style="padding:12px 0;color:#666;font-size:13px;">Email</td>
              <td style="padding:12px 0;color:#131313;font-weight:600;">
                <a href="mailto:${email}" style="color:#fe5545;">${email}</a>
              </td>
            </tr>
            <tr style="border-bottom:1px solid #e0e0e0;">
              <td style="padding:12px 0;color:#666;font-size:13px;">Phone</td>
              <td style="padding:12px 0;color:#131313;font-weight:600;">${phone || "—"}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;color:#666;font-size:13px;vertical-align:top;">Message</td>
              <td style="padding:12px 0;color:#131313;line-height:1.6;">${message}</td>
            </tr>
          </table>
          <p style="margin-top:32px;font-size:12px;color:#999;">
            Submitted via advkrupalsavjani.in contact form
          </p>
        </div>
      `,
    }),
  ]);

  if (emailResult.status === "rejected") {
    console.error("Email failed:", emailResult.reason);
  }

  return NextResponse.json({ success: true });
}
