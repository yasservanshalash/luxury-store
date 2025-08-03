import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Mock data for when database is not available
const mockProducts = [
  {
    id: 'product-1',
    name: 'Luxury Evening Gown',
    slug: 'luxury-evening-gown',
    description: 'Elegant black evening gown with intricate beadwork, perfect for special occasions.',
    price: 890,
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    category: {
      id: 'women',
      name: 'Women',
      slug: 'women'
    },
    variants: [],
    inventory: 15,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'product-2',
    name: 'Designer Blazer',
    slug: 'designer-blazer',
    description: 'Sophisticated wool blazer with clean lines and impeccable tailoring.',
    price: 650,
    images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    category: {
      id: 'women',
      name: 'Women',
      slug: 'women'
    },
    variants: [],
    inventory: 8,
    isActive: true,
    createdAt: '2024-01-02T00:00:00Z'
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
        name: 'Luxury Evening Gown',
        slug: 'luxury-evening-gown',
        description: 'Elegant evening gown crafted from the finest silk with hand-embroidered details. Perfect for galas and special occasions.',
        price: 1250,
        comparePrice: 1800,
        images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1566479179817-623b4e5d64e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        category: {
          id: 'evening',
          name: 'Evening Wear',
          slug: 'evening'
        },
        variants: [
          { id: 'size-xs', name: 'Size', value: 'XS', isActive: true },
          { id: 'size-s', name: 'Size', value: 'S', isActive: true },
          { id: 'size-m', name: 'Size', value: 'M', isActive: true },
          { id: 'size-l', name: 'Size', value: 'L', isActive: true },
          { id: 'color-black', name: 'Color', value: 'Black', isActive: true },
          { id: 'color-navy', name: 'Color', value: 'Navy', isActive: true }
        ],
        inventory: 12,
        averageRating: 4.8,
        _count: { reviews: 24 }
      },
      {
        id: '2',
        name: 'Cashmere Coat',
        slug: 'cashmere-coat',
        description: 'Luxurious double-breasted cashmere coat with silk lining. A timeless piece for the sophisticated woman.',
        price: 980,
        images: ['https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        category: {
          id: 'outerwear',
          name: 'Outerwear',
          slug: 'outerwear'
        },
        variants: [
          { id: 'size-xs-2', name: 'Size', value: 'XS', isActive: true },
          { id: 'size-s-2', name: 'Size', value: 'S', isActive: true },
          { id: 'size-m-2', name: 'Size', value: 'M', isActive: true },
          { id: 'size-l-2', name: 'Size', value: 'L', isActive: true },
          { id: 'color-camel', name: 'Color', value: 'Camel', isActive: true },
          { id: 'color-charcoal', name: 'Color', value: 'Charcoal', isActive: true }
        ],
        inventory: 8,
        averageRating: 4.9,
        _count: { reviews: 16 }
      },
      {
        id: '3',
        name: 'Silk Cocktail Dress',
        slug: 'silk-cocktail-dress',
        description: 'Elegant midi dress in pure silk with a flattering A-line silhouette. Perfect for cocktail parties and dinner events.',
        price: 420,
        images: ['https://images.unsplash.com/photo-1566479179817-623b4e5d64e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        category: {
          id: 'dresses',
          name: 'Dresses',
          slug: 'dresses'
        },
        variants: [
          { id: 'size-xs-3', name: 'Size', value: 'XS', isActive: true },
          { id: 'size-s-3', name: 'Size', value: 'S', isActive: true },
          { id: 'size-m-3', name: 'Size', value: 'M', isActive: true },
          { id: 'size-l-3', name: 'Size', value: 'L', isActive: true },
          { id: 'color-emerald', name: 'Color', value: 'Emerald', isActive: true },
          { id: 'color-burgundy', name: 'Color', value: 'Burgundy', isActive: true }
        ],
        inventory: 15,
        averageRating: 4.7,
        _count: { reviews: 31 }
      },
      {
        id: '4',
        name: 'Designer Handbag',
        slug: 'designer-handbag',
        description: 'Premium leather handbag with gold-tone hardware. Spacious interior with multiple compartments for organization.',
        price: 750,
        images: ['https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        category: {
          id: 'accessories',
          name: 'Accessories',
          slug: 'accessories'
        },
        variants: [
          { id: 'color-black-4', name: 'Color', value: 'Black', isActive: true },
          { id: 'color-tan', name: 'Color', value: 'Tan', isActive: true },
          { id: 'color-cognac', name: 'Color', value: 'Cognac', isActive: true }
        ],
        inventory: 20,
        averageRating: 4.6,
        _count: { reviews: 12 }
      },
      {
        id: '5',
        name: 'Elegant Blouse',
        slug: 'elegant-blouse',
        description: 'Sophisticated silk blouse with pearl button details. Versatile piece that transitions from day to evening.',
        price: 280,
        images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        category: {
          id: 'tops',
          name: 'Tops',
          slug: 'tops'
        },
        variants: [
          { id: 'size-xs-5', name: 'Size', value: 'XS', isActive: true },
          { id: 'size-s-5', name: 'Size', value: 'S', isActive: true },
          { id: 'size-m-5', name: 'Size', value: 'M', isActive: true },
          { id: 'size-l-5', name: 'Size', value: 'L', isActive: true },
          { id: 'color-ivory', name: 'Color', value: 'Ivory', isActive: true },
          { id: 'color-blush', name: 'Color', value: 'Blush', isActive: true }
        ],
        inventory: 25,
        averageRating: 4.5,
        _count: { reviews: 18 }
      },
      {
        id: '6',
        name: 'Statement Earrings',
        slug: 'statement-earrings',
        description: 'Bold gold-plated earrings with crystal accents. Perfect for adding glamour to any outfit.',
        price: 180,
        images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        category: {
          id: 'jewelry',
          name: 'Jewelry',
          slug: 'jewelry'
        },
        variants: [
          { id: 'metal-gold', name: 'Metal', value: 'Gold', isActive: true },
          { id: 'metal-silver', name: 'Metal', value: 'Silver', isActive: true }
        ],
        inventory: 30,
        averageRating: 4.4,
        _count: { reviews: 9 }
      }
    ]

    console.log('Using fallback product data - database unavailable')
    
    // Filter fallback data based on query parameters
    let filteredProducts = [...fallbackProducts]

    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category.slug === category)
    }

    // Featured items filter (for our demo, we'll consider sale items as featured)
    if (featured) {
      filteredProducts = filteredProducts.filter(p => p.comparePrice && p.comparePrice > p.price)
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
        filteredProducts.sort((a, b) => b.id.localeCompare(a.id))
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