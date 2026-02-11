"use client";

import Image from "next/image";
import { fmt } from "../../utils/formatText";

export interface DirtFrameworkBlockProps {
  heading?: string;
  description?: string;
  backgroundImage?: string;
  overlayColor?: string;
  // Injected by parent
  originalIndex?: number;
}

export function DirtFrameworkBlock({
  heading,
  description,
  backgroundImage,
  overlayColor,
  originalIndex = 0,
}: DirtFrameworkBlockProps) {
  return (
    <div className="relative min-h-50 overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
        />
      )}

      {/* Colour Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `var(--color-${overlayColor || "dirt-deep"})`,
          opacity: 0.75,
        }}
      />

      {/* Number Badge */}
      <div className="absolute top-0 left-0 w-12 h-12 bg-dirt-black flex items-center justify-center">
        <span className="text-dirt-off-white font-sans font-bold text-2xl">
          {originalIndex + 1}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 pt-20 grid md:grid-cols-2 gap-8">
        {heading && (
          <h4 className="font-display font-bold text-4xl md:text-6xl text-dirt-off-white uppercase">
            {fmt(heading)}
          </h4>
        )}
        {description && (
          <p className="text-dirt-off-white/90 text-lg font-sans whitespace-pre-line">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
