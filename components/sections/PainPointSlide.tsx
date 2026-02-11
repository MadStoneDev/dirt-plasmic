"use client";

import Image from "next/image";

export interface PainPointSlideProps {
  image?: string;
  caption?: string;
}

export function PainPointSlide({
  image,
  caption,
}: PainPointSlideProps) {
  return (
    <>
      <div className="relative grow w-full aspect-square border border-dirt-pop">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-full min-h-100 bg-dirt-deep/10 flex items-center justify-center">
            <span className="text-dirt-deep/50 font-sans">Upload images</span>
          </div>
        )}
      </div>

      {caption && (
        <p className="py-2 px-6 bg-dirt-pop font-display text-dirt-deep font-bold text-center text-xl uppercase transition-all duration-300">
          {caption}
        </p>
      )}
    </>
  );
}
