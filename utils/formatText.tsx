import { ReactNode } from "react";

/**
 * Parses basic inline markdown in heading strings:
 *   **bold**  →  <strong>
 *   *italic*  →  <em>
 *   ~~strikethrough~~  →  <s>
 */
export function fmt(text: string | undefined): ReactNode {
  if (!text) return null;

  const pattern = /(\*\*(.+?)\*\*|\*(.+?)\*|~~(.+?)~~)/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      parts.push(<strong key={key++}>{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={key++}>{match[3]}</em>);
    } else if (match[4]) {
      parts.push(<s key={key++}>{match[4]}</s>);
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 0 ? text : <>{parts}</>;
}
