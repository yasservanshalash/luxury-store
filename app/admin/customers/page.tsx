'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  location: string
  totalOrders: number
  totalSpent: number
  lastOrderDate: string
  status: 'active' | 'inactive'
  joinedDate: string
  favoriteCategory: string
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      // Simulate API call - replace with real API
      setTimeout(() => {
        setCustomers([
          {
            id: '1',
            name: 'Lara Khalil',
            email: 'lara@example.com',
            phone: '+961 70 123 456',
            location: 'Beirut, Lebanon',
            totalOrders: 5,
            totalSpent: 2485.50,
            lastOrderDate: '2025-01-20T10:30:00Z',
            status: 'active',
            joinedDate: '2024-08-15T00:00:00Z',
            favoriteCategory: 'Tops'
          },
          {
            id: '2',
            name: 'Ahmad Mansour',
            email: 'ahmad@example.com',
            phone: '+961 71 987 654',
            location: 'Dubai, UAE',
            totalOrders: 3,
            totalSpent: 3750.00,
            lastOrderDate: '2025-01-20T09:15:00Z',
            status: 'active',
            joinedDate: '2024-10-22T00:00:00Z',
            favoriteCategory: 'Outerwear'
          },
          {
            id: '3',
            name: 'Nour Sabbagh',
            email: 'nour@example.com',
            phone: '+961 76 555 123',
            location: 'Beirut, Lebanon',
            totalOrders: 8,
            totalSpent: 4280.75,
            lastOrderDate: '2025-01-19T16:45:00Z',
            status: 'active',
            joinedDate: '2024-06-10T00:00:00Z',
            favoriteCategory: 'Dresses'
          },
          {
            id: '4',
            name: 'Rami Khoury',
            email: 'rami@example.com',
            phone: '+961 78 444 789',
            location: 'Jounieh, Lebanon',
            totalOrders: 2,
            totalSpent: 890.00,
            lastOrderDate: '2025-01-19T14:20:00Z',
            status: 'active',
            joinedDate: '2024-12-05T00:00:00Z',
            favoriteCategory: 'Accessories'
          },
          {
            id: '5',
            name: 'Maya Fares',
            email: 'maya@example.com',
            phone: '+961 79 333 567',
            location: 'Beirut, Lebanon',
            totalOrders: 1,
            totalSpent: 0, // Cancelled order
            lastOrderDate: '2025-01-18T12:10:00Z',
            status: 'inactive',
            joinedDate: '2025-01-15T00:00:00Z',
            favoriteCategory: 'Dresses'
          },
          {
            id: '6',
            name: 'Sarah Mitchell',
            email: 'sarah@example.com',
            phone: '+1 555 123 4567',
            location: 'New York, USA',
            totalOrders: 12,
            totalSpent: 8950.25,
            lastOrderDate: '2025-01-15T18:30:00Z',
            status: 'active',
            joinedDate: '2024-03-20T00:00:00Z',
            favoriteCategory: 'Outerwear'
          },
          {
            id: '7',
            name: 'Fatima Al-Rashid',
            email: 'fatima@example.com',
            phone: '+971 50 123 4567',
            location: 'Abu Dhabi, UAE',
            totalOrders: 6,
            totalSpent: 3420.00,
            lastOrderDate: '2025-01-12T11:20:00Z',
            status: 'active',
            joinedDate: '2024-07-08T00:00:00Z',
            favoriteCategory: 'Accessories'
          }
        ])
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching customers:', error)
      setLoading(false)
    }
  }

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus
    
    return matchesSearch && matchesStatus
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
      day: 'numeric'
    }).format(new Date(dateString))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTotalRevenue = () => {
    return filteredCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0)
  }

  const getAverageOrderValue = () => {
    const totalOrders = filteredCustomers.reduce((sum, customer) => sum + customer.totalOrders, 0)
    const totalRevenue = getTotalRevenue()
    return totalOrders > 0 ? totalRevenue / totalOrders : 0
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
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
            <h1 className="text-2xl font-thin tracking-wider text-gray-900">Customers</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage customer relationships and track engagement
            </p>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <div className="text-sm text-gray-600">
              Total Customers: <span className="font-semibold text-gray-900">{filteredCustomers.length}</span>
            </div>
            <div className="text-sm text-gray-600">
              Total Revenue: <span className="font-semibold text-gray-900">{formatPrice(getTotalRevenue())}</span>
            </div>
          </div>
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-semibold text-gray-900">
              {customers.filter(c => c.status === 'active').length}
            </div>
            <div className="text-sm text-gray-500">Active Customers</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-semibold text-green-600">
              {formatPrice(getTotalRevenue())}
            </div>
            <div className="text-sm text-gray-500">Total Revenue</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-semibold text-blue-600">
              {formatPrice(getAverageOrderValue())}
            </div>
            <div className="text-sm text-gray-500">Avg Order Value</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-semibold text-purple-600">
              {(customers.reduce((sum, c) => sum + c.totalOrders, 0) / customers.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-500">Avg Orders/Customer</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search customers
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Name, email, or location..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.favoriteCategory}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                      <div className="text-sm text-gray-500">{customer.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.totalOrders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatPrice(customer.totalSpent)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(customer.lastOrderDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(customer.joinedDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {/* View customer details */}}
                          className="text-gray-600 hover:text-gray-900"
                          title="View Details"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => {/* Send email */}}
                          className="text-gray-600 hover:text-gray-900"
                          title="Send Email"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => {/* View orders */}}
                          className="text-gray-600 hover:text-gray-900"
                          title="View Orders"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || selectedStatus !== 'all'
                  ? 'Try adjusting your search criteria.'
                  : 'Customers will appear here when they place orders.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
} 