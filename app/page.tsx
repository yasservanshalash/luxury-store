'use client'

import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

export default function HomePage() {
  const products = [
    {
      id: 1,
      name: 'Luxury Evening Gown',
      price: 890,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      slug: 'luxury-evening-gown'
    },
    {
      id: 2,
      name: 'Designer Blazer',
      price: 650,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      slug: 'designer-blazer'
    },
    {
      id: 3,
      name: 'Silk Cocktail Dress',
      price: 420,
      image: 'https://images.unsplash.com/photo-1566479179817-623b4e5d64e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      slug: 'silk-cocktail-dress'
    },
    {
      id: 4,
      name: 'Cashmere Coat',
      price: 980,
      image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      slug: 'cashmere-coat'
    },
    {
      id: 5,
      name: 'Elegant Blouse',
      price: 280,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      slug: 'elegant-blouse'
    },
    {
      id: 6,
      name: 'Designer Handbag',
      price: 750,
      image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      slug: 'designer-handbag'
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="LINE BY GIZIA - Luxury Women's Fashion"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
          <div>
            <h1 className="text-6xl md:text-8xl font-thin tracking-wider mb-4">
              LINE BY GIZIA
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wide mb-8">
              Born in the heart of Beirut, Line by Gizia represents the pinnacle of Lebanese luxury fashion.
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-gray-900 px-8 py-4 text-sm font-light tracking-wider uppercase hover:bg-gray-100 transition-colors duration-300"
            >
              EXPLORE COLLECTION
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-thin tracking-wider text-gray-900 mb-6">
                CRAFTED IN BEIRUT
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Every piece in our collection tells a story of Lebanese craftsmanship, 
                where traditional techniques meet contemporary design. Our atelier in 
                Beirut brings together the finest fabrics and most skilled artisans 
                to create clothing that transcends seasons and trends.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                From hand-finished evening gowns to meticulously tailored blazers, 
                each garment embodies the sophistication and elegance that defines 
                modern Lebanese luxury.
              </p>
              <Link
                href="/about"
                className="inline-block border border-gray-900 text-gray-900 px-8 py-3 text-sm font-light tracking-wider uppercase hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                DISCOVER OUR STORY
              </Link>
            </div>
            <div className="relative h-96">
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Lebanese Fashion Atelier"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Summer Sale Banner */}
      <section className="relative h-96 overflow-hidden bg-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Summer Collection - Women's Designer Fashion"
            fill
            className="object-cover opacity-90"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 h-full flex items-center justify-start pl-8 lg:pl-16">
          <div className="text-white">
            <h2 className="text-6xl md:text-7xl font-thin tracking-wider mb-4">
              Summer Sale
            </h2>
            <p className="text-xl md:text-2xl font-light tracking-wide mb-6">
              Code SUMMER50
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-gray-900 px-8 py-3 text-sm font-light tracking-wider uppercase hover:bg-gray-100 transition-colors duration-300"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-thin tracking-wider text-gray-900 mb-4">
              FEATURED COLLECTIONS
            </h2>
            <p className="text-gray-600 text-lg">
              Curated pieces that define luxury and sophistication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Evening Collection */}
            <div className="group cursor-pointer">
              <div className="relative h-80 mb-4 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1566479179817-623b4e5d64e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Evening Collection - Luxury Dresses"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl font-light tracking-wider text-gray-900 mb-2">EVENING</h3>
              <p className="text-gray-600">Exquisite gowns for unforgettable moments</p>
            </div>

            {/* Casual Collection */}
            <div className="group cursor-pointer">
              <div className="relative h-80 mb-4 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Casual Collection - Designer Blazers"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl font-light tracking-wider text-gray-900 mb-2">CASUAL</h3>
              <p className="text-gray-600">Effortless elegance for everyday luxury</p>
            </div>

            {/* Accessories Collection */}
            <div className="group cursor-pointer">
              <div className="relative h-80 mb-4 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Accessories Collection - Designer Handbags"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl font-light tracking-wider text-gray-900 mb-2">ACCESSORIES</h3>
              <p className="text-gray-600">Complete your look with signature pieces</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-thin tracking-wider text-gray-900 mb-4">
              NEW ARRIVALS
            </h2>
            <p className="text-gray-600 text-lg">
              Discover the latest additions to our luxury collection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="relative h-96 mb-4 overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-lg font-light tracking-wide text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-lg">${product.price}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block border border-gray-900 text-gray-900 px-8 py-3 text-sm font-light tracking-wider uppercase hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </div>
      </section>

      {/* Luxury Experience */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury Shopping Experience"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
          <div>
            <h2 className="text-5xl md:text-6xl font-thin tracking-wider mb-4">
              PERSONAL STYLING
            </h2>
            <p className="text-xl md:text-2xl font-light tracking-wide mb-8">
              Experience bespoke luxury with our personal styling service
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-gray-900 px-8 py-4 text-sm font-light tracking-wider uppercase hover:bg-gray-100 transition-colors duration-300"
            >
              BOOK APPOINTMENT
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-thin tracking-wider text-gray-900 mb-4">
              @LINEBYGIZIA
            </h2>
            <p className="text-gray-600 text-lg">
              Follow us for daily style inspiration
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Instagram Post 1"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1566479179817-623b4e5d64e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Instagram Post 2"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Instagram Post 3"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Instagram Post 4"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Instagram Post 5"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Instagram Post 6"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-thin tracking-wider text-gray-900 mb-4">
            STAY CONNECTED
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Be the first to know about new collections, exclusive events, and special offers from Line by Gizia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 text-sm"
            />
            <button className="bg-gray-900 text-white px-8 py-3 text-sm font-light tracking-wider uppercase hover:bg-gray-800 transition-colors duration-300">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </div>
  )
} 