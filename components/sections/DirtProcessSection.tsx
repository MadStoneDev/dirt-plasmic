"use client";

import Image from "next/image";
import { ReactNode } from "react";

export interface ProcessTag {
  label: string;
}

export interface DirtProcessSectionProps {
  headingStart?: string;
  headingHighlight?: string;
  headingEnd?: string;
  // Step 1
  step1Heading?: string;
  step1Description?: string;
  step1Image?: string;
  step1Tags?: string;
  // Step 2
  step2Heading?: string;
  step2Description?: string;
  step2Image?: string;
  step2Tags?: string;
  // Step 3
  step3Heading?: string;
  step3Description?: string;
  step3Image?: string;
  step3Tags?: string;
  // Step 4
  step4Heading?: string;
  step4Description?: string;
  step4Image?: string;
  step4Tags?: string;
  // Step 5
  step5Heading?: string;
  step5Description?: string;
  step5Image?: string;
  step5Tags?: string;
  // Bottom CTA
  bottomHeading?: string;
  bottomDescription?: string;
}

export function DirtProcessSection({
  headingStart,
  headingHighlight,
  headingEnd,
  step1Heading,
  step1Description,
  step1Image,
  step1Tags,
  step2Heading,
  step2Description,
  step2Image,
  step2Tags,
  step3Heading,
  step3Description,
  step3Image,
  step3Tags,
  step4Heading,
  step4Description,
  step4Image,
  step4Tags,
  step5Heading,
  step5Description,
  step5Image,
  step5Tags,
  bottomHeading,
  bottomDescription,
}: DirtProcessSectionProps) {
  const parseTags = (tagsString?: string) =>
    tagsString ? tagsString.split(",").map((t) => t.trim()).filter(Boolean) : [];

  const steps = [
    { heading: step1Heading, description: step1Description, image: step1Image, tags: parseTags(step1Tags) },
    { heading: step2Heading, description: step2Description, image: step2Image, tags: parseTags(step2Tags) },
    { heading: step3Heading, description: step3Description, image: step3Image, tags: parseTags(step3Tags) },
    { heading: step4Heading, description: step4Description, image: step4Image, tags: parseTags(step4Tags) },
    { heading: step5Heading, description: step5Description, image: step5Image, tags: parseTags(step5Tags) },
  ].filter((s) => s.heading || s.description || s.image);

  return (
    <section className="py-16 px-4 bg-dirt-off-white" style={{ gridColumn: "1 / -1" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="font-display font-bold text-3xl md:text-5xl uppercase mb-16 text-center">
          <span className="text-dirt-deep">{headingStart}</span>
          <span className="text-dirt-pop">{headingHighlight}</span>
          <span className="text-dirt-deep">{headingEnd}</span>
        </h2>

        {/* Process Steps */}
        <div className="flex flex-col gap-12">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col gap-12 ${isEven ? "lg:flex-row-reverse" : "lg:flex-row"}`}
              >
                {/* Info Column */}
                <div
                  className="bg-dirt-deep p-12 w-full max-w-[37%] flex flex-col"
                  >
                  {step.heading && (
                    <h3 className="font-display font-bold text-2xl md:text-4xl text-dirt-pop uppercase mb-4">
                      {step.heading}
                    </h3>
                  )}

                  {step.description && (
                    <p className="text-dirt-pop font-san text-lg whitespace-pre-line flex-grow">
                      {step.description}
                    </p>
                  )}

                  {step.tags && step.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-8">
                      {step.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 font-display uppercase text-xs font-medium text-dirt-pop"
                          style={{ backgroundColor: "rgba(254, 92, 2, 0.15)", letterSpacing: "1px" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Image Column */}
                <div className="grow relative min-h-100 lg:min-h-0 aspect-square border-[1.5px] border-dirt-black">
                  {step.image ? (
                    <Image
                      src={step.image}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-dirt-deep/10 flex items-center justify-center">
                      <span className="text-dirt-deep/50 font-sans">Upload image</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
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
