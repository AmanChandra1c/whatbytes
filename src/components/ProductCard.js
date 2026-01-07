'use client';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { Star } from 'lucide-react';

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const renderRating = (rating) => {
    if (!rating) return null;
    
    return (
      <div className="flex items-center mt-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        {/* Product Image */}
        <div className="relative h-60 bg-gray-100 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discountPercentage > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-1">
            {product.title}
          </h3>
          
          <p className="text-sm text-gray-500 mb-2 capitalize">
            {product.category}
          </p>

          {renderRating(product.rating)}

          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="text-xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${Math.round(product.price / (1 - product.discountPercentage / 100))}
                </span>
              )}
            </div>
            
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
