"use client";

export interface ProsConsSectionProps {
  headingStart?: string;
  headingHighlight?: string;
  headingEnd?: string;
  consHeading?: string;
  prosHeading?: string;
  // Cons (up to 8)
  con1?: string;
  con2?: string;
  con3?: string;
  con4?: string;
  con5?: string;
  con6?: string;
  con7?: string;
  con8?: string;
  // Pros (up to 8)
  pro1?: string;
  pro2?: string;
  pro3?: string;
  pro4?: string;
  pro5?: string;
  pro6?: string;
  pro7?: string;
  pro8?: string;
}

function XIcon() {
  return (
    <svg className="w-5 h-5 text-dirt-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-dirt-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function ProsConsSection({
  headingStart,
  headingHighlight,
  headingEnd,
  consHeading = "Without DIRT",
  prosHeading = "With DIRT",
  con1,
  con2,
  con3,
  con4,
  con5,
  con6,
  con7,
  con8,
  pro1,
  pro2,
  pro3,
  pro4,
  pro5,
  pro6,
  pro7,
  pro8,
}: ProsConsSectionProps) {
  const cons = [con1, con2, con3, con4, con5, con6, con7, con8].filter(Boolean);
  const pros = [pro1, pro2, pro3, pro4, pro5, pro6, pro7, pro8].filter(Boolean);

  return (
    <section className="py-16 px-4 bg-dirt-pop" style={{ gridColumn: "1 / -1" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="font-display font-bold text-3xl md:text-5xl uppercase mb-12 text-center">
          <span className="text-dirt-deep">{headingStart}</span>
          <span className="text-dirt-off-white">{headingHighlight}</span>
          <span className="text-dirt-deep">{headingEnd}</span>
        </h2>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Cons Column */}
          <div className="bg-dirt-deep p-8">
            <h3 className="font-display font-bold text-2xl text-dirt-pop uppercase mb-8">
              {consHeading}
            </h3>
            <div className="flex flex-col gap-4">
              {cons.map((con, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-dirt-pop flex-shrink-0 flex items-center justify-center">
                    <XIcon />
                  </div>
                  <p className="text-dirt-off-white font-sans pt-1">
                    {con}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pros Column */}
          <div className="bg-dirt-deep p-8">
            <h3 className="font-display font-bold text-2xl text-dirt-green uppercase mb-8">
              {prosHeading}
            </h3>
            <div className="flex flex-col gap-4">
              {pros.map((pro, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-dirt-green flex-shrink-0 flex items-center justify-center">
                    <CheckIcon />
                  </div>
                  <p className="text-white font-sans pt-1">
                    {pro}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
