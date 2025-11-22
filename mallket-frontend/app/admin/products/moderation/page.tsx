'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  seller: string;
  category: string;
  price: number;
  status: 'pending' | 'approved' | 'rejected';
  submitted: string;
  images: string[];
  reason?: string;
}

export default function ProductModerationPage() {
  const [filter, setFilter] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const products: Product[] = [
    {
      id: 'PROD001',
      name: 'Wireless Bluetooth Headphones Pro Max',
      seller: 'TechStore NG',
      category: 'Electronics',
      price: 45999,
      status: 'pending',
      submitted: '2024-01-15T14:30:00Z',
      images: ['🎧']
    },
    {
      id: 'PROD002',
      name: 'Smart Watch Series 7 GPS + Cellular',
      seller: 'GadgetHub',
      category: 'Wearables',
      price: 189000,
      status: 'pending',
      submitted: '2024-01-15T13:15:00Z',
      images: ['⌚']
    },
    {
      id: 'PROD003',
      name: 'Designer Leather Handbag',
      seller: 'FashionHub',
      category: 'Fashion',
      price: 25000,
      status: 'pending',
      submitted: '2024-01-15T11:45:00Z',
      images: ['👜']
    },
    {
      id: 'PROD004',
      name: 'Professional Camera DSLR',
      seller: 'PhotoPro',
      category: 'Electronics',
      price: 325000,
      status: 'pending',
      submitted: '2024-01-14T16:20:00Z',
      images: ['📷']
    },
    {
      id: 'PROD005',
      name: 'Gaming Mechanical Keyboard RGB',
      seller: 'GameZone',
      category: 'Electronics',
      price: 35000,
      status: 'pending',
      submitted: '2024-01-14T15:10:00Z',
      images: ['⌨️']
    }
  ];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.status === filter);

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const handleBulkApprove = () => {
    if (selectedProducts.length === 0) return;
    // In real app, this would call API
    alert(`Approved ${selectedProducts.length} products`);
    setSelectedProducts([]);
  };

  const handleBulkReject = () => {
    if (selectedProducts.length === 0) return;
    const reason = prompt('Reason for rejection:');
    if (reason) {
      alert(`Rejected ${selectedProducts.length} products: ${reason}`);
      setSelectedProducts([]);
    }
  };

  const handleSingleAction = (productId: string, action: 'approve' | 'reject') => {
    if (action === 'approve') {
      alert(`Product ${productId} approved`);
    } else {
      const reason = prompt('Reason for rejection:');
      if (reason) {
        alert(`Product ${productId} rejected: ${reason}`);
      }
    }
  };

  const formatCurrency = (amount: number) => {
    return `₦${(amount / 100).toLocaleString()}`;
  };

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
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
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/admin/dashboard" className="hover:text-green-600">
                  Dashboard
                </Link>
                <span>/</span>
                <Link href="/admin/products" className="hover:text-green-600">
                  Products
                </Link>
                <span>/</span>
                <span className="text-gray-900">Moderation</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {filteredProducts.length} products found
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Product Moderation</h1>
            <p className="text-gray-600 mt-1">Review and approve new product submissions</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
            {/* Bulk Actions */}
            {selectedProducts.length > 0 && (
              <div className="flex space-x-2">
                <button
                  onClick={handleBulkApprove}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Approve Selected ({selectedProducts.length})
                </button>
                <button
                  onClick={handleBulkReject}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Reject Selected
                </button>
              </div>
            )}
            
            {/* Filters */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-600">
                  {selectedProducts.length} of {filteredProducts.length} selected
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Home & Garden</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-600">There are no products matching your current filters.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                    <div className="flex items-center space-x-4 flex-1">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="w-4 h-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                      />
                      
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{product.images[0]}</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>Seller: {product.seller}</span>
                          <span>Category: {product.category}</span>
                          <span>Price: {formatCurrency(product.price)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Submitted: {new Date(product.submitted).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSingleAction(product.id, 'approve')}
                          className="text-green-600 hover:text-green-700 font-medium text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleSingleAction(product.id, 'reject')}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          Reject
                        </button>
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {products.filter(p => p.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {products.filter(p => p.status === 'approved').length}
            </div>
            <div className="text-sm text-gray-600">Approved Today</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-red-600">
              {products.filter(p => p.status === 'rejected').length}
            </div>
            <div className="text-sm text-gray-600">Rejected Today</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {products.length}
            </div>
            <div className="text-sm text-gray-600">Total in Queue</div>
          </div>
        </div>

        {/* Moderation Guidelines */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-yellow-900 mb-3">Moderation Guidelines</h3>
          <ul className="text-yellow-800 text-sm space-y-2">
            <li>• Check for prohibited items (weapons, drugs, counterfeit goods)</li>
            <li>• Verify product images match the description</li>
            <li>• Ensure pricing is reasonable and not misleading</li>
            <li>• Confirm product belongs to appropriate category</li>
            <li>• Check for duplicate or spam listings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}