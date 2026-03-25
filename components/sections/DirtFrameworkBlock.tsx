"use client";

import Image from "next/image";
import { fmt } from "@/utils/formatText";

export interface DirtFrameworkBlockProps {
  heading?: string;
  description?: string;
  backgroundImage?: string;
  overlayColor?: string;
  // Injected by parent
  originalIndex?: number;
  scrollProgress?: number;
}

export function DirtFrameworkBlock({
  heading,
  description,
  backgroundImage,
  overlayColor,
  originalIndex = 0,
  scrollProgress = 1,
}: DirtFrameworkBlockProps) {
  // Description fades in during the last 30% of the scroll animation
  const descriptionOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.7) / 0.3));
  return (
    <div className="relative lg:h-36 overflow-hidden">
      {/* Colour Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `var(--color-${overlayColor || "dirt-deep"})`,
          opacity: 1,
        }}
      />

        {/* Background Image */}
        {backgroundImage && (
            <Image
                src={backgroundImage}
                alt=""
                fill
                className="object-cover opacity-70"
                style={{
                    mixBlendMode: "soft-light"
                }}
            />
        )}

      {/* Number Badge */}
      <div className="absolute top-0 left-0 w-16 md:w-20 h-16 md:h-20 bg-dirt-black flex items-center justify-center">
        <span className="text-dirt-off-white font-sans font-bold text-3xl md:text-[40px]">
          {originalIndex + 1}
        </span>
      </div>

      {/* Content */}
      <div className="relative pt-8 md:pt-8 pb-8 px-20 md:px-32 grid md:grid-cols-2 items-center gap-4 md:gap-8 min-h-full z-10">
        {heading && (
          <h4 className="font-display font-bold text-5xl md:text-6xl text-dirt-off-white">
            {fmt(heading)}
          </h4>
        )}
        {description && (
          <p
            className="text-dirt-off-white/90 text-xl font-sans whitespace-pre-line transition-opacity duration-150"
            style={{ opacity: descriptionOpacity }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
