'use client'

import { useFavoritesStore } from '@/store/favoritesStore'
import { useCartStore } from '@/store/cartStore'
import Image from 'next/image'
import Link from 'next/link'

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, clearFavorites } = useFavoritesStore()
  const { addItem } = useCartStore()

  const handleAddToCart = (favorite: any) => {
    addItem({
      id: favorite.id,
      name: favorite.name,
      slug: favorite.slug,
      price: favorite.price,
      image: favorite.image,
      quantity: 1
    })
  }

  const handleRemoveFromFavorites = (id: string) => {
    removeFromFavorites(id)
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-8 py-24">
          <div className="text-center">
            <div className="mb-8">
              <svg className="w-24 h-24 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-thin tracking-wider text-gray-900 mb-6">YOUR FAVORITES</h1>
            <p className="text-lg font-light text-gray-600 tracking-wide mb-8">
              You haven't saved any favorites yet
            </p>
            <p className="text-gray-500 font-light tracking-wide mb-8">
              Discover pieces you love and save them for later
            </p>
            <Link 
              href="/products" 
              className="inline-block bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors duration-300 text-sm font-light tracking-wider uppercase"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-thin tracking-wider text-gray-900 mb-4">YOUR FAVORITES</h1>
          <p className="text-lg font-light text-gray-600 tracking-wide">
            {favorites.length} {favorites.length === 1 ? 'piece' : 'pieces'} saved for you
          </p>
        </div>

        {/* Actions */}
        <div className="mb-8 flex justify-between items-center">
          <div className="text-sm text-gray-500 font-light tracking-wide">
            Showing {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
          </div>
          {favorites.length > 0 && (
            <button
              onClick={clearFavorites}
              className="text-sm text-gray-600 hover:text-gray-900 font-light tracking-wide uppercase border-b border-gray-300 hover:border-gray-900 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="group">
              <Link href={`/products/${favorite.slug}`}>
                <div className="relative overflow-hidden mb-4">
                  <Image
                    src={favorite.image}
                    alt={favorite.name}
                    width={400}
                    height={600}
                    className="object-cover w-full h-96 group-hover:scale-105 transition-transform duration-700"
                  />
                  {favorite.comparePrice && (
                    <div className="absolute top-4 left-4 bg-gray-900 text-white px-3 py-1 text-xs font-light tracking-wider uppercase">
                      SALE
                    </div>
                  )}
                  
                  {/* Remove from Favorites */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleRemoveFromFavorites(favorite.id)
                    }}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-900 hover:text-gray-700 transition-colors opacity-0 group-hover:opacity-100 bg-white/80 rounded-full"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </Link>
              
              <div className="text-center">
                <Link href={`/products/${favorite.slug}`}>
                  <h3 className="text-lg font-light tracking-wide text-gray-900 hover:text-gray-600 transition-colors mb-2">
                    {favorite.name}
                  </h3>
                </Link>
                
                <p className="text-sm text-gray-500 font-light tracking-wide uppercase mb-3">
                  {favorite.category.name}
                </p>
                
                <div className="flex items-center justify-center mb-4 space-x-2">
                  <span className="text-lg font-light text-gray-900">
                    ${favorite.price}
                  </span>
                  {favorite.comparePrice && (
                    <span className="text-sm text-gray-500 line-through font-light">
                      ${favorite.comparePrice}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(favorite)}
                  className="w-full bg-gray-900 text-white py-2 px-4 hover:bg-gray-800 transition-colors duration-300 text-sm font-light tracking-wider uppercase"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-16 text-center">
          <Link 
            href="/products" 
            className="inline-block border border-gray-900 text-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition-all duration-300 text-sm font-light tracking-wider uppercase"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
} 