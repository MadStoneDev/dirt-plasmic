"use client";

import { fmt } from "@/utils/formatText";

export interface WhatWeBelieveItemProps {
  label?: string;
  // Injected by parent
  index?: number;
  isActive?: boolean;
  onClick?: () => void;
}

export function WhatWeBelieveItem({
  label,
  index = 0,
  isActive = false,
  onClick,
}: WhatWeBelieveItemProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <button
      onClick={onClick}
      className="flex items-stretch gap-6 text-left py-6 cursor-pointer group"
    >
      {/* Indicator bar */}
      <div
        className="shrink-0 rounded-full transition-all duration-300"
        style={{
          width: isActive ? "5px" : "2px",
          backgroundColor: isActive
            ? "var(--color-dirt-off-white)"
            : "var(--color-dirt-deep)",
        }}
      />

      {/* Number + Label */}
      <div className="flex items-center gap-4">
        <span
          className={`font-sans text-sm transition-opacity duration-300 ${
            isActive ? "text-dirt-off-white opacity-100" : "text-dirt-off-white opacity-50"
          }`}
        >
          {number}
        </span>
        <h3
          className={`font-display font-bold text-xl md:text-2xl uppercase transition-opacity duration-300 ${
            isActive ? "text-dirt-off-white opacity-100" : "text-dirt-off-white opacity-50"
          }`}
        >
          {fmt(label)}
        </h3>
      </div>
    </button>
  );
}
