"use client";

export interface DirtFileSubItemProps {
  heading?: string;
  description?: string;
}

export function DirtFileSubItem({
  heading,
  description,
}: DirtFileSubItemProps) {
  return (
    <div
      className="p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
    >
      {heading && (
        <h4
          className="font-display font-bold text-base text-dirt-off-white uppercase mb-3"
          style={{ letterSpacing: "1px" }}
        >
          {heading}
        </h4>
      )}
      {description && (
        <p
          className="text-dirt-off-white/80 font-sans text-base text-justify hyphens-none"
          style={{ letterSpacing: "-3%", lineHeight: "150%" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
