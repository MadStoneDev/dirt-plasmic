"use client";

export interface ProsConsItemProps {
  text?: string;
  // Injected by parent
  type?: "con" | "pro";
}

function XIcon() {
  return (
    <svg className="w-6 h-6 text-dirt-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap={"square"} strokeLinejoin={"miter"} strokeWidth={6} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-6 h-6 text-dirt-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap={"square"} strokeLinejoin={"miter"} strokeWidth={6} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function ProsConsItem({ text, type = "con" }: ProsConsItemProps) {
  const isCon = type === "con";

  return (
    <div className="flex items-center gap-6">
      <div className={`w-10 h-10 shrink-0 flex items-center justify-center ${isCon ? "bg-dirt-pop" : "bg-dirt-green"}`}>
        {isCon ? <XIcon /> : <CheckIcon />}
      </div>
      <p className={`font-sans ${isCon ? "text-dirt-off-white pt-1" : "text-white"}`}>
        {text}
      </p>
    </div>
  );
}
