'use client';
import { Search, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export default function Header({ searchQuery, setSearchQuery }) {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();

  return (
    <header className="bg-blue-700 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="">
            <img
              className="w-16 h-16 rounded-full cursor-pointer"
              src="/whatbytes_logo.jfif"
              alt="WhatBytes"
            />
          </div>

          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-black" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border text-black border-blue-500 rounded-md leading-5 bg-white  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for products..."
              />
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center space-x-4">
            <Link
              href="/cart"
              className="relative inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="ml-2">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          <div className="">
            <img
              className="w-12 h-12 rounded-full"
              src="/Avtar.png"
              alt="WhatBytes"
            />
          </div>
          </div>
        </div>
      </div>
    </header>
  );
}
