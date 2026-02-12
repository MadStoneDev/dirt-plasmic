"use client";

import { ReactNode } from "react";
import { fmt } from "@/utils/formatText";
import Image from "next/image";

export interface SignsCTASectionProps {
  headingStart?: string;
  headingHighlight?: string;
  headingEnd?: string;
  children?: ReactNode;
  ctaLabel?: string;
  ctaLink?: string;
}

export function SignsCTASection({
  headingStart,
  headingHighlight,
  headingEnd,
  children,
  ctaLabel,
  ctaLink,
}: SignsCTASectionProps) {
  return (
    <section
      className="py-16 md:py-40 px-8 bg-dirt-black"
      style={{ gridColumn: "1 / -1" }}
    >
      {/*<div className="max-w-7xl mx-auto">*/}
        {/* Heading with highlighted word */}
        <h2 className="font-display font-bold text-5xl md:text-8xl text-center mb-20">
          <span className="text-dirt-off-white">{fmt(headingStart)}</span>
          <span className="text-dirt-pop">{fmt(headingHighlight)}</span>
          <span className="text-dirt-off-white">{fmt(headingEnd)}</span>
        </h2>

        {/* Three Column Section */}
        <div className="grid md:grid-cols-3 gap-16 md:gap-10 mb-20">
          {children}
        </div>

        {/* CTA Button */}
        {ctaLabel && ctaLink && (
          <div className="flex justify-center">
            <a
              href={ctaLink}
              className="inline-flex items-center gap-2 px-8 py-3 bg-dirt-pop text-dirt-deep font-display font-bold uppercase text-lg hover:bg-dirt-pop-hover transition-colors duration-300"
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
      {/*</div>*/}
    </section>
  );
}
