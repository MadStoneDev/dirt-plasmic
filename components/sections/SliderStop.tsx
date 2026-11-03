import { ReactNode } from "react";

export interface SliderStopProps {
  label: string;
  /** Simple text content for this stop. Used when the `children` slot is empty. */
  text?: string;
  image?: string;
  /** Optional rich content slot — any Plasmic elements/components. Overrides `text`. */
  children?: ReactNode;
}

// This component is just a data holder; SliderSection reads its props
// (label, text, image, children) and renders the active stop.
export function SliderStop(_props: SliderStopProps) {
  return null;
}
