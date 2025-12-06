'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TermsPage() {
  const [lastUpdated] = useState('January 15, 2024');

  const termsSections = [
    {
      id: 'agreement',
      title: '1. Agreement to Terms',
      content: `By accessing and using MallKet ("the Platform"), you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of these Terms, you may not access our Platform.`
    },
    {
      id: 'definitions',
      title: '2. Definitions',
      content: `For the purposes of these Terms:`,
      subsections: [
        {
          title: 'Platform',
          content: `Refers to MallKet website, mobile applications, and related services.`
        },
        {
          title: 'User',
          content: `Any person who accesses or uses the Platform.`
        },
        {
          title: 'Buyer',
          content: `A User who purchases products or services through the Platform.`
        },
        {
          title: 'Seller',
          content: `A User who lists and sells products or services through the Platform.`
        },
        {
          title: 'Content',
          content: `Any text, images, videos, reviews, or other materials posted on the Platform.`
        }
      ]
    },
    {
      id: 'account-registration',
      title: '3. Account Registration',
      content: `To access certain features, you must register for an account. You agree to:`,
      subsections: [
        {
          title: 'Accurate Information',
          content: `Provide accurate, current, and complete information during registration.`
        },
        {
          title: 'Account Security',
          content: `Maintain the security of your password and accept all risks of unauthorized access.`
        },
        {
          title: 'Age Requirement',
          content: `Be at least 18 years old or have parental consent to use the Platform.`
        },
        {
          title: 'One Account',
          content: `Maintain only one account unless expressly permitted by MallKet.`
        }
      ]
    },
    {
      id: 'buyer-terms',
      title: '4. Buyer Terms',
      content: `As a Buyer, you agree to:`,
      subsections: [
        {
          title: 'Payment Obligations',
          content: `Pay for all purchases made through your account using approved payment methods.`
        },
        {
          title: 'Order Acceptance',
          content: `Understand that orders are offers to purchase subject to Seller acceptance.`
        },
        {
          title: 'Product Information',
          content: `Verify product details, specifications, and seller information before purchasing.`
        },
        {
          title: 'Shipping Address',
          content: `Provide accurate shipping address and be available to receive deliveries.`
        }
      ]
    },
    {
      id: 'seller-terms',
      title: '5. Seller Terms',
      content: `As a Seller, you agree to:`,
      subsections: [
        {
          title: 'Product Listings',
          content: `Provide accurate, complete, and truthful product descriptions and images.`
        },
        {
          title: 'Pricing',
          content: `Set fair prices and honor all listed prices and promotions.`
        },
        {
          title: 'Inventory',
          content: `Maintain adequate inventory to fulfill orders and update stock levels regularly.`
        },
        {
          title: 'Shipping',
          content: `Process and ship orders within the stated timeframe and provide tracking information.`
        },
        {
          title: 'Customer Service',
          content: `Provide professional customer service and respond to buyer inquiries promptly.`
        }
      ]
    },
    {
      id: 'prohibited-activities',
      title: '6. Prohibited Activities',
      content: `You may not use the Platform to:`,
      subsections: [
        {
          title: 'Illegal Activities',
          content: `Engage in any illegal, fraudulent, or harmful activities.`
        },
        {
          title: 'Prohibited Items',
          content: `Sell prohibited items including weapons, drugs, counterfeit goods, or stolen items.`
        },
        {
          title: 'Intellectual Property',
          content: `Infringe on intellectual property rights or post unauthorized content.`
        },
        {
          title: 'Misrepresentation',
          content: `Misrepresent your identity, products, or business information.`
        },
        {
          title: 'Platform Interference',
          content: `Interfere with Platform operations or attempt to circumvent security measures.`
        }
      ]
    },
    {
      id: 'fees-payments',
      title: '7. Fees and Payments',
      content: ``,
      subsections: [
        {
          title: 'Commission Fees',
          content: `Sellers pay a 5% commission on each successful transaction.`
        },
        {
          title: 'Payment Processing',
          content: `All payments are processed through secure third-party payment processors.`
        },
        {
          title: 'Taxes',
          content: `Users are responsible for all applicable taxes related to their transactions.`
        },
        {
          title: 'Refunds',
          content: `Refunds are processed according to our Return and Refund Policy.`
        }
      ]
    },
    {
      id: 'intellectual-property',
      title: '8. Intellectual Property',
      content: `All Platform content, features, and functionality are owned by MallKet and are protected by international copyright, trademark, and other laws.`,
      subsections: [
        {
          title: 'User Content',
          content: `You retain rights to content you post but grant MallKet a license to use it for Platform operations.`
        },
        {
          title: 'Trademarks',
          content: `MallKet name, logo, and related marks are trademarks and may not be used without permission.`
        }
      ]
    },
    {
      id: 'dispute-resolution',
      title: '9. Dispute Resolution',
      content: `In case of disputes:`,
      subsections: [
        {
          title: 'Buyer-Seller Disputes',
          content: `Parties should attempt to resolve disputes directly before involving MallKet.`
        },
        {
          title: 'Platform Intervention',
          content: `MallKet may intervene in disputes at its discretion to facilitate resolution.`
        },
        {
          title: 'Mediation',
          content: `Unresolved disputes may be referred to mediation before legal action.`
        }
      ]
    },
    {
      id: 'limitation-liability',
      title: '10. Limitation of Liability',
      content: `MallKet shall not be liable for:
- Indirect, incidental, or consequential damages
- Buyer-Seller disputes or transaction issues
- Third-party actions or content
- Platform downtime or technical issues

Our total liability shall not exceed the amount you paid us in the past 6 months.`
    },
    {
      id: 'termination',
      title: '11. Termination',
      content: `We may suspend or terminate your account for violation of these Terms. You may terminate your account at any time through your account settings.`
    },
    {
      id: 'governing-law',
      title: '12. Governing Law',
      content: `These Terms are governed by the laws of Nigeria. Any disputes shall be resolved in the courts of Lagos State.`
    },
    {
      id: 'changes',
      title: '13. Changes to Terms',
      content: `We may modify these Terms at any time. We will notify you of significant changes. Continued use constitutes acceptance of modified Terms.`
    },
    {
      id: 'contact',
      title: '14. Contact Information',
      content: `For questions about these Terms, contact us:

Email: legal@mallket.com
Phone: +234 800 123 4567
Address: 123 Victoria Island, Lagos, Nigeria`
    }
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
      <section className="py-12 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Last Updated: {lastUpdated}
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using our platform. These terms govern your use of MallKet services.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">Contents</h3>
              <nav className="space-y-2">
                {termsSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-sm text-green-600 hover:text-green-700 transition-colors py-1"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
                <div className="space-y-2">
                  <Link
                    href="/privacy"
                    className="block text-sm text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/return-policy"
                    className="block text-sm text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Return Policy
                  </Link>
                  <Link
                    href="/seller-agreement"
                    className="block text-sm text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Seller Agreement
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Terms Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">MallKet Terms & Conditions</h2>
                    <p className="text-gray-600 mt-1">Effective Date: {lastUpdated}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-1">
                    <span className="text-green-700 text-sm font-medium">Version 3.2</span>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-blue-50 border-b border-blue-200 p-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Important Notice</h4>
                    <p className="text-blue-700 text-sm">
                      These Terms constitute a legally binding agreement. By using MallKet, you acknowledge that you have read, understood, and agree to be bound by these Terms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Terms Sections */}
              <div className="p-6 space-y-12">
                {termsSections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-20">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {section.title}
                    </h3>
                    
                    <div className="prose prose-green max-w-none">
                      <p className="text-gray-700 mb-4 whitespace-pre-line">
                        {section.content}
                      </p>

                      {section.subsections && (
                        <div className="space-y-6">
                          {section.subsections.map((subsection, index) => (
                            <div key={index}>
                              <h4 className="font-semibold text-gray-900 mb-2">
                                {subsection.title}
                              </h4>
                              <p className="text-gray-700 whitespace-pre-line">
                                {subsection.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </section>
                ))}
              </div>

              {/* Terms Footer */}
              <div className="border-t border-gray-200 bg-gray-50 p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    By using MallKet, you acknowledge that you have read and agree to these Terms & Conditions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors inline-block"
                    >
                      Contact Legal Team
                    </Link>
                    <Link
                      href="/privacy"
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors inline-block"
                    >
                      View Privacy Policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Documents */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Legal Documents</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  href="/privacy"
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow block"
                >
                  <div className="text-green-600 font-semibold mb-1">Privacy Policy</div>
                  <p className="text-gray-600 text-sm">How we protect and use your data</p>
                </Link>
                <Link
                  href="/return-policy"
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow block"
                >
                  <div className="text-green-600 font-semibold mb-1">Return Policy</div>
                  <p className="text-gray-600 text-sm">Returns and refunds procedures</p>
                </Link>
                <Link
                  href="/seller-agreement"
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow block"
                >
                  <div className="text-green-600 font-semibold mb-1">Seller Agreement</div>
                  <p className="text-gray-600 text-sm">Additional terms for sellers</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}