import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      // Return default categories if database is not available
      const defaultCategories = [
        { id: '1', name: 'Women', slug: 'women' },
        { id: '2', name: 'Accessories', slug: 'accessories' },
        { id: '3', name: 'Evening Wear', slug: 'evening' },
        { id: '4', name: 'Ready-to-Wear', slug: 'ready-to-wear' }
      ]
      
      return NextResponse.json({
        success: true,
        categories: defaultCategories
      })
    }

    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      categories
    })

  } catch (error) {
    console.error('Error fetching categories:', error)
    
    // Return default categories as fallback
    const defaultCategories = [
      { id: '1', name: 'Women', slug: 'women' },
      { id: '2', name: 'Accessories', slug: 'accessories' },
      { id: '3', name: 'Evening Wear', slug: 'evening' },
      { id: '4', name: 'Ready-to-Wear', slug: 'ready-to-wear' }
    ]
    
    return NextResponse.json({
      success: true,
      categories: defaultCategories
    })
  }
} 