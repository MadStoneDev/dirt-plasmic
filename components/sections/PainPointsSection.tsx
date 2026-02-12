"use client";

import React, { useState, ReactNode } from "react";
import { fmt } from "@/utils/formatText";

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

  // Plasmic wraps slot children in a React.Fragment — unwrap to get individual slides
  const rawSlides = React.Children.toArray(slides);
  const slidesArray =
    rawSlides.length === 1 &&
    React.isValidElement(rawSlides[0]) &&
    rawSlides[0].type === React.Fragment
      ? React.Children.toArray((rawSlides[0].props as { children?: ReactNode }).children)
      : rawSlides;

  const maxIndex = slidesArray.length - 1;
  const currentIndex = Math.min(checkedCount, maxIndex);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedCount((prev) => prev + 1);
    } else {
      setCheckedCount((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <section className="py-16 md:py-40 px-4 bg-dirt-deep" style={{ gridColumn: "1 / -1" }}>
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Headings and Checkboxes */}
        <div className="flex flex-col justify-center">
          {heading && (
            <h2 className="font-display font-bold text-5xl md:text-8xl text-dirt-pop uppercase">
              {fmt(heading)}
            </h2>
          )}

          {subheading && (
            <h3 className="mt-16 font-display font-bold text-3xl md:text-4xl text-dirt-pop uppercase mb-8">
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

        {/* Right Column - Slide Carousel */}
        <div className="grid overflow-hidden">
          {slidesArray.length > 0 ? (
            slidesArray.map((slide, i) => (
              <div
                key={i}
                className="col-start-1 row-start-1 transition-transform duration-500 ease-in-out"
                style={{ transform: `translateY(${(i - currentIndex) * 100}%)` }}
              >
                {slide}
              </div>
            ))
          ) : (
            <div className="relative w-full aspect-square border border-dirt-pop">
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
