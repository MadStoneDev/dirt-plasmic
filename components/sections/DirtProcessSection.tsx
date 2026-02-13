"use client";

import React, { ReactNode } from "react";
import { fmt } from "@/utils/formatText";

export interface DirtProcessSectionProps {
  headingStart?: string;
  headingHighlight?: string;
  headingEnd?: string;
  children?: ReactNode;
  bottomHeading?: string;
  bottomDescription?: string;
}

export function DirtProcessSection({
  headingStart,
  headingHighlight,
  headingEnd,
  children,
  bottomHeading,
  bottomDescription,
}: DirtProcessSectionProps) {
  // Inject index into each child for alternating layout
  const steps = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return null;
    return React.cloneElement(child as React.ReactElement<any>, { index });
  });

  return (
    <section className="pb-4 pt-16 md:py-40 px-5 md:px-8 bg-dirt-off-white" style={{ gridColumn: "1 / -1" }}>
      {/*<div className="max-w-7xl mx-auto">*/}
        {/* Header */}
        <h2 className="max-w-90 md:max-w-4xl mx-auto font-display font-bold text-5xl md:text-8xl mb-16 text-center">
          <span className="text-dirt-pop">{fmt(headingStart)}</span>
          <span className="text-dirt-deep">{fmt(headingHighlight)}</span>
          <span className="text-dirt-pop">{fmt(headingEnd)}</span>
        </h2>

        {/* Process Steps */}
        <div className="flex flex-col gap-4 md:gap-12">
          {steps}
        </div>

        {/* Bottom CTA Rectangle */}
        {(bottomHeading || bottomDescription) && (
          <div className="mt-4 md:mt-16 bg-dirt-green p-6 md:p-12">
            <div className="grid lg:grid-cols-10 gap-4 md:gap-8 items-center">
              <div className="lg:col-span-4">
                {bottomHeading && (
                  <h3 className="max-w-60 font-sans font-bold text-3xl md:text-5xl text-dirt-deep" style={{
                    lineHeight: "1.25",
                    letterSpacing: "-2%"
                  }}>
                    {bottomHeading}
                  </h3>
                )}
              </div>
              <div className="lg:col-span-6 items-center">
                {bottomDescription && (
                  <p className="text-dirt-deep font-sans text-base md:text-xl whitespace-pre-line" style={{
                    lineHeight: "1.5"
                  }}>
                    {fmt(bottomDescription)}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      {/*</div>*/}
    </section>
  );
}
