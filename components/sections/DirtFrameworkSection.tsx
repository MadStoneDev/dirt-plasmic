"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
  block1OverlayColor?: string;
  block2OverlayColor?: string;
  block3OverlayColor?: string;
  block4OverlayColor?: string;
  block5OverlayColor?: string;
}

export function DirtFrameworkSection({
  headingStart,
  headingHighlight,
  headingEnd,
  description,
  reversed = true,
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
  block1OverlayColor,
  block2OverlayColor,
  block3OverlayColor,
  block4OverlayColor,
  block5OverlayColor,
}: DirtFrameworkSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const blocks = [
    { heading: block1Heading, description: block1Description, backgroundImage: block1BackgroundImage, overlayColor: block1OverlayColor },
    { heading: block2Heading, description: block2Description, backgroundImage: block2BackgroundImage, overlayColor: block2OverlayColor },
    { heading: block3Heading, description: block3Description, backgroundImage: block3BackgroundImage, overlayColor: block3OverlayColor },
    { heading: block4Heading, description: block4Description, backgroundImage: block4BackgroundImage, overlayColor: block4OverlayColor },
    { heading: block5Heading, description: block5Description, backgroundImage: block5BackgroundImage, overlayColor: block5OverlayColor },
  ].filter((b) => b.heading || b.description);

  const displayBlocks = reversed ? [...blocks].reverse() : blocks;
  const blockCount = displayBlocks.length;

  // Extra scroll distance for the pin effect — more blocks = more scroll room
  const scrollDistance = Math.max(blockCount * 300, 1000);

  // Overlap in stacked state: ~50% of card height
  const OVERLAP = 110;
  const GAP = 0;

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!sectionRef.current || !triggerRef.current) {
        ticking = false;
        return;
      }
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const triggerRect = triggerRef.current.getBoundingClientRect();

      // Distance from section top to trigger = header height
      const headerHeight = triggerRect.top - sectionRect.top;
      // Animation starts when trigger hits viewport top, ends when section bottom hits viewport bottom
      const totalAnimationScroll =
        sectionRef.current.offsetHeight - window.innerHeight - headerHeight;

      if (totalAnimationScroll > 0) {
        const scrolled = -triggerRect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalAnimationScroll));
        setScrollProgress(progress);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-dirt-off-white"
      style={{
        height: `calc(100vh + ${scrollDistance}px)`,
        maxHeight: "250vh",
        gridColumn: "1 / -1",
      }}
    >
      {/* Header — scrolls away naturally before blocks pin */}
      <div className="px-4 pt-16 pb-8">
        <div className="max-w-7xl mx-auto">
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
      </div>

      {/* Trigger — marks where the sticky pin begins */}
      <div ref={triggerRef} />

      {/* Sticky blocks — pins when reaching viewport top */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="h-full px-4 py-8">
          <div className="max-w-7xl mx-auto h-full">
            <div className="relative h-full">
              {displayBlocks.map((block, displayIndex) => {
                const originalIndex = reversed ? blocks.length - 1 - displayIndex : displayIndex;
                const zIndex = reversed ? displayIndex + 1 : blockCount - displayIndex;

                // Stacked: negative margin pulls cards up to overlap
                // Expanded: 0 overlap + gap
                const mt =
                  displayIndex === 0
                    ? 0
                    : -OVERLAP + scrollProgress * (OVERLAP + GAP);

                return (
                  <div
                    key={displayIndex}
                    className="relative w-full"
                    style={{
                      zIndex,
                      marginTop: displayIndex === 0 ? 0 : `${mt}px`,
                    }}
                  >
                    <div className="relative min-h-50 overflow-hidden">
                      {/* Background Image */}
                      {block.backgroundImage && (
                        <Image
                          src={block.backgroundImage}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      )}

                      {/* Colour Overlay */}
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundColor: `var(--color-${block.overlayColor || "dirt-deep"})`,
                          opacity: 0.75
                        }}
                      />

                      {/* Number Badge */}
                      <div className="absolute top-0 left-0 w-12 h-12 bg-dirt-black flex items-center justify-center">
                        <span className="text-dirt-off-white font-sans font-bold text-2xl">
                          {originalIndex + 1}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 p-8 pt-20 grid md:grid-cols-2 gap-8">
                        {block.heading && (
                          <h4 className="font-display font-bold text-4xl md:text-6xl text-dirt-off-white uppercase">
                            {block.heading}
                          </h4>
                        )}
                        {block.description && (
                          <p className="text-dirt-off-white/90 text-lg font-sans whitespace-pre-line">
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
        </div>
      </div>
    </section>
  );
}
