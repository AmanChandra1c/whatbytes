'use client';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Filters from '@/components/Filters';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';

export default function ProductList({ products: initialProducts, categories: initialCategories, maxPrice: initialMaxPrice }) {
  const [products] = useState(initialProducts);
  const [categories] = useState(initialCategories);
  const [maxPrice] = useState(initialMaxPrice);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  
  const searchParams = useSearchParams();

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

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      
      if (searchQuery.trim() && 
          !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [products, selectedCategory, priceRange, searchQuery]);

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="flex flex-col lg:flex-row">
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          maxPrice={maxPrice}
        />
        
        <div className="flex-1 p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Product Listing</h1>
            <p className="text-gray-600 mt-1">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>
          
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
    </>
  );
}
