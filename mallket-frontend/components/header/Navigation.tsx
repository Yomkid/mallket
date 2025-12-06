// File: components/header/Navigation.jsx
'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { MegaMenu } from './MegaMenu';
import { Menu, Zap, Smartphone, Shirt, Home, Dumbbell, Gift, Store } from 'lucide-react';

export function Navigation() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);

  const navigationItems = [
    { href: '/deals', label: "Today's Deals", icon: Zap },
    { href: '/electronics', label: 'Electronics', icon: Smartphone },
    // { href: '/fashion', label: 'Fashion & Beauty', icon: Shirt },
    { href: '/home', label: 'Home & Kitchen', icon: Home },
    // { href: '/sports', label: 'Sports & Fitness', icon: Dumbbell },
    // { href: '/new', label: 'New Arrivals', icon: Gift },
    // { href: '/grocery', label: 'Groceries', icon: Store },
    // { href: '/books', label: 'Books & Media', icon: Store },
    // { href: '/toys', label: 'Toys & Games', icon: Store },
    // { href: '/automotive', label: 'Automotive', icon: Store },
  ];

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  return (
    <div className="relative bg-black text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center h-8">
          {/* Fixed All Categories Section */}
          <div className="flex-shrink-0 border-r border-gray-800 h-full">
            <button 
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="flex items-center space-x-3 font-semibold hover:bg-gray-900 h-full px-6 py-2 transition-colors whitespace-nowrap group relative"
            >
              <Menu size={20} className="flex-shrink-0" />
              <span className="text-sm">All Categories</span>
              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
            </button>
          </div>

          {/* Scrollable Navigation Items */}
          <div className="flex-1 flex items-center relative">
            {/* Left Scroll Arrow */}
            {showLeftArrow && (
              <button 
                onClick={() => scroll('left')}
                className="absolute left-0 z-10 bg-black bg-opacity-80 hover:bg-gray-900 h-full px-2 transition-colors"
              >
                <div className="w-4 h-4 border-l-2 border-t-2 border-white rotate-45 transform" />
              </button>
            )}

            {/* Navigation Items Container */}
            <div 
              ref={scrollContainerRef}
              className="flex items-center space-x-0 overflow-x-auto scrollbar-hide scroll-smooth px-4"
              onScroll={checkScroll}
            >
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 hover:bg-gray-900 px-4 py-2 rounded-lg transition-colors font-medium whitespace-nowrap group relative min-w-max"
                  >
                    <IconComponent size={16} className="flex-shrink-0" />
                    <span className="text-sm">{item.label}</span>
                    {/* Hover indicator */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-green-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  </Link>
                );
              })}
            </div>

            {/* Right Scroll Arrow */}
            {showRightArrow && (
              <button 
                onClick={() => scroll('right')}
                className="absolute right-0 z-10 bg-black bg-opacity-80 hover:bg-gray-900 h-full px-2 transition-colors"
              >
                <div className="w-4 h-4 border-r-2 border-t-2 border-white -rotate-45 transform" />
              </button>
            )}
          </div>

          {/* Fixed Sell Button */}
          <div className="flex-shrink-0 border-l border-gray-800 h-full">
            <Link 
              href="/sell" 
              className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 h-full px-6 py-2 font-semibold whitespace-nowrap transition-colors group relative"
            >
              <Store size={16} />
              <span className="text-sm">Sell on MallKet</span>
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-lg bg-green-700 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-200" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mega Menu */}
      <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
    </div>
  );
}