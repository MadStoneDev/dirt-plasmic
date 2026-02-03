"use client";

import { useState, FormEvent } from "react";

export interface ContactFormSectionProps {
  heading?: string;
  subheading?: string;
  submitButtonText?: string;
  successMessage?: string;
}

export function ContactFormSection({
  heading,
  subheading,
  submitButtonText = "Send Message",
  successMessage = "Thank you! We'll be in touch soon.",
}: ContactFormSectionProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Wire up actual form submission
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-xl mx-auto text-center bg-green-50 text-green-800 p-8 rounded-xl">
          <p className="text-xl">{successMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-xl mx-auto">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            {heading}
          </h2>
        )}
        {subheading && <p className="text-lg text-gray-600 mb-8 text-center">{subheading}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE5C02] focus:border-[#FE5C02] outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE5C02] focus:border-[#FE5C02] outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE5C02] focus:border-[#FE5C02] outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#FE5C02] hover:bg-[#FE5C02]/80 disabled:bg-[#FE5C02]/40 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            {isSubmitting ? "Sending..." : submitButtonText}
          </button>
        </form>
      </div>
    </section>
  );
}
