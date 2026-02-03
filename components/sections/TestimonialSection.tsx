"use client";

import Image from "next/image";

export interface TestimonialSectionProps {
  backgroundColor?: "dirt-deep" | "dirt-pop" | "dirt-green" | "white" | "black" | "custom";
  customBackgroundColor?: string;
  customTextColor?: "light" | "dark";
  logo?: string;
  body?: string;
  authorName?: string;
  authorRole?: string;
  authorPhoto?: string;
}

const bgColorClasses: Record<string, string> = {
  "dirt-deep": "bg-[#5C0004]",
  "dirt-pop": "bg-[#FE5C02]",
  "dirt-green": "bg-[#00FF00]",
  white: "bg-white",
  black: "bg-black",
};

const textColorClasses: Record<string, string> = {
  "dirt-deep": "text-white",
  "dirt-pop": "text-white",
  "dirt-green": "text-[#5C0004]",
  white: "text-[#5C0004]",
  black: "text-white",
};

export function TestimonialSection({
  backgroundColor = "dirt-deep",
  customBackgroundColor,
  customTextColor,
  logo,
  body,
  authorName,
  authorRole,
  authorPhoto,
}: TestimonialSectionProps) {
  const isCustom = backgroundColor === "custom";
  const bgClass = isCustom ? "" : bgColorClasses[backgroundColor] || "bg-[#5C0004]";
  const textClass = isCustom
    ? customTextColor === "dark"
      ? "text-[#5C0004]"
      : "text-white"
    : textColorClasses[backgroundColor] || "text-white";

  return (
    <section
      className={`relative py-40 px-20 ${bgClass} overflow-hidden`}
      style={isCustom && customBackgroundColor ? { backgroundColor: customBackgroundColor } : undefined}
    >
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {logo && (
          <div className="mb-20">
            <Image
              src={logo}
              alt="Company logo"
              width={180}
              height={60}
              className="object-contain max-h-16"
            />
          </div>
        )}

        {body && (
          <blockquote
            className={`text-xl md:text-4xl font-sans font-bold tracking-tight leading-relaxed whitespace-pre-line ${textClass} mb-12`}
          >
            <span className="inline-block text-[#5C0004] h-[1em] overflow-visible align-baseline -mb-2">
              &ldquo;
            </span>
            {body}
            <span className="inline-block text-[#5C0004] h-[1em] overflow-visible align-baseline -mb-2">
              &rdquo;
            </span>
          </blockquote>
        )}

        {(authorName || authorPhoto) && (
          <div className="flex flex-col items-center mt-4">
            {authorPhoto && (
              <div
                className="relative w-24 md:w-28 bg-[#5C0004]"
                style={{
                  aspectRatio: "1/0.87",
                  clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                }}
              >
                <div
                  className="absolute inset-0.5 overflow-hidden"
                  style={{
                    clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  }}
                >
                  <Image
                    src={authorPhoto}
                    alt={authorName || "Author"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {authorName && (
              <p className={`mt-8 font-display font-bold text-xl uppercase ${textClass}`}>
                {authorName}
              </p>
            )}

            {authorRole && (
              <p className={`text-xs font-sans ${textClass} opacity-80`}>{authorRole}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
