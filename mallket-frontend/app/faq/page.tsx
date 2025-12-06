'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<string | null>('buying');
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      id: 'buying',
      title: '🛍️ Buying on MallKet',
      icon: '🛍️',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click on the "Sign Up" button in the top right corner. You can register using your email address or through social media accounts like Google or Facebook. The process takes less than 2 minutes.'
        },
        {
          question: 'How do I track my order?',
          answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order from your account dashboard under "My Orders". Click on the order to see real-time tracking information.'
        },
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for most items. Items must be unused and in original packaging. Some categories like perishable goods and personalized items may have different return policies. Please check the product page for specific return information.'
        },
        {
          question: 'How do I apply a coupon code?',
          answer: 'During checkout, you\'ll see a "Apply Coupon Code" field in the order summary section. Enter your code and click "Apply". The discount will be automatically calculated and applied to your order total.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit/debit cards (Visa, MasterCard, Verve), bank transfers, USSD payments, and cash on delivery for eligible orders. All payments are processed securely through encrypted channels.'
        }
      ]
    },
    {
      id: 'selling',
      title: '🏪 Selling on MallKet',
      icon: '🏪',
      questions: [
        {
          question: 'How do I become a seller?',
          answer: 'Visit our "Become a Seller" page and complete the registration form. You\'ll need to provide business information, bank details, and required documents. Most applications are approved within 24-48 hours.'
        },
        {
          question: 'What are the commission rates?',
          answer: 'We charge a competitive 5% commission on all successful sales. There are no hidden fees or monthly charges. You only pay when you make a sale.'
        },
        {
          question: 'How do I handle shipping?',
          answer: 'You can use our integrated logistics partners for nationwide delivery or handle shipping yourself. We provide shipping labels and tracking integration to make the process seamless.'
        },
        {
          question: 'When do I get paid?',
          answer: 'Payouts are processed weekly. Funds from completed orders are transferred to your bank account every Tuesday. You can track your earnings in real-time from your seller dashboard.'
        },
        {
          question: 'What support do you provide to sellers?',
          answer: 'We offer comprehensive seller support including account management, marketing tools, analytics dashboard, and dedicated seller support team. You also get access to seller education resources and community forums.'
        }
      ]
    },
    {
      id: 'shipping',
      title: '🚚 Shipping & Delivery',
      icon: '🚚',
      questions: [
        {
          question: 'How long does delivery take?',
          answer: 'Delivery times vary by location and seller. Standard delivery within Lagos takes 2-3 business days, while other states take 3-7 business days. Express delivery options are available for faster shipping.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Currently, we only ship within Nigeria. We\'re working on expanding to other African countries in the near future. Stay tuned for updates on international shipping.'
        },
        {
          question: 'How much does shipping cost?',
          answer: 'Shipping costs vary based on package size, weight, and destination. Many sellers offer free shipping on orders above certain amounts. You\'ll see the exact shipping cost during checkout before payment.'
        },
        {
          question: 'Can I change my delivery address after ordering?',
          answer: 'Address changes are possible if the order hasn\'t been shipped yet. Contact our customer support immediately with your order number and new address. Once shipped, address changes may not be possible.'
        }
      ]
    },
    {
      id: 'account',
      title: '👤 Account & Security',
      icon: '👤',
      questions: [
        {
          question: 'How do I reset my password?',
          answer: 'Click "Forgot Password" on the login page. Enter your email address and we\'ll send you a password reset link. The link expires in 24 hours for security reasons.'
        },
        {
          question: 'How do I update my personal information?',
          answer: 'Log into your account and go to "Account Settings". Here you can update your personal information, email address, phone number, and communication preferences.'
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Yes, we use bank-level encryption and security measures to protect your payment information. We don\'t store your full card details on our servers. All transactions are processed through secure payment gateways.'
        },
        {
          question: 'How do I delete my account?',
          answer: 'Contact our support team to request account deletion. Please note that account deletion is permanent and cannot be reversed. Make sure to resolve any pending orders or issues before deletion.'
        }
      ]
    },
    {
      id: 'technical',
      title: '🔧 Technical Support',
      icon: '🔧',
      questions: [
        {
          question: 'The website/app is not loading properly',
          answer: 'Try clearing your browser cache and cookies, or try using a different browser. If using the app, make sure it\'s updated to the latest version. If issues persist, contact our technical support team.'
        },
        {
          question: 'I\'m not receiving verification emails',
          answer: 'Check your spam or junk folder first. If you still don\'t see it, try resending the verification email from your account settings. Make sure you entered the correct email address during registration.'
        },
        {
          question: 'How do I report a bug?',
          answer: 'Use the "Report a Problem" feature in the app or contact our technical support team with details about the issue, including screenshots and steps to reproduce the problem.'
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const popularQuestions = [
    'How do I track my order?',
    'What is your return policy?',
    'How do I become a seller?',
    'What payment methods do you accept?',
    'How long does delivery take?'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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

            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-green-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Help Center
          </h1>
          <p className="text-xl text-green-100 mb-8">
            Find answers to common questions about shopping and selling on MallKet
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-300"
              />
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Popular Questions */}
        {!searchTerm && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(question.replace('?', ''));
                    document.getElementById('faq-content')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left"
                >
                  <span className="text-green-600 font-medium">{question}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Content */}
        <div id="faq-content">
          {filteredCategories.length > 0 ? (
            <div className="space-y-8">
              {filteredCategories.map(category => (
                <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
                    className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{category.icon}</span>
                        <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-500 transform transition-transform ${
                          openCategory === category.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {openCategory === category.id && (
                    <div className="px-6 pb-4">
                      <div className="space-y-4">
                        {category.questions.map((faq, index) => (
                          <div key={index} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                            <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* No Results State */
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any answers matching "{searchTerm}". Try different keywords or contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  View All Questions
                </button>
                <Link
                  href="/contact"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Still Need Help */}
        <div className="mt-16 bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help you with any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Contact Support
            </Link>
            <a
              href="tel:+2348001234567"
              className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Call Us Now
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/buying-guide"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all text-center"
          >
            <div className="text-3xl mb-3">📖</div>
            <h3 className="font-semibold text-gray-900 mb-2">Buying Guide</h3>
            <p className="text-gray-600 text-sm">Learn how to shop smart on MallKet</p>
          </Link>
          
          <Link
            href="/seller-guide"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all text-center"
          >
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold text-gray-900 mb-2">Seller Guide</h3>
            <p className="text-gray-600 text-sm">Resources for growing your business</p>
          </Link>
          
          <Link
            href="/safety-tips"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all text-center"
          >
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Safety Tips</h3>
            <p className="text-gray-600 text-sm">Shop safely and securely</p>
          </Link>
        </div>
      </div>
    </div>
  );
}