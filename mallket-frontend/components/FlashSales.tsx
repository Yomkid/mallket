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
    hours: 8,
    minutes: 3,
    seconds: 28
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const flashProducts: Product[] = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones Pro',
      price: 22496,
      originalPrice: 29600,
      image: '🎧',
      discount: 24,
      itemsLeft: 88
    },
    {
      id: 2,
      name: 'SILVER CREST 2L Industrial Blender 8500W',
      price: 23500,
      originalPrice: 28180,
      image: '🔪',
      discount: 17,
      itemsLeft: 299
    },
    {
      id: 3,
      name: 'SOLITEC STANDING FAN 18 Inches',
      price: 16900,
      originalPrice: 21016,
      image: '🌀',
      discount: 20,
      itemsLeft: 100
    },
    {
      id: 4,
      name: 'Oraimo SpaceBuds Beyond Earbuds',
      price: 42328,
      originalPrice: 49772,
      image: '🎧',
      discount: 15,
      itemsLeft: 100
    },
    {
      id: 5,
      name: 'Aeon 4 Burner 50 x 50 Gas Cooker',
      price: 127999,
      originalPrice: 161500,
      image: '🔥',
      discount: 21,
      itemsLeft: 90
    },
    {
      id: 6,
      name: 'Royal 1HP Split Basic Air Conditioner',
      price: 238500,
      originalPrice: 281880,
      image: '❄️',
      discount: 15,
      itemsLeft: 40
    },
    {
      id: 7,
      name: 'Smart LED TV 43 Inch Full HD',
      price: 89999,
      originalPrice: 125000,
      image: '📺',
      discount: 28,
      itemsLeft: 65
    },
    {
      id: 8,
      name: 'Gaming Mouse RGB - 7200 DPI',
      price: 8500,
      originalPrice: 12000,
      image: '🖱️',
      discount: 29,
      itemsLeft: 150
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
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const formatPrice = (price: number) => {
    return `₦ ${price.toLocaleString()}`;
  };

  const getStockPercentage = (itemsLeft: number) => {
    const maxStock = 300;
    return Math.min((itemsLeft / maxStock) * 100, 100);
  };

  return (
    <section className="bg-white my-6">
      <div className="max-w-7xl mx-auto">
        {/* Red Header Bar */}
        <div className="bg-red-600 text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
            </svg>
            <h2 className="text-2xl font-bold">Flash Sales</h2>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold">Time Left:</span>
            <div className="flex items-center gap-1 font-bold text-xl">
              <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span>:</span>
              <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span>:</span>
              <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>

          <button className="flex items-center gap-2 hover:text-yellow-300 transition-colors font-semibold">
            <span>See All</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Products Carousel */}
        <div className="relative bg-gray-50 rounded-b-lg border border-t-0 border-gray-200">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-lg rounded-full p-3 transition-all"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-lg rounded-full p-3 transition-all"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide p-6 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {flashProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-64 bg-white rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                {/* Product Image */}
                <div className="relative bg-gray-50 p-6 rounded-t-lg">
                  <div className="w-full h-40 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </div>
                  {/* Discount Badge */}
                  <div className="absolute top-2 right-2 bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm font-bold">
                    -{product.discount}%
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-sm text-gray-800 mb-3 h-10 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-3">
                    <div className="text-xl font-bold text-gray-900 mb-1">
                      {formatPrice(product.price)}
                    </div>
                    <div className="text-sm text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </div>
                  </div>

                  {/* Stock Progress Bar */}
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600 font-medium">
                        {product.itemsLeft} items left
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${getStockPercentage(product.itemsLeft)}%` }}
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