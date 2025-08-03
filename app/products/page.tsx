'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useFavoritesStore } from '@/store/favoritesStore'
import { getPlaceholderImage } from '@/lib/utils'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  comparePrice?: number
  images: string[]
  category: {
    id: string
    name: string
    slug: string
  }
  averageRating?: number
  _count: {
    reviews: number
  }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('name')
  const { addToFavorites, removeFromFavorites, isFavorited } = useFavoritesStore()
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams()
        
        // Get URL parameters
        const categoryParam = searchParams.get('category')
        const searchParam = searchParams.get('search')
        const sortParam = searchParams.get('sort')
        const saleParam = searchParams.get('sale')
        
        if (categoryParam) {
          params.append('category', categoryParam)
          setCategory(categoryParam)
        }
        if (searchParam) params.append('search', searchParam)
        if (saleParam) params.append('sale', saleParam)
        if (sortParam) {
          params.append('sort', sortParam)
          setSort(sortParam)
        } else if (sort) {
          params.append('sort', sort)
        }
        
        const response = await fetch(`/api/products?${params}`)
        const data = await response.json()
        
        if (data.success) {
          setProducts(data.data)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [searchParams, sort])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  const searchQuery = searchParams.get('search')
  const saleFilter = searchParams.get('sale')

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12 text-center">
          {searchQuery ? (
            <>
              <h1 className="text-5xl font-thin tracking-wider text-gray-900 mb-4">SEARCH RESULTS</h1>
              <p className="text-lg font-light text-gray-600 tracking-wide">
                Found {products.length} results for "{searchQuery}"
              </p>
            </>
          ) : saleFilter === 'true' ? (
            <>
              <h1 className="text-5xl font-thin tracking-wider text-gray-900 mb-4">SALE</h1>
              <p className="text-lg font-light text-gray-600 tracking-wide">
                Luxury pieces at exceptional prices • {products.length} items on sale
              </p>
              <div className="mt-6 inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full">
                <span className="text-red-600 text-sm font-medium tracking-wide">Limited Time Offers</span>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-5xl font-thin tracking-wider text-gray-900 mb-4">OUR COLLECTION</h1>
              <p className="text-lg font-light text-gray-600 tracking-wide">Discover timeless elegance crafted in Beirut</p>
            </>
          )}
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-8">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-b border-gray-300 bg-transparent px-4 py-2 text-sm font-light tracking-wide uppercase focus:outline-none focus:border-gray-900"
          >
            <option value="">ALL CATEGORIES</option>
            <option value="women">WOMEN</option>
            <option value="accessories">ACCESSORIES</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border-b border-gray-300 bg-transparent px-4 py-2 text-sm font-light tracking-wide uppercase focus:outline-none focus:border-gray-900"
          >
            <option value="name">SORT BY NAME</option>
            <option value="price-asc">PRICE: LOW TO HIGH</option>
            <option value="price-desc">PRICE: HIGH TO LOW</option>
            <option value="newest">NEWEST</option>
          </select>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            {searchQuery ? (
              <div>
                <p className="text-gray-500 font-light tracking-wide mb-4">
                  No products found for "{searchQuery}".
                </p>
                <p className="text-gray-400 text-sm">
                  Try searching for different keywords or browse our full collection.
                </p>
                <Link 
                  href="/products" 
                  className="inline-block mt-4 text-gray-900 underline hover:no-underline"
                >
                  View All Products
                </Link>
              </div>
            ) : (
              <p className="text-gray-500 font-light tracking-wide">No products found in our collection.</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product) => (
              <div key={product.id} className="group">
                <Link href={`/products/${product.slug}`}>
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.images[0] || getPlaceholderImage(400, 600)}
                      alt={product.name}
                      width={400}
                      height={600}
                      className="object-cover w-full h-96 group-hover:scale-105 transition-transform duration-700"
                    />
                    {product.comparePrice && (
                      <div className="absolute top-4 left-4 bg-gray-900 text-white px-3 py-1 text-xs font-light tracking-wider uppercase">
                        SALE
                      </div>
                    )}
                    
                    {/* Favorite Button */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        const favoriteItem = {
                          id: product.id,
                          name: product.name,
                          slug: product.slug,
                          price: product.price,
                          comparePrice: product.comparePrice,
                          image: product.images[0] || getPlaceholderImage(400, 600),
                          category: {
                            name: product.category.name,
                            slug: product.category.slug
                          }
                        }
                        
                        if (isFavorited(product.id)) {
                          removeFromFavorites(product.id)
                        } else {
                          addToFavorites(favoriteItem)
                        }
                      }}
                      className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center transition-all duration-300 ${
                        isFavorited(product.id) 
                          ? 'text-gray-900 opacity-100' 
                          : 'text-gray-600 hover:text-gray-900 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <svg 
                        className="w-5 h-5" 
                        fill={isFavorited(product.id) ? "currentColor" : "none"} 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </Link>
                
                <div className="pt-4 text-center">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="text-lg font-light tracking-wide text-gray-900 hover:text-gray-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-sm text-gray-500 font-light tracking-wide uppercase mt-1">{product.category.name}</p>
                  
                  <div className="flex items-center justify-center mt-3 space-x-2">
                    <span className="text-lg font-light text-gray-900">
                      ${product.price}
                    </span>
                    {product.comparePrice && (
                      <span className="text-sm text-gray-500 line-through font-light">
                        ${product.comparePrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 