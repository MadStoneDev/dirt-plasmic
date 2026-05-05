"use client";

import { fmt } from "@/utils/formatText";

export interface WhatWeBelieveItemProps {
  label?: string;
  // Injected by parent
  index?: number;
  isActive?: boolean;
  onPointerEnter?: () => void;
}

export function WhatWeBelieveItem({
  label,
  index = 0,
  isActive = false,
  onPointerEnter,
}: WhatWeBelieveItemProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <button
      type="button"
      onPointerEnter={onPointerEnter}
      className="flex items-stretch gap-5 text-left min-h-18.5 cursor-pointer group"
    >
      {/* Indicator bar */}
      <div
        className={`shrink-0 ${isActive ? "w-2" : "w-1 group-hover:w-2"} transition-all duration-300`}
        style={{
          backgroundColor: isActive
            ? "var(--color-dirt-off-white)"
            : "var(--color-dirt-deep)",
        }}
      />

      {/* Number + Label */}
      <div className="flex items-center gap-4 2xl:gap-6">
        <span className={`font-sans text-xl text-dirt-off-white opacity-100`}>
          {number}
        </span>
        <h3
          className={`font-display font-bold text-[40px] 2xl:text-6xl text-dirt-off-white opacity-100`}
          style={{
            letterSpacing: "-2%",
          }}
        >
          {fmt(label)}
        </h3>
      </div>
    </button>
  );
}
