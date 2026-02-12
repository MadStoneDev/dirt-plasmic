"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { fmt } from "@/utils/formatText";

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
    <section className="relative w-full pt-16 md:pt-40 pb-16 md:pb-46 bg-dirt-pop overflow-hidden" style={{ gridColumn: "1 / -1" }}>
      {backgroundImage && (
        <div className="absolute flex items-end inset-0 bottom-0 z-0 pointer-events-none">
          <Image
            src={backgroundImage}
            alt=""
            width={1440}
            height={600}
            className="object-bottom h-[85%] md:w-full object-cover md:object-contain"
          />
        </div>
      )}

      <div className="relative pl-5 md:pl-8 z-10">
        {heading && (
          <h2 className="pr-5 text-5xl md:text-8xl font-display font-bold text-white mb-8 md:mb-24">
            {fmt(heading)}
            {highlightedWord && (
              <span className="text-dirt-deep uppercase">{fmt(highlightedWord)}</span>
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
