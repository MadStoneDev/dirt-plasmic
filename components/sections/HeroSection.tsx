"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrolled = -rect.top;
      const scrollableDistance = sectionHeight - viewportHeight;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const midgroundOffset = 25 + scrollProgress * 42;

  return (
    <section ref={sectionRef} className="relative w-full bg-dirt-deep" style={{ gridColumn: "1 / -1" }}>
      {heading && (
        <div className="px-8 pt-12 max-w-md sm:max-w-lg md:max-w-3xl">
          <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-7xl text-dirt-pop uppercase">
            {heading}
          </h1>
        </div>
      )}

      {subheading && (
        <div className="px-8 pointer-events-auto">
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
        <section className="px-8 py-12 max-w-md sm:max-w-xl">
          <p className="font-sans text-lg sm:text-xl text-white">{description}</p>
        </section>
      )}

      {ctaLabel && (
        <section className="px-8">
          <a
            href={ctaLink || "#"}
            className="inline-flex items-center justify-center gap-1 bg-dirt-pop hover:bg-dirt-pop/80 px-8 py-4 w-full transition-colors"
          >
            <Image src={`/90deg Arrow.png`} alt={`90 Degrees Arrow`} width={50} height={50} className={`w-6`} />
            <span className="text-dirt-deep text-xl font-display font-bold uppercase">
              {ctaLabel}
            </span>
          </a>
        </section>
      )}

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
    </section>
  );
}
