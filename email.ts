/**
 * server/email.ts
 * SendGrid-based email helper for structured lead notification emails.
 * Sends from invest@thecm2.com to invest@thecm2.com.
 * Reply-To is set to the investor's email so replies go directly to them.
 */

import sgMail from "@sendgrid/mail";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface LeadEmailData {
  type: "Investor Enquiry" | "London Brief Request" | "Consultation Request";
  name: string;
  email: string;
  phone?: string;
  country?: string;
  budget?: string;
  projectOfInterest?: string;
  investorType?: string;
  message?: string;
  sourcePage?: string;
  submittedAt?: Date;
}

// ── HTML template ─────────────────────────────────────────────────────────────

function buildEmailHtml(data: LeadEmailData): string {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ...(data.phone ? [["Phone / WhatsApp", data.phone] as [string, string]] : []),
    ...(data.country ? [["Country / City", data.country] as [string, string]] : []),
    ...(data.budget ? [["Investment Budget", data.budget] as [string, string]] : []),
    ...(data.projectOfInterest ? [["Project of Interest", data.projectOfInterest] as [string, string]] : []),
    ...(data.investorType ? [["Investor Type", data.investorType] as [string, string]] : []),
    ...(data.message ? [["Message", data.message] as [string, string]] : []),
    ["Submitted", (data.submittedAt ?? new Date()).toUTCString()],
    ...(data.sourcePage ? [["Source Page", data.sourcePage] as [string, string]] : []),
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;background:#f8f5f0;font-weight:600;color:#333;white-space:nowrap;border-bottom:1px solid #e8e0d4;vertical-align:top;">${label}</td>
        <td style="padding:8px 12px;color:#555;border-bottom:1px solid #e8e0d4;">${value}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;max-width:600px;width:100%;">
        <tr>
          <td style="background:#111;padding:24px 32px;">
            <p style="margin:0;font-size:11px;letter-spacing:2px;color:#C9A96E;text-transform:uppercase;">Square Centimeter — CM2</p>
            <h1 style="margin:4px 0 0;font-size:20px;color:#fff;font-weight:400;">New ${data.type}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e8e0d4;border-radius:4px;overflow:hidden;">
              ${tableRows}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;background:#f8f5f0;border-top:1px solid #e8e0d4;">
            <p style="margin:0;font-size:12px;color:#999;">This notification was sent automatically by the CM2 website. Reply to this email to contact the investor directly.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildEmailText(data: LeadEmailData): string {
  const lines: string[] = [
    `NEW ${data.type.toUpperCase()} — CM2 WEBSITE`,
    "─".repeat(40),
    `Name:              ${data.name}`,
    `Email:             ${data.email}`,
    ...(data.phone ? [`Phone / WhatsApp:  ${data.phone}`] : []),
    ...(data.country ? [`Country / City:    ${data.country}`] : []),
    ...(data.budget ? [`Investment Budget: ${data.budget}`] : []),
    ...(data.projectOfInterest ? [`Project:           ${data.projectOfInterest}`] : []),
    ...(data.investorType ? [`Investor Type:     ${data.investorType}`] : []),
    ...(data.message ? [`Message:\n${data.message}`] : []),
    `Submitted:         ${(data.submittedAt ?? new Date()).toUTCString()}`,
    ...(data.sourcePage ? [`Source Page:       ${data.sourcePage}`] : []),
  ];
  return lines.join("\n");
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Send a structured lead notification email via SendGrid.
 * Returns true on success, false on failure (non-fatal — callers should not throw).
 */
export async function sendLeadEmail(data: LeadEmailData): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.warn("[email] SENDGRID_API_KEY not set — skipping email notification");
    return false;
  }

  const from = process.env.SMTP_FROM ?? "invest@thecm2.com";
  const to = process.env.SMTP_TO ?? "invest@thecm2.com";

  try {
    sgMail.setApiKey(apiKey);
    await sgMail.send({
      from: { email: from, name: "CM2 Website" },
      replyTo: { email: data.email, name: data.name },
      to,
      subject: `New ${data.type} — CM2 Website`,
      text: buildEmailText(data),
      html: buildEmailHtml(data),
    });
    return true;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[email] SendGrid send failed:", msg);
    return false;
  }
}

/**
 * Send an automatic response email to the investor after form submission.
 * Includes a link to the London Investment Brief PDF.
 */
export async function sendInvestorAutoResponse({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.warn("[email] SENDGRID_API_KEY not set — skipping auto-response");
    return false;
  }

  const from = process.env.SMTP_FROM ?? "invest@thecm2.com";
  const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/5PNDekDWV7fm3xWZEdDcSY";
  const pdfUrl = `${CDN}/CM2_London_Investment_Brief_2026_555f506c.pdf`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;max-width:600px;width:100%;">
        <tr>
          <td style="background:#111;padding:24px 32px;">
            <p style="margin:0;font-size:11px;letter-spacing:2px;color:#C9A96E;text-transform:uppercase;">Square Centimeter — CM2</p>
            <h1 style="margin:4px 0 0;font-size:20px;color:#fff;font-weight:400;">Your CM2 London Investment Brief</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 16px;color:#333;font-size:15px;">Dear ${name},</p>
            <p style="margin:0 0 16px;color:#555;font-size:14px;line-height:1.6;">Thank you for your enquiry with Square Centimeter.</p>
            <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.6;">Your London Property Investment Brief is available here:</p>
            <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
              <tr>
                <td style="background:#111;border-radius:4px;padding:12px 24px;">
                  <a href="${pdfUrl}" style="color:#C9A96E;text-decoration:none;font-size:13px;letter-spacing:1px;text-transform:uppercase;font-weight:600;">Download London Investment Brief →</a>
                </td>
              </tr>
            </table>
            <p style="margin:0 0 16px;color:#555;font-size:14px;line-height:1.6;">A CM2 advisor will review suitable opportunities and respond within 24 hours.</p>
            <p style="margin:0;color:#333;font-size:14px;">Square Centimeter<br><span style="color:#9B9B9B;font-size:12px;">Private Property Investment Advisory</span></p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;background:#f8f5f0;border-top:1px solid #e8e0d4;">
            <p style="margin:0;font-size:12px;color:#999;">If you did not submit this enquiry, please disregard this email.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `Dear ${name},\n\nThank you for your enquiry with Square Centimeter.\n\nYour London Property Investment Brief is available here:\n${pdfUrl}\n\nA CM2 advisor will review suitable opportunities and respond within 24 hours.\n\nSquare Centimeter\nPrivate Property Investment Advisory`;

  try {
    sgMail.setApiKey(apiKey);
    await sgMail.send({
      from: { email: from, name: "CM2 — Square Centimeter" },
      to: email,
      subject: "Your CM2 London Investment Brief",
      text,
      html,
    });
    return true;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[email] Auto-response send failed:", msg);
    return false;
  }
}

/**
 * Verify the SendGrid API key is valid by calling the API.
 * Returns true if the key is accepted, false otherwise.
 */
export async function verifySmtpConnection(): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) return false;
  try {
    const res = await fetch("https://api.sendgrid.com/v3/scopes", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    return res.status === 200;
  } catch {
    return false;
  }
}
