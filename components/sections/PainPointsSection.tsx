"use client";

import React, { useState, ReactNode } from "react";
import { fmt } from "../../utils/formatText";

export interface PainPointsSectionProps {
  heading?: string;
  subheading?: string;
  children?: ReactNode;
  slides?: ReactNode;
}

export function PainPointsSection({
  heading,
  subheading,
  children,
  slides,
}: PainPointsSectionProps) {
  const [checkedCount, setCheckedCount] = useState(0);

  const slidesArray = React.Children.toArray(slides);
  const maxIndex = slidesArray.length - 1;
  const currentIndex = Math.min(checkedCount, maxIndex);
  const activeSlide = slidesArray[currentIndex] || null;

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
        <div className="flex flex-col justify-center">
          {heading && (
            <h2 className="font-display font-bold text-4xl md:text-7xl text-dirt-pop uppercase mb-4">
              {fmt(heading)}
            </h2>
          )}

          {subheading && (
            <h3 className="mt-16 font-display font-bold text-xl md:text-4xl text-dirt-pop uppercase mb-8">
              {fmt(subheading)}
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
        <div className="flex flex-col">
          {activeSlide || (
            <div className="relative grow w-full aspect-square border border-dirt-pop">
              <div className="w-full h-full min-h-100 bg-dirt-deep/10 flex items-center justify-center">
                <span className="text-dirt-deep/50 font-sans">Upload images</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
