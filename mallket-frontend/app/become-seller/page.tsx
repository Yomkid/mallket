'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BecomeSellerPage() {
  const [activeStep, setActiveStep] = useState(1);

  const sellerBenefits = [
    {
      icon: '💰',
      title: 'Low Commission Rates',
      description: 'Only 5% transaction fee - one of the lowest in the market'
    },
    {
      icon: '👥',
      title: 'Access to Millions',
      description: 'Reach over 500,000 active buyers across Nigeria'
    },
    {
      icon: '🚚',
      title: 'Integrated Logistics',
      description: 'Seamless shipping with our partner network'
    },
    {
      icon: '🛡️',
      title: 'Secure Payments',
      description: 'Guaranteed payments with fraud protection'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Real-time sales data and customer insights'
    },
    {
      icon: '🎯',
      title: 'Marketing Tools',
      description: 'Promote your products to targeted audiences'
    }
  ];

  const successStories = [
    {
      name: 'Chioma Nwosu',
      business: 'FashionHub Africa',
      sales: '₦25M+',
      story: 'Started with just 10 products, now selling 500+ fashion items monthly',
      image: '👗'
    },
    {
      name: 'Emeka Okoro',
      business: 'TechGadgets NG',
      sales: '₦48M+',
      story: 'Grew from a small phone accessory shop to a top electronics seller',
      image: '📱'
    },
    {
      name: 'Aisha Bello',
      business: 'BeautyEssentials',
      sales: '₦18M+',
      story: 'Built a successful beauty brand reaching customers nationwide',
      image: '💄'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Create Account',
      description: 'Sign up as a seller in 2 minutes'
    },
    {
      number: 2,
      title: 'Verify Your Business',
      description: 'Submit required documents for verification'
    },
    {
      number: 3,
      title: 'Add Products',
      description: 'List your products with our easy tools'
    },
    {
      number: 4,
      title: 'Start Selling',
      description: 'Go live and reach thousands of customers'
    }
  ];

  const faqs = [
    {
      question: 'How much does it cost to start selling?',
      answer: 'It\'s completely free to register and list your products. We only charge a 5% commission on successful sales.'
    },
    {
      question: 'What documents do I need?',
      answer: 'You\'ll need a valid ID, proof of business registration (if applicable), and bank account details for payouts.'
    },
    {
      question: 'How do I get paid?',
      answer: 'We process payouts to your bank account every week. Funds are transferred automatically for completed orders.'
    },
    {
      question: 'Can I sell any type of product?',
      answer: 'Most products are allowed, but we have restrictions on prohibited items like weapons, drugs, and counterfeit goods.'
    },
    {
      question: 'How long does verification take?',
      answer: 'Most seller applications are verified within 24-48 hours. You can start adding products immediately after approval.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">MK</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">MallKet</span>
                <div className="text-xs text-gray-500 -mt-1">Multivendor Marketplace</div>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">
                Back to Home
              </Link>
              <Link 
                href="/login" 
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Start Selling on <span className="text-green-200">MallKet</span>
              </h1>
              <p className="text-xl text-green-100 mb-8 max-w-lg">
                Join Nigeria's fastest-growing marketplace. Reach millions of customers, 
                grow your business, and achieve your entrepreneurial dreams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/seller/register"
                  className="bg-white text-green-600 hover:bg-green-50 font-bold py-4 px-8 rounded-lg text-lg transition-colors text-center"
                >
                  Start Selling Now
                </Link>
                <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-4 px-8 rounded-lg text-lg transition-colors">
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-green-200 text-sm">Active Sellers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">₦5B+</div>
                  <div className="text-green-200 text-sm">Annual Sales</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-green-200 text-sm">Happy Sellers</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                      <div className="w-12 h-12 bg-white rounded-lg mb-2 flex items-center justify-center">
                        <span className="text-green-600 font-bold">P{item}</span>
                      </div>
                      <div className="text-sm font-semibold">Product {item}</div>
                      <div className="text-green-200 font-bold">₦99,999</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Sell on MallKet?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to start, run, and grow your online business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sellerBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-green-300"
              >
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Start Selling in 4 Easy Steps
            </h2>
            <p className="text-xl text-gray-600">
              Simple process to get your business online quickly
            </p>
          </div>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-12 left-0 right-0 h-1 bg-gray-300 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="text-center relative"
                  onMouseEnter={() => setActiveStep(step.number)}
                >
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${
                    activeStep >= step.number
                      ? 'bg-green-500 text-white scale-110'
                      : 'bg-white text-gray-400 border-2 border-gray-300'
                  }`}>
                    <span className="text-2xl font-bold">
                      {activeStep > step.number ? '✓' : step.number}
                    </span>
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 transition-colors ${
                    activeStep >= step.number ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/seller/register"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-lg text-lg transition-colors inline-block"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Meet sellers who transformed their businesses with MallKet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                    {story.image}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{story.name}</h3>
                    <p className="text-green-600 font-medium">{story.business}</p>
                    <p className="text-sm text-gray-600">Total Sales: {story.sales}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{story.story}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Comparison */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Lowest Commission in the Market
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Keep more of your earnings with our competitive 5% transaction fee
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { platform: 'MallKet', rate: '5%', color: 'bg-white text-green-600' },
              { platform: 'Jumia', rate: '15%', color: 'bg-orange-500 text-white' },
              { platform: 'Konga', rate: '12%', color: 'bg-red-500 text-white' },
              { platform: 'Amazon', rate: '8-15%', color: 'bg-blue-500 text-white' }
            ].map((platform, index) => (
              <div
                key={index}
                className={`rounded-lg p-6 ${platform.color} ${
                  index === 0 ? 'ring-4 ring-green-300 scale-105' : 'opacity-90'
                } transition-transform`}
              >
                <div className="text-2xl font-bold mb-2">{platform.rate}</div>
                <div className="font-semibold">{platform.platform}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about selling on MallKet
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Selling Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful sellers who are growing their businesses with MallKet
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/seller/register"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-lg text-lg transition-colors"
            >
              Start Selling Today
            </Link>
            <Link
              href="/contact"
              className="border-2 border-green-500 text-green-500 hover:bg-green-50 font-bold py-4 px-12 rounded-lg text-lg transition-colors"
            >
              Contact Sales
            </Link>
          </div>

          <p className="text-gray-500 mt-6">
            Have questions? Call us at <a href="tel:+2348001234567" className="text-green-600 hover:text-green-700">+234 800 123 4567</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">MK</span>
                </div>
                <span className="text-xl font-bold">MallKet</span>
              </div>
              <p className="text-gray-400 text-sm">
                Nigeria's trusted multivendor marketplace connecting buyers and sellers.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Sellers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/seller/register" className="hover:text-green-400">Start Selling</Link></li>
                <li><Link href="/seller/guide" className="hover:text-green-400">Seller Guide</Link></li>
                <li><Link href="/seller/commission" className="hover:text-green-400">Commission Rates</Link></li>
                <li><Link href="/seller/support" className="hover:text-green-400">Seller Support</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/blog" className="hover:text-green-400">Seller Blog</Link></li>
                <li><Link href="/success-stories" className="hover:text-green-400">Success Stories</Link></li>
                <li><Link href="/webinars" className="hover:text-green-400">Webinars</Link></li>
                <li><Link href="/tools" className="hover:text-green-400">Business Tools</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/help" className="hover:text-green-400">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-green-400">Contact Us</Link></li>
                <li><a href="tel:+2348001234567" className="hover:text-green-400">+234 800 123 4567</a></li>
                <li><a href="mailto:sellers@mallket.com" className="hover:text-green-400">sellers@mallket.com</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 MallKet. All rights reserved. Building the future of ecommerce in Nigeria.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}