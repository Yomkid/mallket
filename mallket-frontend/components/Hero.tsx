'use client';

import { useState, useEffect } from 'react';
import { Phone, Store, Package, Star } from 'lucide-react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentDealSlide, setCurrentDealSlide] = useState(0);

  const slides = [
    {
      type: 'text-image',
      bg: 'from-blue-600 to-blue-800',
      title: 'Black Friday Deals',
      subtitle: 'Up to 70% Off on Electronics',
      cta: 'Shop Now',
      image: '/assets/img/products/headphones.png'
    },
    {
      type: 'text-image',
      bg: 'from-orange-600 to-red-600',
      title: 'Fashion Week Sale',
      subtitle: 'New Arrivals | Up to 50% Off',
      cta: 'Explore Fashion',
      image: '/assets/img/products/headphones.png'
    },
    {
      type: 'image-only',
      bg: 'from-green-700 to-teal-700',
      image: '/assets/img/products/banner.png',
      alt: 'Home Decor Special'
    },
    {
      type: 'ad-space',
      bg: 'from-green-100 to-green-100',
      title: 'Ad Space Available',
      subtitle: 'Promote your brand here',
      cta: 'Buy Ad Space'
    }
  ];

  const quickActions = [
    { icon: Phone, text: 'CALL TO ORDER: 08149594986', action: 'tel:08149594986' },
    { icon: Store, text: 'SELL ON MALLKET', action: '/sell' },
    { icon: Package, text: 'SEND PACKAGES', action: '/delivery' }
  ];

  const dealSlides = [
    {
      title: '🔥 FLASH DEALS',
      products: [
        { name: 'Wireless Earbuds', price: '$49.99', discount: '-50%' },
        { name: 'Smart Watch Pro', price: '$199.99', discount: '-33%' }
      ]
    },
    {
      title: '🆕 NEW ARRIVALS',
      products: [
        { name: 'Gaming Mouse', price: '$29.99', discount: '-50%' },
        { name: 'USB-C Hub', price: '$24.99', discount: '-50%' }
      ]
    },
    {
      title: '⭐ TOP RATED',
      products: [
        { name: 'Bluetooth Speaker', price: '$79.99', discount: '-40%' },
        { name: 'Phone Case', price: '$14.99', discount: '-25%' }
      ]
    }
  ];

  // Main carousel timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Fast deal carousel timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDealSlide((prev) => (prev + 1) % dealSlides.length);
    }, 3000); // Faster transition for deals
    return () => clearInterval(timer);
  }, [dealSlides.length]);

  const goToSlide = (index: number) => {
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
                  {slide.type === 'text-image' && (
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
                      <div className="hidden md:block">
                        <img 
                          src={slide.image} 
                          alt={slide.title}
                          className="h-64 w-auto object-contain"
                        />
                      </div>
                    </div>
                  )}

                  {slide.type === 'image-only' && (
                    <div className="w-full h-full">
                      <img 
                        src={slide.image} 
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {slide.type === 'ad-space' && (
                    <div className={`w-full h-full bg-gradient-to-r ${slide.bg} flex flex-col items-center justify-center border-2 border-dashed border-green-700 p-8`}>
                      <div className="text-white text-center space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold">
                          {slide.title}
                        </h2>
                        <p className="text-lg md:text-xl text-white/90">
                          {slide.subtitle}
                        </p>
                        <button className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg border-2 border-green-700">
                          {slide.cta}
                        </button>
                      </div>
                    </div>
                  )}
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

          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[300px] md:h-[400px] flex flex-col">
              
              {/* Quick Actions Section */}
              <div className="border-b border-gray-200">
                <div className="p-4 space-y-3">
                  {quickActions.map((action, index) => (
                    <button 
                      key={index}
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors w-full text-left group"
                    >
                      <action.icon size={20} className="text-green-700 flex-shrink-0" />
                      <span className="text-gray-900 font-semibold text-sm">{action.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fast Deals Carousel */}
              <div className="flex-1 relative overflow-hidden">
                {dealSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      index === currentDealSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="p-4 h-full flex flex-col">
                      <h3 className="font-bold text-red-600 text-sm mb-3">{slide.title}</h3>
                      <div className="space-y-3 flex-1">
                        {slide.products.map((product, productIndex) => (
                          <div key={productIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 text-sm truncate">
                                {product.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="font-bold text-green-700 text-sm">
                                  {product.price}
                                </span>
                                <span className="bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded">
                                  {product.discount}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Deal Carousel Dots */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                  {dealSlides.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        index === currentDealSlide
                          ? 'bg-green-700'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Ad Space Section */}
              <div className="border-t border-gray-200">
                <div className="p-3">
                  <div className="border-2 border-dashed border-green-700 rounded-lg h-16 flex items-center justify-center bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
                    <div className="text-center">
                      <div className="text-green-700 font-bold text-sm">Ad Space</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}