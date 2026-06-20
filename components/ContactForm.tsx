"use client";

import { useRef, useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/site";
import { trackConversion } from "@/lib/analytics";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputBase =
  "w-full rounded-lg border bg-surface px-4 py-3 text-base text-ink " +
  "placeholder:text-muted/55 transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent";

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const honeyRef = useRef<HTMLInputElement>(null);

  const refs: Record<Field, React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>> = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!values.message.trim()) next.message = "Please add a short message.";
    return next;
  }

  function update(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      const firstError = (["name", "email", "message"] as Field[]).find(
        (f) => found[f],
      );
      if (firstError) refs[firstError].current?.focus();
      return;
    }

    // Honeypot: a bot filled the hidden field — pretend success, send nothing.
    if (honeyRef.current?.value) {
      setStatus("success");
      return;
    }

    if (!site.web3formsKey) {
      setStatus("error");
      setServerMessage(
        `The form isn’t connected yet — please email me directly at ${site.email}.`,
      );
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          subject: "New message from your Customer Success site",
          from_name: values.name,
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });
      const data = (await res.json()) as { success: boolean; message?: string };
      if (data.success) {
        setStatus("success");
        setValues({ name: "", email: "", message: "" });
        trackConversion("contact");
      } else {
        setStatus("error");
        setServerMessage(
          data.message ?? "Something went wrong. Please try again.",
        );
      }
    } catch {
      setStatus("error");
      setServerMessage(
        `Couldn’t send just now. Please email me at ${site.email}.`,
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-accent/30 bg-accent-soft/60 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto size-10 text-accent" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold">Message sent</h3>
        <p className="mt-2 text-muted">
          Thank you&nbsp;— I&rsquo;ll reply to you by email soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Name
        </label>
        <input
          ref={refs.name as React.RefObject<HTMLInputElement>}
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="e.g. Jordan Lee…"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`${inputBase} ${errors.name ? "border-red-400" : "border-border"}`}
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-sm text-red-700">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          ref={refs.email as React.RefObject<HTMLInputElement>}
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          required
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@company.com…"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`${inputBase} ${errors.email ? "border-red-400" : "border-border"}`}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-sm text-red-700">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          ref={refs.message as React.RefObject<HTMLTextAreaElement>}
          id="message"
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="A line about the role and your team…"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputBase} resize-y ${errors.message ? "border-red-400" : "border-border"}`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-red-700">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot — hidden from people, catches bots. */}
      <input
        ref={honeyRef}
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-[0.95rem] font-medium text-white shadow-sm transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-[1.05em] animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-[1.05em]" aria-hidden="true" />
            Send message
          </>
        )}
      </button>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
        {status === "error" && (
          <span className="text-red-700">{serverMessage}</span>
        )}
      </p>
    </form>
  );
}
