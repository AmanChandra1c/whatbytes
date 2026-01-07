'use client';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Filters from '@/components/Filters';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [maxPrice, setMaxPrice] = useState(1000);
  
  const searchParams = useSearchParams();

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        
        setProducts(data.products);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.products.map(p => p.category))];
        setCategories(uniqueCategories);
        
        // Find max price for range slider
        const maxProductPrice = Math.max(...data.products.map(p => p.price));
        setMaxPrice(maxProductPrice);
        setPriceRange([0, maxProductPrice]);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sync URL params with filters
  useEffect(() => {
    const category = searchParams.get('category');
    const price = searchParams.get('price');
    const search = searchParams.get('search');

    if (category && categories.includes(category)) {
      setSelectedCategory(category);
    }
    
    if (price) {
      const [min, max] = price.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        setPriceRange([min, max]);
      }
    }
    
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams, categories]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }
    
    if (priceRange[0] !== 0 || priceRange[1] !== maxPrice) {
      params.set('price', `${priceRange[0]}-${priceRange[1]}`);
    }
    
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    window.history.replaceState({}, '', newUrl);
  }, [selectedCategory, priceRange, searchQuery, maxPrice]);

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      
      // Search filter (case-insensitive)
      if (searchQuery.trim() && 
          !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [products, selectedCategory, priceRange, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Filters */}
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          maxPrice={maxPrice}
        />
        
        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Product Listing</h1>
            <p className="text-gray-600 mt-1">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>
          
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
