import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Mock data for when database is not available
const mockProducts = [
  {
    id: '1',
    name: 'Elegant Silk Dress',
    slug: 'elegant-silk-dress',
    description: 'A stunning silk dress perfect for special occasions',
    price: 299,
    comparePrice: 399,
    images: ['https://picsum.photos/400/600?random=1'],
    category: { name: 'Women', slug: 'women' },
    variants: [
      { name: 'Size', value: 'M' },
      { name: 'Color', value: 'Black' }
    ],
    isActive: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Classic Leather Jacket',
    slug: 'classic-leather-jacket',
    description: 'Premium leather jacket with timeless design',
    price: 599,
    images: ['https://picsum.photos/400/600?random=2'],
    category: { name: 'Men', slug: 'men' },
    variants: [
      { name: 'Size', value: 'L' },
      { name: 'Color', value: 'Brown' }
    ],
    isActive: true,
    isFeatured: false
  }
]

export async function GET(request: NextRequest) {
  try {
    // Return mock data if no database URL is provided
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        products: mockProducts,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalProducts: mockProducts.length,
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
            size ? { name: 'Size', value: size } : {},
            color ? { name: 'Color', value: color } : {}
          ]
        }
      }
    }

    // Build orderBy clause
    let orderBy: any = {}
    switch (sort) {
      case 'price-asc':
        orderBy = { price: 'asc' }
        break
      case 'price-desc':
        orderBy = { price: 'desc' }
        break
      case 'name':
        orderBy = { name: 'asc' }
        break
      case 'newest':
        orderBy = { createdAt: 'desc' }
        break
      case 'rating':
        // This would need a more complex query with aggregation
        orderBy = { name: 'asc' }
        break
      default:
        orderBy = { name: 'asc' }
    }

    // Calculate offset
    const skip = (page - 1) * limit

    // Fetch products
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          category: true,
          variants: {
            where: { isActive: true }
          },
          reviews: {
            select: {
              rating: true
            }
          },
          _count: {
            select: {
              reviews: true
            }
          }
        }
      }),
      prisma.product.count({ where })
    ])

    // Calculate average ratings
    const productsWithRatings = products.map(product => ({
      ...product,
      averageRating: product.reviews.length > 0 
        ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
        : 0
    }))

    // Calculate pagination
    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: productsWithRatings,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: totalPages
      }
    })

  } catch (error) {
    console.error('Products API error:', error)
    
    // Re-extract query parameters for fallback
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'name'
    const featured = searchParams.get('featured') === 'true'
    
    // Fallback data when database is unavailable
    const fallbackProducts = [
      {
        id: '1',
        name: 'Silk Evening Dress',
        slug: 'silk-evening-dress',
        description: 'Exquisite silk evening dress with intricate beadwork',
        price: 2499,
        comparePrice: 3299,
        images: ['https://picsum.photos/600/800?random=1', 'https://picsum.photos/600/800?random=2'],
        sku: 'SED-001',
        inventory: 15,
        isActive: true,
        isFeatured: true,
        category: { id: '1', name: 'Women', slug: 'women' },
        variants: [],
        reviews: [],
        averageRating: 4.8,
        _count: { reviews: 24 },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Cashmere Overcoat',
        slug: 'cashmere-overcoat',
        description: 'Luxurious cashmere overcoat with classic tailoring',
        price: 3999,
        images: ['https://picsum.photos/600/800?random=3', 'https://picsum.photos/600/800?random=4'],
        sku: 'CO-001',
        inventory: 8,
        isActive: true,
        isFeatured: true,
        category: { id: '2', name: 'Men', slug: 'men' },
        variants: [],
        reviews: [],
        averageRating: 4.9,
        _count: { reviews: 18 },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        name: 'Diamond Tennis Bracelet',
        slug: 'diamond-tennis-bracelet',
        description: 'Stunning diamond tennis bracelet with premium stones',
        price: 8999,
        images: ['https://picsum.photos/600/800?random=5', 'https://picsum.photos/600/800?random=6'],
        sku: 'DTB-001',
        inventory: 5,
        isActive: true,
        isFeatured: false,
        category: { id: '3', name: 'Accessories', slug: 'accessories' },
        variants: [],
        reviews: [],
        averageRating: 5.0,
        _count: { reviews: 12 },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        name: 'Italian Leather Handbag',
        slug: 'italian-leather-handbag',
        description: 'Handcrafted Italian leather handbag',
        price: 1899,
        images: ['https://picsum.photos/600/800?random=7', 'https://picsum.photos/600/800?random=8'],
        sku: 'ILH-001',
        inventory: 12,
        isActive: true,
        isFeatured: false,
        category: { id: '3', name: 'Accessories', slug: 'accessories' },
        variants: [],
        reviews: [],
        averageRating: 4.7,
        _count: { reviews: 31 },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '5',
        name: 'Designer Sunglasses',
        slug: 'designer-sunglasses',
        description: 'Premium designer sunglasses with UV protection',
        price: 799,
        images: ['https://picsum.photos/600/800?random=9', 'https://picsum.photos/600/800?random=10'],
        sku: 'DS-001',
        inventory: 20,
        isActive: true,
        isFeatured: false,
        category: { id: '3', name: 'Accessories', slug: 'accessories' },
        variants: [],
        reviews: [],
        averageRating: 4.5,
        _count: { reviews: 8 },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '6',
        name: 'Luxury Watch',
        slug: 'luxury-watch',
        description: 'Swiss-made luxury timepiece with automatic movement',
        price: 12999,
        images: ['https://picsum.photos/600/800?random=11', 'https://picsum.photos/600/800?random=12'],
        sku: 'LW-001',
        inventory: 3,
        isActive: true,
        isFeatured: true,
        category: { id: '3', name: 'Accessories', slug: 'accessories' },
        variants: [],
        reviews: [],
        averageRating: 4.9,
        _count: { reviews: 15 },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    console.log('Using fallback product data - database unavailable')
    
    // Filter fallback data based on query parameters
    let filteredProducts = [...fallbackProducts]

    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category.slug === category)
    }

    if (featured) {
      filteredProducts = filteredProducts.filter(p => p.isFeatured)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      )
    }

    // Sort products
    switch (sort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default:
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
    }

    const totalCount = filteredProducts.length
    const skip = (page - 1) * limit
    const paginatedProducts = filteredProducts.slice(skip, skip + limit)
    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: totalPages
      }
    })
  }
} 