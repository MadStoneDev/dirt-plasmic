"use client";

import React, { ReactNode } from "react";
import { fmt } from "../../utils/formatText";

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
    <section className="py-16 px-4 bg-dirt-off-white" style={{ gridColumn: "1 / -1" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="font-display font-bold text-3xl md:text-5xl uppercase mb-16 text-center">
          <span className="text-dirt-deep">{fmt(headingStart)}</span>
          <span className="text-dirt-pop">{fmt(headingHighlight)}</span>
          <span className="text-dirt-deep">{fmt(headingEnd)}</span>
        </h2>

        {/* Process Steps */}
        <div className="flex flex-col gap-12">
          {steps}
        </div>

        {/* Bottom CTA Rectangle */}
        {(bottomHeading || bottomDescription) && (
          <div className="mt-16 bg-dirt-green p-8 md:p-12">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                {bottomHeading && (
                  <h3 className="font-display font-bold text-2xl md:text-4xl text-dirt-deep">
                    {bottomHeading}
                  </h3>
                )}
              </div>
              <div className="lg:col-span-7 items-center">
                {bottomDescription && (
                  <p className="text-dirt-deep font-sans text-base whitespace-pre-line">
                    {bottomDescription}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
