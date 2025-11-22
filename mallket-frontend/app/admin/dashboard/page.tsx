'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PlatformStats {
  totalUsers: number;
  totalSellers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingVerifications: number;
  pendingProducts: number;
  supportTickets: number;
}

interface RecentActivity {
  id: string;
  type: 'seller_joined' | 'product_added' | 'order_placed' | 'withdrawal_request' | 'support_ticket';
  description: string;
  user: string;
  time: string;
  status?: string;
}

interface SellerRequest {
  id: string;
  name: string;
  email: string;
  businessName: string;
  submitted: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');

  const platformStats: PlatformStats = {
    totalUsers: 15420,
    totalSellers: 1247,
    totalProducts: 45892,
    totalOrders: 89234,
    totalRevenue: 458750000,
    pendingVerifications: 23,
    pendingProducts: 47,
    supportTickets: 12
  };

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'seller_joined',
      description: 'New seller registration',
      user: 'TechGadgets NG',
      time: '2 minutes ago',
      status: 'pending'
    },
    {
      id: '2',
      type: 'order_placed',
      description: 'Large order placed',
      user: 'Sarah Johnson',
      time: '5 minutes ago',
      status: 'completed'
    },
    {
      id: '3',
      type: 'withdrawal_request',
      description: 'Withdrawal request',
      user: 'MobileStore Ltd',
      time: '15 minutes ago',
      status: 'pending'
    },
    {
      id: '4',
      type: 'product_added',
      description: 'New product submitted',
      user: 'FashionHub',
      time: '1 hour ago',
      status: 'pending'
    },
    {
      id: '5',
      type: 'support_ticket',
      description: 'New support ticket',
      user: 'John Doe',
      time: '2 hours ago',
      status: 'open'
    }
  ];

  const sellerRequests: SellerRequest[] = [
    {
      id: 'SR001',
      name: 'Adebayo Johnson',
      email: 'adebayo@techstore.com',
      businessName: 'TechStore Nigeria',
      submitted: '2024-01-15',
      status: 'pending'
    },
    {
      id: 'SR002',
      name: 'Chioma Nwosu',
      email: 'chioma@fashionhub.ng',
      businessName: 'FashionHub Africa',
      submitted: '2024-01-15',
      status: 'pending'
    },
    {
      id: 'SR003',
      name: 'Emeka Okoro',
      email: 'emeka@mobileworld.com',
      businessName: 'MobileWorld Enterprises',
      submitted: '2024-01-14',
      status: 'pending'
    }
  ];

  const formatCurrency = (amount: number) => {
    return `₦${(amount / 100).toLocaleString()}`;
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'seller_joined': return '🏪';
      case 'product_added': return '📦';
      case 'order_placed': return '🛒';
      case 'withdrawal_request': return '💰';
      case 'support_ticket': return '💬';
      default: return '📝';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'open': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
                  <div className="text-xs text-gray-500 -mt-1">Admin Panel</div>
                </div>
              </Link>
              
              {/* Quick Stats */}
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">System Online</span>
                </div>
                <div className="text-gray-600">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 0-6 6v2.25l-2.47 2.47a.75.75 0 0 0 .53 1.28h15.88a.75.75 0 0 0 .53-1.28L16.5 12V9.75a6 6 0 0 0-6-6z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  8
                </span>
              </button>

              {/* Admin User Menu */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">AD</span>
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">Super Administrator</p>
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
                  { id: 'users', label: 'User Management', icon: '👥', badge: platformStats.totalUsers },
                  { id: 'sellers', label: 'Seller Management', icon: '🏪', badge: platformStats.totalSellers },
                  { id: 'products', label: 'Product Management', icon: '📦', badge: platformStats.pendingProducts },
                  { id: 'orders', label: 'Order Management', icon: '🛒', badge: platformStats.totalOrders },
                  { id: 'finance', label: 'Finance & Payouts', icon: '💰', badge: null },
                  { id: 'content', label: 'Content Management', icon: '🎨', badge: null },
                  { id: 'reports', label: 'Reports & Analytics', icon: '📈', badge: null },
                  { id: 'settings', label: 'System Settings', icon: '⚙️', badge: null }
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
                        {typeof item.badge === 'number' && item.badge > 1000 
                          ? `${(item.badge / 1000).toFixed(0)}K` 
                          : item.badge
                        }
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              {/* System Status */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">System Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">API Response</span>
                    <span className="text-green-600 font-medium">98ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uptime</span>
                    <span className="text-green-600 font-medium">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Sessions</span>
                    <span className="text-blue-600 font-medium">1,247</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome & Time Range */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
                    <p className="text-gray-600 mt-1">Real-time insights and platform performance</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="24h">Last 24 Hours</option>
                      <option value="7d">Last 7 Days</option>
                      <option value="30d">Last 30 Days</option>
                      <option value="90d">Last 90 Days</option>
                    </select>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {formatCurrency(platformStats.totalRevenue)}
                        </p>
                        <p className="text-sm text-green-600 mt-1">+15.2% from last period</p>
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
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {platformStats.totalOrders.toLocaleString()}
                        </p>
                        <p className="text-sm text-green-600 mt-1">+8.7% from last period</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🛒</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Sellers</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {platformStats.totalSellers.toLocaleString()}
                        </p>
                        <p className="text-sm text-green-600 mt-1">+12 new this week</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🏪</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Platform Products</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {platformStats.totalProducts.toLocaleString()}
                        </p>
                        <p className="text-sm text-green-600 mt-1">+324 new today</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📦</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Pending Actions */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-900">Pending Actions</h2>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                              <span className="text-yellow-600">🏪</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Seller Verifications</p>
                              <p className="text-sm text-gray-600">{platformStats.pendingVerifications} pending reviews</p>
                            </div>
                          </div>
                          <Link
                            href="/admin/sellers?filter=pending"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                          >
                            Review
                          </Link>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-blue-200 rounded-lg bg-blue-50">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-blue-600">📦</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Product Approvals</p>
                              <p className="text-sm text-gray-600">{platformStats.pendingProducts} pending approvals</p>
                            </div>
                          </div>
                          <Link
                            href="/admin/products?filter=pending"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                          >
                            Review
                          </Link>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                              <span className="text-red-600">💬</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Support Tickets</p>
                              <p className="text-sm text-gray-600">{platformStats.supportTickets} unassigned tickets</p>
                            </div>
                          </div>
                          <Link
                            href="/admin/support"
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                      <Link href="/admin/activity" className="text-green-600 hover:text-green-700 text-sm font-medium">
                        View All
                      </Link>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {recentActivities.map(activity => (
                          <div key={activity.id} className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-lg">{getActivityIcon(activity.type)}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                              <p className="text-sm text-gray-600">{activity.user} • {activity.time}</p>
                            </div>
                            {activity.status && (
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                                {activity.status}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seller Verification Requests */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">Seller Verification Requests</h2>
                    <Link href="/admin/sellers/verification" className="text-green-600 hover:text-green-700 text-sm font-medium">
                      View All
                    </Link>
                  </div>
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 font-semibold text-gray-900">Business Name</th>
                            <th className="text-left py-3 font-semibold text-gray-900">Contact</th>
                            <th className="text-left py-3 font-semibold text-gray-900">Submitted</th>
                            <th className="text-left py-3 font-semibold text-gray-900">Status</th>
                            <th className="text-left py-3 font-semibold text-gray-900">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sellerRequests.map(request => (
                            <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-4">
                                <div>
                                  <p className="font-medium text-gray-900">{request.businessName}</p>
                                  <p className="text-sm text-gray-600">ID: {request.id}</p>
                                </div>
                              </td>
                              <td className="py-4">
                                <p className="text-gray-900">{request.name}</p>
                                <p className="text-sm text-gray-600">{request.email}</p>
                              </td>
                              <td className="py-4 text-gray-600">
                                {new Date(request.submitted).toLocaleDateString()}
                              </td>
                              <td className="py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                  {request.status}
                                </span>
                              </td>
                              <td className="py-4">
                                <div className="flex space-x-2">
                                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                                    Approve
                                  </button>
                                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    View
                                  </button>
                                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                                    Reject
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

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">98.2%</div>
                    <div className="text-sm text-gray-600">Order Completion</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">2.3%</div>
                    <div className="text-sm text-gray-600">Refund Rate</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">4.7/5</div>
                    <div className="text-sm text-gray-600">Avg. Rating</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">45min</div>
                    <div className="text-sm text-gray-600">Avg. Response Time</div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Management Tab */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option>All Users</option>
                        <option>Active</option>
                        <option>Suspended</option>
                        <option>Verified</option>
                      </select>
                    </div>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                      Export Users
                    </button>
                  </div>
                  
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">👥</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">User Management</h3>
                    <p className="text-gray-600 mb-6">
                      Manage {platformStats.totalUsers.toLocaleString()} platform users
                    </p>
                    <div className="flex space-x-4 justify-center">
                      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                        View All Users
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                        User Analytics
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sellers Management Tab */}
            {activeTab === 'sellers' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Seller Management</h2>
                </div>
                <div className="p-6">
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🏪</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Seller Management</h3>
                    <p className="text-gray-600 mb-6">
                      Manage {platformStats.totalSellers.toLocaleString()} registered sellers
                    </p>
                    <div className="flex space-x-4 justify-center">
                      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                        View All Sellers
                      </button>
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                        Pending Verifications
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                        Seller Analytics
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Tabs Placeholder */}
            {!['overview', 'users', 'sellers'].includes(activeTab) && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
                </h3>
                <p className="text-gray-600 mb-6">
                  This management section is under development and will be available soon.
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