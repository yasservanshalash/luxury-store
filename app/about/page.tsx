'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function AboutPage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    // Preload video for smooth animation
    const video = document.createElement('video')
    video.addEventListener('loadeddata', () => {
      setIsVideoLoaded(true)
    })
    
    // Set page title
          document.title = 'About Us - Line by Gizia | Luxury Fashion from Beirut'
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video/Image Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image/Video */}
        <div className="absolute inset-0 z-0">
          {/* Primary background image */}
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Fashion atelier background"
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
        <div className="relative z-20 text-center text-white">
          <h1 className="text-6xl md:text-8xl font-thin tracking-[0.3em] mb-4 animate-fade-in-up">
            ABOUT US
          </h1>
          <div className="w-24 h-0.5 bg-white mx-auto animate-fade-in-up animation-delay-300"></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="flex flex-col items-center text-white">
            <span className="text-sm tracking-wider mb-2">SCROLL</span>
            <div className="w-0.5 h-8 bg-white"></div>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-thin tracking-wider text-gray-900 mb-8">
              THE BRAND
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                              We are Line by Gizia, born from a vision that transcends conventional fashion. Based in the heart of Beirut, 
              we create timeless pieces that embody Lebanese craftsmanship and contemporary elegance. Each design tells 
              a story of heritage, innovation, and artistic expression.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative h-96 lg:h-[500px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Designer working on fabric"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-light tracking-wider text-gray-900 mb-6">
                  DESIGNED IN BEIRUT
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Founded by Lebanese designer Gizia, each piece is meticulously crafted in our Beirut atelier. 
                  We believe in slow fashion, where quality trumps quantity, and every garment is made to last 
                  generations. Our design philosophy centers on timeless elegance with modern functionality.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  From our carefully sourced fabrics to our innovative cuts, we maintain the highest standards 
                  of craftsmanship while staying true to our Lebanese heritage and artistic expression.
                </p>
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
            <div className="space-y-8 order-2 lg:order-1">
              <div>
                <h3 className="text-2xl font-light tracking-wider text-gray-900 mb-6">
                  OUR VALUES
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our values are deeply rooted in authenticity, sustainability, and innovation. We believe that true luxury 
                  lies not in excess, but in thoughtful design, exceptional quality, and respect for both our artisans 
                  and our environment.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">SUSTAINABILITY</h4>
                      <p className="text-gray-600 text-sm">Ethically sourced materials and responsible production methods</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">CRAFTSMANSHIP</h4>
                      <p className="text-gray-600 text-sm">Traditional techniques combined with contemporary innovation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">HERITAGE</h4>
                      <p className="text-gray-600 text-sm">Celebrating Lebanese design legacy while pioneering the future</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-96 lg:h-[500px] overflow-hidden order-1 lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
                alt="Luxury fabric details"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Textile Excellence Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative h-96 lg:h-[500px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Textile manufacturing"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-light tracking-wider text-gray-900 mb-6">
                  DESIGNED TEXTILE
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  At our studio, we take immense pride in creating textile designs that reflect both heritage and innovation. 
                  Our team of skilled artisans works with premium materials, ensuring that each fabric tells its own unique story 
                  through texture, color, and craftsmanship.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  From hand-selected fibers to intricate weaving techniques, we maintain control over every aspect of our 
                  textile creation process. This allows us to guarantee not only beauty but also durability and comfort 
                  in every piece we create.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8 order-2 lg:order-1">
              <div>
                <h3 className="text-2xl font-light tracking-wider text-gray-900 mb-6">
                  THE SHOWROOM
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  The Line by Gizia Showroom features a curated selection of our latest collections alongside exclusive pieces 
                  available only in-store. Located in the heart of Beirut, our space reflects our design philosophy: 
                  clean lines, natural materials, and an atmosphere of understated luxury.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Here, you can experience our fabrics firsthand, receive personalized styling consultations, and discover 
                  limited edition pieces. Our team is dedicated to helping you find pieces that not only fit perfectly 
                  but also align with your personal style and values.
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>OPENING HOURS</p>
                  <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
                  <p>Sunday: 12:00 PM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-96 lg:h-[500px] overflow-hidden order-1 lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Line by Gizia showroom interior"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Collection Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-thin tracking-wider text-gray-900 mb-8">
              VIEW THE COLLECTION
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
              Discover our latest pieces that embody the essence of contemporary Lebanese design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Collection Items */}
            <div className="group cursor-pointer">
              <div className="relative h-96 overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="AMOUR Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-center text-lg font-light tracking-wider text-gray-900">
                AMOUR '25
              </h3>
            </div>

            <div className="group cursor-pointer">
              <div className="relative h-96 overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="SS Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-center text-lg font-light tracking-wider text-gray-900">
                SS '25
              </h3>
            </div>

            <div className="group cursor-pointer">
              <div className="relative h-96 overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="FW Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-center text-lg font-light tracking-wider text-gray-900">
                FW '25
              </h3>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-block bg-gray-900 text-white px-8 py-4 text-sm font-light tracking-wider uppercase hover:bg-gray-800 transition-colors duration-300"
            >
              EXPLORE COLLECTIONS
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 