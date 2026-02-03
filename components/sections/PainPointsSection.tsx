"use client";

import { useState } from "react";
import Image from "next/image";

export interface PainPointsSectionProps {
  heading?: string;
  subheading?: string;
  checkboxItems?: string[];
  image0?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
}

export function PainPointsSection({
  heading,
  subheading,
  checkboxItems,
  image0,
  image1,
  image2,
  image3,
  image4,
  image5,
}: PainPointsSectionProps) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const selectedCount = Object.values(checkedItems).filter(Boolean).length;

  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [index]: isChecked }));
  };

  const images = [image0, image1, image2, image3, image4, image5];
  const currentImage = images[Math.min(selectedCount, 5)] || image0;

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{heading}</h2>
          {subheading && <p className="text-lg text-gray-600 mb-8">{subheading}</p>}

          <div className="space-y-4">
            {checkboxItems?.map((item, index) => (
              <label key={index} className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems[index] || false}
                  onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300"
                />
                <span className="text-gray-700 group-hover:text-gray-900">{item}</span>
              </label>
            ))}
          </div>

          {selectedCount > 0 && (
            <p className="mt-8 text-[#FE5C02] font-medium">
              {selectedCount === 1
                ? "Even one of these can hurt your business..."
                : `${selectedCount} issues identified.`}
            </p>
          )}
        </div>

        <div className="relative aspect-square">
          {currentImage ? (
            <Image
              src={currentImage}
              alt="Building visualization"
              fill
              className="object-contain transition-opacity duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Upload building images</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
