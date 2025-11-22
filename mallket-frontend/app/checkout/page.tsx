'use client';
import { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  seller: string;
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: ''
  });

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const cartItems: CartItem[] = [
    { id: 1, name: 'Wireless Bluetooth Headphones Pro Max', price: 45999, image: '🎧', quantity: 1, seller: 'TechStore' },
    { id: 2, name: 'Smart Watch Series 7 GPS', price: 189000, image: '⌚', quantity: 2, seller: 'GadgetHub' }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryMethod === 'express' ? 5000 : deliveryMethod === 'standard' ? 2500 : 0;
  const total = subtotal + deliveryFee;

  const nigerianStates = [
    'Lagos', 'Abuja', 'Kano', 'Rivers', 'Oyo', 'Kaduna', 'Anambra', 'Delta', 'Enugu', 'Ogun'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };

  const proceedToNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const placeOrder = () => {
    alert('Order placed successfully! Order ID: #MK' + Math.floor(Math.random() * 100000));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <p className="text-sm text-gray-600 mt-1">Complete your purchase</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[
              { num: 1, label: 'Shipping' },
              { num: 2, label: 'Payment' },
              { num: 3, label: 'Review' }
            ].map((s, index) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                      step >= s.num
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step > s.num ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      s.num
                    )}
                  </div>
                  <span className="text-xs mt-2 font-medium text-gray-700">{s.label}</span>
                </div>
                {index < 2 && (
                  <div
                    className={`w-24 h-1 mx-4 transition-colors ${
                      step > s.num ? 'bg-orange-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        placeholder="+234"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <select
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      >
                        <option value="">Select State</option>
                        {nigerianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {/* Delivery Method */}
                  <div className="pt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Delivery Method
                    </label>
                    <div className="space-y-3">
                      {[
                        { id: 'pickup', name: 'Pickup Station', price: 0, time: '3-5 days' },
                        { id: 'standard', name: 'Standard Delivery', price: 2500, time: '2-5 days' },
                        { id: 'express', name: 'Express Delivery', price: 5000, time: '1-2 days' }
                      ].map(method => (
                        <label
                          key={method.id}
                          className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            deliveryMethod === method.id
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="delivery"
                              value={method.id}
                              checked={deliveryMethod === method.id}
                              onChange={(e) => setDeliveryMethod(e.target.value)}
                              className="w-4 h-4 text-orange-500"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{method.name}</p>
                              <p className="text-sm text-gray-600">{method.time}</p>
                            </div>
                          </div>
                          <span className="font-bold text-gray-900">
                            {method.price === 0 ? 'Free' : `₦${method.price.toLocaleString()}`}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={proceedToNextStep}
                  className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>

                <div className="space-y-4 mb-6">
                  {[
                    { id: 'card', name: 'Debit/Credit Card', icon: '💳' },
                    { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
                    { id: 'ussd', name: 'USSD', icon: '📱' },
                    { id: 'cash', name: 'Cash on Delivery', icon: '💵' }
                  ].map(method => (
                    <label
                      key={method.id}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-orange-500"
                      />
                      <span className="text-2xl mx-4">{method.icon}</span>
                      <span className="font-medium text-gray-900">{method.name}</span>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">Card Details</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardInfo.cardNumber}
                        onChange={handleCardInputChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={cardInfo.cardName}
                        onChange={handleCardInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={cardInfo.expiryDate}
                          onChange={handleCardInputChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardInfo.cvv}
                          onChange={handleCardInputChange}
                          placeholder="123"
                          maxLength={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={proceedToNextStep}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {step === 3 && (
              <div className="space-y-6">
                {/* Shipping Info Review */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
                    <button
                      onClick={() => setStep(1)}
                      className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="text-gray-700">
                    <p className="font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                    <p>{shippingInfo.address}</p>
                    <p>{shippingInfo.city}, {shippingInfo.state}</p>
                    <p className="mt-2">{shippingInfo.email}</p>
                    <p>{shippingInfo.phone}</p>
                  </div>
                </div>

                {/* Payment Method Review */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                    <button
                      onClick={() => setStep(2)}
                      className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-gray-700 capitalize">{paymentMethod.replace('-', ' ')}</p>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-3xl">
                          {item.image}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          <p className="font-bold text-gray-900">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={placeOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-colors text-lg"
                >
                  Place Order - ₦{total.toLocaleString()}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.name.substring(0, 30)}... x{item.quantity}
                    </span>
                    <span className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? 'Free' : `₦${deliveryFee.toLocaleString()}`}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>

              {/* Security */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure SSL Encrypted Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}