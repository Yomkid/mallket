'use client';
import ProductCard, { Product } from './ProductCard';

export default function BestSellingProducts() {
  const bestSellingProducts: Product[] = [
    {
      id: 1,
      name: 'XIAOMI Redmi Note 13 8GB/256GB - Arctic White',
      price: 245000,
      originalPrice: 275000,
      image: '/assets/img/products/redmi-note.png',
      discount: 11,
      rating: 4.5,
      reviews: 892,
      seller: 'Mobile Hub',
      itemsLeft: 45,
      isHot: true
    },
    {
      id: 2,
      name: 'Tecno Spark 20 Pro 8GB/256GB - Moonlight Black',
      price: 178000,
      originalPrice: 199000,
      image: '/assets/img/products/tecno-spark.png',
      discount: 11,
      rating: 4.3,
      reviews: 567,
      seller: 'Phone Palace',
      itemsLeft: 32
    },
    {
      id: 3,
      name: 'Infinix Hot 40 Pro 8GB/256GB - Palm Blue',
      price: 165000,
      originalPrice: 185000,
      image: '/assets/img/products/infinix-hot.png',
      discount: 11,
      rating: 4.2,
      reviews: 423,
      seller: 'Mobile World',
      itemsLeft: 28
    },
    {
      id: 4,
      name: 'Samsung Galaxy A25 5G 8GB/256GB - Blue Black',
      price: 285000,
      originalPrice: 315000,
      image: '/assets/img/products/galaxy-a25.png',
      discount: 10,
      rating: 4.4,
      reviews: 334,
      seller: 'Samsung Store',
      itemsLeft: 51
    },
    {
      id: 5,
      name: 'Oraimo FreePods 4 Pro - Noise Cancellation',
      price: 45000,
      originalPrice: 55000,
      image: '/assets/img/products/oraimo-earbuds.png',
      discount: 18,
      rating: 4.6,
      reviews: 678,
      seller: 'Oraimo Official',
      itemsLeft: 67,
      isHot: true
    },
    {
      id: 6,
      name: 'Itel Vision 5 Plus 6GB/128GB - Cosmic Purple',
      price: 125000,
      originalPrice: 145000,
      image: '/assets/img/products/itel-vision.png',
      discount: 14,
      rating: 4.1,
      reviews: 289,
      seller: 'Mobile Zone',
      itemsLeft: 39
    },
    {
      id: 7,
      name: 'Nokia C32 4GB/128GB - Charcoal Black',
      price: 98000,
      originalPrice: 115000,
      image: '/assets/img/products/nokia-c32.png',
      discount: 15,
      rating: 4.0,
      reviews: 156,
      seller: 'Nokia Store',
      itemsLeft: 42
    },
    {
      id: 8,
      name: 'Realme C55 6GB/128GB - Rainy Night',
      price: 135000,
      originalPrice: 155000,
      image: '/assets/img/products/realme-c55.png',
      discount: 13,
      rating: 4.3,
      reviews: 445,
      seller: 'Realme Official',
      itemsLeft: 36,
      isHot: true
    }
  ];

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
  };

  const handleWishlistToggle = (product: Product, isWishlisted: boolean) => {
    console.log('Wishlist toggle:', product, isWishlisted);
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Best Selling Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Most popular products loved by our customers
          </p>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {bestSellingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="default"
              showWishlist={true}
              showRating={true}
              showStock={true}
              showSeller={true}
              onAddToCart={handleAddToCart}
              onWishlistToggle={handleWishlistToggle}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 transition-colors inline-flex items-center gap-2">
            View All Best Sellers
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}