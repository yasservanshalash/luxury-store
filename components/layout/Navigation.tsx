'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { useFavoritesStore } from '@/store/favoritesStore'
import { CartSidebar } from '@/components/cart/CartSidebar'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { items } = useCartStore()
  const { getFavoritesCount } = useFavoritesStore()
  const router = useRouter()
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const favoritesCount = getFavoritesCount()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setIsOpen(false) // Close mobile menu
      setSearchQuery('')
    }
  }

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isSearchOpen) {
      setSearchQuery('')
    }
  }

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
                          <span className="text-3xl font-thin tracking-wider text-gray-900">LINE BY GIZIA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <Link href="/products" className="text-gray-600 hover:text-gray-900 text-sm font-light tracking-wider uppercase transition-colors">
              SHOP
            </Link>
            <Link href="/products?category=women" className="text-gray-600 hover:text-gray-900 text-sm font-light tracking-wider uppercase transition-colors">
              WOMEN
            </Link>
            <Link href="/products?category=accessories" className="text-gray-600 hover:text-gray-900 text-sm font-light tracking-wider uppercase transition-colors">
              ACCESSORIES
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm font-light tracking-wider uppercase transition-colors">
              ABOUT
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm font-light tracking-wider uppercase transition-colors">
              CONTACT
            </Link>
            <Link href="/products?sale=true" className="text-gray-600 hover:text-gray-900 text-sm font-light tracking-wider uppercase transition-colors">
              SALE
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-6">
            {/* Search - Hidden on mobile */}
            <div className="relative hidden md:block">
              <button 
                onClick={handleSearchToggle}
                className="group p-2 text-gray-600 hover:text-gray-900 transition-all duration-300"
              >
                <svg className={`h-5 w-5 transition-all duration-300 ${isSearchOpen ? 'scale-110 text-gray-900' : 'group-hover:scale-110'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            {/* Favorites Icon */}
            <Link href="/favorites" className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-light">
                  {favoritesCount}
                </span>
              )}
            </Link>
            
            {/* Cart Icon */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-light">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100 py-6">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="px-3 pb-6 border-b border-gray-100">
                <form onSubmit={handleSearch} className="relative group">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search luxury pieces..."
                    className="w-full px-0 py-3 text-lg font-thin tracking-wider bg-transparent border-0 border-b border-gray-200 focus:outline-none focus:border-gray-900 transition-colors duration-300 placeholder-gray-400 text-gray-900"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-focus-within:w-full"></div>
                  <button
                    type="submit"
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-900 transition-colors duration-300"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
              </div>
              
              <Link href="/products" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-light tracking-wider uppercase transition-colors">
                SHOP
              </Link>
              <Link href="/products?category=women" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-light tracking-wider uppercase transition-colors">
                WOMEN
              </Link>
              <Link href="/products?category=accessories" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-light tracking-wider uppercase transition-colors">
                ACCESSORIES
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-light tracking-wider uppercase transition-colors">
                ABOUT
              </Link>
              <Link href="/products?sale=true" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-light tracking-wider uppercase transition-colors">
                SALE
              </Link>
            </div>
          </div>
        )}

        {/* Search Overlay */}
        <div className={`absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl z-50 transition-all duration-500 ease-in-out transform ${
          isSearchOpen 
            ? 'opacity-100 translate-y-0 visible' 
            : 'opacity-0 -translate-y-4 invisible'
        }`}>
          <div className="max-w-4xl mx-auto px-8 py-12">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for luxury pieces..."
                  className="w-full px-0 py-4 text-2xl font-thin tracking-wider bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:border-gray-900 transition-colors duration-300 placeholder-gray-400 text-gray-900"
                  autoFocus
                />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-focus-within:w-full"></div>
              </div>
              
              <div className="flex items-center justify-between mt-8">
                <div className="flex items-center space-x-8">
                  <button
                    type="submit"
                    className="group flex items-center space-x-2 text-gray-900 hover:text-gray-600 transition-colors duration-300"
                  >
                    <svg className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-sm font-light tracking-wider uppercase">Search</span>
                  </button>
                  
                  <div className="text-xs text-gray-400 font-light tracking-wide">
                    Press Enter to search
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={handleSearchToggle}
                  className="group p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 hover:bg-gray-50 rounded-full"
                >
                  <svg className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Popular Searches */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-light tracking-wider uppercase mb-4">Popular Searches</p>
                <div className="flex flex-wrap gap-3">
                  {['Silk Blouse', 'Cashmere Coat', 'Evening Wear', 'Lebanese Design', 'Luxury Accessories'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setSearchQuery(term)
                        router.push(`/products?search=${encodeURIComponent(term)}`)
                        setIsSearchOpen(false)
                        setIsOpen(false)
                        setSearchQuery('')
                      }}
                      className="px-4 py-2 text-sm font-light text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-300 tracking-wide"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  )
} 