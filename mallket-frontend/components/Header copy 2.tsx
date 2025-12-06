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
      {/* Main Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
              <img src="/logos/logo-green.svg" alt="MallKet Logo" className="h-8 w-auto" />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-3xl">
              <div className="flex">
                {/* Category Dropdown */}
                <div className="relative hidden md:block">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="h-11 pl-4 pr-8 bg-gray-100 text-gray-700 text-sm font-medium rounded-l-lg border-r border-gray-300 focus:outline-none focus:bg-white appearance-none cursor-pointer"
                    style={{ minWidth: '140px' }}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Search Input */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, brands and categories..."
                    className="w-full h-11 px-4 text-gray-700 focus:outline-green-700  md:rounded-none rounded"
                  />
                </div>

                {/* Search Button */}
                <button className="bg-green-700 hover:bg-green-800 px-6 h-11 transition-colors flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-6">
              {/* Account */}
              <Link href="/account" className="hidden lg:flex flex-col items-start text-black hover:text-green-700 transition-colors">
                <span className="text-xs">Hello, Sign In</span>
                <span className="font-semibold text-sm">Account & Lists</span>
              </Link>

              {/* Orders */}
              <Link href="/orders" className="hidden lg:flex flex-col items-start text-black hover:text-green-700 transition-colors">
                <span className="text-xs">Returns</span>
                <span className="font-semibold text-sm">& Orders</span>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="flex items-center space-x-2 text-black hover:text-green-700 transition-colors">
                <div className="relative">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </div>
                <span className="hidden sm:block font-semibold">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-10 space-x-6 text-sm overflow-x-auto">
            {/* All Categories Menu */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-1 font-semibold hover:text-green-700 transition-colors whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>All</span>
            </button>

            <Link href="/deals" className="hover:text-green-700 transition-colors font-medium whitespace-nowrap">
              Today's Deals
            </Link>
            <Link href="/electronics" className="hover:text-green-700 transition-colors whitespace-nowrap">
              Electronics
            </Link>
            <Link href="/fashion" className="hover:text-green-700 transition-colors whitespace-nowrap">
              Fashion
            </Link>
            <Link href="/home" className="hover:text-green-700 transition-colors whitespace-nowrap">
              Home & Kitchen
            </Link>
            <Link href="/sports" className="hover:text-green-700 transition-colors whitespace-nowrap">
              Sports
            </Link>
            <Link href="/gift-cards" className="hover:text-green-700 transition-colors whitespace-nowrap">
              Gift Cards
            </Link>
            <Link href="/new" className="hover:text-green-700 transition-colors whitespace-nowrap">
              New Releases
            </Link>
            <Link href="/sell" className="text-green-700 font-semibold whitespace-nowrap">
              Become a Seller
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