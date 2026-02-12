"use client";

import { ReactNode, useState, useRef, useEffect, useCallback } from "react";
import { fmt } from "@/utils/formatText";

/* ─── Brand colour map ─── */
const COLOURS: Record<string, string> = {
  pop: "#FE5C02",
  green: "#C2D500",
  blue: "#C0D6FF",
  deep: "#5C0004",
};

/* ─── Coloured underline SVGs (preserveAspectRatio="none") ─── */
const UNDERLINE_SVGS: Record<string, string> = {
  pop: "/underline-pop.svg",
  green: "/underline-green.svg",
  blue: "/underline-blue.svg",
  deep: "/underline-deep.svg",
};

/* ─── DirtHighlight ─── */
interface HighlightProps {
  colour: string;
  text: string;
  tooltip: string;
}

function DirtHighlight({ colour, text, tooltip }: HighlightProps) {
  const [visible, setVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const spanRef = useRef<HTMLSpanElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const capturePos = useCallback((e: React.MouseEvent) => {
    const x = e.clientX;
    let lineTop = e.clientY; // fallback

    // Find which line-fragment rect the cursor is in
    if (spanRef.current) {
      const rects = spanRef.current.getClientRects();
      for (let i = 0; i < rects.length; i++) {
        const r = rects[i];
        if (e.clientY >= r.top && e.clientY <= r.bottom) {
          lineTop = r.top;
          break;
        }
      }
    }

    setCursorPos({ x, y: lineTop });
  }, []);

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

  const showTooltip = useCallback((e: React.MouseEvent) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    capturePos(e);
    setVisible(true);
  }, [capturePos]);

  const hideTooltip = useCallback(() => {
    hoverTimeout.current = setTimeout(() => setVisible(false), 120);
  }, []);

  const toggleTooltip = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    capturePos(e);
    setVisible((v) => !v);
  }, [capturePos]);

  const resolvedColour = COLOURS[colour] || COLOURS.pop;
  const underlineSvg = UNDERLINE_SVGS[colour] || UNDERLINE_SVGS.pop;

  return (
    <span
      ref={spanRef}
      style={{
        display: "inline",
        backgroundImage: `url("${underlineSvg}")`,
        backgroundPosition: "bottom left",
        backgroundSize: "100% 7px",
        backgroundRepeat: "no-repeat",
        WebkitBoxDecorationBreak: "clone",
        boxDecorationBreak: "clone" as any,
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
          className="pointer-events-none -mb-8 md:mb-0 px-2 md:px-4 py-1 md:py-3 w-max max-w-40 md:max-w-67.5 font-sans text-center text-base md:text-[20px] z-50"
          style={{
            position: "fixed",
            left: cursorPos.x,
            bottom: `calc(100vh - ${cursorPos.y}px + 50px)`,
            transform: "translateX(-50%)",
            background: resolvedColour,
            lineHeight: 1.5,
          }}
        >
          {tooltip}
          {/* downward arrow */}
          <span
            className="absolute -mt-8 md:mt-0 w-0 h-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              top: "calc(100% + 30px)",
              borderLeft: "20px solid transparent",
              borderRight: "20px solid transparent",
              borderTop: `20px solid ${resolvedColour}`,
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

/* ─── Text colour presets ─── */
const TEXT_COLOURS: Record<string, string> = {
  "dirt-deep": "#5C0004",
  "dirt-pop": "#FE5C02",
  "dirt-green": "#C2D500",
  "dirt-blue": "#C0D6FF",
  "dirt-off-white": "#FAFAF2",
  "dirt-black": "#30261D",
  white: "#FFFFFF",
  black: "#000000",
};

/* ─── DirtRichText ─── */
export interface DirtRichTextProps {
  text?: string;
  textColour?: string;
  customTextColour?: string;
}

export function DirtRichText({ text, textColour = "dirt-black", customTextColour }: DirtRichTextProps) {
  if (!text) return null;

  const resolvedTextColour =
    textColour === "custom" && customTextColour
      ? customTextColour
      : TEXT_COLOURS[textColour] || TEXT_COLOURS["dirt-black"];

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
      className="text-base md:text-xl font-sans"
      style={{ lineHeight: 1.7, color: resolvedTextColour }}
    >
      {parts}
    </p>
  );
}
