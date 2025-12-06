import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-1">NEW TO MALLKET?</h3>
              <p className="text-gray-400 text-sm">Subscribe to our newsletter to get updates on our latest offers!</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter E-mail Address"
                className="px-4 py-2.5 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-80 text-sm"
              />
              <button className="bg-green-600 hover:bg-green-700 px-8 py-2.5 rounded-md font-semibold transition-colors text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Need Help */}
          <div>
            <h3 className="font-bold text-sm mb-4 uppercase">Need Help?</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-green-500 transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-green-500 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/how-to-shop" className="text-gray-300 hover:text-green-500 transition-colors text-sm">
                  How to Shop
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-gray-300 hover:text-green-500 transition-colors text-sm">
                  Delivery Options
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-green-500 transition-colors text-sm">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* About MallKet */}
          <div>
            <h3 className="font-bold text-sm mb-4 uppercase">About MallKet</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-green-500 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-green-500 transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-green-500 transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-green-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-gray-300 hover:text-green-500 transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Make Money with MallKet */}
          <div>
            <h3 className="font-bold text-sm mb-4 uppercase">Make Money with MallKet</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/sell" className="text-gray-300 hover:text-green-500 transition-colors text-sm">
                  Sell on MallKet
                </Link>
              </li>
              <li>
                <Link href="/vendor-hub" className="text-gray-300 hover:text-green-500 transition-colors text-sm">
                  Vendor Hub
                </Link>
              </li>
              <li>
                <Link href="/become-sales-consultant" className="text-gray-300 hover:text-green-500 transition-colors text-sm">
                  Become a Sales Consultant
                </Link>
              </li>
            </ul>
          </div>

          {/* Download Our App */}
          <div>
            <h3 className="font-bold text-sm mb-4 uppercase">Download Our App</h3>
            <p className="text-gray-400 text-sm mb-4">Get access to exclusive offers!</p>
            <div className="space-y-3">
              <Link href="#" className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2.5 rounded-lg transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </Link>
              <Link href="#" className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2.5 rounded-lg transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Email Support</h4>
                <a href="mailto:support@mallket.com" className="text-gray-400 text-sm hover:text-green-500">
                  support@mallket.com
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Phone Support</h4>
                <a href="tel:+1234567890" className="text-gray-400 text-sm hover:text-green-500">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Address</h4>
                <p className="text-gray-400 text-sm">
                  123 Commerce Street, City, Country
                </p>
              </div>
            </div>
          </div>

          {/* Social Links & Payment Methods */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="font-semibold text-sm mb-3 text-center md:text-left">Connect With Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-3 text-center md:text-right">Payment Methods</h4>
              <div className="flex space-x-3 items-center">
                <div className="bg-white px-3 py-1.5 rounded">
                  <span className="text-blue-600 font-bold text-sm">VISA</span>
                </div>
                <div className="bg-white px-3 py-1.5 rounded">
                  <span className="text-orange-600 font-bold text-sm">MC</span>
                </div>
                <div className="bg-white px-3 py-1.5 rounded">
                  <span className="text-blue-800 font-bold text-sm">PayPal</span>
                </div>
                <div className="bg-white px-3 py-1.5 rounded flex items-center">
                  <svg className="w-8 h-5" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="3" fill="#635BFF"/>
                    <path d="M8 15h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} MallKet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}