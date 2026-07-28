"use client";

import { useState, type FormEvent } from "react";
import Magnet from "./Magnet";
import { SERVICES } from "../data/services";
import { BUDGETS, CONTACT_EMAIL } from "../data/contact";

/**
 * Project enquiry form.
 *
 * There is no backend in this project yet, so a validated submission is handed
 * to the visitor's mail client as a pre-filled message to CONTACT_EMAIL — which
 * works on a static deploy with nothing to configure. To post it to a real
 * inbox instead (a Server Action, form service, or CRM endpoint), replace the
 * body of `deliver` below; validation and UI states stay as they are.
 */

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-ink-muted/60 focus:border-violet-400/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/25";

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const deliver = (values: Record<string, string>) => {
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Company: ${values.company || "—"}`,
      `Service: ${values.service || "—"}`,
      `Budget: ${values.budget || "—"}`,
      "",
      "Project details:",
      values.message,
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `New project enquiry — ${values.name}`
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(
      ["name", "email", "company", "service", "budget", "message"].map((k) => [
        k,
        String(data.get(k) ?? "").trim(),
      ])
    );

    const next: Errors = {};
    if (!values.name) next.name = "Please tell us your name.";
    if (!values.email) next.email = "We need an email to reply to.";
    else if (!EMAIL_RE.test(values.email)) next.email = "That email doesn't look right.";
    if (!values.message) next.message = "A sentence or two about the project helps.";
    else if (values.message.length < 20) next.message = "Could you add a little more detail?";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      // move focus to the first problem so keyboard/screen-reader users land on it
      const first = Object.keys(next)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    deliver(values);
    setSent(true);
  };

  /* Clear a field's error as soon as the visitor edits it. */
  const clearError = (field: Field) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  if (sent) {
    return (
      <div className="glass rounded-3xl p-8 text-center sm:p-12">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-cyan-400/25 ring-1 ring-white/15">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12.5l4.2 4.2L19 7"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-cyan-300"
            />
          </svg>
        </div>
        <h3 className="mt-6 font-display text-2xl font-bold text-white">
          Your message is ready to send
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-ink-muted">
          We&apos;ve opened your mail app with the brief filled in — hit send and
          it lands with us. If nothing opened, email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-violet-300 transition-colors hover:text-white"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          directly and we&apos;ll pick it up from there.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="glass mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass rounded-3xl p-6 sm:p-8">
      <h2 className="font-display text-xl font-semibold text-white">
        Tell us about your project
      </h2>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        The more context you give us, the more useful our first reply will be.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <FieldWrap label="Full name" htmlFor="name" required error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Ada Lovelace"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            onChange={() => clearError("name")}
            className={inputClass}
          />
        </FieldWrap>

        <FieldWrap label="Email" htmlFor="email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={() => clearError("email")}
            className={inputClass}
          />
        </FieldWrap>

        <FieldWrap label="Company" htmlFor="company">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Optional"
            className={inputClass}
          />
        </FieldWrap>

        <FieldWrap label="Budget" htmlFor="budget">
          <Select id="budget" name="budget" placeholder="Select a range">
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
        </FieldWrap>

        <div className="sm:col-span-2">
          <FieldWrap label="What do you need?" htmlFor="service">
            <Select id="service" name="service" placeholder="Select a service">
              {SERVICES.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Something else">Something else</option>
            </Select>
          </FieldWrap>
        </div>

        <div className="sm:col-span-2">
          <FieldWrap label="Project details" htmlFor="message" required error={errors.message}>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="What are you building, who is it for, and when do you need it live?"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              onChange={() => clearError("message")}
              className={`${inputClass} resize-y`}
            />
          </FieldWrap>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-ink-muted">
          We&apos;ll only use these details to reply to your enquiry.
        </p>
        <Magnet>
          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_44px_-10px_rgba(139,92,246,0.95)] transition-transform hover:scale-[1.03]"
          >
            Send enquiry
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Magnet>
      </div>
    </form>
  );
}

/* ------------------------------- Helpers -------------------------------- */
function FieldWrap({
  label,
  htmlFor,
  required = false,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-white">
        {label}
        {required && <span className="ml-1 text-violet-400">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-2 text-xs text-pink-400">
          {error}
        </p>
      )}
    </div>
  );
}

/** Native select restyled for the dark theme, with a custom chevron. */
function Select({
  id,
  name,
  placeholder,
  children,
}: {
  id: string;
  name: string;
  placeholder: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        defaultValue=""
        className={`${inputClass} appearance-none pr-11 [&>option]:bg-[#0b0b1a] [&>option]:text-white`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {children}
      </select>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted"
      >
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
