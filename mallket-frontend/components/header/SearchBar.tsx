// File: components/header/SearchBar.jsx
'use client';
import { useState } from 'react';

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex-1 max-w-2xl mx-4">
      <div className="flex rounded-md overflow-hidden border border-gray-300 focus-within:border-green-700 focus-within:ring-1 focus-within:ring-green-700">
        <div className="flex-1 relative flex items-center">
          <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search products, brands and categories"
            className="w-full h-12 pl-10 pr-4 text-gray-700 focus:outline-none text-sm"
          />
        </div>
        <button 
          onClick={handleSearch}
          className="bg-green-700 hover:bg-green-800 px-8 text-white font-semibold text-sm transition-colors uppercase tracking-wide"
        >
          Search
        </button>
      </div>
    </div>
  );
}
