'use client';

import { useState } from 'react';
import Link from 'next/link';

// This would normally get the order ID from params
export default function OrderDetailsPage() {
  const [orderStatus, setOrderStatus] = useState('confirmed');
  
  const order = {
    id: 'MK283751',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+234 812 345 6789'
    },
    date: '2024-01-15',
    status: 'confirmed',
    total: 45999,
    subtotal: 45999,
    shipping: 0,
    paymentMethod: 'Credit Card',
    shippingAddress: {
      name: 'Sarah Johnson',
      street: '123 Victoria Island',
      city: 'Lagos',
      state: 'Lagos',
      postalCode: '101241',
      phone: '+234 812 345 6789'
    },
    items: [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones Pro',
        price: 45999,
        quantity: 1,
        image: '🎧',
        sku: 'AUD-001'
      }
    ],
    timeline: [
      { status: 'ordered', date: '2024-01-15 14:30', description: 'Order placed' },
      { status: 'confirmed', date: '2024-01-15 14:45', description: 'Order confirmed by seller' }
    ]
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
    { value: 'shipped', label: 'Shipped', color: 'bg-purple-100 text-purple-800' },
    { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
  ];

  const handleStatusUpdate = (newStatus: string) => {
    setOrderStatus(newStatus);
    // In real app, this would update the order status via API
    console.log(`Order status updated to: ${newStatus}`);
  };

  const formatCurrency = (amount: number) => {
    return `₦${(amount / 100).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">MK</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900">MallKet</span>
                  <div className="text-xs text-gray-500 -mt-1">Seller Center</div>
                </div>
              </Link>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/seller/dashboard" className="hover:text-green-600">
                  Dashboard
                </Link>
                <span>/</span>
                <Link href="/seller/orders" className="hover:text-green-600">
                  Orders
                </Link>
                <span>/</span>
                <span className="text-gray-900">Order #{order.id}</span>
              </div>
            </div>

            <Link
              href="/seller/orders"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
                  <p className="text-gray-600 mt-1">Placed on {new Date(order.date).toLocaleDateString()}</p>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">Status:</span>
                    <select
                      value={orderStatus}
                      onChange={(e) => handleStatusUpdate(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{item.image}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{formatCurrency(item.price)}</p>
                        <p className="text-sm text-gray-600">Total: {formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>{order.shipping === 0 ? 'Free' : formatCurrency(order.shipping)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Order Timeline</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{event.description}</p>
                        <p className="text-sm text-gray-600">{new Date(event.date).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add new status update */}
                  <div className="flex items-start space-x-4 pt-4 border-t border-gray-200">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-gray-600 text-sm">+</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Add Update</p>
                      <div className="flex space-x-2 mt-2">
                        <input
                          type="text"
                          placeholder="Add status update..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Customer Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">{order.customer.name}</p>
                  <p className="text-sm text-gray-600">{order.customer.email}</p>
                  <p className="text-sm text-gray-600">{order.customer.phone}</p>
                </div>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
                  Contact Customer
                </button>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Shipping Address</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>{order.shippingAddress.name}</strong></p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                <p>{order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </div>

            {/* Order Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Order Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Print Shipping Label
                </button>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Send Tracking Info
                </button>
                <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Cancel Order
                </button>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Payment Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Method:</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">Paid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}