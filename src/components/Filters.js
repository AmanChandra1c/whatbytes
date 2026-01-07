'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';

export default function Filters({ 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  priceRange, 
  setPriceRange, 
  maxPrice 
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Filter className="h-6 w-6" />
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg text-black font-bold">Filters</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto h-full pb-20">
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">All</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Price</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-500">
                      ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <div className="mt-2">
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white p-6 border-r border-gray-200">
        <h2 className="text-lg font-semibold mb-6 text-black">Filters</h2>
        
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="all"
                checked={selectedCategory === 'all'}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">All</span>
            </label>
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Price</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500">
                ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="mt-2">
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
