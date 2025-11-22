'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SellerFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  
  // Business Information
  businessName: string;
  businessType: string;
  businessRegistration: string;
  taxId: string;
  yearEstablished: string;
  employeeCount: string;
  
  // Business Address
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  
  // Bank Information
  bankName: string;
  accountName: string;
  accountNumber: string;
  
  // Documents
  idDocument: File | null;
  businessDocument: File | null;
  bankStatement: File | null;
  
  // Agreements
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
  agreeToCommission: boolean;
}

export default function SellerRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SellerFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessType: '',
    businessRegistration: '',
    taxId: '',
    yearEstablished: '',
    employeeCount: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Nigeria',
    bankName: '',
    accountName: '',
    accountNumber: '',
    idDocument: null,
    businessDocument: null,
    bankStatement: null,
    agreeToTerms: false,
    agreeToPrivacy: false,
    agreeToCommission: false
  });

  const nigerianBanks = [
    'Access Bank', 'First Bank', 'Guaranty Trust Bank', 'Zenith Bank',
    'United Bank for Africa', 'First City Monument Bank', 'Stanbic IBTC Bank',
    'Union Bank', 'Sterling Bank', 'Fidelity Bank', 'Wema Bank', 'Polaris Bank'
  ];

  const businessTypes = [
    'Individual/Sole Proprietorship',
    'Partnership',
    'Limited Liability Company',
    'Corporation',
    'Cooperative',
    'Non-Profit Organization'
  ];

  const employeeRanges = [
    '1-5',
    '6-10',
    '11-25',
    '26-50',
    '51-100',
    '100+'
  ];

  const nigerianStates = [
    'Lagos', 'Abuja FCT', 'Rivers', 'Kano', 'Delta', 'Oyo', 'Kaduna', 'Anambra',
    'Imo', 'Ogun', 'Edo', 'Plateau', 'Enugu', 'Akwa Ibom', 'Osun', 'Katsina',
    'Bauchi', 'Cross River', 'Abia', 'Kebbi', 'Benue', 'Borno', 'Bayelsa',
    'Niger', 'Sokoto', 'Ekiti', 'Gombe', 'Bayelsa', 'Yobe', 'Taraba', 'Kwara',
    'Nasarawa', 'Ebonyi', 'Jigawa', 'Kogi', 'Zamfara', 'Adamawa'
  ];

  const steps = [
    { number: 1, title: 'Account Setup', description: 'Create your seller account' },
    { number: 2, title: 'Business Info', description: 'Tell us about your business' },
    { number: 3, title: 'Bank Details', description: 'Setup payments & payouts' },
    { number: 4, title: 'Documents', description: 'Upload required documents' },
    { number: 5, title: 'Review & Submit', description: 'Verify and submit application' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: keyof SellerFormData) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email && 
                 formData.phone && formData.password && formData.confirmPassword &&
                 formData.password === formData.confirmPassword);
      case 2:
        return !!(formData.businessName && formData.businessType && formData.street && 
                 formData.city && formData.state);
      case 3:
        return !!(formData.bankName && formData.accountName && formData.accountNumber);
      case 4:
        return !!(formData.idDocument && formData.businessDocument && formData.bankStatement);
      case 5:
        return !!(formData.agreeToTerms && formData.agreeToPrivacy && formData.agreeToCommission);
      default:
        return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would submit to your backend
    console.log('Seller application submitted:', formData);
    alert('Application submitted successfully! Our team will review it within 24-48 hours.');
  };

  const proceedToNextStep = () => {
    if (validateStep(currentStep) && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">MK</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">MallKet</span>
                <div className="text-xs text-gray-500 -mt-1">Seller Registration</div>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/become-seller" className="text-gray-600 hover:text-green-600 transition-colors">
                Back to Info
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-green-600 transition-colors">
                Already have account?
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-colors ${
                      currentStep >= step.number
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className="text-xs mt-2 font-medium text-gray-700 text-center">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-4 transition-colors ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Step 1: Account Setup */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Account Setup</h2>
                  <p className="text-gray-600">Create your seller account credentials</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+234 XXX XXX XXXX"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password *
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>

                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-red-600 text-sm">Passwords do not match</p>
                  )}
                </div>
              )}

              {/* Step 2: Business Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Business Information</h2>
                  <p className="text-gray-600">Tell us about your business</p>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Type *
                      </label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      >
                        <option value="">Select Business Type</option>
                        {businessTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year Established
                      </label>
                      <input
                        type="number"
                        name="yearEstablished"
                        value={formData.yearEstablished}
                        onChange={handleInputChange}
                        min="1900"
                        max="2024"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Registration Number
                      </label>
                      <input
                        type="text"
                        name="businessRegistration"
                        value={formData.businessRegistration}
                        onChange={handleInputChange}
                        placeholder="RC-1234567"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tax Identification Number
                      </label>
                      <input
                        type="text"
                        name="taxId"
                        value={formData.taxId}
                        onChange={handleInputChange}
                        placeholder="TIN-123456789"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Employees
                    </label>
                    <select
                      name="employeeCount"
                      value={formData.employeeCount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select Range</option>
                      {employeeRanges.map(range => (
                        <option key={range} value={range}>{range} employees</option>
                      ))}
                    </select>
                  </div>

                  {/* Business Address */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Address</h3>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Bank Details */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Bank Details</h2>
                  <p className="text-gray-600">Setup your account for payouts</p>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Name *
                    </label>
                    <select
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select Your Bank</option>
                      {nigerianBanks.map(bank => (
                        <option key={bank} value={bank}>{bank}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Name *
                    </label>
                    <input
                      type="text"
                      name="accountName"
                      value={formData.accountName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Number *
                    </label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      maxLength={10}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Secure Payments</h4>
                    <p className="text-blue-700 text-sm">
                      Your bank details are encrypted and secure. We use bank-level security to protect your information.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Document Upload */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Document Upload</h2>
                  <p className="text-gray-600">Upload required documents for verification</p>

                  <div className="space-y-6">
                    {/* ID Document */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Government Issued ID *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-600 mb-2">Upload your government issued ID</p>
                        <p className="text-sm text-gray-500 mb-4">National ID, Driver's License, or International Passport</p>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e, 'idDocument')}
                          className="hidden"
                          id="id-document"
                        />
                        <label
                          htmlFor="id-document"
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg cursor-pointer transition-colors inline-block"
                        >
                          Choose File
                        </label>
                        {formData.idDocument && (
                          <p className="text-green-600 text-sm mt-2">Selected: {formData.idDocument.name}</p>
                        )}
                      </div>
                    </div>

                    {/* Business Document */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Business Registration Document
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-600 mb-2">Upload business registration certificate</p>
                        <p className="text-sm text-gray-500 mb-4">CAC document or business registration proof</p>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e, 'businessDocument')}
                          className="hidden"
                          id="business-document"
                        />
                        <label
                          htmlFor="business-document"
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg cursor-pointer transition-colors inline-block"
                        >
                          Choose File
                        </label>
                        {formData.businessDocument && (
                          <p className="text-green-600 text-sm mt-2">Selected: {formData.businessDocument.name}</p>
                        )}
                      </div>
                    </div>

                    {/* Bank Statement */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Bank Statement *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-600 mb-2">Upload recent bank statement</p>
                        <p className="text-sm text-gray-500 mb-4">Last 3 months bank statement (PDF)</p>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileUpload(e, 'bankStatement')}
                          className="hidden"
                          id="bank-statement"
                        />
                        <label
                          htmlFor="bank-statement"
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg cursor-pointer transition-colors inline-block"
                        >
                          Choose File
                        </label>
                        {formData.bankStatement && (
                          <p className="text-green-600 text-sm mt-2">Selected: {formData.bankStatement.name}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Review & Submit */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Review & Submit</h2>
                  <p className="text-gray-600">Review your information and submit application</p>

                  {/* Application Summary */}
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold text-gray-900">Application Summary</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Personal Info:</strong>
                        <p>{formData.firstName} {formData.lastName}</p>
                        <p>{formData.email}</p>
                        <p>{formData.phone}</p>
                      </div>
                      <div>
                        <strong>Business Info:</strong>
                        <p>{formData.businessName}</p>
                        <p>{formData.businessType}</p>
                        <p>{formData.city}, {formData.state}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <strong>Bank Details:</strong>
                      <p>{formData.bankName}</p>
                      <p>{formData.accountName} - {formData.accountNumber}</p>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <strong>Documents Uploaded:</strong>
                      <div className="flex space-x-4 text-sm text-green-600">
                        {formData.idDocument && <span>✓ ID Document</span>}
                        {formData.businessDocument && <span>✓ Business Doc</span>}
                        {formData.bankStatement && <span>✓ Bank Statement</span>}
                      </div>
                    </div>
                  </div>

                  {/* Agreements */}
                  <div className="space-y-4">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-500 focus:ring-green-500 border-gray-300 rounded mt-1"
                        required
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the <Link href="/terms" className="text-green-600 hover:text-green-700">Terms of Service</Link> and <Link href="/seller-agreement" className="text-green-600 hover:text-green-700">Seller Agreement</Link>
                      </span>
                    </label>

                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="agreeToPrivacy"
                        checked={formData.agreeToPrivacy}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-500 focus:ring-green-500 border-gray-300 rounded mt-1"
                        required
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the <Link href="/privacy" className="text-green-600 hover:text-green-700">Privacy Policy</Link> and data processing
                      </span>
                    </label>

                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="agreeToCommission"
                        checked={formData.agreeToCommission}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-500 focus:ring-green-500 border-gray-300 rounded mt-1"
                        required
                      />
                      <span className="text-sm text-gray-700">
                        I understand and agree to the 5% commission fee on all sales
                      </span>
                    </label>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">Ready to Submit!</h4>
                    <p className="text-green-700 text-sm">
                      Your application will be reviewed within 24-48 hours. You'll receive an email notification once approved.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Previous
                  </button>
                ) : (
                  <Link
                    href="/become-seller"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Cancel
                  </Link>
                )}

                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={proceedToNextStep}
                    disabled={!validateStep(currentStep)}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!validateStep(currentStep)}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Sidebar - Help & Info */}
          <div className="space-y-6">
            {/* Application Tips */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Application Tips</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Ensure all documents are clear and readable</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Use your legal business name as registered</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Bank account name must match business name</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Review all information before submitting</span>
                </li>
              </ul>
            </div>

            {/* Support Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Need Help?</h3>
              <p className="text-blue-700 text-sm mb-4">
                Our seller support team is here to help you with the registration process.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> sellers@mallket.com</p>
                <p><strong>Phone:</strong> +234 800 123 4567</p>
                <p><strong>Hours:</strong> 8AM - 6PM, Mon - Fri</p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">What's Next?</h3>
              <div className="space-y-3 text-sm text-green-700">
                <p>1. Application Review (24-48 hours)</p>
                <p>2. Account Verification</p>
                <p>3. Seller Dashboard Access</p>
                <p>4. Start Adding Products!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}