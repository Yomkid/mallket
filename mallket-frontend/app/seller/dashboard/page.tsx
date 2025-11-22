'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'pending';
  sales: number;
  image: string;
  category: string;
}

interface Order {
  id: string;
  customer: string;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

interface Analytics {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  monthlyRevenue: number;
  conversionRate: number;
  customerSatisfaction: number;
}

export default function SellerDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [storeStatus, setStoreStatus] = useState('active');

  const analytics: Analytics = {
    totalSales: 4585000,
    totalOrders: 124,
    totalProducts: 28,
    monthlyRevenue: 1250000,
    conversionRate: 3.2,
    customerSatisfaction: 4.7
  };

  const recentProducts: Product[] = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones Pro',
      price: 45999,
      stock: 45,
      status: 'active',
      sales: 89,
      image: '🎧',
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Smart Watch Series 7',
      price: 189000,
      stock: 23,
      status: 'active',
      sales: 34,
      image: '⌚',
      category: 'Wearables'
    },
    {
      id: 3,
      name: 'Mechanical Gaming Keyboard',
      price: 35000,
      stock: 0,
      status: 'inactive',
      sales: 67,
      image: '⌨️',
      category: 'Accessories'
    },
    {
      id: 4,
      name: 'USB-C Fast Charger',
      price: 12000,
      stock: 78,
      status: 'active',
      sales: 156,
      image: '🔌',
      category: 'Accessories'
    }
  ];

  const recentOrders: Order[] = [
    {
      id: 'MK283751',
      customer: 'Sarah Johnson',
      date: '2024-01-15',
      status: 'pending',
      total: 45999,
      items: 1
    },
    {
      id: 'MK283750',
      customer: 'Mike Chen',
      date: '2024-01-15',
      status: 'confirmed',
      total: 189000,
      items: 1
    },
    {
      id: 'MK283749',
      customer: 'Emily Davis',
      date: '2024-01-14',
      status: 'shipped',
      total: 47000,
      items: 2
    },
    {
      id: 'MK283748',
      customer: 'Robert Brown',
      date: '2024-01-14',
      status: 'delivered',
      total: 224000,
      items: 3
    }
  ];

  const getStatusColor = (status: Order['status'] | Product['status']) => {
    switch (status) {
      case 'active':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
              
              {/* Store Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  storeStatus === 'active' ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
                <span className="text-sm text-gray-600">Store is {storeStatus}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 0-6 6v2.25l-2.47 2.47a.75.75 0 0 0 .53 1.28h15.88a.75.75 0 0 0 .53-1.28L16.5 12V9.75a6 6 0 0 0-6-6z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">JD</span>
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">John's Tech Store</p>
                  <p className="text-xs text-gray-500">Verified Seller</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Dashboard Overview', icon: '📊', badge: null },
                  { id: 'products', label: 'Product Management', icon: '📦', badge: analytics.totalProducts },
                  { id: 'orders', label: 'Order Management', icon: '🛒', badge: analytics.totalOrders },
                  { id: 'analytics', label: 'Sales Analytics', icon: '📈', badge: null },
                  { id: 'inventory', label: 'Inventory', icon: '📋', badge: null },
                  { id: 'earnings', label: 'Earnings & Payouts', icon: '💰', badge: null },
                  { id: 'reviews', label: 'Reviews & Ratings', icon: '⭐', badge: '4.7' },
                  { id: 'store', label: 'Store Settings', icon: '🏪', badge: null },
                  { id: 'support', label: 'Seller Support', icon: '💬', badge: null }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activeTab === item.id
                          ? 'bg-green-200 text-green-800'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Link
                    href="/seller/products/add"
                    className="flex items-center space-x-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    <span>+</span>
                    <span className="font-medium">Add New Product</span>
                  </Link>
                  <Link
                    href="/seller/orders"
                    className="flex items-center space-x-2 px-3 py-2 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors"
                  >
                    <span>📦</span>
                    <span className="font-medium">Process Orders</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
                      <p className="text-green-100">
                        Your store is performing well. You have {recentOrders.filter(o => o.status === 'pending').length} new orders to process.
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Link
                        href="/seller/orders"
                        className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-2 px-6 rounded-lg transition-colors inline-block"
                      >
                        View Orders
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Sales</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {formatCurrency(analytics.totalSales)}
                        </p>
                        <p className="text-sm text-green-600 mt-1">+12% from last month</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">💰</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{analytics.totalOrders}</p>
                        <p className="text-sm text-green-600 mt-1">+8% from last month</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🛒</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {formatCurrency(analytics.monthlyRevenue)}
                        </p>
                        <p className="text-sm text-green-600 mt-1">On track for target</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📈</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Orders */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                      <Link href="/seller/orders" className="text-green-600 hover:text-green-700 text-sm font-medium">
                        View All
                      </Link>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {recentOrders.map(order => (
                          <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                            <div>
                              <p className="font-semibold text-gray-900">#{order.id}</p>
                              <p className="text-sm text-gray-600">{order.customer}</p>
                              <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">{formatCurrency(order.total)}</p>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Top Products */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
                      <Link href="/seller/products" className="text-green-600 hover:text-green-700 text-sm font-medium">
                        View All
                      </Link>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {recentProducts.slice(0, 4).map(product => (
                          <div key={product.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-lg">{product.image}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate">{product.name}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>Sales: {product.sales}</span>
                                <span>Stock: {product.stock}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">{formatCurrency(product.price)}</p>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{analytics.conversionRate}%</div>
                    <div className="text-sm text-gray-600">Conversion Rate</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{analytics.customerSatisfaction}/5</div>
                    <div className="text-sm text-gray-600">Avg. Rating</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">98%</div>
                    <div className="text-sm text-gray-600">Order Completion</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">24h</div>
                    <div className="text-sm text-gray-600">Avg. Response Time</div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Management Tab */}
            {activeTab === 'products' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Product Management</h2>
                  <Link
                    href="/seller/products/add"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Add New Product
                  </Link>
                </div>
                <div className="p-6">
                  {/* Products Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 font-semibold text-gray-900">Product</th>
                          <th className="text-left py-3 font-semibold text-gray-900">Price</th>
                          <th className="text-left py-3 font-semibold text-gray-900">Stock</th>
                          <th className="text-left py-3 font-semibold text-gray-900">Sales</th>
                          <th className="text-left py-3 font-semibold text-gray-900">Status</th>
                          <th className="text-left py-3 font-semibold text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentProducts.map(product => (
                          <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                  <span className="text-lg">{product.image}</span>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{product.name}</p>
                                  <p className="text-sm text-gray-600">{product.category}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 font-semibold text-gray-900">
                              {formatCurrency(product.price)}
                            </td>
                            <td className="py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                product.stock > 10 ? 'bg-green-100 text-green-800' : 
                                product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {product.stock} units
                              </span>
                            </td>
                            <td className="py-4 text-gray-600">{product.sales}</td>
                            <td className="py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-4">
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                  Edit
                                </button>
                                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Management Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Order Management</h2>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 font-semibold text-gray-900">Order ID</th>
                          <th className="text-left py-3 font-semibold text-gray-900">Customer</th>
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
                            <td className="py-4 text-gray-600">{order.customer}</td>
                            <td className="py-4 text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
                            <td className="py-4 text-gray-600">{order.items} items</td>
                            <td className="py-4 font-semibold text-gray-900">{formatCurrency(order.total)}</td>
                            <td className="py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-4">
                              <select className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                                <option>Update Status</option>
                                <option>Confirm</option>
                                <option>Ship</option>
                                <option>Complete</option>
                                <option>Cancel</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Other Tabs Placeholder */}
            {!['overview', 'products', 'orders'].includes(activeTab) && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <div className="text-6xl mb-4">🚧</div>
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