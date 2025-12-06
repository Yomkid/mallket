import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Apple, Play } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <img src="/logos/logo-white.svg" alt="MallKet Logo" className="h-8 w-auto" />
            </div>
            <p className="text-gray-300 max-w-md">
              Your trusted multivendor marketplace connecting buyers and sellers worldwide. 
              Discover amazing products with secure transactions and fast delivery.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-3">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Youtube, label: 'YouTube' }
              ].map(({ icon: Icon, label }) => (
                <div 
                  key={label}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-700 transition-all duration-300 hover:scale-110"
                  title={label}
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div className="space-y-4 pt-4">
              <h3 className="font-semibold text-lg">Stay Updated</h3>
              <p className="text-gray-300 text-sm">
                Subscribe to get updates on our latest offers and new products!
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20 transition-all duration-200"
                />
                <button className="bg-green-700 hover:bg-green-800 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 whitespace-nowrap shadow-lg hover:shadow-green-700/25">
                  Subscribe
                </button>
              </div>
              <div className="flex items-start space-x-2 text-sm text-gray-400">
                <input 
                  type="checkbox" 
                  className="mt-1 rounded focus:ring-green-700" 
                  id="privacy-policy" 
                />
                <label htmlFor="privacy-policy">
                  I agree to MallKet's Privacy and Cookie Policy. You can unsubscribe from newsletters at any time.
                </label>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-green-700">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-300">
              {[
                'About Us',
                'How to Shop',
                'Delivery Options',
                'Return Policy',
                'FAQs',
                'Bulk Purchases'
              ].map((link) => (
                <li key={link}>
                  <Link 
                    href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-green-400 transition-all duration-200 hover:translate-x-1 block"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-green-700">
              Customer Service
            </h3>
            <ul className="space-y-3 text-gray-300">
              {[
                'Help Center',
                'Contact Us',
                'Shipping Info',
                'Returns & Refunds',
                'Dispute Resolution',
                'Report a Product'
              ].map((link) => (
                <li key={link}>
                  <Link 
                    href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-green-400 transition-all duration-200 hover:translate-x-1 block"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Make Money & Download App */}
          <div className="space-y-6">
            {/* Make Money Section */}
            <div>
              <h3 className="font-semibold text-lg mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-green-700">
                Make Money
              </h3>
              <ul className="space-y-3 text-gray-300">
                {[
                  'Sell on MallKet',
                  'Vendor Hub',
                  'Become a Consultant',
                  'Careers'
                ].map((link) => (
                  <li key={link}>
                    <Link 
                      href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="hover:text-green-400 transition-all duration-200 hover:translate-x-1 block"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Download App */}
            <div className="pt-4">
              <h3 className="font-semibold text-lg mb-4">Get the App</h3>
              <div className="space-y-3">
                <a href="#" className="bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-green-700/25">
                  <Apple size={20} />
                  <div className="text-left">
                    <div className="text-xs opacity-90">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105">
                  <Play size={20} />
                  <div className="text-left">
                    <div className="text-xs opacity-90">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Payment Methods */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">We accept:</span>
              <div className="flex space-x-3">
                {['Visa', 'Mastercard', 'PayPal', 'Mobile Money'].map((method) => (
                  <div 
                    key={method}
                    className="w-12 h-8 bg-gray-700 rounded flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                    title={method}
                  >
                    <span className="text-xs font-medium">{method.charAt(0)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Need help?</span>
              <Link href="/contact" className="text-green-400 hover:text-green-300 transition-colors duration-200">
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 MallKet. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
            <Link href="/terms" className="hover:text-green-400 transition-colors duration-200">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-green-400 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="hover:text-green-400 transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}