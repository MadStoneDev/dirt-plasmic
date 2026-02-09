"use client";

import { useState } from "react";

export interface PainPointCheckboxProps {
  label?: string;
}

export function PainPointCheckbox({ label }: PainPointCheckboxProps) {
  const [checked, setChecked] = useState(false);

  return (
    <label className="flex items-center gap-3 cursor-pointer select-none group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="sr-only peer"
      />
      <span
        className={`flex items-center justify-center w-6 h-6 shrink-0 rounded border border-dirt-pop transition-all duration-200 ${
          checked ? "bg-dirt-pop opacity-100" : "bg-white opacity-20"
        }`}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-dirt-deep"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </span>
      {label && (
        <span
          className={`text-dirt-pop font-sans text-base transition-opacity duration-200 ${
            checked ? "opacity-100" : "opacity-70"
          }`}
        >
          {label}
        </span>
      )}
    </label>
  );
}
