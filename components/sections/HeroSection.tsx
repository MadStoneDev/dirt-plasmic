"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { fmt } from "@/utils/formatText";

export interface HeroSectionProps {
  heading?: string;
  subheading?: string;
  description?: string;
  backgroundImage?: string;
  foregroundImage?: string;
  midgroundImage?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export function HeroSection({
  heading,
  subheading,
  description,
  backgroundImage,
  foregroundImage,
  midgroundImage,
  ctaLabel,
  ctaLink,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageAreaRef = useRef<HTMLDivElement>(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 768,
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ── Auto-trigger: start animation when image area enters viewport ── */
  useEffect(() => {
    const el = imageAreaRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── Scroll-driven animation (commented out — kept for potential reuse) ── */
  // const [scrollProgress, setScrollProgress] = useState(0);
  // const [animationRunway, setAnimationRunway] = useState(600);
  //
  // useEffect(() => {
  //   const updateRunway = () => {
  //     // ~40vw, clamped between 200px and 600px
  //     setAnimationRunway(Math.min(600, Math.max(200, window.innerWidth * 0.4)));
  //   };
  //   updateRunway();
  //   window.addEventListener("resize", updateRunway);
  //   return () => window.removeEventListener("resize", updateRunway);
  // }, []);
  //
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!sectionRef.current || !textRef.current) return;
  //
  //     const rect = sectionRef.current.getBoundingClientRect();
  //     const scrolled = Math.max(0, -rect.top);
  //     const textHeight = textRef.current.offsetHeight;
  //     const imageHeight = window.innerWidth * 0.63;
  //
  //     // Animation starts when the image area enters full view, whichever comes first:
  //     // 1. Bottom of image area hits bottom of viewport
  //     const stickyStartBottom = Math.max(0, textHeight - window.innerHeight + imageHeight);
  //     // 2. Top of image area hits top of viewport
  //     const stickyStartTop = textHeight;
  //     const stickyStart = Math.min(stickyStartTop, stickyStartBottom);
  //     const animationScrolled = scrolled - stickyStart;
  //     const progress = Math.max(
  //       0,
  //       Math.min(1, animationScrolled / animationRunway),
  //     );
  //
  //     setScrollProgress(progress);
  //   };
  //
  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   handleScroll();
  //
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [animationRunway]);

  // On tall viewports (mobile) the image doesn't need to rise as far
  const aspectRatio = Math.min(1, windowWidth / windowHeight);
  // Extra boost for wide screens (1600px+)
  const wideBoost = Math.max(0, (windowWidth - 1600) / 960) * 60;
  const travelRange = 20 + aspectRatio * 23 + wideBoost;
  const midgroundStart = 25;
  const midgroundEnd = 25 + travelRange;
  const midgroundOffset = animationStarted ? midgroundEnd : midgroundStart;

  return (
    <section
      ref={sectionRef}
      className="relative pt-12 w-full bg-dirt-deep"
      style={{ gridColumn: "1 / -1" }}
    >
      <div className={`px-5 md:px-8`}>
      <div ref={textRef} className={`mx-auto`}>
        {heading && (
          <h1 className="mb-6 max-w-3xl font-display font-bold text-5xl md:text-8xl text-dirt-pop uppercase">
            {fmt(heading)}
          </h1>
        )}

        {subheading && (
          <div className="pointer-events-auto">
            <div className="flex justify-between h-56 md:h-80 w-full">
              {subheading.split(" ").map((word, index, arr) => {
                const totalWords = arr.length;
                const progress = index / (totalWords - 1 || 1);
                return (
                  <div key={index} className="flex flex-col h-full min-w-0">
                    <div style={{ flexGrow: 1 - progress }} />
                    <span className="font-display font-bold text-5xl md:text-8xl text-dirt-pop uppercase leading-none">
                      {word}
                    </span>
                    <div style={{ flexGrow: progress }} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {description && (
          <section className="mt-12 mb-16 max-w-md sm:max-w-230">
            <p className="font-sans text-left text-xl md:text-4xl text-dirt-pop" style={{
              lineHeight: "1.25"
            }}>
              {description}
            </p>
          </section>
        )}

        {ctaLabel && (
          <section>
            <a
              href={ctaLink || "#"}
              className="inline-flex items-center justify-center gap-1 bg-dirt-pop hover:bg-dirt-pop-hover px-8 py-4 w-full transition-all duration-300"
            >
              <Image
                src={`/90deg Arrow.png`}
                alt={`90 Degrees Arrow`}
                width={50}
                height={50}
                className={`w-6`}
              />
              <span className="text-dirt-deep text-xl font-display font-bold uppercase">
                {ctaLabel}
              </span>
            </a>
          </section>
        )}
      </div>
      </div>

      <div ref={imageAreaRef} className="relative h-[63vw] overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-[60vw] max-h-215.75">
          {backgroundImage && (
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-contain 2xl:object-cover object-bottom z-0"
              priority
            />
          )}

          {midgroundImage && (
            <div
              className="absolute left-0 right-0 px-8 z-10 flex justify-center"
              style={{
                bottom: `${midgroundOffset}%`,
                transform: "translateY(50%)",
                transition: "bottom 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <Image
                src={midgroundImage}
                alt=""
                width={1440}
                height={400}
                className="w-full h-auto"
              />
            </div>
          )}

          {!midgroundImage && (
            <div
              className="absolute left-0 right-0 z-10 flex justify-center"
              style={{
                bottom: `${midgroundOffset}%`,
                transform: "translateY(50%)",
                transition: "bottom 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <span
                className="text-[20vw] font-black text-white tracking-tight"
                style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
              >
                DIRT
              </span>
            </div>
          )}

          {foregroundImage && (
            <Image
              src={foregroundImage}
              alt=""
              fill
              className="object-contain 2xl:object-cover object-bottom z-20"
            />
          )}
        </div>
      </div>

      {/* Scroll runway — commented out, kept for potential reuse */}
      {/* <div style={{ height: animationRunway }} aria-hidden="true" /> */}
    </section>
  );
}
