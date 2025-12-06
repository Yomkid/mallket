'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ReturnPolicyPage() {
  const [lastUpdated] = useState('January 15, 2024');

  const policySections = [
    {
      id: 'overview',
      title: '1. Overview',
      content: `MallKet is committed to customer satisfaction. This Return & Refund Policy outlines the procedures and conditions for returning products and receiving refunds. Please read this policy carefully before making a purchase.`
    },
    {
      id: 'return-period',
      title: '2. Return Period',
      content: `Most products can be returned within 30 days of delivery. Some categories may have different return windows:`,
      subsections: [
        {
          title: 'Standard Products',
          content: `30 days from delivery date`
        },
        {
          title: 'Electronics',
          content: `14 days from delivery date (must be unopened)`
        },
        {
          title: 'Customized Items',
          content: `Non-returnable unless defective`
        },
        {
          title: 'Perishable Goods',
          content: `Non-returnable`
        }
      ]
    },
    {
      id: 'return-conditions',
      title: '3. Return Conditions',
      content: `To be eligible for a return, items must meet the following conditions:`,
      subsections: [
        {
          title: 'Original Condition',
          content: `Items must be unused, unworn, and in original packaging with all tags attached.`
        },
        {
          title: 'Proof of Purchase',
          content: `Valid order confirmation or receipt must be provided.`
        },
        {
          title: 'Complete Package',
          content: `All original accessories, manuals, and free gifts must be included.`
        },
        {
          title: 'No Damage',
          content: `Items must not be damaged, altered, or show signs of misuse.`
        }
      ]
    },
    {
      id: 'non-returnable',
      title: '4. Non-Returnable Items',
      content: `The following items cannot be returned:`,
      subsections: [
        {
          title: 'Personal Care Items',
          content: `Skincare, cosmetics, and personal hygiene products`
        },
        {
          title: 'Customized Products',
          content: `Personalized, made-to-order, or custom-configured items`
        },
        {
          title: 'Digital Products',
          content: `Software, digital downloads, and online subscriptions`
        },
        {
          title: 'Perishable Goods',
          content: `Food, flowers, and other perishable items`
        },
        {
          title: 'Intimate Apparel',
          content: `Underwear, swimwear, and other intimate items`
        }
      ]
    },
    {
      id: 'return-process',
      title: '5. Return Process',
      content: `Follow these steps to initiate a return:`,
      subsections: [
        {
          title: 'Step 1: Contact Seller',
          content: `Contact the seller directly through your order details to discuss the issue.`
        },
        {
          title: 'Step 2: Request Return',
          content: `If unresolved with seller, submit a return request through your MallKet account.`
        },
        {
          title: 'Step 3: Get Approval',
          content: `Wait for return authorization and shipping instructions.`
        },
        {
          title: 'Step 4: Ship Item',
          content: `Package the item securely and ship using the provided instructions.`
        },
        {
          title: 'Step 5: Receive Refund',
          content: `Refund processed after we receive and inspect the returned item.`
        }
      ]
    },
    {
      id: 'refund-process',
      title: '6. Refund Process',
      content: `Refunds are processed as follows:`,
      subsections: [
        {
          title: 'Processing Time',
          content: `Refunds are processed within 5-7 business days after we receive the returned item.`
        },
        {
          title: 'Refund Method',
          content: `Refunds are issued to the original payment method used for purchase.`
        },
        {
          title: 'Shipping Costs',
          content: `Original shipping costs are non-refundable unless the return is due to seller error.`
        },
        {
          title: 'Partial Refunds',
          content: `Partial refunds may be issued for items returned in used or damaged condition.`
        }
      ]
    },
    {
      id: 'defective-damaged',
      title: '7. Defective or Damaged Items',
      content: `If you receive a defective or damaged item:`,
      subsections: [
        {
          title: 'Immediate Notification',
          content: `Contact the seller within 48 hours of delivery.`
        },
        {
          title: 'Evidence',
          content: `Provide photos or videos showing the defect or damage.`
        },
        {
          title: 'Free Return Shipping',
          content: `Seller covers return shipping costs for defective items.`
        },
        {
          title: 'Replacement or Refund',
          content: `Choose between replacement (if available) or full refund.`
        }
      ]
    },
    {
      id: 'seller-responsibilities',
      title: '8. Seller Responsibilities',
      content: `Sellers on MallKet must:`,
      subsections: [
        {
          title: 'Clear Policies',
          content: `Maintain clear and fair return policies for their products.`
        },
        {
          title: 'Timely Responses',
          content: `Respond to return requests within 48 hours.`
        },
        {
          title: 'Issue Resolution',
          content: `Work with buyers to resolve issues professionally.`
        },
        {
          title: 'Policy Compliance',
          content: `Adhere to MallKet\'s minimum return policy standards.`
        }
      ]
    },
    {
      id: 'mallket-guarantee',
      title: '9. MallKet Guarantee',
      content: `MallKet protects buyers through our guarantee program:`,
      subsections: [
        {
          title: 'Coverage',
          content: `Covers items that are significantly not as described, defective, or never received.`
        },
        {
          title: 'Claims Period',
          content: `File a claim within 30 days of delivery.`
        },
        {
          title: 'Investigation',
          content: `MallKet investigates claims and mediates between buyers and sellers.`
        },
        {
          title: 'Resolution',
          content: `If the claim is valid, MallKet ensures you receive a refund.`
        }
      ]
    },
    {
      id: 'contact',
      title: '10. Contact Information',
      content: `For return and refund inquiries:

Email: returns@mallket.com
Phone: +234 800 123 4567
Hours: Monday - Friday, 8:00 AM - 6:00 PM

Please have your order number ready when contacting us.`
    }
  ];

  const quickFaq = [
    {
      question: 'How long do refunds take?',
      answer: 'Refunds are processed within 5-7 business days after we receive your return.'
    },
    {
      question: 'Who pays for return shipping?',
      answer: 'Buyers pay return shipping unless the return is due to seller error or defective product.'
    },
    {
      question: 'Can I return a gift?',
      answer: 'Yes, gift returns are accepted within 30 days. The refund will be issued to the original purchaser.'
    },
    {
      question: 'What if my item arrives damaged?',
      answer: 'Contact the seller immediately and provide photos. The seller should arrange free return shipping.'
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
              Return & Refund Policy
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Last Updated: {lastUpdated}
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We want you to be completely satisfied with your purchase. Here's everything you need to know about returns and refunds.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">Policy Sections</h3>
              <nav className="space-y-2">
                {policySections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-sm text-green-600 hover:text-green-700 transition-colors py-1"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>

              {/* Quick FAQ */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Answers</h4>
                <div className="space-y-3">
                  {quickFaq.map((faq, index) => (
                    <div key={index}>
                      <p className="text-sm font-medium text-gray-900 mb-1">{faq.question}</p>
                      <p className="text-xs text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Policy Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Policy Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">MallKet Return & Refund Policy</h2>
                    <p className="text-gray-600 mt-1">Effective Date: {lastUpdated}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-1">
                    <span className="text-green-700 text-sm font-medium">Customer-First Policy</span>
                  </div>
                </div>
              </div>

              {/* Quick Summary */}
              <div className="bg-blue-50 border-b border-blue-200 p-6">
                <h3 className="font-semibold text-blue-900 mb-3">Policy Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl text-blue-600 mb-1">30</div>
                    <div className="text-blue-700">Days to Return</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-blue-600 mb-1">5-7</div>
                    <div className="text-blue-700">Days for Refund</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-blue-600 mb-1">✓</div>
                    <div className="text-blue-700">Money Back Guarantee</div>
                  </div>
                </div>
              </div>

              {/* Policy Sections */}
              <div className="p-6 space-y-12">
                {policySections.map((section) => (
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

              {/* Policy Footer */}
              <div className="border-t border-gray-200 bg-gray-50 p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Need help with a return? Our support team is here to assist you.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors inline-block"
                    >
                      Contact Returns Team
                    </Link>
                    <Link
                      href="/help/returns"
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors inline-block"
                    >
                      Return Help Center
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Return Process Visual */}
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Return Process Timeline</h3>
              <div className="flex flex-col md:flex-row justify-between items-center relative">
                {/* Timeline Line */}
                <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-gray-200"></div>
                
                {[
                  { step: 1, title: 'Contact Seller', days: '1-2 days' },
                  { step: 2, title: 'Get Approval', days: '1 day' },
                  { step: 3, title: 'Ship Item', days: '2-5 days' },
                  { step: 4, title: 'Inspection', days: '1-2 days' },
                  { step: 5, title: 'Refund', days: '5-7 days' }
                ].map((item, index) => (
                  <div key={index} className="text-center mb-6 md:mb-0 relative z-10">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">
                      {item.step}
                    </div>
                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.days}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Policies */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/shipping"
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow block"
                >
                  <div className="text-green-600 font-semibold mb-1">Shipping Information</div>
                  <p className="text-gray-600 text-sm">Delivery times and shipping options</p>
                </Link>
                <Link
                  href="/help/defective-items"
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow block"
                >
                  <div className="text-green-600 font-semibold mb-1">Defective Items Guide</div>
                  <p className="text-gray-600 text-sm">What to do with damaged products</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}