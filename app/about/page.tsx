'use client'

import { useEffect } from 'react'
import Image from 'next/image'

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us - Line by Gizia | Luxury Fashion from Beirut'
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video/Image Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image/Video */}
        <div className="absolute inset-0 z-0">
          {/* Primary background image - Luxury fashion boutique */}
          <Image
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Line by Gizia Boutique - Lebanese Luxury Fashion"
            fill
            className="object-cover animate-pulse"
            priority
          />
          
          {/* Animated overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 animate-pulse"></div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-thin tracking-[0.3em] mb-8 animate-fade-in-up">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl font-light leading-relaxed animate-fade-in-up animation-delay-300">
            We are Line by Gizia, born from a vision that transcends conventional fashion. Based in the heart of Beirut,
            we create luxury women's clothing that embodies the sophisticated elegance of modern Lebanese design.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <h2 className="text-4xl font-thin tracking-wider text-gray-900">
                CRAFTED WITH PASSION
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Founded by Lebanese designer Gizia, each piece is meticulously crafted in our Beirut atelier.
                We believe that luxury fashion should not only be beautiful but also meaningful, 
                reflecting the rich cultural heritage and contemporary spirit of Lebanon.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our commitment to excellence extends beyond aesthetics to encompass ethical production, 
                sustainable practices, and the celebration of Lebanese craftsmanship on the global stage.
              </p>
            </div>

            {/* Image */}
            <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Designer at work - Lebanese fashion creation"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-thin tracking-wider text-gray-900 mb-4">
              OUR VALUES
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Every decision we make is guided by our core values that define who we are and what we stand for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 - Craftsmanship */}
            <div className="text-center group">
              <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Handcrafted luxury evening gowns"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-light tracking-wider text-gray-900 mb-3">
                CRAFTSMANSHIP
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every stitch tells a story of Lebanese artisanal excellence passed down through generations.
              </p>
            </div>

            {/* Value 2 - Innovation */}
            <div className="text-center group">
              <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Contemporary women's fashion design"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-light tracking-wider text-gray-900 mb-3">
                INNOVATION
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We blend traditional techniques with contemporary design to create timeless yet modern pieces.
              </p>
            </div>

            {/* Value 3 - Sustainability */}
            <div className="text-center group">
              <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Sustainable luxury fashion"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-light tracking-wider text-gray-900 mb-3">
                SUSTAINABILITY
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our commitment to the environment drives us to use sustainable materials and ethical practices.
              </p>
            </div>

            {/* Value 4 - Heritage */}
            <div className="text-center group">
              <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Lebanese cultural heritage in fashion"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-light tracking-wider text-gray-900 mb-3">
                HERITAGE
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We celebrate Lebanon's rich cultural heritage while creating fashion for the modern world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image First */}
            <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
                alt="Behind the scenes - Fashion design process"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Content */}
            <div className="space-y-8">
              <h2 className="text-4xl font-thin tracking-wider text-gray-900">
                THE ATELIER EXPERIENCE
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                The Line by Gizia Showroom features a curated selection of our latest collections alongside exclusive pieces
                available only to our boutique visitors. Located in the heart of Beirut, our atelier offers an intimate
                shopping experience where luxury meets personal service.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                From initial consultation to final fitting, our team of expert stylists ensures that every piece
                not only fits perfectly but also reflects your personal style and the occasion for which it's intended.
              </p>
              <div className="pt-4">
                <a
                  href="/contact"
                  className="inline-block border border-gray-900 text-gray-900 px-8 py-3 text-sm font-light tracking-wider uppercase hover:bg-gray-900 hover:text-white transition-all duration-300"
                >
                  VISIT OUR ATELIER
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-thin tracking-wider text-gray-900 mb-4">
              FROM CONCEPT TO CREATION
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the meticulous process behind every Line by Gizia piece, from initial sketch to final garment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative h-80 mb-6 overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Design concept and sketching process"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-light">
                1
              </div>
              <h3 className="text-xl font-light tracking-wider text-gray-900 mb-4">
                DESIGN & CONCEPT
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every collection begins with inspiration drawn from Lebanese culture, contemporary art, and global fashion trends.
                Our design team creates detailed sketches and mood boards that capture the essence of each piece.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative h-80 mb-6 overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Premium fabric selection and tailoring"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-light">
                2
              </div>
              <h3 className="text-xl font-light tracking-wider text-gray-900 mb-4">
                MATERIAL SELECTION
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We source only the finest fabrics from renowned textile houses, ensuring each material meets our
                exacting standards for quality, sustainability, and beauty.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative h-80 mb-6 overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Artisanal craftsmanship and finishing"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-light">
                3
              </div>
              <h3 className="text-xl font-light tracking-wider text-gray-900 mb-4">
                ARTISANAL CRAFTING
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our skilled artisans bring each design to life through meticulous handwork, attention to detail,
                and techniques perfected over generations in the Lebanese fashion tradition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Line by Gizia collection showcase"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-5xl md:text-6xl font-thin tracking-wider mb-8">
            Experience Luxury
          </h2>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto mb-8">
            Discover the intersection of Lebanese heritage and contemporary elegance. 
            Each piece in our collection is a testament to the artistry and passion that defines Line by Gizia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-block bg-white text-gray-900 px-8 py-3 text-sm font-light tracking-wider uppercase hover:bg-gray-100 transition-colors duration-300"
            >
              EXPLORE COLLECTION
            </a>
            <a
              href="/contact"
              className="inline-block border border-white text-white px-8 py-3 text-sm font-light tracking-wider uppercase hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              VISIT BOUTIQUE
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 