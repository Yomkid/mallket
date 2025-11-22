'use client';

import Link from 'next/link';

export default function OrderSuccessPage() {
  const orderDetails = {
    id: 'MK283749',
    date: 'January 15, 2024',
    total: 459999,
    paymentMethod: 'Credit Card',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street, Victoria Island',
      city: 'Lagos',
      state: 'Lagos',
      postalCode: '101241',
      phone: '+234 812 345 6789'
    },
    estimatedDelivery: 'January 18-20, 2024',
    items: [
      {
        id: 1,
        name: 'iPhone 15 Pro Max',
        price: 449999,
        quantity: 1,
        image: '📱'
      },
      {
        id: 2,
        name: 'AirPods Pro',
        price: 10000,
        quantity: 1,
        image: '🎧'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">MK</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900">MallKet</span>
              <div className="text-xs text-gray-500 -mt-1">Multivendor Marketplace</div>
            </div>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your purchase, <strong>{orderDetails.shippingAddress.name}</strong>!
          </p>
          <p className="text-gray-600">
            Your order <strong>#{orderDetails.id}</strong> has been successfully placed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {orderDetails.items.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{item.image}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₦{(item.price / 100).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₦{(orderDetails.total / 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>₦2,500</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>₦0</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>₦{((orderDetails.total + 2500) / 100).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            {/* Shipping Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Shipping Information</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>{orderDetails.shippingAddress.name}</strong></p>
                <p>{orderDetails.shippingAddress.street}</p>
                <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}</p>
                <p>{orderDetails.shippingAddress.postalCode}</p>
                <p>{orderDetails.shippingAddress.phone}</p>
              </div>
            </div>

            {/* Order Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Order Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">#{orderDetails.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium">{orderDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">{orderDetails.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <span className="font-medium text-green-600">{orderDetails.estimatedDelivery}</span>
                </div>
              </div>
            </div>

            {/* Tracking */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-2">Track Your Order</h3>
              <p className="text-green-700 text-sm mb-4">
                You'll receive a confirmation email with tracking information shortly.
              </p>
              <Link
                href="/dashboard?tab=orders"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center block"
              >
                View Order Status
              </Link>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Confirmation</h3>
              <p className="text-gray-600 text-sm">
                Check your email for order confirmation and tracking details
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Shipping Updates</h3>
              <p className="text-gray-600 text-sm">
                We'll notify you when your order ships and provide tracking information
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Delivery</h3>
              <p className="text-gray-600 text-sm">
                Your order will arrive by {orderDetails.estimatedDelivery}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard?tab=orders"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              View Order Details
            </Link>
            <Link
              href="/shop"
              className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/support"
              className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Get Help
            </Link>
          </div>
        </div>

        {/* Support Info */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-2">
            Need help with your order?
          </p>
          <p className="text-gray-600">
            Contact our support team at <a href="mailto:support@mallket.com" className="text-green-600 hover:text-green-700">support@mallket.com</a> or call <a href="tel:+2348001234567" className="text-green-600 hover:text-green-700">+234 800 123 4567</a>
          </p>
        </div>
      </div>
    </div>
  );
}