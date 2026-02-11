"use client";

import { ReactNode } from "react";
import { fmt } from "../../utils/formatText";
import Image from "next/image";

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
        className="w-10 h-10 text-dirt-deep"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth={6}
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
    <section
      className="py-40 px-8 bg-dirt-black"
      style={{ gridColumn: "1 / -1" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading with highlighted word */}
        <h2 className="font-display font-bold text-5xl md:text-7xl text-center mb-20">
          <span className="text-dirt-off-white">{fmt(headingStart)}</span>
          <span className="text-dirt-pop">{fmt(headingHighlight)}</span>
          <span className="text-dirt-off-white">{fmt(headingEnd)}</span>
        </h2>

        {/* Three Column Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {items.map((text, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center px-10"
            >
              <PlusIcon />
              <p className="mt-6 text-dirt-off-white font-sans text-2xl font-bold">
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
              className="inline-flex items-center gap-1 px-8 py-3 bg-dirt-pop text-dirt-deep font-display font-bold uppercase text-lg hover:bg-dirt-pop-hover transition-colors duration-300"
            >
              <Image
                src={`/90deg Arrow.png`}
                alt={`90 Degrees Arrow`}
                width={50}
                height={50}
                className={`w-6 h-4`}
              />
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
