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
    <div className="relative w-full h-full min-h-100">
      {/* Background Image */}
      {image && (
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-dirt-deep/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full py-40 px-32.5">
        {heading && (
          <h3 className="font-display font-bold text-3xl md:text-9xl text-dirt-pop uppercase mb-4">
            {fmt(heading)}
          </h3>
        )}
        {description && (
          <p className="text-dirt-off-white font-sans text-lg whitespace-pre-line">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
