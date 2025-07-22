import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Mock product for when database is not available
const mockProduct = {
  id: '1',
  name: 'Elegant Silk Dress',
  slug: 'elegant-silk-dress',
  description: 'A stunning silk dress perfect for special occasions with intricate details and premium quality fabric.',
  price: 299,
  comparePrice: 399,
  images: [
    'https://picsum.photos/600/800?random=1',
    'https://picsum.photos/600/800?random=2',
    'https://picsum.photos/600/800?random=3'
  ],
  category: { id: '1', name: 'Women', slug: 'women' },
  variants: [
    { id: '1', name: 'Size', value: 'S', isActive: true },
    { id: '2', name: 'Size', value: 'M', isActive: true },
    { id: '3', name: 'Size', value: 'L', isActive: true },
    { id: '4', name: 'Color', value: 'Black', isActive: true },
    { id: '5', name: 'Color', value: 'Navy', isActive: true }
  ],
  reviews: [],
  averageRating: 4.5,
  totalReviews: 24,
  sku: 'ESD-001',
  inventory: 15,
  isActive: true,
  isFeatured: true,
  createdAt: new Date(),
  updatedAt: new Date()
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Return mock data if no database URL is provided
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(mockProduct)
    }

    const product = await prisma.product.findUnique({
      where: {
        slug: params.slug,
        isActive: true
      },
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
    })

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // Calculate average rating
    const averageRating = product.reviews.length > 0 
      ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
      : 0

    const productWithRating = {
      ...product,
      averageRating
    }

    return NextResponse.json({
      success: true,
      data: productWithRating
    })

  } catch (error) {
    console.error('Product API error:', error)
    
    // Fallback product data based on slug
    const fallbackProducts: Record<string, any> = {
      'silk-evening-dress': {
        id: '1',
        name: 'Silk Evening Dress',
        slug: 'silk-evening-dress',
        description: 'Exquisite silk evening dress with intricate beadwork. Perfect for special occasions and formal events. Made from the finest materials with attention to every detail.',
        price: 2499,
        comparePrice: 3299,
        images: [
          'https://picsum.photos/600/800?random=1',
          'https://picsum.photos/600/800?random=2',
          'https://picsum.photos/600/800?random=3'
        ],
        sku: 'SED-001',
        inventory: 15,
        isActive: true,
        isFeatured: true,
        category: { id: '1', name: 'Women', slug: 'women' },
        variants: [
          { id: '1', name: 'Size', value: 'XS', isActive: true },
          { id: '2', name: 'Size', value: 'S', isActive: true },
          { id: '3', name: 'Size', value: 'M', isActive: true },
          { id: '4', name: 'Size', value: 'L', isActive: true },
          { id: '5', name: 'Color', value: 'Black', isActive: true },
          { id: '6', name: 'Color', value: 'Navy', isActive: true }
        ],
        reviews: [],
        averageRating: 4.8,
        _count: { reviews: 24 },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      'cashmere-overcoat': {
        id: '2',
        name: 'Cashmere Overcoat',
        slug: 'cashmere-overcoat',
        description: 'Luxurious cashmere overcoat with classic tailoring. Handcrafted by skilled artisans using the finest cashmere wool. Perfect for cold weather while maintaining elegance.',
        price: 3999,
        images: [
          'https://picsum.photos/600/800?random=3',
          'https://picsum.photos/600/800?random=4',
          'https://picsum.photos/600/800?random=5'
        ],
        sku: 'CO-001',
        inventory: 8,
        isActive: true,
        isFeatured: true,
        category: { id: '2', name: 'Men', slug: 'men' },
        variants: [
          { id: '7', name: 'Size', value: 'S', isActive: true },
          { id: '8', name: 'Size', value: 'M', isActive: true },
          { id: '9', name: 'Size', value: 'L', isActive: true },
          { id: '10', name: 'Size', value: 'XL', isActive: true },
          { id: '11', name: 'Color', value: 'Charcoal', isActive: true },
          { id: '12', name: 'Color', value: 'Camel', isActive: true }
        ],
        reviews: [],
        averageRating: 4.9,
        _count: { reviews: 18 },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      'diamond-tennis-bracelet': {
        id: '3',
        name: 'Diamond Tennis Bracelet',
        slug: 'diamond-tennis-bracelet',
        description: 'Stunning diamond tennis bracelet with premium stones. Each diamond is carefully selected and set by master jewelers. A timeless piece that elevates any outfit.',
        price: 8999,
        images: [
          'https://picsum.photos/600/800?random=5',
          'https://picsum.photos/600/800?random=6'
        ],
        sku: 'DTB-001',
        inventory: 5,
        isActive: true,
        isFeatured: false,
        category: { id: '3', name: 'Accessories', slug: 'accessories' },
        variants: [
          { id: '13', name: 'Size', value: '16cm', isActive: true },
          { id: '14', name: 'Size', value: '18cm', isActive: true },
          { id: '15', name: 'Size', value: '20cm', isActive: true }
        ],
        reviews: [],
        averageRating: 5.0,
        _count: { reviews: 12 },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      'italian-leather-handbag': {
        id: '4',
        name: 'Italian Leather Handbag',
        slug: 'italian-leather-handbag',
        description: 'Handcrafted Italian leather handbag with exquisite attention to detail. Made from the finest leather and featuring elegant hardware. A perfect companion for any occasion.',
        price: 1899,
        images: [
          'https://picsum.photos/600/800?random=7',
          'https://picsum.photos/600/800?random=8',
          'https://picsum.photos/600/800?random=9'
        ],
        sku: 'ILH-001',
        inventory: 12,
        isActive: true,
        isFeatured: false,
        category: { id: '3', name: 'Accessories', slug: 'accessories' },
        variants: [
          { id: '16', name: 'Color', value: 'Black', isActive: true },
          { id: '17', name: 'Color', value: 'Brown', isActive: true },
          { id: '18', name: 'Color', value: 'Tan', isActive: true }
        ],
        reviews: [],
        averageRating: 4.7,
        _count: { reviews: 31 },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }

    const fallbackProduct = fallbackProducts[params.slug]
    
    if (fallbackProduct) {
      console.log('Using fallback product data for:', params.slug)
      return NextResponse.json({
        success: true,
        data: fallbackProduct
      })
    }

    return NextResponse.json(
      { success: false, error: 'Product not found' },
      { status: 404 }
    )
  }
} 