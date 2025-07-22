'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'LUXURY REDEFINED',
      subtitle: 'Discover timeless elegance crafted in Beirut'
    },
    {
      image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'SUMMER COLLECTION',
      subtitle: 'Breathable luxury for the modern woman'
    },
    {
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'HANDCRAFTED EXCELLENCE',
      subtitle: 'Where tradition meets contemporary design'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [heroSlides.length])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-thin tracking-[0.3em] mb-6 animate-fade-in-up">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wider mb-8 animate-fade-in-up animation-delay-300">
              {heroSlides[currentSlide].subtitle}
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-black px-8 py-4 text-sm font-light tracking-wider uppercase hover:bg-gray-100 transition-all duration-300 animate-fade-in-up animation-delay-600"
            >
              EXPLORE COLLECTION
            </Link>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Brand Introduction */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-thin tracking-wider text-gray-900 mb-8">
                              LINE BY GIZIA
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
                              Born in the heart of Beirut, Line by Gizia represents the pinnacle of Lebanese luxury fashion. 
            Each piece is meticulously crafted by our skilled artisans, blending traditional techniques 
            with contemporary design to create timeless elegance for the modern woman.
          </p>
          <Link
            href="/about"
            className="inline-block border border-gray-900 text-gray-900 px-8 py-3 text-sm font-light tracking-wider uppercase hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            DISCOVER OUR STORY
          </Link>
        </div>
      </section>

      {/* Summer Sale Banner */}
      <section className="relative h-96 overflow-hidden bg-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Summer Collection"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Collection 1 */}
            <Link href="/products?category=women" className="group">
              <div className="relative h-96 overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Women's Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-light tracking-wider mb-2">WOMEN</h3>
                  <p className="text-sm font-light">Timeless elegance</p>
                </div>
              </div>
            </Link>

            {/* Collection 2 */}
            <Link href="/products?category=accessories" className="group">
              <div className="relative h-96 overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Accessories Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-light tracking-wider mb-2">ACCESSORIES</h3>
                  <p className="text-sm font-light">Curated details</p>
                </div>
              </div>
            </Link>

            {/* Collection 3 */}
            <Link href="/products" className="group">
              <div className="relative h-96 overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="New Arrivals"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-light tracking-wider mb-2">NEW ARRIVALS</h3>
                  <p className="text-sm font-light">Latest designs</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop The Looks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-thin tracking-wider text-gray-900 mb-4">
              SHOP THE LOOKS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Look 1 */}
            <div className="relative h-96 overflow-hidden group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Evening Look"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-light mb-1">Evening Elegance</p>
                <p className="text-xs opacity-75">From $950</p>
              </div>
            </div>

            {/* Look 2 */}
            <div className="relative h-96 overflow-hidden group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Casual Chic Look"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-light mb-1">Casual Chic</p>
                <p className="text-xs opacity-75">From $485</p>
              </div>
            </div>

            {/* Look 3 */}
            <div className="relative h-96 overflow-hidden group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Business Look"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-light mb-1">Business Formal</p>
                <p className="text-xs opacity-75">From $750</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <h2 className="text-4xl font-thin tracking-wider text-gray-900">
                CRAFTED WITH PURPOSE
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Every piece in our collection is a testament to Lebanese craftsmanship and our commitment 
                to sustainable luxury. We believe in creating garments that not only look beautiful but 
                also stand the test of time, both in quality and style.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-thin text-gray-900 mb-2">100%</div>
                  <div className="text-sm text-gray-600 tracking-wider uppercase">Sustainable Materials</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-thin text-gray-900 mb-2">25+</div>
                  <div className="text-sm text-gray-600 tracking-wider uppercase">Years of Expertise</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-thin text-gray-900 mb-2">∞</div>
                  <div className="text-sm text-gray-600 tracking-wider uppercase">Timeless Design</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-thin text-gray-900 mb-2">🇱🇧</div>
                  <div className="text-sm text-gray-600 tracking-wider uppercase">Made in Lebanon</div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-96 lg:h-[500px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Artisan at work"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* From Beirut to the World */}
      <section className="relative py-32 overflow-hidden bg-gray-50">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="From Beirut to the World"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-thin tracking-wider text-gray-900 mb-8">
            From Beirut To the World
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
            What began in the heart of Beirut has become a global symbol of luxury and craftsmanship. 
            Our designs travel from our atelier to fashion capitals worldwide, carrying the soul of Lebanese artistry.
          </p>
          <Link
            href="/about"
            className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-light tracking-wider uppercase hover:bg-gray-800 transition-colors duration-300"
          >
            DISCOVER OUR JOURNEY
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Service 1 */}
            <div className="text-center">
              <div className="relative h-64 mb-6 overflow-hidden rounded">
                <Image
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Worldwide Complimentary Shipping"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-light tracking-wider text-gray-900 mb-4">
                Worldwide Complimentary Shipping
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Express delivery to your doorstep, complimentary on all orders worldwide. Experience Lebanese luxury anywhere.
              </p>
            </div>

            {/* Service 2 */}
            <div className="text-center">
              <div className="relative h-64 mb-6 overflow-hidden rounded">
                <Image
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Ethically Crafted in Beirut"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-light tracking-wider text-gray-900 mb-4">
                Ethically Crafted in Beirut
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Each piece is meticulously handcrafted in our Beirut atelier using sustainable practices and fair trade principles.
              </p>
            </div>

            {/* Service 3 */}
            <div className="text-center">
              <div className="relative h-64 mb-6 overflow-hidden rounded">
                <Image
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Made-to-Measure Service"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-light tracking-wider text-gray-900 mb-4">
                Made-to-Measure Service
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Personalized fittings and bespoke alterations ensure every piece fits you perfectly, like couture should.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-thin tracking-wider text-gray-900 mb-4">
              SPRING SUMMER LOOKBOOK
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our latest collection through captivating imagery that showcases the essence of contemporary Lebanese design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Lookbook Image 1 */}
            <div className="relative h-96 overflow-hidden group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Spring Summer Look 1"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </div>

            {/* Lookbook Image 2 */}
            <div className="relative h-96 overflow-hidden group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Spring Summer Look 2"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </div>

            {/* Lookbook Image 3 */}
            <div className="relative h-96 overflow-hidden group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Spring Summer Look 3"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </div>

            {/* Lookbook Image 4 */}
            <div className="relative h-96 overflow-hidden group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Spring Summer Look 4"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </div>

            {/* Lookbook Image 5 */}
            <div className="relative h-96 overflow-hidden group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Spring Summer Look 5"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </div>

            {/* Lookbook Image 6 */}
            <div className="relative h-96 overflow-hidden group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Spring Summer Look 6"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block border border-gray-900 text-gray-900 px-8 py-3 text-sm font-light tracking-wider uppercase hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              VIEW FULL COLLECTION
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-thin tracking-wider mb-4">
            STAY INFORMED
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            Be the first to know about new collections, exclusive events, and special offers from Line by Gizia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button className="bg-transparent border border-white text-white px-8 py-3 hover:bg-white hover:text-gray-900 transition-all duration-300 text-sm font-light tracking-wider uppercase">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </div>
  )
} 