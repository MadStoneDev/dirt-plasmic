"use client";

import { useState, ReactNode } from "react";
import Image from "next/image";

export interface PainPointsSectionProps {
  heading?: string;
  subheading?: string;
  children?: ReactNode;
  caption?: string;
  image0?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  image7?: string;
  image8?: string;
  image9?: string;
}

export function PainPointsSection({
  heading,
  subheading,
  children,
  caption,
  image0,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
}: PainPointsSectionProps) {
  const [checkedCount, setCheckedCount] = useState(0);

  const images = [image0, image1, image2, image3, image4, image5, image6, image7, image8, image9];
  const validImages = images.filter(Boolean);
  const maxIndex = validImages.length - 1;
  const currentImage = validImages[Math.min(checkedCount, maxIndex)] || image0;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedCount((prev) => prev + 1);
    } else {
      setCheckedCount((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <section className="py-16 px-4 bg-dirt-off-white" style={{ gridColumn: "1 / -1" }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* Left Column - Headings and Checkboxes */}
        <div className="flex flex-col">
          {heading && (
            <h2 className="font-display font-bold text-3xl md:text-5xl text-dirt-deep uppercase mb-4">
              {heading}
            </h2>
          )}

          {subheading && (
            <h3 className="font-display font-bold text-xl md:text-2xl text-dirt-deep/70 uppercase mb-8">
              {subheading}
            </h3>
          )}

          <div
            className="space-y-4"
            onChange={handleCheckboxChange}
          >
            {children}
          </div>
        </div>

        {/* Right Column - Photo with Border and Caption */}
        <div className="flex flex-col h-full">
          <div className="relative flex-grow border border-dirt-pop">
            {currentImage ? (
              <Image
                src={currentImage}
                alt=""
                fill
                className="object-cover transition-opacity duration-500"
              />
            ) : (
              <div className="w-full h-full min-h-[400px] bg-dirt-deep/10 flex items-center justify-center">
                <span className="text-dirt-deep/50 font-sans">Upload images</span>
              </div>
            )}
          </div>

          {caption && (
            <p className="mt-4 text-dirt-deep/70 font-sans text-sm italic">
              {caption}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
