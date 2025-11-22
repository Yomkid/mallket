'use client';

import { useState } from 'react';
import Link from 'next/link';

interface WishlistItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
  rating: number;
  reviews: number;
  seller: string;
  inStock: boolean;
  addedDate: string;
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      productId: 1,
      name: 'iPhone 15 Pro Max - 256GB Storage',
      price: 950000,
      originalPrice: 1050000,
      image: '📱',
      discount: 10,
      rating: 4.8,
      reviews: 342,
      seller: 'TechStore NG',
      inStock: true,
      addedDate: '2024-01-15'
    },
    {
      id: 2,
      productId: 3,
      name: 'Wireless Bluetooth Headphones Pro',
      price: 45999,
      image: '🎧',
      rating: 4.5,
      reviews: 128,
      seller: 'Audio Pro',
      inStock: true,
      addedDate: '2024-01-14'
    },
    {
      id: 3,
      productId: 6,
      name: 'Professional Camera DSLR',
      price: 325000,
      image: '📷',
      rating: 4.7,
      reviews: 156,
      seller: 'PhotoPro',
      inStock: false,
      addedDate: '2024-01-13'
    },
    {
      id: 4,
      productId: 4,
      name: 'Smart Watch Series 7 GPS + Cellular',
      price: 189000,
      image: '⌚',
      rating: 4.4,
      reviews: 89,
      seller: 'TechStore NG',
      inStock: true,
      addedDate: '2024-01-12'
    }
  ]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleRemoveItem = (itemId: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    setSelectedItems(prev => prev.filter(id => id !== itemId));
  };

  const handleRemoveSelected = () => {
    setWishlistItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const handleSelectItem = (itemId: number) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map(item => item.id));
    }
  };

  const handleAddToCart = (item: WishlistItem) => {
    // In real app, this would add to cart via context/API
    alert(`Added ${item.name} to cart`);
  };

  const handleAddSelectedToCart = () => {
    const selectedProducts = wishlistItems.filter(item => selectedItems.includes(item.id) && item.inStock);
    if (selectedProducts.length > 0) {
      alert(`Added ${selectedProducts.length} items to cart`);
    } else {
      alert('Please select available items to add to cart');
    }
  };

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const getTotalSavings = () => {
    return wishlistItems.reduce((total, item) => {
      if (item.originalPrice) {
        return total + (item.originalPrice - item.price);
      }
      return total;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600 mt-2">
                {wishlistItems.length} items saved for later
              </p>
            </div>
            
            <nav className="flex mt-4 md:mt-0">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gray-700">
                    Home
                  </Link>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <span className="text-gray-900 font-medium">Wishlist</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Wishlist Header */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === wishlistItems.length && wishlistItems.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-600">
                      {selectedItems.length} of {wishlistItems.length} selected
                    </span>
                  </div>

                  <div className="flex space-x-3">
                    {selectedItems.length > 0 && (
                      <>
                        <button
                          onClick={handleAddSelectedToCart}
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                        >
                          Add Selected to Cart
                        </button>
                        <button
                          onClick={handleRemoveSelected}
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                        >
                          Remove Selected
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Wishlist Items */}
              <div className="space-y-4">
                {wishlistItems.map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0">
                      {/* Checkbox */}
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                          className="w-4 h-4 text-green-500 focus:ring-green-500 border-gray-300 rounded mt-1"
                        />
                      </div>

                      {/* Product Image */}
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center md:mx-4">
                        <span className="text-2xl">{item.image}</span>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 md:mr-4">
                        <Link 
                          href={`/products/${item.productId}`}
                          className="font-semibold text-gray-900 hover:text-green-600 transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span>Seller: {item.seller}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <div className="flex text-yellow-400 text-sm">
                              {'★'.repeat(Math.floor(item.rating))}
                              {'☆'.repeat(5 - Math.floor(item.rating))}
                            </div>
                            <span className="ml-1">({item.reviews})</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Added on {new Date(item.addedDate).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex flex-col items-end space-y-3">
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">
                              {formatCurrency(item.price)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                {formatCurrency(item.originalPrice)}
                              </span>
                            )}
                          </div>
                          {item.discount && (
                            <span className="text-sm text-red-600 font-semibold">
                              Save {item.discount}%
                            </span>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAddToCart(item)}
                            disabled={!item.inStock}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                              item.inStock
                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="Remove from wishlist"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Wishlist Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Wishlist Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Items</span>
                    <span className="font-medium">{wishlistItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Selected Items</span>
                    <span className="font-medium">{selectedItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Value</span>
                    <span className="font-medium">
                      {formatCurrency(wishlistItems.reduce((total, item) => total + item.price, 0))}
                    </span>
                  </div>
                  {getTotalSavings() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Total Savings</span>
                      <span className="font-medium">{formatCurrency(getTotalSavings())}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleAddSelectedToCart}
                    disabled={selectedItems.length === 0}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Add Selected to Cart ({selectedItems.length})
                  </button>
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-3">Continue Shopping</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Discover more products to add to your wishlist
                </p>
                <Link
                  href="/shop"
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors inline-block"
                >
                  Browse Products
                </Link>
              </div>

              {/* Recently Viewed */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">You Might Also Like</h3>
                <div className="space-y-3">
                  {wishlistItems.slice(0, 2).map(item => (
                    <Link
                      key={item.id}
                      href={`/products/${item.productId}`}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">{item.image}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Wishlist State */
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">❤️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Save items you love to your wishlist. Review them anytime and easily move them to your cart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Start Shopping
              </Link>
              <Link
                href="/categories/electronics"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Browse Electronics
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}