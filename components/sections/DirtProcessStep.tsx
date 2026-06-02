"use client";

import Image from "next/image";

export interface DirtProcessStepProps {
  heading?: string;
  description?: string;
  image?: string;
  tags?: string;
  // Injected by parent
  index?: number;
}

export function DirtProcessStep({
  heading,
  description,
  image,
  tags,
  index = 0,
}: DirtProcessStepProps) {
  const isEven = index % 2 === 0;
  const parsedTags = tags
    ? tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div
      className={`flex flex-col-reverse gap-4 xl:gap-10 ${isEven ? "md:flex-row-reverse" : "md:flex-row"} max-w-full`}
    >
      {/* Info Column */}
      <div className="bg-dirt-deep p-6 xl:p-16 w-full md:max-w-[35%] min-h-100 flex flex-col">
        {heading && (
          <h3 className="font-display font-bold text-3xl lg:text-5xl xl:text-6xl text-dirt-pop mb-4" style={{
            letterSpacing: "-2%"
          }}>
            {heading}
          </h3>
        )}

        {description && (
          <p className="text-dirt-pop font-sans text-lg lg:text-xl xl:text-3xl whitespace-pre-line grow" style={{
            lineHeight: "135%",
          }}>
            {description}
          </p>
        )}

        {parsedTags.length > 0 && (
          <div className="max-w-md lg:max-w-none flex flex-wrap gap-2 mt-30 md:mt-8">
            {parsedTags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-1 font-display uppercase text-sm lg:text-base font-medium text-dirt-pop"
                style={{ backgroundColor: "rgba(254, 92, 2, 0.15)", letterSpacing: "1px" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Image Column */}
      <div className="grow relative min-h-100 lg:min-h-0 aspect-square md:aspect-5/4 max-w-full border-[1.5px] border-dirt-black">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-dirt-deep/10 flex items-center justify-center">
            <span className="text-dirt-deep/50 font-sans">Upload image</span>
          </div>
        )}
      </div>
    </div>
  );
}
