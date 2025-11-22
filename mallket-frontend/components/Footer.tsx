import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg"></div>
              <span className="text-xl font-bold">MallKet</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted multivendor marketplace connecting buyers and sellers worldwide.
            </p>
            <div className="flex space-x-4">
              {['fb', 'tw', 'ig', 'in'].map((social) => (
                <div key={social} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-500 transition-colors duration-200">
                  {social}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-green-400 transition-colors duration-200">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-green-400 transition-colors duration-200">Contact</Link></li>
              <li><Link href="/faqs" className="hover:text-green-400 transition-colors duration-200">FAQs</Link></li>
              <li><Link href="/become-seller" className="hover:text-green-400 transition-colors duration-200">Become a Seller</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/shipping" className="hover:text-green-400 transition-colors duration-200">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-green-400 transition-colors duration-200">Returns</Link></li>
              <li><Link href="/privacy" className="hover:text-green-400 transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-green-400 transition-colors duration-200">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get updates on new products and offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
              />
              <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-r-lg font-semibold transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 MallKet. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <img src="/api/placeholder/40/25" alt="Payment" className="h-6" />
            <img src="/api/placeholder/40/25" alt="Payment" className="h-6" />
            <img src="/api/placeholder/40/25" alt="Payment" className="h-6" />
            <img src="/api/placeholder/40/25" alt="Payment" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
}