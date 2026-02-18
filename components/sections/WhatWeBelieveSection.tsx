"use client";

import React, { useState, ReactNode } from "react";
import { fmt } from "@/utils/formatText";

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

  // Plasmic wraps slot children in a React.Fragment — unwrap to get individual items
  const unwrapSlot = (slot: ReactNode): React.ReactNode[] => {
    const arr = React.Children.toArray(slot);
    if (
      arr.length === 1 &&
      React.isValidElement(arr[0]) &&
      arr[0].type === React.Fragment
    ) {
      return React.Children.toArray(
        (arr[0].props as { children?: ReactNode }).children
      );
    }
    return arr;
  };

  // Inject index, isActive, onClick into each left-side item
  const items = unwrapSlot(children).map((child, index) => {
    if (!React.isValidElement(child)) return null;
    return React.cloneElement(child as React.ReactElement<any>, {
      index,
      isActive: index === activeIndex,
      onClick: () => setActiveIndex(index),
    });
  });

  // Read labels from items so we can inject them into matching details
  const rawItems = unwrapSlot(children);
  const labels = rawItems.map((child) =>
    React.isValidElement(child) ? (child.props as any).label : undefined
  );

  // Inject itemLabel into each detail
  const detailsArray = unwrapSlot(details).map((child, i) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child as React.ReactElement<any>, {
      itemLabel: labels[i],
    });
  });

  const activeDetail = detailsArray[activeIndex] || null;

  return (
    <section className="py-16 md:py-40 px-5 md:px-8 w-full bg-dirt-pop" style={{ gridColumn: "1 / -1" }}>
      {/*<div className="max-w-7xl mx-auto">*/}
        <div className="flex flex-col md:flex-row md:items-center md:gap-12">
          {/* Left Column — 45% */}
          <div className="md:w-[45%] flex flex-col">
            {heading && (
              <h2 className="font-display font-bold text-5xl md:text-8xl text-dirt-off-white mb-12">
                {fmt(heading)}
              </h2>
            )}

            <div className="hidden md:flex flex-col gap-8">
              {items}
            </div>
          </div>

          {/* Right Column — 55% */}
          {/* Desktop: show only the active detail */}
          <div className="relative hidden md:block md:w-[55%] overflow-hidden" style={{
            aspectRatio: "740/720"
          }}>
            {activeDetail}
          </div>

          {/* Mobile: show all details stacked */}
          <div className="flex flex-col gap-8 md:hidden">
            {detailsArray}
          </div>
        </div>
      {/*</div>*/}
    </section>
  );
}
