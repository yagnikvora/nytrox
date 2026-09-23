"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import GradientText from "./GradientText";
import { SERVICES } from "../data/services";
import { BUDGETS, CONTACT_EMAIL } from "../data/contact";

/**
 * Project enquiry form.
 *
 * There is no backend in this project yet, so a validated submission is handed
 * to the visitor's mail client as a pre-filled message to CONTACT_EMAIL - which
 * works on a static deploy with nothing to configure. To post it to a real
 * inbox instead (a Server Action, form service, or CRM endpoint), replace the
 * body of `deliver` below; validation and UI states stay as they are.
 */

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), "Something else"];

// text-base (16px) up to sm, text-sm above it. Safari on iOS zooms the whole
// page in when a focused field has a font-size under 16px, and it does not
// zoom back out afterwards - the visitor is left on a sideways-scrolling page
// halfway through the form. 16px on phones is the only thing that suppresses
// it; the 14px look is kept from sm upward, where no browser does this.
const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base text-white outline-none transition-colors placeholder:text-ink-muted/60 focus:border-violet-400/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/25 sm:text-sm";

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const deliver = (values: Record<string, string>) => {
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Company: ${values.company || "-"}`,
      `Service: ${values.service || "-"}`,
      `Budget: ${values.budget || "-"}`,
      "",
      "Project details:",
      values.message,
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `New project enquiry - ${values.name}`
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
      <div className="glass flex h-full flex-col justify-center rounded-3xl p-8 text-center sm:p-12">
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
          We&apos;ve opened your mail app with the brief filled in - hit send and
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
          <GradientText inline>Write another message</GradientText>
        </button>
      </div>
    );
  }

  return (
    // h-full so the card matches the height of the channel column beside it;
    // the footer row takes the slack via mt-auto rather than leaving a gap
    // below the card.
    <form
      onSubmit={handleSubmit}
      noValidate
      className="glass flex h-full flex-col rounded-3xl p-6 sm:p-8"
    >
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
          <Select id="budget" name="budget" placeholder="Select a range" options={BUDGETS} />
        </FieldWrap>

        <div className="sm:col-span-2">
          <FieldWrap label="What do you need?" htmlFor="service">
            <Select
              id="service"
              name="service"
              placeholder="Select a service"
              options={SERVICE_OPTIONS}
            />
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

      <div className="mt-auto flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-ink-muted">
          We&apos;ll only use these details to reply to your enquiry.
        </p>
        {/* same plain hover as the other primary buttons - lift + glow */}
        <button
          type="submit"
          className="btn-gradient group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-transform duration-300 ease-out hover:-translate-y-0.5"
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

/** Roughly the list's max height (max-h-72) plus its offset from the trigger. */
const MENU_SPACE = 300;

/**
 * Themed dropdown in place of a native <select>. The native option list is
 * drawn by the OS (a flat white-on-blue menu on Windows) and ignores almost all
 * CSS, so it can't be made to match the glass panels. This is a combobox
 * button + listbox instead: focus stays on the button and the highlighted
 * option is announced through aria-activedescendant, and a hidden input keeps
 * the value in the form's FormData.
 */
function Select({
  id,
  name,
  placeholder,
  options,
}: {
  id: string;
  name: string;
  placeholder: string;
  options: readonly string[];
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(0);
  const [dropUp, setDropUp] = useState(false);

  const openMenu = (index = Math.max(options.indexOf(value), 0)) => {
    // Flip above the trigger when there isn't room for the list below it.
    const rect = rootRef.current?.getBoundingClientRect();
    if (rect) {
      setDropUp(window.innerHeight - rect.bottom < MENU_SPACE && rect.top > MENU_SPACE);
    }
    setActive(index);
    setOpen(true);
  };

  const choose = (index: number) => {
    setValue(options[index]);
    setOpen(false);
  };

  // Close on a click or tap anywhere outside.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the highlighted option in view while arrowing through a long list.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openMenu();
        else setActive((i) => Math.min(i + 1, last));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openMenu();
        else setActive((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActive(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActive(last);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) choose(active);
        else openMenu();
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        // Type-ahead: jump to the next option starting with the typed letter.
        if (e.key.length === 1 && /\S/.test(e.key)) {
          const key = e.key.toLowerCase();
          const from = open ? active : Math.max(options.indexOf(value), -1);
          for (let step = 1; step <= options.length; step++) {
            const i = (from + step) % options.length;
            if (options[i].toLowerCase().startsWith(key)) {
              if (open) setActive(i);
              else setValue(options[i]);
              break;
            }
          }
        }
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className={`${inputClass} flex items-center justify-between gap-3 text-left ${
          open ? "border-violet-400/60 bg-white/[0.06] ring-2 ring-violet-500/25" : ""
        }`}
      >
        <span className={`truncate ${value ? "text-white" : "text-ink-muted/60"}`}>
          {value || placeholder}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className={`shrink-0 text-ink-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        tabIndex={-1}
        aria-label={placeholder}
        className={`absolute inset-x-0 z-50 max-h-72 overflow-y-auto overscroll-contain rounded-xl border border-white/10 bg-[#0c0c1c] p-1.5 [scrollbar-color:rgba(139,92,246,0.45)_transparent] [scrollbar-width:thin] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(139,92,246,0.08)] transition duration-150 ease-out ${
          dropUp ? "bottom-full mb-2 origin-bottom" : "top-full mt-2 origin-top"
        } ${open ? "visible scale-100 opacity-100" : "invisible scale-[0.98] opacity-0"}`}
      >
        {options.map((option, i) => {
          const selected = option === value;
          return (
            <li
              key={option}
              id={`${listId}-${i}`}
              data-index={i}
              role="option"
              aria-selected={selected}
              // Keep focus on the button so the keyboard handling stays in one place.
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(i)}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-base transition-colors sm:text-sm ${
                i === active ? "bg-white/[0.07] text-white" : "text-ink-muted"
              } ${selected ? "font-medium text-violet-200" : ""}`}
            >
              <span className="truncate">{option}</span>
              {selected && (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-violet-300">
                  <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
