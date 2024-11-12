"use client";

import { categories } from "@/shared/constants/categories";
import { TCategory } from "@/shared/types/types";
import { ChevronLeft } from "@/shared/ui/icons/chevron-left";
import { ChevronRight } from "@/shared/ui/icons/chevron-right";
import { useRef, useState } from "react";

export default function Search() {
  const [activeTab, setActiveTab] = useState<"posts" | "users">("posts");
  const [activeFilter, setActiveFilter] = useState<TCategory>("all");

  const filters: TCategory[] = ["all", ...categories];

  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -150,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 150,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center overflow-auto">
      {/* Search Input */}
      <div className="w-full max-w-md mb-3 mt-[2px]">
        <input
          type="text"
          placeholder="search..."
          className="w-full px-3 py-2 text-base rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-main-blue-light shadow-sm"
        />
      </div>

      {/* Horizontal Slider for Filters with Arrows */}
      <div className="w-full max-w-3xl px-3 md:px-4 flex items-center mb-4">
        {/* Left Arrow */}
        <button onClick={scrollLeft} className="text-gray-600 p-2">
          <ChevronLeft />
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex space-x-2 md:space-x-3 overflow-x-auto scrollbar-hide"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 md:px-4 py-1 text-sm md:text-base rounded-full whitespace-nowrap ${
                activeFilter === filter
                  ? "bg-blue-100 text-main-blue"
                  : "bg-gray-100 text-gray-700"
              } transition-colors duration-200`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        <button onClick={scrollRight} className="text-gray-600 p-2">
          <ChevronRight />
        </button>
      </div>

      {/* Tabs for Users and Posts */}
      <div className="w-full flex justify-center mb-5">
        <div className="flex w-full bg-gray-200 overflow-hidden">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 py-1 text-center text-xs md:text-sm rounded-lg ${
              activeTab === "posts"
                ? "bg-main-blue-light text-white"
                : "bg-gray-200"
            }`}
          >
            posts
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex-1 py-1 text-center text-xs md:text-sm rounded-lg ${
              activeTab === "users"
                ? "bg-main-blue-light text-white"
                : "bg-gray-200"
            }`}
          >
            users
          </button>
        </div>
      </div>
    </div>
  );
}
