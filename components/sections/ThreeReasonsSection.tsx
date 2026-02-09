"use client";

import Image from "next/image";

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
    <section className="py-16 px-4 bg-dirt-off-white" style={{ gridColumn: "1 / -1" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section - 2/3 to 1/3 split */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-3xl md:text-5xl uppercase mb-6">
              <span className="text-dirt-deep">{headingStart}</span>
              <span className="text-dirt-pop">{headingHighlight}</span>
              <span className="text-dirt-deep">{headingEnd}</span>
            </h2>
            {description && (
              <p className="text-lg text-dirt-deep/80 font-sans whitespace-pre-line">
                {description}
              </p>
            )}
          </div>

          {headerImage && (
            <div className="lg:col-span-1">
              <Image
                src={headerImage}
                alt=""
                width={400}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>

        {/* Three Columns with Numbers */}
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <div key={reason.number} className="flex flex-col">
              {/* Number in square */}
              <div className="w-12 h-12 bg-dirt-deep flex items-center justify-center mb-4">
                <span className="text-white font-display font-bold text-xl">
                  {reason.number}
                </span>
              </div>

              {reason.heading && (
                <h3 className="font-display font-bold text-xl md:text-2xl text-dirt-deep uppercase mb-3">
                  {reason.heading}
                </h3>
              )}

              {reason.description && (
                <p className="text-dirt-deep/80 font-sans whitespace-pre-line">
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
