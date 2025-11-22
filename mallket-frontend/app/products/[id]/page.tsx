'use client';

import { useState } from 'react';
import Link from 'next/link';

// This would normally get the product ID from params
export default function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedVariants, setSelectedVariants] = useState({
    color: 'Space Gray',
    storage: '256GB'
  });

  const product = {
    id: 'PROD001',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 950000,
    originalPrice: 1050000,
    discount: 10,
    rating: 4.8,
    reviewCount: 342,
    stock: 45,
    sku: 'APL-IP15PM-256-SG',
    category: 'Smartphones',
    tags: ['5G', 'Titanium', 'A17 Pro', '256GB', 'iOS'],
    seller: {
      id: 'SELLER001',
      name: 'TechStore NG',
      rating: 4.9,
      totalSales: 1247,
      responseRate: 98,
      joined: '2022-03-15'
    },
    images: [
      '📱', '📱', '📱', '📱' // In real app, these would be actual image URLs
    ],
    variants: {
      colors: [
        { name: 'Space Gray', value: 'bg-gray-800', inStock: true },
        { name: 'Silver', value: 'bg-gray-300', inStock: true },
        { name: 'Gold', value: 'bg-yellow-200', inStock: false },
        { name: 'Blue', value: 'bg-blue-500', inStock: true }
      ],
      storage: [
        { name: '128GB', price: 850000, inStock: true },
        { name: '256GB', price: 950000, inStock: true },
        { name: '512GB', price: 1150000, inStock: true },
        { name: '1TB', price: 1350000, inStock: false }
      ]
    },
    specifications: [
      { name: 'Display', value: '6.7-inch Super Retina XDR' },
      { name: 'Chip', value: 'A17 Pro chip' },
      { name: 'Storage', value: '256GB' },
      { name: 'Camera', value: '48MP Main, 12MP Ultra Wide, 12MP Telephoto' },
      { name: 'Battery', value: 'Up to 29 hours video playback' },
      { name: 'Connectivity', value: '5G, Wi-Fi 6E, Bluetooth 5.3' },
      { name: 'Water Resistance', value: 'IP68 (6 meters for 30 minutes)' },
      { name: 'Weight', value: '221 grams' }
    ],
    description: `The iPhone 15 Pro Max represents the pinnacle of Apple's smartphone technology. Featuring a revolutionary titanium design, the most powerful A17 Pro chip ever in a smartphone, and an advanced camera system that unlocks new creative possibilities.

Key Features:
• Aerospace-grade titanium design for exceptional durability
• A17 Pro chip with 6-core CPU and 6-core GPU
• 48MP Main camera with multiple focal lengths
• 5x Telephoto camera for incredible close-ups
• Customizable Action button for quick access
• USB-C for faster transfers and charging
• iOS 17 with innovative features`,

    shipping: {
      freeShipping: true,
      deliveryTime: '2-5 business days',
      returnPolicy: '30 days return policy',
      warranty: '1 year manufacturer warranty'
    },
    reviews: [
      {
        id: 1,
        user: 'Sarah Johnson',
        rating: 5,
        date: '2024-01-15',
        title: 'Absolutely amazing!',
        comment: 'The titanium build feels premium and the camera quality is outstanding. Battery life easily lasts all day with heavy usage.',
        verified: true
      },
      {
        id: 2,
        user: 'Mike Chen',
        rating: 4,
        date: '2024-01-14',
        title: 'Great upgrade from iPhone 13',
        comment: 'Noticeable improvement in performance and camera quality. The USB-C is a welcome change. Only wish the price was a bit lower.',
        verified: true
      },
      {
        id: 3,
        user: 'Emily Davis',
        rating: 5,
        date: '2024-01-13',
        title: 'Best phone I have ever owned',
        comment: 'The 5x zoom is incredible for photography. The titanium makes it feel so light yet durable. Highly recommended!',
        verified: false
      }
    ],
    relatedProducts: [
      {
        id: 'PROD002',
        name: 'Samsung Galaxy S24 Ultra',
        price: 820000,
        image: '📱',
        rating: 4.6
      },
      {
        id: 'PROD003',
        name: 'Apple AirPods Pro (2nd Gen)',
        price: 120000,
        image: '🎧',
        rating: 4.8
      },
      {
        id: 'PROD004',
        name: 'iPhone 15 Pro Case',
        price: 15000,
        image: '📱',
        rating: 4.4
      }
    ]
  };

  const handleAddToCart = () => {
    // In real app, this would add to cart via context/API
    alert(`Added ${quantity} ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    // In real app, this would redirect to checkout
    alert(`Proceeding to checkout with ${quantity} ${product.name}`);
  };

  const formatCurrency = (amount: number) => {
    return `₦${(amount / 100).toLocaleString()}`;
  };

  const calculateAverageRating = () => {
    return product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
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
                  <div className="text-xs text-gray-500 -mt-1">Multivendor Marketplace</div>
                </div>
              </Link>
            </div>

            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">
                Home
              </Link>
              <Link href="/shop" className="text-gray-600 hover:text-green-600 transition-colors">
                Shop
              </Link>
              <Link href="/cart" className="text-gray-600 hover:text-green-600 transition-colors">
                Cart
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-green-600">Shop</Link>
            <span className="mx-2">/</span>
            <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-green-600">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-4">
              <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-8xl">{product.images[selectedImage]}</span>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg border-2 flex items-center justify-center ${
                    selectedImage === index ? 'border-green-500' : 'border-transparent'
                  }`}
                >
                  <span className="text-2xl">{image}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Product Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-sm text-gray-600">{product.brand}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">{product.category}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-green-600">In Stock</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                      Save {product.discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">Including all taxes</p>
            </div>

            {/* Color Variants */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Color: <span className="font-semibold">{selectedVariants.color}</span>
              </label>
              <div className="flex space-x-3">
                {product.variants.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedVariants(prev => ({ ...prev, color: color.name }))}
                    disabled={!color.inStock}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                      selectedVariants.color === color.name 
                        ? 'border-green-500 ring-2 ring-green-200' 
                        : 'border-gray-300'
                    } ${!color.inStock ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}`}
                  >
                    <div className={`w-6 h-6 rounded-full ${color.value}`}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Variants */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Storage: <span className="font-semibold">{selectedVariants.storage}</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {product.variants.storage.map((storage) => (
                  <button
                    key={storage.name}
                    onClick={() => setSelectedVariants(prev => ({ ...prev, storage: storage.name }))}
                    disabled={!storage.inStock}
                    className={`p-3 border-2 rounded-lg text-left transition-colors ${
                      selectedVariants.storage === storage.name
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-gray-400'
                    } ${!storage.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="font-medium text-gray-900">{storage.name}</div>
                    <div className="text-sm text-gray-600">{formatCurrency(storage.price)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">{product.stock} available</span>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-5 mr-3">🚚</span>
                <span>{product.shipping.freeShipping ? 'Free shipping' : 'Shipping calculated at checkout'}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-5 mr-3">📦</span>
                <span>Delivery: {product.shipping.deliveryTime}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-5 mr-3">↩️</span>
                <span>{product.shipping.returnPolicy}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-5 mr-3">🛡️</span>
                <span>{product.shipping.warranty}</span>
              </div>
            </div>

            {/* Seller Info */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">TS</span>
                  </div>
                  <div>
                    <Link 
                      href={`/sellers/${product.seller.id}`}
                      className="font-medium text-gray-900 hover:text-green-600"
                    >
                      {product.seller.name}
                    </Link>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>⭐ {product.seller.rating}</span>
                      <span>•</span>
                      <span>{product.seller.totalSales} sales</span>
                    </div>
                  </div>
                </div>
                <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                  Visit Store
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'specifications', label: 'Specifications' },
                { id: 'reviews', label: `Reviews (${product.reviews.length})` },
                { id: 'shipping', label: 'Shipping & Returns' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
                
                {/* Product Tags */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Product Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-700">{spec.name}</span>
                    <span className="text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                {/* Review Summary */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                      <div className="text-4xl font-bold text-gray-900 mb-2">
                        {calculateAverageRating().toFixed(1)}
                      </div>
                      <div className="flex items-center justify-center md:justify-start">
                        <div className="flex text-yellow-400">
                          {'★'.repeat(Math.floor(calculateAverageRating()))}
                          {'☆'.repeat(5 - Math.floor(calculateAverageRating()))}
                        </div>
                        <span className="ml-2 text-gray-600">({product.reviewCount} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 max-w-md">
                      {/* Rating distribution would go here */}
                      <p className="text-gray-600 text-center md:text-right">
                        Based on {product.reviewCount} customer reviews
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {product.reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex text-yellow-400 text-sm">
                              {'★'.repeat(review.rating)}
                              {'☆'.repeat(5 - review.rating)}
                            </div>
                            <span className="text-sm text-gray-600">by {review.user}</span>
                            {review.verified && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Write Review Button */}
                <div className="mt-8 text-center">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                    Write a Review
                  </button>
                </div>
              </div>
            )}

            {/* Shipping Tab */}
            {activeTab === 'shipping' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Shipping Information</h4>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Delivery Time:</strong> {product.shipping.deliveryTime}</p>
                    <p><strong>Shipping Cost:</strong> {product.shipping.freeShipping ? 'Free' : 'Calculated at checkout'}</p>
                    <p><strong>Processing Time:</strong> 1-2 business days</p>
                    <p><strong>Shipping Methods:</strong> Standard, Express, Pickup</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Return Policy</h4>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Return Period:</strong> {product.shipping.returnPolicy}</p>
                    <p><strong>Condition:</strong> Items must be unused and in original packaging</p>
                    <p><strong>Return Shipping:</strong> Free returns within 30 days</p>
                    <p><strong>Warranty:</strong> {product.shipping.warranty}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.relatedProducts.map(relatedProduct => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.id}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-4xl">{relatedProduct.image}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">{formatCurrency(relatedProduct.price)}</span>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 text-sm">
                      {'★'.repeat(Math.floor(relatedProduct.rating))}
                      {'☆'.repeat(5 - Math.floor(relatedProduct.rating))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}