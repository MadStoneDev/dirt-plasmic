"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { fmt } from "../../utils/formatText";

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
  const [scrollProgress, setScrollProgress] = useState(0);

  const ANIMATION_RUNWAY = 600;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !textRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const textHeight = textRef.current.offsetHeight;

      // Animation starts when the image area becomes stuck (text has scrolled past)
      const animationScrolled = scrolled - textHeight;
      const progress = Math.max(0, Math.min(1, animationScrolled / ANIMATION_RUNWAY));

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const midgroundOffset = 25 + scrollProgress * 52;

  return (
    <section ref={sectionRef} className="relative w-full bg-dirt-deep" style={{ gridColumn: "1 / -1" }}>
      {/*<div className={`px-8 mx-auto max-w-7xl`}>*/}
      <div ref={textRef} className={`px-8 mx-auto`}>
      {heading && (
        <div className="pt-12 max-w-md sm:max-w-lg md:max-w-3xl">
          <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-7xl text-dirt-pop uppercase">
            {fmt(heading)}
          </h1>
        </div>
      )}

      {subheading && (
        <div className="pointer-events-auto">
          <div className="relative h-40 sm:h-60 md:h-80 w-full">
            {subheading.split(" ").map((word, index, arr) => {
              const totalWords = arr.length;
              const progress = index / (totalWords - 1 || 1);
              return (
                <span
                  key={index}
                  className="absolute font-display font-bold text-3xl sm:text-5xl md:text-7xl text-dirt-pop uppercase"
                  style={{
                    bottom: `${progress * 85}%`,
                    left: `${progress * 90}%`,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {description && (
        <section className="py-12 max-w-md sm:max-w-xl">
          <p className="font-sans text-lg sm:text-xl text-white">{description}</p>
        </section>
      )}

      {ctaLabel && (
        <section>
          <a
            href={ctaLink || "#"}
            className="inline-flex items-center justify-center gap-1 bg-dirt-pop hover:bg-dirt-pop-hover px-8 py-4 w-full transition-all duration-300"
          >
            <Image src={`/90deg Arrow.png`} alt={`90 Degrees Arrow`} width={50} height={50} className={`w-6`} />
            <span className="text-dirt-deep text-xl font-display font-bold uppercase">
              {ctaLabel}
            </span>
          </a>
        </section>
      )}
      </div>

      <div className="sticky top-0 h-[63vw] overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-[60vw] max-h-215.75">
          {backgroundImage && (
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-contain object-bottom z-0"
              priority
            />
          )}

          {midgroundImage && (
            <div
              className="absolute left-0 right-0 px-8 z-10 flex justify-center"
              style={{
                bottom: `${midgroundOffset}%`,
                transform: "translateY(50%)",
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
              className="object-contain object-bottom z-20"
            />
          )}
        </div>
      </div>

      {/* Scroll runway — midground animation plays while images are stuck */}
      <div style={{ height: ANIMATION_RUNWAY }} aria-hidden="true" />
    </section>
  );
}
