"use client";

import React, { useState, ReactNode } from "react";
import { fmt } from "../../utils/formatText";

export interface WhatWeBelieveSectionProps {
  heading?: string;
  children?: ReactNode;
  details?: ReactNode;
}

export function WhatWeBelieveSection({
  heading,
  children,
  details,
}: WhatWeBelieveSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Inject index, isActive, onClick into each left-side item
  const items = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return null;
    return React.cloneElement(child as React.ReactElement<any>, {
      index,
      isActive: index === activeIndex,
      onClick: () => setActiveIndex(index),
    });
  });

  // Pick the matching detail for the active index, or nothing
  const detailsArray = React.Children.toArray(details);
  const activeDetail = detailsArray[activeIndex] || null;

  return (
    <section className="py-40 px-8 bg-dirt-pop" style={{ gridColumn: "1 / -1" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column — 45% */}
          <div className="lg:w-[45%] flex flex-col">
            {heading && (
              <h2 className="font-display font-bold text-4xl md:text-6xl text-dirt-off-white uppercase mb-12">
                {fmt(heading)}
              </h2>
            )}

            <div className="flex flex-col">
              {items}
            </div>
          </div>

          {/* Right Column — 55% */}
          <div className="lg:w-[55%] relative min-h-[400px] overflow-hidden">
            {activeDetail}
          </div>
        </div>
      </div>
    </section>
  );
}
