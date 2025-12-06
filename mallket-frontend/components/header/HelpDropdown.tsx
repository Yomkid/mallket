// File: components/header/HelpDropdown.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';

export function HelpDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="hidden lg:flex items-center space-x-2 text-gray-700 hover:text-green-700 transition-colors"
      >
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

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          <div className="py-2">
            <Link href="/help/center" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
              Help Center
            </Link>
            <Link href="/help/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
              Contact Us
            </Link>
            <Link href="/help/shipping" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
              Shipping Info
            </Link>
            <Link href="/help/returns" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
              Returns & Refunds
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
