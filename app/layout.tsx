import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Line by Gizia - Premium Fashion & Accessories',
  description: 'Discover our exclusive collection of luxury clothing, accessories, and designer pieces from Lebanon.',
  keywords: 'luxury fashion, designer clothes, premium accessories, Lebanon, high-end fashion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <h3 className="text-2xl font-thin tracking-wider text-gray-900 mb-4">LINE BY GIZIA</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Luxury fashion crafted in the heart of Beirut, bringing Lebanese elegance to the world.
                </p>
              </div>
              <div>
                <h4 className="font-light tracking-wider uppercase text-gray-900 mb-6">CUSTOMER SERVICE</h4>
                <ul className="space-y-3 text-gray-600 font-light">
                  <li><a href="/shipping" className="hover:text-gray-900 transition-colors">Shipping Policy</a></li>
                  <li><a href="/returns" className="hover:text-gray-900 transition-colors">Return Policy</a></li>
                  <li><a href="/contact" className="hover:text-gray-900 transition-colors">Contact Us</a></li>
                  <li><a href="/size-guide" className="hover:text-gray-900 transition-colors">Size Guide</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-light tracking-wider uppercase text-gray-900 mb-6">SERVICES</h4>
                <ul className="space-y-3 text-gray-600 font-light">
                  <li><a href="/made-to-measure" className="hover:text-gray-900 transition-colors">Made to Measure</a></li>
                  <li><a href="/alterations" className="hover:text-gray-900 transition-colors">Alterations</a></li>
                  <li><a href="/styling" className="hover:text-gray-900 transition-colors">Personal Styling</a></li>
                  <li><a href="/vip" className="hover:text-gray-900 transition-colors">VIP Services</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-light tracking-wider uppercase text-gray-900 mb-6">SOCIAL</h4>
                <ul className="space-y-3 text-gray-600 font-light">
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Facebook</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Pinterest</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">TikTok</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-100 mt-12 pt-8 text-center">
              <p className="text-gray-500 font-light tracking-wide">&copy; 2025 Line by Gizia. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
