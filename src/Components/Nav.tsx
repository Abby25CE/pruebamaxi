"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Anuncio, buildNavigation } from "@/lib/api";

export default function Nav({ anuncio }: { anuncio: Anuncio }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigationItems = buildNavigation(anuncio);

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="flex items-center bg-white border-b border-gray-200 px-4 py-3">
      {/* Left Arrow */}
      <button
        onClick={handlePrevious}
        className="p-1 mr-3 text-red-500 hover:text-red-600 "
      >
        <ChevronLeft size={20} />
      </button>

      {/* Breadcrumb items */}
      <div className="flex items-center space-x-2 overflow-x-auto">
        {navigationItems.map((item, index) => (
          <div key={index} className="flex items-center">
            {/* Primer elemento con enlace */}
            {index === 0 ? (
              <a
                href="/" // Cambia esta URL por la que necesites
                className={`whitespace-nowrap text-sm text-red-500 hover:text-red-600 cursor-pointer transition-colors duration-200`}
              >
                {item.label}
              </a>
            ) : (
              <span
                className={`whitespace-nowrap text-sm ${
                  index <= currentIndex
                    ? "text-gray-900 font-medium"
                    : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
            )}
            {index < navigationItems.length - 1 && (
              <span className="mx-2 text-[#EC5530]">
                <ChevronRight />
              </span>
            )}
          </div>
        ))}
      </div>
      <ChevronRight className=" text-[#EC5530]" />
    </div>
  );
}
