import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { success: false, message: 'Database not configured' },
        { status: 500 }
      )
    }

    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        variants: true
      }
    })

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      product
    })

  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      )
    }

    // Check if slug is unique (excluding current product)
    const slugExists = await prisma.product.findFirst({
      where: { 
        slug,
        id: { not: params.id }
      }
    })

    if (slugExists) {
      return NextResponse.json(
        { success: false, message: 'A product with this slug already exists' },
        { status: 400 }
      )
    }

    // Delete existing variants and create new ones
    await prisma.productVariant.deleteMany({
      where: { productId: params.id }
    })

    // Update the product with new variants
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        slug,
        description: description || '',
        price: price,
        comparePrice: comparePrice || null,
        images: images || [],
        sku: sku || null,
        inventory: inventory || 0,
        material: material || null,
        care: care || null,
        isActive: isActive !== undefined ? isActive : true,
        isFeatured: isFeatured !== undefined ? isFeatured : false,
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
      message: 'Product updated successfully',
      product
    })

  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { success: false, message: 'Database not configured' },
        { status: 500 }
      )
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      )
    }

    // Delete the product (variants will be deleted due to cascade)
    await prisma.product.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete product' },
      { status: 500 }
    )
  }
} 