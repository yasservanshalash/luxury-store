'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const { clearCart } = useCartStore()
  const orderId = searchParams.get('orderId')
  const orderNumber = searchParams.get('orderNumber')

  useEffect(() => {
    // Clear cart when page loads (already done in checkout)
    clearCart()
  }, [clearCart])



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8">
            <svg
              className="h-12 w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Thank You for Your Order!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your order has been placed successfully! You will receive a confirmation email shortly with your order details. Payment will be collected when your order is delivered.
          </p>

          {/* Order Info */}
          {orderNumber && (
            <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h2>
              <div className="text-sm text-gray-600">
                <p className="mb-2">
                  <span className="font-medium">Order Number:</span> {orderNumber}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Payment Method:</span> Cash on Delivery
                </p>
                <p className="mb-2">
                  <span className="font-medium">Status:</span> Pending
                </p>
                <p>
                  <span className="font-medium">Estimated Delivery:</span> 3-7 business days
                </p>
              </div>
            </div>
          )}

          {/* What's Next */}
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h2>
            <div className="text-left space-y-3 text-gray-600">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium text-blue-600">1</span>
                </div>
                <p>We'll send you a confirmation email with your order details</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium text-blue-600">2</span>
                </div>
                <p>Your order will be processed and prepared for shipping</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium text-blue-600">3</span>
                </div>
                <p>Your order will be dispatched for delivery</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium text-blue-600">4</span>
                </div>
                <p>Pay with cash when your order arrives at your doorstep</p>
              </div>
            </div>
          </div>

          {/* Lebanese Shipping Info */}
          <div className="bg-green-50 rounded-lg p-4 max-w-2xl mx-auto mb-8">
            <div className="flex items-center space-x-2 text-green-800">
              <span>🇱🇧</span>
              <p className="font-medium">Lebanese customers enjoy free shipping on orders over $150</p>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Your order will be delivered within Lebanon in 3-5 business days
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-block bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
            
            <Link
              href="/"
              className="inline-block border border-gray-300 text-gray-700 px-8 py-3 hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>

          {/* Support Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              Need help? Contact our customer support:
            </p>
            <div className="text-sm text-gray-500 space-y-1">
                                <p>Email: support@linebygizia.com</p>
              <p>Phone: +961 1 234 567</p>
              <p>WhatsApp: +961 70 123 456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 