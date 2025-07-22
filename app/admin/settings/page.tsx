'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'

interface Settings {
  store: {
    name: string
    description: string
    email: string
    phone: string
    address: string
    currency: string
    timezone: string
  }
  shipping: {
    freeShippingThreshold: number
    domesticShipping: number
    internationalShipping: number
    processing: number
  }
  tax: {
    enabled: boolean
    rate: number
    includedInPrices: boolean
  }
  notifications: {
    orderConfirmation: boolean
    stockAlerts: boolean
    customerRegistration: boolean
    dailyReports: boolean
  }
  appearance: {
    theme: string
    logo: string
    primaryColor: string
    accentColor: string
  }
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    store: {
      name: 'Line by Gizia',
      description: 'Luxury fashion brand inspired by Lebanese heritage',
      email: 'info@linebygizia.com',
      phone: '+961 1 234 567',
      address: 'Beirut, Lebanon',
      currency: 'USD',
      timezone: 'Asia/Beirut'
    },
    shipping: {
      freeShippingThreshold: 150,
      domesticShipping: 15,
      internationalShipping: 35,
      processing: 2
    },
    tax: {
      enabled: true,
      rate: 8.0,
      includedInPrices: false
    },
    notifications: {
      orderConfirmation: true,
      stockAlerts: true,
      customerRegistration: true,
      dailyReports: false
    },
    appearance: {
      theme: 'luxury',
      logo: '/logo.png',
      primaryColor: '#1F2937',
      accentColor: '#6B7280'
    }
  })

  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('store')

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate API call - replace with real API
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateSetting = (category: keyof Settings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }))
  }

  const tabs = [
    { id: 'store', name: 'Store Info', icon: 'store' },
    { id: 'shipping', name: 'Shipping', icon: 'truck' },
    { id: 'tax', name: 'Tax Settings', icon: 'calculator' },
    { id: 'notifications', name: 'Notifications', icon: 'bell' },
    { id: 'appearance', name: 'Appearance', icon: 'color-swatch' }
  ]

  const getTabIcon = (iconName: string) => {
    const icons: { [key: string]: JSX.Element } = {
      store: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      truck: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      calculator: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      bell: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      'color-swatch': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2a4 4 0 004-4V5a2 2 0 00-2-2H7z" />
        </svg>
      )
    }
    return icons[iconName] || icons.store
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-thin tracking-wider text-gray-900">Settings</h1>
            <p className="mt-2 text-sm text-gray-700">
              Configure your store settings and preferences
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={handleSave}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {saved && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="ml-3">
                <p className="text-sm text-green-700">Settings have been saved successfully!</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow rounded-lg">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {getTabIcon(tab.icon)}
                  <span className="ml-2">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Store Info Tab */}
            {activeTab === 'store' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Store Name
                    </label>
                    <input
                      type="text"
                      value={settings.store.name}
                      onChange={(e) => updateSetting('store', 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={settings.store.email}
                      onChange={(e) => updateSetting('store', 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={settings.store.phone}
                      onChange={(e) => updateSetting('store', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Currency
                    </label>
                    <select
                      value={settings.store.currency}
                      onChange={(e) => updateSetting('store', 'currency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="LBP">LBP - Lebanese Pound</option>
                      <option value="AED">AED - UAE Dirham</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Store Description
                  </label>
                  <textarea
                    rows={3}
                    value={settings.store.description}
                    onChange={(e) => updateSetting('store', 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={settings.store.address}
                    onChange={(e) => updateSetting('store', 'address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>
            )}

            {/* Shipping Tab */}
            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Free Shipping Threshold ($)
                    </label>
                    <input
                      type="number"
                      value={settings.shipping.freeShippingThreshold}
                      onChange={(e) => updateSetting('shipping', 'freeShippingThreshold', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Domestic Shipping ($)
                    </label>
                    <input
                      type="number"
                      value={settings.shipping.domesticShipping}
                      onChange={(e) => updateSetting('shipping', 'domesticShipping', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      International Shipping ($)
                    </label>
                    <input
                      type="number"
                      value={settings.shipping.internationalShipping}
                      onChange={(e) => updateSetting('shipping', 'internationalShipping', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Processing Time (days)
                    </label>
                    <input
                      type="number"
                      value={settings.shipping.processing}
                      onChange={(e) => updateSetting('shipping', 'processing', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tax Tab */}
            {activeTab === 'tax' && (
              <div className="space-y-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.tax.enabled}
                    onChange={(e) => updateSetting('tax', 'enabled', e.target.checked)}
                    className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Enable tax calculation
                  </label>
                </div>
                {settings.tax.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={settings.tax.rate}
                        onChange={(e) => updateSetting('tax', 'rate', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                    <div className="flex items-center pt-6">
                      <input
                        type="checkbox"
                        checked={settings.tax.includedInPrices}
                        onChange={(e) => updateSetting('tax', 'includedInPrices', e.target.checked)}
                        className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        Tax included in product prices
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900">Order Confirmation</label>
                      <p className="text-sm text-gray-500">Send confirmation emails to customers</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.orderConfirmation}
                      onChange={(e) => updateSetting('notifications', 'orderConfirmation', e.target.checked)}
                      className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900">Stock Alerts</label>
                      <p className="text-sm text-gray-500">Get notified when products are low in stock</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.stockAlerts}
                      onChange={(e) => updateSetting('notifications', 'stockAlerts', e.target.checked)}
                      className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900">Customer Registration</label>
                      <p className="text-sm text-gray-500">Get notified when new customers register</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.customerRegistration}
                      onChange={(e) => updateSetting('notifications', 'customerRegistration', e.target.checked)}
                      className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900">Daily Reports</label>
                      <p className="text-sm text-gray-500">Receive daily sales and analytics reports</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.dailyReports}
                      onChange={(e) => updateSetting('notifications', 'dailyReports', e.target.checked)}
                      className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Theme
                    </label>
                    <select
                      value={settings.appearance.theme}
                      onChange={(e) => updateSetting('appearance', 'theme', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    >
                      <option value="luxury">Luxury</option>
                      <option value="minimal">Minimal</option>
                      <option value="modern">Modern</option>
                      <option value="classic">Classic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Color
                    </label>
                    <input
                      type="color"
                      value={settings.appearance.primaryColor}
                      onChange={(e) => updateSetting('appearance', 'primaryColor', e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 