import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      name,
      slug,
      description,
      price,
      comparePrice,
      categoryId,
      sku,
      inventory,
      material,
      care,
      isActive,
      isFeatured,
      images,
      variants
    } = body
    
    console.log('Received product data with images:', images?.length, 'images')

    // Validate required fields
    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { success: false, message: 'Name, price, and category are required' },
        { status: 400 }
      )
    }

    // Check if database is available
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { success: false, message: 'Database not configured' },
        { status: 500 }
      )
    }

    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug }
    })

    if (existingProduct) {
      return NextResponse.json(
        { success: false, message: 'A product with this slug already exists' },
        { status: 400 }
      )
    }

    // Create the product with variants
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || '',
        price: price,
        comparePrice: comparePrice || undefined,
        images: images || [],
        sku: sku || undefined,
        inventory: inventory || 0,
        material: material || undefined,
        care: care || undefined,
        isActive: isActive || true,
        isFeatured: isFeatured || false,
        categoryId,
        variants: {
          create: variants?.map((variant: { name: string; value: string }) => ({
            name: variant.name,
            value: variant.value,
            isActive: true
          })) || []
        }
      },
      include: {
        category: true,
        variants: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product
    })

  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create product' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { success: false, message: 'Database not configured' },
        { status: 500 }
      )
    }

    const products = await prisma.product.findMany({
      include: {
        category: true,
        variants: true,
        _count: {
          select: {
            reviews: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      products
    })

  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    )
  }
} 