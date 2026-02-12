"use client";

import { ReactNode } from "react";
import Image from "next/image";

export interface DirtFileProps {
  heading?: string;
  tag1?: string;
  tag2?: string;
  buttonLabel?: string;
  buttonLink?: string;
  image?: string;
  children?: ReactNode;
  // Injected by parent
  isActive?: boolean;
  onClick?: () => void;
}

export function DirtFile({
  heading,
  tag1,
  tag2,
  buttonLabel,
  buttonLink,
  children,
  isActive = false,
  onClick,
}: DirtFileProps) {
  return (
    <div className="mb-2">
      <button
        onClick={onClick}
        className={`w-full text-left p-8 transition-all duration-300 ${
          isActive
            ? "bg-dirt-pop"
            : "bg-transparent hover:bg-dirt-pop/10"
        }`}
      >
        {isActive && (
          <div className="flex items-stretch justify-end gap-2 mb-4">
            {tag1 && (
              <span
                className="px-3 py-1 flex items-center justify-center bg-white/10 text-dirt-off-white uppercase text-sm font-display font-medium"
                style={{ letterSpacing: "1px" }}
              >
                {tag1}
              </span>
            )}
            {tag2 && (
              <span
                  className="px-3 py-1 flex items-center justify-center bg-white/10 text-dirt-off-white uppercase text-sm font-display font-medium"
                style={{ letterSpacing: "1px" }}
              >
                {tag2}
              </span>
            )}
            {buttonLabel && buttonLink && (
              <a
                href={buttonLink}
                className="px-4 py-1 flex items-center gap-1 bg-dirt-deep text-dirt-off-white uppercase font-display text-sm font-bold hover:bg-dirt-deep/80 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={"/Download 90deg Arrow.png"}
                  alt={"Download Arrow"}
                  width={20}
                  height={14}
                  className={`w-3 h-2`}
                />
                {buttonLabel}
              </a>
            )}
          </div>
        )}

        <h3
          className={`font-display font-bold text-4xl md:text-6xl uppercase transition-colors ${
            isActive ? "text-dirt-off-white" : "text-dirt-pop/50"
          }`}
        >
          {heading}
        </h3>

        {isActive && children && (
          <div className="mt-4 flex flex-col gap-4">
            {children}
          </div>
        )}
      </button>
    </div>
  );
}
