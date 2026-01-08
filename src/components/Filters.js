"use client";

import { useState, useEffect } from "react";
import { Filter, X } from "lucide-react";

export default function Filters({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  maxPrice,
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll on mobile filter open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setIsOpen(false); // auto close on mobile
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Category</h3>
        <div className="space-y-2">
          {["all", ...categories].map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
                className="accent-blue-600"
              />
              <span className="text-sm capitalize text-gray-700">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Price</h3>
        <p className="text-xs text-gray-500 mb-2">
          ${priceRange[0]} – ${priceRange[1]}
        </p>
        <input
          type="range"
          min="0"
          max={maxPrice}
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
          className="w-full cursor-pointer"
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        <Filter />
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
          <aside className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>
            <FilterContent />
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 xl:w-72 bg-white p-6 border-r">
        <h2 className="text-lg font-bold mb-6">Filters</h2>
        <FilterContent />
      </aside>
    </>
  );
}
