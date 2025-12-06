'use client';
import { useState } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
  itemsLeft?: number;
  rating?: number;
  reviews?: number;
  seller?: string;
  inStock?: boolean;
  isNew?: boolean;
  isHot?: boolean;
}

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'featured';
  showWishlist?: boolean;
  showRating?: boolean;
  showStock?: boolean;
  showSeller?: boolean;
  className?: string;
  onAddToCart?: (product: Product) => void;
  onWishlistToggle?: (product: Product, isWishlisted: boolean) => void;
}

export default function ProductCard({ 
  product, 
  variant = 'default',
  showWishlist = true,
  showRating = true,
  showStock = false,
  showSeller = false,
  className = '',
  onAddToCart,
  onWishlistToggle
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Size configurations for different variants
  const sizeConfig = {
    default: {
      card: 'w-48',
      image: 'h-32',
      icon: 'w-16 h-16',
      title: 'text-xs h-8',
      price: 'text-sm'
    },
    compact: {
      card: 'w-40',
      image: 'h-28',
      icon: 'w-14 h-14',
      title: 'text-xs h-10',
      price: 'text-xs'
    },
    featured: {
      card: 'w-56',
      image: 'h-40',
      icon: 'w-20 h-20',
      title: 'text-sm h-12',
      price: 'text-base'
    }
  };

  const sizes = sizeConfig[variant];

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  const getStockPercentage = (itemsLeft: number) => {
    const maxStock = 300;
    return Math.min((itemsLeft / maxStock) * 100, 100);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);
    onWishlistToggle?.(product, newWishlistState);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  return (
    <div className={`
      flex-shrink-0 bg-white border border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer group
      ${sizes.card} ${className}
    `}>
      {/* Product Image */}
      <div className="relative bg-white p-3 border-b border-gray-200">
        <div className={`w-full ${sizes.image} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
          {!imageError ? (
            <>
              {!imageLoaded && (
                <div className={`${sizes.icon} bg-gray-100 flex items-center justify-center animate-pulse`}>
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <img
                src={product.image}
                alt={product.name}
                className={`${imageLoaded ? 'block' : 'hidden'} max-w-full max-h-full object-contain`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </>
          ) : (
            <div className={`${sizes.icon} bg-gray-100 flex items-center justify-center`}>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Discount Badge */}
        {product.discount && product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-1.5 py-0.5 text-xs font-bold">
            -{product.discount}%
          </div>
        )}

        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-green-600 text-white px-1.5 py-0.5 text-xs font-bold">
            NEW
          </div>
        )}

        {/* Hot Badge */}
        {product.isHot && !product.discount && (
          <div className="absolute top-2 right-2 bg-orange-600 text-white px-1.5 py-0.5 text-xs font-bold">
            HOT
          </div>
        )}

        {/* Wishlist Button */}
        {showWishlist && (
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1.5 shadow-sm transition-all duration-200"
          >
            <svg
              className={`w-3 h-3 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
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
        )}
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Seller */}
        {showSeller && product.seller && (
          <p className="text-xs text-gray-500 mb-1 truncate">{product.seller}</p>
        )}

        {/* Product Name */}
        <h3 className={`${sizes.title} text-gray-800 mb-2 line-clamp-2 leading-tight font-medium group-hover:text-red-600 transition-colors`}>
          {product.name}
        </h3>

        {/* Rating */}
        {showRating && product.rating && product.reviews && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3 h-3"
                  fill={i < Math.floor(product.rating!) ? 'currentColor' : 'none'}
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
        )}

        {/* Price */}
        <div className="mb-3">
          <div className={`${sizes.price} font-bold text-gray-900 mb-0.5`}>
            {formatPrice(product.price)}
          </div>
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="text-xs text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </div>
          )}
        </div>

        {/* Stock Progress Bar */}
        {showStock && product.itemsLeft !== undefined && (
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600 font-medium">
                {product.itemsLeft} items left
              </span>
            </div>
            <div className="w-full bg-gray-200 h-1.5">
              <div
                className="bg-gradient-to-r from-green-700 to-green-800 h-1.5 transition-all duration-500"
                style={{ width: `${getStockPercentage(product.itemsLeft)}%` }}
              />
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        {/* <button 
          onClick={handleAddToCart}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 text-xs font-semibold transition-colors duration-200"
        >
          Add to Cart
        </button> */}
      </div>
    </div>
  );
}