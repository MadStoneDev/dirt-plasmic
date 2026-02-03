"use client";

import Image from "next/image";

export interface Brand {
  title: string;
  image?: string;
  altText?: string;
  link?: string;
}

export interface CompanyCarouselSectionProps {
  heading?: string;
  highlightedWord?: string;
  backgroundImage?: string;
  brands?: Brand[];
}

export function CompanyCarouselSection({
  heading,
  highlightedWord,
  backgroundImage,
  brands,
}: CompanyCarouselSectionProps) {
  return (
    <section className="relative pt-24 pb-60 px-8 bg-[#FE5C02] overflow-hidden">
      {backgroundImage && (
        <div className="absolute flex items-end inset-0 bottom-0 z-0 pointer-events-none">
          <Image
            src={backgroundImage}
            alt=""
            width={1440}
            height={600}
            className="w-full object-contain"
          />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        {heading && (
          <h2 className="flex gap-2 text-3xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-24">
            {heading}
            {highlightedWord && (
              <span className="text-[#5C0004] uppercase">{highlightedWord}</span>
            )}
          </h2>
        )}

        <div
          className="py-4 flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {brands?.map((brand, index) => {
            const content = (
              <div className="group shrink-0 snap-center flex flex-col items-center" key={index}>
                <div
                  className="relative w-36 md:w-44 transition-all duration-300 ease-out group-hover:-translate-y-2"
                  style={{
                    aspectRatio: "1/0.87",
                    clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  }}
                >
                  <div className="absolute inset-0 bg-[#5C0004] group-hover:bg-[#00FF00] transition-colors duration-300" />
                  {brand.image && (
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <Image
                        src={brand.image}
                        alt={brand.altText || brand.title}
                        width={100}
                        height={100}
                        className="object-contain max-w-full max-h-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            );

            if (brand.link) {
              return (
                <a
                  key={index}
                  href={brand.link}
                  className="shrink-0 snap-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              );
            }

            return content;
          })}
        </div>
      </div>
    </section>
  );
}
