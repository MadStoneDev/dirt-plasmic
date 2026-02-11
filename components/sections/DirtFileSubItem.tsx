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
          className="font-display font-bold text-lg text-dirt-off-white uppercase mb-2"
          style={{ letterSpacing: "1px" }}
        >
          {heading}
        </h4>
      )}
      {description && (
        <p
          className="text-dirt-off-white/80 font-sans text-base text-justify"
          style={{ letterSpacing: "-5%", lineHeight: "150%" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
