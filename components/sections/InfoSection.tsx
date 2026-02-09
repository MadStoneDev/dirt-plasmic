"use client";

import Image from "next/image";
import { ReactNode } from "react";

export interface InfoSectionProps {
  heading?: string;
  subheading?: string;
  richText?: ReactNode;
  image?: string;
  ctaLabel?: string;
  ctaLink?: string;
  layout?: "imageLeft" | "imageRight";
}

export function InfoSection({
  heading,
  subheading,
  richText,
  image,
  ctaLabel,
  ctaLink,
  layout = "imageRight",
}: InfoSectionProps) {
  const isReversed = layout === "imageRight";

  return (
    <section className="py-16 px-4 bg-dirt-off-white" style={{ gridColumn: "1 / -1" }}>
      <div className="max-w-7xl mx-auto">
        {heading && (
          <h2 className="font-display font-bold text-4xl md:text-6xl text-dirt-pop uppercase mb-12">
            {heading}
          </h2>
        )}

        <div
          className={`flex flex-col lg:flex-row gap-12 items-center ${isReversed ? "lg:flex-row-reverse" : ""}`}
        >
          {/* Image Column */}
          {image && (
            <div className="lg:w-1/2">
              <Image
                src={image}
                alt=""
                width={800}
                height={600}
                className="border-[1.5px] border-dirt-black object-cover w-full"
              />
            </div>
          )}

          {/* Info Column */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            {subheading && (
              <h3 className="font-display font-bold text-2xl md:text-4xl text-dirt-pop uppercase">
                {subheading}
              </h3>
            )}

            {richText && (
              <div className="text-lg text-dirt-deep/80 font-sans whitespace-pre-line">
                {richText}
              </div>
            )}

            {ctaLabel && ctaLink && (
              <a
                href={ctaLink}
                className="inline-block px-8 py-4 bg-dirt-pop text-white font-display font-bold uppercase text-lg hover:bg-dirt-deep transition-colors duration-300 w-fit"
              >
                {ctaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
