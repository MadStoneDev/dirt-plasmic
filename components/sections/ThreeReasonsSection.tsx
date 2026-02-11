"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import { fmt } from "../../utils/formatText";

export interface ThreeReasonsSectionProps {
  headingStart?: string;
  headingHighlight?: string;
  headingEnd?: string;
  description?: string;
  headerImage?: string;
  children?: ReactNode;
}

export function ThreeReasonsSection({
  headingStart,
  headingHighlight,
  headingEnd,
  description,
  headerImage,
  children,
}: ThreeReasonsSectionProps) {
  // Inject index into each child for numbering
  const items = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return null;
    return React.cloneElement(child as React.ReactElement<any>, { index });
  });

  return (
    <section className="relative py-40 px-8 bg-dirt-pop" style={{ gridColumn: "1 / -1" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section - 2/3 to 1/3 split */}
        <div className="mb-32">
          <div className="max-w-2xl">
            <h2 className="font-display font-bold text-5xl md:text-7xl uppercase mb-8" style={{
              lineHeight: "105%",
              letterSpacing: "-2%",
            }}>
              <span className="text-dirt-deep">{fmt(headingStart)}</span>
              <span className="text-dirt-deep">{fmt(headingHighlight)}</span>
              <span className="text-dirt-off-white">{fmt(headingEnd)}</span>
            </h2>
            {description && (
              <p className="text-2xl text-justify text-dirt-off-white font-sans whitespace-pre-line" style={{
                lineHeight: "135%",
              }}>
                {description}
              </p>
            )}
          </div>

          {headerImage && (
            <div className="absolute top-0 right-0">
              <Image
                src={headerImage}
                alt=""
                width={800}
                height={600}
                className="object-cover w-130"
              />
            </div>
          )}
        </div>

        {/* Columns with Numbers */}
        <div className="grid md:grid-cols-3 gap-12">
          {items}
        </div>
      </div>
    </section>
  );
}
