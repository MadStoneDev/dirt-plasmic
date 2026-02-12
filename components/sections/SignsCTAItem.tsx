"use client";

export interface SignsCTAItemProps {
  text?: string;
}

function PlusIcon() {
  return (
    <div className="w-16 h-16 bg-dirt-pop flex items-center justify-center">
      <svg
        className="w-10 h-10 text-dirt-deep"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth={6}
          d="M12 4v16m8-8H4"
        />
      </svg>
    </div>
  );
}

export function SignsCTAItem({ text }: SignsCTAItemProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <PlusIcon />
      <p className="mt-6 text-dirt-off-white font-sans text-xl md:text-3xl font-bold">
        {text}
      </p>
    </div>
  );
}
