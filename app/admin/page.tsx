'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/admin/login')
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-thin tracking-wider text-gray-900 mb-4">
          LINE BY GIZIA ADMIN
        </h1>
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    </div>
  )
} 