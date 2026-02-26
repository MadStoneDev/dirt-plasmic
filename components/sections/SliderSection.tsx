"use client";

import React, { useState, ReactNode } from "react";
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

  // Extract stops from children (SliderStop components)
  const stops = React.Children.toArray(children)
    .filter(React.isValidElement)
    .map((child: any) => ({
      label: child.props?.label || "",
      text: child.props?.text || "",
    }));

  // Default stops if none provided
  const stopsData = stops.length > 0 ? stops : [
    { label: "Stop 1", text: "Content for stop 1" },
    { label: "Stop 2", text: "Content for stop 2" },
    { label: "Stop 3", text: "Content for stop 3" },
    { label: "Stop 4", text: "Content for stop 4" },
    { label: "Stop 5", text: "Content for stop 5" },
    { label: "Stop 6", text: "Content for stop 6" },
  ];

  // Calculate the offset needed for the label to reach the edge
  // Thumb is 64px, label is 150px
  // Offset = (150 - 64) / 2 = 43px
  const EDGE_OFFSET = 43;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentStep(parseInt(e.target.value));
  };

  return (
    <section
      className="relative px-5 md:px-8 bg-dirt-off-white"
      style={{
        gridColumn: "1 / -1",
        paddingTop: "160px",
        paddingBottom: "215px",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Heading */}
      <h2
        className="font-display font-bold text-5xl md:text-8xl mb-20"
        style={{
          lineHeight: "105%",
          letterSpacing: "-2%",
        }}
      >
        <span className="text-dirt-deep">{fmt(headingStart)}</span>
        <span className="text-dirt-pop">{fmt(headingMiddle)}</span>
        <span className="text-dirt-deep">{fmt(headingEnd)}</span>
      </h2>

      {/* Slider Container */}
      <div
        className="bg-dirt-deep mx-auto"
        style={{
          maxWidth: "1100px",
          padding: "50px 50px 90px",
        }}
      >
        {/* Slider Wrapper */}
        <div className="relative" style={{ paddingLeft: `${EDGE_OFFSET}px`, paddingRight: `${EDGE_OFFSET}px` }}>
          {/* Fake Track Background */}
          <div
            className="absolute top-1/2 left-0 right-0 bg-dirt-off-white"
            style={{
              height: "4px",
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

            {/* Thumb Label */}
            <div
              className="absolute pointer-events-none transition-all duration-200 ease-out"
              style={{
                left: `calc(${(currentStep / (stopsData.length - 1)) * 100}%)`,
                top: "calc(50% + 40px)",
                transform: "translate(-50%, 0)",
                width: "150px",
                textAlign: "center",
              }}
            >
              <span className="text-dirt-pop uppercase font-sans font-bold text-sm">
                {stopsData[currentStep]?.label}
              </span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="mt-16">
          <p
            className="text-dirt-off-white font-sans font-bold"
            style={{
              fontSize: "40px",
              lineHeight: "125%",
              letterSpacing: "-2%",
            }}
          >
            {stopsData[currentStep]?.text}
          </p>
        </div>
      </div>

      <style jsx>{`
        /* Hide default thumb */
        .slider-input::-webkit-slider-thumb {
          appearance: none;
          width: 64px;
          height: 64px;
          background-color: var(--dirt-pop);
          cursor: pointer;
          clip-path: polygon(
            30% 0%,
            70% 0%,
            100% 30%,
            100% 70%,
            70% 100%,
            30% 100%,
            0% 70%,
            0% 30%
          );
        }

        .slider-input::-moz-range-thumb {
          width: 64px;
          height: 64px;
          background-color: var(--dirt-pop);
          cursor: pointer;
          border: none;
          clip-path: polygon(
            30% 0%,
            70% 0%,
            100% 30%,
            100% 70%,
            70% 100%,
            30% 100%,
            0% 70%,
            0% 30%
          );
        }

        /* Remove default track styling */
        .slider-input::-webkit-slider-runnable-track {
          background: transparent;
          height: 4px;
        }

        .slider-input::-moz-range-track {
          background: transparent;
          height: 4px;
        }
      `}</style>
    </section>
  );
}
