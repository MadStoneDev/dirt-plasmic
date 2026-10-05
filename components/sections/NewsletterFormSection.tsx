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

/* ─── Form width presets (max-width of the form) ─── */
const WIDTH_CLASSES: Record<string, string> = {
  full: "w-full",
  large: "w-full max-w-2xl",
  medium: "w-full max-w-xl",
  small: "w-full max-w-md",
};

/* ─── Form position presets (horizontal alignment when not full width) ─── */
const POSITION_CLASSES: Record<string, string> = {
  left: "mr-auto",
  center: "mx-auto",
  right: "ml-auto",
};

export interface NewsletterFormSectionProps {
  listId?: string;
  tags?: string;
  submitButtonLabel?: string;
  successMessage?: string;
  successMessageColour?: string;
  customSuccessMessageColour?: string;
  /** Max width of the form. Defaults to full width. */
  width?: "full" | "large" | "medium" | "small";
  /** Horizontal alignment of the form when it isn't full width. */
  position?: "left" | "center" | "right";
  /** Place the email field and the subscribe button on the same row. */
  inlineEmailButton?: boolean;
  /** When inline, add spacing between the email field and the button. */
  inlineGap?: boolean;
}

export function NewsletterFormSection({
  listId,
  tags,
  submitButtonLabel = "Subscribe",
  successMessage = "Thanks for subscribing!",
  successMessageColour = "dirt-green",
  customSuccessMessageColour,
  width = "full",
  position = "center",
  inlineEmailButton = false,
  inlineGap = true,
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

  const widthClass = WIDTH_CLASSES[width] || WIDTH_CLASSES.full;
  const positionClass =
    width === "full"
      ? "mx-auto"
      : POSITION_CLASSES[position] || POSITION_CLASSES.center;

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

  const emailInput = (
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className={`px-4 py-4 text-lg bg-dirt-off-white text-dirt-deep font-sans placeholder:text-dirt-black/50 outline-none focus:ring-2 focus:ring-dirt-pop${
        inlineEmailButton ? " flex-1 min-w-0" : ""
      }`}
      style={{ border: "2px solid #30261D" }}
    />
  );

  const submitButton = (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`px-8 py-4 flex items-center justify-center gap-2 bg-dirt-pop text-dirt-deep font-display font-bold uppercase text-3xl hover:bg-dirt-pop-hover disabled:opacity-50 transition-all duration-300${
        inlineEmailButton ? " whitespace-nowrap shrink-0" : ""
      }`}
    >
      <Image
        src="/90deg Arrow.png"
        alt=""
        width={50}
        height={50}
        className="w-6"
      />
      {isSubmitting ? "Subscribing..." : submitButtonLabel}
    </button>
  );

  const errorNode = error && (
    <p className="text-red-600 font-sans text-sm">{error}</p>
  );

  return (
    <section className="w-full" style={{ gridColumn: "1 / -1" }}>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col items-stretch gap-6 ${positionClass} ${widthClass}`}
      >
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="px-4 py-4 text-lg bg-dirt-off-white text-dirt-deep font-sans placeholder:text-dirt-black/50 outline-none focus:ring-2 focus:ring-dirt-pop"
          style={{ border: "2px solid #30261D" }}
        />

        {inlineEmailButton ? (
          <>
            <div
              className={`flex flex-col sm:flex-row sm:items-stretch ${
                inlineGap ? "gap-6" : "gap-0"
              }`}
            >
              {emailInput}
              {submitButton}
            </div>
            {errorNode}
          </>
        ) : (
          <>
            {emailInput}
            {errorNode}
            {submitButton}
          </>
        )}
      </form>
    </section>
  );
}
