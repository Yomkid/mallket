// File: lib/categoryData.js
// Import Lucide icons (install: npm install lucide-react)
import { 
  Plug, 
  Smartphone, 
  Heart, 
  Home, 
  Laptop, 
  Shirt, 
  ShoppingCart, 
  Monitor, 
  Baby, 
  Gamepad2 
} from 'lucide-react';

export const categoriesData = [
  {
    id: 'appliances',
    name: 'Appliances',
    Icon: Plug,
    subcategories: [
      {
        name: 'SMALL APPLIANCES',
        items: [
          'Blenders', 'Deep Fryers', 'Juicers', 'Air Fryers', 'Rice Cookers',
          'Toasters & Ovens', 'Microwaves', 'Bundles', 'Vacuum Cleaners',
          'Kettles', 'Yam Pounders', 'Irons', 'Electric Cookware'
        ]
      },
      {
        name: 'LARGE APPLIANCES',
        items: [
          'Washing Machines', 'Fridges', 'Freezers', 'Air Conditioners',
          'Heaters', 'Fans', 'Air Purifiers', 'Water Dispensers'
        ]
      },
      {
        name: 'HOME APPLIANCES',
        items: ['Nexus', 'Hisense', 'Polystar', 'TCL']
      }
    ]
  },
  {
    id: 'phones',
    name: 'Phones & Tablets',
    Icon: Smartphone,
    subcategories: [
      {
        name: 'MOBILE PHONES',
        items: ['Smartphones', 'Basic Phones', 'Refurbished']
      },
      {
        name: 'TABLETS',
        items: ['iPads', 'Android Tablets', 'Accessories']
      }
    ]
  },
  {
    id: 'health',
    name: 'Health & Beauty',
    Icon: Heart,
    subcategories: [
      {
        name: 'BEAUTY',
        items: ['Skincare', 'Makeup', 'Fragrances', 'Hair Care']
      },
      {
        name: 'HEALTH',
        items: ['Vitamins', 'Personal Care', 'Medical Supplies']
      }
    ]
  },
  {
    id: 'home',
    name: 'Home & Office',
    Icon: Home,
    subcategories: [
      {
        name: 'FURNITURE',
        items: ['Living Room', 'Bedroom', 'Office', 'Outdoor']
      },
      {
        name: 'DECOR',
        items: ['Wall Art', 'Lighting', 'Rugs', 'Curtains']
      }
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    Icon: Laptop,
    subcategories: [
      {
        name: 'COMPUTERS',
        items: ['Laptops', 'Desktops', 'Monitors', 'Printers']
      },
      {
        name: 'TV & AUDIO',
        items: ['Televisions', 'Speakers', 'Soundbars']
      }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion',
    Icon: Shirt,
    subcategories: [
      {
        name: "MEN'S FASHION",
        items: ['Clothing', 'Shoes', 'Watches', 'Bags']
      },
      {
        name: "WOMEN'S FASHION",
        items: ['Clothing', 'Shoes', 'Jewelry', 'Bags']
      }
    ]
  },
  {
    id: 'supermarket',
    name: 'Supermarket',
    Icon: ShoppingCart,
    subcategories: [
      {
        name: 'FOOD & BEVERAGES',
        items: ['Fresh Produce', 'Beverages', 'Snacks']
      },
      {
        name: 'HOUSEHOLD',
        items: ['Cleaning', 'Paper Products', 'Storage']
      }
    ]
  },
  {
    id: 'computing',
    name: 'Computing',
    Icon: Monitor,
    subcategories: [
      {
        name: 'COMPUTERS',
        items: ['Laptops', 'Desktops', 'All-in-One PCs']
      },
      {
        name: 'ACCESSORIES',
        items: ['Keyboards', 'Mice', 'Webcams']
      }
    ]
  },
  {
    id: 'baby',
    name: 'Baby Products',
    Icon: Baby,
    subcategories: [
      {
        name: 'BABY CARE',
        items: ['Diapers', 'Baby Food', 'Bath & Skin']
      },
      {
        name: 'TOYS & GEAR',
        items: ['Toys', 'Strollers', 'Car Seats']
      }
    ]
  },
  {
    id: 'gaming',
    name: 'Gaming',
    Icon: Gamepad2,
    subcategories: [
      {
        name: 'CONSOLES',
        items: ['PlayStation', 'Xbox', 'Nintendo']
      },
      {
        name: 'ACCESSORIES',
        items: ['Controllers', 'Headsets', 'Gaming Chairs']
      }
    ]
  }
];