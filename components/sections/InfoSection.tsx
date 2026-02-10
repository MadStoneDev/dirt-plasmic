"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { fmt } from "../../utils/formatText";

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
    <section className="py-40 px-4 bg-dirt-off-white" style={{ gridColumn: "1 / -1" }}>
      {/*<div className="mx-auto max-w-7xl">*/}
      <div className="px-8 mx-auto">
        {heading && (
          <h2 className="font-display font-bold text-4xl md:text-6xl text-dirt-pop uppercase mb-12">
            {fmt(heading)}
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
                {fmt(subheading)}
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
                className="inline-flex justify-center items-center gap-1 px-8 py-4 bg-dirt-pop hover:bg-dirt-pop-hover text-dirt-deep font-display font-bold uppercase text-lg transition-colors duration-300 w-full"
              >
                <Image src={`/90deg Arrow.png`} alt={`90 Degrees Arrow`} width={50} height={50} className={`w-4.5 h-3`} />
                <span>{ctaLabel}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
