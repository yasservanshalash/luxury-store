import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  console.log('🧹 Cleaning existing data...')
  await prisma.productTag.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.review.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.wishlistItem.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.productVariant.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.address.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  // Create Categories
  console.log('📂 Creating categories...')
  const womenCategory = await prisma.category.create({
    data: {
      name: 'Women',
      slug: 'women',
      description: 'Luxury women\'s fashion collection crafted in Beirut',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  })

  const accessoriesCategory = await prisma.category.create({
    data: {
      name: 'Accessories',
      slug: 'accessories',
      description: 'Curated luxury accessories to complete your look',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  })

  const eveningCategory = await prisma.category.create({
    data: {
      name: 'Evening Wear',
      slug: 'evening',
      description: 'Exquisite evening wear for special occasions',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  })

  const readyToWearCategory = await prisma.category.create({
    data: {
      name: 'Ready-to-Wear',
      slug: 'ready-to-wear',
      description: 'Contemporary pieces for everyday luxury',
      image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  })

  // Create Tags
  console.log('🏷️ Creating tags...')
  const luxuryTag = await prisma.tag.create({
    data: { name: 'Luxury', slug: 'luxury' }
  })

  const handmadeTag = await prisma.tag.create({
    data: { name: 'Handmade', slug: 'handmade' }
  })

  const lebanonTag = await prisma.tag.create({
    data: { name: 'Made in Lebanon', slug: 'made-in-lebanon' }
  })

  const limitedTag = await prisma.tag.create({
    data: { name: 'Limited Edition', slug: 'limited-edition' }
  })

  const sustainableTag = await prisma.tag.create({
    data: { name: 'Sustainable', slug: 'sustainable' }
  })

  const newArrivalTag = await prisma.tag.create({
    data: { name: 'New Arrival', slug: 'new-arrival' }
  })

  // Create Sample User
  console.log('👤 Creating sample user...')
  const sampleUser = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      firstName: 'Layla',
      lastName: 'Khoury',
      phone: '+961 70 123 456',
      role: 'CUSTOMER'
    }
  })

  // Create Admin User
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@linebygizia.com',
      firstName: 'Gizia',
      lastName: 'Designer',
      phone: '+961 70 987 654',
      role: 'ADMIN'
    }
  })

  // Create Women's Collection Products
  console.log('👗 Creating women\'s collection...')
  
  const silkBlouse = await prisma.product.create({
    data: {
      name: 'Beirut Silk Blouse',
      slug: 'beirut-silk-blouse',
      description: 'An elegant silk blouse crafted from the finest Lebanese silk. Features delicate mother-of-pearl buttons and French seams for a luxurious finish. Perfect for both business and evening occasions.',
      price: 485.00,
      comparePrice: 550.00,
      images: [
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      sku: 'BSB-001',
      inventory: 15,
      material: 'Pure Lebanese silk',
      care: 'Dry clean only',
      isActive: true,
      isFeatured: true,
      categoryId: womenCategory.id,
      variants: {
        create: [
          { name: 'Size', value: 'XS', isActive: true },
          { name: 'Size', value: 'S', isActive: true },
          { name: 'Size', value: 'M', isActive: true },
          { name: 'Size', value: 'L', isActive: true },
          { name: 'Color', value: 'Ivory', isActive: true },
          { name: 'Color', value: 'Black', isActive: true }
        ]
      },
      tags: {
        create: [
          { tag: { connect: { id: luxuryTag.id } } },
          { tag: { connect: { id: lebanonTag.id } } },
          { tag: { connect: { id: sustainableTag.id } } }
        ]
      }
    }
  })

  const liltleBlackDress = await prisma.product.create({
    data: {
              name: 'Line by Gizia Little Black Dress',
      slug: 'concept-little-black-dress',
      description: 'Our signature little black dress reimagined with contemporary Lebanese design elements. Features hand-stitched details and a timeless silhouette that flatters every figure.',
      price: 750.00,
      images: [
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      sku: 'LBD-002',
      inventory: 12,
      material: 'Italian wool crepe',
      care: 'Dry clean only',
      isActive: true,
      isFeatured: true,
      categoryId: womenCategory.id,
      variants: {
        create: [
          { name: 'Size', value: 'XS', isActive: true },
          { name: 'Size', value: 'S', isActive: true },
          { name: 'Size', value: 'M', isActive: true },
          { name: 'Size', value: 'L', isActive: true },
          { name: 'Size', value: 'XL', isActive: true }
        ]
      },
      tags: {
        create: [
          { tag: { connect: { id: luxuryTag.id } } },
          { tag: { connect: { id: handmadeTag.id } } },
          { tag: { connect: { id: lebanonTag.id } } }
        ]
      }
    }
  })

  const cashmereCoat = await prisma.product.create({
    data: {
      name: 'Cashmere Wrap Coat',
      slug: 'cashmere-wrap-coat',
      description: 'A luxurious wrap coat made from the finest cashmere wool. The minimalist design features clean lines and a belt tie closure, embodying Lebanese elegance with modern sophistication.',
      price: 1250.00,
      comparePrice: 1400.00,
      images: [
        'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      sku: 'CWC-003',
      inventory: 8,
      material: '100% Cashmere wool',
      care: 'Professional dry clean only',
      isActive: true,
      isFeatured: true,
      categoryId: womenCategory.id,
      variants: {
        create: [
          { name: 'Size', value: 'S', isActive: true },
          { name: 'Size', value: 'M', isActive: true },
          { name: 'Size', value: 'L', isActive: true },
          { name: 'Color', value: 'Camel', isActive: true },
          { name: 'Color', value: 'Black', isActive: true },
          { name: 'Color', value: 'Cream', isActive: true }
        ]
      },
      tags: {
        create: [
          { tag: { connect: { id: luxuryTag.id } } },
          { tag: { connect: { id: sustainableTag.id } } },
          { tag: { connect: { id: newArrivalTag.id } } }
        ]
      }
    }
  })

  // Evening Wear Collection
  console.log('✨ Creating evening wear collection...')

  const eveningGown = await prisma.product.create({
    data: {
      name: 'Midnight in Beirut Gown',
      slug: 'midnight-beirut-gown',
      description: 'An ethereal evening gown inspired by Beirut\'s starlit nights. Features hand-embroidered stars and flowing silk chiffon that moves like poetry. Perfect for galas and special occasions.',
      price: 2850.00,
      images: [
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566479179817-02e8ea1e76b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      sku: 'MBG-004',
      inventory: 4,
      material: 'Silk chiffon with hand-embroidered details',
      care: 'Dry clean only',
      isActive: true,
      isFeatured: true,
      categoryId: eveningCategory.id,
      variants: {
        create: [
          { name: 'Size', value: 'XS', isActive: true },
          { name: 'Size', value: 'S', isActive: true },
          { name: 'Size', value: 'M', isActive: true },
          { name: 'Size', value: 'L', isActive: true },
          { name: 'Color', value: 'Midnight Blue', isActive: true },
          { name: 'Color', value: 'Black', isActive: true }
        ]
      },
      tags: {
        create: [
          { tag: { connect: { id: luxuryTag.id } } },
          { tag: { connect: { id: handmadeTag.id } } },
          { tag: { connect: { id: limitedTag.id } } },
          { tag: { connect: { id: lebanonTag.id } } }
        ]
      }
    }
  })

  const cocktailDress = await prisma.product.create({
    data: {
      name: 'Mediterranean Sunset Dress',
      slug: 'mediterranean-sunset-dress',
      description: 'A sophisticated cocktail dress in warm sunset hues. The asymmetrical hemline and subtle metallic threading capture the golden hour over the Mediterranean.',
      price: 950.00,
      images: [
        'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      sku: 'MSD-005',
      inventory: 10,
      material: 'Silk crepe with metallic threading',
      care: 'Dry clean only',
      isActive: true,
      isFeatured: false,
      categoryId: eveningCategory.id,
      variants: {
        create: [
          { name: 'Size', value: 'XS', isActive: true },
          { name: 'Size', value: 'S', isActive: true },
          { name: 'Size', value: 'M', isActive: true },
          { name: 'Size', value: 'L', isActive: true },
          { name: 'Color', value: 'Sunset Orange', isActive: true },
          { name: 'Color', value: 'Rose Gold', isActive: true }
        ]
      },
      tags: {
        create: [
          { tag: { connect: { id: luxuryTag.id } } },
          { tag: { connect: { id: lebanonTag.id } } },
          { tag: { connect: { id: newArrivalTag.id } } }
        ]
      }
    }
  })

  // Accessories Collection
  console.log('💎 Creating accessories collection...')

  const silkScarf = await prisma.product.create({
    data: {
      name: 'Beirut Skyline Silk Scarf',
      slug: 'beirut-skyline-silk-scarf',
      description: 'A luxurious silk scarf featuring an artistic interpretation of Beirut\'s iconic skyline. Hand-rolled edges and vibrant colors make this a statement piece.',
      price: 285.00,
      images: [
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      sku: 'BSS-006',
      inventory: 25,
      material: '100% Mulberry silk',
      care: 'Hand wash in cold water',
      isActive: true,
      isFeatured: false,
      categoryId: accessoriesCategory.id,
      variants: {
        create: [
          { name: 'Color', value: 'Blue Skyline', isActive: true },
          { name: 'Color', value: 'Sunset Skyline', isActive: true },
          { name: 'Color', value: 'Monochrome', isActive: true }
        ]
      },
      tags: {
        create: [
          { tag: { connect: { id: luxuryTag.id } } },
          { tag: { connect: { id: handmadeTag.id } } },
          { tag: { connect: { id: lebanonTag.id } } }
        ]
      }
    }
  })

  const leatherHandbag = await prisma.product.create({
    data: {
      name: 'Artisan Leather Handbag',
      slug: 'artisan-leather-handbag',
      description: 'A timeless leather handbag crafted by Lebanese artisans using traditional techniques. Features hand-stitched details and premium hardware for lasting beauty.',
      price: 650.00,
      images: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      sku: 'ALH-007',
      inventory: 18,
      material: 'Premium Italian leather',
      care: 'Leather conditioner recommended',
      isActive: true,
      isFeatured: true,
      categoryId: accessoriesCategory.id,
      variants: {
        create: [
          { name: 'Color', value: 'Black', isActive: true },
          { name: 'Color', value: 'Cognac', isActive: true },
          { name: 'Color', value: 'Navy', isActive: true },
          { name: 'Size', value: 'Medium', isActive: true },
          { name: 'Size', value: 'Large', isActive: true }
        ]
      },
      tags: {
        create: [
          { tag: { connect: { id: luxuryTag.id } } },
          { tag: { connect: { id: handmadeTag.id } } },
          { tag: { connect: { id: lebanonTag.id } } },
          { tag: { connect: { id: sustainableTag.id } } }
        ]
      }
    }
  })

  const goldJewelry = await prisma.product.create({
    data: {
      name: 'Phoenician Heritage Necklace',
      slug: 'phoenician-heritage-necklace',
      description: 'An exquisite gold necklace inspired by ancient Phoenician jewelry designs. Each piece is handcrafted by Lebanese artisans and features traditional motifs.',
      price: 1850.00,
      images: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1588444962502-5a43b3e68a05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      sku: 'PHN-008',
      inventory: 6,
      material: '18k Gold with traditional engravings',
      care: 'Polish with soft cloth',
      isActive: true,
      isFeatured: true,
      categoryId: accessoriesCategory.id,
      variants: {
        create: [
          { name: 'Metal', value: 'Yellow Gold', isActive: true },
          { name: 'Metal', value: 'Rose Gold', isActive: true }
        ]
      },
      tags: {
        create: [
          { tag: { connect: { id: luxuryTag.id } } },
          { tag: { connect: { id: handmadeTag.id } } },
          { tag: { connect: { id: limitedTag.id } } },
          { tag: { connect: { id: lebanonTag.id } } }
        ]
      }
    }
  })

  // Ready-to-Wear Collection
  console.log('👔 Creating ready-to-wear collection...')

  const tailoredBlazer = await prisma.product.create({
    data: {
      name: 'Lebanese Tailored Blazer',
      slug: 'lebanese-tailored-blazer',
      description: 'A perfectly tailored blazer showcasing the finest Lebanese tailoring traditions. Contemporary cut with classic details for the modern professional woman.',
      price: 850.00,
      images: [
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      sku: 'LTB-009',
      inventory: 14,
      material: 'Premium wool blend',
      care: 'Dry clean only',
      isActive: true,
      isFeatured: false,
      categoryId: readyToWearCategory.id,
      variants: {
        create: [
          { name: 'Size', value: 'XS', isActive: true },
          { name: 'Size', value: 'S', isActive: true },
          { name: 'Size', value: 'M', isActive: true },
          { name: 'Size', value: 'L', isActive: true },
          { name: 'Size', value: 'XL', isActive: true },
          { name: 'Color', value: 'Black', isActive: true },
          { name: 'Color', value: 'Navy', isActive: true },
          { name: 'Color', value: 'Camel', isActive: true }
        ]
      },
      tags: {
        create: [
          { tag: { connect: { id: luxuryTag.id } } },
          { tag: { connect: { id: lebanonTag.id } } },
          { tag: { connect: { id: sustainableTag.id } } }
        ]
      }
    }
  })

  const laidbackLuxury = await prisma.product.create({
    data: {
      name: 'Cashmere Lounge Set',
      slug: 'cashmere-lounge-set',
      description: 'Luxurious cashmere lounge set perfect for relaxed elegance at home. Soft, breathable, and beautifully crafted for ultimate comfort without compromising style.',
      price: 680.00,
      images: [
        'https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      sku: 'CLS-010',
      inventory: 20,
      material: '100% Cashmere',
      care: 'Hand wash in cold water',
      isActive: true,
      isFeatured: false,
      categoryId: readyToWearCategory.id,
      variants: {
        create: [
          { name: 'Size', value: 'XS', isActive: true },
          { name: 'Size', value: 'S', isActive: true },
          { name: 'Size', value: 'M', isActive: true },
          { name: 'Size', value: 'L', isActive: true },
          { name: 'Color', value: 'Cream', isActive: true },
          { name: 'Color', value: 'Grey', isActive: true },
          { name: 'Color', value: 'Rose', isActive: true }
        ]
      },
      tags: {
        create: [
          { tag: { connect: { id: luxuryTag.id } } },
          { tag: { connect: { id: sustainableTag.id } } },
          { tag: { connect: { id: newArrivalTag.id } } }
        ]
      }
    }
  })

  // Create sample reviews
  console.log('⭐ Creating sample reviews...')
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Absolutely stunning piece! The quality is exceptional and the fit is perfect. Lebanese craftsmanship at its finest.',
      userId: sampleUser.id,
      productId: silkBlouse.id
    }
  })

  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'This dress is a masterpiece. I wore it to a gala and received countless compliments. The attention to detail is remarkable.',
      userId: sampleUser.id,
      productId: eveningGown.id
    }
  })

  await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Beautiful handbag with incredible craftsmanship. The leather is so soft and the design is timeless.',
      userId: sampleUser.id,
      productId: leatherHandbag.id
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log(`Created:`)
  console.log(`- 4 categories`)
  console.log(`- 6 tags`)
  console.log(`- 2 users`)
  console.log(`- 10 luxury products`)
  console.log(`- Product variants and reviews`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 