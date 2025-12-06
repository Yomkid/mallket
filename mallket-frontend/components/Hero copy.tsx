'use client';

import { useState, useEffect, SetStateAction } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      bg: 'from-blue-600 to-blue-800',
      title: 'Black Friday Deals',
      subtitle: 'Up to 70% Off on Electronics',
      cta: 'Shop Now',
      image: '📱'
    },
    {
      bg: 'from-orange-600 to-red-600',
      title: 'Fashion Week Sale',
      subtitle: 'New Arrivals | Up to 50% Off',
      cta: 'Explore Fashion',
      image: '👗'
    },
    {
      bg: 'from-green-700 to-teal-700',
      title: 'Home & Kitchen Essentials',
      subtitle: 'Transform Your Space Today',
      cta: 'Shop Home',
      image: '🏠'
    },
    {
      bg: 'from-purple-600 to-pink-600',
      title: 'Gadgets & Accessories',
      subtitle: 'Latest Tech at Best Prices',
      cta: 'View Deals',
      image: '⌚'
    }
  ];

  const dealProducts = [
    {
      name: 'Wireless Earbuds',
      price: '$49.99',
      oldPrice: '$99.99',
      discount: '-50%',
      image: '🎧',
      rating: 4.5
    },
    {
      name: 'Smart Watch Pro',
      price: '$199.99',
      oldPrice: '$299.99',
      discount: '-33%',
      image: '⌚',
      rating: 4.8
    },
    {
      name: 'Gaming Mouse',
      price: '$29.99',
      oldPrice: '$59.99',
      discount: '-50%',
      image: '🖱️',
      rating: 4.6
    },
    {
      name: 'USB-C Hub',
      price: '$24.99',
      oldPrice: '$49.99',
      discount: '-50%',
      image: '🔌',
      rating: 4.4
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="bg-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Carousel */}
          <div className="lg:col-span-9">
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg group">
              {/* Slides */}
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className={`w-full h-full bg-gradient-to-r ${slide.bg} flex items-center justify-between px-8 md:px-16`}>
                    <div className="text-white space-y-4 max-w-xl">
                      <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                        {slide.title}
                      </h2>
                      <p className="text-lg md:text-xl text-white/90">
                        {slide.subtitle}
                      </p>
                      <button className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                        {slide.cta}
                      </button>
                    </div>
                    <div className="hidden md:block text-9xl opacity-20">
                      {slide.image}
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? 'bg-white w-6'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Deals Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
              <div className="bg-orange-500 text-white px-4 py-3">
                <h3 className="font-bold text-lg">⚡ Flash Deals</h3>
                <p className="text-sm text-orange-100">Limited time offers</p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {dealProducts.map((product, index) => (
                  <div key={index} className="p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex gap-3">
                      {/* Product Image Placeholder */}
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 text-3xl">
                        {product.image}
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate mb-1">
                          {product.name}
                        </h4>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-3 h-3" fill={i < Math.floor(product.rating) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">({product.rating})</span>
                        </div>
                        
                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-green-700 text-lg">
                            {product.price}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            {product.oldPrice}
                          </span>
                        </div>
                        
                        {/* Discount Badge */}
                        <span className="inline-block bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded mt-1">
                          {product.discount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors text-sm">
                  View All Deals →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}