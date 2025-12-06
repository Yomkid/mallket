'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = [
    'All Categories',
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Books',
    'Toys',
    'Beauty',
    'Automotive'
  ];

  return (
    <header className="bg-white shadow-sm">
      {/* Top Banner */}
      <div className="bg-orange-500 text-white text-center py-1.5 text-sm font-medium">
        🎉 Special Offer: Up to 50% Off on Selected Items | Free Delivery on Orders Above $50
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
              <div className="bg-green-700 text-white font-bold text-2xl px-3 py-2 rounded">
                MallKet
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="flex rounded-md overflow-hidden border border-gray-300 focus-within:border-green-700 focus-within:ring-1 focus-within:ring-green-700">
                {/* Search Input */}
                <div className="flex-1 relative flex items-center">
                  <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, brands and categories"
                    className="w-full h-12 pl-10 pr-4 text-gray-700 focus:outline-none text-sm"
                  />
                </div>

                {/* Search Button */}
                <button className="bg-orange-500 hover:bg-orange-600 px-8 text-white font-semibold text-sm transition-colors uppercase tracking-wide">
                  Search
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-6">
              {/* Account */}
              <button className="hidden lg:flex items-center space-x-2 text-gray-700 hover:text-green-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-500">Account</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-sm">Sign In</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Help */}
              <button className="hidden lg:flex items-center space-x-2 text-gray-700 hover:text-green-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-500">Help</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-sm">Support</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Cart */}
              <Link href="/cart" className="flex items-center space-x-2 text-gray-700 hover:text-green-700 transition-colors">
                <div className="relative">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </div>
                <span className="hidden sm:block font-semibold text-sm">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-12 space-x-8 text-sm overflow-x-auto">
            {/* All Categories Menu */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 font-semibold hover:bg-green-800 px-3 py-2 rounded transition-colors whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>All Categories</span>
            </button>

            <div className="h-6 w-px bg-green-600"></div>

            <Link href="/deals" className="hover:bg-green-800 px-3 py-2 rounded transition-colors font-medium whitespace-nowrap flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <span>Today's Deals</span>
            </Link>
            <Link href="/electronics" className="hover:bg-green-800 px-3 py-2 rounded transition-colors whitespace-nowrap">
              Electronics
            </Link>
            <Link href="/fashion" className="hover:bg-green-800 px-3 py-2 rounded transition-colors whitespace-nowrap">
              Fashion & Beauty
            </Link>
            <Link href="/home" className="hover:bg-green-800 px-3 py-2 rounded transition-colors whitespace-nowrap">
              Home & Kitchen
            </Link>
            <Link href="/sports" className="hover:bg-green-800 px-3 py-2 rounded transition-colors whitespace-nowrap">
              Sports & Fitness
            </Link>
            <Link href="/new" className="hover:bg-green-800 px-3 py-2 rounded transition-colors whitespace-nowrap">
              New Arrivals
            </Link>
            <Link href="/sell" className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded font-semibold whitespace-nowrap ml-auto transition-colors">
              Sell on MallKet
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Category Menu */}
      {isMenuOpen && (
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase().replace(/ /g, '-')}`}
                  className="py-2 px-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}