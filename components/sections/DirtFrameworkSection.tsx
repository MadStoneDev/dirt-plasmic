"use client";

import React, { useCallback, useEffect, useRef, useState, ReactNode } from "react";
import { fmt } from "@/utils/formatText";

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
  const [isMd, setIsMd] = useState(false);

  const allChildren = React.Children.toArray(children);
  const displayChildren = reversed ? [...allChildren].reverse() : allChildren;
  const blockCount = allChildren.length;

  // Track the tallest block so all blocks can match it
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [maxBlockHeight, setMaxBlockHeight] = useState(0);

  const measureBlocks = useCallback(() => {
    const heights = blockRefs.current
      .filter(Boolean)
      .map((el) => el!.scrollHeight);
    if (heights.length > 0) {
      setMaxBlockHeight(Math.max(...heights));
    }
  }, []);

  useEffect(() => {
    measureBlocks();
    window.addEventListener("resize", measureBlocks);
    return () => window.removeEventListener("resize", measureBlocks);
  }, [measureBlocks, children]);

  // Block and layout dimensions (px) — no vh units, Plasmic-safe
  const BLOCK_HEIGHT = maxBlockHeight || 144; // measured from tallest block, fallback to h-36
  const OVERLAP = 100;
  const GAP = 0;
  const STICKY_PAD = 64; // py-8 = 32px * 2
  const HEADER_BUFFER = 250; // header area with padding

  // Sticky container: tall enough to show all blocks fully expanded
  const expandedHeight = blockCount * (BLOCK_HEIGHT + GAP);
  const stickyHeight = expandedHeight + STICKY_PAD;

  // Scroll animation distance — how much scrolling drives the 0→1 expansion
  const animationDistance = 500;
  // Extra hold after cards are fully open before section releases
  const holdDistance = 400;

  // Total section height = header + sticky content + animation + hold
  const sectionHeight = HEADER_BUFFER + stickyHeight + animationDistance + holdDistance;

  // Track md breakpoint (768px)
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsMd(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    // On mobile, skip scroll mechanic — blocks are fully expanded
    if (!isMd) {
      setScrollProgress(1);
      return;
    }

    let ticking = false;

    const updateProgress = () => {
      if (!sectionRef.current || !triggerRef.current) {
        ticking = false;
        return;
      }
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();

      // triggerRef is at section top (absolute positioned).
      // Once the section scrolls up and the sticky pins, triggerRect.top keeps decreasing.
      // We want animation to start once the heading area has scrolled to viewport top
      // (i.e. after the section's top padding has scrolled away).
      const sectionPadding = 160; // md:pt-40
      const scrolled = -(triggerRect.top + sectionPadding);
      const progress = Math.max(0, Math.min(1, scrolled / animationDistance));
      setScrollProgress(progress);
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
  }, [isMd]);

  return (
    <section
      ref={sectionRef}
      className="relative pt-16 md:pt-40 pb-2 md:pb-8 px-5 md:px-8 bg-dirt-off-white"
      style={{
        height: isMd ? `${sectionHeight}px` : "auto",
        gridColumn: "1 / -1",
      }}
    >
      {/* Trigger — scrolls normally, drives animation progress */}
      <div ref={triggerRef} className="absolute" style={{ top: 0, left: 0 }} />

      {/* Sticky container — heading + blocks pin together */}
      <div className="md:sticky top-0" style={{ height: isMd ? `${stickyHeight + HEADER_BUFFER}px` : "auto" }}>
        {/* Header */}
        <div className="mb-0 pt-4">
          <h2 className="max-w-xs md:max-w-none mx-auto font-display font-bold text-5xl md:text-8xl text-center mb-6">
            <span className="text-dirt-pop">{fmt(headingStart)}</span>
            <span className="text-dirt-deep">{fmt(headingHighlight)}</span>
            <span className="text-dirt-pop">{fmt(headingEnd)}</span>
          </h2>
          {description && (
            <p className="text-center text-xl md:text-3xl text-dirt-deep/80 font-sans whitespace-pre-line">
              {fmt(description)}
            </p>
          )}
        </div>

        <div className={`${isMd ? "" : ""} py-8`}>
          <div className={isMd ? "h-full" : ""}>
            <div className={`relative ${isMd ? "h-full" : ""}`}>
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
                    ref={(el) => { blockRefs.current[displayIndex] = el; }}
                    className="relative w-full"
                    style={{
                      zIndex,
                      marginTop: displayIndex === 0 ? 0 : `${mt}px`,
                    }}
                  >
                    {React.isValidElement(child)
                      ? React.cloneElement(child as React.ReactElement<any>, { originalIndex, scrollProgress, minBlockHeight: maxBlockHeight || undefined })
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
