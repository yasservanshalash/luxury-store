import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Return demo products if no database URL is provided
    if (!process.env.DATABASE_URL) {
      const demoProducts = [
        {
          id: "1",
          name: "Luxury Evening Gown",
          slug: "luxury-evening-gown",
          description: "Elegant evening gown perfect for special occasions",
          price: 890,
          comparePrice: null,
          images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
          category: { id: "1", name: "Evening Wear", slug: "evening-wear" },
          isActive: true,
          isFeatured: true,
          material: "Silk",
          _count: { reviews: 5 },
          averageRating: 4.8
        },
        {
          id: "2",
          name: "Designer Blazer",
          slug: "designer-blazer",
          description: "Professional blazer with contemporary Lebanese design",
          price: 650,
          comparePrice: null,
          images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
          category: { id: "2", name: "Outerwear", slug: "outerwear" },
          isActive: true,
          isFeatured: true,
          material: "Wool Blend",
          _count: { reviews: 3 },
          averageRating: 4.6
        },
        {
          id: "3",
          name: "Silk Cocktail Dress",
          slug: "silk-cocktail-dress",
          description: "Sophisticated cocktail dress in premium silk",
          price: 420,
          comparePrice: null,
          images: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
          category: { id: "3", name: "Dresses", slug: "dresses" },
          isActive: true,
          isFeatured: false,
          material: "Pure Silk",
          _count: { reviews: 8 },
          averageRating: 4.9
        },
        {
          id: "4",
          name: "Cashmere Coat",
          slug: "cashmere-coat",
          description: "Luxurious cashmere coat for cold weather elegance",
          price: 980,
          comparePrice: null,
          images: ["https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
          category: { id: "2", name: "Outerwear", slug: "outerwear" },
          isActive: true,
          isFeatured: true,
          material: "100% Cashmere",
          _count: { reviews: 2 },
          averageRating: 5.0
        },
        {
          id: "5",
          name: "Elegant Blouse",
          slug: "elegant-blouse",
          description: "Contemporary blouse with Lebanese craftsmanship",
          price: 280,
          comparePrice: null,
          images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
          category: { id: "4", name: "Tops", slug: "tops" },
          isActive: true,
          isFeatured: false,
          material: "Cotton Blend",
          _count: { reviews: 4 },
          averageRating: 4.4
        },
        {
          id: "6",
          name: "Designer Handbag",
          slug: "designer-handbag",
          description: "Luxury handbag with signature Line by Gizia design",
          price: 750,
          comparePrice: null,
          images: ["https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
          category: { id: "5", name: "Accessories", slug: "accessories" },
          isActive: true,
          isFeatured: true,
          material: "Italian Leather",
          _count: { reviews: 6 },
          averageRating: 4.7
        }
      ]
      
      return NextResponse.json({
        success: true,
        data: demoProducts,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalProducts: demoProducts.length,
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