'use client';
import { useState } from 'react';

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [activeTab, setActiveTab] = useState('description');

  const product = {
    name: 'Wireless Bluetooth Headphones Pro Max with Noise Cancellation',
    price: 45999,
    originalPrice: 79999,
    discount: 42,
    rating: 4.5,
    reviews: 1234,
    sold: 2500,
    inStock: true,
    stockCount: 47,
    brand: 'TechPro',
    seller: 'TechStore Official',
    sellerRating: 4.8,
    images: ['🎧', '🎧', '🎧', '🎧'],
    colors: ['Black', 'White', 'Blue', 'Red'],
    sizes: ['Small', 'Medium', 'Large'],
    shipping: 'Free shipping on orders over ₦10,000',
    delivery: '2-5 business days',
    returnPolicy: '7 days return policy'
  };

  const specifications = [
    { label: 'Brand', value: 'TechPro' },
    { label: 'Model', value: 'TP-BH500' },
    { label: 'Connectivity', value: 'Bluetooth 5.0' },
    { label: 'Battery Life', value: '30 hours' },
    { label: 'Charging Time', value: '2 hours' },
    { label: 'Weight', value: '250g' },
    { label: 'Color Options', value: 'Black, White, Blue, Red' },
    { label: 'Warranty', value: '1 Year Manufacturer Warranty' }
  ];

  const relatedProducts = [
    { id: 1, name: 'Wireless Earbuds Pro', price: 22999, image: '🎧', rating: 4.6 },
    { id: 2, name: 'Gaming Headset RGB', price: 35999, image: '🎮', rating: 4.7 },
    { id: 3, name: 'USB-C Adapter', price: 5999, image: '🔌', rating: 4.3 },
    { id: 4, name: 'Headphone Stand', price: 8999, image: '🎵', rating: 4.5 }
  ];

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase' && quantity < product.stockCount) {
      setQuantity(quantity + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-orange-600">Home</a>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <a href="/category" className="hover:text-orange-600">Electronics</a>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900">Headphones</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Product Section */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Gallery */}
                <div>
                  {/* Main Image */}
                  <div className="bg-gray-50 rounded-lg p-8 mb-4 flex items-center justify-center h-96 border border-gray-200">
                    <span className="text-9xl">{product.images[selectedImage]}</span>
                  </div>
                  {/* Thumbnail Images */}
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`bg-gray-50 rounded-lg p-4 border-2 transition-all ${
                          selectedImage === index ? 'border-orange-500' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-3xl">{img}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    {product.name}
                  </h1>

                  {/* Brand & Seller */}
                  <div className="flex items-center gap-4 mb-3 text-sm">
                    <span className="text-gray-600">Brand: <span className="text-orange-600 font-medium">{product.brand}</span></span>
                    <span className="text-gray-400">|</span>
                    <a href="#" className="text-orange-600 hover:underline">Visit Store</a>
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5"
                            fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                    </div>
                    <span className="text-gray-400">|</span>
                    <span className="text-sm text-gray-600">{product.sold} sold</span>
                  </div>

                  {/* Price */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl font-bold text-gray-900">
                        ₦{product.price.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        ₦{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm font-bold">
                        -{product.discount}%
                      </span>
                    </div>
                    <p className="text-sm text-green-600 font-medium">
                      You save ₦{(product.originalPrice - product.price).toLocaleString()}
                    </p>
                  </div>

                  {/* Color Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color: <span className="text-gray-900">{selectedColor}</span>
                    </label>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${
                            selectedColor === color
                              ? 'border-orange-500 bg-orange-50 text-orange-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Size: <span className="text-gray-900">{selectedSize}</span>
                    </label>
                    <div className="flex gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${
                            selectedSize === size
                              ? 'border-orange-500 bg-orange-50 text-orange-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange('decrease')}
                          className="px-4 py-2 hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-6 py-2 border-x border-gray-300 font-medium">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange('increase')}
                          className="px-4 py-2 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.stockCount} units available
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 mb-4">
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </button>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
                      Buy Now
                    </button>
                  </div>

                  {/* Delivery & Return Info */}
                  <div className="border border-gray-200 rounded-lg p-4 space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900">Delivery</p>
                        <p className="text-gray-600">{product.delivery}</p>
                        <p className="text-green-600 mt-1">{product.shipping}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900">Return Policy</p>
                        <p className="text-gray-600">{product.returnPolicy}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details Tabs */}
              <div className="mt-8 border-t pt-6">
                <div className="flex gap-6 border-b mb-6">
                  {['description', 'specifications', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 px-2 font-medium capitalize transition-colors ${
                        activeTab === tab
                          ? 'text-orange-600 border-b-2 border-orange-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === 'description' && (
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold mb-3">Product Description</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Experience superior sound quality with the Wireless Bluetooth Headphones Pro Max. Featuring advanced noise cancellation technology, these headphones deliver crystal-clear audio in any environment.
                    </p>
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Active Noise Cancellation (ANC) technology</li>
                      <li>30 hours of battery life with ANC off</li>
                      <li>Quick charge: 10 minutes = 3 hours playback</li>
                      <li>Premium comfort with memory foam cushions</li>
                      <li>Bluetooth 5.0 for stable connection</li>
                      <li>Built-in microphone for hands-free calls</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between py-2 border-b border-gray-200">
                          <span className="text-gray-600">{spec.label}</span>
                          <span className="font-medium text-gray-900">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border-b border-gray-200 pb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="font-medium">John D.</span>
                            <span className="text-sm text-gray-500">• 2 days ago</span>
                          </div>
                          <p className="text-gray-700">Great headphones! The noise cancellation works really well and the battery life is impressive.</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Seller Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Seller Information</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏪</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{product.seller}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-400">★</span>
                    <span>{product.sellerRating}</span>
                    <span className="text-gray-500">(520 ratings)</span>
                  </div>
                </div>
              </div>
              <button className="w-full border border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold py-2 rounded-lg transition-colors">
                Visit Store
              </button>
            </div>

            {/* Related Products */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Related Products</h3>
              <div className="space-y-3">
                {relatedProducts.map((item) => (
                  <div key={item.id} className="flex gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 text-2xl">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-sm font-bold text-gray-900">₦{item.price.toLocaleString()}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}