import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Return empty if no database URL is provided
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        success: true,
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalProducts: 0,
          hasNextPage: false,
          hasPreviousPage: false
        }
      })
    }

    const { searchParams } = new URL(request.url)
    
    // Extract query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sort = searchParams.get('sort') || 'name'
    const featured = searchParams.get('featured') === 'true'
    const sale = searchParams.get('sale') === 'true'
    const size = searchParams.get('size')
    const color = searchParams.get('color')

    // Build where clause
    const where: any = {
      isActive: true,
    }

    if (category) {
      where.category = {
        slug: category
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { material: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    if (featured) {
      where.isFeatured = true
    }

    if (sale) {
      where.comparePrice = {
        not: null
      }
    }

    if (size || color) {
      where.variants = {
        some: {
          AND: [
            { isActive: true },
            ...(size ? [{ name: 'Size', value: size }] : []),
            ...(color ? [{ name: 'Color', value: color }] : [])
          ]
        }
      }
    }

    // Build orderBy clause
    let orderBy: any
    switch (sort) {
      case 'price-asc':
        orderBy = { price: 'asc' }
        break
      case 'price-desc':
        orderBy = { price: 'desc' }
        break
      case 'newest':
        orderBy = { createdAt: 'desc' }
        break
      case 'name':
      default:
        orderBy = { name: 'asc' }
        break
    }

    // Get total count for pagination
    const totalCount = await prisma.product.count({ where })

    // Get products with pagination
    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        variants: {
          where: {
            isActive: true
          }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit
    })

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit)
    const hasNextPage = page < totalPages
    const hasPreviousPage = page > 1

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts: totalCount,
        hasNextPage,
        hasPreviousPage,
        pages: totalPages
      }
    })

  } catch (error) {
    console.error('Products API error:', error)
    
    return NextResponse.json({
      success: true,
      data: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalProducts: 0,
        hasNextPage: false,
        hasPreviousPage: false
      }
    })
  }
}