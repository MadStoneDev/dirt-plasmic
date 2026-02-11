"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";
import { fmt } from "../../utils/formatText";

export interface DirtFrameworkSectionProps {
  headingStart?: string;
  headingHighlight?: string;
  headingEnd?: string;
  description?: string;
  reversed?: boolean;
  children?: ReactNode;
}

export function DirtFrameworkSection({
  headingStart,
  headingHighlight,
  headingEnd,
  description,
  reversed = true,
  children,
}: DirtFrameworkSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const allChildren = React.Children.toArray(children);
  const displayChildren = reversed ? [...allChildren].reverse() : allChildren;
  const blockCount = allChildren.length;

  // Block and layout dimensions (px) — no vh units, Plasmic-safe
  const BLOCK_HEIGHT = 200; // matches min-h-50
  const OVERLAP = 110;
  const GAP = 0;
  const STICKY_PAD = 64; // py-8 = 32px * 2
  const HEADER_BUFFER = 250; // header area with padding

  // Sticky container: tall enough to show all blocks fully expanded
  const expandedHeight = blockCount * (BLOCK_HEIGHT + GAP);
  const stickyHeight = expandedHeight + STICKY_PAD;

  // Scroll animation distance — how much scrolling drives the 0→1 expansion
  const animationDistance = Math.max(blockCount * 250, 800);

  // Total section height = header + sticky content + animation scroll room
  const sectionHeight = HEADER_BUFFER + stickyHeight + animationDistance;

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
        height: `${sectionHeight}px`,
        gridColumn: "1 / -1",
      }}
    >
      {/* Header — scrolls away naturally before blocks pin */}
      <div className="px-4 pt-16 pb-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-5xl uppercase mb-6">
            <span className="text-dirt-deep">{fmt(headingStart)}</span>
            <span className="text-dirt-pop">{fmt(headingHighlight)}</span>
            <span className="text-dirt-deep">{fmt(headingEnd)}</span>
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
      <div className="sticky top-0" style={{ height: `${stickyHeight}px` }}>
        <div className="h-full px-4 py-8">
          <div className="max-w-7xl mx-auto h-full">
            <div className="relative h-full">
              {displayChildren.map((child, displayIndex) => {
                const originalIndex = reversed ? allChildren.length - 1 - displayIndex : displayIndex;
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
                    {React.isValidElement(child)
                      ? React.cloneElement(child as React.ReactElement<any>, { originalIndex })
                      : child}
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
