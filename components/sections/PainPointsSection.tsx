"use client";

import { useState, ReactNode } from "react";
import Image from "next/image";

export interface PainPointsSectionProps {
  heading?: string;
  subheading?: string;
  children?: ReactNode;
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
  caption0?: string;
  caption1?: string;
  caption2?: string;
  caption3?: string;
  caption4?: string;
  caption5?: string;
  caption6?: string;
  caption7?: string;
  caption8?: string;
  caption9?: string;
}

export function PainPointsSection({
  heading,
  subheading,
  children,
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
  caption0,
  caption1,
  caption2,
  caption3,
  caption4,
  caption5,
  caption6,
  caption7,
  caption8,
  caption9,
}: PainPointsSectionProps) {
  const [checkedCount, setCheckedCount] = useState(0);

  const images = [image0, image1, image2, image3, image4, image5, image6, image7, image8, image9];
  const captions = [caption0, caption1, caption2, caption3, caption4, caption5, caption6, caption7, caption8, caption9];
  const validImages = images.filter(Boolean);
  const maxIndex = validImages.length - 1;
  const currentIndex = Math.min(checkedCount, maxIndex);
  const currentImage = validImages[currentIndex] || image0;
  const currentCaption = captions[currentIndex];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedCount((prev) => prev + 1);
    } else {
      setCheckedCount((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <section className="py-40 px-4 bg-dirt-deep" style={{ gridColumn: "1 / -1" }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* Left Column - Headings and Checkboxes */}
        <div className="flex flex-col">
          {heading && (
            <h2 className="font-display font-bold text-3xl md:text-5xl text-dirt-pop uppercase mb-4">
              {heading}
            </h2>
          )}

          {subheading && (
            <h3 className="font-display font-bold text-xl md:text-2xl text-dirt-pop uppercase mb-8">
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
          <div className="relative grow border border-dirt-pop">
            {currentImage ? (
              <Image
                src={currentImage}
                alt=""
                fill
                className="object-cover transition-opacity duration-500"
              />
            ) : (
              <div className="w-full h-full min-h-100 bg-dirt-deep/10 flex items-center justify-center">
                <span className="text-dirt-deep/50 font-sans">Upload images</span>
              </div>
            )}
          </div>

          {currentCaption && (
            <p className="py-2 px-6 bg-dirt-pop font-display text-dirt-deep font-bold text-center text-xl uppercase transition-all duration-300">
              {currentCaption}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
