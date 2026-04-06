"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { fmt } from "@/utils/formatText";

export interface SliderSectionProps {
  headingStart?: string;
  headingMiddle?: string;
  headingEnd?: string;
  backgroundImage?: string;
  children?: ReactNode;
}

export function SliderSection({
  headingStart,
  headingMiddle,
  headingEnd,
  backgroundImage,
  children,
}: SliderSectionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLg, setIsLg] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [imageTop, setImageTop] = useState(0);

  // Responsive values: mobile / lg+
  const topPadding = isLg ? 160 : 64;
  const headingToSlider = isLg ? 80 : 48;
  const bottomPadding = isLg ? 230 : 64;

  // Extract stops from children (SliderStop components)
  const stops = React.Children.toArray(children)
    .filter(React.isValidElement)
    .map((child: any) => ({
      label: child.props?.label || "",
      text: child.props?.text || "",
      image: child.props?.image || "",
    }));

  // Default stops if none provided
  const stopsData =
    stops.length > 0
      ? stops
      : [
          { label: "Stop 1", text: "Content for stop 1", image: "" },
          { label: "Stop 2", text: "Content for stop 2", image: "" },
          { label: "Stop 3", text: "Content for stop 3", image: "" },
          { label: "Stop 4", text: "Content for stop 4", image: "" },
          { label: "Stop 5", text: "Content for stop 5", image: "" },
          { label: "Stop 6", text: "Content for stop 6", image: "" },
        ];

  // Calculate the offset needed for the label to reach the edge
  // Thumb is 64px, label is 150px
  // Offset = (150 - 64) / 2 = 43px
  const EDGE_OFFSET = 75;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentStep(parseInt(e.target.value));
  };

  // Track lg breakpoint (1024px) and measure where images should start
  useEffect(() => {
    const update = () => {
      const lg = window.matchMedia("(min-width: 1024px)").matches;
      setIsLg(lg);
      const gap = lg ? 40 : 24;
      if (headingRef.current && sectionRef.current) {
        const headingBottom =
          headingRef.current.getBoundingClientRect().bottom;
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        setImageTop(headingBottom - sectionTop + gap);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [headingStart, headingMiddle, headingEnd]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-dirt-off-white overflow-hidden"
      style={{
        gridColumn: "1 / -1",
        paddingTop: `${topPadding}px`,
      }}
    >
      {/* Background image — starts 40px below heading, fills to bottom */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          className="absolute left-0 w-full object-cover"
          style={{
            top: `${imageTop}px`,
            height: `calc(100% - ${imageTop}px)`,
            zIndex: 0,
          }}
        />
      )}
      {/* Step image — same position, changes with slider */}
      {stopsData[currentStep]?.image && (
        <img
          src={stopsData[currentStep].image}
          alt=""
          className="absolute left-0 w-full object-cover transition-opacity duration-500"
          style={{
            top: `${imageTop}px`,
            height: `calc(100% - ${imageTop}px)`,
            zIndex: 0,
          }}
        />
      )}

      {/* Heading — in its own clean space, no images behind it */}
      <div ref={headingRef} className="px-5 md:px-8">
        <h2
          className="font-display font-bold text-5xl md:text-8xl text-center"
          style={{
            lineHeight: "105%",
            letterSpacing: "-2%",
          }}
        >
          <span className="text-dirt-pop">{fmt(headingStart)}</span>
          <span className="text-dirt-deep">{fmt(headingMiddle)}</span>
          <span className="text-dirt-pop">{fmt(headingEnd)}</span>
        </h2>
      </div>

      {/* Slider Container — 80px below heading (40px gap + 40px into image area) */}
      <div
        className="relative mx-auto px-5 md:px-8"
        style={{
          maxWidth: "1100px",
          marginTop: `${headingToSlider}px`,
          zIndex: 1,
        }}
      >
        <div
          className="bg-dirt-deep border-2 border-dirt-pop"
          style={{
            padding: "50px 50px 90px",
          }}
        >
          {/* Slider Wrapper */}
          <div
            className="relative"
            style={{
              paddingLeft: `${EDGE_OFFSET}px`,
              paddingRight: `${EDGE_OFFSET}px`,
            }}
          >
            {/* Fake Track Background */}
            <div
              className="absolute top-1/2 left-0 right-0 bg-dirt-off-white"
              style={{
                height: "16px",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            />

            {/* Slider Input */}
            <div className="relative">
              <input
                type="range"
                min="0"
                max={stopsData.length - 1}
                value={currentStep}
                onChange={handleSliderChange}
                step="1"
                className="w-full appearance-none bg-transparent cursor-pointer slider-input"
                style={{
                  height: "64px",
                }}
              />

              {/* Custom Thumb with Label */}
              <div
                className="absolute pointer-events-none transition-all duration-200 ease-out"
                style={{
                  left: `calc(${(currentStep / (stopsData.length - 1)) * 100}%)`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Wrapper for thumb and label */}
                <div className="relative">
                  {/* Octagon Thumb */}
                  <div
                    className="bg-dirt-pop w-11.25 lg:w-16 h-11.25 lg:h-16"
                    style={{
                      clipPath:
                        "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                    }}
                  />

                  {/* Label positioned below thumb */}
                  <div
                    className="absolute left-1/2"
                    style={{
                      transform: "translateX(-50%)",
                      top: "calc(100% + 8px)",
                      width: "200px",
                      textAlign: "center",
                    }}
                  >
                    <span
                      className="text-dirt-pop uppercase font-sans font-semibold text-[14px] lg:text-xl"
                      style={{
                        lineHeight: "135%",
                      }}
                    >
                      {stopsData[currentStep]?.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="mt-28">
            <p
              className="text-dirt-off-white font-sans font-bold text-2xl lg:text-[40px]"
              style={{
                lineHeight: "125%",
                letterSpacing: "-2%",
              }}
            >
              {stopsData[currentStep]?.text}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom spacer — images still visible here */}
      <div style={{ height: `${bottomPadding}px` }} />

      <style jsx>{`
        /* Hide default thumb completely */
        .slider-input::-webkit-slider-thumb {
          appearance: none;
          width: 64px;
          height: 64px;
          background: transparent;
          cursor: pointer;
          border: none;
        }

        .slider-input::-moz-range-thumb {
          width: 64px;
          height: 64px;
          background: transparent;
          cursor: pointer;
          border: none;
        }

        /* Remove default track styling */
        .slider-input::-webkit-slider-runnable-track {
          background: transparent;
          height: 16px;
        }

        .slider-input::-moz-range-track {
          background: transparent;
          height: 16px;
        }
      `}</style>
    </section>
  );
}
