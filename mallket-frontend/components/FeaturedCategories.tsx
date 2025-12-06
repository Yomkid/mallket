export default function FeaturedCategories() {
  const categories = [
    { 
      name: 'Electronics', 
      count: '1.2K products', 
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    { 
      name: 'Fashion', 
      count: '2.5K products', 
      color: 'bg-pink-50 hover:bg-pink-100 border-pink-200'
    },
    { 
      name: 'Home & Garden', 
      count: '800 products', 
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    { 
      name: 'Beauty', 
      count: '1.5K products', 
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
    },
    { 
      name: 'Sports', 
      count: '600 products', 
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
    },
    { 
      name: 'Books', 
      count: '300 products', 
      color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200'
    },
    { 
      name: 'Toys & Games', 
      count: '450 products', 
      color: 'bg-red-50 hover:bg-red-100 border-red-200'
    },
    { 
      name: 'Automotive', 
      count: '350 products', 
      color: 'bg-gray-50 hover:bg-gray-100 border-gray-200'
    },
  ];

  return (
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 bg-green-700 p-2">
          <div>
            <h2 className="font-semibold text-white">
              Shop by Category
            </h2>
            
          </div>
          <button className="hidden md:flex items-center text-white hover:text-orange-700 font-semibold transition-colors">
            <span>View All</span>
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className={`${category.color} rounded-lg p-4 text-center transition-all duration-300 border hover:border-green-700 hover:shadow-md min-h-[100px] flex flex-col justify-center items-center`}>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 leading-tight">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {category.count}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-6 md:hidden">
          <button className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg transition-colors">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
}