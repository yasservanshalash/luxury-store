'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice, calculateLebaneseTax, calculateLebaneseshipping } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Lebanese governorates and cities
const LEBANON_LOCATIONS = {
  'Beirut': ['Beirut'],
  'Mount Lebanon': ['Baabda', 'Aley', 'Chouf', 'Keserwan', 'Metn', 'Jbeil'],
  'North Lebanon': ['Tripoli', 'Koura', 'Bcharre', 'Batroun', 'Minieh-Danniyeh', 'Akkar'],
  'South Lebanon': ['Sidon', 'Tyre', 'Nabatieh', 'Marjeyoun', 'Hasbaya', 'Bint Jbeil'],
  'Beqaa': ['Zahle', 'Baalbek', 'Hermel', 'West Beqaa', 'Rashaya'],
}

const OTHER_COUNTRIES = [
  { code: 'LB', name: 'Lebanon' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'JO', name: 'Jordan' },
  { code: 'SY', name: 'Syria' },
  { code: 'TR', name: 'Turkey' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'QA', name: 'Qatar' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'OM', name: 'Oman' },
  { code: 'EG', name: 'Egypt' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'AU', name: 'Australia' },
]

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  // Customer Information
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  
  // Shipping Address
  const [country, setCountry] = useState('LB')
  const [governorate, setGovernorate] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [apartment, setApartment] = useState('')
  const [postalCode, setPostalCode] = useState('')
  
  // Payment - Whish only
  const [paymentMethod] = useState('whish')
  
  // Calculations
  const subtotal = getTotalPrice()
  const shipping = calculateLebaneseshipping(subtotal, country, governorate)
  const tax = calculateLebaneseTax(subtotal, country)
  const total = subtotal + shipping + tax

  useEffect(() => {
    if (items.length === 0) {
      window.location.href = '/'
    }
  }, [items])

  // No additional setup needed for cash on delivery

  const validatePhone = (phone: string, country: string): boolean => {
    if (country === 'LB') {
      // Lebanese phone validation: +961 followed by 1-9 and 6 more digits
      const lebaneseRegex = /^(\+961|961|0)?[1-9]\d{6}$/
      return lebaneseRegex.test(phone.replace(/\s+/g, ''))
    }
    return phone.length >= 8 // Basic validation for other countries
  }

  const validateForm = (): boolean => {
    if (!email || !firstName || !lastName || !phone || !address) {
      alert('Please fill in all required fields')
      return false
    }

    if (!validatePhone(phone, country)) {
      alert('Please enter a valid phone number')
      return false
    }

    if (country === 'LB' && (!governorate || !city)) {
      alert('Please select governorate and city for Lebanese addresses')
      return false
    }

    return true
  }

  const handleCashOnDeliveryOrder = async () => {
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      // Create order with cash on delivery
      const orderData = {
        email,
        customerInfo: {
          firstName,
          lastName,
          phone,
        },
        shippingAddress: {
          firstName,
          lastName,
          address,
          apartment,
          city,
          governorate,
          postalCode,
          country,
          phone,
        },
        items: items.map(item => ({
          productId: item.id,
          variantId: item.selectedVariant?.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        shipping,
        tax,
        total,
        paymentMethod: 'cash_on_delivery',
      }

      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const { orderId, orderNumber } = await response.json()
      
      // Clear cart and redirect to success page
      clearCart()
      router.push(`/checkout/success?orderId=${orderId}&orderNumber=${orderNumber}`)
      
    } catch (error) {
      console.error('Order creation failed:', error)
      alert('Failed to create order. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCashOnDeliveryOrder()
  }

  // Simple checkout flow - no external payment processing needed for COD

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-thin tracking-wider text-gray-900 mb-8 text-center">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Customer Info */}
          <div className="space-y-8">
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={country === 'LB' ? '+961 70 123 456' : '+1 234 567 8900'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value)
                      setGovernorate('')
                      setCity('')
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    required
                  >
                    {OTHER_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {country === 'LB' && (
                  <>
                    <div>
                      <label htmlFor="governorate" className="block text-sm font-medium text-gray-700 mb-1">
                        Governorate *
                      </label>
                      <select
                        id="governorate"
                        value={governorate}
                        onChange={(e) => {
                          setGovernorate(e.target.value)
                          setCity('')
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                        required
                      >
                        <option value="">Select Governorate</option>
                        {Object.keys(LEBANON_LOCATIONS).map((gov) => (
                          <option key={gov} value={gov}>
                            {gov}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <select
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                        required
                        disabled={!governorate}
                      >
                        <option value="">Select City</option>
                        {governorate && LEBANON_LOCATIONS[governorate as keyof typeof LEBANON_LOCATIONS]?.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {country !== 'LB' && (
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method - Cash on Delivery */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
              
              <div className="p-4 border border-green-500 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Cash on Delivery</div>
                    <div className="text-sm text-gray-600">💵 Pay with cash when your order arrives</div>
                  </div>
                  <div className="ml-auto w-4 h-4 rounded-full border-2 border-green-500 bg-green-500">
                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  ℹ️ Please have the exact amount ready when your order arrives. Our delivery team will collect payment upon delivery.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={80}
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      {item.selectedVariant && (
                        <p className="text-xs text-gray-500">
                          {item.selectedVariant.name}: {item.selectedVariant.value}
                        </p>
                      )}
                      <p className="text-sm text-gray-900">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (VAT)</span>
                  <span className="text-gray-900">{formatPrice(tax)}</span>
                </div>
                
                <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-3">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Lebanese shipping info */}
              {country === 'LB' && (
                <div className="mt-4 p-3 bg-green-50 rounded-md">
                  <p className="text-sm text-green-800">
                    🇱🇧 Free shipping on orders over $150 within Lebanon
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 py-4 px-6 text-white bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Order...' : `Place Order - ${formatPrice(total)} (Cash on Delivery)`}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                By completing your order, you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}