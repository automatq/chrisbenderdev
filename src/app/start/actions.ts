"use server";

import { DATA } from "@/data/resume";
import { INQUIRY_STEPS, parseInquiry, type InquiryField } from "@/lib/inquiry";

export type InquiryResult =
  | { ok: true }
  | { ok: false; reason: "invalid"; field: InquiryField; message: string }
  | { ok: false; reason: "unavailable" };

/* Delivery runs through Resend's REST API, so connecting it is three
   environment variables and no new dependency:

     RESEND_API_KEY   required. Until it is set, production submissions come
                      back "unavailable" and the form offers a prefilled email.
     INQUIRY_FROM     sender on a domain verified in Resend, for example
                      "Chris Bender <hello@chrisbender.dev>". The default
                      onboarding sender only delivers to the Resend account's
                      own address.
     INQUIRY_TO       inbox for notifications. Defaults to the contact email. */
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Project inquiries <onboarding@resend.dev>";

export async function submitInquiry(
  input: unknown,
  // Honeypot: the field is hidden from people, so only a bot fills it in.
  trap: string
): Promise<InquiryResult> {
  const parsed = parseInquiry(input);

  if (!parsed.ok) {
    return {
      ok: false,
      reason: "invalid",
      field: parsed.field,
      message: parsed.message,
    };
  }

  // Tell the bot it worked, so it has no reason to retry.
  if (typeof trap === "string" && trap.length > 0) {
    return { ok: true };
  }

  const { answers } = parsed;
  const text = INQUIRY_STEPS.map(
    (step) => `${step.label}:\n${answers[step.id] || "(not given)"}`
  ).join("\n\n");

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        `[inquiry] RESEND_API_KEY is not set, so nothing was sent.\n\n${text}`
      );
      return { ok: true };
    }

    console.error("[inquiry] RESEND_API_KEY is not set; inquiry was not sent.");
    return { ok: false, reason: "unavailable" };
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM ?? DEFAULT_FROM,
        to: [process.env.INQUIRY_TO ?? DATA.contact.email],
        reply_to: answers.email,
        subject: `New project inquiry: ${answers.name} (${answers.service})`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(
        `[inquiry] Resend responded ${response.status}: ${await response.text()}`
      );
      return { ok: false, reason: "unavailable" };
    }
  } catch (error) {
    console.error("[inquiry] Resend request failed", error);
    return { ok: false, reason: "unavailable" };
  }

  return { ok: true };
}
