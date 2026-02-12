"use client";

import { fmt } from "../../utils/formatText";

export interface ThreeReasonsItemProps {
  heading?: string;
  description?: string;
  // Injected by parent
  index?: number;
}

export function ThreeReasonsItem({
  heading,
  description,
  index = 0,
}: ThreeReasonsItemProps) {
  return (
    <div className="flex flex-col max-w-105">
      {/* Number in square */}
      <div className="w-20 h-20 bg-dirt-deep flex items-center justify-center mb-10">
        <span className="text-white font-sans font-bold text-[40px]">
          {index + 1}
        </span>
      </div>

      {heading && (
        <h3 className="font-display font-bold text-xl md:text-[40px] text-dirt-off-white uppercase mb-5">
          {fmt(heading)}
        </h3>
      )}

      {description && (
        <p className="text-xl text-justify text-dirt-off-white font-sans whitespace-pre-line">
          {description}
        </p>
      )}
    </div>
  );
}
