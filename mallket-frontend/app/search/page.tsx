'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
  rating: number;
  reviews: number;
  category: string;
  brand: string;
  seller: string;
  inStock: boolean;
  isFeatured: boolean;
  tags: string[];
}

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: '',
    brand: '',
    inStock: false,
    onSale: false
  });

  const categories = [
    'Electronics', 'Fashion', 'Home & Garden', 'Beauty & Health',
    'Sports & Outdoors', 'Automotive', 'Books & Media', 'Toys & Games'
  ];

  const brands = [
    'Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'Dell', 'HP', 'Lenovo'
  ];

  const priceRanges = [
    { label: 'Under ₦50,000', value: '0-50000' },
    { label: '₦50,000 - ₦100,000', value: '50000-100000' },
    { label: '₦100,000 - ₦200,000', value: '100000-200000' },
    { label: 'Over ₦200,000', value: '200000-' }
  ];

  // Mock search results - in real app, this would come from API
  useEffect(() => {
    const mockSearchResults: Product[] = [
      {
        id: 1,
        name: 'iPhone 15 Pro Max - 256GB Storage',
        price: 950000,
        originalPrice: 1050000,
        image: '📱',
        discount: 10,
        rating: 4.8,
        reviews: 342,
        category: 'Electronics',
        brand: 'Apple',
        seller: 'TechStore NG',
        inStock: true,
        isFeatured: true,
        tags: ['5G', 'Titanium', 'A17 Pro', '256GB', 'iOS']
      },
      {
        id: 2,
        name: 'Samsung Galaxy S24 Ultra Smartphone',
        price: 820000,
        originalPrice: 890000,
        image: '📱',
        discount: 8,
        rating: 4.6,
        reviews: 287,
        category: 'Electronics',
        brand: 'Samsung',
        seller: 'GadgetHub',
        inStock: true,
        isFeatured: true,
        tags: ['5G', '512GB', 'S Pen', 'Android']
      },
      {
        id: 3,
        name: 'Wireless Bluetooth Headphones Pro',
        price: 45999,
        image: '🎧',
        rating: 4.5,
        reviews: 128,
        category: 'Electronics',
        brand: 'Sony',
        seller: 'Audio Pro',
        inStock: true,
        isFeatured: false,
        tags: ['Noise Cancelling', 'Wireless', 'Bluetooth 5.0']
      },
      {
        id: 4,
        name: 'Smart Watch Series 7 GPS + Cellular',
        price: 189000,
        image: '⌚',
        rating: 4.4,
        reviews: 89,
        category: 'Wearables',
        brand: 'Apple',
        seller: 'TechStore NG',
        inStock: false,
        isFeatured: false,
        tags: ['GPS', 'Cellular', 'Fitness', 'Health']
      },
      {
        id: 5,
        name: 'Designer Leather Handbag',
        price: 25000,
        image: '👜',
        rating: 4.2,
        reviews: 45,
        category: 'Fashion',
        brand: 'Gucci',
        seller: 'FashionHub',
        inStock: true,
        isFeatured: false,
        tags: ['Leather', 'Designer', 'Luxury']
      },
      {
        id: 6,
        name: 'Professional Camera DSLR',
        price: 325000,
        image: '📷',
        rating: 4.7,
        reviews: 156,
        category: 'Electronics',
        brand: 'Canon',
        seller: 'PhotoPro',
        inStock: true,
        isFeatured: true,
        tags: ['DSLR', '24MP', '4K Video', 'Professional']
      }
    ].filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );

    setProducts(mockSearchResults);
    setFilteredProducts(mockSearchResults);
    setLoading(false);
  }, [query]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Brand filter
    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        } else {
          return product.price >= min;
        }
      });
    }

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(product => product.rating >= Number(filters.rating));
    }

    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // On sale filter
    if (filters.onSale) {
      filtered = filtered.filter(product => product.discount && product.discount > 0);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default: // relevance
        // Keep original search relevance order
        break;
    }

    setFilteredProducts(filtered);
  }, [filters, sortBy, products]);

  const handleFilterChange = (key: string, value: string | boolean) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      rating: '',
      brand: '',
      inStock: false,
      onSale: false
    });
    setSortBy('relevance');
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 group">
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <span className="text-4xl">{product.image}</span>
          </div>
          
          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              -{product.discount}%
            </div>
          )}
          
          {/* Out of Stock */}
          {!product.inStock && (
            <div className="absolute top-3 right-3 bg-gray-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              Out of Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors mb-2">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-2">{product.brand}</p>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400 text-sm">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-gray-900">₦{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₦{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Seller */}
          <p className="text-xs text-gray-500 mb-3">Sold by: {product.seller}</p>

          {/* Add to Cart Button */}
          <button 
            className={`w-full py-2 rounded-lg font-semibold transition-colors ${
              product.inStock
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!product.inStock}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Add to cart logic
              alert(`Added ${product.name} to cart`);
            }}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm p-4">
                      <div className="h-48 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
              <p className="text-gray-600 mt-2">
                {query ? `Search results for "${query}"` : 'Showing all products'}
              </p>
            </div>
            
            {/* Search Box */}
            <div className="mt-4 md:mt-0 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  defaultValue={query}
                  className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value;
                      window.location.href = `/search?q=${encodeURIComponent(value)}`;
                    }
                  }}
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-1 rounded-md">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === category}
                        onChange={() => handleFilterChange('category', category)}
                        className="w-4 h-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <label key={range.value} className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === range.value}
                        onChange={() => handleFilterChange('priceRange', range.value)}
                        className="w-4 h-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Brands</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="radio"
                        name="brand"
                        checked={filters.brand === brand}
                        onChange={() => handleFilterChange('brand', brand)}
                        className="w-4 h-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Customer Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating.toString()}
                        onChange={() => handleFilterChange('rating', rating.toString())}
                        className="w-4 h-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 flex items-center">
                        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)} & Up
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Other Filters */}
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="w-4 h-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.onSale}
                    onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                    className="w-4 h-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">On Sale</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <p className="text-gray-600 mb-4 sm:mb-0">
                {filteredProducts.length > 0 
                  ? `Found ${filteredProducts.length} products for "${query}"`
                  : `No products found for "${query}"`
                }
              </p>
              
              {/* Sort Options */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any products matching "{query}". Try adjusting your search terms or filters.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={clearFilters}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                  <Link
                    href="/shop"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Browse All Products
                  </Link>
                </div>
              </div>
            )}

            {/* Search Suggestions */}
            {filteredProducts.length === 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Try these searches instead:</h3>
                <div className="flex flex-wrap gap-2">
                  {['iPhone', 'Samsung', 'Laptop', 'Headphones', 'Watch', 'Camera'].map(suggestion => (
                    <Link
                      key={suggestion}
                      href={`/search?q=${suggestion}`}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    >
                      {suggestion}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}