import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
        console.log('Database error:', dbError)
      }
    }

    // Product not found
    return NextResponse.json(
      { success: false, error: 'Product not found' },
      { status: 404 }
    )

  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}