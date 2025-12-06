// File: components/header/MegaMenu.jsx
import { useState } from 'react';
import Link from 'next/link';
import { categoriesData } from '@/lib/categoryData';
import { ChevronRight } from 'lucide-react';

export function MegaMenu({ isOpen, onClose }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay - only under navbar */}
      <div 
        className="fixed inset-0 bg-transparent z-40"
        style={{ top: '160px' }}
        onClick={onClose}
      />
      
      {/* Mega Menu - Compact Size */}
      <div className="absolute left-15 top-full bg-white shadow-xl z-50 border-t border-gray-200" style={{ width: '900px' }}>
        <div className="flex" style={{ maxHeight: '450px' }}>
          {/* Left Sidebar - Main Categories */}
          <div className="w-56 bg-gray-50 border-r border-gray-200 overflow-y-auto">
            {categoriesData.map((category) => {
              const IconComponent = category.Icon;
              return (
                <div
                  key={category.id}
                  onMouseEnter={() => setHoveredCategory(category)}
                  className={`flex items-center space-x-2 px-3 py-2.5 cursor-pointer transition-colors text-xs ${
                    hoveredCategory?.id === category.id
                      ? 'bg-white text-green-700 border-r-3 border-green-700'
                      : 'text-gray-700 hover:bg-white hover:text-green-700'
                  }`}
                >
                  <IconComponent className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium flex-1">{category.name}</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              );
            })}
          </div>

          {/* Right Content - Subcategories */}
          <div className="flex-1 p-4 overflow-y-auto bg-white">
            {hoveredCategory ? (
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {hoveredCategory.subcategories.map((subcategory, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold text-xs text-gray-900 mb-2 uppercase tracking-wider">
                      {subcategory.name}
                    </h3>
                    <ul className="space-y-1.5">
                      {subcategory.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <Link
                            href={`/category/${hoveredCategory.id}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-xs text-gray-600 hover:text-green-700 hover:underline block"
                            onClick={onClose}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                <p>Hover over a category to see options</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
