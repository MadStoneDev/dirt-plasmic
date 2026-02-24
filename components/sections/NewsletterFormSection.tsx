"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";

/* ─── Text colour presets (same as DirtRichText) ─── */
const TEXT_COLOURS: Record<string, string> = {
  "dirt-deep": "#5C0004",
  "dirt-pop": "#FE5C02",
  "dirt-green": "#C2D500",
  "dirt-blue": "#C0D6FF",
  "dirt-off-white": "#FAFAF2",
  "dirt-black": "#30261D",
  white: "#FFFFFF",
  black: "#000000",
};

export interface NewsletterFormSectionProps {
  listId?: string;
  tags?: string;
  submitButtonLabel?: string;
  successMessage?: string;
  successMessageColour?: string;
  customSuccessMessageColour?: string;
}

export function NewsletterFormSection({
  listId,
  tags,
  submitButtonLabel = "Subscribe",
  successMessage = "Thanks for subscribing!",
  successMessageColour = "dirt-green",
  customSuccessMessageColour,
}: NewsletterFormSectionProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const resolvedSuccessColour =
    successMessageColour === "custom" && customSuccessMessageColour
      ? customSuccessMessageColour
      : TEXT_COLOURS[successMessageColour] || TEXT_COLOURS["dirt-green"];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, listId, tags }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-16 px-5 md:px-8" style={{ gridColumn: "1 / -1" }}>
        <div className="max-w-xl mx-auto text-center">
          <p
            className="text-2xl md:text-3xl font-display font-bold uppercase"
            style={{ color: resolvedSuccessColour }}
          >
            {successMessage}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-5 md:px-8" style={{ gridColumn: "1 / -1" }}>
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="px-4 py-4 text-lg bg-transparent text-dirt-deep font-sans placeholder:text-dirt-deep/50 outline-none focus:ring-2 focus:ring-dirt-pop"
              style={{ border: "2px solid #30261D" }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-4 text-lg bg-transparent text-dirt-deep font-sans placeholder:text-dirt-deep/50 outline-none focus:ring-2 focus:ring-dirt-pop"
              style={{ border: "2px solid #30261D" }}
            />
          </div>

          {error && (
            <p className="text-red-600 font-sans text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-4 flex items-center justify-center gap-1 bg-dirt-pop text-dirt-deep font-display font-bold uppercase text-lg hover:bg-dirt-pop-hover disabled:opacity-50 transition-all duration-300"
          >
            <Image
              src="/90deg Arrow.png"
              alt="Arrow"
              width={50}
              height={50}
              className="w-6"
            />
            {isSubmitting ? "Subscribing..." : submitButtonLabel}
          </button>
        </form>
      </div>
    </section>
  );
}
