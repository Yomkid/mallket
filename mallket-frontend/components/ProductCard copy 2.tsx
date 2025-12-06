import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
  rating: number;
  reviews: number;
  seller?: string;
  inStock?: boolean;
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-50">
        <div className="w-full h-48 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
          <span className="text-5xl">📦</span>
        </div>
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-0.5 rounded text-xs font-bold">
            -{product.discount}%
          </div>
        )}
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1.5 rounded-full shadow-sm transition-all duration-200"
        >
          <svg
            className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Product Name */}
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 h-10 group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-3 h-3"
                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ₦{product.price.toLocaleString()}
            </span>
          </div>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₦{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded text-sm font-semibold transition-colors duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const [showAll, setShowAll] = useState(false);

  const allProducts: Product[] = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones Pro Max',
      price: 45999,
      originalPrice: 79999,
      image: '',
      discount: 42,
      rating: 4.5,
      reviews: 1234,
      seller: 'TechStore',
      inStock: true
    },
    {
      id: 2,
      name: 'Smart Watch Series 7 GPS Cellular',
      price: 189000,
      originalPrice: 299999,
      image: '',
      discount: 37,
      rating: 4.8,
      reviews: 856,
      seller: 'GadgetHub',
      inStock: true
    },
    {
      id: 3,
      name: 'Premium Leather Laptop Bag 15.6"',
      price: 28500,
      originalPrice: 45000,
      image: '',
      discount: 37,
      rating: 4.3,
      reviews: 432,
      seller: 'BagWorld',
      inStock: true
    },
    {
      id: 4,
      name: 'USB-C Hub HDMI & Card Reader',
      price: 15999,
      originalPrice: 24999,
      image: '',
      discount: 36,
      rating: 4.6,
      reviews: 2145,
      seller: 'AccessoriesPlus',
      inStock: true
    },
    {
      id: 5,
      name: 'Portable Bluetooth Speaker Waterproof',
      price: 22999,
      originalPrice: 38999,
      image: '',
      discount: 41,
      rating: 4.4,
      reviews: 678,
      seller: 'AudioZone',
      inStock: true
    },
    {
      id: 6,
      name: 'RGB Gaming Keyboard Mechanical',
      price: 35999,
      originalPrice: 59999,
      image: '',
      discount: 40,
      rating: 4.7,
      reviews: 891,
      seller: 'GameGear',
      inStock: true
    },
    {
      id: 7,
      name: 'Wireless Gaming Mouse 7200 DPI',
      price: 18500,
      originalPrice: 29999,
      image: '',
      discount: 38,
      rating: 4.5,
      reviews: 543,
      seller: 'GameGear',
      inStock: true
    },
    {
      id: 8,
      name: '4K Webcam with Ring Light USB',
      price: 32999,
      originalPrice: 52999,
      image: '',
      discount: 38,
      rating: 4.6,
      reviews: 234,
      seller: 'TechStore',
      inStock: true
    },
    {
      id: 9,
      name: 'Power Bank 30000mAh Fast Charge',
      price: 19999,
      originalPrice: 34999,
      image: '',
      discount: 43,
      rating: 4.3,
      reviews: 1567,
      seller: 'PowerPlus',
      inStock: true
    },
    {
      id: 10,
      name: 'Noise Cancelling Earbuds TWS Pro',
      price: 12999,
      originalPrice: 21999,
      image: '',
      discount: 41,
      rating: 4.4,
      reviews: 987,
      seller: 'AudioZone',
      inStock: true
    },
    {
      id: 11,
      name: 'Adjustable Laptop Stand Aluminum',
      price: 8500,
      originalPrice: 15999,
      image: '',
      discount: 47,
      rating: 4.7,
      reviews: 445,
      seller: 'DeskEssentials',
      inStock: true
    },
    {
      id: 12,
      name: 'HD 1080P Security Camera WiFi',
      price: 24999,
      originalPrice: 39999,
      image: '',
      discount: 38,
      rating: 4.5,
      reviews: 623,
      seller: 'SecureHome',
      inStock: true
    }
  ];

  const displayedProducts = showAll ? allProducts : allProducts.slice(0, 6);

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Featured Products
            </h2>
            <p className="text-sm text-gray-600">
              Best deals on top products
            </p>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="hidden md:flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors text-sm"
          >
            <span>{showAll ? 'Show Less' : 'View All'}</span>
            <svg
              className={`w-4 h-4 ml-1 transition-transform ${showAll ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {/* Products Grid - 6 columns on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-6 md:hidden">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {showAll ? 'Show Less' : 'View All Products'}
          </button>
        </div>
      </div>
    </section>
  );
}