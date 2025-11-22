'use client';
import { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  seller: string;
  inStock: boolean;
  maxQuantity: number;
}

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones Pro Max',
      price: 45999,
      originalPrice: 79999,
      image: '🎧',
      quantity: 1,
      seller: 'TechStore',
      inStock: true,
      maxQuantity: 10
    },
    {
      id: 2,
      name: 'Smart Watch Series 7 GPS + Cellular',
      price: 189000,
      originalPrice: 299999,
      image: '⌚',
      quantity: 2,
      seller: 'GadgetHub',
      inStock: true,
      maxQuantity: 5
    },
    {
      id: 3,
      name: 'USB-C Multiport Hub with HDMI',
      price: 15999,
      image: '🔌',
      quantity: 1,
      seller: 'AccessoriesPlus',
      inStock: true,
      maxQuantity: 15
    },
    {
      id: 4,
      name: 'Gaming Keyboard RGB Mechanical',
      price: 35999,
      originalPrice: 59999,
      image: '⌨️',
      quantity: 1,
      seller: 'GameGear',
      inStock: false,
      maxQuantity: 0
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id && newQuantity > 0 && newQuantity <= item.maxQuantity
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setAppliedPromo('SAVE10');
    }
  };

  const subtotal = cartItems
    .filter(item => item.inStock)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const discount = appliedPromo === 'SAVE10' ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50000 ? 0 : 2500;
  const total = subtotal - discount + shipping;

  const inStockItems = cartItems.filter(item => item.inStock);
  const outOfStockItems = cartItems.filter(item => !item.inStock);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-sm text-gray-600 mt-1">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add items to get started</p>
            <a
              href="/shop"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              {/* In Stock Items */}
              {inStockItems.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b bg-green-50">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-green-700">Available Items ({inStockItems.length})</span>
                    </div>
                  </div>

                  <div className="divide-y">
                    {inStockItems.map((item) => (
                      <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-4xl">
                            {item.image}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              Sold by: <span className="text-orange-600">{item.seller}</span>
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-4">
                              {/* Price */}
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-gray-900">
                                  ₦{item.price.toLocaleString()}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-sm text-gray-400 line-through">
                                    ₦{item.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="px-4 py-1 border-x border-gray-300 font-medium min-w-[50px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                  disabled={item.quantity >= item.maxQuantity}
                                >
                                  +
                                </button>
                              </div>

                              {/* Subtotal */}
                              <div className="ml-auto">
                                <span className="text-lg font-bold text-gray-900">
                                  ₦{(item.price * item.quantity).toLocaleString()}
                                </span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 mt-3">
                              <button className="text-sm text-gray-600 hover:text-orange-600 transition-colors flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                Move to Wishlist
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-sm text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Out of Stock Items */}
              {outOfStockItems.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b bg-red-50">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-red-700">Out of Stock ({outOfStockItems.length})</span>
                    </div>
                  </div>

                  <div className="divide-y">
                    {outOfStockItems.map((item) => (
                      <div key={item.id} className="p-4 opacity-60">
                        <div className="flex gap-4">
                          <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-4xl">
                            {item.image}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                            <p className="text-sm text-red-600 font-medium mb-2">Out of Stock</p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-sm text-red-600 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Continue Shopping */}
              <a
                href="/shop"
                className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Continue Shopping
              </a>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedPromo && (
                    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Code applied successfully!
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₦{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-green-600">🎉 You qualify for free shipping!</p>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>

                {/* Checkout Button */}
                <button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors mb-3"
                  disabled={inStockItems.length === 0}
                >
                  Proceed to Checkout
                </button>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure Checkout</span>
                </div>

                {/* Accepted Payments */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-xs text-gray-600 mb-3 text-center">We Accept</p>
                  <div className="flex justify-center gap-3 text-2xl">
                    <span>💳</span>
                    <span>🏦</span>
                    <span>📱</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}