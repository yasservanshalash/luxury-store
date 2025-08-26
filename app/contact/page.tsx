'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-8 py-32">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-thin tracking-wider text-gray-900 mb-4">MESSAGE SENT</h1>
            <p className="text-gray-600 font-light mb-8">Thank you for reaching out. We'll get back to you within 24 hours.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="bg-gray-900 text-white px-8 py-3 font-light tracking-wider uppercase hover:bg-gray-800 transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-thin tracking-wider text-gray-900 mb-6">
            GET IN TOUCH
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-thin tracking-wider text-gray-900 mb-12">CONTACT INFORMATION</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-light tracking-wider uppercase text-gray-500 mb-2">ADDRESS</h3>
                <p className="text-gray-900 font-light">
                  Kaslik Lebanon
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-light tracking-wider uppercase text-gray-500 mb-2">PHONE</h3>
                <p className="text-gray-900 font-light">81088848</p>
              </div>
              
              <div>
                <h3 className="text-sm font-light tracking-wider uppercase text-gray-500 mb-2">EMAIL</h3>
                <p className="text-gray-900 font-light">linebygizia@gmail.com</p>
              </div>
              
              <div>
                <h3 className="text-sm font-light tracking-wider uppercase text-gray-500 mb-2">STORE HOURS</h3>
                <div className="text-gray-900 font-light space-y-1">
                  <p>Monday - Friday: 10:00 AM - 9:00 PM</p>
                  <p>Saturday: 10:00 AM - 10:00 PM</p>
                  <p>Sunday: 2:00 PM - 8:00 PM</p>
                  <p className="text-sm text-gray-500 mt-2">(Beirut Time - GMT+2)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-thin tracking-wider text-gray-900 mb-12">SEND US A MESSAGE</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-light tracking-wider uppercase text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-gray-900 transition-colors font-light"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-light tracking-wider uppercase text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-gray-900 transition-colors font-light"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-light tracking-wider uppercase text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-gray-900 transition-colors font-light"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-light tracking-wider uppercase text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-gray-900 transition-colors font-light resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white py-4 px-8 font-light tracking-wider uppercase hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 