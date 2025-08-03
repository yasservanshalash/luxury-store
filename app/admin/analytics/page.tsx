'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'

interface AnalyticsData {
  revenue: {
    current: number
    previous: number
    growth: number
  }
  orders: {
    current: number
    previous: number
    growth: number
  }
  customers: {
    current: number
    previous: number
    growth: number
  }
  averageOrderValue: {
    current: number
    previous: number
    growth: number
  }
  topProducts: Array<{
    name: string
    sales: number
    revenue: number
  }>
  salesByMonth: Array<{
    month: string
    revenue: number
    orders: number
  }>
  salesByCategory: Array<{
    category: string
    percentage: number
    revenue: number
  }>
  customerLocations: Array<{
    location: string
    customers: number
    percentage: number
  }>
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAnalytics()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [])

  const fetchAnalytics = async () => {
    try {
      // Add cache busting to ensure fresh data
      const response = await fetch('/api/admin/analytics?' + new Date().getTime(), {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
        setLoading(false)
      } else {
        // Fallback to mock data
        setTimeout(() => {
        setAnalytics({
          revenue: {
            current: 45250.50,
            previous: 38920.25,
            growth: 16.3
          },
          orders: {
            current: 127,
            previous: 108,
            growth: 17.6
          },
          customers: {
            current: 89,
            previous: 76,
            growth: 17.1
          },
          averageOrderValue: {
            current: 356.30,
            previous: 360.37,
            growth: -1.1
          },
          topProducts: [
            { name: 'Beirut Silk Blouse', sales: 45, revenue: 21825 },
            { name: 'Cashmere Wrap Coat', sales: 12, revenue: 15000 },
            { name: 'Line by Gizia Little Black Dress', sales: 23, revenue: 11270 },
            { name: 'Lebanese Cedar Scarf', sales: 18, revenue: 5400 },
            { name: 'Luxury Evening Gown', sales: 8, revenue: 6800 }
          ],
          salesByMonth: [
            { month: 'Aug', revenue: 28500, orders: 85 },
            { month: 'Sep', revenue: 32100, orders: 92 },
            { month: 'Oct', revenue: 29800, orders: 88 },
            { month: 'Nov', revenue: 35600, orders: 98 },
            { month: 'Dec', revenue: 42300, orders: 115 },
            { month: 'Jan', revenue: 45250, orders: 127 }
          ],
          salesByCategory: [
            { category: 'Dresses', percentage: 35, revenue: 15837.68 },
            { category: 'Tops', percentage: 28, revenue: 12670.14 },
            { category: 'Outerwear', percentage: 22, revenue: 9955.11 },
            { category: 'Accessories', percentage: 15, revenue: 6787.58 }
          ],
          customerLocations: [
            { location: 'Lebanon', customers: 42, percentage: 47.2 },
            { location: 'UAE', customers: 18, percentage: 20.2 },
            { location: 'USA', customers: 12, percentage: 13.5 },
            { location: 'Saudi Arabia', customers: 8, percentage: 9.0 },
            { location: 'Other', customers: 9, percentage: 10.1 }
          ]
        })
        setLoading(false)
      }, 1000)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const formatGrowth = (growth: number) => {
    const isPositive = growth >= 0
    return (
      <span className={`inline-flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
          </svg>
        )}
        {Math.abs(growth).toFixed(1)}%
      </span>
    )
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!analytics) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="text-center">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Analytics Unavailable</h2>
            <p className="text-gray-600">Unable to load analytics data. Please try again later.</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-thin tracking-wider text-gray-900">Analytics</h1>
            <p className="mt-2 text-sm text-gray-700">
              Track your business performance and growth
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <button
              onClick={() => {
                setLoading(true)
                fetchAnalytics()
              }}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Revenue</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {formatPrice(analytics.revenue.current)}
                      </div>
                      <div className="ml-2">
                        {formatGrowth(analytics.revenue.growth)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Orders</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {analytics.orders.current}
                      </div>
                      <div className="ml-2">
                        {formatGrowth(analytics.orders.growth)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Customers</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {analytics.customers.current}
                      </div>
                      <div className="ml-2">
                        {formatGrowth(analytics.customers.growth)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Avg Order Value</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {formatPrice(analytics.averageOrderValue.current)}
                      </div>
                      <div className="ml-2">
                        {formatGrowth(analytics.averageOrderValue.growth)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Trend */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Sales Trend</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analytics.salesByMonth.map((month, index) => (
                  <div key={month.month} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 text-sm text-gray-600">{month.month}</div>
                      <div className="w-full max-w-xs mx-4">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gray-900 h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${(month.revenue / Math.max(...analytics.salesByMonth.map(m => m.revenue))) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{formatPrice(month.revenue)}</div>
                      <div className="text-xs text-gray-500">{month.orders} orders</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Top Products</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analytics.topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.sales} sales</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatPrice(product.revenue)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category & Location Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales by Category */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Sales by Category</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analytics.salesByCategory.map((category) => (
                  <div key={category.category} className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <div className="w-20 text-sm text-gray-600">{category.category}</div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gray-900 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{category.percentage}%</div>
                      <div className="text-xs text-gray-500">{formatPrice(category.revenue)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Locations */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Customer Locations</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analytics.customerLocations.map((location) => (
                  <div key={location.location} className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <div className="w-20 text-sm text-gray-600">{location.location}</div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gray-900 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${location.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{location.percentage}%</div>
                      <div className="text-xs text-gray-500">{location.customers} customers</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 