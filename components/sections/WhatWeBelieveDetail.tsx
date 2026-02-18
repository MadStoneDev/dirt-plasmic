"use client";

import Image from "next/image";
import { fmt } from "@/utils/formatText";

export interface WhatWeBelieveDetailProps {
  image?: string;
  heading?: string;
  description?: string;
  // Injected by parent
  itemLabel?: string;
}

export function WhatWeBelieveDetail({
  image,
  heading,
  description,
  itemLabel,
}: WhatWeBelieveDetailProps) {
  return (
    <div className="relative w-full h-full border-[1.5px] border-dirt-off-white" style={{
      aspectRatio: "740/720"
    }}>
      {/* Background Image */}
      {image && (
        <Image
          src={image}
          alt=""
          fill
          className="object-contain object-top-left"
        />
      )}
        
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full py-28 lg:py-40 px-24 lg:px-32.5">
        {heading && (
          <h3 className="font-display font-bold text-[56px] lg:text-9xl text-dirt-pop uppercase mb-6">
            {fmt(heading)}
          </h3>
        )}
        {itemLabel && (
          <p className="inline-block lg:hidden font-display font-bold text-[32px] text-dirt-off-white mb-4">
            {fmt(itemLabel)}
          </p>
        )}
        {description && (
          <p className="text-dirt-off-white font-sans text-xl lg:text-4xl whitespace-pre-line" style={{
              lineHeight: "1.25"
          }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
