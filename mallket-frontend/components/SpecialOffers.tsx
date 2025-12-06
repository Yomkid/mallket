'use client';
import { useState, useRef } from 'react';
import ProductCard, { Product } from './ProductCard';

export default function SpecialOffers() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const specialOffers: Product[] = [
    {
      id: 1,
      name: 'SILVER CREST 5L Air Fryer - Digital Display',
      price: 78500,
      originalPrice: 98500,
      image: '/assets/img/products/air-fryer.png',
      discount: 20,
      rating: 4.4,
      reviews: 234,
      seller: 'Kitchen Pro',
      itemsLeft: 23,
      isHot: true
    },
    {
      id: 2,
      name: 'SOLITEC 18" Standing Fan - 3 Speed Settings',
      price: 28900,
      originalPrice: 35900,
      image: '/assets/img/products/standing-fan.png',
      discount: 20,
      rating: 4.2,
      reviews: 167,
      seller: 'Home Comfort',
      itemsLeft: 45
    },
    {
      id: 3,
      name: 'Royal 1.5HP Split AC - Inverter Technology',
      price: 385000,
      originalPrice: 450000,
      image: '/assets/img/products/split-ac.png',
      discount: 14,
      rating: 4.6,
      reviews: 89,
      seller: 'Cooling Experts',
      itemsLeft: 12
    },
    {
      id: 4,
      name: 'Aeon 4-Burner Gas Cooker - Glass Top',
      price: 127500,
      originalPrice: 155000,
      image: '/assets/img/products/gas-cooker.png',
      discount: 18,
      rating: 4.5,
      reviews: 156,
      seller: 'Kitchen Pro',
      itemsLeft: 18
    },
    {
      id: 5,
      name: 'Haier Thermocool 210L Refrigerator - Double Door',
      price: 245000,
      originalPrice: 295000,
      image: '/assets/img/products/refrigerator.png',
      discount: 17,
      rating: 4.3,
      reviews: 78,
      seller: 'Home Appliances',
      itemsLeft: 9,
      isHot: true
    },
    {
      id: 6,
      name: 'LG 7kg Washing Machine - Fully Automatic',
      price: 189000,
      originalPrice: 225000,
      image: '/assets/img/products/washing-machine.png',
      discount: 16,
      rating: 4.7,
      reviews: 203,
      seller: 'LG Official',
      itemsLeft: 31
    },
    {
      id: 7,
      name: 'Philips Blender - 1000W with Grinder',
      price: 42500,
      originalPrice: 52000,
      image: '/assets/img/products/blender.png',
      discount: 18,
      rating: 4.4,
      reviews: 145,
      seller: 'Kitchen Pro',
      itemsLeft: 56
    },
    {
      id: 8,
      name: 'Scanfrost Microwave Oven - 25L Capacity',
      price: 67500,
      originalPrice: 82000,
      image: '/assets/img/products/microwave.png',
      discount: 18,
      rating: 4.3,
      reviews: 92,
      seller: 'Home Appliances',
      itemsLeft: 27
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
  };

  const handleWishlistToggle = (product: Product, isWishlisted: boolean) => {
    console.log('Wishlist toggle:', product, isWishlisted);
  };

  const filteredProducts = specialOffers.filter(product => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'high-discount') return product.discount && product.discount >= 15;
    if (activeFilter === 'limited-stock') return product.itemsLeft && product.itemsLeft < 20;
    return true;
  });

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Special Offers</h2>
            <p className="text-lg text-gray-600">Limited time deals with huge savings</p>
          </div>
          
          {/* Filter Buttons */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 p-1">
            {[
              { key: 'all', label: 'All Offers' },
              { key: 'high-discount', label: 'Big Discounts' },
              { key: 'limited-stock', label: 'Limited Stock' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeFilter === filter.key
                    ? 'bg-red-600 text-white'
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative bg-gray-50 border border-gray-200">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 shadow-md p-3 transition-all border border-gray-300"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 shadow-md p-3 transition-all border border-gray-300"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Products Grid */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide p-6 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="default"
                showWishlist={true}
                showRating={true}
                showStock={true}
                showSeller={true}
                onAddToCart={handleAddToCart}
                onWishlistToggle={handleWishlistToggle}
              />
            ))}
          </div>
        </div>

        {/* Mobile Filter */}
        <div className="mt-4 md:hidden">
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="w-full p-3 border border-gray-300 text-gray-700"
          >
            <option value="all">All Offers</option>
            <option value="high-discount">Big Discounts</option>
            <option value="limited-stock">Limited Stock</option>
          </select>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}