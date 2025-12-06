'use client';
import { useRef } from 'react';

interface Brand {
  id: number;
  name: string;
  logo: string;
  productCount: number;
  category: string;
}

export default function BrandsShowcase() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const brands: Brand[] = [
    {
      id: 1,
      name: 'Samsung',
      logo: '/assets/img/brands/samsung.png',
      productCount: 1247,
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Apple',
      logo: '/assets/img/brands/apple.png',
      productCount: 892,
      category: 'Electronics'
    },
    {
      id: 3,
      name: 'Xiaomi',
      logo: '/assets/img/brands/xiaomi.png',
      productCount: 1567,
      category: 'Electronics'
    },
    {
      id: 4,
      name: 'Tecno',
      logo: '/assets/img/brands/tecno.png',
      productCount: 1345,
      category: 'Mobile'
    },
    {
      id: 5,
      name: 'Infinix',
      logo: '/assets/img/brands/infinix.png',
      productCount: 987,
      category: 'Mobile'
    },
    {
      id: 6,
      name: 'Oraimo',
      logo: '/assets/img/brands/oraimo.png',
      productCount: 654,
      category: 'Accessories'
    },
    {
      id: 7,
      name: 'LG',
      logo: '/assets/img/brands/lg.png',
      productCount: 543,
      category: 'Home Appliances'
    },
    {
      id: 8,
      name: 'Sony',
      logo: '/assets/img/brands/sony.png',
      productCount: 432,
      category: 'Electronics'
    },
    {
      id: 9,
      name: 'Haier Thermocool',
      logo: '/assets/img/brands/haier.png',
      productCount: 389,
      category: 'Home Appliances'
    },
    {
      id: 10,
      name: 'Nokia',
      logo: '/assets/img/brands/nokia.png',
      productCount: 276,
      category: 'Mobile'
    },
    {
      id: 11,
      name: 'Realme',
      logo: '/assets/img/brands/realme.png',
      productCount: 498,
      category: 'Mobile'
    },
    {
      id: 12,
      name: 'Itel',
      logo: '/assets/img/brands/itel.png',
      productCount: 765,
      category: 'Mobile'
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Shop by Brand</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover products from trusted brands with quality guarantee
          </p>
        </div>

        {/* Brands Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 shadow-lg p-3 transition-all border border-gray-300"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 shadow-lg p-3 transition-all border border-gray-300"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Brands Grid */}
          <div
            ref={scrollContainerRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 overflow-x-auto scrollbar-hide p-2 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="bg-white border border-gray-200 hover:border-green-900 hover:shadow-xl transition-all duration-300 cursor-pointer group p-6 flex flex-col items-center justify-center text-center"
              >
                {/* Brand Logo */}
                <div className="w-20 h-20 bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gray-100 flex items-center justify-center text-gray-400">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>

                {/* Brand Info */}
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-800 transition-colors">
                  {brand.name}
                </h3>
                <p className="text-xs text-gray-500 mb-1">{brand.category}</p>
                <p className="text-xs text-gray-600 font-medium">
                  {brand.productCount}+ products
                </p>

                {/* Shop Button */}
                <button className="mt-4 text-xs text-green-800 font-semibold hover:text-green-900 transition-colors">
                  Shop Now →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* View All Brands Button */}
        <div className="text-center mt-10">
          <button className="bg-green-800 hover:bg-green-900 text-white font-semibold py-3 px-8 transition-colors inline-flex items-center gap-2">
            View All Brands
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
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