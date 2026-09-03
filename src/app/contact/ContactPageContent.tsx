"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ArrowUpRight } from "lucide-react";
import { toast } from "@/components/ui/Toast";
import ObfuscatedEmail from "@/components/ui/ObfuscatedEmail";
import FAQ from "@/components/ui/FAQ";
import { contactFaqs } from "@/lib/faqs";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string; // Anti-spam field
}

// Ink-link grammar for the plain-text profile links (matches the hero's
// affiliation links): underline as affordance, decoration inks on hover.
const profileLinkClass =
  "inline-flex items-center gap-0.5 font-medium text-[var(--text)] underline underline-offset-[0.15em] decoration-[var(--text)]/30 transition-[text-decoration-color] duration-200 hover:decoration-[var(--text)]";

const inputClass =
  "w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-[var(--background)] text-[var(--text)]";

export default function ContactPageContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  // Retains the last non-idle status so the banner's content stays rendered
  // while its grid row collapses (otherwise the text vanishes the frame the
  // collapse starts).
  const [lastStatus, setLastStatus] = useState<"success" | "error" | null>(null);
  useEffect(() => {
    if (submitStatus !== "idle") setLastStatus(submitStatus);
  }, [submitStatus]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    mode: 'onBlur',
  });

  // Auto-dismiss success message after 5 seconds
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => setSubmitStatus('idle'), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const sendMessage = async () => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }
    };

    try {
      // One toast morphs through sending -> sent | failed in place
      // (update-toast lifecycle; see toast.promise in Toast.tsx).
      await toast.promise(sendMessage(), {
        loading: { title: "Sending your message…" },
        success: {
          title: "Message sent",
          description: "I'll get back to you within 24 hours.",
        },
        error: {
          title: "Couldn't send your message",
          description: "Please try again, or use the email link below.",
        },
      });
      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      clearTimeout(timeout);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[var(--background)] py-16 sm:py-24 min-h-[100dvh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header - Left aligned */}
        <div className="mb-16 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-semibold text-[var(--text)] mb-4">
            Contact
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)]">
            Hiring, or have something you want built? Write to me and I&apos;ll usually reply within 24 hours.
          </p>
        </div>

        {/* Two columns: the ways to reach me (left) and the form (right).
            This page was the last one still in the retired template
            generation - icon-in-tinted-box rows, bordered social squares
            with corner arrows, an "Availability" card, the form inside a
            second card. It now speaks the About/hero grammar: plain text
            in the ink-link grammar, a mono annotation for the where/when,
            hairline inputs directly on the page. */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Ways to reach me */}
          <div className="max-w-md">
            <h2 className="mb-6 text-2xl sm:text-3xl font-semibold text-[var(--text)]">
              Reach me directly
            </h2>

            <dl className="space-y-5">
              <div>
                <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                  Email
                </dt>
                <dd className="mt-1 text-base">
                  <ObfuscatedEmail className={profileLinkClass} />
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                  Elsewhere
                </dt>
                <dd className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-base">
                  <a
                    href="https://github.com/TayyabManan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={profileLinkClass}
                  >
                    GitHub
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only"> (opens in new window)</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/tayyabmanan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={profileLinkClass}
                  >
                    LinkedIn
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only"> (opens in new window)</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                  Where and when
                </dt>
                <dd className="mt-1 text-base text-[var(--text-secondary)]">
                  Islamabad, Pakistan &middot; UTC+5
                </dd>
              </div>
            </dl>

            <p className="mt-8 border-t border-[var(--border)] pt-6 text-base text-[var(--text-secondary)]">
              Open to full-time AI/ML roles and remote contract work.
              I usually reply within 24 hours.
            </p>
          </div>

          {/* Contact Form - hairline inputs on the page surface, no card */}
          <div>
            <div>
              <h2 className="mb-6 text-2xl sm:text-3xl font-semibold text-[var(--text)]">
                Send a message
              </h2>

              {/* Status banner (board: closed -> open -> closed). Always-mounted
                  grid wrapper morphs grid-template-rows 0fr<->1fr so the form is
                  pushed smoothly instead of jumping; content is kept via
                  lastStatus while collapsing; inert makes the error banner's
                  email link unfocusable when closed. Divs need explicit
                  transition classes (the global rule only covers buttons/links). */}
              <div
                data-state={submitStatus !== "idle" ? "open" : "closed"}
                inert={submitStatus === "idle"}
                className={
                  submitStatus !== "idle"
                    ? "grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-morph ease-morph"
                    : "grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-200 ease-in"
                }
              >
                <div className="overflow-hidden min-h-0">
                  {lastStatus === "error" ? (
                    <div className="mb-6 p-4 bg-[var(--error)]/10 border border-[var(--error)]/20 rounded-lg">
                      <p className="text-[var(--error)]">
                        Couldn&apos;t send your message. Try again or email me directly at{' '}
                        <ObfuscatedEmail className="underline hover:text-[var(--error)]/80" />.
                      </p>
                    </div>
                  ) : lastStatus === "success" ? (
                    <div className="mb-6 p-4 bg-[var(--success)]/10 border border-[var(--success)]/20 rounded-lg">
                      <p className="text-[var(--success)]">
                        Message sent. I&apos;ll usually reply within 24 hours.
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className={inputClass}
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1 text-sm text-[var(--error)] animate-in fade-in slide-in-from-top-1 duration-micro ease-out">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Enter a valid email address",
                      },
                    })}
                    className={inputClass}
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1 text-sm text-[var(--error)] animate-in fade-in slide-in-from-top-1 duration-micro ease-out">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register("subject", {
                      required: "Subject is required",
                      minLength: {
                        value: 2,
                        message: "Subject must be at least 2 characters long"
                      }
                    })}
                    className={inputClass}
                    aria-required="true"
                    aria-invalid={errors.subject ? "true" : "false"}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  {errors.subject && (
                    <p id="subject-error" role="alert" className="mt-1 text-sm text-[var(--error)] animate-in fade-in slide-in-from-top-1 duration-micro ease-out">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters long"
                      }
                    })}
                    className={inputClass}
                    aria-required="true"
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {/* No live character counter: the minLength error below
                      says everything a "0 / 10 minimum" readout did, without
                      the form-builder feel. */}
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-1 text-sm text-[var(--error)] animate-in fade-in slide-in-from-top-1 duration-micro ease-out">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  {...register("honeypot")}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-[var(--primary)] text-[var(--on-primary)] px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm font-semibold hover:bg-[var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98] transition-[background-color,transform] duration-200"
                >
                  {isSubmitting && (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                  )}
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ: heading in a left column, accordion in a wider right column, so
            it uses the full width instead of leaving space on the right. */}
        <FAQ
          items={contactFaqs}
          layout="aside"
          className="mt-16 border-t border-[var(--border)] pt-16"
        />
      </div>
    </div>
  );
}
