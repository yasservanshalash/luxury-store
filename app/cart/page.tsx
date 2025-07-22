'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home since we now use the cart sidebar
    router.replace('/')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500 font-light tracking-wide">
          Redirecting to home...
        </p>
      </div>
    </div>
  )
} 