'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { Star, Minus, Plus, ArrowLeft } from 'lucide-react';

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${params.id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const renderRating = (rating) => {
    if (!rating) return null;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < Math.floor(rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Products
              </Link>
            </div>
            <Link href="/cart" className="text-blue-600 hover:text-blue-800">
              View Cart
            </Link>
          </div>
        </div>
      </header>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg p-8">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full md:h-96 object-contain rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            <div className="mb-4">
              <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full capitalize">
                {product.category}
              </span>
            </div>

            {renderRating(product.rating)}

            <div className="mt-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    ${Math.round(product.price / (1 - product.discountPercentage / 100))}
                  </span>
                )}
              </div>
              {product.discountPercentage > 0 && (
                <span className="inline-block mt-2 bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>

            <p className="mt-6 text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Brand</h3>
              <p className="text-gray-600">{product.brand}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Stock</h3>
              <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} units available` : 'Out of stock'}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  disabled={product.stock <= quantity}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${
                  product.stock > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
