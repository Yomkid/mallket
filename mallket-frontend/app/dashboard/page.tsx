'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'processing' | 'shipped' | 'cancelled';
  total: number;
  items: number;
  trackingNumber?: string;
}

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const userStats = {
    totalOrders: 12,
    pendingOrders: 2,
    totalSpent: 1857500,
    wishlistItems: 8
  };

  const recentOrders: Order[] = [
    {
      id: 'MK283749',
      date: '2024-01-15',
      status: 'delivered',
      total: 459999,
      items: 2,
      trackingNumber: 'TRK784239'
    },
    {
      id: 'MK283748',
      date: '2024-01-12',
      status: 'shipped',
      total: 189000,
      items: 1,
      trackingNumber: 'TRK784238'
    },
    {
      id: 'MK283747',
      date: '2024-01-10',
      status: 'processing',
      total: 325000,
      items: 3
    },
    {
      id: 'MK283746',
      date: '2024-01-08',
      status: 'delivered',
      total: 875000,
      items: 1
    }
  ];

  const addresses: Address[] = [
    {
      id: '1',
      name: 'Home',
      street: '123 Main Street, Victoria Island',
      city: 'Lagos',
      state: 'Lagos',
      postalCode: '101241',
      phone: '+234 812 345 6789',
      isDefault: true
    },
    {
      id: '2',
      name: 'Work',
      street: '456 Business District, Central Area',
      city: 'Abuja',
      state: 'FCT',
      postalCode: '900001',
      phone: '+234 907 654 3210',
      isDefault: false
    }
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
              <p className="text-gray-600 mt-2">Welcome back, John Doe!</p>
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
                  <span className="text-gray-900 font-medium">Dashboard</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              {/* User Profile Summary */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">JD</span>
                </div>
                <h3 className="font-semibold text-gray-900">John Doe</h3>
                <p className="text-sm text-gray-600">john.doe@example.com</p>
                <p className="text-xs text-gray-500 mt-1">Member since Jan 2023</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Dashboard Overview', icon: '📊' },
                  { id: 'orders', label: 'My Orders', icon: '📦' },
                  { id: 'profile', label: 'Profile Information', icon: '👤' },
                  { id: 'addresses', label: 'Saved Addresses', icon: '🏠' },
                  { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
                  { id: 'reviews', label: 'My Reviews', icon: '⭐' },
                  { id: 'security', label: 'Security', icon: '🔒' },
                  { id: 'support', label: 'Support Tickets', icon: '💬' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Logout */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors">
                  <span className="text-lg">🚪</span>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{userStats.totalOrders}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📦</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{userStats.pendingOrders}</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">⏳</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Spent</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">₦{(userStats.totalSpent / 100).toLocaleString()}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">💰</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Wishlist Items</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{userStats.wishlistItems}</p>
                      </div>
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">❤️</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {recentOrders.map(order => (
                        <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-lg">📦</span>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">Order #{order.id}</p>
                                <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()} • {order.items} items</p>
                                {order.trackingNumber && (
                                  <p className="text-sm text-gray-500">Tracking: {order.trackingNumber}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">₦{(order.total / 100).toLocaleString()}</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <Link
                        href="/dashboard?tab=orders"
                        onClick={() => setActiveTab('orders')}
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        View All Orders →
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                      href="/shop"
                      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                    >
                      <span className="text-2xl mb-2">🛍️</span>
                      <span className="font-medium text-gray-900">Continue Shopping</span>
                    </Link>
                    <button
                      onClick={() => setActiveTab('wishlist')}
                      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                    >
                      <span className="text-2xl mb-2">❤️</span>
                      <span className="font-medium text-gray-900">View Wishlist</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                    >
                      <span className="text-2xl mb-2">👤</span>
                      <span className="font-medium text-gray-900">Edit Profile</span>
                    </button>
                    <Link
                      href="/support"
                      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                    >
                      <span className="text-2xl mb-2">💬</span>
                      <span className="font-medium text-gray-900">Get Support</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">My Orders</h2>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 font-semibold text-gray-900">Order ID</th>
                          <th className="text-left py-3 font-semibold text-gray-900">Date</th>
                          <th className="text-left py-3 font-semibold text-gray-900">Items</th>
                          <th className="text-left py-3 font-semibold text-gray-900">Total</th>
                          <th className="text-left py-3 font-semibold text-gray-900">Status</th>
                          <th className="text-left py-3 font-semibold text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map(order => (
                          <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 font-medium text-gray-900">#{order.id}</td>
                            <td className="py-4 text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
                            <td className="py-4 text-gray-600">{order.items} items</td>
                            <td className="py-4 font-semibold text-gray-900">₦{(order.total / 100).toLocaleString()}</td>
                            <td className="py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-4">
                              <Link
                                href={`/orders/${order.id}`}
                                className="text-green-600 hover:text-green-700 font-medium text-sm"
                              >
                                View Details
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Saved Addresses</h2>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    Add New Address
                  </button>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map(address => (
                      <div key={address.id} className={`border-2 rounded-lg p-4 transition-colors ${
                        address.isDefault 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-gray-900">{address.name}</h3>
                          {address.isDefault && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-2">{address.street}</p>
                        <p className="text-gray-700 mb-2">{address.city}, {address.state} {address.postalCode}</p>
                        <p className="text-gray-700 mb-4">{address.phone}</p>
                        <div className="flex space-x-3">
                          <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                            Edit
                          </button>
                          {!address.isDefault && (
                            <button className="text-gray-600 hover:text-gray-700 font-medium text-sm">
                              Set as Default
                            </button>
                          )}
                          {!address.isDefault && (
                            <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Other Tabs Placeholder */}
            {!['overview', 'orders', 'addresses'].includes(activeTab) && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <div className="text-6xl mb-4">🔧</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
                </h3>
                <p className="text-gray-600 mb-6">
                  This section is under development and will be available soon.
                </p>
                <button
                  onClick={() => setActiveTab('overview')}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}