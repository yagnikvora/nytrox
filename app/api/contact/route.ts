import { CONTACT_EMAIL, COUNTRY_CODES, dialCodeOf } from "../../data/contact";

/*
 * Receives the enquiry form (components/ContactForm.tsx) and does two things
 * with it: emails it through Resend, and stores it as an `enquiry` document in
 * Sanity. Both use keys that must never reach the browser, which is why this
 * runs on the server.
 *
 * The two are independent. If one fails the other still goes through and the
 * visitor sees success - the enquiry has reached us either way - and the
 * failure is logged for whoever runs the server. Only when both fail is the
 * visitor told, so they can fall back to emailing directly.
 *
 * Configuration lives in environment variables; see .env.example.
 */

type Enquiry = {
  name: string;
  email: string;
  company: string;
  /** Full number with dialling code, or "" when none was given. */
  phone: string;
  service: string;
  message: string;
};

type FieldErrors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{6,14}$/;

/** Generous caps - enough for any real enquiry, small enough to bound abuse. */
const MAX = { name: 120, email: 200, company: 160, service: 80, message: 5000 };

/** How long to wait on Resend or Sanity before giving up on that one. */
const UPSTREAM_TIMEOUT_MS = 10_000;

// A light per-address limit, held in memory: plenty for one Node process, and
// it resets on restart. It is there to blunt a script hammering the endpoint,
// not to be a security boundary.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    recent.set(key, hits);
    return true;
  }
  recent.set(key, [...hits, now]);
  return false;
}

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

async function sendEmail(enquiry: Enquiry) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");

  const body = [
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Company: ${enquiry.company || "-"}`,
    `Contact no.: ${enquiry.phone || "-"}`,
    `Service: ${enquiry.service || "-"}`,
    "",
    "Project details:",
    enquiry.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      // Resend's shared sender works with no domain set up, but only delivers
      // to the address the Resend account was created with.
      from: process.env.CONTACT_FROM_EMAIL || "Nytrox Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL],
      // so hitting Reply answers the visitor, not the sender address
      reply_to: enquiry.email,
      subject: `New project enquiry - ${enquiry.name}`,
      text: body,
    }),
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
}

async function saveToSanity(enquiry: Enquiry) {
  const projectId = process.env.SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_TOKEN;
  const dataset = process.env.SANITY_DATASET || "production";
  if (!projectId || !token) throw new Error("SANITY_PROJECT_ID / SANITY_API_TOKEN is not set");

  const res = await fetch(
    `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        // field names match studio/schemaTypes/enquiry.ts
        mutations: [
          {
            create: {
              _type: "enquiry",
              ...enquiry,
              submittedAt: new Date().toISOString(),
              status: "new",
            },
          },
        ],
      }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    }
  );
  if (!res.ok) throw new Error(`Sanity responded ${res.status}: ${await res.text()}`);
}

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a field no person can see or reach. Anything in it means a bot
  // filled the form, so it gets a success it can't learn from and nothing is sent.
  if (text(data.website, 200)) return Response.json({ ok: true });

  const address = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(address)) {
    return Response.json(
      { error: "Too many messages in a short time. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  const name = text(data.name, MAX.name);
  const email = text(data.email, MAX.email);
  const message = text(data.message, MAX.message);
  const digits = text(data.phone, 20);
  const country = text(data.country, 80);

  // The same rules as the form. The form's own checks are a convenience for
  // the visitor; these are the ones that count.
  const fields: FieldErrors = {};
  if (!name) fields.name = "Please tell us your name.";
  if (!email) fields.email = "We need an email to reply to.";
  else if (!EMAIL_RE.test(email)) fields.email = "That email doesn't look right.";
  if (digits && (!PHONE_RE.test(digits) || !COUNTRY_CODES.includes(country)))
    fields.phone = "That number doesn't look right.";
  if (!message) fields.message = "A sentence or two about the project helps.";
  else if (message.length < 20) fields.message = "Could you add a little more detail?";

  if (Object.keys(fields).length > 0) {
    return Response.json({ error: "Please check the highlighted fields.", fields }, { status: 400 });
  }

  const enquiry: Enquiry = {
    name,
    email,
    company: text(data.company, MAX.company),
    phone: digits ? `${dialCodeOf(country)} ${digits}` : "",
    service: text(data.service, MAX.service),
    message,
  };

  const [mail, store] = await Promise.allSettled([sendEmail(enquiry), saveToSanity(enquiry)]);
  if (mail.status === "rejected") console.error("[contact] email failed:", mail.reason);
  if (store.status === "rejected") console.error("[contact] Sanity save failed:", store.reason);

  if (mail.status === "rejected" && store.status === "rejected") {
    return Response.json(
      { error: "We couldn't send your message just now." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
