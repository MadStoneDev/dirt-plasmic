"use client";

import Image from "next/image";
import { fmt } from "../../utils/formatText";

export interface ThreeReasonsSectionProps {
  headingStart?: string;
  headingHighlight?: string;
  headingEnd?: string;
  description?: string;
  headerImage?: string;
  reason1Heading?: string;
  reason1Description?: string;
  reason2Heading?: string;
  reason2Description?: string;
  reason3Heading?: string;
  reason3Description?: string;
}

export function ThreeReasonsSection({
  headingStart,
  headingHighlight,
  headingEnd,
  description,
  headerImage,
  reason1Heading,
  reason1Description,
  reason2Heading,
  reason2Description,
  reason3Heading,
  reason3Description,
}: ThreeReasonsSectionProps) {
  const reasons = [
    { number: 1, heading: reason1Heading, description: reason1Description },
    { number: 2, heading: reason2Heading, description: reason2Description },
    { number: 3, heading: reason3Heading, description: reason3Description },
  ].filter((r) => r.heading || r.description);

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

        {/* Three Columns with Numbers */}
        <div className="grid md:grid-cols-3 gap-12">
          {reasons.map((reason) => (
            <div key={reason.number} className="flex flex-col">
              {/* Number in square */}
              <div className="w-16 h-16 bg-dirt-deep flex items-center justify-center mb-10">
                <span className="text-white font-sans font-bold text-3xl">
                  {reason.number}
                </span>
              </div>

              {reason.heading && (
                <h3 className="font-display font-bold text-xl md:text-4xl text-dirt-off-white uppercase mb-5">
                  {reason.heading}
                </h3>
              )}

              {reason.description && (
                <p className="text-lg text-justify text-dirt-off-white font-sans whitespace-pre-line">
                  {reason.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
