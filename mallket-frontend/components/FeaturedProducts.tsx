'use client';
import { useState } from 'react';
import ProductCard, { Product } from './ProductCard';

export default function FeaturedProducts() {
  const [showAll, setShowAll] = useState(false);

  const featuredProducts: Product[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max 256GB - Latest Model',
      price: 950000,
      originalPrice: 1050000,
      image: '/assets/img/products/iphone-15.png',
      discount: 10,
      rating: 4.8,
      reviews: 342,
      seller: 'Apple Store',
      isNew: true
    },
    {
      id: 2,
      name: 'Samsung 65" 4K UHD Smart TV with HDR',
      price: 450000,
      originalPrice: 520000,
      image: '/assets/img/products/samsung-tv.png',
      discount: 13,
      rating: 4.6,
      reviews: 189,
      seller: 'Electronics Hub'
    },
    {
      id: 3,
      name: 'MacBook Air M3 13" 8GB/256GB',
      price: 820000,
      originalPrice: 890000,
      image: '/assets/img/products/macbook-air.png',
      discount: 8,
      rating: 4.9,
      reviews: 267,
      seller: 'Apple Store',
      isNew: true
    },
    {
      id: 4,
      name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
      price: 185000,
      originalPrice: 220000,
      image: '/assets/img/products/sony-headphones.png',
      discount: 16,
      rating: 4.7,
      reviews: 156,
      seller: 'Audio World'
    },
    {
      id: 5,
      name: 'Canon EOS R6 Mark II Mirrorless Camera',
      price: 1250000,
      originalPrice: 1400000,
      image: '/assets/img/products/canon-camera.png',
      discount: 11,
      rating: 4.8,
      reviews: 89,
      seller: 'Camera Pro'
    },
    {
      id: 6,
      name: 'PlayStation 5 Digital Edition + Extra Controller',
      price: 480000,
      originalPrice: 550000,
      image: '/assets/img/products/ps5.png',
      discount: 13,
      rating: 4.9,
      reviews: 423,
      seller: 'Game Zone',
      isHot: true
    },
    {
      id: 7,
      name: 'Dell XPS 13 Laptop - 13.4" FHD+ Touch',
      price: 720000,
      originalPrice: 800000,
      image: '/assets/img/products/dell-xps.png',
      discount: 10,
      rating: 4.5,
      reviews: 134,
      seller: 'Tech Haven'
    },
    {
      id: 8,
      name: 'Apple Watch Series 9 GPS + Cellular 45mm',
      price: 350000,
      originalPrice: 390000,
      image: '/assets/img/products/apple-watch.png',
      discount: 10,
      rating: 4.6,
      reviews: 278,
      seller: 'Apple Store',
      isNew: true
    },
    {
      id: 9,
      name: 'Bose QuietComfort Ultra Earbuds - Black',
      price: 145000,
      originalPrice: 165000,
      image: '/assets/img/products/bose-earbuds.png',
      discount: 12,
      rating: 4.4,
      reviews: 92,
      seller: 'Audio World'
    },
    {
      id: 10,
      name: 'iPad Pro 12.9" M2 128GB Wi-Fi',
      price: 680000,
      originalPrice: 750000,
      image: '/assets/img/products/ipad-pro.png',
      discount: 9,
      rating: 4.7,
      reviews: 201,
      seller: 'Apple Store'
    },
    {
      id: 11,
      name: 'Samsung Galaxy Z Fold5 512GB - Phantom Black',
      price: 890000,
      originalPrice: 950000,
      image: '/assets/img/products/galaxy-fold.png',
      discount: 6,
      rating: 4.5,
      reviews: 167,
      seller: 'Mobile World'
    },
    {
      id: 12,
      name: 'LG 75" 8K Ultra HD Smart TV with AI ThinQ',
      price: 1200000,
      originalPrice: 1350000,
      image: '/assets/img/products/lg-tv.png',
      discount: 11,
      rating: 4.6,
      reviews: 78,
      seller: 'Electronics Hub'
    }
  ];

  const displayedProducts = showAll ? featuredProducts : featuredProducts.slice(0, 8);

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
    // Add to cart logic
  };

  const handleWishlistToggle = (product: Product, isWishlisted: boolean) => {
    console.log('Wishlist toggle:', product, isWishlisted);
    // Wishlist logic
  };

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
            <p className="text-lg text-gray-600">Handpicked selection of premium products</p>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="hidden md:flex items-center text-red-600 hover:text-red-700 font-semibold transition-colors text-lg"
          >
            <span>{showAll ? 'Show Less' : 'View All Products'}</span>
            <svg
              className={`w-5 h-5 ml-2 transition-transform ${showAll ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="default"
              showWishlist={true}
              showRating={true}
              showStock={false}
              showSeller={true}
              onAddToCart={handleAddToCart}
              onWishlistToggle={handleWishlistToggle}
            />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 md:hidden text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 transition-colors"
          >
            {showAll ? 'Show Less' : 'View All Products'}
          </button>
        </div>
      </div>
    </section>
  );
}