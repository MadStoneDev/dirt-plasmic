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
    <div className="group shrink-0 py-6 snap-center flex flex-col items-center">
      <div
        className="relative w-32 md:w-58 transition-all duration-300 ease-out group-hover:-translate-y-8.75"
        style={{
          aspectRatio: "1/1",
          clipPath: "polygon(29% 0%, 71% 0%, 100% 29%, 100% 71%, 71% 100%, 29% 100%, 0% 71%, 0% 29%)",
        }}
      >
        <div className="absolute inset-0 bg-dirt-deep group-hover:bg-dirt-green transition-colors duration-300" />
        {image && (
          <div className="absolute inset-0 flex items-center justify-center p-3 md:p-5">
            <Image
              src={image}
              alt={altText || title}
              width={200}
              height={200}
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
