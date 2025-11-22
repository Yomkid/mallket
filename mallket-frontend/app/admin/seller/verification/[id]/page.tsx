'use client';

import { useState } from 'react';
import Link from 'next/link';

// This would normally get the seller ID from params
export default function SellerVerificationPage() {
  const [verificationStatus, setVerificationStatus] = useState('pending');
  
  const sellerData = {
    id: 'SR001',
    personalInfo: {
      fullName: 'Adebayo Johnson',
      email: 'adebayo@techstore.com',
      phone: '+234 812 345 6789',
      idType: 'National ID',
      idNumber: 'A123456789',
      idImage: '/api/placeholder/300/200',
      profileImage: '/api/placeholder/150/150'
    },
    businessInfo: {
      businessName: 'TechStore Nigeria',
      businessType: 'Retail',
      registrationNumber: 'RC-1234567',
      taxId: 'TIN-123456789',
      yearEstablished: '2018',
      employeeCount: '5-10',
      businessAddress: {
        street: '123 Computer Village',
        city: 'Ikeja',
        state: 'Lagos',
        postalCode: '100001',
        country: 'Nigeria'
      }
    },
    bankInfo: {
      bankName: 'Guaranty Trust Bank',
      accountName: 'TechStore Nigeria',
      accountNumber: '0123456789',
      bankStatement: '/api/placeholder/400/300'
    },
    documents: {
      businessRegistration: '/api/placeholder/400/300',
      taxCertificate: '/api/placeholder/400/300',
      utilityBill: '/api/placeholder/400/300'
    },
    submitted: '2024-01-15T10:30:00Z',
    status: 'pending',
    reviewNotes: ''
  };

  const handleStatusUpdate = (newStatus: string) => {
    setVerificationStatus(newStatus);
    // In real app, this would update via API
    console.log(`Seller status updated to: ${newStatus}`);
  };

  const handleApprove = () => {
    handleStatusUpdate('approved');
    alert('Seller approved successfully!');
  };

  const handleReject = () => {
    const reason = prompt('Please provide reason for rejection:');
    if (reason) {
      handleStatusUpdate('rejected');
      alert('Seller rejected with reason: ' + reason);
    }
  };

  const handleRequestMoreInfo = () => {
    const infoNeeded = prompt('What additional information is needed?');
    if (infoNeeded) {
      setVerificationStatus('more_info_needed');
      alert('Information request sent to seller.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">MK</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900">MallKet</span>
                  <div className="text-xs text-gray-500 -mt-1">Admin Panel</div>
                </div>
              </Link>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/admin/dashboard" className="hover:text-green-600">
                  Dashboard
                </Link>
                <span>/</span>
                <Link href="/admin/sellers" className="hover:text-green-600">
                  Sellers
                </Link>
                <span>/</span>
                <Link href="/admin/sellers/verification" className="hover:text-green-600">
                  Verification
                </Link>
                <span>/</span>
                <span className="text-gray-900">#{sellerData.id}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/admin/sellers/verification"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Back to Verifications
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Seller Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl text-green-600">🏪</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{sellerData.businessInfo.businessName}</h1>
                    <p className="text-gray-600">Application ID: {sellerData.id}</p>
                    <p className="text-sm text-gray-500">
                      Submitted on {new Date(sellerData.submitted).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      verificationStatus === 'approved' ? 'bg-green-100 text-green-800' :
                      verificationStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                      verificationStatus === 'more_info_needed' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {verificationStatus.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <p className="text-gray-900 font-medium">{sellerData.personalInfo.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <p className="text-gray-900">{sellerData.personalInfo.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <p className="text-gray-900">{sellerData.personalInfo.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ID Type</label>
                    <p className="text-gray-900">{sellerData.personalInfo.idType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ID Number</label>
                    <p className="text-gray-900">{sellerData.personalInfo.idNumber}</p>
                  </div>
                </div>

                {/* ID Document */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">ID Document</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <div className="w-32 h-20 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">ID Image</span>
                    </div>
                    <p className="text-sm text-gray-600">Government Issued ID</p>
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium mt-2">
                      View Full Document
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Business Information</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                    <p className="text-gray-900 font-medium">{sellerData.businessInfo.businessName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                    <p className="text-gray-900">{sellerData.businessInfo.businessType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                    <p className="text-gray-900">{sellerData.businessInfo.registrationNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID</label>
                    <p className="text-gray-900">{sellerData.businessInfo.taxId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year Established</label>
                    <p className="text-gray-900">{sellerData.businessInfo.yearEstablished}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employee Count</label>
                    <p className="text-gray-900">{sellerData.businessInfo.employeeCount}</p>
                  </div>
                </div>

                {/* Business Address */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900">{sellerData.businessInfo.businessAddress.street}</p>
                    <p className="text-gray-900">{sellerData.businessInfo.businessAddress.city}, {sellerData.businessInfo.businessAddress.state}</p>
                    <p className="text-gray-900">{sellerData.businessInfo.businessAddress.postalCode}, {sellerData.businessInfo.businessAddress.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Bank Information</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                    <p className="text-gray-900">{sellerData.bankInfo.bankName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                    <p className="text-gray-900">{sellerData.bankInfo.accountName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                    <p className="text-gray-900">{sellerData.bankInfo.accountNumber}</p>
                  </div>
                </div>

                {/* Bank Statement */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Bank Statement</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <div className="w-32 h-20 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Bank Statement</span>
                    </div>
                    <p className="text-sm text-gray-600">Last 3 months bank statement</p>
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium mt-2">
                      View Full Document
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Supporting Documents */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Supporting Documents</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <div className="w-20 h-16 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Business Reg</span>
                    </div>
                    <p className="text-sm text-gray-600">Business Registration</p>
                    <button className="text-green-600 hover:text-green-700 text-xs font-medium mt-1">
                      View Document
                    </button>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <div className="w-20 h-16 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Tax Cert</span>
                    </div>
                    <p className="text-sm text-gray-600">Tax Certificate</p>
                    <button className="text-green-600 hover:text-green-700 text-xs font-medium mt-1">
                      View Document
                    </button>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <div className="w-20 h-16 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Utility Bill</span>
                    </div>
                    <p className="text-sm text-gray-600">Utility Bill</p>
                    <button className="text-green-600 hover:text-green-700 text-xs font-medium mt-1">
                      View Document
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Action Panel */}
          <div className="space-y-6">
            {/* Verification Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Verification Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleApprove}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Approve Seller
                </button>
                <button
                  onClick={handleRequestMoreInfo}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Request More Info
                </button>
                <button
                  onClick={handleReject}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Reject Application
                </button>
              </div>
            </div>

            {/* Application Timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Application Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Application Submitted</p>
                    <p className="text-sm text-gray-600">{new Date(sellerData.submitted).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                    verificationStatus !== 'pending' ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {verificationStatus !== 'pending' && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Under Review</p>
                    <p className="text-sm text-gray-600">
                      {verificationStatus !== 'pending' ? 'Completed' : 'In progress'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Notes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Review Notes</h3>
              <textarea
                placeholder="Add internal notes about this verification..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors mt-3">
                Save Notes
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  📧 Send Email to Seller
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  📞 Contact Seller
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  🖨️ Print Application
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
                  🚫 Flag for Fraud
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}