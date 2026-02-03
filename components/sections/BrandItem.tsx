"use client";

import Image from "next/image";

export interface BrandItemProps {
  title?: string;
  image?: string;
  altText?: string;
  link?: string;
}

export function BrandItem({
  title = "Brand",
  image,
  altText,
  link,
}: BrandItemProps) {
  const content = (
    <div className="group shrink-0 snap-center flex flex-col items-center">
      <div
        className="relative w-36 md:w-44 transition-all duration-300 ease-out group-hover:-translate-y-2"
        style={{
          aspectRatio: "1/0.87",
          clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        }}
      >
        <div className="absolute inset-0 bg-dirt-deep group-hover:bg-dirt-green transition-colors duration-300" />
        {image && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <Image
              src={image}
              alt={altText || title}
              width={100}
              height={100}
              className="object-contain max-w-full max-h-full"
            />
          </div>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
        className="shrink-0 snap-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
}
