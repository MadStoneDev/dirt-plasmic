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
  ctaLabel?: string;
  ctaLink?: string;
  tagline?: string;
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
  ctaLabel,
  ctaLink,
  tagline,
}: ProsConsSectionProps) {
  const cons = [con1, con2, con3, con4, con5, con6, con7, con8].filter(Boolean);
  const pros = [pro1, pro2, pro3, pro4, pro5, pro6, pro7, pro8].filter(Boolean);

  return (
    <section className="py-40 px-8 bg-dirt-pop" style={{ gridColumn: "1 / -1" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="mx-auto max-w-4xl font-display font-bold text-5xl md:text-7xl mb-20 text-center">
          <span className="text-dirt-off-white">{headingStart}</span>
          <span className="text-dirt-deep">{headingHighlight}</span>
          <span className="text-dirt-off-white">{headingEnd}</span>
        </h2>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Cons Column */}
          <div className="bg-dirt-deep py-14 px-12">
            <h3 className="font-display font-bold text-4xl text-dirt-pop mb-10">
              {consHeading}
            </h3>
            <div className="flex flex-col gap-10">
              {cons.map((con, index) => (
                  <div key={index} className="flex items-center gap-6">
                  <div className="w-10 h-10 bg-dirt-pop shrink-0 flex items-center justify-center">
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
          <div className="bg-dirt-deep py-14 px-12">
            <h3 className="font-display font-bold text-4xl text-dirt-green mb-10">
              {prosHeading}
            </h3>
            <div className="flex flex-col gap-10">
              {pros.map((pro, index) => (
                <div key={index} className="flex items-center gap-6">
                  <div className="w-10 h-10 bg-dirt-green shrink-0 flex items-center justify-center">
                    <CheckIcon />
                  </div>
                  <p className="text-white font-sans">
                    {pro}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA and Tagline */}
        {(ctaLabel || tagline) && (
          <div className="mt-16 text-center">
            {ctaLabel && (
              <a
                href={ctaLink || "#"}
                className="inline-block bg-dirt-deep text-dirt-off-white font-display font-bold text-lg uppercase px-10 py-4 hover:bg-dirt-black transition-colors"
              >
                {ctaLabel}
              </a>
            )}
            {tagline && (
              <p className="mt-4 text-dirt-off-white font-sans font-light">
                {tagline}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
