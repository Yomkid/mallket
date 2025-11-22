export default function FeaturedCategories() {
  const categories = [
    { name: 'Electronics', icon: '📱', count: '1.2K products', color: 'bg-blue-50 hover:bg-blue-100' },
    { name: 'Fashion', icon: '👕', count: '2.5K products', color: 'bg-pink-50 hover:bg-pink-100' },
    { name: 'Home & Garden', icon: '🏠', count: '800 products', color: 'bg-green-50 hover:bg-green-100' },
    { name: 'Beauty', icon: '💄', count: '1.5K products', color: 'bg-purple-50 hover:bg-purple-100' },
    { name: 'Sports', icon: '⚽', count: '600 products', color: 'bg-orange-50 hover:bg-orange-100' },
    { name: 'Books', icon: '📚', count: '300 products', color: 'bg-yellow-50 hover:bg-yellow-100' },
    { name: 'Toys & Games', icon: '🎮', count: '450 products', color: 'bg-red-50 hover:bg-red-100' },
    { name: 'Automotive', icon: '🚗', count: '350 products', color: 'bg-gray-50 hover:bg-gray-100' },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <p className="text-gray-600 mt-1">
              Browse through our diverse range of products
            </p>
          </div>
          <button className="hidden md:flex items-center text-green-600 hover:text-green-700 font-semibold">
            <span>View All</span>
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className={`${category.color} rounded-xl p-6 text-center transition-all duration-300 border-2 border-transparent hover:border-green-500 hover:shadow-lg transform hover:-translate-y-1`}>
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {category.count}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-6 md:hidden">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
}