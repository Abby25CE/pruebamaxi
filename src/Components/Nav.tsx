"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Nav = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigationItems = [
    { label: "Volver al listado", isAction: true },
    { label: "Compra de autos", isCategory: true },
    { label: "Audi", isBrand: true },
    { label: "A8", isModel: true },
    { label: "Sedán Turbo", isVariant: true },
  ];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < navigationItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex items-center bg-white border-b border-gray-200 px-4 py-3">
      {/* Left Arrow */}
      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className={`p-1 mr-3 ${
          currentIndex === 0
            ? "text-gray-300 cursor-not-allowed"
            : "text-red-500 hover:text-red-600 cursor-pointer"
        }`}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Navigation Items */}
      <div className="flex items-center space-x-2 overflow-x-auto">
        {navigationItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <span
              className={`whitespace-nowrap text-sm ${
                index === 0
                  ? "text-red-500 hover:text-red-600 cursor-pointer"
                  : index <= currentIndex
                  ? "text-gray-900 font-medium"
                  : "text-gray-400"
              }`}
            >
              {item.label}
            </span>
            {index < navigationItems.length - 1 && (
              <span className="mx-2 text-[#EC5530]">
                <ChevronRight />
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        disabled={currentIndex === navigationItems.length - 1}
        className={`p-1 ml-3 ${
          currentIndex === navigationItems.length - 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-red-500 hover:text-red-600 cursor-pointer"
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Nav;
