"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Image from "next/image";

export interface FrameworkBlock {
  heading?: string;
  description?: string;
  backgroundImage?: string;
  overlayColor?: string;
}

export interface DirtFrameworkSectionProps {
  headingStart?: string;
  headingHighlight?: string;
  headingEnd?: string;
  description?: string;
  reversed?: boolean;
  block1Heading?: string;
  block1Description?: string;
  block1BackgroundImage?: string;
  block2Heading?: string;
  block2Description?: string;
  block2BackgroundImage?: string;
  block3Heading?: string;
  block3Description?: string;
  block3BackgroundImage?: string;
  block4Heading?: string;
  block4Description?: string;
  block4BackgroundImage?: string;
  block5Heading?: string;
  block5Description?: string;
  block5BackgroundImage?: string;
}

export function DirtFrameworkSection({
  headingStart,
  headingHighlight,
  headingEnd,
  description,
  reversed = false,
  block1Heading,
  block1Description,
  block1BackgroundImage,
  block2Heading,
  block2Description,
  block2BackgroundImage,
  block3Heading,
  block3Description,
  block3BackgroundImage,
  block4Heading,
  block4Description,
  block4BackgroundImage,
  block5Heading,
  block5Description,
  block5BackgroundImage,
}: DirtFrameworkSectionProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const blocks = [
    { heading: block1Heading, description: block1Description, backgroundImage: block1BackgroundImage },
    { heading: block2Heading, description: block2Description, backgroundImage: block2BackgroundImage },
    { heading: block3Heading, description: block3Description, backgroundImage: block3BackgroundImage },
    { heading: block4Heading, description: block4Description, backgroundImage: block4BackgroundImage },
    { heading: block5Heading, description: block5Description, backgroundImage: block5BackgroundImage },
  ].filter((b) => b.heading || b.description);

  const displayBlocks = reversed ? [...blocks].reverse() : blocks;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Calculate progress: 0 when section enters view, 1 when section leaves view
      const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getBlockOffset = (index: number) => {
    const baseOffset = index * 120; // Initial stacked offset
    const expandedOffset = 0; // When fully expanded
    const currentOffset = baseOffset * (1 - scrollProgress);
    return currentOffset;
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 bg-dirt-off-white"
      style={{ gridColumn: "1 / -1" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="font-display font-bold text-3xl md:text-5xl uppercase mb-6">
            <span className="text-dirt-deep">{headingStart} </span>
            <span className="text-dirt-pop">{headingHighlight}</span>
            <span className="text-dirt-deep"> {headingEnd}</span>
          </h2>
          {description && (
            <p className="text-lg text-dirt-deep/80 font-sans max-w-3xl whitespace-pre-line">
              {description}
            </p>
          )}
        </div>

        {/* Stacked Blocks */}
        <div className="relative" style={{ minHeight: `${blocks.length * 200 + 100}px` }}>
          {displayBlocks.map((block, displayIndex) => {
            const originalIndex = reversed ? blocks.length - 1 - displayIndex : displayIndex;
            const zIndex = blocks.length - originalIndex;
            const offset = getBlockOffset(displayIndex);

            return (
              <div
                key={displayIndex}
                className="relative w-full transition-transform duration-300 ease-out"
                style={{
                  zIndex,
                  transform: `translateY(${offset}px)`,
                  marginBottom: displayIndex < displayBlocks.length - 1 ? "-80px" : "0",
                }}
              >
                <div className="relative min-h-[200px] overflow-hidden">
                  {/* Background Image */}
                  {block.backgroundImage && (
                    <Image
                      src={block.backgroundImage}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  )}

                  {/* Color Overlay */}
                  <div className="absolute inset-0 bg-dirt-deep/50" />

                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-dirt-deep flex items-center justify-center">
                    <span className="text-dirt-off-white font-display font-bold text-lg">
                      {originalIndex + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-8 pt-20 grid md:grid-cols-2 gap-8">
                    {block.heading && (
                      <h4 className="font-display font-bold text-xl md:text-2xl text-dirt-off-white uppercase">
                        {block.heading}
                      </h4>
                    )}
                    {block.description && (
                      <p className="text-dirt-off-white/90 font-sans whitespace-pre-line">
                        {block.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
