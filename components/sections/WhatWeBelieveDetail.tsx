"use client";

import Image from "next/image";
import { fmt } from "@/utils/formatText";

export interface WhatWeBelieveDetailProps {
  image?: string;
  heading?: string;
  description?: string;
}

export function WhatWeBelieveDetail({
  image,
  heading,
  description,
}: WhatWeBelieveDetailProps) {
  return (
    <div className="relative w-full h-full border-[1.5px] border-dirt-off-white">
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
      <div className="relative z-10 flex flex-col h-full py-40 px-32.5">
        {heading && (
          <h3 className="font-display font-bold text-3xl md:text-9xl text-dirt-pop uppercase mb-4">
            {fmt(heading)}
          </h3>
        )}
        {description && (
          <p className="text-dirt-off-white font-sans text-4xl whitespace-pre-line" style={{
              lineHeight: "1.25"
          }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
