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
      className={`flex flex-col gap-12 ${isEven ? "lg:flex-row-reverse" : "lg:flex-row"}`}
    >
      {/* Info Column */}
      <div className="bg-dirt-deep p-12 w-full max-w-[37%] flex flex-col">
        {heading && (
          <h3 className="font-display font-bold text-2xl md:text-4xl text-dirt-pop uppercase mb-4">
            {heading}
          </h3>
        )}

        {description && (
          <p className="text-dirt-pop font-san text-lg whitespace-pre-line flex-grow">
            {description}
          </p>
        )}

        {parsedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8">
            {parsedTags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-1 font-display uppercase text-xs font-medium text-dirt-pop"
                style={{ backgroundColor: "rgba(254, 92, 2, 0.15)", letterSpacing: "1px" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Image Column */}
      <div className="grow relative min-h-100 lg:min-h-0 aspect-square border-[1.5px] border-dirt-black">
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
