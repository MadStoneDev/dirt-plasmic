"use client";

export interface DirtNavLinkProps {
  label?: string;
  href?: string;
  // Injected by parent
  index?: number;
  isMobile?: boolean;
}

export function DirtNavLink({
  label = "Link",
  href = "#",
  index = 0,
  isMobile = false,
}: DirtNavLinkProps) {
  const isEven = index % 2 === 0;
  const color = isEven ? "text-white" : "text-dirt-deep";
  const ml = isMobile ? 0 : `${index * 5}rem`;

  return (
    <a
      href={href}
      className={`font-display font-bold uppercase block ${color}`}
      style={{
        fontSize: "clamp(2rem, 5vw, 4.5rem)",
        lineHeight: 1.1,
        marginLeft: ml,
      }}
    >
      {label}
    </a>
  );
}
