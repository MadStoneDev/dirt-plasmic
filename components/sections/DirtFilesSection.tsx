"use client";

import { useState } from "react";
import Image from "next/image";

export interface FileItem {
  heading: string;
  subItems: Array<{ heading: string; description: string }>;
}

export interface DirtFilesSectionProps {
  headingStart?: string;
  headingHighlight?: string;
  headingEnd?: string;
  description?: string;
  // File 1
  file1Heading?: string;
  file1Tag1?: string;
  file1Tag2?: string;
  file1ButtonLabel?: string;
  file1ButtonLink?: string;
  file1Image?: string;
  file1Item1Heading?: string;
  file1Item1Description?: string;
  file1Item2Heading?: string;
  file1Item2Description?: string;
  file1Item3Heading?: string;
  file1Item3Description?: string;
  // File 2
  file2Heading?: string;
  file2Tag1?: string;
  file2Tag2?: string;
  file2ButtonLabel?: string;
  file2ButtonLink?: string;
  file2Image?: string;
  file2Item1Heading?: string;
  file2Item1Description?: string;
  file2Item2Heading?: string;
  file2Item2Description?: string;
  file2Item3Heading?: string;
  file2Item3Description?: string;
  // File 3
  file3Heading?: string;
  file3Tag1?: string;
  file3Tag2?: string;
  file3ButtonLabel?: string;
  file3ButtonLink?: string;
  file3Image?: string;
  file3Item1Heading?: string;
  file3Item1Description?: string;
  file3Item2Heading?: string;
  file3Item2Description?: string;
  file3Item3Heading?: string;
  file3Item3Description?: string;
}

export function DirtFilesSection({
  headingStart,
  headingHighlight,
  headingEnd,
  description,
  file1Heading,
  file1Tag1,
  file1Tag2,
  file1ButtonLabel,
  file1ButtonLink,
  file1Image,
  file1Item1Heading,
  file1Item1Description,
  file1Item2Heading,
  file1Item2Description,
  file1Item3Heading,
  file1Item3Description,
  file2Heading,
  file2Tag1,
  file2Tag2,
  file2ButtonLabel,
  file2ButtonLink,
  file2Image,
  file2Item1Heading,
  file2Item1Description,
  file2Item2Heading,
  file2Item2Description,
  file2Item3Heading,
  file2Item3Description,
  file3Heading,
  file3Tag1,
  file3Tag2,
  file3ButtonLabel,
  file3ButtonLink,
  file3Image,
  file3Item1Heading,
  file3Item1Description,
  file3Item2Heading,
  file3Item2Description,
  file3Item3Heading,
  file3Item3Description,
}: DirtFilesSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const files = [
    {
      heading: file1Heading,
      tag1: file1Tag1,
      tag2: file1Tag2,
      buttonLabel: file1ButtonLabel,
      buttonLink: file1ButtonLink,
      image: file1Image,
      items: [
        { heading: file1Item1Heading, description: file1Item1Description },
        { heading: file1Item2Heading, description: file1Item2Description },
        { heading: file1Item3Heading, description: file1Item3Description },
      ].filter((i) => i.heading || i.description),
    },
    {
      heading: file2Heading,
      tag1: file2Tag1,
      tag2: file2Tag2,
      buttonLabel: file2ButtonLabel,
      buttonLink: file2ButtonLink,
      image: file2Image,
      items: [
        { heading: file2Item1Heading, description: file2Item1Description },
        { heading: file2Item2Heading, description: file2Item2Description },
        { heading: file2Item3Heading, description: file2Item3Description },
      ].filter((i) => i.heading || i.description),
    },
    {
      heading: file3Heading,
      tag1: file3Tag1,
      tag2: file3Tag2,
      buttonLabel: file3ButtonLabel,
      buttonLink: file3ButtonLink,
      image: file3Image,
      items: [
        { heading: file3Item1Heading, description: file3Item1Description },
        { heading: file3Item2Heading, description: file3Item2Description },
        { heading: file3Item3Heading, description: file3Item3Description },
      ].filter((i) => i.heading || i.description),
    },
  ].filter((f) => f.heading);

  const currentImage =
    activeIndex !== null ? files[activeIndex]?.image : files[0]?.image;

  return (
    <section
      className="py-40 px-8 bg-dirt-deep"
      style={{ gridColumn: "1 / -1" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <h2 className="font-display font-bold text-5xl md:text-7xl mb-6">
            <span className="text-dirt-pop">{headingStart}</span>
            <span className="text-dirt-off-white uppercase">
              {headingHighlight}
            </span>
            <span className="text-dirt-pop">{headingEnd}</span>
          </h2>
          {description && (
            <p className="text-2xl text-dirt-pop font-sans max-w-3xl whitespace-pre-line">
              {description}
            </p>
          )}
        </div>

        {/* Two Column Layout - 45% / 55% */}
        <div className="grid lg:grid-cols-[40fr_60fr] gap-8">
          {/* Left - Accordion */}
          <div className="flex flex-col">
            {files.map((file, index) => {
              const isActive = activeIndex === index;

              return (
                <div key={index} className="mb-2">
                  <button
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    className={`w-full text-left p-4 transition-all duration-300 ${
                      isActive
                        ? "bg-dirt-pop"
                        : "bg-transparent hover:bg-dirt-pop/10"
                    }`}
                  >
                    {isActive && (
                      <div className="flex items-stretch justify-end gap-2 mb-4">
                        {file.tag1 && (
                            <span
                              className="px-3 py-1 flex items-center justify-center bg-white/10 text-dirt-off-white uppercase text-xs font-display font-medium"
                              style={{ letterSpacing: "1px" }}
                            >
                              {file.tag1}
                            </span>
                          )}
                          {file.tag2 && (
                            <span
                              className="px-3 py-1 flex items-center justify-center bg-white/10 text-dirt-off-white uppercase text-xs font-display font-medium"
                              style={{ letterSpacing: "1px" }}
                            >
                              {file.tag2}
                            </span>
                          )}
                        {file.buttonLabel && file.buttonLink && (
                          <a
                            href={file.buttonLink}
                            className="px-4 py-1 flex items-center gap-1 bg-dirt-deep text-dirt-off-white uppercase font-display text-sm font-bold hover:bg-dirt-deep/80 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Image
                              src={"/Download 90deg Arrow.png"}
                              alt={"Download Arrow"}
                              width={20}
                              height={14}
                              className={`w-3 h-2`}
                            />
                            {file.buttonLabel}
                          </a>
                        )}
                      </div>
                    )}

                    <h3
                      className={`font-display font-bold text-3xl md:text-5xl uppercase transition-colors ${
                        isActive ? "text-dirt-off-white" : "text-dirt-pop/50"
                      }`}
                    >
                      {file.heading}
                    </h3>

                    {isActive && file.items.length > 0 && (
                      <div className="mt-4 flex flex-col gap-4">
                        {file.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="p-4"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                          >
                            {item.heading && (
                              <h4 className="font-display font-bold text-lg text-dirt-off-white uppercase mb-2">
                                {item.heading}
                              </h4>
                            )}
                            {item.description && (
                              <p className="text-dirt-off-white/80 font-sans text-sm">
                                {item.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right - Image */}
          <div className="relative min-h-[400px]">
            {currentImage ? (
              <Image
                src={currentImage}
                alt=""
                fill
                className="object-cover transition-opacity duration-500"
              />
            ) : (
              <div className="w-full h-full bg-dirt-deep/10 flex items-center justify-center">
                <span className="text-dirt-deep/50 font-sans">
                  Upload images
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
