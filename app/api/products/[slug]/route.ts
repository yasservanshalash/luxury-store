import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Fallback products for when database is not available
const fallbackProducts = {
  'luxury-evening-gown': {
    id: '1',
    name: 'Luxury Evening Gown',
    slug: 'luxury-evening-gown',
    description: 'Elegant evening gown crafted from the finest silk with hand-embroidered details. Perfect for galas and special occasions.',
    price: 1250,
    comparePrice: 1800,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566479179817-623b4e5d64e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    category: { id: 'evening', name: 'Evening Wear', slug: 'evening' },
    variants: [
      { id: '1', name: 'Size', value: 'XS', isActive: true },
      { id: '2', name: 'Size', value: 'S', isActive: true },
      { id: '3', name: 'Size', value: 'M', isActive: true },
      { id: '4', name: 'Size', value: 'L', isActive: true },
      { id: '5', name: 'Color', value: 'Black', isActive: true },
      { id: '6', name: 'Color', value: 'Navy', isActive: true }
    ],
    averageRating: 4.8,
    _count: { reviews: 24 },
    inventory: 12
  },
  'cashmere-coat': {
    id: '2',
    name: 'Cashmere Coat',
    slug: 'cashmere-coat',
    description: 'Luxurious double-breasted cashmere coat with silk lining. A timeless piece for the sophisticated woman.',
    price: 980,
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    category: { id: 'outerwear', name: 'Outerwear', slug: 'outerwear' },
    variants: [
      { id: '7', name: 'Size', value: 'XS', isActive: true },
      { id: '8', name: 'Size', value: 'S', isActive: true },
      { id: '9', name: 'Size', value: 'M', isActive: true },
      { id: '10', name: 'Size', value: 'L', isActive: true },
      { id: '11', name: 'Color', value: 'Camel', isActive: true },
      { id: '12', name: 'Color', value: 'Charcoal', isActive: true }
    ],
    averageRating: 4.9,
    _count: { reviews: 16 },
    inventory: 8
  },
  'silk-cocktail-dress': {
    id: '3',
    name: 'Silk Cocktail Dress',
    slug: 'silk-cocktail-dress',
    description: 'Elegant midi dress in pure silk with a flattering A-line silhouette. Perfect for cocktail parties and dinner events.',
    price: 420,
    images: [
      'https://images.unsplash.com/photo-1566479179817-623b4e5d64e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    category: { id: 'dresses', name: 'Dresses', slug: 'dresses' },
    variants: [
      { id: '13', name: 'Size', value: 'XS', isActive: true },
      { id: '14', name: 'Size', value: 'S', isActive: true },
      { id: '15', name: 'Size', value: 'M', isActive: true },
      { id: '16', name: 'Size', value: 'L', isActive: true },
      { id: '17', name: 'Color', value: 'Emerald', isActive: true },
      { id: '18', name: 'Color', value: 'Burgundy', isActive: true }
    ],
    averageRating: 4.7,
    _count: { reviews: 31 },
    inventory: 15
  },
  'designer-handbag': {
    id: '4',
    name: 'Designer Handbag',
    slug: 'designer-handbag',
    description: 'Premium leather handbag with gold-tone hardware. Spacious interior with multiple compartments for organization.',
    price: 750,
    images: [
      'https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    category: { id: 'accessories', name: 'Accessories', slug: 'accessories' },
    variants: [
      { id: '19', name: 'Color', value: 'Black', isActive: true },
      { id: '20', name: 'Color', value: 'Tan', isActive: true },
      { id: '21', name: 'Color', value: 'Cognac', isActive: true }
    ],
    averageRating: 4.6,
    _count: { reviews: 12 },
    inventory: 20
  },
  'elegant-blouse': {
    id: '5',
    name: 'Elegant Blouse',
    slug: 'elegant-blouse',
    description: 'Sophisticated silk blouse with pearl button details. Versatile piece that transitions from day to evening.',
    price: 280,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    category: { id: 'tops', name: 'Tops', slug: 'tops' },
    variants: [
      { id: '22', name: 'Size', value: 'XS', isActive: true },
      { id: '23', name: 'Size', value: 'S', isActive: true },
      { id: '24', name: 'Size', value: 'M', isActive: true },
      { id: '25', name: 'Size', value: 'L', isActive: true },
      { id: '26', name: 'Color', value: 'Ivory', isActive: true },
      { id: '27', name: 'Color', value: 'Blush', isActive: true }
    ],
    averageRating: 4.5,
    _count: { reviews: 18 },
    inventory: 25
  },
  'statement-earrings': {
    id: '6',
    name: 'Statement Earrings',
    slug: 'statement-earrings',
    description: 'Bold gold-plated earrings with crystal accents. Perfect for adding glamour to any outfit.',
    price: 180,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    category: { id: 'jewelry', name: 'Jewelry', slug: 'jewelry' },
    variants: [
      { id: '28', name: 'Metal', value: 'Gold', isActive: true },
      { id: '29', name: 'Metal', value: 'Silver', isActive: true }
    ],
    averageRating: 4.4,
    _count: { reviews: 9 },
    inventory: 30
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Try database first if available
    if (process.env.DATABASE_URL) {
      try {
        const product = await prisma.product.findUnique({
          where: {
            slug: params.slug,
            isActive: true
          },
          include: {
            category: true,
            variants: {
              where: {
                isActive: true
              }
            },
            reviews: {
              include: {
                user: {
                  select: {
                    name: true
                  }
                }
              }
            },
            _count: {
              select: {
                reviews: true
              }
            }
          }
        })

        if (product) {
          const averageRating = product.reviews.length > 0
            ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
            : null

          return NextResponse.json({
            success: true,
            data: {
              ...product,
              averageRating
            }
          })
        }
      } catch (dbError) {
        console.log('Database not available, using fallback data')
      }
    }

    // Use fallback data
    const product = fallbackProducts[params.slug as keyof typeof fallbackProducts]
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: product
    })

  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
} 