"use client";

import Image from "next/image";
import { ReactNode } from "react";

export interface CompanyCarouselSectionProps {
  heading?: string;
  highlightedWord?: string;
  backgroundImage?: string;
  children?: ReactNode;
}

export function CompanyCarouselSection({
  heading,
  highlightedWord,
  backgroundImage,
  children,
}: CompanyCarouselSectionProps) {
  return (
    <section className="relative w-full pt-40 pb-46 pl-8 bg-dirt-pop overflow-hidden" style={{ gridColumn: "1 / -1" }}>
      {backgroundImage && (
        <div className="absolute flex items-end inset-0 bottom-0 z-0 pointer-events-none">
          <Image
            src={backgroundImage}
            alt=""
            width={1440}
            height={600}
            className="w-full object-contain"
          />
        </div>
      )}

      <div className="relative z-10">
        {heading && (
          <h2 className="flex gap-2 text-3xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-24">
            {heading}
            {highlightedWord && (
              <span className="text-dirt-deep uppercase">{highlightedWord}</span>
            )}
          </h2>
        )}

        <div
          className="py-4 pr-8 flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
