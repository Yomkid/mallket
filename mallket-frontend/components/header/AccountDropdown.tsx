// File: components/header/AccountDropdown.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';

export function AccountDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="hidden lg:flex items-center space-x-2 text-gray-700 hover:text-green-700 transition-colors"
      >
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

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          <div className="py-2">
            <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
              Sign In
            </Link>
            <Link href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
              Create Account
            </Link>
            <hr className="my-2" />
            <Link href="/account/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
              Your Orders
            </Link>
            <Link href="/account/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
              Your Wishlist
            </Link>
            <Link href="/account/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
              Account Settings
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
