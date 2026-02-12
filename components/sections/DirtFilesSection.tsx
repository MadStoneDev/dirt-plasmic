"use client";

import React, { useState, ReactNode } from "react";
import Image from "next/image";
import { fmt } from "@/utils/formatText";

export interface DirtFilesSectionProps {
  headingStart?: string;
  headingHighlight?: string;
  headingEnd?: string;
  description?: string;
  children?: ReactNode;
}

export function DirtFilesSection({
  headingStart,
  headingHighlight,
  headingEnd,
  description,
  children,
}: DirtFilesSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const filesArray = React.Children.toArray(children);

  // Read the image prop from the active child for the right column
  const activeChild = activeIndex !== null
    ? (filesArray[activeIndex] as React.ReactElement<any>)
    : (filesArray[0] as React.ReactElement<any>);
  const currentImage = activeChild?.props?.image;

  // Inject isActive and onClick into each child
  const files = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return null;
    return React.cloneElement(child as React.ReactElement<any>, {
      isActive: activeIndex === index,
      onClick: () => setActiveIndex(activeIndex === index ? null : index),
    });
  });

  return (
    <section
      className="py-16 md:py-40 px-5 md:px-8 bg-dirt-deep"
      style={{ gridColumn: "1 / -1" }}
    >
      {/*<div className="max-w-7xl mx-auto">*/}
        {/* Header */}
        <div className="mb-12 md:mb-20">
          <h2 className="font-display font-bold text-5xl md:text-8xl mb-6">
            <span className="text-dirt-pop">{fmt(headingStart)}</span>
            <span className="text-dirt-off-white uppercase">
              {fmt(headingHighlight)}
            </span>
            <span className="text-dirt-pop">{fmt(headingEnd)}</span>
          </h2>
          {description && (
            <p className="text-xl md:text-3xl text-dirt-pop font-sans max-w-3xl whitespace-pre-line">
              {description}
            </p>
          )}
        </div>

        {/* Two Column Layout - 40% / 60% */}
        <div className="grid md:grid-cols-[45fr_55fr] gap-8">
          {/* Image on Mobile Only */}
          <div className="md:hidden relative w-full aspect-square border-[1.5px] border-dirt-pop">
            {currentImage ? (
                <Image
                    src={currentImage}
                    alt=""
                    fill
                    className="object-cover transition-opacity duration-300"
                />
            ) : (
                <div className="w-full h-full bg-dirt-deep/10 flex items-center justify-center">
                <span className="text-dirt-deep/50 font-sans">
                  Upload images
                </span>
                </div>
            )}
          </div>
          
          {/* Left - Accordion */}
          <div className="flex flex-col">
            {files}
          </div>

          {/* Right - Image */}
          <div className="hidden md:block relative border-[1.5px] border-dirt-pop">
            {currentImage ? (
              <Image
                src={currentImage}
                alt=""
                fill
                className="object-cover transition-opacity duration-300"
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
      {/*</div>*/}
    </section>
  );
}
