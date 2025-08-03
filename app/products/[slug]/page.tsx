'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useFavoritesStore } from '@/store/favoritesStore'
import { formatPrice, getPlaceholderImage } from '@/lib/utils'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice?: number
  images: string[]
  category: {
    id: string
    name: string
    slug: string
  }
  variants: Array<{
    id: string
    name: string
    value: string
    isActive: boolean
  }>
  inventory: number
  averageRating?: number
  _count: {
    reviews: number
  }
}

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const { addItem } = useCartStore()
  const { addToFavorites, removeFromFavorites, isFavorited } = useFavoritesStore()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.slug}`)
        if (!response.ok) {
          if (response.status === 404) {
            notFound()
          }
          throw new Error('Failed to fetch product')
        }
        const data = await response.json()
        if (data.success) {
          setProduct(data.data)
        } else {
          notFound()
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.slug])

  const handleAddToCart = async () => {
    if (!product) return

    setIsAddingToCart(true)
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || getPlaceholderImage(400, 600),
      slug: product.slug,
      size: selectedSize,
      color: selectedColor,
      quantity
    }

    addItem(cartItem)
    
    // Show success feedback
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  const sizeVariants = product.variants.filter(v => v.name === 'Size' && v.isActive)
  const colorVariants = product.variants.filter(v => v.name === 'Color' && v.isActive)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-700">Products</Link>
            <span>/</span>
            <Link href={`/products?category=${product.category.slug}`} className="hover:text-gray-700">
              {product.category.name}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-3 aspect-h-4 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage] || getPlaceholderImage(600, 800)}
                alt={product.name}
                width={600}
                height={800}
                className="object-cover w-full h-96 lg:h-[600px]"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-3 aspect-h-4 bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      index === selectedImage ? 'border-gray-900' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={150}
                      height={200}
                      className="object-cover w-full h-24"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-light text-gray-900">{product.name}</h1>
              <p className="mt-2 text-sm text-gray-500">{product.category.name}</p>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-light text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>

            {/* Rating */}
            {product.averageRating && (
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.averageRating!) ? 'fill-current' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.averageRating.toFixed(1)} ({product._count.reviews} reviews)
                </span>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection */}
            {sizeVariants.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {sizeVariants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedSize(variant.value)}
                      className={`py-3 px-4 text-sm font-medium border rounded ${
                        selectedSize === variant.value
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-300 text-gray-900 hover:border-gray-400'
                      }`}
                    >
                      {variant.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {colorVariants.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Color</h3>
                <div className="flex space-x-3">
                  {colorVariants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedColor(variant.value)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === variant.value
                          ? 'border-gray-900'
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: variant.value.toLowerCase() }}
                      title={variant.value}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-500 hover:text-gray-700"
                >
                  -
                </button>
                <span className="px-4 py-2 text-gray-900 min-w-0 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-500 hover:text-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart & Favorites */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.inventory === 0}
                className="w-full bg-gray-900 text-white py-4 px-6 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingToCart ? 'Adding to Cart...' : 
                 product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>

              <button
                onClick={() => {
                  const favoriteItem = {
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    comparePrice: product.comparePrice,
                    image: product.images[0] || '',
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
                className={`w-full border py-4 px-6 transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isFavorited(product.id)
                    ? 'border-gray-900 text-gray-900 bg-gray-50 hover:bg-gray-100'
                    : 'border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900'
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
                <span className="text-sm font-light tracking-wider uppercase">
                  {isFavorited(product.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </span>
              </button>
              
              <p className="text-sm text-gray-500 text-center">
                {product.inventory > 0 ? `${product.inventory} in stock` : 'Out of stock'}
              </p>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Product Details</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>SKU: {product.id}</li>
                <li>Category: {product.category.name}</li>
                <li>Free shipping within Lebanon on orders over $150</li>
                <li>30-day return policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 