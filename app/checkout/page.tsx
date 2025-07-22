'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice, calculateLebaneseTax, calculateLebaneseshipping } from '@/lib/utils'
import Image from 'next/image'

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
  
  // Payment
  const [paymentMethod, setPaymentMethod] = useState('stripe')
  
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

  const validatePhone = (phone: string, country: string): boolean => {
    if (country === 'LB') {
      // Lebanese phone validation: +961 followed by 1-9 and 6 more digits
      const lebaneseRegex = /^(\+961|961|0)?[1-9]\d{6}$/
      return lebaneseRegex.test(phone.replace(/\s+/g, ''))
    }
    return phone.length >= 8 // Basic validation for other countries
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate required fields
      if (!email || !firstName || !lastName || !phone || !address) {
        alert('Please fill in all required fields')
        setIsLoading(false)
        return
      }

      // Validate phone number
      if (!validatePhone(phone, country)) {
        alert('Please enter a valid phone number')
        setIsLoading(false)
        return
      }

      // For Lebanese addresses, require governorate and city
      if (country === 'LB' && (!governorate || !city)) {
        alert('Please select governorate and city for Lebanese addresses')
        setIsLoading(false)
        return
      }

      // Create checkout session with Stripe
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [item.image],
                metadata: {
                  variant: item.selectedVariant?.name || '',
                  value: item.selectedVariant?.value || '',
                }
              },
              unit_amount: Math.round(item.price * 100), // Convert to cents
            },
            quantity: item.quantity,
          })),
          customer_info: {
            email,
            name: `${firstName} ${lastName}`,
            phone,
          },
          shipping_address: {
            name: `${firstName} ${lastName}`,
            address: {
              line1: address,
              line2: apartment,
              city: country === 'LB' ? city : city,
              state: country === 'LB' ? governorate : '',
              postal_code: postalCode,
              country: country,
            }
          },
          shipping_amount: Math.round(shipping * 100),
          tax_amount: Math.round(tax * 100),
        }),
      })

      const data = await response.json()

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Failed to create checkout session')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const availableCities = country === 'LB' && governorate ? LEBANON_LOCATIONS[governorate as keyof typeof LEBANON_LOCATIONS] || [] : []

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some items to your cart to proceed with checkout</p>
          <a href="/products" className="inline-block bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors">
            Continue Shopping
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900">Checkout</h1>
          <p className="mt-2 text-gray-600">Complete your order below</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Customer Information & Shipping */}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                    placeholder={country === 'LB' ? '+961 1 234 567' : 'Your phone number'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    required
                  >
                    {OTHER_COUNTRIES.map(c => (
                      <option key={c.code} value={c.code}>{c.name}</option>
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        required
                      >
                        <option value="">Select Governorate</option>
                        {Object.keys(LEBANON_LOCATIONS).map(gov => (
                          <option key={gov} value={gov}>{gov}</option>
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        required
                        disabled={!governorate}
                      >
                        <option value="">Select City</option>
                        {availableCities.map(cityName => (
                          <option key={cityName} value={cityName}>{cityName}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {country !== 'LB' && (
                  <div>
                    <label htmlFor="cityInput" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="cityInput"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === 'stripe'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <span>Credit Card (Stripe)</span>
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Your payment information will be processed securely by Stripe.
              </p>
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
                className="w-full mt-6 bg-gray-900 text-white py-4 px-6 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : `Complete Order - ${formatPrice(total)}`}
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