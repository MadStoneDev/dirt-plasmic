"use client";

import Image from "next/image";
import { fmt } from "@/utils/formatText";

export interface WhatWeBelieveDetailProps {
  image?: string;
  overlayImage?: string;
  heading?: string;
  description?: string;
  // Injected by parent
  itemLabel?: string;
}

export function WhatWeBelieveDetail({
  image,
  overlayImage,
  heading,
  description,
  itemLabel,
}: WhatWeBelieveDetailProps) {
  return (
    <div
      className="relative w-full md:aspect-740/720 border-[1.5px] border-dirt-off-white"
    >
      {/* Background Image */}
      {image && (
        <Image
          src={image}
          alt=""
          fill
          className="object-cover object-top-left"
        />
      )}

      {/* Overlay Image */}
      {overlayImage && (
        <div className={`absolute top-0 left-0`}>
          <Image
            src={overlayImage}
            alt=""
            width={300}
            height={300}
            className={`w-32 md:w-68 xl:w-80 3xl:w-120 h-auto object-contain object-top-left`}
          />
        </div>
      )}

      {/* Content */}
      <div className={`py-16 md:py-36 xl:py-40 3xl:py-68 px-16 md:px-32.5 3xl:px-52 relative flex flex-col h-full z-10`}>
        {heading && (
          <h3 className="font-display font-bold text-[54px] md:text-8xl xl:text-9xl text-dirt-pop uppercase mb-2 md:mb-6 3xl:mb-20">
            {fmt(heading)}
          </h3>
        )}
        {itemLabel && (
          <p className="inline-block md:hidden font-sans font-bold text-[32px] text-dirt-off-white mb-4" style={{
            letterSpacing: "1.15",
          }}>
            {fmt(itemLabel)}
          </p>
        )}
        {description && (
          <p
            className="text-dirt-off-white font-sans text-xl md:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-[56px] whitespace-pre-line"
            style={{
              lineHeight: "1.25",
            }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
