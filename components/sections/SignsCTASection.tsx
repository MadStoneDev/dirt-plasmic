"use client";

import { ReactNode } from "react";
import { fmt } from "../../utils/formatText";

export interface SignsCTAItem {
  text?: string;
}

export interface SignsCTASectionProps {
  headingStart?: string;
  headingHighlight?: string;
  headingEnd?: string;
  item1Text?: string;
  item2Text?: string;
  item3Text?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

function PlusIcon() {
  return (
    <div className="w-16 h-16 bg-dirt-pop flex items-center justify-center">
      <svg
        className="w-8 h-8 text-dirt-deep"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M12 4v16m8-8H4"
        />
      </svg>
    </div>
  );
}

export function SignsCTASection({
  headingStart,
  headingHighlight,
  headingEnd,
  item1Text,
  item2Text,
  item3Text,
  ctaLabel,
  ctaLink,
}: SignsCTASectionProps) {
  const items = [item1Text, item2Text, item3Text].filter(Boolean);

  return (
    <section className="py-16 px-4 bg-dirt-off-white" style={{ gridColumn: "1 / -1" }}>
      <div className="max-w-7xl mx-auto">
        {/* Heading with highlighted word */}
        <h2 className="font-display font-bold text-3xl md:text-5xl uppercase text-center mb-16">
          <span className="text-dirt-deep">{fmt(headingStart)}</span>
          <span className="text-dirt-pop">{fmt(headingHighlight)}</span>
          <span className="text-dirt-deep">{fmt(headingEnd)}</span>
        </h2>

        {/* Three Column Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {items.map((text, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <PlusIcon />
              <p className="mt-6 text-dirt-deep font-sans text-lg">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {ctaLabel && ctaLink && (
          <div className="flex justify-center">
            <a
              href={ctaLink}
              className="inline-block px-8 py-4 bg-dirt-pop text-white font-display font-bold uppercase text-lg hover:bg-dirt-deep transition-colors duration-300"
            >
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
