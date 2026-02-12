"use client";

import { ReactNode, useState, useRef, useEffect, useCallback } from "react";
import { fmt } from "../../utils/formatText";

/* ─── Brand colour map ─── */
const COLOURS: Record<string, string> = {
  pop: "#FE5C02",
  green: "#C2D500",
  blue: "#C0D6FF",
  deep: "#5C0004",
};

/* ─── Grungy underline SVG (colour injected) ─── */
function underlineSvg(colour: string): string {
  // Irregular hand-drawn brush stroke path
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 12' preserveAspectRatio='none'%3E%3Cpath d='M0 8 C10 5, 18 10, 30 7 S50 4, 65 8 S85 11, 100 6 S120 3, 140 8 S160 10, 175 6 S190 4, 200 7' fill='none' stroke='${encodeURIComponent(colour)}' stroke-width='3.5' stroke-linecap='round'/%3E%3C/svg%3E")`;
}

/* ─── Tooltip arrow colour ─── */
const TOOLTIP_BG = "#C2D500"; // dirt-green

/* ─── DirtHighlight ─── */
interface HighlightProps {
  colour: string;
  text: string;
  tooltip: string;
}

function DirtHighlight({ colour, text, tooltip }: HighlightProps) {
  const [visible, setVisible] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Outside click to dismiss on mobile
  useEffect(() => {
    if (!visible) return;
    function handleClick(e: MouseEvent) {
      if (spanRef.current && !spanRef.current.contains(e.target as Node)) {
        setVisible(false);
      }
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [visible]);

  const showTooltip = useCallback(() => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setVisible(true);
  }, []);

  const hideTooltip = useCallback(() => {
    hoverTimeout.current = setTimeout(() => setVisible(false), 120);
  }, []);

  const toggleTooltip = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible((v) => !v);
  }, []);

  const resolvedColour = COLOURS[colour] || COLOURS.pop;

  return (
    <span
      ref={spanRef}
      style={{
        position: "relative",
        display: "inline",
        backgroundImage: underlineSvg(resolvedColour),
        backgroundSize: "100% 8px",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        paddingBottom: "4px",
        cursor: "pointer",
      }}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onClick={toggleTooltip}
    >
      {text}

      {visible && (
        <span
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: TOOLTIP_BG,
            color: "#5C0004",
            fontFamily: '"Roboto Condensed", sans-serif',
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: 1.3,
            padding: "8px 14px",
            whiteSpace: "nowrap",
            maxWidth: "260px",
            width: "max-content",
            zIndex: 50,
            pointerEvents: "none",
          }}
        >
          {tooltip}
          {/* downward arrow */}
          <span
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: `7px solid ${TOOLTIP_BG}`,
            }}
          />
        </span>
      )}
    </span>
  );
}

/* ─── Shortcode regex ─── */
// Matches {colour|text|tooltip}
const SHORTCODE_RE = /\{(pop|green|blue|deep)\|([^|]+)\|([^}]+)\}/g;

/* ─── DirtRichText ─── */
export interface DirtRichTextProps {
  text?: string;
}

export function DirtRichText({ text }: DirtRichTextProps) {
  if (!text) return null;

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match;

  // Reset lastIndex in case regex was used before
  SHORTCODE_RE.lastIndex = 0;

  while ((match = SHORTCODE_RE.exec(text)) !== null) {
    // Plain text before this match — run through fmt()
    if (match.index > lastIndex) {
      parts.push(
        <span key={key++}>{fmt(text.slice(lastIndex, match.index))}</span>
      );
    }

    const [, colour, highlightedText, tooltip] = match;
    parts.push(
      <DirtHighlight
        key={key++}
        colour={colour}
        text={highlightedText}
        tooltip={tooltip}
      />
    );

    lastIndex = SHORTCODE_RE.lastIndex;
  }

  // Remaining plain text
  if (lastIndex < text.length) {
    parts.push(<span key={key++}>{fmt(text.slice(lastIndex))}</span>);
  }

  return (
    <p
      className="text-base md:text-xl text-dirt-deep/80 font-sans"
      style={{ lineHeight: 1.7 }}
    >
      {parts}
    </p>
  );
}
