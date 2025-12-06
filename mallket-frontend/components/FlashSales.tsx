'use client';
import { useState, useEffect, useRef } from 'react';
import ProductCard, { Product } from './ProductCard';

export default function FlashSales() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 1,
    minutes: 12,
    seconds: 15
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const flashProducts: Product[] = [
    {
      id: 1,
      name: 'SOLITEC STANDING FAN 18 Inches',
      price: 16900,
      originalPrice: 21199,
      image: '/assets/img/products/fan.png',
      discount: 20,
      itemsLeft: 100,
      rating: 4.3,
      reviews: 124
    },
    {
      id: 2,
      name: 'SILVER CREST 8L Extra Large Food Processor',
      price: 39183,
      originalPrice: 43100,
      image: '/assets/img/products/processor.png',
      discount: 9,
      itemsLeft: 100,
      rating: 4.5,
      reviews: 89
    },
    {
      id: 3,
      name: 'XIAOMI Redmi A3X 6.71" 4GB+128GB Smartphone',
      price: 21919,
      originalPrice: 23100,
      image: '/assets/img/products/phone.png',
      discount: 5,
      itemsLeft: 100,
      rating: 4.7,
      reviews: 256,
      isNew: true
    },
    {
      id: 4,
      name: 'Samsung Galaxy A06 6.7" 4GB+128GB Dual SIM',
      price: 82000,
      originalPrice: 86211,
      image: '/assets/img/products/phone.png',
      discount: 19,
      itemsLeft: 100,
      rating: 4.4,
      reviews: 187
    },
    {
      id: 5,
      name: 'XIAOMI REDMI A5 - 6.88" 8GB+256GB Smartphone',
      price: 95532,
      originalPrice: 118864,
      image: '/assets/img/products/phone.png',
      discount: 11,
      itemsLeft: 100,
      rating: 4.6,
      reviews: 92
    },
    {
      id: 6,
      name: 'XIAOMI Redmi 15C 6.9" 8GB+256GB Smartphone',
      price: 99999,
      originalPrice: 111742,
      image: '/assets/img/products/phone.png',
      discount: 10,
      itemsLeft: 100,
      rating: 4.8,
      reviews: 145,
      isHot: true
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
    // Implement your add to cart logic here
  };

  const handleWishlistToggle = (product: Product, isWishlisted: boolean) => {
    console.log('Wishlist toggle:', product, isWishlisted);
    // Implement your wishlist logic here
  };

  return (
    <section className="bg-white my-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-red-600 text-white px-6 py-4 flex items-center justify-between border-b border-red-700">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-1">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight">FLASH SALES</h2>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Time Left:</span>
            <div className="flex items-center gap-1 font-bold text-lg">
              <div className="bg-gray-900 px-2 py-1 min-w-10 text-center text-sm">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="text-gray-900">:</span>
              <div className="bg-gray-900 px-2 py-1 min-w-10 text-center text-sm">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="text-gray-900">:</span>
              <div className="bg-gray-900 px-2 py-1 min-w-10 text-center text-sm">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </div>
          </div>

          <button className="flex items-center gap-1 hover:text-yellow-300 transition-colors font-semibold text-sm group">
            <span>See All</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Products Carousel */}
        <div className="relative bg-gray-50 border border-gray-200 border-t-0">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 shadow-sm p-2 transition-all border border-gray-300"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 shadow-sm p-2 transition-all border border-gray-300"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Products Grid */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide p-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {flashProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="default"
                showWishlist={true}
                showRating={true}
                showStock={true}
                showSeller={false}
                onAddToCart={handleAddToCart}
                onWishlistToggle={handleWishlistToggle}
              />
            ))}
          </div>
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