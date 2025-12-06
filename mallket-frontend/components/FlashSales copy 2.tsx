'use client';
import { useState, useEffect, useRef } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  discount: number;
  itemsLeft: number;
}

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
      image: '/assets/img/products/phone.png',
      discount: 20,
      itemsLeft: 100
    },
    {
      id: 2,
      name: 'SILVER CREST 8L Extra Large Food Processor',
      price: 39183,
      originalPrice: 43100,
      image: '/assets/img/products/television.png',
      discount: 9,
      itemsLeft: 100
    },
    {
      id: 3,
      name: 'XIAOMI Redmi A3X 6.71" 4GB+128GB Smartphone',
      price: 21919,
      originalPrice: 23100,
      image: '/assets/img/products/phone.png',
      discount: 5,
      itemsLeft: 100
    },
    {
      id: 4,
      name: 'Samsung Galaxy A06 6.7" 4GB+128GB Dual SIM',
      price: 82000,
      originalPrice: 86211,
      image: '/assets/img/products/headphones.png',
      discount: 19,
      itemsLeft: 100
    },
    {
      id: 5,
      name: 'XIAOMI REDMI A5 - 6.88" 8GB+256GB Smartphone',
      price: 95532,
      originalPrice: 118864,
      image: '/assets/img/products/television.png',
      discount: 11,
      itemsLeft: 100
    },
    {
      id: 6,
      name: 'XIAOMI Redmi 15C 6.9" 8GB+256GB Smartphone',
      price: 99999,
      originalPrice: 111742,
      image: '/assets/img/products/headphones.png',
      discount: 10,
      itemsLeft: 100
    },
    {
      id: 7,
      name: 'Wireless Bluetooth Headphones Pro',
      price: 158000,
      originalPrice: 175642,
      image: '/assets/img/products/headphones.png',
      discount: 15,
      itemsLeft: 100
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

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
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

          {/* Products Grid - Compact Cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide p-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {flashProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-48 bg-white border border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                {/* Product Image */}
                <div className="relative bg-white p-3 border-b border-gray-200">
                  <div className="w-full h-32 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-gray-100 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  {/* Discount Badge */}
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-1.5 py-0.5 text-xs font-bold">
                    -{product.discount}%
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="text-xs text-gray-800 mb-2 h-8 line-clamp-2 leading-tight font-medium">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-3">
                    <div className="text-sm font-bold text-gray-900 mb-0.5">
                      {formatPrice(product.price)}
                    </div>
                    <div className="text-xs text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </div>
                  </div>

                  {/* Stock Progress Bar */}
                  <div className="mb-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600 font-medium">
                        {product.itemsLeft} items left
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5">
                      <div
                        className="bg-gradient-to-r from-green-700 to-green-800 h-1.5 transition-all duration-500"
                        style={{ width: `${(product.itemsLeft / 300) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
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