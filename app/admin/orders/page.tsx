'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'

interface Order {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    phone: string
  }
  items: {
    name: string
    quantity: number
    price: number
  }[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  shippingAddress: {
    name: string
    address: string
    city: string
    country: string
  }
  createdAt: string
  updatedAt: string
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      // Simulate API call - replace with real API
      setTimeout(() => {
        setOrders([
          {
            id: '1',
            orderNumber: 'ORD-001',
            customer: {
              name: 'Lara Khalil',
              email: 'lara@example.com',
              phone: '+961 70 123 456'
            },
            items: [
              { name: 'Beirut Silk Blouse', quantity: 1, price: 485 },
              { name: 'Lebanese Cedar Scarf', quantity: 1, price: 300 }
            ],
            subtotal: 785,
            shipping: 0,
            tax: 62.8,
            total: 847.8,
            status: 'shipped',
            paymentStatus: 'paid',
            shippingAddress: {
              name: 'Lara Khalil',
              address: 'Hamra Street, Beirut',
              city: 'Beirut',
              country: 'Lebanon'
            },
            createdAt: '2025-01-20T10:30:00Z',
            updatedAt: '2025-01-20T14:15:00Z'
          },
          {
            id: '2',
            orderNumber: 'ORD-002',
            customer: {
              name: 'Ahmad Mansour',
              email: 'ahmad@example.com',
              phone: '+961 71 987 654'
            },
            items: [
              { name: 'Cashmere Wrap Coat', quantity: 1, price: 1250 }
            ],
            subtotal: 1250,
            shipping: 25,
            tax: 100,
            total: 1375,
            status: 'processing',
            paymentStatus: 'paid',
            shippingAddress: {
              name: 'Ahmad Mansour',
              address: 'Achrafieh, Beirut',
              city: 'Beirut',
              country: 'Lebanon'
            },
            createdAt: '2025-01-20T09:15:00Z',
            updatedAt: '2025-01-20T11:30:00Z'
          },
          {
            id: '3',
            orderNumber: 'ORD-003',
            customer: {
              name: 'Nour Sabbagh',
              email: 'nour@example.com',
              phone: '+961 76 555 123'
            },
            items: [
              { name: 'Line by Gizia Little Black Dress', quantity: 1, price: 490 },
              { name: 'Lebanese Cedar Scarf', quantity: 2, price: 300 }
            ],
            subtotal: 1090,
            shipping: 0,
            tax: 87.2,
            total: 1177.2,
            status: 'delivered',
            paymentStatus: 'paid',
            shippingAddress: {
              name: 'Nour Sabbagh',
              address: 'Saifi Village, Downtown',
              city: 'Beirut',
              country: 'Lebanon'
            },
            createdAt: '2025-01-19T16:45:00Z',
            updatedAt: '2025-01-20T08:00:00Z'
          },
          {
            id: '4',
            orderNumber: 'ORD-004',
            customer: {
              name: 'Rami Khoury',
              email: 'rami@example.com',
              phone: '+961 78 444 789'
            },
            items: [
              { name: 'Lebanese Cedar Scarf', quantity: 1, price: 300 }
            ],
            subtotal: 300,
            shipping: 15,
            tax: 24,
            total: 339,
            status: 'pending',
            paymentStatus: 'pending',
            shippingAddress: {
              name: 'Rami Khoury',
              address: 'Jounieh Marina',
              city: 'Jounieh',
              country: 'Lebanon'
            },
            createdAt: '2025-01-19T14:20:00Z',
            updatedAt: '2025-01-19T14:20:00Z'
          },
          {
            id: '5',
            orderNumber: 'ORD-005',
            customer: {
              name: 'Maya Fares',
              email: 'maya@example.com',
              phone: '+961 79 333 567'
            },
            items: [
              { name: 'Luxury Evening Gown', quantity: 1, price: 850 }
            ],
            subtotal: 850,
            shipping: 0,
            tax: 68,
            total: 918,
            status: 'cancelled',
            paymentStatus: 'refunded',
            shippingAddress: {
              name: 'Maya Fares',
              address: 'Verdun, Beirut',
              city: 'Beirut',
              country: 'Lebanon'
            },
            createdAt: '2025-01-18T12:10:00Z',
            updatedAt: '2025-01-19T09:30:00Z'
          }
        ])
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching orders:', error)
      setLoading(false)
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    const matchesPaymentStatus = selectedPaymentStatus === 'all' || order.paymentStatus === selectedPaymentStatus
    
    return matchesSearch && matchesStatus && matchesPaymentStatus
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'paid': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'refunded': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    // Update order status - replace with real API call
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus as any, updatedAt: new Date().toISOString() } : order
    ))
  }

  const getTotalRevenue = () => {
    return filteredOrders
      .filter(order => order.paymentStatus === 'paid')
      .reduce((sum, order) => sum + order.total, 0)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
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
            <h1 className="text-2xl font-thin tracking-wider text-gray-900">Orders</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage customer orders and track shipments
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="text-sm text-gray-600">
              Total Revenue: <span className="font-semibold text-gray-900">{formatPrice(getTotalRevenue())}</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search orders
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Order number, customer name or email..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Order Status
                </label>
                <select
                  id="status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Status
                </label>
                <select
                  id="paymentStatus"
                  value={selectedPaymentStatus}
                  onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <option value="all">All Payments</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                      <div className="text-sm text-gray-500">{order.items.length} item(s)</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                      <div className="text-sm text-gray-500">{order.customer.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {order.items.map((item, index) => (
                          <div key={index} className="mb-1">
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        className={`text-xs font-medium rounded-full px-2.5 py-0.5 border-0 ${getStatusColor(order.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {/* Open order details modal */}}
                          className="text-gray-600 hover:text-gray-900"
                          title="View Details"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => {/* Print invoice */}}
                          className="text-gray-600 hover:text-gray-900"
                          title="Print Invoice"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || selectedStatus !== 'all' || selectedPaymentStatus !== 'all'
                  ? 'Try adjusting your search criteria.'
                  : 'Orders will appear here when customers place them.'
                }
              </p>
            </div>
          )}
        </div>

        {/* Order Summary Stats */}
        {filteredOrders.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-semibold text-gray-900">
                {filteredOrders.length}
              </div>
              <div className="text-sm text-gray-500">Total Orders</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-semibold text-green-600">
                {filteredOrders.filter(o => o.paymentStatus === 'paid').length}
              </div>
              <div className="text-sm text-gray-500">Paid Orders</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-semibold text-blue-600">
                {filteredOrders.filter(o => o.status === 'shipped').length}
              </div>
              <div className="text-sm text-gray-500">Shipped Orders</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-semibold text-gray-900">
                {formatPrice(getTotalRevenue())}
              </div>
              <div className="text-sm text-gray-500">Total Revenue</div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
} 