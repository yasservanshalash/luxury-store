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

    // Fallback demo products if database is not available or product not found
    const demoProducts: { [key: string]: any } = {
      "luxury-evening-gown": {
        id: "1",
        name: "Luxury Evening Gown",
        slug: "luxury-evening-gown",
        description: "Elegant evening gown perfect for special occasions. Crafted with the finest Lebanese artisanal techniques, this piece embodies sophistication and timeless style.",
        price: 890,
        comparePrice: null,
        images: [
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        category: { id: "1", name: "Evening Wear", slug: "evening-wear" },
        isActive: true,
        isFeatured: true,
        material: "Silk",
        care: "Dry clean only",
        variants: [
          { name: "Size", value: "XS", isActive: true },
          { name: "Size", value: "S", isActive: true },
          { name: "Size", value: "M", isActive: true },
          { name: "Size", value: "L", isActive: true }
        ],
        reviews: [],
        _count: { reviews: 5 },
        averageRating: 4.8
      },
      "designer-blazer": {
        id: "2",
        name: "Designer Blazer",
        slug: "designer-blazer",
        description: "Professional blazer with contemporary Lebanese design. Perfect for business meetings or elegant social events.",
        price: 650,
        comparePrice: null,
        images: [
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        category: { id: "2", name: "Outerwear", slug: "outerwear" },
        isActive: true,
        isFeatured: true,
        material: "Wool Blend",
        care: "Dry clean recommended",
        variants: [
          { name: "Size", value: "XS", isActive: true },
          { name: "Size", value: "S", isActive: true },
          { name: "Size", value: "M", isActive: true },
          { name: "Size", value: "L", isActive: true }
        ],
        reviews: [],
        _count: { reviews: 3 },
        averageRating: 4.6
      },
      "silk-cocktail-dress": {
        id: "3",
        name: "Silk Cocktail Dress",
        slug: "silk-cocktail-dress",
        description: "Sophisticated cocktail dress in premium silk. Perfect for evening events and special occasions.",
        price: 420,
        comparePrice: null,
        images: [
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        category: { id: "3", name: "Dresses", slug: "dresses" },
        isActive: true,
        isFeatured: false,
        material: "Pure Silk",
        care: "Dry clean only",
        variants: [
          { name: "Size", value: "XS", isActive: true },
          { name: "Size", value: "S", isActive: true },
          { name: "Size", value: "M", isActive: true },
          { name: "Size", value: "L", isActive: true }
        ],
        reviews: [],
        _count: { reviews: 8 },
        averageRating: 4.9
      }
    }

    const demoProduct = demoProducts[params.slug]
    
    if (demoProduct) {
      return NextResponse.json({
        success: true,
        data: demoProduct
      })
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