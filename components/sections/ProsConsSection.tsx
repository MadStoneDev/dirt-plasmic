"use client";

import React, { ReactNode } from "react";
import { fmt } from "../../utils/formatText";

export interface ProsConsSectionProps {
  headingStart?: string;
  headingHighlight?: string;
  headingEnd?: string;
  consHeading?: string;
  prosHeading?: string;
  cons?: ReactNode;
  pros?: ReactNode;
  ctaLabel?: string;
  ctaLink?: string;
  tagline?: string;
}

export function ProsConsSection({
  headingStart,
  headingHighlight,
  headingEnd,
  consHeading = "Without DIRT",
  prosHeading = "With DIRT",
  cons,
  pros,
  ctaLabel,
  ctaLink,
  tagline,
}: ProsConsSectionProps) {
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

  // Inject type="con" into each cons child
  const consItems = unwrapSlot(cons).map((child) => {
    if (!React.isValidElement(child)) return null;
    return React.cloneElement(child as React.ReactElement<any>, { type: "con" });
  });

  // Inject type="pro" into each pros child
  const prosItems = unwrapSlot(pros).map((child) => {
    if (!React.isValidElement(child)) return null;
    return React.cloneElement(child as React.ReactElement<any>, { type: "pro" });
  });

  return (
    <section className="py-40 px-8 bg-dirt-pop" style={{ gridColumn: "1 / -1" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="mx-auto max-w-4xl font-display font-bold text-5xl md:text-7xl mb-20 text-center">
          <span className="text-dirt-off-white">{fmt(headingStart)}</span>
          <span className="text-dirt-deep">{fmt(headingHighlight)}</span>
          <span className="text-dirt-off-white">{fmt(headingEnd)}</span>
        </h2>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Cons Column */}
          <div className="bg-dirt-deep py-14 px-12">
            <h3 className="font-display font-bold text-4xl text-dirt-pop mb-10">
              {fmt(consHeading)}
            </h3>
            <div className="flex flex-col gap-10">
              {consItems}
            </div>
          </div>

          {/* Pros Column */}
          <div className="bg-dirt-deep py-14 px-12">
            <h3 className="font-display font-bold text-4xl text-dirt-green mb-10">
              {fmt(prosHeading)}
            </h3>
            <div className="flex flex-col gap-10">
              {prosItems}
            </div>
          </div>
        </div>

        {/* CTA and Tagline */}
        {(ctaLabel || tagline) && (
          <div className="mt-16 text-center">
            {ctaLabel && (
              <a
                href={ctaLink || "#"}
                className="inline-block bg-dirt-deep text-dirt-off-white font-display font-bold text-lg uppercase px-10 py-4 hover:bg-dirt-black transition-colors"
              >
                {ctaLabel}
              </a>
            )}
            {tagline && (
              <p className="mt-4 text-dirt-off-white font-sans font-light">
                {tagline}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
